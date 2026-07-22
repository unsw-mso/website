'use client'

import { motion } from 'motion/react'

/**
 * Runs on EVERY route change (unlike layout.tsx, which persists).
 * We only animate the enter state — animating exits in the App Router
 * requires intercepting navigation, which fights the router and usually
 * ends up feeling laggy. A clean 0.45s enter reads as intentional.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}