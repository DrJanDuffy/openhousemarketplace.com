import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'

const ADMIN_COOKIE = 'oh-admin-auth'
const ADMIN_COOKIE_SALT = 'oh-admin-signin'

function getAdminCookieValue(password: string): string {
  return crypto.createHash('sha256').update(password + ADMIN_COOKIE_SALT).digest('hex')
}

export async function POST(request: NextRequest) {
  const expected = process.env.OPEN_HOUSE_ADMIN_PASSWORD
  if (!expected) {
    return NextResponse.json({ error: 'Admin not configured' }, { status: 503 })
  }
  let body: { password?: string }
  try {
    body = (await request.json()) as { password?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }
  const password = typeof body.password === 'string' ? body.password : ''
  if (password !== expected) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE, getAdminCookieValue(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  })
  return NextResponse.json({ success: true })
}
