'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/utils/gsap'
import SectionLabel from '@/components/ui/SectionLabel'
import SplitText from '@/components/ui/SplitText'
import AnimatedText from '@/components/ui/AnimatedText'

export default function TigerFall() {
  const section = useRef<HTMLElement>(null)
  const tiger = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      /* SCROLL-SCRUBBED FALL — no pinning, the page keeps scrolling
         normally. As the section travels up through the viewport the
         tiger drops down its track, so it reads as falling while you
         scroll past.

         start 'top 80%' = begins as the section comes into view.
         end 'bottom bottom' = finishes when the section's bottom reaches
         the bottom of the viewport, so the tiger ends its fall low on the
         screen (rather than up near the top, which is where it landed
         when the fall ran on until the section had mostly scrolled away).
         scrub ties progress to scroll position (scrolling back up rewinds).

         The fall distance is the track height minus the tiger's own
         height (a function so it re-measures on every refresh / resize),
         so the tiger lands at the bottom of its track instead of being
         clipped by the section's overflow-hidden. */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: 1.4,
        },
      })

      // How far the tiger travels from the top of its track to the bottom.
      const fall = () =>
        Math.max(0, (track.current?.offsetHeight ?? 0) - (tiger.current?.offsetHeight ?? 0))

      tl
        // Position 1 → 2: falls to mid-height, tumbling clockwise
        .fromTo(
          tiger.current,
          { y: 0, rotate: -14, xPercent: 0 },
          { y: () => fall() * 0.5, rotate: 12, xPercent: -18, ease: 'none' },
        )
        // Position 2 → 3: continues to the bottom, rotation eases back
        .to(tiger.current, {
          y: fall,
          rotate: -6,
          xPercent: 4,
          ease: 'none',
        })
    },
    { scope: section },
  )

  return (
    <section
      ref={section}
      className="relative min-h-screen overflow-hidden px-6 py-32
                 md:px-12 md:py-40"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-2 md:gap-16">
        <div className="self-center">
          <SectionLabel>The Mascot</SectionLabel>
          <SplitText
            text="Meet Harimeow."
            className="mt-6 font-heading text-[clamp(40px,5vw,76px)] font-bold
                       uppercase leading-[1.02] tracking-tight text-text"
          />
          <AnimatedText delay={0.15}>
            <p
              className="mt-7 max-w-md text-lg leading-relaxed text-text-muted">
              Our beloved mascot and the biggest cheerleader for the 
              MSO family! Join 700+ members who make our community fun, welcoming,
              and full of unforgettable memories. No matter where you&apos;re from, 
              Harimeow and the team is ready to welcome you.
            </p>
          </AnimatedText>
        </div>

        {/* Full-height track the tiger falls through, giving the
            absolutely-positioned tiger room to drop as the page scrolls. */}
        <div ref={track} className="relative min-h-[70vh] md:min-h-screen">
          <div
            ref={tiger}
            className="absolute right-[8%] top-0 w-[320px] md:w-[440px]"
            // will-change promotes this to its own GPU layer so the
            // browser doesn't repaint the whole section every frame
            style={{ willChange: 'transform' }}
          >
            <Image
              src="/images/harimeow-home.png"
              alt="MSO harimeow mascot"
              width={1141}
              height={1037}
              className="h-auto w-full drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
