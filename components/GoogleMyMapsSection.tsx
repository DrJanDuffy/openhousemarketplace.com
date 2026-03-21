import GoogleMyMapsEmbed from '@/components/GoogleMyMapsEmbed'
import GoogleMyMapsEmbedLazy from '@/components/GoogleMyMapsEmbedLazy'

type GoogleMyMapsSectionProps = {
  heading: string
  description?: string
  className?: string
  id?: string
  /** When true (e.g. homepage), load map iframe after hydration to improve LCP */
  deferEmbed?: boolean
}

/**
 * Semantic section wrapper for the shared Google My Maps embed (headline + optional copy).
 */
export default function GoogleMyMapsSection({
  heading,
  description,
  className = '',
  id = 'area-map-heading',
  deferEmbed = false,
}: GoogleMyMapsSectionProps) {
  return (
    <section className={className} aria-labelledby={id}>
      <h2 id={id} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        {heading}
      </h2>
      {description ? (
        <p className="text-gray-600 mb-6 max-w-3xl">{description}</p>
      ) : null}
      {deferEmbed ? <GoogleMyMapsEmbedLazy /> : <GoogleMyMapsEmbed />}
    </section>
  )
}
