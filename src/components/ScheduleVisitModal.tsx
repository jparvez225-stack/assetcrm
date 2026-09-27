import React, { useState } from 'react';
import { Lead, AccompanyingGuest } from '../types';
import { 
  Calendar, 
  Users, 
  X, 
  Check, 
  Building, 
  Phone, 
  Plus, 
  Trash2,
  User,
  Mail,
  Briefcase,
  MapPin,
  Lock,
  UserCheck
} from 'lucide-react';

interface ScheduleVisitModalProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (visitData: {
    leadId: string;
    clientName?: string;
    clientPhone?: string;
    clientEmail?: string;
    assignedSalesman?: string;
    preferredVisitDate: string;
    preferredVisitTime: string;
    pickupLocation: string;
    guestCount: number;
    notes: string;
    targetProject?: string;
    unitSpec?: string;
    guests?: AccompanyingGuest[];
  }) => void;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  lead,
  isOpen,
  onClose,
  onSubmit
}) => {
  // Today & Tomorrow date calculation (YYYY-MM-DD)
  const todayObj = new Date();
  const todayStr = todayObj.toISOString().split('T')[0];
  
  const tomorrowObj = new Date();
  tomorrowObj.setDate(tomorrowObj.getDate() + 1);
  const tomorrowStr = tomorrowObj.toISOString().split('T')[0];

  // 2. SCHEDULE & PROJECT state
  const [visitDate, setVisitDate] = useState<string>(lead.preferredVisitDate || todayStr);
  const [departureTime, setDepartureTime] = useState<string>('10:00 AM (Standard Slot)');
  const [targetProject, setTargetProject] = useState<string>(lead.projectName || 'Purbachal Green Valley Project');
  const [unitSpec, setUnitSpec] = useState<string>(
    lead.requiredPlotSize 
      ? `${lead.requiredPlotSize}${lead.facingPreference ? ` • ${lead.facingPreference}` : ''}`
      : '5 Katha • South Facing'
  );
  const [pickupType, setPickupType] = useState<'hq' | 'custom'>('hq');
  const [customPickupAddress, setCustomPickupAddress] = useState<string>(
    lead.address || 'House 24, Road 11, Banani, Dhaka'
  );

  // 3. ACCOMPANYING GUESTS state
  const [guests, setGuests] = useState<AccompanyingGuest[]>([
    {
      id: 'guest-1',
      name: '',
      phone: '',
      address: ''
    }
  ]);

  if (!isOpen) return null;

  const handleAddGuest = () => {
    setGuests(prev => [
      ...prev,
      {
        id: `guest-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: '',
        phone: '',
        address: ''
      }
    ]);
  };

  const handleUpdateGuest = (id: string, field: keyof AccompanyingGuest, value: string) => {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const handleRemoveGuest = (id: string) => {
    setGuests(prev => prev.filter(g => g.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitDate) {
      alert('Please select a visit date.');
      return;
    }

    const actualPickup = pickupType === 'hq'
      ? 'Banani Corporate Office / Promise HQ'
      : (customPickupAddress.trim() || 'Custom Address');

    const guestDetailsText = guests
      .filter(g => g.name.trim())
      .map((g, i) => `Guest ${i + 1}: ${g.name.trim()}${g.phone.trim() ? ` (${g.phone.trim()})` : ''}`)
      .join('; ');

    const compiledNotes = `Project: ${targetProject}. Unit: ${unitSpec}. Pickup: ${actualPickup}${guestDetailsText ? ` | ${guestDetailsText}` : ''}`;

    onSubmit({
      leadId: lead.id,
      clientName: lead.name,
      clientPhone: lead.phone,
      clientEmail: lead.email,
      assignedSalesman: lead.assignedSalesman || 'Sales Team',
      preferredVisitDate: visitDate,
      preferredVisitTime: departureTime,
      pickupLocation: actualPickup,
      guestCount: 1 + guests.length,
      notes: compiledNotes,
      targetProject: targetProject,
      unitSpec: unitSpec,
      guests: guests
    });

    onClose();
  };

  const totalPassengers = 1 + guests.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 md:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        id="schedule-visit-modal-container"
        className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl border border-gray-200 flex flex-col max-h-[96vh] overflow-hidden"
      >
        {/* Modal Top Header */}
        <div className="px-5 py-2.5 border-b border-gray-200 flex items-center justify-between bg-gray-50/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs shrink-0"
              style={{ backgroundColor: '#c7a259' }}
            >
              <Calendar size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-sm sm:text-base text-gray-900 leading-tight">
                  Schedule Site Visit
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wider">
                  Lead Booking
                </span>
                <span className="text-[11px] font-mono text-gray-400">
                  #{lead.id}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                Review verified client details, schedule visit slot, and register accompanying guests
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-xl hover:bg-gray-200/70 transition-colors cursor-pointer"
            title="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto no-scrollbar p-3 sm:p-3.5 md:p-4 space-y-2.5 sm:space-y-3 text-xs">
            
            {/* 1. LEAD INFORMATION (Non-editable / Read-only) */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-amber-100/70 border border-amber-300/80 flex items-center justify-center text-amber-800">
                    <User size={12} className="stroke-[2.4]" />
                  </div>
                  <h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">
                    1. LEAD INFORMATION
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[9.5px] font-semibold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    <Lock size={9} className="text-slate-400" />
                    Read-Only
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-gray-700 font-medium shadow-2xs">
                    Priority: <strong className="text-amber-700 font-bold">{lead.priority || 'High'}</strong>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-gray-700 font-medium shadow-2xs">
                    Source: <strong className="text-gray-900 font-bold">{lead.source || 'Digital Campaign'}</strong>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-gray-700 font-medium shadow-2xs">
                    Status: <strong className="text-purple-700 font-bold">{lead.status}</strong>
                  </span>
                </div>
              </div>

              {/* Read-Only Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
                {/* Client / Lead Name */}
                <div className="p-2 sm:p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="block text-[9.5px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    Client / Lead Name
                  </span>
                  <div className="flex items-center gap-1.5">
                    <User size={13} className="text-amber-600 shrink-0" />
                    <span className="text-xs font-bold text-gray-900 truncate" title={lead.name}>
                      {lead.name}
                    </span>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="p-2 sm:p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="block text-[9.5px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    Phone Number
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Phone size={13} className="text-amber-600 shrink-0" />
                    <span className="text-xs font-bold text-gray-900 font-mono">
                      {lead.phone}
                    </span>
                  </div>
                </div>

                {/* Email Address */}
                <div className="p-2 sm:p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="block text-[9.5px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    Email Address
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Mail size={13} className="text-amber-600 shrink-0" />
                    <span className="text-xs font-medium text-gray-800 truncate" title={lead.email || 'N/A'}>
                      {lead.email || 'Not Provided'}
                    </span>
                  </div>
                </div>

                {/* Profession / Organization */}
                <div className="p-2 sm:p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="block text-[9.5px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    Profession / Organization
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={13} className="text-amber-600 shrink-0" />
                    <span className="text-xs font-semibold text-gray-800 truncate">
                      {lead.profession || lead.organization || 'Corporate Executive'}
                    </span>
                  </div>
                </div>

                {/* Assigned Sales Officer */}
                <div className="p-2 sm:p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="block text-[9.5px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    Assigned Sales Officer
                  </span>
                  <div className="flex items-center gap-1.5">
                    <UserCheck size={13} className="text-amber-600 shrink-0" />
                    <span className="text-xs font-bold text-gray-900 truncate">
                      {lead.assignedSalesman || 'Sales Team'}
                    </span>
                  </div>
                </div>

                {/* Present Address */}
                <div className="p-2 sm:p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="block text-[9.5px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    Present Address
                  </span>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-amber-600 shrink-0" />
                    <span className="text-xs font-medium text-gray-800 truncate" title={lead.address || 'House 24, Road 11, Banani, Dhaka'}>
                      {lead.address || 'House 24, Road 11, Banani, Dhaka'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. SCHEDULE & PROJECT */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Calendar size={13} className="stroke-[2.2]" />
                </div>
                <h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">
                  2. SCHEDULE & PROJECT
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
                {/* Visit Date */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Visit Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="date"
                      required
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full min-w-0 px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-gray-800 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setVisitDate(todayStr)}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        visitDate === todayStr 
                          ? 'bg-amber-500 text-white border-amber-500 shadow-2xs font-bold' 
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      onClick={() => setVisitDate(tomorrowStr)}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        visitDate === tomorrowStr 
                          ? 'bg-amber-500 text-white border-amber-500 shadow-2xs font-bold' 
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Tomorrow
                    </button>
                  </div>
                </div>

                {/* Departure Time */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Departure Time <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-gray-800 font-medium cursor-pointer"
                  >
                    <option value="10:00 AM (Standard Slot)">10:00 AM (Standard Slot)</option>
                    <option value="09:30 AM (Morning Slot)">09:30 AM (Morning Slot)</option>
                    <option value="11:30 AM (Pre-Noon Slot)">11:30 AM (Pre-Noon Slot)</option>
                    <option value="02:00 PM (Afternoon Slot)">02:00 PM (Afternoon Slot)</option>
                    <option value="03:30 PM (Evening Slot)">03:30 PM (Evening Slot)</option>
                    <option value="05:00 PM (Late Slot)">05:00 PM (Late Slot)</option>
                  </select>
                </div>

                {/* Target Project */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Target Project <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={targetProject}
                    onChange={(e) => setTargetProject(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-gray-800 font-medium cursor-pointer"
                  >
                    <option value="Purbachal Green Valley Project">Purbachal Green Valley Project</option>
                    <option value="Promise Crown Sovereign">Promise Crown Sovereign</option>
                    <option value="Bashundhara Block-I Luxury Heights">Bashundhara Block-I Luxury Heights</option>
                    <option value="Gulshan Avenue Commercial Plaza">Gulshan Avenue Commercial Plaza</option>
                    <option value="Emerald Hills Residences">Emerald Hills Residences</option>
                    <option value="Banasree Imperial Lakeview">Banasree Imperial Lakeview</option>
                  </select>
                </div>

                {/* Unit / Plot Spec */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Unit / Plot Spec
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 Katha • South Facing"
                    value={unitSpec}
                    onChange={(e) => setUnitSpec(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-gray-800 font-medium"
                  />
                </div>

                {/* Pick-up Point */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Pick-up Point <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center p-0.5 bg-gray-100 rounded-lg border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setPickupType('hq')}
                      className={`flex-1 py-1 px-2 rounded-md text-[11px] font-semibold transition-all cursor-pointer text-center ${
                        pickupType === 'hq' 
                          ? 'bg-white text-gray-900 shadow-2xs font-bold' 
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      Promise HQ (Banani)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPickupType('custom')}
                      className={`flex-1 py-1 px-2 rounded-md text-[11px] font-semibold transition-all cursor-pointer text-center ${
                        pickupType === 'custom' 
                          ? 'bg-white text-gray-900 shadow-2xs font-bold' 
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      Custom Address
                    </button>
                  </div>
                </div>

                {/* Confirmed Pick-up Location */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    {pickupType === 'custom' ? (
                      <>Pick-up Address <span className="text-rose-500">*</span></>
                    ) : (
                      <>Confirmed Pick-up Location</>
                    )}
                  </label>
                  {pickupType === 'custom' ? (
                    <input
                      type="text"
                      required
                      placeholder="House, Road, Area (e.g. Gulshan-2)"
                      value={customPickupAddress}
                      onChange={(e) => setCustomPickupAddress(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-gray-800 font-medium"
                    />
                  ) : (
                    <div className="px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 font-medium flex items-center gap-1.5">
                      <Building size={13} className="text-amber-600 shrink-0" />
                      <span className="truncate">Banani Corporate Office / Promise HQ</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3. ACCOMPANYING GUESTS (OPTIONAL) */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-gray-50/50 border border-gray-200 shadow-2xs space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="w-5 h-5 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                    <Users size={13} className="stroke-[2.2]" />
                  </div>
                  <h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">
                    3. ACCOMPANYING GUESTS (OPTIONAL)
                  </h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                    Total: {totalPassengers} Persons (Customer: 1 + Guests: {guests.length})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAddGuest}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300 shadow-2xs transition-colors cursor-pointer w-fit"
                >
                  <Plus size={12} className="stroke-[2.5]" />
                  <span>+ Add Guest</span>
                </button>
              </div>

              {guests.length > 0 ? (
                <div className="space-y-1.5">
                  {guests.map((guest, idx) => (
                    <div 
                      key={guest.id}
                      className="p-2 bg-white rounded-lg border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center gap-2 transition-all"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 w-full">
                        <input
                          type="text"
                          placeholder="Guest Name *"
                          value={guest.name}
                          onChange={(e) => handleUpdateGuest(guest.id, 'name', e.target.value)}
                          className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 bg-white font-medium text-gray-800"
                        />
                        <input
                          type="tel"
                          placeholder="Mobile No."
                          value={guest.phone}
                          onChange={(e) => handleUpdateGuest(guest.id, 'phone', e.target.value)}
                          className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 bg-white font-medium text-gray-800"
                        />
                        <input
                          type="text"
                          placeholder="Address / Remarks"
                          value={guest.address}
                          onChange={(e) => handleUpdateGuest(guest.id, 'address', e.target.value)}
                          className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 bg-white font-medium text-gray-800"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveGuest(guest.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 hover:bg-rose-50 rounded-md transition-colors cursor-pointer shrink-0 self-end sm:self-center"
                        title="Remove guest"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-2 text-gray-400 bg-white border border-dashed border-gray-200 rounded-lg text-[11px]">
                  No accompanying guests added. Customer will travel solo. Click "+ Add Guest" to add companions.
                </div>
              )}
            </div>

          </div>

          {/* Modal Actions Footer */}
          <div className="px-5 py-2.5 border-t border-gray-200 bg-gray-50/90 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2 text-xs text-gray-500 w-full sm:w-auto justify-between sm:justify-start">
              <span>Total Passengers: <strong className="text-gray-900">{totalPassengers} Person(s)</strong></span>
              <span>•</span>
              <span>Slot: <strong className="text-gray-900">{departureTime.split(' ')[0]} {departureTime.split(' ')[1]}</strong></span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-200/60 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold text-white rounded-lg shadow-xs hover:opacity-95 active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
                style={{ backgroundColor: '#c7a259' }}
              >
                <Check size={14} className="stroke-[2.5]" />
                <span>Submit Visit Request</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
