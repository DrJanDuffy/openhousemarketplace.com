import { Metadata } from 'next'
import { BASE_URL } from '@/lib/metadata-utils'
import {
  OPEN_HOUSES_PAGE_FAQS,
  SEO_OPEN_HOUSES_DESCRIPTION,
  SEO_OPEN_HOUSES_TITLE,
  SEO_PRIMARY_KEYWORD,
} from '@/config/seo'

import Link from 'next/link'
import RealScoutWidget from '@/components/RealScoutWidget'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'
import CalendlyInlineWidget from '@/components/CalendlyInlineWidget'
import CalendlyPopupLink from '@/components/CalendlyPopupLink'
import StructuredData from '@/components/StructuredData'

export const revalidate = 3600 // ISR: revalidate hourly (open house listings change often)

export const metadata: Metadata = {
  title: SEO_OPEN_HOUSES_TITLE,
  description: SEO_OPEN_HOUSES_DESCRIPTION,
  keywords:
    'Summerlin Las Vegas open houses, Summerlin open houses this weekend, Las Vegas open houses, private showing Summerlin, Summerlin West home tours, Red Rock Country Club open house, The Ridges open house, Dr. Jan Duffy',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: `${BASE_URL}/open-houses`,
  },
  openGraph: {
    title: SEO_OPEN_HOUSES_TITLE,
    description: SEO_OPEN_HOUSES_DESCRIPTION,
    images: [{ url: `${BASE_URL}/images/dr-jan-duffy.jpg`, width: 1200, height: 630, alt: 'Dr. Jan Duffy - Summerlin West Real Estate Agent' }],
    url: `${BASE_URL}/open-houses`,
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

const openHouseFaqs = [...OPEN_HOUSES_PAGE_FAQS]

export default function OpenHousesPage() {
  return (
    <>
      {/* WebPage JSON-LD comes from GoogleEnhancement (layout); avoid duplicate graphs. */}
      <StructuredData type="BreadcrumbList" data={{ items: [
        { name: 'Home', url: `${BASE_URL}/` },
        { name: SEO_PRIMARY_KEYWORD, url: `${BASE_URL}/open-houses` },
      ] }} />
      <StructuredData type="FAQPage" data={{ faqs: openHouseFaqs }} />
    <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{SEO_PRIMARY_KEYWORD}</h1>
            <p className="text-gray-700 leading-relaxed mb-4">
              Discover Summerlin Las Vegas open houses: homes available for viewing this weekend across Summerlin West. Our listings
              feature luxury estates, family-friendly homes, new construction, and investment opportunities
              throughout master-planned Summerlin. Whether you&apos;re searching for your dream home or exploring opportunities,
              touring open houses lets you experience properties firsthand and see what makes each neighborhood special in Nevada&apos;s premier master-planned community.
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
              Explore open houses in <Link href="/neighborhoods/the-ridges" className="text-blue-600 font-semibold hover:underline">The Ridges</Link>, <Link href="/neighborhoods/red-rock-country-club" className="text-blue-600 font-semibold hover:underline">Red Rock Country Club</Link>, <Link href="/neighborhoods/summerlin-centre" className="text-blue-600 font-semibold hover:underline">Summerlin Centre</Link>, and <Link href="/neighborhoods/sun-city-summerlin" className="text-blue-600 font-semibold hover:underline">Sun City Summerlin</Link>, or see <Link href="/neighborhoods" className="text-blue-600 font-semibold hover:underline">all Summerlin neighborhoods</Link> for community info and schools.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Summerlin&apos;s open house market includes properties across all price points and neighborhoods, from entry-level 
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
      <section className="bg-gray-50 border-t border-gray-200 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            Homes for sale — office listings
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Live MLS listings from Dr. Jan Duffy&apos;s office (sorted low to high, $400K–$900K — same range as the site-wide office bands). For the full search experience, visit{' '}
            <Link href="/tour/mls" className="font-semibold text-blue-600 hover:underline">
              MLS property search
            </Link>
            .
          </p>
          <RealScoutWidget className="rounded-xl bg-white p-4 shadow-lg sm:p-6" />
        </div>
      </section>
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
        {' · '}
        <Link href="/sitemap" className="text-blue-600 hover:underline font-medium">Sitemap</Link>
      </p>
      <HyperLocalNeighborhoodPage
        name={SEO_PRIMARY_KEYWORD}
        description="Explore Summerlin Las Vegas open houses this weekend—from luxury estates to family homes—with curated listings, search tools, and private showings with Dr. Jan Duffy. Real-time updates and local market context for every property."
        heroHeadingLevel="h2"
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
