import React, { useState } from 'react';
import { ReferralItem, NavItem } from '../types';
import { 
  Share2, 
  Plus, 
  Printer, 
  Download, 
  Search, 
  Filter,
  Eye, 
  CheckCircle,
  Building,
  UserCheck,
  ArrowLeft
} from 'lucide-react';

interface ReferralViewProps {
  referrals: ReferralItem[];
  onNavigate: (nav: NavItem) => void;
  onAddReferral: (referral: ReferralItem) => void;
}

export const ReferralView: React.FC<ReferralViewProps> = ({ 
  referrals, 
  onNavigate, 
  onAddReferral 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  
  // Navigation inside view: 'list' | 'add' | 'view'
  const [pageMode, setPageMode] = useState<'list' | 'add' | 'view'>('list');
  const [selectedReferral, setSelectedReferral] = useState<ReferralItem | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occupation: 'Real Estate Agent',
    nid: '',
    dob: '1995-01-01',
    instituteCompany: '',
    address: 'Dhaka',
    bloodGroup: 'B+',
    bkashNumber: '',
    branch: 'Dhaka Head Office',
    referralType: 'Student/Influencer/Agent' as ReferralItem['referralType'],
  });

  const handleCreateReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill Name and Phone Number');
      return;
    }

    const newRef: ReferralItem = {
      id: `ref_${Date.now()}`,
      sl: `0${referrals.length + 1}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email || 'referral@example.com',
      occupation: formData.occupation || 'Agent',
      nid: formData.nid || 'N/A',
      dob: formData.dob || '1995-01-01',
      instituteCompany: formData.instituteCompany || 'Dhaka University',
      address: formData.address || 'Dhaka, Bangladesh',
      bloodGroup: formData.bloodGroup,
      bkashNumber: formData.bkashNumber || formData.phone,
      branch: formData.branch,
      referralType: formData.referralType,
      totalVisitors: 50,
      enrolledBookings: 12,
      interested: 25,
      date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
      commission: 12000,
      status: 'Active',
      paymentHistory: {
        totalCommission: 12000,
        withdrawn: 4000,
        currentBalance: 8000,
      }
    };

    onAddReferral(newRef);
    setPageMode('list');
    setFormData({
      name: '',
      phone: '',
      email: '',
      occupation: 'Real Estate Agent',
      nid: '',
      dob: '1995-01-01',
      instituteCompany: '',
      address: 'Dhaka',
      bloodGroup: 'B+',
      bkashNumber: '',
      branch: 'Dhaka Head Office',
      referralType: 'Student/Influencer/Agent',
    });
  };

  const filteredReferrals = referrals.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.phone.includes(searchTerm) ||
                          r.instituteCompany.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || r.referralType.includes(selectedType);
    return matchesSearch && matchesType;
  });

  const totalReferredLeads = referrals.reduce((sum, r) => sum + r.totalVisitors, 0);
  const totalCommission = referrals.reduce((sum, r) => sum + r.commission, 0);

  // SEPARATE PAGE: Referrer Detail View
  if (pageMode === 'view' && selectedReferral) {
    return (
      <div className="space-y-6 max-w-full font-sans">
        <div className="print-only-header">
          <h2 className="text-xl font-extrabold uppercase">Promise Assets Limited</h2>
          <p className="text-sm font-bold">Lead Ambassador & Affiliate Commission Sheet</p>
          <p className="text-xs">Printed Date: {new Date().toLocaleDateString('en-GB')}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
          <button 
            onClick={() => setPageMode('list')}
            className="px-3.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5 w-fit shadow-2xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Referrers List</span>
          </button>

          <button 
            onClick={() => window.print()}
            className="px-4 py-1.5 text-xs font-bold text-amber-900 bg-white border-2 border-[#D4AF37] rounded-md hover:bg-amber-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Printer size={14} />
            <span>Print Profile</span>
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-2xs space-y-6">
          <div className="border-b border-gray-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Affiliate Profile Page</span>
              <h2 className="text-2xl font-extrabold text-gray-900">{selectedReferral.name}</h2>
              <p className="text-xs text-gray-500 mt-0.5">{selectedReferral.instituteCompany} ({selectedReferral.referralType})</p>
            </div>

            <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 text-right">
              <span className="text-[10px] text-emerald-800 font-bold block uppercase">Earned Commission</span>
              <span className="text-2xl font-extrabold text-emerald-700">৳{selectedReferral.commission.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
              <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1.5">Contact & KYC Details</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">Phone</span>
                  <span className="font-bold text-gray-900">{selectedReferral.phone}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">bKash Account</span>
                  <span className="font-bold text-emerald-700">{selectedReferral.bkashNumber}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">NID Card</span>
                  <span className="font-semibold text-gray-800">{selectedReferral.nid}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">Branch</span>
                  <span className="font-semibold text-gray-800">{selectedReferral.branch}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
              <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1.5">Referral Statistics</h3>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white p-2 rounded border border-gray-200">
                  <span className="text-gray-400 text-[10px] font-bold block">Total Visitors</span>
                  <span className="font-extrabold text-gray-900 text-base">{selectedReferral.totalVisitors}</span>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <span className="text-gray-400 text-[10px] font-bold block">Booked Plots</span>
                  <span className="font-extrabold text-emerald-600 text-base">{selectedReferral.enrolledBookings}</span>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <span className="text-gray-400 text-[10px] font-bold block">Interested</span>
                  <span className="font-extrabold text-amber-800 text-base">{selectedReferral.interested}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SEPARATE PAGE: Add Referral Page
  if (pageMode === 'add') {
    return (
      <div className="space-y-6 max-w-3xl font-sans">
        <div className="flex items-center justify-between no-print">
          <button 
            onClick={() => setPageMode('list')}
            className="px-3.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Referrers List</span>
          </button>
          <span className="text-xs text-gray-500">Add Ambassador & Broker</span>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-5">
          <div className="border-b border-gray-200 pb-3">
            <h2 className="text-lg font-extrabold text-gray-900">Add New Lead Referrer / Affiliate Page</h2>
            <p className="text-xs text-gray-500">Register student ambassador, influencer, or broker profile details</p>
          </div>

          <form onSubmit={handleCreateReferral} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Mahfuzur Rahman"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
                <input 
                  type="text" 
                  placeholder="e.g. +8801700000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">NID Number</label>
                <input 
                  type="text" 
                  placeholder="1992837465"
                  value={formData.nid}
                  onChange={(e) => setFormData({ ...formData, nid: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">bKash Account Number</label>
                <input 
                  type="text" 
                  placeholder="+8801700000000"
                  value={formData.bkashNumber}
                  onChange={(e) => setFormData({ ...formData, bkashNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Institute / Company Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. BRAC University / Apex Realty"
                  value={formData.instituteCompany}
                  onChange={(e) => setFormData({ ...formData, instituteCompany: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Referral Category</label>
                <select 
                  value={formData.referralType}
                  onChange={(e) => setFormData({ ...formData, referralType: e.target.value as any })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                >
                  <option value="Student/Influencer/Agent">Student Ambassador</option>
                  <option value="Employee/Counselor">Employee / Staff</option>
                  <option value="Media/Agency">Media & Digital Agency</option>
                </select>
              </div>
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
                Save Referrer Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // DEFAULT LIST PAGE
  return (
    <div className="space-y-5 max-w-full font-sans">
      <div className="print-only-header">
        <h2 className="text-xl font-extrabold uppercase">Promise Assets Limited</h2>
        <p className="text-sm font-bold">Referral Ambassadors & Affiliates List</p>
        <p className="text-xs">Printed Date: {new Date().toLocaleDateString('en-GB')}</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Lead Referrers & Affiliates</h1>
          <p className="text-xs text-gray-500">Manage student ambassadors, influencers, real estate agents, and commissions</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setPageMode('add')}
            className="px-4 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
            style={{ backgroundColor: '#D4AF37' }}
          >
            <Plus size={14} />
            <span>Add Referrer Page</span>
          </button>
          <button 
            onClick={() => window.print()}
            className="px-3.5 py-1.5 text-xs font-bold text-amber-900 bg-white border-2 border-[#D4AF37] rounded-md hover:bg-amber-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Total Referrers</span>
          <p className="text-2xl font-extrabold text-gray-900">{referrals.length}</p>
          <p className="text-[9px] text-amber-700 font-bold">REGISTERED AFFILIATES</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Active Ambassador</span>
          <p className="text-2xl font-extrabold text-emerald-600">
            {referrals.filter(r => r.status === 'Active').length}
          </p>
          <p className="text-[9px] text-emerald-700 font-bold">ACTIVE PROMOTERS</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Referred Leads</span>
          <p className="text-2xl font-extrabold text-amber-800">{totalReferredLeads.toLocaleString()}</p>
          <p className="text-[9px] text-amber-700 font-bold">INQUIRIES ATTRIBUTED</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Commission Paid</span>
          <p className="text-2xl font-extrabold text-gray-900">৳{totalCommission.toLocaleString()}</p>
          <p className="text-[9px] text-gray-400">TOTAL DISBURSED</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-3 no-print">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Search & Filters</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search Referrer by name, phone or company..."
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
            <option value="All">Referral Category: All</option>
            <option value="Student">Student Ambassador</option>
            <option value="Influencer">Influencer / Digital Partner</option>
            <option value="Agent">Real Estate Broker</option>
          </select>
        </div>
      </div>

      {/* Referrals Data Table */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <span className="text-xs font-bold text-gray-800">Referrer List ({filteredReferrals.length} Total)</span>
          <span className="text-[11px] text-gray-500">Real-Time Data</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/70 text-[10px] font-bold text-gray-600 uppercase border-b border-gray-200 tracking-wider">
                <th className="py-2.5 px-4">SL</th>
                <th className="py-2.5 px-4">Referrer Profile</th>
                <th className="py-2.5 px-4">NID / bKash</th>
                <th className="py-2.5 px-4">Type</th>
                <th className="py-2.5 px-4 text-center">Referred Inquiries</th>
                <th className="py-2.5 px-4 text-center">Commission (৳)</th>
                <th className="py-2.5 px-4 text-center">Status</th>
                <th className="py-2.5 px-4 text-center no-print">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {filteredReferrals.map((r, i) => (
                <tr key={r.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="py-3 px-4 font-bold text-gray-400">{r.sl || `0${i+1}`}</td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-gray-900">{r.name}</p>
                    <p className="text-[10px] text-gray-500">Phone: {r.phone}</p>
                    <p className="text-[10px] text-amber-800 font-semibold">{r.instituteCompany}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-gray-800">NID: {r.nid}</p>
                    <p className="text-[10px] text-emerald-700 font-bold">bKash: {r.bkashNumber}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                      {r.referralType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-extrabold text-gray-900">
                    {r.totalVisitors}
                  </td>
                  <td className="py-3 px-4 text-center font-extrabold text-emerald-600">
                    ৳{r.commission.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center no-print">
                    <button 
                      onClick={() => {
                        setSelectedReferral(r);
                        setPageMode('view');
                      }}
                      className="px-3.5 py-1 text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors shadow-2xs inline-flex items-center gap-1"
                    >
                      <Eye size={11} />
                      <span>View Page</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
