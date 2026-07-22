'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap, useGSAP } from '@/lib/utils/gsap'
import SectionLabel from '@/components/ui/SectionLabel'
import EventCard from '@/components/cards/EventCard'
import { upcomingEvents } from '@/lib/data/events'

export default function EventsPreview() {
  const section = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      /* Batch reveal. One gsap.from over a NodeList with `stagger`
         creates a single tween handling all three cards — far cheaper
         than three separate ScrollTriggers, and guarantees the cards
         arrive in order regardless of scroll speed. */
      gsap.from('[data-event-card]', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.3)',
        stagger: 0.12,
        scrollTrigger: {
          trigger: section.current,
          start: 'top 78%',
          once: true,
        },
      })
    },
    { scope: section },
  )

  return (
    <section ref={section} className="px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <SectionLabel>Upcoming Events</SectionLabel>

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {upcomingEvents.slice(0, 3).map((event) => (
            <div key={event.id} data-event-card>
              <EventCard event={event} />
            </div>
          ))}
        </div>

        <Link
          href="/events"
          data-cursor="hover"
          className="group mt-11 inline-flex items-center gap-2 font-heading
                     text-[15px] font-bold uppercase tracking-widest text-primary"
        >
          View All Events
          <span className="transition-transform duration-300 ease-bounce
                           group-hover:translate-x-2">→</span>
        </Link>
      </div>
    </section>
  )
}