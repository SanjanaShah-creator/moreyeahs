import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const GAS_URL = 'https://script.google.com/macros/s/AKfycbxd3PMsdVQzhSvCNDuZtXb4rLwBGhnYFXcOZfDZemdXfyd6apt3Xf_RYp99BjcQXlju/exec';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    console.log('[contact] formType:', payload.formType, '| resumeBase64 bytes:', (payload.resumeBase64?.length ?? 0), '| resumeFileName:', payload.resumeFileName ?? 'none');

    if (payload.formType === 'Careers') {
      // Send full payload to GAS — GAS decodes resumeBase64 and attaches the file itself
      const gasRes = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log('[contact] GAS response status:', gasRes.status);
      return NextResponse.json({ status: 'ok' });
    }

    // ── Non-careers: strip resume fields then send to GAS ───────────────
    const { resumeBase64: _b, resumeMimeType: _m, resumeFileName: _f, ...gasPayload } = payload;
    fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gasPayload),
    }).catch((e) => console.error('[GAS]', e));

    // ── Newsletter: send confirmation to subscriber via Nodemailer ───────
    if (payload.formType === 'Newsletter Subscription') {
      const appPassword = process.env.GMAIL_APP_PASSWORD;
      if (process.env.GMAIL_USER && appPassword && appPassword !== 'your_app_password_here') {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.GMAIL_USER, pass: appPassword },
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
        console.log('[contact] Newsletter confirmation sent to', payload.email);
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('[/api/contact]', err);
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
