/**
 * Google Maps Platform Neighborhood Discovery solution (hosted HTML on Cloud Storage).
 * Override with NEXT_PUBLIC_GOOGLE_MAPS_NEIGHBORHOOD_DISCOVERY_EMBED_URL if the URL changes.
 */
export const DEFAULT_GOOGLE_MAPS_NEIGHBORHOOD_DISCOVERY_EMBED_URL =
  'https://storage.googleapis.com/maps-solutions-v9iuebxrqf/neighborhood-discovery/6imu/neighborhood-discovery.html'

export function getGoogleMapsNeighborhoodDiscoveryEmbedUrl(): string {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_MAPS_NEIGHBORHOOD_DISCOVERY_EMBED_URL
  if (typeof raw === 'string' && raw.trim() !== '') {
    return raw.trim()
  }
  return DEFAULT_GOOGLE_MAPS_NEIGHBORHOOD_DISCOVERY_EMBED_URL
}
