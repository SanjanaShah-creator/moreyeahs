// ─── MoreYeahs Contact Webhook — Google Apps Script ──────────────────────────
//
// SETUP (one-time, ~3 min):
//  1. Go to https://script.google.com and create a new project.
//  2. Paste this entire file into the editor.
//  3. Change SHEET_ID below to your Google Sheet's ID
//     (found in the Sheet URL: docs.google.com/spreadsheets/d/SHEET_ID/edit)
//  4. Change NOTIFY_EMAIL if needed (currently digitalmoreyeahs@gmail.com).
//  5. Click Deploy → New deployment → Web app.
//     - Execute as: Me
//     - Who has access: Anyone
//  6. Click Deploy, authorise when prompted, then copy the Web app URL.
//  7. Paste that URL into src/lib/webhook.ts as the WEBHOOK_URL constant.
//
// Each submission:
//  • Appends a new row to the "Submissions" sheet.
//  • Sends an email notification to NOTIFY_EMAIL with the full row data.
// ─────────────────────────────────────────────────────────────────────────────

var SHEET_ID     = 'YOUR_GOOGLE_SHEET_ID_HERE';
var NOTIFY_EMAIL = 'digitalmoreyeahs@gmail.com';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName('Submissions') || ss.insertSheet('Submissions');

    // Write headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Form Type', 'Name', 'Email', 'Phone',
        'Company', 'Service / Role', 'Message / Cover Note', 'Resource / Extra',
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }

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
    ];

    sheet.appendRow(row);

    // Build a readable email body
    var emailBody =
      'New submission received on the MoreYeahs website.\n\n' +
      '──────────────────────────────\n' +
      row.map(function(val, i) {
        var labels = [
          'Timestamp', 'Form Type', 'Name', 'Email', 'Phone',
          'Company', 'Service / Role', 'Message', 'Extra',
        ];
        return labels[i] + ': ' + val;
      }).join('\n') +
      '\n──────────────────────────────\n\n' +
      'View all submissions: https://docs.google.com/spreadsheets/d/' + SHEET_ID;

    GmailApp.sendEmail(
      NOTIFY_EMAIL,
      '[MoreYeahs] New ' + (data.formType || 'Form') + ' submission — ' + (data.name || data.email),
      emailBody
    );

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
