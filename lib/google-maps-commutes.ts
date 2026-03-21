/**
 * Google Maps Platform Commutes solution (hosted HTML on Cloud Storage).
 * Override in Vercel with NEXT_PUBLIC_GOOGLE_MAPS_COMMUTES_EMBED_URL if the deployment URL changes.
 */
export const DEFAULT_GOOGLE_MAPS_COMMUTES_EMBED_URL =
  'https://storage.googleapis.com/maps-solutions-v9iuebxrqf/commutes/ampv/commutes.html'

export function getGoogleMapsCommutesEmbedUrl(): string {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_MAPS_COMMUTES_EMBED_URL
  if (typeof raw === 'string' && raw.trim() !== '') {
    return raw.trim()
  }
  return DEFAULT_GOOGLE_MAPS_COMMUTES_EMBED_URL
}
