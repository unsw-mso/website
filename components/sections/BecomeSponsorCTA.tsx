'use client'

import SplitText from '@/components/ui/SplitText'
import AnimatedText from '@/components/ui/AnimatedText'

const EMAIL = 'sponsors@unswmso.org'

export default function BecomeSponsorCTA() {
  return (
    <section className="relative overflow-hidden border-t border-line px-6
                        py-32 text-center md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px]
                   w-[800px] max-w-[120vw] -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(closest-side, rgba(255,107,0,0.13), transparent)' }}
      />

      <div className="relative flex flex-col items-center gap-6">
        <SplitText
          text="Partner with MSO."
          className="font-heading text-[clamp(44px,7vw,96px)] font-bold uppercase
                     leading-[0.95] tracking-tight text-text"
        />
        <AnimatedText delay={0.15}>
          <p data-cursor="text" className="max-w-xl text-lg leading-relaxed text-text-60">
            Put your brand in front of thousands of engaged students at one of
            UNSW&apos;s largest cultural societies.
          </p>
        </AnimatedText>
        <AnimatedText delay={0.25}>
          <a
            href={`mailto:${EMAIL}`}
            data-cursor="hover"
            className="mt-2 inline-block rounded-pill bg-primary px-10 py-4
                       font-heading text-sm font-bold uppercase tracking-widest
                       text-white transition-transform duration-300 ease-bounce
                       hover:scale-105 active:scale-95"
          >
            Get in Touch →
          </a>
        </AnimatedText>
        <AnimatedText delay={0.3}>
          <span className="text-sm text-text-muted">{EMAIL}</span>
        </AnimatedText>
      </div>
    </section>
  )
}