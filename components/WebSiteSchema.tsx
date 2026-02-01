/**
 * WebSite JSON-LD for Google Search (2025 SEO).
 * Rendered server-side in root layout for site-wide understanding.
 * @see https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
 */
const baseUrl = 'https://www.openhousemarketplace.com'
const gbpUrl = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${baseUrl}/#website`,
  name: 'Open House Marketplace | Summerlin West Open Houses',
  alternateName: 'Summerlin West Open Houses - Dr. Jan Duffy Real Estate',
  url: baseUrl,
  description: 'Find Summerlin West open houses and Las Vegas real estate. Dr. Jan Duffy offers listings, neighborhood guides, and expert buying and selling services in Summerlin.',
  inLanguage: 'en-US',
  publisher: {
    '@id': `${baseUrl}/#organization`,
    '@type': 'Organization',
    name: 'Dr. Jan Duffy Real Estate',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/logo/logo.svg`,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-702-905-1222',
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
