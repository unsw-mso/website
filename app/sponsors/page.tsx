import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import SponsorsGrid from '@/components/sections/SponsorsGrid'
import BecomeSponsorCTA from '@/components/sections/BecomeSponsorCTA'
import SponsorsStrip from '@/components/sections/SponsorsStrip'

export const metadata: Metadata = {
  title: 'Sponsors',
  description: 'The organisations that make UNSW MSO possible.',
}

export default function SponsorsPage() {
  return (
    <main>
      <PageHero
        title="Our Sponsors"
        subtitle="The organisations that make MSO possible."
        titleClassName="text-[clamp(52px,9vw,130px)]"
      />
      <SponsorsGrid />
      <BecomeSponsorCTA />
      <SponsorsStrip />
    </main>
  )
}