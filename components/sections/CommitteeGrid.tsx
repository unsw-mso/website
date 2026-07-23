'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/utils/gsap'
import TeamCard from '@/components/cards/TeamCard'
import { generalCommittee, DEPARTMENTS } from '@/lib/data/committee'

export default function CommitteeGrid() {
  const section = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      /* One trigger PER DEPARTMENT BLOCK rather than one for the whole
         page. Each group animates as its own heading scrolls in, which
         keeps the reveal tied to what the user is actually looking at. */
      gsap.utils.toArray<HTMLElement>('[data-dept-group]').forEach((group) => {
        gsap.from(group.querySelectorAll('[data-member]'), {
          y: 50,
          opacity: 0,
          scale: 0.94,
          duration: 0.65,
          ease: 'back.out(1.4)',
          stagger: { each: 0.06, grid: 'auto', from: 'start' },
          clearProps: 'transform',
          scrollTrigger: { trigger: group, start: 'top 82%', once: true },
        })
      })
    },
    { scope: section },
  )

  // Skip 'Executive' — it has its own feature section above
  const depts = DEPARTMENTS.filter((d) => d !== 'Executive')

  return (
    <section ref={section} className="px-6 pb-40 md:px-12">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-20">
        {depts.map((dept) => {
          const members = generalCommittee.filter((m) => m.department === dept)
          if (!members.length) return null

          return (
            <div key={dept} data-dept-group>
              <div className="border-b border-primary/25 pb-3.5 font-heading
                              text-[12px] font-semibold uppercase
                              tracking-[0.3em] text-primary">
                — {dept}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                {members.map((member) => (
                  <div key={member.id} data-member>
                    <TeamCard member={member} />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}