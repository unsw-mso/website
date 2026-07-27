'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/utils/gsap'
import SponsorCard from '@/components/cards/SponsorCard'
import SlideOverPanel from '@/components/ui/SlideOverPanel'
import { sponsors, type Sponsor } from '@/lib/data/sponsors'

const SPONSOR_BG =
  'linear-gradient(140deg, var(--surface) 0%, var(--surface-2) 100%)'

const domainOf = (url?: string) => {
  if (!url) return undefined
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export default function SponsorsGrid() {
  const section = useRef<HTMLElement>(null)
  const [selected, setSelected] = useState<Sponsor | null>(null)

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
            <SponsorCard sponsor={sponsor} onSelect={setSelected} />
          </div>
        ))}
      </div>

      {selected && (
        <SlideOverPanel
          onClose={() => setSelected(null)}
          eyebrow={selected.tier ?? 'Partner'}
          title={selected.name}
          meta={domainOf(selected.website)}
          imageSrc={selected.logoUrl || undefined}
          imageFit="contain"
          imageBg={SPONSOR_BG}
          description={
            selected.blurb ??
            `${selected.name} proudly supports UNSW MSO, helping us run the events and community that make Malaysia feel a little closer to home.`
          }
          footer={
            selected.website ? (
              <a
                href={selected.website}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="rounded-pill bg-primary px-9 py-3.5 font-heading text-[13px]
                           font-bold uppercase tracking-widest text-white transition-transform
                           duration-300 ease-bounce hover:scale-105 active:scale-95"
              >
                Visit website ↗
              </a>
            ) : undefined
          }
        />
      )}
    </section>
  )
}
