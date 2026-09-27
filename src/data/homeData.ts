export interface HomeProjectItem {
  id: string;
  title: string;
  location: string;
  category: string;
  status: 'Running' | 'Upcoming' | 'Completed';
  image: string;
  specs?: string;
  description: string;
  features: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  designation: string;
  location: string;
  image: string;
  quote: string;
  rating: number;
  projectPurchased: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  views: number;
  image: string;
  summary: string;
  content: string;
}

export interface HeroRealEstateSlide {
  id: string;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  badge: string;
}

export const HERO_REAL_ESTATE_SLIDES: HeroRealEstateSlide[] = [
  {
    id: 'grandeur-tower',
    title: 'Crown Grandeur Luxury High-Rise',
    category: 'Ultra-Luxury Residential Condominium',
    location: 'Gulshan 2, Diplomatic Zone, Dhaka',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2600&q=85',
    badge: 'Flagship Residential Project',
  },
  {
    id: 'imperial-pavilion',
    title: 'The Imperial Pavilion Estate',
    category: 'Exclusive Duplex & Private Villa Enclave',
    location: 'Bashundhara R/A, Block I, Dhaka',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2600&q=85',
    badge: 'Eco Smart Enclave',
  },
  {
    id: 'promise-landmark-tower',
    title: 'Promise Landmark City Center',
    category: 'Master-Planned Architectural & Commercial Tower',
    location: 'Tejgaon Commercial District, Dhaka',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2600&q=85',
    badge: 'Iconic Commercial Hub',
  },
  {
    id: 'solstice-bay',
    title: 'Solstice Luxury Waterfront Residences',
    category: 'Premium Coastal Resort & Living Suites',
    location: 'Inani Marine Drive Waterfront, Cox\'s Bazar',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2600&q=85',
    badge: 'Coastal Resort Living',
  },
];

export const HOME_PROJECTS: HomeProjectItem[] = [
  {
    id: 'promise-haven-city',
    title: 'Promise Haven City',
    location: 'Uttara Uttar Khan, Dhaka',
    category: 'Gated Township & Residential Enclave',
    status: 'Running',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    specs: '60ft Wide Connecting Avenues • Lakefront Walking Promenades',
    description: 'A master-planned luxury gated residential development featuring earthquake-safe civil infrastructure, eco-friendly open gardens, and 24/7 smart security.',
    features: ['100% RAJUK Clearance', 'Underground Utility Trenching', 'Children Play Park & Jogging Track', 'Immediate Sub-Registry Title Deed'],
  },
  {
    id: 'promise-heights',
    title: 'Promise Heights',
    location: 'Shaheed Minar, Kallyanpur, Dhaka',
    category: 'Luxury High-Rise Residential Tower',
    status: 'Running',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    specs: 'Unit-A: 1642 SFT (3 Bed • 3 Bath • Drawing • Dining • 2 Balconies)',
    description: 'Iconic modern tower built with BUET-certified 80ft deep piling, dual European Otis elevators, Perkins standby power generator, and landscaped rooftop sky lounge.',
    features: ['BNBC 2020 Seismic Certified', 'Dual High-Speed Schindler Lifts', 'Rooftop Infinity Garden & BBQ Lounge', '100% Dual Generator Backup'],
  },
  {
    id: 'purbachal-green-horizon',
    title: 'Purbachal Green Horizon',
    location: 'Beside 300ft Purbachal Expressway, Dhaka',
    category: 'Smart City Residential Plots',
    status: 'Running',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    specs: '3, 5 & 10 Katha Demarcated Plots ready for construction',
    description: 'Prime elevated residential sectors with complete hydraulic sand-filling, subterranean power grid, and direct connection to upcoming MRT Route 1.',
    features: ['Direct Expressway Access', 'Permanent Precast Boundary Pillars', 'Zero-Litigation Guaranteed Mutation', 'Flexible 24-Month Installments'],
  },
  {
    id: 'azure-lagoon-villas',
    title: 'Azure Lagoon Residences & Villas',
    location: 'Inani Marine Drive, Cox\'s Bazar',
    category: 'Ultra-Luxury Coastal Resort Development',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    specs: '54 Luxury Private Pool Villas & 5-Star Branded Resort Suites',
    description: 'Exclusive beachfront sanctuary with marine-grade concrete foundations, private plunge pools, and uninterrupted panoramic Bay of Bengal ocean views.',
    features: ['Private Beachfront Boardwalk', '100% Solar Hybrid Power Support', '5-Star Resort Rental Pool Sharing', 'Category-5 Cyclone-Resistant Code'],
  },
  {
    id: 'solstice-cove-spa',
    title: 'Solstice Cove & Spa',
    location: 'Scenic Coastal Bay, Chittagong',
    category: 'Eco-Wellness Resort & Marina',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    specs: 'Phase 1 & 2 Handed Over • Active Hospitality Operations',
    description: 'Prestigious waterfront retreat offering holistic thalassotherapy spa pavilions, private yacht marina slips, and high seasonal owner rental yields.',
    features: ['100% Handover Completed', 'Private Yacht Docking Marina', 'Certified Environmental Clearances', 'Consistent 14% Annual Rental Yield'],
  },
  {
    id: 'promise-royal-enclave',
    title: 'Promise Royal Heights',
    location: 'Block C, Bashundhara R/A, Dhaka',
    category: 'Residential Duplex Complex',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    specs: '28 Duplex Suites • 3,250 SQFT Luxury Units',
    description: 'Sold-out signature development handed over 2 months ahead of schedule with 10-year RCC warranty and biometric keyless security matrix.',
    features: ['Handed Over Ahead of Time', '10-Year RCC Structural Warranty', 'Biometric & Video Intercom Matrix', 'Fully Occupied by Prestigious Families'],
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Mahmudul Hasan',
    designation: 'Government official',
    location: 'Dhaka, Bangladesh',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    quote: 'From the first visit to the project through the final booking, the sincerity and professionalism of the entire team at Promise Assets were evident. They explained the booking process and installment terms very well. I feel confident in being associated with a company that truly values its clients\' assets.',
    rating: 5,
    projectPurchased: 'Promise Haven City (Unit 4B)',
  },
  {
    id: 't-2',
    name: 'Dr. Rafiqul Islam',
    designation: 'Senior Medical Consultant & NRB Investor',
    location: 'London, UK / Dhaka',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    quote: 'Being an expatriate, legal transparency was my top priority. The legal team at Promise Assets provided 30-year mutation lineage and CS/SA/RS records before accepting any token deposit. The construction pace is remarkable and digital milestone updates keep me assured.',
    rating: 5,
    projectPurchased: 'Promise Heights (Penthouse Suite)',
  },
  {
    id: 't-3',
    name: 'Engr. Farhana Ahmed',
    designation: 'Structural Civil Engineer & Co-Owner',
    location: 'Dhaka, Bangladesh',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    quote: 'As a civil engineer myself, I personally inspected the bored piling test reports and concrete batching certification. Promise Assets strictly enforces BNBC 2020 seismic engineering protocols with zero quality compromises. A truly genuine development firm.',
    rating: 5,
    projectPurchased: 'Purbachal Green Horizon (Plot #42)',
  }
];

