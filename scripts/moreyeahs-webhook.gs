// ─── MoreYeahs Webhook — Google Apps Script ──────────────────────────────────
//
// SETUP (one-time, ~5 min):
//  1. Go to https://script.google.com and open your existing project (or create new).
//  2. Replace the entire file with this script.
//  3. Set SHEET_ID to your Google Sheet ID.
//  4. Set DRIVE_FOLDER_ID to a Google Drive folder ID where resumes will be saved.
//     (Create a folder in Drive, open it, copy the ID from the URL)
//  5. Set NOTIFY_EMAIL to the HR email address.
//  6. Click Deploy → New deployment (or update existing) → Web app.
//     - Execute as: Me
//     - Who has access: Anyone
//  7. Copy the Web app URL and paste into src/lib/webhook.ts as GAS_URL.
// ─────────────────────────────────────────────────────────────────────────────

var SHEET_ID       = 'YOUR_GOOGLE_SHEET_ID_HERE';
var DRIVE_FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID_HERE';
var NOTIFY_EMAIL   = 'digitalmoreyeahs@gmail.com';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // ── 1. Save resume/PDF to Google Drive (if provided) ──────────────────
    var resumeLink = '';
    if (data.resumeBase64 && data.resumeFileName) {
      try {
        var folder    = DriveApp.getFolderById(DRIVE_FOLDER_ID);
        var decoded   = Utilities.base64Decode(data.resumeBase64);
        var blob      = Utilities.newBlob(decoded, data.resumeMimeType || 'application/pdf', data.resumeFileName);
        var file      = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        resumeLink    = file.getUrl();
      } catch (driveErr) {
        resumeLink = 'Upload failed: ' + driveErr.toString();
      }
    }

    // ── 2. Append row to Google Sheet ─────────────────────────────────────
    var ss    = SpreadsheetApp.openById(SHEET_ID);

    // Contact / general submissions sheet
    var sheet = ss.getSheetByName('Submissions') || ss.insertSheet('Submissions');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Form Type', 'Name', 'Email', 'Phone',
        'Company', 'Service / Role', 'Message / Cover Note', 'Extra', 'Resume Link',
      ]);
      sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
    }

    // Careers applications get their own sheet for HR
    if (data.formType === 'Careers') {
      var hrSheet = ss.getSheetByName('Job Applications') || ss.insertSheet('Job Applications');
      if (hrSheet.getLastRow() === 0) {
        hrSheet.appendRow([
          'Timestamp', 'Role Applied', 'Name', 'Email', 'Phone',
          'Cover Note', 'Resume File', 'Resume Link',
        ]);
        hrSheet.getRange(1, 1, 1, 8).setFontWeight('bold');
        hrSheet.setColumnWidth(8, 300);
      }
      hrSheet.appendRow([
        new Date().toISOString(),
        data.role        || '',
        data.name        || '',
        data.email       || '',
        data.phone       || '',
        data.coverNote   || '',
        data.resumeFileName || data.extra || '',
        resumeLink,
      ]);
    }

    // Always write to main Submissions sheet too
    var row = [
      new Date().toISOString(),
      data.formType    || '',
      data.name        || '',
      data.email       || '',
      data.phone       || '',
      data.company     || '',
      data.service     || data.role     || '',
      data.message     || data.coverNote || '',
      data.resource    || data.extra    || '',
      resumeLink,
    ];
    sheet.appendRow(row);

    // ── 3. Send email notification ────────────────────────────────────────
    var subject = '[MoreYeahs] New ' + (data.formType || 'Form') + ' — ' + (data.name || data.email);

    var emailBody =
      'New submission on the MoreYeahs website.\n\n' +
      '──────────────────────────────\n' +
      'Timestamp : ' + new Date().toISOString() + '\n' +
      'Form Type : ' + (data.formType  || '') + '\n' +
      'Name      : ' + (data.name      || '') + '\n' +
      'Email     : ' + (data.email     || '') + '\n' +
      'Phone     : ' + (data.phone     || '') + '\n' +
      'Company   : ' + (data.company   || '') + '\n' +
      'Role      : ' + (data.role || data.service || '') + '\n' +
      'Message   : ' + (data.message || data.coverNote || '') + '\n' +
      'Extra     : ' + (data.extra     || '') + '\n' +
      (resumeLink ? 'Resume    : ' + resumeLink + '\n' : '') +
      '──────────────────────────────\n\n' +
      'Sheet: https://docs.google.com/spreadsheets/d/' + SHEET_ID;

    GmailApp.sendEmail(NOTIFY_EMAIL, subject, emailBody);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', resumeLink: resumeLink }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
