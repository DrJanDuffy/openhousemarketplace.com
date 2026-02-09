'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import OptimizedImage from './OptimizedImage'
import { MapPin, Calendar, Home, Star, Phone, Mail, Search, Heart, Award } from 'lucide-react'
import RealScoutWidget from './RealScoutWidget'
import CalendlyPopupLink from './CalendlyPopupLink'
import CalendlyInlineWidget from './CalendlyInlineWidget'
// Removed tool imports no longer used in buyer-focused UI
import BuyerToolsSection from './BuyerToolsSection'
import RealScoutSearchCard from './RealScoutSearchCard'
import ExitIntentPopup from './ExitIntentPopup'
import FeaturedOpenHouses from './FeaturedOpenHouses'

const SummerlinOpenHouseWebsite = () => {
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [hasShownExitPopup, setHasShownExitPopup] = useState(false)
  const [isPageReady, setIsPageReady] = useState(false)
  // Buyer tools moved into BuyerToolsSection

  // Delay page ready state to ensure Google Analytics loads first
  useEffect(() => {
    // Wait 15 seconds before allowing exit intent popup to show
    // This gives Google Analytics time to load and be detected
    const timer = setTimeout(() => {
      setIsPageReady(true)
    }, 15000) // 15 seconds delay

    return () => clearTimeout(timer)
  }, [])

  // Exit intent detection - only after page is ready
  useEffect(() => {
    if (!isPageReady) return // Don't show popup until page is ready

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
  }, [hasShownExitPopup, isPageReady])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
       <section className="bg-gradient-to-r from-blue-600 to-red-600 text-white py-16 rounded-b-3xl">
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
               <p className="text-xl mb-4 text-blue-100">
                 Get instant access to this weekend&apos;s premium open houses with personalized alerts and market insights
               </p>
               <p className="text-base mb-8 text-blue-100">
                 <Link href="/open-houses" className="text-white font-semibold underline hover:no-underline">Browse all Summerlin open houses</Link> this weekend
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
                 className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg mr-4 mb-4 lg:mb-0 shadow-lg hover:shadow-xl transition-all duration-200"
               >
                 Get a Custom Open House Alert
               </button>
             </div>
             
              {/* Right Column - Advanced Home Search */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-gray-900 text-xl font-bold mb-4">Find Your Perfect Home</h3>
                <RealScoutSearchCard />
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
               <CalendlyPopupLink className="inline-block bg-[#0069ff] hover:bg-[#0052cc] text-white px-6 py-2 rounded-lg font-medium">
                 Schedule a private showing
               </CalendlyPopupLink>
             </div>
           </div>
         </div>
       </section>

       <FeaturedOpenHouses />

      {/* Neighborhood Spotlight */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Summerlin West Neighborhoods
            </h2>
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
            ].map(neighborhood => {
              const neighborhoodUrls: Record<string, string> = {
                'The Ridges': '/neighborhoods/the-ridges',
                'Red Rock Country Club': '/neighborhoods/red-rock-country-club',
                'Summerlin Centre': '/neighborhoods/summerlin-centre',
              }
              const neighborhoodUrl = neighborhoodUrls[neighborhood.name] || '#'
              
              return (
                <div key={neighborhood.name} className="bg-gray-50 rounded-lg overflow-hidden">
                  <Link href={neighborhoodUrl}>
                    <OptimizedImage
                      src={neighborhood.image}
                      alt={neighborhood.name}
                      className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                    />
                  </Link>
                  <div className="p-6">
                    <Link href={neighborhoodUrl}>
                      <h4 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600">{neighborhood.name}</h4>
                    </Link>
                    <p className="text-gray-600 mb-3">{neighborhood.description}</p>
                    <p className="text-blue-600 font-semibold mb-3">{neighborhood.priceRange}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {neighborhood.highlights.map(highlight => (
                        <span key={highlight} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href={neighborhoodUrl}
                      className="inline-block text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Explore {neighborhood.name} →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* RealScout Widget Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Summerlin West Listings</h2>
            <p className="text-lg text-gray-600 mb-8">
              Browse current properties for sale in Summerlin West with Dr. Jan Duffy's home search
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
            Get instant alerts for new listings, price drops, and open houses in Summerlin West
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
            Start Your Home Search
          </button>
        </div>
      </section>

      <BuyerToolsSection />

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
             <CalendlyPopupLink className="inline-block bg-[#0069ff] hover:bg-[#0052cc] text-white px-8 py-3 rounded-lg font-medium">
               Schedule a private showing
             </CalendlyPopupLink>
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
                   onClick={() => window.open('tel:7022003422', '_self')}
                   className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
                 >
                   <Phone className="h-4 w-4 mr-2" />
                   Call Today
                 </button>
                <CalendlyPopupLink className="flex items-center justify-center bg-[#0069ff] hover:bg-[#0052cc] px-6 py-3 rounded-lg font-medium text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  Schedule a private showing
                </CalendlyPopupLink>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-white mb-4">Schedule a private showing</h3>
              <p className="text-blue-100 mb-4">Book a time that works for you with Dr. Jan Duffy.</p>
              <CalendlyInlineWidget
                minWidth={320}
                height={700}
                className="rounded-xl overflow-hidden bg-white"
              />
            </div>
          </div>
        </div>
      </section>

       {/* Exit Intent Popup */}
       <ExitIntentPopup
         isVisible={showExitPopup}
         onClose={() => setShowExitPopup(false)}
       />

     </div>
   )
 }

export default SummerlinOpenHouseWebsite
