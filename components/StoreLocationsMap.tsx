'use client'

import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Phone, Clock, Navigation } from 'lucide-react'
import type { StoreLocation } from '@/data/storeLocations'

interface StoreLocationsMapProps {
  locations: StoreLocation[]
  className?: string
}

export default function StoreLocationsMap({ locations, className = '' }: StoreLocationsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<unknown>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const markersRef = useRef<unknown[]>([])
  const infoWindowRef = useRef<unknown>(null)

  const firstLocation = locations[0]
  const defaultCenter = firstLocation ? { lat: firstLocation.lat, lng: firstLocation.lng } : { lat: 36.1699, lng: -115.3301 }
  const defaultZoom = locations.length > 1 ? 11 : 15

  useEffect(() => {
    const loadMaps = () => {
      if (typeof window === 'undefined') return
      if (window.google?.maps) {
        initMap()
        return
      }
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}`
      script.async = true
      script.defer = true
      script.onload = initMap
      document.head.appendChild(script)
    }

    const initMap = () => {
      if (!mapRef.current || !window.google?.maps) return
      const g = window.google.maps
      const mapInstance = new g.Map(mapRef.current, {
        center: defaultCenter,
        zoom: defaultZoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      })
      setMap(mapInstance)
      setIsLoaded(true)
    }

    loadMaps()
  }, [])

  useEffect(() => {
    if (!map || !isLoaded || !window.google?.maps || locations.length === 0) return
    const g = window.google.maps
    const mapInstance = map as InstanceType<typeof g.Map>

    markersRef.current.forEach((m) => {
      const marker = m as { setMap: (x: null) => void }
      if (marker?.setMap) marker.setMap(null)
    })
    markersRef.current = []
    const iw = infoWindowRef.current as { close?: () => void } | null
    if (iw?.close) iw.close()

    const bounds = new g.LatLngBounds()
    const infoWindow = new g.InfoWindow({ content: '' }) as {
      setContent: (s: string) => void
      open: (m: unknown, a: unknown) => void
      close: () => void
    }
    infoWindowRef.current = infoWindow

    locations.forEach((loc) => {
      const marker = new g.Marker({
        position: { lat: loc.lat, lng: loc.lng },
        map: mapInstance,
        title: loc.name,
      })
      const content = `
        <div class="p-3 min-w-[200px]">
          <div class="font-semibold text-gray-900 mb-1">${loc.name}</div>
          <div class="text-sm text-gray-600 mb-2">${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}</div>
          ${loc.phone ? `<div class="text-sm mb-2"><a href="tel:+1${loc.phone.replace(/\D/g, '')}" class="text-blue-600 hover:underline">${loc.phone}</a></div>` : ''}
          ${loc.hours ? `<div class="text-xs text-gray-500 mb-2">${loc.hours}</div>` : ''}
          <a href="${loc.directionsUrl}" target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-blue-600 hover:underline">Get directions</a>
        </div>
      `
      marker.addListener('click', () => {
        infoWindow.setContent(content)
        infoWindow.open(mapInstance, marker)
      })
      markersRef.current.push(marker)
      bounds.extend(new g.LatLng(loc.lat, loc.lng))
    })

    if (locations.length > 1) mapInstance.fitBounds(bounds)
    else mapInstance.setCenter(defaultCenter)
  }, [map, isLoaded, locations, defaultCenter.lat, defaultCenter.lng])

  if (locations.length === 0) {
    return (
      <div className={`rounded-xl border border-gray-200 bg-gray-50 p-8 text-center ${className}`}>
        <p className="text-gray-600">No store locations configured. Add locations in <code className="text-sm bg-gray-200 px-1 rounded">data/storeLocations.ts</code>.</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`}>
      {/* Location list */}
      <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
        <h2 className="text-lg font-semibold text-gray-900">Our locations</h2>
        {locations.map((loc) => (
          <article
            key={loc.id}
            className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">{loc.name}</h3>
            <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-blue-600" aria-hidden />
              <span>{loc.address}, {loc.city}, {loc.state} {loc.zip}</span>
            </div>
            {loc.phone && (
              <div className="flex items-center gap-2 text-sm mb-2">
                <Phone className="h-4 w-4 shrink-0 text-blue-600" aria-hidden />
                <a href={`tel:+1${loc.phone.replace(/\D/g, '')}`} className="text-blue-600 hover:underline">
                  {loc.phone}
                </a>
              </div>
            )}
            {loc.hours && (
              <div className="flex items-start gap-2 text-xs text-gray-500 mb-3">
                <Clock className="h-4 w-4 shrink-0 mt-0.5" aria-hidden />
                <span>{loc.hours}</span>
              </div>
            )}
            <a
              href={loc.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              <Navigation className="h-4 w-4" aria-hidden />
              Get directions
            </a>
          </article>
        ))}
      </div>

      {/* Map */}
      <div className="lg:col-span-2 order-1 lg:order-2 relative">
        <div
          ref={mapRef}
          className="w-full h-[400px] lg:h-[500px] rounded-xl border border-gray-200 shadow-lg bg-gray-100"
          aria-label="Map showing store locations"
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent mx-auto mb-3" />
              <p className="text-sm text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
