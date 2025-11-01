import { Metadata } from 'next'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'

export const metadata: Metadata = {
  title: 'Summerlin Open Houses | This Weekend\'s Home Tours & Real Estate Showings',
  description: 'Find open houses in Summerlin this weekend. Tour luxury homes, new construction, and family homes in Las Vegas\' premier master-planned community. Discover current open house listings, schedule tours, and explore Summerlin real estate opportunities.',
  keywords: 'Summerlin open houses, Las Vegas home tours, weekend open houses, Summerlin real estate, house tours, open houses this weekend Summerlin, Summerlin West open houses, Las Vegas open houses',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/open-houses',
  },
  openGraph: {
    title: 'Summerlin Open Houses | This Weekend\'s Home Tours',
    description: 'Tour the best homes for sale in Summerlin this weekend. Live updates and instant scheduling.',
    images: ['/images/open-houses-hero.jpg'],
    url: 'https://www.openhousemarketplace.com/open-houses',
  },
}

const marketStats = {
  medianPrice: '$750,000',
  daysOnMarket: 35,
  activeListings: 85,
  pricePerSqFt: '$325',
  monthlyChange: '+1.7%'
}

const schools = [
  {
    name: 'Summerlin School District',
    rating: 9,
    type: 'Public Schools',
    distance: 'Various Locations'
  },
  {
    name: 'Private Schools',
    rating: 9,
    type: 'Private Education',
    distance: 'Multiple Options'
  },
  {
    name: 'Charter Schools',
    rating: 8,
    type: 'Charter Options',
    distance: 'Throughout Summerlin'
  }
]

const amenities = [
  {
    name: 'Downtown Summerlin',
    type: 'Shopping & Dining',
    distance: 'Central Location'
  },
  {
    name: 'Multiple Golf Courses',
    type: 'Recreation',
    distance: 'Throughout Area'
  },
  {
    name: 'Parks & Trails',
    type: 'park',
    distance: '250+ miles of trails'
  },
  {
    name: 'Community Centers',
    type: 'Recreation',
    distance: 'Multiple Locations'
  }
]

export default function OpenHousesPage() {
  return (
    <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Summerlin Open Houses - Tour Homes This Weekend</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Discover Summerlin's finest homes available for viewing this weekend. Our comprehensive open house listings 
              feature luxury estates, family-friendly homes, new construction properties, and investment opportunities 
              throughout Summerlin West. Whether you're searching for your dream home or exploring real estate opportunities, 
              touring open houses provides the perfect opportunity to experience properties firsthand and understand what 
              makes each neighborhood special in Las Vegas' premier master-planned community.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Open houses in Summerlin offer buyers the chance to explore properties at their own pace, ask questions, and 
              get a real sense of the home's layout, condition, and neighborhood. From luxury properties in The Ridges to 
              family homes in Summerlin Centre, our curated selection of open houses showcases the diversity and quality of 
              real estate available throughout Summerlin. Working with an experienced real estate agent like Dr. Jan Duffy 
              ensures you make the most of open house visits, with expert guidance on property evaluation, market insights, 
              and next steps in the home buying process.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Finding the Right Open House for You</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Summerlin's open house market includes properties across all price points and neighborhoods, from entry-level 
              homes perfect for first-time buyers to luxury estates that represent the pinnacle of Las Vegas real estate. 
              Our open house listings are updated regularly to provide the most current information about available properties, 
              including times, dates, and property details. With a median home price of $750,000 and 85 active listings, 
              Summerlin offers diverse opportunities for buyers at every stage of their real estate journey.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              When attending open houses in Summerlin, consider not just the property itself but also the neighborhood, 
              schools, amenities, and overall lifestyle that each area offers. Our RealScout platform allows you to search 
              open houses by neighborhood, price range, and property features, making it easy to find homes that match your 
              criteria. For personalized guidance on which open houses to visit, contact Dr. Jan Duffy to discuss your 
              preferences and receive recommendations on properties that align with your real estate goals.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Maximizing Your Open House Experience</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Attending open houses effectively requires preparation and strategy, especially in Summerlin's competitive real 
              estate market. Before visiting properties, review our market reports, neighborhood guides, and school information 
              to understand the context of each area. During open house visits, take notes, ask questions, and consider not 
              just the home but also factors like location, neighborhood character, and proximity to amenities that matter to you.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              For buyers serious about purchasing in Summerlin, attending multiple open houses provides valuable market education 
              and helps refine your preferences. Working with a knowledgeable real estate agent ensures you understand market 
              conditions, property values, and negotiation strategies when you find the right home. Dr. Jan Duffy's expertise in 
              the Summerlin market helps clients navigate open houses effectively and make informed decisions about real estate 
              purchases in Las Vegas' premier master-planned community.
            </p>
          </div>
        </div>
      </div>
      <HyperLocalNeighborhoodPage
        name="Summerlin Open Houses"
        description="Explore Summerlin's finest homes this weekend. From luxury estates to family homes, find your perfect match with our curated selection of open houses. Get real-time updates, instant scheduling, and exclusive market insights for every property."
        marketStats={marketStats}
        schools={schools}
        amenities={amenities}
        imageUrl="/images/open-houses-hero.jpg"
        realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
      />
    </div>
  )
}
