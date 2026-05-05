import { NextRequest, NextResponse } from 'next/server';

const GAS_URL = 'https://script.google.com/macros/s/AKfycbxd3PMsdVQzhSvCNDuZtXb4rLwBGhnYFXcOZfDZemdXfyd6apt3Xf_RYp99BjcQXlju/exec';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Server-side fetch to GAS — no CORS restrictions
    const res = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    return NextResponse.json({ status: 'ok', gas: text });
  } catch (err) {
    console.error('[/api/contact]', err);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
