import { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Award, Home, Users, TrendingUp, Heart } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import FAQSection from '@/components/FAQSection'

const GoogleBusinessProfile = dynamic(
  () => import('@/components/GoogleBusinessProfile'),
  { ssr: true, loading: () => <div className="bg-white rounded-lg shadow-md p-6 animate-pulse h-80" aria-label="Loading map" /> }
)

export const revalidate = 86400 // ISR: revalidate daily

export const metadata: Metadata = {
  title: 'About Dr. Jan Duffy | Top Summerlin West Real Estate Agent',
  description: 'Learn about Dr. Jan Duffy, your trusted real estate expert in Summerlin West. With 15+ years of experience, she has helped hundreds of clients buy and sell luxury homes in Las Vegas\' premier master-planned community. Discover why she\'s the leading Las Vegas realtor.',
  keywords: 'Dr. Jan Duffy, Summerlin realtor, Las Vegas real estate agent, Summerlin open houses, luxury home specialist, Summerlin West real estate expert, top real estate agent Las Vegas, real estate professional Summerlin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/about',
  },
  openGraph: {
    title: 'About Dr. Jan Duffy | Summerlin West Real Estate Expert',
    description: 'Meet Dr. Jan Duffy, your trusted real estate expert in Summerlin West, Las Vegas.',
    images: ['/images/about-hero.jpg'],
    url: 'https://www.openhousemarketplace.com/about',
  },
}

