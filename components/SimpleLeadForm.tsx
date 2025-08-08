'use client'

import React from 'react'
import { Mail, Phone, User, MapPin } from 'lucide-react'

interface SimpleLeadFormProps {
  className?: string
  title?: string
  description?: string
  neighborhoods?: string[]
}

const SimpleLeadForm: React.FC<SimpleLeadFormProps> = ({
  className = "",
  title = "Get Summerlin Market Updates",
  description = "Stay informed about new listings and market changes in Summerlin West",
  neighborhoods = [
    "The Ridges",
    "Red Rock Country Club", 
    "Summerlin Centre",
    "Sun City Summerlin",
    "The Trails",
    "Willows",
    "Mesa Ridge",
    "Siena",
    "Regency"
  ]
}) => {
  return (
    <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
      <h4 className="text-xl font-bold mb-4 text-white">{title}</h4>
      <p className="text-gray-300 mb-6">{description}</p>
      
      <form 
        name="summerlin-leads" 
        method="POST" 
        data-netlify="true"
        className="space-y-4"
      >
        <input type="hidden" name="form-name" value="summerlin-leads" />
        
        <div>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        
        <div>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (optional)"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        
        <div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select 
              name="neighborhood" 
              required 
              aria-label="Select interested neighborhood"
              title="Select interested neighborhood"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(neighborhood => (
                <option key={neighborhood} value={neighborhood}>
                  {neighborhood}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <button 
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center"
        >
          Get Market Updates
        </button>
      </form>
    </div>
  )
}

export default SimpleLeadForm
