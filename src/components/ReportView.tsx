import React, { useState } from 'react';
import { ReportRow } from '../types';
import { Printer, Download, Search, Filter, Plus, Eye, ArrowLeft, Building2, CheckCircle2, TrendingUp, Users, FileText } from 'lucide-react';

interface ReportViewProps {
  reportRows: ReportRow[];
}

export const ReportView: React.FC<ReportViewProps> = ({ reportRows }) => {
  const [rows, setRows] = useState<ReportRow[]>(reportRows);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  
  // View states: 'list' | 'generate' | 'view'
  const [pageMode, setPageMode] = useState<'list' | 'generate' | 'view'>('list');
  const [selectedReport, setSelectedReport] = useState<ReportRow | null>(null);

  // Form state for generating report
  const [newConsultant, setNewConsultant] = useState('Md. Rahim Sarder');
  const [newProjectName, setNewProjectName] = useState('Purbachal Green Valley');
  const [newBranch, setNewBranch] = useState('Dhaka Head Office');
  const [newTotalLeads, setNewTotalLeads] = useState('50');
  const [newEnrolled, setNewEnrolled] = useState('12');

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    const leadsNum = parseInt(newTotalLeads) || 50;
    const enrolledNum = parseInt(newEnrolled) || 10;
    
    const newReport: ReportRow = {
      id: `r_${Date.now()}`,
      consultant: newConsultant,
      projectName: newProjectName,
      branch: newBranch,
      totalLeads: leadsNum,
      assignedLeads: leadsNum,
      contacted: Math.round(leadsNum * 0.7),
      remaining: Math.round(leadsNum * 0.3),
      busy: 5,
      interested: 15,
      followUp: 10,
      enrolled: enrolledNum,
      cancelled: 3,
      notReceived: 5,
      callRejected: 2,
      progress: `${enrolledNum}/${leadsNum}`
    };

    setRows([newReport, ...rows]);
    setPageMode('list');
  };

  const filteredRows = rows.filter(r => {
    const matchesSearch = (r.projectName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (r.consultant || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (r.branch || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === 'All' || (r.branch || '').toLowerCase().includes(selectedBranch.toLowerCase());
    return matchesSearch && matchesBranch;
  });

  const totalLeadsSum = rows.reduce((acc, r) => acc + (r.totalLeads || 0), 0);
  const totalEnrolledSum = rows.reduce((acc, r) => acc + (r.enrolled || 0), 0);
  const totalContactedSum = rows.reduce((acc, r) => acc + (r.contacted || 0), 0);
  const avgConversion = totalLeadsSum > 0 ? Math.round((totalEnrolledSum / totalLeadsSum) * 100) : 0;

  // Separate Full Page View for Detailed Report Analysis
  if (pageMode === 'view' && selectedReport) {
    const convRate = selectedReport.totalLeads > 0 
      ? Math.round((selectedReport.enrolled / selectedReport.totalLeads) * 100) 
      : 0;

    return (
      <div className="space-y-6 max-w-full font-sans">
        {/* Printable Header */}
        <div className="print-only-header">
          <h2 className="text-xl font-extrabold uppercase">Promise Assets Limited</h2>
          <p className="text-sm font-bold">Detailed Real Estate Sales & Lead Performance Report</p>
          <p className="text-xs">Generated Date: {new Date().toLocaleDateString('en-GB')}</p>
        </div>

        {/* Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
          <button 
            onClick={() => setPageMode('list')}
            className="px-3.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5 w-fit shadow-2xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Reports List</span>
          </button>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()}
              className="px-4 py-1.5 text-xs font-bold text-amber-900 bg-white border-2 border-[#D4AF37] rounded-md hover:bg-amber-50 transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <Printer size={14} />
              <span>Print Report</span>
            </button>
          </div>
        </div>

        {/* Dedicated Report Detail Sheet */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-2xs space-y-6">
          <div className="border-b border-gray-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Project Performance Overview</span>
              <h2 className="text-xl font-extrabold text-gray-900">{selectedReport.projectName}</h2>
              <p className="text-xs text-gray-500 mt-0.5">Assigned Consultant: <strong className="text-gray-900">{selectedReport.consultant}</strong> ({selectedReport.branch})</p>
            </div>

            <div className="flex items-center gap-4 bg-amber-50/80 px-4 py-2.5 rounded-xl border border-amber-200/60">
              <div className="text-right">
                <span className="text-[10px] text-amber-900 font-bold block uppercase">Conversion Efficiency</span>
                <span className="text-xl font-extrabold text-amber-900">{convRate}%</span>
              </div>
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/80">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Total Inquiries</span>
              <span className="text-2xl font-extrabold text-gray-900">{selectedReport.totalLeads}</span>
              <span className="text-[10px] text-gray-500 block">ASSIGNED LEADS</span>
            </div>

            <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200/80">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Bookings / Enrolled</span>
              <span className="text-2xl font-extrabold text-emerald-700">{selectedReport.enrolled}</span>
              <span className="text-[10px] text-emerald-700 block">CONFIRMED ALLOTMENTS</span>
            </div>

            <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200/80">
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">Contacted</span>
              <span className="text-2xl font-extrabold text-amber-900">{selectedReport.contacted}</span>
              <span className="text-[10px] text-amber-800 block">ATTEMPTED CALLS</span>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/80">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Remaining Queue</span>
              <span className="text-2xl font-extrabold text-gray-900">{selectedReport.remaining}</span>
              <span className="text-[10px] text-gray-500 block">PENDING CONTACT</span>
            </div>
          </div>

          {/* Detailed Call Disposition Breakdown Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-gray-900">Lead Conversion & Call Disposition Summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-[11px] font-bold text-gray-700 uppercase border-b border-gray-200">
                    <th className="py-2.5 px-4 border-r border-gray-200">Metric Category</th>
                    <th className="py-2.5 px-4 border-r border-gray-200 text-center">Lead Count</th>
                    <th className="py-2.5 px-4 border-r border-gray-200 text-center">Percentage of Inquiries</th>
                    <th className="py-2.5 px-4 text-center">Status Assessment</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-medium text-gray-800 divide-y divide-gray-200">
                  <tr>
                    <td className="py-2.5 px-4 font-bold border-r border-gray-200">Plot Booked & Enrolled</td>
                    <td className="py-2.5 px-4 border-r border-gray-200 text-center font-extrabold text-emerald-700">{selectedReport.enrolled}</td>
                    <td className="py-2.5 px-4 border-r border-gray-200 text-center">{convRate}%</td>
                    <td className="py-2.5 px-4 text-center font-bold text-emerald-800">Closed Won</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold border-r border-gray-200">Interested & Site Visit Scheduled</td>
                    <td className="py-2.5 px-4 border-r border-gray-200 text-center font-bold">{selectedReport.interested}</td>
                    <td className="py-2.5 px-4 border-r border-gray-200 text-center">{Math.round((selectedReport.interested / selectedReport.totalLeads) * 100)}%</td>
                    <td className="py-2.5 px-4 text-center font-bold text-amber-800">High Intent Prospect</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold border-r border-gray-200">Follow-up Call Scheduled</td>
                    <td className="py-2.5 px-4 border-r border-gray-200 text-center font-bold">{selectedReport.followUp}</td>
                    <td className="py-2.5 px-4 border-r border-gray-200 text-center">{Math.round((selectedReport.followUp / selectedReport.totalLeads) * 100)}%</td>
                    <td className="py-2.5 px-4 text-center font-bold text-gray-700">In Pipeline</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold border-r border-gray-200">Busy / Rescheduled</td>
                    <td className="py-2.5 px-4 border-r border-gray-200 text-center">{selectedReport.busy}</td>
                    <td className="py-2.5 px-4 border-r border-gray-200 text-center">{Math.round((selectedReport.busy / selectedReport.totalLeads) * 100)}%</td>
                    <td className="py-2.5 px-4 text-center text-gray-500">Retry Contact</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold border-r border-gray-200">Unresponsive / Lost / Cancelled</td>
                    <td className="py-2.5 px-4 border-r border-gray-200 text-center text-gray-600">{selectedReport.cancelled + selectedReport.notReceived}</td>
                    <td className="py-2.5 px-4 border-r border-gray-200 text-center">{Math.round(((selectedReport.cancelled + selectedReport.notReceived) / selectedReport.totalLeads) * 100)}%</td>
                    <td className="py-2.5 px-4 text-center text-red-600 font-semibold">Cold Lead</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">Executive Performance Notes</h4>
            <p className="text-xs text-gray-700 leading-relaxed">
              Consultant <strong>{selectedReport.consultant}</strong> demonstrates an active pipeline in the <strong>{selectedReport.projectName}</strong> campaign under <strong>{selectedReport.branch}</strong>. Total progress stands at {selectedReport.progress} completed bookings with high conversion metrics.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Separate Full Page View for Generating Custom Report
  if (pageMode === 'generate') {
    return (
      <div className="space-y-6 max-w-3xl font-sans">
        <div className="flex items-center justify-between no-print">
          <button 
            onClick={() => setPageMode('list')}
            className="px-3.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Reports List</span>
          </button>
          <span className="text-xs text-gray-500">Real Estate Analytics Studio</span>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-5">
          <div className="border-b border-gray-200 pb-3">
            <h2 className="text-lg font-extrabold text-gray-900">Generate Custom Lead Report Page</h2>
            <p className="text-xs text-gray-500">Specify project parameters and consultant target scope to assemble custom metrics</p>
          </div>

          <form onSubmit={handleGenerateReport} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Project Campaign Name *</label>
                <input 
                  type="text" 
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. Purbachal Green Valley Phase 2"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Assigned Consultant *</label>
                <input 
                  type="text" 
                  value={newConsultant}
                  onChange={(e) => setNewConsultant(e.target.value)}
                  placeholder="e.g. Md. Rahim Sarder"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Branch Location</label>
                <select 
                  value={newBranch}
                  onChange={(e) => setNewBranch(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                >
                  <option value="Dhaka Head Office">Dhaka Head Office</option>
                  <option value="Mirpur Branch">Mirpur Branch</option>
                  <option value="Gazipur Regional">Gazipur Regional</option>
                  <option value="Uttara Branch">Uttara Branch</option>
                  <option value="Chattogram Branch">Chattogram Branch</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Total Inquiries Scope</label>
                <input 
                  type="number" 
                  value={newTotalLeads}
                  onChange={(e) => setNewTotalLeads(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Target Bookings</label>
                <input 
                  type="number" 
                  value={newEnrolled}
                  onChange={(e) => setNewEnrolled(e.target.value)}
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
                Compile & Save Report
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Default List View
  return (
    <div className="space-y-5 max-w-full font-sans">
      {/* Printable Header for standard print */}
      <div className="print-only-header">
        <h2 className="text-xl font-extrabold uppercase">Promise Assets Limited</h2>
        <p className="text-sm font-bold">Real Estate Lead & Performance Summary Report</p>
        <p className="text-xs">Printed Date: {new Date().toLocaleDateString('en-GB')}</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Lead & Performance Reports</h1>
          <p className="text-xs text-gray-500">Comprehensive real estate lead reports across branches and property consultants</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setPageMode('generate')}
            className="px-4 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
            style={{ backgroundColor: '#D4AF37' }}
          >
            <Plus size={14} />
            <span>Generate Custom Report</span>
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

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 no-print">
        <div className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Inquiries Tracked</p>
          <p className="text-2xl font-extrabold text-gray-900">{totalLeadsSum}</p>
          <p className="text-[10px] text-amber-700 font-semibold">Active Property Inquiries</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Plots Booked</p>
          <p className="text-2xl font-extrabold text-emerald-600">{totalEnrolledSum}</p>
          <p className="text-[10px] text-emerald-700 font-semibold">Confirmed Allotments</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Average Conversion Rate</p>
          <p className="text-2xl font-extrabold text-amber-900">{avgConversion}%</p>
          <p className="text-[10px] text-amber-700 font-semibold">Sales Efficiency Rate</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Calls Contacted</p>
          <p className="text-2xl font-extrabold text-gray-900">{totalContactedSum}</p>
          <p className="text-[10px] text-gray-400">Engaged Conversations</p>
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
              placeholder="Search Reports by project name, consultant, or branch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
            />
          </div>

          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
          >
            <option value="All">Select Branch: All Branches</option>
            <option value="Dhaka">Dhaka Head Office</option>
            <option value="Mirpur">Mirpur Branch</option>
            <option value="Gazipur">Gazipur Regional</option>
            <option value="Uttara">Uttara Branch</option>
            <option value="Chattogram">Chattogram Branch</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <span className="text-xs font-bold text-gray-800">Branch & Campaign Performance Table ({filteredRows.length} Reports)</span>
          <span className="text-[11px] text-gray-500">Real-Time Aggregated Data</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/70 text-[10px] font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                <th className="py-2.5 px-4">SL</th>
                <th className="py-2.5 px-4">Project / Campaign Name</th>
                <th className="py-2.5 px-4">Branch Location</th>
                <th className="py-2.5 px-4">Assigned Consultant</th>
                <th className="py-2.5 px-4 text-center">Inquiries</th>
                <th className="py-2.5 px-4 text-center">Contacted</th>
                <th className="py-2.5 px-4 text-center">Bookings</th>
                <th className="py-2.5 px-4 text-center">Conversion %</th>
                <th className="py-2.5 px-4 text-center no-print">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-gray-500 font-semibold">
                    No lead reports found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredRows.map((r, i) => {
                  const rate = r.totalLeads > 0 ? Math.round((r.enrolled / r.totalLeads) * 100) : 0;
                  const slNum = i < 9 ? `0${i + 1}` : `${i + 1}`;
                  return (
                    <tr key={r.id} className="hover:bg-amber-50/20 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-400">{slNum}</td>
                      <td className="py-3 px-4 font-bold text-gray-900">{r.projectName}</td>
                      <td className="py-3 px-4 text-gray-600 font-medium">{r.branch}</td>
                      <td className="py-3 px-4 font-semibold text-gray-800">{r.consultant}</td>
                      <td className="py-3 px-4 text-center font-bold text-gray-900">{r.totalLeads}</td>
                      <td className="py-3 px-4 text-center text-gray-700">{r.contacted}</td>
                      <td className="py-3 px-4 text-center font-extrabold text-emerald-600">{r.enrolled}</td>
                      <td className="py-3 px-4 text-center font-extrabold text-amber-800">{rate}%</td>
                      <td className="py-3 px-4 text-center no-print">
                        <button 
                          onClick={() => {
                            setSelectedReport(r);
                            setPageMode('view');
                          }}
                          className="px-3.5 py-1 text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors shadow-2xs inline-flex items-center gap-1"
                        >
                          <Eye size={11} />
                          <span>View Detail Page</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
