import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import StructuredData from '@/components/StructuredData'

const REVIEW_URL = 'https://g.page/r/CbX7prnSI9uREBM/review'
const QR_CODE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(REVIEW_URL)}`
const GOOGLE_REVIEW_GUIDE = 'https://support.google.com/business/answer/16334724'
const GOOGLE_TIPS_REVIEWS = 'https://support.google.com/business/answer/3474122'

export const metadata: Metadata = {
  title: 'Review us on Google | Dr. Jan Duffy Real Estate',
  description: 'Leave a review for Dr. Jan Duffy on Google. Reviews build trust and help our Business Profile stand out on Search and Maps. Share our review link or QR code.',
  keywords: 'review Dr. Jan Duffy, Google review, Summerlin real estate reviews, leave a review',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/review-us',
  },
  openGraph: {
    title: 'Review us on Google | Dr. Jan Duffy Real Estate',
    description: 'Leave a review for Dr. Jan Duffy. Share our review link or QR code.',
    url: 'https://www.openhousemarketplace.com/review-us',
    images: ['/images/og/og-image.jpg'],
  },
}

export default function ReviewUsPage() {
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Leave a review for Dr. Jan Duffy Real Estate: ${REVIEW_URL}`)}`
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(REVIEW_URL)}`

  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: 'https://www.openhousemarketplace.com/' },
            { name: 'Review us on Google', url: 'https://www.openhousemarketplace.com/review-us' },
          ],
        }}
      />
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
          <ol className="flex flex-wrap gap-x-2 gap-y-1">
            <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li aria-hidden>/</li>
            <li className="text-gray-700 font-medium" aria-current="page">Review us on Google</li>
          </ol>
        </nav>

        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Review us on Google
          </h1>
          <p className="text-lg text-gray-600">
            Give customers a link to review your business on Google. Reviews build trust and help your Business Profile stand out to customers on Search and Maps.
          </p>
          <p className="mt-2 text-gray-600">
            Business Profiles with 5 or more reviews can get up to twice as many customers.
          </p>
        </header>

        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Leave a review</h2>
          <p className="text-gray-600 mb-4">
            Use the link below to leave a review for Dr. Jan Duffy Real Estate on Google.
          </p>
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#4285F4] hover:bg-[#3367D6] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Review us on Google
          </a>
          <p className="mt-3 text-sm text-gray-500 break-all">
            {REVIEW_URL}
          </p>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Share the review link</h2>
          <p className="text-gray-600 mb-4">
            Share our review link on WhatsApp or Facebook so more customers can leave a review.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
              aria-label="Share review link on WhatsApp"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Share on WhatsApp
            </a>
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
              aria-label="Share review link on Facebook"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Share on Facebook
            </a>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Share your reviews QR code</h2>
          <p className="text-gray-600 mb-2">
            Right-click the QR code and select &quot;Save Image As...&quot; so you can share your QR code with customers.
          </p>
          <div className="flex flex-col items-center mt-6">
            <a
              href={REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
              aria-label="Open Google review page for Dr. Jan Duffy Real Estate"
            >
              <Image
                src={QR_CODE_URL}
                alt="QR code linking to Google review page for Dr. Jan Duffy Real Estate"
                width={240}
                height={240}
                unoptimized
                className="rounded-lg border border-gray-200"
              />
            </a>
            <p className="mt-4 text-lg font-semibold text-gray-900">Scan me!</p>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Learn more</h2>
          <p className="text-gray-600 mb-4">
            Learn more about best practices for asking for reviews, and what to do about negative reviews.
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href={GOOGLE_REVIEW_GUIDE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Share a link or QR code to request reviews (Google Help)
              </a>
            </li>
            <li>
              <a
                href={GOOGLE_TIPS_REVIEWS}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Tips to get more reviews (Google Help)
              </a>
            </li>
          </ul>
        </section>

        <p className="mt-8 text-center">
          <Link href="/contact" className="text-blue-600 hover:underline font-medium">
            Contact Dr. Jan Duffy
          </Link>
        </p>
      </div>
    </main>
    </>
  )
}
