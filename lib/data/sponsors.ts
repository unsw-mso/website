export interface Sponsor {
  id: string
  name: string
  logoUrl: string           // '' → renders the name as a wordmark
  website?: string
  /** shown as the pill in the detail panel, e.g. 'Gold Partner' */
  tier?: string
  /** short blurb shown in the detail panel */
  blurb?: string
}

// Replace with real partners. Names render as text wordmarks until you
// supply logoUrl, which looks intentional rather than broken.
export const sponsors: Sponsor[] = [
  { id: 's1', name: 'Kao Kao',   logoUrl: '/images/sponsors/kaokao.png' },
  { id: 's2', name: 'Dynasty Karaoke',   logoUrl: '/images/sponsors/dynastykar.png' },
  { id: 's3', name: 'Future Spects Pty Ltd',  logoUrl: '/images/sponsors/keku.png' },
  { id: 's4', name: 'Tiger Pocha',  logoUrl: '/images/sponsors/tigerpocha.png' },
]