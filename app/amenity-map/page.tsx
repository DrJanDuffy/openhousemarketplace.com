import { Metadata } from 'next'
import Link from 'next/link'
import AmenityMap from '@/components/AmenityMap'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Amenity Map | Nearby Restaurants, Parks, Parking & More | Summerlin',
  description: 'Explore nearby amenities in Summerlin and Las Vegas: restaurants, parks, parking, cafes, grocery stores, gyms, pharmacies, and more. Interactive map powered by Google Maps.',
  keywords: 'Summerlin amenities, nearby restaurants Summerlin, parks Las Vegas, parking Summerlin, cafes grocery gym pharmacy map',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/amenity-map',
  },
  openGraph: {
    title: 'Amenity Map | Nearby Places in Summerlin',
    description: 'Find restaurants, parks, parking, cafes, and more near Summerlin and Las Vegas.',
    url: 'https://www.openhousemarketplace.com/amenity-map',
    images: ['/images/og/og-image.jpg'],
  },
}

export default function AmenityMapPage() {
  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: 'Amenity Map | Nearby Restaurants, Parks & More | Summerlin',
          description: 'Interactive map of nearby amenities in Summerlin: restaurants, parks, parking, cafes, grocery, gyms, pharmacies.',
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: 'https://www.openhousemarketplace.com/' },
            { name: 'Amenity Map', url: 'https://www.openhousemarketplace.com/amenity-map' },
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
                Amenity Map
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Explore Nearby Amenities
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Use the map below to find nearby places in Summerlin and Las Vegas. Select types such as
              restaurants, parks, parking, cafes, grocery stores, gas stations, gyms, and pharmacies.
              Click a marker for the place name. Powered by Google Maps Platform.
            </p>
          </header>

          <section aria-label="Interactive amenity map">
            <AmenityMap />
          </section>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-700">
              <strong>Tip:</strong> This map shows places near Summerlin. Use the filters above to
              switch between restaurants, parks, cafes, grocery, gyms, and more. Click a marker for
              the place name.
            </p>
          </div>

          <div className="mt-8 p-4 rounded-lg border border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Dr. Jan Duffy Real Estate</h2>
            <p className="text-sm text-gray-700 mb-2">
              Summerlin West, Las Vegas, NV 89135
            </p>
            <p className="text-sm mb-3">
              <a href="tel:+17022003422" className="text-blue-600 font-medium hover:underline">
                (702) 200-3422
              </a>
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+17022003422"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
              >
                Call
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=36.1699,-115.3301"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
              >
                Directions
              </a>
              <a
                href="https://www.google.com/maps/place/?q=Dr+Jan+Duffy+Real+Estate+Summerlin+West+Las+Vegas+NV&action=reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
              >
                View Google Reviews
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
