import type { ReactNode } from 'react'

import GoogleMapsNeighborhoodDiscoveryEmbed from '@/components/GoogleMapsNeighborhoodDiscoveryEmbed'

type GoogleMapsNeighborhoodDiscoverySectionProps = {
  heading: string
  description?: ReactNode
  className?: string
  id?: string
}

export default function GoogleMapsNeighborhoodDiscoverySection({
  heading,
  description,
  className = '',
  id = 'neighborhood-discovery-heading',
}: GoogleMapsNeighborhoodDiscoverySectionProps) {
  return (
    <section className={className} aria-labelledby={id}>
      <h2 id={id} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        {heading}
      </h2>
      {description ? (
        <p className="text-gray-600 mb-6 max-w-3xl">{description}</p>
      ) : null}
      <GoogleMapsNeighborhoodDiscoveryEmbed />
    </section>
  )
}
