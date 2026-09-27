import React, { useState, useEffect } from 'react';
import {
  Maximize2,
  Minimize2,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Building2,
  ShieldCheck,
  Clock,
  TrendingUp,
  Star,
  Calendar,
  Eye,
  ArrowRight,
  CheckCircle2,
  Landmark,
  FileCheck,
  Check,
  X,
  PhoneCall,
  Share2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HOME_PROJECTS,
  TESTIMONIALS_DATA,
  INSIGHTS_DATA,
  HERO_REAL_ESTATE_SLIDES,
  HomeProjectItem,
  TestimonialItem,
  InsightArticle,
  HeroRealEstateSlide,
} from '../../data/homeData';

interface HomePageProps {
  darkMode?: boolean;
  onOpenAdvisor: (serviceName?: string, customTitle?: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  darkMode = true,
  onOpenAdvisor,
  onNavigateTab,
}) => {
  // Hero Fullscreen State
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Hero Real Estate Slides State
  const [heroSlideIndex, setHeroSlideIndex] = useState<number>(0);
  const [isAutoPlayHero, setIsAutoPlayHero] = useState<boolean>(true);

  // Auto rotate hero slides every 6.5s
  useEffect(() => {
    if (!isAutoPlayHero) return;
    const interval = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % HERO_REAL_ESTATE_SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlayHero]);

  const currentHeroSlide: HeroRealEstateSlide = HERO_REAL_ESTATE_SLIDES[heroSlideIndex];

  const handlePrevHeroSlide = () => {
    setHeroSlideIndex((prev) => (prev - 1 + HERO_REAL_ESTATE_SLIDES.length) % HERO_REAL_ESTATE_SLIDES.length);
  };

  const handleNextHeroSlide = () => {
    setHeroSlideIndex((prev) => (prev + 1) % HERO_REAL_ESTATE_SLIDES.length);
  };

  // Project Filter Tabs State ('All' | 'Running' | 'Upcoming' | 'Completed')
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<HomeProjectItem | null>(null);

  // Video Player States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videoProgress, setVideoProgress] = useState<number>(14); // percentage

  // Testimonial Slider State
  const [testimonialIndex, setTestimonialIndex] = useState<number>(0);

  // Insights Article Modal State
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        setIsFullscreen(true);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Filter projects based on active pill
  const filteredProjects = selectedStatus === 'All'
    ? HOME_PROJECTS
    : HOME_PROJECTS.filter((p) => p.status === selectedStatus);

  const currentTestimonial: TestimonialItem = TESTIMONIALS_DATA[testimonialIndex];

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <div
      id="home-page-root"
      className={`w-full transition-colors duration-300 font-sans ${
        darkMode ? 'bg-[#121214] text-white' : 'bg-[#fcfcfd] text-neutral-900'
      }`}
    >
      {/* ================= 1. HERO SECTION ================= */}
      <section
        id="home-hero-section"
        className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950 select-none"
      >
        {/* Cinematic Real Estate Background Photos with Crossfade */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          {HERO_REAL_ESTATE_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                index === heroSlideIndex
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105 pointer-events-none'
              }`}
            >
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.10]"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}

          {/* Ambient Lighting Gradients */}
          <div
            className={`absolute inset-0 pointer-events-none transition-colors duration-300 ${
              darkMode
                ? 'bg-gradient-to-b from-black/70 via-black/40 to-[#121214]'
                : 'bg-gradient-to-b from-black/60 via-black/30 to-[#fcfcfd]'
            }`}
          />
          <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-black/75 pointer-events-none" />
        </div>

        {/* Top-Right Fullscreen Toggle Button */}
        <div className="absolute top-24 sm:top-28 right-6 sm:right-10 z-20">
          <button
            id="hero-fullscreen-toggle"
            type="button"
            onClick={toggleFullscreen}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 active:scale-95 text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-all duration-200 hover:border-white/40 group cursor-pointer"
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5 transition-transform group-hover:scale-110" />
            ) : (
              <Maximize2 className="w-5 h-5 transition-transform group-hover:scale-110" />
            )}
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 sm:py-28 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Gold Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#caa050]/70 backdrop-blur-md shadow-md mb-5 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-[#caa050] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#caa050] uppercase">
                EXCELLENCE IN URBAN INFRASTRUCTURE
              </span>
            </div>

            {/* Main Headline - Exact wording from user's screenshot */}
            <h1
              id="home-main-headline"
              className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-black text-white tracking-tight leading-[1.12] hero-text-shadow font-display max-w-4xl"
            >
              Pioneering the Future of
              <br />
              Master Planned City
              <br />
              Development
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl font-normal leading-relaxed hero-subtle-shadow"
            >
              Building visionary residential enclaves, smart city infrastructure, and luxury coastal destinations with verified title security and architectural mastery.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('our-projects-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#caa050] via-[#d4ad4b] to-[#b88d3d] hover:from-[#d8af5c] hover:to-[#caa050] text-neutral-950 font-bold text-sm sm:text-base shadow-xl hover:shadow-[0_0_25px_rgba(202,160,80,0.5)] transition-all duration-200 flex items-center gap-2 group cursor-pointer active:scale-95"
              >
                <span>Explore Projects</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={() => onOpenAdvisor('Co-Ownership Share Investment', 'Book Consultation')}
                className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-md border border-white/25 transition-all duration-200 hover:border-white/50 cursor-pointer flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#caa050]" />
                <span>Talk to an Advisor</span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Real Estate Featured Project Dock at Bottom of Hero */}
        <div className="absolute bottom-5 left-0 right-0 z-20 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-auto">
          {/* Active Real Estate Slide Info */}
          <div className="flex items-center gap-3 bg-black/65 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl shadow-xl max-w-full">
            <div className="w-2.5 h-2.5 rounded-full bg-[#caa050] animate-pulse shrink-0" />
            <div className="flex flex-col text-left overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#caa050] tracking-wider uppercase">
                  {currentHeroSlide.badge}
                </span>
                <span className="text-white/40 text-[10px]">•</span>
                <span className="text-white/70 text-[10px] truncate">
                  {currentHeroSlide.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <span className="text-xs sm:text-sm font-bold truncate">
                  {currentHeroSlide.title}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-neutral-300 shrink-0">
                  <MapPin className="w-3 h-3 text-[#caa050]" />
                  {currentHeroSlide.location}
                </span>
              </div>
            </div>
          </div>

          {/* Real Estate Slide Switchers & Quick Thumbnails */}
          <div className="flex items-center gap-2 bg-black/65 backdrop-blur-md border border-white/15 px-3 py-2 rounded-2xl shadow-xl">
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrevHeroSlide}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer"
              title="Previous Real Estate Project"
              aria-label="Previous Real Estate Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Thumbnail preview buttons */}
            <div className="flex items-center gap-1.5">
              {HERO_REAL_ESTATE_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setHeroSlideIndex(idx)}
                  className={`group relative rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    idx === heroSlideIndex
                      ? 'border-[#caa050] shadow-[0_0_10px_rgba(202,160,80,0.6)] scale-105'
                      : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                  }`}
                  title={slide.title}
                >
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-10 sm:w-12 h-7 sm:h-8 object-cover"
                  />
                  {idx === heroSlideIndex && (
                    <div className="absolute inset-0 bg-[#caa050]/20 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNextHeroSlide}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer"
              title="Next Real Estate Project"
              aria-label="Next Real Estate Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Auto play toggle */}
            <button
              type="button"
              onClick={() => setIsAutoPlayHero(!isAutoPlayHero)}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer text-xs ${
                isAutoPlayHero
                  ? 'bg-[#caa050]/25 text-[#caa050] border border-[#caa050]/40'
                  : 'bg-white/10 text-neutral-400 hover:text-white'
              }`}
              title={isAutoPlayHero ? 'Pause Slideshow' : 'Resume Slideshow'}
              aria-label={isAutoPlayHero ? 'Pause Slideshow' : 'Resume Slideshow'}
            >
              {isAutoPlayHero ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </section>

      {/* ================= 2. OUR PROJECTS SECTION ================= */}
      <section id="our-projects-section" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with exact styling from screenshot */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2
            id="our-projects-heading"
            className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight"
          >
            Our <span className="text-[#caa050]">Projects</span>
          </h2>
          <div className="w-12 h-0.5 bg-[#caa050] mx-auto mt-2.5 rounded-full shadow-[0_0_8px_rgba(202,160,80,0.6)]" />
          <p
            className={`mt-3 text-xs sm:text-sm leading-relaxed ${
              darkMode ? 'text-zinc-300' : 'text-neutral-600'
            }`}
          >
            Discover our portfolio of innovative construction and architectural projects
          </p>

          {/* Filter Pill Tabs (All, Running, Upcoming, Completed) */}
          <div className="mt-6 inline-flex items-center p-1.5 rounded-2xl bg-[#caa050]/20 border border-[#caa050]/40 backdrop-blur-sm shadow-sm gap-1">
            {['All', 'Running', 'Upcoming', 'Completed'].map((tab) => {
              const isActive = selectedStatus === tab;
              const count = tab === 'All'
                ? HOME_PROJECTS.length
                : HOME_PROJECTS.filter((p) => p.status === tab).length;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedStatus(tab)}
                  className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-neutral-950 shadow-md scale-100'
                      : darkMode
                      ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                      : 'text-neutral-700 hover:text-neutral-950 hover:bg-white/40'
                  }`}
                >
                  {tab}
                  <span className={`ml-1.5 text-[10px] py-0.5 px-1.5 rounded-full ${
                    isActive ? 'bg-[#caa050] text-neutral-950' : 'bg-neutral-800/20 text-neutral-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Cards Grid: Clean 2 or 3 columns with architectural depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project) => {
            const isRunning = project.status === 'Running';
            const isUpcoming = project.status === 'Upcoming';

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                onClick={() => setSelectedProjectForModal(project)}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                  darkMode
                    ? 'bg-[#151518] hover:bg-[#19191d] border-[#a87f3b]/35 hover:border-[#caa050] shadow-[0_12px_36px_rgba(0,0,0,0.55)]'
                    : 'bg-white hover:bg-neutral-50/80 border-neutral-200 hover:border-[#caa050] shadow-[0_8px_25px_rgba(0,0,0,0.06)]'
                }`}
              >
                {/* Image Container with Badge */}
                <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-neutral-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

                  {/* Top-Left Status Badge (from screenshot: Running / Upcoming / Completed) */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md ${
                        isRunning
                          ? 'bg-[#caa050] text-neutral-950'
                          : isUpcoming
                          ? 'bg-sky-500 text-white'
                          : 'bg-emerald-500 text-white'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Bottom Title on Image */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <h3 className="text-lg sm:text-xl font-black text-white font-display tracking-tight drop-shadow-md">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-amber-300/90 font-medium mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#caa050] shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  {project.specs && (
                    <div
                      className={`p-2.5 rounded-xl border text-xs font-semibold leading-snug ${
                        darkMode
                          ? 'bg-neutral-900/80 border-amber-500/20 text-neutral-200'
                          : 'bg-amber-50/70 border-amber-200 text-amber-950'
                      }`}
                    >
                      {project.specs}
                    </div>
                  )}

                  <p
                    className={`text-xs sm:text-[13px] leading-relaxed line-clamp-2 ${
                      darkMode ? 'text-zinc-300' : 'text-neutral-600'
                    }`}
                  >
                    {project.description}
                  </p>

                  {/* Action Link: "View Project Details ->" */}
                  <div className="pt-2 border-t border-neutral-800/50 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#caa050] group-hover:text-[#d8af5c] transition-colors flex items-center gap-1.5">
                      <span>View Project Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
                    </span>
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                        darkMode ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {project.category.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 3. EXPLORE OUR PROJECTS (VIDEO SHOWCASE) ================= */}
      <section
        id="explore-video-section"
        className={`py-16 sm:py-20 border-y transition-colors duration-300 ${
          darkMode ? 'bg-[#151518] border-[#a87f3b]/30' : 'bg-neutral-100/70 border-neutral-200'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight">
              Explore <span className="text-[#caa050]">Our Projects</span>
            </h2>
            <div className="w-12 h-0.5 bg-[#caa050] mx-auto mt-2.5 rounded-full shadow-[0_0_8px_rgba(202,160,80,0.6)]" />
            <p
              className={`mt-3 text-xs sm:text-sm ${
                darkMode ? 'text-zinc-300' : 'text-neutral-600'
              }`}
            >
              Experience aerial drone footage, ground civil engineering progress, and live masterplan showcases.
            </p>
          </div>

          {/* Video Player Card matching the screenshot */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#caa050]/40 shadow-2xl bg-black aspect-video max-h-[560px] mx-auto group">
            {/* Scenic Aerial Video Poster / Backdrop */}
            <img
              src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2000&q=85"
              alt="Aerial Masterplan City View"
              className={`w-full h-full object-cover object-center transition-all duration-700 ${
                isPlaying ? 'brightness-100' : 'brightness-90 filter contrast-105'
              }`}
              referrerPolicy="no-referrer"
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

            {/* Top-Right Official Watermark Logo (প্রমিজ হ্যাভেন সিটি) from screenshot */}
            <div className="absolute top-4 right-5 sm:top-6 sm:right-7 z-20 flex items-center gap-2 pointer-events-none select-none">
              <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-[#caa050]/40 flex items-center gap-2 shadow-lg">
                <Building2 className="w-4 h-4 text-[#caa050]" />
                <span className="text-xs sm:text-sm font-bold text-[#caa050] tracking-wide">
                  প্রমিজ হ্যাভেন সিটি
                </span>
              </div>
            </div>

            {/* Center Big Play/Pause Button */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl active:scale-95 ${
                  isPlaying
                    ? 'bg-black/60 hover:bg-black/80 text-white border border-white/20'
                    : 'bg-[#caa050] hover:bg-[#d8af5c] text-neutral-950 shadow-[0_0_30px_rgba(202,160,80,0.6)] scale-105'
                }`}
                aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
                ) : (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-neutral-950 translate-x-0.5" />
                )}
              </button>
            </div>

            {/* Bottom Custom Player Controls Bar (as in screenshot) */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2">
              {/* Timeline Progress Bar Scrubber */}
              <div
                className="w-full h-1.5 bg-white/25 rounded-full overflow-hidden cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  setVideoProgress((clickX / rect.width) * 100);
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-[#caa050] to-amber-300 transition-all rounded-full shadow-[0_0_8px_rgba(202,160,80,0.8)]"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>

              {/* Controls & Timestamps */}
              <div className="flex items-center justify-between text-xs text-white pt-1">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-[#caa050] transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-[#caa050] transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-[#caa050]" />}
                  </button>

                  <span className="font-mono text-[11px] sm:text-xs text-zinc-300">
                    0:06 / 4:22
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-[11px] text-zinc-400 font-medium">
                    HD Masterplan 4K Drone Tour
                  </span>
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="hover:text-[#caa050] transition-colors cursor-pointer"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. TESTIMONIALS SECTION ================= */}
      <section id="testimonials-section" className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight">
            Client <span className="text-[#caa050]">Testimonials</span>
          </h2>
          <div className="w-12 h-0.5 bg-[#caa050] mx-auto mt-2.5 rounded-full shadow-[0_0_8px_rgba(202,160,80,0.6)]" />
        </div>

        {/* 2-Column Testimonial Layout matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Photo of the clients on site */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden border-2 border-[#caa050]/50 shadow-[0_15px_40px_rgba(0,0,0,0.45)] group">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                alt="Promise Assets Client Verification Site Visit"
                className="w-full h-[280px] sm:h-[340px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Verified Ribbon */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between bg-black/75 backdrop-blur-md p-3 rounded-2xl border border-white/15">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#caa050]" />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Verified Client Visit
                    </span>
                    <span className="text-[10px] text-neutral-300 block">
                      On-site inspection & sub-registry deed verification
                    </span>
                  </div>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#caa050] text-[#caa050]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Exact quote from screenshot */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Huge Golden Quotation Mark */}
            <div className="text-5xl sm:text-6xl font-serif text-[#caa050] leading-none select-none font-black">
              “
            </div>

            {/* Testimonial Quote text */}
            <p
              className={`text-base sm:text-lg leading-relaxed italic ${
                darkMode ? 'text-zinc-200' : 'text-neutral-700'
              }`}
            >
              "{currentTestimonial.quote}"
            </p>

            {/* Author Info */}
            <div className="pt-2">
              <h3 className="text-lg sm:text-xl font-bold font-display tracking-tight text-white dark:text-white">
                {currentTestimonial.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#caa050] mt-0.5">
                {currentTestimonial.designation}
              </p>
              <p className="text-[11px] text-zinc-400 mt-1">
                Property: {currentTestimonial.projectPurchased}
              </p>
            </div>

            {/* Prev & Next Round Gold Buttons matching screenshot */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                id="prev-testimonial-btn"
                onClick={handlePrevTestimonial}
                className="w-10 h-10 rounded-full bg-[#caa050] hover:bg-[#d8af5c] text-neutral-950 flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                type="button"
                id="next-testimonial-btn"
                onClick={handleNextTestimonial}
                className="w-10 h-10 rounded-full bg-[#caa050] hover:bg-[#d8af5c] text-neutral-950 flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <span className="text-xs font-mono text-zinc-400 ml-2">
                {testimonialIndex + 1} of {TESTIMONIALS_DATA.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. INSIGHTS SECTION ================= */}
      <section
        id="insights-section"
        className={`py-16 sm:py-20 border-t transition-colors duration-300 ${
          darkMode ? 'bg-[#151518] border-[#a87f3b]/25' : 'bg-neutral-50 border-neutral-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Title on Left and "View All ->" on Right */}
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight">
                Market <span className="text-[#caa050]">Insights</span>
              </h2>
              <div className="w-10 h-0.5 bg-[#caa050] mt-2 rounded-full shadow-[0_0_8px_rgba(202,160,80,0.6)]" />
            </div>

            <button
              type="button"
              onClick={() => onOpenAdvisor('Real Estate Market Analysis', 'Explore Insights')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#caa050] hover:bg-[#d8af5c] text-neutral-950 font-bold text-xs sm:text-sm tracking-wide shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* 3 Articles Grid matching screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {INSIGHTS_DATA.map((article) => (
              <div
                key={article.id}
                id={`insight-card-${article.id}`}
                onClick={() => setSelectedArticle(article)}
                className={`group rounded-2xl sm:rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                  darkMode
                    ? 'bg-[#18181c] hover:bg-[#1e1e24] border-[#a87f3b]/30 hover:border-[#caa050] shadow-lg'
                    : 'bg-white hover:bg-neutral-50/70 border-neutral-200 hover:border-[#caa050] shadow-md'
                }`}
              >
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden bg-neutral-900">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

                  {/* Top-Left Category Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-md bg-black/70 border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>

                  {/* Bottom Date & Read Time */}
                  <div className="absolute bottom-2.5 left-3.5 right-3.5 z-10 flex items-center justify-between text-[11px] text-amber-300 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <h3
                    className={`text-sm sm:text-base font-bold font-display tracking-tight leading-snug line-clamp-2 transition-colors ${
                      darkMode ? 'text-white group-hover:text-[#caa050]' : 'text-neutral-900 group-hover:text-amber-800'
                    }`}
                  >
                    {article.title}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed line-clamp-3 ${
                      darkMode ? 'text-zinc-300' : 'text-neutral-600'
                    }`}
                  >
                    {article.summary}
                  </p>

                  {/* Footer Action */}
                  <div className="pt-3 border-t border-neutral-800/40 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-zinc-400 font-mono text-[11px]">
                      <Eye className="w-3.5 h-3.5 text-[#caa050]" />
                      {article.views.toLocaleString()}
                    </span>

                    <span className="font-bold text-[#caa050] group-hover:text-[#d8af5c] inline-flex items-center gap-1 transition-colors">
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6. 4 METRIC TRUST CARDS ================= */}
      <section
        id="home-metrics-ribbon"
        className={`py-12 sm:py-14 border-y transition-colors duration-300 ${
          darkMode ? 'bg-[#101012] border-[#a87f3b]/30' : 'bg-white border-neutral-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            {/* 1. Government & RAJUK Approved */}
            <div
              className={`p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 ${
                darkMode
                  ? 'bg-neutral-900/80 border border-[#a87f3b]/35 shadow-md'
                  : 'glass-liquid-card-light hover:border-[#caa050]'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-[#caa050]/20 border border-[#caa050]/50 flex items-center justify-center text-[#caa050] mb-3 shadow-sm">
                <Landmark className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white dark:text-white">
                Government &amp; RAJUK Approved
              </h3>
              <p className="text-[11px] text-zinc-400 mt-1">
                100% legal clearances &amp; DAP compliant
              </p>
            </div>

            {/* 2. 100% Legal & Clear Title */}
            <div
              className={`p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 ${
                darkMode
                  ? 'bg-neutral-900/80 border border-[#a87f3b]/35 shadow-md'
                  : 'glass-liquid-card-light hover:border-[#caa050]'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-[#caa050]/20 border border-[#caa050]/50 flex items-center justify-center text-[#caa050] mb-3 shadow-sm">
                <ShieldCheck className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white dark:text-white">
                100% Legal &amp; Clear Title
              </h3>
              <p className="text-[11px] text-zinc-400 mt-1">
                30-year CS, SA, RS lineage mutation
              </p>
            </div>

            {/* 3. On-Time Project Handover */}
            <div
              className={`p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 ${
                darkMode
                  ? 'bg-neutral-900/80 border border-[#a87f3b]/35 shadow-md'
                  : 'glass-liquid-card-light hover:border-[#caa050]'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-[#caa050]/20 border border-[#caa050]/50 flex items-center justify-center text-[#caa050] mb-3 shadow-sm">
                <Clock className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white dark:text-white">
                On-Time Project Handover
              </h3>
              <p className="text-[11px] text-zinc-400 mt-1">
                Enforceable delay penalty guarantee
              </p>
            </div>

            {/* 4. High Return on Investment */}
            <div
              className={`p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 ${
                darkMode
                  ? 'bg-neutral-900/80 border border-[#a87f3b]/35 shadow-md'
                  : 'glass-liquid-card-light hover:border-[#caa050]'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-[#caa050]/20 border border-[#caa050]/50 flex items-center justify-center text-[#caa050] mb-3 shadow-sm">
                <TrendingUp className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white dark:text-white">
                High Return on Investment
              </h3>
              <p className="text-[11px] text-zinc-400 mt-1">
                14% to 18% forecasted capital growth
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. FOOTER ================= */}
      <footer
        id="home-site-footer"
        className={`pt-16 pb-12 transition-colors duration-300 ${
          darkMode
            ? 'bg-black text-zinc-300 border-t border-[#a87f3b]/25'
            : 'bg-neutral-900 text-neutral-300 border-t border-neutral-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
            {/* Column 1: Brand & Contact Info */}
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
                    stroke="#caa050"
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
                  <path d="M32 60 L44 48 L56 60 L44 72 Z" fill="#caa050" />
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
                  <span className="text-[10px] font-bold tracking-widest text-[#caa050] uppercase leading-none">
                    Assets Ltd.
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-neutral-200">
                Specializing in Real Estate, properties &amp; consultancy services
              </p>

              <div className="space-y-2 text-xs text-zinc-400">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#caa050] shrink-0 mt-0.5" />
                  <span>
                    Khaja Super Market, 2nd to 7th Floor, Kallyanpur Bus Stop, Mirpur Road, Dhaka-1207.
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#caa050]">✉</span>
                  <span className="text-zinc-200">info@promiseassets.com</span>
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
                    type="button"
                    onClick={() => onNavigateTab && onNavigateTab('services')}
                    className="hover:text-[#caa050] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-[#caa050]">&gt;</span> Our Services
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateTab && onNavigateTab('about')}
                    className="hover:text-[#caa050] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-[#caa050]">&gt;</span> About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateTab && onNavigateTab('contact')}
                    className="hover:text-[#caa050] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-[#caa050]">&gt;</span> Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Our Company */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white font-display">
                Our Company
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateTab && onNavigateTab('landowner')}
                    className="hover:text-[#caa050] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-[#caa050]">&gt;</span> Landowner JV Partnerships
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateTab && onNavigateTab('projects')}
                    className="hover:text-[#caa050] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-[#caa050]">&gt;</span> Property For Buy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenAdvisor('Real Estate Consultation', 'Talk to an Agent')}
                    className="hover:text-[#caa050] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-[#caa050]">&gt;</span> Our Agents
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter & Follow Us */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white font-display">
                Newsletter
              </h4>
              <p className="text-xs text-zinc-400">
                Your Weekly/Monthly Dose of Knowledge and Inspiration
              </p>

              <div className="flex items-center rounded-xl bg-neutral-900 border border-neutral-700 overflow-hidden focus-within:border-[#caa050]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 bg-transparent text-white text-xs placeholder:text-neutral-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => alert('Thank you for subscribing to Promise Assets Newsletter!')}
                  className="px-3.5 py-2.5 bg-[#caa050] hover:bg-[#d8af5c] text-neutral-950 font-bold transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Follow Us Badges matching screenshot */}
              <div className="pt-2 flex items-center gap-3">
                <span className="text-xs font-bold text-neutral-300">Follow Us:</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 rounded-lg bg-[#caa050] text-neutral-950 flex items-center justify-center font-bold text-xs hover:scale-110 transition-transform"
                    aria-label="Facebook"
                  >
                    f
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 rounded-lg bg-[#caa050] text-neutral-950 flex items-center justify-center font-bold text-xs hover:scale-110 transition-transform"
                    aria-label="LinkedIn"
                  >
                    in
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 rounded-lg bg-[#caa050] text-neutral-950 flex items-center justify-center font-bold text-xs hover:scale-110 transition-transform"
                    aria-label="YouTube"
                  >
                    ▶
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center text-xs text-neutral-500">
            <p>© 2026 Promise Assets. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ================= PROJECT DETAILS MODAL ================= */}
      <AnimatePresence>
        {selectedProjectForModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProjectForModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-2xl rounded-3xl overflow-hidden border shadow-2xl my-auto ${
                darkMode ? 'bg-[#161619] border-[#caa050]/50 text-white' : 'bg-white border-neutral-200 text-neutral-900'
              }`}
            >
              {/* Header Image */}
              <div className="relative w-full h-64 sm:h-72">
                <img
                  src={selectedProjectForModal.image}
                  alt={selectedProjectForModal.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />

                <button
                  type="button"
                  onClick={() => setSelectedProjectForModal(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-5 right-5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#caa050] text-neutral-950 text-[10px] font-bold uppercase tracking-wider">
                    {selectedProjectForModal.status}
                  </span>
                  <h3 className="text-2xl font-black text-white font-display mt-1">
                    {selectedProjectForModal.title}
                  </h3>
                  <p className="text-xs text-amber-300 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedProjectForModal.location}
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {selectedProjectForModal.specs && (
                  <div
                    className={`p-3 rounded-xl border text-xs font-semibold ${
                      darkMode ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    {selectedProjectForModal.specs}
                  </div>
                )}

                <p className={`text-sm leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-neutral-700'}`}>
                  {selectedProjectForModal.description}
                </p>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#caa050] mb-2">
                    Key Infrastructure Specifications
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedProjectForModal.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#caa050] shrink-0" />
                        <span className={darkMode ? 'text-zinc-200' : 'text-neutral-700'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex items-center justify-between gap-3 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setSelectedProjectForModal(null)}
                    className="px-5 py-2.5 rounded-xl border border-neutral-700 text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const projTitle = selectedProjectForModal.title;
                      setSelectedProjectForModal(null);
                      onOpenAdvisor(projTitle, `Book Site Visit: ${projTitle}`);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#caa050] via-[#d4ad4b] to-[#b88d3d] hover:from-[#d8af5c] hover:to-[#caa050] text-neutral-950 font-bold text-xs sm:text-sm shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 stroke-[2.5]" />
                    <span>Book Site Visit &amp; Demarcation Tour</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= INSIGHT ARTICLE READER MODAL ================= */}
      <AnimatePresence>
        {selectedArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl my-auto ${
                darkMode ? 'bg-[#161619] border-[#caa050]/50 text-white' : 'bg-white border-neutral-200 text-neutral-900'
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-[#caa050] font-semibold">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#caa050]/20 border border-[#caa050]/40">
                    {selectedArticle.category}
                  </span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight">
                  {selectedArticle.title}
                </h2>

                <div className="rounded-2xl overflow-hidden h-52 sm:h-64 my-3">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div
                  className={`text-sm leading-relaxed whitespace-pre-line space-y-3 ${
                    darkMode ? 'text-zinc-300' : 'text-neutral-700'
                  }`}
                >
                  {selectedArticle.content}
                </div>

                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedArticle(null);
                      onOpenAdvisor('Investment Advisory', 'Consult Our Advisors');
                    }}
                    className="px-5 py-2 rounded-xl bg-[#caa050] hover:bg-[#d8af5c] text-neutral-950 font-bold text-xs cursor-pointer shadow-md"
                  >
                    Consult With Property Advisor
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedArticle(null)}
                    className="text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
                  >
                    Back to Insights
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
