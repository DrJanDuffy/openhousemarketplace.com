'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { X, Maximize } from 'lucide-react'
import { cn } from '@/lib/utils'

export type VirtualTourModalProps = {
  isOpen: boolean
  onClose: () => void
  url: string
  title?: string
}

export function VirtualTourModal({ isOpen, onClose, url, title }: VirtualTourModalProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleFullscreen = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      el.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }, [])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'virtual-tour-title' : undefined}
    >
      <div className="relative flex h-full w-full max-w-4xl flex-col">
        {title && (
          <h2 id="virtual-tour-title" className="sr-only">
            {title}
          </h2>
        )}
        <div
          ref={containerRef}
          className={cn(
            'relative w-full flex-1 overflow-hidden rounded-lg bg-black',
            'aspect-video max-h-[calc(100vh-6rem)]'
          )}
        >
          {/* Lazy-load: only set src when modal is open */}
          <iframe
            src={url}
            title={title ?? 'Virtual tour'}
            className="h-full w-full border-0"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="mt-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleFullscreen}
            className="flex items-center gap-2 rounded bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle fullscreen"
          >
            <Maximize className="h-4 w-4" />
            Fullscreen
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 rounded bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close virtual tour"
          >
            <X className="h-4 w-4" />
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
