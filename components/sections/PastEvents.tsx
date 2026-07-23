'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { gsap, useGSAP } from '@/lib/utils/gsap'
import SectionLabel from '@/components/ui/SectionLabel'
import { pastEvents } from '@/lib/data/events'

export default function PastEvents() {
  const section = useRef<HTMLElement>(null)
  const portal = useRef<HTMLDivElement>(null)
  const router = useRouter()

  /* Zoom-into-the-button transition. We drop a circular orange disc dead-centre
     on the button, then scale it up until it swallows the whole viewport before
     pushing the /gallery route. The gallery's own entry animation (sphere
     scaling in from 1.6×) picks up where this leaves off, so the two reads as
     one continuous dive into the archive. */
  const enterGallery = (e: React.MouseEvent<HTMLButtonElement>) => {
    const disc = portal.current
    if (!disc) return router.push('/gallery')

    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    // radius needed to reach the farthest viewport corner from the button
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

  useGSAP(
    () => {
      /* Grid reveal. stagger as an OBJECT rather than a number gives us
         'grid' mode: GSAP infers the row/column layout and ripples the
         animation diagonally from the top-left instead of strictly
         left-to-right. Much nicer on a 3-column grid. */
      gsap.from('[data-past-card]', {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        ease: 'back.out(1.3)',
        stagger: { each: 0.08, grid: 'auto', from: 'start' },
        scrollTrigger: { trigger: section.current, start: 'top 80%', once: true },
      })
    },
    { scope: section },
  )

  return (
    <section ref={section} className="border-t border-line px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <SectionLabel>Past Events</SectionLabel>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pastEvents.map((event) => (
            <div
              key={event.id}
              data-past-card
              data-cursor="hover"
              className="group relative aspect-[4/3] overflow-hidden rounded-lg
                         border border-line transition-all duration-300 ease-bounce
                         hover:scale-[1.03] hover:border-primary hover:shadow-glow"
            >
              {event.imageUrl ? (
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500
                             ease-soft group-hover:scale-105"
                />
              ) : (
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--surface-2) 0%, var(--primary-dark) 140%)',
                  }}
                />
              )}

              {/* Caption sits on a gradient so text stays legible over
                  any photo you eventually drop in. */}
              <div className="absolute inset-x-0 bottom-0 flex items-baseline
                              justify-between gap-4 bg-gradient-to-t
                              from-black/90 to-transparent p-6">
                <span className="font-heading text-[17px] font-bold uppercase
                                 tracking-tight text-[#F5F0E8]">
                  {event.title}
                </span>
                <span className="font-heading text-[13px] text-[#F5F0E8]/60">
                  {event.year}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Portal into the spherical archive */}
        <div className="mt-16 flex flex-col items-center gap-5 text-center">
          <p className="max-w-md text-[15px] leading-relaxed text-text-60">
            Every past event, arranged on the inside of a sphere. Step inside and
            drag your way around the archive.
          </p>
          <button
            onClick={enterGallery}
            data-cursor="hover"
            className="group relative overflow-hidden rounded-pill bg-primary px-9 py-4
                       font-heading text-[13px] font-bold uppercase tracking-widest
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