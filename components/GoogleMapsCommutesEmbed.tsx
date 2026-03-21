import { getGoogleMapsCommutesEmbedUrl } from '@/lib/google-maps-commutes'

type GoogleMapsCommutesEmbedProps = {
  title?: string
  className?: string
}

/**
 * Responsive iframe for Google Maps Commutes (Maps Platform solution).
 */
export default function GoogleMapsCommutesEmbed({
  title = 'Commute times and routes — Summerlin and Las Vegas area',
  className = '',
}: GoogleMapsCommutesEmbedProps) {
  const src = getGoogleMapsCommutesEmbedUrl()

  return (
    <div className={`relative w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm ${className}`}>
      <div className="relative aspect-[4/3] w-full min-h-[320px] sm:min-h-[420px] md:min-h-[520px]">
        <iframe
          src={src}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
          allow="geolocation"
        />
      </div>
    </div>
  )
}
