import { Metadata } from "next"
import SummerlinOpenHouseWebsite from "components/SummerlinOpenHouseWebsite"
import StructuredData from "@/components/StructuredData"

export const revalidate = 3600 // ISR: revalidate every hour

export const metadata: Metadata = {
  title: "Summerlin West Open Houses | Dr. Jan Duffy Real Estate",
  description: "Discover your dream home in Summerlin West, Las Vegas. This weekend's open houses in The Ridges, Red Rock Country Club, Summerlin Centre, and more. Search all listings with Dr. Jan Duffy's home search.",
  keywords: "Summerlin West open houses, open houses Summerlin Nevada, weekend home tours Red Rock, new construction Summerlin West, luxury homes Summerlin open house, Summerlin real estate showings",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/',
  },
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://www.openhousemarketplace.com/",
    title: "Summerlin West Open Houses | Dr. Jan Duffy Real Estate",
    description: "Discover your dream home in Summerlin West, Las Vegas. This weekend's open houses in The Ridges, Red Rock Country Club, Summerlin Centre, and more.",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://www.openhousemarketplace.com/images/og/og-image.jpg",
        alt: "Summerlin West Open Houses - Dr. Jan Duffy Real Estate",
      },
    ],
  },
}

export default function HomePage() {
  return (
    <main id="main">
      <StructuredData 
        type="Organization"
        data={{
          url: 'https://www.openhousemarketplace.com',
        }}
      />
      <SummerlinOpenHouseWebsite />
    </main>
  )
}
