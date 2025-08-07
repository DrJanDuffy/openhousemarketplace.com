import { Metadata } from 'next'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'

export const metadata: Metadata = {
  title: 'The Ridges Summerlin | Luxury Homes & Real Estate',
  description: 'Explore luxury homes for sale in The Ridges, Summerlin\'s most prestigious gated community. Custom estates, golf course views, and exclusive amenities. Live in Las Vegas\' premier address.',
  keywords: 'The Ridges Summerlin, luxury homes Las Vegas, custom estates Summerlin, golf course homes, guard gated community',
  openGraph: {
    title: 'The Ridges Summerlin | Luxury Homes & Real Estate',
    description: 'Discover luxury living in The Ridges, Summerlin\'s most prestigious community. Custom estates with stunning views.',
    images: ['/images/the-ridges-hero.jpg'],
  }
}

const marketStats = {
  medianPrice: '$2,850,000',
  daysOnMarket: 45,
  activeListings: 12,
  pricePerSqFt: '$485',
  monthlyChange: '+2.3%'
}

const schools = [
  {
    name: 'Palo Verde High School',
    rating: 9,
    type: 'Public High School',
    distance: '1.2 miles'
  },
  {
    name: 'Doral Academy Red Rock',
    rating: 8,
    type: 'Charter K-12',
    distance: '2.1 miles'
  },
  {
    name: 'Alexander Dawson School',
    rating: 10,
    type: 'Private K-12',
    distance: '3.5 miles'
  }
]

const amenities = [
  {
    name: 'Bear\'s Best Golf Club',
    type: 'Golf Course',
    distance: 'On-site'
  },
  {
    name: 'Red Rock Canyon',
    type: 'park',
    distance: '5 minutes'
  },
  {
    name: 'Downtown Summerlin',
    type: 'Shopping & Dining',
    distance: '10 minutes'
  },
  {
    name: 'Red Rock Casino Resort',
    type: 'Entertainment',
    distance: '7 minutes'
  }
]

export default function TheRidgesPage() {
  return (
    <HyperLocalNeighborhoodPage
      name="The Ridges Summerlin"
      description="The Ridges is Summerlin's most prestigious village, featuring custom-designed luxury homes with stunning views of the Las Vegas Strip and Red Rock Canyon. This guard-gated community offers exclusive amenities including the Bear's Best Golf Club, private parks, and walking trails."
      marketStats={marketStats}
      schools={schools}
      amenities={amenities}
      imageUrl="/images/the-ridges-hero.jpg"
      realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
    />
  )
}
