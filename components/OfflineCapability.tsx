'use client'

import React, { useState, useEffect } from 'react'
import { Wifi, WifiOff, Download, Database, Smartphone } from 'lucide-react'

const OfflineCapability: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true)
  const [isServiceWorkerSupported, setIsServiceWorkerSupported] = useState(false)
  const [isServiceWorkerRegistered, setIsServiceWorkerRegistered] = useState(false)
  const [cachedData, setCachedData] = useState<any[]>([])
  const [isInstalling, setIsInstalling] = useState(false)

  useEffect(() => {
    // Check if service worker is supported
    setIsServiceWorkerSupported('serviceWorker' in navigator)

    // Check online/offline status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    setIsOnline(navigator.onLine)

    // Check if service worker is already registered
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        setIsServiceWorkerRegistered(registrations.length > 0)
      })
    }

    // Load cached data from localStorage
    loadCachedData()

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const loadCachedData = () => {
    try {
      const cached = localStorage.getItem('summerlin_offline_data')
      if (cached) {
        setCachedData(JSON.parse(cached) as any[])
      }
    } catch (error) {
      console.error('Error loading cached data:', error)
    }
  }

  const registerServiceWorker = async () => {
    if (!('serviceWorker' in navigator)) {
      alert('Service Worker is not supported in this browser')
      return
    }

    setIsInstalling(true)
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service Worker registered:', registration)
      setIsServiceWorkerRegistered(true)
      
      // Cache essential data for offline use
      await cacheEssentialData()
      
    } catch (error) {
      console.error('Service Worker registration failed:', error)
      alert('Failed to install offline capability')
    } finally {
      setIsInstalling(false)
    }
  }

  const cacheEssentialData = async () => {
    try {
      // Cache property data
      const properties = [
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
          lat: 36.1750,
          lng: -115.1450
        }
      ]

      // Cache neighborhood data
      const neighborhoods = [
        {
          name: "The Ridges",
          description: "Luxury custom homes with stunning mountain and city views",
          priceRange: "$1.5M - $5M+",
          highlights: ["Guard-gated", "Custom lots", "Mountain views"]
        },
        {
          name: "Red Rock Country Club",
          description: "Championship golf course living with resort-style amenities",
          priceRange: "$800K - $3M",
          highlights: ["Golf course", "Country club", "Tennis"]
        }
      ]

      const offlineData = {
        properties,
        neighborhoods,
        lastUpdated: new Date().toISOString(),
        version: '1.0.0'
      }

      localStorage.setItem('summerlin_offline_data', JSON.stringify(offlineData))
      setCachedData([...properties, ...neighborhoods])

      console.log('Essential data cached for offline use')
    } catch (error) {
      console.error('Error caching data:', error)
    }
  }

  const clearCache = () => {
    try {
      localStorage.removeItem('summerlin_offline_data')
      setCachedData([])
      
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => registration.unregister())
        })
      }
      
      setIsServiceWorkerRegistered(false)
      console.log('Cache cleared')
    } catch (error) {
      console.error('Error clearing cache:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          {isOnline ? (
            <Wifi className="h-12 w-12 text-green-600" />
          ) : (
            <WifiOff className="h-12 w-12 text-red-600" />
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Offline Capability</h3>
        <p className="text-gray-600">
          {isOnline ? 'You are currently online' : 'You are currently offline'}
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Database className="h-5 w-5 text-blue-600 mr-3" />
            <span className="text-gray-700">Service Worker</span>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            isServiceWorkerRegistered ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {isServiceWorkerRegistered ? 'Installed' : 'Not Installed'}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Smartphone className="h-5 w-5 text-blue-600 mr-3" />
            <span className="text-gray-700">Cached Data</span>
          </div>
          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
            {cachedData.length} items
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Download className="h-5 w-5 text-blue-600 mr-3" />
            <span className="text-gray-700">Browser Support</span>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            isServiceWorkerSupported ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isServiceWorkerSupported ? 'Supported' : 'Not Supported'}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {!isServiceWorkerRegistered && isServiceWorkerSupported && (
          <button
            onClick={registerServiceWorker}
            disabled={isInstalling}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center"
          >
            {isInstalling ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Installing...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Install Offline Capability
              </>
            )}
          </button>
        )}

        {isServiceWorkerRegistered && (
          <button
            onClick={clearCache}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium"
          >
            Clear Cache & Uninstall
          </button>
        )}
      </div>

      {!isOnline && cachedData.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-900 mb-2">Offline Mode Active</h4>
          <p className="text-sm text-yellow-800">
            You're viewing cached data. Some features may be limited until you're back online.
          </p>
        </div>
      )}

      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">Offline Features:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• View cached property listings without internet</li>
          <li>• Access neighborhood information offline</li>
          <li>• Generate QR codes for yard signs</li>
          <li>• Save favorite properties locally</li>
          <li>• Automatic sync when back online</li>
        </ul>
      </div>
    </div>
  )
}

export default OfflineCapability
