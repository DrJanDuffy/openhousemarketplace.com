import { anthropic } from '@ai-sdk/anthropic'
import { streamText, type ModelMessage } from 'ai'
import { z } from 'zod'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

const DEFAULT_MODEL = 'claude-sonnet-4-20250514'

const bodySchema = z.object({
  messages: z.array(z.unknown()).max(50),
})

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response('AI is not configured for this deployment', { status: 503 })
  }

  const ip = getClientIp(req)
  const limited = checkRateLimit(`api:chat:${ip}`, 30, 60_000)
  if (!limited.ok) {
    return new Response('Too many requests', {
      status: 429,
      headers: { 'Retry-After': String(limited.retryAfterSec) },
    })
  }

  let body: z.infer<typeof bodySchema>
  try {
    body = bodySchema.parse(await req.json())
  } catch {
    return new Response('Invalid request body', { status: 400 })
  }

  const modelId = process.env.ANTHROPIC_MODEL?.trim() || DEFAULT_MODEL

  try {
    const result = streamText({
      model: anthropic(modelId),
      maxOutputTokens: 2048,
      system:
        'You are a Las Vegas real estate expert focused on Summerlin, open houses, and ethical, fair-housing-compliant guidance.',
      messages: body.messages as ModelMessage[],
    })
    return result.toUIMessageStreamResponse()
  } catch (e) {
    console.error('[api/chat]', e)
    return new Response('Upstream model error', { status: 502 })
  }
}
