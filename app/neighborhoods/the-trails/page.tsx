import { Metadata } from 'next'
import Link from 'next/link'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'The Trails Summerlin | Homes for Sale in Established Family Neighborhood',
  description: 'Explore homes for sale in The Trails, an established family neighborhood in Summerlin West. Discover mature landscaping, walkable streets, excellent schools, and real estate opportunities in Las Vegas\' premier master-planned community.',
  keywords: 'The Trails Summerlin, The Trails homes for sale, established neighborhood Summerlin, family homes Summerlin, mature trees neighborhood, The Trails real estate, Summerlin West homes, Las Vegas family neighborhood',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/neighborhoods/the-trails',
  },
  openGraph: {
    title: 'The Trails Summerlin | Established Family Neighborhood',
    description: 'Discover The Trails, an established family neighborhood in Summerlin with mature landscaping and great schools.',
    images: ['/images/the-trails-hero.jpg'],
    url: 'https://www.openhousemarketplace.com/neighborhoods/the-trails',
  }
}

const marketStats = {
  medianPrice: '$695,000',
  daysOnMarket: 42,
  activeListings: 18,
  pricePerSqFt: '$310',
  monthlyChange: '+1.8%'
}

const schools = [
  {
    name: 'Palo Verde High School',
    rating: 9,
    type: 'Public High School',
    distance: '1.5 miles'
  },
  {
    name: 'Doral Academy Red Rock',
    rating: 8,
    type: 'Charter K-12',
    distance: '2.3 miles'
  },
  {
    name: 'Vista Middle School',
    rating: 8,
    type: 'Public Middle School',
    distance: '1.2 miles'
  }
]

const amenities = [
  {
    name: 'The Trails Park',
    type: 'park',
    distance: 'Within community'
  },
  {
    name: 'Downtown Summerlin',
    type: 'Shopping & Dining',
    distance: '8 minutes'
  },
  {
    name: 'Walking Trails',
    type: 'Recreation',
    distance: 'Throughout neighborhood'
  },
  {
    name: 'Community Pool',
    type: 'Recreation',
    distance: 'On-site'
  }
]

export default function TheTrailsPage() {
  return (
    <>
    <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About The Trails Neighborhood in Summerlin</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Trails is an established, family-friendly neighborhood in Summerlin West that embodies the best of 
              master-planned community living. Known for its mature landscaping, tree-lined streets, and strong sense 
              of community, The Trails offers residents a peaceful, welcoming environment while maintaining convenient 
              access to all the amenities that make Summerlin one of Las Vegas' most desirable real estate markets.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This well-established neighborhood has matured beautifully over the years, with mature trees providing 
              natural shade and aesthetic appeal throughout the community. The Trails' walkable streets and extensive 
              sidewalk network encourage residents to enjoy outdoor activities, from evening walks to children playing 
              safely throughout the neighborhood. This combination of natural beauty and community-focused design makes 
              The Trails a highly sought-after area for families looking to purchase               real estate in Summerlin.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              View <Link href="/open-houses" className="text-blue-600 font-semibold hover:underline">Summerlin open houses</Link> this weekend, including homes in The Trails.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Real Estate in The Trails</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Trails real estate market offers excellent value for families seeking well-maintained homes in a 
              mature, established neighborhood. With a median home price of $695,000 and homes typically selling within 
              42 days, The Trails represents one of Summerlin's most stable and desirable real estate markets. The 
              neighborhood features a variety of home styles and sizes, from spacious family homes to more modest 
              starter homes, ensuring there's something for every buyer in the Las Vegas real estate market.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Community Amenities & Lifestyle</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Residents of The Trails enjoy access to numerous community amenities that enhance the quality of life in 
              Summerlin. The neighborhood features its own community park, perfect for family gatherings, children's 
              play, and outdoor recreation. The extensive Summerlin trail system provides direct access to over 250 
              miles of walking and biking trails, connecting The Trails to the broader Summerlin community and 
              providing residents with endless opportunities for outdoor activity.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Trails' proximity to Downtown Summerlin, just 8 minutes away, means residents have easy access to 
              shopping, dining, entertainment, and professional services. This convenience, combined with the 
              neighborhood's peaceful residential character, creates an ideal balance of tranquility and accessibility 
              that families value when choosing real estate in Summerlin West.
            </p>
          </div>
        </div>
      </div>
      <HyperLocalNeighborhoodPage
        name="The Trails Summerlin"
        description="The Trails is an established family neighborhood in Summerlin known for its mature landscaping, walkable streets, and strong sense of community. With well-maintained homes, excellent schools, and convenient access to shopping and dining, this neighborhood offers an ideal setting for families seeking a settled, welcoming environment."
        marketStats={marketStats}
        schools={schools}
        amenities={amenities}
        imageUrl="/images/the-trails-hero.jpg"
        realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
      />
    </div>
    </>
  )
}

