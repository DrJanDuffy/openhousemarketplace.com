'use client'

import { Video } from 'lucide-react'
import { cn } from '@/lib/utils'

export type VirtualTourBadgeProps = {
  onClick: () => void
  className?: string
}

export function VirtualTourBadge({ onClick, className }: VirtualTourBadgeProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className={cn(
        'absolute bottom-3 right-3 flex items-center gap-1.5 rounded bg-black/70 px-2 py-1.5 text-xs font-medium text-white transition hover:bg-black/85 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
        className
      )}
      aria-label="Open virtual tour"
    >
      <Video className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span>Virtual Tour</span>
    </button>
  )
}
