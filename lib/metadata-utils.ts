/**
 * Utility functions for generating canonical URLs
 */
import { getSiteUrl } from '@/lib/site'

export const BASE_URL = getSiteUrl()

export function getCanonicalUrl(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${BASE_URL}${cleanPath}`
}

export function getAlternates(path: string) {
  return {
    canonical: getCanonicalUrl(path),
  }
}

