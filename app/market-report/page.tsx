import { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, TrendingDown, Home, DollarSign, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Summerlin West Market Report | Las Vegas Real Estate Trends & Statistics',
  description: 'Stay informed with the latest Summerlin West real estate market trends, statistics, and insights. Comprehensive monthly reports on home prices, inventory, days on market, and market conditions in Las Vegas\' premier master-planned community.',
  keywords: 'Summerlin West market report, Las Vegas real estate trends, home prices Summerlin, market statistics, Summerlin real estate market analysis, Las Vegas housing market trends, Summerlin home prices, real estate market report Las Vegas',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/market-report',
  },
  openGraph: {
    title: 'Summerlin West Market Report | Real Estate Trends & Statistics',
    description: 'Latest market insights and trends for Summerlin West real estate.',
    images: ['/images/market-report-hero.jpg'],
    url: 'https://www.openhousemarketplace.com/market-report',
  }
}

export default function MarketReportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-gradient-to-r from-blue-600 to-red-600">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Summerlin West Market Report
            </h1>
            <p className="text-xl text-gray-200">
              Latest Real Estate Trends & Statistics
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Market Overview */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Market Overview</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            The Summerlin West real estate market continues to show strength and resilience. 
            As of the latest reporting period, we're seeing steady appreciation in home values 
            with strong buyer demand across all price points.
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="h-6 w-6 text-blue-600" />
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">$850,000</div>
              <div className="text-sm text-gray-600">Median Home Price</div>
              <div className="text-sm text-green-600 mt-1">+2.4% from last month</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Home className="h-6 w-6 text-purple-600" />
                <TrendingDown className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">142</div>
              <div className="text-sm text-gray-600">Active Listings</div>
              <div className="text-sm text-orange-600 mt-1">-5.3% from last month</div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-6 w-6 text-green-600" />
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">38 days</div>
              <div className="text-sm text-gray-600">Avg Days on Market</div>
              <div className="text-sm text-green-600 mt-1">-3 days from last month</div>
            </div>

            <div className="bg-orange-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-6 w-6 text-orange-600" />
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">$325/sqft</div>
              <div className="text-sm text-gray-600">Price per Sq.Ft</div>
              <div className="text-sm text-green-600 mt-1">+1.8% from last month</div>
            </div>
          </div>
        </div>

        {/* Market Trends */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Summerlin West Real Estate Market Trends</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Price Trends & Appreciation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Summerlin West real estate market continues to demonstrate strong price appreciation across all 
                segments. The median home price in Summerlin has increased 2.4% month-over-month, reflecting sustained 
                buyer demand and limited inventory. This trend is particularly pronounced in luxury homes priced over $1 
                million, which are showing exceptional appreciation rates.
              </p>
              <ul className="space-y-3 text-gray-700 mb-4">
                <li>• Median home price increased 2.4% month-over-month in Summerlin West</li>
                <li>• Luxury homes ($1M+) showing strong appreciation of 3-4% annually</li>
                <li>• Entry-level homes remain competitive with steady price growth</li>
                <li>• New construction properties commanding premium prices</li>
                <li>• Price per square foot increased 1.8% from previous month</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                These price trends indicate a healthy, active real estate market in Summerlin West. For buyers, this 
                means homes continue to appreciate, making real estate investment in Las Vegas' premier master-planned 
                community a wise financial decision. Sellers benefit from strong demand and competitive pricing that 
                often results in multiple offers on well-positioned properties.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Inventory Analysis & Supply Dynamics</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Inventory levels in Summerlin West remain tight across all price segments, creating a competitive 
                environment for buyers. With only 142 active listings and inventory down 5.3% from the previous month, 
                well-priced homes are moving quickly. This low inventory, combined with strong buyer demand, is driving 
                the appreciation trends we're seeing throughout the Summerlin real estate market.
              </p>
              <ul className="space-y-3 text-gray-700 mb-4">
                <li>• Inventory levels remain tight across all segments in Summerlin</li>
                <li>• New construction communities adding to available inventory</li>
                <li>• Well-priced homes moving quickly, averaging 38 days on market</li>
                <li>• Multiple offers common on desirable properties</li>
                <li>• Seller's market conditions continue in Summerlin West</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                For buyers in the Las Vegas real estate market, this inventory situation means acting quickly when 
                desirable properties become available. For sellers, low inventory creates opportunities to achieve 
                optimal pricing and favorable contract terms. Working with an experienced Summerlin real estate agent 
                like Dr. Jan Duffy ensures you're positioned to capitalize on these market conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Market Conditions */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Current Market Conditions in Summerlin West</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Days on Market Trends</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Properties in Summerlin West are selling faster than ever, with average days on market dropping to just 
                38 days—a decrease of 3 days from the previous month. This accelerated pace reflects strong buyer demand 
                and competitive market conditions. Well-maintained homes in desirable neighborhoods like The Ridges, Red 
                Rock Country Club, and Summerlin Centre are particularly sought after, often receiving offers within the 
                first week of listing.
              </p>
              <p className="text-gray-700 leading-relaxed">
                For sellers, this trend means proper pricing and presentation are more critical than ever. Homes that are 
                priced competitively and show well are receiving multiple offers, often above asking price. For buyers, 
                understanding this dynamic is essential—working with a knowledgeable Las Vegas real estate agent ensures 
                you can move quickly when the right property becomes available.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Buyer vs. Seller Market Dynamics</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Summerlin West continues to operate as a seller's market, characterized by low inventory, strong demand, 
                and competitive bidding situations. However, the market shows signs of balance, with new construction 
                projects adding inventory and providing more options for buyers seeking homes in Las Vegas' premier 
                master-planned community.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This market dynamic creates unique opportunities for both buyers and sellers. Sellers benefit from strong 
                demand and the ability to achieve premium pricing, while buyers who work with experienced real estate 
                professionals can still find excellent opportunities, particularly in new construction and off-market 
                listings. Understanding these market conditions is crucial for making informed real estate decisions in 
                Summerlin West.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Seasonal Trends & Market Forecast</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Summerlin real estate market typically experiences seasonal fluctuations, with spring and fall being 
                particularly active periods. However, the current market is showing year-round strength, driven by low 
                interest rates, strong demand from both local and out-of-state buyers, and limited inventory. This 
                sustained activity suggests continued appreciation and competitive conditions in the coming months.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Looking ahead, real estate experts predict continued strong performance for the Summerlin West market, 
                though at a potentially more moderate pace. New construction projects, particularly those by builders like 
                Toll Brothers, Lennar, and Pulte, are expected to provide additional inventory while maintaining premium 
                pricing. For both buyers and sellers, staying informed about these trends is essential for successful real 
                estate transactions in Las Vegas' most desirable master-planned community.
              </p>
            </div>
          </div>
        </div>

        {/* Neighborhood Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Neighborhood Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Neighborhood</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Median Price</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Listings</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Days on Market</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">
                    <Link href="/neighborhoods/the-ridges" className="text-blue-600 hover:text-blue-800">
                      The Ridges
                    </Link>
                  </td>
                  <td className="text-right py-3 px-4">$2,850,000</td>
                  <td className="text-right py-3 px-4">12</td>
                  <td className="text-right py-3 px-4">45</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">
                    <Link href="/neighborhoods/red-rock-country-club" className="text-blue-600 hover:text-blue-800">
                      Red Rock Country Club
                    </Link>
                  </td>
                  <td className="text-right py-3 px-4">$1,250,000</td>
                  <td className="text-right py-3 px-4">28</td>
                  <td className="text-right py-3 px-4">32</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">
                    <Link href="/neighborhoods/summerlin-centre" className="text-blue-600 hover:text-blue-800">
                      Summerlin Centre
                    </Link>
                  </td>
                  <td className="text-right py-3 px-4">$675,000</td>
                  <td className="text-right py-3 px-4">45</td>
                  <td className="text-right py-3 px-4">28</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <Link href="/neighborhoods/sun-city-summerlin" className="text-blue-600 hover:text-blue-800">
                      Sun City Summerlin
                    </Link>
                  </td>
                  <td className="text-right py-3 px-4">$425,000</td>
                  <td className="text-right py-3 px-4">35</td>
                  <td className="text-right py-3 px-4">25</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 rounded-lg shadow-md p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Get Your Personalized Market Analysis</h2>
          <p className="text-xl mb-6">Want to know what your home is worth? Contact us for a free valuation.</p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Request Free Market Analysis
          </Link>
        </div>
      </div>
    </div>
  )
}

