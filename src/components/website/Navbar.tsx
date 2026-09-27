import React, { useState } from 'react';
import { Moon, Sun, Menu, X, PhoneCall, LogIn } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  activeNav: string;
  onSelectNav: (nav: string) => void;
  onOpenAdvisor?: () => void;
  onBackToAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleTheme,
  activeNav,
  onSelectNav,
  onOpenAdvisor,
  onBackToAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Landowner', id: 'landowner' },
    { label: 'Services', id: 'services' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-md border-b ${
        darkMode
          ? 'bg-[#141416]/95 border-[#a87f3b]/30 text-white'
          : 'bg-white/95 border-neutral-200 text-neutral-900 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div
            id="brand-logo"
            onClick={() => onSelectNav('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 shrink-0">
              <svg
                viewBox="0 0 100 80"
                className="w-11 h-9 sm:w-12 sm:h-10 transition-transform duration-300 group-hover:scale-105"
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
                  stroke={darkMode ? '#ffffff' : '#171717'}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M32 60 L44 48 L56 60 L44 72 Z" fill="#caa050" />
                <path
                  d="M48 60 L60 48 L72 60 L60 72 Z"
                  stroke={darkMode ? '#ffffff' : '#171717'}
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M38 65 L48 55 L58 65"
                  stroke={darkMode ? '#ffffff' : '#171717'}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex flex-col justify-center">
              <span
                className={`text-lg sm:text-xl font-black tracking-tight font-display leading-none flex items-center gap-1 ${
                  darkMode ? 'text-white' : 'text-neutral-950'
                }`}
              >
                Promise
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase leading-none mt-1 text-[#caa050]">
                Assets Ltd.
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = activeNav === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => onSelectNav(link.id)}
                  className={`text-[13.5px] font-semibold tracking-wide transition-all duration-200 relative py-2 cursor-pointer ${
                    isActive
                      ? 'text-[#caa050] font-bold'
                      : darkMode
                      ? 'text-neutral-200 hover:text-white'
                      : 'text-neutral-700 hover:text-neutral-950'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#caa050] rounded-full shadow-[0_0_8px_rgba(202,160,80,0.6)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Talk To Advisor + Theme Toggle + Login (All uniform 40px height) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Header "(Talk To an Advisor)" CTA Button */}
            {onOpenAdvisor && (
              <button
                id="header-advisor-cta-btn"
                type="button"
                onClick={() => onOpenAdvisor()}
                className="hidden sm:inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-gradient-to-r from-[#caa050] via-[#d4ad4b] to-[#b88d3d] hover:from-[#d8af5c] hover:to-[#caa050] text-neutral-950 font-bold text-xs sm:text-[13px] tracking-wide shadow-sm hover:shadow-[0_0_16px_rgba(202,160,80,0.4)] active:scale-95 transition-all cursor-pointer shrink-0"
              >
                <PhoneCall className="w-4 h-4 stroke-[2.2]" />
                <span>Talk To an Advisor</span>
              </button>
            )}

            {/* Black & White 2-Mode Switcher Button (Uniform 40px x 40px) */}
            <button
              type="button"
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label="Toggle Black/White mode"
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 border shrink-0 ${
                darkMode
                  ? 'bg-neutral-900 hover:bg-neutral-800 text-[#caa050] border-amber-500/35 hover:border-amber-400 hover:shadow-[0_0_12px_rgba(202,160,80,0.35)]'
                  : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200 shadow-2xs'
              }`}
              title={darkMode ? 'Switch to White Mode' : 'Switch to Black Mode'}
            >
              {darkMode ? (
                <Moon className="w-4.5 h-4.5 text-[#caa050] fill-[#caa050]/20" />
              ) : (
                <Sun className="w-4.5 h-4.5 text-amber-600 fill-amber-500/20" />
              )}
            </button>

            {/* Login Button (Uniform 40px height, positioned at the far right) */}
            {onBackToAdmin && (
              <button
                type="button"
                id="header-login-btn"
                onClick={onBackToAdmin}
                className={`inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-xs sm:text-[13px] font-bold border transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 ${
                  darkMode
                    ? 'bg-neutral-900 hover:bg-neutral-800 text-white border-white/15 hover:border-[#caa050]/60'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-900 shadow-sm'
                }`}
                title="Admin / Staff Login"
              >
                <LogIn className="w-4 h-4 text-[#caa050] stroke-[2.2]" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Menu Button (Uniform 40px x 40px) */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer border shrink-0 ${
                darkMode
                  ? 'bg-neutral-900 text-neutral-300 hover:text-white border-white/10 hover:border-white/20'
                  : 'bg-neutral-50 text-neutral-700 hover:text-neutral-950 border-neutral-200'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className={`lg:hidden border-b px-4 pt-2 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200 ${
            darkMode
              ? 'bg-[#181818] border-[#a87f3b]/30 text-white'
              : 'bg-white border-neutral-200 text-neutral-900'
          }`}
        >
          {navLinks.map((link) => {
            const isActive = activeNav === link.id;
            return (
              <button
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                onClick={() => {
                  onSelectNav(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#caa050]/15 text-[#caa050] font-semibold border-l-4 border-[#caa050]'
                    : darkMode
                    ? 'text-neutral-300 hover:bg-white/5 hover:text-white'
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {onBackToAdmin && (
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBackToAdmin();
                }}
                className="w-full py-3 rounded-xl bg-neutral-900 text-amber-300 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer border border-amber-500/30"
              >
                <LogIn className="w-4 h-4 text-[#caa050]" />
                <span>Admin Login</span>
              </button>
            </div>
          )}

          {onOpenAdvisor && (
            <div className="pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdvisor();
                }}
                className="w-full py-3 rounded-xl bg-amber-500 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Talk To an Advisor</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
