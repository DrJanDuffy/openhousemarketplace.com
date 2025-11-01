import { Metadata } from 'next'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'

export const metadata: Metadata = {
  title: 'Sun City Summerlin | 55+ Active Adult Homes for Sale',
  description: 'Discover Sun City Summerlin homes for sale in Summerlin West. Las Vegas\' premier 55+ active adult community with golf courses, social clubs, resort-style amenities, and low-maintenance living. Perfect for active adults seeking real estate in a vibrant retirement community.',
  keywords: 'Sun City Summerlin, Sun City Summerlin homes for sale, 55+ community Las Vegas, active adult homes, retirement community Summerlin, golf course homes, Sun City real estate, 55+ homes Las Vegas',
  openGraph: {
    title: 'Sun City Summerlin | 55+ Active Adult Community',
    description: 'Live your best life in Sun City Summerlin. Golf, social activities, and resort amenities for active adults.',
    images: ['/images/sun-city-hero.jpg'],
    url: 'https://openhousemarketplace.com/neighborhoods/sun-city-summerlin',
  },
}

const marketStats = {
  medianPrice: '$525,000',
  daysOnMarket: 32,
  activeListings: 25,
  pricePerSqFt: '$275',
  monthlyChange: '+1.2%'
}

const schools = [
  {
    name: 'College of Southern Nevada',
    rating: 8,
    type: 'Community College',
    distance: '3.5 miles'
  },
  {
    name: 'Lifetime Learning Center',
    rating: 9,
    type: 'Adult Education',
    distance: 'On-site'
  },
  {
    name: 'Desert Vista Community Center',
    rating: 9,
    type: 'Recreation Center',
    distance: 'On-site'
  }
]

const amenities = [
  {
    name: 'Eagle Crest Golf Course',
    type: 'Golf Course',
    distance: 'On-site'
  },
  {
    name: 'Mountain Shadows Community Center',
    type: 'Recreation',
    distance: 'On-site'
  },
  {
    name: 'Sun City Library',
    type: 'Library',
    distance: 'On-site'
  },
  {
    name: 'Vista Commons Shopping',
    type: 'Shopping & Dining',
    distance: '5 minutes'
  }
]

export default function SunCitySummerlinPage() {
  return (
    <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Sun City Summerlin: Premier 55+ Active Adult Living</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sun City Summerlin stands as Las Vegas' premier 55+ active adult community, offering a resort-style lifestyle 
              designed specifically for active adults seeking a vibrant, low-maintenance living environment. This well-established 
              community features three championship golf courses, four expansive community centers, and over 80 social clubs 
              and activities that ensure residents always have opportunities for recreation, socializing, and personal growth. 
              For active adults seeking real estate in Summerlin, Sun City Summerlin offers an unparalleled combination of 
              amenities, lifestyle, and community.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The community's low-maintenance homes are designed specifically for active adult living, featuring single-story 
              floor plans, energy-efficient features, and designs that accommodate the needs and preferences of residents 55 
              and older. Properties in Sun City Summerlin often feature stunning views of the golf courses, surrounding 
              mountains, and beautifully landscaped common areas, creating a living environment that feels both luxurious and 
              comfortable. This thoughtful approach to design and lifestyle makes Sun City Summerlin one of the most desirable 
              communities for active adult real estate in Las Vegas.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Real Estate Market in Sun City Summerlin</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The real estate market in Sun City Summerlin offers excellent value for active adults seeking quality homes in 
              a well-established, amenity-rich community. With a median home price of $525,000 and homes typically selling 
              within 32 days, Sun City Summerlin represents strong value in the Summerlin real estate market. The community's 
              focus on low-maintenance living means homes are designed for ease of care, allowing residents to spend more 
              time enjoying the community's extensive amenities and less time on home maintenance.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Properties in Sun City Summerlin typically feature well-designed floor plans that accommodate single-level living, 
              with features such as master suites on the main level, open kitchens perfect for entertaining, and outdoor spaces 
              designed for relaxation and socializing. The community's consistent design standards ensure that all homes maintain 
              their value and appeal, while the extensive amenities and active social scene provide residents with a lifestyle 
              that many describe as being like living in a permanent vacation resort.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Resort-Style Amenities & Active Lifestyle</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sun City Summerlin's three championship golf courses provide residents with world-class golfing opportunities, 
              while the four community centers offer fitness facilities, pools, craft rooms, card rooms, and event spaces that 
              accommodate a wide variety of activities and interests. The community's over 80 social clubs ensure that residents 
              can pursue their hobbies, make new friends, and stay active and engaged in a vibrant community setting.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Beyond the extensive amenities, Sun City Summerlin's location provides residents with convenient access to shopping, 
              dining, healthcare facilities, and all the services that active adults need. The community's commitment to 
              maintaining an active, engaging lifestyle makes it an ideal choice for those seeking real estate in a 55+ 
              community that truly embodies the concept of active adult living. This combination of amenities, lifestyle, and 
              convenience makes Sun City Summerlin one of the most desirable communities for active adult real estate in Summerlin.
            </p>
          </div>
        </div>
      </div>
      <HyperLocalNeighborhoodPage
        name="Sun City Summerlin"
        description="Sun City Summerlin is Las Vegas' premier 55+ active adult community, offering resort-style living with three golf courses, four community centers, and over 80 social clubs and activities. Enjoy low-maintenance homes designed specifically for active adults, with stunning mountain and golf course views."
        marketStats={marketStats}
        schools={schools}
        amenities={amenities}
        imageUrl="/images/sun-city-hero.jpg"
        realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
      />
    </div>
  )
}
