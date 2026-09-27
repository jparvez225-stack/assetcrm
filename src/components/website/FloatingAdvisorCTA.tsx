import React from 'react';
import { PhoneCall, Sparkles } from 'lucide-react';

interface FloatingAdvisorCTAProps {
  onOpen: () => void;
}

export const FloatingAdvisorCTA: React.FC<FloatingAdvisorCTAProps> = ({ onOpen }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        id="floating-advisor-cta-button"
        onClick={onOpen}
        className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-neutral-950 font-black text-sm shadow-[0_10px_25px_rgba(245,158,11,0.45)] hover:shadow-[0_15px_35px_rgba(245,158,11,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Talk To an Advisor"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-950 opacity-40" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-neutral-950" />
        </span>

        <PhoneCall className="w-4 h-4" />
        <span className="tracking-wide">Talk To an Advisor</span>

        <span className="w-6 h-6 rounded-full bg-neutral-950/15 flex items-center justify-center text-xs">
          <Sparkles className="w-3.5 h-3.5" />
        </span>
      </button>
    </div>
  );
};
