'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap, useGSAP } from '@/lib/utils/gsap'
import SectionLabel from '@/components/ui/SectionLabel'
import FlexCarousel, {
  type FlexCarouselControl,
  type FlexCarouselItem,
} from '@/components/ui/FlexCarousel'
import { pastEvents, eventImage } from '@/lib/data/events'

// pastEvents keeps lib/data/events.ts order, which is newest-first
const RECENT: FlexCarouselItem[] = pastEvents.slice(0, 10).map((event) => ({
  src: eventImage(event),
  alt: event.title,
  title: event.title,
  subtitle: `${event.date} ${event.year}`,
}))

// Viewport-heights of scroll spent on each card while pinned
const SCROLL_PER_CARD = 0.35

export default function EventsPreview() {
  const section = useRef<HTMLElement>(null)
  const carousel = useRef<FlexCarouselControl | null>(null)

  useGSAP(
    () => {
      /* PINNED SCROLL-THROUGH — the section sticks to the viewport and
         vertical scrolling steps the carousel through every card; once
         the last card is centred the pin releases and the page carries
         on. Scrolling back up rewinds through the cards. */
      let shown = 0
      gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${(RECENT.length - 1) * SCROLL_PER_CARD * window.innerHeight}`,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (RECENT.length - 1))
            if (index === shown) return
            shown = index
            carousel.current?.showIndex(index)
          },
        },
      })
    },
    { scope: section },
  )

  return (
    // Wrapper keeps GSAP's pin-spacer out of <main>'s direct children so
    // React can still insert/reorder siblings (e.g. on hot reload).
    <div>
      <section ref={section} className="flex h-screen flex-col py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <SectionLabel>Recent Events</SectionLabel>
        </div>

        {/* Full-bleed: the carousel is a horizontal row, so let it run
            edge to edge rather than inside the content column. */}
        <div className="relative mt-6 min-h-0 w-full flex-1">
          <FlexCarousel
            items={RECENT}
            controlRef={carousel}
            preset="liquid"
            intro="deal"
            cardHeight={0.5}
            gap={12}
            squeeze={0.2}
            focusOnClick
            captions
            bend={0}
            // The page scroll drives the carousel (above), so the wheel
            // must not also be captured by it.
            captureWheel={false}
          />
        </div>

        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <Link
            href="/events"
            data-cursor="hover"
            className="group mt-4 inline-flex items-center gap-2 font-heading
                       text-[15px] font-bold uppercase tracking-widest text-primary"
          >
            View All Events
            <span className="transition-transform duration-300 ease-bounce
                             group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
