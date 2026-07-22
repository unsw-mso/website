export type Theme = 'dark' | 'light'

/**
 * The <html data-theme> attribute is the single source of truth — it's
 * set by the inline no-flash script in layout.tsx before React exists.
 * React subscribes to it rather than owning it.
 */
let listeners: Array<() => void> = []

export function subscribe(callback: () => void) {
  listeners.push(callback)
  // useSyncExternalStore requires an unsubscribe function back
  return () => {
    listeners = listeners.filter((l) => l !== callback)
  }
}

/** Read the live value. Only ever runs in the browser. */
export function getSnapshot(): Theme {
  return (document.documentElement.getAttribute('data-theme') as Theme) ?? 'dark'
}

/**
 * What the SERVER renders, and what React hydrates against.
 * Must be a stable constant — there's no DOM to read on the server.
 * React re-renders with the real value immediately after hydration.
 */
export function getServerSnapshot(): Theme {
  return 'dark'
}

export function setTheme(next: Theme) {
  document.documentElement.setAttribute('data-theme', next)
  try {
    localStorage.setItem('mso-theme', next)
  } catch {
    // Safari private mode throws on localStorage — theme still works,
    // it just won't persist across reloads.
  }
  // Tell every subscribed component to re-read
  listeners.forEach((l) => l())
}