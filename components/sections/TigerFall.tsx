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

  useGSAP(
    () => {
      /* PINNED FALL — the section sticks to the viewport while the tiger
         falls down the screen, so it "follows the view" instead of
         scrolling past. Same pinning mechanism as the hero
         (HeroSection.tsx) and the merch video hero.

         start 'top top' = pin once the section's top reaches the top of
         the viewport. end '+=150%' = hold the pin for 1.5 extra viewport
         heights of scrolling; raise it for a slower / longer fall, lower
         it for a quicker one. anticipatePin avoids a subpixel gap under
         the pinned section on some browsers.

         The fall distance is driven in VIEWPORT-relative pixels (a
         function so it re-measures on every ScrollTrigger refresh /
         resize) rather than yPercent, so the enlarged tiger always
         traverses the full screen height regardless of its own size. */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1.4,
          anticipatePin: 1,
        },
      })

      // How far down the screen the tiger travels (top → near bottom).
      const fall = () => window.innerHeight * 0.72

      tl
        // Position 1 → 2: falls to mid-height, tumbling clockwise
        .fromTo(
          tiger.current,
          { y: () => -fall() * 0.12, rotate: -14, xPercent: 0 },
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

        {/* Full-height track the tiger falls through. While the section is
            pinned this spans the viewport, giving the absolutely-positioned
            tiger the room it needs to fall the whole screen height. */}
        <div className="relative min-h-[70vh] md:min-h-screen">
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