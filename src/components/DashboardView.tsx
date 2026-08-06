import React from 'react';
import { NavItem } from '../types';
import { 
  Users, 
  PhoneCall, 
  UserCheck, 
  Share2, 
  MessageSquare, 
  Eye, 
  HelpCircle, 
  AlertCircle,
  FileCheck,
  TrendingUp,
  ArrowRight,
  Bell
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

  // Lost Lead By Reason Pie Chart Data
  const pieData = [
    { name: 'Budget', value: 30, color: '#059669' },       // Emerald
    { name: 'Unresponsive', value: 35, color: '#D4AF37' }, // Gold/Primary
    { name: 'Competitor', value: 40, color: '#10B981' },   // Emerald light
    { name: 'Location Issue', value: 15, color: '#F59E0B' },// Amber
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner & Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">
            Hi! <span className="font-semibold text-gray-800">Mehesum Rahman</span>, Welcome to Promise Assets Limited Real Estate CRM.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('add-lead')}
            className="px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2"
            style={{ backgroundColor: '#D4AF37' }}
          >
            <span>+ Add New Lead</span>
          </button>
          <button className="px-3 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            Back To Admin Dashboard
          </button>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 tracking-tight">Customer Relationship Management</h2>

      {/* Top Cards Section (3 Main Colored Containers matching reference design) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Leads Overview (Blue Theme) */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-blue-400/40 pb-3">
            <h3 className="font-semibold text-base flex items-center gap-2">
              <Users size={18} />
              <span>Leads Overview</span>
            </h3>
            <span className="text-xs bg-blue-400/30 px-2 py-0.5 rounded text-blue-100 font-medium">Real-time</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-blue-100 font-medium">Facebook Leads</p>
              <p className="text-2xl font-extrabold mt-1">1000</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-blue-100 font-medium">Whatsapp Leads</p>
              <p className="text-2xl font-extrabold mt-1">80</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-blue-100 font-medium">SMS Campaign</p>
              <p className="text-2xl font-extrabold mt-1">30</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-blue-100 font-medium">Visitor Queries</p>
              <p className="text-2xl font-extrabold mt-1">10</p>
            </div>
          </div>
        </div>

        {/* Card 2: CRM Overview (Cyan/Teal Theme) */}
        <div className="bg-gradient-to-br from-cyan-500 to-teal-600 text-white rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-400/40 pb-3">
            <h3 className="font-semibold text-base flex items-center gap-2">
              <PhoneCall size={18} />
              <span>CRM Overview</span>
            </h3>
            <span className="text-xs bg-cyan-400/30 px-2 py-0.5 rounded text-cyan-100 font-medium">Pipeline</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-cyan-100 font-medium">Contacted</p>
              <p className="text-2xl font-extrabold mt-1">500</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-cyan-100 font-medium">Interested</p>
              <p className="text-2xl font-extrabold mt-1">100</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-cyan-100 font-medium">Not Contacted</p>
              <p className="text-2xl font-extrabold mt-1">30</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-cyan-100 font-medium">Lost Leads</p>
              <p className="text-2xl font-extrabold mt-1">370</p>
            </div>
          </div>
        </div>

        {/* Card 3: Salesman Overview (Purple/Amber Accent Theme) */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-purple-400/40 pb-3">
            <h3 className="font-semibold text-base flex items-center gap-2">
              <UserCheck size={18} />
              <span>Salesman Overview</span>
            </h3>
            <span className="text-xs bg-purple-400/30 px-2 py-0.5 rounded text-purple-100 font-medium">Team</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-purple-100 font-medium">Total Salesmen</p>
              <p className="text-2xl font-extrabold mt-1">1000</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-purple-100 font-medium">Active Salesmen</p>
              <p className="text-2xl font-extrabold mt-1">80</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 col-span-2">
              <p className="text-xs text-purple-100 font-medium">Top Performers</p>
              <p className="text-2xl font-extrabold mt-1">30</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics & Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: CRM Bar Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-lg">CRM Overview Performance</h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
              Last 7 Days
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderRadius: '8px', color: '#FFF', border: 'none' }}
                />
                <Bar dataKey="Contacted" fill="#059669" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Interested" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Site Visit" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Lost" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-medium text-gray-600 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
              <span>Contacted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#D4AF37' }}></span>
              <span>Interested</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span>Site Visit</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span>Lost</span>
            </div>
          </div>
        </div>

        {/* Right Col: Lost Lead By Reason & Important Notices */}
        <div className="space-y-6">
          {/* Lost Lead By Reason Donut Chart */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <h3 className="font-bold text-gray-800 text-base">Lost Lead By Reason</h3>
            <div className="flex items-center justify-between">
              <div className="h-36 w-36 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={38}
                      outerRadius={55}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-gray-400 font-medium">Budget</span>
                  <span className="text-sm font-bold text-gray-800">30%</span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-medium text-gray-600">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                    <span>Budget</span>
                  </div>
                  <span className="font-bold text-gray-800">30%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Unresponsive</span>
                  </div>
                  <span className="font-bold text-gray-800">35%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>Competitor</span>
                  </div>
                  <span className="font-bold text-gray-800">40%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span>Location Issue</span>
                  </div>
                  <span className="font-bold text-gray-800">15%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice Widget */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-base">Important Notice</h3>
              <span className="text-xs text-amber-600 font-semibold cursor-pointer">Recent</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2.5">
                <Bell size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-emerald-900">New Plot Support Tickets</p>
                  <p className="text-emerald-700">15 Items Pending Inquiry Response</p>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-2.5">
                <FileCheck size={16} className="text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-amber-900">Pending Plot Bookings</p>
                  <p className="text-amber-700">08 Plot Allotments Pending Approval</p>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-2.5">
                <AlertCircle size={16} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-blue-900">Weekend Site Visit Rally</p>
                  <p className="text-blue-700">Purbachal Sector 4 Tour Scheduled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
