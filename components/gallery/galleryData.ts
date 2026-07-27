/**
 * Event data for the spherical archive gallery (and, later, upcoming events).
 *
 * Toggle where an event shows with `status`:
 *   'past'     → appears in the archive sphere
 *   'upcoming' → hidden from the archive (it's a future event)
 *
 * Images:
 *   `image`       — the CARD FACE art. Defaults to /images/cards/<id>.png.
 *   `detailImage` — the hero shown in the detail panel. Independent of the
 *                   face; if omitted it falls back to `image` / the id photo.
 *
 * `category` is the single classification shown on the card and panel
 * (SOCIAL / SPORTS / CAREER). `description` is the blurb in the detail panel.
 */

export type EventCategory = 'SOCIAL' | 'SPORTS' | 'CAREER'
export type EventStatus = 'upcoming' | 'past'

export interface GalleryCard {
  id: string
  brand: string
  title: string
  date: string
  category: EventCategory
  status: EventStatus
  year: string
  /** path under /public to use as the card face; falls back to `colors` */
  image?: string
  detailImage?: string | undefined
  description?: string
  /** where it happened / will happen (shown on the upcoming cards) */
  location?: string
  /** registration URL for upcoming events; defaults to '#' */
  registrationLink?: string
  /** [top, bottom] gradient stops used as the fallback face */
  colors: [string, string]
  /** small overlay accent used for the orbit/glyph mark */
  accent: string
}

/** Resolve a card's art path (its own `image`, else /images/cards/<id>.png). */
export const cardImage = (c: GalleryCard) => c.image ?? `/images/cards/${c.id}.png`


// Remember to compress the images before adding them !!!
export const galleryCards: GalleryCard[] = [
  { id: 'mso-volleyball',     brand: 'MSO',   title: 'Volleyball',                  date: '25 JUL', category: 'SPORTS', status:'upcoming',      year: '2026', colors: ['#FF8B33', '#7A1E00'], accent: '#FFD9B0' },
  { id: 'mso-captainball',    brand: 'MSO',   title: 'Captainball',                 date: '18 JUL', category: 'SPORTS',  status:'upcoming',   year: '2026', colors: ['#1D1D1D', '#FF6B00'], accent: '#FF8B33' },
  { id: 'mso-racialharmony',  brand: 'MSO',   title: 'Racial Harmony Day',          date: '24 JUL', category: 'SOCIAL',  status:'upcoming',   year: '2026', colors: ['#3A0CA3', '#F72585'], accent: '#FFC2E2' },
  { id: 'mso-munch&mingle',   brand: 'MSO',   title: 'Munch & Mingle',              date: '17 JUL', category: 'SOCIAL',  status:'past',     year: '2026', colors: ['#0EA5A0', '#053B39'], accent: '#8AF0EC' },
  { id: 'mso-slice&settle',   brand: 'MSO',   title: 'Slice & Settle',              date: '14 JUL', category: 'SOCIAL',  status:'past',   year: '2026', colors: ['#FF6B00', '#B23A00'], accent: '#FFD0A8' },
  { id: 'mso-gaming',         brand: 'MSO',   title: 'Gaming Tournament',           date: '4 JUL',  category: 'SOCIAL',   status:'past',   year: '2026', colors: ['#F2C14E', '#8A5A00'], accent: '#FFF0C2' },
  { id: 'mso-runclub',        brand: 'MSO',   title: 'Run Club',                    date: '21 JUN', category: 'SPORTS',   status:'past',    year: '2026', colors: ['#E63946', '#4B0A0F'], accent: '#FFB3B8' },
  { id: 'mso-basketball',     brand: 'MSO',   title: 'Basketball',                  date: '19 JUN', category: 'SPORTS',   status:'past',    year: '2026', colors: ['#6F4E37', '#241109'], accent: '#D9B38C' },
  { id: 'mso-badminton',      brand: 'MSO',   title: 'Badminton',                   date: '14 JUN', category: 'SPORTS',   status:'past',     year: '2026', colors: ['#2A9D8F', '#14532D'], accent: '#B7F0D8' },
  { id: 'mso-agile',          brand: 'MSO',   title: 'Agile Workshop',              date: '13 JUN', category: 'CAREER',   status:'past',      year: '2026', colors: ['#457B9D', '#0D1F2D'], accent: '#A8D0E6' },
  { id: 'mso-speedfriending', brand: 'MSO',   title: 'Speedfriending',              date: '5 JUN',  category: 'SOCIAL', status:'past',   year: '2026', colors: ['#264653', '#0B1F26'], accent: '#7FB3C4' },
  { id: 'mso-saharanights',   brand: 'MSO',   title: 'Pub Crawl - Sahara Nights',   date: '25 APR', category: 'SOCIAL',  status:'past',     year: '2026', colors: ['#B5179E', '#3A0CA3'], accent: '#F4B8E8' },
  { id: 'mso-netball',        brand: 'MSO',   title: 'Netball',                     date: '17 APR', category: 'SPORTS', status:'past',   year: '2026', colors: ['#C97B3C', '#5A2E12'], accent: '#F2C79B' },
  { id: 'mso-study&brew',     brand: 'MSO',   title: 'Study & Brew',                date: '17 APR', category: 'SOCIAL',  status:'past',     year: '2026', colors: ['#7209B7', '#1A0533'], accent: '#C9A0FF' },
  { id: 'mso-network',        brand: 'MSO',   title: 'Panel Talk X Networking',     date: '11 APR', category: 'CAREER',   status:'past',    year: '2026', colors: ['#48CAE4', '#023047'], accent: '#CAF0F8' },
  { id: 'mso-handball',       brand: 'MSO',   title: 'Handball',                    date: '10 APR', category: 'SPORTS',   status:'past',     year: '2026', colors: ['#E9C46A', '#7A5A12'], accent: '#FFF2CC' },
  { id: 'mso-football',       brand: 'MSO',   title: 'Football with SUAMS',         date: '3 APR',  category: 'SPORTS',   status:'past',        year: '2026', colors: ['#F72585', '#240046'], accent: '#FFB3D9' },
  { id: 'mso-inm',            brand: 'MSO',   title: 'International Night Market',  date: '1 APR',  category: 'SOCIAL',   status:'past',     year: '2026', colors: ['#2B9348', '#0B3D1A'], accent: '#A7E8BD' },

  { id: 'mso-daytrip',        brand: 'MSO',   title: 'Day Trip',                    date: '25 MAR', category: 'SOCIAL',    status:'past',    year: '2026', colors: ['#FF8B33', '#7A1E00'], accent: '#FFD9B0' },

]
