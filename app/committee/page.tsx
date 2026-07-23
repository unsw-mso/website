import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import PresidentFeature from '@/components/sections/PresidentFeature'
import CommitteeGrid from '@/components/sections/CommitteeGrid'
import TigerCameo from '@/components/sections/TigerCameo'

export const metadata: Metadata = {
  title: 'The Team',
  description: 'Meet the students running UNSW MSO in 2026.',
}

export default function CommitteePage() {
  return (
    <main>
      <PageHero
        title="The Team"
        subtitle="The people behind MSO 2026"
        texture="grid"
      />
      <PresidentFeature />
      <CommitteeGrid />
      <TigerCameo />
    </main>
  )
}