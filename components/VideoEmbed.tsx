'use client'

import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Converts YouTube or Vimeo watch URL to embed URL for iframe.
 * YouTube: youtube.com/watch?v=ID or youtu.be/ID → youtube.com/embed/ID
 * Vimeo: vimeo.com/ID or vimeo.com/video/ID → player.vimeo.com/video/ID
 */
export function getVideoEmbedUrl(url: string): string | null {
  try {
    if (url.includes('youtube.com/watch?v=')) {
      const match = url.match(/[?&]v=([^&]+)/)
      return match ? `https://www.youtube.com/embed/${match[1]}` : null
    }
    if (url.includes('youtu.be/')) {
      const match = url.match(/youtu\.be\/([^?]+)/)
      return match ? `https://www.youtube.com/embed/${match[1]}` : null
    }
    if (url.includes('vimeo.com/')) {
      const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
      return match ? `https://player.vimeo.com/video/${match[1]}` : null
    }
  } catch {
    return null
  }
  return null
}

export type VideoEmbedProps = {
  /** YouTube or Vimeo URL (watch page); converted to embed URL internally */
  videoUrl: string
  title?: string
  className?: string
  /** When true, iframe src is set only when in view (lazy). Default true when used in modals. */
  lazy?: boolean
}

/**
 * Renders a 16:9 iframe for YouTube or Vimeo from a watch URL.
 * Use for listing video walkthroughs. When used inside a modal, the iframe
 * only mounts when the modal is open, so no extra lazy logic is needed.
 */
export function VideoEmbed({ videoUrl, title, className, lazy = true }: VideoEmbedProps) {
  const embedUrl = getVideoEmbedUrl(videoUrl)
  if (!embedUrl) return null

  return (
    <div className={cn('aspect-video w-full overflow-hidden rounded-lg bg-black', className)}>
      <iframe
        src={embedUrl}
        title={title ?? 'Video'}
        className="h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading={lazy ? 'lazy' : undefined}
      />
    </div>
  )
}
