'use client'

import Image from 'next/image'
import type { Sponsor } from '@/lib/data/sponsors'

const SIZES = '(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'

export default function SponsorCard({
  sponsor,
  onSelect,
  eager = false,
}: {
  sponsor: Sponsor
  onSelect: (sponsor: Sponsor) => void
  /** Load immediately instead of lazily — for cards visible on page load */
  eager?: boolean
}) {
  const loading = eager ? 'eager' : 'lazy'
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
        <>
          {/* Blurred copy fills the box; the sharp one shows the whole image */}
          <Image
            src={sponsor.logoUrl}
            alt=""
            aria-hidden
            fill
            sizes={SIZES}
            loading={loading}
            className="scale-125 object-cover opacity-60 blur-2xl"
          />
          <Image
            src={sponsor.logoUrl}
            alt={sponsor.name}
            fill
            sizes={SIZES}
            loading={loading}
            className="object-contain"
          />
        </>
      ) : (
        <span className="text-center font-heading text-sm font-bold uppercase
                         tracking-[0.15em] text-text-muted">
          {sponsor.name}
        </span>
      )}
    </button>
  )
}
