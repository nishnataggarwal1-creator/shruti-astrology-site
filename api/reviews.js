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
      const { category, reviewText, contactType, contact } = req.body || {};
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

      return json(res, 201, { ok: true });
    }

    res.setHeader("Allow", "GET, POST");
    return json(res, 405, { error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    return json(res, 500, { error: "Server error. Please try again later." });
  }
}
