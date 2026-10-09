export interface CommitteeMember {
  id: string
  name: string
  role: string
  department: string
  imageUrl: string         
}

export const DEPARTMENTS = ['TopExecutive', 'Executives', 'Socials', 'Sports', 'Careers', 'Sponsorship', 'IT', 'Creatives',
                            'Marketing', 'Treasurer'] as const

export const DEPARTMENT_PORT_IMAGE: Record<string, string> = {
  TopExecutive: '/images/ports/execs.webp',
  Executives:   '/images/ports/execs.webp',
  Socials:      '/images/ports/socials.webp',
  Sports:       '/images/ports/sports.webp',
  Careers:      '/images/ports/careers.webp',
  Sponsorship:  '/images/ports/sponsorships.webp',
  IT:           '/images/ports/IT.webp',
  Creatives:    '/images/ports/creatives.webp',
  Marketing:    '/images/ports/marketing.webp',
  Treasurer:    '/images/ports/treasurers.webp',
}

export const splitCommittee = (members: CommitteeMember[]) => ({
  executives: members.filter((m) => m.department === 'TopExecutive'),
  general: members.filter((m) => m.department !== 'TopExecutive'),
})
