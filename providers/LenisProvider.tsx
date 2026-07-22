'use client'

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/utils/gsap'

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Create the smooth-scroll engine. Higher duration = floatier feel,
    // The easing is an exponential
    // ease-out: fast start, long soft glide to a stop.
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    // Every time Lenis moves the page, tell ScrollTrigger to recalculate.
    // Without this, all scrub animations desync from the visible scroll.
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker instead of its own rAF loop, so both
    // libraries share ONE frame loop. GSAP passes seconds, Lenis wants ms.
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)

    // Lag smoothing makes GSAP "catch up" after a frame drop, which
    // yanks scrubbed animations out of sync. Off for scroll-driven work.
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}