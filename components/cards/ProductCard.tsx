'use client'

import Image from 'next/image'
import { formatPrice, type Product } from '@/lib/data/merch'

export default function ProductCard({
  product,
  onBuy,
}: {
  product: Product
  onBuy: (product: Product) => void
}) {
  return (
    <article
      className="group flex flex-col overflow-hidden rounded-lg border border-line
                 bg-surface transition-all duration-300 ease-bounce
                 hover:-translate-y-2 hover:border-primary hover:shadow-glow"
    >
      <div className="relative aspect-square overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500
                       ease-soft group-hover:scale-[1.06]"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center
                       transition-transform duration-500 ease-soft
                       group-hover:scale-[1.06]"
            style={{
              background:
                'linear-gradient(140deg, var(--surface-2) 0%, var(--primary-dark) 190%)',
            }}
          >
            <span className="font-heading text-6xl font-bold text-text/12">
              {product.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-7">
        <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-text">
          {product.name}
        </h3>
        <span className="font-heading text-lg font-bold text-primary">
          {formatPrice(product.priceCents, product.currency)}
        </span>
        <button
          onClick={() => onBuy(product)}
          data-cursor="hover"
          className="mt-auto w-fit rounded-pill bg-primary px-7 py-2.5
                     font-heading text-xs font-bold uppercase tracking-widest
                     text-white transition-transform duration-300 ease-bounce
                     hover:scale-105 active:scale-95"
        >
          Buy Now
        </button>
      </div>
    </article>
  )
}