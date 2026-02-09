import { Metadata } from 'next'
import Link from 'next/link'
import { storeLocations } from '@/data/storeLocations'
import StoreLocationsMap from '@/components/StoreLocationsMap'
import CalendlyInlineWidget from '@/components/CalendlyInlineWidget'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Find Our Stores | Store Locations & Map | Dr. Jan Duffy Real Estate',
  description: 'Find our store locations. View a custom map of all our offices in Summerlin and Las Vegas. Get directions, phone numbers, and hours. Get started at no cost.',
  keywords: 'store locations, find our stores, office locations, Summerlin real estate office, Dr. Jan Duffy locations',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/store-locations',
  },
  openGraph: {
    title: 'Find Our Stores | Store Locations Map',
    description: 'View all our store locations on a custom map. Get directions and contact info.',
    url: 'https://www.openhousemarketplace.com/store-locations',
    images: ['/images/og/og-image.jpg'],
  },
}

export default function StoreLocationsPage() {
  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: 'Find Our Stores | Store Locations | Dr. Jan Duffy Real Estate',
          description: 'Custom map showing all our store and office locations. Choose your store location and get directions.',
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: 'https://www.openhousemarketplace.com/' },
            { name: 'Find Our Stores', url: 'https://www.openhousemarketplace.com/store-locations' },
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
                Find Our Stores
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Find our stores
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Use the map below to find all our store locations. Choose your store, get directions, and see contact details and hours. Add the map to your site and get started at no cost.
            </p>
          </header>

          <section aria-label="Store locations map and list">
            <StoreLocationsMap locations={storeLocations} />
          </section>

          {/* Schedule a visit - Calendly inline widget */}
          <section className="mt-12 py-12 bg-gray-50 rounded-xl border border-gray-200" aria-labelledby="schedule-visit-heading">
            <h2 id="schedule-visit-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
              Schedule a visit
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">
              Book a time with Dr. Jan Duffy to visit our office or schedule an open house tour. Choose a slot below.
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

          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700">
              <strong>Choose your store locations:</strong> Store and office locations are managed in{' '}
              <code className="text-sm bg-gray-200 px-1 rounded">data/storeLocations.ts</code>. Add or edit entries there to update the map and list above.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
