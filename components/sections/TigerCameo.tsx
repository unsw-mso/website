'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/utils/gsap'
import TigerPlaceholder from '@/components/ui/TigerPlaceholder'

export default function TigerCameo() {
  const wrap = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      /* PEEK-IN: the tiger sits mostly off-screen right and slides
         partly into view as this point in the page arrives.
         toggleActions runs the animation forward on enter and reverses
         it on the way back up, so he ducks away again — playful and
         it means he isn't just permanently parked there. */
      gsap.from(wrap.current, {
        xPercent: 70,
        rotate: 25,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: wrap },
  )

  return (
    // overflow-clip on the parent stops the off-screen tiger creating
    // a horizontal scrollbar — a classic bug with this kind of effect.
    <div className="relative w-full overflow-clip pb-24">
      <div
        ref={wrap}
        className="ml-auto w-[180px] translate-x-[22%] rotate-[-12deg]
                   md:w-[260px]"
      >
        <TigerPlaceholder className="h-auto w-full drop-shadow-2xl" />
      </div>
    </div>
  )
}