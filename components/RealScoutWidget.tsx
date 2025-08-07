'use client'

import React, { useEffect, useRef } from 'react'

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

  useEffect(() => {
    // Load RealScout widget script
    const script = document.createElement('script')
    script.src = "https://em.realscout.com/widgets/realscout-web-components.umd.js"
    script.type = "module"
    script.async = true
    
    script.onload = () => {
      // Script loaded successfully
      console.log('RealScout widget script loaded')
    }
    
    script.onerror = () => {
      console.error('Failed to load RealScout widget script')
    }
    
    document.head.appendChild(script)
    
    // Add custom styles for the widget
    const style = document.createElement('style')
    style.textContent = `
      realscout-office-listings { 
        --rs-listing-divider-color: rgb(101, 141, 172); 
        width: 100%; 
      }
    `
    document.head.appendChild(style)
    
    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  return (
    <div className={`realScout-widget-container ${className}`}>
      <div ref={widgetRef}>
        <realscout-office-listings
          agent-encoded-id={agentEncodedId}
          sort-order={sortOrder}
          listing-status={listingStatus}
          property-types={propertyTypes}
          price-min={priceMin}
          price-max={priceMax}
        />
      </div>
    </div>
  )
}

export default RealScoutWidget
