import { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'

export const revalidate = 2592000 // ISR: revalidate every 30 days (legal)

export const metadata: Metadata = {
  title: 'Privacy Policy | Open House Market Place',
  description: 'Privacy Policy for Open House Market Place. Learn how we collect, use, and protect your personal information.',
  robots: 'noindex, follow',
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Open House Market Place',
    description: 'Privacy Policy for Open House Market Place. Learn how we collect, use, and protect your personal information.',
    url: 'https://www.openhousemarketplace.com/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: 'https://www.openhousemarketplace.com/' },
            { name: 'Privacy Policy', url: 'https://www.openhousemarketplace.com/privacy-policy' },
          ],
        }}
      />
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
              <p>
                Open House Market Place ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
              <p>We may collect information about you in various ways:</p>
              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fill out a contact form</li>
                <li>Register for property alerts</li>
                <li>Schedule a property tour</li>
                <li>Subscribe to our newsletter</li>
              </ul>
              <p className="mt-4">This information may include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information (email, phone number)</li>
                <li>Property preferences and search criteria</li>
                <li>Real estate goals and timeline</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">Automatically Collected Information</h3>
              <p>We automatically collect certain information when you visit our website, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address and browser type</li>
                <li>Pages you visit and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Device information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send you property listings and market updates</li>
                <li>Personalize your experience on our website</li>
                <li>Analyze usage patterns and trends</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Information Sharing</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share 
              your information in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With service providers who assist in our operations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal 
                information. However, no method of transmission over the Internet or electronic storage 
                is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and receive a copy of your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and 
                store certain information. You can instruct your browser to refuse all cookies or to 
                indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at:</p>
              <p>
                <strong>Email:</strong> privacy@openhousemarketplace.com<br />
                <strong>Phone:</strong> (702) 200-3422<br />
                <strong>Address:</strong> [Your Business Address]
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

