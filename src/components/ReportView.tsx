import React, { useState } from 'react';
import { 
  Zap, 
  UserCheck, 
  Share2, 
  AlertCircle, 
  Star, 
  Search, 
  Calendar, 
  ChevronDown,
  Download,
  Printer
} from 'lucide-react';

interface ConsultantGroup {
  id: string;
  sl: string;
  consultant: string;
  branch: string;
  isOnline?: boolean;
  projects: {
    projectName: string;
    totalTime: string;
    leads: number;
    assigned: number;
    contacted: number;
    remaining: number;
    busy: number;
    interested: number;
    followUp: number;
    enrolled: number;
    cancelled: number;
    notReceived: number;
  }[];
}

const mockReportGroups: ConsultantGroup[] = [
  {
    id: 'c1',
    sl: '01',
    consultant: 'Syeda Hazera Sadia',
    branch: 'Dhaka Head Office',
    isOnline: true,
    projects: [
      { projectName: 'Purbachal Green Valley Project', totalTime: '00:10:29', leads: 53, assigned: 49, contacted: 2, remaining: 2, busy: 0, interested: 2, followUp: 2, enrolled: 1, cancelled: 0, notReceived: 0 },
      { projectName: 'Bashundhara Enclave Villa', totalTime: '00:05:00', leads: 27, assigned: 27, contacted: 0, remaining: 0, busy: 0, interested: 0, followUp: 0, enrolled: 0, cancelled: 0, notReceived: 0 },
      { projectName: 'Uttara Sector 18 Villa & Apartment', totalTime: '00:15:00', leads: 415, assigned: 410, contacted: 1, remaining: 1, busy: 0, interested: 1, followUp: 0, enrolled: 0, cancelled: 0, notReceived: 0 },
      { projectName: 'Dhanmondi Horizon Luxury Tower', totalTime: '00:12:00', leads: 812, assigned: 762, contacted: 1, remaining: 1, busy: 0, interested: 1, followUp: 0, enrolled: 0, cancelled: 0, notReceived: 0 },
      { projectName: 'Mirpur Commercial Hub & Market', totalTime: '00:08:00', leads: 356, assigned: 321, contacted: 1, remaining: 1, busy: 0, interested: 1, followUp: 0, enrolled: 0, cancelled: 0, notReceived: 0 },
      { projectName: 'Gulshan Lake Residence Suites', totalTime: '00:09:00', leads: 468, assigned: 434, contacted: 1, remaining: 1, busy: 0, interested: 1, followUp: 0, enrolled: 1, cancelled: 0, notReceived: 0 }
    ]
  },
  {
    id: 'c2',
    sl: '02',
    consultant: 'Nazefa Akter',
    branch: 'Dhaka Head Office',
    isOnline: true,
    projects: [
      { projectName: 'Purbachal Sector 4 Plot', totalTime: '00:04:12', leads: 353, assigned: 326, contacted: 2, remaining: 1, busy: 0, interested: 1, followUp: 1, enrolled: 0, cancelled: 0, notReceived: 0 },
      { projectName: 'Chittagong Hillside Valley', totalTime: '00:02:40', leads: 468, assigned: 452, contacted: 0, remaining: 0, busy: 0, interested: 0, followUp: 0, enrolled: 0, cancelled: 0, notReceived: 0 },
      { projectName: 'Coxs Bazar Beachfront Resort Plot', totalTime: '00:01:10', leads: 331, assigned: 312, contacted: 0, remaining: 0, busy: 0, interested: 0, followUp: 0, enrolled: 0, cancelled: 0, notReceived: 0 },
      { projectName: 'Sylhet Green Park Residency', totalTime: '00:00:50', leads: 549, assigned: 513, contacted: 0, remaining: 0, busy: 0, interested: 0, followUp: 0, enrolled: 0, cancelled: 0, notReceived: 0 }
    ]
  },
  {
    id: 'c3',
    sl: '03',
    consultant: 'Lata Sarkar',
    branch: 'Uttara Branch',
    isOnline: true,
    projects: [
      { projectName: 'Uttara Sector 18 Villa', totalTime: '00:06:15', leads: 277, assigned: 191, contacted: 0, remaining: 0, busy: 0, interested: 0, followUp: 0, enrolled: 0, cancelled: 0, notReceived: 0 },
      { projectName: 'Purbachal Green Valley Project', totalTime: '00:03:20', leads: 64, assigned: 45, contacted: 0, remaining: 0, busy: 0, interested: 0, followUp: 0, enrolled: 0, cancelled: 0, notReceived: 0 },
      { projectName: 'Bashundhara Enclave', totalTime: '00:04:50', leads: 83, assigned: 50, contacted: 0, remaining: 0, busy: 0, interested: 0, followUp: 0, enrolled: 0, cancelled: 0, notReceived: 0 }
    ]
  },
  {
    id: 'c4',
    sl: '04',
    consultant: 'Sababa Rahman Zara',
    branch: 'Dhanmondi Branch',
    isOnline: true,
    projects: [
      { projectName: 'Dhanmondi Horizon Tower', totalTime: '00:18:03', leads: 728, assigned: 560, contacted: 4, remaining: 27, busy: 2, interested: 27, followUp: 0, enrolled: 4, cancelled: 1, notReceived: 0 },
      { projectName: 'Gulshan Lake Residence', totalTime: '00:05:11', leads: 8, assigned: 8, contacted: 0, remaining: 0, busy: 0, interested: 0, followUp: 0, enrolled: 0, cancelled: 0, notReceived: 0 },
      { projectName: 'Purbachal Green Valley Project', totalTime: '00:09:17', leads: 3, assigned: 2, contacted: 0, remaining: 0, busy: 0, interested: 0, followUp: 0, enrolled: 0, cancelled: 0, notReceived: 0 },
      { projectName: 'Mirpur Commercial Hub', totalTime: '00:08:19', leads: 331, assigned: 151, contacted: 1, remaining: 1, busy: 0, interested: 1, followUp: 0, enrolled: 0, cancelled: 0, notReceived: 0 }
    ]
  },
  {
    id: 'c5',
    sl: '05',
    consultant: 'Putul Fiha',
    branch: 'Dhaka Head Office',
    isOnline: false,
    projects: [
      { projectName: 'Purbachal Sector 4 Plot', totalTime: '00:12:41', leads: 46, assigned: 42, contacted: 3, remaining: 4, busy: 0, interested: 3, followUp: 4, enrolled: 0, cancelled: 0, notReceived: 0 },
      { projectName: 'Chittagong Hillside Valley', totalTime: '00:08:30', leads: 119, assigned: 99, contacted: 0, remaining: 0, busy: 0, interested: 0, followUp: 0, enrolled: 0, cancelled: 0, notReceived: 0 },
      { projectName: 'Uttara Sector 18 Villa', totalTime: '00:08:24', leads: 94, assigned: 76, contacted: 2, remaining: 4, busy: 0, interested: 2, followUp: 4, enrolled: 0, cancelled: 0, notReceived: 2 }
    ]
  }
];

