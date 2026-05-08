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
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Server error ${res.status}`);
  }
}
