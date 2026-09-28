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
 *   tier        optional pill above the panel title, e.g. 'Gold Partner'
 *               (defaults to 'Partner')
 */
export interface Sponsor {
  id: string
  name: string
  logoUrl: string
  description?: string
  website?: string
  tier?: string
}

export const sponsors: Sponsor[] = [
  {
    id: 's1',
    name: 'Kao Kao',
    logoUrl: '/images/sponsors/kaokao.png',
    description:
      'Kao Kao proudly supports UNSW MSO, helping us run the events and community that make Malaysia feel a little closer to home.',
    // website: 'https://…',
    // tier: 'Gold Partner',
  },
  {
    id: 's2',
    name: 'Dynasty Karaoke',
    logoUrl: '/images/sponsors/dynastykar.png',
    description:
      'Dynasty Karaoke proudly supports UNSW MSO, helping us run the events and community that make Malaysia feel a little closer to home.',
    // website: 'https://…',
    // tier: 'Gold Partner',
  },
  {
    id: 's3',
    name: 'Future Spects Pty Ltd',
    logoUrl: '/images/sponsors/keku.png',
    description:
      'Future Spects Pty Ltd proudly supports UNSW MSO, helping us run the events and community that make Malaysia feel a little closer to home.',
    // website: 'https://…',
    // tier: 'Gold Partner',
  },
  {
    id: 's4',
    name: 'Tiger Pocha',
    logoUrl: '/images/sponsors/tigerpocha.png',
    description:
      'Tiger Pocha proudly supports UNSW MSO, helping us run the events and community that make Malaysia feel a little closer to home.',
    // website: 'https://…',
    // tier: 'Gold Partner',
  },
]
