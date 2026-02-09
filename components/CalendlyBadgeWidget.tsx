'use client'

import { useEffect } from 'react'
import Script from 'next/script'

import { CALENDLY_OPEN_HOUSE_TOUR_URL } from '@/lib/calendly'

const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'

/** Calendly badge widget config – aligns with site purpose (private showings). */
const BADGE_CONFIG = {
  url: CALENDLY_OPEN_HOUSE_TOUR_URL,
  text: 'Schedule a private showing',
  color: '#0069ff',
  textColor: '#ffffff',
  branding: true,
} as const

function initBadgeWidget() {
  if (typeof window !== 'undefined' && window.Calendly?.initBadgeWidget) {
    window.Calendly.initBadgeWidget(BADGE_CONFIG)
  }
}

export default function CalendlyBadgeWidget() {
  useEffect(() => {
    if (window.Calendly?.initBadgeWidget) initBadgeWidget()
  }, [])

  return (
    <Script
      src={CALENDLY_SCRIPT}
      strategy="afterInteractive"
      onLoad={initBadgeWidget}
    />
  )
}
