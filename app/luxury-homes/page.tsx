import { Metadata } from 'next'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'

export const metadata: Metadata = {
  title: 'Summerlin Luxury Homes | Exclusive Estates & Properties',
  description: 'Explore luxury homes for sale in Summerlin. Custom estates, golf course properties, and exclusive gated communities. Experience Las Vegas\' finest luxury real estate.',
  keywords: 'Summerlin luxury homes, Las Vegas luxury real estate, custom estates, golf course homes, gated communities',
  openGraph: {
    title: 'Summerlin Luxury Homes | Exclusive Estates & Properties',
    description: 'Discover Summerlin\'s most prestigious luxury homes and estates. Exclusive listings and private showings.',
    images: ['/images/luxury-homes-hero.jpg'],
  }
}

const marketStats = {
  medianPrice: '$2,250,000',
  daysOnMarket: 42,
  activeListings: 45,
  pricePerSqFt: '$425',
  monthlyChange: '+2.1%'
}

const schools = [
  {
    name: 'The Alexander Dawson School',
    rating: 10,
    type: 'Private K-12',
    distance: 'Nearby'
  },
  {
    name: 'Faith Lutheran',
    rating: 9,
    type: 'Private College Prep',
    distance: 'Close proximity'
  },
  {
    name: 'Top Public Schools',
    rating: 9,
    type: 'Public Education',
    distance: 'Throughout Area'
  }
]

const amenities = [
  {
    name: 'Multiple Golf Clubs',
    type: 'Golf Course',
    distance: 'Various Locations'
  },
  {
    name: 'Red Rock Canyon',
    type: 'park',
    distance: 'Adjacent'
  },
  {
    name: 'Private Country Clubs',
    type: 'Recreation',
    distance: 'Multiple Options'
  },
  {
    name: 'Tivoli Village',
    type: 'Luxury Shopping',
    distance: 'Nearby'
  }
]

export default function LuxuryHomesPage() {
  return (
    <HyperLocalNeighborhoodPage
      name="Summerlin Luxury Homes"
      description="Discover Summerlin's most prestigious luxury homes and estates. From custom-built mansions in The Ridges to exclusive golf course properties in Red Rock Country Club, experience the pinnacle of Las Vegas luxury real estate. Enjoy world-class amenities, stunning views, and unparalleled privacy in guard-gated communities."
      marketStats={marketStats}
      schools={schools}
      amenities={amenities}
      imageUrl="/images/luxury-homes-hero.jpg"
      realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
    />
  )
}
