'use client'

import Image from 'next/image'
import type { Sponsor } from '@/lib/data/sponsors'

export default function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const inner = (
    <div
      data-cursor="hover"
      className="flex aspect-[4/3] items-center justify-center rounded-lg
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
    </div>
  )

  // Only wrap in an anchor when there's somewhere to go — an <a> with
  // no href is not keyboard-focusable and confuses screen readers.
  return sponsor.website ? (
    <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    inner
  )
}