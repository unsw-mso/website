export interface Product {
  id: string
  name: string
  description: string
  /** Cents. Integers only — never store money as a float. */
  priceCents: number
  currency: 'AUD'
  imageUrl: string
  featured: boolean
}

/** Money formatting lives here so every price renders identically. */
export function formatPrice(cents: number, currency = 'AUD') {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100)
}

export const products: Product[] = [
  { id: 'p1', name: 'Harimeow Hoodie',  description: '2025 MSO Zipup made from 100% heavyweight cotton fleece featuring dropped shoulders and an oversized cut. Built for comfort, layered with attitude. Designed to sustain the noise between daily commutes.', priceCents: 4200, currency: 'AUD', imageUrl: '/images/merch/solo-hoodie.jpg', featured: true },
  { id: 'p2', name: 'Oriental Jersey',   description: '2025 MSO Jersey made to be lightweight and sweat-wicking, where street grit meets Malaysian batik. Styled in motion, shot in transit. Made by athletes, for athletes.',    priceCents: 2100, currency: 'AUD', imageUrl: '/images/merch/jersey.jpg', featured: false },
  { id: 'p3', name: 'Olive MSO Tee (COMING SOON !)', description: 'COMING SOON - Be Patient!',        priceCents: 0, currency: 'AUD', imageUrl: '/images/merch/shirtback-26.png', featured: false },
  { id: 'p4', name: 'Guess Who? Sweater (COMING SOON !)', description: 'COMING SOON - Be Patient!',        priceCents: 0, currency: 'AUD', imageUrl: '/images/merch/sweater-26.png', featured: false },
]

export const featuredProduct = products.find((p) => p.featured) ?? products[0]