interface ReportViewProps {
  reportRows?: any[];
}

export const ReportView: React.FC<ReportViewProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConsultant, setSelectedConsultant] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredGroups = mockReportGroups.filter(g => {
    const matchesConsultant = selectedConsultant === 'All' || g.consultant === selectedConsultant;
    const matchesBranch = selectedBranch === 'All' || g.branch === selectedBranch;
    return matchesConsultant && matchesBranch;
  }).map(g => {
    const matchingProjects = g.projects.filter(p => 
      !searchTerm || p.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...g, projects: matchingProjects };
  }).filter(g => g.projects.length > 0);

  // Compute Grand Totals
  const grandTotal = filteredGroups.reduce((acc, group) => {
    group.projects.forEach(p => {
      acc.leads += p.leads;
      acc.assigned += p.assigned;
      acc.contacted += p.contacted;
      acc.remaining += p.remaining;
      acc.busy += p.busy;
      acc.interested += p.interested;
      acc.followUp += p.followUp;
      acc.enrolled += p.enrolled;
      acc.cancelled += p.cancelled;
      acc.notReceived += p.notReceived;
    });
    return acc;
  }, {
    leads: 0, assigned: 0, contacted: 0, remaining: 0, busy: 0, 
    interested: 0, followUp: 0, enrolled: 0, cancelled: 0, notReceived: 0
  });

  return (
    <div className="space-y-6 max-w-full font-sans select-none">
      {/* Top 5 Metric Cards - White background matching reference structure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Leads */}
        <div className="bg-white rounded-2xl p-4 border border-blue-100/90 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Zap size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Leads</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-blue-50/60 rounded-xl p-2.5 text-left border border-blue-100/80">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-blue-600/80">TOTAL</span>
              <span className="text-xl font-extrabold text-blue-950 tracking-tight">8565</span>
            </div>
            <div className="bg-blue-50/60 rounded-xl p-2.5 text-left border border-blue-100/80">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-blue-600/80">TODAY</span>
              <span className="text-xl font-extrabold text-blue-950 tracking-tight">0</span>
            </div>
          </div>
          <Zap size={85} className="absolute -right-4 -bottom-4 text-blue-500/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 2: Bookings */}
        <div className="bg-white rounded-2xl p-4 border border-purple-100/90 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <UserCheck size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Bookings</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-purple-50/60 rounded-xl p-2.5 text-left border border-purple-100/80">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-purple-600/80">TOTAL</span>
              <span className="text-xl font-extrabold text-purple-950 tracking-tight">271</span>
            </div>
            <div className="bg-purple-50/60 rounded-xl p-2.5 text-left border border-purple-100/80">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-purple-600/80">TODAY</span>
              <span className="text-xl font-extrabold text-purple-950 tracking-tight">7</span>
            </div>
          </div>
          <UserCheck size={85} className="absolute -right-4 -bottom-4 text-purple-500/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 3: Follow Up & Interested */}
        <div className="bg-white rounded-2xl p-4 border border-orange-100/90 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Share2 size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide truncate">Follow Up & Interested</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-orange-50/60 rounded-xl p-2.5 text-left border border-orange-100/80">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-orange-600/80">TOTAL</span>
              <span className="text-xl font-extrabold text-orange-950 tracking-tight">990</span>
            </div>
            <div className="bg-orange-50/60 rounded-xl p-2.5 text-left border border-orange-100/80">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-orange-600/80">TODAY</span>
              <span className="text-xl font-extrabold text-orange-950 tracking-tight">17</span>
            </div>
          </div>
          <Share2 size={85} className="absolute -right-4 -bottom-4 text-orange-500/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 4: Lost Leads */}
        <div className="bg-white rounded-2xl p-4 border border-indigo-100/90 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <AlertCircle size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Lost Leads</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-indigo-50/60 rounded-xl p-2.5 text-left border border-indigo-100/80">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-700/80">TOTAL</span>
              <span className="text-xl font-extrabold text-indigo-950 tracking-tight">1655</span>
            </div>
            <div className="bg-indigo-50/60 rounded-xl p-2.5 text-left border border-indigo-100/80">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-700/80">TODAY</span>
              <span className="text-xl font-extrabold text-indigo-950 tracking-tight">0</span>
            </div>
          </div>
          <AlertCircle size={85} className="absolute -right-4 -bottom-4 text-indigo-500/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 5: Status */}
        <div className="bg-white rounded-2xl p-4 border border-cyan-100/90 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Star size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Status</span>
          </div>
          <div className="z-10">
            <div className="bg-cyan-50/60 rounded-xl p-2.5 text-left border border-cyan-100/80">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-cyan-700/80">CONVERSION</span>
              <span className="text-xl font-extrabold text-cyan-950 tracking-tight">3.16%</span>
            </div>
          </div>
          <Star size={85} className="absolute -right-4 -bottom-4 text-cyan-500/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
        <h2 className="text-sm font-extrabold text-gray-900 tracking-tight">Filters</h2>

        <div className="space-y-3">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={15} />
              <input 
                type="text"
                placeholder="Search by project or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
              />
            </div>

            <div className="relative">
              <select
                value={selectedConsultant}
                onChange={(e) => setSelectedConsultant(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none shadow-2xs"
              >
                <option value="All">Search counsellor / sales executive...</option>
                {mockReportGroups.map(g => (
                  <option key={g.id} value={g.consultant}>{g.consultant}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={15} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none shadow-2xs"
              >
                <option value="All">Search branch...</option>
                <option value="Dhaka Head Office">Dhaka Head Office</option>
                <option value="Uttara Branch">Uttara Branch</option>
                <option value="Dhanmondi Branch">Dhanmondi Branch</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={15} />
            </div>

            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none shadow-2xs"
              >
                <option value="All">Status</option>
                <option value="Active">Active</option>
                <option value="Interested">Interested</option>
                <option value="Booked">Booked</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={15} />
            </div>

            <button 
              type="button"
              onClick={() => alert('Date range picker opened')}
              className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-500 hover:text-gray-800 flex items-center justify-between transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-gray-400" />
                <span>Pick a date range</span>
              </div>
            </button>

            <div className="relative">
              <select
                className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none shadow-2xs"
              >
                <option value="10">Show Per Page</option>
                <option value="25">25 Per Page</option>
                <option value="50">50 Per Page</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={15} />
            </div>
          </div>
        </div>
      </div>

      {/* Export Button Bar */}
      <div className="flex justify-end items-center gap-2">
        <button 
          onClick={() => window.print()}
          className="px-3.5 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <Printer size={14} />
          <span>Print</span>
        </button>
        <button 
          onClick={() => alert('Exporting Lead Report CSV / Excel...')}
          className="px-4 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-lg shadow-2xs hover:bg-gray-50 transition-all flex items-center gap-1.5"
        >
          <span>Export</span>
          <Download size={14} />
        </button>
      </div>

      {/* Main Hierarchical Lead Report Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-extrabold text-gray-800 tracking-tight">
                <th className="py-3 px-3 w-10">#SL</th>
                <th className="py-3 px-3 w-48">Consultant / Executive</th>
                <th className="py-3 px-3">Real Estate Project</th>
                <th className="py-3 px-3 text-center">Total Time</th>
                <th className="py-3 px-3 text-center">Leads</th>
                <th className="py-3 px-3 text-center">Assigned</th>
                <th className="py-3 px-3 text-center">Contacted</th>
                <th className="py-3 px-3 text-center">Remaining</th>
                <th className="py-3 px-3 text-center">Busy</th>
                <th className="py-3 px-3 text-center">Interested</th>
                <th className="py-3 px-3 text-center">Follow Up</th>
                <th className="py-3 px-3 text-center">Booked</th>
                <th className="py-3 px-3 text-center">Cancelled</th>
                <th className="py-3 px-3 text-center">Not Rec.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/80 text-[11px]">
              {filteredGroups.map((group) => {
                const groupTotals = group.projects.reduce((acc, p) => {
                  acc.leads += p.leads;
                  acc.assigned += p.assigned;
                  acc.contacted += p.contacted;
                  acc.remaining += p.remaining;
                  acc.busy += p.busy;
                  acc.interested += p.interested;
                  acc.followUp += p.followUp;
                  acc.enrolled += p.enrolled;
                  acc.cancelled += p.cancelled;
                  acc.notReceived += p.notReceived;
                  return acc;
                }, {
                  leads: 0, assigned: 0, contacted: 0, remaining: 0, busy: 0,
                  interested: 0, followUp: 0, enrolled: 0, cancelled: 0, notReceived: 0
                });

                return (
                  <React.Fragment key={group.id}>
                    {group.projects.map((proj, idx) => (
                      <tr key={`${group.id}-p-${idx}`} className="hover:bg-amber-50/20 transition-colors">
                        {idx === 0 && (
                          <td 
                            rowSpan={group.projects.length + 1} 
                            className="py-3.5 px-3 font-extrabold text-gray-500 border-r border-gray-100 align-top bg-gray-50/30"
                          >
                            {group.sl}
                          </td>
                        )}
                        {idx === 0 && (
                          <td 
                            rowSpan={group.projects.length + 1} 
                            className="py-3.5 px-3 border-r border-gray-100 align-top bg-gray-50/30"
                          >
                            <p className="font-extrabold text-gray-900 leading-tight">{group.consultant}</p>
                            <div className="inline-flex items-center gap-1.5 mt-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              <span>{group.branch.split(' ')[0]}</span>
                            </div>
                          </td>
                        )}
                        <td className="py-3 px-3 font-semibold text-gray-800">
                          {proj.projectName}
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-gray-500 text-[10px]">{proj.totalTime}</td>
                        <td className="py-3 px-3 text-center font-bold text-gray-900">{proj.leads}</td>
                        <td className="py-3 px-3 text-center font-medium text-gray-600">{proj.assigned}</td>
                        <td className="py-3 px-3 text-center font-bold text-blue-600">{proj.contacted}</td>
                        <td className="py-3 px-3 text-center text-gray-600">{proj.remaining}</td>
                        <td className="py-3 px-3 text-center text-amber-600">{proj.busy}</td>
                        <td className="py-3 px-3 text-center font-bold text-emerald-600">{proj.interested}</td>
                        <td className="py-3 px-3 text-center text-indigo-600">{proj.followUp}</td>
                        <td className="py-3 px-3 text-center font-extrabold text-emerald-700">{proj.enrolled}</td>
                        <td className="py-3 px-3 text-center text-rose-500">{proj.cancelled}</td>
                        <td className="py-3 px-3 text-center text-gray-400">{proj.notReceived}</td>
                      </tr>
                    ))}

                    {/* Green Subtotal Row for Consultant */}
                    <tr className="bg-emerald-50/80 border-t border-b border-emerald-200/80 font-extrabold text-emerald-950">
                      <td className="py-2.5 px-3 font-bold text-emerald-900">
                        Total [{group.consultant}]
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-emerald-800 text-[10px]">00:48:03</td>
                      <td className="py-2.5 px-3 text-center font-extrabold text-emerald-900">{groupTotals.leads}</td>
                      <td className="py-2.5 px-3 text-center text-emerald-800">{groupTotals.assigned}</td>
                      <td className="py-2.5 px-3 text-center text-emerald-900">{groupTotals.contacted}</td>
                      <td className="py-2.5 px-3 text-center text-emerald-800">{groupTotals.remaining}</td>
                      <td className="py-2.5 px-3 text-center text-emerald-800">{groupTotals.busy}</td>
                      <td className="py-2.5 px-3 text-center text-emerald-900">{groupTotals.interested}</td>
                      <td className="py-2.5 px-3 text-center text-emerald-800">{groupTotals.followUp}</td>
                      <td className="py-2.5 px-3 text-center text-emerald-900">{groupTotals.enrolled}</td>
                      <td className="py-2.5 px-3 text-center text-emerald-800">{groupTotals.cancelled}</td>
                      <td className="py-2.5 px-3 text-center text-emerald-800">{groupTotals.notReceived}</td>
                    </tr>
                  </React.Fragment>
                );
              })}

              {/* GRAND TOTAL Row */}
              <tr className="bg-slate-900 text-white font-extrabold border-t-2 border-slate-950 text-xs">
                <td colSpan={2} className="py-3.5 px-4 uppercase tracking-wider text-slate-200">
                  GRAND TOTAL
                </td>
                <td className="py-3.5 px-3 text-slate-300 font-normal">--</td>
                <td className="py-3.5 px-3 text-center font-mono text-slate-300 text-[10px]">01:28:50</td>
                <td className="py-3.5 px-3 text-center text-emerald-400 font-extrabold text-sm">{grandTotal.leads}</td>
                <td className="py-3.5 px-3 text-center text-slate-200">{grandTotal.assigned}</td>
                <td className="py-3.5 px-3 text-center text-blue-300">{grandTotal.contacted}</td>
                <td className="py-3.5 px-3 text-center text-slate-300">{grandTotal.remaining}</td>
                <td className="py-3.5 px-3 text-center text-amber-300">{grandTotal.busy}</td>
                <td className="py-3.5 px-3 text-center text-emerald-300">{grandTotal.interested}</td>
                <td className="py-3.5 px-3 text-center text-indigo-300">{grandTotal.followUp}</td>
                <td className="py-3.5 px-3 text-center text-emerald-400">{grandTotal.enrolled}</td>
                <td className="py-3.5 px-3 text-center text-rose-300">{grandTotal.cancelled}</td>
                <td className="py-3.5 px-3 text-center text-slate-400">{grandTotal.notReceived}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