export default function AboutPage() {
  return (
    <>
      <StructuredData 
        type="RealEstateAgent"
        data={{
          telephone: '+1-702-200-3422',
          email: 'jan@openhousemarketplace.com',
          areaServed: {
            '@type': 'City',
            name: 'Summerlin West, Las Vegas, NV'
          }
        }}
      />
      <StructuredData 
        type="LocalBusiness"
        data={{
          openingHours: ['Mo-Fr 09:00-18:00', 'Sa-Su 10:00-16:00'],
          // Add actual review data from Google Business Profile
          aggregateRating: {
            ratingValue: '5.0',
            reviewCount: '100'
          }
        }}
      />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-gradient-to-r from-blue-600 to-red-600 rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              About Dr. Jan Duffy
            </h1>
            <p className="text-xl text-gray-200">
              Your Trusted Real Estate Expert in Summerlin West
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Background & Real Estate Expertise</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            Dr. Jan Duffy brings over 15 years of expertise and dedication to the Summerlin West real estate market. 
            As a licensed Las Vegas real estate agent with an extensive track record of success, she has established 
            herself as one of the most trusted real estate professionals in Nevada's premier master-planned community. 
            Her deep understanding of the local market, combined with a passion for helping clients achieve their real 
            estate goals, makes her the ideal choice for anyone buying or selling property in Summerlin West.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Specializing in luxury homes, new construction properties, and investment real estate, Dr. Duffy provides 
            personalized service tailored to each client&apos;s unique needs. She also helps buyers find and tour Summerlin 
            open houses—see our <Link href="/open-houses" className="text-blue-600 font-semibold hover:underline">open houses</Link> page for this weekend&apos;s home tours. Her comprehensive knowledge of Summerlin 
            neighborhoods, from The Ridges to Summerlin Centre, ensures that clients receive expert guidance throughout 
            their real estate journey. Whether you&apos;re a first-time homebuyer, luxury property investor, or looking to 
            sell your home, Dr. Duffy&apos;s market expertise and proven strategies ensure successful transactions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            As a top-performing Las Vegas realtor, Dr. Jan Duffy has consistently ranked among the area's leading real 
            estate agents. Her commitment to excellence, combined with advanced technology and innovative marketing 
            approaches, has helped hundreds of clients navigate the complexities of the Las Vegas real estate market 
            with confidence and success.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Home className="h-10 w-10 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600">Homes Sold</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Award className="h-10 w-10 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Users className="h-10 w-10 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <TrendingUp className="h-10 w-10 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">$250M+</div>
            <div className="text-gray-600">In Sales Volume</div>
          </div>
        </div>

        {/* Specializations */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Real Estate Specializations & Expertise</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Luxury Real Estate in Summerlin West</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Dr. Jan Duffy is recognized as a leading expert in luxury real estate throughout Summerlin West. 
                Her extensive experience with high-end properties in neighborhoods like The Ridges, Red Rock Country 
                Club, and other prestigious communities has made her the go-to Las Vegas real estate agent for 
                discerning buyers and sellers. With an in-depth understanding of luxury market dynamics, architectural 
                trends, and exclusive amenities, Dr. Duffy provides unparalleled service for luxury property transactions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Her expertise extends beyond traditional sales to include private showings, off-market listings, 
                and connections with other luxury real estate professionals nationwide. Whether you're purchasing a 
                multi-million dollar estate or selling your luxury home, Dr. Duffy's specialized knowledge ensures 
                optimal outcomes in the competitive Summerlin West luxury real estate market.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">New Construction & Builder Relationships</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a top Summerlin realtor, Dr. Jan Duffy maintains strong relationships with premier builders 
                throughout the Las Vegas area. Her expertise in new construction includes navigating builder contracts, 
                customization options, and construction timelines. She helps clients understand the benefits of buying 
                new construction, from energy-efficient features to modern floor plans and smart home technology.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Her knowledge of new construction communities in Summerlin West, including those by Toll Brothers, 
                Lennar, Pulte, and other leading builders, allows her to match clients with the perfect new home 
                opportunities. As your dedicated Las Vegas real estate agent, Dr. Duffy ensures you receive the best 
                deals and terms when purchasing new construction properties.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Investment Property Analysis</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Beyond traditional residential real estate, Dr. Jan Duffy provides expert guidance for real estate 
                investors seeking opportunities in Summerlin West and throughout Las Vegas. Her investment property 
                expertise includes rental property analysis, market trend forecasting, and identifying emerging 
                neighborhoods with strong appreciation potential.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Whether you're a seasoned investor or new to real estate investment, Dr. Duffy's comprehensive market 
                knowledge helps you make informed decisions about rental properties, fix-and-flip opportunities, and 
                long-term investment strategies. Her understanding of Las Vegas real estate trends and market cycles 
                provides valuable insights for building a profitable real estate portfolio.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Family Real Estate Services</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                For families moving to Summerlin West, Dr. Jan Duffy offers specialized expertise in family-friendly 
                neighborhoods, school districts, and community amenities. Her deep knowledge of areas like Summerlin 
                Centre, The Trails, and other family-oriented communities ensures that families find homes that meet 
                their unique needs.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Understanding that families have specific priorities when purchasing real estate in Las Vegas, Dr. Duffy 
                provides guidance on school ratings, safety, parks, and recreational facilities. Her comprehensive approach 
                to family real estate services makes relocating to Summerlin West a smooth and successful experience for 
                families from across the country.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Core Values & Professional Commitment</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <Heart className="h-6 w-6 text-red-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Client-First Approach</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Your goals are our priority. As a dedicated Summerlin West real estate agent, Dr. Duffy takes the time 
                  to understand your unique needs, whether you're buying your first home, selling a luxury property, or 
                  investing in Las Vegas real estate. She works tirelessly to exceed your expectations and ensure your 
                  complete satisfaction with every transaction.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Unlike real estate agents who treat clients as transactions, Dr. Duffy believes in building lasting 
                  relationships. Her commitment to your success extends beyond closing, with ongoing support and market 
                  insights that help you make informed real estate decisions for years to come.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Award className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expertise & Market Knowledge</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Deep local market knowledge combined with continuous professional training ensures you receive expert 
                  guidance throughout your real estate journey. Dr. Jan Duffy stays current with Las Vegas real estate 
                  trends, market conditions, and regulatory changes that affect buyers and sellers in Summerlin West.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Her comprehensive understanding of neighborhood dynamics, property values, and market timing provides 
                  clients with a significant advantage in the competitive Summerlin real estate market. As a top Las Vegas 
                  realtor, she combines data-driven insights with intuitive market understanding to deliver exceptional results.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <TrendingUp className="h-6 w-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Results-Driven Excellence</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  With a proven track record of successful transactions, Dr. Jan Duffy consistently delivers results for 
                  clients ranging from first-time homebuyers to luxury property investors. Her commitment to excellence 
                  is reflected in her impressive statistics: over 500 homes sold, more than $250 million in sales volume, 
                  and hundreds of satisfied clients throughout Summerlin West.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Her results-driven approach means that every client receives the same high level of service and 
                  commitment to success. Whether you're selling a starter home or purchasing a luxury estate, Dr. Duffy's 
                  proven strategies and dedication ensure optimal outcomes in your Las Vegas real estate transaction.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="h-6 w-6 text-purple-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Network & Resources</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  As an established Las Vegas real estate agent, Dr. Jan Duffy maintains a comprehensive network of 
                  industry professionals, including mortgage brokers, home inspectors, contractors, and other specialists 
                  essential to successful real estate transactions. This network ensures clients receive access to the best 
                  resources throughout their buying or selling process.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Her relationships with other real estate agents, builders, and industry professionals throughout 
                  Summerlin West provide clients with exclusive opportunities and insider knowledge that may not be 
                  available through other real estate agents. This extensive professional network is just one of the many 
                  advantages of working with a top-performing Las Vegas realtor.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Community Involvement */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Community Involvement & Local Expertise</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Active in Summerlin West Community</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Beyond her role as a Las Vegas real estate agent, Dr. Jan Duffy is an active member of the Summerlin 
                West community. Her involvement in local events, community organizations, and neighborhood associations 
                provides her with unique insights into what makes each area special. This community engagement allows 
                her to offer clients authentic perspectives on neighborhood culture, amenities, and lifestyle.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Her deep roots in Summerlin West mean that when you work with Dr. Duffy, you're not just getting a 
                real estate professional—you're getting a community insider who truly understands the nuances of living 
                in Las Vegas' premier master-planned community. This local expertise is invaluable for buyers relocating 
                to the area and sellers looking to highlight their neighborhood's unique advantages.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Continued Education & Professional Development</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a top-performing Las Vegas realtor, Dr. Jan Duffy recognizes that the real estate industry is constantly 
                evolving. She invests heavily in continued education, staying current with the latest market trends, 
                technology tools, and industry best practices. This commitment to professional development ensures that 
                her clients benefit from the most current knowledge and strategies available in real estate.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Her dedication to excellence has earned her numerous industry certifications and recognition as a leading 
                real estate agent in the Las Vegas area. Whether it's understanding new financing options, navigating 
                changing market conditions, or utilizing the latest technology platforms, Dr. Duffy's commitment to 
                staying ahead of the curve provides clients with a distinct advantage in the Summerlin West real estate market.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Client Testimonials & Success Stories</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The success of Dr. Jan Duffy as a Summerlin West real estate agent is best reflected in the satisfaction 
                of her clients. With over 1,000 happy clients and countless referrals, her reputation for excellence speaks 
                for itself. Clients consistently praise her professionalism, market knowledge, negotiation skills, and 
                personalized approach to real estate services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From first-time homebuyers who appreciated her patience and guidance to luxury property investors who 
                valued her expertise and connections, Dr. Duffy's clients span the full spectrum of real estate needs. 
                This diverse experience makes her uniquely qualified to serve anyone looking to buy or sell property in 
                Summerlin West or throughout the Las Vegas area.
              </p>
            </div>
          </div>
        </div>

        {/* GBP Component */}
        <div className="mb-8">
          <GoogleBusinessProfile showMap={true} showReviews={true} />
        </div>

        {/* CTA */}
        <div className="bg-blue-600 rounded-lg shadow-md p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Work with Las Vegas&apos; Top Real Estate Agent?</h2>
          <p className="text-xl mb-6">Let&apos;s work together to achieve your real estate goals in Summerlin West</p>
          <p className="text-lg mb-6 opacity-90">
            Experience the difference of working with a dedicated, experienced, and results-driven Las Vegas real estate 
            professional. Contact Dr. Jan Duffy today to schedule your free consultation and discover why she&apos;s the 
            trusted choice for real estate services throughout Summerlin West.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Contact Dr. Jan Duffy Today
            </Link>
            <Link
              href="/open-houses"
              className="inline-block bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-bold text-lg border-2 border-white/50 transition-colors"
            >
              View Summerlin Open Houses
            </Link>
          </div>
        </div>
      </div>
    </div>

    <FAQSection 
      faqs={[
        {
          question: "How long has Dr. Jan Duffy been a real estate agent?",
          answer: "Dr. Jan Duffy has been a licensed real estate agent for over 15 years, specializing in Summerlin West and the greater Las Vegas area. Her extensive experience and deep market knowledge have helped hundreds of clients successfully buy and sell homes."
        },
        {
          question: "What makes Dr. Jan Duffy different from other real estate agents?",
          answer: "Dr. Jan Duffy combines her professional background with specialized expertise in Summerlin West real estate. She offers personalized service, deep market knowledge, access to exclusive listings through her home search, and a commitment to building lasting relationships with clients rather than treating them as transactions."
        },
        {
          question: "What neighborhoods does Dr. Jan Duffy specialize in?",
          answer: "Dr. Jan Duffy specializes in all neighborhoods throughout Summerlin West, including The Ridges, Red Rock Country Club, Summerlin Centre, Sun City Summerlin, The Trails, Willows, Mesa Ridge, Siena, and Regency. She has extensive knowledge of each community's unique characteristics, market trends, and amenities."
        },
        {
          question: "Does Dr. Jan Duffy work with luxury home buyers and sellers?",
          answer: "Yes, Dr. Jan Duffy has extensive experience with luxury real estate in Summerlin, including custom estates, golf course properties, and exclusive gated communities. She understands the unique needs of luxury buyers and sellers and has access to high-end listings throughout the area."
        },
        {
          question: "What credentials does Dr. Jan Duffy have?",
          answer: "Dr. Jan Duffy is a licensed real estate agent with over 15 years of experience. She has specialized training in luxury homes, new construction, investment properties, and the Summerlin West real estate market. Her professional credentials and certifications demonstrate her commitment to excellence in real estate services."
        },
        {
          question: "How does Dr. Jan Duffy help first-time homebuyers?",
          answer: "Dr. Jan Duffy provides comprehensive guidance for first-time homebuyers, including education about the home buying process, assistance with mortgage pre-approval, neighborhood tours, and step-by-step support throughout the entire transaction. She ensures first-time buyers feel confident and informed at every stage."
        },
        {
          question: "Does Dr. Jan Duffy help buyers find open houses in Summerlin?",
          answer: "Yes. Dr. Jan Duffy helps buyers find and tour Summerlin open houses. Visit our Open Houses page for this weekend's home tours, or use her home search to search listings and filter by open house dates. She can also set up open house alerts so you're notified when new Summerlin open houses are added."
        }
      ]}
    />
    </>
  )
}

