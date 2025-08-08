'use client'

import React, { useState } from 'react'
import { Calendar, Home, Star, Phone, Mail, Search, Heart } from 'lucide-react'

const RealScoutIntegration = () => {
  const [_isLoading, _setIsLoading] = useState(false)

  const openRealScoutSearch = () => {
    // Open Dr. Jan Duffy's RealScout shared search
    window.open('https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==', '_blank')
  }

  const scheduleTour = () => {
    // Open Dr. Jan Duffy's RealScout shared search
    window.open('https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==', '_blank')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <Home className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Find Your Dream Home</h3>
        <p className="text-gray-600">Search with Dr. Jan Duffy's RealScout platform</p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center">
          <Search className="h-5 w-5 text-blue-600 mr-3" />
          <span className="text-gray-700">Advanced search filters</span>
        </div>
        <div className="flex items-center">
          <Heart className="h-5 w-5 text-blue-600 mr-3" />
          <span className="text-gray-700">Save favorite properties</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-blue-600 mr-3" />
          <span className="text-gray-700">Schedule private tours</span>
        </div>
        <div className="flex items-center">
          <Star className="h-5 w-5 text-blue-600 mr-3" />
          <span className="text-gray-700">Get market insights</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={openRealScoutSearch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center"
        >
          <Search className="h-4 w-4 mr-2" />
          Start Your Search
        </button>
        
        <button
          onClick={scheduleTour}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium flex items-center justify-center"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Schedule a Tour
        </button>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-1" />
            <span>(702) 905-1222</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-1" />
            <span>jan@summerlinexpert.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RealScoutIntegration
