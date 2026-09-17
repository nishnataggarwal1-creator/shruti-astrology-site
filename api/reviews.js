import { createHash, randomBytes } from "node:crypto";

const ALLOWED_CATEGORIES = new Set([
  "Kundli & Life Guidance",
  "Career & Business",
  "Marriage & Relationships",
  "Family & Children",
  "Finance & Stuck Matters",
  "Health-Related Astrological Guidance",
  "Vastu",
  "Personalized Remedies",
  "Other",
]);

function json(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.end(JSON.stringify(body));
}

function getConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const publishable = process.env.SUPABASE_PUBLISHABLE_KEY;
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!url || !publishable || !secret) throw new Error("Server configuration is incomplete");
  return { url, publishable, secret };
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

function getSiteUrl() {
  const siteUrl = String(process.env.SITE_URL || "").trim().replace(/\/+$/, "");
  if (!siteUrl || !siteUrl.startsWith("https://")) {
    throw new Error("SITE_URL must be configured with an https:// URL");
  }
  return siteUrl;
}

function normalizeRpcUuid(payload) {
  if (typeof payload === "string") return payload;
  if (Array.isArray(payload) && typeof payload[0] === "string") return payload[0];
  if (payload && typeof payload === "object") {
    if (typeof payload.submit_review === "string") return payload.submit_review;
    if (typeof payload.id === "string") return payload.id;
  }
  return "";
}

async function createModerationToken({ url, secret, reviewId }) {
  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = sha256(rawToken);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const response = await fetch(`${url}/rest/v1/review_moderation_tokens`, {
    method: "POST",
    headers: {
      apikey: secret,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      review_id: reviewId,
      token_hash: tokenHash,
      expires_at: expiresAt,
    }),
  });

  if (!response.ok) {
    throw new Error(`Could not create moderation token (${response.status}): ${await response.text()}`);
  }

  return rawToken;
}

async function sendModerationEmail({ reviewId, token, category, reviewText, contactType, contact }) {
  const resendKey = process.env.RESEND_API_KEY;
  const adminEmailSetting = process.env.REVIEW_ADMIN_EMAILS || process.env.REVIEW_ADMIN_EMAIL || "";
  const adminEmails = [...new Set(
    adminEmailSetting
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean)
  )];
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!resendKey || adminEmails.length === 0 || !fromEmail) {
    console.error("Review notification email configuration is incomplete");
    return false;
  }

  const siteUrl = getSiteUrl();
  const approveUrl = `${siteUrl}/api/review-moderate?review=${encodeURIComponent(reviewId)}&action=approve&token=${encodeURIComponent(token)}`;
  const rejectUrl = `${siteUrl}/api/review-moderate?review=${encodeURIComponent(reviewId)}&action=reject&token=${encodeURIComponent(token)}`;

  const safeCategory = escapeHtml(category);
  const safeReview = escapeHtml(reviewText).replaceAll("\n", "<br>");
  const safeContactType = escapeHtml(contactType === "email" ? "Email" : "WhatsApp");
  const safeContact = escapeHtml(contact);

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#35251e;line-height:1.55">
      <h2 style="margin-bottom:6px">New review awaiting approval</h2>
      <p style="margin-top:0;color:#765f51">Vedic Astrology by Shruti</p>
      <div style="border:1px solid #ead9cb;border-radius:14px;padding:20px;background:#fffaf5;margin:22px 0">
        <p style="margin:0 0 10px"><strong>Category:</strong> ${safeCategory}</p>
        <p style="margin:0 0 10px"><strong>Review:</strong><br>${safeReview}</p>
        <p style="margin:0"><strong>Private verification contact (${safeContactType}):</strong><br>${safeContact}</p>
      </div>
      <p style="margin:0 0 18px">Choose an action below. The link opens a confirmation page first; merely opening the email does not publish or reject the review.</p>
      <p>
        <a href="${approveUrl}" style="display:inline-block;background:#c85116;color:white;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:700;margin-right:10px">Review & Approve</a>
        <a href="${rejectUrl}" style="display:inline-block;background:#5a4438;color:white;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:700">Review & Reject</a>
      </p>
      <p style="font-size:12px;color:#8a7467;margin-top:28px">For security, these moderation links expire after 7 days and stop working after the review is handled.</p>
    </div>`;

  const text = [
    "New review awaiting approval",
    `Category: ${category}`,
    `Review: ${reviewText}`,
    `Private verification contact (${contactType}): ${contact}`,
    "",
    `Review & approve: ${approveUrl}`,
    `Review & reject: ${rejectUrl}`,
    "",
    "The links open a confirmation page first and expire after 7 days.",
  ].join("\n");

  const results = await Promise.all(
    adminEmails.map(async (adminEmail) => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Vedic Astrology by Shruti <${fromEmail}>`,
          to: [adminEmail],
          subject: `New review awaiting approval — ${category}`,
          html,
          text,
        }),
      });

      if (!response.ok) {
        console.error(`Resend notification failed for ${adminEmail}:`, response.status, await response.text());
        return false;
      }

      return true;
    })
  );

  return results.every(Boolean);
}

