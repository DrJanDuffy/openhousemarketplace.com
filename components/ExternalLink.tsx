'use client'

import { ExternalLink as ExternalLinkIcon } from 'lucide-react'

type ExternalLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  ariaLabel?: string
  showIcon?: boolean
}

export default function ExternalLink({
  href,
  children,
  className = '',
  ariaLabel,
  showIcon = true,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel ?? 'Opens in new window'}
    >
      {children}
      {showIcon && (
        <ExternalLinkIcon
          className="ml-1 inline-block h-3.5 w-3.5 shrink-0 opacity-70"
          aria-hidden
        />
      )}
    </a>
  )
}
