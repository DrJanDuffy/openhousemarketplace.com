declare global {
  interface Window {
    google?: {
      maps: {
        Map: new (mapDiv: HTMLElement, opts?: google.maps.MapOptions) => google.maps.Map
        Marker: new (opts?: google.maps.MarkerOptions) => google.maps.Marker
        InfoWindow: new (opts?: google.maps.InfoWindowOptions) => google.maps.InfoWindow
        LatLng: new (lat: number, lng: number) => google.maps.LatLng
        LatLngBounds: new (sw?: google.maps.LatLng, ne?: google.maps.LatLng) => google.maps.LatLngBounds
        Size: new (width: number, height: number) => google.maps.Size
        Point: new (x: number, y: number) => google.maps.Point
        PlacesService: new (map: HTMLElement | google.maps.Map) => {
          nearbySearch: (
            request: { location: google.maps.LatLng; radius: number; type: string },
            callback: (results: Array<{ geometry?: { location: { lat: () => number; lng: () => number } }; name: string; types?: string[] }> | null, status: string) => void
          ) => void
        }
        DirectionsService: new () => {
          route: (
            request: { origin: string | { lat: number; lng: number }; destination: string | { lat: number; lng: number }; travelMode: string },
            callback: (result: unknown, status: string) => void
          ) => void
        }
        DirectionsRenderer: new (opts?: { map: unknown }) => {
          setMap: (map: unknown) => void
          setDirections: (directions: unknown) => void
        }
        TravelMode: {
          DRIVING: string
          WALKING: string
          BICYCLING: string
          TRANSIT: string
        }
        event: {
          clearInstanceListeners: (obj: unknown) => void
        }
      }
    }
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: HTMLElement, opts?: MapOptions)
      setCenter(latlng: LatLng | LatLngLiteral): void
      setZoom(zoom: number): void
      panTo(latlng: LatLng | LatLngLiteral): void
      fitBounds(bounds: LatLngBounds): void
    }

    class Marker {
      constructor(opts?: MarkerOptions)
      setMap(map: Map | null): void
      getPosition(): LatLng
      addListener(eventName: string, handler: Function): void
    }

    class InfoWindow {
      constructor(opts?: InfoWindowOptions)
      open(map: Map, anchor?: Marker): void
    }

    class LatLng {
      constructor(lat: number, lng: number)
    }

    class LatLngBounds {
      constructor(sw?: LatLng, ne?: LatLng)
      extend(point: LatLng): LatLngBounds
    }

    interface MapOptions {
      center?: LatLng | LatLngLiteral
      zoom?: number
      styles?: MapTypeStyle[]
      mapTypeControl?: boolean
      streetViewControl?: boolean
      fullscreenControl?: boolean
      zoomControl?: boolean
    }

    interface MarkerOptions {
      position?: LatLng | LatLngLiteral
      map?: Map
      title?: string
      icon?: string | Icon | Symbol
    }

    interface InfoWindowOptions {
      content?: string | Element
    }

    interface LatLngLiteral {
      lat: number
      lng: number
    }

    interface MapTypeStyle {
      featureType?: string
      elementType?: string
      stylers?: MapTypeStyler[]
    }

    interface MapTypeStyler {
      visibility?: string
      color?: string
      weight?: number
      gamma?: number
      hue?: string
      lightness?: number
      saturation?: number
    }

    interface Icon {
      url: string
      scaledSize?: Size
      anchor?: Point
    }

    interface Symbol {
      path: string
      fillColor?: string
      fillOpacity?: number
      strokeColor?: string
      strokeOpacity?: number
      strokeWeight?: number
      scale?: number
    }

    class Size {
      constructor(width: number, height: number)
    }

    class Point {
      constructor(x: number, y: number)
    }
  }
}

export {}
