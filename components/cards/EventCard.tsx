'use client'

import Image from 'next/image'
import type { EventType } from '@/lib/data/events'

export default function EventCard({ event }: { event: EventType }) {
  return (
    <article
      data-cursor="hover"
      /* group = lets child elements react to hover on this parent.
         The lift + glow is pure CSS, per your spec — GSAP is overkill
         for hover states and CSS transitions run off the main thread. */
      className="group flex flex-col overflow-hidden rounded-lg border
                 border-line bg-surface transition-all duration-300
                 ease-bounce hover:-translate-y-2 hover:border-primary
                 hover:shadow-glow"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500
                       ease-soft group-hover:scale-[1.06]"
          />
        ) : (
          // Fallback while you have no photos: a branded gradient with
          // the initial. Reads as a design choice, not a missing asset.
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background:
                'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 60%, var(--surface-2) 100%)',
            }}
          >
            <span className="font-heading text-6xl font-bold text-white/25">
              {event.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 p-7">
        <h3 className="font-heading text-2xl font-bold uppercase
                       tracking-tight text-text">
          {event.title}
        </h3>
        <span className="font-heading text-[13px] uppercase
                         tracking-widest text-primary">
          {event.date} · {event.location}
        </span>
        <p data-cursor="text" className="text-[15px] leading-relaxed text-text-60">
          {event.description}
        </p>
      </div>
    </article>
  )
}