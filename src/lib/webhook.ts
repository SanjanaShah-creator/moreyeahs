// Google Apps Script URL – fallback for email notifications (optional).
// See scripts/moreyeahs-webhook.gs for setup. Leave as-is until you deploy it.
const GAS_URL = 'https://script.google.com/macros/s/AKfycbxd3PMsdVQzhSvCNDuZtXb4rLwBGhnYFXcOZfDZemdXfyd6apt3Xf_RYp99BjcQXlju/exec';

type FormPayload = {
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
};

export async function submitForm(payload: FormPayload): Promise<void> {
  // Save to PostgreSQL via local API route
  await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  // Also fire Google Apps Script for email notification (no-cors, best-effort)
  if (!GAS_URL.includes('YOUR_DEPLOYMENT_ID')) {
    fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }
}