'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/utils/gsap'
import SectionLabel from '@/components/ui/SectionLabel'
import TigerPlaceholder from '@/components/ui/TigerPlaceholder'
import { upcomingEvents } from '@/lib/data/events'

export default function UpcomingEvents() {
  const section = useRef<HTMLElement>(null)
  const tiger = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      /* CARDS FLOAT IN FROM THE RIGHT
         gsap.utils.toArray types the NodeList and lets us build one
         ScrollTrigger per card. Separate triggers (rather than one
         staggered batch like the home page) because these cards are
         spread over a tall column — a single trigger would fire them
         all while most are still far below the fold. */
      const cards = gsap.utils.toArray<HTMLElement>('[data-event-row]')

      cards.forEach((card) => {
        gsap.from(card, {
          x: 120,
          opacity: 0,
          duration: 0.9,
          ease: 'back.out(1.2)',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        })
      })

      /* TIGER IDLE BOB
         The tiger is position:sticky (pure CSS — no JS needed for the
         sticking). This just adds a slow float so it doesn't look
         frozen while cards stream past it.
         yoyo + repeat:-1 = bob up, bob down, forever. */
      gsap.to(tiger.current, {
        y: -14,
        rotate: 2,
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    },
    { scope: section },
  )

  return (
    <section ref={section} className="px-6 pb-40 pt-8 md:px-12">
      <div className="mx-auto max-w-[1440px]">
        <SectionLabel>Upcoming</SectionLabel>

        <div className="mt-14 grid gap-12 md:grid-cols-[35%_1fr] md:items-start md:gap-16">
          {/* STICKY TIGER — hidden on mobile where there's no room for it
              to "present" anything and it would just eat a screenful. */}
          <div className="hidden md:block md:sticky md:top-[20vh]">
            <div ref={tiger} className="w-full max-w-[340px]">
              <TigerPlaceholder flip className="h-auto w-full drop-shadow-2xl" />
              {/* Real asset: /images/tiger-pointing.png, flipped so he
                  gestures toward the card column on the right */}
            </div>
            <p className="mt-5 max-w-[280px] text-sm leading-relaxed text-text-muted">
              Four events this term. He&apos;s excited about all of them.
            </p>
          </div>

          {/* CARD COLUMN */}
          <div className="flex flex-col gap-9">
            {upcomingEvents.map((event) => (
              <article
                key={event.id}
                data-event-row
                data-cursor="hover"
                className="group grid overflow-hidden rounded-lg border border-line
                           border-l-[3px] border-l-primary bg-surface
                           transition-all duration-300 ease-bounce
                           hover:-translate-y-1 hover:shadow-glow
                           md:grid-cols-[280px_1fr]"
              >
                <div className="relative min-h-[200px] overflow-hidden">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      className="object-cover transition-transform duration-500
                                 ease-soft group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center"
                      style={{
                        background:
                          'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 65%, var(--surface-2) 100%)',
                      }}
                    >
                      <span className="font-heading text-7xl font-bold text-white/25">
                        {event.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3.5 p-8 md:p-9">
                  <h3 className="font-heading text-[28px] font-bold uppercase
                                 tracking-tight text-text">
                    {event.title}
                  </h3>
                  <span className="font-heading text-[13px] uppercase
                                   tracking-widest text-primary">
                    {event.date} · {event.location}
                  </span>
                  <p data-cursor="text" className="leading-relaxed text-text-60">
                    {event.description}
                  </p>
                  <div className="mt-2">
                    <Link
                      href={event.registrationLink ?? '#'}
                      data-cursor="hover"
                      className="inline-block rounded-pill bg-primary px-8 py-3
                                 font-heading text-[13px] font-bold uppercase
                                 tracking-widest text-white transition-transform
                                 duration-300 ease-bounce hover:scale-105
                                 active:scale-95"
                    >
                      Register →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}