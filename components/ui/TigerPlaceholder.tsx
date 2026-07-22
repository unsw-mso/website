'use client'

/**
 * Placeholder mascot. Drop-in replacement for the eventual
 * <Image src="/images/tiger-3d.png" />.
 *
 * Deliberately built as an SVG with currentColor-free hardcoded brand
 * hexes: this thing should look identical in light and dark mode, the
 * same way a real PNG render would.
 */
export default function TigerPlaceholder({
  className = '',
  /** Flip horizontally — use for the "pointing right" Events variant. */
  flip = false,
}: {
  className?: string
  flip?: boolean
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      role="img"
      aria-label="MSO tiger mascot placeholder"
    >
      {/* Soft drop shadow so it sits in the scene rather than floating flat */}
      <ellipse cx="100" cy="182" rx="52" ry="9" fill="rgba(0,0,0,0.18)" />

      {/* Ears */}
      <circle cx="52" cy="52" r="26" fill="#FF6B00" />
      <circle cx="148" cy="52" r="26" fill="#FF6B00" />
      <circle cx="52" cy="52" r="13" fill="#FFD5B0" />
      <circle cx="148" cy="52" r="13" fill="#FFD5B0" />

      {/* Head */}
      <ellipse cx="100" cy="105" rx="72" ry="66" fill="#FF8B33" />
      <ellipse cx="100" cy="118" rx="46" ry="40" fill="#FFE8D4" />

      {/* Stripes — the read-at-a-glance tiger signal */}
      <path d="M62 62 L74 78 M50 84 L68 92 M48 108 L66 108"
            stroke="#141414" strokeWidth="7" strokeLinecap="round" />
      <path d="M138 62 L126 78 M150 84 L132 92 M152 108 L134 108"
            stroke="#141414" strokeWidth="7" strokeLinecap="round" />

      {/* Eyes */}
      <circle cx="78" cy="98" r="11" fill="#141414" />
      <circle cx="122" cy="98" r="11" fill="#141414" />
      <circle cx="81" cy="94" r="4" fill="#FFFFFF" />
      <circle cx="125" cy="94" r="4" fill="#FFFFFF" />

      {/* Nose and mouth */}
      <path d="M100 116 L92 126 L108 126 Z" fill="#141414" />
      <path d="M100 126 L100 134 M100 134 Q88 144 80 134
               M100 134 Q112 144 120 134"
            stroke="#141414" strokeWidth="5"
            strokeLinecap="round" fill="none" />

      {/* Whiskers */}
      <path d="M64 124 L38 118 M64 132 L38 136
               M136 124 L162 118 M136 132 L162 136"
            stroke="#141414" strokeWidth="3"
            strokeLinecap="round" opacity="0.65" />
    </svg>
  )
}