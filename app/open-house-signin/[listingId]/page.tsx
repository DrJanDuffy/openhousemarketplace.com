import { Metadata } from 'next'
import { kv } from '@vercel/kv'
import OpenHouseSignInForm from '@/components/OpenHouseSignInForm'

const BASE_URL = 'https://www.openhousemarketplace.com'
const LISTING_PREFIX = 'oh-signin:listing:'

type Props = {
  params: Promise<{ listingId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { listingId } = await params
  return {
    title: 'Open House Sign-In | Dr. Jan Duffy',
    description: 'Sign in at the open house to stay in touch with Dr. Jan Duffy and explore Summerlin real estate.',
    robots: { index: false, follow: true },
    alternates: { canonical: `${BASE_URL}/open-house-signin/${listingId}` },
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
      <main className="max-w-lg mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Open House Sign-In
          </h1>
          <p className="text-gray-600 mt-1">
            {listingAddress ? `Welcome to ${listingAddress}` : 'Welcome — please sign in below.'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Dr. Jan Duffy · Berkshire Hathaway HomeServices Nevada Properties
          </p>
        </div>
        <OpenHouseSignInForm listingId={listingId} listingAddress={listingAddress} />
      </main>
    </div>
  )
}
