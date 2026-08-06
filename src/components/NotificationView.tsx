import React, { useState } from 'react';
import { NotificationItem } from '../types';
import { Bell, Check, Trash2, CheckCircle2 } from 'lucide-react';

interface NotificationViewProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationView: React.FC<NotificationViewProps> = ({ 
  notifications, 
  onMarkAllRead 
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [items, setItems] = useState<NotificationItem[]>(notifications);

  const toggleRead = (id: string) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  };

  const filteredItems = items.filter(n => filter === 'all' ? true : !n.isRead);

  return (
    <div className="space-y-5 max-w-full font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Notification Center</h1>
          <p className="text-xs text-gray-500">Real-time alerts for lead follow-ups, site visits, and plot bookings</p>
        </div>

        <button 
          onClick={() => {
            onMarkAllRead();
            setItems(prev => prev.map(n => ({ ...n, isRead: true })));
          }}
          className="px-3.5 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
          style={{ backgroundColor: '#D4AF37' }}
        >
          <CheckCircle2 size={14} />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Top Minimal White & Gold KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-2xs flex justify-between items-center">
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Notifications</p>
            <p className="text-2xl font-extrabold text-gray-900 mt-0.5">500</p>
          </div>
          <div className="w-9 h-9 rounded-md bg-amber-50 flex items-center justify-center text-amber-700">
            <Bell size={18} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-2xs flex justify-between items-center">
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Unread Alerts</p>
            <p className="text-2xl font-extrabold text-amber-800 mt-0.5">200</p>
          </div>
          <div className="w-9 h-9 rounded-md bg-amber-100/70 flex items-center justify-center text-amber-800">
            <Bell size={18} />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200/60 pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
            filter === 'all'
              ? 'text-white shadow-2xs'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          style={filter === 'all' ? { backgroundColor: '#D4AF37' } : {}}
        >
          All Notifications
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
            filter === 'unread'
              ? 'text-white shadow-2xs'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          style={filter === 'unread' ? { backgroundColor: '#D4AF37' } : {}}
        >
          Unread Only
        </button>
      </div>

      {/* Notification List */}
      <div className="space-y-2.5">
        {filteredItems.map((n) => (
          <div 
            key={n.id}
            className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
              n.isRead ? 'bg-white border-gray-200/80 shadow-2xs' : 'bg-amber-50/30 border-amber-300 shadow-2xs'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-1.5 rounded-lg mt-0.5 ${
                n.isRead ? 'bg-gray-100 text-gray-500' : 'bg-amber-500 text-white'
              }`}>
                <Bell size={16} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs">{n.title}</h4>
                <p className="text-[11px] text-gray-600 mt-0.5">{n.message}</p>
                <span className="text-[10px] text-gray-400 mt-0.5 block">{n.timeAgo}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => toggleRead(n.id)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md border transition-colors ${
                  n.isRead 
                    ? 'border-gray-200 text-gray-600 hover:bg-gray-50' 
                    : 'border-amber-300 bg-white text-amber-800 hover:bg-amber-50'
                }`}
              >
                {n.isRead ? 'Mark Unread' : 'Mark Read'}
              </button>
              <button className="px-3 py-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-2xs">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

