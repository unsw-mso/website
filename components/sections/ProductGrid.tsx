'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/utils/gsap'
import SectionLabel from '@/components/ui/SectionLabel'
import ProductCard from '@/components/cards/ProductCard'
import { products, type Product } from '@/lib/data/merch'

export default function ProductGrid({ onBuy }: { onBuy: (p: Product) => void }) {
  const section = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-product]', {
        y: 60,
        opacity: 0,
        duration: 0.75,
        ease: 'back.out(1.3)',
        stagger: { each: 0.08, grid: 'auto', from: 'start' },
        clearProps: 'transform',
        scrollTrigger: { trigger: section.current, start: 'top 80%', once: true },
      })
    },
    { scope: section },
  )

  return (
    <section id="products" ref={section} className="px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <SectionLabel>The Collection</SectionLabel>
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} data-product className="flex">
              <ProductCard product={product} onBuy={onBuy} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}