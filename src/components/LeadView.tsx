import React, { useState } from 'react';
import { Lead, NavItem, LEAD_STATUS_LIST, LeadStatus } from '../types';
import { mockSalesmen } from '../mockData';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Building,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Eye,
  Download,
  Share2,
  Edit3,
  Zap,
  AlertCircle,
  Star,
  UserPlus,
  CheckSquare,
  Square,
  X,
  Check
} from 'lucide-react';

interface LeadViewProps {
  leads: Lead[];
  onNavigate: (nav: NavItem) => void;
  onSelectLead: (lead: Lead) => void;
  onEditLead: (lead: Lead | null) => void;
  onAssignSalesman: (leadId: string, salesman: string) => void;
}

export const LeadView: React.FC<LeadViewProps> = ({ 
  leads, 
  onNavigate, 
  onSelectLead,
  onEditLead,
  onAssignSalesman 
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Facebook' | 'WhatsApp' | 'Youtube' | 'Portal'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedSalesStatus] = useState('All');
  const [selectedProject, setSelectedProjectFilter] = useState('All');
  const [activeActionRow, setActiveActionRow] = useState<string | null>(null);

  // Bulk Selection & Assignment State
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [singleAssignLeadId, setSingleAssignLeadId] = useState<string | null>(null);
  const [selectedSalesmanName, setSelectedSalesmanName] = useState(mockSalesmen[0]?.name || 'Md. Rahim Sarder');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const filteredLeads = leads.filter(l => {
    const matchesTab = activeTab === 'All' || l.source === activeTab;
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.phone.includes(searchTerm) ||
                          l.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || l.status === selectedStatus;
    const matchesProject = selectedProject === 'All' || l.projectName.includes(selectedProject);
    return matchesTab && matchesSearch && matchesStatus && matchesProject;
  });

  const isAllSelected = filteredLeads.length > 0 && filteredLeads.every(l => selectedLeadIds.includes(l.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(filteredLeads.map(l => l.id));
    }
  };

  const toggleSelectLead = (id: string) => {
    setSelectedLeadIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleExecuteBulkAssign = () => {
    const idsToAssign = singleAssignLeadId ? [singleAssignLeadId] : selectedLeadIds;
    if (idsToAssign.length === 0) return;

    idsToAssign.forEach(id => {
      onAssignSalesman(id, selectedSalesmanName);
    });

    const msg = idsToAssign.length === 1 
      ? `Lead assigned to ${selectedSalesmanName} successfully!`
      : `Successfully assigned ${idsToAssign.length} leads to ${selectedSalesmanName}!`;
    
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);

    setSelectedLeadIds([]);
    setSingleAssignLeadId(null);
    setShowAssignModal(false);
  };

  return (
    <div className="space-y-5 max-w-full font-sans">
      {/* Add Lead Action Bar */}
      <div className="flex justify-end items-center gap-2">
        <button 
          onClick={() => alert('Exporting leads data...')}
          className="px-3.5 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <Download size={14} />
          <span>Import / Export</span>
        </button>
        <button 
          onClick={() => {
            onEditLead(null);
            onNavigate('add-lead');
          }}
          className="px-4 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
          style={{ backgroundColor: '#c7a259' }}
        >
          <Plus size={14} />
          <span>+ Add Lead</span>
        </button>
      </div>

      {/* Top 5 Metric Cards matching exact reference design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Leads */}
        <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Zap size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Leads</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-blue-50/50 rounded-xl p-2.5 text-left border border-blue-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-blue-600">TOTAL</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">8565</span>
            </div>
            <div className="bg-blue-50/50 rounded-xl p-2.5 text-left border border-blue-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-blue-600">TODAY</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">0</span>
            </div>
          </div>
          <Zap size={85} className="absolute -right-4 -bottom-4 text-blue-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 2: Bookings */}
        <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <UserCheck size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Bookings</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-purple-50/50 rounded-xl p-2.5 text-left border border-purple-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-purple-600">TOTAL</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">271</span>
            </div>
            <div className="bg-purple-50/50 rounded-xl p-2.5 text-left border border-purple-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-purple-600">TODAY</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">7</span>
            </div>
          </div>
          <UserCheck size={85} className="absolute -right-4 -bottom-4 text-purple-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 3: Follow Up & Interested */}
        <div className="bg-white rounded-2xl p-4 border border-orange-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Share2 size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide truncate">Follow Up & Interested</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-orange-50/50 rounded-xl p-2.5 text-left border border-orange-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-orange-600">TOTAL</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">993</span>
            </div>
            <div className="bg-orange-50/50 rounded-xl p-2.5 text-left border border-orange-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-orange-600">TODAY</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">19</span>
            </div>
          </div>
          <Share2 size={85} className="absolute -right-4 -bottom-4 text-orange-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 4: Lost Leads */}
        <div className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <AlertCircle size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Lost Leads</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-indigo-50/50 rounded-xl p-2.5 text-left border border-indigo-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-indigo-700">TOTAL</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">1658</span>
            </div>
            <div className="bg-indigo-50/50 rounded-xl p-2.5 text-left border border-indigo-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-indigo-700">TODAY</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">0</span>
            </div>
          </div>
          <AlertCircle size={85} className="absolute -right-4 -bottom-4 text-indigo-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 5: Status */}
        <div className="bg-white rounded-2xl p-4 border border-cyan-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Star size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Status</span>
          </div>
          <div className="z-10">
            <div className="bg-cyan-50/50 rounded-xl p-2.5 text-left border border-cyan-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-cyan-600">CONVERSION</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">3.16%</span>
            </div>
          </div>
          <Star size={85} className="absolute -right-4 -bottom-4 text-cyan-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* Filter Row Box matching PDF Page 18 */}
      <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-3">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Filters</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <select
            value={selectedProject}
            onChange={(e) => setSelectedProjectFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          >
            <option value="All">Select Project</option>
            <option value="Purbachal">Purbachal Green Valley</option>
            <option value="Bashundhara">Bashundhara Luxury Heights</option>
            <option value="Gulshan">Gulshan Avenue Commercial Plaza</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedSalesStatus(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium"
          >
            <option value="All">All Lead Statuses</option>
            {LEAD_STATUS_LIST.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          <select
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          >
            <option value="Dhaka">Search Branch (Dhaka)</option>
            <option value="Uttara">Uttara Branch</option>
            <option value="Chittagong">Chittagong Branch</option>
          </select>
        </div>
      </div>

      {/* Success Toast Notification */}
      {successToast && (
        <div className="bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-md flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2 text-xs font-bold">
            <Check size={16} />
            <span>{successToast}</span>
          </div>
          <button 
            onClick={() => setSuccessToast(null)}
            className="text-white/80 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Bulk Action Bar - Visible when leads are selected */}
      {selectedLeadIds.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-300 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-950 font-bold text-xs">
            <CheckSquare size={18} className="text-amber-700" />
            <span>{selectedLeadIds.length} Lead{selectedLeadIds.length > 1 ? 's' : ''} Selected</span>
            <span className="text-gray-400 font-normal">|</span>
            <button 
              onClick={toggleSelectAll}
              className="text-amber-800 hover:underline font-semibold"
            >
              {isAllSelected ? 'Deselect All' : 'Select All Filtered'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSingleAssignLeadId(null);
                setShowAssignModal(true);
              }}
              className="px-4 py-1.5 text-xs font-bold text-white rounded-lg shadow-sm hover:opacity-90 transition-all flex items-center gap-1.5"
              style={{ backgroundColor: '#c7a259' }}
            >
              <UserPlus size={14} />
              <span>Assign Salesman ({selectedLeadIds.length})</span>
            </button>
            <button
              onClick={() => setSelectedLeadIds([])}
              className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Main Leads Table Container matching PDF Page 18 */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-800">Lead List ({filteredLeads.length} Total)</span>
            {selectedLeadIds.length > 0 && (
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                {selectedLeadIds.length} selected
              </span>
            )}
          </div>
          <span className="text-[11px] text-gray-500">Export PDF / Excel</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/70 text-[10px] font-bold text-gray-600 uppercase border-b border-gray-200 tracking-wider">
                <th className="py-2.5 px-3 text-center">
                  <input 
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    title="Select All / Deselect All"
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer accent-amber-600"
                  />
                </th>
                <th className="py-2.5 px-3">SI</th>
                <th className="py-2.5 px-3 text-center">Action</th>
                <th className="py-2.5 px-3">Lead Profile</th>
                <th className="py-2.5 px-3">Referrer</th>
                <th className="py-2.5 px-3">Project</th>
                <th className="py-2.5 px-3">Source</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Branch</th>
                <th className="py-2.5 px-3">Salesman</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {filteredLeads.map((l, index) => {
                const isSelected = selectedLeadIds.includes(l.id);
                return (
                  <tr 
                    key={l.id} 
                    className={`transition-colors ${isSelected ? 'bg-amber-50/50' : 'hover:bg-amber-50/20'}`}
                  >
                    <td className="py-3 px-3 text-center">
                      <input 
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectLead(l.id)}
                        className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer accent-amber-600"
                      />
                    </td>
                    <td className="py-3 px-3 font-bold text-gray-400">{l.sl || `0${index + 1}`}</td>
                    <td className="py-3 px-3 text-center relative">
                      <div className="inline-block text-left">
                        <button
                          onClick={() => setActiveActionRow(activeActionRow === l.id ? null : l.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-full shadow-2xs transition-all focus:outline-none"
                        >
                          <span>Action</span>
                          <ChevronDown size={11} />
                        </button>

                        {activeActionRow === l.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setActiveActionRow(null)} 
                            />
                            <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 text-left text-xs">
                              <button
                                onClick={() => {
                                  setActiveActionRow(null);
                                  onSelectLead(l);
                                  onNavigate('call-history');
                                }}
                                className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-emerald-50 text-emerald-800 font-medium"
                              >
                                <Eye size={13} className="text-emerald-600" />
                                <span>View Details</span>
                              </button>
                              <button
                                onClick={() => {
                                  setActiveActionRow(null);
                                  setSingleAssignLeadId(l.id);
                                  setShowAssignModal(true);
                                }}
                                className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-amber-50 text-amber-800 font-medium border-t border-gray-100"
                              >
                                <UserPlus size={13} className="text-amber-600" />
                                <span>Assign Salesman</span>
                              </button>
                              <button
                                onClick={() => {
                                  setActiveActionRow(null);
                                  onEditLead(l);
                                  onNavigate('add-lead');
                                }}
                                className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-gray-50 text-gray-800 font-medium border-t border-gray-100"
                              >
                                <Edit3 size={13} className="text-gray-600" />
                                <span>Edit</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-bold text-gray-900">{l.name}</p>
                      <p className="text-[10px] text-gray-500">Phone: {l.phone}</p>
                      <p className="text-[10px] text-emerald-700 font-semibold">WhatsApp: {l.phone}</p>
                      <p className="text-[10px] text-gray-400">{l.email}</p>
                    </td>
                    <td className="py-3 px-3 text-gray-500">Direct / Self</td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-gray-800">{l.projectName}</p>
                      <p className="text-[10px] text-amber-700 font-bold">{l.requiredPlotSize} • {l.facingPreference}</p>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        {l.source}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-600">Digital Media</td>
                    <td className="py-3 px-3 text-gray-600">Dhaka</td>
                    <td className="py-3 px-3 font-semibold text-gray-800">
                      <div className="flex items-center justify-between gap-1 group">
                        <span>{l.assignedSalesman}</span>
                        <button
                          onClick={() => {
                            setSingleAssignLeadId(l.id);
                            setShowAssignModal(true);
                          }}
                          title="Reassign Salesman"
                          className="text-gray-400 hover:text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit3 size={12} />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-block whitespace-nowrap ${
                        (l.status === 'Closed Won' || l.status === 'Payment Completed' || l.status === 'Agreement Signed' || l.status === 'Booking Confirmed' || l.status === 'Booking') ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        l.status === 'Closed Lost' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                        (l.status === 'Site Visit Scheduled' || l.status === 'Site Visit Completed' || l.status === 'Negotiation') ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                        (l.status === 'Interested' || l.status === 'Highly Interested' || l.status === 'Brochure & Price Shared') ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                        (l.status === 'Follow-up Scheduled' || l.status === 'Callback Requested' || l.status === 'First Contact' || l.status === 'Contacted') ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                        (l.status === 'New Lead' || l.status === 'Assigned') ? 'bg-sky-100 text-sky-800 border border-sky-300' :
                        'bg-orange-100 text-orange-800 border border-orange-300'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-500 max-w-xs truncate" title={l.note}>
                      {l.note}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination matching PDF Page 18 */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-center gap-2 text-xs font-semibold text-gray-600">
          <button className="px-2.5 py-1 rounded bg-white border border-gray-200 hover:bg-gray-100">&lt; Previous</button>
          <button className="px-2.5 py-1 rounded bg-amber-500 text-white font-bold">1</button>
          <button className="px-2.5 py-1 rounded bg-white border border-gray-200 hover:bg-gray-100">2</button>
          <button className="px-2.5 py-1 rounded bg-white border border-gray-200 hover:bg-gray-100">3</button>
          <span>...</span>
          <button className="px-2.5 py-1 rounded bg-white border border-gray-200 hover:bg-gray-100">576</button>
          <button className="px-2.5 py-1 rounded bg-white border border-gray-200 hover:bg-gray-100">Next &gt;</button>
        </div>
      </div>

      {/* Assign Salesman Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: '#c7a259' }}
                >
                  <UserPlus size={16} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900">Assign Sales Executive</h3>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {singleAssignLeadId 
                      ? `Assign lead: ${leads.find(l => l.id === singleAssignLeadId)?.name}`
                      : `Assign ${selectedLeadIds.length} selected lead${selectedLeadIds.length > 1 ? 's' : ''}`
                    }
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowAssignModal(false);
                  setSingleAssignLeadId(null);
                }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Select Sales Executive
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {mockSalesmen.map(s => {
                    const isSelected = selectedSalesmanName === s.name;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelectedSalesmanName(s.name)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected 
                            ? 'border-amber-500 bg-amber-50/50 shadow-2xs' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={s.avatar} 
                            alt={s.name} 
                            className="w-9 h-9 rounded-full object-cover border border-gray-200"
                          />
                          <div>
                            <p className="text-xs font-bold text-gray-900">{s.name}</p>
                            <p className="text-[10px] text-gray-500">{s.title}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                            {s.totalLeadAssign} Leads
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowAssignModal(false);
                  setSingleAssignLeadId(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200/60 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteBulkAssign}
                className="px-5 py-2 text-xs font-bold text-white rounded-xl shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
                style={{ backgroundColor: '#c7a259' }}
              >
                <Check size={14} />
                <span>Confirm Assignment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
