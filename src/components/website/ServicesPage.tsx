import React, { useState, useMemo } from 'react';
import {
  Home,
  Building2,
  Building,
  Palmtree,
  Hotel,
  Share2,
  BadgeDollarSign,
  Compass,
  ShieldCheck,
  Handshake,
  Wrench,
  TrendingUp,
  Users,
  MapPin,
  Lock,
  Sparkles,
  CheckCircle2,
  Leaf,
  Scale,
  Clock,
  FileCheck,
  Award,
  ChevronDown,
  ChevronUp,
  Check,
  ArrowRight,
  Mail,
  PhoneCall,
  Shield,
  Facebook,
  Linkedin,
  Youtube,
  Briefcase,
  Layers,
} from 'lucide-react';
import {
  SERVICES_LIST,
  BENEFITS_LIST,
  HOW_IT_WORKS_STEPS,
  FAQS_LIST,
  TRUST_BADGES,
  ServiceItem,
  FaqItem,
} from '../../data/servicesData';
import { ServiceDetailInnerPage } from './ServiceDetailInnerPage';

interface ServicesPageProps {
  darkMode?: boolean;
  onOpenAdvisor: (serviceName?: string, customTitle?: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  darkMode = true,
  onOpenAdvisor,
  onNavigateTab,
}) => {
  // Interactive Detail Modal & Bookmark States
  const [selectedServiceForDetail, setSelectedServiceForDetail] = useState<ServiceItem | null>(null);

  // FAQ State (Interactive Accordion for 2-column layout)
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({
    'faq-1': true,
  });

  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Split FAQs into row pairs for perfect horizontal alignment between side-by-side columns
  const faqRows = useMemo(() => {
    const half = Math.ceil(FAQS_LIST.length / 2);
    const left = FAQS_LIST.slice(0, half);
    const right = FAQS_LIST.slice(half);
    const rows: { left: FaqItem; right?: FaqItem }[] = [];
    for (let i = 0; i < half; i++) {
      rows.push({
        left: left[i],
        right: right[i],
      });
    }
    return rows;
  }, []);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // How It Works: Interactive Progress Stepper State (0 to 4)
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterSuccess(false);
      setNewsletterEmail('');
    }, 4000);
  };

  // Helper to get dedicated service icon based on service id
  const getServiceIcon = (serviceId: string, className = 'w-6 h-6 sm:w-7 sm:h-7') => {
    switch (serviceId) {
      case 'housing-development':
        return <Building2 className={className} />;
      case 'city-development':
        return <Compass className={className} />;
      case 'real-estate-solutions':
        return <TrendingUp className={className} />;
      case 'resort-development':
        return <Palmtree className={className} />;
      case 'hotel-development':
        return <Hotel className={className} />;
      case 'land-share-opportunities':
        return <Share2 className={className} />;
      case 'land-sales-purchasing':
        return <ShieldCheck className={className} />;
      case 'architectural-design':
        return <Layers className={className} />;
      case 'legal-verification':
        return <Scale className={className} />;
      case 'joint-venture':
        return <Handshake className={className} />;
      case 'property-management':
        return <Wrench className={className} />;
      case 'custom-advisory':
        return <Briefcase className={className} />;
      default:
        return <Building className={className} />;
    }
  };

  // Helper to render benefit icons with balanced, subtle scale
  const renderBenefitIcon = (iconName: string, customClass = 'w-4 h-4 text-[#caa050] shrink-0') => {
    const props = { className: customClass };
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp {...props} />;
      case 'Users':
        return <Users {...props} />;
      case 'MapPin':
        return <MapPin {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'Lock':
        return <Lock {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'CheckCircle2':
        return <CheckCircle2 {...props} />;
      case 'Leaf':
        return <Leaf {...props} />;
      case 'Scale':
        return <Scale {...props} />;
      case 'Clock':
        return <Clock {...props} />;
      case 'FileCheck':
        return <FileCheck {...props} />;
      case 'Award':
        return <Award {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  // Helper to render an individual FAQ card with balanced height and responsive padding
  const renderFaqCard = (faq: FaqItem | undefined) => {
    if (!faq) return <div className="hidden md:block" />;
    const isOpen = !!expandedFaqs[faq.id];
    return (
      <div
        key={faq.id}
        id={`faq-item-${faq.id}`}
        className={`rounded-xl border overflow-hidden transition-all duration-300 flex flex-col justify-start ${
          darkMode
            ? 'border-[#a87f3b]/30 bg-[#1b1b1b] hover:border-[#caa050]/50 shadow-xs'
            : 'glass-liquid-card-light hover:border-[#caa050]/60'
        }`}
      >
        <button
          type="button"
          onClick={() => toggleFaq(faq.id)}
          className={`w-full min-h-[58px] sm:min-h-[64px] px-4 sm:px-5 py-3 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#caa050] ${
            darkMode ? 'text-white hover:text-[#caa050]' : 'text-neutral-900 hover:text-amber-800'
          }`}
          aria-expanded={isOpen}
        >
          <span className="leading-snug flex-1 pr-1">{faq.question}</span>
          <span className="shrink-0 text-[#caa050]">
            {isOpen ? (
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200" />
            ) : (
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200" />
            )}
          </span>
        </button>

        {isOpen && (
          <div
            className={`px-4 sm:px-5 pb-4 pt-2 text-xs sm:text-[13px] leading-relaxed border-t transition-colors ${
              darkMode
                ? 'text-zinc-300 border-[#a87f3b]/20 bg-[#151515]'
                : 'text-neutral-700 border-white/60 bg-white/40 backdrop-blur-md'
            }`}
          >
            {faq.answer}
          </div>
        )}
      </div>
    );
  };

  // Dedicated Inner Page for Service Details (No Pop-up)
  if (selectedServiceForDetail) {
    return (
      <ServiceDetailInnerPage
        darkMode={darkMode}
        service={selectedServiceForDetail}
        onBack={() => setSelectedServiceForDetail(null)}
        onBookMeeting={(serviceTitle) => {
          onOpenAdvisor(serviceTitle, 'Book Meeting');
        }}
      />
    );
  }

  return (
    <div
      id="services-page-root"
      className={`w-full transition-colors duration-300 ${
        darkMode ? 'bg-[#141414] text-white' : 'bg-[#fafafa] text-neutral-900'
      }`}
    >
      {/* ================= HERO BANNER ================= */}
      <section
        id="services-hero-banner"
        className={`relative min-h-[340px] sm:min-h-[380px] md:min-h-[400px] flex items-center justify-center pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-32 md:pb-18 overflow-hidden border-b transition-colors duration-300 ${
          darkMode
            ? 'border-[#a87f3b]/35 bg-[#141414]'
            : 'border-neutral-200 bg-neutral-900'
        }`}
      >
        {/* Construction Site & Architectural Desk Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=85"
            alt="Professional Construction & Architectural Engineering Services"
            className="w-full h-full object-cover object-center brightness-95 contrast-105"
            referrerPolicy="no-referrer"
          />
          {/* Transparent Gradient Overlays for High Image Visibility and Crisp Text Contrast */}
          <div
            className={`absolute inset-0 pointer-events-none transition-colors duration-300 ${
              darkMode
                ? 'bg-gradient-to-t from-[#141414] via-black/30 to-black/45'
                : 'bg-gradient-to-t from-[#fafafa] via-black/35 to-black/55'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1c160c]/90 border border-[#caa050]/80 backdrop-blur-md shadow-md mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#caa050]" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#caa050] uppercase font-sans">
              COMPREHENSIVE SOLUTIONS
            </span>
          </div>

          {/* Main Title: Refined, elegant scale */}
          <h1
            id="services-main-headline"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display drop-shadow-md leading-tight text-center"
          >
            Professional Services
          </h1>

          {/* Tagline with Left and Right Gold Accent Lines */}
          <div className="mt-3 sm:mt-4 flex items-center justify-center gap-3 max-w-md mx-auto w-full px-2">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#a87f3b]/70 to-[#caa050]" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#caa050] uppercase whitespace-nowrap">
              EXCELLENCE IN EVERY DETAIL
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#a87f3b]/70 to-[#caa050]" />
          </div>
        </div>
      </section>

      {/* ================= SECTION 1: OUR SERVICES ================= */}
      <section id="our-services-section" className="py-14 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2
            id="our-services-heading"
            className={`text-2xl sm:text-3xl font-bold font-display ${
              darkMode ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Our Services
          </h2>
          <div className="w-12 h-0.5 bg-[#caa050] mx-auto mt-2.5 rounded-full shadow-[0_0_8px_rgba(202,160,80,0.5)]" />
          <p
            className={`mt-2.5 text-xs sm:text-sm leading-relaxed ${
              darkMode ? 'text-zinc-300' : 'text-neutral-600'
            }`}
          >
            Comprehensive real estate solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid: 2 cards per line with refined architectural proportion, light golden watermark & all golden CTA buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
          {SERVICES_LIST.map((service, index) => {
            const formattedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                onClick={() => setSelectedServiceForDetail(service)}
                className={`group relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 min-h-[300px] sm:min-h-[320px] flex flex-col justify-between overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 ${
                  darkMode
                    ? 'bg-[#141417] hover:bg-[#18181d] border-[#a87f3b]/35 hover:border-[#caa050]/80 shadow-[0_12px_36px_rgba(0,0,0,0.55)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_24px_rgba(202,160,80,0.18)]'
                    : 'bg-[#fafafc] hover:bg-white border-neutral-200/90 hover:border-[#caa050]/60 shadow-[0_8px_28px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08),0_0_20px_rgba(202,160,80,0.12)]'
                }`}
              >
                {/* Top-Right Number Watermark: Elegant light golden architectural watermark */}
                <div
                  className="pointer-events-none select-none absolute top-4 right-5 sm:top-5 sm:right-6 font-mono font-extrabold text-3xl sm:text-4xl tracking-tight text-[#caa050]/20 group-hover:text-[#caa050]/35 transition-all duration-300"
                  aria-hidden="true"
                >
                  {formattedIndex}
                </div>

                {/* Title-Related Watermark: Scaled down with elegant light golden shade in bottom-right */}
                <div
                  className="pointer-events-none select-none absolute -right-3 -bottom-5 sm:-right-4 sm:-bottom-6 text-[#caa050]/[0.10] group-hover:text-[#caa050]/[0.22] transition-all duration-500 ease-out group-hover:scale-105"
                  aria-hidden="true"
                >
                  {getServiceIcon(
                    service.id,
                    'w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 stroke-[1.1] transition-transform duration-500 ease-out group-hover:-rotate-3'
                  )}
                </div>

                {/* Content Area: Adjusted proportional sizing */}
                <div className="relative z-10 max-w-[85%] sm:max-w-[82%]">
                  {/* 1. Icon on the top left */}
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                      darkMode
                        ? 'bg-amber-500/10 border border-[#caa050]/35 text-[#caa050] group-hover:bg-[#caa050]/20'
                        : 'bg-amber-50 border border-amber-200/90 text-amber-700 group-hover:bg-amber-100'
                    }`}
                  >
                    {getServiceIcon(service.id, 'w-5 h-5 sm:w-5.5 sm:h-5.5')}
                  </div>

                  {/* 2. Title: Well-balanced size */}
                  <h3
                    className={`mt-4 sm:mt-4.5 text-lg sm:text-xl font-bold font-display tracking-tight leading-snug transition-colors duration-200 ${
                      darkMode
                        ? 'text-white group-hover:text-[#f3dfa7]'
                        : 'text-neutral-900 group-hover:text-amber-900'
                    }`}
                    title={service.title}
                  >
                    {service.title}
                  </h3>

                  {/* 3. Body Text: Refined readable size */}
                  <p
                    className={`mt-2 sm:mt-2.5 text-xs sm:text-[13.5px] leading-relaxed font-normal transition-colors line-clamp-3 ${
                      darkMode ? 'text-zinc-300' : 'text-neutral-600'
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                {/* 5. Bottom Action: 100% Golden CTA Button & Golden Label */}
                <div className="relative z-10 mt-6 sm:mt-7 pt-1 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedServiceForDetail(service);
                    }}
                    className="inline-flex items-center gap-3 group/btn cursor-pointer outline-none"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <span className="text-xs sm:text-[13px] font-bold tracking-wide text-[#caa050] group-hover:text-[#d8af5c] transition-colors">
                      Learn More
                    </span>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-105 group-hover:shadow-[0_0_18px_rgba(202,160,80,0.5)] bg-gradient-to-r from-[#caa050] via-[#d4ad4b] to-[#b88d3d] hover:from-[#d8af5c] hover:to-[#caa050] text-neutral-950">
                      <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:translate-x-1 text-neutral-950 stroke-[2.5]" />
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= SECTION 2: WHY CHOOSE OUR SERVICES ================= */}
      <section
        id="why-choose-section"
        className={`py-16 sm:py-20 relative overflow-hidden border-y transition-colors duration-300 ${
          darkMode ? 'border-[#a87f3b]/30' : 'border-neutral-200 bg-neutral-100/60'
        }`}
      >
        {/* Real Estate Background Image with High Visibility & Gentle Soft Blur */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
            alt="Real estate architectural building"
            className="w-full h-full object-cover object-center filter blur-[1.5px] scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          {/* Balanced lighting overlay */}
          <div
            className={`absolute inset-0 pointer-events-none transition-colors duration-300 ${
              darkMode
                ? 'bg-gradient-to-t from-[#141414] via-black/40 to-[#141414]/80'
                : 'bg-gradient-to-t from-[#fafafa] via-white/70 to-[#fafafa]/90'
            }`}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <h2
              id="why-choose-heading"
              className={`text-2xl sm:text-3xl font-bold font-display ${
                darkMode ? 'text-white drop-shadow-md' : 'text-neutral-900'
              }`}
            >
              Why Choose Our Services
            </h2>
            <div className="w-12 h-0.5 bg-[#caa050] mx-auto mt-2.5 rounded-full shadow-[0_0_8px_rgba(202,160,80,0.6)]" />
            <p
              className={`mt-2.5 text-xs sm:text-sm ${
                darkMode ? 'text-zinc-200 drop-shadow' : 'text-neutral-600'
              }`}
            >
              Twelve structural advantages guaranteeing safety, capital growth, and complete transparency.
            </p>
          </div>

          {/* Cards Grid: 12 cards with glass liquid effect in white mode */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {BENEFITS_LIST.map((benefit) => (
              <div
                key={benefit.id}
                id={`benefit-card-${benefit.id}`}
                className={`min-h-[120px] sm:min-h-[128px] rounded-xl p-4 sm:p-5 transition-all duration-300 flex flex-col items-center justify-center text-center gap-2.5 sm:gap-3 hover:-translate-y-0.5 group cursor-default ${
                  darkMode
                    ? 'bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/15 hover:border-[#caa050] shadow-md hover:shadow-lg'
                    : 'glass-liquid-card-light hover:border-[#caa050]'
                }`}
              >
                {/* Centered Icon with middle margin */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#caa050]/15 border border-[#caa050]/30 flex items-center justify-center text-[#caa050] shrink-0 group-hover:bg-[#caa050]/25 group-hover:scale-110 transition-all duration-200 shadow-sm">
                  {renderBenefitIcon(benefit.iconName, 'w-4 h-4 sm:w-5 sm:h-5 text-[#caa050] shrink-0')}
                </div>

                {/* Title Text Centered */}
                <h3
                  className={`text-xs sm:text-[13px] font-semibold font-display leading-snug tracking-tight transition-colors text-center line-clamp-2 ${
                    darkMode
                      ? 'text-white group-hover:text-[#f8e6be] drop-shadow'
                      : 'text-neutral-900 group-hover:text-amber-800'
                  }`}
                  title={benefit.title}
                >
                  {benefit.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: HOW IT WORKS (PROGRESS BAR STEPPER) ================= */}
      <section id="how-it-works-section" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2
            id="how-it-works-heading"
            className={`text-2xl sm:text-3xl font-bold font-display ${
              darkMode ? 'text-white' : 'text-neutral-900'
            }`}
          >
            How It Works
          </h2>
          <div className="w-12 h-0.5 bg-[#caa050] mx-auto mt-2.5 rounded-full shadow-[0_0_8px_rgba(202,160,80,0.5)]" />
          <p className={`mt-2.5 text-xs sm:text-sm ${darkMode ? 'text-zinc-300' : 'text-neutral-600'}`}>
            A clear and simple 5-step guided process from initial application to final key handover.
          </p>
        </div>

        {/* Desktop 5-Columns Stepper with Connected Progress Line (>= lg) */}
        <div className="hidden lg:block relative mb-10">
          {/* Background Connected Progress Track Line */}
          <div
            className={`absolute top-6 left-[10%] right-[10%] h-1 z-0 rounded-full overflow-hidden ${
              darkMode ? 'bg-neutral-800' : 'bg-neutral-200'
            }`}
          >
            <div
              className="h-full bg-gradient-to-r from-[#caa050] to-[#f7e4af] transition-all duration-500 shadow-[0_0_10px_rgba(202,160,80,0.7)]"
              style={{ width: `${(activeStep / (HOW_IT_WORKS_STEPS.length - 1)) * 100}%` }}
            />
          </div>

          {/* 5 Step Nodes & Content Cards */}
          <div className="grid grid-cols-5 gap-3.5 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const isDone = idx < activeStep;
              const isCurrent = idx === activeStep;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`flex flex-col cursor-pointer transition-all duration-200 ${
                    isCurrent ? 'scale-[1.01]' : 'opacity-90 hover:opacity-100'
                  }`}
                >
                  {/* Top Circular Badge on the Progress Line */}
                  <div className="flex flex-col items-center mb-3.5">
                    <button
                      type="button"
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs font-display transition-all duration-200 cursor-pointer ${
                        isCurrent
                          ? 'bg-gradient-to-br from-[#caa050] to-[#9d742f] text-neutral-950 ring-3 ring-[#caa050]/40 shadow-[0_0_15px_rgba(202,160,80,0.6)] scale-105'
                          : isDone
                          ? 'bg-emerald-500 text-white ring-2 ring-emerald-500/40 shadow-sm'
                          : darkMode
                          ? 'bg-[#1c1c1c] text-zinc-400 border border-[#a87f3b]/40 hover:border-[#caa050]'
                          : 'glass-liquid-pill-light text-neutral-800 border-white/90 hover:border-[#caa050]'
                      }`}
                    >
                      {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : step.number}
                    </button>
                    <span
                      className={`text-[10px] font-bold mt-1.5 uppercase tracking-wider ${
                        isCurrent
                          ? 'text-[#caa050]'
                          : isDone
                          ? 'text-emerald-500'
                          : darkMode
                          ? 'text-zinc-500'
                          : 'text-neutral-500'
                      }`}
                    >
                      {isDone ? 'Completed' : isCurrent ? 'Active' : `Step ${idx + 1}`}
                    </span>
                  </div>

                  {/* Step Card */}
                  <div
                    className={`flex-1 rounded-xl p-3.5 sm:p-4 flex flex-col justify-center text-center transition-all duration-300 min-h-[96px] ${
                      isCurrent
                        ? darkMode
                          ? 'bg-[#1f1f1f] border border-[#caa050] shadow-lg'
                          : 'glass-liquid-dock-light border-2 border-[#caa050] shadow-[0_12px_32px_rgba(202,160,80,0.25)]'
                        : darkMode
                        ? 'bg-[#171717] hover:bg-[#1c1c1c] border border-[#a87f3b]/30'
                        : 'glass-liquid-card-light hover:border-[#caa050]/60'
                    }`}
                  >
                    <h3
                      className={`text-xs sm:text-sm font-bold font-display leading-snug mb-1 transition-colors ${
                        darkMode ? 'text-white group-hover:text-[#f7e4af]' : 'text-neutral-900 group-hover:text-amber-800'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-[11px] sm:text-xs leading-relaxed font-normal ${
                        darkMode ? 'text-zinc-300' : 'text-neutral-600'
                      }`}
                    >
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Progress Tracker (< lg) */}
        <div className="lg:hidden relative pl-6 sm:pl-8 space-y-3.5 mb-8">
          {/* Continuous Glowing Progress Track Line on Left */}
          <div
            className={`absolute left-[17px] sm:left-[21px] top-5 bottom-5 w-1 rounded-full ${
              darkMode ? 'bg-neutral-800' : 'bg-neutral-200'
            }`}
          >
            <div
              className="w-full bg-gradient-to-b from-[#caa050] to-[#f7e4af] transition-all duration-500 shadow-[0_0_8px_rgba(202,160,80,0.7)]"
              style={{ height: `${((activeStep + 1) / HOW_IT_WORKS_STEPS.length) * 100}%` }}
            />
          </div>

          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const isDone = idx < activeStep;
            const isCurrent = idx === activeStep;

            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className="relative flex items-start gap-3 cursor-pointer group"
              >
                {/* Node */}
                <div
                  className={`shrink-0 -ml-6 sm:-ml-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs font-display z-10 transition-all ${
                    isCurrent
                      ? 'bg-[#caa050] text-neutral-950 ring-3 ring-[#caa050]/40 shadow-md'
                      : isDone
                      ? 'bg-emerald-500 text-white'
                      : darkMode
                      ? 'bg-[#202020] text-zinc-400 border border-[#a87f3b]/40'
                      : 'glass-liquid-pill-light text-neutral-800 border-white/90'
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.number}
                </div>

                {/* Content Card */}
                <div
                  className={`flex-1 rounded-xl p-3.5 sm:p-4 transition-all duration-300 ${
                    isCurrent
                      ? darkMode
                        ? 'bg-[#202020] border border-[#caa050] shadow-md'
                        : 'glass-liquid-dock-light border-2 border-[#caa050] shadow-[0_12px_32px_rgba(202,160,80,0.2)]'
                      : darkMode
                      ? 'bg-[#171717] border border-[#a87f3b]/30'
                      : 'glass-liquid-card-light'
                  }`}
                >
                  <h3
                    className={`text-xs sm:text-sm font-bold font-display mb-1 ${
                      darkMode ? 'text-white' : 'text-neutral-900'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-[11px] sm:text-xs leading-relaxed font-normal ${
                      darkMode ? 'text-zinc-300' : 'text-neutral-600'
                    }`}
                  >
                    {step.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Advisor CTA Button Centered */}
        <div className="mt-8 sm:mt-10 text-center">
          <button
            id="how-it-works-cta-button"
            type="button"
            onClick={() => onOpenAdvisor()}
            className="px-6 sm:px-7 py-3 rounded-xl bg-[#caa050] hover:bg-[#d8af5c] text-neutral-950 font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-[0_0_15px_rgba(202,160,80,0.3)] active:scale-95 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Start Your Journey</span>
          </button>
        </div>
      </section>

      {/* ================= SECTION 4: FREQUENTLY ASKED QUESTIONS ================= */}
      <section
        id="faq-section"
        className={`py-16 sm:py-20 border-t transition-colors duration-300 ${
          darkMode ? 'bg-[#141414] border-[#a87f3b]/25' : 'bg-neutral-100/70 border-neutral-200'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <h2
              id="faq-heading"
              className={`text-2xl sm:text-3xl font-bold font-display ${
                darkMode ? 'text-white' : 'text-neutral-900'
              }`}
            >
              Frequently Asked Questions
            </h2>
            <div className="w-12 h-0.5 bg-[#caa050] mx-auto mt-2.5 rounded-full shadow-[0_0_8px_rgba(202,160,80,0.5)]" />
            <p
              className={`mt-2.5 text-xs sm:text-sm ${
                darkMode ? 'text-zinc-300' : 'text-neutral-600'
              }`}
            >
              Have a question? We've got answers!
            </p>
          </div>

          {/* Row-by-Row Aligned FAQ Grid: Ensures side-by-side cards align perfectly across columns */}
          <div className="space-y-3.5 sm:space-y-4">
            {faqRows.map((row, idx) => (
              <div
                key={idx}
                id={`faq-row-${idx}`}
                className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start"
              >
                {renderFaqCard(row.left)}
                {renderFaqCard(row.right)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRUST BADGES STRIP ================= */}
      <section
        id="trust-badges-ribbon"
        className={`relative dot-pattern-gold border-y py-8 sm:py-10 overflow-hidden transition-colors duration-300 ${
          darkMode ? 'bg-[#131313] border-[#a87f3b]/30' : 'bg-white border-neutral-200'
        }`}
      >
        {/* Subtle dark vignette overlay for depth */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            darkMode
              ? 'bg-gradient-to-r from-[#131313]/40 via-transparent to-[#131313]/40'
              : 'bg-gradient-to-r from-white/40 via-transparent to-white/40'
          }`}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            {TRUST_BADGES.map((badge, idx) => {
              const badgeIcons = [
                <ShieldCheck key="0" className="w-5 h-5 sm:w-6 sm:h-6 text-[#caa050]" />,
                <FileCheck key="1" className="w-5 h-5 sm:w-6 sm:h-6 text-[#caa050]" />,
                <Clock key="2" className="w-5 h-5 sm:w-6 sm:h-6 text-[#caa050]" />,
                <TrendingUp key="3" className="w-5 h-5 sm:w-6 sm:h-6 text-[#caa050]" />,
              ];

              return (
                <div
                  key={idx}
                  id={`trust-badge-card-${idx}`}
                  className={`py-6 px-4 sm:px-5 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 group min-h-[125px] ${
                    darkMode
                      ? 'bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 hover:border-[#caa050]/70 shadow-[0_8px_25px_rgba(0,0,0,0.4)]'
                      : 'glass-liquid-card-light hover:border-[#caa050]/70'
                  }`}
                >
                  <div className="w-11 h-11 rounded-full bg-[#caa050]/15 border border-[#caa050]/35 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#caa050]/25 transition-all duration-300 shadow-sm shrink-0">
                    {badgeIcons[idx % badgeIcons.length]}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-bold font-display tracking-tight leading-snug transition-colors ${
                      darkMode ? 'text-white group-hover:text-[#f8e6be]' : 'text-neutral-900 group-hover:text-amber-800'
                    }`}
                  >
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer
        id="site-footer"
        className={`pt-16 pb-12 transition-colors duration-300 ${
          darkMode
            ? 'bg-black text-zinc-300 border-t border-[#a87f3b]/25'
            : 'bg-neutral-900 text-neutral-300 border-t border-neutral-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
            {/* Column 1: Brand & Verified Address */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 select-none">
                <svg
                  viewBox="0 0 100 80"
                  className="w-10 h-9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 52 L50 14 L90 52"
                    stroke="#c59b27"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M26 50 L50 26 L74 50"
                    stroke="#ffffff"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M32 60 L44 48 L56 60 L44 72 Z" fill="#c59b27" />
                  <path
                    d="M48 60 L60 48 L72 60 L60 72 Z"
                    stroke="#ffffff"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight text-white font-display leading-tight">
                    Promise
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-neutral-300 uppercase leading-none">
                    Assets Ltd.
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-neutral-200">
                Specializing in Real Estate, properties & consultancy services
              </p>

              <div className="space-y-2 text-xs text-zinc-400">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    Khaja Super Market, 2nd to 7th Floor, Kallyanpur Bus Stop, Mirpur Road, Dhaka-1207.
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Corporate Admin Office</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-zinc-200 hover:text-amber-400 transition-colors">
                    info@promiseassets.com
                  </span>
                </p>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white font-display">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('services')}
                    className="hover:text-[#caa050] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-[#caa050]">&gt;</span> Our Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('about')}
                    className="hover:text-[#caa050] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-[#caa050]">&gt;</span> About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('contact')}
                    className="hover:text-[#caa050] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-[#caa050]">&gt;</span> Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Company Governance */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white font-display">
                Our Company
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('landowner')}
                    className="hover:text-[#caa050] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-[#caa050]">&gt;</span> Landowner JV Partnerships
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('projects')}
                    className="hover:text-[#caa050] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-[#caa050]">&gt;</span> Featured Projects
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenAdvisor && onOpenAdvisor('Co-Ownership Share Investment')}
                    className="hover:text-[#caa050] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-[#caa050]">&gt;</span> Co-Ownership Investment
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenAdvisor && onOpenAdvisor('General Consultation / Office Meeting')}
                    className="hover:text-[#caa050] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-[#caa050]">&gt;</span> Office Meeting Booking
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter & Social */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white font-display">
                Newsletter
              </h4>
              <p className="text-xs text-zinc-400">
                Your Weekly/Monthly Dose of Knowledge and Inspiration
              </p>

              {newsletterSuccess ? (
                <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <label htmlFor="footer-newsletter-email" className="block text-[11px] text-zinc-400 font-medium">
                    Your Email Address
                  </label>
                  <div className="flex items-center rounded-xl bg-neutral-900 border border-neutral-700 overflow-hidden focus-within:border-[#caa050]">
                    <input
                      type="email"
                      id="footer-newsletter-email"
                      required
                      placeholder="Enter your email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-transparent text-white text-xs placeholder:text-neutral-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2.5 bg-[#caa050] hover:bg-[#d8af5c] text-neutral-950 font-bold transition-colors cursor-pointer"
                      title="Subscribe to newsletter"
                      aria-label="Subscribe"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* Social Channels */}
              <div className="pt-2">
                <span className="text-xs font-bold text-neutral-300 block mb-2">Follow Us:</span>
                <div className="flex items-center space-x-2.5">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-[#caa050] hover:bg-[#d8af5c] text-neutral-950 flex items-center justify-center transition-transform hover:scale-110 shadow-md"
                    title="Facebook"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-[#caa050] hover:bg-[#d8af5c] text-neutral-950 flex items-center justify-center transition-transform hover:scale-110 shadow-md"
                    title="LinkedIn"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-[#caa050] hover:bg-[#d8af5c] text-neutral-950 flex items-center justify-center transition-transform hover:scale-110 shadow-md"
                    title="YouTube"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Bottom Bar */}
          <div className="pt-8 text-center text-xs text-neutral-500">
            <p>© 2026 Promise Assets. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
