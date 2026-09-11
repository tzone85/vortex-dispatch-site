const FIELD_LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  role: 160,
  stack: 800,
  pilotGoal: 2400,
  message: 4000,
};

function asText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function attributionRows(attribution = {}) {
  const allowed = [
    ["utm_source", "UTM source"],
    ["utm_medium", "UTM medium"],
    ["utm_campaign", "UTM campaign"],
    ["utm_content", "UTM content"],
    ["utm_term", "UTM term"],
    ["referrer", "Referrer"],
    ["landing_page", "Landing page"],
  ];

  return allowed
    .map(([key, label]) => {
      const value = asText(attribution[key], 500);
      return value
        ? `<tr><td style="padding:6px 12px 6px 0;color:#64748b;vertical-align:top">${label}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`
        : "";
    })
    .join("");
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: "Invalid request" });
    }
  }

  if (!body || typeof body !== "object") {
    return res.status(400).json({ ok: false, error: "Invalid request" });
  }

  // Honeypot. Humans never see or fill this field.
  if (asText(body.website, 200)) {
    return res.status(200).json({ ok: true, ignored: true });
  }

  const startedAt = Number(body.formStartedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 1500) {
    return res.status(429).json({ ok: false, error: "Please try again." });
  }

  const name = asText(body.name, FIELD_LIMITS.name);
  const email = asText(body.email, FIELD_LIMITS.email).toLowerCase();
  const company = asText(body.company, FIELD_LIMITS.company);
  const role = asText(body.role, FIELD_LIMITS.role);
  const stack = asText(body.stack, FIELD_LIMITS.stack);
  const pilotGoal = asText(body.pilotGoal, FIELD_LIMITS.pilotGoal);
  const message = asText(body.message, FIELD_LIMITS.message);

  if (!name || !company || !role || !pilotGoal || !validEmail(email)) {
    return res.status(400).json({
      ok: false,
      error: "Please complete the required fields with a valid work email.",
    });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const to = (process.env.LEAD_TO_EMAIL || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (!resendApiKey || !from || to.length === 0) {
    console.error("Engineering Pilot mail delivery is not configured.");
    return res.status(503).json({
      ok: false,
      error: "Lead delivery is temporarily unavailable. Please email hello@vortexdispatch.co.za.",
      code: "mail_not_configured",
    });
  }

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.55;color:#0f172a">
      <h1 style="font-size:22px;margin:0 0 18px">New Engineering Pilot enquiry</h1>
      <table style="border-collapse:collapse;width:100%;max-width:760px">
        <tr><td style="padding:6px 12px 6px 0;color:#64748b;width:150px">Name</td><td style="padding:6px 0">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#64748b">Email</td><td style="padding:6px 0">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#64748b">Company</td><td style="padding:6px 0">${escapeHtml(company)}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#64748b">Role</td><td style="padding:6px 0">${escapeHtml(role)}</td></tr>
        ${stack ? `<tr><td style="padding:6px 12px 6px 0;color:#64748b;vertical-align:top">Stack / repository</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(stack)}</td></tr>` : ""}
        <tr><td style="padding:6px 12px 6px 0;color:#64748b;vertical-align:top">Pilot goal</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(pilotGoal)}</td></tr>
        ${message ? `<tr><td style="padding:6px 12px 6px 0;color:#64748b;vertical-align:top">Additional context</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(message)}</td></tr>` : ""}
        ${attributionRows(body.attribution)}
      </table>
      <p style="margin-top:24px;color:#64748b;font-size:13px">Submitted via vortexdispatch.co.za/engineering-pilot</p>
    </div>`;

  let resendResponse;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `Engineering Pilot lead: ${company} — ${name}`,
        html,
      }),
    });
  } catch (error) {
    console.error("Resend request failed", error);
    return res.status(502).json({
      ok: false,
      error: "We could not submit the enquiry. Please email hello@vortexdispatch.co.za.",
    });
  }

  if (!resendResponse.ok) {
    const details = await resendResponse.text();
    console.error("Resend rejected Engineering Pilot lead", resendResponse.status, details);
    return res.status(502).json({
      ok: false,
      error: "We could not submit the enquiry. Please email hello@vortexdispatch.co.za.",
    });
  }

  return res.status(200).json({ ok: true });
}
