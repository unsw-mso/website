'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/utils/gsap'
import { DEPARTMENT_PORT_IMAGE, type CommitteeMember } from '@/lib/data/committee'

/* Click a member → the department port photo fills the left of the screen and a
   white panel slides in from the right carrying that member's photo, with the
   name/role stacked above it. No FLIP/clone animation — only transforms and
   opacity move, so it stays smooth. */

export default function MemberSpotlight({
  member,
  onClose,
}: {
  member: CommitteeMember
  onClose: () => void
}) {
  const root = useRef<HTMLDivElement>(null)
  const port = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const closing = useRef(false)

  const portSrc =
    DEPARTMENT_PORT_IMAGE[member.department] ?? '/images/ports/execs.webp'
  const initials = member.name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

  /* ── open ── */
  useGSAP(
    () => {
      gsap
        .timeline()
        .from(port.current, { autoAlpha: 0, scale: 1.04, duration: 0.9, ease: 'power3.out' }, 0)
        .from(panel.current, { xPercent: 100, duration: 0.6, ease: 'power4.out' }, 0)
        .from(
          '[data-spot-item]',
          { y: 22, autoAlpha: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out' },
          0.28,
        )
    },
    { scope: root },
  )

  /* ── close ── */
  const close = () => {
    if (closing.current) return
    closing.current = true
    gsap.killTweensOf([port.current, panel.current, '[data-spot-item]'])
    gsap
      .timeline({ onComplete: onClose })
      .to(panel.current, { xPercent: 100, duration: 0.45, ease: 'power3.in' }, 0)
      .to(port.current, { autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, 0)
  }

  // Esc to close + lock body scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={root} className="fixed inset-0 z-[1000] select-none">
      {/* backdrop — click anywhere off the panel to close */}
      <button
        onClick={close}
        aria-label="Close"
        className="absolute inset-0 h-full w-full cursor-default bg-black/50"
      />

      {/* PORT PHOTO — fills the entire left side */}
      <div
        ref={port}
        className="pointer-events-none absolute inset-0 md:right-[420px]"
      >
        <Image
          src={portSrc}
          alt={`${member.department} team`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 65vw"
          className="object-cover"
        />
      </div>

      {/* WHITE PANEL — slides in from the right with the member photo */}
      <div
        ref={panel}
        className="absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto
                   bg-[#F5F0E8] p-8 text-[#0A0A0A] shadow-[0_0_60px_rgba(0,0,0,0.45)]
                   sm:w-[420px] md:p-10"
      >
        <button
          data-spot-item
          onClick={close}
          className="mb-10 flex items-center gap-2 self-start font-heading text-[11px]
                     uppercase tracking-[0.25em] text-[#0A0A0A]/50 transition-colors
                     hover:text-primary"
        >
          ← Back
        </button>

        <span
          data-spot-item
          className="font-heading text-[11px] font-semibold uppercase tracking-[0.32em] text-primary"
        >
          — {member.department}
        </span>
        <h2
          data-spot-item
          className="mt-3 font-heading text-3xl font-bold uppercase leading-[0.95]
                     tracking-tight text-[#0A0A0A] md:text-[40px]"
        >
          {member.name}
        </h2>
        <span
          data-spot-item
          className="mt-2 font-heading text-[12px] uppercase tracking-[0.22em] text-[#0A0A0A]/55"
        >
          {member.role}
        </span>

        {member.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            data-spot-item
            src={member.imageUrl}
            alt={member.name}
            className="mt-8 aspect-[3/4] w-full rounded-lg border border-[#0A0A0A]/10 object-cover"
          />
        ) : (
          <div
            data-spot-item
            className="mt-8 flex aspect-[3/4] w-full items-center justify-center
                       rounded-lg border border-[#0A0A0A]/10"
            style={{
              background:
                'linear-gradient(150deg, var(--surface-2) 0%, var(--primary-dark) 180%)',
            }}
          >
            <span className="font-heading text-6xl font-bold text-[#0A0A0A]/15">
              {initials}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
