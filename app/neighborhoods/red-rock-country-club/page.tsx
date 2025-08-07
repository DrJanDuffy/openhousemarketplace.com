import { Metadata } from 'next'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'

export const metadata: Metadata = {
  title: 'Red Rock Country Club | Luxury Golf Course Homes',
  description: 'Discover Red Rock Country Club homes for sale in Summerlin. Championship golf courses, resort-style amenities, and stunning mountain views. Experience luxury living in Las Vegas.',
  keywords: 'Red Rock Country Club, golf course homes, Summerlin real estate, luxury homes Las Vegas, guard gated community',
  openGraph: {
    title: 'Red Rock Country Club | Luxury Golf Course Homes',
    description: 'Live the resort lifestyle at Red Rock Country Club. Championship golf, luxury amenities, and stunning homes.',
    images: ['/images/red-rock-cc-hero.jpg'],
  }
}

const marketStats = {
  medianPrice: '$1,450,000',
  daysOnMarket: 38,
  activeListings: 15,
  pricePerSqFt: '$385',
  monthlyChange: '+1.8%'
}

const schools = [
  {
    name: 'Bonner Elementary School',
    rating: 8,
    type: 'Public Elementary',
    distance: '1.5 miles'
  },
  {
    name: 'Faith Lutheran Middle & High',
    rating: 9,
    type: 'Private 6-12',
    distance: '2.8 miles'
  },
  {
    name: 'West Career & Technical Academy',
    rating: 10,
    type: 'Public Magnet',
    distance: '3.2 miles'
  }
]

const amenities = [
  {
    name: 'Red Rock Country Club Golf',
    type: 'Golf Course',
    distance: 'On-site'
  },
  {
    name: 'Tennis & Sports Complex',
    type: 'Recreation',
    distance: 'On-site'
  },
  {
    name: 'Red Rock Casino',
    type: 'Entertainment',
    distance: '5 minutes'
  },
  {
    name: 'Downtown Summerlin',
    type: 'Shopping & Dining',
    distance: '8 minutes'
  }
]

export default function RedRockCountryClubPage() {
  return (
    <HyperLocalNeighborhoodPage
      name="Red Rock Country Club"
      description="Red Rock Country Club offers an exceptional private club lifestyle with 36 holes of championship golf, world-class tennis facilities, and a stunning 44,000-square-foot clubhouse. This guard-gated community features luxury homes with panoramic views of the golf course, mountains, and Las Vegas Strip."
      marketStats={marketStats}
      schools={schools}
      amenities={amenities}
      imageUrl="/images/red-rock-cc-hero.jpg"
      realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
    />
  )
}
