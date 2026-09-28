'use client'

import Image from 'next/image'
import type { Sponsor } from '@/lib/data/sponsors'

export default function SponsorCard({
  sponsor,
  onSelect,
}: {
  sponsor: Sponsor
  onSelect: (sponsor: Sponsor) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(sponsor)}
      data-cursor="hover"
      className="relative flex aspect-[4/3] w-full items-center justify-center
                 overflow-hidden rounded-lg border border-line bg-surface p-10 transition-all
                 duration-300 ease-bounce hover:-translate-y-1.5
                 hover:border-primary hover:shadow-glow"
    >
      {sponsor.logoUrl ? (
        // Stretched to fill the whole card so nothing is cropped (fill ignores
        // the padding, which only applies to the text wordmark fallback below)
        <Image
          src={sponsor.logoUrl}
          alt={sponsor.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-fill"
        />
      ) : (
        <span className="text-center font-heading text-sm font-bold uppercase
                         tracking-[0.15em] text-text-muted">
          {sponsor.name}
        </span>
      )}
    </button>
  )
}
