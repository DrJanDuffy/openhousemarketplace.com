'use client'

import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'

const GoogleMyMapsEmbed = dynamic(() => import('./GoogleMyMapsEmbed'), {
  ssr: false,
  loading: () => (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm"
      aria-hidden
    >
      <div className="relative aspect-[4/3] w-full min-h-[280px] sm:min-h-[400px] md:min-h-[480px]">
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      </div>
    </div>
  ),
})

type Props = ComponentProps<typeof GoogleMyMapsEmbed>

/** Defers My Maps iframe to client-only (smaller initial HTML / better LCP on home). */
export default function GoogleMyMapsEmbedLazy(props: Props) {
  return <GoogleMyMapsEmbed {...props} />
}
