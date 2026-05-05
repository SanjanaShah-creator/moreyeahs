import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    await query(
      `INSERT INTO form_submissions
         (form_type, name, email, phone, company, service, role, message, cover_note, resource, extra)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        data.formType   ?? null,
        data.name       ?? null,
        data.email      ?? null,
        data.phone      ?? null,
        data.company    ?? null,
        data.service    ?? null,
        data.role       ?? null,
        data.message    ?? null,
        data.coverNote  ?? null,
        data.resource   ?? null,
        data.extra      ?? null,
      ],
    );

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('[/api/submit]', err);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
