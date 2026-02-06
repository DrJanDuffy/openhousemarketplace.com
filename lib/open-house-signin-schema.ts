import { z } from 'zod'

export const HEAR_ABOUT_SOURCES = [
  'Zillow',
  'Realtor.com',
  'Social Media',
  'Drive-by/Sign',
  'Friend/Family',
  'DrJanDuffy.com',
  'OpenHouseMarketplace.com',
  'Other',
] as const

export const PURCHASE_TIMELINES = [
  'Immediately',
  '1-3 months',
  '3-6 months',
  '6-12 months',
  'Just browsing',
] as const

export const PRE_APPROVED_OPTIONS = ['yes', 'no', 'cash'] as const

export const openHouseSignInBodySchema = z.object({
  listingId: z.string().min(1, 'Listing ID is required'),
  listingAddress: z.string().optional(),
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  workingWithAgent: z.boolean(),
  agentName: z.string().optional(),
  hearAboutSource: z.enum(HEAR_ABOUT_SOURCES),
  preApproved: z.enum(PRE_APPROVED_OPTIONS),
  purchaseTimeline: z.enum(PURCHASE_TIMELINES),
  interestedNeighborhoods: z.array(z.string()).optional(),
})

export type OpenHouseSignInBody = z.infer<typeof openHouseSignInBodySchema>

export interface OpenHouseSignIn {
  id: string
  listingId: string
  listingAddress: string
  fullName: string
  email: string
  phone: string
  workingWithAgent: boolean
  agentName?: string
  hearAboutSource: string
  preApproved: 'yes' | 'no' | 'cash'
  purchaseTimeline: string
  interestedNeighborhoods?: string[]
  submittedAt: string
  ipAddress?: string
}

export function parseOpenHouseSignInBody(data: unknown): OpenHouseSignInBody {
  return openHouseSignInBodySchema.parse(data)
}
