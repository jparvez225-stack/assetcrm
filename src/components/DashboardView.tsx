import React from 'react';
import { NavItem } from '../types';
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  Bell, 
  Target, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  Share2,
  DollarSign,
  Building2,
  WalletCards,
  Home,
  HeartHandshake,
  Clock
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
    { day: 'Day 1', FollowUp: 18, Interested: 8, 'Site Visit': 5, Booked: 2 },
    { day: 'Day 2', FollowUp: 22, Interested: 10, 'Site Visit': 4, Booked: 3 },
    { day: 'Day 3', FollowUp: 16, Interested: 7, 'Site Visit': 6, Booked: 1 },
    { day: 'Day 4', FollowUp: 24, Interested: 12, 'Site Visit': 8, Booked: 4 },
    { day: 'Day 5', FollowUp: 19, Interested: 9, 'Site Visit': 5, Booked: 2 },
    { day: 'Day 6', FollowUp: 21, Interested: 11, 'Site Visit': 6, Booked: 3 },
    { day: 'Day 7', FollowUp: 26, Interested: 14, 'Site Visit': 9, Booked: 5 },
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
    { stage: 'Follow Up Scheduled', count: '993', percentage: 11.6, color: '#F59E0B' },
    { stage: 'Interested Prospects', count: '485', percentage: 5.7, color: '#EC4899' },
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
          <h1 className="text-base font-extrabold text-gray-900 tracking-tight">Executive Dashboard Overview</h1>
          <p className="text-xs text-gray-500">
            Welcome back, <span className="font-semibold text-gray-800">Mehesum Rahman</span>. Accounts, Sales, Inventory & CRM Overview.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate('add-lead')}
            className="px-3.5 py-1.5 text-xs font-bold text-white rounded-xl shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
            style={{ backgroundColor: '#c7a259' }}
          >
            <Sparkles size={14} />
            <span>Add New</span>
          </button>
          <button 
            onClick={() => onNavigate('lead')}
            className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-2xs"
          >
            View All Leads
          </button>
        </div>
      </div>

      {/* Primary Categorized Dashboard KPI Cards Grid (4 Columns x 2 Rows) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* CARD 1: ACCOUNTS - Sales Revenue */}
        <div 
          onClick={() => onNavigate('accounts-all-projects')}
          className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3 z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign size={18} />
              </div>
              <div>
                <span className="font-extrabold text-sm text-gray-900 tracking-wide block">Sales Revenue</span>
                <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">Accounts</span>
              </div>
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

        {/* CARD 2: ACCOUNTS - Financial Ledger */}
        <div 
          onClick={() => onNavigate('accounts-all-projects')}
          className="bg-white rounded-2xl p-4 border border-amber-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3 z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <WalletCards size={18} />
              </div>
              <div>
                <span className="font-extrabold text-sm text-gray-900 tracking-wide block">Accounts Ledger</span>
                <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">Accounts</span>
              </div>
            </div>
            <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">Collected</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-amber-50/50 rounded-xl p-2.5 text-left border border-amber-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-amber-600">RECEIVED</span>
              <span className="text-lg font-extrabold text-gray-900 tracking-tight">৳30.3M</span>
            </div>
            <div className="bg-amber-50/50 rounded-xl p-2.5 text-left border border-amber-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-amber-600">PENDING</span>
              <span className="text-lg font-extrabold text-gray-900 tracking-tight">৳12.5M</span>
            </div>
          </div>
          <WalletCards size={85} className="absolute -right-4 -bottom-4 text-amber-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* CARD 3: SALES - Plot / Flat Bookings */}
        <div 
          onClick={() => onNavigate('inventory-all-projects')}
          className="bg-white rounded-2xl p-4 border border-purple-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3 z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <UserCheck size={18} />
              </div>
              <div>
                <span className="font-extrabold text-sm text-gray-900 tracking-wide block">Unit Bookings</span>
                <span className="text-[10px] text-purple-700 font-bold uppercase tracking-wider">Sales</span>
              </div>
            </div>
            <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">+8.5%</span>
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

        {/* CARD 4: SALES - Performance & Commissions */}
        <div 
          onClick={() => onNavigate('salesman-performance')}
          className="bg-white rounded-2xl p-4 border border-blue-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3 z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <TrendingUp size={18} />
              </div>
              <div>
                <span className="font-extrabold text-sm text-gray-900 tracking-wide block">Sales Performance</span>
                <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wider">Sales</span>
              </div>
            </div>
            <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">5% Comm.</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-blue-50/50 rounded-xl p-2.5 text-left border border-blue-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-blue-600">SOLD VALUE</span>
              <span className="text-lg font-extrabold text-gray-900 tracking-tight">৳38.5M</span>
            </div>
            <div className="bg-blue-50/50 rounded-xl p-2.5 text-left border border-blue-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-blue-600">COMMISSION</span>
              <span className="text-lg font-extrabold text-gray-900 tracking-tight">৳1.92M</span>
            </div>
          </div>
          <TrendingUp size={85} className="absolute -right-4 -bottom-4 text-blue-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* CARD 5: INVENTORY - Stock Overview */}
        <div 
          onClick={() => onNavigate('inventory-flats-plot-stock')}
          className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3 z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Home size={18} />
              </div>
              <div>
                <span className="font-extrabold text-sm text-gray-900 tracking-wide block">Inventory Stock</span>
                <span className="text-[10px] text-indigo-700 font-bold uppercase tracking-wider">Inventory</span>
              </div>
            </div>
            <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">75% Sold</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-indigo-50/50 rounded-xl p-2.5 text-left border border-indigo-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">TOTAL UNITS</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">595</span>
            </div>
            <div className="bg-indigo-50/50 rounded-xl p-2.5 text-left border border-indigo-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">AVAILABLE</span>
              <span className="text-xl font-extrabold text-indigo-700 tracking-tight">145</span>
            </div>
          </div>
          <Home size={85} className="absolute -right-4 -bottom-4 text-indigo-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* CARD 6: INVENTORY - All Projects */}
        <div 
          onClick={() => onNavigate('inventory-all-projects')}
          className="bg-white rounded-2xl p-4 border border-teal-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3 z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Building2 size={18} />
              </div>
              <div>
                <span className="font-extrabold text-sm text-gray-900 tracking-wide block">All Projects</span>
                <span className="text-[10px] text-teal-700 font-bold uppercase tracking-wider">Inventory</span>
              </div>
            </div>
            <span className="text-[9px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">8 Projects</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-teal-50/50 rounded-xl p-2.5 text-left border border-teal-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-teal-600">ONGOING</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">5</span>
            </div>
            <div className="bg-teal-50/50 rounded-xl p-2.5 text-left border border-teal-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-teal-600">UPCOMING</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">3</span>
            </div>
          </div>
          <Building2 size={85} className="absolute -right-4 -bottom-4 text-teal-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* CARD 7: CRM - Follow Up Leads */}
        <div 
          onClick={() => onNavigate('lead-activity')}
          className="bg-white rounded-2xl p-4 border border-orange-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3 z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Clock size={18} />
              </div>
              <div>
                <span className="font-extrabold text-sm text-gray-900 tracking-wide block">Follow Up</span>
                <span className="text-[10px] text-orange-700 font-bold uppercase tracking-wider">CRM</span>
              </div>
            </div>
            <span className="text-[9px] font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">Action Due</span>
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
          <Clock size={85} className="absolute -right-4 -bottom-4 text-orange-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* CARD 8: CRM - Interested Leads */}
        <div 
          onClick={() => onNavigate('lead')}
          className="bg-white rounded-2xl p-4 border border-rose-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3 z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <HeartHandshake size={18} />
              </div>
              <div>
                <span className="font-extrabold text-sm text-gray-900 tracking-wide block">Interested Leads</span>
                <span className="text-[10px] text-rose-700 font-bold uppercase tracking-wider">CRM</span>
              </div>
            </div>
            <span className="text-[9px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">Hot Leads</span>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10">
            <div className="bg-rose-50/50 rounded-xl p-2.5 text-left border border-rose-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-rose-600">TOTAL</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">485</span>
            </div>
            <div className="bg-rose-50/50 rounded-xl p-2.5 text-left border border-rose-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-rose-600">HIGH INTEREST</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">120</span>
            </div>
          </div>
          <HeartHandshake size={85} className="absolute -right-4 -bottom-4 text-rose-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
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
              <h3 className="font-extrabold text-gray-900 text-sm tracking-tight">7-Day Performance & Activity Trend</h3>
              <p className="text-[11px] text-gray-500">Follow Up, Interested Prospects, Site Visits & Unit Bookings</p>
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
                <Bar dataKey="FollowUp" fill="#F97316" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Interested" fill="#EC4899" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Site Visit" fill="#3B82F6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Booked" fill="#10B981" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 pt-2 text-xs font-semibold text-gray-600 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              <span>Follow Up</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
              <span>Interested</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>Site Visit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Booked</span>
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

