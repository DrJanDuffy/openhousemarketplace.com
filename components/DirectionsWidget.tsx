'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Navigation, Car, Footprints, Bike, Train, MapPin, Loader2 } from 'lucide-react'
import type { StoreLocation } from '@/data/storeLocations'

interface DirectionsWidgetProps {
  destinations: StoreLocation[]
  className?: string
}

type TravelMode = 'DRIVING' | 'WALKING' | 'BICYCLING' | 'TRANSIT'

const TRAVEL_MODE_OPTIONS: { value: TravelMode; label: string; icon: React.ReactNode }[] = [
  { value: 'DRIVING', label: 'Driving', icon: <Car className="h-4 w-4" /> },
  { value: 'WALKING', label: 'Walking', icon: <Footprints className="h-4 w-4" /> },
  { value: 'BICYCLING', label: 'Bicycling', icon: <Bike className="h-4 w-4" /> },
  { value: 'TRANSIT', label: 'Transit', icon: <Train className="h-4 w-4" /> },
]

export default function DirectionsWidget({ destinations, className = '' }: DirectionsWidgetProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<unknown>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [origin, setOrigin] = useState('')
  const [destinationId, setDestinationId] = useState<string>(destinations[0]?.id ?? '')

  if (destinations.length === 0) {
    return (
      <div className={`rounded-xl border border-gray-200 bg-gray-50 p-6 text-center ${className}`}>
        <p className="text-gray-600">No destinations configured. Add locations in data/storeLocations.ts.</p>
      </div>
    )
  }
  const [travelMode, setTravelMode] = useState<TravelMode>('DRIVING')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{
    duration: string
    distance: string
    steps: Array<{ instruction: string; distance?: string }>
  } | null>(null)
  const rendererRef = useRef<unknown>(null)

  const selectedDestination = destinations.find((d) => d.id === destinationId)

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
      const center = selectedDestination
        ? { lat: selectedDestination.lat, lng: selectedDestination.lng }
        : { lat: 36.1699, lng: -115.3301 }
      const mapInstance = new g.Map(mapRef.current, {
        center,
        zoom: 12,
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

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }
    setError(null)
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin(`${pos.coords.latitude},${pos.coords.longitude}`)
        setLoading(false)
      },
      () => {
        setError('Could not get your location. Enter an address instead.')
        setLoading(false)
      }
    )
  }

  const handleGetDirections = () => {
    if (!origin.trim() || !selectedDestination || !map || !window.google?.maps) {
      setError('Please enter an origin and ensure a destination is selected.')
      return
    }
    setError(null)
    setResult(null)
    setLoading(true)

    const g = window.google.maps
    const directionsService = new g.DirectionsService()
    let renderer = rendererRef.current as { setMap: (m: unknown) => void; setDirections: (d: unknown) => void } | null
    if (!renderer) {
      renderer = new g.DirectionsRenderer({ map: map as never }) as never
      rendererRef.current = renderer
    } else {
      renderer.setMap(map)
    }

    const request = {
      origin: origin.trim(),
      destination: { lat: selectedDestination.lat, lng: selectedDestination.lng },
      travelMode: g.TravelMode[travelMode as keyof typeof g.TravelMode],
    }

    directionsService.route(request, (res: unknown, status: string) => {
      setLoading(false)
      const response = res as {
        routes?: Array<{
          legs?: Array<{
            duration?: { text: string }
            distance?: { text: string }
            steps?: Array<{ instructions?: string; distance?: { text: string } }>
          }>
        }>
      }
      if (status !== 'OK' || !response?.routes?.length) {
        setError('Could not find a route. Try a different origin or travel mode.')
        renderer?.setMap(null)
        return
      }
      renderer?.setDirections(res as never)
      const leg = response.routes[0].legs?.[0]
      if (leg) {
        setResult({
          duration: leg.duration?.text ?? '—',
          distance: leg.distance?.text ?? '—',
          steps:
            leg.steps?.map((s) => ({
              instruction: (s.instructions ?? '').replace(/<[^>]+>/g, '').trim(),
              distance: s.distance?.text,
            })) ?? [],
        })
      }
    })
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1 space-y-4 p-4 rounded-xl border border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Plan your visit</h2>

          <div>
            <label htmlFor="directions-origin" className="block text-sm font-medium text-gray-700 mb-1">
              From (address or city)
            </label>
            <div className="flex gap-2">
              <input
                id="directions-origin"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Las Vegas, NV or 123 Main St"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleUseMyLocation}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                title="Use my location"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">My location</span>
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="directions-destination" className="block text-sm font-medium text-gray-700 mb-1">
              To (our location)
            </label>
            <select
              id="directions-destination"
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} – {d.city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">Travel mode</span>
            <div className="flex flex-wrap gap-2">
              {TRAVEL_MODE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTravelMode(opt.value)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    travelMode === opt.value
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400'
                  }`}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleGetDirections}
            disabled={loading || !origin.trim()}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Navigation className="h-5 w-5" />}
            Get directions
          </button>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        {/* Map + results */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-xl border border-gray-200 overflow-hidden bg-gray-100">
            <div ref={mapRef} className="w-full h-[360px]" aria-label="Directions map" />
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Loading map...</p>
                </div>
              </div>
            )}
          </div>

          {result && (
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Estimated travel</h3>
              <p className="text-sm text-gray-600 mb-3">
                <strong>{result.duration}</strong> ({result.distance})
              </p>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Steps</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                {result.steps.slice(0, 10).map((step, i) => (
                  <li key={i}>
                    {step.instruction}
                    {step.distance && <span className="text-gray-500"> ({step.distance})</span>}
                  </li>
                ))}
                {result.steps.length > 10 && (
                  <li className="text-gray-500">… and {result.steps.length - 10} more steps</li>
                )}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
