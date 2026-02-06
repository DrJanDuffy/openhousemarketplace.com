'use client'

import React, { useEffect, useRef, useState } from 'react'

const REALSCOUT_SCRIPT = 'https://em.realscout.com/widgets/realscout-web-components.umd.js'

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
  agentEncodedId = "QWdlbnQtMjI1MDUw",
  sortOrder = "STATUS_AND_SIGNIFICANT_CHANGE",
  listingStatus = "For Sale",
  propertyTypes = "SFR,MF,TC",
  priceMin = "600000",
  priceMax = "1200000",
  className = ""
}) => {
  const widgetRef = useRef<HTMLDivElement>(null)
  const [scriptReady, setScriptReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isCustomElementDefined = () =>
      window.customElements?.get?.('realscout-office-listings')
    if (isCustomElementDefined()) {
      setScriptReady(true)
      return
    }
    const check = setInterval(() => {
      if (isCustomElementDefined()) {
        clearInterval(check)
        setScriptReady(true)
      }
    }, 100)
    const timeout = setTimeout(() => clearInterval(check), 8000)
    return () => {
      clearInterval(check)
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    if (!scriptReady) return
    const style = document.createElement('style')
    style.id = 'realscout-office-listings-styles'
    style.textContent = `
      realscout-office-listings { 
        --rs-listing-divider-color: rgb(101, 141, 172); 
        width: 100%; 
      }
    `
    if (!document.getElementById(style.id)) {
      document.head.appendChild(style)
    }
    return () => {
      const existing = document.getElementById(style.id)
      if (existing?.parentNode) existing.parentNode.removeChild(existing)
    }
  }, [scriptReady])

  return (
    <div className={`realScout-widget-container ${className}`}>
      <div ref={widgetRef}>
        {scriptReady ? (
          React.createElement('realscout-office-listings', {
            'agent-encoded-id': agentEncodedId,
            'sort-order': sortOrder,
            'listing-status': listingStatus,
            'property-types': propertyTypes,
            'price-min': priceMin,
            'price-max': priceMax
          })
        ) : (
          <div className="animate-pulse flex flex-col gap-3 p-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-24 bg-gray-100 rounded" />
            <div className="h-24 bg-gray-100 rounded" />
            <div className="h-24 bg-gray-100 rounded" />
          </div>
        )}
      </div>
    </div>
  )
}

export default RealScoutWidget
