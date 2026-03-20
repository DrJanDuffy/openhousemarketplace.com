import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

const bodySchema = z.object({
  message: z.string().min(1).max(32_000),
  systemPrompt: z.string().max(16_000).optional(),
})

/** Default model; override via ANTHROPIC_MODEL in Vercel if needed */
const DEFAULT_MODEL = 'claude-sonnet-4-20250514'

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'AI is not configured for this deployment' }, { status: 503 })
  }

  const ip = getClientIp(req)
  const limited = checkRateLimit(`api:claude:${ip}`, 30, 60_000)
  if (!limited.ok) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSec) } },
    )
  }

  let parsed: z.infer<typeof bodySchema>
  try {
    parsed = bodySchema.parse(await req.json())
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const client = new Anthropic({ apiKey })
  const model = process.env.ANTHROPIC_MODEL?.trim() || DEFAULT_MODEL

  try {
    const response = await client.messages.create({
      model,
      max_tokens: 1024,
      system:
        parsed.systemPrompt ??
        'You are a helpful Las Vegas real estate expert focused on Summerlin and the greater Las Vegas area.',
      messages: [{ role: 'user', content: parsed.message }],
    })

    const block = response.content[0]
    const text = block?.type === 'text' ? block.text : ''

    return NextResponse.json({ response: text })
  } catch (e) {
    console.error('[api/claude]', e)
    return NextResponse.json({ error: 'Upstream model error' }, { status: 502 })
  }
}
