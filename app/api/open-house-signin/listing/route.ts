import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { kv } from '@vercel/kv'

const LISTING_PREFIX = 'oh-signin:listing:'
const ADMIN_COOKIE = 'oh-admin-auth'
const ADMIN_COOKIE_SALT = 'oh-admin-signin'

function getAdminCookieValue(): string | null {
  const password = process.env.OPEN_HOUSE_ADMIN_PASSWORD
  if (!password) return null
  return crypto.createHash('sha256').update(password + ADMIN_COOKIE_SALT).digest('hex')
}

function isAdminAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get(ADMIN_COOKIE)?.value
  const expected = getAdminCookieValue()
  return !!expected && cookie === expected
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  let body: { listingId?: string; listingAddress?: string }
  try {
    body = (await request.json()) as { listingId?: string; listingAddress?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }
  const listingId = typeof body.listingId === 'string' ? body.listingId.trim() : ''
  if (!listingId) {
    return NextResponse.json({ error: 'listingId required' }, { status: 400 })
  }
  const listingAddress = typeof body.listingAddress === 'string' ? body.listingAddress.trim() : ''
  try {
    await kv.set(`${LISTING_PREFIX}${listingId}`, { listingAddress })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('KV set listing error:', err)
    return NextResponse.json({ error: 'Failed to save listing' }, { status: 503 })
  }
}
