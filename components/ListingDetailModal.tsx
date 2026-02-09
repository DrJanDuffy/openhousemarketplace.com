'use client'

import React from 'react'
import Link from 'next/link'
import OptimizedImage from './OptimizedImage'
import { VideoEmbed } from './VideoEmbed'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import type { Listing } from '@/types/listing'
import { cn } from '@/lib/utils'

export type ListingDetailModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  listing: Listing | null
  /** Call when user clicks "Take Virtual Tour" so parent can open VirtualTourModal */
  onOpenVirtualTour: (url: string) => void
}

const NEIGHBORHOOD_URL_MAP: Record<string, string> = {
  'The Ridges': '/neighborhoods/the-ridges',
  'Red Rock Country Club': '/neighborhoods/red-rock-country-club',
  'Summerlin Centre': '/neighborhoods/summerlin-centre',
  'Sun City Summerlin': '/neighborhoods/sun-city-summerlin',
  'Mesa Ridge': '/neighborhoods/mesa-ridge',
  'Willows': '/neighborhoods/willows',
}

export function ListingDetailModal({
  open,
  onOpenChange,
  listing,
  onOpenVirtualTour,
}: ListingDetailModalProps) {
  if (!listing) return null

  const handleTakeVirtualTour = () => {
    if (listing.virtualTourUrl) {
      onOpenVirtualTour(listing.virtualTourUrl)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn(
            'max-h-[90vh] max-w-2xl overflow-hidden p-0',
            'grid max-h-[90vh] w-full grid-rows-[auto_1fr]'
          )}
        >
          <DialogHeader className="space-y-1 border-b border-gray-200 px-6 py-4">
            <DialogTitle className="text-xl font-bold text-gray-900">
              {listing.address}
            </DialogTitle>
            <p className="text-sm text-gray-600">
              {listing.neighborhood && NEIGHBORHOOD_URL_MAP[listing.neighborhood] ? (
                <Link
                  href={NEIGHBORHOOD_URL_MAP[listing.neighborhood]!}
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  {listing.neighborhood}
                </Link>
              ) : (
                listing.neighborhood
              )}
              {' · '}
              {listing.price}
            </p>
          </DialogHeader>

          <div className="overflow-y-auto px-6 py-4">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
              <OptimizedImage
                src={listing.image}
                alt={`${listing.address} - ${listing.neighborhood}`}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              <span>{listing.beds} beds</span>
              <span>{listing.baths} baths</span>
              <span>{listing.sqft} sqft</span>
              <span>{listing.openHouseTime}</span>
            </div>

            {listing.features.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {listing.features.map((f) => (
                  <span
                    key={f}
                    className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                  >
                    {f}
                  </span>
                ))}
              </div>
            )}

            {listing.description && (
              <p className="mt-4 text-gray-700">{listing.description}</p>
            )}

            {/* Virtual Tour section */}
            {listing.virtualTourUrl && (
              <div className="mt-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Virtual Tour</h3>
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
                  <iframe
                    src={listing.virtualTourUrl}
                    title={`Virtual tour - ${listing.address}`}
                    className="h-full w-full border-0"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleTakeVirtualTour}
                  className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                >
                  Take Virtual Tour (fullscreen)
                </button>
              </div>
            )}

            {/* Video Walkthrough section */}
            {listing.videoUrl && (
              <div className="mt-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Video Walkthrough</h3>
                <VideoEmbed
                  videoUrl={listing.videoUrl}
                  title={`Video - ${listing.address}`}
                  lazy
                />
              </div>
            )}

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={handleTakeVirtualTour}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                disabled={!listing.virtualTourUrl}
              >
                Take Virtual Tour
              </button>
              <button
                type="button"
                onClick={() => window.open(`https://maps.google.com/?q=${listing.address}`, '_blank')}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Get Directions
              </button>
            </div>
          </div>
        </DialogContent>
    </Dialog>
  )
}
