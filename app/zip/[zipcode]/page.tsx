import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'
import StructuredData from '@/components/StructuredData'

const validZipCodes: Record<string, {
  name: string
  description: string
  marketStats: {
    medianPrice: string
    daysOnMarket: number
    activeListings: number
    pricePerSqFt: string
    monthlyChange: string
  }
  neighborhoods: string[]
  schools: Array<{
    name: string
    rating: number
    type: string
    distance: string
  }>
  amenities: Array<{
    name: string
    type: string
    distance: string
  }>
}> = {
  '89135': {
    name: 'Summerlin West 89135',
    description: 'Zip code 89135 encompasses the prestigious neighborhoods of The Ridges and Red Rock Country Club, offering luxury homes with stunning views and world-class amenities.',
    marketStats: {
      medianPrice: '$1,450,000',
      daysOnMarket: 45,
      activeListings: 32,
      pricePerSqFt: '$425',
      monthlyChange: '+2.5%'
    },
    neighborhoods: ['The Ridges', 'Red Rock Country Club'],
    schools: [
      {
        name: 'Palo Verde High School',
        rating: 9,
        type: 'Public High School',
        distance: 'Serving area'
      },
      {
        name: 'Doral Academy Red Rock',
        rating: 8,
        type: 'Charter K-12',
        distance: '2.1 miles'
      },
      {
        name: 'Alexander Dawson School',
        rating: 10,
        type: 'Private K-12',
        distance: '3.5 miles'
      }
    ],
    amenities: [
      {
        name: 'Bear\'s Best Golf Club',
        type: 'Golf Course',
        distance: 'Multiple courses'
      },
      {
        name: 'Red Rock Canyon',
        type: 'park',
        distance: '5 minutes'
      },
      {
        name: 'Downtown Summerlin',
        type: 'Shopping & Dining',
        distance: '10 minutes'
      }
    ]
  },
  '89138': {
    name: 'Summerlin Centre 89138',
    description: 'Zip code 89138 is home to Summerlin Centre, a family-friendly area with excellent schools, parks, and convenient access to shopping and dining.',
    marketStats: {
      medianPrice: '$675,000',
      daysOnMarket: 32,
      activeListings: 48,
      pricePerSqFt: '$315',
      monthlyChange: '+1.8%'
    },
    neighborhoods: ['Summerlin Centre', 'The Trails', 'Willows'],
    schools: [
      {
        name: 'Palo Verde High School',
        rating: 9,
        type: 'Public High School',
        distance: 'Serving area'
      },
      {
        name: 'Vista Middle School',
        rating: 8,
        type: 'Public Middle School',
        distance: '1.2 miles'
      },
      {
        name: 'Doral Academy Red Rock',
        rating: 8,
        type: 'Charter K-12',
        distance: '2.3 miles'
      }
    ],
    amenities: [
      {
        name: 'Downtown Summerlin',
        type: 'Shopping & Dining',
        distance: 'Central location'
      },
      {
        name: 'Multiple Parks',
        type: 'park',
        distance: 'Throughout area'
      },
      {
        name: 'Community Centers',
        type: 'Recreation',
        distance: 'Multiple locations'
      }
    ]
  },
  '89144': {
    name: 'Sun City Summerlin 89144',
    description: 'Zip code 89144 features Sun City Summerlin, an active adult 55+ community offering low-maintenance living with resort-style amenities.',
    marketStats: {
      medianPrice: '$425,000',
      daysOnMarket: 28,
      activeListings: 38,
      pricePerSqFt: '$240',
      monthlyChange: '+1.2%'
    },
    neighborhoods: ['Sun City Summerlin'],
    schools: [
      {
        name: 'Adult Education Programs',
        rating: 9,
        type: 'Community Programs',
        distance: 'On-site'
      },
      {
        name: 'Nearby Schools',
        rating: 8,
        type: 'For visiting family',
        distance: 'Various'
      }
    ],
    amenities: [
      {
        name: 'Sun City Golf Courses',
        type: 'Golf Course',
        distance: 'Multiple courses'
      },
      {
        name: 'Recreation Centers',
        type: 'Recreation',
        distance: 'Multiple locations'
      },
      {
        name: 'Fitness Facilities',
        type: 'Recreation',
        distance: 'On-site'
      }
    ]
  }
}

const ZIP_SLUGS = ['89135', '89138', '89144'] as const

interface ZipCodePageProps {
  params: Promise<{ zipcode: string }>
}

export function generateStaticParams() {
  return ZIP_SLUGS.map((zipcode) => ({ zipcode }))
}

