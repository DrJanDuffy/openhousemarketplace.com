import { Metadata } from 'next'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'

export const metadata: Metadata = {
  title: 'Sun City Summerlin | 55+ Active Adult Community',
  description: 'Discover Sun City Summerlin homes for sale. Las Vegas\' premier 55+ community with golf courses, social clubs, and resort-style amenities. Perfect for active adult living.',
  keywords: 'Sun City Summerlin, 55+ community Las Vegas, active adult homes, retirement community, golf course homes',
  openGraph: {
    title: 'Sun City Summerlin | 55+ Active Adult Community',
    description: 'Live your best life in Sun City Summerlin. Golf, social activities, and resort amenities for active adults.',
    images: ['/images/sun-city-hero.jpg'],
  }
}

const marketStats = {
  medianPrice: '$525,000',
  daysOnMarket: 32,
  activeListings: 25,
  pricePerSqFt: '$275',
  monthlyChange: '+1.2%'
}

const schools = [
  {
    name: 'College of Southern Nevada',
    rating: 8,
    type: 'Community College',
    distance: '3.5 miles'
  },
  {
    name: 'Lifetime Learning Center',
    rating: 9,
    type: 'Adult Education',
    distance: 'On-site'
  },
  {
    name: 'Desert Vista Community Center',
    rating: 9,
    type: 'Recreation Center',
    distance: 'On-site'
  }
]

const amenities = [
  {
    name: 'Eagle Crest Golf Course',
    type: 'Golf Course',
    distance: 'On-site'
  },
  {
    name: 'Mountain Shadows Community Center',
    type: 'Recreation',
    distance: 'On-site'
  },
  {
    name: 'Sun City Library',
    type: 'Library',
    distance: 'On-site'
  },
  {
    name: 'Vista Commons Shopping',
    type: 'Shopping & Dining',
    distance: '5 minutes'
  }
]

export default function SunCitySummerlinPage() {
  return (
    <HyperLocalNeighborhoodPage
      name="Sun City Summerlin"
      description="Sun City Summerlin is Las Vegas' premier 55+ active adult community, offering resort-style living with three golf courses, four community centers, and over 80 social clubs and activities. Enjoy low-maintenance homes designed specifically for active adults, with stunning mountain and golf course views."
      marketStats={marketStats}
      schools={schools}
      amenities={amenities}
      imageUrl="/images/sun-city-hero.jpg"
      realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
    />
  )
}
