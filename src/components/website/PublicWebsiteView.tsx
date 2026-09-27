import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { HomePage } from './HomePage';
import { ServicesPage } from './ServicesPage';
import { AdvisorModal } from './AdvisorModal';
import { InfoModal } from './InfoModal';
import { FloatingAdvisorCTA } from './FloatingAdvisorCTA';
import { LayoutDashboard, ArrowLeft } from 'lucide-react';

interface PublicWebsiteViewProps {
  onBackToAdmin: () => void;
  onNewWebsiteLead?: (leadData: {
    fullName: string;
    phone: string;
    email: string;
    topic: string;
    message: string;
    referenceCode?: string;
  }) => void;
}

export const PublicWebsiteView: React.FC<PublicWebsiteViewProps> = ({
  onBackToAdmin,
  onNewWebsiteLead,
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeNav, setActiveNav] = useState<string>('home');
  const [isAdvisorOpen, setIsAdvisorOpen] = useState<boolean>(false);
  const [advisorTopic, setAdvisorTopic] = useState<string>('Co-Ownership Share Investment');
  const [advisorModalTitle, setAdvisorModalTitle] = useState<string>('Talk to an Advisor');
  const [infoModalSection, setInfoModalSection] = useState<string | null>(null);

  const handleToggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const handleSelectNav = (nav: string) => {
    setActiveNav(nav);
    if (nav === 'home' || nav === 'services') {
      setInfoModalSection(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setInfoModalSection(nav);
    }
  };

  const handleOpenAdvisor = (topic?: string, customTitle?: string) => {
    if (topic) setAdvisorTopic(topic);
    if (customTitle) setAdvisorModalTitle(customTitle);
    setIsAdvisorOpen(true);
  };

  const handleAdvisorInquirySubmitted = (data: {
    referenceNumber: string;
    fullName: string;
    phone: string;
    email: string;
    topic: string;
    message: string;
  }) => {
    if (onNewWebsiteLead) {
      onNewWebsiteLead({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        topic: data.topic,
        message: data.message,
        referenceCode: data.referenceNumber,
      });
    }
  };

  const handleInfoModalInquirySubmitted = (data: {
    name: string;
    email: string;
    message: string;
    section: string;
  }) => {
    if (onNewWebsiteLead) {
      onNewWebsiteLead({
        fullName: data.name,
        phone: 'Not provided',
        email: data.email,
        topic: `Website Query: ${data.section.toUpperCase()}`,
        message: data.message,
      });
    }
  };

  return (
    <div
      id="public-website-container"
      className={`min-h-screen w-full relative transition-colors duration-300 font-sans ${
        darkMode ? 'bg-[#0f0f11] text-white' : 'bg-[#fafafa] text-neutral-900'
      }`}
    >
      {/* Website Navigation Header */}
      <Navbar
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        onOpenAdvisor={() => handleOpenAdvisor()}
        onBackToAdmin={onBackToAdmin}
      />

      {/* Main Website Content */}
      <main className="w-full">
        {activeNav === 'home' && (
          <HomePage
            darkMode={darkMode}
            onOpenAdvisor={handleOpenAdvisor}
            onNavigateTab={handleSelectNav}
          />
        )}

        {activeNav === 'services' && (
          <ServicesPage
            darkMode={darkMode}
            onOpenAdvisor={handleOpenAdvisor}
            onNavigateTab={handleSelectNav}
          />
        )}

        {/* If user navigated directly to another section tab */}
        {activeNav !== 'home' && activeNav !== 'services' && (
          <div className="pt-24 min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-3xl font-extrabold font-display capitalize mb-3 text-[#caa050]">
              {activeNav} Section
            </h2>
            <p className="max-w-md text-sm text-neutral-400 mb-6">
              You are currently viewing the {activeNav} portfolio. Click below to inspect details or return to the main showcase.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setInfoModalSection(activeNav)}
                className="px-5 py-2.5 rounded-xl bg-[#caa050] text-neutral-950 font-bold text-sm cursor-pointer shadow-md"
              >
                Open {activeNav} Details
              </button>
              <button
                type="button"
                onClick={() => setActiveNav('home')}
                className="px-5 py-2.5 rounded-xl bg-neutral-800 text-white font-semibold text-sm cursor-pointer border border-white/20"
              >
                Back to Home Showcase
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Talk to Advisor CTA Button */}
      <FloatingAdvisorCTA onOpen={() => handleOpenAdvisor()} />

      {/* Interactive Advisor Consultation Modal */}
      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        preselectedService={advisorTopic}
        modalTitle={advisorModalTitle}
        darkMode={darkMode}
        onSubmitInquiry={handleAdvisorInquirySubmitted}
      />

      {/* Dedicated Info Modal for About, Projects, Landowner, Services, Contact */}
      <InfoModal
        darkMode={darkMode}
        section={infoModalSection}
        onClose={() => setInfoModalSection(null)}
        onInquirySubmitted={handleInfoModalInquirySubmitted}
      />
    </div>
  );
};
