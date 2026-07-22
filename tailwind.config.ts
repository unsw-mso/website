import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './providers/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:          'var(--bg)',
        surface:     'var(--surface)',
        'surface-2': 'var(--surface-2)',
        text:        'var(--text)',
        'text-60':   'var(--text-60)',
        'text-muted':'var(--text-muted)',
        line:        'var(--border)',
        primary:     'var(--primary)',
        'primary-dark':  'var(--primary-dark)',
        'primary-light': 'var(--primary-light)',
        'orange-tint':   'var(--orange-tint)',
      },
      fontFamily: {
        // Wired up by next/font in layout.tsx
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        sm:   'var(--r-sm)',
        md:   'var(--r-md)',
        lg:   'var(--r-lg)',
        xl:   'var(--r-xl)',
        pill: 'var(--r-pill)',
      },
      transitionTimingFunction: {
        bounce: 'var(--ease-bounce)',
        soft:   'var(--ease-soft)',
      },
      boxShadow: {
        soft:  'var(--shadow)',
        glow:  '0 0 48px var(--orange-glow)',
      },
    },
  },
  plugins: [],
}
export default config