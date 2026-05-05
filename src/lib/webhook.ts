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
  // Route through our own Next.js API — avoids CORS and no-cors body stripping
  await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