export const INSIGHTS_DATA: InsightArticle[] = [
  {
    id: 'art-1',
    title: 'Gated Community vs. Standalone Flats: The Future of Urban Living',
    category: 'Investment',
    date: 'June 2026',
    readTime: '2 min read',
    views: 1420,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    summary: 'Don\'t settle for a concrete cage. Discover how modern gated community flats in Dhaka completely outperform traditional standalone buildings in security, amenities, and capital appreciation.',
    content: `Rapid urban transformation in Dhaka has shifted homebuyer priorities decisively away from congested standalone apartment buildings toward integrated, master-planned gated communities. 

When you invest in an isolated standalone flat, you are confined solely to your indoor carpet area, often sharing narrow streets with zero recreational breathing room for children and elderly family members. In contrast, modern gated developments like Promise Haven City provide 60ft arterial roads, subterranean utility corridors, landscaped lakefront walking tracks, and multi-tier security surveillance.

From an investment yield perspective, gated community apartments appreciate 25% faster in secondary resale value and command up to 30% higher rental premiums from corporate and multinational executives seeking secure, holistic living environments.`,
  },
  {
    id: 'art-2',
    title: '5 Reasons to Invest in Real Estate Near Purbachal Link Road',
    category: 'Investment',
    date: 'June 2026',
    readTime: '5 min read',
    views: 2180,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    summary: 'Looking for the best property investment in Dhaka? Explore 5 powerful reasons why real estate near the Purbachal Link Road corridor is forecasted to deliver highest ROI in the next 3 years.',
    content: `The 300ft Purbachal Expressway has officially become Dhaka's fastest-growing economic artery, redefining residential and commercial real estate valuation.

Key drivers include:
1. Rapid Connectivity: Reach Hazrat Shahjalal International Airport and Gulshan within 15–20 minutes via seamless 12-lane elevated expressway routes.
2. Upcoming Mass Rapid Transit (MRT Line-1): Underground and elevated metro connectivity guaranteeing zero traffic delays.
3. Modern Institutional Hub: The relocation of international schools, universities, specialized hospitals, and diplomatic zones to Purbachal.
4. Smart Civic Infrastructure: 100% planned subterranean drainage, wide avenues, and designated ecological retention zones preventing waterlogging.
5. High Capital Appreciation: Historical land valuation along the corridor has grown at an annualized rate of 18.5%, making early entry co-ownership or freehold acquisitions unprecedentedly profitable.`,
  },
  {
    id: 'art-3',
    title: 'How Land Share Investment in Dhaka Eliminates Middleman Costs',
    category: 'Investment',
    date: 'June 2026',
    readTime: '4 min read',
    views: 1890,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    summary: 'Want to avoid hidden real estate costs and unverified paperwork? Explore how a joint land purchase near the Purbachal Link Road secures wholesale registered sub-registry title deeds directly.',
    content: `Traditional commercial real estate purchasing carries heavy developer profit markups, marketing overheads, and high financing costs that inflate retail unit prices by up to 45%.

The Promise Assets Co-Ownership Land Share model introduces pure wholesale purchasing directly under individual registered sub-registry deeds. A consortium of verified investors co-owns the verified land parcel at genuine raw land prices. Following land registration, civil construction is executed on an actual cost-basis with collective architectural voting rights.

Investors gain:
• 35% to 45% lower purchase outlay compared to commercial retail prices.
• Direct freehold registration under personal name at the government sub-registry office.
• Absolute transparency with milestone-based escrow accounts and zero hidden charges.`,
  }
];
