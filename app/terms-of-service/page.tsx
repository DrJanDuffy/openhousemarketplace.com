import { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'

export const revalidate = 2592000 // ISR: revalidate every 30 days (legal)

export const metadata: Metadata = {
  title: 'Terms of Service | Open House Marketplace',
  description: 'Terms of Service for Open House Marketplace. Please read these terms carefully before using our services.',
  robots: 'noindex, follow',
}

export default function TermsOfServicePage() {
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to these terms, please do not 
                use this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on Open House 
                Marketplace's website for personal, non-commercial transitory viewing only. This is 
                the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Real Estate Information</h2>
              <p>
                All real estate information provided on this website is for informational purposes only. 
                While we strive to ensure accuracy, we do not guarantee the completeness or accuracy of 
                any property information. Property availability, prices, and features are subject to change 
                without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Limitation of Liability</h2>
              <p>
                In no event shall Open House Marketplace or Dr. Jan Duffy be liable for any damages 
                (including, without limitation, damages for loss of data or profit, or due to business 
                interruption) arising out of the use or inability to use the materials on this website, 
                even if authorized representative has been notified orally or in writing of the possibility 
                of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Revisions and Errata</h2>
              <p>
                The materials appearing on Open House Marketplace's website could include technical, 
                typographical, or photographic errors. We do not warrant that any of the materials on 
                its website are accurate, complete, or current.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Links</h2>
              <p>
                Open House Marketplace has not reviewed all of the sites linked to our website and is 
                not responsible for the contents of any such linked site. The inclusion of any link does 
                not imply endorsement by Open House Marketplace. Use of any such linked website is at 
                the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> contact@openhousemarketplace.com<br />
                <strong>Phone:</strong> (702) 905-1222
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

