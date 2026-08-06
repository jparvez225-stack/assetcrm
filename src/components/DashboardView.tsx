import React from 'react';
import { NavItem } from '../types';
import { 
  Users, 
  PhoneCall, 
  UserCheck, 
  MessageSquare, 
  TrendingUp, 
  Bell, 
  Target, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ChevronRight,
  Zap,
  Share2,
  AlertCircle,
  Star,
  DollarSign,
  Building2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

interface DashboardProps {
  onNavigate: (nav: NavItem) => void;
}

export const DashboardView: React.FC<DashboardProps> = ({ onNavigate }) => {
  // Bar Chart Data
  const barChartData = [
    { day: 'Day 1', Contacted: 18, Interested: 8, 'Site Visit': 5, Lost: 6 },
    { day: 'Day 2', Contacted: 22, Interested: 10, 'Site Visit': 4, Lost: 3 },
    { day: 'Day 3', Contacted: 16, Interested: 7, 'Site Visit': 6, Lost: 4 },
    { day: 'Day 4', Contacted: 24, Interested: 12, 'Site Visit': 8, Lost: 5 },
    { day: 'Day 5', Contacted: 19, Interested: 9, 'Site Visit': 5, Lost: 4 },
    { day: 'Day 6', Contacted: 21, Interested: 11, 'Site Visit': 6, Lost: 2 },
    { day: 'Day 7', Contacted: 26, Interested: 14, 'Site Visit': 9, Lost: 3 },
  ];

  // Lost Lead By Reason Pie Chart Data
  const pieData = [
    { name: 'Budget Issue', value: 30, color: '#c7a259' },
    { name: 'Unresponsive', value: 35, color: '#10B981' },
    { name: 'Competitor', value: 20, color: '#3B82F6' },
    { name: 'Location Issue', value: 15, color: '#9CA3AF' },
  ];

  // Lead Pipeline Stages
  const leadPipeline = [
    { stage: 'New Inquiries', count: '1,240', percentage: 14.5, color: '#c7a259' },
    { stage: 'Initial Contacted', count: '3,820', percentage: 44.6, color: '#3B82F6' },
    { stage: 'Follow Up & Site Visit', count: '993', percentage: 11.6, color: '#F59E0B' },
    { stage: 'Token Deposit Paid', count: '180', percentage: 2.1, color: '#8B5CF6' },
    { stage: 'Plot Booked', count: '271', percentage: 3.2, color: '#10B981' },
    { stage: 'Closed / Inactive', count: '2,080', percentage: 24.3, color: '#6B7280' },
  ];

  // Project Inventory Overview
  const projectsSummary = [
    { name: 'Purbachal Green Valley', totalPlots: 250, sold: 180, available: 70, price: '৳12L / Katha' },
    { name: 'Bashundhara Luxury Heights', totalPlots: 120, sold: 92, available: 28, price: '৳28L / Katha' },
    { name: 'Gulshan Commercial Plaza', totalPlots: 45, sold: 38, available: 7, price: '৳85L / Unit' },
    { name: 'Uttara Model Town Sector 14', totalPlots: 180, sold: 140, available: 40, price: '৳18L / Katha' },
  ];

  return (
    <div className="space-y-5 max-w-full font-sans select-none">
      {/* Welcome & Quick Action Bar */}
      <div className="bg-white p-3.5 px-4 rounded-2xl border border-gray-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-base font-extrabold text-gray-900 tracking-tight">Executive CRM Dashboard</h1>
          <p className="text-xs text-gray-500">
            Welcome back, <span className="font-semibold text-gray-800">Mehesum Rahman</span>. Real estate performance overview.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate('add-lead')}
            className="px-3.5 py-1.5 text-xs font-bold text-white rounded-xl shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
            style={{ backgroundColor: '#c7a259' }}
          >
            <Sparkles size={14} />
            <span>+ Add New Lead</span>
          </button>
          <button 
            onClick={() => onNavigate('lead')}
            className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-2xs"
          >
            View All Leads
          </button>
        </div>
      </div>

      {/* Row 1: Top 5 Primary KPI Cards - Reference White Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Revenue */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3 z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign size={18} />
              </div>
              <span className="font-extrabold text-sm text-gray-900 tracking-wide">Sales Revenue</span>
            </div>
            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">+14.2%</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-emerald-50/50 rounded-xl p-2.5 text-left border border-emerald-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">TOTAL</span>
              <span className="text-lg font-extrabold text-gray-900 tracking-tight">৳42.8M</span>
            </div>
            <div className="bg-emerald-50/50 rounded-xl p-2.5 text-left border border-emerald-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">TARGET</span>
              <span className="text-lg font-extrabold text-gray-900 tracking-tight">৳50.0M</span>
            </div>
          </div>
          <DollarSign size={85} className="absolute -right-4 -bottom-4 text-emerald-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 2: Leads */}
        <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Zap size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Total Leads</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-blue-50/50 rounded-xl p-2.5 text-left border border-blue-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-blue-600">TOTAL</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">8565</span>
            </div>
            <div className="bg-blue-50/50 rounded-xl p-2.5 text-left border border-blue-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-blue-600">TODAY</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">0</span>
            </div>
          </div>
          <Zap size={85} className="absolute -right-4 -bottom-4 text-blue-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 3: Plot Bookings */}
        <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <UserCheck size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Enrolment</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-purple-50/50 rounded-xl p-2.5 text-left border border-purple-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-purple-600">TOTAL</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">271</span>
            </div>
            <div className="bg-purple-50/50 rounded-xl p-2.5 text-left border border-purple-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-purple-600">TODAY</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">7</span>
            </div>
          </div>
          <UserCheck size={85} className="absolute -right-4 -bottom-4 text-purple-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 4: Follow Up */}
        <div className="bg-white rounded-2xl p-4 border border-orange-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Share2 size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide truncate">Follow Up</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-orange-50/50 rounded-xl p-2.5 text-left border border-orange-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-orange-600">TOTAL</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">993</span>
            </div>
            <div className="bg-orange-50/50 rounded-xl p-2.5 text-left border border-orange-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-orange-600">TODAY</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">19</span>
            </div>
          </div>
          <Share2 size={85} className="absolute -right-4 -bottom-4 text-orange-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 5: Status */}
        <div className="bg-white rounded-2xl p-4 border border-cyan-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Star size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Status</span>
          </div>
          <div className="z-10">
            <div className="bg-cyan-50/50 rounded-xl p-2.5 text-left border border-cyan-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-cyan-600">CONVERSION</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">3.16%</span>
            </div>
          </div>
          <Star size={85} className="absolute -right-4 -bottom-4 text-cyan-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* Row 2: Secondary Channel & Team Performance KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 6: Facebook Leads */}
        <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Facebook Leads</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-blue-50/50 rounded-xl p-2.5 text-left border border-blue-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-blue-600">TOTAL</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">1,000</span>
            </div>
            <div className="bg-blue-50/50 rounded-xl p-2.5 text-left border border-blue-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-blue-600">WEEK</span>
              <span className="text-xl font-extrabold text-emerald-600 tracking-tight">+12%</span>
            </div>
          </div>
          <Users size={85} className="absolute -right-4 -bottom-4 text-blue-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 7: WhatsApp & SMS */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageSquare size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">WhatsApp / SMS</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-emerald-50/50 rounded-xl p-2.5 text-left border border-emerald-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">WHATSAPP</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">80</span>
            </div>
            <div className="bg-emerald-50/50 rounded-xl p-2.5 text-left border border-emerald-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">SMS</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">30</span>
            </div>
          </div>
          <MessageSquare size={85} className="absolute -right-4 -bottom-4 text-emerald-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 8: Contacted Leads */}
        <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <PhoneCall size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Contacted Leads</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-amber-50/50 rounded-xl p-2.5 text-left border border-amber-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-amber-600">CONTACTED</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">500</span>
            </div>
            <div className="bg-amber-50/50 rounded-xl p-2.5 text-left border border-amber-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-amber-600">PENDING</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">30</span>
            </div>
          </div>
          <PhoneCall size={85} className="absolute -right-4 -bottom-4 text-amber-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 9: Sales Consultants */}
        <div className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Building2 size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Consultants</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-indigo-50/50 rounded-xl p-2.5 text-left border border-indigo-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-indigo-700">TOTAL</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">310</span>
            </div>
            <div className="bg-indigo-50/50 rounded-xl p-2.5 text-left border border-indigo-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-indigo-700">ACTIVE</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">130</span>
            </div>
          </div>
          <Building2 size={85} className="absolute -right-4 -bottom-4 text-indigo-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 10: Lost Leads */}
        <div className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <AlertCircle size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Lost Leads</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-indigo-50/50 rounded-xl p-2.5 text-left border border-indigo-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-indigo-700">TOTAL</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">1,658</span>
            </div>
            <div className="bg-indigo-50/50 rounded-xl p-2.5 text-left border border-indigo-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-indigo-700">TODAY</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">0</span>
            </div>
          </div>
          <AlertCircle size={85} className="absolute -right-4 -bottom-4 text-indigo-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* LEAD PIPELINE & INVENTORY MODULE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Pipeline Status Breakdown (Left 2 Cols) */}
        <div className="lg:col-span-2 bg-white p-4.5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <div>
              <h3 className="font-extrabold text-gray-900 text-sm tracking-tight">Lead Status & Pipeline Distribution</h3>
              <p className="text-[11px] text-gray-500">Breakdown of 8,565 lifetime leads by stage</p>
            </div>
            <button 
              onClick={() => onNavigate('lead')}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              <span>Manage Leads</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
            {leadPipeline.map((p, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-800">{p.stage}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-gray-900">{p.count}</span>
                    <span className="text-[10px] font-semibold text-gray-400">({p.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-300" 
                    style={{ width: `${p.percentage * 2}%`, backgroundColor: p.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue Progress */}
          <div className="pt-2 border-t border-gray-100 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-extrabold text-gray-800">Monthly Revenue Progress</span>
              <span className="font-extrabold text-emerald-600">৳42.8M / ৳50.0M (85.6%)</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500" 
                style={{ width: '85.6%', backgroundColor: '#c7a259' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Project Plot Inventory Summary (Right Col) */}
        <div className="bg-white p-4.5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <h3 className="font-extrabold text-gray-900 text-sm tracking-tight">Project Holdings</h3>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">Inventory</span>
          </div>

          <div className="space-y-2.5">
            {projectsSummary.map((proj, idx) => (
              <div key={idx} className="p-2.5 bg-gray-50/70 rounded-xl border border-gray-100 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-900 text-xs">{proj.name}</h4>
                  <span className="text-[10px] font-bold text-amber-700">{proj.price}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-gray-600">
                  <span>Sold: <strong className="text-emerald-700">{proj.sold}</strong> / {proj.totalPlots}</span>
                  <span>Avail: <strong className="text-amber-800">{proj.available} Plots</strong></span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${(proj.sold / proj.totalPlots) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ANALYTICS & CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: CRM Bar Chart */}
        <div className="lg:col-span-2 bg-white p-4.5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-gray-900 text-sm tracking-tight">7-Day CRM Call & Site Visit Trend</h3>
              <p className="text-[11px] text-gray-500">Contacted, Interested, Site Visits & Lost Leads</p>
            </div>
            <span className="text-[10px] text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg font-bold">
              Last 7 Days
            </span>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderRadius: '8px', color: '#FFF', border: 'none', fontSize: '11px' }}
                />
                <Bar dataKey="Contacted" fill="#10B981" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Interested" fill="#c7a259" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Site Visit" fill="#3B82F6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Lost" fill="#F43F5E" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 pt-2 text-xs font-semibold text-gray-600 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Contacted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#c7a259' }}></span>
              <span>Interested</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>Site Visit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>Lost</span>
            </div>
          </div>
        </div>

        {/* Right Col: Lost Lead Reasons & Important Alerts */}
        <div className="space-y-4">
          {/* Donut Chart Card */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2.5">
            <h3 className="font-extrabold text-gray-900 text-xs tracking-tight">Lost Lead Analysis by Reason</h3>
            <div className="flex items-center justify-between gap-2">
              <div className="h-28 w-28 relative shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={28}
                      outerRadius={42}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[9px] text-gray-400 font-medium">Top Cause</span>
                  <span className="text-[11px] font-extrabold text-gray-800">Unresponsive</span>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] font-medium text-gray-600 flex-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#c7a259' }}></span>
                    <span>Budget Issue</span>
                  </span>
                  <span className="font-bold text-gray-900">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Unresponsive</span>
                  </span>
                  <span className="font-bold text-gray-900">35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>Competitor</span>
                  </span>
                  <span className="font-bold text-gray-900">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                    <span>Location</span>
                  </span>
                  <span className="font-bold text-gray-900">15%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Alerts */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="font-extrabold text-gray-900 text-xs tracking-tight">Action Alerts & Notices</h3>
              <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">Live</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2 bg-amber-50/60 rounded-xl border border-amber-200/60 flex items-start gap-2">
                <Bell size={14} className="text-amber-700 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-amber-900 text-[11px]">Pending Plot Approvals</p>
                  <p className="text-[10px] text-amber-700">08 Plot Allotments Pending Signoff</p>
                </div>
              </div>

              <div className="p-2 bg-emerald-50/60 rounded-xl border border-emerald-200/60 flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-emerald-900 text-[11px]">Weekend Site Visit Tour</p>
                  <p className="text-[10px] text-emerald-700">Purbachal Rally Scheduled Saturday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

