'use client'

import RealScoutWidget from '@/components/RealScoutWidget'

/**
 * Site-wide office MLS grid (one `realscout-office-listings` embed).
 * Single range defaults from config ($400K–$900K) — same widget as /open-houses and /tour/mls.
 */
export default function RealScoutOfficeListingsBands() {
  return (
    <section
      id="office-listings-bands"
      className="border-t border-gray-200 bg-slate-50 py-10 sm:py-14"
      aria-labelledby="realscout-office-bands-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 id="realscout-office-bands-heading" className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Office MLS listings
          </h2>
          <p className="mt-2 text-gray-600">
            Live MLS listings from Dr. Jan Duffy — $400K to $900K, sorted low to high. For more filters, use the{' '}
            <a href="/tour/mls" className="font-semibold text-blue-600 hover:underline">
              full MLS search
            </a>
            .
          </p>
        </div>
        <RealScoutWidget className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6" />
      </div>
    </section>
  )
}
