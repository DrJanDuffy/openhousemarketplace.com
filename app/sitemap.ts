import { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site'

export const revalidate = 86400 // Revalidate sitemap daily

/**
 * Sitemap URLs use absolute https://www origins from getSiteUrl().
 * We omit lastModified on entries: Google treats it as an optional hint; setting
 * "now" on every deploy implied the entire site changed daily. Add per-URL
 * lastModified later if you maintain real content-update timestamps.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()

  const mainPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/neighborhoods`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tour/mls`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/open-houses`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/book-tour`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/schedule-consultation`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/open-house-guide`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/amenity-map`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/store-locations`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/directions`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/market-report`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/buyers`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/schools`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/review-us`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/luxury-homes`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/new-construction`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/sitemap`, changeFrequency: 'monthly', priority: 0.4 },
  ]

  const neighborhoods = [
    'the-ridges',
    'red-rock-country-club',
    'summerlin-centre',
    'sun-city-summerlin',
    'the-trails',
    'willows',
    'mesa-ridge',
    'siena',
    'regency',
  ]

  const neighborhoodPages: MetadataRoute.Sitemap = neighborhoods.map((neighborhood) => ({
    url: `${baseUrl}/neighborhoods/${neighborhood}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const zipCodes = ['89135', '89138', '89144']
  const zipPages: MetadataRoute.Sitemap = zipCodes.map((zip) => ({
    url: `${baseUrl}/zip/${zip}`,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  const resources = ['home-buying-guide', 'hoa-communities', 'lifestyle-guide', 'new-construction']
  const resourcePages: MetadataRoute.Sitemap = resources.map((resource) => ({
    url: `${baseUrl}/resources/${resource}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const builders = ['toll-brothers', 'lennar', 'pulte']
  const builderPages: MetadataRoute.Sitemap = builders.map((builder) => ({
    url: `${baseUrl}/builders/${builder}`,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const legalPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  return [
    ...mainPages,
    ...neighborhoodPages,
    ...zipPages,
    ...resourcePages,
    ...builderPages,
    ...legalPages,
  ]
}
