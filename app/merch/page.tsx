'use client'

import { useState } from 'react'
import VideoHero from '@/components/sections/VideoHero'
import ProductGrid from '@/components/sections/ProductGrid'
import FeaturedProduct from '@/components/sections/FeaturedProduct'
import CheckoutDialog from '@/components/merch/CheckoutDialog'
import SlideOverPanel from '@/components/ui/SlideOverPanel'
import { formatPrice, type Product } from '@/lib/data/merch'

const PRODUCT_BG =
  'linear-gradient(140deg, var(--surface-2) 0%, var(--primary-dark) 170%)'

export default function MerchPage() {
  // `detail` drives the slide-in panel (tap a product); `checkout` drives the
  // existing purchase dialog, opened from the panel's Buy button or Featured.
  const [detail, setDetail] = useState<Product | null>(null)
  const [checkout, setCheckout] = useState<Product | null>(null)

  return (
    <main>
      <VideoHero />
      {/* Featured sits on top of the rest of the collection */}
      <FeaturedProduct onBuy={setCheckout} />
      <ProductGrid onSelect={setDetail} />

      {detail && (
        <SlideOverPanel
          onClose={() => setDetail(null)}
          eyebrow="Merch"
          title={detail.name}
          meta={formatPrice(detail.priceCents, detail.currency)}
          imageSrc={detail.imageUrl || undefined}
          imageBg={PRODUCT_BG}
          description={detail.description}
          footer={
            <button
              onClick={() => {
                setCheckout(detail)
                setDetail(null)
              }}
              data-cursor="hover"
              className="rounded-pill bg-primary px-9 py-3.5 font-heading text-[13px]
                         font-bold uppercase tracking-widest text-white transition-transform
                         duration-300 ease-bounce hover:scale-105 active:scale-95"
            >
              Buy now — {formatPrice(detail.priceCents, detail.currency)}
            </button>
          }
        />
      )}

      <CheckoutDialog product={checkout} onClose={() => setCheckout(null)} />
    </main>
  )
}
