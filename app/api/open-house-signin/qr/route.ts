import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import QRCode from 'qrcode'

const BASE_URL = 'https://www.openhousemarketplace.com'
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

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const listingId = request.nextUrl.searchParams.get('listingId')?.trim()
  if (!listingId) {
    return NextResponse.json({ error: 'listingId required' }, { status: 400 })
  }
  const url = `${BASE_URL}/open-house-signin/${encodeURIComponent(listingId)}`
  try {
    const png = await QRCode.toBuffer(url, { type: 'png', width: 400, margin: 2 })
    return new NextResponse(new Uint8Array(png), {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `inline; filename="open-house-signin-${listingId}.png"`,
      },
    })
  } catch (err) {
    console.error('QR generation error:', err)
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 })
  }
}
