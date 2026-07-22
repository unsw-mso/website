'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/utils/gsap'

interface SplitTextProps {
  text: string
  className?: string
  /** Seconds between each word starting. Lower = tighter, snappier. */
  stagger?: number
  /** Delay before the whole thing begins. */
  delay?: number
  /** Where in the viewport the reveal fires. "top 85%" = element's top
   *  hits 85% down the screen (i.e. just as it scrolls into view). */
  start?: string
}

export default function SplitText({
  text,
  className = '',
  stagger = 0.07,
  delay = 0,
  start = 'top 85%',
}: SplitTextProps) {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Each word sits inside an overflow-hidden mask. Animating the
      // INNER span upward from below the mask creates the "words rise
      // out of nowhere" effect — no clip-path needed, and it's cheaper
      // because the browser only composites a transform.
      gsap.from('[data-word-inner]', {
        yPercent: 130,       // start fully below its own mask
        rotate: 4,           // slight tilt so it feels tossed, not slid
        opacity: 0,
        duration: 0.9,
        // back.out overshoots past the final position then settles —
        // this single easing choice is most of the "bouncy" character
        ease: 'back.out(1.4)',
        stagger,
        delay,
        scrollTrigger: {
          trigger: container.current,
          start,
          once: true,        // reveal once; re-triggering feels gimmicky
        },
      })
    },
    { scope: container },
  )

  // Split on spaces in JSX rather than mutating the DOM after mount.
  // This keeps the text present in the server-rendered HTML, so it's
  // readable by screen readers and crawlers even before JS runs.
  const words = text.split(' ')

  return (
    <div ref={container} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          // inline-block + overflow-hidden = the mask.
          // Bottom padding stops descenders (g, y, p) being clipped.
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <span data-word-inline className="inline-block">
            <span data-word-inner className="inline-block">
              {word}
            </span>
            {/* Real space character so word spacing survives the split */}
            {i < words.length - 1 && '\u00A0'}
          </span>
        </span>
      ))}
    </div>
  )
}