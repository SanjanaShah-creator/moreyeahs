// Google Apps Script URL — handles form submissions, email notifications, and Drive uploads.
// See scripts/moreyeahs-webhook.gs for setup instructions.
const GAS_URL = 'https://script.google.com/macros/s/AKfycbxd3PMsdVQzhSvCNDuZtXb4rLwBGhnYFXcOZfDZemdXfyd6apt3Xf_RYp99BjcQXlju/exec';

export type FormPayload = {
  formType: string;
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  role?: string;
  message?: string;
  coverNote?: string;
  resource?: string;
  extra?: string;
  // Resume upload (careers form)
  resumeBase64?: string;
  resumeFileName?: string;
  resumeMimeType?: string;
};

export async function submitForm(payload: FormPayload): Promise<void> {
  // Fire to /api/submit (no-op, kept for compatibility)
  fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {});

  // Send to Google Apps Script — handles Sheet logging, email, and Drive upload
  try {
    await fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // no-cors means we can't read the response — fire and forget
  }
}
