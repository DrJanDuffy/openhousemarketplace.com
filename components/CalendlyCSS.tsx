'use client'

import { useEffect } from 'react'

const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css'

/** Loads Calendly widget CSS asynchronously so it does not block render (LCP). */
export default function CalendlyCSS() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = CALENDLY_CSS
    link.media = 'print'
    link.onload = () => { link.media = 'all' }
    document.head.appendChild(link)
    return () => { link.remove() }
  }, [])
  return null
}
