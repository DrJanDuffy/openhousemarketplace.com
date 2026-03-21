'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

/** Fires once when the element intersects the viewport (with optional rootMargin prefetch). */
export function useInViewOnce(rootMargin = '240px 0px'): {
  ref: RefObject<HTMLDivElement | null>
  inView: boolean
} {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { rootMargin, threshold: 0.01 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [inView, rootMargin])

  return { ref, inView }
}
