/**
 * Non-overlapping price bands for multiple `realscout-office-listings` widgets ($400K–$900K).
 * Script loads once in root layout; each widget filters by price-min / price-max.
 */
export type RealScoutOfficeBand = {
  id: string
  priceMin: string
  priceMax: string
  label: string
}

export const REALSCOUT_OFFICE_LISTINGS_BANDS: readonly RealScoutOfficeBand[] = [
  { id: '400-500', priceMin: '400000', priceMax: '500000', label: '$400K – $500K' },
  { id: '500-600', priceMin: '500000', priceMax: '600000', label: '$500K – $600K' },
  { id: '600-700', priceMin: '600000', priceMax: '700000', label: '$600K – $700K' },
  { id: '700-800', priceMin: '700000', priceMax: '800000', label: '$700K – $800K' },
  { id: '800-900', priceMin: '800000', priceMax: '900000', label: '$800K – $900K' },
] as const

export const REALSCOUT_OFFICE_AGENT_ID = 'QWdlbnQtMjI1MDUw'
export const REALSCOUT_OFFICE_PROPERTY_TYPES = ',SFR,MF,TC,OTHER'

/** Single `realscout-office-listings` embeds (e.g. /open-houses): same span as all bands combined. */
export const REALSCOUT_OFFICE_DEFAULT_PRICE_MIN =
  REALSCOUT_OFFICE_LISTINGS_BANDS[0].priceMin
export const REALSCOUT_OFFICE_DEFAULT_PRICE_MAX =
  REALSCOUT_OFFICE_LISTINGS_BANDS[REALSCOUT_OFFICE_LISTINGS_BANDS.length - 1].priceMax
