import { Metadata } from 'next'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'The Ridges Summerlin | Luxury Homes for Sale & Real Estate',
  description: 'Explore luxury homes for sale in The Ridges, Summerlin\'s most prestigious gated community. Custom estates, golf course views, exclusive amenities, and stunning mountain vistas. Live in Las Vegas\' premier address. Discover real estate opportunities in The Ridges.',
  keywords: 'The Ridges Summerlin, The Ridges homes for sale, luxury homes Las Vegas, custom estates Summerlin, golf course homes, guard gated community, The Ridges real estate, luxury Summerlin homes',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/neighborhoods/the-ridges',
  },
  openGraph: {
    title: 'The Ridges Summerlin | Luxury Homes & Real Estate',
    description: 'Discover luxury living in The Ridges, Summerlin\'s most prestigious community. Custom estates with stunning views.',
    images: ['/images/the-ridges-hero.jpg'],
    url: 'https://www.openhousemarketplace.com/neighborhoods/the-ridges',
  },
}

const marketStats = {
  medianPrice: '$2,850,000',
  daysOnMarket: 45,
  activeListings: 12,
  pricePerSqFt: '$485',
  monthlyChange: '+2.3%'
}

const schools = [
  {
    name: 'Palo Verde High School',
    rating: 9,
    type: 'Public High School',
    distance: '1.2 miles'
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
]

const amenities = [
  {
    name: 'Bear\'s Best Golf Club',
    type: 'Golf Course',
    distance: 'On-site'
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
  },
  {
    name: 'Red Rock Casino Resort',
    type: 'Entertainment',
    distance: '7 minutes'
  }
]

export default function TheRidgesPage() {
  return (
    <>
      <StructuredData 
        type="Place"
        data={{
          name: 'The Ridges Summerlin',
          locality: 'Las Vegas',
          address: {
            addressLocality: 'Las Vegas',
            addressRegion: 'NV',
            postalCode: '89135',
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
            { name: 'Neighborhoods', url: 'https://www.openhousemarketplace.com/neighborhoods' },
            { name: 'The Ridges', url: 'https://www.openhousemarketplace.com/neighborhoods/the-ridges' }
          ]
        }}
      />
      <StructuredData 
        type="WebPage"
        data={{
          name: 'The Ridges Summerlin | Luxury Homes for Sale',
          description: 'Explore luxury homes for sale in The Ridges, Summerlin\'s most prestigious gated community.',
          about: {
            '@type': 'Place',
            name: 'The Ridges Summerlin'
          }
        }}
      />
      <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About The Ridges: Summerlin's Most Prestigious Community</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Ridges represents the pinnacle of luxury living in Summerlin West, offering custom-designed estates 
              with breathtaking views of the Las Vegas Strip, Red Rock Canyon, and the surrounding mountains. As 
              Summerlin's most prestigious guard-gated community, The Ridges sets the standard for luxury real estate 
              in Las Vegas, combining unparalleled natural beauty with world-class amenities and architectural excellence.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This exclusive community features custom-designed luxury homes that showcase the finest in architectural 
              design and craftsmanship. From Mediterranean-inspired villas to contemporary estates, properties in The 
              Ridges reflect the sophisticated tastes of their owners while maintaining the natural beauty and serene 
              atmosphere that makes this community so desirable. For buyers seeking the ultimate in luxury real estate, 
              The Ridges offers an unmatched combination of privacy, prestige, and natural beauty.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Luxury Real Estate in The Ridges</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The real estate market in The Ridges represents the upper echelon of luxury homes in Summerlin, with a 
              median home price of $2,850,000 and properties that exemplify luxury living at its finest. Homes in The 
              Ridges typically feature expansive floor plans, high-end finishes, and outdoor living spaces designed to 
              take advantage of the stunning views. The guard-gated nature of the community provides an additional layer 
              of privacy and security that luxury homebuyers value when purchasing real estate in Las Vegas.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Properties in The Ridges often include premium features such as wine cellars, home theaters, outdoor 
              kitchens, infinity pools, and professionally designed landscapes that complement the natural desert 
              environment. The community's architectural guidelines ensure that all homes contribute to The Ridges' 
              reputation as one of Summerlin's most prestigious neighborhoods, while still allowing for the customization 
              and personalization that luxury homeowners expect.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Exclusive Amenities & Bear's Best Golf Club</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              One of The Ridges' most distinctive features is its association with Bear's Best Golf Club, a Jack Nicklaus-designed 
              golf course that offers championship play and stunning views. Residents of The Ridges have access to this 
              premier golf facility, providing them with world-class golfing just minutes from their homes. The golf 
              course's challenging layout and beautiful desert setting make it one of Las Vegas' most respected golf 
              experiences.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Beyond golf, The Ridges offers exclusive amenities including private parks, walking trails, and community 
              spaces designed for relaxation and socializing. The community's location provides convenient access to 
              Downtown Summerlin's premier shopping and dining, while maintaining the privacy and tranquility that 
              residents value. This combination of exclusive amenities, natural beauty, and convenient location makes 
              The Ridges one of the most desirable communities for luxury real estate in Summerlin West.
            </p>
          </div>
        </div>
      </div>
      <HyperLocalNeighborhoodPage
        name="The Ridges Summerlin"
        description="The Ridges is Summerlin's most prestigious village, featuring custom-designed luxury homes with stunning views of the Las Vegas Strip and Red Rock Canyon. This guard-gated community offers exclusive amenities including the Bear's Best Golf Club, private parks, and walking trails."
        marketStats={marketStats}
        schools={schools}
        amenities={amenities}
        imageUrl="/images/the-ridges-hero.jpg"
        realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
      />
    </div>
    </>
  )
}
