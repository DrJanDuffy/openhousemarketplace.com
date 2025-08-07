'use client'

import React, { useState, useRef } from 'react'
import { Download, QrCode, Share2, Copy } from 'lucide-react'

interface QRCodeGeneratorProps {
  propertyId?: string
  propertyAddress?: string
  className?: string
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  propertyId = 'default',
  propertyAddress = 'Summerlin West Property',
  className = ""
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg'>('png')
  const [propertyAddressState, setPropertyAddressState] = useState(propertyAddress)
  const qrCodeRef = useRef<HTMLDivElement>(null)

  // Generate QR code URL for the property
  const generateQRCode = () => {
    setIsGenerating(true)
    
    // Create a unique URL for this property
    const propertyUrl = `https://www.openhousemarketplace.com/property/${propertyId}?utm_source=qr&utm_medium=yard_sign&utm_campaign=summerlin_west`
    
    // Use a QR code service (you can replace with any QR code API)
    const qrCodeServiceUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(propertyUrl)}&format=${downloadFormat}`
    
    setQrCodeUrl(qrCodeServiceUrl)
    setIsGenerating(false)
  }

  // Download QR code
  const downloadQRCode = async () => {
    if (!qrCodeUrl) return

    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `qr-code-${propertyId}.${downloadFormat}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading QR code:', error)
    }
  }

  // Copy QR code URL to clipboard
  const copyQRCodeUrl = async () => {
    const propertyUrl = `https://www.openhousemarketplace.com/property/${propertyId}?utm_source=qr&utm_medium=yard_sign&utm_campaign=summerlin_west`
    
    try {
      await navigator.clipboard.writeText(propertyUrl)
      // You could add a toast notification here
      console.log('QR code URL copied to clipboard')
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  // Share QR code
  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Open House: ${propertyAddress}`,
          text: `Check out this property in Summerlin West!`,
          url: `https://www.openhousemarketplace.com/property/${propertyId}`
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback to copying URL
      copyQRCodeUrl()
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="text-center mb-6">
        <QrCode className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">QR Code Generator</h3>
        <p className="text-gray-600">Generate QR codes for yard signs and marketing materials</p>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Address
          </label>
          <input
            type="text"
            value={propertyAddressState}
            onChange={(e) => setPropertyAddressState(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter property address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Download Format
          </label>
          <select
            value={downloadFormat}
            onChange={(e) => setDownloadFormat(e.target.value as 'png' | 'svg')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Select download format"
            title="Select download format"
          >
            <option value="png">PNG (High Quality)</option>
            <option value="svg">SVG (Scalable)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={generateQRCode}
          disabled={isGenerating}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium flex items-center"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating...
            </>
          ) : (
            <>
              <QrCode className="h-4 w-4 mr-2" />
              Generate QR Code
            </>
          )}
        </button>
      </div>

      {qrCodeUrl && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div ref={qrCodeRef} className="border-2 border-gray-200 rounded-lg p-4">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-48 h-48"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={downloadQRCode}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
            
            <button
              onClick={copyQRCodeUrl}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy URL
            </button>
            
            <button
              onClick={shareQRCode}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">QR Code Features:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Direct link to property details</li>
              <li>• Mobile-optimized for on-the-go viewing</li>
              <li>• Tracks marketing campaign effectiveness</li>
              <li>• Works offline with cached data</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default QRCodeGenerator
