/**
 * Facebook / Meta integration — Pixel + App ID (optional env).
 * Official page URL: FACEBOOK_PAGE_URL in config/gbp.ts
 */

export function getFacebookPixelId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
  return typeof id === 'string' && id.trim() !== '' ? id.trim() : undefined
}

export function getFacebookAppId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
  return typeof id === 'string' && id.trim() !== '' ? id.trim() : undefined
}
