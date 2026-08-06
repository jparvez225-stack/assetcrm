import React, { useState } from 'react';
import { ReferralItem, NavItem } from '../types';
import { 
  Share2, 
  Plus, 
  Printer, 
  Download, 
  Search, 
  UserCheck, 
  ArrowLeft, 
  Eye, 
  Building, 
  CheckCircle,
  ChevronDown,
  Calendar
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
  const [subView, setSubView] = useState<'list' | 'add' | 'details'>('list');
  const [selectedReferral, setSelectedReferral] = useState<ReferralItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [perPage, setPerPage] = useState('10');

  // New Referral Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occupation: '',
    nid: '',
    dob: '',
    instituteCompany: '',
    address: '',
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
    setSubView('list');
  };

  const filteredReferrals = referrals
    .filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            r.phone.includes(searchTerm) ||
                            (r.email && r.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            (r.instituteCompany && r.instituteCompany.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesBranch = selectedBranch === 'All' || r.branch === selectedBranch;
      const matchesStatus = selectedStatus === 'All' || r.status === selectedStatus;
      return matchesSearch && matchesBranch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === 'Visitors') {
        return b.totalVisitors - a.totalVisitors;
      }
      if (sortOrder === 'Oldest') {
        return a.id.localeCompare(b.id);
      }
      return b.id.localeCompare(a.id);
    });

  // VIEW 1: ADD NEW REFERRAL FORM
  if (subView === 'add') {
    return (
      <div className="space-y-5 max-w-full font-sans">
        <div className="flex items-center justify-start pb-2 border-b border-gray-200/60">
          <button 
            onClick={() => setSubView('list')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Referrals</span>
          </button>
        </div>

        <form onSubmit={handleCreateReferral} className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-2xs space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 border border-amber-200">
              <UserCheck size={22} />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-gray-900">Personal & Partner Information</h3>
              <p className="text-[11px] text-gray-500">Register a new referral partner or commission agent</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Full Name *</label>
              <input 
                type="text"
                placeholder="Enter Referral Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Phone Number *</label>
              <input 
                type="text"
                placeholder="e.g. 017xxxxxxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Email Address</label>
              <input 
                type="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Occupation</label>
              <input 
                type="text"
                placeholder="Agent, Engineer, Student etc"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">NID Number</label>
              <input 
                type="text"
                placeholder="Enter NID Number"
                value={formData.nid}
                onChange={(e) => setFormData({ ...formData, nid: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Bkash / Payout Mobile</label>
              <input 
                type="text"
                placeholder="e.g. 017xxxxxxxxx"
                value={formData.bkashNumber}
                onChange={(e) => setFormData({ ...formData, bkashNumber: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Company / Institute</label>
              <input 
                type="text"
                placeholder="e.g. Property Associates / Dhaka University"
                value={formData.instituteCompany}
                onChange={(e) => setFormData({ ...formData, instituteCompany: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Address</label>
              <textarea 
                rows={2}
                placeholder="Enter Present Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
            <button 
              type="button" 
              onClick={() => setSubView('list')}
              className="px-4 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs"
              style={{ backgroundColor: '#c7a259' }}
            >
              Save Referral Partner
            </button>
          </div>
        </form>
      </div>
    );
  }

  // VIEW 2: REFERRAL DETAILS
  if (subView === 'details' && selectedReferral) {
    return (
      <div className="space-y-5 max-w-full font-sans">
        <div className="flex items-center justify-between pb-2 border-b border-gray-200/60">
          <button 
            onClick={() => setSubView('list')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <ArrowLeft size={14} />
            <span>Back to List</span>
          </button>

          <button 
            className="px-3.5 py-1.5 text-xs font-bold text-white rounded-md hover:opacity-90 transition-opacity shadow-2xs"
            style={{ backgroundColor: '#c7a259' }}
          >
            Withdraw Commission
          </button>
        </div>

        {/* Top Minimal White & Gold Banner Card */}
        <div className="bg-white border border-gray-200/80 p-5 rounded-xl flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full text-white font-extrabold text-xl flex items-center justify-center border border-amber-300"
              style={{ backgroundColor: '#c7a259' }}
            >
              {selectedReferral.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-gray-900">{selectedReferral.name}</h2>
              <p className="text-xs text-gray-500">Mobile: {selectedReferral.phone}</p>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-bold text-amber-900 bg-amber-50 rounded-full border border-amber-200">
            Active Partner
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs space-y-3 text-xs">
            <h3 className="font-extrabold text-gray-900 text-sm border-b border-gray-100 pb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-y-2 text-gray-700">
              <p><span className="font-semibold text-gray-500">NID No:</span> {selectedReferral.nid}</p>
              <p><span className="font-semibold text-gray-500">Date of Birth:</span> {selectedReferral.dob}</p>
              <p><span className="font-semibold text-gray-500">Blood Group:</span> {selectedReferral.bloodGroup}</p>
              <p><span className="font-semibold text-gray-500">Occupation:</span> {selectedReferral.occupation}</p>
              <p className="col-span-2"><span className="font-semibold text-gray-500">Present Address:</span> {selectedReferral.address}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-2.5">
              <h3 className="font-bold text-gray-900 text-xs">Payment & Commission</h3>
              <div className="space-y-1.5 text-xs font-medium">
                <div className="flex justify-between bg-emerald-50 p-2 rounded text-emerald-900">
                  <span>Total Commission</span>
                  <span className="font-bold">৳{(selectedReferral.commission || 12000).toLocaleString()}</span>
                </div>
                <div className="flex justify-between bg-gray-50 p-2 rounded text-gray-800">
                  <span>Withdrawn</span>
                  <span className="font-bold">৳4,000.00</span>
                </div>
                <div className="flex justify-between bg-amber-50 p-2 rounded text-amber-900">
                  <span>Current Balance</span>
                  <span className="font-bold">৳8,000.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VIEW 3: REFERRAL TABLE LIST
  return (
    <div className="space-y-5 max-w-full font-sans">
      <div className="flex justify-end">
        <button 
          onClick={() => setSubView('add')}
          className="px-4 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
          style={{ backgroundColor: '#c7a259' }}
        >
          <Plus size={14} />
          <span>+ Add Referral</span>
        </button>
      </div>

      {/* Filters Card matching reference screenshot */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
        <h2 className="text-sm font-extrabold text-gray-900 tracking-tight">Filters</h2>

        <div className="space-y-3">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Referrers */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={15} />
              <input 
                type="text"
                placeholder="Search referrers (name, email, institute_name...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
              />
            </div>

            {/* Branch Name Dropdown */}
            <div className="relative">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none shadow-2xs"
              >
                <option value="All">Branch Name</option>
                <option value="Dhaka Head Office">Dhaka Head Office</option>
                <option value="Uttara Branch">Uttara Branch</option>
                <option value="Dhanmondi Branch">Dhanmondi Branch</option>
                <option value="Chittagong Branch">Chittagong Branch</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={15} />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none shadow-2xs"
              >
                <option value="All">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={15} />
            </div>

            {/* Sort Order Dropdown */}
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none shadow-2xs"
              >
                <option value="Newest">Sort Order</option>
                <option value="Newest">Newest First</option>
                <option value="Oldest">Oldest First</option>
                <option value="Visitors">Most Visitors</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={15} />
            </div>

            {/* Pick a Date Range */}
            <button 
              type="button"
              onClick={() => alert('Calendar date range picker')}
              className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-500 hover:text-gray-800 flex items-center justify-between transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-gray-400" />
                <span>Pick a date range</span>
              </div>
            </button>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <div className="relative sm:col-span-1">
              <select
                value={perPage}
                onChange={(e) => setPerPage(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none shadow-2xs"
              >
                <option value="10">Show Per Page</option>
                <option value="10">10 Per Page</option>
                <option value="25">25 Per Page</option>
                <option value="50">50 Per Page</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={15} />
            </div>
          </div>
        </div>
      </div>

      {/* Referral Table List */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="p-3.5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50">
          <div className="text-xs font-bold text-gray-700">
            Total Referrals ({filteredReferrals.length})
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-1">
              <Printer size={14} />
              <span>Print</span>
            </button>
            <button className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md flex items-center gap-1">
              <Download size={14} />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/70 text-[10px] font-bold text-gray-600 uppercase border-b border-gray-200 tracking-wider">
                <th className="py-2.5 px-4">SL</th>
                <th className="py-2.5 px-4">Referral Name</th>
                <th className="py-2.5 px-4 text-center">Total Visitor</th>
                <th className="py-2.5 px-4 text-center">Booked</th>
                <th className="py-2.5 px-4 text-center">Interested</th>
                <th className="py-2.5 px-4">Date</th>
                <th className="py-2.5 px-4">Commission</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {filteredReferrals.map((r, i) => (
                <tr key={r.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="py-3 px-4 font-bold text-gray-400">{r.sl || `0${i+1}`}</td>
                  <td className="py-3 px-4 font-bold text-gray-900">{r.name}</td>
                  <td className="py-3 px-4 text-center font-bold text-gray-800">{r.totalVisitors}</td>
                  <td className="py-3 px-4 text-center font-extrabold text-emerald-600">{r.enrolledBookings}</td>
                  <td className="py-3 px-4 text-center font-bold text-amber-600">{r.interested}</td>
                  <td className="py-3 px-4 text-gray-500">{r.date}</td>
                  <td className="py-3 px-4 font-extrabold text-emerald-700">৳{r.commission.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      r.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button 
                      onClick={() => {
                        setSelectedReferral(r);
                        setSubView('details');
                      }}
                      className="px-2.5 py-1 text-[10px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors shadow-2xs"
                    >
                      View Details
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

