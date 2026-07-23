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
  { id: 'p1', name: 'Harimau Hoodie',  description: 'Heavyweight 400gsm fleece in jet black, tiger crest embroidered in orange. Designed by members, made for Sydney winters and Malaysian pride.', priceCents: 7900, currency: 'AUD', imageUrl: '', featured: true },
  { id: 'p2', name: 'MSO Classic Tee', description: 'Soft cotton tee with the MSO wordmark.',        priceCents: 3900, currency: 'AUD', imageUrl: '', featured: false },
  { id: 'p3', name: 'Kopitiam Tote',   description: 'Canvas tote for groceries, books and kaya.',    priceCents: 2500, currency: 'AUD', imageUrl: '', featured: false },
  { id: 'p4', name: 'Tiger Cap',       description: 'Embroidered six-panel cap.',                    priceCents: 3200, currency: 'AUD', imageUrl: '', featured: false },
  { id: 'p5', name: 'Merdeka Jersey',  description: 'Limited-run jersey in Merdeka colours.',        priceCents: 6500, currency: 'AUD', imageUrl: '', featured: false },
  { id: 'p6', name: 'Sticker Pack',    description: 'Six vinyl stickers. Laptop, bottle, whatever.', priceCents: 800,  currency: 'AUD', imageUrl: '', featured: false },
]

export const featuredProduct = products.find((p) => p.featured) ?? products[0]