'use client'

import Link from 'next/link'
import { Phone, MapPin, Star, Clock, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ExternalLink from '@/components/ExternalLink'
import { GBP } from '@/config/gbp'

interface GoogleBusinessProfileProps {
  className?: string
  showMap?: boolean
  showReviews?: boolean
}

// NAP and hours from Google Business Profile (config/gbp.ts) – site supports the GBP
const coordinates = { lat: 36.1699, lng: -115.3301 }
const BUSINESS_INFO = {
  name: GBP.name,
  phone: GBP.phone,
  phoneLink: `tel:${GBP.phoneE164}`,
  email: 'jan@openhousemarketplace.com',
  address: {
    street: GBP.address.street,
    city: GBP.address.locality,
    state: GBP.address.region,
    zip: GBP.address.postalCode,
    full: `${GBP.address.street}, ${GBP.address.locality}, ${GBP.address.region} ${GBP.address.postalCode}`
  },
  coordinates,
  hours: {
    weekdays: 'Monday - Friday: 9:00 AM - 5:00 PM',
    weekends: 'Saturday - Sunday: 9:00 AM - 5:00 PM',
    note: 'Open 9 AM–5 PM every day (per Google Business Profile)'
  },
  googleBusinessUrl: process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL || 'https://www.google.com/maps/place/?q=Open+House+Market+Place+Las+Vegas+NV',
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`,
  reviewsUrl: (process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL || 'https://www.google.com/maps/place/?q=Open+House+Market+Place+Las+Vegas+NV') + (process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL ? '' : '&action=reviews')
}

export default function GoogleBusinessProfile({ 
  className = '', 
  showMap = true,
  showReviews = true 
}: GoogleBusinessProfileProps) {
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Load Google Maps script if map is enabled
    if (showMap && typeof window !== 'undefined' && !window.google?.maps) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => setMapLoaded(true)
      document.head.appendChild(script)
    } else if (showMap && typeof window !== 'undefined' && window.google?.maps) {
      setMapLoaded(true)
    }
  }, [showMap])

  useEffect(() => {
    if (mapLoaded && showMap && typeof window !== 'undefined' && window.google?.maps) {
      // Initialize map
      const mapElement = document.getElementById('gbp-map')
      if (mapElement) {
        const map = new window.google.maps.Map(mapElement, {
          center: { lat: BUSINESS_INFO.coordinates.lat, lng: BUSINESS_INFO.coordinates.lng },
          zoom: 15,
          mapTypeControl: false,
          streetViewControl: true,
          fullscreenControl: true,
        })

        // Add marker
        new window.google.maps.Marker({
          position: { lat: BUSINESS_INFO.coordinates.lat, lng: BUSINESS_INFO.coordinates.lng },
          map,
          title: BUSINESS_INFO.name,
        })
      }
    }
  }, [mapLoaded, showMap])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
      
      {/* NAP Information */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900">{BUSINESS_INFO.name}</p>
            <p className="text-gray-700">{BUSINESS_INFO.address.street}</p>
            <p className="text-gray-700">
              {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.zip}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Phone className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
          <a 
            href={BUSINESS_INFO.phoneLink}
            className="text-blue-600 hover:text-blue-800 font-semibold text-lg"
            aria-label={`Call ${BUSINESS_INFO.phone}`}
          >
            {BUSINESS_INFO.phone}
          </a>
        </div>

        <div className="flex items-center">
          <Mail className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
          <a 
            href={`mailto:${BUSINESS_INFO.email}`}
            className="text-blue-600 hover:text-blue-800"
            aria-label={`Email ${BUSINESS_INFO.email}`}
          >
            {BUSINESS_INFO.email}
          </a>
        </div>

        <div className="flex items-start">
          <Clock className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
          <div className="text-gray-700">
            <p className="font-semibold mb-1">Business Hours</p>
            <p>{BUSINESS_INFO.hours.weekdays}</p>
            <p>{BUSINESS_INFO.hours.weekends}</p>
            <p className="text-sm text-gray-600 mt-1">{BUSINESS_INFO.hours.note}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <Button asChild>
          <a
            href={BUSINESS_INFO.phoneLink}
            aria-label={`Call ${BUSINESS_INFO.phone}`}
          >
            <Phone className="h-4 w-4 mr-2" />
            Call
          </a>
        </Button>
        
        <Button asChild variant="outline">
          <ExternalLink
            href={BUSINESS_INFO.directionsUrl}
            ariaLabel="Get directions to business"
            showIcon={false}
            className="inline-flex items-center justify-center"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Directions
          </ExternalLink>
        </Button>
        
        {showReviews && (
          <Button asChild variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-white">
            <ExternalLink
              href={BUSINESS_INFO.reviewsUrl}
              ariaLabel="View Google Reviews"
              showIcon={false}
              className="inline-flex items-center justify-center"
            >
              <Star className="h-4 w-4 mr-2" />
              Reviews
            </ExternalLink>
          </Button>
        )}
      </div>
      <p className="text-sm text-gray-600 text-center mb-4">
        Want to leave a review?{' '}
        <Link href="/review-us" className="text-blue-600 hover:underline font-medium">
          Review us on Google
        </Link>
      </p>

      {/* Google Map Embed */}
      {showMap && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
          <div 
            id="gbp-map" 
            className="w-full min-h-64 h-64 rounded-lg border border-gray-200"
            aria-label="Google Map showing business location"
          />
          <p className="text-sm text-gray-600 mt-2 text-center">
            <ExternalLink
              href={BUSINESS_INFO.googleBusinessUrl}
              className="text-blue-600 hover:text-blue-800"
              ariaLabel="View on Google Maps"
            >
              View on Google Maps
            </ExternalLink>
          </p>
        </div>
      )}

      {/* Google Reviews Widget Placeholder */}
      {showReviews && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Star className="h-5 w-5 text-yellow-500 mr-2" />
            Google Reviews
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            See what our clients say about us on Google
          </p>
          <ExternalLink
            href={BUSINESS_INFO.reviewsUrl}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            ariaLabel="View all reviews on Google"
          >
            View All Reviews on Google
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </ExternalLink>
          {/* Note: For actual Google Reviews widget, you would need to use Google's Place API
              or a third-party service like Elfsight, ReviewsOnMyWebsite, etc. */}
        </div>
      )}
      </CardContent>
    </Card>
  )
}

