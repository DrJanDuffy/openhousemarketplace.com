declare global {
  interface Window {
    google: typeof google
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