export async function generateMetadata({ params }: ZipCodePageProps): Promise<Metadata> {
  const { zipcode } = await params
  const zipData = validZipCodes[zipcode]
  
  if (!zipData) {
    return {
      title: 'Zip Code Not Found | Open House Market Place',
    }
  }

  return {
    title: `${zipcode} Homes for Sale | Summerlin Real Estate`,
    description: `Find homes for sale in zip code ${zipcode} in Summerlin. ${zipData.description}`,
    keywords: `${zipcode} homes, Summerlin zip code ${zipcode}, Las Vegas real estate ${zipcode}`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `https://www.openhousemarketplace.com/zip/${zipcode}`,
    },
    openGraph: {
      title: `${zipcode} Homes for Sale | Summerlin Real Estate`,
      description: `Explore homes for sale in zip code ${zipcode} in Summerlin, Las Vegas.`,
      images: ['/images/zip-hero.jpg'],
      url: `https://www.openhousemarketplace.com/zip/${zipcode}`,
    }
  }
}

export default async function ZipCodePage({ params }: ZipCodePageProps) {
  const { zipcode } = await params
  const zipData = validZipCodes[zipcode]

  if (!zipData) {
    notFound()
  }

  return (
    <>
      <StructuredData 
        type="LocalBusiness"
        data={{
          openingHours: ['Mo-Fr 09:00-18:00', 'Sa-Su 10:00-16:00'],
          aggregateRating: {
            ratingValue: '5.0',
            reviewCount: '100'
          }
        }}
      />
      <StructuredData 
        type="Place"
        data={{
          name: `Zip Code ${zipcode}`,
          locality: 'Las Vegas',
          address: {
            addressLocality: 'Las Vegas',
            addressRegion: 'NV',
            postalCode: zipcode,
            addressCountry: 'US'
          },
          geo: {
            latitude: 36.1699,
            longitude: -115.3301
          }
        }}
      />
      <StructuredData 
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: 'https://www.openhousemarketplace.com/' },
            { name: 'Zip Codes', url: 'https://www.openhousemarketplace.com/zip' },
            { name: `Zip Code ${zipcode}`, url: `https://www.openhousemarketplace.com/zip/${zipcode}` }
          ]
        }}
      />
      <StructuredData 
        type="WebPage"
        data={{
          name: `Homes for Sale in Zip Code ${zipcode}`,
          description: zipData.description,
        }}
      />
      <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Homes for Sale in Zip Code {zipcode} - Summerlin West</h1>
            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
              {zipData.description} This prestigious zip code area represents some of the finest real estate opportunities 
              in Summerlin West, offering buyers access to luxury homes, family-friendly communities, and exceptional 
              amenities that make Summerlin one of Las Vegas' most desirable master-planned communities.
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Real Estate Market in {zipcode}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The real estate market in zip code {zipcode} offers diverse opportunities for buyers at various price points. 
              With a median home price of {zipData.marketStats.medianPrice} and an average of {zipData.marketStats.daysOnMarket} 
              days on market, this area represents a balanced market with strong demand and healthy appreciation trends. 
              Whether you're seeking luxury estates, family homes, or investment properties, zip code {zipcode} provides 
              excellent opportunities for real estate investment in Summerlin.
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Neighborhoods in {zipcode}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zip code {zipcode} encompasses several of Summerlin's most desirable neighborhoods, including {zipData.neighborhoods.join(', ')}. 
              Each neighborhood within this zip code offers unique character, amenities, and real estate opportunities, 
              allowing buyers to find the perfect match for their lifestyle and preferences. From established communities 
              with mature landscaping to newer developments with modern amenities, {zipcode} has something for every type 
              of homebuyer in the Las Vegas real estate market.
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Zip Code {zipcode}?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Purchasing real estate in zip code {zipcode} means investing in one of Summerlin's most well-established and 
              desirable areas. This zip code offers convenient access to premier shopping at Downtown Summerlin, world-class 
              golf courses, top-rated schools, and the natural beauty of Red Rock Canyon. The combination of location, 
              amenities, and real estate value makes {zipcode} one of the smartest choices for buyers seeking properties 
              in Summerlin West.
            </p>
          </div>
        </div>
      </div>
      <HyperLocalNeighborhoodPage
        name={zipData.name}
        description={`${zipData.description} Explore available homes in this zip code and discover why ${zipcode} is one of Summerlin's most desirable areas.`}
        marketStats={zipData.marketStats}
        schools={zipData.schools}
        amenities={zipData.amenities}
        imageUrl="/images/zip-hero.jpg"
        realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
      />
    </div>
    </>
  )
}

