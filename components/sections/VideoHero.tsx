'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/utils/gsap'

export default function VideoHero() {
  const section = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useGSAP(
    () => {
      const el = video.current
      if (!el) return

      // Held across the async build() so the unmount cleanup below can
      // revert it — build runs on loadedmetadata, outside useGSAP's
      // synchronous context tracking, so it isn't auto-reverted for us.
      let mm: ReturnType<typeof gsap.matchMedia> | undefined

      const build = () => {
        // duration is NaN until metadata has loaded. Bail and retry.
        if (!Number.isFinite(el.duration) || el.duration === 0) return

        /* Gate the effect by device. Seeking video frame-by-frame on
           scroll is CPU-heavy and the biggest source of scroll jank on
           phones (which are also least able to absorb it). matchMedia
           runs the scrub ONLY on larger, non-reduced-motion screens and
           auto-reverts it (killing the ScrollTrigger + unpinning) when
           the query stops matching — e.g. on resize down to mobile. */
        mm = gsap.matchMedia()

        mm.add(
          '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
          () => {
            /* PRIMING FOR iOS (e.g. iPad, which matches this branch):
               Safari refuses to SEEK a video that has never been played —
               currentTime assignments are silently ignored. play() then
               immediately pause() satisfies that. It's muted with no audio
               track, so nothing is audible. Only the scrub path seeks, so
               the priming lives here — on mobile it would fight the ambient
               play() below. .catch() swallows autoplay-block rejections. */
            el.play().then(() => el.pause()).catch(() => {})

            /* Scrubbing needs the whole clip buffered or it stalls at the
               buffer edge, so upgrade to a full fetch on this path only.
               Mobile keeps the cheap preload="metadata" from the JSX. */
            el.preload = 'auto'
            /* THE SCRUB
               Rather than setting currentTime manually in onUpdate, we let
               GSAP TWEEN the currentTime property. GSAP's scrub smoothing
               then interpolates the seeks for us, which is noticeably
               smoother than raw scroll-position mapping — especially with
               Lenis, whose easing already lags the real scroll. */
            gsap.to(el, {
              currentTime: el.duration,
              ease: 'none',
              scrollTrigger: {
                trigger: section.current,
                start: 'top top',
                end: '+=70%',  // Change to control how many scrolls it lasts
                pin: true,
                scrub: 0.8,
                anticipatePin: 1,
              },
            })

            // Text fades out over the first third of the pinned scroll
            gsap.to('[data-merch-copy]', {
              opacity: 0,
              y: -40,
              ease: 'none',
              scrollTrigger: {
                trigger: section.current,
                start: 'top top',
                end: '+=80%',   // How quickly the hero text fades out
                scrub: 0.8,
              },
            })
          },
        )

        /* Mobile / reduced-motion: no scrub, no pin. Just let the muted
           clip autoplay and loop as an ambient background — cheap, and it
           still shows motion. The <video> element carries loop/autoplay
           and preload="metadata" for this path (see JSX below). */
        mm.add(
          '(max-width: 768px), (prefers-reduced-motion: reduce)',
          () => {
            el.play().catch(() => {})
          },
        )

        ScrollTrigger.refresh()
      }

      if (el.readyState >= 1) {
        build()                                    // metadata already there
      } else {
        el.addEventListener('loadedmetadata', build, { once: true })
      }

      return () => {
        el.removeEventListener('loadedmetadata', build)
        mm?.revert()
      }
    },
    { scope: section },
  )

  return (
    <section ref={section} className="relative h-screen w-full overflow-hidden bg-surface">
      <video
        ref={video}
        // No audio track exists in this file, but muted is still required
        // for browsers to permit the priming play() above.
        muted
        // playsInline stops iOS hijacking into fullscreen playback
        playsInline
        // loop so the mobile / reduced-motion ambient-playback path
        // (which doesn't scrub) keeps moving instead of freezing on the
        // last frame.
        loop
        // Default to the cheap metadata fetch — the desktop scrub path
        // upgrades this to a full fetch in JS (see build()), so phones
        // no longer download the whole 4–5 MB clip up front.
        preload="metadata"
        poster="/images/merch-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        {/* Browsers pick the FIRST source whose media query matches, so
            the mobile file must come first. */}
        <source src="/videos/merch-hero-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
        <source src="/videos/merch-hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b
                      from-black/30 via-black/40 to-black/85" />

      <div
        data-merch-copy
        className="relative mx-auto flex h-full max-w-[1440px] flex-col
                   justify-end px-6 pb-24 md:px-12 md:pb-28"
      >
        <h1 className="font-heading text-[clamp(56px,10vw,140px)] font-bold
                       uppercase leading-[0.9] tracking-tight text-[#F5F0E8]">
          MSO Merch
        </h1>
        <p className="mt-5 text-xl text-[#F5F0E8]/60">Rep your roots.</p>
        <div className="mt-9">
          <a
            href="#products"
            data-cursor="hover"
            className="inline-block rounded-pill bg-primary px-10 py-4
                       font-heading text-sm font-bold uppercase tracking-widest
                       text-white transition-transform duration-300 ease-bounce
                       hover:scale-105 active:scale-95"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  )
}