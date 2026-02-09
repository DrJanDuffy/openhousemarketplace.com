import { Metadata } from 'next'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import ExternalLink from '@/components/ExternalLink'
import RealScoutSearchCard from '@/components/RealScoutSearchCard'
import RealScoutWidget from '@/components/RealScoutWidget'

const REALSCOUT_SEARCH_URL =
  'https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=='

export const revalidate = 86400 // ISR: revalidate daily

export const metadata: Metadata = {
  title: 'MLS Property Search | Summerlin Real Estate | Dr. Jan Duffy',
  description:
    'Search MLS listings in Summerlin. Access the full MLS database of homes for sale in Las Vegas\' premier master-planned community.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.openhousemarketplace.com/tour/mls' },
  openGraph: {
    title: 'MLS Property Search | Summerlin Real Estate',
    description: 'Search the full MLS database of homes for sale in Summerlin.',
    url: 'https://www.openhousemarketplace.com/tour/mls',
    images: ['/images/og/og-image.jpg'],
  },
}

export default function TourMLSPage() {
  return (
    <>
      <StructuredData type="WebPage" data={{ name: 'MLS Property Search | Summerlin Real Estate | Dr. Jan Duffy', description: 'Search MLS listings in Summerlin. Access the full MLS database of homes for sale in Las Vegas\' premier master-planned community.' }} />
      <StructuredData type="Organization" data={{ url: 'https://www.openhousemarketplace.com' }} />
      <StructuredData type="BreadcrumbList" data={{ items: [{ name: 'Home', url: 'https://www.openhousemarketplace.com/' }, { name: 'MLS Property Search', url: 'https://www.openhousemarketplace.com/tour/mls' }] }} />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">MLS Property Search</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Search the full MLS database of homes for sale in Summerlin. Save favorites, get alerts, and schedule showings with Dr. Jan Duffy&apos;s home search. For this weekend&apos;s tours, see our <Link href="/open-houses" className="text-blue-600 font-semibold hover:underline">Summerlin open houses</Link>.
            </p>
          </div>

          <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Find Your Perfect Home</h2>
            <RealScoutSearchCard />
          </section>

          <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Live Summerlin West Listings</h2>
            <p className="text-gray-600 mb-4">
              Browse current properties for sale. Filter by price, beds, baths, and more. Create an account to save searches and get instant alerts.
            </p>
            <RealScoutWidget
              className="min-h-[400px]"
              priceMin="400000"
              priceMax="3000000"
            />
          </section>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <ExternalLink
              href={REALSCOUT_SEARCH_URL}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
              showIcon={false}
            >
              Open full search in new tab
            </ExternalLink>
            <Link href="/contact" className="inline-block text-gray-700 hover:text-blue-600 font-medium">
              Contact Dr. Jan Duffy
            </Link>
          </div>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-600">
              Create a free account to save searches, schedule showings, and receive instant alerts for price drops and new listings. Dr. Jan Duffy&apos;s team is notified when you show interest so you get priority support.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
