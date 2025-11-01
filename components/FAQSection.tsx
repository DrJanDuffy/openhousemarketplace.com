'use client'

import StructuredData from './StructuredData'

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
  className?: string
}

export default function FAQSection({ faqs, title = 'Frequently Asked Questions', className = '' }: FAQSectionProps) {
  return (
    <>
      <StructuredData 
        type="FAQPage"
        data={{ faqs }}
      />
      <section className={`py-12 ${className}`}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{title}</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  <span className="text-blue-600 mr-2">Q:</span>
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  <span className="text-red-600 mr-2 font-semibold">A:</span>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

