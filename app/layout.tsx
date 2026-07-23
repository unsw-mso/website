import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import 'lenis/dist/lenis.css'

import LenisProvider from '@/providers/LenisProvider'
import CustomCursor from '@/components/ui/CustomCursor'
import ThemeFlap from '@/components/ui/ThemeFlap'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

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
    default: 'UNSW MSO — Malaysian Students Organisation',
    template: '%s · UNSW MSO',
  },
  description: 
    "Malaysia's home at UNSW. Events, community and culture for Malaysian students in Sydney.",
    
  // Required for Open Graph images to resolve to absolute URLs
  // !!! Swap unswmso.org for your real domain when you have it.
  metadataBase: new URL('https://unswmso.org'),
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

// Runs BEFORE first paint so a light-mode user never sees a black flash
const noFlashScript = `
(function(){
  try {
    var t = localStorage.getItem('mso-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch(e) {
    document.documentElement.setAttribute('data-theme','dark');
  }
})();`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="font-body antialiased">
          <LenisProvider>
            <CustomCursor />
            <Navbar />
            {children}
            <Footer />
            <ThemeFlap />
          </LenisProvider>
      </body>
    </html>
  )
}