'use client'

import { usePathname } from 'next/navigation'

interface StructuredDataProps {
  type: 'RealEstateAgent' | 'RealEstateListing' | 'Organization' | 'WebPage' | 'BreadcrumbList' | 'FAQPage' | 'LocalBusiness' | 'Place'
  data?: Record<string, any>
}

export default function StructuredData({ type, data = {} }: StructuredDataProps) {
  const pathname = usePathname()
  const baseUrl = 'https://www.openhousemarketplace.com'

  let structuredData: Record<string, any> = {}

  switch (type) {
    case 'RealEstateAgent':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent',
        name: 'Dr. Jan Duffy',
        description: 'Top Summerlin West real estate agent with 15+ years of experience helping clients buy and sell luxury homes in Las Vegas',
        url: `${baseUrl}${pathname}`,
        image: `${baseUrl}/images/dr-jan-duffy.jpg`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Summerlin',
          addressRegion: 'NV',
          addressCountry: 'US'
        },
        areaServed: {
          '@type': 'City',
          name: 'Summerlin West, Las Vegas'
        },
        knowsAbout: [
          'Real Estate',
          'Luxury Homes',
          'New Construction',
          'Investment Properties',
          'Summerlin Real Estate Market'
        ],
        ...data
      }
      break

    case 'RealEstateListing':
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
        name: 'Dr. Jan Duffy Real Estate',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-702-905-1222',
          contactType: 'Real Estate Services',
          areaServed: 'US',
          availableLanguage: 'English'
        },
        sameAs: [
          // Add social media profiles if available
        ],
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
        name: 'Dr. Jan Duffy Real Estate',
        image: `${baseUrl}/images/dr-jan-duffy.jpg`,
        logo: `${baseUrl}/logo.png`,
        url: baseUrl,
        telephone: '+1-702-905-1222',
        email: 'jan@openhousemarketplace.com',
        // priceRange removed - not applicable for real estate services
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Summerlin West',
          addressLocality: 'Las Vegas',
          addressRegion: 'NV',
          postalCode: '89135',
          addressCountry: 'US'
        },
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
            }
          ]
        },
        // AggregateRating for star ratings in search results (required for GBP compliance)
        // IMPORTANT: Update with actual review data from Google Business Profile API
        // This enables star ratings to appear in Google search results
        ...(data.aggregateRating ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: data.aggregateRating.ratingValue || '5.0',
            reviewCount: data.aggregateRating.reviewCount || '100',
            bestRating: '5',
            worstRating: '1'
          }
        } : {}),
        // Real estate services don't typically accept credit cards
        // Remove paymentAccepted if not applicable, or set to appropriate methods
        ...(data.paymentAccepted ? { paymentAccepted: data.paymentAccepted } : {}),
        ...data
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
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  )
}

