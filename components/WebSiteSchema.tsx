/**
 * WebSite JSON-LD for Google Search (2026 SEO).
 * Rendered server-side in root layout for site-wide understanding.
 * Publisher NAP matches Google Business Profile (config/gbp.ts).
 * @see https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
 */
import { GBP, getBusinessSameAsUrls } from '@/config/gbp'
import { SEO_HOME_DESCRIPTION, SEO_PRIMARY_KEYWORD } from '@/config/seo'
import { getSiteUrl } from '@/lib/site'

const baseUrl = getSiteUrl()

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${baseUrl}/#website`,
  name: `Open House Market Place | ${SEO_PRIMARY_KEYWORD}`,
  alternateName: 'Summerlin Las Vegas Open Houses - Dr. Jan Duffy Real Estate',
  url: baseUrl,
  description: SEO_HOME_DESCRIPTION,
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
    sameAs: getBusinessSameAsUrls(),
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
      name: `View ${SEO_PRIMARY_KEYWORD}`,
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
