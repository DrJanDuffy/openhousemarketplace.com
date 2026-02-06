import { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import CalendlyInlineWidget from '@/components/CalendlyInlineWidget'
import CalendlyPopupLink from '@/components/CalendlyPopupLink'
import StructuredData from '@/components/StructuredData'
import FAQSection from '@/components/FAQSection'

const GoogleBusinessProfile = dynamic(
  () => import('@/components/GoogleBusinessProfile'),
  { ssr: true, loading: () => <div className="bg-white rounded-lg shadow-md p-6 animate-pulse h-80" aria-label="Loading map" /> }
)

export const revalidate = 86400 // ISR: revalidate daily

export const metadata: Metadata = {
  title: 'Contact Dr. Jan Duffy | Summerlin West Real Estate Agent',
  description: 'Get in touch with Dr. Jan Duffy, your trusted Summerlin West real estate agent. Expert assistance for buying, selling, or investing in Las Vegas\' premier master-planned community. Contact the leading Las Vegas realtor today.',
  keywords: 'Dr. Jan Duffy contact, Summerlin real estate agent, Summerlin open houses, Las Vegas realtor contact, Summerlin West real estate, contact real estate agent Summerlin, Las Vegas real estate expert',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/contact',
  },
  openGraph: {
    title: 'Contact Dr. Jan Duffy | Summerlin West Real Estate',
    description: 'Contact Dr. Jan Duffy for expert real estate services in Summerlin West, Las Vegas.',
    images: ['/images/contact-hero.jpg'],
    url: 'https://www.openhousemarketplace.com/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      <StructuredData 
        type="RealEstateAgent"
        data={{
          telephone: '+1-702-200-3422',
          email: 'jan@openhousemarketplace.com',
        }}
      />
      <StructuredData 
        type="Organization"
        data={{
          url: 'https://www.openhousemarketplace.com',
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
      <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Dr. Jan Duffy - Your Summerlin West Real Estate Expert
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your trusted real estate agent serving Summerlin West and all of Las Vegas
          </p>
          <CalendlyPopupLink className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            Schedule Your Private Tour with Dr. Jan
          </CalendlyPopupLink>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            Looking to buy or sell a home in Summerlin West? Dr. Jan Duffy is your trusted Las Vegas real estate 
            agent with over 15 years of experience helping clients navigate the Summerlin real estate market. 
            Whether you&apos;re searching for luxury homes in The Ridges, family-friendly properties in Summerlin Centre, 
            <Link href="/open-houses" className="text-blue-600 font-semibold hover:underline mx-1">Summerlin open houses</Link> this weekend, 
            or investment opportunities throughout Las Vegas, Dr. Duffy provides personalized service tailored to 
            your unique real estate goals.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            As a leading Summerlin West real estate agent, Dr. Duffy specializes in luxury homes, new construction 
            properties, and investment real estate. Her deep knowledge of the Las Vegas market, combined with 
            cutting-edge technology and proven marketing strategies, ensures successful transactions for both buyers 
            and sellers. <CalendlyPopupLink className="text-blue-600 font-semibold hover:underline">Schedule your private tour with Dr. Jan</CalendlyPopupLink> or 
            contact us today to discover why thousands of clients trust Dr. Jan Duffy with their real estate needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <GoogleBusinessProfile showMap={true} showReviews={true} />

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real Estate Services</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Buying Services</h3>
                <p className="text-gray-600 text-sm">Find your dream home in Summerlin West with expert guidance</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Selling Services</h3>
                <p className="text-gray-600 text-sm">Maximize your home's value with proven marketing strategies</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Luxury Real Estate</h3>
                <p className="text-gray-600 text-sm">Expertise in high-end properties in The Ridges and beyond</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">New Construction</h3>
                <p className="text-gray-600 text-sm">Navigate new home communities and builder relationships</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Investment Properties</h3>
                <p className="text-gray-600 text-sm">Identify profitable real estate investment opportunities</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Market Analysis</h3>
                <p className="text-gray-600 text-sm">Free home valuations and comprehensive market reports</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  <Link href="/open-houses" className="text-blue-600 hover:underline">Open House Tours</Link>
                </h3>
                <p className="text-gray-600 text-sm">Find and tour Summerlin open houses this weekend</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Dr. Jan Duffy as Your Summerlin Real Estate Agent</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Knowledge of Summerlin West</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a dedicated Summerlin West real estate agent, Dr. Jan Duffy has an intimate understanding of 
                every neighborhood, from the luxury estates in The Ridges to the family-friendly communities in 
                Summerlin Centre. Her extensive knowledge of local market trends, school districts, HOA regulations, 
                and community amenities ensures you make informed decisions when buying or selling real estate in 
                Las Vegas' premier master-planned community.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Whether you're interested in homes in Red Rock Country Club, Sun City Summerlin, or any of the 
                other prestigious neighborhoods throughout Summerlin West, Dr. Duffy's expertise helps you navigate 
                the complexities of the Las Vegas real estate market with confidence.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Proven Track Record in Las Vegas Real Estate</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                With over 500 homes sold and more than $250 million in sales volume, Dr. Jan Duffy has established 
                herself as one of the most successful real estate agents in the Las Vegas area. Her clients include 
                first-time homebuyers, luxury property investors, and families relocating to Summerlin West from 
                across the country.
              </p>
              <p className="text-gray-700 leading-relaxed">
                As a top-performing Las Vegas realtor, Dr. Duffy consistently exceeds client expectations through 
                personalized service, aggressive negotiation, and innovative marketing strategies. Her reputation for 
                excellence has earned her referrals from satisfied clients who trust her expertise with their most 
                important real estate transactions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Real Estate Services</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Dr. Jan Duffy offers a full range of real estate services designed to meet every client's needs. 
                For buyers, this includes access to exclusive listings, expert negotiation, and assistance with 
                financing and inspections. For sellers, she provides professional staging advice, professional 
                photography, strategic pricing, and aggressive marketing across multiple platforms.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Her services extend beyond traditional real estate transactions to include investment property 
                analysis, new construction consultation, and ongoing market insights that help clients stay informed 
                about Summerlin West real estate trends. As your dedicated Las Vegas real estate agent, Dr. Duffy 
                works tirelessly to ensure your success in every transaction.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Technology & Marketing Tools</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Staying at the forefront of real estate technology, Dr. Jan Duffy utilizes an advanced home search tool 
                and other advanced tools to give clients a competitive advantage in the Summerlin real estate market. 
                These technologies enable virtual tours, advanced search capabilities, and instant notifications about 
                new listings that match your criteria.
              </p>
              <p className="text-gray-700 leading-relaxed">
                For sellers, her marketing approach includes professional video tours, social media promotion, 
                targeted email campaigns, and traditional marketing methods that ensure maximum exposure for your 
                property. This comprehensive approach has helped countless clients achieve their real estate goals 
                faster and more successfully than the competition.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What to Expect When You Contact Us</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Initial Consultation</h3>
              <p className="text-gray-700 leading-relaxed">
                When you contact Dr. Jan Duffy, you'll receive a personalized consultation tailored to your specific 
                real estate needs. Whether you're buying or selling in Summerlin West, this initial conversation helps 
                us understand your goals, timeline, and preferences. We'll discuss your budget, desired neighborhoods, 
                and any special requirements you may have for your Las Vegas real estate transaction.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Service</h3>
              <p className="text-gray-700 leading-relaxed">
                Unlike many real estate agents who treat clients as transactions, Dr. Duffy believes in building 
                lasting relationships. Every client receives personalized attention and a customized approach to their 
                real estate needs. As your dedicated Summerlin West real estate agent, she'll work closely with you 
                throughout the entire process, ensuring you're informed and confident at every step.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Response Times</h3>
              <p className="text-gray-700 leading-relaxed">
                In today's fast-paced Las Vegas real estate market, timing is everything. Dr. Jan Duffy understands 
                the importance of quick responses and is committed to getting back to clients within hours, not days. 
                Whether you have questions about a property, need to schedule a showing, or want to discuss market 
                conditions, you can count on prompt, professional communication from your Summerlin real estate expert.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule an Open House Tour</h2>
          <p className="text-gray-600 mb-6">
            Book a time that works for you. Select a slot below to schedule an open house tour or consultation with Dr. Jan Duffy.
          </p>
          <CalendlyInlineWidget
            url="https://calendly.com/drjanduffy/open-house-tour"
            minWidth={320}
            height={700}
            className="rounded-xl overflow-hidden"
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Real Estate Journey?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Don't wait to achieve your real estate goals in Summerlin West. Whether you're looking to buy your 
            dream home, sell your current property, or invest in Las Vegas real estate, Dr. Jan Duffy is here to 
            help. Contact us today to schedule a free consultation and discover why we're the trusted choice for 
            real estate services throughout Summerlin and the greater Las Vegas area.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Remember, as a top Summerlin West real estate agent with extensive market knowledge and proven results, 
            Dr. Duffy has the expertise to guide you through every aspect of your real estate transaction. Get in 
            touch today and take the first step toward achieving your real estate dreams.
          </p>
        </div>
      </div>
    </div>

    <FAQSection 
      faqs={[
        {
          question: "How quickly will Dr. Jan Duffy respond to my inquiry?",
          answer: "Dr. Jan Duffy understands the importance of timely communication in real estate. She typically responds to inquiries within 2-4 hours during business hours and within 24 hours for inquiries received outside of business hours. For urgent matters, you can call her directly at the phone number provided."
        },
        {
          question: "What areas does Dr. Jan Duffy serve?",
          answer: "Dr. Jan Duffy specializes in Summerlin West real estate, including neighborhoods such as The Ridges, Red Rock Country Club, Summerlin Centre, Sun City Summerlin, and all surrounding areas in Las Vegas, Nevada. She also serves clients throughout the greater Las Vegas metropolitan area."
        },
        {
          question: "What services does Dr. Jan Duffy provide?",
          answer: "Dr. Jan Duffy provides comprehensive real estate services including buying and selling homes, luxury real estate services, new construction guidance, investment property consultation, market analysis, neighborhood expertise, and access to exclusive listings through her home search."
        },
        {
          question: "Does it cost anything to contact Dr. Jan Duffy for a consultation?",
          answer: "Initial consultations with Dr. Jan Duffy are completely free. She offers complimentary consultations to discuss your real estate goals, whether you're looking to buy, sell, or invest in Summerlin West or the greater Las Vegas area."
        },
        {
          question: "How do I schedule a home showing with Dr. Jan Duffy?",
          answer: "You can schedule a home showing by using the Calendly scheduler on this page to book a time with Dr. Jan Duffy, calling her directly, or using the home search to browse available properties and request showings. She will work with your schedule to find convenient viewing times."
        },
        {
          question: "Can Dr. Jan Duffy help with new construction homes?",
          answer: "Yes, Dr. Jan Duffy has extensive experience working with new construction homes in Summerlin. She works with top builders including Toll Brothers, Lennar, and Pulte, and can help you navigate the new construction process, including lot selection, customization options, and builder negotiations."
        },
        {
          question: "How do I find open houses in Summerlin this weekend?",
          answer: "Visit our Open Houses page for this weekend's Summerlin open house listings and home tours. You can also contact Dr. Jan Duffy to get open house alerts or use her home search to search and filter by open house dates."
        }
      ]}
    />
    </>
  )
}

