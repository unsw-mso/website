'use client'

import { useCallback, useState } from 'react'
import MemberSpotlight from '@/components/sections/MemberSpotlight'
import type { CommitteeMember } from '@/lib/data/committee'

/* Shared "click a member → port photo + white detail panel" wiring, so
   CommitteeGrid and PresidentFeature behave identically. Returns an
   `open(member)` handler for the card and the `spotlight` element to render. */
export function useMemberSpotlight() {
  const [member, setMember] = useState<CommitteeMember | null>(null)

  const open = useCallback((m: CommitteeMember) => setMember(m), [])
  const close = useCallback(() => setMember(null), [])

  const spotlight = member ? (
    <MemberSpotlight member={member} onClose={close} />
  ) : null

  return { open, spotlight }
}
