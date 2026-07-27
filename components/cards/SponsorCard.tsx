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
      className="flex aspect-[4/3] w-full items-center justify-center rounded-lg
                 border border-line bg-surface p-10 transition-all
                 duration-300 ease-bounce hover:-translate-y-1.5
                 hover:border-primary hover:shadow-glow"
    >
      {sponsor.logoUrl ? (
        <Image
          src={sponsor.logoUrl}
          alt={sponsor.name}
          width={200}
          height={80}
          className="h-auto max-h-16 w-auto object-contain"
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
