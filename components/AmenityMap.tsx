'use client'

import React, { useEffect, useRef, useState } from 'react'
import { MapPin, UtensilsCrossed, TreePine, Car, Coffee, ShoppingCart, Fuel, Dumbbell, Pill } from 'lucide-react'

/** Place type config: Maps API type + label + icon */
const AMENITY_TYPES: { type: string; label: string; icon: React.ReactNode }[] = [
  { type: 'restaurant', label: 'Restaurants', icon: <UtensilsCrossed className="h-4 w-4" /> },
  { type: 'park', label: 'Parks', icon: <TreePine className="h-4 w-4" /> },
  { type: 'parking', label: 'Parking', icon: <Car className="h-4 w-4" /> },
  { type: 'cafe', label: 'Cafes', icon: <Coffee className="h-4 w-4" /> },
  { type: 'grocery_or_supermarket', label: 'Grocery', icon: <ShoppingCart className="h-4 w-4" /> },
  { type: 'gas_station', label: 'Gas', icon: <Fuel className="h-4 w-4" /> },
  { type: 'gym', label: 'Gyms', icon: <Dumbbell className="h-4 w-4" /> },
  { type: 'pharmacy', label: 'Pharmacies', icon: <Pill className="h-4 w-4" /> },
]

const MAP_CENTER = { lat: 36.16, lng: -115.13 }
const MAP_RADIUS_M = 2500
const MAP_ZOOM = 14
const MAP_LOAD_TIMEOUT_MS = 15000

export default function AmenityMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<unknown>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mapLoadError, setMapLoadError] = useState<string | null>(null)
  const [loadTrigger, setLoadTrigger] = useState(0)
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set(['restaurant', 'park', 'cafe']))
  const [noResultsForCurrentSelection, setNoResultsForCurrentSelection] = useState(false)
  const markersRef = useRef<unknown[]>([])
  const infoWindowRef = useRef<unknown>(null)
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const loadedSuccessRef = useRef(false)

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
  }

  const handleRetry = () => {
    setMapLoadError(null)
    setLoadTrigger((t) => t + 1)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    setMapLoadError(null)
    if (loadTrigger > 0) setIsLoaded(false)

    const initMap = () => {
      if (!mapRef.current || !window.google?.maps) return
      loadedSuccessRef.current = true
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current)
        loadTimeoutRef.current = null
      }
      const g = window.google.maps
      const mapInstance = new g.Map(mapRef.current, {
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      })
      setMap(mapInstance)
      setIsLoaded(true)
    }

    const loadMaps = () => {
      if (window.google?.maps) {
        initMap()
        return
      }
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initMap
      script.onerror = () => {
        setMapLoadError('Map couldn\'t load. Check your connection or try again later.')
        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current)
          loadTimeoutRef.current = null
        }
      }
      document.head.appendChild(script)
    }

    loadedSuccessRef.current = false
    loadMaps()
    loadTimeoutRef.current = setTimeout(() => {
      loadTimeoutRef.current = null
      if (!loadedSuccessRef.current) {
        setMapLoadError('Map is taking longer than usual. Check your connection or try again.')
      }
    }, MAP_LOAD_TIMEOUT_MS)

    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current)
        loadTimeoutRef.current = null
      }
    }
  }, [loadTrigger])

  useEffect(() => {
    if (!map || !isLoaded || !mapRef.current || !window.google?.maps) return
    setNoResultsForCurrentSelection(false)
    const g = window.google.maps
    const latLng = new g.LatLng(MAP_CENTER.lat, MAP_CENTER.lng)

    markersRef.current.forEach((m) => {
      if (m && typeof (m as { setMap: (x: null) => void }).setMap === 'function') (m as { setMap: (x: null) => void }).setMap(null)
    })
    markersRef.current = []
    const iw = infoWindowRef.current as { close?: () => void } | null
    if (iw?.close) {
      iw.close()
      if (window.google?.maps?.event?.clearInstanceListeners) {
        window.google.maps.event.clearInstanceListeners(iw as unknown)
      }
    }

    const bounds = new g.LatLngBounds()
    let pending = selectedTypes.size
    const mapInstance = map as { setCenter: (c: { lat: number; lng: number }) => void; fitBounds: (b: unknown) => void }

    if (pending === 0) {
      mapInstance.setCenter(MAP_CENTER)
      return
    }

    const placesService = new g.PlacesService(map as never)
    const infoWindow = new g.InfoWindow({ content: '' }) as { setContent: (s: string) => void; open: (m: unknown, a: unknown) => void; close: () => void }
    infoWindowRef.current = infoWindow

    selectedTypes.forEach((placeType) => {
      placesService.nearbySearch(
        {
          location: latLng,
          radius: MAP_RADIUS_M,
          type: placeType,
        },
        (results, status) => {
          if (status !== 'OK' || !results) {
            pending -= 1
            if (pending === 0) {
              if (markersRef.current.length > 0) mapInstance.fitBounds(bounds)
              else if (selectedTypes.size > 0) setNoResultsForCurrentSelection(true)
            }
            return
          }
          const label = AMENITY_TYPES.find((a) => a.type === placeType)?.label || placeType
          results.forEach((place) => {
            const loc = place.geometry?.location
            if (!loc) return
            const mapForMarker = map as InstanceType<NonNullable<Window['google']>['maps']['Map']>
            const marker = new g.Marker({
              position: { lat: loc.lat(), lng: loc.lng() },
              map: mapForMarker,
              title: place.name,
            })
            marker.addListener('click', () => {
              infoWindow.setContent(
                `<div class="p-2 min-w-[140px]"><div class="font-semibold text-gray-900">${place.name}</div><div class="text-xs text-gray-600">${label}</div></div>`
              )
              infoWindow.open(mapForMarker, marker)
            })
            markersRef.current.push(marker)
            bounds.extend(loc)
          })
          pending -= 1
          if (pending === 0) {
            if (markersRef.current.length > 0) mapInstance.fitBounds(bounds)
            else if (selectedTypes.size > 0) setNoResultsForCurrentSelection(true)
          }
        }
      )
    })
  }, [map, isLoaded, selectedTypes])

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5 w-full sm:w-auto">
          <MapPin className="h-4 w-4 text-blue-600" aria-hidden />
          Show nearby:
        </span>
        {AMENITY_TYPES.map(({ type, label, icon }) => (
          <label
            key={type}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm font-medium transition-colors ${
              selectedTypes.has(type)
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedTypes.has(type)}
              onChange={() => toggleType(type)}
              className="sr-only"
            />
            {icon}
            {label}
          </label>
        ))}
      </div>
      <div
        ref={mapRef}
        className="w-full h-[480px] md:h-[560px] rounded-xl border border-gray-200 shadow-lg bg-gray-100"
        aria-label="Map showing nearby amenities"
      />
      {noResultsForCurrentSelection && (
        <p className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2" role="status">
          No places found in this area. Try different types or zoom out.
        </p>
      )}
      {!isLoaded && !mapLoadError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl"
          role="status"
          aria-live="polite"
          aria-label="Loading map"
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent mx-auto mb-3" />
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      {mapLoadError && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-xl p-6"
          role="alert"
          aria-live="assertive"
        >
          <p className="text-sm text-gray-700 text-center mb-4">{mapLoadError}</p>
          <button
            type="button"
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  )
}
