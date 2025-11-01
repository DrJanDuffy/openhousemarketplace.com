import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'
import StructuredData from '@/components/StructuredData'

const validBuilders: Record<string, {
  name: string
  displayName: string
  description: string
  marketStats: {
    medianPrice: string
    daysOnMarket: number
    activeListings: number
    pricePerSqFt: string
    monthlyChange: string
  }
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
  communities: string[]
}> = {
  'toll-brothers': {
    name: 'toll-brothers',
    displayName: 'Toll Brothers',
    description: 'Discover luxury new construction homes from Toll Brothers in Summerlin. Known for their exceptional craftsmanship, innovative designs, and premier locations, Toll Brothers builds communities that represent the pinnacle of luxury living.',
    marketStats: {
      medianPrice: '$1,250,000',
      daysOnMarket: 0,
      activeListings: 15,
      pricePerSqFt: '$395',
      monthlyChange: '+2.2%'
    },
    communities: ['The Ridges', 'Red Rock Country Club'],
    schools: [
      {
        name: 'Top-Rated Schools',
        rating: 9,
        type: 'Various Options',
        distance: 'Nearby'
      },
      {
        name: 'Private Schools',
        rating: 10,
        type: 'Premium Education',
        distance: 'Accessible'
      }
    ],
    amenities: [
      {
        name: 'Golf Course Communities',
        type: 'Golf Course',
        distance: 'On-site or nearby'
      },
      {
        name: 'Luxury Amenities',
        type: 'Recreation',
        distance: 'Community centers'
      },
      {
        name: 'Premium Locations',
        type: 'Location',
        distance: 'Prime Summerlin'
      }
    ]
  },
  'lennar': {
    name: 'lennar',
    displayName: 'Lennar',
    description: 'Explore new homes from Lennar in Summerlin with their signature Everything\'s Included® program. Lennar builds modern, energy-efficient homes with smart home technology and premium features all included in the base price.',
    marketStats: {
      medianPrice: '$725,000',
      daysOnMarket: 0,
      activeListings: 22,
      pricePerSqFt: '$335',
      monthlyChange: '+1.9%'
    },
    communities: ['Summerlin Centre', 'Mesa Ridge'],
    schools: [
      {
        name: 'CCSD Area 2 Schools',
        rating: 8,
        type: 'Public Schools',
        distance: 'Serving communities'
      },
      {
        name: 'Charter Schools',
        rating: 8,
        type: 'Charter Options',
        distance: 'Nearby'
      }
    ],
    amenities: [
      {
        name: 'Community Parks',
        type: 'park',
        distance: 'Throughout communities'
      },
      {
        name: 'Shopping & Dining',
        type: 'Shopping & Dining',
        distance: 'Convenient access'
      },
      {
        name: 'Smart Home Features',
        type: 'Technology',
        distance: 'Included standard'
      }
    ]
  },
  'pulte': {
    name: 'pulte',
    displayName: 'Pulte Homes',
    description: 'Find energy-efficient new construction homes from Pulte Homes in Summerlin. Pulte focuses on sustainable building practices, innovative floor plans, and creating communities designed for modern living.',
    marketStats: {
      medianPrice: '$695,000',
      daysOnMarket: 0,
      activeListings: 18,
      pricePerSqFt: '$320',
      monthlyChange: '+1.7%'
    },
    communities: ['Summerlin Centre', 'The Trails'],
    schools: [
      {
        name: 'Top-Rated Public Schools',
        rating: 9,
        type: 'Public Schools',
        distance: 'Excellent options'
      },
      {
        name: 'Educational Resources',
        rating: 8,
        type: 'Various',
        distance: 'Nearby'
      }
    ],
    amenities: [
      {
        name: 'Energy Efficient Homes',
        type: 'Sustainability',
        distance: 'Built-in features'
      },
      {
        name: 'Community Amenities',
        type: 'Recreation',
        distance: 'Included'
      },
      {
        name: 'Modern Floor Plans',
        type: 'Design',
        distance: 'Innovative layouts'
      }
    ]
  }
}

