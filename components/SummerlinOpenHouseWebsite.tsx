'use client'

import React, { useState, useEffect } from 'react'
import OptimizedImage from './OptimizedImage'
import { MapPin, Calendar, Home, Star, Phone, Mail, Search, Heart, Award } from 'lucide-react'
import RealScoutWidget from './RealScoutWidget'
import ReactHookForm from './ReactHookForm'
import ContactForm from './ContactForm'
import InteractiveMap from './InteractiveMap'
import QRCodeGenerator from './QRCodeGenerator'
import OfflineCapability from './OfflineCapability'
import DigitalSignIn from './DigitalSignIn'
import ExitIntentPopup from './ExitIntentPopup'

const SummerlinOpenHouseWebsite = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all')
  const [favorites, setFavorites] = useState<number[]>([])
  const [showMap, setShowMap] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [hasShownExitPopup, setHasShownExitPopup] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState(875000)
  const [downPayment, setDownPayment] = useState(20)
  const [interestRate, setInterestRate] = useState(7.0)

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

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitPopup) {
        setShowExitPopup(true)
        setHasShownExitPopup(true)
      }
    }

    const handleBeforeUnload = () => {
      if (!hasShownExitPopup) {
        setShowExitPopup(true)
        setHasShownExitPopup(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasShownExitPopup])

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
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             {/* Left Column - Content */}
             <div className="text-left">
               <div className="flex items-center mb-6">
                 <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                   <Home className="h-8 w-8 text-white" />
                 </div>
                 <div>
                   <p className="text-blue-200 text-sm font-medium">DR. JAN DUFFY</p>
                   <p className="text-white text-lg font-semibold">Your Local Research-Driven Expert</p>
                 </div>
               </div>
               
               <h2 className="text-5xl font-bold mb-6 leading-tight">
                 Your Local Research-Driven Expert for Summerlin & Las Vegas Open Houses
               </h2>
               <p className="text-xl mb-8 text-blue-100">
                 Get instant access to this weekend's premium open houses with personalized alerts and market insights
               </p>
               
               {/* Trust Indicators */}
               <div className="flex items-center space-x-6 mb-8">
                 <div className="flex items-center">
                   <Star className="h-5 w-5 text-yellow-400 mr-2" />
                   <span className="text-sm">98% of listings sell in 14 days</span>
                 </div>
                 <div className="flex items-center">
                   <Award className="h-5 w-5 text-yellow-400 mr-2" />
                   <span className="text-sm">Certified Luxury Specialist</span>
                 </div>
               </div>
               
               {/* Primary CTA */}
               <button 
                 onClick={() => window.open('https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==', '_blank')}
                 className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-bold text-lg mr-4 mb-4 lg:mb-0"
               >
                 Get a Custom Open House Alert
               </button>
             </div>
             
             {/* Right Column - Search Bar */}
             <div className="bg-white rounded-lg p-6 shadow-xl">
               <h3 className="text-gray-900 text-xl font-bold mb-4">Find Your Perfect Home</h3>
            
                           <div className="space-y-4">
                 <div className="flex-1">
                   <div className="relative">
                     <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                     <input
                       type="text"
                       placeholder="Search by address or neighborhood..."
                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900"
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                     />
                   </div>
                 </div>
                 <select 
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900"
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
                   className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium"
                 >
                   Find Open Houses
                 </button>
                 
                 {/* Quick Stats */}
                 <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                   <div className="text-center">
                     <div className="text-2xl font-bold text-blue-600">{filteredHouses.length}</div>
                     <div className="text-xs text-gray-600">Open Houses</div>
                   </div>
                   <div className="text-center">
                     <div className="text-2xl font-bold text-blue-600">14</div>
                     <div className="text-xs text-gray-600">Avg Days</div>
                   </div>
                   <div className="text-center">
                     <div className="text-2xl font-bold text-blue-600">98%</div>
                     <div className="text-xs text-gray-600">Success Rate</div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

             {/* Dynamic Market Insights Widget */}
       <section className="bg-gray-50 py-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white rounded-lg shadow-lg p-6">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <div className="text-center">
                 <div className="text-3xl font-bold text-blue-600 mb-2">$875K</div>
                 <div className="text-sm text-gray-600">Median Price</div>
                 <div className="text-xs text-green-600 mt-1">↑ 5.2% vs last month</div>
               </div>
               <div className="text-center">
                 <div className="text-3xl font-bold text-blue-600 mb-2">14</div>
                 <div className="text-sm text-gray-600">Avg Days on Market</div>
                 <div className="text-xs text-green-600 mt-1">↓ 3 days vs last month</div>
               </div>
               <div className="text-center">
                 <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
                 <div className="text-sm text-gray-600">Active Listings</div>
                 <div className="text-xs text-orange-600 mt-1">↔ Stable inventory</div>
               </div>
               <div className="text-center">
                 <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                 <div className="text-sm text-gray-600">List to Sale Ratio</div>
                 <div className="text-xs text-green-600 mt-1">↑ 2% vs last month</div>
               </div>
             </div>
             <div className="mt-6 text-center">
               <button 
                 onClick={() => setShowContactForm(true)}
                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
               >
                 Get Full 2025 Market Report
               </button>
             </div>
           </div>
         </div>
       </section>

       {/* Featured Open Houses */}
       <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-12">
             <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
               <Calendar className="h-4 w-4 mr-2" />
               This Weekend Only - Don't Miss Out!
             </div>
             <h3 className="text-3xl font-bold text-gray-900 mb-4">
               This Weekend's Featured Open Houses
             </h3>
             <p className="text-lg text-gray-600 mb-6">
               {filteredHouses.length} premium open houses available in Summerlin West
             </p>
             <div className="flex justify-center space-x-4">
               <button 
                 onClick={() => window.open('https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==', '_blank')}
                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
               >
                 View All Listings
               </button>
               <button 
                 onClick={() => setShowContactForm(true)}
                 className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium"
               >
                 Get Priority Access
               </button>
             </div>
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
                    <OptimizedImage
                      src={house.image}
                      alt={house.address}
                      className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                      priority={false}
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
                   <div className="absolute top-3 left-3">
                     <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
                       New This Weekend!
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
                       Schedule Tour
                     </button>
                     <button 
                       onClick={() => window.open(`https://maps.google.com/?q=${house.address}`, '_blank')}
                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm font-medium"
                     >
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
                  <OptimizedImage
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

      {/* Buyer Tools Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Trusted by 12,847 Home Buyers
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Smart Buyer Tools</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Make confident decisions with our comprehensive buyer toolkit</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mortgage Calculator */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                <h3 className="text-white font-bold text-lg flex items-center">
                  <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Mortgage Calculator
                </h3>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 block mb-2">Home Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Down Payment</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full pr-8 pl-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                      <span className="absolute right-3 top-3 text-gray-500">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Interest Rate</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={interestRate}
                        step="0.1"
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full pr-8 pl-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                      <span className="absolute right-3 top-3 text-gray-500">%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">Estimated Monthly Payment</div>
                  <div className="text-3xl font-bold text-green-600">${(() => {
                    const principal = selectedPrice - selectedPrice * downPayment / 100
                    const monthlyRate = interestRate / 100 / 12
                    const payments = 30 * 12
                    const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1)
                    return isFinite(monthly) ? monthly.toFixed(0) : '0'
                  })()}</div>
                  <div className="text-xs text-gray-500 mt-2">*Excludes taxes, insurance, and HOA</div>
                </div>
                <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors">Get Pre-Approved Today</button>
              </div>
            </div>

            {/* School Finder */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                <h3 className="text-white font-bold text-lg flex items-center">
                  <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                Top Rated Schools
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {[{ name: 'Palo Verde High School', rating: 9, distance: '0.8 mi', type: 'High School' }, { name: 'West Career Technical Academy', rating: 10, distance: '1.2 mi', type: 'High School' }, { name: 'Faiss Middle School', rating: 8, distance: '0.5 mi', type: 'Middle School' }, { name: 'Estes Elementary', rating: 9, distance: '0.3 mi', type: 'Elementary' }].map((school, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{school.name}</div>
                        <div className="text-sm text-gray-600">{school.type} • {school.distance}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-2xl font-bold text-blue-600 mr-1">{school.rating}</div>
                        <div className="text-sm text-gray-500">/10</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center text-sm text-blue-800">
                    <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    All schools ranked in top 20% statewide
                  </div>
                </div>
                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors">View Full School Report</button>
              </div>
            </div>

            {/* Instant Booking */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
                <h3 className="text-white font-bold text-lg flex items-center">
                  <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule Viewings
                </h3>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4"><span className="text-2xl">🏠</span></div>
                  <h4 className="font-bold text-gray-900 mb-2">This Weekend's Open Houses</h4>
                  <p className="text-gray-600 text-sm">6 homes available for viewing</p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <div className="flex-shrink-0 w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    <div className="flex-1"><div className="text-sm font-medium">Saturday</div><div className="text-xs text-gray-600">4 homes • 10am - 4pm</div></div>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <div className="flex-shrink-0 w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    <div className="flex-1"><div className="text-sm font-medium">Sunday</div><div className="text-xs text-gray-600">2 homes • 11am - 3pm</div></div>
                  </div>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors mb-3">Book Your Viewings</button>
                <button className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium py-3 rounded-lg transition-colors">Get Virtual Tour First</button>
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center text-xs text-gray-600">
                    <svg className="h-4 w-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    247 viewings booked this week
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Start Your Home Search
              </button>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="h-5 w-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Rated 4.9/5 by 1,247 happy buyers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

             {/* Testimonial Carousel & Success Stats */}
       <section className="bg-white py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h3 className="text-3xl font-bold text-gray-900 mb-4">
               What Our Clients Say
             </h3>
             <p className="text-lg text-gray-600">
               Real stories from satisfied buyers and sellers in Summerlin West
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
             <div className="bg-gray-50 p-6 rounded-lg">
               <div className="flex items-center mb-4">
                 <Star className="h-5 w-5 text-yellow-400 mr-1" />
                 <Star className="h-5 w-5 text-yellow-400 mr-1" />
                 <Star className="h-5 w-5 text-yellow-400 mr-1" />
                 <Star className="h-5 w-5 text-yellow-400 mr-1" />
                 <Star className="h-5 w-5 text-yellow-400 mr-2" />
                 <span className="text-sm text-gray-600">Verified Buyer</span>
               </div>
               <p className="text-gray-700 mb-4">
                 "Dr. Jan found us the perfect home in The Ridges within 2 weeks. Her market knowledge is incredible!"
               </p>
               <div className="font-semibold text-gray-900">- Sarah & Mike Johnson</div>
               <div className="text-sm text-gray-600">The Ridges, $2.1M</div>
             </div>
             
             <div className="bg-gray-50 p-6 rounded-lg">
               <div className="flex items-center mb-4">
                 <Star className="h-5 w-5 text-yellow-400 mr-1" />
                 <Star className="h-5 w-5 text-yellow-400 mr-1" />
                 <Star className="h-5 w-5 text-yellow-400 mr-1" />
                 <Star className="h-5 w-5 text-yellow-400 mr-1" />
                 <Star className="h-5 w-5 text-yellow-400 mr-2" />
                 <span className="text-sm text-gray-600">Verified Seller</span>
               </div>
               <p className="text-gray-700 mb-4">
                 "Our home sold in 8 days for 5% above asking price. Dr. Jan's marketing strategy was brilliant!"
               </p>
               <div className="font-semibold text-gray-900">- David & Lisa Chen</div>
               <div className="text-sm text-gray-600">Red Rock Country Club, $1.8M</div>
             </div>
             
             <div className="bg-gray-50 p-6 rounded-lg">
               <div className="flex items-center mb-4">
                 <Star className="h-5 w-5 text-yellow-400 mr-1" />
                 <Star className="h-5 w-5 text-yellow-400 mr-1" />
                 <Star className="h-5 w-5 text-yellow-400 mr-1" />
                 <Star className="h-5 w-5 text-yellow-400 mr-1" />
                 <Star className="h-5 w-5 text-yellow-400 mr-2" />
                 <span className="text-sm text-gray-600">Verified Buyer</span>
               </div>
               <p className="text-gray-700 mb-4">
                 "The personalized open house alerts helped us find our dream home before anyone else!"
               </p>
               <div className="font-semibold text-gray-900">- Robert & Emily Davis</div>
               <div className="text-sm text-gray-600">Summerlin Centre, $650K</div>
             </div>
           </div>
           
           <div className="text-center">
             <button 
               onClick={() => setShowContactForm(true)}
               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
             >
               Start Your Success Story
             </button>
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
               
               <div className="bg-blue-900/50 rounded-lg p-4 mb-6">
                 <h4 className="text-lg font-semibold mb-2">🎯 Get Priority Access to:</h4>
                 <ul className="text-blue-100 space-y-1 text-sm">
                   <li>• New listings before they hit the market</li>
                   <li>• Exclusive open house invitations</li>
                   <li>• Personalized market reports</li>
                   <li>• VIP buyer/seller consultations</li>
                 </ul>
               </div>
              
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
                 <button 
                   onClick={() => window.open('tel:7029051222', '_self')}
                   className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
                 >
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

       {/* Exit Intent Popup */}
       <ExitIntentPopup 
         isVisible={showExitPopup}
         onClose={() => setShowExitPopup(false)}
       />
     </div>
   )
 }

export default SummerlinOpenHouseWebsite
