import { Metadata } from 'next'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Summerlin Luxury Homes | Exclusive Estates & Properties for Sale',
  description: 'Explore luxury homes for sale in Summerlin West. Discover custom estates, golf course properties, exclusive gated communities, and the finest luxury real estate in Las Vegas. Experience premier luxury living in Summerlin\'s most prestigious neighborhoods.',
  keywords: 'Summerlin luxury homes, luxury homes for sale Summerlin, Las Vegas luxury real estate, custom estates Summerlin, golf course homes, gated communities, luxury Summerlin real estate, high-end homes Las Vegas',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/luxury-homes',
  },
  openGraph: {
    title: 'Summerlin Luxury Homes | Exclusive Estates & Properties',
    description: 'Discover Summerlin\'s most prestigious luxury homes and estates. Exclusive listings and private showings.',
    images: ['/images/luxury-homes-hero.jpg'],
    url: 'https://www.openhousemarketplace.com/luxury-homes',
  },
}

const marketStats = {
  medianPrice: '$2,250,000',
  daysOnMarket: 42,
  activeListings: 45,
  pricePerSqFt: '$425',
  monthlyChange: '+2.1%'
}

const schools = [
  {
    name: 'The Alexander Dawson School',
    rating: 10,
    type: 'Private K-12',
    distance: 'Nearby'
  },
  {
    name: 'Faith Lutheran',
    rating: 9,
    type: 'Private College Prep',
    distance: 'Close proximity'
  },
  {
    name: 'Top Public Schools',
    rating: 9,
    type: 'Public Education',
    distance: 'Throughout Area'
  }
]

const amenities = [
  {
    name: 'Multiple Golf Clubs',
    type: 'Golf Course',
    distance: 'Various Locations'
  },
  {
    name: 'Red Rock Canyon',
    type: 'park',
    distance: 'Adjacent'
  },
  {
    name: 'Private Country Clubs',
    type: 'Recreation',
    distance: 'Multiple Options'
  },
  {
    name: 'Tivoli Village',
    type: 'Luxury Shopping',
    distance: 'Nearby'
  }
]

export default function LuxuryHomesPage() {
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
        type="WebPage"
        data={{
          name: 'Summerlin Luxury Homes | Exclusive Estates & Properties',
          description: 'Explore luxury homes for sale in Summerlin West. Discover custom estates, golf course properties, and exclusive gated communities.',
        }}
      />
    <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Luxury Homes in Summerlin West</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Summerlin West stands as Las Vegas' premier destination for luxury real estate, offering discerning buyers access 
              to some of the finest homes in the region. From custom-built mansions in The Ridges to exclusive golf course 
              properties in Red Rock Country Club, Summerlin's luxury home market encompasses a diverse range of properties that 
              exemplify sophisticated design, premium finishes, and exceptional locations. For buyers seeking the ultimate in 
              luxury living, Summerlin offers an unparalleled combination of architectural excellence, world-class amenities, and 
              natural beauty that creates a truly exceptional living experience.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The luxury real estate market in Summerlin represents the upper echelon of Las Vegas residential properties, with 
              homes ranging from elegant estates to spectacular custom-built properties that showcase the finest in architectural 
              design and craftsmanship. These luxury homes typically feature expansive floor plans, high-end finishes, premium 
              appliances, and outdoor living spaces designed for entertaining and relaxation. Guard-gated communities provide 
              additional privacy and security, while locations within Summerlin's most prestigious neighborhoods ensure residents 
              enjoy the benefits of master-planned community living alongside exclusive amenities and services.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Luxury Real Estate Market in Summerlin</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The luxury home market in Summerlin continues to demonstrate strong performance, with a median price of $2,250,000 
              and properties that represent exceptional value in the high-end real estate market. Luxury homes in Summerlin 
              typically feature sophisticated architectural designs, premium materials, and attention to detail that reflects the 
              discerning tastes of luxury homebuyers. From Mediterranean-inspired estates to contemporary masterpieces, Summerlin's 
              luxury properties showcase diverse architectural styles while maintaining the quality and craftsmanship that defines 
              luxury real estate in Las Vegas.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Properties in Summerlin's luxury market often include premium features such as wine cellars, home theaters, 
              temperature-controlled garages, outdoor kitchens and fireplaces, infinity pools, and professionally designed 
              landscapes. The guard-gated nature of many luxury communities provides privacy and security, while proximity to 
              world-class golf courses, private clubs, and premier shopping and dining ensures residents enjoy the full range of 
              amenities and services that luxury living in Summerlin provides.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Exclusive Communities & Locations</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Summerlin's luxury homes are found in some of the area's most exclusive and desirable communities. The Ridges offers 
              custom-built estates with stunning mountain and Strip views, while Red Rock Country Club provides luxury golf course 
              living with access to championship golf. Other prestigious communities throughout Summerlin offer luxury homes with 
              unique characteristics, from Siena's Mediterranean-inspired architecture to Regency's prime location near Downtown 
              Summerlin. Each luxury community provides residents with distinct advantages, whether it's access to private golf, 
              stunning natural settings, or convenient proximity to Summerlin's best amenities.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              For luxury homebuyers, Summerlin offers the opportunity to invest in properties that not only provide exceptional 
              living environments but also represent sound real estate investments. The combination of master-planned community 
              infrastructure, exclusive amenities, and Las Vegas' growing reputation as a luxury destination ensures that luxury 
              homes in Summerlin maintain their value and appeal over time. Working with a luxury real estate specialist like Dr. 
              Jan Duffy ensures you have access to exclusive listings, off-market opportunities, and the expertise needed to 
              navigate the luxury real estate market successfully.
            </p>
          </div>
        </div>
      </div>
      <HyperLocalNeighborhoodPage
        name="Summerlin Luxury Homes"
        description="Discover Summerlin's most prestigious luxury homes and estates. From custom-built mansions in The Ridges to exclusive golf course properties in Red Rock Country Club, experience the pinnacle of Las Vegas luxury real estate. Enjoy world-class amenities, stunning views, and unparalleled privacy in guard-gated communities."
        marketStats={marketStats}
        schools={schools}
        amenities={amenities}
        imageUrl="/images/luxury-homes-hero.jpg"
        realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
      />
    </div>
    </>
  )
}
