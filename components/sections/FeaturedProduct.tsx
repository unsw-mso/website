'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/utils/gsap'
import SectionLabel from '@/components/ui/SectionLabel'
import { featuredProduct, formatPrice, type Product } from '@/lib/data/merch'

export default function FeaturedProduct({ onBuy }: { onBuy: (p: Product) => void }) {
  const section = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      /* Two columns converge from opposite sides. Sharing one
         ScrollTrigger (via a timeline) rather than two guarantees they
         move together — separate triggers can desync by a frame or two
         on slower devices, which reads as sloppy. */
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current, start: 'top 78%', once: true },
      })

      tl.from('[data-feat-left]',  { x: -80, opacity: 0, duration: 0.9, ease: 'power3.out' }, 0)
        .from('[data-feat-right]', { x:  80, opacity: 0, duration: 0.9, ease: 'power3.out' }, 0)
    },
    { scope: section },
  )

  return (
    <section
      ref={section}
      className="border-t border-line px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-14
                      md:grid-cols-[1.1fr_1fr] md:gap-20">
        <div data-feat-left className="relative aspect-[4/3] overflow-hidden
                                       rounded-xl shadow-soft">
          {featuredProduct.imageUrl ? (
            <Image
              src={featuredProduct.imageUrl}
              alt={featuredProduct.name}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background:
                  'linear-gradient(140deg, var(--surface-2) 0%, var(--primary-dark) 170%)',
              }}
            >
              <span className="font-heading text-8xl font-bold text-text/12">
                {featuredProduct.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div data-feat-right className="flex flex-col gap-6">
          <SectionLabel>Featured</SectionLabel>
          <h2 className="font-heading text-[clamp(36px,5vw,72px)] font-bold
                         uppercase leading-none tracking-tight text-text">
            {featuredProduct.name}
          </h2>
          <p data-cursor="text" className="text-lg leading-relaxed text-text-60">
            {featuredProduct.description}
          </p>
          <span className="font-heading text-3xl font-bold text-primary">
            {formatPrice(featuredProduct.priceCents, featuredProduct.currency)}
          </span>
          <button
            onClick={() => onBuy(featuredProduct)}
            data-cursor="hover"
            className="w-fit rounded-pill bg-primary px-10 py-4 font-heading
                       text-sm font-bold uppercase tracking-widest text-white
                       transition-transform duration-300 ease-bounce
                       hover:scale-105 active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </section>
  )
}