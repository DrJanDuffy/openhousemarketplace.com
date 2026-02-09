import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Test Form',
  description: 'Internal test form for lead submission.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.openhousemarketplace.com/test-form' },
}

export default function TestFormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
