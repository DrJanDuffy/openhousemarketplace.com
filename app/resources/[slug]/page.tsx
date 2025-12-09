import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

const validResources: Record<string, {
  title: string
  description: string
  content: React.ReactNode
}> = {
  'home-buying-guide': {
    title: 'Home Buying Guide | Summerlin Real Estate',
    description: 'Complete guide to buying a home in Summerlin. Step-by-step process, tips, and checklists for first-time and experienced homebuyers.',
    content: (
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Get Pre-Approved</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Before you start house hunting, get pre-approved for a mortgage. This shows sellers you're 
            a serious buyer and helps you understand your budget.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Gather financial documents (W-2s, tax returns, bank statements)</li>
            <li>Check your credit score</li>
            <li>Compare lenders and mortgage rates</li>
            <li>Get pre-approval letter</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 2: Find Your Real Estate Agent</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            A good real estate agent is invaluable in Summerlin's competitive market. They'll help you 
            navigate the process, negotiate on your behalf, and find the right home.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 3: Search for Homes</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Use our RealScout platform to search for homes that match your criteria. Consider:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Location and neighborhood</li>
            <li>Size and layout</li>
            <li>Budget and price range</li>
            <li>Future resale value</li>
            <li>School districts</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 4: Make an Offer</h2>
          <p className="text-gray-600 leading-relaxed">
            Your agent will help you craft a competitive offer based on market conditions, comparable 
            sales, and the property's condition.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 5: Home Inspection & Appraisal</h2>
          <p className="text-gray-600 leading-relaxed">
            Once your offer is accepted, schedule a home inspection and wait for the lender's appraisal. 
            This protects you from unexpected issues.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 6: Closing</h2>
          <p className="text-gray-600 leading-relaxed">
            Finalize your loan, complete final walkthrough, sign closing documents, and get your keys!
          </p>
        </section>
      </div>
    )
  },
  'hoa-communities': {
    title: 'HOA Communities in Summerlin | Homeowners Association Guide',
    description: 'Complete guide to HOA communities in Summerlin. Fees, amenities, rules, and what to know before buying in an HOA community.',
    content: (
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding HOAs in Summerlin</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Most communities in Summerlin have homeowners associations (HOAs) that maintain common areas, 
            enforce community standards, and provide amenities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">HOA Fees & What They Cover</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            HOA fees typically cover:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Landscaping and maintenance of common areas</li>
            <li>Community amenities (pools, gyms, clubhouses)</li>
            <li>Security and gated access</li>
            <li>Reserve funds for major repairs</li>
            <li>Community events and programs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">HOA Rules & Regulations</h2>
          <p className="text-gray-600 leading-relaxed">
            Each HOA has its own set of rules (CC&Rs - Covenants, Conditions & Restrictions). 
            Review these carefully before purchasing to ensure they align with your lifestyle.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits of HOA Communities</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Maintained property values through consistent standards</li>
            <li>Access to community amenities</li>
            <li>Well-maintained common areas</li>
            <li>Community sense of belonging</li>
          </ul>
        </section>
      </div>
    )
  },
  'lifestyle-guide': {
    title: 'Summerlin Lifestyle Guide | Restaurants, Shopping & Recreation',
    description: 'Discover the Summerlin lifestyle. Guide to restaurants, shopping, recreation, and local attractions in Las Vegas\' premier master-planned community.',
    content: (
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Shopping & Dining</h2>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Downtown Summerlin</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Downtown Summerlin is the heart of the community, featuring over 125 stores and restaurants, 
            including upscale retailers, casual and fine dining, and entertainment options.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Outdoor Recreation</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>250+ miles of walking and biking trails</li>
            <li>Red Rock Canyon National Conservation Area</li>
            <li>Multiple parks and playgrounds</li>
            <li>Community pools and recreation centers</li>
            <li>Golf courses throughout the community</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Entertainment & Culture</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Summerlin offers a vibrant cultural scene with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Red Rock Casino Resort & Spa</li>
            <li>Downtown Summerlin events and concerts</li>
            <li>Community festivals and farmers markets</li>
            <li>Access to Las Vegas Strip (15 minutes)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Family-Friendly Activities</h2>
          <p className="text-gray-600 leading-relaxed">
            From parks and playgrounds to youth sports programs and community events, Summerlin is 
            designed for families to enjoy an active, connected lifestyle.
          </p>
        </section>
      </div>
    )
  },
  'new-construction': {
    title: 'New Construction in Summerlin | New Homes & Communities',
    description: 'Guide to new construction homes in Summerlin. Top builders, communities, model homes, and what to know about buying new construction.',
    content: (
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Buy New Construction?</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Modern floor plans and features</li>
            <li>Energy-efficient construction</li>
            <li>Warranty protection</li>
            <li>Customization options</li>
            <li>Latest smart home technology</li>
            <li>Lower maintenance costs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Builders in Summerlin</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <Link href="/builders/toll-brothers" className="text-blue-600 hover:text-blue-800">
                  Toll Brothers
                </Link>
              </h3>
              <p className="text-gray-600">Luxury homes in premier locations</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <Link href="/builders/lennar" className="text-blue-600 hover:text-blue-800">
                  Lennar
                </Link>
              </h3>
              <p className="text-gray-600">Everything's Included® program</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <Link href="/builders/pulte" className="text-blue-600 hover:text-blue-800">
                  Pulte Homes
                </Link>
              </h3>
              <p className="text-gray-600">Energy-efficient modern homes</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">New Construction Process</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-600">
            <li>Visit model homes and explore communities</li>
            <li>Choose your lot and floor plan</li>
            <li>Select upgrades and customization options</li>
            <li>Secure financing</li>
            <li>Construction begins (typically 4-6 months)</li>
            <li>Final walkthrough and closing</li>
          </ol>
        </section>
      </div>
    )
  }
}

