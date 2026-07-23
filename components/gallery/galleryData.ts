/**
 * Card content for the spherical gallery. Each entry becomes one textured
 * plane tiled onto the inside of a sphere. Styling is modelled on the
 * phantom.land work-grid: a small brand label + project name across the top,
 * a colourful "image" in the middle, and category + tag pills + year below.
 *
 * We draw the whole tile procedurally onto a <canvas> (see SphereGallery), so
 * every card is self-contained — no external image requests, and the palette
 * stays coherent with the MSO orange system.
 */

export interface GalleryCard {
  id: string
  brand: string
  title: string
  category: 'EXPERIENCE' | 'COMMUNITY' | 'CULTURE' | 'EVENT'
  tags: string[]
  year: string
  /** [top, bottom] gradient stops for the image area */
  colors: [string, string]
  /** small overlay accent used for the orbit/glyph mark */
  accent: string
}

export const galleryCards: GalleryCard[] = [
  { id: 'merdeka-gala',    brand: 'MSO',   title: 'Merdeka Gala',        category: 'EVENT',      tags: ['FORMAL', 'STAGE'],       year: '2026', colors: ['#FF8B33', '#7A1E00'], accent: '#FFD9B0' },
  { id: 'mamak-night',     brand: 'MSO',   title: 'Mamak Night',         category: 'COMMUNITY',  tags: ['FOOD', 'SOCIAL'],        year: '2026', colors: ['#1D1D1D', '#FF6B00'], accent: '#FF8B33' },
  { id: 'night-market',    brand: 'MSO',   title: 'Pasar Malam',         category: 'CULTURE',    tags: ['MARKET', 'STALLS'],      year: '2025', colors: ['#3A0CA3', '#F72585'], accent: '#FFC2E2' },
  { id: 'sports-day',      brand: 'MSO',   title: 'Sports Day',          category: 'EVENT',      tags: ['FUTSAL', 'TEAMS'],       year: '2026', colors: ['#0EA5A0', '#053B39'], accent: '#8AF0EC' },
  { id: 'hari-raya',       brand: 'MSO',   title: 'Hari Raya Dinner',    category: 'CULTURE',    tags: ['FEAST', 'FAMILY'],       year: '2024', colors: ['#F2C14E', '#8A5A00'], accent: '#FFF0C2' },
  { id: 'welcome-bbq',     brand: 'MSO',   title: 'Welcome BBQ',         category: 'COMMUNITY',  tags: ['GRILL', 'GREEN'],        year: '2025', colors: ['#FF6B00', '#B23A00'], accent: '#FFD0A8' },
  { id: 'cultural-fest',   brand: 'MSO',   title: 'Cultural Fest',       category: 'CULTURE',    tags: ['DANCE', 'MUSIC'],        year: '2024', colors: ['#E63946', '#4B0A0F'], accent: '#FFB3B8' },
  { id: 'kopitiam-jam',    brand: 'MSO',   title: 'Kopitiam Study Jam',  category: 'COMMUNITY',  tags: ['KOPI', 'EXAMS'],         year: '2026', colors: ['#6F4E37', '#241109'], accent: '#D9B38C' },
  { id: 'batik-workshop',  brand: 'MSO',   title: 'Batik Workshop',      category: 'CULTURE',    tags: ['CRAFT', 'WAX'],          year: '2025', colors: ['#2A9D8F', '#14532D'], accent: '#B7F0D8' },
  { id: 'orientation',     brand: 'UNSW',  title: 'O-Week Booth',        category: 'EXPERIENCE', tags: ['STALL', 'MERCH'],        year: '2026', colors: ['#264653', '#0B1F26'], accent: '#7FB3C4' },
  { id: 'futsal-cup',      brand: 'MSO',   title: 'Futsal Cup',          category: 'EVENT',      tags: ['SPORT', 'FINALS'],       year: '2025', colors: ['#457B9D', '#0D1F2D'], accent: '#A8D0E6' },
  { id: 'teh-tarik',       brand: 'MSO',   title: 'Teh Tarik Social',    category: 'COMMUNITY',  tags: ['DRINKS', 'CHILL'],       year: '2026', colors: ['#C97B3C', '#5A2E12'], accent: '#F2C79B' },
  { id: 'lantern',         brand: 'MSO',   title: 'Lantern Night',       category: 'CULTURE',    tags: ['LIGHTS', 'QUAD'],        year: '2024', colors: ['#B5179E', '#3A0CA3'], accent: '#F4B8E8' },
  { id: 'karaoke',         brand: 'MSO',   title: 'Karaoke Night',       category: 'COMMUNITY',  tags: ['MIC', 'VOCALS'],         year: '2025', colors: ['#7209B7', '#1A0533'], accent: '#C9A0FF' },
  { id: 'roti-canai',      brand: 'MSO',   title: 'Roti Canai Jam',      category: 'CULTURE',    tags: ['FOOD', 'LIVE'],          year: '2026', colors: ['#E9C46A', '#7A5A12'], accent: '#FFF2CC' },
  { id: 'photo-walk',      brand: 'MSO',   title: 'Sydney Photo Walk',   category: 'EXPERIENCE', tags: ['CITY', 'FILM'],          year: '2025', colors: ['#48CAE4', '#023047'], accent: '#CAF0F8' },
  { id: 'gala-afters',     brand: 'MSO',   title: 'Gala Afterparty',     category: 'EVENT',      tags: ['LATE', 'DJ'],            year: '2026', colors: ['#F72585', '#240046'], accent: '#FFB3D9' },
  { id: 'volunteer-drive', brand: 'MSO',   title: 'Volunteer Drive',     category: 'COMMUNITY',  tags: ['GIVE', 'TEAM'],          year: '2025', colors: ['#2B9348', '#0B3D1A'], accent: '#A7E8BD' },
]
