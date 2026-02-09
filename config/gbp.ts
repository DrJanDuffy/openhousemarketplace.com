/**
 * Google Business Profile (GBP) – single source of truth for this site.
 * The website supports the GBP; NAP, hours, and description must match the profile.
 * Profile: https://share.google/Jgb4vGEoabNywBkJW (or set NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL).
 */

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
  /** Website URL from GBP (canonical; must match site canonicals and schema) */
  website: 'https://www.openhousemarketplace.com/',
  /**
   * Business hours from GBP: Open 9:00 AM–5:00 PM every day.
   * (Wednesday was listed as 5:00 AM in profile; treated as 5:00 PM.)
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
  /** GBP description (for schema description / about) */
  description:
    'Open House Market Place is a full-service real estate brokerage committed to helping clients navigate the dynamic Las Vegas housing market. Specializing in residential properties, they offer expert guidance for those looking to buy, sell, or invest. Their experienced agents provide personalized service, leveraging deep local knowledge and market insights to ensure successful transactions. Located in the heart of Las Vegas, Open House Market Place is dedicated to making every real estate journey smooth and rewarding.',
} as const

export type GBPConfig = typeof GBP
