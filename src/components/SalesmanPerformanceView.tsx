import React, { useState } from 'react';
import { Salesman } from '../types';
import { 
  Printer, 
  Search, 
  Plus,
  Eye,
  ArrowLeft
} from 'lucide-react';

interface SalesmanPerformanceProps {
  salesmen: Salesman[];
  onAddSalesman?: (salesman: Salesman) => void;
}

export const SalesmanPerformanceView: React.FC<SalesmanPerformanceProps> = ({ salesmen, onAddSalesman }) => {
  const [selectedSalesman, setSelectedSalesman] = useState('All');
  const [selectedProject, setSelectedProject] = useState('All');
  const [dateRange, setDateRange] = useState('This Month');
  const [searchTerm, setSearchTerm] = useState('');

  // Page state: 'list' | 'add' | 'view'
  const [pageMode, setPageMode] = useState<'list' | 'add' | 'view'>('list');
  const [selectedCounselor, setSelectedCounselor] = useState<Salesman | null>(null);

  // Add Counselor State
  const [counselorName, setCounselorName] = useState('');
  const [counselorTitle, setCounselorTitle] = useState('Executive Consultant');
  const [initialLeads, setInitialLeads] = useState('50');

  const filteredSalesmen = salesmen.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSalesman = selectedSalesman === 'All' || s.name === selectedSalesman;
    return matchesSearch && matchesSalesman;
  });

  const handleCreateCounselor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counselorName) return;

    const newSalesman: Salesman = {
      id: `sales_${Date.now()}`,
      name: counselorName,
      title: counselorTitle,
      department: 'Real Estate Sales',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
      phone: '+8801700000000',
      email: 'counselor@example.com',
      totalLeadAssign: parseInt(initialLeads) || 50,
      bookedSold: 5,
      contacted: 30,
      lost: 10,
      performanceRate: 25,
      score: '85/100'
    };

    if (onAddSalesman) {
      onAddSalesman(newSalesman);
    }
    setCounselorName('');
    setPageMode('list');
  };

  // SEPARATE PAGE: View Counselor Performance Page
  if (pageMode === 'view' && selectedCounselor) {
    return (
      <div className="space-y-6 max-w-full font-sans">
        <div className="print-only-header">
          <h2 className="text-xl font-extrabold uppercase">Promise Assets Limited</h2>
          <p className="text-sm font-bold">Property Consultant Individual Performance Scorecard</p>
          <p className="text-xs">Printed Date: {new Date().toLocaleDateString('en-GB')}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
          <button 
            onClick={() => setPageMode('list')}
            className="px-3.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5 w-fit shadow-2xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Counselors List</span>
          </button>

          <button 
            onClick={() => window.print()}
            className="px-4 py-1.5 text-xs font-bold text-amber-900 bg-white border-2 border-[#D4AF37] rounded-md hover:bg-amber-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Printer size={14} />
            <span>Print Scorecard</span>
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-6">
          <div className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src={selectedCounselor.avatar} 
                alt={selectedCounselor.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-300 shadow-xs"
              />
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Property Consultant Profile</span>
                <h2 className="text-2xl font-extrabold text-gray-900">{selectedCounselor.name}</h2>
                <p className="text-xs text-gray-500">{selectedCounselor.title} • {selectedCounselor.department}</p>
              </div>
            </div>

            <div className="bg-amber-50 px-5 py-3 rounded-xl border border-amber-200 text-right">
              <span className="text-[10px] text-amber-900 font-bold block uppercase">Conversion Rate</span>
              <span className="text-3xl font-extrabold text-amber-900">{selectedCounselor.performanceRate}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-[10px] font-bold text-gray-500 uppercase block">Total Assigned Leads</span>
              <span className="text-2xl font-extrabold text-gray-900">{selectedCounselor.totalLeadAssign}</span>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">Successful Bookings</span>
              <span className="text-2xl font-extrabold text-emerald-700">{selectedCounselor.bookedSold}</span>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <span className="text-[10px] font-bold text-blue-800 uppercase block">Contacted Leads</span>
              <span className="text-2xl font-extrabold text-blue-700">{selectedCounselor.contacted}</span>
            </div>

            <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
              <span className="text-[10px] font-bold text-rose-800 uppercase block">Lost / Closed</span>
              <span className="text-2xl font-extrabold text-rose-700">{selectedCounselor.lost}</span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">Performance Audit Notes</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Consultant <strong>{selectedCounselor.name}</strong> maintains an efficiency score of <strong>{selectedCounselor.score}</strong>. Contact ratio is {selectedCounselor.contacted}/{selectedCounselor.totalLeadAssign} with {selectedCounselor.bookedSold} plot bookings confirmed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // SEPARATE PAGE: Add Counselor Page
  if (pageMode === 'add') {
    return (
      <div className="space-y-6 max-w-2xl font-sans">
        <div className="flex items-center justify-between no-print">
          <button 
            onClick={() => setPageMode('list')}
            className="px-3.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Counselors List</span>
          </button>
          <span className="text-xs text-gray-500">Sales Executive Onboarding</span>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-5">
          <div className="border-b border-gray-200 pb-3">
            <h2 className="text-lg font-extrabold text-gray-900">Add Property Counselor & Assign Quota Page</h2>
            <p className="text-xs text-gray-500">Register new sales consultant profile and specify lead allocation quotas</p>
          </div>

          <form onSubmit={handleCreateCounselor} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Counselor Full Name *</label>
              <input 
                type="text" 
                placeholder="e.g. Sharmin Akter"
                value={counselorName}
                onChange={(e) => setCounselorName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Designation</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sr. Property Consultant"
                  value={counselorTitle}
                  onChange={(e) => setCounselorTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Initial Monthly Lead Quota</label>
                <input 
                  type="number" 
                  placeholder="50"
                  value={initialLeads}
                  onChange={(e) => setInitialLeads(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                />
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
                Save Counselor Profile
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
        <p className="text-sm font-bold">Property Consultant Sales & Lead Performance Report</p>
        <p className="text-xs">Printed Date: {new Date().toLocaleDateString('en-GB')}</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Counselor Performance Report</h1>
          <p className="text-xs text-gray-500">Track property consultant metrics, conversion rates, and sales productivity</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setPageMode('add')}
            className="px-4 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
            style={{ backgroundColor: '#D4AF37' }}
          >
            <Plus size={14} />
            <span>Add Counselor Page</span>
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-1">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Consultants</p>
          <p className="text-2xl font-extrabold text-gray-900">{salesmen.length * 10 + 300}</p>
          <p className="text-[10px] text-amber-700 font-semibold">Across 12 Regional Branches</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-1">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Active Executives</p>
          <p className="text-2xl font-extrabold text-emerald-600">130</p>
          <p className="text-[10px] text-emerald-700 font-semibold">Handling Active Inquiries</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">Top Performer</span>
            <p className="text-xs font-bold text-gray-900">Md. Rahim Sarder</p>
            <p className="text-[10px] text-gray-500">Sr. Executive Consultant</p>
          </div>
          <div className="text-right">
            <span className="text-xl font-extrabold text-emerald-600">92%</span>
            <p className="text-[10px] text-gray-400">Score</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-3 no-print">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Search & Filters</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Counselor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
            />
          </div>

          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
          >
            <option value="All">Select Project / Campaign</option>
            <option value="Purbachal">Purbachal Green Valley</option>
            <option value="Bashundhara">Bashundhara Luxury Heights</option>
            <option value="Gulshan">Gulshan Avenue Plaza</option>
          </select>

          <select
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
          >
            <option value="Dhaka">Select Branch (Dhaka)</option>
            <option value="Uttara">Uttara Branch</option>
            <option value="Chittagong">Chittagong Branch</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
          >
            <option value="This Month">Date Range: This Month</option>
            <option value="Last Month">Last Month</option>
            <option value="Year 2026">Year 2026</option>
          </select>
        </div>
      </div>

      {/* Performance Data Grid / Table */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <span className="text-xs font-bold text-gray-800">Counselor Performance Table ({filteredSalesmen.length} Total)</span>
          <span className="text-[11px] text-gray-500">Updated Real-Time</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/70 text-[10px] font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                <th className="py-2.5 px-4">Counselor Name & Designation</th>
                <th className="py-2.5 px-3 text-center">Total Lead Assign</th>
                <th className="py-2.5 px-3 text-center">Enrolment / Booked</th>
                <th className="py-2.5 px-3 text-center">Contacted</th>
                <th className="py-2.5 px-3 text-center">Lost</th>
                <th className="py-2.5 px-4 text-center">Conversion Rate (%)</th>
                <th className="py-2.5 px-4 text-center no-print">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {filteredSalesmen.map((s) => (
                <tr key={s.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="w-8 h-8 rounded-full object-cover border border-amber-300"
                      />
                      <div>
                        <p className="font-bold text-gray-900 text-xs">{s.name}</p>
                        <p className="text-[10px] text-gray-500">{s.title}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-center font-bold text-gray-800">
                    {s.totalLeadAssign}
                  </td>

                  <td className="py-3 px-3 text-center font-extrabold text-emerald-600">
                    {s.bookedSold}
                  </td>

                  <td className="py-3 px-3 text-center font-semibold text-blue-600">
                    {s.contacted}
                  </td>

                  <td className="py-3 px-3 text-center font-semibold text-rose-500">
                    {s.lost}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-extrabold text-gray-900 text-xs">
                        {s.performanceRate}%
                      </span>
                      <div className="w-20 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-300"
                          style={{ width: `${s.performanceRate}%`, backgroundColor: '#D4AF37' }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center no-print">
                    <button 
                      onClick={() => {
                        setSelectedCounselor(s);
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
