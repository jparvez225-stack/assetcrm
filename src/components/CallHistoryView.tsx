import React, { useState } from 'react';
import { CallLog, Lead } from '../types';
import { 
  ArrowLeft, 
  Plus, 
  Download, 
  Search,
  Filter,
  PhoneCall, 
  Calendar, 
  Clock, 
  User, 
  Building, 
  Mail, 
  MessageSquare,
  Play,
  Phone,
  MessageCircle,
  Eye,
  CheckCircle2
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedResult, setSelectedResult] = useState('All');

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLogForView, setSelectedLogForView] = useState<CallLog | null>(null);

  // Form states
  const [targetLeadName, setTargetLeadName] = useState(selectedLead?.name || 'Tanvir Ahmed');
  const [targetPhone, setTargetPhone] = useState(selectedLead?.phone || '+8801711223344');
  const [targetProject, setTargetProject] = useState(selectedLead?.projectName || 'Purbachal Green Valley');
  const [nextDate, setNextDate] = useState('2026-08-06');
  const [interactionType, setInteractionType] = useState('Call');
  const [callResult, setCallResult] = useState<'Interested' | 'Follow-up' | 'Site Visit' | 'Busy' | 'Booked/Sold' | 'Lost'>('Interested');
  const [notes, setNotes] = useState('');

  const filteredLogs = callLogs.filter(log => {
    const matchesSearch = log.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.phone.includes(searchTerm);
    const matchesType = selectedType === 'All' || log.type === selectedType;
    const matchesResult = selectedResult === 'All' || log.callResult === selectedResult || log.type === selectedResult;
    return matchesSearch && matchesType && matchesResult;
  });

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes) {
      alert('Please enter interaction notes');
      return;
    }

    const newLog: CallLog = {
      id: `cl_${Date.now()}`,
      leadId: selectedLead?.id || `ld_${Date.now()}`,
      leadName: targetLeadName,
      projectName: targetProject,
      phone: targetPhone,
      email: selectedLead?.email || 'client@example.com',
      type: interactionType as any,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      notes: notes,
      nextFollowUpDate: nextDate,
      callResult: callResult
    };

    onAddCallLog(newLog);
    setNotes('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-5 max-w-full font-sans">
      {/* Top Title & Header Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Lead Activities & Call Logs</h1>
          <p className="text-xs text-gray-500">Track client communications, phone logs, meetings, and site visits</p>
        </div>

        <div className="flex items-center gap-2">
          {selectedLead && (
            <button 
              onClick={onBack}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft size={14} />
              <span>Back to Leads</span>
            </button>
          )}
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
            style={{ backgroundColor: '#D4AF37' }}
          >
            <Plus size={14} />
            <span>Add Activity Log</span>
          </button>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Total Interactions</span>
          <p className="text-2xl font-extrabold text-gray-900">{callLogs.length + 120}</p>
          <p className="text-[9px] text-amber-700 font-bold">ALL TIMELINE LOGS</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Follow-ups Today</span>
          <p className="text-2xl font-extrabold text-amber-800">18</p>
          <p className="text-[9px] text-amber-700 font-bold">SCHEDULED TODAY</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Site Visits</span>
          <p className="text-2xl font-extrabold text-emerald-600">34</p>
          <p className="text-[9px] text-emerald-700 font-bold">COMPLETED VISITS</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Booked / Converted</span>
          <p className="text-2xl font-extrabold text-gray-900">12</p>
          <p className="text-[9px] text-gray-400">HOT CLOSURES</p>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-3">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Search & Filters</h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by client name, phone or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
          >
            <option value="All">Interaction Type: All</option>
            <option value="Call">Phone Call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="SiteVisit">Physical Site Visit</option>
            <option value="Meeting">Office Meeting</option>
          </select>

          <select
            value={selectedResult}
            onChange={(e) => setSelectedResult(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
          >
            <option value="All">Call Result: All</option>
            <option value="Interested">Interested (Hot)</option>
            <option value="Follow-up">Follow-up Needed</option>
            <option value="Site Visit">Site Visit Scheduled</option>
            <option value="Booked/Sold">Booked / Sold</option>
          </select>
        </div>
      </div>

      {/* Data Table of Activity Logs */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <span className="text-xs font-bold text-gray-800">Lead Activity Logs ({filteredLogs.length} Total)</span>
          <span className="text-[11px] text-gray-500">Real-Time Interaction Feed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/70 text-[10px] font-bold text-gray-600 uppercase border-b border-gray-200 tracking-wider">
                <th className="py-2.5 px-3">SL</th>
                <th className="py-2.5 px-3">Lead Profile</th>
                <th className="py-2.5 px-3">Project / Course</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Date & Time</th>
                <th className="py-2.5 px-3">Next Follow-Up</th>
                <th className="py-2.5 px-3 text-center">Result</th>
                <th className="py-2.5 px-3">Notes</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {filteredLogs.map((log, index) => (
                <tr key={log.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="py-3 px-3 font-bold text-gray-400">0{index + 1}</td>
                  <td className="py-3 px-3 font-bold text-gray-900">
                    <p>{log.leadName}</p>
                    <p className="text-[10px] text-gray-500">{log.phone}</p>
                  </td>
                  <td className="py-3 px-3 text-gray-800 max-w-xs truncate">{log.projectName}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-blue-800">
                      {log.type || 'Call'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-500">
                    <p>{log.date}</p>
                    <p className="text-[10px] text-gray-400">{log.time}</p>
                  </td>
                  <td className="py-3 px-3 font-semibold text-amber-800">
                    {log.nextFollowUpDate || 'August 06, 2026'}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                      {log.callResult || log.type || 'Interested'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-600 max-w-xs truncate" title={log.notes}>
                    {log.notes}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => setSelectedLogForView(log)}
                      className="px-2.5 py-1 text-[10px] font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors inline-flex items-center gap-1"
                    >
                      <Eye size={11} />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Activity Log Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-5 w-full max-w-lg space-y-4 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-base text-gray-900">Add New Activity Log</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleSaveLog} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Lead Name *</label>
                  <input 
                    type="text" 
                    value={targetLeadName}
                    onChange={(e) => setTargetLeadName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Phone Number *</label>
                  <input 
                    type="text" 
                    value={targetPhone}
                    onChange={(e) => setTargetPhone(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Project Name</label>
                <input 
                  type="text" 
                  value={targetProject}
                  onChange={(e) => setTargetProject(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Interaction Type</label>
                  <select
                    value={interactionType}
                    onChange={(e) => setInteractionType(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                  >
                    <option value="Call">Direct Phone Call</option>
                    <option value="WhatsApp">WhatsApp Chat</option>
                    <option value="SiteVisit">Physical Site Visit</option>
                    <option value="Meeting">Office Meeting</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Next Follow-Up Date</label>
                  <input
                    type="date"
                    value={nextDate}
                    onChange={(e) => setNextDate(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Interaction Status / Result</label>
                <select
                  value={callResult}
                  onChange={(e) => setCallResult(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                >
                  <option value="Interested">Interested (Hot Lead)</option>
                  <option value="Follow-up">Follow-up Needed</option>
                  <option value="Site Visit">Site Visit Scheduled</option>
                  <option value="Busy">Busy / Callback Later</option>
                  <option value="Booked/Sold">Booked / Sold Plot</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Activity Notes *</label>
                <textarea
                  rows={3}
                  placeholder="Enter specific conversation notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Save Activity Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Activity Log Entry Modal */}
      {selectedLogForView && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-5 w-full max-w-md space-y-4 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-gray-900">{selectedLogForView.leadName}</h3>
                <span className="text-[10px] text-amber-700 font-bold uppercase">Log ID: {selectedLogForView.id}</span>
              </div>
              <button onClick={() => setSelectedLogForView(null)} className="text-gray-400 font-bold text-sm">✕</button>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">Phone</span>
                  <span className="font-semibold text-gray-900">{selectedLogForView.phone}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">Interaction Type</span>
                  <span className="font-bold text-blue-700">{selectedLogForView.type || 'Call'}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">Date & Time</span>
                  <span className="font-semibold">{selectedLogForView.date} • {selectedLogForView.time}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">Next Follow-Up</span>
                  <span className="font-bold text-amber-800">{selectedLogForView.nextFollowUpDate || 'N/A'}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-400 text-[10px] font-bold block mb-1">Project</span>
                <span className="font-semibold text-gray-900">{selectedLogForView.projectName}</span>
              </div>

              <div>
                <span className="text-gray-400 text-[10px] font-bold block mb-1">Logged Note</span>
                <p className="bg-amber-50/50 p-2.5 rounded border border-amber-200/50 text-gray-800 italic">
                  {selectedLogForView.notes}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button 
                onClick={() => setSelectedLogForView(null)}
                className="px-4 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
