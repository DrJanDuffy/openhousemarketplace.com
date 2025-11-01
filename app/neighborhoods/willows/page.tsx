import { Metadata } from 'next'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'

export const metadata: Metadata = {
  title: 'Willows Summerlin | Homes for Sale in Mature Trees Neighborhood',
  description: 'Discover homes for sale in Willows, a charming Summerlin West neighborhood featuring mature trees, walkable streets, and an established community atmosphere. Explore real estate opportunities in this family-friendly Las Vegas neighborhood.',
  keywords: 'Willows Summerlin, Willows homes for sale, mature trees neighborhood, walkable community Summerlin, established area Las Vegas, Willows real estate, Summerlin West homes, Las Vegas family neighborhood',
  openGraph: {
    title: 'Willows Summerlin | Mature Trees & Walkable Community',
    description: 'Explore Willows, a charming neighborhood in Summerlin with mature trees and walkable streets.',
    images: ['/images/willows-hero.jpg'],
  }
}

const marketStats = {
  medianPrice: '$625,000',
  daysOnMarket: 38,
  activeListings: 15,
  pricePerSqFt: '$295',
  monthlyChange: '+1.5%'
}

const schools = [
  {
    name: 'Palo Verde High School',
    rating: 9,
    type: 'Public High School',
    distance: '1.8 miles'
  },
  {
    name: 'Vista Middle School',
    rating: 8,
    type: 'Public Middle School',
    distance: '1.5 miles'
  },
  {
    name: 'Doral Academy Red Rock',
    rating: 8,
    type: 'Charter K-12',
    distance: '2.5 miles'
  }
]

const amenities = [
  {
    name: 'Willows Park',
    type: 'park',
    distance: 'Within community'
  },
  {
    name: 'Downtown Summerlin',
    type: 'Shopping & Dining',
    distance: '10 minutes'
  },
  {
    name: 'Summerlin Trail System',
    type: 'Recreation',
    distance: 'Direct access'
  },
  {
    name: 'Community Amenities',
    type: 'Recreation',
    distance: 'On-site'
  }
]

export default function WillowsPage() {
  return (
    <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Willows Neighborhood in Summerlin</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Willows is a charming, well-established neighborhood in Summerlin West that exemplifies the natural beauty 
              and community-oriented lifestyle that makes Summerlin one of Las Vegas' most desirable real estate markets. 
              Known for its mature trees, tree-lined streets, and walkable community design, Willows offers residents a 
              peaceful, family-friendly environment with the character and charm that comes from a well-established, 
              carefully maintained neighborhood.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The mature trees throughout Willows provide natural beauty, shade, and a sense of permanence that appeals 
              to homebuyers seeking an established neighborhood in Summerlin. These trees, combined with well-maintained 
              properties and thoughtfully designed streets, create an environment that feels both welcoming and refined. 
              For families considering real estate in Las Vegas, Willows represents an opportunity to invest in a 
              neighborhood that has already proven its value and desirability over time.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Real Estate Market in Willows</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Willows real estate market offers excellent value for buyers seeking established homes in a mature, 
              stable neighborhood. With a median home price of $625,000 and an average of 38 days on market, Willows 
              represents one of Summerlin's most balanced real estate markets. Properties in this neighborhood typically 
              feature well-established landscaping, mature trees, and the kind of settled, community feel that comes from 
              years of careful maintenance and neighborhood pride.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Homebuyers in Willows can expect to find a variety of home styles and sizes, from comfortable starter homes 
              to larger family residences, all within the context of a mature, established community. The neighborhood's 
              established character means homes often feature mature landscaping, updated amenities, and the benefits of 
              a community that has fully developed its infrastructure and amenities over time.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Community Lifestyle & Walkability</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              One of Willows' most appealing features is its walkable, pedestrian-friendly design. The neighborhood's 
              extensive sidewalk network and tree-lined streets encourage residents to walk, jog, and enjoy outdoor 
              activities throughout the community. This walkability creates opportunities for neighbor interaction, 
              community engagement, and an active lifestyle that families value when choosing real estate in Summerlin.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Willows community park serves as a central gathering place for families, offering playground facilities, 
              open spaces, and opportunities for community events. Direct access to the extensive Summerlin trail system 
              means residents can connect to over 250 miles of walking and biking trails, providing endless opportunities 
              for outdoor recreation and connecting Willows to the broader Summerlin community.
            </p>
          </div>
        </div>
      </div>
      <HyperLocalNeighborhoodPage
        name="Willows Summerlin"
        description="Willows is a charming neighborhood in Summerlin known for its mature trees, walkable community, and established residential character. With tree-lined streets, well-maintained properties, and a strong neighborhood feel, Willows offers residents a peaceful, family-friendly environment while maintaining easy access to all that Summerlin has to offer."
        marketStats={marketStats}
        schools={schools}
        amenities={amenities}
        imageUrl="/images/willows-hero.jpg"
        realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
      />
    </div>
  )
}

