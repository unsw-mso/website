import Link from 'next/link'

const NAV = ['Home', 'Events', 'Committee', 'Merch', 'Sponsors']
const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/unswmso' },
  { label: 'Whatsapp', href: 'https://chat.whatsapp.com/G6skQanwkYY2ukBCq7DpJL' },
  { label: 'Discord',   href: 'https://discord.com/invite/9xn9EVU' },
  { label: 'Facebook',    href: 'https://www.facebook.com/MSOUNSW' },
]

export default function Footer() {
  return (
    <footer className="border-t-2 border-primary bg-bg">
      <div className="mx-auto max-w-[1440px] px-6 pt-24 md:px-12 md:pt-28">
        <p className="font-heading text-[clamp(48px,8.5vw,128px)] font-bold
                      uppercase leading-[0.95] tracking-tighter text-text">
          Always
          <br />
          Together<span className="text-primary">.</span>
        </p>

        <div className="mt-16 flex flex-col gap-10 border-b border-line
                        pb-14 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="font-heading text-xl font-bold text-text">MSO</span>
            <span className="max-w-[260px] text-[13px] leading-relaxed
                             text-text-muted">
              Malaysian Students Organisation
              <br />
              University of New South Wales
            </span>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV.map((l) => (
              <Link
                key={l}
                href={l === 'Home' ? '/' : `/${l.toLowerCase()}`}
                data-cursor="hover"
                className="font-heading text-[13px] uppercase tracking-[0.12em]
                           text-text-60 transition-colors hover:text-primary"
              >
                {l}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap gap-5">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="font-heading text-[13px] uppercase tracking-[0.12em]
                           text-text-60 transition-colors hover:text-primary"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 py-7 text-xs text-text-muted
                        md:flex-row md:justify-between">
          <span>© 2026 UNSW Malaysian Students Organisation</span>
          <span>Made with pride in Sydney</span>
        </div>
      </div>
    </footer>
  )
}