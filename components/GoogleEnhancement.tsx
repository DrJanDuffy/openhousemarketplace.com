'use client'

/**
 * Google enhancement for every page: LocalBusiness + WebPage JSON-LD.
 * Ensures GBP/NAP, E-E-A-T, and page-level schema on all routes (2025 SEO).
 */
import { usePathname } from 'next/navigation'

const BASE_URL = 'https://www.openhousemarketplace.com'
const GBP_URL = typeof process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL === 'string'
  ? process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL
  : undefined

// Page-specific WebPage name/description for better SERP snippets
const PAGE_META: Record<string, { name: string; description: string }> = {
  '/': { name: 'Summerlin West Open Houses | Dr. Jan Duffy Real Estate', description: 'Find Summerlin West open houses and Las Vegas real estate. Search listings, neighborhood guides, and expert buying and selling services in Summerlin.' },
  '/about': { name: 'About Dr. Jan Duffy | Summerlin West Real Estate Agent', description: 'Meet Dr. Jan Duffy, your trusted Summerlin West real estate agent. Expert in luxury homes, new construction, and Las Vegas real estate.' },
  '/contact': { name: 'Contact Dr. Jan Duffy | Summerlin West Real Estate', description: 'Contact Dr. Jan Duffy for Summerlin West real estate. Schedule a tour, get a market report, or discuss buying and selling in Las Vegas.' },
  '/open-houses': { name: 'Summerlin Open Houses This Weekend | Dr. Jan Duffy', description: 'This weekend\'s open houses in Summerlin West, The Ridges, Red Rock Country Club, and more. Schedule a tour with Dr. Jan Duffy.' },
  '/open-house-guide': { name: 'Open House Guide 2025 | What Buyers Need to Know | Summerlin Las Vegas', description: 'New NAR rules changed open houses in 2025. Learn what forms to expect, your rights as a buyer, and how to get the most from Summerlin open houses with Dr. Jan Duffy.' },
  '/tour/mls': { name: 'MLS Property Search | Summerlin Real Estate | Dr. Jan Duffy', description: 'Search MLS listings in Summerlin. Access the full MLS database of homes for sale in Las Vegas\' premier master-planned community.' },
  '/neighborhoods': { name: 'Summerlin Neighborhoods | Dr. Jan Duffy Real Estate', description: 'Explore Summerlin West neighborhoods: The Ridges, Red Rock Country Club, Summerlin Centre, Sun City, and more.' },
  '/luxury-homes': { name: 'Luxury Homes in Summerlin West | Dr. Jan Duffy', description: 'Luxury homes and high-end real estate in Summerlin West, The Ridges, and Las Vegas. Expert luxury home representation.' },
  '/new-construction': { name: 'New Construction Homes in Summerlin | Dr. Jan Duffy', description: 'New construction homes and builders in Summerlin West. Toll Brothers, Lennar, Pulte and more.' },
  '/market-report': { name: 'Summerlin West Market Report | Dr. Jan Duffy', description: 'Summerlin real estate market trends, home values, and local market analysis from Dr. Jan Duffy.' },
  '/schools': { name: 'Schools Near Summerlin West | Dr. Jan Duffy Real Estate', description: 'Schools and education near Summerlin West neighborhoods. Top-rated schools serving Summerlin, NV.' },
  '/disclaimer': { name: 'Disclaimer | Open House Marketplace', description: 'Disclaimer and terms for Open House Marketplace and Dr. Jan Duffy Real Estate.' },
  '/privacy-policy': { name: 'Privacy Policy | Open House Marketplace', description: 'Privacy policy for Open House Marketplace and Dr. Jan Duffy Real Estate.' },
  '/terms-of-service': { name: 'Terms of Service | Open House Marketplace', description: 'Terms of service for Open House Marketplace and Dr. Jan Duffy Real Estate.' },
  '/sitemap': { name: 'Sitemap | Open House Marketplace', description: 'Sitemap of all pages on Open House Marketplace - Summerlin West open houses and real estate.' },
  '/test-form': { name: 'API Test Page | Open House Marketplace', description: 'Developer test page for Open House Marketplace.' },
}

const DEFAULT_PAGE = { name: 'Summerlin Real Estate | Dr. Jan Duffy', description: 'Real estate services in Summerlin West, Las Vegas. Open houses, listings, and expert buying and selling with Dr. Jan Duffy.' }

function slugToTitle(slug: string): string {
  return slug
    .split(/[-/]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ')
}

function getWebPageData(pathname: string) {
  const normalized = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
  if (PAGE_META[normalized]) return PAGE_META[normalized]
  // Dynamic routes: neighborhoods, builders, zip, resources
  const segments = normalized.split('/').filter(Boolean)
  if (segments[0] === 'neighborhoods' && segments[1]) {
    const name = slugToTitle(segments[1])
    return { name: `${name} Real Estate | Summerlin Neighborhood | Dr. Jan Duffy`, description: `Homes for sale and real estate in ${name}, Summerlin West. Neighborhood guide, listings, and expert help from Dr. Jan Duffy.` }
  }
  if (segments[0] === 'builders' && segments[1]) {
    const name = slugToTitle(segments[1])
    return { name: `${name} Homes in Summerlin | New Construction | Dr. Jan Duffy`, description: `New construction homes by ${name} in Summerlin West. Builder info, communities, and expert representation from Dr. Jan Duffy.` }
  }
  if (segments[0] === 'zip' && segments[1]) {
    return { name: `Homes for Sale in ${segments[1]} | Summerlin Zip Code | Dr. Jan Duffy`, description: `Real estate and homes for sale in zip code ${segments[1]}, Summerlin West. Listings and market info from Dr. Jan Duffy.` }
  }
  if (segments[0] === 'resources' && segments[1]) {
    const name = slugToTitle(segments[1])
    return { name: `${name} | Summerlin Real Estate Resources | Dr. Jan Duffy`, description: `Real estate resources: ${name}. Guides and tips for Summerlin West buyers and sellers from Dr. Jan Duffy.` }
  }
  return DEFAULT_PAGE
}

export default function GoogleEnhancement() {
  const pathname = usePathname()
  const pageMeta = getWebPageData(pathname ?? '/')
  const pageUrl = `${BASE_URL}${pathname === null ? '' : pathname}`

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#organization`,
    name: 'Dr. Jan Duffy Real Estate',
    image: `${BASE_URL}/images/dr-jan-duffy.jpg`,
    logo: `${BASE_URL}/images/logo/logo.svg`,
    url: BASE_URL,
    telephone: '+1-702-200-3422',
    email: 'jan@openhousemarketplace.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Summerlin West',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89135',
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 36.1699, longitude: -115.3301 },
    areaServed: { '@type': 'City', name: 'Summerlin West, Las Vegas, NV' },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '10:00', closes: '16:00' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '100',
      bestRating: '5',
      worstRating: '1',
    },
    knowsAbout: ['Real Estate', 'Open Houses', 'Luxury Homes', 'New Construction', 'Summerlin Real Estate Market', 'Home Buying', 'Home Selling'],
    ...(GBP_URL ? { sameAs: [GBP_URL] } : {}),
  }

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: pageUrl,
    name: pageMeta.name,
    description: pageMeta.description,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: 'Dr. Jan Duffy',
      url: `${BASE_URL}/about`,
      jobTitle: 'Real Estate Agent',
      worksFor: { '@type': 'Organization', name: 'Dr. Jan Duffy Real Estate', url: BASE_URL },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dr. Jan Duffy Real Estate',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/logo/logo.svg` },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
    </>
  )
}
