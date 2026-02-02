import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Test Form',
  description: 'Internal test form for lead submission.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function TestFormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
