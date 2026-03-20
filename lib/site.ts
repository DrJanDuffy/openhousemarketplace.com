/**
 * Canonical public site origin (no trailing slash).
 * Set NEXT_PUBLIC_SITE_URL in Vercel for preview deployments; falls back to NEXT_PUBLIC_APP_URL then production default.
 */
const DEFAULT_SITE_URL = 'https://www.openhousemarketplace.com'

function normalizeOrigin(raw: string): string {
  return raw.trim().replace(/\/+$/, '')
}

export function getSiteUrl(): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL
  const app = process.env.NEXT_PUBLIC_APP_URL
  if (typeof site === 'string' && site.trim() !== '') {
    return normalizeOrigin(site)
  }
  if (typeof app === 'string' && app.trim() !== '') {
    return normalizeOrigin(app)
  }
  return DEFAULT_SITE_URL
}
