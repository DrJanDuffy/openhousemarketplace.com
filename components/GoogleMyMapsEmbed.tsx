import { getGoogleMyMapsEmbedUrl } from '@/lib/google-my-maps'

type GoogleMyMapsEmbedProps = {
  /** Accessible name for the embedded map frame */
  title?: string
  className?: string
}

/**
 * Responsive Google My Maps iframe. Uses lazy loading; safe for multiple instances on a route.
 */
export default function GoogleMyMapsEmbed({
  title = 'Summerlin and Las Vegas area map — Open House Market Place',
  className = '',
}: GoogleMyMapsEmbedProps) {
  const src = getGoogleMyMapsEmbedUrl()

  return (
    <div className={`relative w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm ${className}`}>
      <div className="relative aspect-[4/3] w-full min-h-[280px] sm:min-h-[400px] md:min-h-[480px]">
        <iframe
          src={src}
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
        />
      </div>
    </div>
  )
}
