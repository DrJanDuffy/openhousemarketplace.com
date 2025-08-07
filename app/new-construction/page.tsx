import { Metadata } from 'next'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'

export const metadata: Metadata = {
  title: 'Summerlin New Construction | New Homes & Communities',
  description: 'Explore new construction homes in Summerlin. Modern designs, smart home features, and energy efficiency. Find your perfect new build from top builders like Toll Brothers, Lennar, and Pulte.',
  keywords: 'Summerlin new construction, new homes Las Vegas, Toll Brothers Summerlin, Lennar homes, Pulte homes',
  openGraph: {
    title: 'Summerlin New Construction | New Homes & Communities',
    description: 'Brand new homes in Summerlin from top builders. Modern designs with smart features and energy efficiency.',
    images: ['/images/new-construction-hero.jpg'],
  }
}

const marketStats = {
  medianPrice: '$925,000',
  daysOnMarket: 0,
  activeListings: 35,
  pricePerSqFt: '$345',
  monthlyChange: '+1.9%'
}

const schools = [
  {
    name: 'New Summerlin Schools',
    rating: 9,
    type: 'Public Schools',
    distance: 'Planned'
  },
  {
    name: 'Existing Top Schools',
    rating: 9,
    type: 'Various Options',
    distance: 'Nearby'
  },
  {
    name: 'Future School Sites',
    rating: 8,
    type: 'Development Plans',
    distance: 'In Progress'
  }
]

const amenities = [
  {
    name: 'Future Community Parks',
    type: 'park',
    distance: 'Under Construction'
  },
  {
    name: 'New Shopping Centers',
    type: 'Shopping & Dining',
    distance: 'Planned'
  },
  {
    name: 'Walking Trails',
    type: 'Recreation',
    distance: 'Being Added'
  },
  {
    name: 'Community Centers',
    type: 'Recreation',
    distance: 'In Development'
  }
]

export default function NewConstructionPage() {
  return (
    <HyperLocalNeighborhoodPage
      name="Summerlin New Construction"
      description="Discover brand new homes in Summerlin's newest communities. From leading builders like Toll Brothers, Lennar, and Pulte, these modern homes feature smart technology, energy-efficient designs, and the latest amenities. Choose from a variety of floor plans and customize your dream home in Las Vegas' premier master-planned community."
      marketStats={marketStats}
      schools={schools}
      amenities={amenities}
      imageUrl="/images/new-construction-hero.jpg"
      realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
    />
  )
}
