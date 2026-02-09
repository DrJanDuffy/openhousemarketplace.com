import { Metadata } from 'next'
import Link from 'next/link'
import CalendlyInlineWidget from '@/components/CalendlyInlineWidget'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Schedule a private showing | Dr. Jan Duffy | Summerlin Real Estate',
  description: 'Schedule a private showing with Dr. Jan Duffy. Book a time that works for you—tour Summerlin homes, get a market analysis, or discuss your real estate goals.',
  keywords: 'schedule private showing, private home tour Summerlin, book showing, Dr. Jan Duffy appointment, Summerlin real estate tour',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/book-tour',
  },
  openGraph: {
    title: 'Schedule a private showing | Dr. Jan Duffy',
    description: 'Book a private showing. Choose a time below.',
    url: 'https://www.openhousemarketplace.com/book-tour',
    images: ['/images/og/og-image.jpg'],
  },
}

export default function BookTourPage() {
  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: 'Schedule a private showing | Dr. Jan Duffy',
          description: 'Schedule a private showing or real estate consultation with Dr. Jan Duffy. Book a time that works for you.',
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: 'https://www.openhousemarketplace.com/' },
            { name: 'Schedule a private showing', url: 'https://www.openhousemarketplace.com/book-tour' },
          ],
        }}
      />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
            <ol className="flex flex-wrap gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-gray-700 font-medium" aria-current="page">
                Schedule a private showing
              </li>
            </ol>
          </nav>

          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Schedule a private showing
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Book a private showing with Dr. Jan Duffy. Choose a date and time below—no signup required.
            </p>
          </header>

          <section aria-label="Schedule a private showing" className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6">
            <CalendlyInlineWidget
              minWidth={320}
              height={700}
              className="rounded-lg overflow-hidden w-full"
            />
          </section>

          <p className="mt-6 text-center text-sm text-gray-500">
            Prefer to call? <a href="tel:+17022003422" className="text-blue-600 hover:underline">(702) 200-3422</a>
            {' · '}
            <Link href="/schedule-consultation" className="text-blue-600 hover:underline">Schedule a free consultation</Link>
            {' · '}
            <Link href="/review-us" className="text-blue-600 hover:underline">Review us on Google</Link>
          </p>
        </div>
      </main>
    </>
  )
}
