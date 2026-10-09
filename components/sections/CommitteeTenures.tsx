'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from '@/lib/utils/gsap'
import LineSidebar from '@/components/ui/LineSidebar'
import PresidentFeature from '@/components/sections/PresidentFeature'
import CommitteeGrid from '@/components/sections/CommitteeGrid'
import { splitCommittee } from '@/lib/data/committee'
// Generated from lib/data/committees/*.ts — add a year by adding a file there
import { tenures } from '@/lib/data/committees'

// Open on the newest year that actually has members, so an empty
// placeholder file for an upcoming tenure doesn't become the default.
const DEFAULT_INDEX = Math.max(0, tenures.findIndex((t) => t.members.length > 0))

/** Cursor (or tap) within this many px of the left edge pops the panel out. */
const EDGE_ZONE = 80

/**
 * Committee page body: the selected year's executives + department grid,
 * with a tenure switcher that's hidden until the cursor nears the left edge
 * of the screen, then sweeps out over most of the left side with the years
 * (LineSidebar) on it. While it's closed, the current tenure stays parked on
 * the left edge.
 */
export default function CommitteeTenures() {
  const [index, setIndex] = useState(DEFAULT_INDEX)
  const [open, setOpen] = useState(false)
  const [inView, setInView] = useState(false)
  const content = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const tab = useRef<HTMLButtonElement>(null)

  const tenure = tenures[index] ?? tenures[0]
  const { executives, general } = splitCommittee(tenure?.members ?? [])

  // Switching years changes the page height, so re-measure every trigger
  // further down the page (e.g. TigerCameo) once the new list has rendered.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [index])

  // Only offer the switcher while the members are on screen — the left edge
  // over the hero or footer does nothing, and it tucks away on scroll-out.
  useEffect(() => {
    const el = content.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
      if (!entry.isIntersecting) setOpen(false)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Mouse: open in the edge zone, close once past the panel.
  // Touch: tap the edge indicator (or very near the edge), tap outside to close.
  useEffect(() => {
    if (!inView) return

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      if (e.clientX < EDGE_ZONE) {
        setOpen(true)
        return
      }
      const right = panel.current?.getBoundingClientRect().right ?? 0
      if (e.clientX > right) setOpen(false)
    }

    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (panel.current?.contains(t) || tab.current?.contains(t)) return
      setOpen(e.pointerType === 'touch' && e.clientX < EDGE_ZONE / 2)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [inView])

  if (!tenure) return null

  return (
    <>
      {/* Current tenure, parked on the left edge while the panel is closed.
          Also opens the panel on click/tap (touch + keyboard). */}
      <button
        ref={tab}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label={`Committee tenure: ${tenure.label}. Show other years`}
        data-cursor="hover"
        className={`fixed left-0 top-1/2 z-[800] flex -translate-y-1/2 items-center gap-2
                    rounded-r-lg border border-l-0 border-line bg-bg/70 px-1.5 py-3
                    backdrop-blur-md transition-all duration-300 ease-soft
                    ${inView && !open ? 'opacity-70 hover:opacity-100' : 'pointer-events-none -translate-x-full opacity-0'}`}
      >
        <span className="h-10 w-[3px] rounded-full bg-primary" />
        <span className="rotate-180 font-heading text-[11px] uppercase tracking-[0.2em]
                         text-text [writing-mode:vertical-rl]">
          {tenure.label}
        </span>
      </button>

      {/* The switcher — covers most of the left side when open. Focusing a
          year with the keyboard also opens it. */}
      <div
        ref={panel}
        role="region"
        aria-label="Committee tenure"
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
        }}
        className={`fixed inset-y-0 left-0 z-[800] w-[min(88vw,620px)] md:w-[46vw]
                    transition-[translate,opacity] duration-700 ease-soft
                    ${open ? 'translate-x-0 opacity-100' : 'pointer-events-none -translate-x-full opacity-0'}`}
        style={{
          // Dark on the left, fading out over the photos on the right
          background:
            'linear-gradient(to right, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.82) 55%, rgba(10,10,10,0) 100%)',
        }}
      >
        <div className="relative flex h-full flex-col justify-center pl-10 md:pl-14">
          <span className="mb-2 pl-[60px] font-heading text-[11px] uppercase tracking-[0.3em] text-text-muted">
            Tenure
          </span>
          <LineSidebar
            items={tenures.map((t) => t.label)}
            accentColor="#F97316"
            textColor="#c4c4c4"
            markerColor="#6c6c6c"
            showIndex
            showMarker
            proximityRadius={100}
            maxShift={30}
            falloff="smooth"
            markerLength={60}
            markerGap={0}
            tickScale={0.5}
            scaleTick
            itemGap={20}
            fontSize={1.1}
            smoothing={100}
            defaultActive={DEFAULT_INDEX}
            onItemClick={(i) => setIndex(i)}
            className="font-heading"
          />
        </div>
      </div>

      {/* Outer div is stable (watched by the IntersectionObserver); the inner
          one is keyed by tenure so switching years remounts the sections and
          replays their entrance animations with the new members. */}
      <div ref={content}>
        <div key={tenure.id}>
          {tenure.members.length === 0 ? (
            <p className="px-6 pb-40 pt-4 text-center text-[15px] leading-relaxed text-text-60 md:px-12">
              The {tenure.label} committee hasn&apos;t been added yet.
            </p>
          ) : (
            <>
              {executives.length > 0 && <PresidentFeature executives={executives} />}
              <CommitteeGrid members={general} />
            </>
          )}
        </div>
      </div>
    </>
  )
}
