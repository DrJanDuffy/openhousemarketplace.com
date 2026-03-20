/**
 * Type-safe Schema.org JSON-LD helpers (schema-dts).
 * Use with `<script type="application/ld+json">{JSON.stringify(...)}</script>` or pass to existing schema components.
 * Does not replace `StructuredData.tsx`; extend incrementally for new neighborhood or landing pages.
 */
import type { GeoCoordinates, Place, RealEstateAgent, WithContext } from 'schema-dts'

export type NeighborhoodSchemaInput = {
  name: string
  url: string
  description: string
  latitude: number
  longitude: number
}

export function neighborhoodRealEstateAgentSchema(
  data: NeighborhoodSchemaInput,
): WithContext<RealEstateAgent> {
  const area: Place = {
    '@type': 'Place',
    name: data.name,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: data.latitude,
      longitude: data.longitude,
    } as GeoCoordinates,
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: data.name,
    url: data.url,
    description: data.description,
    areaServed: area,
  }
}
