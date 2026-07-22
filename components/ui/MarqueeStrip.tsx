'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/utils/gsap'

interface MarqueeProps {
  items: React.ReactNode[]
  /** Seconds for one full loop. Higher = slower. */
  speed?: number
  className?: string
  itemClassName?: string
  /** Slow to a crawl on hover rather than stopping dead. */
  slowOnHover?: boolean
}

export default function MarqueeStrip({
  items,
  speed = 22,
  className = '',
  itemClassName = '',
  slowOnHover = true,
}: MarqueeProps) {
  const container = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const tween = useRef<gsap.core.Tween | null>(null)

  useGSAP(
    () => {
      // THE CORE TRICK: we render the item list TWICE inside the track.
      // Animating xPercent from 0 to -50 scrolls exactly one copy's width.
      // At -50 the second copy sits precisely where the first began, so
      // when the tween loops back to 0 the jump is invisible.
      //
      // This is why it must be -50 and the content must be duplicated
      // exactly twice — any other number produces a visible snap.
      tween.current = gsap.to(track.current, {
        xPercent: -50,
        duration: speed,
        ease: 'none',      // constant speed; any easing would pulse
        repeat: -1,        // forever
      })
    },
    { scope: container },
  )

  const onEnter = () => {
    if (slowOnHover && tween.current) {
      // timeScale 0.25 = quarter speed. Tweening the timeScale itself
      // means it eases into slow motion instead of lurching.
      gsap.to(tween.current, { timeScale: 0.25, duration: 0.6 })
    }
  }
  const onLeave = () => {
    if (slowOnHover && tween.current) {
      gsap.to(tween.current, { timeScale: 1, duration: 0.6 })
    }
  }

  return (
    <div
      ref={container}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`overflow-hidden ${className}`}
    >
      <div ref={track} className="flex w-max">
        {/* Copy A and copy B — aria-hidden on the duplicate so screen
            readers don't announce everything twice. */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {items.map((item, i) => (
              <span key={i} className={`shrink-0 ${itemClassName}`}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}