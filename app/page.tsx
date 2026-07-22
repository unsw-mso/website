import HeroSection from '@/components/sections/HeroSection'
import HeroSplash from '@/components/sections/HeroSplash'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import AboutSnapshot from '@/components/sections/AboutSnapshot'
import TigerFall from '@/components/sections/TigerFall'
import EventsPreview from '@/components/sections/EventsPreview'
import SponsorsStrip from '@/components/sections/SponsorsStrip'
import CTASection from '@/components/sections/CTASection'

const MARQUEE = ['MSO', 'Malaysia', 'UNSW', 'Community', 'Together']

export default function HomePage() {
  return (
    <main>
      {/* The id is the anchor HeroSplash watches to know when to mount */}
      <div id="hero">
        <HeroSection />
      </div>
      <HeroSplash targetId="hero" />

      <MarqueeStrip
        className="bg-primary py-5"
        speed={20}
        items={MARQUEE.map((word) => (
          <span
            key={word}
            className="px-5 font-heading text-[clamp(24px,3.5vw,34px)]
                       font-bold uppercase italic tracking-wide text-white"
          >
            {word} ·
          </span>
        ))}
      />

      <AboutSnapshot />
      <TigerFall />
      <EventsPreview />
      <SponsorsStrip />
      <CTASection />
    </main>
  )
}