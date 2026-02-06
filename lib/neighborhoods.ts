/**
 * Shared neighborhood list for sitemap, sign-in forms, etc.
 * Slugs match app/sitemap.ts and app/neighborhoods/[slug] routes.
 */
export interface NeighborhoodOption {
  slug: string
  label: string
}

export const NEIGHBORHOODS: NeighborhoodOption[] = [
  { slug: 'the-ridges', label: 'The Ridges' },
  { slug: 'red-rock-country-club', label: 'Red Rock Country Club' },
  { slug: 'summerlin-centre', label: 'Summerlin Centre' },
  { slug: 'sun-city-summerlin', label: 'Sun City Summerlin' },
  { slug: 'the-trails', label: 'The Trails' },
  { slug: 'willows', label: 'Willows' },
  { slug: 'mesa-ridge', label: 'Mesa Ridge' },
  { slug: 'siena', label: 'Siena' },
  { slug: 'regency', label: 'Regency' },
]

/** Slugs only, for sitemap compatibility */
export const NEIGHBORHOOD_SLUGS = NEIGHBORHOODS.map((n) => n.slug)
