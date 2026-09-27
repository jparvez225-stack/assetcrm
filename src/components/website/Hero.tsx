import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onExploreProjects?: () => void;
  onOpenContact?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onOpenContact }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const resortSlides = [
    {
      id: 'crown-grandeur',
      title: 'Crown Grandeur Residences',
      location: 'Gulshan 2, Diplomatic Zone, Dhaka',
      imageUrl:
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=85',
      alt: 'Luxury high-rise residential condominium tower with illuminated balconies',
    },
    {
      id: 'imperial-pavilion',
      title: 'The Imperial Pavilion Estate',
      location: 'Bashundhara R/A, Block I, Dhaka',
      imageUrl:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85',
      alt: 'Architectural luxury modern private duplex estate and residences',
    },
    {
      id: 'landmark-tower',
      title: 'Promise Landmark City Center',
      location: 'Tejgaon Commercial District, Dhaka',
      imageUrl:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85',
      alt: 'Iconic modern glass skyscraper and commercial masterplan center',
    },
  ];

  const currentResort = resortSlides[activeSlide];

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        // Fallback if blocked in iframe
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

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950 select-none"
    >
      {/* Background Image with Smooth Crossfade */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentResort.id}
            initial={{ opacity: 0.8, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentResort.imageUrl}
              alt={currentResort.alt}
              className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Darkened Gradient Overlay matching reference screenshot */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />
      </div>

      {/* Top Right Fullscreen Toggle Button (as in screenshot) */}
      <div className="absolute top-24 sm:top-28 right-6 sm:right-10 z-20">
        <button
          id="hero-fullscreen-toggle"
          onClick={toggleFullscreen}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 active:scale-95 text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-all duration-200 hover:border-white/40 group cursor-pointer"
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

      {/* Main Centered Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center py-20 mt-10 sm:mt-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Main Headline - Exact Typography and layout from user reference */}
          <h1
            id="hero-main-title"
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-tight leading-[1.12] hero-text-shadow font-display max-w-5xl"
          >
            We Offer Premium Escapes
            <br className="hidden sm:block" />
            {' '}Through Luxury Resort
            <br className="hidden sm:block" />
            {' '}Development
          </h1>

          {/* Subtitle / Value proposition note */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl font-normal leading-relaxed hero-subtle-shadow"
          >
            Transforming prime scenic locations into world-class hospitality destinations with unparalleled architectural elegance and bespoke living.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              id="hero-explore-btn"
              onClick={onExploreProjects}
              className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-base transition-all duration-200 shadow-xl hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Portfolio</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              id="hero-contact-btn"
              onClick={onOpenContact}
              className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base backdrop-blur-md border border-white/25 transition-all duration-200 hover:border-white/50 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Partner With Us</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Floating Bar with Slide Switchers & Current Resort Tag */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-20 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Resort Location Tag */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs sm:text-sm text-neutral-200">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-white">{currentResort.title}</span>
          <span className="text-neutral-400">• {currentResort.location}</span>
        </div>

        {/* Gallery Slide Selectors */}
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
          {resortSlides.map((slide, idx) => (
            <button
              key={slide.id}
              id={`slide-selector-${idx}`}
              onClick={() => setActiveSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === idx
                  ? 'w-8 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                  : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`View resort slide ${idx + 1}: ${slide.title}`}
              title={slide.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
