import React, { useState } from 'react';
import { X, CheckCircle, Send, Building, ShieldCheck, TrendingUp, Mail } from 'lucide-react';

interface InfoModalProps {
  darkMode?: boolean;
  section: string | null;
  onClose: () => void;
  onInquirySubmitted?: (data: { name: string; email: string; message: string; section: string }) => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ 
  darkMode = true, 
  section, 
  onClose,
  onInquirySubmitted 
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  if (!section || section === 'home') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (onInquirySubmitted) {
      onInquirySubmitted({
        name: contactName.trim(),
        email: contactEmail.trim(),
        message: contactMessage.trim(),
        section,
      });
    }
    setTimeout(() => {
      setFormSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      onClose();
    }, 2200);
  };

  return (
    <div
      id="info-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="info-modal-card"
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 sm:p-8 shadow-2xl transition-all duration-300 ${
          darkMode
            ? 'bg-neutral-900 border border-neutral-800 text-white'
            : 'glass-liquid-dock-light border border-white/95 text-neutral-900'
        }`}
      >
        {/* Close Button */}
        <button
          id="modal-close-btn"
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-lg transition-colors cursor-pointer ${
            darkMode
              ? 'bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white'
              : 'bg-white/80 hover:bg-white text-neutral-600 hover:text-neutral-900 border border-white/90 shadow-xs'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dynamic Modal Content by Section */}
        {section === 'about' && (
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#caa050]">About Us</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold font-display ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              Promise Assets Ltd.
            </h2>
            <p className={`leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
              Promise Assets Ltd. is an elite luxury resort and hospitality development firm. We specialize in acquiring premier coastal and scenic lands to build high-yield, world-class resort communities, private luxury villas, and exclusive eco-retreats.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className={`p-4 rounded-xl border ${darkMode ? 'bg-neutral-800/60 border-white/5' : 'glass-liquid-card-light'}`}>
                <Building className="w-6 h-6 text-[#caa050] mb-2" />
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>Architectural Mastery</h3>
                <p className={`text-xs mt-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Harmonizing cutting-edge design with pristine natural environments.</p>
              </div>
              <div className={`p-4 rounded-xl border ${darkMode ? 'bg-neutral-800/60 border-white/5' : 'glass-liquid-card-light'}`}>
                <TrendingUp className="w-6 h-6 text-[#caa050] mb-2" />
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>Proven ROI</h3>
                <p className={`text-xs mt-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Delivering consistent, market-leading returns for institutional partners.</p>
              </div>
            </div>
          </div>
        )}

        {section === 'projects' && (
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#caa050]">Development Portfolio</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold font-display ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              Featured Destinations
            </h2>
            <div className="space-y-3 pt-2">
              <div className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 ${
                darkMode ? 'bg-neutral-800/80 border-neutral-700/50' : 'glass-liquid-card-light'
              }`}>
                <div>
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-amber-300' : 'text-neutral-900'}`}>Azure Lagoon Residences</h3>
                  <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>54 Ultra-luxury overwater and beachfront pool villas</p>
                </div>
                <span className="px-3 py-1 bg-amber-400/20 text-[#caa050] text-xs font-bold rounded-full">Active Phase 2</span>
              </div>
              <div className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 ${
                darkMode ? 'bg-neutral-800/80 border-neutral-700/50' : 'glass-liquid-card-light'
              }`}>
                <div>
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-amber-300' : 'text-neutral-900'}`}>Solstice Cove & Spa</h3>
                  <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Mediterranean wellness resort & private marina</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full">Completed</span>
              </div>
            </div>
          </div>
        )}

        {section === 'landowner' && (
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#caa050]">Land Partnerships</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold font-display ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              Unlock Your Land's True Potential
            </h2>
            <p className={`leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
              We partner directly with prime beachfront, scenic hill, and island landowners via joint ventures, development leases, or outright strategic acquisitions.
            </p>
            <div className={`p-4 rounded-xl border space-y-2 ${
              darkMode ? 'bg-amber-500/10 border-amber-500/20 text-neutral-200' : 'glass-liquid-card-light border-amber-300/40 text-neutral-800'
            }`}>
              <div className="flex items-center gap-2 text-[#caa050] font-semibold">
                <ShieldCheck className="w-5 h-5" />
                <span>Transparent Joint Venture Agreements</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                Guaranteed security, legal compliance, and structured revenue share models with international hospitality management.
              </p>
            </div>
          </div>
        )}

        {section === 'services' && (
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#caa050]">Core Services</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold font-display ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              End-to-End Resort Development
            </h2>
            <ul className={`space-y-2.5 text-sm ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#caa050] mt-1 shrink-0" />
                <span>Site Feasibility Studies & Topographical Master Planning</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#caa050] mt-1 shrink-0" />
                <span>Architecture, Engineering & Sustainable Construction</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#caa050] mt-1 shrink-0" />
                <span>Hospitality Brand Licensing & Operational Management</span>
              </li>
            </ul>
          </div>
        )}

        {section === 'contact' && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#caa050]">Get In Touch</span>
              <h2 className={`text-2xl sm:text-3xl font-extrabold font-display ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                Connect With Our Team
              </h2>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>Inquiry Received</h3>
                <p className={`text-sm ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  Our executive development director will contact you promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-[#caa050] ${
                      darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="eleanor@domain.com"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-[#caa050] ${
                      darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Message or Project Query
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell us about your land, partnership proposal, or inquiry..."
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-[#caa050] ${
                      darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                    }`}
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className={`text-xs flex items-center gap-1.5 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    <Mail className="w-3.5 h-3.5 text-[#caa050]" />
                    <span>inquiries@promiseassets.com</span>
                  </div>
                  <button
                    type="submit"
                    id="submit-inquiry-btn"
                    className="px-6 py-2.5 rounded-lg bg-[#caa050] hover:bg-[#d8af5c] text-neutral-950 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
