import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_EMAIL = 'contact@global-internships.com';
const ADMIN_PASSWORD = 'OTC';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export async function createSession(): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  
  const { query } = await import('./db');
  await query(
    'INSERT INTO admin_sessions (token, expires_at) VALUES ($1, $2)',
    [token, expiresAt]
  );
  
  return token;
}

export async function validateSession(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  
  const { query } = await import('./db');
  const result = await query(
    'SELECT * FROM admin_sessions WHERE token = $1 AND expires_at > NOW()',
    [token]
  );
  
  return result.rows.length > 0;
}

export async function deleteSession(token: string): Promise<void> {
  const { query } = await import('./db');
  await query('DELETE FROM admin_sessions WHERE token = $1', [token]);
}

export async function login(email: string, password: string): Promise<{ success: boolean; token?: string }> {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = await createSession();
    return { success: true, token };
  }
  return { success: false };
}

export async function getSessionFromCookies(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');
    return sessionCookie?.value || null;
  } catch (error) {
    return null;
  }
}

