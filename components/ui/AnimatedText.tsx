'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/utils/gsap'

export default function AnimatedText({
  children,
  className = '',
  delay = 0,
  /** Distance in px the block travels upward as it appears. */
  y = 28,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration: 0.85,
        // power3.out is a plain decelerate — no overshoot. Body text that
        // bounces looks unstable; save the bounce for headings and cards.
        ease: 'power3.out',
        delay,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}