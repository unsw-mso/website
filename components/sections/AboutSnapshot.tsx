'use client'

import Link from 'next/link'
import SplitText from '@/components/ui/SplitText'
import AnimatedText from '@/components/ui/AnimatedText'

export default function AboutSnapshot() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-12 md:py-44">
      {/* Radial glow. pointer-events-none is essential — without it this
          invisible box swallows clicks on anything beneath it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[20%]
                   h-[70%] w-[60%]"
        style={{
          background:
            'radial-gradient(closest-side, var(--orange-tint), transparent)',
        }}
      />

      <div className="relative mx-auto grid max-w-[1440px] gap-12
                      md:grid-cols-[1.3fr_1fr] md:items-end md:gap-20">
        <SplitText
          text="We bring Malaysia to UNSW."
          className="font-heading text-[clamp(40px,5.5vw,84px)] font-bold
                     uppercase leading-[1.02] tracking-tight text-text"
        />

        <div className="flex flex-col gap-6 pb-2">
          <AnimatedText delay={0.1}>
            <p data-cursor="text" className="text-lg leading-relaxed text-text">
              MSO is home for every Malaysian at UNSW — and everyone who loves
              Malaysia. From mamak nights to Merdeka celebrations, we keep the
              flavours, festivals and friendships alive in Sydney.
            </p>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p data-cursor="text" className="leading-relaxed text-text-muted">
              One of UNSW&apos;s largest cultural societies, run by students,
              for students.
            </p>
          </AnimatedText>
          <AnimatedText delay={0.3}>
            <Link
              href="/committee"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 font-heading
                         text-[15px] font-bold uppercase tracking-widest
                         text-primary"
            >
              Our Story
              {/* Arrow slides right on hover with a bouncy ease */}
              <span className="transition-transform duration-300 ease-bounce
                               group-hover:translate-x-2">
                →
              </span>
            </Link>
          </AnimatedText>
        </div>
      </div>
    </section>
  )
}