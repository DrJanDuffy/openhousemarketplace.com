'use client'

import { usePathname } from 'next/navigation'
import { GBP } from '@/config/gbp'

interface StructuredDataProps {
  type: 'RealEstateAgent' | 'RealEstateListing' | 'Organization' | 'WebPage' | 'BreadcrumbList' | 'FAQPage' | 'LocalBusiness' | 'Place' | 'ItemList'
  /** For RealEstateListing: pass virtualTour (URL or MediaObject) and/or video (URL or VideoObject) when applicable. */
  data?: Record<string, any>
}

// Google 2026 SEO: Add NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL in env for sameAs (GBP link)
const sameAsUrls: string[] = [
  ...(typeof process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL === 'string'
    ? [process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL]
    : []),
]

export default function StructuredData({ type, data = {} }: StructuredDataProps) {
  const pathname = usePathname()
  const baseUrl = 'https://www.openhousemarketplace.com'

  let structuredData: Record<string, any> = {}

  switch (type) {
    case 'RealEstateAgent':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent',
        '@id': `${baseUrl}/about#agent`,
        name: 'Dr. Jan Duffy',
        description: 'Top Summerlin West real estate agent with 15+ years of experience helping clients buy and sell luxury homes in Las Vegas. Licensed Nevada real estate professional (S.0197614.LLC), Berkshire Hathaway HomeServices Nevada Properties.',
        url: `${baseUrl}/about`,
        image: `${baseUrl}/images/dr-jan-duffy.jpg`,
        telephone: GBP.phoneE164,
        email: 'jan@openhousemarketplace.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: GBP.address.street,
          addressLocality: GBP.address.locality,
          addressRegion: GBP.address.region,
          postalCode: GBP.address.postalCode,
          addressCountry: GBP.address.country
        },
        areaServed: {
          '@type': 'City',
          name: 'Summerlin West, Las Vegas'
        },
        worksFor: {
          '@type': 'RealEstateOrganization',
          name: GBP.name,
          url: baseUrl,
        },
        knowsAbout: [
          'Real Estate',
          'Luxury Homes',
          'New Construction',
          'Investment Properties',
          'Summerlin Real Estate Market',
          'Open Houses',
          'Home Buying',
          'Home Selling'
        ],
        ...data
      }
      break

    case 'RealEstateListing':
      // data may include virtualTour (URL or MediaObject) and video (URL or VideoObject) per Schema.org
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        url: `${baseUrl}${pathname}`,
        ...data
      }
      break

    case 'Organization':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: GBP.name,
        url: baseUrl,
        logo: `${baseUrl}/images/logo/logo.svg`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: GBP.phoneE164,
          contactType: 'Real Estate Services',
          areaServed: 'US',
          availableLanguage: 'English'
        },
        ...(sameAsUrls.length > 0 ? { sameAs: sameAsUrls } : {}),
        ...data
      }
      break

    case 'WebPage':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        url: `${baseUrl}${pathname}`,
        name: data.name || 'Summerlin Real Estate',
        description: data.description || 'Real estate services in Summerlin West',
        inLanguage: 'en-US',
        // E-E-A-T: author/creator for expertise and trust (Google 2026)
        author: {
          '@type': 'Person',
          name: 'Dr. Jan Duffy',
          url: `${baseUrl}/about`,
          jobTitle: 'Real Estate Agent',
          worksFor: { '@type': 'Organization', name: 'Dr. Jan Duffy Real Estate', url: baseUrl },
        },
        publisher: {
          '@type': 'Organization',
          name: 'Dr. Jan Duffy Real Estate',
          url: baseUrl,
          logo: { '@type': 'ImageObject', url: `${baseUrl}/images/logo/logo.svg` },
        },
        ...data
      }
      break

    case 'BreadcrumbList':
      const items = data.items || []
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item: { name: string; url: string }, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      }
      break

    case 'FAQPage':
      const faqs = data.faqs || []
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq: { question: string; answer: string }) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
      break

    case 'LocalBusiness':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${baseUrl}/#organization`,
        name: GBP.name,
        description: GBP.description,
        image: `${baseUrl}/images/dr-jan-duffy.jpg`,
        logo: `${baseUrl}/images/logo/logo.svg`,
        url: baseUrl,
        telephone: GBP.phoneE164,
        email: 'jan@openhousemarketplace.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: GBP.address.street,
          addressLocality: GBP.address.locality,
          addressRegion: GBP.address.region,
          postalCode: GBP.address.postalCode,
          addressCountry: GBP.address.country
        },
        openingHours: GBP.hours.schemaArray,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 36.1699,
          longitude: -115.3301
        },
        areaServed: {
          '@type': 'City',
          name: 'Summerlin West, Las Vegas, NV'
        },
        serviceArea: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: 36.1699,
            longitude: -115.3301
          },
          geoRadius: {
            '@type': 'Distance',
            value: '10',
            unitCode: 'MI'
          }
        },
        // Real estate expertise and knowledge areas
        knowsAbout: [
          'Real Estate',
          'Open Houses',
          'Open House Tours',
          'Luxury Homes',
          'New Construction',
          'Investment Properties',
          'Summerlin Real Estate Market',
          'Home Buying',
          'Home Selling',
          'Market Analysis',
          'Property Valuation',
          'Luxury Real Estate',
          'Golf Course Communities',
          'Gated Communities'
        ],
        // Services offered by the real estate business
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Real Estate Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Home Buying Assistance',
                description: 'Expert guidance for buying homes in Summerlin West, Las Vegas',
                serviceType: 'Real Estate Buying Services',
                areaServed: {
                  '@type': 'City',
                  name: 'Summerlin West, Las Vegas, NV'
                }
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Home Selling Services',
                description: 'Professional home selling services including market analysis, pricing strategy, and marketing',
                serviceType: 'Real Estate Selling Services',
                areaServed: {
                  '@type': 'City',
                  name: 'Summerlin West, Las Vegas, NV'
                }
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'New Construction Guidance',
                description: 'Expert assistance with new construction homes and builder relationships',
                serviceType: 'New Construction Real Estate Services',
                areaServed: {
                  '@type': 'City',
                  name: 'Summerlin West, Las Vegas, NV'
                }
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Market Analysis',
                description: 'Comprehensive market analysis and property valuation services',
                serviceType: 'Real Estate Market Analysis',
                areaServed: {
                  '@type': 'City',
                  name: 'Summerlin West, Las Vegas, NV'
                }
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Investment Property Consultation',
                description: 'Expert consultation for investment properties and real estate investments',
                serviceType: 'Investment Real Estate Services',
                areaServed: {
                  '@type': 'City',
                  name: 'Summerlin West, Las Vegas, NV'
                }
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Neighborhood Tours',
                description: 'Guided tours of Summerlin neighborhoods and communities',
                serviceType: 'Real Estate Tour Services',
                areaServed: {
                  '@type': 'City',
                  name: 'Summerlin West, Las Vegas, NV'
                }
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Open House Tours',
                description: 'Find and tour Summerlin open houses this weekend. Open house listings, schedules, and alerts for homes in Summerlin West, The Ridges, Red Rock Country Club, and more.',
                serviceType: 'Open House Real Estate Services',
                areaServed: {
                  '@type': 'City',
                  name: 'Summerlin West, Las Vegas, NV'
                }
              }
            }
          ]
        },
        ...(sameAsUrls.length > 0 ? { sameAs: sameAsUrls } : {}),
        // AggregateRating and openingHours omitted: single source is GoogleEnhancement (layout) and config/gbp.ts (site supports GBP)
        ...(data.paymentAccepted ? { paymentAccepted: data.paymentAccepted } : {}),
        ...((): Record<string, unknown> => {
          const { aggregateRating: _a, openingHours: _o, ...rest } = data
          return rest
        })()
      }
      break

    case 'Place':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Place',
        name: data.name || 'Summerlin West',
        address: {
          '@type': 'PostalAddress',
          addressLocality: data.locality || 'Las Vegas',
          addressRegion: 'NV',
          addressCountry: 'US',
          ...data.address
        },
        geo: data.geo || {
          '@type': 'GeoCoordinates',
          latitude: 36.1699,
          longitude: -115.3301
        },
        ...data
      }
      break

    case 'ItemList':
      const listItems = data.items || []
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: data.name || 'Summerlin Neighborhoods',
        description: data.description || 'List of Summerlin West neighborhoods and communities.',
        numberOfItems: listItems.length,
        itemListElement: listItems.map((item: { name: string; url: string }, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url.startsWith('/') ? '' : '/'}${item.url}`,
        })),
        ...data
      }
      break
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  )
}

