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
  Printer,
  ArrowLeft
} from 'lucide-react';

interface LeadViewProps {
  leads: Lead[];
  onNavigate: (nav: NavItem) => void;
  onSelectLead: (lead: Lead) => void;
  onAssignSalesman: (leadId: string, salesman: string) => void;
  onAddLead?: (lead: Lead) => void;
}

export const LeadView: React.FC<LeadViewProps> = ({ 
  leads, 
  onNavigate, 
  onSelectLead,
  onAssignSalesman,
  onAddLead
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Facebook' | 'WhatsApp' | 'Youtube' | 'Portal'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedSalesStatus] = useState('All');
  const [selectedProject, setSelectedProjectFilter] = useState('All');

  // Page mode: 'list' | 'add' | 'view'
  const [pageMode, setPageMode] = useState<'list' | 'add' | 'view'>('list');
  const [selectedLeadForView, setSelectedLeadForView] = useState<Lead | null>(null);

  // New Lead Form State
  const [newLeadData, setNewLeadData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    source: 'Facebook',
    category: 'Digital Media',
    branch: 'Dhaka',
    projectName: 'Purbachal Green Valley',
    requiredPlotSize: '5 Katha',
    facingPreference: 'North Facing',
    assignedSalesman: 'Md. Rahim Sarder',
    status: 'New' as Lead['status'],
    note: ''
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadData.name || !newLeadData.phone) {
      alert('Please enter Name and Phone Number');
      return;
    }

    const createdLead: Lead = {
      id: `lead_${Date.now()}`,
      sl: `0${leads.length + 1}`,
      date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
      name: newLeadData.name,
      phone: newLeadData.phone,
      email: newLeadData.email || 'lead@example.com',
      occupation: 'Business',
      nid: 'N/A',
      address: newLeadData.address || 'Dhaka, Bangladesh',
      projectName: newLeadData.projectName,
      requiredPlotSize: newLeadData.requiredPlotSize,
      facingPreference: 'North',
      budgetLimit: '৳ 1.5 Crore',
      projectType: 'Plot',
      prefTime: 'Morning',
      assignedSalesman: newLeadData.assignedSalesman,
      status: newLeadData.status as any,
      source: newLeadData.source as any,
      lastCallDate: 'Today',
      callCount: 1,
      messageCount: 0,
      note: newLeadData.note || 'New lead added to system'
    };

    if (onAddLead) {
      onAddLead(createdLead);
    }
    setPageMode('list');
    setNewLeadData({
      name: '',
      phone: '',
      email: '',
      address: '',
      source: 'Facebook',
      category: 'Digital Media',
      branch: 'Dhaka',
      projectName: 'Purbachal Green Valley',
      requiredPlotSize: '5 Katha',
      facingPreference: 'North Facing',
      assignedSalesman: 'Md. Rahim Sarder',
      status: 'New',
      note: ''
    });
  };

  const filteredLeads = leads.filter(l => {
    const matchesTab = activeTab === 'All' || l.source === activeTab;
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.phone.includes(searchTerm) ||
                          l.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || l.status === selectedStatus;
    const matchesProject = selectedProject === 'All' || l.projectName.includes(selectedProject);
    return matchesTab && matchesSearch && matchesStatus && matchesProject;
  });

  // SEPARATE PAGE: View Lead Details Page
  if (pageMode === 'view' && selectedLeadForView) {
    return (
      <div className="space-y-6 max-w-full font-sans">
        <div className="print-only-header">
          <h2 className="text-xl font-extrabold uppercase">Promise Assets Limited</h2>
          <p className="text-sm font-bold">Client Inquiry & Property Requirement Dossier</p>
          <p className="text-xs">Printed Date: {new Date().toLocaleDateString('en-GB')}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
          <button 
            onClick={() => setPageMode('list')}
            className="px-3.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5 w-fit shadow-2xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Leads Overview</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSelectLead(selectedLeadForView);
                onNavigate('call-history');
              }}
              className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-2xs transition-colors"
            >
              Log Activity / Call History
            </button>
            <button 
              onClick={() => window.print()}
              className="px-4 py-1.5 text-xs font-bold text-amber-900 bg-white border-2 border-[#D4AF37] rounded-md hover:bg-amber-50 transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <Printer size={14} />
              <span>Print Dossier</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-6">
          <div className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Real Estate Lead Dossier</span>
              <h2 className="text-2xl font-extrabold text-gray-900">{selectedLeadForView.name}</h2>
              <p className="text-xs text-gray-500 mt-0.5">Lead ID: {selectedLeadForView.id} • Created Date: {selectedLeadForView.date}</p>
            </div>

            <div className="bg-amber-50/80 px-4 py-2 rounded-xl border border-amber-200/80 text-right">
              <span className="text-[10px] text-amber-900 font-bold block uppercase">Current Pipeline Status</span>
              <span className="text-xl font-extrabold text-amber-900">{selectedLeadForView.status}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
              <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1.5">Contact Information</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">Phone Number</span>
                  <span className="font-bold text-gray-900">{selectedLeadForView.phone}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">Email Address</span>
                  <span className="font-semibold text-gray-800">{selectedLeadForView.email}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">Occupation</span>
                  <span className="font-semibold text-gray-800">{selectedLeadForView.occupation}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">Address</span>
                  <span className="font-semibold text-gray-800">{selectedLeadForView.address}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
              <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1.5">Plot & Investment Preferences</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">Project Campaign</span>
                  <span className="font-bold text-gray-900">{selectedLeadForView.projectName}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">Plot Size & Facing</span>
                  <span className="font-extrabold text-amber-800">{selectedLeadForView.requiredPlotSize} ({selectedLeadForView.facingPreference})</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">Budget Limit</span>
                  <span className="font-bold text-emerald-700">{selectedLeadForView.budgetLimit}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">Assigned Consultant</span>
                  <span className="font-semibold text-gray-900">{selectedLeadForView.assignedSalesman}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-50/40 rounded-xl border border-amber-200/60 space-y-2">
            <h3 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">Inquiry Notes & Special Instructions</h3>
            <p className="text-xs text-gray-800 font-medium leading-relaxed italic">
              "{selectedLeadForView.note || 'No specific requirements noted for this lead.'}"
            </p>
          </div>
        </div>
      </div>
    );
  }

  // SEPARATE PAGE: Add Lead Page
  if (pageMode === 'add') {
    return (
      <div className="space-y-6 max-w-3xl font-sans">
        <div className="flex items-center justify-between no-print">
          <button 
            onClick={() => setPageMode('list')}
            className="px-3.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Leads Overview</span>
          </button>
          <span className="text-xs text-gray-500">Lead Onboarding Form</span>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-5">
          <div className="border-b border-gray-200 pb-3">
            <h2 className="text-lg font-extrabold text-gray-900">Add New Real Estate Lead Page</h2>
            <p className="text-xs text-gray-500">Enter client details, plot preferences, budget limit, and assign consultant</p>
          </div>

          <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Client Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Md. Tanvir Ahmed"
                  value={newLeadData.name}
                  onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
                <input 
                  type="text" 
                  placeholder="e.g. +8801700000000"
                  value={newLeadData.phone}
                  onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="e.g. client@example.com"
                  value={newLeadData.email}
                  onChange={(e) => setNewLeadData({ ...newLeadData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Project Campaign</label>
                <select 
                  value={newLeadData.projectName}
                  onChange={(e) => setNewLeadData({ ...newLeadData, projectName: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                >
                  <option value="Purbachal Green Valley">Purbachal Green Valley</option>
                  <option value="Bashundhara Luxury Heights">Bashundhara Luxury Heights</option>
                  <option value="Gulshan Avenue Commercial Plaza">Gulshan Avenue Commercial Plaza</option>
                  <option value="Uttara Model Town Phase 4">Uttara Model Town Phase 4</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Plot Size Preference</label>
                <select 
                  value={newLeadData.requiredPlotSize}
                  onChange={(e) => setNewLeadData({ ...newLeadData, requiredPlotSize: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                >
                  <option value="3 Katha">3 Katha</option>
                  <option value="5 Katha">5 Katha</option>
                  <option value="10 Katha">10 Katha</option>
                  <option value="20 Katha">20 Katha</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Facing Preference</label>
                <select 
                  value={newLeadData.facingPreference}
                  onChange={(e) => setNewLeadData({ ...newLeadData, facingPreference: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                >
                  <option value="North Facing">North Facing</option>
                  <option value="South Facing">South Facing</option>
                  <option value="East Facing">East Facing</option>
                  <option value="Corner Plot">Corner Plot</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Assigned Consultant</label>
                <select 
                  value={newLeadData.assignedSalesman}
                  onChange={(e) => setNewLeadData({ ...newLeadData, assignedSalesman: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                >
                  <option value="Md. Rahim Sarder">Md. Rahim Sarder</option>
                  <option value="Sharmin Akter">Sharmin Akter</option>
                  <option value="Tariq Hasan">Tariq Hasan</option>
                  <option value="Nusrat Jahan">Nusrat Jahan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Requirement Notes</label>
              <textarea 
                rows={3} 
                placeholder="Enter client budget or plot location preferences..."
                value={newLeadData.note}
                onChange={(e) => setNewLeadData({ ...newLeadData, note: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setPageMode('list')}
                className="px-4 py-2 font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2 font-bold text-white rounded-md shadow-2xs"
                style={{ backgroundColor: '#D4AF37' }}
              >
                Save Lead Page
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // DEFAULT OVERVIEW LIST PAGE
  return (
    <div className="space-y-5 max-w-full font-sans">
      <div className="print-only-header">
        <h2 className="text-xl font-extrabold uppercase">Promise Assets Limited</h2>
        <p className="text-sm font-bold">Real Estate Inquiries & Leads List</p>
        <p className="text-xs">Printed Date: {new Date().toLocaleDateString('en-GB')}</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Leads Overview</h1>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.print()}
            className="px-3.5 py-1.5 text-xs font-bold text-amber-900 bg-white border-2 border-[#D4AF37] rounded-md hover:bg-amber-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>
          <button 
            onClick={() => setPageMode('add')}
            className="px-4 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
            style={{ backgroundColor: '#D4AF37' }}
          >
            <Plus size={14} />
            <span>Add Lead Page</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 no-print">
        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Total Leads</span>
          <p className="text-2xl font-extrabold text-gray-900">{leads.length + 8500}</p>
          <p className="text-[9px] text-amber-700 font-bold">TOTAL INQUIRIES</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Plot Bookings</span>
          <p className="text-2xl font-extrabold text-amber-800">264</p>
          <p className="text-[9px] text-amber-700 font-bold">CONFIRMED ALLOTMENTS</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Follow Up & Interested</span>
          <p className="text-2xl font-extrabold text-gray-900">974</p>
          <p className="text-[9px] text-amber-700 font-bold">IN PIPELINE</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Lost / Inactive</span>
          <p className="text-2xl font-extrabold text-gray-900">1,642</p>
          <p className="text-[9px] text-gray-400">UNRESPONSIVE</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Conversion Rate</span>
          <p className="text-2xl font-extrabold text-emerald-600">3.08%</p>
          <p className="text-[9px] text-amber-700 font-bold">SALES EFFICIENCY</p>
        </div>
      </div>

      {/* Filter Row Box */}
      <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-3 no-print">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Search & Filters</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-amber-500"
            />
          </div>

          <select
            value={selectedProject}
            onChange={(e) => setSelectedProjectFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Projects</option>
            <option value="Purbachal">Purbachal Green Valley</option>
            <option value="Bashundhara">Bashundhara Luxury Heights</option>
            <option value="Gulshan">Gulshan Avenue Commercial</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedSalesStatus(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Lead Statuses</option>
            <option value="New">New Lead</option>
            <option value="Contacted">Contacted</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Enrolled">Plot Booked</option>
          </select>

          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as any)}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All">Source: All Media</option>
            <option value="Facebook">Facebook Ads</option>
            <option value="WhatsApp">WhatsApp Inquiries</option>
            <option value="Youtube">YouTube Channel</option>
            <option value="Portal">Web Portal</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <span className="text-xs font-bold text-gray-800">Leads Master Table ({filteredLeads.length} Total)</span>
          <span className="text-[11px] text-gray-500">Real-Time Data</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/70 text-[10px] font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                <th className="py-2.5 px-4">SL</th>
                <th className="py-2.5 px-4">Inquirer Details</th>
                <th className="py-2.5 px-4">Project & Plot Req</th>
                <th className="py-2.5 px-4">Source</th>
                <th className="py-2.5 px-4">Counselor</th>
                <th className="py-2.5 px-4 text-center">Status</th>
                <th className="py-2.5 px-4 text-center no-print">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {filteredLeads.map((l, i) => {
                const slVal = i < 9 ? `0${i + 1}` : `${i + 1}`;
                return (
                  <tr key={l.id} className="hover:bg-amber-50/20 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-400">{slVal}</td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-gray-900">{l.name}</p>
                    <p className="text-[10px] text-gray-500">{l.phone}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-gray-900">{l.projectName}</p>
                    <p className="text-[10px] text-amber-800 font-bold">{l.requiredPlotSize} • {l.facingPreference}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                      {l.source}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-800">{l.assignedSalesman}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {l.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center no-print">
                    <button 
                      onClick={() => {
                        setSelectedLeadForView(l);
                        setPageMode('view');
                      }}
                      className="px-3.5 py-1 text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors shadow-2xs inline-flex items-center gap-1"
                    >
                      <Eye size={11} />
                      <span>View Page</span>
                    </button>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
