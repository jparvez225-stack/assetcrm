import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Car, 
  Users, 
  Phone, 
  Mail, 
  MessageSquare, 
  Printer, 
  CalendarDays, 
  UserPlus, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  UserCheck, 
  Copy, 
  Navigation,
  FileText,
  Send,
  Check,
  Edit3,
  Sparkles,
  PhoneCall,
  X,
  History,
  Tag,
  ShieldCheck,
  RotateCcw,
  PlusCircle,
  ChevronRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { VisitorRecord } from './VisitManagementView';

interface VisitorDetailsInnerPageProps {
  visitor: VisitorRecord;
  onBack: () => void;
  onUpdateStatus: (id: string, newStatus: string) => void;
  onPrintGatePass: (visitor: VisitorRecord) => void;
  onReschedule: (visitor: VisitorRecord) => void;
  onAssignSalesman: (id: string) => void;
  onUpdateSalesman?: (id: string, salesmanName: string, salesTeam?: string) => void;
  onUpdateFleet?: (id: string, vehicleNo: string, driverName: string, vehicleStatus: string) => void;
  onSaveNotes?: (id: string, notes: string) => void;
  onSendShortText?: (visitor: VisitorRecord) => void;
  onUpdatePickupLocation?: (id: string, pickupLocation: string) => void;
}

interface TimelineEvent {
  id: string;
  timestamp: string;
  timeAgo: string;
  type: 'status' | 'sms' | 'fleet' | 'salesman' | 'note' | 'call' | 'gatepass' | 'booking';
  title: string;
  description: string;
  actor: string;
  badgeText?: string;
  badgeColor?: string;
}

const QUICK_NOTE_CHIPS = [
  'Interested in Duplex / Lake View',
  'Ready to pay advance token',
  'Requires soil & structural report',
  'Requested second visit with family',
  'Prefers South-facing corner unit',
  'Driver picked up client on schedule'
];

const AVAILABLE_SALES_OFFICERS = [
  { name: 'Rashedul Karim', team: 'NRB Global Desk', phone: '+880 1712-889900', role: 'Senior Sales Executive' },
  { name: 'Farhana Yasmin', team: 'Bravo Team', phone: '+880 1812-334455', role: 'Senior Sales Manager' },
  { name: 'Siddique Rahman', team: 'Alpha Team', phone: '+880 1711-223344', role: 'Assistant Manager' },
  { name: 'Md. Rahim Sarder', team: 'Commercial Assets', phone: '+880 1919-887766', role: 'Senior Consultant' },
  { name: 'Tanvir Hassan', team: 'Direct Sales', phone: '+880 1755-667788', role: 'Project Consultant' },
  { name: 'Mahmudul Haque', team: 'VIP Services', phone: '+880 1799-887766', role: 'Executive Director' },
  { name: 'Shaila Sharmin', team: 'Corporate Accounts', phone: '+880 1855-443322', role: 'Relationship Manager' }
];

const AVAILABLE_FLEET_VEHICLES = [
  { vehicleNo: 'Dhaka Metro-GA 24-8812 (Prado)', type: 'Luxury SUV', capacity: '4 Pax' },
  { vehicleNo: 'Dhaka Metro-CHA 53-1200 (HiAce)', type: 'Executive Micro', capacity: '10 Pax' },
  { vehicleNo: 'Dhaka Metro-GA 11-4099 (Corolla)', type: 'Hybrid SUV', capacity: '4 Pax' },
  { vehicleNo: 'Dhaka Metro-DHA 15-7788 (Noah)', type: 'Family MPV', capacity: '7 Pax' },
  { vehicleNo: 'Dhaka Metro-GA 19-3321 (Pajero)', type: '4x4 Offroad', capacity: '5 Pax' },
  { vehicleNo: 'Client Own Vehicle', type: 'Private Car', capacity: 'N/A' }
];

const AVAILABLE_DRIVERS = [
  { name: 'Alamgir Hossain', phone: '01712334455', exp: '8 yrs exp' },
  { name: 'Zahirul Islam', phone: '01822334411', exp: '6 yrs exp' },
  { name: 'Rafiq Mia', phone: '01911223344', exp: '10 yrs exp' },
  { name: 'Kader Ali', phone: '01733445566', exp: '5 yrs exp' },
  { name: 'Nurul Huda', phone: '01899001122', exp: '4 yrs exp' },
  { name: 'Self-Drive / Client Chauffeur', phone: 'N/A', exp: 'Self' }
];

const AVAILABLE_PICKUP_LOCATIONS = [
  'Banani Club Entrance',
  'Gulshan-2 Circle',
  'Banani Super Market',
  'Dhanmondi 27',
  'Uttara Sector 3',
  'Mirpur 10 Circle',
  'Motijheel C/A',
  'Bashundhara R/A',
  'Mohakhali DOHS',
  'Direct Site Reporting'
];

const AVAILABLE_NOTE_TEMPLATES = [
  'Interested in Duplex / Lake View unit.',
  'Ready to pay token advance during visit.',
  'Requires soil test & engineering report.',
  'Requested second visit with family.',
  'Prefers South-facing corner unit.',
  'En route to site with assigned driver.',
  'Requested customized financing plan.',
  'Waiting for bank pre-approval.',
  'Site visit completed successfully.',
  'Special assistance: Senior citizen.'
];

const QUICK_OPERATIONS_LIST = [
  { value: 'print_gate_pass', label: 'Print Gate Pass' },
  { value: 'send_sms', label: 'Send SMS' },
  { value: 'reschedule', label: 'Reschedule Tour' },
  { value: 'visit_completed', label: 'Mark Visit Completed' },
  { value: 'booking_confirmed', label: 'Confirm Booking' },
  { value: 'cancelled', label: 'Cancel Booking' },
  { value: 'call_visitor', label: 'Call Visitor' },
  { value: 'open_whatsapp', label: 'Open WhatsApp' },
  { value: 'status_enroute', label: 'Set En Route' },
  { value: 'status_onsite', label: 'Set On Site' },
  { value: 'status_standby', label: 'Set Standby' },
  { value: 'status_completed', label: 'Set Completed' }
];

