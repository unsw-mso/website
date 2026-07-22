'use client'

import SectionLabel from '@/components/ui/SectionLabel'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import { sponsors } from '@/lib/data/sponsors'

export default function SponsorsStrip() {
  const logos = sponsors.map((s) => (
    <div
      key={s.id}
      className="mx-10 flex h-14 w-40 items-center justify-center
                 rounded-md border border-line bg-surface
                 transition-colors duration-300 hover:border-primary"
    >
      <span className="font-heading text-[11px] uppercase
                       tracking-[0.18em] text-text-muted">
        {s.name}
      </span>
    </div>
  ))

  return (
    <section className="border-t border-line py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <SectionLabel>Our Sponsors</SectionLabel>
      </div>
      <MarqueeStrip items={logos} speed={30} className="mt-11" />
    </section>
  )
}