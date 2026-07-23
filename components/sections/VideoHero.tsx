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

      /* PRIMING FOR iOS
         Safari on iOS refuses to seek a video that has never been
         played — currentTime assignments are silently ignored. Calling
         play() then immediately pause() satisfies that requirement.
         It's muted and has no audio track, so nothing is audible.
         The .catch() swallows the rejection browsers throw when
         autoplay is blocked; we don't care, we only wanted the seek. */
      el.play().then(() => el.pause()).catch(() => {})

      const build = () => {
        // duration is NaN until metadata has loaded. Bail and retry.
        if (!Number.isFinite(el.duration) || el.duration === 0) return

        /* THE SCRUB
           Rather than setting currentTime manually in onUpdate, we let
           GSAP TWEEN the currentTime property. GSAP's scrub smoothing
           then interpolates the seeks for us, which is noticeably
           smoother than raw scroll-position mapping — especially with
           Lenis, whose easing already lags the real scroll.

           end '+=250%' means the video plays out over 2.5 extra
           viewport heights of scrolling. Your clip is 7.2s; over that
           distance it reads as deliberate rather than frantic. */
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

        ScrollTrigger.refresh()
      }

      if (el.readyState >= 1) {
        build()                                    // metadata already there
      } else {
        el.addEventListener('loadedmetadata', build, { once: true })
      }

      return () => el.removeEventListener('loadedmetadata', build)
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
        // preload="auto" fetches the whole file. Essential: scrubbing a
        // partially-buffered video stalls at the buffer edge.
        preload="auto"
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