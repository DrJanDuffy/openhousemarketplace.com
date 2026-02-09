/**
 * WebSite JSON-LD for Google Search (2026 SEO).
 * Rendered server-side in root layout for site-wide understanding.
 * Publisher NAP matches Google Business Profile (config/gbp.ts).
 * @see https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
 */
import { GBP } from '@/config/gbp'

const baseUrl = 'https://www.openhousemarketplace.com'
const gbpUrl = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${baseUrl}/#website`,
  name: 'Open House Market Place | Summerlin West Open Houses',
  alternateName: 'Summerlin West Open Houses - Dr. Jan Duffy Real Estate',
  url: baseUrl,
  description: 'Find Summerlin West open houses and Las Vegas real estate. Dr. Jan Duffy offers listings, neighborhood guides, and expert buying and selling services in Summerlin.',
  inLanguage: 'en-US',
  publisher: {
    '@id': `${baseUrl}/#organization`,
    '@type': 'Organization',
    name: GBP.name,
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/logo/logo.svg`,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: GBP.phoneE164,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    ...(gbpUrl ? { sameAs: [gbpUrl] } : {}),
  },
  potentialAction: [
    {
      '@type': 'ContactAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/contact`,
      },
      description: 'Contact Dr. Jan Duffy for Summerlin real estate',
    },
    {
      '@type': 'ViewAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${baseUrl}/open-houses` },
      name: 'View Summerlin open houses',
    },
  ],
}

export default function WebSiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
    />
  )
}
