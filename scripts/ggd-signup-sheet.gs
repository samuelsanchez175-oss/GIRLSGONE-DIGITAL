/**
 * Girls Gone Digital signup sheet.
 * Paste into Extensions → Apps Script on the Google Sheet, then deploy as a web app.
 * Script property SIGNUP_SECRET must match the Vercel env var GGD_SHEETS_SECRET.
 */
var SPREADSHEET_ID = "1cfXzf1oQNvwffBVHMzb5lPApG-0euNzER0OOk6T9Ux0";
var SHEET_NAME = "Signups";
var HEADERS = ["Submitted at", "Email", "Phone", "Page", "Source", "Status", "Notes"];
var WRITTEN_COLUMNS = 5;

function doPost(e) {
  try {
    var body = JSON.parse((e.postData && e.postData.contents) || "{}");
    var expected = PropertiesService.getScriptProperties().getProperty("SIGNUP_SECRET");
    if (!expected || body.secret !== expected) {
      return json_({ ok: false, error: "Unauthorized." });
    }

    var email = String(body.email || "").trim().toLowerCase();
    var phone = String(body.phone || "").replace(/\D/g, "");
    if (phone.length === 11 && phone.charAt(0) === "1") phone = phone.slice(1);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length !== 10) {
      return json_({ ok: false, error: "Enter a valid email and phone number." });
    }

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var sheet = getSheet_();
      var row = findEmailRow_(sheet, email);
      var record = [
        body.submittedAt || new Date().toISOString(),
        email,
        "+1" + phone,
        String(body.path || ""),
        String(body.source || "subscribe-popup"),
      ];
      if (row === -1) sheet.appendRow(record);
      else sheet.getRange(row, 1, 1, WRITTEN_COLUMNS).setValues([record]);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: "Could not save your signup." });
  }
}

function getSheet_() {
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  return sheet;
}

function findEmailRow_(sheet, email) {
  var last = sheet.getLastRow();
  if (last < 2) return -1;
  var emails = sheet.getRange(2, 2, last - 1, 1).getValues();
  for (var i = 0; i < emails.length; i++) {
    if (String(emails[i][0]).trim().toLowerCase() === email) return i + 2;
  }
  return -1;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
