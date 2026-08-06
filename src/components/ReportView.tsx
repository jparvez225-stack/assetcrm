import React from 'react';
import { ReportRow } from '../types';
import { Printer, Download, Filter, FileText } from 'lucide-react';

interface ReportViewProps {
  reportRows: ReportRow[];
}

export const ReportView: React.FC<ReportViewProps> = ({ reportRows }) => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Lead & Performance Reports</h1>
          <p className="text-xs text-gray-500">Comprehensive real estate lead reports across branches and property consultants</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.print()}
            className="px-3.5 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Printer size={14} />
            <span>Print Report</span>
          </button>
          <button 
            onClick={() => alert('Exporting Report as PDF...')}
            className="px-4 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
            style={{ backgroundColor: '#D4AF37' }}
          >
            <Download size={14} />
            <span>Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-2xs">
          <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-wider">Lifetime Leads</p>
          <p className="text-2xl font-extrabold mt-0.5">500</p>
          <p className="text-[10px] text-emerald-200 mt-1">Active Property Inquiries</p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-2xs">
          <p className="text-[10px] text-blue-100 font-bold uppercase tracking-wider">Plots Booked</p>
          <p className="text-2xl font-extrabold mt-0.5">500</p>
          <p className="text-[10px] text-blue-200 mt-1">Confirmed Allotments</p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-800 text-white shadow-2xs">
          <p className="text-[10px] text-purple-100 font-bold uppercase tracking-wider">Overall Conversion</p>
          <p className="text-2xl font-extrabold mt-0.5">23%</p>
          <p className="text-[10px] text-purple-200 mt-1">Sales Efficiency Rate</p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-2xs">
          <p className="text-[10px] text-amber-100 font-bold uppercase tracking-wider">Closed / Lost</p>
          <p className="text-2xl font-extrabold mt-0.5">200</p>
          <p className="text-[10px] text-amber-200 mt-1">Unresponsive Leads</p>
        </div>
      </div>

      {/* Main Report Data Table */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="font-bold text-gray-900 text-xs">Lead Report & Branch Allotment Summary</h3>
          <span className="text-[11px] text-gray-500 font-medium">Promise Assets Regional Network</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/70 text-[10px] font-bold text-gray-600 uppercase border-b border-gray-200 tracking-wider">
                <th className="py-2.5 px-3">Consultant</th>
                <th className="py-2.5 px-3">Project Name</th>
                <th className="py-2.5 px-3">Branch</th>
                <th className="py-2.5 px-2 text-center">Total</th>
                <th className="py-2.5 px-2 text-center">Assign</th>
                <th className="py-2.5 px-2 text-center">Contacted</th>
                <th className="py-2.5 px-2 text-center">Remaining</th>
                <th className="py-2.5 px-2 text-center">Busy</th>
                <th className="py-2.5 px-2 text-center">Interested</th>
                <th className="py-2.5 px-2 text-center">Follow Up</th>
                <th className="py-2.5 px-2 text-center">Booked</th>
                <th className="py-2.5 px-2 text-center">Cancelled</th>
                <th className="py-2.5 px-2 text-center">Not Rec.</th>
                <th className="py-2.5 px-2 text-center">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {reportRows.map((row) => (
                <tr key={row.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-gray-900">{row.consultant}</td>
                  <td className="py-2.5 px-3 text-gray-800 font-semibold">{row.projectName}</td>
                  <td className="py-2.5 px-3 text-gray-600">{row.branch}</td>
                  <td className="py-2.5 px-2 text-center font-bold text-gray-800">{row.totalLeads}</td>
                  <td className="py-2.5 px-2 text-center text-gray-600">{row.assignedLeads}</td>
                  <td className="py-2.5 px-2 text-center text-blue-600 font-bold">{row.contacted}</td>
                  <td className="py-2.5 px-2 text-center text-gray-600">{row.remaining}</td>
                  <td className="py-2.5 px-2 text-center text-amber-600">{row.busy}</td>
                  <td className="py-2.5 px-2 text-center text-emerald-600 font-bold">{row.interested}</td>
                  <td className="py-2.5 px-2 text-center text-indigo-600">{row.followUp}</td>
                  <td className="py-2.5 px-2 text-center text-emerald-700 font-extrabold">{row.enrolled}</td>
                  <td className="py-2.5 px-2 text-center text-rose-500">{row.cancelled}</td>
                  <td className="py-2.5 px-2 text-center text-gray-400">{row.notReceived}</td>
                  <td className="py-2.5 px-2 text-center">
                    <span className="px-2 py-0.5 rounded bg-gray-100 font-bold text-gray-800 text-[10px]">
                      {row.progress}
                    </span>
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

