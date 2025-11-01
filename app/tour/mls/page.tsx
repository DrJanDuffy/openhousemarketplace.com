import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'MLS Property Search | Summerlin Real Estate',
  description: 'Search MLS listings in Summerlin. Access the full MLS database of homes for sale in Las Vegas\' premier master-planned community.',
  robots: 'noindex, follow',
}

export default function TourMLSPage() {
  // Redirect to RealScout search instead of showing a separate MLS page
  // If you want to keep this page, you can remove the redirect
  redirect('https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==')
  
  // Alternative: If you want to show a page instead of redirecting, use this:
  /*
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">MLS Property Search</h1>
          <p className="text-xl text-gray-600 mb-8">
            Access the full MLS database of homes for sale in Summerlin
          </p>
          <a
            href="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg"
          >
            Search MLS Listings
          </a>
        </div>
      </div>
    </div>
  )
  */
}