interface BuilderPageProps {
  params: Promise<{ builder: string }>
}

export async function generateMetadata({ params }: BuilderPageProps): Promise<Metadata> {
  const { builder } = await params
  const builderData = validBuilders[builder]
  
  if (!builderData) {
    return {
      title: 'Builder Not Found | Open House Marketplace',
    }
  }

  return {
    title: `${builderData.displayName} Homes in Summerlin | New Construction`,
    description: builderData.description,
    keywords: `${builderData.displayName} Summerlin, ${builderData.displayName} homes Las Vegas, new construction Summerlin`,
    openGraph: {
      title: `${builderData.displayName} Homes in Summerlin | New Construction`,
      description: `Explore new construction homes from ${builderData.displayName} in Summerlin.`,
      images: ['/images/builders-hero.jpg'],
    }
  }
}

export default async function BuilderPage({ params }: BuilderPageProps) {
  const { builder } = await params
  const builderData = validBuilders[builder]

  if (!builderData) {
    notFound()
  }

  return (
    <>
      <StructuredData 
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: 'https://openhousemarketplace.com/' },
            { name: 'Builders', url: 'https://openhousemarketplace.com/builders' },
            { name: builderData.displayName, url: `https://openhousemarketplace.com/builders/${builder}` }
          ]
        }}
      />
      <StructuredData 
        type="WebPage"
        data={{
          name: `${builderData.displayName} Homes in Summerlin`,
          description: builderData.description,
        }}
      />
      <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{builderData.displayName} Homes in Summerlin - New Construction</h1>
            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
              {builderData.description} When you choose {builderData.displayName} for your new home in Summerlin, you're 
              selecting from one of the most respected builders in the Las Vegas area, known for quality construction, 
              innovative design, and communities that enhance the Summerlin lifestyle.
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose {builderData.displayName} in Summerlin?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {builderData.displayName} has established a reputation for building exceptional homes in Summerlin's most 
              desirable locations. With communities in {builderData.communities.join(' and ')}, {builderData.displayName} 
              offers homebuyers the opportunity to purchase new construction properties in neighborhoods that represent 
              the best of master-planned community living. The builder's commitment to quality, innovation, and customer 
              satisfaction makes {builderData.displayName} one of the top choices for new home construction in Summerlin West.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">New Construction Benefits</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Purchasing a new {builderData.displayName} home in Summerlin means enjoying the latest in home design, 
              energy efficiency, and smart home technology. New construction homes come with builder warranties, modern 
              floor plans designed for today's lifestyles, and the opportunity to customize features to match your 
              preferences. With a median price of {builderData.marketStats.medianPrice} for {builderData.displayName} 
              homes, buyers receive exceptional value in the competitive Summerlin real estate market.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">{builderData.displayName} Communities in Summerlin</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {builderData.displayName} builds in some of Summerlin's most prestigious neighborhoods, including 
              {builderData.communities.map((community, index) => {
                if (index === builderData.communities.length - 1) return ` and ${community}`
                if (index === 0) return ` ${community}`
                return `, ${community}`
              })}. These communities offer residents access to world-class amenities, top-rated schools, and the 
              lifestyle benefits that make Summerlin one of Las Vegas' premier master-planned communities. Working 
              with a knowledgeable real estate agent like Dr. Jan Duffy ensures you find the perfect {builderData.displayName} 
              community for your needs.
            </p>
          </div>
        </div>
      </div>
      <HyperLocalNeighborhoodPage
        name={`${builderData.displayName} Homes in Summerlin`}
        description={builderData.description}
        marketStats={builderData.marketStats}
        schools={builderData.schools}
        amenities={builderData.amenities}
        imageUrl="/images/builders-hero.jpg"
        realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
      />
    </div>
    </>
  )
}

