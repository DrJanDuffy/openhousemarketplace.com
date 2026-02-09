'use client'

import React from 'react'
import { User, Clock, Calendar } from 'lucide-react'
import CalendlyInlineWidget from './CalendlyInlineWidget'
import CalendlyPopupLink from './CalendlyPopupLink'

interface DigitalSignInProps {
  propertyId?: string
  propertyAddress?: string
  openHouseTime?: string
  className?: string
}

const DigitalSignIn: React.FC<DigitalSignInProps> = ({
  propertyAddress = 'Summerlin West Property',
  openHouseTime = 'Saturday 1-4 PM',
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="text-center mb-6">
        <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Schedule a private showing</h3>
        <p className="text-gray-600">Welcome to {propertyAddress}</p>
        <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          {openHouseTime}
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 text-center">
        Book a time with Dr. Jan Duffy for a personalized tour or consultation.
      </p>

      <CalendlyPopupLink className="w-full flex items-center justify-center bg-[#0069ff] hover:bg-[#0052cc] text-white px-6 py-3 rounded-lg font-medium mb-6">
        <Calendar className="h-4 w-4 mr-2" />
        Schedule a private showing
      </CalendlyPopupLink>

      <CalendlyInlineWidget
        minWidth={280}
        height={500}
        className="rounded-lg overflow-hidden"
      />
    </div>
  )
}

export default DigitalSignIn
