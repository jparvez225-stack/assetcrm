import React, { useState, useEffect } from 'react';
import {
  X,
  PhoneCall,
  User,
  Phone,
  Mail,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProjectId?: string;
  preselectedService?: string;
  modalTitle?: string;
  darkMode?: boolean;
  onSubmitInquiry?: (data: {
    referenceNumber: string;
    fullName: string;
    phone: string;
    email: string;
    topic: string;
    message: string;
  }) => void;
}

const TOPICS_OF_INTEREST = [
  'Co-Ownership Share Investment',
  'Architectural Planning & 3D Design',
  'Full Construction & Civil Engineering',
  'Land Sourcing & Feasibility Assessment',
  'Legal Vetting & Land Registry',
  'Interior & Exterior Decoration',
  'Property Handover & Management',
  'Upcoming Residential & Commercial Projects',
  'General Consultation / Office Meeting',
];

export const AdvisorModal: React.FC<AdvisorModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  modalTitle,
  darkMode = false,
  onSubmitInquiry,
}) => {
  const displayTitle =
    modalTitle || (preselectedService ? 'Book Meeting' : 'Talk to an Advisor');
  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Co-Ownership Share Investment');
  const [message, setMessage] = useState('');

  // Submission & Confirmation State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    referenceNumber: string;
    fullName: string;
    phone: string;
    email: string;
    topic: string;
    message: string;
  } | null>(null);

  // Sync preselected service whenever modal opens
  useEffect(() => {
    if (
      typeof preselectedService === 'string' &&
      preselectedService.trim() !== ''
    ) {
      setTopic(preselectedService);
    } else {
      setTopic('Co-Ownership Share Investment');
    }
  }, [preselectedService, isOpen]);

  if (!isOpen) return null;

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setCopiedRef(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    onClose();
  };

  const handleCopyReference = () => {
    if (submittedData?.referenceNumber) {
      navigator.clipboard?.writeText(submittedData.referenceNumber);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2200);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) return;

    setIsSubmitting(true);
    const ref = `PAL-${Math.floor(100000 + Math.random() * 900000)}`;

    const newInquiryData = {
      referenceNumber: ref,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      topic,
      message: message.trim(),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedData(newInquiryData);
      if (onSubmitInquiry) {
        onSubmitInquiry(newInquiryData);
      }
    }, 450);
  };

  return (
    <div
      id="advisor-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={handleResetAndClose}
    >
      <motion.div
        id="advisor-modal-card"
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[94vh] transition-all duration-300 ${
          darkMode
            ? 'bg-[#151515] border border-[#a87f3b]/40 text-white'
            : 'glass-liquid-dock-light text-slate-800 border border-white/95'
        }`}
      >
        {/* Modal Top Header */}
        <div
          className={`relative px-6 sm:px-8 py-4 sm:py-5 text-white flex items-center justify-between shrink-0 border-b ${
            darkMode
              ? 'bg-[#0a0a0a] border-[#a87f3b]/30'
              : 'bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950 border-amber-950/40 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.08 }}
              className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-sm"
            >
              <PhoneCall className="w-5 h-5" />
            </motion.div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white font-display tracking-tight">
                {displayTitle}
              </h2>
            </div>
          </div>

          <button
            id="advisor-modal-close-btn"
            type="button"
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div
          className={`overflow-y-auto p-5 sm:p-8 relative ${
            darkMode ? 'bg-[#151515]' : 'bg-white/70 backdrop-blur-md'
          }`}
        >
          <AnimatePresence mode="wait">
            {isSubmitted && submittedData ? (
              /* ================= ENHANCED & ANIMATED THANK YOU MESSAGE SCREEN ================= */
              <motion.div
                key="thank-you-view"
                id="advisor-thank-you-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="py-2 sm:py-4 space-y-6 text-center"
              >
                {/* Celebration Animated Success Badge */}
                <div className="relative inline-flex items-center justify-center mx-auto mt-2">
                  {/* Outer Concentric Animated Pulse Rings */}
                  <div className="absolute -inset-3 rounded-full bg-emerald-400/25 animate-ping opacity-60 pointer-events-none" />
                  <div className="absolute -inset-1 rounded-full bg-emerald-500/20 animate-pulse pointer-events-none" />

                  {/* Floating Gold & Emerald Sparkles */}
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="absolute -top-3 -right-3 text-amber-400 drop-shadow-sm"
                  >
                    <Sparkles className="w-6 h-6 fill-amber-300" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: [0, -20, 20, 0], scale: [0.9, 1.1, 0.9] }}
                    transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute -bottom-1 -left-3 text-emerald-500 drop-shadow-sm"
                  >
                    <Sparkles className="w-5 h-5 fill-emerald-300" />
                  </motion.div>

                  {/* Main Spring Checkmark Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -25 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                    className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-emerald-100 via-emerald-50 to-teal-50 border-4 border-emerald-400/60 shadow-lg shadow-emerald-500/20 flex items-center justify-center text-emerald-600"
                  >
                    <CheckCircle2 className="w-11 h-11 sm:w-12 sm:h-12 text-emerald-600" />
                  </motion.div>
                </div>

                {/* Heading & Confirmation Note */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="space-y-2 max-w-lg mx-auto"
                >
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                    Thank You, {submittedData.fullName}!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                    Your consultation request has been successfully registered. Our senior advisory representative will contact you shortly.
                  </p>

                  {/* Interactive Reference Pill with Copy Button */}
                  <div className="pt-1 flex items-center justify-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Reference Code:
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyReference}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-mono font-bold text-xs border border-slate-300 shadow-sm transition-all cursor-pointer active:scale-95 group"
                      title="Click to copy reference code"
                    >
                      <span>{submittedData.referenceNumber}</span>
                      {copiedRef ? (
                        <span className="inline-flex items-center text-emerald-600 text-[10px] font-bold">
                          <Check className="w-3 h-3 ml-0.5" /> Copied!
                        </span>
                      ) : (
                        <Copy className="w-3 h-3 text-slate-500 group-hover:text-slate-800 transition-colors" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Inquiry Summary Ticket Card */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.35 }}
                  className="text-left bg-gradient-to-b from-slate-50 via-slate-50/70 to-slate-100/60 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3 max-w-md mx-auto text-xs text-slate-700 shadow-sm"
                >
                  {/* Topic of Interest */}
                  <div className="flex items-start justify-between border-b border-slate-200 pb-2.5 gap-2">
                    <span className="text-slate-500 font-medium text-[11px] sm:text-xs shrink-0">
                      Topic of Interest:
                    </span>
                    <span className="font-bold text-slate-900 text-right text-[11px] sm:text-xs">
                      {submittedData.topic}
                    </span>
                  </div>

                  {/* Contact Number */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 gap-2">
                    <span className="text-slate-500 font-medium text-[11px] sm:text-xs shrink-0">
                      Contact Number:
                    </span>
                    <span className="font-bold text-slate-900 font-mono text-[11px] sm:text-xs">
                      {submittedData.phone}
                    </span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 gap-2">
                    <span className="text-slate-500 font-medium text-[11px] sm:text-xs shrink-0">
                      Email:
                    </span>
                    <span className="font-bold text-slate-900 text-right truncate text-[11px] sm:text-xs">
                      {submittedData.email}
                    </span>
                  </div>

                  {/* Specific Message (if provided) */}
                  {submittedData.message && (
                    <div className="pt-0.5">
                      <span className="text-slate-500 font-medium block mb-1 text-[11px]">
                        Your Note / Message:
                      </span>
                      <p className="text-slate-800 italic bg-white p-2.5 rounded-lg border border-slate-200 text-[11px] leading-relaxed">
                        "{submittedData.message}"
                      </p>
                    </div>
                  )}

                  {/* Verified & Confidential Badge */}
                  <div className="pt-1 flex items-center justify-between text-[11px] text-emerald-800 font-medium">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Confidential &amp; verified real estate consultation</span>
                    </div>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </div>
                </motion.div>

                {/* Bottom Action: Close */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className="pt-2 flex items-center justify-center max-w-md mx-auto"
                >
                  <button
                    type="button"
                    id="thank-you-close-btn"
                    onClick={handleResetAndClose}
                    className="min-w-[140px] px-8 py-2.5 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              /* ================= SIMPLE FORM (SCREENSHOT LAYOUT) ================= */
              <motion.form
                key="inquiry-form"
                id="advisor-simple-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleFormSubmit}
                className="space-y-4 sm:space-y-5"
              >
                {/* Row 1: Full Name & Phone or WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="input-full-name"
                      className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      FULL NAME <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <input
                        type="text"
                        id="input-full-name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Dr. Rafiqul Islam"
                        className="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-md bg-[#f8fafc] border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 text-xs sm:text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone or WhatsApp */}
                  <div>
                    <label
                      htmlFor="input-phone"
                      className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      PHONE OR WHATSAPP <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <input
                        type="tel"
                        id="input-phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-md bg-[#f8fafc] border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 text-xs sm:text-sm transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Email Address & Topic of Interest */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="input-email"
                      className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      EMAIL ADDRESS <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <input
                        type="email"
                        id="input-email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="investor@example.com"
                        className="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-md bg-[#f8fafc] border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 text-xs sm:text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Topic of Interest */}
                  <div>
                    <label
                      htmlFor="input-topic"
                      className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      TOPIC OF INTEREST
                    </label>
                    <div className="relative">
                      <select
                        id="input-topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-4 py-2.5 sm:py-3 rounded-md bg-[#f8fafc] border border-slate-300 text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 text-xs sm:text-sm appearance-none cursor-pointer pr-10 transition-colors"
                      >
                        {TOPICS_OF_INTEREST.map((item) => (
                          <option key={item} value={item} className="text-slate-900 bg-white">
                            {item}
                          </option>
                        ))}
                        {typeof preselectedService === 'string' &&
                          preselectedService.trim() !== '' &&
                          !TOPICS_OF_INTEREST.includes(preselectedService) && (
                            <option
                              value={preselectedService}
                              className="text-slate-900 bg-white"
                            >
                              {preselectedService}
                            </option>
                          )}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-600">
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3: Specific Questions / Message (Optional) */}
                <div>
                  <label
                    htmlFor="input-message"
                    className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    SPECIFIC QUESTIONS / MESSAGE (OPTIONAL)
                  </label>
                  <textarea
                    id="input-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write any specific inquiries, preferred package, or best call time..."
                    className="w-full px-4 py-2.5 sm:py-3 rounded-md bg-[#f8fafc] border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 text-xs sm:text-sm resize-none transition-colors"
                  />
                </div>

                {/* Row 4: Action Buttons (Cancel & Submit Inquiry) */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    id="advisor-cancel-btn"
                    onClick={handleResetAndClose}
                    className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-md border border-slate-300 bg-[#f8fafc] hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <motion.button
                    type="submit"
                    id="advisor-submit-btn"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-md bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT INQUIRY'}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
