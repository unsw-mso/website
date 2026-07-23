'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/utils/gsap'
import { executives } from '@/lib/data/committee'

export default function PresidentFeature() {
  const section = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Cards rise and settle. clearProps:'transform' on complete hands
      // control back to CSS so the hover lift isn't fighting a leftover
      // GSAP inline transform.
      gsap.from('[data-exec-card]', {
        y: 70,
        opacity: 0,
        duration: 0.9,
        ease: 'back.out(1.2)',
        stagger: 0.14,
        clearProps: 'transform',
        scrollTrigger: { trigger: section.current, start: 'top 82%', once: true },
      })
    },
    { scope: section },
  )

  return (
    <section ref={section} className="px-6 pb-24 pt-4 md:px-12">
      <div className="mx-auto grid max-w-[1440px] gap-7 md:grid-cols-[1.4fr_1fr]">
        {executives.map((exec) => (
          <article
            key={exec.id}
            data-exec-card
            data-cursor="hover"
            className="group relative flex min-h-[440px] items-center justify-center
                       overflow-hidden rounded-xl border-t-[3px] border-primary
                       bg-surface transition-transform duration-300 ease-bounce
                       hover:-translate-y-2 md:min-h-[560px]"
          >
            {exec.imageUrl ? (
              <Image
                src={exec.imageUrl}
                alt={exec.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700
                           ease-soft group-hover:scale-105"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(160deg, var(--surface-2) 0%, var(--primary-dark) 200%)',
                }}
              />
            )}

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t
                            from-black/95 to-transparent p-8 md:p-10">
              <div className="font-heading text-[30px] font-bold uppercase
                              tracking-tight text-[#F5F0E8]">
                {exec.name}
              </div>
              <div className="mt-2 font-heading text-[13px] uppercase
                              tracking-[0.2em] text-primary">
                {exec.role}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}