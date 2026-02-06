'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Home, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'

const SITE_NAME = 'Open House Marketplace'
const BUSINESS = {
  name: 'Dr. Jan Duffy Real Estate',
  phone: '(702) 200-3422',
  phoneLink: 'tel:+17022003422',
  address: 'Summerlin West, Las Vegas, NV 89135',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=36.1699,-115.3301',
}

export default function Footer() {
  const [logoError, setLogoError] = useState(false)

  return (
    <footer className="bg-gray-800 text-gray-300 py-10 border-t-4 border-blue-600" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Office / Search Listings – first position on every page */}
          <div>
            <h3 className="font-semibold text-white mb-3">Office</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  href="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Search Listings
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-red-500" aria-hidden />
                <a href={BUSINESS.phoneLink} className="hover:text-white">{BUSINESS.phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-red-500 mt-0.5" aria-hidden />
                <span>{BUSINESS.address}</span>
              </li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/open-houses" className="hover:text-white transition-colors">Summerlin open houses</Link></li>
            </ul>
          </div>

          {/* Neighborhoods */}
          <div>
            <h3 className="font-semibold text-white mb-3">Neighborhoods</h3>
            <ul className="text-sm space-y-1">
              <li><Link href="/neighborhoods/the-ridges" className="hover:text-white transition-colors">The Ridges</Link></li>
              <li><Link href="/neighborhoods/red-rock-country-club" className="hover:text-white transition-colors">Red Rock Country Club</Link></li>
              <li><Link href="/neighborhoods/summerlin-centre" className="hover:text-white transition-colors">Summerlin Centre</Link></li>
              <li><Link href="/neighborhoods/sun-city-summerlin" className="hover:text-white transition-colors">Sun City Summerlin</Link></li>
              <li><Link href="/neighborhoods/the-trails" className="hover:text-white transition-colors">The Trails</Link></li>
              <li><Link href="/neighborhoods/willows" className="hover:text-white transition-colors">Willows</Link></li>
              <li><Link href="/neighborhoods/mesa-ridge" className="hover:text-white transition-colors">Mesa Ridge</Link></li>
              <li><Link href="/neighborhoods/siena" className="hover:text-white transition-colors">Siena</Link></li>
              <li><Link href="/neighborhoods/regency" className="hover:text-white transition-colors">Regency</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-3">Resources</h3>
            <ul className="text-sm space-y-1">
              <li><Link href="/market-report" className="hover:text-white transition-colors">Market Reports</Link></li>
              <li><Link href="/open-house-guide" className="hover:text-white transition-colors">Open House Guide</Link></li>
              <li><Link href="/resources/home-buying-guide" className="hover:text-white transition-colors">Home Buying Guide</Link></li>
              <li><Link href="/schools" className="hover:text-white transition-colors">School Information</Link></li>
              <li><Link href="/resources/hoa-communities" className="hover:text-white transition-colors">HOA Communities</Link></li>
              <li><Link href="/resources/lifestyle-guide" className="hover:text-white transition-colors">Lifestyle Guide</Link></li>
              <li><Link href="/resources/new-construction" className="hover:text-white transition-colors">New Construction</Link></li>
              <li><Link href="/luxury-homes" className="hover:text-white transition-colors">Luxury Homes</Link></li>
              <li><Link href="/new-construction" className="hover:text-white transition-colors">New Construction Homes</Link></li>
            </ul>
          </div>

          {/* Brand + more links */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              {!logoError ? (
                <Image
                  src="/images/logo/logo.svg"
                  alt=""
                  width={170}
                  height={28}
                  className="h-10 w-auto object-contain"
                  onError={() => setLogoError(true)}
                  unoptimized
                />
              ) : (
                <Home className="h-6 w-6 text-red-500 shrink-0" aria-hidden />
              )}
              <span className="font-bold text-white">{SITE_NAME}</span>
            </Link>
            <p className="text-sm mb-3">
              Your premier destination for Summerlin West open house listings and real estate with {BUSINESS.name}.
            </p>
            <ul className="text-sm space-y-1">
              <li><Link href="/about" className="hover:text-white transition-colors">About Dr. Jan Duffy</Link></li>
              <li><Link href="/open-houses" className="hover:text-white transition-colors">Open Houses</Link></li>
              <li><Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved. | {BUSINESS.name} | Listings via MLS
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
