'use client'

import Image from 'next/image'
import type { CommitteeMember } from '@/lib/data/committee'

export default function TeamCard({ member }: { member: CommitteeMember }) {
  // Two-letter monogram as a photo stand-in
  const initials = member.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  return (
    <div
      data-cursor="hover"
      className="group relative aspect-[3/4] overflow-hidden rounded-lg border
                 border-line bg-surface transition-all duration-300 ease-bounce
                 hover:-translate-y-1.5 hover:border-primary hover:shadow-glow"
    >
      {member.imageUrl ? (
        <Image
          src={member.imageUrl}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-all duration-500 ease-soft
                     group-hover:scale-105 group-hover:brightness-[0.35]"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center
                     transition-all duration-500 group-hover:brightness-[0.5]"
          style={{
            background:
              'linear-gradient(150deg, var(--surface-2) 0%, var(--primary-dark) 180%)',
          }}
        >
          <span className="font-heading text-5xl font-bold text-text/15">
            {initials}
          </span>
        </div>
      )}

      {/* Name overlay. Sits at opacity-0 and fades in on hover — the
          group-hover pattern means one parent drives several children. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center
                      gap-2 bg-black/50 px-4 text-center opacity-0
                      transition-opacity duration-300 group-hover:opacity-100">
        <span className="font-heading text-[19px] font-bold uppercase
                         tracking-tight text-[#F5F0E8]">
          {member.name}
        </span>
        <span className="font-heading text-[12px] uppercase tracking-[0.18em]
                         text-primary">
          {member.role}
        </span>
      </div>

      {/* Always-visible label for touch devices, which have no hover.
          Hidden on pointer-capable screens so it doesn't double up. */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90
                      to-transparent p-4 [@media(hover:hover)]:hidden">
        <span className="block font-heading text-sm font-bold uppercase text-[#F5F0E8]">
          {member.name}
        </span>
        <span className="block font-heading text-[11px] uppercase
                         tracking-widest text-primary">
          {member.role}
        </span>
      </div>
    </div>
  )
}