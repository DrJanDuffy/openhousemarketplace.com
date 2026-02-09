/**
 * Listing / open house data shape used for cards and detail views.
 * virtualTourUrl: Matterport, Zillow 3D, or any iframe-embeddable URL
 * videoUrl: YouTube or Vimeo URL for walkthrough video
 * hasVirtualTour: derived from virtualTourUrl presence (optional, can be !!virtualTourUrl at render)
 */
export interface Listing {
  id: number
  address: string
  neighborhood: string
  price: string
  beds: number
  baths: number
  sqft: string
  openHouseTime: string
  image: string
  features: string[]
  zipCode: string
  realtor: string
  phone: string
  description: string
  lat: number
  lng: number
  virtualTourUrl?: string
  videoUrl?: string
  hasVirtualTour?: boolean
}
