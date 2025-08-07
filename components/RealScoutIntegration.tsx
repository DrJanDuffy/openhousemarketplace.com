'use client'

import React, { useState, useEffect } from 'react'
import { Search, Heart, Calendar, MapPin, Star, Phone, Mail } from 'lucide-react'

interface RealScoutIntegrationProps {
  propertyId?: string
  address?: string
  price?: string
  neighborhood?: string
}

const RealScoutIntegration: React.FC<RealScoutIntegrationProps> = ({
  propertyId,
  address,
  price,
  neighborhood
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [savedProperties, setSavedProperties] = useState<string[]>([])

  // RealScout API configuration
  const REAL_SCOUT_CONFIG = {
    apiUrl: process.env.NEXT_PUBLIC_REAL_SCOUT_API_URL || 'https://api.realscout.com',
    clientId: process.env.NEXT_PUBLIC_REAL_SCOUT_CLIENT_ID,
    redirectUri: process.env.NEXT_PUBLIC_REAL_SCOUT_REDIRECT_URI || window.location.origin
  }

  const saveToRealScout = async (propertyData: any) => {
    setIsLoading(true)
    try {
      // RealScout API integration would go here
      // This is a mock implementation
      console.log('Saving to RealScout:', propertyData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSavedProperties(prev => [...prev, propertyData.id])
      
      // Show success message
      alert(`Successfully saved ${propertyData.address} to your RealScout favorites!`)
    } catch (error) {
      console.error('Error saving to RealScout:', error)
      alert('There was an error saving to RealScout. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const openRealScoutSearch = () => {
    // Open Dr. Jan Duffy's RealScout shared search
    window.open('https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==', '_blank')
  }

  const scheduleTour = (propertyData: any) => {
    // Open Dr. Jan Duffy's RealScout shared search for tour scheduling
    window.open('https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==', '_blank')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Search with Dr. Jan Duffy's RealScout
        </h3>
        <p className="text-gray-600">
          Get instant alerts for new listings, price drops, and open houses in Summerlin West
        </p>
      </div>

      {/* RealScout Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-blue-600" />
          </div>
          <h4 className="text-lg font-semibold mb-2">Smart Search</h4>
          <p className="text-gray-600 text-sm">
            Advanced filters beyond basic MLS searches for Summerlin West properties
          </p>
        </div>
        
        <div className="text-center">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <h4 className="text-lg font-semibold mb-2">Instant Alerts</h4>
          <p className="text-gray-600 text-sm">
            Get notified the moment homes hit the market in your preferred neighborhoods
          </p>
        </div>
        
        <div className="text-center">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-blue-600" />
          </div>
          <h4 className="text-lg font-semibold mb-2">Save & Track</h4>
          <p className="text-gray-600 text-sm">
            Monitor price changes and market activity for your favorite properties
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <button
          onClick={openRealScoutSearch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center"
        >
          <Search className="h-5 w-5 mr-2" />
          Start Your RealScout Search
        </button>
        
        <button
          onClick={() => scheduleTour({ id: propertyId, address, price, neighborhood })}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center"
        >
          <Calendar className="h-5 w-5 mr-2" />
          Schedule a Tour
        </button>
      </div>

      {/* Contact Dr. Jan Duffy */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-4">Work with Dr. Jan Duffy</h4>
          <div className="flex items-center justify-center mb-4">
            <Star className="h-5 w-5 text-yellow-400 mr-1" />
            <Star className="h-5 w-5 text-yellow-400 mr-1" />
            <Star className="h-5 w-5 text-yellow-400 mr-1" />
            <Star className="h-5 w-5 text-yellow-400 mr-1" />
            <Star className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-600">5-Star Reviews</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              <Phone className="h-4 w-4 mr-2" />
              Call Dr. Jan Duffy
            </button>
            <button className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              <Mail className="h-4 w-4 mr-2" />
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Summerlin West Expertise */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h5 className="font-semibold text-blue-900 mb-2">Dr. Jan Duffy's Summerlin West Expertise</h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Specializing in luxury homes in The Ridges & Red Rock Country Club</li>
          <li>• Expert in family homes in Summerlin Centre & Mesa Ridge</li>
          <li>• Active adult community specialist (Sun City Summerlin)</li>
          <li>• Proven track record with 100+ Summerlin West sales</li>
        </ul>
      </div>
    </div>
  )
}

export default RealScoutIntegration
