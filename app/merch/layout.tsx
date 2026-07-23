import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Merch',
  description: 'Hoodies, tees and totes. Rep your roots with official UNSW MSO merch.',
}

export default function MerchLayout({ children }: { children: React.ReactNode }) {
  return children
}