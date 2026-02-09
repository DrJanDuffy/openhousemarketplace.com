import { Metadata } from 'next'
import Link from 'next/link'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Red Rock Country Club | Luxury Golf Course Homes for Sale',
  description: 'Discover Red Rock Country Club homes for sale in Summerlin West. Championship 36-hole golf courses, resort-style amenities, stunning mountain views, and guard-gated luxury living. Experience premier golf course real estate in Las Vegas.',
  keywords: 'Red Rock Country Club, Red Rock Country Club homes for sale, golf course homes Summerlin, Summerlin real estate, luxury homes Las Vegas, guard gated community, Red Rock CC real estate, golf course homes Las Vegas',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/neighborhoods/red-rock-country-club',
  },
  openGraph: {
    title: 'Red Rock Country Club | Luxury Golf Course Homes',
    description: 'Live the resort lifestyle at Red Rock Country Club. Championship golf, luxury amenities, and stunning homes.',
    images: ['/images/red-rock-cc-hero.jpg'],
    url: 'https://www.openhousemarketplace.com/neighborhoods/red-rock-country-club',
  },
}

const marketStats = {
  medianPrice: '$1,450,000',
  daysOnMarket: 38,
  activeListings: 15,
  pricePerSqFt: '$385',
  monthlyChange: '+1.8%'
}

const schools = [
  {
    name: 'Bonner Elementary School',
    rating: 8,
    type: 'Public Elementary',
    distance: '1.5 miles'
  },
  {
    name: 'Faith Lutheran Middle & High',
    rating: 9,
    type: 'Private 6-12',
    distance: '2.8 miles'
  },
  {
    name: 'West Career & Technical Academy',
    rating: 10,
    type: 'Public Magnet',
    distance: '3.2 miles'
  }
]

const amenities = [
  {
    name: 'Red Rock Country Club Golf',
    type: 'Golf Course',
    distance: 'On-site'
  },
  {
    name: 'Tennis & Sports Complex',
    type: 'Recreation',
    distance: 'On-site'
  },
  {
    name: 'Red Rock Casino',
    type: 'Entertainment',
    distance: '5 minutes'
  },
  {
    name: 'Downtown Summerlin',
    type: 'Shopping & Dining',
    distance: '8 minutes'
  }
]

export default function RedRockCountryClubPage() {
  return (
    <>
    <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Red Rock Country Club: Premier Golf Course Living</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Red Rock Country Club represents the ultimate in golf course living in Summerlin West, offering an 
              exceptional private club lifestyle that combines championship golf, world-class amenities, and luxury 
              residential living. This guard-gated community features 36 holes of championship golf, world-class tennis 
              facilities, and a stunning 44,000-square-foot clubhouse that serves as the heart of this exclusive community. 
              For buyers seeking luxury real estate with access to premier golf and resort-style amenities, Red Rock 
              Country Club offers an unparalleled lifestyle opportunity.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The community's luxury homes feature panoramic views of the championship golf courses, surrounding mountains, 
              and the Las Vegas Strip, creating a living environment that truly captures the essence of desert luxury. 
              Properties in Red Rock Country Club are designed to take full advantage of these stunning vistas, with 
              expansive windows, outdoor living spaces, and thoughtful architectural details that enhance the connection 
              between indoor and outdoor living. This integration of architecture and natural beauty makes Red Rock Country 
              Club one of the most desirable communities for luxury real estate in Summerlin.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              View <Link href="/open-houses" className="text-blue-600 font-semibold hover:underline">Summerlin open houses</Link> this weekend, including homes in Red Rock Country Club.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Luxury Real Estate Market in Red Rock Country Club</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The real estate market in Red Rock Country Club represents premium luxury homes in Summerlin, with a median 
              home price of $1,450,000 and properties that showcase sophisticated design and premium finishes. Homes in 
              this community typically feature spacious floor plans, high-end materials, and outdoor spaces designed for 
              entertaining and relaxation. The guard-gated nature of the community provides privacy and security, while 
              the golf course setting offers residents the opportunity to enjoy championship golf just steps from their homes.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Properties in Red Rock Country Club often include premium features such as gourmet kitchens, spa-like master 
              suites, outdoor kitchens and fireplaces, and professionally designed landscaping that complements the golf 
              course setting. The community's architectural standards ensure that all homes contribute to Red Rock Country 
              Club's reputation as one of Summerlin's premier golf course communities, while still allowing for the 
              customization and personalization that luxury homeowners value.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Championship Golf & Resort-Style Amenities</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Red Rock Country Club's 36 holes of championship golf provide residents with access to some of the finest 
              golf in Las Vegas. The two courses, designed to complement the natural desert landscape, offer challenging 
              play for golfers of all skill levels while showcasing the stunning natural beauty of the Red Rock Canyon area. 
              For golf enthusiasts purchasing luxury real estate in Summerlin, Red Rock Country Club offers the ultimate 
              in golf course living with convenient access to world-class golf facilities.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Beyond golf, the community's 44,000-square-foot clubhouse serves as a central gathering place, offering fine 
              dining, social spaces, and event facilities. The world-class tennis complex provides additional recreational 
              opportunities, while the community's location offers convenient access to Downtown Summerlin, Red Rock Canyon, 
              and all the amenities that make Summerlin West such a desirable location for luxury real estate. This 
              combination of exclusive amenities, championship golf, and convenient location makes Red Rock Country Club 
              one of the most sought-after communities for luxury homes in Summerlin.
            </p>
          </div>
        </div>
      </div>
      <HyperLocalNeighborhoodPage
        name="Red Rock Country Club"
        description="Red Rock Country Club offers an exceptional private club lifestyle with 36 holes of championship golf, world-class tennis facilities, and a stunning 44,000-square-foot clubhouse. This guard-gated community features luxury homes with panoramic views of the golf course, mountains, and Las Vegas Strip."
        marketStats={marketStats}
        schools={schools}
        amenities={amenities}
        imageUrl="/images/red-rock-cc-hero.jpg"
        realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
      />
    </div>
    </>
  )
}
