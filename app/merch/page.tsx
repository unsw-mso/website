'use client'

import { useState } from 'react'
import VideoHero from '@/components/sections/VideoHero'
import ProductGrid from '@/components/sections/ProductGrid'
import FeaturedProduct from '@/components/sections/FeaturedProduct'
import CheckoutDialog from '@/components/merch/CheckoutDialog'
import type { Product } from '@/lib/data/merch'

export default function MerchPage() {
  // Checkout state lives at page level so both the grid and the featured
  // section open the same dialog.
  const [selected, setSelected] = useState<Product | null>(null)

  return (
    <main>
      <VideoHero />
      <ProductGrid onBuy={setSelected} />
      <FeaturedProduct onBuy={setSelected} />
      <CheckoutDialog product={selected} onClose={() => setSelected(null)} />
    </main>
  )
}