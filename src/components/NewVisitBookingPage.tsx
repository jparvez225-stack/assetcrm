import React, { useState } from 'react';
import { 
  Building, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Car, 
  Users, 
  Check, 
  AlertTriangle, 
  ArrowLeft, 
  CheckCircle2, 
  X,
  Plus,
  Compass,
  FileText,
  Briefcase,
  ShieldCheck,
  Trash2
} from 'lucide-react';
import { VisitorRecord } from './VisitManagementView';

export interface AccompanyingGuest {
  id: string;
  name: string;
  phone: string;
  address: string;
}

interface NewVisitBookingPageProps {
  onCancel: () => void;
  onSave: (record: VisitorRecord) => void;
}

export const NewVisitBookingPage: React.FC<NewVisitBookingPageProps> = ({ onCancel, onSave }) => {
  // Booking ID generated for this session
  const [bookingCode] = useState(() => `VB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  
  // Dates
  const todayStr = '2026-09-12';
  const tomorrowStr = '2026-09-13';

  // Section 1: Schedule & Project
  const [visitDate, setVisitDate] = useState<string>(todayStr);
  const [reportingTime, setReportingTime] = useState<string>('10:00 AM');
  const [customTime, setCustomTime] = useState<string>('');
  const [destinationProject, setDestinationProject] = useState<string>('Purbachal Green Valley Project');
  const [unitSpec, setUnitSpec] = useState<string>('5 Katha • South Facing');
  const [channel, setChannel] = useState<string>('Corporate Direct');

  // Section 2: Customer & Pick-up
  const [customerName, setCustomerName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [pickupType, setPickupType] = useState<'hq' | 'custom'>('hq');
  const [customLocationText, setCustomLocationText] = useState<string>('');
  const [guests, setGuests] = useState<AccompanyingGuest[]>([]);
  const [referrerName, setReferrerName] = useState<string>('');

  // Section 3: Fleet & Host Logistics
  const [vehicle, setVehicle] = useState<string>('Toyota Prado (PAL-02)');
  const [driver, setDriver] = useState<string>('Alamgir Hossain (01712-334455)');
  const [salesTeam, setSalesTeam] = useState<string>('Alpha Warriors');
  const [salesOfficer, setSalesOfficer] = useState<string>('Siddique Rahman');
  const [siteHost, setSiteHost] = useState<string>('Engr. Tanvir Ahmed');
  const [notes, setNotes] = useState<string>('');

  // Validation message
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Time slots
  const timeSlots = [
    '09:30 AM',
    '10:00 AM',
    '11:30 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM'
  ];

  // Vehicles list
  const vehiclesList = [
    { name: 'Toyota Prado (PAL-02)', plate: 'Dhaka Metro-GA 24-8812', hasConflict: false },
    { name: 'Toyota Alphard (VIP-01)', plate: 'Dhaka Metro-GHA 11-2090', hasConflict: true },
    { name: 'Toyota Land Cruiser (VIP-03)', plate: 'Dhaka Metro-GA 55-9012', hasConflict: false },
    { name: 'Toyota HiAce Microbus (VAN-01)', plate: 'Dhaka Metro-CHA 53-7721', hasConflict: false },
    { name: 'Toyota Corolla Cross (SED-04)', plate: 'Dhaka Metro-BHA 19-3310', hasConflict: false },
    { name: 'Mitsubishi Pajero (PAL-05)', plate: 'Dhaka Metro-GA 31-4450', hasConflict: false }
  ];

  const isVehicleConflicted = vehicle === 'Toyota Alphard (VIP-01)';

  // Guest row actions
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

  // Submit all-in-one form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!customerName.trim()) {
      setErrorMsg('Please provide the Customer Name.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMsg('Please provide the Customer Phone Number.');
      return;
    }
    if (!visitDate) {
      setErrorMsg('Please select a Visit Date.');
      return;
    }
    if (pickupType === 'custom' && !customLocationText.trim()) {
      setErrorMsg('Please specify the custom pick-up address or landmark.');
      return;
    }

    const actualPickup = pickupType === 'hq' 
      ? 'Banani Corporate Office / Promise HQ' 
      : customLocationText.trim();

    const actualTime = reportingTime || customTime || '10:00 AM';

    const guestDetailsText = guests
      .filter(g => g.name.trim())
      .map((g, i) => `Guest ${i + 1}: ${g.name.trim()}${g.phone.trim() ? ` (${g.phone.trim()})` : ''}${g.address.trim() ? ` [${g.address.trim()}]` : ''}`)
      .join('; ');

    const newRecord: VisitorRecord = {
      id: `vis-${Date.now()}`,
      sl: '01',
      bookingId: bookingCode,
      bookingDate: todayStr,
      visitDate: visitDate || todayStr,
      reportingTime: actualTime,
      projectName: destinationProject,
      salesTeam: salesTeam,
      salesman: salesOfficer,
      name: customerName.trim(),
      phone: phoneNumber.trim(),
      noOfVisitor: 1 + guests.length,
      pickupLocation: actualPickup,
      driverName: driver,
      projectRepresentative: siteHost,
      vehicleNo: vehicle,
      status: 'Site Visit Scheduled',
      vehicleStatus: isVehicleConflicted ? 'Vehicle Conflict' : 'Assigned',
      whatsapp: whatsappNumber.trim() || phoneNumber.trim(),
      email: emailAddress.trim() || 'customer@gmail.com',
      unitSpec: unitSpec.trim() || '5 Katha • South Facing',
      referrerName: referrerName.trim() || undefined,
      referrerType: referrerName.trim() ? 'Agent' : undefined,
      source: channel as VisitorRecord['source'],
      category: 'Digital Media',
      branch: 'Dhaka',
      notes: notes.trim()
        ? (guestDetailsText ? `${notes.trim()} | Guests: ${guestDetailsText}` : notes.trim())
        : (guestDetailsText ? `Guests: ${guestDetailsText}` : `Channel: ${channel}. Host: ${siteHost}. Pick-up: ${actualPickup}`)
    };

    onSave(newRecord);
  };

  return (
    <div className="space-y-5 animate-fade-in pb-10">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
            <span>CRM</span>
            <span>/</span>
            <span>Visits</span>
            <span>/</span>
            <span className="text-gray-900 font-semibold">New Booking</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200 shadow-2xs transition-colors cursor-pointer"
              title="Go back"
            >
              <ArrowLeft size={15} className="text-gray-600" />
              <span>Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              New Visit Booking
            </h1>
            <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
              {bookingCode}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Schedule a site visit, assign vehicle, and allocate officers
          </p>
        </div>
      </div>

      {/* Validation Error Alert */}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMsg(null)}
            className="text-rose-500 hover:text-rose-800 p-1 rounded-md cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Main Single-Page Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden divide-y divide-gray-100">
          
          {/* 1. CUSTOMER INFORMATION */}
          <div className="p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <User size={14} className="stroke-[2.2]" />
                </div>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  1. Customer Details
                </h2>
              </div>
              <span className="text-[11px] text-gray-400 font-medium">* Required fields</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Customer Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={14} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Md. Jahid Hossain"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-gray-800 font-medium"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Phone size={14} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="01711-000000"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (!whatsappNumber) setWhatsappNumber(e.target.value);
                    }}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-gray-800 font-medium"
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  WhatsApp Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-500">
                    <Phone size={14} />
                  </div>
                  <input
                    type="text"
                    placeholder="01711-000000"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-gray-800 font-medium"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={14} />
                  </div>
                  <input
                    type="email"
                    placeholder="customer@gmail.com"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-gray-800 font-medium"
                  />
                </div>
              </div>

              {/* Lead Source */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Lead Source <span className="text-rose-500">*</span>
                </label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-gray-800 font-medium"
                >
                  <option value="Corporate Direct">Corporate Direct</option>
                  <option value="Referral">Referral</option>
                  <option value="Facebook Campaign">Facebook Campaign</option>
                  <option value="WhatsApp Desk">WhatsApp Desk</option>
                  <option value="Digital Media">Digital Media</option>
                  <option value="Walk-in Client">Walk-in Client</option>
                  <option value="Affiliate Partner">Affiliate Partner</option>
                </select>
              </div>

              {/* Referrer */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Referrer (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Referrer or Agent Name"
                  value={referrerName}
                  onChange={(e) => setReferrerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-gray-800 font-medium"
                />
              </div>
            </div>
          </div>

          {/* 2. SCHEDULE & PROJECT */}
          <div className="p-4 sm:p-5 space-y-3.5 bg-gray-50/30">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Calendar size={14} className="stroke-[2.2]" />
              </div>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                2. Schedule & Project
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Visit Date */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Visit Date <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-gray-800 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setVisitDate(todayStr)}
                    className={`px-2 py-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                      visitDate === todayStr ? 'bg-amber-500 text-white border-amber-500 shadow-2xs' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisitDate(tomorrowStr)}
                    className={`px-2 py-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                      visitDate === tomorrowStr ? 'bg-amber-500 text-white border-amber-500 shadow-2xs' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Tomorrow
                  </button>
                </div>
              </div>

              {/* Departure Time */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Departure Time <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={reportingTime}
                    onChange={(e) => {
                      setReportingTime(e.target.value);
                      if (e.target.value !== 'custom') setCustomTime('');
                    }}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-gray-800 font-medium"
                  >
                    <option value="09:30 AM">09:30 AM (Morning)</option>
                    <option value="10:00 AM">10:00 AM (Standard Slot)</option>
                    <option value="11:30 AM">11:30 AM (Pre-Noon)</option>
                    <option value="02:00 PM">02:00 PM (Afternoon)</option>
                    <option value="03:30 PM">03:30 PM (Evening)</option>
                    <option value="05:00 PM">05:00 PM (Late Slot)</option>
                    <option value="custom">Custom Time...</option>
                  </select>
                  {reportingTime === 'custom' && (
                    <input
                      type="time"
                      value={customTime}
                      onChange={(e) => {
                        setCustomTime(e.target.value);
                      }}
                      className="px-2 py-2 text-xs border border-amber-400 rounded-lg text-gray-700 focus:outline-none focus:border-amber-500 bg-white shrink-0"
                    />
                  )}
                </div>
              </div>

              {/* Destination Project */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Target Project <span className="text-rose-500">*</span>
                </label>
                <select
                  value={destinationProject}
                  onChange={(e) => setDestinationProject(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-gray-800 font-medium"
                >
                  <option value="Purbachal Green Valley Project">Purbachal Green Valley Project</option>
                  <option value="Promise Crown Sovereign">Promise Crown Sovereign</option>
                  <option value="Bashundhara Block-I Luxury Heights">Bashundhara Block-I Luxury Heights</option>
                  <option value="Gulshan Avenue Commercial Plaza">Gulshan Avenue Commercial Plaza</option>
                  <option value="Emerald Hills Residences">Emerald Hills Residences</option>
                  <option value="Banasree Imperial Lakeview">Banasree Imperial Lakeview</option>
                </select>
              </div>

              {/* Unit Spec */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Unit / Plot Spec
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5 Katha • South Facing"
                  value={unitSpec}
                  onChange={(e) => setUnitSpec(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-gray-800 font-medium"
                />
              </div>

              {/* Pick-up Location Option */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Pick-up Point <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center p-0.5 bg-gray-100 rounded-lg border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setPickupType('hq')}
                    className={`flex-1 py-1.5 px-2 rounded-md text-xs font-semibold transition-all cursor-pointer text-center ${
                      pickupType === 'hq' ? 'bg-white text-gray-900 shadow-2xs font-bold' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Promise HQ (Banani)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPickupType('custom')}
                    className={`flex-1 py-1.5 px-2 rounded-md text-xs font-semibold transition-all cursor-pointer text-center ${
                      pickupType === 'custom' ? 'bg-white text-gray-900 shadow-2xs font-bold' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Custom Address
                  </button>
                </div>
              </div>

              {/* Custom Location Text or HQ Confirmation */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
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
                    value={customLocationText}
                    onChange={(e) => setCustomLocationText(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-gray-800 font-medium"
                  />
                ) : (
                  <div className="px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-600 font-medium flex items-center gap-1.5">
                    <Building size={14} className="text-amber-600 shrink-0" />
                    <span className="truncate">Banani Corporate Office / Promise HQ</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3. FLEET & TEAM */}
          <div className="p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Car size={14} className="stroke-[2.2]" />
                </div>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  3. Vehicle & Staff Allocation
                </h2>
              </div>
              {isVehicleConflicted && (
                <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Vehicle Conflict Detected
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Vehicle */}
              <div className="sm:col-span-1 lg:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Vehicle <span className="text-rose-500">*</span>
                </label>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none bg-white text-gray-800 font-medium ${
                    isVehicleConflicted 
                      ? 'border-rose-400 focus:border-rose-500' 
                      : 'border-gray-200 focus:border-amber-500'
                  }`}
                >
                  {vehiclesList.map(v => (
                    <option key={v.name} value={v.name}>
                      {v.name} ({v.plate}) {v.hasConflict ? '• [Conflict]' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Driver */}
              <div className="sm:col-span-1 lg:col-span-3">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Driver <span className="text-rose-500">*</span>
                </label>
                <select
                  value={driver}
                  onChange={(e) => setDriver(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 bg-white text-gray-800 font-medium"
                >
                  <option value="Alamgir Hossain (01712-334455)">Alamgir Hossain (01712-334455)</option>
                  <option value="Md. Kalam Hossain (01819-204911)">Md. Kalam Hossain (01819-204911)</option>
                  <option value="Zahirul Islam (01822-334411)">Zahirul Islam (01822-334411)</option>
                  <option value="Rafiq Mia (01911-223344)">Rafiq Mia (01911-223344)</option>
                </select>
              </div>

              {/* Sales Team */}
              <div className="lg:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Sales Team <span className="text-rose-500">*</span>
                </label>
                <select
                  value={salesTeam}
                  onChange={(e) => setSalesTeam(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 bg-white text-gray-800 font-medium"
                >
                  <option value="Alpha Warriors">Alpha Warriors</option>
                  <option value="Corporate Elite">Corporate Elite</option>
                  <option value="Dhaka Frontline">Dhaka Frontline</option>
                  <option value="Metro Star">Metro Star</option>
                  <option value="NRB Global Desk">NRB Global Desk</option>
                </select>
              </div>

              {/* Sales Officer */}
              <div className="lg:col-span-1.5 sm:col-span-1">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Sales Officer <span className="text-rose-500">*</span>
                </label>
                <select
                  value={salesOfficer}
                  onChange={(e) => setSalesOfficer(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 bg-white text-gray-800 font-medium"
                >
                  <option value="Siddique Rahman">Siddique Rahman</option>
                  <option value="Tanvir Ahmed">Tanvir Ahmed</option>
                  <option value="Farhana Yasmin">Farhana Yasmin</option>
                  <option value="Md. Rahim Sarder">Md. Rahim Sarder</option>
                  <option value="Mahmudul Hasan">Mahmudul Hasan</option>
                </select>
              </div>

              {/* Site Host */}
              <div className="lg:col-span-2 sm:col-span-1">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Site Host <span className="text-rose-500">*</span>
                </label>
                <select
                  value={siteHost}
                  onChange={(e) => setSiteHost(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 bg-white text-gray-800 font-medium"
                >
                  <option value="Engr. Tanvir Ahmed">Engr. Tanvir Ahmed (Project Lead)</option>
                  <option value="Ar. Mahbubul Alam (Senior Host)">Ar. Mahbubul Alam (Senior Host)</option>
                  <option value="Ar. Nabila Rahman">Ar. Nabila Rahman</option>
                  <option value="Sayed Mostafa">Sayed Mostafa</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4. ACCOMPANYING GUESTS */}
          <div className="p-4 sm:p-5 space-y-3 bg-gray-50/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Users size={14} className="stroke-[2.2]" />
                </div>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  4. Accompanying Guests (ঐচ্ছিক)
                </h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                  মোট: {1 + guests.length} জন (কাস্টমার ১ + গেস্ট {guests.length})
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddGuest}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1.5 rounded-lg border border-amber-200 shadow-2xs transition-colors cursor-pointer w-fit"
              >
                <Plus size={13} className="stroke-[2.5]" />
                <span>Add Guest</span>
              </button>
            </div>

            {guests.length > 0 ? (
              <div className="space-y-2">
                {guests.map((guest, idx) => (
                  <div 
                    key={guest.id}
                    className="p-2.5 bg-white rounded-lg border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center gap-2"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 w-full">
                      <input
                        type="text"
                        placeholder="নাম (Guest Name) *"
                        value={guest.name}
                        onChange={(e) => handleUpdateGuest(guest.id, 'name', e.target.value)}
                        className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 bg-white font-medium"
                      />
                      <input
                        type="text"
                        placeholder="মোবাইল (Mobile No.)"
                        value={guest.phone}
                        onChange={(e) => handleUpdateGuest(guest.id, 'phone', e.target.value)}
                        className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 bg-white font-medium"
                      />
                      <input
                        type="text"
                        placeholder="ঠিকানা (Address)"
                        value={guest.address}
                        onChange={(e) => handleUpdateGuest(guest.id, 'address', e.target.value)}
                        className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 bg-white font-medium"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveGuest(guest.id)}
                      className="text-rose-500 hover:text-rose-700 p-1.5 hover:bg-rose-50 rounded-md transition-colors cursor-pointer shrink-0 self-end sm:self-center"
                      title="Remove"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div 
                onClick={handleAddGuest}
                className="py-2.5 px-3 rounded-lg border border-dashed border-gray-200 bg-white hover:border-amber-300 text-center cursor-pointer transition-all"
              >
                <p className="text-xs text-gray-500">
                  কোনো অতিরিক্ত গেস্ট নেই। গেস্ট থাকলে <span className="text-amber-700 font-bold underline">+ Add Guest</span> এ ক্লিক করুন।
                </p>
              </div>
            )}
          </div>

          {/* 5. NOTES */}
          <div className="p-4 sm:p-5 space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700">
              Notes & Special Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="Special instructions, preferences, client background, or dietary requests..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 bg-white text-gray-800 font-medium"
            />
          </div>

          {/* ACTIONS BAR */}
          <div className="p-4 bg-gray-50/70 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-gray-600 flex items-center gap-1.5 w-full sm:w-auto">
              <span className="font-bold text-gray-900">{destinationProject.split(' ')[0]}</span>
              <span>•</span>
              <span>{visitDate} at {reportingTime === 'custom' ? (customTime || 'Custom') : reportingTime}</span>
              <span>•</span>
              <span>{vehicle.split(' (')[0]}</span>
              <span>•</span>
              <span className="font-semibold text-amber-800">{1 + guests.length} Persons</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-white rounded-lg text-xs font-bold shadow-2xs hover:opacity-95 active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
                style={{ backgroundColor: '#c7a259' }}
              >
                <CheckCircle2 size={15} className="stroke-[2.5]" />
                <span>Save Booking</span>
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};
