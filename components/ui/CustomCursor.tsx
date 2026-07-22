'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/utils/gsap'

export default function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = cursor.current
    if (!el) return

    // Skip entirely on touch devices — no mouse, no blob
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    // quickTo builds ONE reusable tween per property. Far cheaper than
    // firing gsap.to() on every mousemove. The 0.35s duration is what
    // creates the trailing lag behind the real pointer.
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    // Event delegation: one listener on document instead of one per button.
    // We read data-cursor off whatever is under the pointer.
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]')
      const mode = target?.getAttribute('data-cursor')

      if (mode === 'hover') {
        // Swells with a back ease so it overshoots then settles — bouncy
        gsap.to(el, {
          width: 44, height: 44, opacity: 0.55, borderRadius: '50%',
          duration: 0.4, ease: 'back.out(2.5)',
        })
      } else if (mode === 'text') {
        // Morphs into an I-beam caret over paragraph text
        gsap.to(el, {
          width: 2, height: 24, opacity: 1, borderRadius: '1px',
          duration: 0.3, ease: 'power3.out',
        })
      } else {
        gsap.to(el, {
          width: 14, height: 14, opacity: 1, borderRadius: '50%',
          duration: 0.4, ease: 'back.out(2)',
        })
      }
    }

    // Squish on click, spring back on release
    const onDown = () =>
      gsap.to(el, { scale: 0.6, duration: 0.15, ease: 'power2.out' })
    const onUp = () =>
      gsap.to(el, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' })

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <div
      ref={cursor}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-[14px] w-[14px]
                 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary
                 mix-blend-difference max-[767px]:hidden"
    />
  )
}