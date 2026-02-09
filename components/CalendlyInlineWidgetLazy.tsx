'use client'

import dynamic from 'next/dynamic'

const CalendlyInlineWidget = dynamic(
  () => import('@/components/CalendlyInlineWidget'),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[700px] max-w-2xl mx-auto rounded-xl bg-gray-100 animate-pulse"
        aria-hidden
      />
    ),
  }
)

type CalendlyInlineWidgetLazyProps = {
  url?: string
  minWidth?: number
  height?: number
  className?: string
}

export default function CalendlyInlineWidgetLazy({
  url,
  minWidth,
  height,
  className,
}: CalendlyInlineWidgetLazyProps) {
  return (
    <CalendlyInlineWidget
      url={url}
      minWidth={minWidth}
      height={height}
      className={className}
    />
  )
}
