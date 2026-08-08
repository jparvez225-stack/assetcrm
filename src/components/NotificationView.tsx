import React, { useState } from 'react';
import { NotificationItem } from '../types';
import { Bell, CheckCircle2, FileText, MailCheck, MailWarning } from 'lucide-react';

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

  const totalCount = 500;
  const unreadCount = 200;
  const readCount = totalCount - unreadCount;
  const currentPageCount = filteredItems.length;

  return (
    <div className="space-y-5 max-w-full font-sans select-none">
      <div className="flex justify-end items-center">
        <button 
          onClick={() => {
            onMarkAllRead();
            setItems(prev => prev.map(n => ({ ...n, isRead: true })));
          }}
          className="px-3.5 py-1.5 text-xs font-bold text-white rounded-xl shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
          style={{ backgroundColor: '#c7a259' }}
        >
          <CheckCircle2 size={14} />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Top 4 KPI Cards for Notifications (Total, Read, Unread, This Page) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Total */}
        <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bell size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Total Notifications</span>
          </div>
          <div className="z-10">
            <div className="bg-blue-50/50 rounded-xl p-2.5 text-left border border-blue-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-blue-600">TOTAL</span>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">{totalCount}</span>
            </div>
          </div>
          <Bell size={85} className="absolute -right-4 -bottom-4 text-blue-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 2: Read */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MailCheck size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Read</span>
          </div>
          <div className="z-10">
            <div className="bg-emerald-50/50 rounded-xl p-2.5 text-left border border-emerald-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">READ ALERTS</span>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">{readCount}</span>
            </div>
          </div>
          <MailCheck size={85} className="absolute -right-4 -bottom-4 text-emerald-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 3: Unread */}
        <div className="bg-white rounded-2xl p-4 border border-orange-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <MailWarning size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">Unread</span>
          </div>
          <div className="z-10">
            <div className="bg-orange-50/50 rounded-xl p-2.5 text-left border border-orange-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-orange-600">UNREAD ALERTS</span>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">{unreadCount}</span>
            </div>
          </div>
          <MailWarning size={85} className="absolute -right-4 -bottom-4 text-orange-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 4: This Page */}
        <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3 z-10">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileText size={18} />
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-wide">This Page</span>
          </div>
          <div className="z-10">
            <div className="bg-purple-50/50 rounded-xl p-2.5 text-left border border-purple-100/70">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-purple-600">PAGE COUNT</span>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">{currentPageCount}</span>
            </div>
          </div>
          <FileText size={85} className="absolute -right-4 -bottom-4 text-purple-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
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
          style={filter === 'all' ? { backgroundColor: '#c7a259' } : {}}
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
          style={filter === 'unread' ? { backgroundColor: '#c7a259' } : {}}
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

