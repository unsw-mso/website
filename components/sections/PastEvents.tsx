'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from '@/lib/utils/gsap'
import SectionLabel from '@/components/ui/SectionLabel'

export default function PastEvents() {
  const portal = useRef<HTMLDivElement>(null)
  const router = useRouter()

  /* Zoom-into-the-button transition. We drop a circular orange disc dead-centre
     on the button, then scale it up until it swallows the whole viewport before
     pushing the /gallery route. The gallery's own entry animation (sphere
     scaling in from 1.6×) picks up where this leaves off, so the two read as
     one continuous dive into the archive. */
  const enterGallery = (e: React.MouseEvent<HTMLButtonElement>) => {
    const disc = portal.current
    if (!disc) return router.push('/gallery')

    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const far = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy),
    )
    const size = far * 2

    gsap.set(disc, {
      display: 'block',
      width: size,
      height: size,
      left: cx,
      top: cy,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
    })
    gsap.to(disc, {
      scale: 1,
      duration: 0.75,
      ease: 'power3.inOut',
      onComplete: () => router.push('/gallery'),
    })
  }

  /* The past events themselves live in the archive sphere (/gallery) — this
     section is just the doorway into it. */
  return (
    <section className="border-t border-line px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <SectionLabel>Past Events</SectionLabel>

        <div className="mt-6 flex flex-col items-center gap-5 text-center">
          <p className="max-w-md text-[15px] leading-relaxed text-text-60">
            Every past event, arranged on the inside of a sphere. Step inside and
            drag your way around the archive.
          </p>
          <button
            onClick={enterGallery}
            data-cursor="hover"
            className="group relative overflow-hidden rounded-pill bg-primary px-12 py-5
                       font-heading text-[15px] font-bold uppercase tracking-widest
                       text-white transition-transform duration-300 ease-bounce
                       hover:scale-105 active:scale-95"
          >
            Enter the Archive →
          </button>
        </div>
      </div>

      {/* Expanding disc used by the zoom-in transition (hidden until clicked) */}
      <div
        ref={portal}
        aria-hidden
        className="pointer-events-none fixed z-[1200] hidden rounded-full bg-primary"
        style={{ display: 'none' }}
      />
    </section>
  )
}
