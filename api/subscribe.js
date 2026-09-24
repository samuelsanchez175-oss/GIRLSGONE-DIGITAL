const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizePhone(rawPhone) {
  let digits = String(rawPhone || "").replace(/\D/g, "");
  if (digits.length === 11 && digits.charAt(0) === "1") digits = digits.slice(1);
  return digits;
}

function readBody(req) {
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch (err) {
      return null;
    }
  }
  if (req.body && typeof req.body === "object") return req.body;
  return null;
}

async function postToSheet(webhookUrl, payload) {
  const init = {
    method: "POST",
    redirect: "manual",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  };
  let response = await fetch(webhookUrl, init);
  if (response.status >= 300 && response.status < 400) {
    const nextUrl = response.headers.get("location");
    if (!nextUrl) throw new Error("Signup sheet did not return a result.");
    response = await fetch(nextUrl, { method: "GET", redirect: "follow" });
  }
  return response;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const webhookUrl = process.env.GGD_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(503).json({ error: "Signup storage is not connected yet." });
  }

  const body = readBody(req);
  if (!body) return res.status(400).json({ error: "Missing signup details." });

  const email = String(body.email || "").trim().toLowerCase();
  const phone = normalizePhone(body.phone);
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Enter a valid email address." });
  }
  if (phone.length !== 10) {
    return res.status(400).json({ error: "Enter a valid 10-digit phone number." });
  }

  const payload = {
    secret: process.env.GGD_SHEETS_SECRET || "",
    email: email,
    phone: phone,
    path: String(body.path || "").slice(0, 300),
    source: "subscribe-popup",
    submittedAt: new Date().toISOString(),
  };

  let response;
  try {
    response = await postToSheet(webhookUrl, payload);
  } catch (err) {
    return res.status(502).json({ error: "Could not reach the signup sheet." });
  }

  let result = null;
  const raw = await response.text();
  try {
    result = JSON.parse(raw);
  } catch (err) {
    result = null;
  }
  if (!response.ok || !result || result.ok !== true) {
    const message = result && result.error ? result.error : "Could not save your signup.";
    return res.status(502).json({ error: message });
  }

  return res.status(200).json({ ok: true });
};
