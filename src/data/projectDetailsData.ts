export interface ProjectGalleryImage {
  url: string;
  caption: string;
  location?: string;
  tag?: string;
}

export interface DetailedProjectInfo {
  id: string;
  projectTitle: string;
  subtitle: string;
  locationDetails: string;
  maxHandoverTimeline: string;
  totalFloorsOrScale: string;
  totalUnitsOrCapacity: string;
  priceDetails: {
    startingPrice: string;
    installmentSchedule?: string;
  };
  projectOverview: string;
  handoverPenaltyGuarantee: string;
  gallery: ProjectGalleryImage[];
}

export const DETAILED_PROJECTS: Record<string, DetailedProjectInfo> = {
  'resort-development': {
    id: 'resort-development',
    projectTitle: 'Azure Lagoon Residences & Ocean Resort',
    subtitle: 'Ultra-Luxury Oceanfront Villa Community & 5-Star Eco-Resort Development',
    locationDetails: 'Marine Drive Coastal Strip, Inani Beach, Cox\'s Bazar',
    maxHandoverTimeline: 'Maximum 30 Months',
    totalFloorsOrScale: '54 Acres Coastal Masterplan',
    totalUnitsOrCapacity: '54 Luxury Pool Villas & Suites',
    priceDetails: {
      startingPrice: '৳ 1.85 Cr per Unit',
      installmentSchedule: '36 Months Milestone Installments',
    },
    projectOverview: 'Azure Lagoon Residences is an elite beachfront sanctuary engineered with marine-grade anti-corrosive concrete, private infinity plunge pools, and uninterrupted panoramic Bay of Bengal ocean vistas. Designed for discerning owners seeking luxury holiday living and sustainable rental yields under international 5-star resort management.',
    handoverPenaltyGuarantee: 'Contractual 1.2% monthly compensation penalty for delay in handover with registered legal indemnity.',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
        caption: 'Central Horizon Pool & Oceanfront Sun Cabana Decks',
        location: 'Inani Marine Drive',
        tag: 'Master View',
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
        caption: 'Private Beach Pavilion & Sunset Dining Boardwalk',
        location: 'Coastal Beachfront',
        tag: 'Amenities',
      },
      {
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85',
        caption: 'Presidential 4-Bedroom Overwater Luxury Villa',
        location: 'Lagoon Bay',
        tag: 'Architectural Spec',
      },
      {
        url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85',
        caption: 'Wellness Ayurvedic Spa & Heated Thalassotherapy Pool',
        location: 'Spa Wing',
        tag: 'Wellness',
      },
    ],
  },

  'city-development': {
    id: 'city-development',
    projectTitle: 'Purbachal Green Horizon Smart Township',
    subtitle: 'Civic Scale Master-Planned Urban Community with Subterranean Utilities',
    locationDetails: 'Beside 300ft Purbachal Expressway, Sector 21, Dhaka',
    maxHandoverTimeline: 'Maximum 24 Months',
    totalFloorsOrScale: '85 Acres Urban Township',
    totalUnitsOrCapacity: '320 Sanctioned Residential Plots',
    priceDetails: {
      startingPrice: '৳ 75 Lac per Katha',
      installmentSchedule: '24 Months Equal Installments',
    },
    projectOverview: 'Purbachal Green Horizon is a landmark urban smart development built with 60ft to 80ft arterial avenues, subterranean electricity and optical fiber grids, dedicated ecological lakefront walking promenades, and direct rapid expressway connection to Dhaka international airport and upcoming MRT lines.',
    handoverPenaltyGuarantee: 'Immediate physical possession guarantee with full sub-registry within 60 days of completion.',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
        caption: 'Expressway Interchange & Boulevard Demarcation',
        location: 'Purbachal Sector 21',
        tag: 'Civil Masterplan',
      },
      {
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
        caption: 'Engineered Soil Compaction & Subterranean Trenching',
        location: 'Main Spine Road',
        tag: 'Infrastructure',
      },
      {
        url: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1600&q=85',
        caption: 'Lakefront Walking Promenades & Civic Green Belts',
        location: 'Eco Waterfront',
        tag: 'Landscape',
      },
    ],
  },

  'housing-development': {
    id: 'housing-development',
    projectTitle: 'Promise Royal Heights Luxury Enclave',
    subtitle: 'Earthquake-Safe BNBC 2020 Architectural Towers with Dual Elevators',
    locationDetails: 'Plot 14, Block C, Bashundhara R/A, Dhaka',
    maxHandoverTimeline: 'Maximum 36 Months',
    totalFloorsOrScale: 'G + 14 Floors High-Rise',
    totalUnitsOrCapacity: '28 Exclusive 3,250 sq.ft Duplex Flats',
    priceDetails: {
      startingPrice: '৳ 2.65 Cr per Flat',
      installmentSchedule: 'Quarterly Construction-Linked Slabs',
    },
    projectOverview: 'Promise Royal Heights combines modern European architectural aesthetics with heavy-duty structural safety. Constructed with 85ft deep cast-in-situ bored piling vetted by BUET civil engineers, European Otis passenger and stretcher elevators, 100% full standby European generator support, and private landscaped rooftop infinity garden.',
    handoverPenaltyGuarantee: 'Contractually bonded 10-year RCC structural warranty with insurance indemnity.',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
        caption: 'Front Architectural Glass Facade with Double Glazing',
        location: 'Bashundhara R/A',
        tag: 'Exterior',
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        caption: 'Luxury Grand Double-Height Marble Living Lounge',
        location: 'Model Duplex Suite',
        tag: 'Interior',
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
        caption: 'Designer Modular Kitchen with Built-in European Fittings',
        location: 'Penthouse Level',
        tag: 'Kitchen',
      },
    ],
  },

  'land-share-opportunities': {
    id: 'land-share-opportunities',
    projectTitle: 'Promise Purbachal Land-Share Co-Ownership',
    subtitle: 'Direct Wholesale Land Co-Ownership Saving 40% Under Personal Sub-Registry',
    locationDetails: 'Adjacent to Jolshiri Abashon & 300ft Highway, Dhaka',
    maxHandoverTimeline: 'Maximum 18 Months',
    totalFloorsOrScale: '20 Katha Consolidated Land Bank',
    totalUnitsOrCapacity: '40 Equal Co-Ownership Shares',
    priceDetails: {
      startingPrice: '৳ 28.5 Lac per Land Share',
      installmentSchedule: '18 Months Flexible Monthly Payments',
    },
    projectOverview: 'Our signature Land-Share model allows individual investors to co-own prime freehold land at raw wholesale acquisition rates before commercial retail appreciation. Each owner holds direct registered sub-registry deed on the land, with collective architectural design rights for future luxury apartment construction at actual cost basis.',
    handoverPenaltyGuarantee: '100% money-back guarantee if registered mutation title deed is not executed within 90 days.',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85',
        caption: 'Demarcated Land Bank with Precast Boundary Pillars',
        location: 'Jolshiri Extension',
        tag: 'Site Demarcation',
      },
      {
        url: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1600&q=85',
        caption: '40ft Paved Access Connecting directly to Expressway',
        location: 'Main Approach Road',
        tag: 'Access Transit',
      },
    ],
  },

  'hotel-development': {
    id: 'hotel-development',
    projectTitle: 'Promise Meridian International Airport Hotel & Suites',
    subtitle: '5-Star Hospitality Commercial Asset with Helipad and VRF Climate Systems',
    locationDetails: 'Airport Road, Uttara Sector 1, Dhaka',
    maxHandoverTimeline: 'Maximum 32 Months',
    totalFloorsOrScale: 'B2 + G + 16 Floors Commercial Tower',
    totalUnitsOrCapacity: '120 Executive Suites & 3 Banquet Halls',
    priceDetails: {
      startingPrice: '৳ 85 Lac (Fractional Suite Ownership)',
      installmentSchedule: '24 Months Slabs with Day-1 Revenue Share',
    },
    projectOverview: 'Strategic hospitality flagship situated 5 minutes from Shahjalal International Airport. Built to global aviation hospitality benchmarks with acoustic double-glazed sound isolation, VRF energy systems, rooftop infinity sky-lounge, and automated multi-tier security matrix.',
    handoverPenaltyGuarantee: 'Guaranteed 14% annual ROI yield post-handover backed by corporate corporate parent bank guarantee.',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85',
        caption: 'Rooftop Horizon Infinity Pool Overlooking Runway Sunset',
        location: 'Rooftop Skydeck',
        tag: 'Skydeck',
      },
      {
        url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85',
        caption: 'Executive Presidential Suite with Smart Glass Automation',
        location: 'Level 12',
        tag: 'Suites',
      },
    ],
  },

  'real-estate-solutions': {
    id: 'real-estate-solutions',
    projectTitle: 'Promise Financial Center & Commercial Plaza',
    subtitle: 'Grade-A Corporate Tower with Pre-Leased Institutional Banking Tenancy',
    locationDetails: 'Mirpur Road & Kallyanpur Junction, Dhaka',
    maxHandoverTimeline: 'Maximum 24 Months',
    totalFloorsOrScale: 'G + 12 Floors Corporate Tower',
    totalUnitsOrCapacity: '48 Commercial Office Suites',
    priceDetails: {
      startingPrice: '৳ 1.15 Cr per Office Unit',
      installmentSchedule: 'Flexible Construction Linked Terms',
    },
    projectOverview: 'High-density commercial asset located in central Dhaka business corridor. Featuring central air-handling, high-speed capsule elevators, fire-suppression ring, and pre-screened multinational corporate tenants for assured high yields.',
    handoverPenaltyGuarantee: 'Pre-leased tenant agreement handed over concurrently with registration.',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
        caption: 'Main Corporate Atrium with Triple-Height Glass Canopy',
        location: 'Kallyanpur Plaza',
        tag: 'Atrium',
      },
      {
        url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
        caption: 'Grade-A High Efficiency Workspaces and Boardrooms',
        location: 'Level 8 Corporate Floor',
        tag: 'Offices',
      },
    ],
  },
};

