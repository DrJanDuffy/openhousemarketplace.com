'use client'

import Link from 'next/link'
import { Home, Phone, Menu } from 'lucide-react'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/open-houses', label: 'Open Houses' },
  { href: '/open-house-guide', label: 'Open House Guide' },
  { href: '/neighborhoods', label: 'Neighborhoods' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const PHONE = { display: '(702) 200-3422', href: 'tel:+17022003422' }

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors"
            aria-label="Open House Marketplace - Home"
          >
            <Home className="h-7 w-7 text-red-600 shrink-0" aria-hidden />
            <div>
              <span className="font-bold text-lg">Summerlin West Open Houses</span>
              <span className="hidden sm:block text-xs text-gray-500 font-normal">Dr. Jan Duffy Real Estate</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-colors"
              >
                {label}
              </Link>
            ))}
            <a
              href={PHONE.href}
              className="flex items-center gap-1.5 ml-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden />
              <span>{PHONE.display}</span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav
            className="md:hidden py-4 border-t border-gray-200"
            aria-label="Main mobile"
          >
            <ul className="space-y-1">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={PHONE.href}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  <Phone className="h-4 w-4" />
                  {PHONE.display}
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
