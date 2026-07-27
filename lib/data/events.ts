import { galleryCards, cardImage, type GalleryCard } from '@/components/gallery/galleryData'

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

/* Events now live in ONE place — components/gallery/galleryData.ts. These two
   lists are derived from it by `status`, so flipping an event upcoming↔past in
   galleryData moves it between the Upcoming section and the archive/past grid
   automatically, with no edits here. */
const toEventType = (c: GalleryCard): EventType => ({
  id: c.id,
  title: c.title,
  date: `${c.date} ${c.year}`,
  location: c.location ?? c.category,
  description: c.description ?? '',
  imageUrl: cardImage(c),
  registrationLink: c.registrationLink ?? '#',
  past: c.status === 'past',
  year: c.year,
})

export const upcomingEvents: EventType[] = galleryCards
  .filter((c) => c.status === 'upcoming')
  .map(toEventType)

export const pastEvents: EventType[] = galleryCards
  .filter((c) => c.status === 'past')
  .map(toEventType)
