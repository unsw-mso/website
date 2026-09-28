/**
 * ALL MSO EVENTS — the single source of truth.
 *
 * Every page reads from this list:
 *   - /events “Upcoming” cards + their detail panel  → status: 'upcoming'
 *   - /gallery archive sphere + home “Recent Events” → status: 'past'
 * Flip 'status' to move an event between them. Order matters: keep the
 * list newest-first (home “Recent Events” shows the first 10 past events).
 *
 * Fields
 *   id               unique slug; also the default image name (see image)
 *   title            event name
 *   date             display date, e.g. '25 JUL'
 *   year             e.g. '2026'
 *   time             optional, e.g. '6:00 PM – 9:00 PM' ('' = hidden)
 *   status           'upcoming' | 'past'
 *   category         'SOCIAL' | 'SPORTS' | 'CAREER' (pill on cards/panels)
 *   location         optional, e.g. 'Roundhouse, UNSW' ('' = hidden)
 *   description      optional text shown in the detail panel ('' = hidden)
 *   registrationLink optional sign-up URL; shows a Register button ('' = hidden)
 *   image            thumbnail / card art path under /public, e.g.
 *                    '/images/cards/mso-netball.png' — change it to swap
 *                    the picture (put the file in /public/images/…)
 *   detailImage      optional different image for the detail panel
 *   colors           [top, bottom] gradient used when an image is missing
 *   accent           small accent colour on the sphere card art
 *   brand            label printed on the sphere card art (usually 'MSO')
 *
 * Remember to compress images before adding them!
 */

export type EventCategory = 'SOCIAL' | 'SPORTS' | 'CAREER'
export type EventStatus = 'upcoming' | 'past'

export interface EventItem {
  id: string
  title: string
  date: string
  year: string
  time?: string
  status: EventStatus
  category: EventCategory
  location?: string
  description?: string
  registrationLink?: string
  image?: string
  detailImage?: string
  colors: [string, string]
  accent: string
  brand: string
}

