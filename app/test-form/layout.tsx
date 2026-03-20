import { Metadata } from 'next'
import { BASE_URL } from '@/lib/metadata-utils'


export const metadata: Metadata = {
  title: 'Test Form',
  description: 'Internal test form for lead submission.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${BASE_URL}/test-form` },
}

export default function TestFormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
