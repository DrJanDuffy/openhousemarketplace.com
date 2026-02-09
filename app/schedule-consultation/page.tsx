import { Metadata } from 'next'
import Link from 'next/link'
import CalendlyInlineWidget from '@/components/CalendlyInlineWidget'
import CalendlyPopupLink from '@/components/CalendlyPopupLink'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Schedule a Free Consultation | Dr. Jan Duffy Real Estate',
  description: 'Schedule a free consultation with Dr. Jan Duffy. Discuss your real estate goals, tour Summerlin open houses, or get a market analysis—no obligation.',
  keywords: 'free consultation, schedule private showing, schedule consultation, Summerlin real estate consultation, Dr. Jan Duffy consultation, private home tour Summerlin, free real estate advice Las Vegas',
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/schedule-consultation',
  },
  openGraph: {
    title: 'Schedule a Free Consultation | Dr. Jan Duffy',
    description: 'Book a free consultation to discuss your real estate goals. No obligation.',
    url: 'https://www.openhousemarketplace.com/schedule-consultation',
  },
}

export default function ScheduleConsultationPage() {
  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: 'Schedule a Free Consultation | Dr. Jan Duffy Real Estate',
          description: 'Schedule a free consultation with Dr. Jan Duffy. Discuss your real estate goals, tour Summerlin open houses, or get a market analysis.',
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: 'https://www.openhousemarketplace.com/' },
            { name: 'Schedule a Free Consultation', url: 'https://www.openhousemarketplace.com/schedule-consultation' },
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
                Schedule a Free Consultation
              </li>
            </ol>
          </nav>

          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Schedule a free consultation
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-6">
              Discuss your real estate goals with Dr. Jan Duffy—buying, selling, or scheduling a private showing. No obligation.
            </p>
            <CalendlyPopupLink className="inline-flex items-center justify-center bg-[#0069ff] hover:bg-[#0052cc] text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg">
              Schedule a free consultation
            </CalendlyPopupLink>
          </header>

          <section aria-label="Schedule a consultation" className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">Or choose a time below</h2>
            <CalendlyInlineWidget
              minWidth={320}
              height={700}
              className="rounded-lg overflow-hidden w-full"
            />
          </section>

          <p className="mt-6 text-center text-sm text-gray-500">
            Prefer to call? <a href="tel:+17022003422" className="text-blue-600 hover:underline">(702) 200-3422</a>
            {' · '}
            <Link href="/book-tour" className="text-blue-600 hover:underline">Schedule a private showing</Link>
            {' · '}
            <Link href="/review-us" className="text-blue-600 hover:underline">Review us on Google</Link>
          </p>
        </div>
      </main>
    </>
  )
}
