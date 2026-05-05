import { NextRequest, NextResponse } from 'next/server';

const WP_BASE = (process.env.NEXT_PUBLIC_WP_API_URL ?? 'https://dev.moreyeahs.com') + '/wp-json/wp/v2';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const wpPath = path.join('/');
  const search = req.nextUrl.search;
  const url = `${WP_BASE}/${wpPath}${search}`;

  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    const data = await res.json();

    return NextResponse.json(data, {
      status: res.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 's-maxage=600, stale-while-revalidate=60',
      },
    });
  } catch (err) {
    console.error('[wp-proxy]', err);
    return NextResponse.json({ error: 'Failed to fetch from WordPress' }, { status: 500 });
  }
}
