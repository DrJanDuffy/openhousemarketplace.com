import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer | Open House Marketplace',
  description: 'Legal disclaimer for Open House Marketplace. Important information about the use of our website and services.',
  robots: 'noindex, follow',
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Disclaimer</h1>
          <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. General Information</h2>
              <p>
                The information contained on this website is for general information purposes only. 
                While we endeavor to keep the information up to date and correct, we make no 
                representations or warranties of any kind, express or implied, about the completeness, 
                accuracy, reliability, suitability, or availability with respect to the website or the 
                information, products, services, or related graphics contained on the website for any purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Real Estate Listings</h2>
              <p>
                All property information, including but not limited to prices, square footage, lot sizes, 
                and features, is provided for informational purposes only and is subject to change without 
                notice. Property availability, pricing, and features are not guaranteed and should be 
                verified independently. We do not warrant the accuracy of any listing information provided 
                by third parties, including the MLS or other data sources.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. No Professional Advice</h2>
              <p>
                The information on this website does not constitute legal, financial, or professional 
                real estate advice. You should consult with qualified professionals regarding any real 
                estate, legal, or financial matters. Any reliance you place on such information is 
                therefore strictly at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Market Data and Statistics</h2>
              <p>
                Market statistics, trends, and analysis provided on this website are estimates based on 
                available data and are subject to change. Past performance does not guarantee future results. 
                Real estate markets are subject to fluctuations, and property values may increase or 
                decrease over time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. External Links</h2>
              <p>
                Through this website, you are able to link to other websites which are not under the 
                control of Open House Marketplace. We have no control over the nature, content, and 
                availability of those sites. The inclusion of any links does not necessarily imply a 
                recommendation or endorse the views expressed within them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Limitation of Liability</h2>
              <p>
                In no event will Open House Marketplace, Dr. Jan Duffy, or any of our affiliates, agents, 
                or representatives be liable for any loss or damage including without limitation, indirect 
                or consequential loss or damage, or any loss or damage whatsoever arising from loss of 
                data or profits arising out of, or in connection with, the use of this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Fair Housing</h2>
              <p>
                Open House Marketplace and Dr. Jan Duffy are committed to providing equal housing 
                opportunities. We do not discriminate on the basis of race, color, religion, sex, 
                handicap, familial status, or national origin. All properties are subject to the 
                Federal Fair Housing Act.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Equal Housing Opportunity</h2>
              <p>
                We support equal housing opportunity and encourage users of our site to follow 
                applicable federal, state, and local laws, including fair housing and equal opportunity 
                laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Contact Information</h2>
              <p>For questions about this disclaimer, please contact:</p>
              <p>
                <strong>Email:</strong> contact@openhousemarketplace.com<br />
                <strong>Phone:</strong> (702) 555-1234
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

