import React, { useState } from 'react';
import { Lead, NavItem } from '../types';
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
  Eye,
  Download,
  Share2
} from 'lucide-react';

interface LeadViewProps {
  leads: Lead[];
  onNavigate: (nav: NavItem) => void;
  onSelectLead: (lead: Lead) => void;
  onAssignSalesman: (leadId: string, salesman: string) => void;
}

export const LeadView: React.FC<LeadViewProps> = ({ 
  leads, 
  onNavigate, 
  onSelectLead,
  onAssignSalesman 
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Facebook' | 'WhatsApp' | 'Youtube' | 'Portal'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedSalesStatus] = useState('All');
  const [selectedProject, setSelectedProjectFilter] = useState('All');

  const filteredLeads = leads.filter(l => {
    const matchesTab = activeTab === 'All' || l.source === activeTab;
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.phone.includes(searchTerm) ||
                          l.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || l.status === selectedStatus;
    const matchesProject = selectedProject === 'All' || l.projectName.includes(selectedProject);
    return matchesTab && matchesSearch && matchesStatus && matchesProject;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 font-sans">
      {/* Top Title & Add Lead Action Bar matching PDF Page 18 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Leads Overview</h1>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert('Exporting leads data...')}
            className="px-3.5 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>Import / Export</span>
          </button>
          <button 
            onClick={() => onNavigate('add-lead')}
            className="px-4 py-1.5 text-xs font-bold text-white rounded-md shadow-xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
            style={{ backgroundColor: '#D4AF37' }}
          >
            <Plus size={14} />
            <span>+ Add Lead</span>
          </button>
        </div>
      </div>

      {/* Hero Stat Badges matching PDF Pages 7, 15, 18 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-2xs">
          <p className="text-[10px] text-blue-100 font-bold uppercase tracking-wider">Leads</p>
          <p className="text-2xl font-extrabold mt-0.5">8,558</p>
          <p className="text-[9px] text-blue-200 mt-1">TOTAL: 8,558 | TODAY: 0</p>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-700 text-white shadow-2xs">
          <p className="text-[10px] text-purple-100 font-bold uppercase tracking-wider">Enrolment</p>
          <p className="text-2xl font-extrabold mt-0.5">264</p>
          <p className="text-[9px] text-purple-200 mt-1">TOTAL: 264 | TODAY: 0</p>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-2xs">
          <p className="text-[10px] text-amber-100 font-bold uppercase tracking-wider">Follow Up & Interested</p>
          <p className="text-2xl font-extrabold mt-0.5">974</p>
          <p className="text-[9px] text-amber-200 mt-1">TOTAL: 974 | TODAY: 10</p>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-800 to-slate-900 text-white shadow-2xs">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">Lost Leads</p>
          <p className="text-2xl font-extrabold mt-0.5">1,642</p>
          <p className="text-[9px] text-gray-400 mt-1">TOTAL: 1,642 | TODAY: 0</p>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-2xs col-span-2 sm:col-span-1">
          <p className="text-[10px] text-teal-100 font-bold uppercase tracking-wider">Conversion Status</p>
          <p className="text-2xl font-extrabold mt-0.5">3.08%</p>
          <p className="text-[9px] text-teal-200 mt-1">CONVERSION RATE</p>
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
            <option value="All">Select Project / Course</option>
            <option value="Purbachal">Purbachal Green Valley</option>
            <option value="Bashundhara">Bashundhara Luxury Heights</option>
            <option value="Gulshan">Gulshan Avenue Commercial Plaza</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedSalesStatus(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          >
            <option value="All">Select Status</option>
            <option value="Enrolled">Enrolled / Booked</option>
            <option value="Contacted">Contacted</option>
            <option value="Follow Up">Follow Up</option>
            <option value="New">New</option>
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

      {/* Main Leads Table Container matching PDF Page 18 */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <span className="text-xs font-bold text-gray-800">Lead List ({filteredLeads.length} Total)</span>
          <span className="text-[11px] text-gray-500">Export PDF / Excel</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/70 text-[10px] font-bold text-gray-600 uppercase border-b border-gray-200 tracking-wider">
                <th className="py-2.5 px-3">SI</th>
                <th className="py-2.5 px-3 text-center">Action</th>
                <th className="py-2.5 px-3">Lead Profile</th>
                <th className="py-2.5 px-3">Referrer</th>
                <th className="py-2.5 px-3">Project / Course</th>
                <th className="py-2.5 px-3">Source</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Branch</th>
                <th className="py-2.5 px-3">Counselor</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {filteredLeads.map((l, index) => (
                <tr key={l.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="py-3 px-3 font-bold text-gray-400">{l.sl || `0${index + 1}`}</td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => {
                        onSelectLead(l);
                        onNavigate('call-history');
                      }}
                      className="px-3 py-1 text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors shadow-2xs"
                    >
                      Action
                    </button>
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
                  <td className="py-3 px-3 font-semibold text-gray-800">{l.assignedSalesman}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      l.status === 'Enrolled' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      l.status === 'Contacted' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                      l.status === 'Follow Up' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-500 max-w-xs truncate" title={l.note}>
                    {l.note}
                  </td>
                </tr>
              ))}
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
    </div>
  );
};
