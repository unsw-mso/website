'use client'

import SplitText from '@/components/ui/SplitText'
import AnimatedText from '@/components/ui/AnimatedText'

interface PageHeroProps {
  title: string
  subtitle: string
  /** 'glow' = orange radial blobs. 'grid' = faint graph-paper texture. */
  texture?: 'glow' | 'grid' | 'none'
  /** Override the clamp when a title is unusually long. */
  titleClassName?: string
}

export default function PageHero({
  title,
  subtitle,
  texture = 'glow',
  titleClassName = 'text-[clamp(64px,11vw,150px)]',
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-40 md:px-12 md:pb-32 md:pt-56">
      {texture === 'glow' && (
        <>
          {/* Two offset radials rather than one — a single centred glow
              reads as a vignette, two off-centre ones read as lighting. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[15%] -top-[20%] h-[120%] w-[70%]"
            style={{ background: 'radial-gradient(closest-side, rgba(255,107,0,0.16), transparent)' }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-[30%] left-[20%] h-[80%] w-[50%]"
            style={{ background: 'radial-gradient(closest-side, rgba(255,107,0,0.08), transparent)' }}
          />
        </>
      )}

      {texture === 'grid' && (
        // Two crossed repeating gradients = graph paper. currentColor
        // would be cleaner but gradients can't use it, so we lean on a
        // low-alpha neutral that reads acceptably in both themes.
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      )}

      <div className="relative mx-auto max-w-[1440px]">
        <SplitText
          text={title}
          className={`font-heading font-bold uppercase leading-[0.9] tracking-tight text-text ${titleClassName}`}
          stagger={0.08}
        />
        <AnimatedText delay={0.2}>
          <p data-cursor="text" className="mt-7 text-xl text-text-60">
            {subtitle}
          </p>
        </AnimatedText>
      </div>
    </section>
  )
}