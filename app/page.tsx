import HeroSection from '@/components/sections/HeroSection'
import AboutSnapshot from '@/components/sections/AboutSnapshot'
import TigerFall from '@/components/sections/TigerFall'
import EventsPreview from '@/components/sections/EventsPreview'
import SponsorsStrip from '@/components/sections/SponsorsStrip'
import CTASection from '@/components/sections/CTASection'
import MarqueeStrip from '@/components/ui/MarqueeStrip'

const MARQUEE = ['Malaysia', 'Together', 'Boleh']
// Words and stars as separate, equally padded items. Repeated so a single
// copy is wider than any screen — otherwise the loop shows a blank gap.
const MARQUEE_ITEMS = Array.from({ length: 4 }, () =>
  MARQUEE.flatMap((word) => [word, '✦']),
).flat()

export default function HomePage() {
  return (
    <main>
      <div id="hero">
        <HeroSection />
      </div>

      <AboutSnapshot />

      {/* Banner strip sits between Our Story (AboutSnapshot) and the Mascot */}
      <MarqueeStrip
        className="bg-primary py-5"
        speed={60}
        items={MARQUEE_ITEMS.map((item, i) => (
          <span
            key={i}
            className="px-5 font-heading text-[clamp(24px,3.5vw,34px)]
                       font-bold uppercase italic tracking-wide text-white"
          >
            {item}
          </span>
        ))}
      />

      <TigerFall />
      <EventsPreview />
      <SponsorsStrip />
      <CTASection />
    </main>
  )
}