export function getDetailedProjectInfo(serviceId: string): DetailedProjectInfo {
  if (DETAILED_PROJECTS[serviceId]) {
    return DETAILED_PROJECTS[serviceId];
  }

  // Fallback default project info
  return {
    id: serviceId,
    projectTitle: 'Promise Assets Signature Development',
    subtitle: 'Premier Real Estate & Infrastructure Development Project',
    locationDetails: 'Dhaka Metropolitan & Prime Scenic Zones, Bangladesh',
    maxHandoverTimeline: 'Maximum 36 Months',
    totalFloorsOrScale: 'Multi-Floor High-Specification Masterplan',
    totalUnitsOrCapacity: 'Premium Tailored Allocation',
    priceDetails: {
      startingPrice: '৳ 55 Lac (Starting Investment)',
      installmentSchedule: '24 to 36 Monthly Installments',
    },
    projectOverview: 'Engineered to international hospitality and civil construction standards with verified title deeds, full regulatory clearances, and guaranteed handover schedules.',
    handoverPenaltyGuarantee: 'Contractually enforceable delay compensation guarantee with registered deed protection.',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
        caption: 'Master Architectural Overview',
        location: 'Dhaka, Bangladesh',
        tag: 'Overview',
      },
      {
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
        caption: 'Structural Civil Engineering Progress',
        location: 'Development Site',
        tag: 'Engineering',
      },
    ],
  };
}
