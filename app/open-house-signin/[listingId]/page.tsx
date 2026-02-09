import { Metadata } from 'next'
import { kv } from '@vercel/kv'
import CalendlyPopupLink from '@/components/CalendlyPopupLink'
import CalendlyInlineWidget from '@/components/CalendlyInlineWidget'
import OpenHouseSignInForm from '@/components/OpenHouseSignInForm'

const BASE_URL = 'https://www.openhousemarketplace.com'
const LISTING_PREFIX = 'oh-signin:listing:'

type Props = {
  params: Promise<{ listingId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { listingId } = await params
  return {
    title: 'Open House Sign-In | Schedule a Tour | Dr. Jan Duffy',
    description: 'Schedule a private tour with Dr. Jan Duffy or sign in at the open house. Summerlin real estate.',
    robots: { index: false, follow: true },
    alternates: { canonical: `${BASE_URL}/open-house-signin/${listingId}` },
    openGraph: {
      title: 'Open House Sign-In | Schedule a Tour | Dr. Jan Duffy',
      description: 'Schedule a private tour with Dr. Jan Duffy or sign in at the open house. Summerlin real estate.',
      url: `${BASE_URL}/open-house-signin/${listingId}`,
      images: ['/images/og/og-image.jpg'],
    },
  }
}

export default async function OpenHouseSignInPage({ params }: Props) {
  const { listingId } = await params
  let listingAddress: string | undefined
  try {
    const meta = await kv.get<{ listingAddress?: string }>(`${LISTING_PREFIX}${listingId}`)
    listingAddress = meta?.listingAddress
  } catch {
    listingAddress = undefined
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {listingAddress ? listingAddress : 'Open House'}
          </h1>
          <p className="text-gray-600 mt-1">
            Schedule a private tour with Dr. Jan Duffy, or sign in with the agent at the open house.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Dr. Jan Duffy · Berkshire Hathaway HomeServices Nevada Properties
          </p>
          <CalendlyPopupLink className="inline-block mt-4 bg-[#0069ff] hover:bg-[#0052cc] text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            Schedule a private showing
          </CalendlyPopupLink>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm mb-10">
          <CalendlyInlineWidget
            minWidth={320}
            height={700}
            className="rounded-lg overflow-hidden w-full"
          />
        </div>

        <section className="border-t border-gray-200 pt-10" aria-labelledby="signin-heading">
          <h2 id="signin-heading" className="text-xl font-bold text-gray-900 mb-2 text-center">
            Sign in at the open house
          </h2>
          <p className="text-gray-600 text-center text-sm mb-6">
            Visiting today? Sign in below so we can stay in touch.
          </p>
          <div className="max-w-lg mx-auto">
            <OpenHouseSignInForm listingId={listingId} listingAddress={listingAddress} />
          </div>
        </section>
      </main>
    </div>
  )
}
