import { Metadata } from "next"
import SummerlinOpenHouseWebsite from "components/SummerlinOpenHouseWebsite"
import StructuredData from "@/components/StructuredData"

export const metadata: Metadata = {
  title: "Summerlin West Open Houses | Dr. Jan Duffy Real Estate",
  description: "Discover your dream home in Summerlin West, Las Vegas. This weekend's open houses in The Ridges, Red Rock Country Club, Summerlin Centre, and more. Search with Dr. Jan Duffy's RealScout platform.",
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
        url: "/api/placeholder/1200/630",
        alt: "Summerlin West Open Houses - Dr. Jan Duffy Real Estate",
      },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <StructuredData 
        type="LocalBusiness"
        data={{
          openingHours: 'Mo-Su 08:00-20:00',
          paymentAccepted: 'Cash, Check, Credit Card',
        }}
      />
      <StructuredData 
        type="Organization"
        data={{
          url: 'https://www.openhousemarketplace.com',
        }}
      />
      <SummerlinOpenHouseWebsite />
    </>
  )
}
