'use client'

import { useState } from 'react'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQItem[]
  title?: string
  className?: string
}

export default function FAQAccordion({ faqs, title = 'Frequently Asked Questions', className = '' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{title}</h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            >
              {/* aria-expanded is intentionally dynamic; value is valid 'true' | 'false' per ARIA */}
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index ? 'true' : 'false'}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span className="text-lg font-semibold text-gray-900">
                  <span className="text-blue-600 mr-2">Q:</span>
                  {faq.question}
                </span>
                <span className="shrink-0 text-gray-500 text-xl" aria-hidden>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`overflow-hidden transition-all duration-200 ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-4 pt-0">
                  <p className="text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                    <span className="text-red-600 mr-2 font-semibold">A:</span>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
