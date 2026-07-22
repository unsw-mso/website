'use client'

import { useTheme } from '@/providers/ThemeProvider'

export default function ThemeFlap() {
  const { theme, toggle } = useTheme()
  const next = theme === 'dark' ? 'LIGHT' : 'DARK'

  return (
    <button
      onClick={toggle}
      data-cursor="hover"
      aria-label={`Switch to ${next.toLowerCase()} mode`}
      className="group fixed bottom-0 left-0 z-[950] h-[68px] w-[68px]
                 transition-[height,width] duration-300 ease-bounce
                 hover:h-[92px] hover:w-[92px]"
    >
      {/* Orange under-layer, revealed as the corner peels back */}
      <span
        className="absolute inset-0 bg-primary"
        style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
      />

      <span className="absolute bottom-[26px] left-[9px] text-[13px] leading-none text-white">
        {theme === 'dark' ? '☀' : '☾'}
      </span>
      <span className="absolute bottom-[9px] left-[8px] font-heading text-[8px]
                       font-bold tracking-[0.12em] text-white">
        {next}
      </span>

      {/* The "page" itself. Rotating its origin at the fold makes the
          corner lift like paper on hover. */}
      <span
        className="absolute inset-0 origin-top-right transition-transform
                   duration-300 ease-bounce group-hover:rotate-[-6deg]"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
          background:
            theme === 'dark'
              ? 'linear-gradient(135deg,#333 0%,#191919 55%,#060606 100%)'
              : 'linear-gradient(135deg,#FDF9F1 0%,#E4DBC8 55%,#C6BBA4 100%)',
          filter: 'drop-shadow(-3px 3px 6px rgba(0,0,0,0.35))',
        }}
      />
    </button>
  )
}