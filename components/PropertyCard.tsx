'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Bed, Bath, Square, Calendar } from 'lucide-react'
import Image from 'next/image'

interface PropertyCardProps {
  address: string
  price: string
  beds: number
  baths: number
  sqft: number
  imageUrl: string
  openHouseDate?: string
  neighborhood?: string
  onScheduleTour?: () => void
  onViewDetails?: () => void
}

export function PropertyCard({
  address,
  price,
  beds,
  baths,
  sqft,
  imageUrl,
  openHouseDate,
  neighborhood,
  onScheduleTour,
  onViewDetails
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={address}
          fill
          className="object-cover"
        />
        {openHouseDate && (
          <Badge className="absolute top-2 right-2 bg-red-600 hover:bg-red-700">
            <Calendar className="h-3 w-3 mr-1" />
            Open House
          </Badge>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl">{price}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {address}
        </CardDescription>
        {neighborhood && (
          <Badge variant="outline">{neighborhood}</Badge>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            {beds} beds
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            {baths} baths
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            {sqft.toLocaleString()} sqft
          </div>
        </div>
        {openHouseDate && (
          <p className="mt-2 text-sm font-medium text-red-600">
            Open House: {openHouseDate}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Button 
          variant="default" 
          className="flex-1"
          onClick={onScheduleTour}
        >
          Schedule Tour
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

