'use client'

import Script from 'next/script'

const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'
const CALENDLY_URL = 'https://calendly.com/drjanduffy/open-house-tour'

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (options: {
        url: string
        text?: string
        color?: string
        textColor?: string
        branding?: boolean
      }) => void
    }
  }
}

export default function CalendlyBadgeWidget() {
  const initBadge = () => {
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initBadgeWidget({
        url: CALENDLY_URL,
        text: 'Book Your Tour',
        color: '#0069ff',
        textColor: '#ffffff',
        branding: true,
      })
    }
  }

  return (
    <Script
      src={CALENDLY_SCRIPT}
      strategy="afterInteractive"
      onLoad={initBadge}
    />
  )
}
