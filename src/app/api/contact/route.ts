import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const GAS_URL = 'https://script.google.com/macros/s/AKfycbxd3PMsdVQzhSvCNDuZtXb4rLwBGhnYFXcOZfDZemdXfyd6apt3Xf_RYp99BjcQXlju/exec';
const HR_EMAIL = 'digitalmoreyeahs@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { resumeBase64, resumeMimeType, resumeFileName, ...gasPayload } = payload;

    console.log('[contact] formType:', payload.formType);
    console.log('[contact] hasResume:', !!resumeBase64, 'fileName:', resumeFileName);

    // ── 1. Send text data to GAS ─────────────────────────────────────────
    fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gasPayload),
    }).catch((e) => console.error('[GAS]', e));

    // ── 2. Send resume as email attachment via Nodemailer ────────────────
    if (payload.formType === 'Careers') {
      if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.error('[contact] Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars');
      } else {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        const mailOptions: nodemailer.SendMailOptions = {
          from: `"MoreYeahs Careers" <${process.env.GMAIL_USER}>`,
          to: HR_EMAIL,
          subject: `Job Application: ${payload.name} — ${payload.role || 'Role'}`,
          text:
            `Role: ${payload.role || ''}\n` +
            `Name: ${payload.name || ''}\n` +
            `Email: ${payload.email || ''}\n` +
            `Phone: ${payload.phone || ''}\n` +
            `Cover Note: ${payload.coverNote || ''}\n\n` +
            (resumeBase64 ? 'Resume attached.' : 'No resume attached.'),
        };

        if (resumeBase64 && resumeFileName) {
          const pdfBuffer = Buffer.from(resumeBase64, 'base64');
          mailOptions.attachments = [
            {
              filename: resumeFileName,
              content: pdfBuffer,
              contentType: resumeMimeType || 'application/pdf',
            },
          ];
        }

        await transporter.sendMail(mailOptions);
        console.log('[contact] Email sent to', HR_EMAIL);
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('[/api/contact]', err);
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
