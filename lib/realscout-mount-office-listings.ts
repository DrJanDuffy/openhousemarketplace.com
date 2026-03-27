/**
 * Mount `realscout-office-listings` with attributes set before the node is connected
 * so RealScout's connectedCallback / getPropsFromAttributes() see price-min / price-max.
 * React createElement/JSX can attach dashed attributes too late, which produced $0–$0 or wrong bands.
 */
import {
  REALSCOUT_OFFICE_AGENT_ID,
  REALSCOUT_OFFICE_PROPERTY_TYPES,
} from '@/config/realscout-office-bands'

const TAG = 'realscout-office-listings'

export type RealScoutOfficeListingsMountOptions = {
  priceMin: string
  priceMax: string
  agentEncodedId?: string
  sortOrder?: string
  listingStatus?: string
  propertyTypes?: string
}

export function createRealScoutOfficeListingsElement(
  options: RealScoutOfficeListingsMountOptions
): HTMLElement {
  const el = document.createElement(TAG)
  el.setAttribute('agent-encoded-id', options.agentEncodedId ?? REALSCOUT_OFFICE_AGENT_ID)
  el.setAttribute('sort-order', options.sortOrder ?? 'PRICE_LOW')
  el.setAttribute('listing-status', options.listingStatus ?? 'For Sale')
  el.setAttribute('property-types', options.propertyTypes ?? REALSCOUT_OFFICE_PROPERTY_TYPES)
  el.setAttribute('price-min', options.priceMin)
  el.setAttribute('price-max', options.priceMax)
  return el
}
