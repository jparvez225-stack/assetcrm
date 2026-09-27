import React, { useState } from 'react';
import { VisitRequest } from '../types';
import { 
  Calendar, 
  Clock, 
  Car, 
  UserCheck, 
  MapPin, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Building, 
  Phone, 
  Send, 
  Users, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface ConfirmVisitSlotModalProps {
  request: VisitRequest;
  isOpen: boolean;
  onClose: () => void;
  existingBookingsOnDate?: {
    vehicleNo: string;
    reportingTime: string;
    customerName: string;
  }[];
  onConfirm: (confirmedData: {
    requestId: string;
    leadId: string;
    bookingId: string;
    visitDate: string;
    reportingTime: string;
    vehicleNo: string;
    driverName: string;
    projectRepresentative: string;
    pickupLocation: string;
    notes: string;
  }) => void;
}

const FLEET_VEHICLES = [
  {
    no: 'Dhaka Metro-GA 24-8812 (Toyota Prado - VIP)',
    driver: 'Alamgir Hossain (01712334455)',
    capacity: 7,
    type: 'VIP SUV'
  },
  {
    no: 'Dhaka Metro-CHA 53-1200 (HiAce Micro)',
    driver: 'Zahirul Islam (01822334411)',
    capacity: 12,
    type: 'Microbus'
  },
  {
    no: 'Dhaka Metro-GA 11-4099 (Corolla Cross)',
    driver: 'Rafiq Mia (01911223344)',
    capacity: 5,
    type: 'Crossover SUV'
  },
  {
    no: 'Dhaka Metro-DHA 33-5521 (Toyota Noah)',
    driver: 'Mizanur Rahman (01755667788)',
    capacity: 8,
    type: 'Microvan'
  }
];

const SITE_HOSTS = [
  'Engr. Tanvir Ahmed (Project Director - Land)',
  'Ar. Nabila Rahman (Head of Architecture)',
  'Sayed Mostafa (Senior Site Engineer)',
  'Mahbubur Rahman (Site Supervisor)',
  'Asifur Rahman (Technical Coordinator)'
];

export const ConfirmVisitSlotModal: React.FC<ConfirmVisitSlotModalProps> = ({
  request,
  isOpen,
  onClose,
  existingBookingsOnDate = [],
  onConfirm
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState(FLEET_VEHICLES[0].no);
  const [selectedDriver, setSelectedDriver] = useState(FLEET_VEHICLES[0].driver);
  const [selectedHost, setSelectedHost] = useState(SITE_HOSTS[0]);
  const [confirmedDate, setConfirmedDate] = useState(request.preferredVisitDate);
  const [confirmedTime, setConfirmedTime] = useState(request.preferredVisitTime);
  const [pickupLocation, setPickupLocation] = useState(request.pickupLocation);
  const [notes, setNotes] = useState(request.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPreview, setShowSuccessPreview] = useState(false);
  const [generatedBookingId, setGeneratedBookingId] = useState('');

  if (!isOpen) return null;

  const handleVehicleSelect = (v: typeof FLEET_VEHICLES[0]) => {
    setSelectedVehicle(v.no);
    setSelectedDriver(v.driver);
  };

  // Check which vehicles have conflict on this slot
  const checkConflict = (vehicleNo: string) => {
    return existingBookingsOnDate.find(
      b => b.vehicleNo.toLowerCase() === vehicleNo.toLowerCase() && b.reportingTime === confirmedTime
    );
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingId = `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedBookingId(bookingId);

    setTimeout(() => {
      onConfirm({
        requestId: request.id,
        leadId: request.leadId,
        bookingId,
        visitDate: confirmedDate,
        reportingTime: confirmedTime,
        vehicleNo: selectedVehicle,
        driverName: selectedDriver,
        projectRepresentative: selectedHost,
        pickupLocation,
        notes
      });
      setIsSubmitting(false);
      setShowSuccessPreview(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-2xs"
              style={{ backgroundColor: '#c7a259' }}
            >
              <Car size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-gray-900 flex items-center gap-2">
                <span>Check Slots & Confirm Visit Booking</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                  Visitor Desk
                </span>
              </h3>
              <p className="text-[11px] text-gray-500">
                Verify vehicle slot availability on {request.preferredVisitDate} and allocate transport
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        {showSuccessPreview ? (
          <div className="p-8 text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 size={36} />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900">
                Site Visit Booking Confirmed!
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Booking ID: <strong className="font-mono text-amber-800">{generatedBookingId}</strong> has been allocated and synced across modules.
              </p>
            </div>

            {/* Notification dispatch preview */}
            <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-4 text-left space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                <Send size={14} className="text-amber-700" />
                <span>Automated Dispatches Executed:</span>
              </div>
              <div className="space-y-1.5 pl-5 list-disc text-gray-700 text-[11px]">
                <p>
                  ✅ <strong>Sales Executive Notification</strong> sent to <em>{request.assignedSalesman}</em>.
                </p>
                <p>
                  ✅ <strong>Client SMS & WhatsApp</strong> dispatched to <em>{request.leadPhone} ({request.leadName})</em> with driver and vehicle pickup details.
                </p>
                <p>
                  ✅ <strong>Visitor Manifest</strong> updated with status <em>"Site Visit Scheduled"</em>.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-bold text-white rounded-xl shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: '#c7a259' }}
            >
              Done & Return to Visitor List
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirmSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
            {/* Lead Request Details Banner */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-gray-900 text-sm">{request.leadName}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                    {request.guestCount} Guests
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">({request.leadId})</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-600 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Phone size={12} className="text-amber-600" />
                    {request.leadPhone}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Building size={12} className="text-amber-600" />
                    <span className="font-semibold text-gray-800">{request.projectName}</span>
                  </span>
                  <span>•</span>
                  <span>Officer: <strong>{request.assignedSalesman}</strong></span>
                </div>
                {request.notes && (
                  <p className="text-[11px] text-gray-600 italic mt-1 bg-white p-2 rounded border border-gray-200/70">
                    "{request.notes}"
                  </p>
                )}
              </div>

              <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-200">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Requested Schedule</span>
                <span className="text-sm font-extrabold text-amber-900 block">{request.preferredVisitDate}</span>
                <span className="text-xs font-bold text-gray-700">{request.preferredVisitTime}</span>
              </div>
            </div>

            {/* Vehicle Slot Checker Matrix */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-extrabold text-gray-900 flex items-center gap-1.5">
                  <Car size={15} className="text-amber-600" />
                  <span>Fleet Vehicle Slot Availability ({confirmedDate} • {confirmedTime})</span>
                </label>
                <span className="text-[11px] text-gray-500 font-medium">Select a free vehicle</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FLEET_VEHICLES.map((v) => {
                  const conflict = checkConflict(v.no);
                  const isSelected = selectedVehicle === v.no;

                  return (
                    <div
                      key={v.no}
                      onClick={() => !conflict && handleVehicleSelect(v)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        conflict
                          ? 'border-rose-200 bg-rose-50/50 opacity-70 cursor-not-allowed'
                          : isSelected
                          ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20 shadow-2xs'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-gray-900 text-xs">{v.no.split('(')[0]}</p>
                          <p className="text-[11px] text-gray-500">
                            {v.no.includes('(') ? `(${v.no.split('(')[1]}` : ''}
                          </p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                          conflict
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {conflict ? 'Busy Slot' : 'Available'}
                        </span>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-600">
                        <span>Driver: <strong>{v.driver.split('(')[0]}</strong></span>
                        <span className="font-semibold">{v.capacity} Seater</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Date & Time Verification */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Confirmed Visit Date
                </label>
                <input
                  type="date"
                  value={confirmedDate}
                  onChange={(e) => setConfirmedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-medium text-xs text-gray-800"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Confirmed Reporting Time
                </label>
                <select
                  value={confirmedTime}
                  onChange={(e) => setConfirmedTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-medium text-xs text-gray-800 bg-white"
                >
                  <option value="09:30 AM">09:30 AM (Morning Slot 1)</option>
                  <option value="10:30 AM">10:30 AM (Morning Slot 2)</option>
                  <option value="11:30 AM">11:30 AM (Pre-Noon Slot)</option>
                  <option value="02:00 PM">02:00 PM (Afternoon Slot 1)</option>
                  <option value="03:30 PM">03:30 PM (Afternoon Slot 2)</option>
                  <option value="04:30 PM">04:30 PM (Evening Sunset Tour)</option>
                </select>
              </div>
            </div>

            {/* Site Representative & Driver */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Project Site Host / Representative
                </label>
                <select
                  value={selectedHost}
                  onChange={(e) => setSelectedHost(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white"
                >
                  {SITE_HOSTS.map(host => (
                    <option key={host} value={host}>{host}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Assigned Driver Contact
                </label>
                <input
                  type="text"
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-800"
                  required
                />
              </div>
            </div>

            {/* Pickup Location */}
            <div>
              <label className="font-bold text-gray-700 block mb-1">
                Confirmed Pickup Location
              </label>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-800"
                required
              />
            </div>

            {/* Outgoing Notification Banner Preview */}
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Immediate Multi-Channel Notification Dispatch</span>
              </div>
              <p className="text-emerald-800">
                Upon confirmation, the CRM will notify <strong>{request.assignedSalesman}</strong> and send an automated SMS to <strong>{request.leadPhone}</strong> confirming pickup at {confirmedTime} with vehicle {selectedVehicle.split('(')[0]}.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-bold text-white rounded-lg shadow-sm hover:opacity-95 active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
                style={{ backgroundColor: '#c7a259' }}
              >
                {isSubmitting ? (
                  <span>Confirming Slot...</span>
                ) : (
                  <>
                    <CheckCircle2 size={15} className="stroke-[2.5]" />
                    <span>Confirm & Dispatch Booking (বুকিং নিশ্চিত করুন)</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
