'use client'

import { useEffect, useRef } from 'react'
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
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const init = () => {
      if (typeof window !== 'undefined' && window.Calendly?.initInlineWidget) {
        el.innerHTML = ''
        window.Calendly.initInlineWidget({
          url,
          parentElement: el,
        })
      }
    }

    if (window.Calendly?.initInlineWidget) {
      init()
    } else {
      const check = setInterval(() => {
        if (window.Calendly?.initInlineWidget) {
          clearInterval(check)
          init()
        }
      }, 100)
      return () => clearInterval(check)
    }
  }, [url])

  return (
    <>
      <Script src={CALENDLY_SCRIPT} strategy="lazyOnload" />
      <div
        ref={containerRef}
        className={className}
        style={{ minWidth: `${minWidth}px`, height: `${height}px` }}
        aria-label="Schedule a meeting with Dr. Jan Duffy"
      />
    </>
  )
}
