'use client'

const CALENDLY_URL = 'https://calendly.com/drjanduffy/open-house-tour'

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void
    }
  }
}

type CalendlyPopupLinkProps = {
  url?: string
  children: React.ReactNode
  className?: string
}

export default function CalendlyPopupLink({
  url = CALENDLY_URL,
  children,
  className = '',
}: CalendlyPopupLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initPopupWidget({ url })
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
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
