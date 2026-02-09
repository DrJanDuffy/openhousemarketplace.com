'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import OptimizedImage from './OptimizedImage'
import { Calendar, Home, Star, Phone, Award } from 'lucide-react'
import RealScoutWidget from './RealScoutWidget'
import RealScoutSearchCard from './RealScoutSearchCard'
import ExitIntentPopup from './ExitIntentPopup'
import FeaturedOpenHouses from './FeaturedOpenHouses'
import { GBP } from '@/config/gbp'

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
       <section className="bg-gradient-to-r from-blue-600 to-red-600 text-white py-10 sm:py-12 lg:py-16 rounded-b-3xl">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
               
               <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                 Your Local Research-Driven Expert for Summerlin & Las Vegas Open Houses
               </h2>
               <p className="text-base sm:text-xl mb-4 text-blue-100">
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
               
               {/* Primary CTA: RealScout / Search Listings */}
               <Link
                 href="/tour/mls"
                 className="inline-flex items-center justify-center min-h-[44px] bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
               >
                 Search Summerlin Listings
               </Link>
             </div>
             
              {/* Right Column - Advanced Home Search */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-gray-900 text-xl font-bold mb-4">Find Your Perfect Home</h3>
                <RealScoutSearchCard />
              </div>
           </div>
         </div>
       </section>

      {/* RealScout Live Listings – #1 lead gen, above the fold */}
      <section className="bg-gray-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Live Summerlin West Listings – Your #1 Home Search</h2>
            <p className="text-lg text-gray-600">
              Browse current properties for sale in Summerlin West with Dr. Jan Duffy&apos;s home search
            </p>
          </div>
          <RealScoutWidget
            className="bg-white rounded-lg shadow-lg p-6"
            priceMin="400000"
            priceMax="3000000"
          />
        </div>
      </section>

      {/* Market teaser */}
      <section className="bg-white py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">$875K</div>
                <div className="text-sm text-gray-600">Median Price</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">14</div>
                <div className="text-sm text-gray-600">Avg Days on Market</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-sm text-gray-600">Active Listings</div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Link href="/market-report" className="text-blue-600 font-semibold hover:underline">
                See full market report
              </Link>
              <Link href="/book-tour" className="text-blue-600 font-semibold hover:underline">
                Schedule a showing
              </Link>
            </div>
          </div>
        </div>
      </section>

       <FeaturedOpenHouses />

      {/* Neighborhood Spotlight */}
      <section className="bg-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
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
          <div className="text-center mt-6">
            <Link href="/neighborhoods" className="text-blue-600 font-semibold hover:underline">
              Explore all neighborhoods →
            </Link>
          </div>
        </div>
      </section>

      {/* Short testimonial strip */}
      <section className="bg-gray-50 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-700 italic max-w-2xl mx-auto mb-2">
            &ldquo;Dr. Jan found us the perfect home in The Ridges within 2 weeks. Her market knowledge is incredible!&rdquo; — Sarah & Mike Johnson
          </p>
          <Link href="/review-us" className="text-blue-600 font-semibold hover:underline">
            Read more reviews
          </Link>
        </div>
      </section>

      {/* Compact RealScout CTA band */}
      <section className="bg-blue-600 text-white py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Never miss your dream home</h3>
          <p className="text-blue-100 mb-4">Get instant alerts for new listings, price drops, and open houses in Summerlin West.</p>
          <Link
            href="/tour/mls"
            className="inline-flex items-center justify-center min-h-[44px] bg-white text-blue-600 hover:bg-gray-50 px-6 py-3 rounded-lg font-bold transition-colors"
          >
            Search Listings & Get Alerts
          </Link>
        </div>
      </section>

      {/* Compact contact strip */}
      <section className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-bold mb-2">Work with Dr. Jan Duffy</h3>
          <p className="text-gray-300 mb-4 max-w-xl mx-auto">
            Your trusted Summerlin West real estate expert. Summerlin West & Las Vegas · Certified Luxury Home Specialist
          </p>
          <p className="text-gray-400 text-sm mb-4">{GBP.address.street}, {GBP.address.locality}, {GBP.address.region} {GBP.address.postalCode}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${GBP.phoneE164}`} className="inline-flex items-center justify-center min-h-[44px] gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg font-medium">
              <Phone className="h-4 w-4" aria-hidden />
              Call {GBP.phone}
            </a>
            <Link href="/book-tour" className="inline-flex items-center justify-center min-h-[44px] gap-2 bg-[#0069ff] hover:bg-[#0052cc] px-5 py-2.5 rounded-lg font-medium text-white">
              <Calendar className="h-4 w-4" aria-hidden />
              Schedule a showing
            </Link>
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