export const events: EventItem[] = [
  {
    id: 'mso-testtttt',
    title: 'TEST',
    date: '25 JUL',
    year: '2026',
    time: '',
    status: 'upcoming',
    category: 'SPORTS',
    location: '',
    description: '',
    registrationLink: '',
    colors: ['#FF8B33', '#7A1E00'],
    accent: '#FFD9B0',
    brand: 'MSO',
  },
  {
    id: 'mso-volleyball',
    title: 'Volleyball',
    date: '25 JUL',
    year: '2026',
    time: '',
    status: 'upcoming',
    category: 'SPORTS',
    location: '',
    description: '',
    registrationLink: '',
    image: '/images/cards/mso-volleyball.png',
    colors: ['#FF8B33', '#7A1E00'],
    accent: '#FFD9B0',
    brand: 'MSO',
  },
  {
    id: 'mso-captainball',
    title: 'Captainball',
    date: '18 JUL',
    year: '2026',
    time: '',
    status: 'upcoming',
    category: 'SPORTS',
    location: '',
    description: '',
    registrationLink: '',
    image: '/images/cards/mso-captainball.png',
    colors: ['#1D1D1D', '#FF6B00'],
    accent: '#FF8B33',
    brand: 'MSO',
  },
  {
    id: 'mso-racialharmony',
    title: 'Racial Harmony Day',
    date: '24 JUL',
    year: '2026',
    time: '',
    status: 'upcoming',
    category: 'SOCIAL',
    location: '',
    description: '',
    registrationLink: '',
    image: '/images/cards/mso-racialharmony.png',
    colors: ['#3A0CA3', '#F72585'],
    accent: '#FFC2E2',
    brand: 'MSO',
  },
  {
    id: 'mso-munch&mingle',
    title: 'Munch & Mingle',
    date: '17 JUL',
    year: '2026',
    time: '',
    status: 'past',
    category: 'SOCIAL',
    location: '',
    description: '',
    image: '/images/cards/mso-munch&mingle.png',
    colors: ['#0EA5A0', '#053B39'],
    accent: '#8AF0EC',
    brand: 'MSO',
  },
  {
    id: 'mso-slice&settle',
    title: 'Slice & Settle',
    date: '14 JUL',
    year: '2026',
    time: '',
    status: 'past',
    category: 'SOCIAL',
    location: '',
    description: '',
    image: '/images/cards/mso-slice&settle.png',
    colors: ['#FF6B00', '#B23A00'],
    accent: '#FFD0A8',
    brand: 'MSO',
  },
  {
    id: 'mso-gaming',
    title: 'Gaming Tournament',
    date: '4 JUL',
    year: '2026',
    time: '',
    status: 'past',
    category: 'SOCIAL',
    location: '',
    description: '',
    image: '/images/cards/mso-gaming.png',
    colors: ['#F2C14E', '#8A5A00'],
    accent: '#FFF0C2',
    brand: 'MSO',
  },
  {
    id: 'mso-runclub',
    title: 'Run Club',
    date: '21 JUN',
    year: '2026',
    time: '',
    status: 'past',
    category: 'SPORTS',
    location: '',
    description: '',
    image: '/images/cards/mso-runclub.png',
    colors: ['#E63946', '#4B0A0F'],
    accent: '#FFB3B8',
    brand: 'MSO',
  },
  {
    id: 'mso-basketball',
    title: 'Basketball',
    date: '19 JUN',
    year: '2026',
    time: '',
    status: 'past',
    category: 'SPORTS',
    location: '',
    description: '',
    image: '/images/cards/mso-basketball.png',
    colors: ['#6F4E37', '#241109'],
    accent: '#D9B38C',
    brand: 'MSO',
  },
  {
    id: 'mso-badminton',
    title: 'Badminton',
    date: '14 JUN',
    year: '2026',
    time: '',
    status: 'past',
    category: 'SPORTS',
    location: '',
    description: '',
    image: '/images/cards/mso-badminton.png',
    colors: ['#2A9D8F', '#14532D'],
    accent: '#B7F0D8',
    brand: 'MSO',
  },
  {
    id: 'mso-agile',
    title: 'Agile Workshop',
    date: '13 JUN',
    year: '2026',
    time: '',
    status: 'past',
    category: 'CAREER',
    location: '',
    description: '',
    image: '/images/cards/mso-agile.png',
    colors: ['#457B9D', '#0D1F2D'],
    accent: '#A8D0E6',
    brand: 'MSO',
  },
  {
    id: 'mso-speedfriending',
    title: 'Speedfriending',
    date: '5 JUN',
    year: '2026',
    time: '',
    status: 'past',
    category: 'SOCIAL',
    location: '',
    description: '',
    image: '/images/cards/mso-speedfriending.png',
    colors: ['#264653', '#0B1F26'],
    accent: '#7FB3C4',
    brand: 'MSO',
  },
  {
    id: 'mso-saharanights',
    title: 'Pub Crawl - Sahara Nights',
    date: '25 APR',
    year: '2026',
    time: '',
    status: 'past',
    category: 'SOCIAL',
    location: '',
    description: '',
    image: '/images/cards/mso-saharanights.png',
    colors: ['#B5179E', '#3A0CA3'],
    accent: '#F4B8E8',
    brand: 'MSO',
  },
  {
    id: 'mso-netball',
    title: 'Netball',
    date: '17 APR',
    year: '2026',
    time: '',
    status: 'past',
    category: 'SPORTS',
    location: '',
    description: '',
    image: '/images/cards/mso-netball.png',
    colors: ['#C97B3C', '#5A2E12'],
    accent: '#F2C79B',
    brand: 'MSO',
  },
  {
    id: 'mso-study&brew',
    title: 'Study & Brew',
    date: '17 APR',
    year: '2026',
    time: '',
    status: 'past',
    category: 'SOCIAL',
    location: '',
    description: '',
    image: '/images/cards/mso-study&brew.png',
    colors: ['#7209B7', '#1A0533'],
    accent: '#C9A0FF',
    brand: 'MSO',
  },
  {
    id: 'mso-network',
    title: 'Panel Talk X Networking',
    date: '11 APR',
    year: '2026',
    time: '',
    status: 'past',
    category: 'CAREER',
    location: '',
    description: '',
    image: '/images/cards/mso-network.png',
    colors: ['#48CAE4', '#023047'],
    accent: '#CAF0F8',
    brand: 'MSO',
  },
  {
    id: 'mso-handball',
    title: 'Handball',
    date: '10 APR',
    year: '2026',
    time: '',
    status: 'past',
    category: 'SPORTS',
    location: '',
    description: '',
    image: '/images/cards/mso-handball.png',
    colors: ['#E9C46A', '#7A5A12'],
    accent: '#FFF2CC',
    brand: 'MSO',
  },
  {
    id: 'mso-football',
    title: 'Football with SUAMS',
    date: '3 APR',
    year: '2026',
    time: '',
    status: 'past',
    category: 'SPORTS',
    location: '',
    description: '',
    image: '/images/cards/mso-football.png',
    colors: ['#F72585', '#240046'],
    accent: '#FFB3D9',
    brand: 'MSO',
  },
  {
    id: 'mso-inm',
    title: 'International Night Market',
    date: '1 APR',
    year: '2026',
    time: '',
    status: 'past',
    category: 'SOCIAL',
    location: '',
    description: '',
    image: '/images/cards/mso-inm.png',
    colors: ['#2B9348', '#0B3D1A'],
    accent: '#A7E8BD',
    brand: 'MSO',
  },
  {
    id: 'mso-daytrip',
    title: 'Day Trip',
    date: '25 MAR',
    year: '2026',
    time: '',
    status: 'past',
    category: 'SOCIAL',
    location: '',
    description: '',
    image: '/images/cards/mso-daytrip.png',
    colors: ['#FF8B33', '#7A1E00'],
    accent: '#FFD9B0',
    brand: 'MSO',
  },
]

/* ── helpers ─────────────────────────────────────────────── */

/** Card art: the event's own `image`, else /images/cards/<id>.png. */
export const eventImage = (e: EventItem) => e.image || `/images/cards/${e.id}.png`

/** Detail-panel image: `detailImage` if set, else the card art. */
export const eventDetailImage = (e: EventItem) => e.detailImage || eventImage(e)

/** e.g. "25 JUL 2026 · 6:00 PM – 9:00 PM" (time left off when not set). */
export const eventWhen = (e: EventItem) =>
  [`${e.date} ${e.year}`, e.time].filter(Boolean).join(' · ')

export const upcomingEvents = events.filter((e) => e.status === 'upcoming')
export const pastEvents = events.filter((e) => e.status === 'past')
