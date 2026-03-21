'use client'

import dynamic from 'next/dynamic'

const RealScoutOfficeListingsBands = dynamic(
  () => import('@/components/RealScoutOfficeListingsBands'),
  {
    ssr: false,
    loading: () => (
      <section
        className="border-t border-gray-200 bg-slate-50 py-10 sm:py-14"
        aria-busy="true"
        aria-label="Loading office listings by price range"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="mx-auto h-9 w-72 max-w-full animate-pulse rounded bg-gray-200" />
            <div className="mx-auto mt-3 h-4 w-full max-w-xl animate-pulse rounded bg-gray-100" />
          </div>
          <div className="h-56 animate-pulse rounded-xl bg-gray-100" />
        </div>
      </section>
    ),
  },
)

/** Defers bands chunk + hydration until client; intersection logic is inside RealScoutOfficeListingsBands. */
export default function RealScoutOfficeListingsBandsDynamic() {
  return <RealScoutOfficeListingsBands />
}
