import { Metadata } from 'next'
import Link from 'next/link'
import { School, Award, BookOpen, Users } from 'lucide-react'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Summerlin West Schools | Top-Rated Education & CCSD Area 2',
  description: 'Discover top-rated schools in Summerlin West, Las Vegas. Comprehensive guide to CCSD Area 2 schools, private schools, charter schools, ratings, boundaries, and performance data for families moving to Las Vegas\' premier master-planned community.',
  keywords: 'Summerlin schools, CCSD Area 2, Las Vegas schools, top rated schools Summerlin, Summerlin West schools, best schools Las Vegas, Summerlin school districts, CCSD Area 2 schools, Summerlin education',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/schools',
  },
  openGraph: {
    title: 'Summerlin West Schools | Top-Rated Education Options',
    description: 'Explore top-rated schools serving Summerlin West, Las Vegas.',
    images: ['/images/schools-hero.jpg'],
    url: 'https://www.openhousemarketplace.com/schools',
  }
}

export default function SchoolsPage() {
  const schools = [
    {
      name: 'Palo Verde High School',
      type: 'Public High School',
      rating: 9,
      grades: '9-12',
      enrollment: 2400,
      distance: 'Central Summerlin',
      programs: ['AP Programs', 'Honors', 'Athletics', 'Fine Arts']
    },
    {
      name: 'Doral Academy Red Rock',
      type: 'Charter K-12',
      rating: 8,
      grades: 'K-12',
      enrollment: 1800,
      distance: 'Red Rock Area',
      programs: ['STEM Focus', 'Gifted & Talented', 'Competitive Sports']
    },
    {
      name: 'Alexander Dawson School',
      type: 'Private K-12',
      rating: 10,
      grades: 'K-12',
      enrollment: 500,
      distance: 'Red Rock Area',
      programs: ['IB Program', 'College Prep', 'Arts', 'Athletics']
    },
    {
      name: 'Eldorado High School',
      type: 'Public High School',
      rating: 7,
      grades: '9-12',
      enrollment: 2200,
      distance: 'Eastern Summerlin',
      programs: ['Career & Technical', 'AP', 'Sports']
    }
  ]

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
        type="WebPage"
        data={{
          name: 'Summerlin West Schools | Top-Rated Education & CCSD Area 2',
          description: 'Discover top-rated schools in Summerlin West, Las Vegas. Comprehensive guide to CCSD Area 2 schools, private schools, and charter schools.',
        }}
      />
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-gradient-to-r from-blue-600 to-red-600">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Summerlin West Schools
            </h1>
            <p className="text-xl text-gray-200">
              Top-Rated Education in Las Vegas' Premier Community
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Excellent Education Options in Summerlin West</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            Summerlin West is served by some of the highest-rated schools in the Clark County 
            School District (CCSD) Area 2, along with excellent private and charter school options. 
            Families moving to the area can choose from top-performing public schools, innovative 
            charter schools, and prestigious private institutions that consistently rank among the 
            best in Nevada. The quality of education in Summerlin West is one of the primary reasons 
            why families choose to make this premier master-planned community their home.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The community's commitment to education is reflected in strong test scores, high graduation 
            rates, and comprehensive academic and extracurricular programs that prepare students for 
            college and beyond. CCSD Area 2, which encompasses Summerlin West, consistently ranks 
            among the top-performing school districts in the Las Vegas area, making it an ideal location 
            for families prioritizing quality education.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you're looking for public schools with exceptional academic programs, charter schools 
            with specialized curricula, or private institutions offering personalized education, Summerlin 
            West provides families with access to some of the finest educational opportunities in Las 
            Vegas. The combination of excellent schools, safe neighborhoods, and family-friendly amenities 
            makes Summerlin West the premier choice for families seeking the best in Las Vegas real estate 
            and education.
          </p>
        </div>

        {/* School Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {schools.map((school, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{school.name}</h3>
                  <p className="text-gray-600">{school.type}</p>
                </div>
                <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  <Award className="h-4 w-4 mr-1" />
                  <span className="font-semibold">{school.rating}/10</span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                  <span>Grades: {school.grades}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  <span>Enrollment: {school.enrollment.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <School className="h-5 w-5 mr-2 text-blue-600" />
                  <span>Distance: {school.distance}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Programs:</h4>
                <div className="flex flex-wrap gap-2">
                  {school.programs.map((program, pIndex) => (
                    <span
                      key={pIndex}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {program}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CCSD Area 2 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">CCSD Area 2: Excellence in Education</h2>
          
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              Summerlin West falls within CCSD Area 2, one of the most highly-regarded school districts 
              in Nevada. Known for its strong academic performance, well-funded programs, and exceptional 
              educational outcomes, CCSD Area 2 consistently ranks among the top-performing school districts 
              in the state. This distinction makes Summerlin West an attractive destination for families 
              seeking quality education alongside premium real estate opportunities.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The success of CCSD Area 2 schools is driven by several key factors: dedicated educators, 
              comprehensive curriculum offerings, strong community support, and investment in educational 
              resources. These elements combine to create an educational environment that prepares students 
              for success in college, careers, and life beyond the classroom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Academic Excellence</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• High graduation rates exceeding state averages</li>
                <li>• Strong AP and honors programs preparing students for college</li>
                <li>• Excellent teacher-to-student ratios ensuring personalized attention</li>
                <li>• Comprehensive STEM and arts programs</li>
                <li>• High college acceptance rates</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Programs</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Extensive extracurricular activities including sports and clubs</li>
                <li>• Advanced placement courses in multiple subjects</li>
                <li>• Career and technical education pathways</li>
                <li>• Gifted and talented programs</li>
                <li>• Special education support services</li>
              </ul>
            </div>
          </div>
        </div>

        {/* School Zones */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">School Zones, Boundaries & Enrollment</h2>
          
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding school boundaries is essential when purchasing real estate in Summerlin West. 
              School zones are determined by your specific address within the community, and boundaries can 
              vary even within the same neighborhood. Working with a knowledgeable Las Vegas real estate agent 
              like Dr. Jan Duffy ensures you understand which schools serve specific properties and can make 
              informed decisions about your family's educational priorities.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Each zip code area in Summerlin West is served by different combinations of schools. Whether 
              you're looking at properties in zip code 89135, 89138, or 89144, understanding the school 
              boundaries helps you find the perfect home in the right school district for your children's 
              educational needs.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Explore Schools by Zip Code</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Use our detailed zip code pages to explore schools serving specific areas within Summerlin West:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/zip/89135" className="block bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-2">Zip Code 89135</h4>
                <p className="text-sm text-gray-600">The Ridges, Red Rock Country Club</p>
                <span className="text-blue-600 text-sm mt-2 inline-block">View Schools →</span>
              </Link>
              <Link href="/zip/89138" className="block bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-2">Zip Code 89138</h4>
                <p className="text-sm text-gray-600">Summerlin Centre, The Trails</p>
                <span className="text-blue-600 text-sm mt-2 inline-block">View Schools →</span>
              </Link>
              <Link href="/zip/89144" className="block bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-2">Zip Code 89144</h4>
                <p className="text-sm text-gray-600">Sun City Summerlin</p>
                <span className="text-blue-600 text-sm mt-2 inline-block">View Schools →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Private & Charter Schools */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Private & Charter School Options</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Private Schools in Summerlin West</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                For families seeking private education, Summerlin West offers access to some of the finest 
                private schools in Las Vegas. Institutions like Alexander Dawson School provide exceptional 
                educational experiences with small class sizes, individualized attention, and comprehensive 
                college preparation programs. Private schools in the area typically offer rigorous academic 
                curricula, extensive extracurricular opportunities, and a focus on character development.
              </p>
              <p className="text-gray-700 leading-relaxed">
                While private schools require tuition, many families find the investment worthwhile for the 
                personalized education, enhanced resources, and college preparation these institutions provide. 
                The proximity of top-tier private schools is another factor that makes Summerlin West real 
                estate attractive to families prioritizing education.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Charter Schools & Specialized Programs</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Charter schools like Doral Academy Red Rock offer families alternative educational approaches 
                within the public school system. These schools often focus on specialized curricula, such as 
                STEM education, arts integration, or college preparation, providing families with additional 
                choices for their children's education. Charter schools in CCSD Area 2 consistently perform 
                well and offer innovative programs that complement traditional public school options.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The variety of educational options available to families in Summerlin West—from top-rated 
                public schools to specialized charter schools and prestigious private institutions—ensures 
                that every family can find the right educational fit for their children. This diversity of 
                options, combined with the high quality of all educational institutions in the area, makes 
                Summerlin West an ideal location for families focused on education.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 rounded-lg shadow-md p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Find the Perfect Home Near Great Schools</h2>
          <p className="text-xl mb-6">Let us help you find a home in the right school district for your family.</p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

