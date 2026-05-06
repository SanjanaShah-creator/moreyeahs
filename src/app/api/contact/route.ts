import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const GAS_URL = 'https://script.google.com/macros/s/AKfycbxd3PMsdVQzhSvCNDuZtXb4rLwBGhnYFXcOZfDZemdXfyd6apt3Xf_RYp99BjcQXlju/exec';

const HR_EMAIL = 'digitalmoreyeahs@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { resumeBase64, resumeMimeType, resumeFileName, ...gasPayload } = payload;

    // ── 1. Send text data to GAS (sheet + basic email) ───────────────────
    fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gasPayload),
    }).catch(() => {});

    // ── 2. If careers form with resume, send email with PDF attachment ────
    if (payload.formType === 'Careers' && resumeBase64 && resumeFileName) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const pdfBuffer = Buffer.from(resumeBase64, 'base64');

      await transporter.sendMail({
        from: `"MoreYeahs Careers" <${process.env.GMAIL_USER}>`,
        to: HR_EMAIL,
        subject: `Resume: ${payload.name} — ${payload.role || 'Job Application'}`,
        text:
          `Role: ${payload.role || ''}\n` +
          `Name: ${payload.name || ''}\n` +
          `Email: ${payload.email || ''}\n` +
          `Phone: ${payload.phone || ''}\n` +
          `Cover Note: ${payload.coverNote || ''}\n\n` +
          `Resume attached.`,
        attachments: [
          {
            filename: resumeFileName,
            content: pdfBuffer,
            contentType: resumeMimeType || 'application/pdf',
          },
        ],
      });
    }

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('[/api/contact]', err);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
