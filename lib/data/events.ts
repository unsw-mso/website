export interface EventType {
  id: string
  title: string
  date: string
  location: string
  description: string
  imageUrl: string          // '' → card renders a gradient fallback
  registrationLink?: string
  past: boolean
  year?: string             // display-only, used by the past-events grid
}

export const upcomingEvents: EventType[] = [
  {
    id: 'mamak-night-2026',
    title: 'Mamak Night',
    date: '14 Aug 2026',
    location: 'Roundhouse, UNSW',
    description:
      'Late-night roti canai, teh tarik and card games. First event of term — bring a friend, leave with ten.',
    imageUrl: '',
    registrationLink: '#',
    past: false,
  },
  {
    id: 'merdeka-gala-2026',
    title: 'Merdeka Gala',
    date: '31 Aug 2026',
    location: 'Doltone House',
    description:
      'Our biggest night of the year. Formal dinner, live performances and Merdeka pride in full colour.',
    imageUrl: '',
    registrationLink: '#',
    past: false,
  },
  {
    id: 'sports-day-2026',
    title: 'Sports Day',
    date: '12 Sep 2026',
    location: 'Village Green',
    description:
      'Badminton, futsal and captain ball. Teams drawn on the day — bragging rights all semester.',
    imageUrl: '',
    registrationLink: '#',
    past: false,
  },
  {
    id: 'kopitiam-study-jam-2026',
    title: 'Kopitiam Study Jam',
    date: '3 Oct 2026',
    location: 'Main Library',
    description:
      'Exam-season study session with kopi, kaya toast and shared misery. You bring notes, we bring snacks.',
    imageUrl: '',
    registrationLink: '#',
    past: false,
  },
]

export const pastEvents: EventType[] = [
  { id: 'night-market-25',  title: 'Night Market',      date: '2025', year: '2025', location: 'Quadrangle',   description: '', imageUrl: '', past: true },
  { id: 'merdeka-25',       title: 'Merdeka Gala',      date: '2025', year: '2025', location: 'Doltone House',description: '', imageUrl: '', past: true },
  { id: 'welcome-bbq-25',   title: 'Welcome BBQ',       date: '2025', year: '2025', location: 'Village Green',description: '', imageUrl: '', past: true },
  { id: 'cultural-fest-24', title: 'Cultural Fest',     date: '2024', year: '2024', location: 'Roundhouse',   description: '', imageUrl: '', past: true },
  { id: 'sports-day-24',    title: 'Sports Day',        date: '2024', year: '2024', location: 'Village Green',description: '', imageUrl: '', past: true },
  { id: 'hari-raya-24',     title: 'Hari Raya Dinner',  date: '2024', year: '2024', location: 'Sir John Clancy', description: '', imageUrl: '', past: true },
]