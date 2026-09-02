import React, { useState } from 'react';
import { Lead, NavItem, LEAD_STATUS_LIST } from '../types';
import { 
  Zap, 
  UserCheck, 
  Share2, 
  AlertCircle, 
  Star, 
  Search, 
  Calendar, 
  ChevronDown,
  Building,
  Clock
} from 'lucide-react';

interface LeadActivityViewProps {
  leads: Lead[];
  onNavigate: (nav: NavItem) => void;
  onSelectLead: (lead: Lead) => void;
}

export const LeadActivityView: React.FC<LeadActivityViewProps> = ({ 
  leads, 
  onNavigate, 
  onSelectLead 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [counselorSearch, setCounselorSearch] = useState('');
  const [perPage, setPerPage] = useState('10');

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.phone.includes(searchTerm);
    const matchesProject = selectedProject === 'All' || l.projectName === selectedProject;
    const matchesStatus = selectedStatus === 'All' || l.status === selectedStatus;
    const matchesCounselor = !counselorSearch || l.assignedSalesman.toLowerCase().includes(counselorSearch.toLowerCase());

    return matchesSearch && matchesProject && matchesStatus && matchesCounselor;
  });

  return (
    <div className="space-y-6 max-w-full font-sans select-none">
      {/* Top 5 Metric Cards matching exact reference design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Assigned */}
        <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <UserCheck size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Assigned</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 z-10">
            <div className="bg-blue-50/50 rounded-xl p-2 text-left border border-blue-100/70">
              <span className="block text-[8.5px] font-extrabold uppercase tracking-wider text-blue-600 truncate" title="ASSIGNED">ASSIGNED</span>
              <span className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">6,420</span>
            </div>
            <div className="bg-blue-50/50 rounded-xl p-2 text-left border border-blue-100/70">
              <span className="block text-[8.5px] font-extrabold uppercase tracking-wider text-blue-600 truncate" title="CONTACTED">CONTACTED</span>
              <span className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">4,850</span>
            </div>
            <div className="bg-blue-50/50 rounded-xl p-2 text-left border border-blue-100/70">
              <span className="block text-[8.5px] font-extrabold uppercase tracking-wider text-blue-600 truncate" title="PENDING">PENDING</span>
              <span className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">1,570</span>
            </div>
          </div>
          <UserCheck size={85} className="absolute -right-4 -bottom-4 text-blue-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 2: Leads */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Zap size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Leads</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 z-10">
            <div className="bg-emerald-50/50 rounded-xl p-2 text-left border border-emerald-100/70">
              <span className="block text-[8.5px] font-extrabold uppercase tracking-wider text-emerald-600 truncate" title="TOTAL LEADS">TOTAL LEADS</span>
              <span className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">8,565</span>
            </div>
            <div className="bg-emerald-50/50 rounded-xl p-2 text-left border border-emerald-100/70">
              <span className="block text-[8.5px] font-extrabold uppercase tracking-wider text-emerald-600 truncate" title="CONTACTED">CONTACTED</span>
              <span className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">6,890</span>
            </div>
            <div className="bg-emerald-50/50 rounded-xl p-2 text-left border border-emerald-100/70">
              <span className="block text-[8.5px] font-extrabold uppercase tracking-wider text-emerald-600 truncate" title="PENDING">PENDING</span>
              <span className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">1,675</span>
            </div>
          </div>
          <Zap size={85} className="absolute -right-4 -bottom-4 text-emerald-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 3: Follow Up */}
        <div className="bg-white rounded-2xl p-4 border border-orange-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Clock size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide truncate">Follow Up</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 z-10">
            <div className="bg-orange-50/50 rounded-xl p-2 text-left border border-orange-100/70">
              <span className="block text-[8.5px] font-extrabold uppercase tracking-wider text-orange-600 truncate" title="TOTAL FOLLOW UP">TOTAL FOLLOW UP</span>
              <span className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">993</span>
            </div>
            <div className="bg-orange-50/50 rounded-xl p-2 text-left border border-orange-100/70">
              <span className="block text-[8.5px] font-extrabold uppercase tracking-wider text-orange-600 truncate" title="TODAY FOLLOWUP">TODAY FOLLOWUP</span>
              <span className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">42</span>
            </div>
            <div className="bg-orange-50/50 rounded-xl p-2 text-left border border-orange-100/70">
              <span className="block text-[8.5px] font-extrabold uppercase tracking-wider text-orange-600 truncate" title="NEXT FOLLOW UP">NEXT FOLLOW UP</span>
              <span className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">118</span>
            </div>
          </div>
          <Clock size={85} className="absolute -right-4 -bottom-4 text-orange-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 4: Booking */}
        <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Building size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Booking</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-purple-50/50 rounded-xl p-2.5 text-left border border-purple-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-purple-600 truncate" title="TOTAL BOOKING">TOTAL BOOKING</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">271</span>
            </div>
            <div className="bg-purple-50/50 rounded-xl p-2.5 text-left border border-purple-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-purple-600 truncate" title="TOTAL SOLD">TOTAL SOLD</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">198</span>
            </div>
          </div>
          <Building size={85} className="absolute -right-4 -bottom-4 text-purple-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 5: Status */}
        <div className="bg-white rounded-2xl p-4 border border-cyan-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Star size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Status</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-cyan-50/50 rounded-xl p-2.5 text-left border border-cyan-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-cyan-600 truncate" title="CONVERSION">CONVERSION</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">3.16%</span>
            </div>
            <div className="bg-cyan-50/50 rounded-xl p-2.5 text-left border border-cyan-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-cyan-600 truncate" title="CALL RATIO">CALL RATIO</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">78.4%</span>
            </div>
          </div>
          <Star size={85} className="absolute -right-4 -bottom-4 text-cyan-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* Filters Card matching reference image */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
        <h2 className="text-sm font-extrabold text-gray-900 tracking-tight">Filters</h2>

        <div className="space-y-3">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={15} />
              <input 
                type="text"
                placeholder="Search lead name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
              />
            </div>

            <div className="relative">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none shadow-2xs"
              >
                <option value="All">Select project / course ...</option>
                <option value="Purbachal Green Valley Project">Purbachal Green Valley Project</option>
                <option value="Bashundhara Enclave">Bashundhara Enclave</option>
                <option value="Uttara Sector 18 Villa">Uttara Sector 18 Villa</option>
                <option value="Dhanmondi Horizon Tower">Dhanmondi Horizon Tower</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={15} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none shadow-2xs font-medium"
              >
                <option value="All">All Lead Statuses</option>
                {LEAD_STATUS_LIST.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={15} />
            </div>

            <div className="relative">
              <input 
                type="text"
                placeholder="Search counsellor / executive..."
                value={counselorSearch}
                onChange={(e) => setCounselorSearch(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
              />
            </div>

            <button 
              onClick={() => alert('Calendar picker opened')}
              className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-500 hover:text-gray-800 flex items-center justify-between transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-gray-400" />
                <span>Pick a date range</span>
              </div>
            </button>

            <div className="relative">
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

      {/* Lead Activity Table matching reference image */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-extrabold text-gray-800 tracking-tight">
                <th className="py-3 px-3">SI</th>
                <th className="py-3 px-3 text-center">Action</th>
                <th className="py-3 px-3">Lead Details</th>
                <th className="py-3 px-3">Lead Created Date</th>
                <th className="py-3 px-3">Last Follow Up</th>
                <th className="py-3 px-3">Next Follow Up</th>
                <th className="py-3 px-3 text-center">Calls</th>
                <th className="py-3 px-3 text-center">Messages</th>
                <th className="py-3 px-3">Counsellor</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-center">Time Count</th>
                <th className="py-3 px-3">last Activity</th>
                <th className="py-3 px-3">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[11px]">
              {filteredLeads.map((l, index) => (
                <tr key={l.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="py-3.5 px-3 font-extrabold text-gray-700">{index + 1}</td>
                  
                  {/* Action Button -> Navigates to Call History / Lead History */}
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => {
                        onSelectLead(l);
                        onNavigate('call-history');
                      }}
                      className="px-3.5 py-1.5 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-all shadow-2xs active:scale-95 cursor-pointer"
                    >
                      Action
                    </button>
                  </td>

                  <td className="py-3.5 px-3">
                    <p className="font-extrabold text-gray-900">{l.name}</p>
                    <p className="text-[10px] font-semibold text-indigo-700 mt-0.5">
                      Project: {l.projectName}
                    </p>
                  </td>

                  <td className="py-3.5 px-3 text-gray-600 font-medium">{l.date || '2026-08-04'}</td>
                  <td className="py-3.5 px-3 text-gray-600 font-medium">{l.lastCallDate || '2026-08-04'}</td>
                  <td className="py-3.5 px-3 text-gray-600 font-medium">2026-08-08</td>
                  <td className="py-3.5 px-3 text-center font-bold text-gray-700">{l.callCount || 0}</td>
                  <td className="py-3.5 px-3 text-center font-bold text-gray-700">{l.messageCount || 0}</td>

                  <td className="py-3.5 px-3">
                    <p className="font-bold text-gray-900">{l.assignedSalesman || 'Sababa Rahman Zara'}</p>
                    <p className="text-[9px] text-gray-400 font-medium">Sr. Executive</p>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border whitespace-nowrap inline-block ${
                      (l.status === 'Closed Won' || l.status === 'Payment Completed' || l.status === 'Agreement Signed' || l.status === 'Booking Confirmed' || l.status === 'Booking') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      l.status === 'Closed Lost' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                      (l.status === 'Site Visit Scheduled' || l.status === 'Site Visit Completed' || l.status === 'Negotiation') ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      (l.status === 'Interested' || l.status === 'Highly Interested' || l.status === 'Brochure & Price Shared') ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      (l.status === 'Follow-up Scheduled' || l.status === 'Callback Requested' || l.status === 'First Contact' || l.status === 'Contacted') ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      (l.status === 'New Lead' || l.status === 'Assigned') ? 'bg-sky-50 text-sky-700 border-sky-200' :
                      'bg-orange-50 text-orange-700 border-orange-200'
                    }`}>
                      {l.status || 'New Lead'}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center font-mono text-gray-500 text-[10px]">00:00:00</td>
                  <td className="py-3.5 px-3 text-gray-500 font-medium">2 days ago</td>
                  <td className="py-3.5 px-3 text-gray-600 max-w-[180px] truncate">
                    {l.note || `Lead assigned to ${l.assignedSalesman || 'executive'}`}
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
