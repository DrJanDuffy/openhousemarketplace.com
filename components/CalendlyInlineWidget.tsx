'use client'

import Script from 'next/script'

const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'

type CalendlyInlineWidgetProps = {
  url: string
  minWidth?: number
  height?: number
  className?: string
}

export default function CalendlyInlineWidget({
  url,
  minWidth = 320,
  height = 700,
  className = '',
}: CalendlyInlineWidgetProps) {
  return (
    <>
      <Script src={CALENDLY_SCRIPT} strategy="lazyOnload" />
      <div
        className={`calendly-inline-widget ${className}`}
        data-url={url}
        style={{ minWidth: `${minWidth}px`, height: `${height}px` }}
        aria-label="Schedule a meeting with Dr. Jan Duffy"
      />
    </>
  )
}
