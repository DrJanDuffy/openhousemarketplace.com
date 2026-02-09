import { Metadata } from 'next'
import Link from 'next/link'
import { storeLocations } from '@/data/storeLocations'
import DirectionsWidget from '@/components/DirectionsWidget'
import CalendlyInlineWidget from '@/components/CalendlyInlineWidget'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Get Directions | Plan Your Visit | Dr. Jan Duffy Real Estate',
  description: 'Add directions to your visit. Use Google Maps to plan your trip to our office. See estimated travel time for driving, transit, walking, and bicycling. Get started at no cost.',
  keywords: 'directions, get directions, plan your visit, travel time, driving transit walking bicycling, Summerlin office directions',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/directions',
  },
  openGraph: {
    title: 'Get Directions | Plan Your Visit',
    description: 'Plan your visit with directions and estimated travel time across different transportation modes.',
    url: 'https://www.openhousemarketplace.com/directions',
    images: ['/images/og/og-image.jpg'],
  },
}

export default function DirectionsPage() {
  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: 'Get Directions | Plan Your Visit | Dr. Jan Duffy Real Estate',
          description: 'Use directions from Google Maps Platform to help customers plan their visit. Show estimated travel time across different transportation modes.',
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: 'https://www.openhousemarketplace.com/' },
            { name: 'Get Directions', url: 'https://www.openhousemarketplace.com/directions' },
          ],
        }}
      />

      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
            <ol className="flex flex-wrap gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-gray-700 font-medium" aria-current="page">
                Get Directions
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Add directions to your visit
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Use directions from Google Maps Platform to help you plan your visit. Enter your starting point, choose our location, and see estimated travel time for driving, transit, walking, and bicycling. Simply use the form below—get started at no cost.
            </p>
          </header>

          {storeLocations.length === 0 ? (
            <div className="p-6 rounded-xl border border-gray-200 bg-gray-50 text-center">
              <p className="text-gray-600">
                No destinations configured. Add store locations in{' '}
                <code className="text-sm bg-gray-200 px-1 rounded">data/storeLocations.ts</code> to enable directions.
              </p>
              <Link href="/store-locations" className="mt-4 inline-block text-blue-600 font-medium hover:underline">
                View store locations →
              </Link>
            </div>
          ) : (
            <section aria-label="Directions planner">
              <DirectionsWidget destinations={storeLocations} />
            </section>
          )}

          {/* Schedule your visit - Calendly inline widget */}
          {storeLocations.length > 0 && (
            <section className="mt-12 py-12 bg-gray-50 rounded-xl border border-gray-200" aria-labelledby="schedule-after-directions-heading">
              <h2 id="schedule-after-directions-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
                Schedule your visit
              </h2>
              <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">
                After you plan your route, book a time with Dr. Jan Duffy for an open house tour or consultation. Choose a slot below.
              </p>
              <div className="max-w-2xl mx-auto">
                <CalendlyInlineWidget
                  url="https://calendly.com/drjanduffy/open-house-tour"
                  minWidth={320}
                  height={700}
                  className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm"
                />
              </div>
            </section>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-700">
              <strong>Tip:</strong> Click &quot;My location&quot; to use your current position as the starting point. You can also <Link href="/store-locations" className="text-blue-600 hover:underline">view all our store locations</Link> on a map.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
