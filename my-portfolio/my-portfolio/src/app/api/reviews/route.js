import { NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// GET /api/reviews — public listing (proxy to backend)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const params = searchParams.toString();
  try {
    const res = await fetch(`${BACKEND}/api/reviews${params ? `?${params}` : ''}`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to reach backend.' }, { status: 502 });
  }
}

// POST /api/reviews — admin create (proxy, forwards auth header)
export async function POST(request) {
  try {
    const body = await request.json();
    const auth = request.headers.get('authorization') || '';
    const res = await fetch(`${BACKEND}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: auth },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to reach backend.' }, { status: 502 });
  }
}
