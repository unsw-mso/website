'use client'

import Link from 'next/link'
import SplitText from '@/components/ui/SplitText'
import AnimatedText from '@/components/ui/AnimatedText'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden px-6 py-40 text-center md:py-52">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px]
                   w-[900px] max-w-[120vw] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(closest-side, rgba(255,107,0,0.16), transparent)',
        }}
      />

      <div className="relative flex flex-col items-center gap-7">
        <SplitText
          text="Be part of MSO."
          className="font-heading text-[clamp(56px,10vw,120px)] font-bold
                     uppercase leading-[0.95] tracking-tight text-text"
          stagger={0.09}
        />
        <AnimatedText delay={0.15}>
          <p className="text-lg text-text-60">
            Join thousands of Malaysian students at UNSW.
          </p>
        </AnimatedText>
        <AnimatedText delay={0.25}>
          <div className="mt-3 flex flex-wrap justify-center gap-5">
            <Link
              href="/#join"
              data-cursor="hover"
              /* active:scale-95 gives tactile press feedback; the bounce
                 easing on release is what sells the "squishy" feel */
              className="rounded-pill bg-primary px-11 py-[18px] font-heading
                         text-[15px] font-bold uppercase tracking-widest
                         text-white transition-transform duration-300
                         ease-bounce hover:scale-105 active:scale-95"
            >
              Join Now
            </Link>
            <Link
              href="/committee"
              data-cursor="hover"
              className="rounded-pill border-[1.5px] border-text/40 px-11
                         py-[18px] font-heading text-[15px] font-bold uppercase
                         tracking-widest text-text transition-all duration-300
                         ease-bounce hover:scale-105 hover:border-text
                         active:scale-95"
            >
              Learn More
            </Link>
          </div>
        </AnimatedText>
      </div>
    </section>
  )
}