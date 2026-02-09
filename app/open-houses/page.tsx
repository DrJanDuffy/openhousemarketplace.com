import { Metadata } from 'next'
import Link from 'next/link'
import FeaturedOpenHouses from '@/components/FeaturedOpenHouses'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'
import CalendlyInlineWidget from '@/components/CalendlyInlineWidget'
import CalendlyPopupLink from '@/components/CalendlyPopupLink'
import StructuredData from '@/components/StructuredData'

export const revalidate = 3600 // ISR: revalidate hourly (open house listings change often)

export const metadata: Metadata = {
  title: 'Summerlin Open Houses | This Weekend\'s Home Tours & Private Showings',
  description: 'Find open houses in Summerlin this weekend. Schedule a private showing with Dr. Jan Duffy. Tour luxury homes, new construction, and family homes in Las Vegas\' premier master-planned community.',
  keywords: 'Summerlin open houses, schedule private showing, private home tour Summerlin, Las Vegas home tours, weekend open houses, Summerlin real estate, open houses this weekend Summerlin, Summerlin West open houses',
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
    title: 'Summerlin Open Houses | Schedule a Private Showing',
    description: 'Tour the best homes for sale in Summerlin this weekend. Schedule a private showing with Dr. Jan Duffy.',
    images: [{ url: 'https://www.openhousemarketplace.com/images/dr-jan-duffy.jpg', width: 1200, height: 630, alt: 'Dr. Jan Duffy - Summerlin West Real Estate Agent' }],
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

const openHouseFaqs = [
  {
    question: 'When are open houses in Summerlin?',
    answer: 'Open houses in Summerlin are typically held on weekends (Saturday and Sunday), with many listings open from late morning through afternoon. Times vary by property; check our Summerlin open house listings or our home search for current dates and times.'
  },
  {
    question: 'How do I find open houses this weekend in Summerlin?',
    answer: 'Visit our Open Houses page for this weekend\'s home tours, or use Dr. Jan Duffy\'s home search to search listings and filter by open house dates. You can also sign up for open house alerts to get notified when new Summerlin open houses are added.'
  },
  {
    question: 'What should I bring to an open house?',
    answer: 'Bring a list of questions, your phone for photos and notes, and comfortable shoes. If you\'re serious about buying, consider bringing a pre-approval letter. Dr. Jan Duffy can help you prepare for Summerlin open house visits and evaluate properties.'
  },
  {
    question: 'Are there open houses in Summerlin West neighborhoods like The Ridges or Red Rock?',
    answer: 'Yes. Open houses are held across Summerlin West, including The Ridges, Red Rock Country Club, Summerlin Centre, The Trails, and other neighborhoods. Use our neighborhood pages and home search to find open houses in your preferred area.'
  }
]

export default function OpenHousesPage() {
  return (
    <>
      <StructuredData type="LocalBusiness" />
      <StructuredData 
        type="WebPage"
        data={{
          name: 'Summerlin Open Houses | This Weekend\'s Home Tours',
          description: 'Find open houses in Summerlin this weekend. Tour luxury homes, new construction, and family homes in Las Vegas\' premier master-planned community.',
        }}
      />
      <StructuredData type="BreadcrumbList" data={{ items: [
        { name: 'Home', url: 'https://www.openhousemarketplace.com/' },
        { name: 'Summerlin Open Houses', url: 'https://www.openhousemarketplace.com/open-houses' },
      ] }} />
      <StructuredData type="FAQPage" data={{ faqs: openHouseFaqs }} />
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
              Summerlin offers diverse opportunities for buyers at every stage of their real estate journey.{' '}
              <CalendlyPopupLink className="text-blue-600 font-semibold hover:underline">Schedule a private showing</CalendlyPopupLink> to get personalized open house recommendations.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              When attending open houses in Summerlin, consider not just the property itself but also the neighborhood, 
              schools, amenities, and overall lifestyle that each area offers. Our home search allows you to search 
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Frequently Asked Questions About Summerlin Open Houses</h2>
            <dl className="space-y-4">
              {openHouseFaqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-semibold text-gray-900">{faq.question}</dt>
                  <dd className="text-gray-700 mt-1 ml-0">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <FeaturedOpenHouses />
      {/* Schedule a private showing - Calendly inline widget */}
      <section className="bg-white border-t border-gray-200 py-12" aria-labelledby="schedule-showing-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="schedule-showing-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
            Schedule a private showing
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">
            Book a time with Dr. Jan Duffy for a private showing. Choose a slot below—no signup required.
          </p>
          <div className="max-w-2xl mx-auto">
            <CalendlyInlineWidget
              minWidth={320}
              height={700}
              className="rounded-xl overflow-hidden border border-gray-200 shadow-sm"
            />
          </div>
        </div>
      </section>
      <p className="text-center text-sm text-gray-500 mb-8">
        Enjoyed your visit? <Link href="/review-us" className="text-blue-600 hover:underline font-medium">Leave a review on Google</Link>
      </p>
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
    </>
  )
}
