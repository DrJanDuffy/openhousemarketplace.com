'use client'

import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Home, Star, Clock } from 'lucide-react'

interface Property {
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
  lat: number
  lng: number
}

interface InteractiveMapProps {
  properties: Property[]
  className?: string
  onPropertyClick?: (property: Property) => void
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  properties,
  className = "",
  onPropertyClick
}) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  // Summerlin West center coordinates
  const SUMMERLIN_CENTER = { lat: 36.1699, lng: -115.1398 }

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap()
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'DEMO_KEY'}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initializeMap
      document.head.appendChild(script)
    }

    loadGoogleMaps()
  }, [])

  const initializeMap = () => {
    if (!mapRef.current) return

    const mapInstance = new google.maps.Map(mapRef.current, {
      center: SUMMERLIN_CENTER,
      zoom: 13,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true
    })

    setMap(mapInstance)
    setIsMapLoaded(true)
  }

  useEffect(() => {
    if (!map || !isMapLoaded) return

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null))

    // Create new markers for each property
    const newMarkers = properties.map(property => {
      const marker = new google.maps.Marker({
        position: { lat: property.lat, lng: property.lng },
        map: map,
        title: property.address,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#3B82F6" stroke="white" stroke-width="2"/>
              <path d="M16 8l-6 6v10h12V14l-6-6z" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 16)
        }
      })

      // Create info window content
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-4 max-w-xs">
            <div class="font-bold text-lg text-gray-900">${property.price}</div>
            <div class="text-sm text-gray-600 mb-2">${property.address}</div>
            <div class="text-sm text-blue-600 font-medium mb-2">${property.neighborhood}</div>
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>${property.beds} beds</span>
              <span>${property.baths} baths</span>
              <span>${property.sqft} sqft</span>
            </div>
            <div class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
              ${property.openHouseTime}
            </div>
          </div>
        `
      })

      marker.addListener('click', () => {
        infoWindow.open(map, marker)
        setSelectedProperty(property)
        onPropertyClick?.(property)
      })

      return marker
    })

    setMarkers(newMarkers)

    // Fit map to show all markers
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds()
      newMarkers.forEach(marker => {
        bounds.extend(marker.getPosition()!)
      })
      map.fitBounds(bounds)
    }
  }, [map, isMapLoaded, properties])

  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-96 md:h-[600px] rounded-lg shadow-lg"
        style={{ minHeight: '400px' }}
      />
      
      {/* Map Controls Overlay */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-2">
        <div className="text-sm font-medium text-gray-700 mb-2">Summerlin West</div>
        <div className="text-xs text-gray-500">
          {properties.length} open houses
        </div>
      </div>

      {/* Property List Overlay */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-4 max-w-sm max-h-96 overflow-y-auto">
        <h3 className="font-bold text-gray-900 mb-3">Open Houses</h3>
        <div className="space-y-3">
          {properties.slice(0, 5).map(property => (
            <div 
              key={property.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedProperty?.id === property.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                setSelectedProperty(property)
                onPropertyClick?.(property)
                // Pan map to property
                if (map) {
                  map.panTo({ lat: property.lat, lng: property.lng })
                  map.setZoom(16)
                }
              }}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="font-bold text-gray-900">{property.price}</div>
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-sm text-gray-600 mb-1">{property.address}</div>
              <div className="text-xs text-blue-600 font-medium mb-2">{property.neighborhood}</div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{property.beds} beds</span>
                <span>{property.baths} baths</span>
                <span>{property.sqft} sqft</span>
              </div>
              <div className="text-xs text-blue-600 font-medium mt-1">
                {property.openHouseTime}
              </div>
            </div>
          ))}
        </div>
        {properties.length > 5 && (
          <div className="text-center mt-3">
            <button 
              onClick={() => window.open('https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==', '_blank')}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View all {properties.length} properties →
            </button>
          </div>
        )}
      </div>

      {/* Loading State */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <div className="text-sm text-gray-600">Loading map...</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InteractiveMap
