import Link from 'next/link'

const SLUG_TO_NAME: Record<string, string> = {
  'the-ridges': 'The Ridges',
  'red-rock-country-club': 'Red Rock Country Club',
  'summerlin-centre': 'Summerlin Centre',
  'sun-city-summerlin': 'Sun City Summerlin',
  'the-trails': 'The Trails',
  'willows': 'Willows',
  'mesa-ridge': 'Mesa Ridge',
  'siena': 'Siena',
  'regency': 'Regency',
}

const RELATED_SLUGS: Record<string, string[]> = {
  'the-ridges': ['red-rock-country-club', 'summerlin-centre'],
  'red-rock-country-club': ['the-ridges', 'summerlin-centre'],
  'summerlin-centre': ['red-rock-country-club', 'sun-city-summerlin'],
  'sun-city-summerlin': ['summerlin-centre', 'the-trails'],
  'the-trails': ['summerlin-centre', 'willows'],
  'willows': ['the-trails', 'mesa-ridge'],
  'mesa-ridge': ['willows', 'siena'],
  'siena': ['mesa-ridge', 'regency'],
  'regency': ['siena', 'summerlin-centre'],
}

type RelatedNeighborhoodsProps = {
  currentSlug: string
  className?: string
}

export default function RelatedNeighborhoods({ currentSlug, className = '' }: RelatedNeighborhoodsProps) {
  const related = RELATED_SLUGS[currentSlug]
  if (!related || related.length === 0) {
    return (
      <p className={`text-gray-700 ${className}`}>
        Explore <Link href="/neighborhoods" className="text-blue-600 font-semibold hover:underline">all Summerlin neighborhoods</Link> for community info and homes for sale.
      </p>
    )
  }

  const links = related.map((slug) => ({
    slug,
    name: SLUG_TO_NAME[slug] ?? slug,
    href: `/neighborhoods/${slug}`,
  }))

  const [first, second, third] = links
  return (
    <p className={`text-gray-700 ${className}`}>
      Explore <Link href="/neighborhoods" className="text-blue-600 font-semibold hover:underline">all Summerlin neighborhoods</Link>
      {first && links.length === 1 && (
        <> or see <Link href={first.href} className="text-blue-600 font-semibold hover:underline">{first.name}</Link>.</>
      )}
      {first && second && links.length === 2 && (
        <> or see <Link href={first.href} className="text-blue-600 font-semibold hover:underline">{first.name}</Link> and <Link href={second.href} className="text-blue-600 font-semibold hover:underline">{second.name}</Link>.</>
      )}
      {first && second && third && links.length >= 3 && (
        <> or see <Link href={first.href} className="text-blue-600 font-semibold hover:underline">{first.name}</Link>, <Link href={second.href} className="text-blue-600 font-semibold hover:underline">{second.name}</Link>, and <Link href={third.href} className="text-blue-600 font-semibold hover:underline">{third.name}</Link>.</>
      )}
    </p>
  )
}
