import React, { useState } from 'react';
import { CallLog, Lead } from '../types';
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
  Send,
  Phone,
  MessageCircle,
  FileText
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
  const [nextDate, setNextDate] = useState('2026-08-06');
  const [callResult, setCallResult] = useState<'Interested' | 'Follow-up' | 'Site Visit' | 'Busy' | 'Booked/Sold' | 'Lost'>('Interested');
  const [notes, setNotes] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const leadName = selectedLead?.name || 'Jitu Guha';
  const leadId = selectedLead?.id || '202625067';
  const projectName = selectedLead?.projectName || 'Web Application Development using PHP, Laravel & Vue JS';
  const email = selectedLead?.email || 'jitu.guha@gmail.com';
  const phone = selectedLead?.phone || '+8801317371778';
  const address = selectedLead?.address || 'Gopalganj shodor';

  const filteredLogs = callLogs.filter(log => log.leadName === leadName || log.leadId === leadId);

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes) {
      alert('Please enter interaction notes');
      return;
    }

    const newLog: CallLog = {
      id: `cl_${Date.now()}`,
      leadId: leadId,
      leadName: leadName,
      projectName: projectName,
      phone: phone,
      email: email,
      type: callResult === 'Booked/Sold' ? 'Enrolled' : (callResult as any),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      time: '12:19 PM',
      notes: notes,
      nextFollowUpDate: nextDate,
      callResult: callResult
    };

    onAddCallLog(newLog);
    setNotes('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 font-sans">
      {/* Header with Back button matching Page 14 */}
      <div className="flex items-center gap-3 pb-2 border-b border-gray-200/60">
        <button 
          onClick={onBack}
          className="p-1.5 bg-white border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Manage Lead Interaction</h1>
      </div>

      {/* Top Client Card Layout matching Page 14 */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
        <h2 className="text-lg font-extrabold text-gray-900">{leadName}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1 text-xs">
          <div>
            <span className="font-bold text-gray-400 uppercase tracking-wider block mb-1.5 text-[10px]">Contact Information</span>
            <div className="space-y-1 text-gray-700">
              <p className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span className="font-semibold text-gray-900">{phone}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Address</span>
                <span className="font-semibold text-gray-800">{address}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Branch</span>
                <span className="font-semibold text-gray-800">Dhaka</span>
              </p>
            </div>
          </div>

          <div>
            <span className="font-bold text-gray-400 uppercase tracking-wider block mb-1.5 text-[10px]">Course & Source</span>
            <div className="space-y-1 text-gray-700">
              <p className="flex justify-between gap-2">
                <span className="text-gray-500 shrink-0">Course / Plot</span>
                <span className="font-semibold text-gray-900 text-right truncate">{projectName}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px]">New</span>
              </p>
            </div>
          </div>

          <div>
            <span className="font-bold text-gray-400 uppercase tracking-wider block mb-1.5 text-[10px]">Referrer Details</span>
            <p className="text-gray-500 italic">No direct referrer listed</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Timeline, Right Quick Actions & Add Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Activity Timeline */}
        <div className="lg:col-span-2 space-y-3">
          <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs">
            <h3 className="font-bold text-gray-900 text-sm">Activity Timeline</h3>
            <p className="text-[11px] text-gray-500">Track all interactions and follow-up with this lead</p>
          </div>

          <div className="space-y-3">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <div key={log.id} className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-extrabold bg-blue-100 text-blue-800">
                      {log.type || 'New'}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">ID: {log.id}</span>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    {log.notes}
                  </p>

                  <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 space-y-0.5">
                    <p><strong>Next Follow-up:</strong> {log.nextFollowUpDate || 'August 04, 2026'}</p>
                    <p><strong>Created At:</strong> {log.date} • {log.time}</p>
                    <p><strong>Time Duration:</strong> 00:00:00</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-xs text-gray-500">
                No activity logs recorded yet. Use the form on the right to log activity.
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Quick Actions & + Add Activity Log Form Widget */}
        <div className="space-y-4">
          {/* Quick Actions Pills matching Page 14 */}
          <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-gray-800">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => alert(`Calling ${phone}...`)}
                className="py-2 px-3 text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-950 rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Phone size={13} />
                <span>Call</span>
              </button>

              <button 
                onClick={() => window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank')}
                className="py-2 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <MessageCircle size={13} />
                <span>WhatsApp</span>
              </button>

              <button 
                onClick={() => alert(`SMS to ${phone}`)}
                className="py-2 px-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <MessageSquare size={13} />
                <span>Message</span>
              </button>

              <button 
                onClick={() => window.open(`mailto:${email}`)}
                className="py-2 px-3 text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Mail size={13} />
                <span>Email</span>
              </button>
            </div>
          </div>

          {/* + Add Activity Log Form matching Page 14 */}
          <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-gray-900">+ Add Activity Log</h3>

            <form onSubmit={handleSaveLog} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Next Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={nextDate}
                    onChange={(e) => setNextDate(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Interaction Type</label>
                <select
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
                >
                  <option value="Call">Direct Phone Call</option>
                  <option value="WhatsApp">WhatsApp Chat</option>
                  <option value="SiteVisit">Physical Site Visit</option>
                  <option value="Meeting">Office Meeting</option>
                </select>
              </div>

              {/* Call Duration with Timer Button */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Call Duration</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs font-mono font-bold text-gray-800 text-center">
                    00:00:00
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Play size={12} />
                    <span>Start</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Status</label>
                <select
                  value={callResult}
                  onChange={(e) => setCallResult(e.target.value as any)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
                >
                  <option value="Interested">Interested (Hot Lead)</option>
                  <option value="Follow-up">Follow-up Needed</option>
                  <option value="Site Visit">Site Visit Scheduled</option>
                  <option value="Busy">Busy / Callback Later</option>
                  <option value="Booked/Sold">Booked / Sold Plot</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Note</label>
                <textarea
                  rows={3}
                  placeholder="Enter Activity Notes...."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500 placeholder-gray-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 text-xs font-bold text-white rounded-md shadow-xs transition-opacity hover:opacity-90 mt-2"
                style={{ backgroundColor: '#D4AF37' }}
              >
                Save Activity
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

