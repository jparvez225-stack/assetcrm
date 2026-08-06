import React, { useState, useEffect } from 'react';
import { CallLog, Lead, LEAD_STATUS_LIST, LeadStatus } from '../types';
import { 
  ArrowLeft, 
  Plus, 
  Download, 
  PhoneCall, 
  Calendar, 
  Clock, 
  User, 
  Building, 
  Mail, 
  MessageSquare,
  Play,
  Square,
  Send,
  Phone,
  MessageCircle,
  FileText,
  CheckCircle2,
  MapPin,
  Tag,
  Filter
} from 'lucide-react';

interface CallHistoryViewProps {
  selectedLead?: Lead;
  callLogs: CallLog[];
  onBack: () => void;
  onAddCallLog: (log: CallLog) => void;
}

export const CallHistoryView: React.FC<CallHistoryViewProps> = ({ 
  selectedLead, 
  callLogs, 
  onBack, 
  onAddCallLog 
}) => {
  const [nextDate, setNextDate] = useState('2026-08-10');
  const [interactionChannel, setInteractionChannel] = useState<'Phone Call' | 'WhatsApp' | 'Site Visit' | 'Office Meeting' | 'Email'>('Phone Call');
  const [callResult, setCallResult] = useState<LeadStatus>(selectedLead?.status || 'Contacted');
  const [budgetLimit, setBudgetLimit] = useState(selectedLead?.budgetLimit || '৳ 1.5 Crore');
  const [notes, setNotes] = useState('');
  const [timelineFilter, setTimelineFilter] = useState<string>('All');

  // Timer logic for call duration
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const leadName = selectedLead?.name || 'Jitu Guha';
  const leadId = selectedLead?.id || '202625067';
  const projectName = selectedLead?.projectName || 'Purbachal Green City';
  const email = selectedLead?.email || 'jitu.guha@gmail.com';
  const phone = selectedLead?.phone || '+8801317371778';
  const address = selectedLead?.address || 'Gopalganj shodor, Dhaka';
  const salesmanName = selectedLead?.assignedSalesman || 'Siddique Rahman';

  // Filter existing logs or create fallback logs for lead
  const existingLogs = callLogs.filter(log => log.leadName === leadName || log.leadId === leadId);

  const displayLogs: CallLog[] = existingLogs.length > 0 ? existingLogs : [
    {
      id: `fallback_1_${leadId}`,
      leadId: leadId,
      leadName: leadName,
      projectName: projectName,
      phone: phone,
      email: email,
      type: 'Booking Confirmed',
      channel: 'Office Meeting',
      date: 'August 05, 2026',
      time: '04:15 PM',
      duration: '00:45:00',
      executiveName: salesmanName,
      callResult: 'Booking Confirmed',
      nextFollowUpDate: 'August 12, 2026',
      notes: `Token Money Received: ৳ 1,00,000 via Pay Order for ${selectedLead?.requiredPlotSize || '5 Katha'} plot in ${projectName}. Money receipt issued.`
    },
    {
      id: `fallback_2_${leadId}`,
      leadId: leadId,
      leadName: leadName,
      projectName: projectName,
      phone: phone,
      email: email,
      type: 'Negotiation',
      channel: 'Office Meeting',
      date: 'August 03, 2026',
      time: '11:30 AM',
      duration: '00:30:15',
      executiveName: salesmanName,
      callResult: 'Negotiation',
      nextFollowUpDate: 'August 05, 2026',
      notes: `Head Office Discussion: Negotiated 36-month flexible installment plan and 5% spot discount on 30% down payment for ${selectedLead?.facingPreference || 'South'} facing plot.`
    },
    {
      id: `fallback_3_${leadId}`,
      leadId: leadId,
      leadName: leadName,
      projectName: projectName,
      phone: phone,
      email: email,
      type: 'Site Visit Completed',
      channel: 'Site Visit',
      date: 'August 01, 2026',
      time: '10:00 AM',
      duration: '02:15:00',
      executiveName: salesmanName,
      callResult: 'Site Visit Completed',
      nextFollowUpDate: 'August 03, 2026',
      notes: `Physical Site Visit Completed: Accompanied ${leadName} & family in AC vehicle to inspect project location. Client satisfied with road width and nearby lake development.`
    },
    {
      id: `fallback_4_${leadId}`,
      leadId: leadId,
      leadName: leadName,
      projectName: projectName,
      phone: phone,
      email: email,
      type: 'Brochure & Price Shared',
      channel: 'WhatsApp',
      date: 'July 28, 2026',
      time: '02:20 PM',
      duration: '00:05:00',
      executiveName: salesmanName,
      callResult: 'Brochure & Price Shared',
      nextFollowUpDate: 'August 01, 2026',
      notes: `WhatsApp Dispatch: Sent master plan PDF, video walkthrough, and official rate chart for ${projectName}.`
    },
    {
      id: `fallback_5_${leadId}`,
      leadId: leadId,
      leadName: leadName,
      projectName: projectName,
      phone: phone,
      email: email,
      type: 'First Contact',
      channel: 'Phone Call',
      date: 'July 26, 2026',
      time: '05:40 PM',
      duration: '00:06:42',
      executiveName: salesmanName,
      callResult: 'Contacted',
      nextFollowUpDate: 'July 28, 2026',
      notes: `Discovery Call: Inquired about plot availability, Rajuk approval documents, and handover schedule. Requested brochure on WhatsApp.`
    },
    {
      id: `fallback_6_${leadId}`,
      leadId: leadId,
      leadName: leadName,
      projectName: projectName,
      phone: phone,
      email: email,
      type: 'Assigned',
      channel: 'System',
      date: 'July 25, 2026',
      time: '09:15 AM',
      duration: '00:00:00',
      executiveName: 'System Admin',
      callResult: 'Assigned',
      nextFollowUpDate: 'July 26, 2026',
      notes: `New Lead captured via ${selectedLead?.source || 'Facebook'} campaign and assigned to Sales Executive ${salesmanName}.`
    }
  ];

  const filteredTimeline = displayLogs.filter(log => {
    if (timelineFilter === 'All') return true;
    if (timelineFilter === 'Phone Call') return log.channel === 'Phone Call' || log.type === 'Call' || log.type === 'First Contact';
    if (timelineFilter === 'WhatsApp') return log.channel === 'WhatsApp';
    if (timelineFilter === 'Site Visit') return log.channel === 'Site Visit' || log.type.includes('Site Visit');
    if (timelineFilter === 'Meeting') return log.channel === 'Office Meeting' || log.type === 'Negotiation' || log.type.includes('Booking');
    return true;
  });

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes) {
      alert('Please enter interaction notes');
      return;
    }

    if (selectedLead) {
      selectedLead.budgetLimit = budgetLimit;
      selectedLead.status = callResult;
    }

    const durationFormatted = formatTimer(timerSeconds);

    const newLog: CallLog = {
      id: `cl_${Date.now()}`,
      leadId: leadId,
      leadName: leadName,
      projectName: projectName,
      phone: phone,
      email: email,
      type: callResult,
      channel: interactionChannel,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      duration: durationFormatted !== '00:00:00' ? durationFormatted : '00:05:00',
      executiveName: salesmanName,
      notes: notes,
      nextFollowUpDate: nextDate,
      callResult: callResult
    };

    onAddCallLog(newLog);
    setNotes('');
    setTimerSeconds(0);
    setIsTimerRunning(false);
  };

  const getChannelIcon = (channel?: string, type?: string) => {
    if (channel === 'WhatsApp') return <MessageCircle size={14} className="text-emerald-600" />;
    if (channel === 'Site Visit' || (type && type.includes('Site Visit'))) return <MapPin size={14} className="text-purple-600" />;
    if (channel === 'Office Meeting' || (type && (type.includes('Negotiation') || type.includes('Booking')))) return <Building size={14} className="text-amber-600" />;
    if (channel === 'Email') return <Mail size={14} className="text-sky-600" />;
    if (channel === 'System' || type === 'Assigned') return <FileText size={14} className="text-gray-600" />;
    return <Phone size={14} className="text-indigo-600" />;
  };

  const getStatusBadgeClass = (status?: string) => {
    if (!status) return 'bg-gray-100 text-gray-700 border-gray-200';
    if (['Closed Won', 'Payment Completed', 'Agreement Signed', 'Booking Confirmed', 'Booking'].includes(status)) {
      return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
    if (status === 'Closed Lost') return 'bg-rose-100 text-rose-800 border-rose-300';
    if (['Site Visit Scheduled', 'Site Visit Completed', 'Negotiation'].includes(status)) {
      return 'bg-purple-100 text-purple-800 border-purple-300';
    }
    if (['Interested', 'Highly Interested', 'Brochure & Price Shared'].includes(status)) {
      return 'bg-blue-100 text-blue-800 border-blue-300';
    }
    if (['Follow-up Scheduled', 'Callback Requested', 'First Contact', 'Contacted'].includes(status)) {
      return 'bg-amber-100 text-amber-800 border-amber-300';
    }
    return 'bg-sky-100 text-sky-800 border-sky-300';
  };

  return (
    <div className="space-y-5 max-w-full font-sans">
      {/* Top Client Card Layout */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
              <span>{leadName}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${getStatusBadgeClass(selectedLead?.status || 'New Lead')}`}>
                {selectedLead?.status || 'New Lead'}
              </span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Assigned Executive: <strong className="text-gray-800">{salesmanName}</strong></p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-bold">
              Lead ID: {leadId}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">Budget Limit:</span>
              <span className="text-sm font-black text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                {budgetLimit}
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div>
            <span className="font-bold text-gray-400 uppercase tracking-wider block mb-1.5 text-[10px]">Contact Information</span>
            <div className="space-y-1 text-gray-700">
              <p className="flex justify-between">
                <span className="text-gray-500">Phone:</span>
                <span className="font-semibold text-gray-900">{phone}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span className="font-semibold text-gray-800">{email}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Address:</span>
                <span className="font-semibold text-gray-800">{address}</span>
              </p>
            </div>
          </div>

          <div>
            <span className="font-bold text-gray-400 uppercase tracking-wider block mb-1.5 text-[10px]">Project & Preference</span>
            <div className="space-y-1 text-gray-700">
              <p className="flex justify-between gap-2">
                <span className="text-gray-500 shrink-0">Project Name:</span>
                <span className="font-semibold text-gray-900 text-right truncate">{projectName}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Plot Size & Facing:</span>
                <span className="font-semibold text-gray-800">{selectedLead?.requiredPlotSize || '5 Katha'}, {selectedLead?.facingPreference || 'South'}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Source:</span>
                <span className="font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px]">{selectedLead?.source || 'Facebook'}</span>
              </p>
            </div>
          </div>

          <div>
            <span className="font-bold text-gray-400 uppercase tracking-wider block mb-1.5 text-[10px]">Follow-up & Activity Stats</span>
            <div className="space-y-1 text-gray-700">
              <p className="flex justify-between">
                <span className="text-gray-500">Total Interactions:</span>
                <span className="font-bold text-gray-900">{displayLogs.length} Activities</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Last Active Date:</span>
                <span className="font-semibold text-gray-800">{displayLogs[0]?.date || 'August 05, 2026'}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Next Follow-Up:</span>
                <span className="font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[10px]">{displayLogs[0]?.nextFollowUpDate || nextDate}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Timeline, Right Quick Actions & Add Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Activity Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-extrabold text-gray-900 text-sm flex items-center gap-2">
                  <span>Activity Timeline</span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[11px] font-bold">
                    {filteredTimeline.length} Entries
                  </span>
                </h3>
                <p className="text-[11px] text-gray-500">Comprehensive sequential log of all client interactions and milestones</p>
              </div>

              {/* Timeline Channel Filters */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg text-xs font-semibold">
                {['All', 'Phone Call', 'WhatsApp', 'Site Visit', 'Meeting'].map((filterName) => (
                  <button
                    key={filterName}
                    onClick={() => setTimelineFilter(filterName)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                      timelineFilter === filterName 
                        ? 'bg-white text-gray-900 shadow-2xs' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {filterName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Connected Vertical Timeline Track */}
          <div className="relative pl-6 space-y-4 before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-[2px] before:bg-gray-200">
            {filteredTimeline.length > 0 ? (
              filteredTimeline.map((log) => (
                <div key={log.id} className="relative bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-2.5 group hover:border-amber-300 transition-colors">
                  {/* Timeline Node Bullet */}
                  <div className="absolute -left-6 top-4 w-7 h-7 rounded-full bg-white border-2 border-amber-500 flex items-center justify-center shadow-2xs z-10">
                    {getChannelIcon(log.channel, log.type)}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${getStatusBadgeClass(log.callResult || log.type)}`}>
                        {log.callResult || log.type || 'Interaction'}
                      </span>
                      {log.channel && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700 flex items-center gap-1">
                          {getChannelIcon(log.channel, log.type)}
                          <span>{log.channel}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-gray-400 font-mono">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Clock size={12} />
                        <span>{log.date} at {log.time}</span>
                      </span>
                      {log.duration && log.duration !== '00:00:00' && (
                        <span className="bg-gray-50 border border-gray-200 text-gray-700 px-1.5 py-0.5 rounded font-mono font-bold text-[10px]">
                          ⏱ {log.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-800 leading-relaxed font-medium bg-gray-50/60 p-2.5 rounded-lg border border-gray-100">
                    {log.notes}
                  </p>

                  <div className="flex flex-wrap items-center justify-between pt-1 text-[11px] text-gray-500 gap-2">
                    <div className="flex items-center gap-1.5">
                      <User size={13} className="text-gray-400" />
                      <span>Log Executed By: <strong className="text-gray-800 font-bold">{log.executiveName || salesmanName}</strong></span>
                    </div>

                    {log.nextFollowUpDate && (
                      <div className="flex items-center gap-1 text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <Calendar size={12} />
                        <span>Next Follow-up: {log.nextFollowUpDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-xs text-gray-500">
                No activity logs match the selected filter. Change filter or log new activity on the right.
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Quick Actions & + Add Activity Log Form Widget */}
        <div className="space-y-4">
          {/* Quick Actions Pills matching Page 14 */}
          <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-3">
            <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">Quick Direct Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => alert(`Initiating direct outbound phone call to ${phone}...`)}
                className="py-2.5 px-3 text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-950 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Phone size={13} />
                <span>Call Phone</span>
              </button>

              <button 
                onClick={() => window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank')}
                className="py-2.5 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <MessageCircle size={13} />
                <span>WhatsApp</span>
              </button>

              <button 
                onClick={() => alert(`Sending instant SMS to ${phone}...`)}
                className="py-2.5 px-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <MessageSquare size={13} />
                <span>SMS Msg</span>
              </button>

              <button 
                onClick={() => window.open(`mailto:${email}`)}
                className="py-2.5 px-3 text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Mail size={13} />
                <span>Email Client</span>
              </button>
            </div>
          </div>

          {/* + Add Activity Log Form Widget */}
          <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-3.5">
            <div className="border-b border-gray-100 pb-2 flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
                <Plus size={16} className="text-amber-600" />
                <span>Add Activity Log</span>
              </h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Real-Time CRM</span>
            </div>

            <form onSubmit={handleSaveLog} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Interaction Channel</label>
                <select
                  value={interactionChannel}
                  onChange={(e) => setInteractionChannel(e.target.value as any)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500 font-medium"
                >
                  <option value="Phone Call">Direct Phone Call</option>
                  <option value="WhatsApp">WhatsApp Message / Document</option>
                  <option value="Site Visit">Physical Site Visit Tour</option>
                  <option value="Office Meeting">Head Office Meeting</option>
                  <option value="Email">Official Email</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Updated Lead Status</label>
                <select
                  value={callResult}
                  onChange={(e) => setCallResult(e.target.value as LeadStatus)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500 font-medium"
                >
                  {LEAD_STATUS_LIST.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Customer Budget Limit (৳)</label>
                <input
                  type="text"
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(e.target.value)}
                  placeholder="e.g. ৳ 1.5 Crore"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              {/* Call Timer Widget */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-gray-700">Interaction Timer</label>
                  <span className="text-[10px] text-gray-400 font-mono">Live Call Meter</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-md text-xs font-mono font-bold text-emerald-400 text-center tracking-wider shadow-inner">
                    {formatTimer(timerSeconds)}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 transition-colors text-white ${
                      isTimerRunning ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    {isTimerRunning ? <Square size={12} /> : <Play size={12} />}
                    <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Next Follow-Up Scheduled Date</label>
                <input
                  type="date"
                  value={nextDate}
                  onChange={(e) => setNextDate(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Detailed Discussion Notes</label>
                <textarea
                  rows={3}
                  placeholder="E.g., Client requested updated 3D plot map and discount inquiry for 5 Katha plot..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500 placeholder-gray-400 font-medium"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-extrabold text-white rounded-lg shadow-sm transition-all hover:opacity-95 flex items-center justify-center gap-1.5 mt-2"
                style={{ backgroundColor: '#c7a259' }}
              >
                <Send size={13} />
                <span>Save Activity Log</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


