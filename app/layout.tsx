import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import 'lenis/dist/lenis.css'

import LenisProvider from '@/providers/LenisProvider'
import CustomCursor from '@/components/ui/CustomCursor'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CursorGrid from '@/components/ui/CursorGrid'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'MSO',
    template: '%s · MSO',
  },
  description: 
    "Malaysia's home at UNSW. Events, community and culture for Malaysian students in Sydney.",
    
  // Required for Open Graph images to resolve to absolute URLs
  // !!! Swap unswmso.org for your real domain when you have it.
  metadataBase: new URL('https://www.unswmso.com'),
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any'},
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'UNSW MSO',
    title: 'UNSW MSO — Malaysian Students Organisation',
    description: "Malaysia's home at UNSW.",
    images: ['/images/committee.jpg'],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="font-body antialiased">
          {/* Site-wide backdrop. Lives here (not in a page) so it sits outside
              template.tsx's transformed wrapper, which would trap `fixed`.
              -z-10 still paints above the body background; it listens on
              window because page content covers it. */}
          <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
            <CursorGrid
              cellSize={55}
              color="#F97316"
              radius={140}
              falloff="smooth"
              holdTime={100}
              fadeDuration={400}
              lineWidth={1.2}
              maxOpacity={1}
              fillOpacity={0}
              gridOpacity={0.05}
              cellRadius={0}
              clickPulse
              pulseSpeed={450}
              listenOnWindow
              hoverGlow={false}
            />
          </div>
          <LenisProvider>
            <CustomCursor />
            <Navbar />
            {children}
            <Footer />
          </LenisProvider>
          <Analytics />
      </body>
    </html>
  )
}