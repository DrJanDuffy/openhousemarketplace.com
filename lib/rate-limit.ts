/**
 * Minimal in-memory rate limiter for Route Handlers (per-instance; best-effort abuse reduction).
 * For strict global limits, use Redis/KV.
 */
type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now()
  let b = buckets.get(key)
  if (!b || now > b.resetAt) {
    b = { count: 0, resetAt: now + windowMs }
    buckets.set(key, b)
  }
  b.count += 1
  if (b.count > limit) {
    const retryAfterSec = Math.max(1, Math.ceil((b.resetAt - now) / 1000))
    return { ok: false, retryAfterSec }
  }
  return { ok: true }
}

export function getClientIp(request: Request): string {
  const xf = request.headers.get('x-forwarded-for')
  if (xf) {
    const first = xf.split(',')[0]?.trim()
    if (first) return first
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}
