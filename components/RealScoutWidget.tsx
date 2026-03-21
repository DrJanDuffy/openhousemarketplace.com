'use client'

import React, { useEffect, useState } from 'react'

/**
 * Office listings (`realscout-office-listings`). Script + global styles: root `app/layout.tsx` head.
 * Defaults match RealScout embed: PRICE_LOW, For Sale, $500K–$800K, property-types `,SFR,MF,TC,OTHER`.
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

const RealScoutWidget: React.FC<RealScoutWidgetProps> = ({
  agentEncodedId = 'QWdlbnQtMjI1MDUw',
  sortOrder = 'PRICE_LOW',
  listingStatus = 'For Sale',
  propertyTypes = ',SFR,MF,TC,OTHER',
  priceMin = '500000',
  priceMax = '800000',
  className = '',
}) => {
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

  return (
    <div className={`realScout-widget-container ${className}`}>
      {ready ? (
        React.createElement('realscout-office-listings', {
          'agent-encoded-id': agentEncodedId,
          'sort-order': sortOrder,
          'listing-status': listingStatus,
          'property-types': propertyTypes,
          'price-min': priceMin,
          'price-max': priceMax,
        })
      ) : (
        <div className="flex flex-col gap-3 p-4 animate-pulse" aria-busy="true" aria-label="Loading listings">
          <div className="h-8 w-3/4 rounded bg-gray-200" />
          <div className="h-24 rounded bg-gray-100" />
          <div className="h-24 rounded bg-gray-100" />
          <div className="h-24 rounded bg-gray-100" />
        </div>
      )}
    </div>
  )
}

export default RealScoutWidget
