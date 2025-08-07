import { Metadata } from 'next'
import HyperLocalNeighborhoodPage from '@/components/HyperLocalNeighborhoodPage'

export const metadata: Metadata = {
  title: 'Summerlin Centre | Modern Family Homes & Amenities',
  description: 'Explore Summerlin Centre homes for sale. Modern family living with parks, top schools, and shopping nearby. Experience the best of Summerlin\'s newest village.',
  keywords: 'Summerlin Centre, family homes Las Vegas, new construction Summerlin, Downtown Summerlin, modern homes',
  openGraph: {
    title: 'Summerlin Centre | Modern Family Homes & Amenities',
    description: 'Modern family living in Summerlin Centre. Parks, schools, and shopping at your doorstep.',
    images: ['/images/summerlin-centre-hero.jpg'],
  }
}

const marketStats = {
  medianPrice: '$850,000',
  daysOnMarket: 28,
  activeListings: 22,
  pricePerSqFt: '$295',
  monthlyChange: '+1.5%'
}

const schools = [
  {
    name: 'Vassiliadis Elementary',
    rating: 9,
    type: 'Public Elementary',
    distance: '0.8 miles'
  },
  {
    name: 'Sig Rogich Middle School',
    rating: 8,
    type: 'Public Middle',
    distance: '1.5 miles'
  },
  {
    name: 'West Career & Technical Academy',
    rating: 10,
    type: 'Public Magnet',
    distance: '2.1 miles'
  }
]

const amenities = [
  {
    name: 'Downtown Summerlin',
    type: 'Shopping & Dining',
    distance: '5 minutes'
  },
  {
    name: 'Fox Hill Park',
    type: 'park',
    distance: 'On-site'
  },
  {
    name: 'Summerlin Centre Community Park',
    type: 'park',
    distance: '0.5 miles'
  },
  {
    name: 'Las Vegas Ballpark',
    type: 'Entertainment',
    distance: '7 minutes'
  }
]

export default function SummerlinCentrePage() {
  return (
    <HyperLocalNeighborhoodPage
      name="Summerlin Centre"
      description="Summerlin Centre represents modern family living at its finest, offering new construction homes with smart technology and energy-efficient features. Located in the heart of Summerlin, residents enjoy easy access to Downtown Summerlin's shopping and dining, excellent schools, and abundant parks and trails."
      marketStats={marketStats}
      schools={schools}
      amenities={amenities}
      imageUrl="/images/summerlin-centre-hero.jpg"
      realscoutUrl="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
    />
  )
}
