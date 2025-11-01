import { Metadata } from 'next'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'

export const metadata: Metadata = {
  title: 'Siena Summerlin | Luxury Mediterranean-Style Homes for Sale',
  description: 'Explore luxury Mediterranean-style homes for sale in Siena, an upscale Summerlin West community. Discover elegant architecture, premium amenities, resort-style living, and golf course access in Las Vegas\' premier master-planned community.',
  keywords: 'Siena Summerlin, Siena homes for sale, Mediterranean homes Summerlin, upscale community Las Vegas, luxury homes Summerlin, Siena real estate, Siena Golf Club, luxury Las Vegas real estate',
  openGraph: {
    title: 'Siena Summerlin | Mediterranean-Style Upscale Community',
    description: 'Discover Siena, an upscale Summerlin community featuring Mediterranean-style homes and premium amenities.',
    images: ['/images/siena-hero.jpg'],
  }
}

const marketStats = {
  medianPrice: '$1,125,000',
  daysOnMarket: 48,
  activeListings: 14,
  pricePerSqFt: '$385',
  monthlyChange: '+2.6%'
}

const schools = [
  {
    name: 'Palo Verde High School',
    rating: 9,
    type: 'Public High School',
    distance: '1.7 miles'
  },
  {
    name: 'Doral Academy Red Rock',
    rating: 8,
    type: 'Charter K-12',
    distance: '2.4 miles'
  },
  {
    name: 'Alexander Dawson School',
    rating: 10,
    type: 'Private K-12',
    distance: '3.8 miles'
  }
]

const amenities = [
  {
    name: 'Siena Golf Club',
    type: 'Golf Course',
    distance: 'On-site'
  },
  {
    name: 'Resort-Style Pool',
    type: 'Recreation',
    distance: 'Community center'
  },
  {
    name: 'Downtown Summerlin',
    type: 'Shopping & Dining',
    distance: '9 minutes'
  },
  {
    name: 'Red Rock Canyon',
    type: 'park',
    distance: '6 minutes'
  }
]

export default function SienaPage() {
  return (
    <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Siena: Luxury Living in Summerlin</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Siena is an exclusive, upscale community in Summerlin West that represents the pinnacle of luxury real estate 
              in Las Vegas. This gated, masterfully planned community features elegant Mediterranean-style architecture, 
              premium amenities, and resort-style living that appeals to discerning buyers seeking the finest in Summerlin 
              real estate. With its distinctive Tuscan-inspired design, access to world-class golf, and proximity to Red 
              Rock Canyon, Siena offers an exceptional lifestyle for those seeking luxury living in Las Vegas' premier 
              master-planned community.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Mediterranean architectural theme throughout Siena creates a cohesive, elegant aesthetic that sets this 
              community apart from other luxury neighborhoods in Summerlin. Terra cotta tile roofs, stucco exteriors, 
              and thoughtful landscaping evoke the romance and sophistication of Tuscany, creating an environment that 
              feels both luxurious and inviting. This attention to architectural detail and design consistency is one of 
              the factors that makes Siena one of the most desirable luxury communities in the Las Vegas real estate market.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Luxury Real Estate in Siena</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Siena real estate market represents the upper echelon of luxury homes in Summerlin, with a median home 
              price of $1,125,000 and properties that showcase the finest in architectural design and craftsmanship. Homes 
              in Siena typically feature spacious floor plans, high-end finishes, and outdoor living spaces designed for 
              entertaining and relaxation. The gated nature of the community provides an additional layer of privacy and 
              security that luxury homebuyers value when purchasing real estate in Las Vegas.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Properties in Siena often include premium features such as gourmet kitchens, spa-like master suites, outdoor 
              kitchens and fireplaces, and professionally designed landscaping. The community's architectural guidelines 
              ensure that all homes maintain the Mediterranean aesthetic while allowing for personalization and customization 
              that reflects each homeowner's unique style and preferences.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Siena Golf Club & Resort-Style Amenities</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              One of Siena's most distinctive features is its association with the Siena Golf Club, providing residents 
              with access to world-class golf in one of Las Vegas' most scenic settings. The golf course, designed to 
              complement the community's Mediterranean theme, offers challenging play and stunning views of the surrounding 
              Red Rock Canyon and Las Vegas Valley. Golf enthusiasts purchasing luxury real estate in Summerlin appreciate 
              the convenience and prestige of having a championship golf course within their community.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Beyond golf, Siena offers resort-style amenities including a community recreation center with state-of-the-art 
              fitness facilities, resort-style pools with cabanas, and beautifully landscaped common areas designed for 
              relaxation and socializing. These amenities create a lifestyle that feels like living in a luxury resort, 
              with all the convenience and service that comes with master-planned community living in Summerlin West.
            </p>
          </div>
        </div>
      </div>
      <HyperLocalNeighborhoodPage
        name="Siena Summerlin"
        description="Siena is an upscale Summerlin community featuring elegant Mediterranean-style architecture, premium amenities, and resort-style living. With beautifully designed homes, access to the Siena Golf Club, and proximity to Red Rock Canyon, this gated community offers an exceptional lifestyle for those seeking luxury living in Las Vegas' premier master-planned community."
        marketStats={marketStats}
        schools={schools}
        amenities={amenities}
        imageUrl="/images/siena-hero.jpg"
        realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
      />
    </div>
  )
}

