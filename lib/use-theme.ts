'use client'

import { useSyncExternalStore } from 'react'
import {
  subscribe, getSnapshot, getServerSnapshot, setTheme, type Theme,
} from '@/lib/theme-store'

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  return { theme, toggle } as { theme: Theme; toggle: () => void }
}