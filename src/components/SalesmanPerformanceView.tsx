import React, { useState } from 'react';
import { Salesman } from '../types';
import { 
  Printer, 
  Download, 
  Search, 
  Filter, 
  UserCheck, 
  Award, 
  TrendingUp, 
  Users, 
  Calendar 
} from 'lucide-react';

interface SalesmanPerformanceProps {
  salesmen: Salesman[];
}

export const SalesmanPerformanceView: React.FC<SalesmanPerformanceProps> = ({ salesmen }) => {
  const [selectedSalesman, setSelectedSalesman] = useState('All');
  const [selectedProject, setSelectedProject] = useState('All');
  const [dateRange, setDateRange] = useState('This Month');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSalesmen = salesmen.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSalesman = selectedSalesman === 'All' || s.name === selectedSalesman;
    return matchesSearch && matchesSalesman;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleSavePDF = () => {
    alert('Exporting Counselor Performance Report as PDF...');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 font-sans">
      {/* Page Header & CTA Buttons matching PDF Page 13 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Counselor Performance Report</h1>
          <p className="text-xs text-gray-500">Track property consultant metrics, conversion rates, and sales productivity</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrint}
            className="px-3.5 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Printer size={14} />
            <span>Print Report</span>
          </button>
          <button 
            onClick={handleSavePDF}
            className="px-4 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
            style={{ backgroundColor: '#D4AF37' }}
          >
            <Download size={14} />
            <span>Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-xl shadow-2xs space-y-1">
          <p className="text-[10px] text-blue-100 font-bold uppercase tracking-wider">Total Consultants</p>
          <p className="text-2xl font-extrabold">310</p>
          <p className="text-[10px] text-blue-200">Across 12 Regional Branches</p>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 rounded-xl shadow-2xs space-y-1">
          <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-wider">Active Executives</p>
          <p className="text-2xl font-extrabold">130</p>
          <p className="text-[10px] text-emerald-200">Handling Active Inquiries</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Top Performer</span>
            <p className="text-xs font-bold text-gray-900">Md. Rahim Sarder</p>
            <p className="text-[10px] text-gray-500">Sr. Executive Consultant</p>
          </div>
          <div className="text-right">
            <span className="text-xl font-extrabold text-emerald-600">92%</span>
            <p className="text-[10px] text-gray-400">Score</p>
          </div>
        </div>
      </div>

      {/* Filter Bar matching Page 13 */}
      <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-3">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Filters</h4>

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
            <option value="All">Select Project / Course</option>
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
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${s.performanceRate}%` }}
                        ></div>
                      </div>
                    </div>
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

