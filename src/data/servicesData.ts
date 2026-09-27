export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  categoryLabel?: string;
  rating?: number;
  image: string;
  iconName?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  iconName: string;
}

export interface StepItem {
  number: string;
  title: string;
  subtitle: string;
}

export interface TrustBadgeItem {
  label: string;
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'resort-development',
    title: 'Luxury Beach & Coastal Resort Development',
    description: 'Transforming prime coastal, oceanfront, and island landscapes into world-class high-yield luxury resorts, private pool villas, and international branded eco-retreats.',
    categoryLabel: 'Hospitality & Luxury',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Palmtree',
  },
  {
    id: 'housing-development',
    title: 'Residential & Luxury Apartment Complex',
    description: 'Architecturally iconic residential towers, duplex condominiums, and gated community enclaves built strictly to BNBC 2020 seismic engineering and luxury living standards.',
    categoryLabel: 'Residential',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Building2',
  },
  {
    id: 'city-development',
    title: 'Purbachal Smart City & Master Planned Townships',
    description: 'Civic-scale urban master planning, 80ft arterial avenues, subterranean utility corridors, and prime sanctioned plots beside expressway corridors.',
    categoryLabel: 'Urban Masterplan',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Compass',
  },
  {
    id: 'land-share-opportunities',
    title: 'Co-Ownership Land Share Investment',
    description: 'Wholesale cooperative land ownership model saving 35% to 45% compared to commercial developer prices, with individual sub-registry deeds directly under buyer name.',
    categoryLabel: 'High-Yield Investment',
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Share2',
  },
  {
    id: 'hotel-development',
    title: '5-Star Airport Hotel & Executive Suites',
    description: 'Prime hospitality assets strategically positioned near international transit hubs featuring acoustic soundproofing, helipad access, and executive conference suites.',
    categoryLabel: 'Commercial Hospitality',
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Hotel',
  },
  {
    id: 'real-estate-solutions',
    title: 'Prime Commercial Real Estate & Corporate Towers',
    description: 'End-to-end commercial solutions, corporate grade-A office towers, bank branches, and pre-screened institutional leases generating guaranteed Day-1 yields.',
    categoryLabel: 'Commercial Grade-A',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    iconName: 'TrendingUp',
  },
  {
    id: 'land-sales-purchasing',
    title: 'Strategic Land Sourcing & Title Vetting',
    description: 'Acquiring premier non-encumbered freehold properties with exhaustive 30-year lineage title search, CS/SA/RS/City Jarip mutation vetting and cadastral verification.',
    categoryLabel: 'Legal & Acquisition',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80',
    iconName: 'ShieldCheck',
  },
  {
    id: 'joint-venture',
    title: 'Landowner Joint Venture Development',
    description: 'Structured fair-share partnership models for private landowners to transform dormant heritage lands into landmark architectural developments with zero upfront capital risk.',
    categoryLabel: 'Partnership & JV',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Handshake',
  }
];

export const BENEFITS_LIST: BenefitItem[] = [
  { id: 'b1', title: '100% Vetted CS/SA/RS Title Deeds', iconName: 'ShieldCheck' },
  { id: 'b2', title: 'Guaranteed On-Time Handover Guarantee', iconName: 'Clock' },
  { id: 'b3', title: 'Transparent Co-Ownership Wholesale Pricing', iconName: 'TrendingUp' },
  { id: 'b4', title: 'Prime Scenic & Highway Front Locations', iconName: 'MapPin' },
  { id: 'b5', title: 'Earthquake-Safe BNBC 2020 Structural Code', iconName: 'Award' },
  { id: 'b6', title: 'Full Sub-Registry Registered Ownership', iconName: 'FileCheck' },
  { id: 'b7', title: 'Escrow & Milestone-Linked Construction Funds', iconName: 'Lock' },
  { id: 'b8', title: 'Turnkey Architectural & 3D Engineering', iconName: 'Sparkles' },
  { id: 'b9', title: 'High Seasonal Rental & Resale Appreciation', iconName: 'CheckCircle2' },
  { id: 'b10', title: 'Green Eco-Compliant Sustainable Standards', iconName: 'Leaf' },
  { id: 'b11', title: 'Transparent Joint Venture Revenue Sharing', iconName: 'Scale' },
  { id: 'b12', title: 'NRB Investor Dedicated Concierge Desk', iconName: 'Users' },
];

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Project Selection',
    subtitle: 'Browse master-planned portfolios or select custom co-ownership share units matching your budget.',
  },
  {
    number: '02',
    title: 'Legal Vetting & Audit',
    subtitle: 'Inspect authentic 30-year mutation lineage, RAJUK/DAP master clearances and cadastral survey papers.',
  },
  {
    number: '03',
    title: 'Milestone Booking',
    subtitle: 'Sign formal bipartite deed with transparent milestone payment schedule protected by delay penalty clauses.',
  },
  {
    number: '04',
    title: 'Construction & Civil Works',
    subtitle: 'Track real-time engineering milestones with digital reports and live inspection access to project sites.',
  },
  {
    number: '05',
    title: 'Sub-Registry & Handover',
    subtitle: 'Receive official registered sale deed, possession certificate, and turnkey luxury handover keys.',
  },
];

export const FAQS_LIST: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How does the Promise Assets Co-Ownership Land Share model work?',
    answer: 'Our co-ownership model unites vetted investors into a single land parcel at wholesale direct acquisition cost. Each member receives registered sub-registry deed under their personal name, saving 35% to 45% compared to traditional retail developers while maximizing future capital returns.',
  },
  {
    id: 'faq-2',
    question: 'What legal documents are provided before signing any agreement?',
    answer: 'Before receiving any booking token, we provide a complete certified legal pack containing CS, SA, RS, and City Jarip records, updated Namzari Khatiyan, DCR, 25-year non-encumbrance certificate (NEC), and approved layout sanction copies.',
  },
  {
    id: 'faq-3',
    question: 'Are there financial delay penalties if handover timeline exceeds?',
    answer: 'Yes. Every agreement executed by Promise Assets Ltd. contains an unconditional, legally enforceable delay compensation clause paying the investor 1% per month on the deposited capital until actual possession is delivered.',
  },
  {
    id: 'faq-4',
    question: 'Can Non-Resident Bangladeshis (NRBs) invest remotely?',
    answer: 'Absolutely. We provide dedicated overseas investor services with verified Power of Attorney drafting, remote video verification, authorized banking remittance guidance, and digital milestone updates.',
  },
  {
    id: 'faq-5',
    question: 'How are site visits arranged from the website or CRM?',
    answer: 'You can request an executive site visit directly via "Book Site Visit" on the website or through our CRM portal. Our logistics fleet provides executive pickup, on-site engineer briefing, and verified boundary demarcation tours.',
  },
  {
    id: 'faq-6',
    question: 'What is the structural warranty on completed developments?',
    answer: 'All residential and resort structures carry an unconditional 10-year RCC structural warranty and 24-month complimentary post-handover property maintenance supervision.',
  },
];

export const TRUST_BADGES: TrustBadgeItem[] = [
  { label: '100% Vetted Legal Clearances' },
  { label: 'RAJUK & DAP Compliant' },
  { label: '10-Year RCC Structural Warranty' },
  { label: 'Guaranteed Handover Timelines' },
];
