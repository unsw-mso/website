'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/utils/gsap'

export default function HeroSection() {
  const section = useRef<HTMLElement>(null)
  const photo = useRef<HTMLDivElement>(null)
  const titleA = useRef<HTMLDivElement>(null)   // MALAYSIAN STUDENTS ORGANISATION
  const titleB = useRef<HTMLDivElement>(null)   // UNSW MSO
  const cue = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      /* ==========================================================
         PART 1 — ENTRANCE (plays once on load, not scroll-driven)
         ========================================================== */

      // A timeline groups tweens on a shared clock. Positions like '-=0.7'
      // mean "start 0.7s BEFORE the previous tween ends", which is how you
      // get overlapping, natural-feeling sequences instead of a queue.
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })

      intro
        .from(photo.current, { opacity: 0, scale: 1.08, duration: 1.2 })
        // The title lines rise out of their masks, staggered
        .from(
          '[data-hero-line]',
          { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.08,
            ease: 'back.out(1.3)' },
          '-=0.9',
        )
        .from('[data-hero-sub]', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(cue.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')

      /* ==========================================================
         PART 2 — THE PINNED SCROLL TRANSFORMATION
         ==========================================================
         How pinning works: ScrollTrigger measures the section, then
         when its top hits the top of the viewport it switches the
         element to position:fixed and inserts a spacer div of equal
         height below it. The page keeps scrolling — you just can't
         see it, because the section is stuck.

         end: '+=100%' means "pin for one extra viewport height of
         scrolling". Section is 100vh + 100vh of pinned scroll = the
         200vh total your spec asked for. Writing it as '+=100%'
         instead of a hardcoded pixel value means it stays correct
         when the user resizes or rotates their phone.

         scrub: 1.2 ties animation progress to scroll position, with
         1.2 seconds of catch-up smoothing. Without scrub the timeline
         would fire once and play at its own speed; WITH it, scrolling
         back up rewinds the animation. The 1.2 is what makes it feel
         weighty rather than glued to the scrollbar.
         ========================================================== */
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1.2,
          // Prevents a 1px gap appearing under the pinned section in
          // some browsers due to subpixel rounding.
          anticipatePin: 1,
        },
      })

      scrollTl
        // Photo shrinks and its corners round off. Because the timeline
        // is scrubbed, position 0 and duration 1 are ARBITRARY UNITS —
        // they describe proportions of the scroll distance, not seconds.
        .to(photo.current, { scale: 0.75, borderRadius: 32, ease: 'none' }, 0)
        // First title fades and drifts up, finishing at 60% of the scroll
        .to(titleA.current, { opacity: 0, y: -30, ease: 'none', duration: 0.6 }, 0)
        // Second title starts at 30% progress and overlaps the first's exit
        .fromTo(
          titleB.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: 'none', duration: 0.5 },
          0.3,
        )
        // Scroll cue disappears early — it's done its job
        .to(cue.current, { opacity: 0, ease: 'none', duration: 0.25 }, 0)

      /* ==========================================================
         PART 3 — REFRESH AFTER THE PHOTO LOADS
         ==========================================================
         ScrollTrigger caches element positions on creation. A large
         hero image that finishes decoding afterwards can shift the
         layout, leaving every trigger on the page measuring against
         stale numbers. This is THE most common cause of "my scroll
         animations fire at the wrong time" — refresh once the window
         load event fires and everything is settled.
         ========================================================== */
      const onLoad = () => ScrollTrigger.refresh()
      window.addEventListener('load', onLoad)
      return () => window.removeEventListener('load', onLoad)
    },
    { scope: section },
  )

  const titleLines = ['Malaysian', 'Students', 'Organisation']

  return (
    <section
      ref={section}
      className="relative h-screen w-full overflow-hidden bg-[#1a1008]"
    >
      {/* Photo wrapper is what GSAP scales — never the <Image> itself,
          because next/image manages its own inline styles. */}
      <div ref={photo} className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/committee.jpg"
          alt="The UNSW MSO committee on the UNSW campus steps"
          fill
          // priority = preload it. This is the Largest Contentful Paint
          // element, so it must not lazy-load.
          priority
          // Tells the browser the image is full-viewport width, so it
          // picks the right size from the generated srcset.
          sizes="100vw"
          // 'center 38%' keeps the faces in frame when the viewport is
          // taller than it is wide. Your photo is 3:2 with faces in the
          // upper-middle; a plain 'center' crop cuts foreheads on mobile.
          className="object-cover object-[center_38%]"
        />
        {/* Gradient: transparent at top so faces stay visible,
            heavy at bottom so the type has something to sit on. */}
        <div className="absolute inset-0 bg-gradient-to-b
                        from-black/20 via-black/45 to-black/85" />
      </div>

      {/* ---- Title A ---- */}
      <div
        ref={titleA}
        className="absolute inset-0 flex flex-col items-center justify-center
                   gap-6 px-6 text-center"
      >
        <h1 className="font-heading text-[clamp(48px,8vw,96px)] font-bold
                       uppercase leading-[0.95] tracking-tight text-[#F5F0E8]">
          {titleLines.map((line) => (
            // Each line gets its own overflow-hidden mask for the
            // rise-from-below entrance
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <span data-hero-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>
        <span
          data-hero-sub
          className="font-heading text-[15px] uppercase tracking-[0.5em]
                     text-[#F5F0E8]/45"
        >
          UNSW · Sydney
        </span>
      </div>

      {/* ---- Title B (revealed on scroll) ---- */}
      <div
        ref={titleB}
        className="absolute inset-0 flex flex-col items-center justify-center
                   gap-4 px-6 text-center opacity-0"
      >
        <h2 className="font-heading text-[clamp(56px,10vw,112px)] font-bold
                       uppercase leading-none tracking-tight text-primary">
          UNSW MSO
        </h2>
        <p className="text-base text-[#F5F0E8]/60">Malaysia&apos;s home at UNSW</p>
      </div>

      {/* ---- Scroll cue ---- */}
      <div
        ref={cue}
        className="absolute bottom-9 left-1/2 flex -translate-x-1/2
                   flex-col items-center gap-2"
      >
        <span className="h-14 w-px bg-[#F5F0E8]/50" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
      </div>
    </section>
  )
}