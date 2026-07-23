import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import UpcomingEvents from '@/components/sections/UpcomingEvents'
import PastEvents from '@/components/sections/PastEvents'

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Mamak nights, Merdeka Gala, sports days and more. Everything happening at UNSW MSO this term.',
}

export default function EventsPage() {
  return (
    <main>
      <PageHero title="Events" subtitle="What's on at MSO" texture="glow" />
      <UpcomingEvents />
      <PastEvents />
    </main>
  )
}