import { MetadataRoute } from 'next'

export const revalidate = 86400 // Revalidate sitemap daily

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.openhousemarketplace.com'
  const currentDate = new Date()

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/neighborhoods`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tour/mls`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/open-houses`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/book-tour`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/schedule-consultation`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/open-house-guide`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/amenity-map`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/store-locations`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/directions`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/market-report`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/buyers`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/schools`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/review-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/luxury-homes`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/new-construction`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ]

  // Neighborhood pages
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
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Zip code pages
  const zipCodes = ['89135', '89138', '89144']
  const zipPages: MetadataRoute.Sitemap = zipCodes.map((zip) => ({
    url: `${baseUrl}/zip/${zip}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  // Resource pages
  const resources = [
    'home-buying-guide',
    'hoa-communities',
    'lifestyle-guide',
    'new-construction',
  ]

  const resourcePages: MetadataRoute.Sitemap = resources.map((resource) => ({
    url: `${baseUrl}/resources/${resource}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Builder pages
  const builders = ['toll-brothers', 'lennar', 'pulte']
  const builderPages: MetadataRoute.Sitemap = builders.map((builder) => ({
    url: `${baseUrl}/builders/${builder}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  // Legal pages
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
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

