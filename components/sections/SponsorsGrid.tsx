'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/utils/gsap'
import SponsorCard from '@/components/cards/SponsorCard'
import { sponsors } from '@/lib/data/sponsors'

export default function SponsorsGrid() {
  const section = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-sponsor]', {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: 'back.out(1.4)',
        stagger: { each: 0.05, grid: 'auto', from: 'start' },
        clearProps: 'transform',
        scrollTrigger: { trigger: section.current, start: 'top 82%', once: true },
      })
    },
    { scope: section },
  )

  return (
    <section ref={section} className="px-6 pb-36 pt-8 md:px-12">
      {/* Every sponsor gets identical treatment */}
      <div className="mx-auto grid max-w-[1440px] gap-6 sm:grid-cols-2
                      lg:grid-cols-3 xl:grid-cols-4">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} data-sponsor>
            <SponsorCard sponsor={sponsor} />
          </div>
        ))}
      </div>
    </section>
  )
}