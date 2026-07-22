'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/utils/gsap'
import SectionLabel from '@/components/ui/SectionLabel'
import SplitText from '@/components/ui/SplitText'
import AnimatedText from '@/components/ui/AnimatedText'
import TigerPlaceholder from '@/components/ui/TigerPlaceholder'

export default function TigerFall() {
  const section = useRef<HTMLElement>(null)
  const tiger = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      /* Scrubbed timeline with THREE keyframe positions, per your spec:
         top of section → middle → bottom.

         Note this is NOT pinned. The section scrolls normally; only the
         tiger's position within it is driven by scroll progress. That's
         a lighter, less disorienting effect than a second pin so soon
         after the hero.

         start 'top bottom' = begin as the section's top enters from below
         end   'bottom top' = finish as its bottom exits past the top,
         which spreads the fall across the section's entire time on screen. */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
        },
      })

      tl
        // Position 1 → 2: falls to mid-height, tumbling clockwise
        .fromTo(
          tiger.current,
          { yPercent: -10, rotate: -14, xPercent: 0 },
          { yPercent: 45, rotate: 12, xPercent: -18, ease: 'none' },
        )
        // Position 2 → 3: continues to the bottom, rotation eases back
        .to(tiger.current, {
          yPercent: 95,
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
      className="relative min-h-[760px] overflow-hidden px-6 py-32
                 md:px-12 md:py-40"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-2 md:gap-16">
        <div className="self-center">
          <SectionLabel>The Mascot</SectionLabel>
          <SplitText
            text="Meet your people."
            className="mt-6 font-heading text-[clamp(40px,5vw,76px)] font-bold
                       uppercase leading-[1.02] tracking-tight text-text"
          />
          <AnimatedText delay={0.15}>
            <p data-cursor="text"
               className="mt-7 max-w-md text-lg leading-relaxed text-text-muted">
              400+ members, one big family. Wherever you&apos;re from in
              Malaysia — or beyond — there&apos;s a seat at our table.
            </p>
          </AnimatedText>
        </div>

        {/* Fixed-height track the tiger falls through. Without an explicit
            min-height the absolutely-positioned tiger has nothing to
            travel within and the percentages collapse. */}
        <div className="relative min-h-[560px] md:min-h-[640px]">
          <div
            ref={tiger}
            className="absolute right-[12%] top-0 w-[160px] md:w-[220px]"
            // will-change promotes this to its own GPU layer so the
            // browser doesn't repaint the whole section every frame
            style={{ willChange: 'transform' }}
          >
            <TigerPlaceholder className="h-auto w-full drop-shadow-2xl" />
            {/* REPLACE with the real asset when it arrives:
                <Image src="/images/tiger-3d.png" alt="MSO tiger mascot"
                       width={440} height={440} className="h-auto w-full" /> */}
          </div>
        </div>
      </div>
    </section>
  )
}