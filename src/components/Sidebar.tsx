import React, { useState } from 'react';
import { NavItem } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  Layers, 
  UserCheck, 
  Share2, 
  Bell, 
  FileText,
  UserPlus,
  ChevronDown,
  ChevronRight,
  Briefcase,
  Settings,
  Database,
  Building2
} from 'lucide-react';

interface SidebarProps {
  currentNav: NavItem;
  onNavigate: (nav: NavItem) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentNav, onNavigate }) => {
  const [crmExpanded, setCrmExpanded] = useState(true);

  const crmSubItems: { id: NavItem; label: string; badge?: string }[] = [
    { id: 'lead', label: 'Leads' },
    { id: 'add-lead', label: 'Add CRM Lead' },
    { id: 'lead-activity', label: 'Lead Activities' },
    { id: 'lead-category', label: 'Lead Categories' },
    { id: 'salesman-performance', label: 'Salesman Performance' },
    { id: 'referral', label: 'Lead Referrers' },
    { id: 'notification', label: 'All Notifications', badge: '5' },
    { id: 'report', label: 'Lead Reports' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200/80 flex flex-col min-h-screen select-none shrink-0 font-sans text-xs">
      {/* Top ERP Brand Header Badge - Styled like PDF Header "EL ERP System Enterprise" */}
      <div className="px-4 py-3.5 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-2.5">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold text-sm shadow-sm"
            style={{ backgroundColor: '#D4AF37' }}
          >
            P
          </div>
          <div>
            <span className="font-extrabold text-gray-900 text-xs tracking-tight block leading-tight">
              PROMISE ERP
            </span>
            <span className="text-[10px] text-amber-600 font-semibold tracking-wider uppercase block">
              Real Estate Enterprise
            </span>
          </div>
        </div>
      </div>

      {/* Grouped Sidebar Navigation matching PDF Pages 1-18 */}
      <div className="py-3 px-2 flex-1 overflow-y-auto space-y-4">
        {/* Main Dashboard */}
        <div>
          <button
            onClick={() => onNavigate('dashboard')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-semibold transition-all ${
              currentNav === 'dashboard'
                ? 'bg-amber-50 text-amber-700 border-l-4 border-amber-500 shadow-xs'
                : 'text-gray-700 hover:bg-gray-100/70'
            }`}
          >
            <LayoutDashboard size={16} className={currentNav === 'dashboard' ? 'text-amber-600' : 'text-gray-500'} />
            <span>Dashboard</span>
          </button>
        </div>

        {/* CRM Group */}
        <div>
          <div className="px-3 pb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
            <span>CRM Management</span>
          </div>
          
          <div className="space-y-0.5">
            <button
              onClick={() => setCrmExpanded(!crmExpanded)}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-100/70 font-semibold transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Users size={15} className="text-amber-600" />
                <span>CRM Management</span>
              </div>
              {crmExpanded ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
            </button>

            {crmExpanded && (
              <div className="ml-3 pl-3 border-l border-amber-200/80 space-y-0.5 my-1">
                {crmSubItems.map((item) => {
                  const isActive = currentNav === item.id ||
                    (item.id === 'lead-activity' && currentNav === 'call-history');

                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all text-left ${
                        isActive
                          ? 'bg-amber-100/70 text-amber-900 font-bold shadow-2xs'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium'
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-500 text-white shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Additional ERP Modules (Read-only nav indicators matching PDF) */}
        <div>
          <div className="px-3 pb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Inventory & Operations
          </div>
          <div className="space-y-0.5 text-gray-500">
            <div className="flex items-center justify-between px-3 py-1.5 rounded-md hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <Building2 size={15} className="text-gray-400" />
                <span>Property Holdings</span>
              </div>
              <ChevronRight size={13} className="text-gray-300" />
            </div>
            <div className="flex items-center justify-between px-3 py-1.5 rounded-md hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <Database size={15} className="text-gray-400" />
                <span>Plot Allocation</span>
              </div>
              <ChevronRight size={13} className="text-gray-300" />
            </div>
            <div className="flex items-center justify-between px-3 py-1.5 rounded-md hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <Settings size={15} className="text-gray-400" />
                <span>System Settings</span>
              </div>
              <ChevronRight size={13} className="text-gray-300" />
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Footer matching PDF */}
      <div className="p-3 border-t border-gray-100 bg-gray-50/80">
        <div className="flex items-center gap-2.5">
          <div 
            className="w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#D4AF37' }}
          >
            SA
          </div>
          <div className="overflow-hidden leading-tight">
            <p className="text-xs font-bold text-gray-800 truncate">Super Admin</p>
            <p className="text-[10px] text-gray-400 truncate">admin@promiseassets.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