interface ResourcePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params
  const resource = validResources[slug]
  
  if (!resource) {
    return {
      title: 'Resource Not Found | Open House Marketplace',
    }
  }

  return {
    title: resource.title,
    description: resource.description,
    keywords: `Summerlin real estate guide, ${slug}, Las Vegas real estate resources`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `https://www.openhousemarketplace.com/resources/${slug}`,
    },
    openGraph: {
      title: resource.title,
      description: resource.description,
      images: ['/images/resources-hero.jpg'],
      url: `https://www.openhousemarketplace.com/resources/${slug}`,
    }
  }
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params
  const resource = validResources[slug]

  if (!resource) {
    notFound()
    // TypeScript needs explicit never return type hint
    throw new Error('Resource not found')
  }

  // Extract title for breadcrumb - TypeScript now knows resource is defined
  const resourceTitle = resource.title.split('|')[0]?.trim() || resource.title.trim()

  return (
    <>
      <StructuredData 
        type="LocalBusiness"
        data={{
          openingHours: ['Mo-Fr 09:00-18:00', 'Sa-Su 10:00-16:00'],
          aggregateRating: {
            ratingValue: '5.0',
            reviewCount: '100'
          }
        }}
      />
      <StructuredData 
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: 'https://www.openhousemarketplace.com/' },
            { name: 'Resources', url: 'https://www.openhousemarketplace.com/resources' },
            { name: resourceTitle, url: `https://www.openhousemarketplace.com/resources/${slug}` }
          ]
        }}
      />
      <StructuredData 
        type="WebPage"
        data={{
          name: resource.title,
          description: resource.description,
        }}
      />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-gradient-to-r from-blue-600 to-red-600">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {resourceTitle}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              Welcome to our comprehensive {resource.title.toLowerCase().includes('guide') ? 'guide' : 'resource'} for 
              Summerlin real estate. Whether you're buying your first home, investing in property, or exploring the 
              Summerlin lifestyle, this resource provides valuable insights to help you make informed decisions about 
              real estate in Las Vegas' premier master-planned community.
            </p>
            {resource.content}
          </div>
        </div>

        {/* Additional Content Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Working with a Summerlin Real Estate Expert</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Navigating the Summerlin real estate market requires expertise and local knowledge. Dr. Jan Duffy brings 
            over 15 years of experience helping clients successfully buy and sell properties in Summerlin West. As a 
            top-performing Las Vegas real estate agent, she understands the nuances of the local market, neighborhood 
            characteristics, and what makes each community special.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Whether you're exploring new construction opportunities, searching for the perfect family home, or investing 
            in luxury real estate, working with an experienced Summerlin real estate professional ensures you have the 
            guidance and expertise needed to make confident real estate decisions. Dr. Duffy's comprehensive knowledge 
            of Summerlin neighborhoods, builders, schools, and market trends provides clients with a significant 
            advantage in today's competitive real estate market.
          </p>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Why Choose Dr. Jan Duffy?</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Extensive knowledge of all Summerlin neighborhoods and communities</li>
            <li>Strong relationships with builders and industry professionals</li>
            <li>Proven track record of successful transactions</li>
            <li>Comprehensive market analysis and pricing expertise</li>
            <li>Personalized service tailored to each client's unique needs</li>
            <li>Advanced technology tools for property search and market insights</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 rounded-lg shadow-md p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6">Contact us for personalized assistance with your real estate needs</p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Contact Dr. Jan Duffy
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

