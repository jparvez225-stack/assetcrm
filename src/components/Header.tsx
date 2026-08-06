import React from 'react';
import { 
  Bell, 
  Mail, 
  Search, 
  ArrowLeft,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  subtitle, 
  onBack, 
  showBack = false 
}) => {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {showBack && onBack && (
          <button 
            onClick={onBack}
            className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        )}
        <div>
          {title && <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>}
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick Search */}
        <div className="relative hidden md:block w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads, plots, clients..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors relative">
            <Mail size={18} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
          </button>
        </div>

        {/* User Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
            alt="Ahmed Karim"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-gray-800 leading-none">Ahmed Karim</p>
            <p className="text-[10px] text-gray-500 mt-0.5">ahmed@gmail.com</p>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
};
