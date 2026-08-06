import React from 'react';
import { NavItem } from '../types';
import { 
  Users, 
  PhoneCall, 
  UserCheck, 
  MessageSquare, 
  Eye, 
  FileCheck,
  TrendingUp,
  ArrowRight,
  Bell,
  Building,
  Target,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  MapPin,
  ChevronRight
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
  // Bar Chart Data matching CRM Overview (Days vs Contacted, Interested, Site Visit, Lost)
  const barChartData = [
    { day: 'Day 1', Contacted: 18, Interested: 8, 'Site Visit': 5, Lost: 6 },
    { day: 'Day 2', Contacted: 22, Interested: 10, 'Site Visit': 4, Lost: 3 },
    { day: 'Day 3', Contacted: 16, Interested: 7, 'Site Visit': 6, Lost: 4 },
    { day: 'Day 4', Contacted: 24, Interested: 12, 'Site Visit': 8, Lost: 5 },
    { day: 'Day 5', Contacted: 19, Interested: 9, 'Site Visit': 5, Lost: 4 },
    { day: 'Day 6', Contacted: 21, Interested: 11, 'Site Visit': 6, Lost: 2 },
    { day: 'Day 7', Contacted: 26, Interested: 14, 'Site Visit': 9, Lost: 3 },
  ];

  // Lost Lead By Reason Pie Chart Data - Soft Harmonious Palette
  const pieData = [
    { name: 'Unresponsive', value: 35, color: '#F43F5E' },
    { name: 'Budget Issue', value: 30, color: '#F59E0B' },
    { name: 'Competitor', value: 20, color: '#6366F1' },
    { name: 'Location Issue', value: 15, color: '#64748B' },
  ];

  // Top Sales Consultants Leaderboard
  const topSalesmen = [
    { id: '1', name: 'Md. Rahim Sarder', title: 'Sr. Executive Consultant', leads: 142, booked: 18, rate: 12.6, score: 92 },
    { id: '2', name: 'Nusrat Jahan', title: 'Property Manager', leads: 128, booked: 15, rate: 11.7, score: 89 },
    { id: '3', name: 'Tanvir Hossain', title: 'Sales Consultant', leads: 110, booked: 12, rate: 10.9, score: 85 },
    { id: '4', name: 'Sharmin Akter', title: 'Customer Relations', leads: 95, booked: 9, rate: 9.4, score: 81 },
  ];

  // Lead Pipeline Stages - Golden Progress Bar Color Palette
  const leadPipeline = [
    { stage: 'New Inquiries', count: '1,240', percentage: 14.5, color: '#D4AF37' },
    { stage: 'Initial Contacted', count: '3,820', percentage: 44.6, color: '#C59B27' },
    { stage: 'Follow Up & Site Visit', count: '974', percentage: 11.4, color: '#E5C158' },
    { stage: 'Token Deposit Paid', count: '180', percentage: 2.1, color: '#B8860B' },
    { stage: 'Enrolled / Plot Booked', count: '264', percentage: 3.1, color: '#9A7B1C' },
    { stage: 'Closed / Inactive', count: '2,080', percentage: 24.3, color: '#A38A40' },
  ];

  // Project Inventory Overview
  const projectsSummary = [
    { name: 'Purbachal Green Valley', totalPlots: 250, sold: 180, available: 70, price: '৳12L / Katha' },
    { name: 'Bashundhara Luxury Heights', totalPlots: 120, sold: 92, available: 28, price: '৳28L / Katha' },
    { name: 'Gulshan Commercial Plaza', totalPlots: 45, sold: 38, available: 7, price: '৳85L / Unit' },
    { name: 'Uttara Model Town Sector 14', totalPlots: 180, sold: 140, available: 40, price: '৳18L / Katha' },
  ];

  return (
    <div className="space-y-6 max-w-full font-sans">
      {/* Top Banner & Welcome Card - Minimal White & Gold */}
      <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#D4AF37' }}></span>
            <span className="text-[10px] font-bold tracking-wider uppercase text-amber-700">Promise Assets Real Estate CRM</span>
          </div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Dashboard Overview</h1>
          <p className="text-xs text-gray-500">
            Welcome back, <span className="font-semibold text-gray-800">Mehesum Rahman</span>. Here is your real estate sales summary.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => onNavigate('add-lead')}
            className="px-4 py-2 text-xs font-bold text-white rounded-md shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
            style={{ backgroundColor: '#D4AF37' }}
          >
            <Plus size={14} />
            <span>Add New Lead</span>
          </button>
          <button 
            onClick={() => onNavigate('lead')}
            className="px-3.5 py-2 text-xs font-bold text-amber-900 bg-white border-2 border-[#D4AF37] rounded-md hover:bg-amber-50 transition-colors shadow-2xs"
          >
            View All Leads
          </button>
        </div>
      </div>

      {/* SALES & REVENUE OVERVIEW MODULE - Minimal White & Gold */}
      <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 uppercase tracking-wider">
              Monthly Sales Overview
            </span>
            <h2 className="text-sm font-extrabold text-gray-900 mt-1">Real Estate Revenue & Plot Allotment Metrics</h2>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-gray-500">Monthly Target: ৳50.0M</span>
          </div>
        </div>

        {/* 4 Minimal Sales Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-lg border border-gray-100 bg-gray-50/50 space-y-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Sales Volume</span>
            <p className="text-xl font-extrabold text-gray-900">৳42,800,000</p>
            <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp size={11} /> +14.2% from last month
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-gray-100 bg-gray-50/50 space-y-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Plots Allotted / Sold</span>
            <p className="text-xl font-extrabold text-gray-900">18 Units</p>
            <p className="text-[10px] text-gray-500">Avg 4.5 Katha per allotment</p>
          </div>

          <div className="p-3.5 rounded-lg border border-gray-100 bg-gray-50/50 space-y-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Avg Deal Value</span>
            <p className="text-xl font-extrabold text-gray-900">৳2,380,000</p>
            <p className="text-[10px] text-amber-700 font-semibold">Residential & Commercial</p>
          </div>

          <div className="p-3.5 rounded-lg border border-gray-100 bg-gray-50/50 space-y-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lead Conversion Rate</span>
            <p className="text-xl font-extrabold text-emerald-600">3.08%</p>
            <p className="text-[10px] text-gray-500">264 Total Enrolled Bookings</p>
          </div>
        </div>

        {/* Monthly Target Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-gray-700">Monthly Revenue Goal Progress</span>
            <span className="font-extrabold text-gray-900">৳42.8M / ৳50.0M (85.6%)</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ width: '85.6%', backgroundColor: '#D4AF37' }}
            ></div>
          </div>
        </div>
      </div>

      {/* SINGLE MINIMAL KPI CARDS SECTION (Individual cards, no grouped color blocks) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Core CRM Metrics & Channel Performance</h2>
          <span className="text-[11px] text-gray-400">All cards individual & minimal</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {/* Card 1: Facebook Leads */}
          <div className="p-4 bg-white rounded-xl border border-gray-200/80 shadow-2xs hover:border-amber-400/80 transition-colors space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Facebook Leads</span>
              <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center text-amber-700">
                <Users size={13} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">1,000</p>
            <p className="text-[10px] text-emerald-600 font-semibold">+12% new this week</p>
          </div>

          {/* Card 2: WhatsApp Leads */}
          <div className="p-4 bg-white rounded-xl border border-gray-200/80 shadow-2xs hover:border-amber-400/80 transition-colors space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">WhatsApp Leads</span>
              <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center text-amber-700">
                <MessageSquare size={13} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">80</p>
            <p className="text-[10px] text-gray-500">Direct instant chat</p>
          </div>

          {/* Card 3: SMS Campaign */}
          <div className="p-4 bg-white rounded-xl border border-gray-200/80 shadow-2xs hover:border-amber-400/80 transition-colors space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">SMS Campaign</span>
              <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center text-amber-700">
                <PhoneCall size={13} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">30</p>
            <p className="text-[10px] text-gray-500">Bulk SMS responses</p>
          </div>

          {/* Card 4: Visitor Queries */}
          <div className="p-4 bg-white rounded-xl border border-gray-200/80 shadow-2xs hover:border-amber-400/80 transition-colors space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Visitor Queries</span>
              <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center text-amber-700">
                <Eye size={13} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">10</p>
            <p className="text-[10px] text-gray-500">Web portal visitors</p>
          </div>

          {/* Card 5: Contacted Leads */}
          <div className="p-4 bg-white rounded-xl border border-gray-200/80 shadow-2xs hover:border-amber-400/80 transition-colors space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Contacted Leads</span>
              <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-700">
                <PhoneCall size={13} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">500</p>
            <p className="text-[10px] text-emerald-600 font-semibold">Active call logs</p>
          </div>

          {/* Card 6: Interested Leads */}
          <div className="p-4 bg-white rounded-xl border border-gray-200/80 shadow-2xs hover:border-amber-400/80 transition-colors space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Interested Prospects</span>
              <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center text-amber-700">
                <Target size={13} />
              </div>
            </div>
            <p className="text-2xl font-extrabold font-sans text-gray-900">100</p>
            <p className="text-[10px] text-amber-700 font-semibold">Site visit scheduled</p>
          </div>

          {/* Card 7: Not Contacted */}
          <div className="p-4 bg-white rounded-xl border border-gray-200/80 shadow-2xs hover:border-amber-400/80 transition-colors space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Pending Contact</span>
              <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-gray-600">
                <Clock size={13} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">30</p>
            <p className="text-[10px] text-gray-500">Requires assignment</p>
          </div>

          {/* Card 8: Lost Leads */}
          <div className="p-4 bg-white rounded-xl border border-gray-200/80 shadow-2xs hover:border-amber-400/80 transition-colors space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lost Leads</span>
              <div className="w-6 h-6 rounded-md bg-rose-50 flex items-center justify-center text-rose-600">
                <Bell size={13} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">370</p>
            <p className="text-[10px] text-rose-500 font-semibold">Archived / Unresponsive</p>
          </div>

          {/* Card 9: Total Salesmen */}
          <div className="p-4 bg-white rounded-xl border border-gray-200/80 shadow-2xs hover:border-amber-400/80 transition-colors space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Consultants</span>
              <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center text-amber-700">
                <UserCheck size={13} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">310</p>
            <p className="text-[10px] text-gray-500">12 Regional branches</p>
          </div>

          {/* Card 10: Active Salesmen */}
          <div className="p-4 bg-white rounded-xl border border-gray-200/80 shadow-2xs hover:border-amber-400/80 transition-colors space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Active Executives</span>
              <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-700">
                <UserCheck size={13} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">130</p>
            <p className="text-[10px] text-emerald-600 font-semibold">Handling active leads</p>
          </div>

          {/* Card 11: Top Performers */}
          <div className="p-4 bg-white rounded-xl border border-gray-200/80 shadow-2xs hover:border-amber-400/80 transition-colors space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Top Counselors</span>
              <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center text-amber-700">
                <Sparkles size={13} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-amber-800">30</p>
            <p className="text-[10px] text-amber-700 font-semibold">High conversion score</p>
          </div>

          {/* Card 12: Total Plot Bookings */}
          <div className="p-4 bg-white rounded-xl border border-gray-200/80 shadow-2xs hover:border-amber-400/80 transition-colors space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Plot Bookings</span>
              <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-700">
                <FileCheck size={13} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-emerald-600">264</p>
            <p className="text-[10px] text-emerald-700 font-semibold">Confirmed allotments</p>
          </div>
        </div>
      </div>

      {/* LEAD PIPELINE & BREAKDOWN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Status Breakdown (Left 2 Cols) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="font-extrabold text-gray-900 text-sm">Lead Status & Pipeline Distribution</h3>
              <p className="text-[11px] text-gray-500">Breakdown of 8,558 lifetime leads by stage</p>
            </div>
            <button 
              onClick={() => onNavigate('lead')}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              <span>Manage Leads</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {leadPipeline.map((p, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-800">{p.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-gray-900">{p.count} Leads</span>
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
        </div>

        {/* Project Plot Inventory Summary (Right Col) */}
        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-extrabold text-gray-900 text-sm">Project Holdings & Plots</h3>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Inventory</span>
          </div>

          <div className="space-y-3">
            {projectsSummary.map((proj, idx) => (
              <div key={idx} className="p-3 bg-gray-50/70 rounded-lg border border-gray-100 space-y-1.5">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-900 text-xs">{proj.name}</h4>
                  <span className="text-[10px] font-bold text-amber-700">{proj.price}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-600">
                  <span>Sold: <strong className="text-amber-800">{proj.sold}</strong> / {proj.totalPlots}</span>
                  <span>Available: <strong className="text-amber-900">{proj.available} Plots</strong></span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${(proj.sold / proj.totalPlots) * 100}%`, backgroundColor: '#D4AF37' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ANALYTICS & CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: CRM Bar Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-gray-900 text-sm">7-Day CRM Call & Site Visit Trend</h3>
              <p className="text-[11px] text-gray-500">Contacted, Interested, Site Visits & Lost Leads</p>
            </div>
            <span className="text-[10px] text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md font-bold">
              Last 7 Days
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderRadius: '8px', color: '#FFF', border: 'none', fontSize: '11px' }}
                />
                <Bar dataKey="Contacted" fill="#10B981" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Interested" fill="#D4AF37" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Site Visit" fill="#3B82F6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Lost" fill="#F43F5E" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 pt-2 text-xs font-semibold text-gray-600 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#10B981' }}></span>
              <span>Contacted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#D4AF37' }}></span>
              <span>Interested</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#3B82F6' }}></span>
              <span>Site Visit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#F43F5E' }}></span>
              <span>Lost</span>
            </div>
          </div>
        </div>

        {/* Right Col: Lost Lead Reasons & Important Alerts */}
        <div className="space-y-6">
          {/* Donut Chart Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-gray-900 text-xs">Lost Lead Analysis by Reason</h3>
            <div className="flex items-center justify-between gap-2">
              <div className="h-32 w-32 relative shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={32}
                      outerRadius={48}
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
                  <span className="text-[10px] text-gray-400 font-medium">Top Cause</span>
                  <span className="text-xs font-extrabold text-gray-800">Unresponsive</span>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] font-medium text-gray-600 flex-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F43F5E' }}></span>
                    <span>Unresponsive</span>
                  </span>
                  <span className="font-bold text-gray-900">35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F59E0B' }}></span>
                    <span>Budget Issue</span>
                  </span>
                  <span className="font-bold text-gray-900">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#6366F1' }}></span>
                    <span>Competitor</span>
                  </span>
                  <span className="font-bold text-gray-900">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#64748B' }}></span>
                    <span>Location</span>
                  </span>
                  <span className="font-bold text-gray-900">15%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notices */}
          <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="font-extrabold text-gray-900 text-xs">Action Alerts & Notices</h3>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Live</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-amber-50/60 rounded-lg border border-amber-200/60 flex items-start gap-2">
                <Bell size={14} className="text-amber-700 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-amber-900 text-[11px]">Pending Plot Approvals</p>
                  <p className="text-[10px] text-amber-700">08 Plot Allotments Pending Final Signoff</p>
                </div>
              </div>

              <div className="p-2.5 bg-emerald-50/60 rounded-lg border border-emerald-200/60 flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-emerald-900 text-[11px]">Weekend Site Visit Tour</p>
                  <p className="text-[10px] text-emerald-700">Purbachal Sector 4 Rally Scheduled Saturday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SALESMAN PERFORMANCE & LEADERBOARD MODULE */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h3 className="font-extrabold text-gray-900 text-xs">Top Property Consultant Performance</h3>
            <p className="text-[10px] text-gray-500">Executives ranked by lead conversions and plot allotments</p>
          </div>
          <button 
            onClick={() => onNavigate('salesman-performance')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            <span>Full Salesman Report</span>
            <ChevronRight size={13} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/70 text-[10px] font-bold text-gray-600 uppercase border-b border-gray-200 tracking-wider">
                <th className="py-2.5 px-4">Counselor Name</th>
                <th className="py-2.5 px-3 text-center">Assigned Leads</th>
                <th className="py-2.5 px-3 text-center">Plots Booked</th>
                <th className="py-2.5 px-3 text-center">Conversion %</th>
                <th className="py-2.5 px-4 text-center">Performance Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {topSalesmen.map((s) => (
                <tr key={s.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-bold text-gray-900">{s.name}</p>
                    <p className="text-[10px] text-gray-500">{s.title}</p>
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-gray-800">{s.leads}</td>
                  <td className="py-3 px-3 text-center font-extrabold text-emerald-600">{s.booked} Units</td>
                  <td className="py-3 px-3 text-center font-bold text-blue-600">{s.rate}%</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                      {s.score} / 100
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
