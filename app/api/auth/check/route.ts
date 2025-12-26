import { NextRequest, NextResponse } from 'next/server';
import { validateSession, getSessionFromCookies } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = await getSessionFromCookies();
    const isAuthenticated = await validateSession(token);

    if (isAuthenticated) {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  } catch (error: any) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}

