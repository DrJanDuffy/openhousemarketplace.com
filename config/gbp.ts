/**
 * Google Business Profile (GBP) – single source of truth for this site.
 * The website supports the GBP; NAP, hours, and description must match the profile.
 * Profile: https://share.google/Jgb4vGEoabNywBkJW (or set NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL).
 *
 * GBP snapshot (keep in sync when the profile changes):
 * - Name: Open House Market Place | Category: Real estate agent
 * - Phone: (702) 200-3422 | Chat/SMS: sms:+17022003422
 * - Website (GBP field): https://openhousemarketplace.com/ — apex; this site’s canonical is www (see vercel.json redirect)
 * - Address: 11773 Cashmere Mist Ave, Las Vegas, NV 89138
 * - Hours: daily 9:00 AM–5:00 PM. If Wednesday shows 5:00 AM in GBP, fix to 5:00 PM in Google Business Profile.
 * - Special: Apr 5, 2026 (Easter) — Closed
 * - Service area: add in GBP when defined; meanwhile site uses GBP_SERVICE_AREA for visible + schema
 */

import { getSiteUrl } from '@/lib/site'

/** GBP “Website” field uses apex; env/canonical may be www — both resolve via redirect. */
export const GBP_WEBSITE_FIELD_URL = 'https://openhousemarketplace.com/'

/** Official Facebook Page (business profile). */
export const FACEBOOK_PAGE_URL = 'https://www.facebook.com/OpenHouseMarketPlace' as const

/** GBP + official social profiles for JSON-LD `sameAs` (GBP link from env when set). */
export function getBusinessSameAsUrls(): string[] {
  const urls: string[] = []
  if (typeof process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL === 'string') {
    urls.push(process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL)
  }
  urls.push(FACEBOOK_PAGE_URL)
  return urls
}

/** Geocode for 11773 Cashmere Mist Ave (office pin; matches NAP). */
export const OFFICE_GEO = { lat: 36.1729722, lng: -115.3540974 } as const

/**
 * Hyperlocal service area — visible copy + schema. Mirror GBP → “Service area” when you configure it there.
 */
export const GBP_SERVICE_AREA = {
  label:
    'Summerlin West and Summerlin; Las Vegas zip codes 89135, 89138, and 89144; greater Las Vegas Valley including Henderson and North Las Vegas.',
  zipCodes: ['89135', '89138', '89144'] as const,
} as const

export const GBP = {
  /** Business name (exact match to GBP) */
  name: 'Open House Market Place',
  /** Category on GBP */
  category: 'Real estate agent',
  /** Full address (exact match to GBP) */
  address: {
    street: '11773 Cashmere Mist Ave',
    locality: 'Las Vegas',
    region: 'NV',
    postalCode: '89138',
    country: 'US',
  },
  /** Main phone (exact match to GBP) */
  phone: '(702) 200-3422',
  /** E.164 for tel: and schema */
  phoneE164: '+17022003422',
  /** SMS/Chat from GBP */
  sms: 'sms:+17022003422',
  /** Public site URL for schema (use getSiteUrl() = canonical, typically https://www.openhousemarketplace.com) */
  website: `${getSiteUrl()}/`,
  /**
   * Business hours from GBP: 9:00 AM–5:00 PM every day (Sun–Sat).
   * If Wednesday incorrectly shows 5:00 AM in GBP, correct it in Google to 5:00 PM.
   */
  hours: {
    /** Schema.org openingHours string (compact) */
    schemaCompact: 'Mo-Su 09:00-17:00',
    /** For StructuredData openingHours array */
    schemaArray: ['Mo-Su 09:00-17:00'],
    /** openingHoursSpecification (all days 9–5) */
    specification: [
      { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '09:00', closes: '17:00' },
    ],
  },
  /**
   * Dates the business is fully closed (from GBP special hours). Remove past dates periodically.
   * Reflected in JSON-LD specialOpeningHoursSpecification.
   */
  specialHoursClosed: [{ date: '2026-04-05', label: 'Easter' }] as const,
  /** GBP description (for schema description / about) — add in GBP when ready; site uses this for schema meanwhile */
  description:
    'Open House Market Place is a full-service real estate brokerage committed to helping clients navigate the dynamic Las Vegas housing market. Specializing in residential properties, they offer expert guidance for those looking to buy, sell, or invest. Their experienced agents provide personalized service, leveraging deep local knowledge and market insights to ensure successful transactions. Located in the heart of Las Vegas, Open House Market Place is dedicated to making every real estate journey smooth and rewarding.',
} as const

export type GBPConfig = typeof GBP

/** Google Maps directions to the office address (encoded). */
export function getGoogleMapsDirectionsUrlToOffice(): string {
  const dest = `${GBP.address.street}, ${GBP.address.locality}, ${GBP.address.region} ${GBP.address.postalCode}`
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}`
}

/**
 * JSON-LD `areaServed` list for LocalBusiness / RealEstateAgent (aligns with site footer + zip routes).
 */
export function getAreaServedJsonLd(): Record<string, unknown>[] {
  return [
    {
      '@type': 'City',
      name: 'Las Vegas',
      containedInPlace: { '@type': 'State', name: 'Nevada', addressCountry: 'US' },
    },
    { '@type': 'AdministrativeArea', name: 'Summerlin' },
    { '@type': 'AdministrativeArea', name: 'Summerlin West' },
    { '@type': 'City', name: 'Henderson', containedInPlace: { '@type': 'State', name: 'Nevada', addressCountry: 'US' } },
    { '@type': 'City', name: 'North Las Vegas', containedInPlace: { '@type': 'State', name: 'Nevada', addressCountry: 'US' } },
  ]
}
