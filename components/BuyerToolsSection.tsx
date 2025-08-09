'use client'

import React, { useState } from 'react'

export default function BuyerToolsSection() {
  const [selectedPrice, setSelectedPrice] = useState(875000)
  const [downPayment, setDownPayment] = useState(20)
  const [interestRate, setInterestRate] = useState(7.0)

  const schools = [
    { name: 'Palo Verde High School', rating: 9, distance: '0.8 mi', type: 'High School' },
    { name: 'West Career Technical Academy', rating: 10, distance: '1.2 mi', type: 'High School' },
    { name: 'Faiss Middle School', rating: 8, distance: '0.5 mi', type: 'Middle School' },
    { name: 'Estes Elementary', rating: 9, distance: '0.3 mi', type: 'Elementary' },
  ]

  const calculateMonthly = () => {
    const principal = selectedPrice - (selectedPrice * downPayment) / 100
    const monthlyRate = interestRate / 100 / 12
    const payments = 30 * 12
    const monthly =
      principal *
      ((monthlyRate * Math.pow(1 + monthlyRate, payments)) /
        (Math.pow(1 + monthlyRate, payments) - 1))
    return Number.isFinite(monthly) ? monthly.toFixed(0) : '0'
  }

  return (
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
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Make confident decisions with our comprehensive buyer toolkit
          </p>
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
                    aria-label="Home price"
                    placeholder="e.g. 875000"
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
                      aria-label="Down payment percentage"
                      placeholder="20"
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
                      aria-label="Interest rate"
                      placeholder="7.0"
                    />
                    <span className="absolute right-3 top-3 text-gray-500">%</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Estimated Monthly Payment</div>
                <div className="text-3xl font-bold text-green-600">${calculateMonthly()}</div>
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
                {schools.map((school, idx) => (
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

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">Start Your Home Search</button>
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
  )
}


