'use client'

import { useEffect, useLayoutEffect, useRef, useState, type FC } from 'react'
import {
  REALSCOUT_OFFICE_AGENT_ID,
  REALSCOUT_OFFICE_DEFAULT_PRICE_MAX,
  REALSCOUT_OFFICE_DEFAULT_PRICE_MIN,
  REALSCOUT_OFFICE_PROPERTY_TYPES,
} from '@/config/realscout-office-bands'
import { createRealScoutOfficeListingsElement } from '@/lib/realscout-mount-office-listings'

/** Shared readiness for `realscout-office-listings` (script in root layout). Use in multi-widget sections to poll once. */
export function useRealScoutOfficeListingsReady(): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isDefined = () => window.customElements?.get?.('realscout-office-listings')
    if (isDefined()) {
      setReady(true)
      return
    }
    const t = setInterval(() => {
      if (isDefined()) {
        clearInterval(t)
        setReady(true)
      }
    }, 100)
    const timeout = setTimeout(() => clearInterval(t), 12000)
    return () => {
      clearInterval(t)
      clearTimeout(timeout)
    }
  }, [])

  return ready
}

/**
 * Office listings (`realscout-office-listings`). Script + global styles: root `app/layout.tsx` head.
 * Defaults: PRICE_LOW, For Sale, $400K–$900K (matches `REALSCOUT_OFFICE_LISTINGS_BANDS` in config).
 */
interface RealScoutWidgetProps {
  agentEncodedId?: string
  sortOrder?: string
  listingStatus?: string
  propertyTypes?: string
  priceMin?: string
  priceMax?: string
  className?: string
}

const RealScoutWidget: FC<RealScoutWidgetProps> = ({
  agentEncodedId = REALSCOUT_OFFICE_AGENT_ID,
  sortOrder = 'PRICE_LOW',
  listingStatus = 'For Sale',
  propertyTypes = REALSCOUT_OFFICE_PROPERTY_TYPES,
  priceMin = REALSCOUT_OFFICE_DEFAULT_PRICE_MIN,
  priceMax = REALSCOUT_OFFICE_DEFAULT_PRICE_MAX,
  className = '',
}) => {
  const ready = useRealScoutOfficeListingsReady()
  const hostContainerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = hostContainerRef.current
    if (!container) return

    if (!ready) {
      container.innerHTML = ''
      return
    }

    const el = createRealScoutOfficeListingsElement({
      agentEncodedId,
      sortOrder,
      listingStatus,
      propertyTypes,
      priceMin,
      priceMax,
    })
    container.innerHTML = ''
    container.appendChild(el)

    return () => {
      container.innerHTML = ''
    }
  }, [ready, agentEncodedId, sortOrder, listingStatus, propertyTypes, priceMin, priceMax])

  // Skeleton must NOT live inside hostContainerRef: React would clear imperative DOM on reconcile.
  return (
    <div className={`realScout-widget-container ${className}`}>
      {!ready ? (
        <div className="flex flex-col gap-3 p-4 animate-pulse" aria-busy="true" aria-label="Loading listings">
          <div className="h-8 w-3/4 rounded bg-gray-200" />
          <div className="h-24 rounded bg-gray-100" />
          <div className="h-24 rounded bg-gray-100" />
          <div className="h-24 rounded bg-gray-100" />
        </div>
      ) : null}
      {/* Only non-React children here (custom element); mount helper owns this node */}
      <div ref={hostContainerRef} className="min-h-[180px]" />
    </div>
  )
}

export default RealScoutWidget
