'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/utils/gsap'

interface SlideOverPanelProps {
  onClose: () => void
  /** small pill above the title (category / tier / "Merch") */
  eyebrow?: string
  title: string
  /** secondary line under the title (price, website, date…) */
  meta?: string
  imageSrc?: string
  imageAlt?: string
  /** CSS background for the image area (gradient fallback when no imageSrc) */
  imageBg?: string
  imageFit?: 'cover' | 'contain'
  description?: string
  /** action buttons rendered at the bottom of the panel */
  footer?: ReactNode
}

/**
 * Right-hand slide-in detail panel — the same interaction as tapping a card in
 * the archive sphere, made reusable for sponsors and merch. Renders a dimmed
 * backdrop plus a panel that slides in from the right; the parent mounts it
 * conditionally ({selected && <SlideOverPanel/>}) and it plays its own exit
 * animation before calling onClose.
 */
export default function SlideOverPanel({
  onClose,
  eyebrow,
  title,
  meta,
  imageSrc,
  imageAlt,
  imageBg,
  imageFit = 'cover',
  description,
  footer,
}: SlideOverPanelProps) {
  const backdrop = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const closing = useRef(false)

  const close = (after?: () => void) => {
    if (closing.current) return
    closing.current = true
    gsap.to(backdrop.current, { opacity: 0, duration: 0.3, ease: 'power2.in' })
    gsap.to(panel.current, {
      xPercent: 100,
      duration: 0.45,
      ease: 'power3.in',
      onComplete: () => {
        onClose()
        after?.()
      },
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(backdrop.current, { opacity: 0, duration: 0.4, ease: 'power2.out' })
      gsap.from(panel.current, { xPercent: 100, duration: 0.6, ease: 'power4.out' })
      gsap.from('[data-panel-item]', {
        y: 24,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        delay: 0.18,
        ease: 'power3.out',
      })
    })

    // lock the page behind the panel + close on Escape
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      ctx.revert()
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="fixed inset-0 z-[1100]">
      <div
        ref={backdrop}
        onClick={() => close()}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div
        ref={panel}
        className="absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto
                   border-l border-line bg-bg p-6 shadow-2xl
                   sm:p-8 md:w-[46%] md:max-w-[620px] md:p-12"
      >
        <button
          data-panel-item
          onClick={() => close()}
          className="mb-8 flex items-center gap-2 self-start font-heading text-[12px]
                     uppercase tracking-widest text-text-60 transition-colors
                     hover:text-primary md:mb-12"
        >
          ← Close
        </button>

        {eyebrow && (
          <div
            data-panel-item
            className="mb-5 inline-flex w-fit items-center rounded-pill border border-primary/40
                       bg-orange-tint px-4 py-1.5 font-heading text-[11px] uppercase
                       tracking-widest text-primary"
          >
            {eyebrow}
          </div>
        )}

        <h2
          data-panel-item
          className="font-heading text-4xl font-bold uppercase leading-[0.95]
                     tracking-tight text-text sm:text-5xl md:text-6xl"
        >
          {title}
        </h2>

        {meta && (
          <p
            data-panel-item
            className="mt-3 font-heading text-[13px] uppercase tracking-[0.2em] text-text-muted"
          >
            {meta}
          </p>
        )}

        <div
          data-panel-item
          className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-lg md:mt-10"
          style={{ background: imageBg }}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              sizes="(max-width: 768px) 100vw, 46vw"
              className={imageFit === 'contain' ? 'object-contain p-10' : 'object-cover'}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-heading text-7xl font-bold text-text/15">
                {title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {description && (
          <p
            data-panel-item
            className="mt-8 max-w-md text-[15px] leading-relaxed text-text-60 md:mt-10"
          >
            {description}
          </p>
        )}

        {footer && (
          <div data-panel-item className="mt-auto flex flex-wrap gap-3 pt-10">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