export const VisitorDetailsInnerPage: React.FC<VisitorDetailsInnerPageProps> = ({
  visitor,
  onBack,
  onUpdateStatus,
  onPrintGatePass,
  onReschedule,
  onAssignSalesman,
  onUpdateSalesman,
  onUpdateFleet,
  onSaveNotes,
  onSendShortText,
  onUpdatePickupLocation
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [currentNotes, setCurrentNotes] = useState(visitor.notes || '');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [quickNoteInput, setQuickNoteInput] = useState('');

  // Dropdown States with blank fields
  const [selectedQuickOp, setSelectedQuickOp] = useState<string>('');
  const [selectedSalesman, setSelectedSalesman] = useState<string>(visitor.salesman || '');
  const [selectedVehicle, setSelectedVehicle] = useState<string>(visitor.vehicleNo || '');
  const [selectedDriver, setSelectedDriver] = useState<string>(visitor.driverName || '');
  const [selectedPickupLocation, setSelectedPickupLocation] = useState<string>(visitor.pickupLocation || '');
  const [customPickupText, setCustomPickupText] = useState<string>('');
  const [isCustomPickup, setIsCustomPickup] = useState<boolean>(false);
  const [selectedNoteTemplate, setSelectedNoteTemplate] = useState<string>('');
  const [selectedTripStatus, setSelectedTripStatus] = useState<string>(visitor.vehicleStatus || 'Standby');

  // Activity Form States (for right-side converted form)
  const [formActivityType, setFormActivityType] = useState<'note' | 'call' | 'status' | 'fleet'>('note');
  const [formStatus, setFormStatus] = useState<string>(visitor.status || 'Site Visit Scheduled');
  const [formSalesman, setFormSalesman] = useState<string>(visitor.salesman || '');
  const [formVehicle, setFormVehicle] = useState<string>(visitor.vehicleNo || '');
  const [formDriver, setFormDriver] = useState<string>(visitor.driverName || '');
  const [formPickupLocation, setFormPickupLocation] = useState<string>(visitor.pickupLocation || '');
  const [formNotes, setFormNotes] = useState<string>('');

  // History Filter
  const [historyFilter, setHistoryFilter] = useState<'all' | 'status' | 'sms' | 'fleet' | 'notes'>('all');
  const [isAddingInteraction, setIsAddingInteraction] = useState(false);
  const [newInteractionType, setNewInteractionType] = useState<'call' | 'note' | 'sms'>('call');
  const [newInteractionNote, setNewInteractionNote] = useState('');

  // Fleet & Salesman Modals
  const [showSalesmanModal, setShowSalesmanModal] = useState(false);
  const [showFleetModal, setShowFleetModal] = useState(false);

  // Short Text (SMS) modal state
  const [showSmsComposer, setShowSmsComposer] = useState(false);
  const [smsRecipient, setSmsRecipient] = useState<'client' | 'driver' | 'both'>('client');
  const [smsTemplate, setSmsTemplate] = useState<'confirmation' | 'driver' | 'reminder' | 'custom'>('confirmation');
  const [smsText, setSmsText] = useState(
    `Dear ${visitor.name}, your site visit to ${visitor.projectName} is confirmed for ${visitor.visitDate || 'upcoming date'} at ${visitor.reportingTime}. Vehicle: ${visitor.vehicleNo || 'Fleet Vehicle'}, Driver: ${visitor.driverName || 'Designated Driver'}. PAL Security.`
  );

  // Timeline events state (synthesized from visitor records + real logs)
  const [customEvents, setCustomEvents] = useState<TimelineEvent[]>([]);

  // Sync state if visitor changes
  React.useEffect(() => {
    setFormStatus(visitor.status || 'Site Visit Scheduled');
    setFormSalesman(visitor.salesman || '');
    setFormVehicle(visitor.vehicleNo || '');
    setFormDriver(visitor.driverName || '');
    setFormPickupLocation(visitor.pickupLocation || '');
    setFormNotes('');
    setFormActivityType('note');
    setSelectedSalesman(visitor.salesman || '');
    setSelectedVehicle(visitor.vehicleNo || '');
    setSelectedDriver(visitor.driverName || '');
    setSelectedPickupLocation(visitor.pickupLocation || '');
    setSelectedTripStatus(visitor.vehicleStatus || 'Standby');
    setCurrentNotes(visitor.notes || '');
  }, [visitor]);

  const showLocalToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addTimelineEvent = (
    type: TimelineEvent['type'],
    title: string,
    description: string,
    badgeText?: string,
    badgeColor?: string
  ) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEvt: TimelineEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp,
      timeAgo: 'Just now',
      type,
      title,
      description,
      actor: 'Admin',
      badgeText,
      badgeColor
    };
    setCustomEvents((prev) => [newEvt, ...prev]);
  };

  // Activity Form Submission Handler (records activity directly into history timeline)
  const handleSubmitActivity = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const hasNotes = formNotes.trim().length > 0;
    let changesCount = 0;

    // 1. Status Change Check
    if (formStatus && formStatus !== visitor.status) {
      onUpdateStatus(visitor.id, formStatus);
      addTimelineEvent(
        'status',
        `Status: ${formStatus}`,
        `Visit status updated from "${visitor.status}" to "${formStatus}".`,
        formStatus,
        getStatusBadge(formStatus)
      );
      changesCount++;
    }

    // 2. Salesman Assignment Check
    if (formSalesman !== (visitor.salesman || '')) {
      const matched = AVAILABLE_SALES_OFFICERS.find((o) => o.name === formSalesman);
      const team = matched?.team || (formSalesman ? 'Sales Team' : 'Unassigned');
      if (onUpdateSalesman) {
        onUpdateSalesman(visitor.id, formSalesman || 'Unassigned', team);
      } else {
        onAssignSalesman(visitor.id);
      }
      if (formSalesman) {
        addTimelineEvent(
          'salesman',
          'Sales Officer Assigned',
          `Assigned to ${formSalesman} (${team}).`,
          formSalesman,
          'bg-amber-100 text-amber-900 border border-amber-300'
        );
      } else {
        addTimelineEvent(
          'salesman',
          'Sales Officer Removed',
          'Sales representative was unassigned.',
          'Unassigned',
          'bg-gray-100 text-gray-700'
        );
      }
      setSelectedSalesman(formSalesman);
      changesCount++;
    }

    // 3. Vehicle & Driver Check
    if (formVehicle !== (visitor.vehicleNo || '') || formDriver !== (visitor.driverName || '')) {
      if (onUpdateFleet) {
        onUpdateFleet(visitor.id, formVehicle, formDriver, selectedTripStatus);
      }
      addTimelineEvent(
        'fleet',
        'Logistics & Fleet Updated',
        `Vehicle: ${formVehicle || 'Unassigned'} | Driver: ${formDriver || 'Unassigned'}`,
        formVehicle ? 'Allocated' : 'None',
        'bg-blue-100 text-blue-900 border border-blue-300'
      );
      setSelectedVehicle(formVehicle);
      setSelectedDriver(formDriver);
      changesCount++;
    }

    // 4. Pickup Location Check
    if (formPickupLocation !== (visitor.pickupLocation || '')) {
      if (onUpdatePickupLocation) {
        onUpdatePickupLocation(visitor.id, formPickupLocation);
      }
      addTimelineEvent(
        'fleet',
        'Pick-up Location Set',
        `Pick-up rendezvous station set to "${formPickupLocation || 'Not Specified'}".`,
        formPickupLocation ? 'Pickup Set' : 'Cleared',
        'bg-rose-100 text-rose-900 border border-rose-300'
      );
      setSelectedPickupLocation(formPickupLocation);
      changesCount++;
    }

    // 5. Activity Notes & Remarks (Recorded into timeline history)
    if (hasNotes) {
      let title = 'Visit Activity Logged';
      let type: TimelineEvent['type'] = 'note';
      let badgeText = 'NOTE';
      let badgeColor = 'bg-amber-100 text-amber-900 border border-amber-300';

      if (formActivityType === 'call') {
        title = 'Phone Call Summary';
        type = 'call';
        badgeText = 'PHONE CALL';
        badgeColor = 'bg-cyan-100 text-cyan-900 border border-cyan-300';
      } else if (formActivityType === 'status') {
        title = 'Status Remark Logged';
        type = 'status';
        badgeText = 'STATUS';
        badgeColor = 'bg-purple-100 text-purple-900 border border-purple-300';
      } else if (formActivityType === 'fleet') {
        title = 'Logistics & Transit Note';
        type = 'fleet';
        badgeText = 'LOGISTICS';
        badgeColor = 'bg-blue-100 text-blue-900 border border-blue-300';
      }

      addTimelineEvent(type, title, formNotes.trim(), badgeText, badgeColor);

      // Append to cumulative notes
      const formatted = `• [${badgeText} - ${timestamp}] ${formNotes.trim()}`;
      const updatedNotes = currentNotes ? `${currentNotes}\n${formatted}` : formatted;
      setCurrentNotes(updatedNotes);
      if (onSaveNotes) {
        onSaveNotes(visitor.id, updatedNotes);
      }
      setFormNotes('');
      changesCount++;
    }

    if (changesCount === 0 && !hasNotes) {
      showLocalToast('No changes or remarks to log.');
      return;
    }

    showLocalToast('Activity recorded and added to timeline history!');
  };

  const handleResetForm = () => {
    setFormStatus(visitor.status || 'Site Visit Scheduled');
    setFormSalesman(visitor.salesman || '');
    setFormVehicle(visitor.vehicleNo || '');
    setFormDriver(visitor.driverName || '');
    setFormPickupLocation(visitor.pickupLocation || '');
    setFormNotes('');
    setFormActivityType('note');
    showLocalToast('Form reset to current visitor values.');
  };

  const handleAppendFormChip = (chip: string) => {
    setFormNotes((prev) => {
      const clean = prev.trim();
      return clean ? `${clean}. ${chip}` : chip;
    });
  };

  // 1. Quick Operations Handler
  const handleQuickOpChange = (op: string) => {
    setSelectedQuickOp(op);
    if (!op) return;
    executeQuickOp(op);
  };

  const executeQuickOp = (op: string) => {
    if (op === 'print_gate_pass') {
      onPrintGatePass(visitor);
      showLocalToast('Opening Gate Pass printing layout...');
    } else if (op === 'send_sms') {
      setShowSmsComposer(true);
    } else if (op === 'reschedule') {
      onReschedule(visitor);
    } else if (op === 'visit_completed') {
      onUpdateStatus(visitor.id, 'Visit Completed');
      showLocalToast('Visit marked as Completed.');
      addTimelineEvent('status', 'Visit Completed', 'Status updated to Visit Completed by Admin.');
    } else if (op === 'booking_confirmed') {
      onUpdateStatus(visitor.id, 'Booking Confirmed');
      showLocalToast('Unit Booking marked as Confirmed.');
      addTimelineEvent('booking', 'Booking Confirmed', 'Unit booking confirmed for client.');
    } else if (op === 'cancelled') {
      onUpdateStatus(visitor.id, 'Cancelled');
      showLocalToast('Booking request marked as Cancelled.');
      addTimelineEvent('status', 'Booking Cancelled', 'Booking cancelled by Admin.');
    } else if (op === 'call_visitor') {
      window.location.href = `tel:${visitor.phone}`;
      showLocalToast(`Calling ${visitor.name} (${visitor.phone})...`);
    } else if (op === 'open_whatsapp') {
      const cleanNum = (visitor.whatsapp || visitor.phone).replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${cleanNum}`, '_blank');
    } else if (op === 'status_enroute') {
      handleTripStatusChange('En Route');
    } else if (op === 'status_onsite') {
      handleTripStatusChange('On Site');
    } else if (op === 'status_standby') {
      handleTripStatusChange('Standby');
    } else if (op === 'status_completed') {
      handleTripStatusChange('Completed');
    }
    setTimeout(() => setSelectedQuickOp(''), 1500);
  };

  // 2. Sales Man Handler
  const handleSalesmanChange = (val: string) => {
    setSelectedSalesman(val);
    const matched = AVAILABLE_SALES_OFFICERS.find((o) => o.name === val);
    const team = matched?.team || (val ? 'Sales Team' : 'Unassigned');
    const salesmanName = val || 'Unassigned';
    if (onUpdateSalesman) {
      onUpdateSalesman(visitor.id, salesmanName, team);
    } else {
      onAssignSalesman(visitor.id);
    }
    if (val) {
      showLocalToast(`Sales representative assigned: ${val}`);
      addTimelineEvent('salesman', 'Sales Officer Assigned', `Assigned to ${val} (${team})`);
    } else {
      showLocalToast('Sales representative unassigned (blank field).');
      addTimelineEvent('salesman', 'Sales Officer Unassigned', 'Sales representative was set to unassigned.');
    }
  };

  // 3. Car (Vehicle) Handler
  const handleCarChange = (val: string) => {
    setSelectedVehicle(val);
    if (onUpdateFleet) {
      onUpdateFleet(visitor.id, val, selectedDriver, selectedTripStatus);
    }
    if (val) {
      showLocalToast(`Vehicle allocated: ${val}`);
      addTimelineEvent('fleet', 'Transport Vehicle Allocated', `Vehicle set to: ${val}`);
    } else {
      showLocalToast('Vehicle unassigned (blank field).');
      addTimelineEvent('fleet', 'Transport Vehicle Unassigned', 'Assigned vehicle removed.');
    }
  };

  // 4. Driver Handler
  const handleDriverChange = (val: string) => {
    setSelectedDriver(val);
    if (onUpdateFleet) {
      onUpdateFleet(visitor.id, selectedVehicle, val, selectedTripStatus);
    }
    if (val) {
      showLocalToast(`Driver assigned: ${val}`);
      addTimelineEvent('fleet', 'Driver Assigned', `Driver set to: ${val}`);
    } else {
      showLocalToast('Driver unassigned (blank field).');
      addTimelineEvent('fleet', 'Driver Unassigned', 'Chauffeur removed.');
    }
  };

  const handleTripStatusChange = (status: string) => {
    setSelectedTripStatus(status);
    if (onUpdateFleet) {
      onUpdateFleet(visitor.id, selectedVehicle, selectedDriver, status);
    }
    showLocalToast(`Transport status: ${status}`);
    addTimelineEvent('fleet', `Transport Status: ${status}`, `Trip status updated to ${status}`);
  };

  // 5. Pick-up Location Handler
  const handlePickupLocationChange = (val: string) => {
    if (val === 'custom') {
      setIsCustomPickup(true);
      setSelectedPickupLocation('');
    } else {
      setIsCustomPickup(false);
      setSelectedPickupLocation(val);
      if (onUpdatePickupLocation) {
        onUpdatePickupLocation(visitor.id, val);
      }
      if (val) {
        showLocalToast(`Pick-up location set to: ${val}`);
        addTimelineEvent('fleet', 'Pick-up Location Set', `Rendezvous station set to ${val}`);
      } else {
        showLocalToast('Pick-up location cleared (blank field).');
        addTimelineEvent('fleet', 'Pick-up Location Cleared', 'Pick-up location set to blank.');
      }
    }
  };

  const handleSaveCustomLocation = () => {
    if (!customPickupText.trim()) return;
    const finalLoc = customPickupText.trim();
    setSelectedPickupLocation(finalLoc);
    if (onUpdatePickupLocation) {
      onUpdatePickupLocation(visitor.id, finalLoc);
    }
    showLocalToast(`Custom pick-up set: ${finalLoc}`);
    addTimelineEvent('fleet', 'Custom Pick-up Location', `Pick-up location: ${finalLoc}`);
    setIsCustomPickup(false);
  };

  // 6. Note Template Dropdown Handler
  const handleNoteTemplateChange = (val: string) => {
    setSelectedNoteTemplate(val);
    if (!val) return;
    const clean = currentNotes.trim();
    const updated = clean ? `${clean}\n• ${val}` : `• ${val}`;
    setCurrentNotes(updated);
    if (onSaveNotes) {
      onSaveNotes(visitor.id, updated);
    }
    showLocalToast(`Note inserted: "${val.length > 35 ? val.substring(0, 35) + '...' : val}"`);
    addTimelineEvent('note', 'Template Note Added', val);
    setTimeout(() => setSelectedNoteTemplate(''), 1000);
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showLocalToast(`Copied ${fieldName} (${text}) to clipboard`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSaveNotes = () => {
    if (onSaveNotes) {
      onSaveNotes(visitor.id, currentNotes);
    }
    setIsEditingNotes(false);
    showLocalToast('Visit notes and special requests saved successfully.');

    // Add note to history timeline
    const newEvt: TimelineEvent = {
      id: `evt-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeAgo: 'Just now',
      type: 'note',
      title: 'Visit Notes Updated',
      description: currentNotes.length > 80 ? `${currentNotes.substring(0, 80)}...` : currentNotes,
      actor: 'Admin'
    };
    setCustomEvents(prev => [newEvt, ...prev]);
  };

  const handleAppendChip = (chipText: string) => {
    setCurrentNotes((prev) => {
      const clean = prev.trim();
      return clean ? `${clean}\n• ${chipText}` : `• ${chipText}`;
    });
    if (!isEditingNotes) {
      setIsEditingNotes(true);
    }
  };

  const handleAddQuickNote = () => {
    if (!quickNoteInput.trim()) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formatted = `[${timestamp}] ${quickNoteInput.trim()}`;
    const updated = currentNotes ? `${currentNotes}\n• ${formatted}` : `• ${formatted}`;
    setCurrentNotes(updated);
    if (onSaveNotes) {
      onSaveNotes(visitor.id, updated);
    }
    setQuickNoteInput('');
    showLocalToast('Quick note appended to records.');

    // Add to history
    const newEvt: TimelineEvent = {
      id: `evt-${Date.now()}`,
      timestamp,
      timeAgo: 'Just now',
      type: 'note',
      title: 'Remarks Logged',
      description: quickNoteInput.trim(),
      actor: 'Admin'
    };
    setCustomEvents(prev => [newEvt, ...prev]);
  };

  const handleAddInteraction = () => {
    if (!newInteractionNote.trim()) {
      showLocalToast('Please write a brief summary of the interaction.');
      return;
    }
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEvt: TimelineEvent = {
      id: `evt-${Date.now()}`,
      timestamp,
      timeAgo: 'Just now',
      type: newInteractionType === 'call' ? 'call' : newInteractionType === 'sms' ? 'sms' : 'note',
      title: newInteractionType === 'call' ? 'Phone Call Logged' : newInteractionType === 'sms' ? 'Short Text Sent' : 'Field Note Added',
      description: newInteractionNote.trim(),
      actor: 'Admin',
      badgeText: newInteractionType.toUpperCase(),
      badgeColor: newInteractionType === 'call' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
    };
    setCustomEvents(prev => [newEvt, ...prev]);
    
    // Also append to current notes
    const updatedNotes = currentNotes 
      ? `${currentNotes}\n• [${newInteractionType.toUpperCase()} - ${timestamp}] ${newInteractionNote.trim()}`
      : `• [${newInteractionType.toUpperCase()} - ${timestamp}] ${newInteractionNote.trim()}`;
    setCurrentNotes(updatedNotes);
    if (onSaveNotes) {
      onSaveNotes(visitor.id, updatedNotes);
    }
    setNewInteractionNote('');
    setIsAddingInteraction(false);
    showLocalToast('Interaction logged to timeline.');
  };

  const handleTemplateChange = (template: 'confirmation' | 'driver' | 'reminder' | 'custom') => {
    setSmsTemplate(template);
    if (template === 'confirmation') {
      setSmsText(
        `Dear ${visitor.name}, your site tour for ${visitor.projectName} is confirmed on ${visitor.visitDate || '2026-09-14'} at ${visitor.reportingTime}. Transport: ${visitor.vehicleNo || 'PAL Fleet'}. Representative: ${visitor.salesman}. PAL Site Security.`
      );
    } else if (template === 'driver') {
      setSmsText(
        `Dear ${visitor.name}, your transport pickup for ${visitor.projectName} is ready. Driver: ${visitor.driverName || 'Alamgir Hossain'}. Vehicle: ${visitor.vehicleNo || 'PAL Fleet'}. Please be ready at ${visitor.pickupLocation}.`
      );
    } else if (template === 'reminder') {
      setSmsText(
        `Dear ${visitor.name}, gentle reminder for your scheduled project inspection at ${visitor.projectName} today at ${visitor.reportingTime}. Our team is ready to welcome you.`
      );
    } else {
      setSmsText('');
    }
  };

  const handleSendShortText = () => {
    if (!smsText.trim()) {
      showLocalToast('Please type a short text message before sending.');
      return;
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const targetPhone = smsRecipient === 'client' ? visitor.phone : (visitor.driverName ? 'Driver' : visitor.phone);
    const logEntry = `\n[Short Text / SMS sent to ${smsRecipient} (${targetPhone}) at ${timestamp}: "${smsText.trim()}"]`;
    
    const updatedNotes = (visitor.notes || '') + logEntry;
    if (onSaveNotes) {
      onSaveNotes(visitor.id, updatedNotes);
    }
    setCurrentNotes(updatedNotes);

    // Add to history
    const newEvt: TimelineEvent = {
      id: `evt-${Date.now()}`,
      timestamp,
      timeAgo: 'Just now',
      type: 'sms',
      title: `SMS Sent to ${smsRecipient === 'client' ? 'Client' : 'Driver'}`,
      description: `"${smsText.trim()}"`,
      actor: 'PAL SMS Gateway',
      badgeText: 'Delivered',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    };
    setCustomEvents(prev => [newEvt, ...prev]);

    setShowSmsComposer(false);
    showLocalToast(`Short text / SMS successfully dispatched to ${targetPhone}.`);
  };

  const handleConfirmSalesmanChange = (officer: typeof AVAILABLE_SALES_OFFICERS[0]) => {
    if (onUpdateSalesman) {
      onUpdateSalesman(visitor.id, officer.name, officer.team);
    } else {
      onAssignSalesman(visitor.id);
    }
    setShowSalesmanModal(false);
    showLocalToast(`Assigned sales representative to ${officer.name}`);

    // Add to history
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEvt: TimelineEvent = {
      id: `evt-${Date.now()}`,
      timestamp,
      timeAgo: 'Just now',
      type: 'salesman',
      title: 'Sales Officer Reassigned',
      description: `Reassigned from ${visitor.salesman} to ${officer.name} (${officer.team})`,
      actor: 'Admin'
    };
    setCustomEvents(prev => [newEvt, ...prev]);
  };

  const handleConfirmFleetChange = () => {
    if (onUpdateFleet) {
      onUpdateFleet(visitor.id, selectedVehicle, selectedDriver, selectedTripStatus);
    }
    setShowFleetModal(false);
    showLocalToast('Fleet and driver allocation updated.');

    // Add to history
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEvt: TimelineEvent = {
      id: `evt-${Date.now()}`,
      timestamp,
      timeAgo: 'Just now',
      type: 'fleet',
      title: 'Fleet & Driver Updated',
      description: `Vehicle: ${selectedVehicle} | Driver: ${selectedDriver} | Status: ${selectedTripStatus}`,
      actor: 'Logistics Desk'
    };
    setCustomEvents(prev => [newEvt, ...prev]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Site Visit Scheduled':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'First Contact':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Visit Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Booking Confirmed':
        return 'bg-emerald-600 text-white border-emerald-700 shadow-2xs font-extrabold';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getVehicleBadge = (vStatus: string) => {
    switch (vStatus) {
      case 'Vehicle Conflict':
        return 'bg-red-100 text-red-700 border-red-300 animate-pulse';
      case 'Assigned':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'En Route':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'On Site':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Base Timeline Events
  const baseTimelineEvents: TimelineEvent[] = [
    {
      id: 'base-1',
      timestamp: 'Today, 10:45 AM',
      timeAgo: '1 hr ago',
      type: 'status',
      title: `Status: ${visitor.status}`,
      description: `Status marked as ${visitor.status}. Ready for site inspection.`,
      actor: 'Admin',
      badgeText: visitor.status,
      badgeColor: 'bg-purple-50 text-purple-700 border border-purple-200'
    },
    {
      id: 'base-2',
      timestamp: 'Today, 09:30 AM',
      timeAgo: '2 hrs ago',
      type: 'sms',
      title: 'Reminder SMS Sent',
      description: `Sent visit reminder for ${visitor.projectName} on ${visitor.visitDate || 'scheduled date'}.`,
      actor: 'SMS Gateway',
      badgeText: 'Delivered',
      badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    },
    {
      id: 'base-3',
      timestamp: 'Yesterday, 04:15 PM',
      timeAgo: '1 day ago',
      type: 'fleet',
      title: 'Transport & Driver Assigned',
      description: `Assigned ${visitor.vehicleNo || 'Prado'} with driver ${visitor.driverName || 'Alamgir Hossain'}. Pickup: ${visitor.pickupLocation}.`,
      actor: 'Logistics',
      badgeText: visitor.vehicleStatus,
      badgeColor: 'bg-blue-50 text-blue-700 border border-blue-200'
    },
    {
      id: 'base-4',
      timestamp: `${visitor.bookingDate || '2026-09-10'}, 02:20 PM`,
      timeAgo: '3 days ago',
      type: 'salesman',
      title: 'Salesman Assigned',
      description: `Assigned to ${visitor.salesman} (${visitor.salesTeam}).`,
      actor: 'Sales Ops'
    },
    {
      id: 'base-5',
      timestamp: `${visitor.bookingDate || '2026-09-10'}, 11:00 AM`,
      timeAgo: '3 days ago',
      type: 'booking',
      title: `Booking #${visitor.bookingId} Created`,
      description: `Registered via ${visitor.source || 'WhatsApp'} for ${visitor.projectName}. Party size: ${visitor.noOfVisitor} Pax.`,
      actor: 'System',
      badgeText: visitor.source || 'Digital Media',
      badgeColor: 'bg-gray-100 text-gray-700 border border-gray-200'
    }
  ];

  const allTimelineEvents = [...customEvents, ...baseTimelineEvents];

  const filteredTimelineEvents = allTimelineEvents.filter(evt => {
    if (historyFilter === 'all') return true;
    if (historyFilter === 'status') return evt.type === 'status' || evt.type === 'booking';
    if (historyFilter === 'sms') return evt.type === 'sms' || evt.type === 'call';
    if (historyFilter === 'fleet') return evt.type === 'fleet';
    if (historyFilter === 'notes') return evt.type === 'note';
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 border border-gray-700 animate-slide-up">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP SECTION: LEAD INFORMATION (শুরুতে লিড ইনফরমেশন থাকবে) */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        {/* Complete Lead Information Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
          {/* Header Banner */}
          <div className="p-5 bg-gradient-to-r from-amber-50/40 via-white to-gray-50/30 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-600 text-white font-black text-2xl flex items-center justify-center shadow-md shrink-0">
                  {visitor.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">{visitor.name}</h1>
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-800 border border-gray-300 font-bold">
                      {visitor.bookingId}
                    </span>
                    <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(visitor.status)}`}>
                      {visitor.status}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getVehicleBadge(visitor.vehicleStatus)}`}>
                      Vehicle: {visitor.vehicleStatus}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-2.5 flex-wrap">
                    <span>SL #{visitor.sl}</span>
                    <span>•</span>
                    <span>{visitor.category || 'Digital Media'}</span>
                    <span>•</span>
                    <span>Booked {visitor.bookingDate}</span>
                    <span>•</span>
                    <span className="text-amber-800 font-bold">{visitor.noOfVisitor} Pax</span>
                    <span>•</span>
                    <span>{visitor.branch || 'Dhaka'}</span>
                  </p>
                </div>
              </div>

              {/* Quick Communication Badge Pill & Status */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-gray-200 shadow-2xs">
                  <span className="text-xs font-bold text-gray-500">Status:</span>
                  <select
                    value={visitor.status}
                    onChange={(e) => onUpdateStatus(visitor.id, e.target.value)}
                    className="text-xs font-bold bg-transparent text-gray-800 focus:outline-none cursor-pointer py-1"
                  >
                    <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                    <option value="First Contact">First Contact</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Visit Completed">Visit Completed</option>
                    <option value="Booking Confirmed">Booking Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <a
                  href={`tel:${visitor.phone}`}
                  className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Call Visitor"
                >
                  <PhoneCall size={14} className="text-emerald-700" />
                  <span>{visitor.phone}</span>
                </a>
                {visitor.whatsapp && (
                  <a
                    href={`https://wa.me/${visitor.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl border border-teal-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    title="Open WhatsApp Chat"
                  >
                    <MessageSquare size={14} className="text-teal-600" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Lead Information Grid: 4 Structured Pillars */}
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* 1. Customer Contacts */}
            <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-200/70 space-y-2.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Contact</span>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate">
                    <Phone size={13} className="text-amber-600 shrink-0" />
                    <span className="font-bold text-gray-900">{visitor.phone}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(visitor.phone, 'Phone')}
                    className="text-gray-400 hover:text-amber-700 p-1 rounded hover:bg-gray-200/70 cursor-pointer"
                    title="Copy Phone"
                  >
                    <Copy size={12} />
                  </button>
                </div>

                {visitor.email && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate">
                      <Mail size={13} className="text-gray-400 shrink-0" />
                      <a href={`mailto:${visitor.email}`} className="font-medium text-gray-700 truncate hover:underline" title={visitor.email}>
                        {visitor.email}
                      </a>
                    </div>
                    <button
                      onClick={() => copyToClipboard(visitor.email || '', 'Email')}
                      className="text-gray-400 hover:text-amber-700 p-1 rounded hover:bg-gray-200/70 cursor-pointer"
                      title="Copy Email"
                    >
                      <Copy size={12} />
                    </button>
                  </div>
                )}

                <div className="pt-1 flex items-center justify-between text-[11px] border-t border-gray-200/60">
                  <span className="text-gray-500">Channel:</span>
                  <span className="font-bold text-teal-800">{visitor.whatsapp ? 'WhatsApp / SMS' : 'Direct Call'}</span>
                </div>
              </div>
            </div>

            {/* 2. Lead Source & Attribution */}
            <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-200/70 space-y-2.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Source & Referral</span>
              
              <div className="space-y-1.5">
                <div>
                  <span className="text-gray-500 text-[11px]">Source:</span>
                  <p className="font-bold text-gray-900">{visitor.source || 'Direct Walk-in'}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-[11px]">Referrer:</span>
                  <p className="font-medium text-gray-800 truncate">
                    {visitor.referrerName ? `${visitor.referrerName}` : 'Direct Lead'}
                  </p>
                </div>
                <div className="pt-1 flex items-center justify-between text-[11px] border-t border-gray-200/60">
                  <span className="text-gray-500">Branch:</span>
                  <span className="font-bold text-gray-800">{visitor.branch || 'Dhaka'}</span>
                </div>
              </div>
            </div>

            {/* 3. Destination Project & Unit Specs */}
            <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-200/70 space-y-2.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Project</span>
              
              <div className="space-y-1.5">
                <p className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                  <Building2 size={15} className="text-amber-600 shrink-0" />
                  <span className="truncate">{visitor.projectName}</span>
                </p>
                {visitor.unitSpec && (
                  <p className="text-amber-900 font-semibold text-[11px] bg-amber-50/80 px-2 py-1 rounded border border-amber-100">
                    {visitor.unitSpec}
                  </p>
                )}
                <div className="pt-1 flex items-center justify-between text-[11px] border-t border-gray-200/60">
                  <span className="text-gray-500">Guide:</span>
                  <span className="font-bold text-emerald-800 truncate">{visitor.projectRepresentative || 'Engr. Mahbubul'}</span>
                </div>
              </div>
            </div>

            {/* 4. Schedule & Pickup Location */}
            <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-200/70 space-y-2.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Schedule & Pickup</span>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-gray-900 font-bold">
                  <Calendar size={13} className="text-amber-600 shrink-0" />
                  <span>{visitor.visitDate}</span>
                  <Clock size={13} className="text-amber-600 shrink-0 ml-1" />
                  <span>{visitor.reportingTime}</span>
                </div>

                <div className="flex items-start gap-1 text-gray-700 text-[11px]">
                  <MapPin size={13} className="text-rose-600 shrink-0 mt-0.5" />
                  <span className="truncate" title={visitor.pickupLocation}>{visitor.pickupLocation}</span>
                </div>

                <div className="pt-1 flex items-center justify-between text-[11px] border-t border-gray-200/60">
                  <span className="text-gray-500">Host:</span>
                  <span className="font-bold text-gray-900 truncate">{visitor.salesman}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. NEXT SECTION: 2-COLUMN DESIGN (তারপরের সেকশন থেকে ২ কলামে ডিজাইন হবে)   */}
      {/* Left: History (বামপাশে হিস্টোরি আসবে)                                      */}
      {/* Right: Quick Operations, Salesman, Vehicle, Driver, Note, Actions         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ======================================================================= */}
        {/* LEFT COLUMN: VISIT HISTORY & TIMELINE (বামপাশে হিস্টোরি আসবে)             */}
        {/* ======================================================================= */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
            {/* Header & Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
                  <History size={16} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <span>Visit Activity</span>
                    <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                      {allTimelineEvents.length} logs
                    </span>
                  </h2>
                  <p className="text-[11px] text-gray-500">
                    Chronological audit trail of all updates, communications & logistics
                  </p>
                </div>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              <button
                type="button"
                onClick={() => setHistoryFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  historyFilter === 'all'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({allTimelineEvents.length})
              </button>
              <button
                type="button"
                onClick={() => setHistoryFilter('status')}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  historyFilter === 'status'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Status
              </button>
              <button
                type="button"
                onClick={() => setHistoryFilter('sms')}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  historyFilter === 'sms'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Messages & Calls
              </button>
              <button
                type="button"
                onClick={() => setHistoryFilter('fleet')}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  historyFilter === 'fleet'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Logistics
              </button>
              <button
                type="button"
                onClick={() => setHistoryFilter('notes')}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  historyFilter === 'notes'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Notes & Remarks
              </button>
            </div>

            {/* Vertical Timeline List */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
              {filteredTimelineEvents.length === 0 ? (
                <div className="py-8 text-center text-gray-400 italic text-xs">
                  No activity logs matching the selected filter.
                </div>
              ) : (
                filteredTimelineEvents.map((evt) => {
                  let icon = <CheckCircle2 size={13} />;
                  let iconBg = 'bg-gray-500 text-white';

                  if (evt.type === 'status') {
                    icon = <CheckCircle2 size={13} />;
                    iconBg = 'bg-purple-600 text-white';
                  } else if (evt.type === 'sms') {
                    icon = <Send size={12} />;
                    iconBg = 'bg-emerald-600 text-white';
                  } else if (evt.type === 'fleet') {
                    icon = <Car size={13} />;
                    iconBg = 'bg-blue-600 text-white';
                  } else if (evt.type === 'salesman') {
                    icon = <UserCheck size={13} />;
                    iconBg = 'bg-amber-600 text-white';
                  } else if (evt.type === 'call') {
                    icon = <PhoneCall size={12} />;
                    iconBg = 'bg-cyan-600 text-white';
                  } else if (evt.type === 'gatepass') {
                    icon = <Printer size={12} />;
                    iconBg = 'bg-orange-600 text-white';
                  } else if (evt.type === 'booking') {
                    icon = <ShieldCheck size={13} />;
                    iconBg = 'bg-amber-700 text-white';
                  } else {
                    icon = <FileText size={12} />;
                    iconBg = 'bg-indigo-600 text-white';
                  }

                  return (
                    <div key={evt.id} className="relative group">
                      {/* Timeline Dot */}
                      <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full ${iconBg} flex items-center justify-center ring-4 ring-white shadow-xs`}>
                        {icon}
                      </div>

                      {/* Timeline Content Card */}
                      <div className="p-3.5 rounded-xl bg-gray-50/70 hover:bg-gray-50 border border-gray-200/80 transition-all space-y-1.5 text-xs">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{evt.title}</span>
                            {evt.badgeText && (
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${evt.badgeColor || 'bg-gray-200 text-gray-800'}`}>
                                {evt.badgeText}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-gray-400 font-medium">{evt.timestamp}</span>
                        </div>

                        <p className="text-gray-700 text-xs leading-relaxed whitespace-pre-line">{evt.description}</p>

                        <div className="pt-1 flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-200/60">
                          <span>By <strong className="text-gray-600">{evt.actor}</strong></span>
                          <span className="uppercase tracking-wider font-semibold text-gray-400">{evt.type}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: ACTIVITY FORM (ডানপাশে এক্টিভিটি ফর্ম)                       */}
        {/* ======================================================================= */}
        <div className="lg:col-span-5 space-y-5">
          {/* ======================================================================= */}
          {/* DIRECT ACTION SHORTCUTS CARD (ভিজিট এক্টিভিটি ফর্ম এর উপরে কার্ড)            */}
          {/* ======================================================================= */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
                  <Sparkles size={15} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-900">Direct Action Shortcuts</h2>
                  <p className="text-[11px] text-gray-500">Instant 1-click visitor and tour operations</p>
                </div>
              </div>
            </div>

            {/* Quick 1-Click Operations Grid */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  onPrintGatePass(visitor);
                  showLocalToast('Opening Gate Pass printing layout...');
                  addTimelineEvent('gatepass', 'Gate Pass Issued', `Security gate pass printed for booking #${visitor.bookingId}.`, 'Gate Pass', 'bg-orange-100 text-orange-800');
                }}
                className="w-full py-2.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center shadow-2xs"
              >
                <Printer size={14} className="shrink-0 text-amber-700" />
                <span className="truncate">Gate Pass</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSmsComposer(true)}
                className="w-full py-2.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center shadow-2xs"
              >
                <Send size={14} className="shrink-0 text-emerald-700" />
                <span className="truncate">Send SMS</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onReschedule(visitor);
                  addTimelineEvent('status', 'Visit Reschedule Dialog', 'Reschedule process initiated for this visit.', 'Reschedule', 'bg-blue-100 text-blue-800');
                }}
                className="w-full py-2.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center shadow-2xs"
              >
                <CalendarDays size={14} className="shrink-0 text-blue-700" />
                <span className="truncate">Reschedule</span>
              </button>
            </div>

            {/* Instant Status Shortcuts */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setFormStatus('Visit Completed');
                  onUpdateStatus(visitor.id, 'Visit Completed');
                  showLocalToast('Visit marked as Completed.');
                  addTimelineEvent('status', 'Visit Completed', 'Status updated to Visit Completed.', 'Completed', 'bg-emerald-100 text-emerald-800');
                }}
                className="w-full py-2.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
              >
                <CheckCircle2 size={14} className="shrink-0" />
                <span>Visit Completed</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormStatus('Booking Confirmed');
                  onUpdateStatus(visitor.id, 'Booking Confirmed');
                  showLocalToast('Unit Booking Confirmed!');
                  addTimelineEvent('booking', 'Booking Confirmed', 'Unit booking confirmed.', 'Confirmed', 'bg-amber-500 hover:bg-amber-600 text-white font-bold');
                }}
                className="w-full py-2.5 px-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
              >
                <CheckCircle2 size={14} className="shrink-0" />
                <span>Confirm Booking</span>
              </button>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* VISIT ACTIVITY FORM (ভিজিট এক্টিভিটি ফর্ম)                                */}
          {/* ======================================================================= */}
          <form
            onSubmit={handleSubmitActivity}
            className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4"
          >
            {/* Form Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                  <Edit3 size={15} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-900">Visit Activity Form</h2>
                  <p className="text-[11px] text-gray-500">Record notes, update status & log history</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getStatusBadge(formStatus)}`}>
                {formStatus}
              </span>
            </div>

            {/* Visit Status Dropdown */}
            <div className="space-y-1.5">
              <label htmlFor="form-status-select" className="text-[11px] font-bold text-gray-700 flex items-center justify-between">
                <span>Visit Status</span>
                <span className="text-[10px] text-gray-400">Current: {visitor.status}</span>
              </label>
              <select
                id="form-status-select"
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value)}
                className="w-full text-xs p-2.5 bg-gray-50 hover:bg-white border border-gray-300 rounded-xl font-bold text-gray-800 focus:ring-2 focus:ring-amber-500 focus:bg-white focus:outline-none transition-all cursor-pointer shadow-2xs"
              >
                <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                <option value="Driver Assigned">Driver Assigned</option>
                <option value="En Route">En Route</option>
                <option value="On Site">On Site</option>
                <option value="Visit Completed">Visit Completed</option>
                <option value="Booking Confirmed">Booking Confirmed</option>
                <option value="Follow-up Required">Follow-up Required</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* 3. Salesman Assignment */}
            <div className="space-y-1.5">
              <label htmlFor="form-salesman-select" className="text-[11px] font-bold text-gray-700 flex items-center justify-between">
                <span>Sales Officer</span>
                {formSalesman && formSalesman !== 'Unassigned' ? (
                  <span className="text-[10px] text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {formSalesman}
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-400 font-bold bg-gray-100 px-2 py-0.5 rounded">
                    Unassigned
                  </span>
                )}
              </label>
              <select
                id="form-salesman-select"
                value={formSalesman === 'Unassigned' ? '' : formSalesman}
                onChange={(e) => {
                  setFormSalesman(e.target.value);
                  setSelectedSalesman(e.target.value);
                }}
                className="w-full text-xs p-2.5 bg-gray-50 hover:bg-white border border-gray-300 rounded-xl font-bold text-gray-800 focus:ring-2 focus:ring-amber-500 focus:bg-white focus:outline-none transition-all cursor-pointer shadow-2xs"
              >
                <option value="">-- Select Sales Officer --</option>
                {AVAILABLE_SALES_OFFICERS.map((officer) => (
                  <option key={officer.name} value={officer.name}>
                    {officer.name} — {officer.team}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Fleet & Chauffeur Logistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <label htmlFor="form-car-select" className="text-[11px] font-bold text-gray-700 block">
                  Vehicle
                </label>
                <select
                  id="form-car-select"
                  value={formVehicle}
                  onChange={(e) => {
                    setFormVehicle(e.target.value);
                    setSelectedVehicle(e.target.value);
                  }}
                  className="w-full text-xs p-2.5 bg-gray-50 hover:bg-white border border-gray-300 rounded-xl font-bold text-gray-800 focus:ring-2 focus:ring-amber-500 focus:bg-white focus:outline-none transition-all cursor-pointer shadow-2xs truncate"
                >
                  <option value="">-- Select Vehicle --</option>
                  {AVAILABLE_FLEET_VEHICLES.map((veh) => (
                    <option key={veh.vehicleNo} value={veh.vehicleNo}>
                      {veh.vehicleNo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="form-driver-select" className="text-[11px] font-bold text-gray-700 block">
                  Driver
                </label>
                <select
                  id="form-driver-select"
                  value={formDriver}
                  onChange={(e) => {
                    setFormDriver(e.target.value);
                    setSelectedDriver(e.target.value);
                  }}
                  className="w-full text-xs p-2.5 bg-gray-50 hover:bg-white border border-gray-300 rounded-xl font-bold text-gray-800 focus:ring-2 focus:ring-amber-500 focus:bg-white focus:outline-none transition-all cursor-pointer shadow-2xs truncate"
                >
                  <option value="">-- Select Driver --</option>
                  {AVAILABLE_DRIVERS.map((dr) => {
                    const driverStr = `${dr.name} (${dr.phone})`;
                    return (
                      <option key={dr.name} value={driverStr}>
                        {dr.name} ({dr.phone})
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* 5. Pick-up Location */}
            <div className="space-y-1.5">
              <label htmlFor="form-pickup-select" className="text-[11px] font-bold text-gray-700 block">
                Pick-up Location
              </label>
              <select
                id="form-pickup-select"
                value={formPickupLocation}
                onChange={(e) => {
                  setFormPickupLocation(e.target.value);
                  setSelectedPickupLocation(e.target.value);
                }}
                className="w-full text-xs p-2.5 bg-gray-50 hover:bg-white border border-gray-300 rounded-xl font-bold text-gray-800 focus:ring-2 focus:ring-amber-500 focus:bg-white focus:outline-none transition-all cursor-pointer shadow-2xs"
              >
                <option value="">-- Select Pick-up Location --</option>
                {AVAILABLE_PICKUP_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* 6. Activity Remarks & Notes */}
            <div className="space-y-1.5 pt-1 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label htmlFor="form-notes-input" className="text-[11px] font-bold text-gray-700 block">
                  Activity Remarks & Discussion Notes
                </label>
                <span className="text-[10px] text-gray-400">
                  {formNotes.length} characters
                </span>
              </div>
              <textarea
                id="form-notes-input"
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                rows={3}
                placeholder="Write visit notes, conversation summary, client requirements, or inspection feedback..."
                className="w-full text-xs p-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all leading-relaxed text-gray-800"
              />

              {/* Quick Template Chips */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                {QUICK_NOTE_CHIPS.slice(0, 4).map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleAppendFormChip(chip)}
                    className="text-[10px] bg-gray-100 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200 border border-gray-200 px-2 py-0.5 rounded-lg text-gray-600 transition-colors cursor-pointer"
                  >
                    + {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* 7. Action Buttons (Submit & Reset) */}
            <div className="pt-2 flex items-center gap-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleResetForm}
                className="px-3.5 py-2.5 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border border-gray-200"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>

              <button
                type="submit"
                className="flex-1 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Check size={14} />
                <span>Save & Log Activity</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: CHANGE SALESMAN (Action)                                         */}
      {/* ========================================================================= */}
      {showSalesmanModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 text-xs animate-scale-up border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <UserCheck size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Assign Sales Representative</h3>
                  <p className="text-[11px] text-gray-500">Select dedicated executive for {visitor.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowSalesmanModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-2">
              {AVAILABLE_SALES_OFFICERS.map((officer) => {
                const isSelected = visitor.salesman === officer.name;
                return (
                  <button
                    key={officer.name}
                    onClick={() => handleConfirmSalesmanChange(officer)}
                    className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/70 shadow-2xs'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        {officer.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{officer.name}</p>
                        <p className="text-[11px] text-gray-500">{officer.team} • {officer.role}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Current</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowSalesmanModal(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CHANGE FLEET & DRIVER (Action)                                   */}
      {/* ========================================================================= */}
      {showFleetModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 text-xs animate-scale-up border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  <Car size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Update Fleet & Driver Logistics</h3>
                  <p className="text-[11px] text-gray-500">Assign vehicle, driver, and logistics trip status</p>
                </div>
              </div>
              <button
                onClick={() => setShowFleetModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>

            {/* Select Vehicle */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Select Transport Vehicle</label>
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {AVAILABLE_FLEET_VEHICLES.map((veh) => {
                  const isSelected = selectedVehicle.includes(veh.vehicleNo.split(' ')[0]) || selectedVehicle === veh.vehicleNo;
                  return (
                    <button
                      key={veh.vehicleNo}
                      type="button"
                      onClick={() => setSelectedVehicle(veh.vehicleNo)}
                      className={`w-full p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                        isSelected ? 'border-blue-500 bg-blue-50/70 font-bold' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-gray-900">{veh.vehicleNo}</p>
                        <p className="text-[11px] text-gray-500">{veh.type} • Capacity: {veh.capacity}</p>
                      </div>
                      {isSelected && <Check size={14} className="text-blue-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Select Driver */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Select Designated Chauffeur</label>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_DRIVERS.map((dr) => {
                  const driverStr = `${dr.name} (${dr.phone})`;
                  const isSelected = selectedDriver.includes(dr.name);
                  return (
                    <button
                      key={dr.name}
                      type="button"
                      onClick={() => setSelectedDriver(driverStr)}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected ? 'border-blue-500 bg-blue-50/70 font-bold text-blue-950' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <p className="font-bold text-gray-900">{dr.name}</p>
                      <p className="text-[11px] text-gray-500">{dr.phone}</p>
                      <p className="text-[10px] text-gray-400">{dr.exp}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trip Logistics Status */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Trip Logistics Status</label>
              <div className="grid grid-cols-4 gap-1.5">
                {['Standby', 'Assigned', 'En Route', 'On Site'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSelectedTripStatus(st)}
                    className={`py-2 px-2 text-center rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
                      selectedTripStatus === st
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowFleetModal(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmFleetChange}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-2xs cursor-pointer transition-all flex items-center gap-1.5"
              >
                <Check size={14} />
                <span>Save Allocation</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: SEND SHORT TEXT (SMS)                                            */}
      {/* ========================================================================= */}
      {showSmsComposer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 text-xs animate-scale-up border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Send size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Send Short Text (SMS)</h3>
                  <p className="text-[11px] text-gray-500">Dispatch instant SMS alert to client or transport driver</p>
                </div>
              </div>
              <button
                onClick={() => setShowSmsComposer(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>

            {/* Recipient Selection */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Recipient</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSmsRecipient('client')}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    smsRecipient === 'client' 
                      ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 font-bold' 
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="block text-[10px] text-gray-400 uppercase">Customer</span>
                  <span className="text-xs">{visitor.name} ({visitor.phone})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSmsRecipient('driver')}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    smsRecipient === 'driver' 
                      ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 font-bold' 
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="block text-[10px] text-gray-400 uppercase">Assigned Driver</span>
                  <span className="text-xs">{visitor.driverName || 'Md. Alamgir'} ({visitor.vehicleNo || 'Fleet Vehicle'})</span>
                </button>
              </div>
            </div>

            {/* Template Selector */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Short Text Template</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleTemplateChange('confirmation')}
                  className={`px-2.5 py-1.5 text-[11px] rounded-lg border transition-colors cursor-pointer text-center ${
                    smsTemplate === 'confirmation' ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Confirmation
                </button>
                <button
                  type="button"
                  onClick={() => handleTemplateChange('driver')}
                  className={`px-2.5 py-1.5 text-[11px] rounded-lg border transition-colors cursor-pointer text-center ${
                    smsTemplate === 'driver' ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Driver Details
                </button>
                <button
                  type="button"
                  onClick={() => handleTemplateChange('reminder')}
                  className={`px-2.5 py-1.5 text-[11px] rounded-lg border transition-colors cursor-pointer text-center ${
                    smsTemplate === 'reminder' ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Visit Reminder
                </button>
                <button
                  type="button"
                  onClick={() => handleTemplateChange('custom')}
                  className={`px-2.5 py-1.5 text-[11px] rounded-lg border transition-colors cursor-pointer text-center ${
                    smsTemplate === 'custom' ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Custom
                </button>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Message Text</label>
              <textarea
                value={smsText}
                onChange={(e) => setSmsText(e.target.value)}
                rows={4}
                placeholder="Type your short text / SMS message here..."
                className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed text-gray-800"
              />
              <div className="flex items-center justify-between text-[11px] text-gray-500">
                <span>{smsText.length} characters ({Math.ceil(smsText.length / 160) || 1} SMS unit)</span>
                <span className="text-emerald-700 font-semibold">Gateway: PAL High-Speed SMS Gateway</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowSmsComposer(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendShortText}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Send size={13} />
                <span>Send SMS Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
