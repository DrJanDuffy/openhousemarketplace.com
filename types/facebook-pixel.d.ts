/** Meta Pixel (fbq) — loaded when NEXT_PUBLIC_FACEBOOK_PIXEL_ID is set */
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

export {}
