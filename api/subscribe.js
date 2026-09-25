const crypto = require("crypto");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SPREADSHEET_ID =
  process.env.GGD_SHEETS_SPREADSHEET_ID || "1cfXzf1oQNvwffBVHMzb5lPApG-0euNzER0OOk6T9Ux0";
const SHEET = "Signups";

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

function privateKey() {
  if (process.env.GGD_SHEETS_PRIVATE_KEY_B64) {
    return Buffer.from(process.env.GGD_SHEETS_PRIVATE_KEY_B64, "base64").toString("utf8");
  }
  return String(process.env.GGD_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n");
}

function sheetsReady() {
  return Boolean(process.env.GGD_SHEETS_CLIENT_EMAIL && privateKey());
}

function base64url(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function sheetAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const unsigned = [
    base64url(JSON.stringify({ alg: "RS256", typ: "JWT" })),
    base64url(
      JSON.stringify({
        iss: process.env.GGD_SHEETS_CLIENT_EMAIL,
        scope: "https://www.googleapis.com/auth/spreadsheets",
        aud: "https://oauth2.googleapis.com/token",
        iat: now,
        exp: now + 3600,
      })
    ),
  ].join(".");
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  const signature = signer
    .sign(privateKey())
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: unsigned + "." + signature,
    }),
  });
  const data = await response.json().catch(function () { return {}; });
  if (!response.ok || !data.access_token) {
    throw new Error("Could not authorize the signup sheet.");
  }
  return data.access_token;
}

async function sheetsRequest(token, path, options) {
  const response = await fetch("https://sheets.googleapis.com/v4/spreadsheets/" + SPREADSHEET_ID + path, {
    method: options && options.method ? options.method : "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: options && options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await response.json().catch(function () { return {}; });
  if (!response.ok) {
    throw new Error("Could not save your signup.");
  }
  return data;
}

async function saveToSheet(payload) {
  const token = await sheetAccessToken();
  const existing = await sheetsRequest(
    token,
    "/values/" + encodeURIComponent(SHEET + "!A:B")
  );
  const rows = Array.isArray(existing.values) ? existing.values : [];
  let rowNumber = -1;
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][1] || "").trim().toLowerCase() === payload.email) {
      rowNumber = i + 1;
      break;
    }
  }

  const record = [
    payload.submittedAt,
    payload.email,
    payload.phone,
    payload.path,
    payload.source,
  ];
  if (rowNumber === -1) {
    await sheetsRequest(
      token,
      "/values/" + encodeURIComponent(SHEET + "!A:F") + ":append?valueInputOption=RAW&insertDataOption=INSERT_ROWS",
      { method: "POST", body: { values: [record.concat(["New"])] } }
    );
    return;
  }
  await sheetsRequest(
    token,
    "/values/" + encodeURIComponent(SHEET + "!A" + rowNumber + ":E" + rowNumber) + "?valueInputOption=RAW",
    { method: "PUT", body: { values: [record] } }
  );
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }
  if (!sheetsReady()) {
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

  try {
    await saveToSheet({
      email: email,
      phone: "+1" + phone,
      path: String(body.path || "").slice(0, 300),
      source: "subscribe-popup",
      submittedAt: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(502).json({ error: "Could not save your signup." });
  }

  return res.status(200).json({ ok: true });
};
