'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useGSAP, ScrollTrigger } from '@/lib/utils/gsap'

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'Committee', href: '/committee' },
  { label: 'Merch', href: '/merch' },
  { label: 'Sponsors', href: '/sponsors' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useGSAP(() => {
    /* Using ScrollTrigger rather than a raw scroll listener means this
       reads from the SAME synchronised scroll position as everything
       else. A separate window.scrollY listener would fight Lenis and
       fire at slightly different moments. */
    ScrollTrigger.create({
      start: 'top -80',            // 80px down from the very top
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    })
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[900] transition-all duration-400
                  ${scrolled
                    ? 'border-b border-line bg-bg/75 backdrop-blur-xl'
                    : 'border-b border-transparent bg-transparent'}`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between
                      px-6 py-5 md:px-12">
        <Link href="/" data-cursor="hover"
              className="flex items-baseline gap-2.5">
          <span className="font-heading text-[22px] font-bold text-text">MSO</span>
          <span className="font-heading text-[11px] uppercase
                           tracking-[0.28em] text-text-muted">UNSW</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-cursor="hover"
              className={`font-heading text-[13px] uppercase tracking-[0.14em]
                          transition-colors duration-200 hover:text-primary
                          ${pathname === l.href ? 'text-primary' : 'text-text'}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#join"
          data-cursor="hover"
          className="hidden rounded-pill bg-primary px-6 py-3 font-heading
                     text-[13px] font-bold uppercase tracking-widest text-white
                     transition-transform duration-300 ease-bounce
                     hover:scale-105 active:scale-95 md:inline-block"
        >
          Join Us
        </Link>

        <button
          onClick={() => setOpen(!open)}
          data-cursor="hover"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="font-heading text-sm uppercase tracking-widest
                     text-text md:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line bg-bg
                        px-6 py-6 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 font-heading text-lg uppercase
                         tracking-widest text-text"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}