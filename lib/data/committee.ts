export interface CommitteeMember {
  id: string
  name: string
  role: string
  department: string
  imageUrl: string          // '' → initials fallback
}

/** Order here controls display order of the department sections. */
export const DEPARTMENTS = ['Executive', 'Marketing', 'Events', 'Tech'] as const

export const committee: CommitteeMember[] = [
  { id: 'c1',  name: 'Aisyah Rahman',  role: 'President',      department: 'Executive', imageUrl: '' },
  { id: 'c2',  name: 'Daniel Lim',     role: 'Vice President', department: 'Executive', imageUrl: '' },

  { id: 'c3',  name: 'Mei Ling Tan',   role: 'Marketing Director', department: 'Marketing', imageUrl: '' },
  { id: 'c4',  name: 'Hafiz Zulkifli', role: 'Design Lead',        department: 'Marketing', imageUrl: '' },
  { id: 'c5',  name: 'Priya Nair',     role: 'Social Media',       department: 'Marketing', imageUrl: '' },
  { id: 'c6',  name: 'Jason Wong',     role: 'Photography',        department: 'Marketing', imageUrl: '' },

  { id: 'c7',  name: 'Nurul Izzah',    role: 'Events Director', department: 'Events', imageUrl: '' },
  { id: 'c8',  name: 'Kelvin Chew',    role: 'Events Officer',  department: 'Events', imageUrl: '' },
  { id: 'c9',  name: 'Farah Aziz',     role: 'Events Officer',  department: 'Events', imageUrl: '' },
  { id: 'c10', name: 'Marcus Teoh',    role: 'Logistics',       department: 'Events', imageUrl: '' },

  { id: 'c11', name: 'Sofia Abdullah', role: 'Tech Director',   department: 'Tech', imageUrl: '' },
  { id: 'c12', name: 'Wei Jian Ooi',   role: 'Web Developer',   department: 'Tech', imageUrl: '' },
  { id: 'c13', name: 'Amir Hakim',     role: 'IT Officer',      department: 'Tech', imageUrl: '' },
  { id: 'c14', name: 'Chloe Yap',      role: 'Data & Systems',  department: 'Tech', imageUrl: '' },
]

/** Convenience selectors so components don't repeat filter logic. */
export const executives = committee.filter((m) => m.department === 'Executive')
export const generalCommittee = committee.filter((m) => m.department !== 'Executive')