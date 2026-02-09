import { Metadata } from 'next'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Sitemap | Open House Market Place',
  description: 'Complete sitemap of all pages on Open House Market Place. Find neighborhoods, resources, builders, and real estate information in Summerlin West.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/sitemap',
  },
}

export default function SitemapPage() {
  const neighborhoods = [
    { name: 'The Ridges', url: '/neighborhoods/the-ridges' },
    { name: 'Red Rock Country Club', url: '/neighborhoods/red-rock-country-club' },
    { name: 'Summerlin Centre', url: '/neighborhoods/summerlin-centre' },
    { name: 'Sun City Summerlin', url: '/neighborhoods/sun-city-summerlin' },
    { name: 'The Trails', url: '/neighborhoods/the-trails' },
    { name: 'Willows', url: '/neighborhoods/willows' },
    { name: 'Mesa Ridge', url: '/neighborhoods/mesa-ridge' },
    { name: 'Siena', url: '/neighborhoods/siena' },
    { name: 'Regency', url: '/neighborhoods/regency' },
  ]

  const zipCodes = [
    { code: '89135', url: '/zip/89135' },
    { code: '89138', url: '/zip/89138' },
    { code: '89144', url: '/zip/89144' },
  ]

  const resources = [
    { name: 'Home Buying Guide', url: '/resources/home-buying-guide' },
    { name: 'HOA Communities', url: '/resources/hoa-communities' },
    { name: 'Lifestyle Guide', url: '/resources/lifestyle-guide' },
    { name: 'New Construction', url: '/resources/new-construction' },
  ]

  const builders = [
    { name: 'Toll Brothers', url: '/builders/toll-brothers' },
    { name: 'Lennar', url: '/builders/lennar' },
    { name: 'Pulte', url: '/builders/pulte' },
  ]

  return (
    <>
      <StructuredData 
        type="LocalBusiness"
        data={{
          openingHours: ['Mo-Fr 09:00-18:00', 'Sa-Su 10:00-16:00'],
          aggregateRating: {
            ratingValue: '5.0',
            reviewCount: '100'
          }
        }}
      />
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Sitemap</h1>
        <p className="text-gray-600 mb-8">
          Find all pages and resources on Open House Market Place. Explore neighborhoods, resources, and real estate information in Summerlin West, Las Vegas.
        </p>

        <div className="space-y-8">
          {/* Main Pages */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Main Pages</h2>
            <ul className="space-y-2">
              <li><Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
              <li><Link href="/open-houses" className="text-blue-600 hover:text-blue-800">Open Houses</Link></li>
              <li><Link href="/market-report" className="text-blue-600 hover:text-blue-800">Market Report</Link></li>
              <li><Link href="/schools" className="text-blue-600 hover:text-blue-800">Schools</Link></li>
              <li><Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact</Link></li>
              <li><Link href="/review-us" className="text-blue-600 hover:text-blue-800">Review us on Google</Link></li>
              <li><Link href="/about" className="text-blue-600 hover:text-blue-800">About</Link></li>
              <li><Link href="/luxury-homes" className="text-blue-600 hover:text-blue-800">Luxury Homes</Link></li>
              <li><Link href="/new-construction" className="text-blue-600 hover:text-blue-800">New Construction</Link></li>
            </ul>
          </section>

          {/* Neighborhoods */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Neighborhoods</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {neighborhoods.map((neighborhood) => (
                <li key={neighborhood.url}>
                  <Link href={neighborhood.url} className="text-blue-600 hover:text-blue-800">
                    {neighborhood.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Zip Codes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Zip Codes</h2>
            <ul className="space-y-2">
              {zipCodes.map((zip) => (
                <li key={zip.url}>
                  <Link href={zip.url} className="text-blue-600 hover:text-blue-800">
                    Zip Code {zip.code}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Resources */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Resources</h2>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.url}>
                  <Link href={resource.url} className="text-blue-600 hover:text-blue-800">
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Builders */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Builders</h2>
            <ul className="space-y-2">
              {builders.map((builder) => (
                <li key={builder.url}>
                  <Link href={builder.url} className="text-blue-600 hover:text-blue-800">
                    {builder.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Legal */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal</h2>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-blue-600 hover:text-blue-800">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-blue-600 hover:text-blue-800">Disclaimer</Link></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
    </>
  )
}
