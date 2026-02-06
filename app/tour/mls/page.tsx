import { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'

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
  },
}

export default function TourMLSPage() {
  return (
    <>
      <StructuredData type="WebPage" data={{ name: 'MLS Property Search | Summerlin Real Estate | Dr. Jan Duffy', description: 'Search MLS listings in Summerlin. Access the full MLS database of homes for sale in Las Vegas\' premier master-planned community.' }} />
      <StructuredData type="Organization" data={{ url: 'https://www.openhousemarketplace.com' }} />
      <StructuredData type="BreadcrumbList" data={{ items: [{ name: 'Home', url: 'https://www.openhousemarketplace.com/' }, { name: 'MLS Property Search', url: 'https://www.openhousemarketplace.com/tour/mls' }] }} />
      <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">MLS Property Search</h1>
          <p className="text-xl text-gray-600 mb-8">
            Access the full MLS database of homes for sale in Summerlin. Search listings, schedule showings, and get updates with Dr. Jan Duffy&apos;s home search. Looking for open houses? See our <a href="/open-houses" className="text-blue-600 font-semibold hover:underline">Summerlin open houses</a> page for this weekend&apos;s home tours.
          </p>
          <a
            href={REALSCOUT_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg"
          >
            Search MLS Listings
          </a>
        </div>
        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Search Summerlin Listings</h2>
            <p className="text-gray-600">
              The search gives you access to every listing in the Las Vegas MLS. Filter by neighborhood, price, beds, baths, and more. Save favorites and get alerts when new homes match your criteria.
            </p>
          </section>
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-600">
              Create a free account to save searches, schedule showings, and receive instant alerts for price drops and new listings. Dr. Jan Duffy&apos;s team is notified when you show interest so you get priority support.
            </p>
          </section>
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact Dr. Jan Duffy</h2>
            <p className="text-gray-600 mb-4">
              Need help finding your perfect home in Summerlin West? Reach out for a personalized search or to schedule a buyer consultation.
            </p>
            <a href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">
              Contact Us
            </a>
          </section>
        </div>
      </div>
    </div>
    </>
  )
}

