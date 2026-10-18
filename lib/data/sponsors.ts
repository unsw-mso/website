/**
 * ALL MSO SPONSORS — edit this list to change the sponsors page, the
 * "Our Sponsors" strip, and each sponsor's detail panel.
 *
 * Fields
 *   id          unique id
 *   name        shown in the strip and as the panel title
 *   logoUrl     image path under /public ('' → name shown as a wordmark)
 *   description text shown in the panel when the sponsor is clicked
 *   website     optional URL; adds a "Visit website" button to the panel
 *   featured    optional; true → shown in the centred top row on the
 *               sponsors page, above everyone else
 */
export interface Sponsor {
  id: string
  name: string
  logoUrl: string
  description?: string
  website?: string
  featured?: boolean
}

export const sponsors: Sponsor[] = [
  {
    id: 's1',
    name: 'Kao Kao',
    logoUrl: '/images/sponsors/kaokao.webp',
    description:
      'Kao Kao proudly supports UNSW MSO, helping us run the events and community that make Malaysia feel a little closer to home.',
    // website: 'https://…',
  },
  {
    id: 's2',
    name: 'Dynasty Karaoke',
    logoUrl: '/images/sponsors/dynastykar.webp',
    description:
      'Dynasty Karaoke proudly supports UNSW MSO, helping us run the events and community that make Malaysia feel a little closer to home.',
    // website: 'https://…',
  },
  {
    id: 's3',
    name: 'Future Spects Pty Ltd',
    logoUrl: '/images/sponsors/keku.webp',
    description:
      'Future Spects Pty Ltd proudly supports UNSW MSO, helping us run the events and community that make Malaysia feel a little closer to home.',
    // website: 'https://…',
  },
  {
    id: 's4',
    name: 'Tiger Pocha',
    logoUrl: '/images/sponsors/tigerpocha.webp',
    description:
      'Tiger Pocha proudly supports UNSW MSO, helping us run the events and community that make Malaysia feel a little closer to home.',
    // website: 'https://…',
  },
  {
    id: 's5',
    name: 'Education Malaysia Australia',
    logoUrl: '/images/sponsors/ema.webp',
    description:
      'Education Malaysia Australia proudly supports UNSW MSO, helping us run the events and community that make Malaysia feel a little closer to home.',
    featured: true,
    // website: 'https://…',
  },
  {
    id: 's6',
    name: 'Singapore Global Network',
    logoUrl: '/images/sponsors/sgn.webp',
    description:
      'Singapore Global Network proudly supports UNSW MSO, helping us run the events and community that make Malaysia feel a little closer to home.',
    featured: true,
    // website: 'https://…',
  },
]
