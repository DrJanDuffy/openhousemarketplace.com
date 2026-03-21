'use client'

import React from 'react'
import { useRealScoutOfficeListingsReady } from '@/components/RealScoutWidget'
import {
  REALSCOUT_OFFICE_AGENT_ID,
  REALSCOUT_OFFICE_LISTINGS_BANDS,
  REALSCOUT_OFFICE_PROPERTY_TYPES,
  type RealScoutOfficeBand,
} from '@/config/realscout-office-bands'
import { useInViewOnce } from '@/lib/use-in-view-once'

function OfficeListingBand({
  band,
  ready,
}: {
  band: RealScoutOfficeBand
  ready: boolean
}) {
  const { ref, inView } = useInViewOnce('280px 0px')
  const showWidget = inView && ready

  return (
    <div
      ref={ref}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
    >
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{band.label}</h3>
      <div className="realScout-widget-container min-h-[180px]">
        {showWidget ? (
          React.createElement('realscout-office-listings', {
            'agent-encoded-id': REALSCOUT_OFFICE_AGENT_ID,
            'sort-order': 'PRICE_LOW',
            'listing-status': 'For Sale',
            'property-types': REALSCOUT_OFFICE_PROPERTY_TYPES,
            'price-min': band.priceMin,
            'price-max': band.priceMax,
          })
        ) : (
          <div
            className="flex flex-col gap-3 p-4 animate-pulse"
            aria-busy="true"
            aria-label={inView ? `Loading listings for ${band.label}` : `Listings for ${band.label} load as you scroll`}
          >
            <div className="h-8 w-3/4 rounded bg-gray-200" />
            <div className="h-24 rounded bg-gray-100" />
            <div className="h-24 rounded bg-gray-100" />
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Site-wide office listings: one RealScout script (layout head); multiple price bands ($400K–$900K).
 * Bands mount when scrolled near viewport (lighter main thread than instantiating all at once).
 */
export default function RealScoutOfficeListingsBands() {
  const ready = useRealScoutOfficeListingsReady()

  return (
    <section
      className="border-t border-gray-200 bg-slate-50 py-10 sm:py-14"
      aria-labelledby="realscout-office-bands-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 id="realscout-office-bands-heading" className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Office listings by price range
          </h2>
          <p className="mt-2 text-gray-600">
            Live MLS listings from Dr. Jan Duffy — filter bands from $400K to $900K (sorted low to high within each band).
          </p>
        </div>
        <div className="flex flex-col gap-10">
          {REALSCOUT_OFFICE_LISTINGS_BANDS.map((band) => (
            <OfficeListingBand key={band.id} band={band} ready={ready} />
          ))}
        </div>
      </div>
    </section>
  )
}
