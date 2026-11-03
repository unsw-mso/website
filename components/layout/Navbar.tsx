'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'Committee', href: '/committee' },
  { label: 'Merch', href: '/merch' },
  { label: 'Sponsors', href: '/sponsors' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header
      className="fixed inset-x-0 top-0 z-[900] border-b border-line bg-bg">
      <div className="mx-auto flex max-w-[1440px] min-h-[80px] items-end justify-between
                      px-6 pt-5 pb-5 md:px-12">
        <Link href="/" className="flex shrink-0 items-baseline gap-2">
          <Image
            src="/images/harimeow-nav-icon.png"
            alt="Meow"
            width={40}
            height={40}
            className="h-13 w-13 translate-y-[9px] object-contain"
            priority
            unoptimized
          />
          <div className="flex items-baseline gap-1 leading-none">
            <span className="font-heading text-[36px] tracking-[0.0.08em] font-bold text-text">
              MSO
            </span>
            <span className="font-heading text-[16px] font-bold tracking-[0.08em] text-text-60">
              UNSW
            </span>
          </div>
        </Link>

        <nav className="hidden shrink-0 items-baseline gap-2.5 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-pill border px-5 py-2 font-heading text-[13px]
                          uppercase tracking-[0.14em] transition-colors duration-200
                          ${pathname === l.href
                            ? 'border-primary text-primary'
                            : 'border-text/25 text-text hover:border-primary hover:text-primary'}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

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