export default async function handler(req, res) {
  try {
    const { url, publishable, secret } = getConfig();

    if (req.method === "GET") {
      const requestedLimit = Number.parseInt(String(req.query?.limit || "6"), 10);
      const requestedOffset = Number.parseInt(String(req.query?.offset || "0"), 10);
      const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 12) : 6;
      const offset = Number.isFinite(requestedOffset) ? Math.max(requestedOffset, 0) : 0;
      const fetchLimit = limit + 1;

      const endpoint = `${url}/rest/v1/reviews?select=id,category,review_text,approved_at&status=eq.approved&order=approved_at.desc.nullslast,submitted_at.desc&limit=${fetchLimit}&offset=${offset}`;
      const response = await fetch(endpoint, {
        headers: { apikey: publishable },
      });
      if (!response.ok) throw new Error("Could not load approved reviews");
      const rows = await response.json();
      const hasMore = Array.isArray(rows) && rows.length > limit;
      const reviews = Array.isArray(rows) ? rows.slice(0, limit) : [];
      return json(res, 200, { reviews, hasMore });
    }

    if (req.method === "POST") {
      const { category, reviewText, contactType, contact, website } = req.body || {};

      // Honeypot: real users never see/fill this field. Bots that do receive a generic success response.
      if (String(website || "").trim()) return json(res, 201, { ok: true });

      const cleanCategory = String(category || "").trim();
      const cleanReview = String(reviewText || "").trim();
      const cleanContactType = String(contactType || "").trim().toLowerCase();
      const cleanContact = String(contact || "").trim();

      if (!ALLOWED_CATEGORIES.has(cleanCategory)) return json(res, 400, { error: "Please choose a valid consultation category." });
      if (cleanReview.length < 20 || cleanReview.length > 2000) return json(res, 400, { error: "Review must be between 20 and 2000 characters." });
      if (!["whatsapp", "email"].includes(cleanContactType)) return json(res, 400, { error: "Please choose WhatsApp or email for verification." });
      if (cleanContact.length < 5 || cleanContact.length > 320) return json(res, 400, { error: "Please enter a valid private verification contact." });

      const response = await fetch(`${url}/rest/v1/rpc/submit_review`, {
        method: "POST",
        headers: {
          apikey: secret,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          p_category: cleanCategory,
          p_review_text: cleanReview,
          p_contact_type: cleanContactType,
          p_verification_contact: cleanContact,
        }),
      });

      if (!response.ok) {
        console.error("Supabase review submission failed:", response.status, await response.text());
        return json(res, 500, { error: "Unable to submit your review right now. Please try again." });
      }

      const rpcPayload = await response.json();
      const reviewId = normalizeRpcUuid(rpcPayload);
      if (!reviewId) {
        console.error("Review was created but its ID could not be read from the RPC response");
        return json(res, 201, { ok: true, notificationSent: false });
      }

      let notificationSent = false;
      try {
        const token = await createModerationToken({ url, secret, reviewId });
        notificationSent = await sendModerationEmail({
          reviewId,
          token,
          category: cleanCategory,
          reviewText: cleanReview,
          contactType: cleanContactType,
          contact: cleanContact,
        });
      } catch (notificationError) {
        // Never lose a genuine review because email/token delivery has a temporary problem.
        console.error("Review saved, but moderation notification setup failed:", notificationError);
      }

      return json(res, 201, { ok: true, notificationSent });
    }

    res.setHeader("Allow", "GET, POST");
    return json(res, 405, { error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    return json(res, 500, { error: "Server error. Please try again later." });
  }
}
