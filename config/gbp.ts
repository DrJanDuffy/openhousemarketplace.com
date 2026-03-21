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
 */

import { getSiteUrl } from '@/lib/site'

/** GBP “Website” field uses apex; env/canonical may be www — both resolve via redirect. */
export const GBP_WEBSITE_FIELD_URL = 'https://openhousemarketplace.com/'

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
