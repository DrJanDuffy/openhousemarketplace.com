import GoogleMapsCommutesEmbed from '@/components/GoogleMapsCommutesEmbed'

type GoogleMapsCommutesSectionProps = {
  heading: string
  description?: string
  className?: string
  id?: string
}

export default function GoogleMapsCommutesSection({
  heading,
  description,
  className = '',
  id = 'commutes-map-heading',
}: GoogleMapsCommutesSectionProps) {
  return (
    <section className={className} aria-labelledby={id}>
      <h2 id={id} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        {heading}
      </h2>
      {description ? (
        <p className="text-gray-600 mb-6 max-w-3xl">{description}</p>
      ) : null}
      <GoogleMapsCommutesEmbed />
    </section>
  )
}
