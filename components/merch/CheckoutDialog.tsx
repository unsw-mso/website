'use client'

import { useState } from 'react'
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk'
import { formatPrice, type Product } from '@/lib/data/merch'

type Status = 'idle' | 'processing' | 'success' | 'error'

export default function CheckoutDialog({
  product,
  onClose,
}: {
  product: Product | null
  onClose: () => void
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center
                 bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Checkout for ${product.name}`}
    >
      <div
        // Stop clicks inside the panel bubbling up and closing it
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl border border-line bg-surface p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-2xl font-bold uppercase
                           tracking-tight text-text">
              {product.name}
            </h3>
            <span className="font-heading text-lg font-bold text-primary">
              {formatPrice(product.priceCents, product.currency)}
            </span>
          </div>
          <button
            onClick={onClose}
            data-cursor="hover"
            aria-label="Close checkout"
            className="font-heading text-sm uppercase tracking-widest text-text-muted"
          >
            Close
          </button>
        </div>

        {status === 'success' ? (
          <p className="py-8 text-center text-text">
            Order confirmed. Check your email for pickup details.
          </p>
        ) : (
          <PaymentForm
            applicationId={process.env.NEXT_PUBLIC_SQUARE_APP_ID!}
            locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!}
            /* Square tokenises the card IN AN IFRAME it controls. Your
               JavaScript never touches the card number — you only ever
               receive an opaque single-use token. This is what keeps
               you out of PCI-DSS scope, and it's why the card fields
               must come from this component rather than your own inputs. */
            cardTokenizeResponseReceived={async (token) => {
            /* TokenResult has FOUR variants:
                   OK      → has .token
                   ERROR   → has .errors  (validation, declined card)
                   ABORT   → user dismissed the form
                   UNKNOWN → SDK failure with no detail
                 Only ERROR carries an `errors` array, so we test for it
                 explicitly rather than testing "not OK". */

              if (token.status === 'Error') {
                setStatus('error')
                setMessage(
                  token.errors?.[0]?.message ??
                    'Card details could not be verified. Please check and try again.',
                )
                return
              }

              // ABORT / UNKNOWN — nothing useful to report
              if (token.status !== 'OK' || !token.token) {
                setStatus('error')
                setMessage('Payment was not completed. Please try again.')
                return
              }

              setStatus('processing')
              try {
                const res = await fetch('/api/checkout', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    sourceId: token.token,
                    // Send the product ID, NOT the price. The server
                    // looks the price up itself — otherwise anyone can
                    // edit the request and buy a hoodie for 1 cent.
                    productId: product.id,
                  }),
                })
                const data = await res.json()
                if (!res.ok) throw new Error(data.error ?? 'Payment failed')
                setStatus('success')
              } catch (err) {
                setStatus('error')
                setMessage(err instanceof Error ? err.message : 'Payment failed')
              }
            }}
          >
            <CreditCard />
          </PaymentForm>
        )}

        {status === 'processing' && (
          <p className="mt-4 text-sm text-text-muted">Processing…</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-sm text-primary">{message}</p>
        )}
      </div>
    </div>
  )
}