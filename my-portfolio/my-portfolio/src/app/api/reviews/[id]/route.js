import { NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// PUT /api/reviews/[id]
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const auth = request.headers.get('authorization') || '';
    const res = await fetch(`${BACKEND}/api/reviews/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: auth },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to reach backend.' }, { status: 502 });
  }
}

// DELETE /api/reviews/[id]
export async function DELETE(request, { params }) {
  try {
    const auth = request.headers.get('authorization') || '';
    const res = await fetch(`${BACKEND}/api/reviews/${params.id}`, {
      method: 'DELETE',
      headers: { Authorization: auth },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to reach backend.' }, { status: 502 });
  }
}
