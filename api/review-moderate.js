import { createHash, timingSafeEqual } from "node:crypto";

function getConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secret) throw new Error("Server configuration is incomplete");
  return { url, secret };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function safeTokenEqual(expectedHash, rawToken) {
  if (!/^[a-f0-9]{64}$/i.test(String(expectedHash || ""))) return false;
  if (!/^[a-f0-9]{64}$/i.test(String(rawToken || ""))) return false;
  const expected = Buffer.from(String(expectedHash), "hex");
  const actual = Buffer.from(sha256(String(rawToken)), "hex");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function setHtmlHeaders(res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'");
}

function page({ title, body, status = 200 }) {
  return { status, html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title>${escapeHtml(title)}</title>
  <style>
    :root{font-family:Arial,sans-serif;color:#35251e;background:#fbf3eb}
    *{box-sizing:border-box}body{margin:0;padding:28px}main{max-width:680px;margin:6vh auto;background:#fffdf9;border:1px solid #ead9cb;border-radius:24px;padding:30px;box-shadow:0 18px 50px rgba(70,40,25,.10)}
    h1{font-family:Georgia,'Times New Roman',serif;font-size:2rem;margin:0 0 10px}p{line-height:1.6}.muted{color:#765f51}.review{background:#fff8f1;border:1px solid #ead9cb;border-radius:16px;padding:18px;margin:22px 0}.review blockquote{margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:1.08rem;line-height:1.55}
    .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}.btn{appearance:none;border:0;border-radius:999px;padding:12px 18px;font-weight:700;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center}.approve{background:#c85116;color:white}.reject{background:#5a4438;color:white}.secondary{background:#f3e6da;color:#5a4438}.danger{color:#9e2b1b}.ok{color:#2d6b3c}
  </style>
</head>
<body><main>${body}</main></body>
</html>` };
}

function sendPage(res, payload) {
  setHtmlHeaders(res);
  res.status(payload.status);
  return res.end(payload.html);
}

function parseAction(value) {
  return value === "approve" || value === "reject" ? value : "";
}

async function parseFormBody(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === "string") return Object.fromEntries(new URLSearchParams(req.body));
  let raw = "";
  for await (const chunk of req) raw += chunk;
  return Object.fromEntries(new URLSearchParams(raw));
}

async function fetchModerationToken({ url, secret, reviewId }) {
  const response = await fetch(`${url}/rest/v1/review_moderation_tokens?select=token_hash,expires_at&review_id=eq.${encodeURIComponent(reviewId)}&limit=1`, {
    headers: { apikey: secret },
  });
  if (!response.ok) throw new Error(`Could not read moderation token (${response.status})`);
  const rows = await response.json();
  return Array.isArray(rows) ? rows[0] : null;
}

async function fetchReview({ url, secret, reviewId }) {
  const response = await fetch(`${url}/rest/v1/reviews?select=id,category,review_text,status& id=eq.${encodeURIComponent(reviewId)}`.replace("& id", "&id"), {
    headers: { apikey: secret },
  });
  if (!response.ok) throw new Error(`Could not read review (${response.status})`);
  const rows = await response.json();
  return Array.isArray(rows) ? rows[0] : null;
}

async function validateCapability({ url, secret, reviewId, token }) {
  if (!reviewId || !/^[0-9a-f-]{36}$/i.test(reviewId) || !token) return { ok: false, reason: "invalid" };
  const record = await fetchModerationToken({ url, secret, reviewId });
  if (!record) return { ok: false, reason: "used" };
  if (new Date(record.expires_at).getTime() <= Date.now()) return { ok: false, reason: "expired" };
  if (!safeTokenEqual(record.token_hash, token)) return { ok: false, reason: "invalid" };
  return { ok: true };
}

async function deleteToken({ url, secret, reviewId }) {
  const response = await fetch(`${url}/rest/v1/review_moderation_tokens?review_id=eq.${encodeURIComponent(reviewId)}`, {
    method: "DELETE",
    headers: { apikey: secret },
  });
  if (!response.ok) console.error("Could not delete used moderation token:", response.status, await response.text());
}

async function updateReview({ url, secret, reviewId, action }) {
  const now = new Date().toISOString();
  const body = action === "approve"
    ? { status: "approved", reviewed_at: now, approved_at: now }
    : { status: "rejected", reviewed_at: now, approved_at: null };

  const response = await fetch(`${url}/rest/v1/reviews?id=eq.${encodeURIComponent(reviewId)}&status=eq.pending`, {
    method: "PATCH",
    headers: {
      apikey: secret,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error(`Could not update review (${response.status}): ${await response.text()}`);
  const rows = await response.json();
  return Array.isArray(rows) ? rows[0] : null;
}

function invalidPage(reason) {
  const message = reason === "expired"
    ? "This moderation link has expired. The review is still saved as pending and can be handled from the admin page once that is enabled."
    : reason === "used"
      ? "This moderation link has already been used or is no longer active."
      : "This moderation link is invalid.";
  return page({
    title: "Moderation link unavailable",
    status: 403,
    body: `<h1>Moderation link unavailable</h1><p class="muted">${escapeHtml(message)}</p><div class="actions"><a class="btn secondary" href="https://vedicastrologybyshruti.com/#reviews">Return to website</a></div>`,
  });
}

export default async function handler(req, res) {
  try {
    const { url, secret } = getConfig();

    if (req.method === "GET") {
      const reviewId = String(req.query?.review || "");
      const action = parseAction(String(req.query?.action || ""));
      const token = String(req.query?.token || "");
      if (!action) return sendPage(res, invalidPage("invalid"));

      const capability = await validateCapability({ url, secret, reviewId, token });
      if (!capability.ok) return sendPage(res, invalidPage(capability.reason));

      const review = await fetchReview({ url, secret, reviewId });
      if (!review) return sendPage(res, invalidPage("invalid"));
      if (review.status !== "pending") {
        return sendPage(res, page({
          title: "Review already handled",
          body: `<h1>Review already handled</h1><p class="muted">This review is currently <strong>${escapeHtml(review.status)}</strong>.</p><div class="actions"><a class="btn secondary" href="https://vedicastrologybyshruti.com/#reviews">Return to website</a></div>`,
        }));
      }

      const verb = action === "approve" ? "Approve" : "Reject";
      const buttonClass = action === "approve" ? "approve" : "reject";
      const caution = action === "approve"
        ? "Approving will publish this testimonial on the website."
        : "Rejecting will keep this testimonial off the public website.";

      return sendPage(res, page({
        title: `${verb} review`,
        body: `
          <h1>${verb} this review?</h1>
          <p class="muted">${escapeHtml(caution)}</p>
          <div class="review">
            <strong>${escapeHtml(review.category)}</strong>
            <blockquote>“${escapeHtml(review.review_text)}”</blockquote>
          </div>
          <form method="post" action="/api/review-moderate">
            <input type="hidden" name="review" value="${escapeHtml(reviewId)}">
            <input type="hidden" name="action" value="${escapeHtml(action)}">
            <input type="hidden" name="token" value="${escapeHtml(token)}">
            <div class="actions">
              <button class="btn ${buttonClass}" type="submit">Confirm ${verb}</button>
              <a class="btn secondary" href="https://vedicastrologybyshruti.com/#reviews">Cancel</a>
            </div>
          </form>`,
      }));
    }

    if (req.method === "POST") {
      const form = await parseFormBody(req);
      const reviewId = String(form.review || "");
      const action = parseAction(String(form.action || ""));
      const token = String(form.token || "");
      if (!action) return sendPage(res, invalidPage("invalid"));

      const capability = await validateCapability({ url, secret, reviewId, token });
      if (!capability.ok) return sendPage(res, invalidPage(capability.reason));

      const updated = await updateReview({ url, secret, reviewId, action });
      if (!updated) {
        await deleteToken({ url, secret, reviewId });
        const current = await fetchReview({ url, secret, reviewId });
        return sendPage(res, page({
          title: "Review already handled",
          body: `<h1>Review already handled</h1><p class="muted">This review is currently <strong>${escapeHtml(current?.status || "not pending")}</strong>.</p><div class="actions"><a class="btn secondary" href="https://vedicastrologybyshruti.com/#reviews">Return to website</a></div>`,
        }));
      }

      await deleteToken({ url, secret, reviewId });
      const approved = action === "approve";
      return sendPage(res, page({
        title: approved ? "Review approved" : "Review rejected",
        body: `
          <h1 class="${approved ? "ok" : "danger"}">${approved ? "Review approved" : "Review rejected"}</h1>
          <p class="muted">${approved ? "The testimonial is now published on the website." : "The testimonial will not be displayed publicly."}</p>
          <div class="review"><strong>${escapeHtml(updated.category)}</strong><blockquote>“${escapeHtml(updated.review_text)}”</blockquote></div>
          <div class="actions"><a class="btn secondary" href="https://vedicastrologybyshruti.com/#reviews">View reviews</a></div>`,
      }));
    }

    res.setHeader("Allow", "GET, POST");
    return sendPage(res, page({ title: "Method not allowed", status: 405, body: "<h1>Method not allowed</h1>" }));
  } catch (error) {
    console.error(error);
    return sendPage(res, page({
      title: "Moderation error",
      status: 500,
      body: `<h1>Something went wrong</h1><p class="muted">The review has not been changed. Please try again later.</p>`,
    }));
  }
}
