import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Form submissions are handled via Google Apps Script webhook.
    // This endpoint is kept for compatibility but does not write to a database.
    await req.json(); // consume body
    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('[/api/submit]', err);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
