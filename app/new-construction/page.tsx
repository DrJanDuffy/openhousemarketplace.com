import { Metadata } from 'next'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Summerlin New Construction | New Homes for Sale & Communities',
  description: 'Explore new construction homes for sale in Summerlin West. Discover modern designs, smart home features, energy efficiency, and the latest amenities. Find your perfect new build from top builders like Toll Brothers, Lennar, and Pulte in Las Vegas\' premier master-planned community.',
  keywords: 'Summerlin new construction, new homes Las Vegas, new construction Summerlin, Toll Brothers Summerlin, Lennar homes, Pulte homes, new homes for sale Summerlin, new construction communities Las Vegas',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/new-construction',
  },
  openGraph: {
    title: 'Summerlin New Construction | New Homes & Communities',
    description: 'Brand new homes in Summerlin from top builders. Modern designs with smart features and energy efficiency.',
    images: ['/images/new-construction-hero.jpg'],
    url: 'https://www.openhousemarketplace.com/new-construction',
  },
}

const marketStats = {
  medianPrice: '$925,000',
  daysOnMarket: 0,
  activeListings: 35,
  pricePerSqFt: '$345',
  monthlyChange: '+1.9%'
}

const schools = [
  {
    name: 'New Summerlin Schools',
    rating: 9,
    type: 'Public Schools',
    distance: 'Planned'
  },
  {
    name: 'Existing Top Schools',
    rating: 9,
    type: 'Various Options',
    distance: 'Nearby'
  },
  {
    name: 'Future School Sites',
    rating: 8,
    type: 'Development Plans',
    distance: 'In Progress'
  }
]

const amenities = [
  {
    name: 'Future Community Parks',
    type: 'park',
    distance: 'Under Construction'
  },
  {
    name: 'New Shopping Centers',
    type: 'Shopping & Dining',
    distance: 'Planned'
  },
  {
    name: 'Walking Trails',
    type: 'Recreation',
    distance: 'Being Added'
  },
  {
    name: 'Community Centers',
    type: 'Recreation',
    distance: 'In Development'
  }
]

export default function NewConstructionPage() {
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
          name: 'Summerlin New Construction | New Homes for Sale',
          description: 'Explore new construction homes for sale in Summerlin West. Discover modern designs, smart home features, and energy efficiency.',
        }}
      />
    <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">New Construction Homes in Summerlin West</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Discover the latest in new construction homes throughout Summerlin West, where leading builders are creating 
              modern, innovative communities that represent the future of master-planned living. From luxury estates by Toll 
              Brothers to energy-efficient homes from Lennar and Pulte, Summerlin's new construction market offers homebuyers 
              the opportunity to purchase brand-new properties with cutting-edge designs, smart home technology, and the latest 
              in energy efficiency and sustainable building practices.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              New construction in Summerlin means more than just a new home—it means the opportunity to customize your property, 
              select finishes and features that match your lifestyle, and enjoy the peace of mind that comes with builder 
              warranties and modern construction standards. Whether you're seeking a luxury estate, a family home with modern 
              amenities, or an energy-efficient property designed for sustainability, Summerlin's new construction communities 
              offer options that meet every buyer's needs and preferences in today's Las Vegas real estate market.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Benefits of New Construction in Summerlin</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Purchasing new construction in Summerlin offers numerous advantages over buying an existing home. New construction 
              homes feature the latest in building technology, energy-efficient systems, and smart home automation that reduce 
              utility costs and enhance daily living. Modern floor plans designed for today's lifestyles, premium finishes 
              included in the base price, and the ability to customize your home during construction make new construction an 
              attractive option for buyers seeking properties that perfectly match their needs and preferences.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Builder warranties protect your investment, while new construction typically means fewer immediate maintenance needs 
              compared to older homes. The opportunity to choose your lot, select finishes, and potentially customize floor plans 
              ensures that your new home in Summerlin reflects your personal style and meets your specific requirements. With a 
              median price of $925,000 for new construction homes in Summerlin, buyers receive exceptional value for properties 
              that include the latest features, modern designs, and comprehensive warranties.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Top Builders in Summerlin</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Summerlin's new construction market features some of the nation's most respected home builders, each bringing their 
              unique approach to design, quality, and customer service. Toll Brothers specializes in luxury homes in premier 
              locations, offering custom-quality homes with exceptional craftsmanship and innovative designs. Lennar's Everything's 
              Included® program means buyers receive premium features and upgrades as standard, while Pulte focuses on 
              energy-efficient construction and sustainable building practices that reduce long-term costs and environmental impact.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Each builder brings unique strengths to Summerlin's new construction market, from luxury amenities and custom 
              options to energy efficiency and smart home technology. Working with an experienced real estate agent like Dr. Jan 
              Duffy ensures you understand each builder's offerings, navigate the new construction process effectively, and secure 
              the best deals and terms when purchasing a new home in Summerlin. Her relationships with builders and knowledge of 
              the new construction market provide clients with advantages that may not be available when working independently.
            </p>
          </div>
        </div>
      </div>
      <HyperLocalNeighborhoodPage
        name="Summerlin New Construction"
        description="Discover brand new homes in Summerlin's newest communities. From leading builders like Toll Brothers, Lennar, and Pulte, these modern homes feature smart technology, energy-efficient designs, and the latest amenities. Choose from a variety of floor plans and customize your dream home in Las Vegas' premier master-planned community."
        marketStats={marketStats}
        schools={schools}
        amenities={amenities}
        imageUrl="/images/new-construction-hero.jpg"
        realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
      />
    </div>
    </>
  )
}
