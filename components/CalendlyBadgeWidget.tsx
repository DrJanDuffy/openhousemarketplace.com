'use client'

import { useEffect } from 'react'
import Script from 'next/script'

const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'
const CALENDLY_URL = 'https://calendly.com/drjanduffy/open-house-tour'

export default function CalendlyBadgeWidget() {
  const initBadge = () => {
    if (typeof window !== 'undefined' && window.Calendly?.initBadgeWidget) {
      window.Calendly.initBadgeWidget({
        url: CALENDLY_URL,
        text: 'Book Your Tour',
        color: '#0069ff',
        textColor: '#ffffff',
        branding: true,
      })
    }
  }

  useEffect(() => {
    if (window.Calendly?.initBadgeWidget) {
      initBadge()
    }
  }, [])

  return (
    <Script
      src={CALENDLY_SCRIPT}
      strategy="afterInteractive"
      onLoad={initBadge}
    />
  )
}
