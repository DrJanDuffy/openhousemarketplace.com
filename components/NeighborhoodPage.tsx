'use client'

import React, { useState } from 'react'
import { MapPin, Calendar, Home, Star, Phone, Mail, Clock, Award } from 'lucide-react'
import RealScoutIntegration from './RealScoutIntegration'

interface NeighborhoodPageProps {
  neighborhood: {
    name: string
    description: string
    priceRange: string
    highlights: string[]
    image: string
    zipCode: string
  }
}

const NeighborhoodPage: React.FC<NeighborhoodPageProps> = ({ neighborhood }) => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'schools', label: 'Schools', icon: Star },
    { id: 'amenities', label: 'Amenities', icon: MapPin },
    { id: 'openHouses', label: 'Open Houses', icon: Calendar }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-red-600">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{neighborhood.name}</h1>
            <p className="text-xl mb-6 max-w-2xl mx-auto">{neighborhood.description}</p>
            <div className="flex justify-center space-x-4">
              <span className="bg-white/20 px-4 py-2 rounded-lg">{neighborhood.priceRange}</span>
              <span className="bg-white/20 px-4 py-2 rounded-lg">{neighborhood.zipCode}</span>
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
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Neighborhood Overview</h2>
                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-600 mb-6">
                      {neighborhood.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {neighborhood.highlights.map(highlight => (
                        <div key={highlight} className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-2">{highlight}</h3>
                          <p className="text-gray-600">Learn more about this feature in {neighborhood.name}.</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'schools' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Schools in {neighborhood.name}</h2>
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Elementary Schools</h3>
                      <p className="text-gray-600">Information about local elementary schools and ratings.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Middle Schools</h3>
                      <p className="text-gray-600">Information about local middle schools and ratings.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">High Schools</h3>
                      <p className="text-gray-600">Information about local high schools and ratings.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'amenities' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Amenities Near {neighborhood.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Shopping & Dining</h3>
                      <p className="text-gray-600">Local shopping centers, restaurants, and entertainment options.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Parks & Recreation</h3>
                      <p className="text-gray-600">Parks, trails, and recreational facilities in the area.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Healthcare</h3>
                      <p className="text-gray-600">Medical facilities, hospitals, and healthcare providers.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Transportation</h3>
                      <p className="text-gray-600">Public transportation, major roads, and accessibility.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'openHouses' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Open Houses in {neighborhood.name}</h2>
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">This Weekend's Open Houses</h3>
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-gray-600 mb-4">Discover current open houses in {neighborhood.name}.</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                        View All Open Houses
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <RealScoutIntegration />
                
                <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Dr. Jan Duffy</h3>
                  <div className="space-y-4">
                                         <div className="flex items-center">
                       <Phone className="h-4 w-4 text-blue-600 mr-3" />
                       <a 
                         href="tel:7029051222" 
                         className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                         title="Call (702) 905-1222"
                       >
                         (702) 905-1222
                       </a>
                     </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-blue-600 mr-3" />
                      <span className="text-gray-600">jan@summerlinexpert.com</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-blue-600 mr-3" />
                      <span className="text-gray-600">Certified Luxury Specialist</span>
                    </div>
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium mt-4">
                    Schedule a Tour
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
