'use client'

import React, { useState } from 'react'
import { MapPin, Home, Star, Users, Award, Calendar, Search, Heart, Phone } from 'lucide-react'
import RealScoutIntegration from './RealScoutIntegration'

interface NeighborhoodPageProps {
  neighborhood: string
  description: string
  priceRange: string
  highlights: string[]
  image: string
  zipCodes: string[]
  schools: string[]
  amenities: string[]
  openHouses: any[]
}

const NeighborhoodPage: React.FC<NeighborhoodPageProps> = ({
  neighborhood,
  description,
  priceRange,
  highlights,
  image,
  zipCodes,
  schools,
  amenities,
  openHouses
}) => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'schools', label: 'Schools', icon: Award },
    { id: 'amenities', label: 'Amenities', icon: MapPin },
    { id: 'openhouses', label: 'Open Houses', icon: Calendar }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96">
        <img 
          src={image} 
          alt={neighborhood}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-5xl font-bold mb-4">{neighborhood}</h1>
            <p className="text-xl mb-6 max-w-2xl">{description}</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Summerlin West, Las Vegas</span>
              </div>
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                <span>{priceRange}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === 'overview' && (
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">About {neighborhood}</h2>
                  <p className="text-lg text-gray-600 mb-8">{description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                      <ul className="space-y-2">
                        {highlights.map(highlight => (
                          <li key={highlight} className="flex items-center">
                            <Star className="h-4 w-4 text-blue-500 mr-2" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price Range:</span>
                          <span className="font-semibold">{priceRange}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Zip Codes:</span>
                          <span className="font-semibold">{zipCodes.join(', ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Schools:</span>
                          <span className="font-semibold">{schools.length} nearby</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amenities:</span>
                          <span className="font-semibold">{amenities.length} within 1 mile</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Why Choose {neighborhood}?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <Award className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                        <div>
                          <h4 className="font-semibold">Top-Rated Schools</h4>
                          <p className="text-sm text-gray-600">Excellent CCSD schools serving the area</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                        <div>
                          <h4 className="font-semibold">Prime Location</h4>
                          <p className="text-sm text-gray-600">Convenient access to shopping, dining, and recreation</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Users className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                        <div>
                          <h4 className="font-semibold">Community Feel</h4>
                          <p className="text-sm text-gray-600">Friendly neighbors and active community events</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Home className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                        <div>
                          <h4 className="font-semibold">Quality Homes</h4>
                          <p className="text-sm text-gray-600">Well-maintained properties with modern amenities</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'schools' && (
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Schools in {neighborhood}</h2>
                  <div className="space-y-6">
                    {schools.map((school, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold">{school}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-sm text-gray-600">4.5/5</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">Clark County School District</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>0.8 miles from {neighborhood}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'amenities' && (
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Amenities Near {neighborhood}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                        <MapPin className="h-5 w-5 text-blue-500 mr-3" />
                        <div>
                          <h3 className="font-semibold">{amenity}</h3>
                          <p className="text-sm text-gray-600">0.5 miles away</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'openhouses' && (
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Open Houses in {neighborhood}</h2>
                  {openHouses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {openHouses.map(house => (
                        <div key={house.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <img 
                            src={house.image} 
                            alt={house.address}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="font-bold text-lg mb-2">{house.price}</h3>
                            <p className="text-gray-700 mb-2">{house.address}</p>
                            <div className="flex justify-between text-sm text-gray-600 mb-3">
                              <span>{house.beds} beds</span>
                              <span>{house.baths} baths</span>
                              <span>{house.sqft} sqft</span>
                            </div>
                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium mb-3">
                              {house.openHouseTime}
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
                              Save to RealScout
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Open Houses This Weekend</h3>
                      <p className="text-gray-600">Check back next week or contact Dr. Jan Duffy for private showings.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <RealScoutIntegration 
                  neighborhood={neighborhood}
                />
                
                {/* Market Stats */}
                <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{neighborhood} Market Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Median Price:</span>
                      <span className="font-semibold">$850,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Days on Market:</span>
                      <span className="font-semibold">45 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Listings:</span>
                      <span className="font-semibold">12 homes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per Sq Ft:</span>
                      <span className="font-semibold">$285</span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Dr. Jan Duffy</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-blue-500 mr-2" />
                      <span>(702) 555-0123</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-blue-500 mr-2" />
                      <span>Summerlin West Specialist</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-blue-500 mr-2" />
                      <span>5-Star Reviews</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium mt-4">
                    Schedule a Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NeighborhoodPage
