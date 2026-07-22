'use client'

/**
 * The small orange "— UPCOMING EVENTS" label that opens most sections.
 * Purely presentational, but centralised so the tracking and size stay
 * identical everywhere. Inconsistent section labels are one of the
 * fastest ways to make a site feel amateur.
 */
export default function SectionLabel({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`inline-block font-heading text-[12px] font-semibold
                  uppercase tracking-[0.3em] text-primary ${className}`}
    >
      — {children}
    </span>
  )
}