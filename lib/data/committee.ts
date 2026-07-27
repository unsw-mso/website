export interface CommitteeMember {
  id: string
  name: string
  role: string
  department: string
  imageUrl: string          // '' → initials fallback
}

/** Order here controls display order of the department sections. */
export const DEPARTMENTS = ['TopExecutive', 'Executives', 'Socials', 'Sports', 'Careers', 'IT', 'Creatives', 
                            'Marketing', 'Treasurer'] as const

export const committee: CommitteeMember[] = [
  { id: 'c1',  name: 'Dominic Cheang',  role: 'President',      department: 'TopExecutive', imageUrl: '/images/committee/tripleT.png' },
  { id: 'c2',  name: 'Shun Yuan Lim',   role: 'Vice President', department: 'TopExecutive', imageUrl: '/images/committee/tripleT.png' },

  { id: 'c3',  name: 'Qiao Yi Tan',   role: 'Treasurer', department: 'Executives', imageUrl: '/images/committee/tripleT.png' },
  { id: 'c4',  name: 'Giselle Teo',   role: 'Secretary', department: 'Executives', imageUrl: '/images/committee/tripleT.png' },
  { id: 'c5',  name: 'Yang Ming Sim',   role: 'External Liaison', department: 'Executives', imageUrl: '/images/committee/tripleT.png' },

  { id: 'c6',  name: 'Li Wen Ong',   role: 'Director', department: 'Socials', imageUrl: '' },
  { id: 'c7',  name: 'Nadine Soraya',   role: 'Director', department: 'Socials', imageUrl: '' },
  { id: 'c8',  name: 'Seon Yeo',   role: 'Subcommittee', department: 'Socials', imageUrl: '' },
  { id: 'c9',  name: 'Tan Sze Han',   role: 'Subcommittee', department: 'Socials', imageUrl: '' },
  { id: 'c10',  name: 'Lum Yu Yang',   role: 'Subcommittee', department: 'Socials', imageUrl: '' },
  { id: 'c11',  name: 'Tiffany Yap',   role: 'Subcommittee', department: 'Socials', imageUrl: '' },

  { id: 'c12',  name: 'Chee Xuelian',   role: 'Director', department: 'Sports', imageUrl: '' },
  { id: 'c13',  name: 'Saiful Nizam',   role: 'Director', department: 'Sports', imageUrl: '' },
  { id: 'c14',  name: 'Vinny Chew',   role: 'Subcommittee', department: 'Sports', imageUrl: '' },
  { id: 'c15',  name: 'Queek Pei Yee',   role: 'Subcommittee', department: 'Sports', imageUrl: '' },
  { id: 'c16',  name: 'Mirza Khairulsyah',   role: 'Subcommittee', department: 'Sports', imageUrl: '' },

  { id: 'c17',  name: 'Wei Ci',   role: 'Director', department: 'Careers', imageUrl: '' },
  { id: 'c18',  name: 'Samantha Lee',   role: 'Subcommittee', department: 'Careers', imageUrl: '' },
  { id: 'c19',  name: 'Mikhail Zain',   role: 'Subcommittee', department: 'Careers', imageUrl: '' },

  { id: 'c20',  name: 'Zachary Boey',   role: 'Director', department: 'Careers', imageUrl: '' },
  { id: 'c21',  name: 'Aldreena',   role: 'Director', department: 'Careers', imageUrl: '' },
  { id: 'c22',  name: 'Hannah Basuki',   role: 'Subcommittee', department: 'Careers', imageUrl: '' },
  { id: 'c23',  name: 'Siddharth Dennis',   role: 'Subcommittee', department: 'Careers', imageUrl: '' },
  { id: 'c24',  name: 'Afif Nizam',   role: 'Subcommittee', department: 'Careers', imageUrl: '' },

  { id: 'c25',  name: 'Aidan Tan',   role: 'Director', department: 'IT', imageUrl: '' },
  { id: 'c26',  name: 'Lim Jing Ren',   role: 'Subcommittee', department: 'IT', imageUrl: '' },
  { id: 'c27',  name: 'Sri Azlan',   role: 'Subcommittee', department: 'IT', imageUrl: '' },

  { id: 'c28',  name: 'Theeran',   role: 'Director', department: 'Creatives', imageUrl: '' },
  { id: 'c29',  name: 'Xin Hui',   role: 'Subcommittee', department: 'Creatives', imageUrl: '' },
  { id: 'c30',  name: 'Xin Qi',   role: 'Subcommittee', department: 'Creatives', imageUrl: '' },
  { id: 'c31',  name: 'Aiman Firdaus',   role: 'Subcommittee', department: 'Creatives', imageUrl: '' },

  { id: 'c32',  name: 'Aidan Chew',   role: 'Director', department: 'Marketing', imageUrl: '' },
  { id: 'c33',  name: 'Bryan Bong',   role: 'Director', department: 'Marketing', imageUrl: '' },
  { id: 'c34',  name: 'Juvene Chang',   role: 'Subcommittee', department: 'Marketing', imageUrl: '' },
  { id: 'c35',  name: 'Jonas Cheng',   role: 'Subcommittee', department: 'Marketing', imageUrl: '' },

  { id: 'c36',  name: 'Qiao Yi Tan',   role: 'Director', department: 'Treasurer', imageUrl: '' },
  { id: 'c37',  name: 'Calvin Gooi',   role: 'Subcommittee', department: 'Treasurer', imageUrl: '' },
  { id: 'c38',  name: 'Justin Foong',   role: 'Subcommittee', department: 'Treasurer', imageUrl: '' },
]

/** Convenience selectors so components don't repeat filter logic. */
export const executives = committee.filter((m) => m.department === 'TopExecutive')
export const generalCommittee = committee.filter((m) => m.department !== 'TopExecutive')