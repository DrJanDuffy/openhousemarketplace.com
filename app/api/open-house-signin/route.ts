import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { kv } from '@vercel/kv'
import followupBossService from '@/lib/followupboss-service'
import {
  parseOpenHouseSignInBody,
  type OpenHouseSignIn,
} from '@/lib/open-house-signin-schema'

const LISTING_PREFIX = 'oh-signin:listing:'
const SUBMISSIONS_PREFIX = 'oh-signin:submissions:'
const SUBMISSION_PREFIX = 'oh-signin:submission:'
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

function getClientIp(request: NextRequest): string | undefined {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    undefined
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = parseOpenHouseSignInBody(body)
    const id = crypto.randomUUID()
    const submittedAt = new Date().toISOString()
    const ipAddress = getClientIp(request)

    const record: OpenHouseSignIn = {
      id,
      listingId: parsed.listingId,
      listingAddress: parsed.listingAddress ?? '',
      fullName: parsed.fullName,
      email: parsed.email,
      phone: parsed.phone,
      workingWithAgent: parsed.workingWithAgent,
      agentName: parsed.agentName,
      hearAboutSource: parsed.hearAboutSource,
      preApproved: parsed.preApproved,
      purchaseTimeline: parsed.purchaseTimeline,
      interestedNeighborhoods: parsed.interestedNeighborhoods,
      submittedAt,
      ipAddress,
    }

    try {
      await kv.set(`${SUBMISSION_PREFIX}${id}`, record)
      await kv.lpush(`${SUBMISSIONS_PREFIX}${parsed.listingId}`, id)
      if (parsed.listingAddress) {
        await kv.set(`${LISTING_PREFIX}${parsed.listingId}`, {
          listingAddress: parsed.listingAddress,
        })
      }
    } catch (kvError) {
      console.error('KV storage error:', kvError)
      return NextResponse.json(
        { error: 'Storage unavailable. Please try again.' },
        { status: 503 }
      )
    }

    const fubResult = await followupBossService.sendRegistrationEvent({
      fullName: parsed.fullName,
      email: parsed.email,
      phone: parsed.phone,
      listingAddress: parsed.listingAddress,
      tags: ['Open House Lead', 'Summerlin'],
      customFields: {
        openHouseAddress: parsed.listingAddress ?? '',
        preApproved: parsed.preApproved,
        timeline: parsed.purchaseTimeline,
        hearAbout: parsed.hearAboutSource,
        workingWithAgent: parsed.workingWithAgent ? 'Yes' : 'No',
        agentName: parsed.agentName ?? '',
        interestedNeighborhoods: (parsed.interestedNeighborhoods ?? []).join(', '),
      },
    })
    if (!fubResult.success) {
      console.warn('FUB Registration event failed:', fubResult.error)
    }

    // TODO: Send email notification to Dr. Jan Duffy (same pattern as app/api/contact/route.ts)
    const emailContent = `Open House Sign-In: ${parsed.fullName} (${parsed.email}) at ${parsed.listingAddress || parsed.listingId}`
    console.log('Open house sign-in (email stub):', emailContent)

    return NextResponse.json({ success: true, id })
  } catch (err) {
    if (err && typeof err === 'object' && 'issues' in err) {
      const msg = (err as { issues: { message: string }[] }).issues
        ?.map((i) => i.message)
        .join('; ')
      return NextResponse.json(
        { error: msg || 'Validation failed' },
        { status: 400 }
      )
    }
    console.error('Open house sign-in API error:', err)
    return NextResponse.json(
      { error: 'Failed to submit sign-in' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const listingId = request.nextUrl.searchParams.get('listingId')?.trim()
  if (!listingId) {
    return NextResponse.json({ ok: true })
  }
  try {
    const ids = (await kv.lrange<string>(`${SUBMISSIONS_PREFIX}${listingId}`, 0, -1)) ?? []
    const submissions: OpenHouseSignIn[] = []
    for (const id of ids) {
      const record = await kv.get<OpenHouseSignIn>(`${SUBMISSION_PREFIX}${id}`)
      if (record) submissions.push(record)
    }
    return NextResponse.json({ submissions })
  } catch (err) {
    console.error('KV list error:', err)
    return NextResponse.json(
      { error: 'Failed to load submissions' },
      { status: 503 }
    )
  }
}
