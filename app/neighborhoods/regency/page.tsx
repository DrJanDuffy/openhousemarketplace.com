import { Metadata } from 'next'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Regency Summerlin | Luxury Homes for Sale in Prime Location',
  description: 'Discover luxury homes for sale in Regency, an upscale Summerlin West community offering prime location, luxury amenities, and exceptional living. Explore real estate opportunities in Las Vegas\' premier master-planned community.',
  keywords: 'Regency Summerlin, Regency homes for sale, luxury community Las Vegas, prime location Summerlin, luxury amenities, Regency real estate, luxury Summerlin homes, Las Vegas luxury real estate',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/neighborhoods/regency',
  },
  openGraph: {
    title: 'Regency Summerlin | Luxury Community with Prime Location',
    description: 'Explore Regency, an upscale Summerlin community with luxury amenities and prime location.',
    images: ['/images/regency-hero.jpg'],
    url: 'https://www.openhousemarketplace.com/neighborhoods/regency',
  }
}

const marketStats = {
  medianPrice: '$1,350,000',
  daysOnMarket: 52,
  activeListings: 11,
  pricePerSqFt: '$410',
  monthlyChange: '+2.8%'
}

const schools = [
  {
    name: 'Palo Verde High School',
    rating: 9,
    type: 'Public High School',
    distance: '1.6 miles'
  },
  {
    name: 'Alexander Dawson School',
    rating: 10,
    type: 'Private K-12',
    distance: '3.2 miles'
  },
  {
    name: 'Doral Academy Red Rock',
    rating: 8,
    type: 'Charter K-12',
    distance: '2.1 miles'
  }
]

const amenities = [
  {
    name: 'Golf Course Access',
    type: 'Golf Course',
    distance: 'Nearby courses'
  },
  {
    name: 'Downtown Summerlin',
    type: 'Shopping & Dining',
    distance: '5 minutes'
  },
  {
    name: 'Red Rock Casino Resort',
    type: 'Entertainment',
    distance: '8 minutes'
  },
  {
    name: 'Community Amenities',
    type: 'Recreation',
    distance: 'On-site'
  }
]

export default function RegencyPage() {
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
    <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Regency: Prime Location Luxury Living</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Regency is an exclusive, upscale community in Summerlin West that combines luxury living with one of the 
              most desirable locations in all of Summerlin. This prestigious neighborhood offers luxury homes in a prime 
              location, with exceptional amenities and convenient access to all the best that Summerlin has to offer. 
              For buyers seeking luxury real estate in Las Vegas, Regency represents an opportunity to invest in a 
              community that offers both exceptional homes and an unbeatable location.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              What sets Regency apart is its prime location within Summerlin West, offering residents convenient access 
              to Downtown Summerlin, Red Rock Canyon, top-rated schools, and premier shopping and dining, all while 
              maintaining the privacy and exclusivity that luxury homebuyers expect. This combination of location and 
              luxury makes Regency one of the most sought-after communities for high-end real estate purchases in the 
              Summerlin market.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Luxury Real Estate Market in Regency</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Regency real estate market represents the upper tier of luxury homes in Summerlin, with a median home 
              price of $1,350,000 and properties that showcase sophisticated design and premium finishes. Homes in Regency 
              are designed for luxury living, with spacious floor plans, high-end materials, and attention to detail that 
              reflects the discerning taste of luxury homebuyers. The community's location and reputation ensure that 
              properties in Regency maintain their value and appeal in the competitive Las Vegas luxury real estate market.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Properties in Regency typically feature gourmet kitchens with premium appliances, luxurious master suites 
              with spa-like bathrooms, outdoor living spaces designed for entertaining, and professionally landscaped yards. 
              The community's architectural standards ensure that all homes contribute to Regency's reputation as one of 
              Summerlin's premier luxury neighborhoods, while still allowing for the customization and personalization 
              that luxury homeowners value.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Prime Location Benefits</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Regency's prime location provides residents with exceptional convenience and access to Summerlin's best 
              amenities. Just 5 minutes from Downtown Summerlin, residents have easy access to premier shopping, fine 
              dining, entertainment venues, and professional services. This proximity means that luxury living in Regency 
              doesn't require sacrificing convenience or access to the amenities and services that make life in Summerlin 
              so appealing.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The neighborhood's location also provides convenient access to Red Rock Canyon, offering residents easy 
              access to hiking, rock climbing, and the natural beauty that makes the Las Vegas area unique. This 
              combination of urban convenience and natural beauty is one of the factors that makes Regency such an 
              attractive option for luxury homebuyers considering real estate in Summerlin West.
            </p>
          </div>
        </div>
      </div>
      <HyperLocalNeighborhoodPage
        name="Regency Summerlin"
        description="Regency is an upscale Summerlin community offering luxury homes in a prime location with exceptional amenities. With its proximity to Downtown Summerlin, Red Rock Canyon, and top-rated schools, Regency provides residents with the perfect balance of luxury living and convenient access to everything that makes Summerlin special."
        marketStats={marketStats}
        schools={schools}
        amenities={amenities}
        imageUrl="/images/regency-hero.jpg"
        realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
      />
    </div>
    </>
  )
}

