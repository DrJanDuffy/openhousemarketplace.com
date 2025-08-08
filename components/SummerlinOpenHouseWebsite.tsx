'use client'

import React, { useState } from 'react'
import { MapPin, Calendar, Home, Star, Phone, Mail, Search, Heart, Award } from 'lucide-react'
import RealScoutWidget from './RealScoutWidget'
import ReactHookForm from './ReactHookForm'
import ContactForm from './ContactForm'
import InteractiveMap from './InteractiveMap'
import QRCodeGenerator from './QRCodeGenerator'
import OfflineCapability from './OfflineCapability'
import DigitalSignIn from './DigitalSignIn'

const SummerlinOpenHouseWebsite = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all')
  const [favorites, setFavorites] = useState<number[]>([])
  const [showMap, setShowMap] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

  // Mock data for open houses in Summerlin West
  const openHouses = [
    {
      id: 1,
      address: "1234 Red Rock Vista Dr",
      neighborhood: "Red Rock Country Club",
      price: "$1,250,000",
      beds: 4,
      baths: 3.5,
      sqft: "3,200",
      openHouseTime: "Saturday 1-4 PM",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      features: ["Golf Course Views", "Pool", "Upgraded Kitchen"],
      zipCode: "89135",
      realtor: "Dr. Jan Duffy",
      phone: "(702) 905-1222",
      description: "Stunning golf course property with panoramic views of Red Rock Canyon",
      lat: 36.1699,
      lng: -115.1398
    },
    {
      id: 2,
      address: "5678 Ridges Summit Ct",
      neighborhood: "The Ridges",
      price: "$2,100,000",
      beds: 5,
      baths: 4.5,
      sqft: "4,800",
      openHouseTime: "Sunday 12-3 PM",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
      features: ["Mountain Views", "Wine Cellar", "Guest Casita"],
      zipCode: "89135",
      realtor: "Dr. Jan Duffy",
      phone: "(702) 905-1222",
      description: "Luxury custom home with breathtaking mountain and city views",
      lat: 36.1750,
      lng: -115.1450
    },
    {
      id: 3,
      address: "9101 Summerlin Pkwy",
      neighborhood: "Summerlin Centre",
      price: "$650,000",
      beds: 3,
      baths: 2.5,
      sqft: "2,400",
      openHouseTime: "Saturday 10-1 PM",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
      features: ["New Construction", "Smart Home", "Energy Efficient"],
      zipCode: "89138",
      realtor: "Dr. Jan Duffy",
      phone: "(702) 905-1222",
      description: "Modern new construction with smart home features and energy efficiency",
      lat: 36.1650,
      lng: -115.1350
    },
    {
      id: 4,
      address: "2468 Desert Willow St",
      neighborhood: "Sun City Summerlin",
      price: "$485,000",
      beds: 2,
      baths: 2,
      sqft: "1,800",
      openHouseTime: "Sunday 1-4 PM",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop",
      features: ["55+ Community", "Golf Cart Garage", "Low Maintenance"],
      zipCode: "89144",
      realtor: "Dr. Jan Duffy",
      phone: "(702) 905-1222",
      description: "Perfect active adult home with golf cart garage and low maintenance lifestyle",
      lat: 36.1600,
      lng: -115.1500
    },
    {
      id: 5,
      address: "3456 Mesa Ridge Dr",
      neighborhood: "Mesa Ridge",
      price: "$875,000",
      beds: 4,
      baths: 3,
      sqft: "3,100",
      openHouseTime: "Saturday 2-5 PM",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop",
      features: ["Family Home", "Large Backyard", "Great Schools"],
      zipCode: "89138",
      realtor: "Dr. Jan Duffy",
      phone: "(702) 905-1222",
      description: "Family-friendly home in excellent school district with large backyard",
      lat: 36.1700,
      lng: -115.1300
    },
    {
      id: 6,
      address: "7890 Willows Way",
      neighborhood: "Willows",
      price: "$720,000",
      beds: 3,
      baths: 2.5,
      sqft: "2,600",
      openHouseTime: "Sunday 11-2 PM",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
      features: ["Mature Trees", "Established Neighborhood", "Walkable"],
      zipCode: "89135",
      realtor: "Dr. Jan Duffy",
      phone: "(702) 905-1222",
      description: "Charming home in established neighborhood with mature landscaping",
      lat: 36.1800,
      lng: -115.1400
    }
  ]

  const neighborhoods = [
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

  const toggleFavorite = (houseId: number) => {
    setFavorites(prev => 
      prev.includes(houseId) 
        ? prev.filter(id => id !== houseId)
        : [...prev, houseId]
    )
  }

  const filteredHouses = openHouses.filter(house => {
    const matchesSearch = house.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         house.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesNeighborhood = selectedNeighborhood === 'all' || house.neighborhood === selectedNeighborhood
    return matchesSearch && matchesNeighborhood
  })

  const saveToRealScout = (_house: typeof openHouses[0]) => {
    // Open Dr. Jan Duffy's RealScout shared search
    window.open('https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==', '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-red-600 mr-2" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Summerlin West Open Houses</h1>
                <p className="text-sm text-gray-600">Las Vegas's Premier Master-Planned Community</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowMap(!showMap)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
              >
                <MapPin className="h-4 w-4 mr-2" />
                {showMap ? 'List View' : 'Map View'}
              </button>
              <button 
                onClick={() => window.open('https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==', '_blank')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Open RealScout App
              </button>
              <div className="text-right">
                <p className="font-semibold text-gray-900">Dr. Jan Duffy</p>
                <p className="text-sm text-gray-600">Your Summerlin Expert</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">
              Discover Your Dream Home in Summerlin West
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              This Weekend's Premium Open Houses in Las Vegas's Most Desirable Neighborhoods
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-4 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by address or neighborhood..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  aria-label="Select neighborhood"
                  title="Select neighborhood"
                >
                  <option value="all">All Neighborhoods</option>
                  {neighborhoods.map(neighborhood => (
                    <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                  ))}
                </select>
                <button 
                  onClick={() => window.open('https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==', '_blank')}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Find Open Houses
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Open Houses */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              This Weekend's Featured Open Houses
            </h3>
            <p className="text-lg text-gray-600">
              {filteredHouses.length} open houses available in Summerlin West
            </p>
          </div>

          {showMap ? (
            <InteractiveMap 
              properties={filteredHouses}
              className="mb-8"
              onPropertyClick={(property) => {
                // Handle property click from map
                console.log('Property clicked:', property)
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHouses.map(house => (
              <div key={house.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div 
                    onClick={() => window.open('https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==', '_blank')}
                    className="cursor-pointer"
                    title="Click to view in RealScout"
                  >
                    <img 
                      src={house.image} 
                      alt={house.address}
                      className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <button 
                    onClick={() => toggleFavorite(house.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                    aria-label={favorites.includes(house.id) ? 'Remove from favorites' : 'Add to favorites'}
                    title={favorites.includes(house.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart 
                      className={`h-5 w-5 ${favorites.includes(house.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                    />
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                      {house.openHouseTime}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg text-gray-900">{house.price}</h4>
                    <span className="text-sm text-gray-600">{house.zipCode}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-2">{house.address}</p>
                  <p className="text-sm text-blue-600 font-medium mb-3">{house.neighborhood}</p>
                  
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>{house.beds} beds</span>
                    <span>{house.baths} baths</span>
                    <span>{house.sqft} sqft</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {house.features.slice(0, 2).map(feature => (
                      <span key={feature} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                    {house.features.length > 2 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        +{house.features.length - 2} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => saveToRealScout(house)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium"
                    >
                      Save to RealScout
                    </button>
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm font-medium">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Neighborhood Spotlight */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Summerlin West Neighborhoods
            </h3>
            <p className="text-lg text-gray-600">
              Explore Las Vegas's premier master-planned community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "The Ridges",
                description: "Luxury custom homes with stunning mountain and city views",
                priceRange: "$1.5M - $5M+",
                highlights: ["Guard-gated", "Custom lots", "Mountain views"],
                image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop"
              },
              {
                name: "Red Rock Country Club",
                description: "Championship golf course living with resort-style amenities",
                priceRange: "$800K - $3M",
                highlights: ["Golf course", "Country club", "Tennis"],
                image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop"
              },
              {
                name: "Summerlin Centre",
                description: "Family-friendly community with parks and top-rated schools",
                priceRange: "$500K - $900K",
                highlights: ["Great schools", "Parks", "Family-friendly"],
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop"
              }
            ].map(neighborhood => (
              <div key={neighborhood.name} className="bg-gray-50 rounded-lg overflow-hidden">
                <div 
                  onClick={() => window.open('https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==', '_blank')}
                  className="cursor-pointer"
                  title="Click to view in RealScout"
                >
                  <img 
                    src={neighborhood.image} 
                    alt={neighborhood.name}
                    className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{neighborhood.name}</h4>
                  <p className="text-gray-600 mb-3">{neighborhood.description}</p>
                  <p className="text-blue-600 font-semibold mb-3">{neighborhood.priceRange}</p>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.highlights.map(highlight => (
                      <span key={highlight} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RealScout Widget Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Live Summerlin West Listings</h3>
            <p className="text-lg text-gray-600 mb-8">
              Browse current properties for sale in Summerlin West with Dr. Jan Duffy's RealScout platform
            </p>
          </div>
          
          <RealScoutWidget 
            className="bg-white rounded-lg shadow-lg p-6"
            priceMin="400000"
            priceMax="3000000"
          />
        </div>
      </section>

      {/* RealScout CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Never Miss Your Dream Home</h3>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get instant alerts for new listings, price drops, and open houses in Summerlin West with RealScout
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Smart Search</h4>
              <p className="text-blue-100">Advanced filters beyond basic MLS searches</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Instant Alerts</h4>
              <p className="text-blue-100">Get notified the moment homes hit the market</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Save & Track</h4>
              <p className="text-blue-100">Monitor price changes and market activity</p>
            </div>
          </div>
          
          <button 
            onClick={() => window.open('https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==', '_blank')}
            className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-bold text-lg"
          >
            Start Your RealScout Search
          </button>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Advanced Tools & Features</h3>
            <p className="text-lg text-gray-600">Professional tools for buyers, sellers, and agents</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* QR Code Generator */}
            <QRCodeGenerator 
              propertyId="summerlin-west-featured"
              propertyAddress="1234 Red Rock Vista Dr, Las Vegas, NV 89135"
              className="h-fit"
            />
            
            {/* Digital Sign-In */}
            <DigitalSignIn 
              propertyId="summerlin-west-featured"
              propertyAddress="1234 Red Rock Vista Dr, Las Vegas, NV 89135"
              openHouseTime="Saturday 1-4 PM"
              className="h-fit"
            />
            
            {/* Offline Capability */}
            <OfflineCapability />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Work with Dr. Jan Duffy</h3>
              <p className="text-lg text-gray-300 mb-6">
                Your trusted Summerlin West real estate expert with proven results in luxury and family homes.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-400 mr-3" />
                  <span>Specializing in Summerlin West & Las Vegas</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-blue-400 mr-3" />
                  <span>5-Star Client Reviews & Testimonials</span>
                </div>
                <div className="flex items-center">
                  <Home className="h-5 w-5 text-blue-400 mr-3" />
                  <span>Expert in Luxury & Family Homes</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-blue-400 mr-3" />
                  <span>Certified Luxury Home Specialist</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Today
                </button>
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-medium"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </button>
              </div>
            </div>
            
            <ReactHookForm 
              title="Get Summerlin Market Updates"
              description="Stay informed about new listings and market changes in Summerlin West"
              neighborhoods={neighborhoods}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Home className="h-6 w-6 text-red-500 mr-2" />
                <span className="font-bold text-white">Summerlin West Open Houses</span>
              </div>
              <p className="text-sm">Your premier destination for Summerlin West open house listings and real estate opportunities.</p>
            </div>
            
            <div>
              <h5 className="font-semibold text-white mb-3">Neighborhoods</h5>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:text-white">The Ridges</a></li>
                <li><a href="#" className="hover:text-white">Red Rock Country Club</a></li>
                <li><a href="#" className="hover:text-white">Summerlin Centre</a></li>
                <li><a href="#" className="hover:text-white">Sun City Summerlin</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-white mb-3">Resources</h5>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:text-white">Market Reports</a></li>
                <li><a href="#" className="hover:text-white">Home Buying Guide</a></li>
                <li><a href="#" className="hover:text-white">School Information</a></li>
                <li><a href="#" className="hover:text-white">HOA Communities</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-white mb-3">Contact</h5>
              <ul className="text-sm space-y-1">
                <li>Dr. Jan Duffy</li>
                <li>Summerlin West Expert</li>
                <li>Las Vegas, Nevada</li>
                <li className="pt-2">
                  <a 
                    href="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Open RealScout Search
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
            <p>&copy; 2025 Summerlin West Open Houses. All rights reserved. | Powered by RealScout Technology</p>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Contact Dr. Jan Duffy</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close contact form"
                title="Close contact form"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <ContactForm 
                onSuccess={() => setShowContactForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SummerlinOpenHouseWebsite
