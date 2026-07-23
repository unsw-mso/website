import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { products } from '@/lib/data/merch'

/**
 * Server-side payment completion.
 *
 * This route MUST exist — Square's client SDK only tokenises the card.
 * Charging it requires your secret access token, which can never ship
 * to the browser. Anything in NEXT_PUBLIC_* is visible to users.
 */
export async function POST(request: Request) {
  try {
    const { sourceId, productId } = await request.json()

    // Price lookup happens HERE, from trusted server-side data.
    const product = products.find((p) => p.id === productId)
    if (!product) {
      return NextResponse.json({ error: 'Unknown product' }, { status: 400 })
    }

    const base =
      process.env.SQUARE_ENVIRONMENT === 'production'
        ? 'https://connect.squareup.com'
        : 'https://connect.squareupsandbox.com'

    const response = await fetch(`${base}/v2/payments`, {
      method: 'POST',
      headers: {
        'Square-Version': '2025-01-23',
        Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_id: sourceId,
        // Guards against a double-charge if the request is retried
        idempotency_key: randomUUID(),
        amount_money: {
          amount: product.priceCents,
          currency: product.currency,
        },
        location_id: process.env.SQUARE_LOCATION_ID,
      }),
    })

    const data = await response.json()
    if (!response.ok) {
      console.error('Square error:', data)
      return NextResponse.json(
        { error: data?.errors?.[0]?.detail ?? 'Payment declined' },
        { status: 400 },
      )
    }

    return NextResponse.json({ ok: true, paymentId: data.payment?.id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}