import { Metadata } from 'next'
import Link from 'next/link'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Mesa Ridge Summerlin | Family Homes for Sale with Large Backyards',
  description: 'Find your perfect family home in Mesa Ridge, Summerlin West. Discover homes with large backyards, great schools, and family-friendly amenities in Las Vegas\' premier master-planned community. Explore real estate opportunities in this ideal family neighborhood.',
  keywords: 'Mesa Ridge Summerlin, Mesa Ridge homes for sale, family homes large yards, great schools Summerlin, family-friendly neighborhood, Mesa Ridge real estate, Summerlin West homes, Las Vegas family homes',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/neighborhoods/mesa-ridge',
  },
  openGraph: {
    title: 'Mesa Ridge Summerlin | Family Homes with Large Backyards',
    description: 'Discover Mesa Ridge, a family-friendly neighborhood in Summerlin with large backyards and great schools.',
    images: ['/images/mesa-ridge-hero.jpg'],
    url: 'https://www.openhousemarketplace.com/neighborhoods/mesa-ridge',
  }
}

const marketStats = {
  medianPrice: '$725,000',
  daysOnMarket: 35,
  activeListings: 22,
  pricePerSqFt: '$315',
  monthlyChange: '+2.1%'
}

const schools = [
  {
    name: 'Palo Verde High School',
    rating: 9,
    type: 'Public High School',
    distance: '1.3 miles'
  },
  {
    name: 'Vista Middle School',
    rating: 8,
    type: 'Public Middle School',
    distance: '0.9 miles'
  },
  {
    name: 'Doral Academy Red Rock',
    rating: 8,
    type: 'Charter K-12',
    distance: '2.2 miles'
  }
]

const amenities = [
  {
    name: 'Mesa Ridge Park',
    type: 'park',
    distance: 'Within community'
  },
  {
    name: 'Downtown Summerlin',
    type: 'Shopping & Dining',
    distance: '7 minutes'
  },
  {
    name: 'Community Recreation Center',
    type: 'Recreation',
    distance: 'On-site'
  },
  {
    name: 'Walking Paths',
    type: 'Recreation',
    distance: 'Throughout neighborhood'
  }
]

export default function MesaRidgePage() {
  return (
    <>
      <StructuredData type="LocalBusiness" />
    <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Mesa Ridge Neighborhood in Summerlin</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Mesa Ridge is a family-oriented neighborhood in Summerlin West specifically designed for families who value 
              space, community, and outdoor living. This well-planned community features homes with large backyards, 
              excellent schools, and abundant recreational amenities that make it one of Summerlin's most sought-after 
              neighborhoods for families. The combination of spacious lots, family-friendly design, and top-rated schools 
              makes Mesa Ridge an ideal choice for families purchasing real estate in Las Vegas.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              What sets Mesa Ridge apart from other Summerlin neighborhoods is its emphasis on providing families with 
              generous outdoor living spaces. Large backyards in Mesa Ridge homes provide space for children to play, 
              families to entertain, and residents to enjoy outdoor activities in the comfort of their own property. 
              This focus on outdoor space makes Mesa Ridge particularly appealing to families who want room to grow and 
              play without leaving home.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              View <Link href="/open-houses" className="text-blue-600 font-semibold hover:underline">Summerlin open houses</Link> this weekend, including homes in Mesa Ridge.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Real Estate Opportunities in Mesa Ridge</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Mesa Ridge real estate market offers excellent opportunities for families seeking spacious homes in a 
              well-maintained, family-focused community. With a median home price of $725,000 and homes typically selling 
              within 35 days, Mesa Ridge represents strong value in the Summerlin real estate market. The neighborhood's 
              emphasis on larger lots and backyards means buyers get more outdoor space compared to many other Summerlin 
              neighborhoods, making it an attractive option for families prioritizing space and outdoor living.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Properties in Mesa Ridge typically feature well-designed floor plans that accommodate family living, with 
              open layouts, multiple living spaces, and outdoor areas that extend the living space into the backyard. 
              The neighborhood's consistent design standards ensure that homes maintain their value and appeal, while 
              providing families with the space they need to thrive in Summerlin West.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Family-Focused Amenities & Recreation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Mesa Ridge offers families an exceptional array of recreational amenities designed specifically for family 
              enjoyment. The neighborhood features its own community recreation center, providing residents with convenient 
              access to fitness facilities, community spaces, and organized activities. Mesa Ridge Park serves as a central 
              gathering place, with playground equipment, open spaces for sports and games, and picnic areas perfect for 
              family gatherings and community events.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Walking paths throughout the Mesa Ridge neighborhood connect residents to the broader Summerlin trail system, 
              providing safe, convenient routes for walking, jogging, and biking. This connectivity means families can 
              easily access Summerlin's extensive recreational amenities while enjoying the peace and security of their 
              neighborhood. The combination of private backyard spaces and community recreational facilities gives Mesa 
              Ridge families the best of both worlds when it comes to outdoor living and recreation.
            </p>
          </div>
        </div>
      </div>
      <HyperLocalNeighborhoodPage
        name="Mesa Ridge Summerlin"
        description="Mesa Ridge is a family-oriented neighborhood in Summerlin featuring homes with large backyards, excellent schools, and abundant recreational amenities. Perfect for families who want space to play and grow, Mesa Ridge offers a welcoming community atmosphere with top-rated schools, parks, and easy access to Summerlin's extensive trail system."
        marketStats={marketStats}
        schools={schools}
        amenities={amenities}
        imageUrl="/images/mesa-ridge-hero.jpg"
        realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
      />
    </div>
    </>
  )
}

