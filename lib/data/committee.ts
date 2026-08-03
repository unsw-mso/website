export interface CommitteeMember {
  id: string
  name: string
  role: string
  department: string
  imageUrl: string          // '' → initials fallback
}

/** Order here controls display order of the department sections. */
export const DEPARTMENTS = ['TopExecutive', 'Executives', 'Socials', 'Sports', 'Careers', 'Sponsorship', 'IT', 'Creatives', 
                            'Marketing', 'Treasurer'] as const

export const committee: CommitteeMember[] = [
  { id: 'c1',  name: 'Dominic Cheang',  role: 'President',      department: 'TopExecutive', imageUrl: '/images/committee/dom.webp' },
  { id: 'c2',  name: 'Shun Yuan Lim',   role: 'Vice President', department: 'TopExecutive', imageUrl: '/images/committee/shunyuan.webp' },

  { id: 'c3',  name: 'Qiao Yi Tan',   role: 'Treasurer', department: 'Executives', imageUrl: '/images/committee/qiaoyi.webp' },
  { id: 'c4',  name: 'Giselle Teo',   role: 'Secretary', department: 'Executives', imageUrl: '/images/committee/giselle.webp' },
  { id: 'c5',  name: 'Yang Ming Sim',   role: 'External Liaison', department: 'Executives', imageUrl: '/images/committee/yangming.webp' },

  { id: 'c6',  name: 'Li Wen Ong',   role: 'Director', department: 'Socials', imageUrl: '/images/committee/liwen.webp' },
  { id: 'c7',  name: 'Nadine Soraya',   role: 'Director', department: 'Socials', imageUrl: '/images/committee/nadine.webp' },
  { id: 'c8',  name: 'Sean Yeo',   role: 'Subcommittee', department: 'Socials', imageUrl: '/images/committee/sean.webp' },
  { id: 'c9',  name: 'Tan Sze Han',   role: 'Subcommittee', department: 'Socials', imageUrl: '/images/committee/szehan.webp' },
  { id: 'c10',  name: 'Lum Yu Yang',   role: 'Subcommittee', department: 'Socials', imageUrl: '/images/committee/yuyang.webp' },
  { id: 'c11',  name: 'Tiffany Yap',   role: 'Subcommittee', department: 'Socials', imageUrl: '/images/committee/tiffany.webp' },

  { id: 'c12',  name: 'Chee Xuelian',   role: 'Director', department: 'Sports', imageUrl: '/images/committee/xuelian.webp' },
  { id: 'c13',  name: 'Saiful Nizam',   role: 'Director', department: 'Sports', imageUrl: '/images/committee/saiful.webp' },
  { id: 'c14',  name: 'Vinny Chew',   role: 'Subcommittee', department: 'Sports', imageUrl: '/images/committee/vinny.webp' },
  { id: 'c15',  name: 'Queek Pei Yee',   role: 'Subcommittee', department: 'Sports', imageUrl: '/images/committee/queek.webp' },
  { id: 'c16',  name: 'Mirza Khairulsyah',   role: 'Subcommittee', department: 'Sports', imageUrl: '/images/committee/mirza.webp' },

  { id: 'c17',  name: 'Wei Ci',   role: 'Director', department: 'Careers', imageUrl: '/images/committee/weici.webp' },
  { id: 'c18',  name: 'Samantha Lee',   role: 'Subcommittee', department: 'Careers', imageUrl: '/images/committee/sam.webp' },
  { id: 'c19',  name: 'Mikhail Zain',   role: 'Subcommittee', department: 'Careers', imageUrl: '/images/committee/mikhail.webp' },

  { id: 'c20',  name: 'Zachary Boey',   role: 'Director', department: 'Sponsorship', imageUrl: '/images/committee/zach.webp' },
  { id: 'c21',  name: 'Aldreena',   role: 'Director', department: 'Sponsorship', imageUrl: '/images/committee/aldreena.webp' },
  { id: 'c22',  name: 'Hannah Basuki',   role: 'Subcommittee', department: 'Sponsorship', imageUrl: '/images/committee/hannah.webp' },
  { id: 'c23',  name: 'Siddharth Dennis',   role: 'Subcommittee', department: 'Sponsorship', imageUrl: '/images/committee/sid.webp' },
  { id: 'c24',  name: 'Afif Nizam',   role: 'Subcommittee', department: 'Sponsorship', imageUrl: '/images/committee/afif.webp' },

  { id: 'c25',  name: 'Aidan Tan',   role: 'Director', department: 'IT', imageUrl: '/images/committee/aidantan.webp' },
  { id: 'c26',  name: 'Lim Jing Ren',   role: 'Subcommittee', department: 'IT', imageUrl: '/images/committee/jr.webp' },
  { id: 'c27',  name: 'Sri Azlan',   role: 'Subcommittee', department: 'IT', imageUrl: '/images/committee/sri.webp' },

  { id: 'c28',  name: 'Theeran',   role: 'Director', department: 'Creatives', imageUrl: '' },
  { id: 'c29',  name: 'Xin Hui',   role: 'Subcommittee', department: 'Creatives', imageUrl: '/images/committee/xinhui.webp' },
  { id: 'c30',  name: 'Xin Qi',   role: 'Subcommittee', department: 'Creatives', imageUrl: '/images/committee/xinqi.webp' },
  { id: 'c31',  name: 'Aiman Firdaus',   role: 'Subcommittee', department: 'Creatives', imageUrl: '/images/committee/aiman.webp' },

  { id: 'c32',  name: 'Aidan Chew',   role: 'Director', department: 'Marketing', imageUrl: '/images/committee/aidanchew.webp' },
  { id: 'c33',  name: 'Bryan Bong',   role: 'Director', department: 'Marketing', imageUrl: '/images/committee/bryan.webp' },
  { id: 'c34',  name: 'Juvene Chang',   role: 'Subcommittee', department: 'Marketing', imageUrl: '/images/committee/juvene.webp' },
  { id: 'c35',  name: 'Jonas Cheng',   role: 'Subcommittee', department: 'Marketing', imageUrl: '' },

  { id: 'c36',  name: 'Qiao Yi Tan',   role: 'Director', department: 'Treasurer', imageUrl: '/images/committee/qiaoyi.webp' },
  { id: 'c37',  name: 'Calvin Gooi',   role: 'Subcommittee', department: 'Treasurer', imageUrl: '/images/committee/calvin.webp' },
  { id: 'c38',  name: 'Justin Foong',   role: 'Subcommittee', department: 'Treasurer', imageUrl: '/images/committee/justin.webp' },
]

/** Convenience selectors so components don't repeat filter logic. */
export const executives = committee.filter((m) => m.department === 'TopExecutive')
export const generalCommittee = committee.filter((m) => m.department !== 'TopExecutive')