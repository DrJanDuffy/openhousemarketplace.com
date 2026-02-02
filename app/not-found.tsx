import Link from 'next/link'
import { Metadata } from 'next'
import { Home, Search, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found. Browse Summerlin open houses, neighborhoods, or contact Dr. Jan Duffy.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page not found</h2>
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved. Here are some helpful links:
        </p>
        <nav className="flex flex-col sm:flex-row gap-4 justify-center" aria-label="Helpful links">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Home className="h-5 w-5" aria-hidden />
            Home
          </Link>
          <Link
            href="/open-houses"
            className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Search className="h-5 w-5" aria-hidden />
            Open Houses
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Phone className="h-5 w-5" aria-hidden />
            Contact
          </Link>
        </nav>
      </div>
    </div>
  )
}
