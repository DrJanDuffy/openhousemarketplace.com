'use client'

import { CALENDLY_OPEN_HOUSE_TOUR_URL } from '@/lib/calendly'

type CalendlyPopupLinkProps = {
  url?: string
  children: React.ReactNode
  className?: string
}

export default function CalendlyPopupLink({
  url = CALENDLY_OPEN_HOUSE_TOUR_URL,
  children,
  className = '',
}: CalendlyPopupLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (typeof window === 'undefined') return

    const openPopup = () => {
      if (window.Calendly?.initPopupWidget) {
        window.Calendly.initPopupWidget({ url })
      } else {
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    }

    if (window.Calendly?.initPopupWidget) {
      openPopup()
    } else {
      let attempts = 0
      const maxAttempts = 50
      const interval = setInterval(() => {
        attempts++
        if (window.Calendly?.initPopupWidget) {
          clearInterval(interval)
          openPopup()
        } else if (attempts >= maxAttempts) {
          clearInterval(interval)
          window.open(url, '_blank', 'noopener,noreferrer')
        }
      }, 100)
    }
  }

  return (
    <a
      href={url}
      onClick={handleClick}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
