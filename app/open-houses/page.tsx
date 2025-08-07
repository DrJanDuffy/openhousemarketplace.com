import { Metadata } from 'next'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'

export const metadata: Metadata = {
  title: 'Summerlin Open Houses | This Weekend\'s Home Tours',
  description: 'Find open houses in Summerlin this weekend. Tour luxury homes, new construction, and family homes in Las Vegas\' premier master-planned community.',
  keywords: 'Summerlin open houses, Las Vegas home tours, weekend open houses, Summerlin real estate, house tours',
  openGraph: {
    title: 'Summerlin Open Houses | This Weekend\'s Home Tours',
    description: 'Tour the best homes for sale in Summerlin this weekend. Live updates and instant scheduling.',
    images: ['/images/open-houses-hero.jpg'],
  }
}

const marketStats = {
  medianPrice: '$750,000',
  daysOnMarket: 35,
  activeListings: 85,
  pricePerSqFt: '$325',
  monthlyChange: '+1.7%'
}

const schools = [
  {
    name: 'Summerlin School District',
    rating: 9,
    type: 'Public Schools',
    distance: 'Various Locations'
  },
  {
    name: 'Private Schools',
    rating: 9,
    type: 'Private Education',
    distance: 'Multiple Options'
  },
  {
    name: 'Charter Schools',
    rating: 8,
    type: 'Charter Options',
    distance: 'Throughout Summerlin'
  }
]

const amenities = [
  {
    name: 'Downtown Summerlin',
    type: 'Shopping & Dining',
    distance: 'Central Location'
  },
  {
    name: 'Multiple Golf Courses',
    type: 'Recreation',
    distance: 'Throughout Area'
  },
  {
    name: 'Parks & Trails',
    type: 'park',
    distance: '250+ miles of trails'
  },
  {
    name: 'Community Centers',
    type: 'Recreation',
    distance: 'Multiple Locations'
  }
]

export default function OpenHousesPage() {
  return (
    <HyperLocalNeighborhoodPage
      name="Summerlin Open Houses"
      description="Explore Summerlin's finest homes this weekend. From luxury estates to family homes, find your perfect match with our curated selection of open houses. Get real-time updates, instant scheduling, and exclusive market insights for every property."
      marketStats={marketStats}
      schools={schools}
      amenities={amenities}
      imageUrl="/images/open-houses-hero.jpg"
      realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
    />
  )
}
