import { Metadata } from 'next'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'

export const metadata: Metadata = {
  title: 'Summerlin Centre | Modern Family Homes for Sale & Amenities',
  description: 'Explore Summerlin Centre homes for sale in Summerlin West. Modern family living with parks, top-rated schools, convenient shopping, and new construction opportunities. Experience the best of Summerlin\'s newest village and discover real estate in this family-friendly community.',
  keywords: 'Summerlin Centre, Summerlin Centre homes for sale, family homes Las Vegas, new construction Summerlin, Downtown Summerlin, modern homes, Summerlin Centre real estate, family-friendly Summerlin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/neighborhoods/summerlin-centre',
  },
  openGraph: {
    title: 'Summerlin Centre | Modern Family Homes & Amenities',
    description: 'Modern family living in Summerlin Centre. Parks, schools, and shopping at your doorstep.',
    images: ['/images/summerlin-centre-hero.jpg'],
    url: 'https://www.openhousemarketplace.com/neighborhoods/summerlin-centre',
  },
}

const marketStats = {
  medianPrice: '$850,000',
  daysOnMarket: 28,
  activeListings: 22,
  pricePerSqFt: '$295',
  monthlyChange: '+1.5%'
}

const schools = [
  {
    name: 'Vassiliadis Elementary',
    rating: 9,
    type: 'Public Elementary',
    distance: '0.8 miles'
  },
  {
    name: 'Sig Rogich Middle School',
    rating: 8,
    type: 'Public Middle',
    distance: '1.5 miles'
  },
  {
    name: 'West Career & Technical Academy',
    rating: 10,
    type: 'Public Magnet',
    distance: '2.1 miles'
  }
]

const amenities = [
  {
    name: 'Downtown Summerlin',
    type: 'Shopping & Dining',
    distance: '5 minutes'
  },
  {
    name: 'Fox Hill Park',
    type: 'park',
    distance: 'On-site'
  },
  {
    name: 'Summerlin Centre Community Park',
    type: 'park',
    distance: '0.5 miles'
  },
  {
    name: 'Las Vegas Ballpark',
    type: 'Entertainment',
    distance: '7 minutes'
  }
]

export default function SummerlinCentrePage() {
  return (
    <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Summerlin Centre: Modern Family Living</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Summerlin Centre represents the evolution of master-planned community living, offering modern family homes 
              with the latest in smart technology, energy efficiency, and contemporary design. This vibrant neighborhood 
              showcases the best of new construction in Summerlin, combining innovative home designs with convenient access 
              to shopping, dining, schools, and recreation. For families seeking modern homes in a well-planned, family-friendly 
              community, Summerlin Centre offers an ideal real estate opportunity in Las Vegas' premier master-planned community.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Located in the heart of Summerlin, Summerlin Centre provides residents with easy access to Downtown Summerlin's 
              premier shopping and dining options, while maintaining the residential character and community feel that families 
              value. The neighborhood's mix of new construction homes and established areas creates a dynamic community that 
              appeals to both first-time homebuyers and those seeking to upgrade to a modern home with the latest features 
              and amenities. This balance of new and established makes Summerlin Centre an attractive option for real estate 
              buyers at various stages of life.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Real Estate Opportunities in Summerlin Centre</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Summerlin Centre real estate market offers excellent opportunities for families seeking modern homes with 
              contemporary features and convenient locations. With a median home price of $850,000 and homes typically selling 
              within 28 days, Summerlin Centre represents strong value in the Summerlin real estate market. The neighborhood's 
              emphasis on new construction means buyers can enjoy modern floor plans, energy-efficient features, and smart home 
              technology that enhances daily living and reduces long-term costs.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Properties in Summerlin Centre typically feature open floor plans, modern kitchens with premium appliances, 
              and outdoor living spaces designed for today's lifestyle. The neighborhood's new construction focus ensures that 
              homes include the latest in design trends, building materials, and technology, providing buyers with properties 
              that are both stylish and functional. This combination of modern design and practical features makes Summerlin 
              Centre an excellent choice for families seeking contemporary real estate in Summerlin.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Family-Friendly Amenities & Location</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Summerlin Centre's location provides families with convenient access to some of Summerlin's best amenities. 
              The neighborhood's proximity to Downtown Summerlin means residents can easily access premier shopping, diverse 
              dining options, entertainment venues, and professional services. This convenience, combined with the 
              neighborhood's residential character, creates an ideal environment for families seeking both convenience and 
              community.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The community features multiple parks, including Fox Hill Park and the Summerlin Centre Community Park, providing 
              families with abundant opportunities for outdoor recreation and community gatherings. These parks serve as 
              gathering places for neighborhood events, children's activities, and family recreation, fostering the strong 
              sense of community that makes Summerlin Centre such an appealing choice for families purchasing real estate in 
              Summerlin West.
            </p>
          </div>
        </div>
      </div>
      <HyperLocalNeighborhoodPage
        name="Summerlin Centre"
        description="Summerlin Centre represents modern family living at its finest, offering new construction homes with smart technology and energy-efficient features. Located in the heart of Summerlin, residents enjoy easy access to Downtown Summerlin's shopping and dining, excellent schools, and abundant parks and trails."
        marketStats={marketStats}
        schools={schools}
        amenities={amenities}
        imageUrl="/images/summerlin-centre-hero.jpg"
        realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
      />
    </div>
  )
}
