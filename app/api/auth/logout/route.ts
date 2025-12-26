import { NextRequest, NextResponse } from 'next/server';
import { deleteSession, getSessionFromCookies } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = await getSessionFromCookies();
    
    if (token) {
      await deleteSession(token);
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete('admin_session');
    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}

