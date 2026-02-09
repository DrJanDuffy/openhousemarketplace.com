'use client'

import React, { useState } from 'react'
import { MapPin, Home, Clock, ChartBar, School, Leaf, Car } from 'lucide-react'
import RealScoutWidget from './RealScoutWidget'
import CalendlyInlineWidget from './CalendlyInlineWidget'

interface MarketStats {
  medianPrice: string
  daysOnMarket: number
  activeListings: number
  pricePerSqFt: string
  monthlyChange: string
}

interface SchoolInfo {
  name: string
  rating: number
  type: string
  distance: string
}

interface Amenity {
  name: string
  type: string
  distance: string
}

interface HyperLocalNeighborhoodPageProps {
  name: string
  description: string
  marketStats: MarketStats
  schools: SchoolInfo[]
  amenities: Amenity[]
  imageUrl: string
  realscoutUrl: string
  className?: string
}

const HyperLocalNeighborhoodPage: React.FC<HyperLocalNeighborhoodPageProps> = ({
  name,
  description,
  marketStats,
  schools,
  amenities,
  imageUrl,
  realscoutUrl,
  className = ""
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'market' | 'schools' | 'amenities'>('overview')

  const handleRealScoutClick = () => {
    window.open(realscoutUrl, '_blank')
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Hero Section */}
      <section 
        className={`relative h-[60vh] min-h-[400px] bg-cover bg-center`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{name}</h1>
            <p className="text-xl text-gray-200 mb-8">{description}</p>
            <button
              onClick={handleRealScoutClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              View Available Homes
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('market')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'market' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
            >
              Market Stats
            </button>
            <button
              onClick={() => setActiveTab('schools')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'schools' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
            >
              Schools
            </button>
            <button
              onClick={() => setActiveTab('amenities')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'amenities' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
            >
              Amenities
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About {name}</h2>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Current Market Snapshot</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{marketStats.medianPrice}</div>
                      <div className="text-sm text-gray-600">Median Price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{marketStats.daysOnMarket}</div>
                      <div className="text-sm text-gray-600">Days on Market</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{marketStats.activeListings}</div>
                      <div className="text-sm text-gray-600">Active Listings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{marketStats.pricePerSqFt}</div>
                      <div className="text-sm text-gray-600">Price/Sq.Ft</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <RealScoutWidget 
                    agentEncodedId="QWdlbnQtMjI1MDUw"
                    sortOrder="STATUS_AND_SIGNIFICANT_CHANGE"
                    listingStatus="For Sale"
                    propertyTypes="SFR,MF,TC"
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {activeTab === 'market' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Analysis</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Median Home Price</div>
                      <div className="text-xl font-bold text-gray-900">{marketStats.medianPrice}</div>
                    </div>
                    <div className="text-sm text-green-600">
                      {marketStats.monthlyChange} from last month
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Average Days on Market</div>
                      <div className="text-xl font-bold text-gray-900">{marketStats.daysOnMarket} days</div>
                    </div>
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Active Listings</div>
                      <div className="text-xl font-bold text-gray-900">{marketStats.activeListings}</div>
                    </div>
                    <Home className="h-6 w-6 text-blue-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Price per Square Foot</div>
                      <div className="text-xl font-bold text-gray-900">{marketStats.pricePerSqFt}</div>
                    </div>
                    <ChartBar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schools' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Local Schools</h2>
                <div className="space-y-4">
                  {schools.map((school, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <School className="h-6 w-6 text-blue-600 mt-1 mr-4" />
                      <div>
                        <div className="font-medium text-gray-900">{school.name}</div>
                        <div className="text-sm text-gray-600">{school.type}</div>
                        <div className="text-sm text-gray-600">Rating: {school.rating}/10</div>
                        <div className="text-sm text-gray-600">{school.distance}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Local Amenities</h2>
                <div className="space-y-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      {amenity.type === 'park' ? (
                        <Leaf className="h-6 w-6 text-green-600 mt-1 mr-4" />
                      ) : (
                        <MapPin className="h-6 w-6 text-blue-600 mt-1 mr-4" />
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{amenity.name}</div>
                        <div className="text-sm text-gray-600">{amenity.type}</div>
                        <div className="text-sm text-gray-600">{amenity.distance}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Schedule a private showing */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Schedule a private showing</h3>
              <p className="text-gray-600 text-sm mb-4">Book a private showing with Dr. Jan Duffy.</p>
              <CalendlyInlineWidget
                minWidth={280}
                height={600}
                className="rounded-lg overflow-hidden"
              />
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Car className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-600">15 minutes to Downtown</span>
                </div>
                <div className="flex items-center">
                  <School className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-600">Top-rated schools nearby</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-600">Multiple parks and trails</span>
                </div>
                <div className="flex items-center">
                  <Home className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-600">Gated communities available</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleRealScoutClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-lg"
            >
              View All {name} Listings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HyperLocalNeighborhoodPage
