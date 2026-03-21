/**
 * Google My Maps embed (Maps Engine legacy "My Maps" share → embed).
 * Override in Vercel with NEXT_PUBLIC_GOOGLE_MY_MAPS_EMBED_URL if the map ID changes.
 */
export const DEFAULT_GOOGLE_MY_MAPS_EMBED_URL =
  'https://www.google.com/maps/d/embed?mid=1b94nsahE3WHPXPCBciaB2wU0BPEsMhc&hl=en&ehbc=2E312F'

export function getGoogleMyMapsEmbedUrl(): string {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_MY_MAPS_EMBED_URL
  if (typeof raw === 'string' && raw.trim() !== '') {
    return raw.trim()
  }
  return DEFAULT_GOOGLE_MY_MAPS_EMBED_URL
}
