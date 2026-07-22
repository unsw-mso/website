'use client'

import { useRef, useState } from 'react'
import { ScrollTrigger, useGSAP } from '@/lib/utils/gsap'
import SplashCursor from '@/components/SplashCursor'

/**
 * SplashCursor is a full-screen fluid simulation running on the GPU
 * every frame. Leaving it mounted for the whole page would burn battery
 * and drag framerate on every other section.
 *
 * We watch the hero with a ScrollTrigger and mount the component only
 * while the hero is in view. onEnter/onEnterBack cover scrolling down
 * into it and back up into it respectively.
 */
export default function HeroSplash({ targetId }: { targetId: string }) {
  const [active, setActive] = useState(true)
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // No WebGL fluid sim on touch devices — there's no hover to drive it
    // and it's the single most expensive thing on the page.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setActive(false)
      return
    }

    ScrollTrigger.create({
      trigger: `#${targetId}`,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => setActive(true),
      onEnterBack: () => setActive(true),
      onLeave: () => setActive(false),
      onLeaveBack: () => setActive(false),
    })
  }, [targetId])

  if (!active) return null

  return (
    <div ref={scope} className="pointer-events-none fixed inset-0 z-[40]">
      <SplashCursor
        SPLAT_RADIUS={0.25}
        SPLAT_FORCE={6500}
        DENSITY_DISSIPATION={4}
        CURL={2.5}
        TRANSPARENT
        // Brand orange instead of the default rainbow
        RAINBOW_MODE={false}
        COLOR="#FF6B00"
        BACK_COLOR={{ r: 0, g: 0, b: 0 }}
      />
    </div>
  )
}