'use client'

/**
 * Fire Meta Pixel standard or custom events (after fbevents.js has loaded).
 * No-op if Pixel is not configured or script has not run.
 */
export function trackMetaPixelEvent(
  event: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('track', event, params)
}
