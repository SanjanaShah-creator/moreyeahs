import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const GAS_URL = 'https://script.google.com/macros/s/AKfycbxd3PMsdVQzhSvCNDuZtXb4rLwBGhnYFXcOZfDZemdXfyd6apt3Xf_RYp99BjcQXlju/exec';
const TEAM_EMAIL = 'digitalmoreyeahs@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { resumeBase64, resumeMimeType, resumeFileName, ...gasPayload } = payload;

    console.log('[contact] formType:', payload.formType);

    // ── 1. Always send to GAS (Google Sheets) ───────────────────────────
    fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gasPayload),
    }).catch((e) => console.error('[GAS]', e));

    // ── 2. Email handling via Nodemailer ─────────────────────────────────
    const needsEmail = payload.formType === 'Careers' || payload.formType === 'Newsletter Subscription';
    if (needsEmail) {
      const appPassword = process.env.GMAIL_APP_PASSWORD;
      if (!process.env.GMAIL_USER || !appPassword || appPassword === 'your_app_password_here') {
        console.error('[contact] GMAIL_APP_PASSWORD is missing or still set to placeholder — email not sent');
        return NextResponse.json({ status: 'error', message: 'Email credentials not configured on server' }, { status: 500 });
      } else {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
        });

        // ── Newsletter: notify team + confirmation to subscriber ──
        if (payload.formType === 'Newsletter Subscription') {
          await transporter.sendMail({
            from: `"MoreYeahs Website" <${process.env.GMAIL_USER}>`,
            to: TEAM_EMAIL,
            subject: `New Newsletter Subscriber: ${payload.email}`,
            text: `New subscriber: ${payload.email}\nName: ${payload.name || 'Not provided'}`,
          });
          await transporter.sendMail({
            from: `"MoreYeahs IT Technologies" <${process.env.GMAIL_USER}>`,
            to: payload.email,
            subject: "You're subscribed to MoreYeahs Insights",
            html: `<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#fff">
              <h2 style="font-size:22px;font-weight:800;color:#0F0F0F;margin-bottom:12px">You're in!</h2>
              <p style="font-size:15px;color:#7A7A7A;line-height:1.7;margin-bottom:24px">
                Thanks for subscribing to MoreYeahs Insights. You'll receive our latest articles, case studies, and engineering perspectives — no noise, unsubscribe any time.
              </p>
              <a href="https://www.moreyeahs.com/blog" style="display:inline-block;background:#1A56DB;color:#fff;font-size:14px;font-weight:700;border-radius:10px;padding:12px 24px;text-decoration:none">
                Read Latest Posts →
              </a>
              <p style="font-size:12px;color:#A3A3A3;margin-top:32px">MoreYeahs IT Technologies · Indore, India &amp; Cedar Park, TX</p>
            </div>`,
          });
          console.log('[contact] Newsletter emails sent');
        }

        // ── Careers: send resume to team ──
        if (payload.formType === 'Careers') {
          const mailOptions: nodemailer.SendMailOptions = {
            from: `"MoreYeahs Careers" <${process.env.GMAIL_USER}>`,
            to: TEAM_EMAIL,
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
            mailOptions.attachments = [{
              filename: resumeFileName,
              content: Buffer.from(resumeBase64, 'base64'),
              contentType: resumeMimeType || 'application/pdf',
            }];
          }
          await transporter.sendMail(mailOptions);
          console.log('[contact] Career email sent to', TEAM_EMAIL);
        }
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('[/api/contact]', err);
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
