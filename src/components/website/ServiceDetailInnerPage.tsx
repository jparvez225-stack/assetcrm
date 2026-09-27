import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Building2,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Star,
  Layers,
  Clock,
  MapPin,
  Maximize2,
  Download,
  Award,
  Check,
  X,
} from 'lucide-react';
import { ServiceItem } from '../../data/servicesData';
import { getDetailedProjectInfo, DetailedProjectInfo, ProjectGalleryImage } from '../../data/projectDetailsData';

interface ServiceDetailInnerPageProps {
  darkMode?: boolean;
  service: ServiceItem;
  onBack: () => void;
  onBookMeeting: (serviceTitle: string) => void;
}

export const ServiceDetailInnerPage: React.FC<ServiceDetailInnerPageProps> = ({
  darkMode = true,
  service,
  onBack,
  onBookMeeting,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isFullscreenPhoto, setIsFullscreenPhoto] = useState(false);
  const [brochureDownloaded, setBrochureDownloaded] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePhotoIndex(0);
    setBrochureDownloaded(false);
  }, [service.id]);

  const projectDetails: DetailedProjectInfo = getDetailedProjectInfo(service.id);
  const gallery: ProjectGalleryImage[] =
    projectDetails.gallery && projectDetails.gallery.length > 0
      ? projectDetails.gallery
      : [{ url: service.image, caption: service.title, location: 'Dhaka, Bangladesh', tag: 'Overview' }];

  const currentPhoto = gallery[activePhotoIndex] || gallery[0];

  const handleNextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleDownloadBrochure = () => {
    setBrochureDownloaded(true);
    setTimeout(() => {
      setBrochureDownloaded(false);
    }, 4000);
  };

  // Exactly 2 Cards with exactly 5 project advantages/facilities each (প্রজেক্টের সুবিধাগুলো)
  const getTwoBenefitCards = () => {
    if (service.id === 'city-development') {
      return [
        {
          title: 'Master Infrastructure Advantages',
          subtitle: 'Engineering & Civics',
          icon: <Building2 className="w-4 h-4 text-[#caa050]" />,
          benefits: [
            '60ft to 80ft wide RCC paved arterial avenues designed for smooth high-capacity transit',
            'Complete hydraulic sand-filling compacted to 95% standard Proctor density',
            '100% subterranean utility ducting for electricity, gas, and optical fiber',
            'Perimeter concrete retaining embankments and deep storm-water drainage network',
            'Digital total-station survey demarcation with permanent precast boundary pillars',
          ],
        },
        {
          title: 'Smart City Privileges & Facilities',
          subtitle: 'Living & Investment',
          icon: <ShieldCheck className="w-4 h-4 text-[#caa050]" />,
          benefits: [
            'Direct expressway connectivity to 300ft Purbachal Highway and upcoming MRT routes',
            'Dedicated ecological lakefront walking trails, civic parks, and green recreation belts',
            'Pre-demarcated residential & commercial plots with 100% RAJUK sanction clearances',
            '24/7 security checkpoints and solar-powered LED streetlights along all avenues',
            'Guaranteed immediate physical possession and fast-track sub-registry deed execution',
          ],
        },
      ];
    }

    if (service.id === 'real-estate-solutions') {
      return [
        {
          title: 'Legal Safety & Title Privileges',
          subtitle: 'Due Diligence & Protection',
          icon: <ShieldCheck className="w-4 h-4 text-[#caa050]" />,
          benefits: [
            '100% vetted title deeds searching 30-year CS, SA, RS and City Jarip mutations',
            'Fast-track government sub-registry and mutation execution with official documentation',
            'Zero legal encumbrance with verified RAJUK and DAP master plan clearances',
            'Independent market valuation report guaranteeing actual wholesale acquisition rates',
            'Legally enforceable delay penalty and contractual fund security guarantee',
          ],
        },
        {
          title: 'Investment Yield & Facilities',
          subtitle: 'Financial & Management',
          icon: <Award className="w-4 h-4 text-[#caa050]" />,
          benefits: [
            'Guaranteed 12% to 16% forecasted annual capital appreciation in prime Dhaka zones',
            'Pre-screened corporate and family tenants ensuring Day-1 monthly rental income',
            'End-to-end property maintenance, repair supervision, and automated rent collection',
            'Specialized NRB home loan financing up to 70% with leading financial institutions',
            'Transparent installment payment milestones linked directly to construction progress',
          ],
        },
      ];
    }

    if (service.id === 'resort-development') {
      return [
        {
          title: 'Coastal Engineering Privileges',
          subtitle: 'Marine Grade Infrastructure',
          icon: <Building2 className="w-4 h-4 text-[#caa050]" />,
          benefits: [
            'Marine-grade anti-corrosive concrete foundations resistant to saltwater salinity',
            'Cyclone-resistant architectural structure engineered for Category-5 coastal winds',
            'Deep groundwater filtration with reverse osmosis (RO) drinking purification',
            'Eco-friendly sustainable architecture blending treated teakwood and native greenery',
            'Certified environmental clearances compliant with Department of Environment (DOE)',
          ],
        },
        {
          title: 'Resort Amenities & Facilities',
          subtitle: 'Hospitality & Returns',
          icon: <ShieldCheck className="w-4 h-4 text-[#caa050]" />,
          benefits: [
            'Direct beachfront access along Marine Drive with panoramic ocean sunset views',
            'Private infinity plunge pools, sunbathing decks, and open-air tropical lounges',
            '5-star hospitality management operations generating high seasonal rental yields',
            '100% hybrid solar backup ensuring uninterrupted air conditioning and luxury',
            'Exclusive owner holiday vacation quota with transparent revenue-sharing reports',
          ],
        },
      ];
    }

    if (service.id === 'hotel-development') {
      return [
        {
          title: 'Commercial Engineering Privileges',
          subtitle: 'Acoustic & Structural Quality',
          icon: <Building2 className="w-4 h-4 text-[#caa050]" />,
          benefits: [
            'Acoustic double-glazed facade guaranteeing complete soundproofing near airport',
            'Central energy-efficient VRF/HVAC climate control with fresh-air ventilation',
            'High-speed Otis/Schindler guest and service elevators with smart touchless controls',
            'Dedicated high-voltage electrical substation with 100% dual-generator redundancy',
            'NFPA-compliant automated fire sprinkler grid, smoke dampers, and emergency exits',
          ],
        },
        {
          title: 'Business Facilities & Hospitality',
          subtitle: 'Executive Privileges',
          icon: <ShieldCheck className="w-4 h-4 text-[#caa050]" />,
          benefits: [
            'Strategic prime location within 5 to 10 minutes of Dhaka International Airport',
            'Multi-cuisine fine dining restaurant, executive business lounge, and 24/7 cafe',
            'State-of-the-art conference halls and boardrooms equipped with audio-visual gear',
            'Rooftop temperature-controlled swimming pool, fitness health club, and spa',
            '24/7 airport logistics shuttle, valet parking, and multi-tier guest security matrix',
          ],
        },
      ];
    }

    if (service.id === 'land-share-opportunities') {
      return [
        {
          title: 'Site Infrastructure Privileges',
          subtitle: 'Civil & Land Development',
          icon: <Building2 className="w-4 h-4 text-[#caa050]" />,
          benefits: [
            'Prime elevated land location beside 300ft Purbachal Expressway & Jolshiri Abashon',
            '100% filled, leveled, and compacted ground ready for immediate construction',
            '40ft wide paved internal connecting avenues linked directly to main highways',
            'Electricity, water connection, and deep sewer drainage infrastructure on site',
            'Permanent precast concrete boundary pillars with gated perimeter security fencing',
          ],
        },
        {
          title: 'Co-Ownership & Financial Privileges',
          subtitle: 'Cost Savings & Legal Safety',
          icon: <ShieldCheck className="w-4 h-4 text-[#caa050]" />,
          benefits: [
            'Actual wholesale development pricing saving 35% to 45% over commercial market rates',
            'Individual registered deed sub-registry directly under buyer’s personal name',
            'Zero-litigation land bank with pre-approved layout ready for joint RAJUK sanction',
            'Easy flexible installment schedule spread across 24 to 36 convenient monthly terms',
            'Projected 2.5x to 3.0x capital appreciation upon completion of surrounding mega-projects',
          ],
        },
      ];
    }

    // Default Residential / Housing Development:
    return [
      {
        title: 'Structural & Engineering Privileges',
        subtitle: 'Earthquake-Safe Construction',
        icon: <Building2 className="w-4 h-4 text-[#caa050]" />,
        benefits: [
          'Earthquake-resistant RCC frame designed strictly adhering to BNBC 2020 seismic code',
          '70–90 ft deep cast-in-situ bored piling with certified digital soil-test reports',
          '60/72.5 grade deformed steel reinforcement vetted by BUET structural engineers',
          'Multilayer subterranean basement waterproofing membrane preventing dampness',
          '3,500–4,500 PSI cylinder crush strength certified ready-mix concrete',
        ],
      },
      {
        title: 'Luxury Amenities & Facilities',
        subtitle: 'Modern Living Privileges',
        icon: <ShieldCheck className="w-4 h-4 text-[#caa050]" />,
        benefits: [
          '100% full standby European generator (Perkins/Cummins) covering complete flat loads',
          'Dual high-speed European elevators (Otis / Schindler) with ARD emergency auto-rescue',
          '24/7 multi-tier security matrix with CCTV, video intercom & biometric digital locks',
          'Landscaped rooftop infinity garden, walking terrace track, and community BBQ lounge',
          'NFPA-compliant automated fire hydrant ring with smoke detectors on every floor',
        ],
      },
    ];
  };

  const twoBenefitCards = getTwoBenefitCards();

  return (
    <div
      id="service-detail-inner-page"
      className={`min-h-screen w-full transition-colors duration-300 pb-16 ${
        darkMode ? 'bg-[#111114] text-white' : 'bg-[#fafafa] text-neutral-900'
      }`}
    >
      {/* Clean Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
        
        {/* Navigation & Action Header */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
              darkMode
                ? 'bg-neutral-900/90 hover:bg-neutral-800 text-zinc-200 border-white/10 hover:border-[#caa050]/50'
                : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-300 shadow-2xs'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-[#caa050]" />
            <span>Back to Services</span>
          </button>

          <button
            type="button"
            onClick={() => onBookMeeting(service.title)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#caa050] via-[#d4ad4b] to-[#b88d3d] hover:from-[#d8af5c] hover:to-[#caa050] text-neutral-950 font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-neutral-950 stroke-[2.5]" />
            <span>Book Consultation</span>
          </button>
        </div>

        {/* Title, Badge & Location Header */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-[#caa050] text-neutral-950 text-[11px]">
              {service.categoryLabel || 'Signature Project'}
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#caa050]">
              <Star className="w-3.5 h-3.5 fill-[#caa050]" />
              {service.rating || 4.9} Rating
            </span>
            <span className={`${darkMode ? 'text-zinc-600' : 'text-neutral-300'}`}>•</span>
            <span className={`inline-flex items-center gap-1 ${darkMode ? 'text-zinc-400' : 'text-neutral-600'}`}>
              <MapPin className="w-3.5 h-3.5 text-[#caa050]" />
              {projectDetails.locationDetails}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight">
            {projectDetails.projectTitle}
          </h1>

          <p className={`text-sm sm:text-base ${darkMode ? 'text-zinc-300' : 'text-neutral-700'}`}>
            {projectDetails.subtitle}
          </p>
        </div>

        {/* Photo Slider (Clean, Compact & Interactive) */}
        <div className="space-y-2.5">
          <div className="relative w-full h-[260px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden border border-neutral-800 shadow-lg group select-none">
            <img
              src={currentPhoto.url}
              alt={currentPhoto.caption}
              className="w-full h-full object-cover object-center transition-all duration-500"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Photo Counter */}
            <div className="absolute top-3.5 left-4 flex items-center justify-between right-4 z-10">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-xs font-mono font-medium">
                Photo {activePhotoIndex + 1} of {gallery.length}
              </span>

              <button
                type="button"
                onClick={() => setIsFullscreenPhoto(true)}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                title="Fullscreen Image"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Slider Nav Buttons */}
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-[#caa050] text-white hover:text-neutral-950 flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md active:scale-95"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-[#caa050] text-white hover:text-neutral-950 flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md active:scale-95"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Caption */}
            <div className="absolute bottom-3 left-4 right-4 z-10">
              <div className="p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 max-w-lg">
                <p className="text-white text-xs sm:text-sm font-semibold truncate">
                  {currentPhoto.caption}
                </p>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          {gallery.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {gallery.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activePhotoIndex === idx
                      ? 'w-6 bg-[#caa050]'
                      : 'w-1.5 bg-neutral-600 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 4 Key Details Cards (Short & Simple) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            className={`p-3.5 rounded-xl border ${
              darkMode ? 'bg-[#16161a] border-[#caa050]/40' : 'bg-amber-50/70 border-amber-300'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#caa050] uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Handover</span>
            </div>
            <p className="mt-1 text-sm sm:text-base font-extrabold tracking-tight">
              {projectDetails.maxHandoverTimeline.replace('Maximum ', '')}
            </p>
          </div>

          <div
            className={`p-3.5 rounded-xl border ${
              darkMode ? 'bg-[#16161a] border-neutral-800' : 'bg-white border-neutral-200'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#caa050] uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Scale</span>
            </div>
            <p className="mt-1 text-sm sm:text-base font-bold tracking-tight truncate">
              {projectDetails.totalFloorsOrScale}
            </p>
          </div>

          <div
            className={`p-3.5 rounded-xl border ${
              darkMode ? 'bg-[#16161a] border-neutral-800' : 'bg-white border-neutral-200'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#caa050] uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Units</span>
            </div>
            <p className="mt-1 text-sm sm:text-base font-bold tracking-tight truncate">
              {projectDetails.totalUnitsOrCapacity}
            </p>
          </div>

          <div
            className={`p-3.5 rounded-xl border ${
              darkMode ? 'bg-[#16161a] border-neutral-800' : 'bg-white border-neutral-200'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#caa050] uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Price</span>
            </div>
            <p className="mt-1 text-sm sm:text-base font-bold tracking-tight text-[#caa050] truncate">
              {projectDetails.priceDetails.startingPrice}
            </p>
          </div>
        </div>

        {/* Short Project Description */}
        <div
          className={`p-5 rounded-2xl border ${
            darkMode ? 'bg-[#151518] border-neutral-800' : 'bg-white border-neutral-200 shadow-2xs'
          }`}
        >
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#caa050]">
            Project Overview
          </h2>
          <p className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-neutral-700'}`}>
            {projectDetails.projectOverview}
          </p>
        </div>

        {/* Scope of Work Performed (Exactly 2 Cards with 5 Project Benefits Each) */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold font-display flex items-center gap-2 text-[#caa050]">
            <Building2 className="w-4 h-4" />
            <span>Scope of Work Performed</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {twoBenefitCards.map((card, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  darkMode
                    ? 'bg-[#151518] border-neutral-800 hover:border-[#caa050]/50'
                    : 'bg-white border-neutral-200 shadow-xs hover:border-[#caa050]/60'
                }`}
              >
                <div className="flex items-center gap-3 pb-3 border-b border-neutral-800/60 dark:border-neutral-800">
                  <div className="w-8 h-8 rounded-xl bg-[#caa050]/20 border border-[#caa050]/30 text-[#caa050] flex items-center justify-center shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-[15px] font-bold tracking-tight text-white dark:text-white">
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-[#caa050] font-medium">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* 5 Project Benefits / Facilities */}
                <ul className="mt-3.5 space-y-2.5">
                  {card.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#caa050] shrink-0 mt-0.5" />
                      <span className={darkMode ? 'text-zinc-200' : 'text-neutral-700'}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Handover & Delivery Guarantee (Simple Card) */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            darkMode
              ? 'bg-gradient-to-r from-amber-950/30 via-[#181612] to-[#141416] border-[#caa050]/50'
              : 'bg-amber-50/80 border-amber-300'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#caa050] uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Maximum Handover Delivery</span>
            </div>
            <p className="text-base sm:text-lg font-extrabold mt-1 text-[#caa050]">
              {projectDetails.maxHandoverTimeline}
            </p>
            <p className={`text-xs mt-0.5 ${darkMode ? 'text-zinc-400' : 'text-neutral-600'}`}>
              {projectDetails.handoverPenaltyGuarantee}
            </p>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-black/40 border border-[#caa050]/30 text-center shrink-0">
            <span className="text-[11px] text-amber-300 font-bold block">
              RCC Warranty
            </span>
            <span className="text-xs font-bold text-white block mt-0.5">
              10-Year Guarantee
            </span>
          </div>
        </div>

        {/* Simple Bottom CTA Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleDownloadBrochure}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer inline-flex items-center gap-2 ${
              brochureDownloaded
                ? 'bg-emerald-600 text-white border-emerald-500'
                : darkMode
                ? 'bg-neutral-900 hover:bg-neutral-800 text-zinc-300 border-neutral-700'
                : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-300'
            }`}
          >
            {brochureDownloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-[#caa050]" />
                <span>Brochure PDF</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onBookMeeting(service.title)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#caa050] via-[#d4ad4b] to-[#b88d3d] hover:from-[#d8af5c] hover:to-[#caa050] text-neutral-950 font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-95 cursor-pointer inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-neutral-950 stroke-[2.5]" />
            <span>Book Site Visit & Consultation</span>
          </button>
        </div>

      </div>

      {/* Fullscreen Photo Lightbox */}
      {isFullscreenPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
          onClick={() => setIsFullscreenPhoto(false)}
        >
          <button
            type="button"
            onClick={() => setIsFullscreenPhoto(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()}
          />

          <p className="text-white text-center mt-3 font-medium text-xs max-w-lg">
            {currentPhoto.caption}
          </p>
        </div>
      )}
    </div>
  );
};
