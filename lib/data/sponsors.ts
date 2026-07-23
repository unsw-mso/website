export interface Sponsor {
  id: string
  name: string
  logoUrl: string           // '' → renders the name as a wordmark
  website?: string
}

// Replace with real partners. Names render as text wordmarks until you
// supply logoUrl, which looks intentional rather than broken.
export const sponsors: Sponsor[] = [
  { id: 's1', name: 'Kao Kao',   logoUrl: '' },
  { id: 's2', name: 'Dynasty Karaoke',   logoUrl: '' },
  { id: 's3', name: 'Tiger Pocha', logoUrl: '' },
  { id: 's4', name: 'Future Spects Pty Ltd',  logoUrl: '' },
  { id: 's5', name: 'Sponsor Five',  logoUrl: '' },
  { id: 's6', name: 'Sponsor Six',   logoUrl: '' },
  { id: 's7', name: 'Sponsor Seven', logoUrl: '' },
  { id: 's8', name: 'Sponsor Eight', logoUrl: '' },
]