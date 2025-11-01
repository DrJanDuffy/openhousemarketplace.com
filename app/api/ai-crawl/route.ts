import { NextResponse } from 'next/server'

export async function GET() {
  const aiCrawlData = {
    site: 'www.openhousemarketplace.com',
    description: "Summerlin West real estate services by Dr. Jan Duffy - expert real estate agent specializing in luxury homes, new construction, and residential properties in Las Vegas' premier master-planned community",
    primaryTopics: [
      'Summerlin West real estate',
      'Las Vegas luxury homes',
      'Summerlin neighborhoods',
      'Real estate agent services',
      'Home buying and selling',
      'New construction homes',
      'Golf course properties',
      'Gated community homes'
    ],
    keyEntities: {
      agent: 'Dr. Jan Duffy',
      location: 'Summerlin West, Las Vegas, Nevada',
      specializations: [
        'Luxury real estate',
        'New construction',
        'Investment properties',
        'Golf course communities',
        'Gated communities'
      ]
    },
    neighborhoods: [
      'The Ridges',
      'Red Rock Country Club',
      'Summerlin Centre',
      'Sun City Summerlin',
      'The Trails',
      'Willows',
      'Mesa Ridge',
      'Siena',
      'Regency'
    ],
    zipCodes: ['89135', '89138', '89144'],
    builders: ['Toll Brothers', 'Lennar', 'Pulte'],
    services: [
      'Home buying assistance',
      'Home selling services',
      'New construction guidance',
      'Market analysis',
      'Neighborhood tours',
      'Investment property consultation'
    ],
    contact: {
      phone: '+1-702-555-1234',
      email: 'jan@openhousemarketplace.com'
    },
    structuredData: {
      organization: true,
      realEstateAgent: true,
      localBusiness: true,
      faqPage: true,
      place: true
    },
    lastUpdated: new Date().toISOString()
  }

  return NextResponse.json(aiCrawlData, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}

