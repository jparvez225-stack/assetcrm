import React, { useState } from 'react';
import { NotificationItem } from '../types';
import { Bell, CheckCircle2, Search, Filter, Plus, Eye, AlertCircle, ArrowLeft, Printer } from 'lucide-react';

interface NotificationViewProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationView: React.FC<NotificationViewProps> = ({ 
  notifications, 
  onMarkAllRead 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [items, setItems] = useState<NotificationItem[]>(notifications);

  // Navigation state: 'list' | 'add' | 'view'
  const [pageMode, setPageMode] = useState<'list' | 'add' | 'view'>('list');
  const [selectedNotif, setSelectedNotif] = useState<NotificationItem | null>(null);

  // Add state
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newType, setNewType] = useState<NotificationItem['type']>('lead-reminder');

  const toggleRead = (id: string) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleCreateNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newMessage) return;

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: newTitle,
      message: newMessage,
      timeAgo: 'Just now',
      isRead: false,
      type: newType
    };

    setItems([newNotif, ...items]);
    setNewTitle('');
    setNewMessage('');
    setPageMode('list');
  };

  const filteredItems = items.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRead = filter === 'all' ? true : !n.isRead;
    return matchesSearch && matchesRead;
  });

  const unreadCount = items.filter(n => !n.isRead).length;

  // SEPARATE PAGE: Notification Detail Page
  if (pageMode === 'view' && selectedNotif) {
    return (
      <div className="space-y-6 max-w-full font-sans">
        <div className="print-only-header">
          <h2 className="text-xl font-extrabold uppercase">Promise Assets Limited</h2>
          <p className="text-sm font-bold">System Alert & Follow-up Log Sheet</p>
          <p className="text-xs">Printed Date: {new Date().toLocaleDateString('en-GB')}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
          <button 
            onClick={() => setPageMode('list')}
            className="px-3.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5 w-fit shadow-2xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Notifications Center</span>
          </button>

          <button 
            onClick={() => window.print()}
            className="px-4 py-1.5 text-xs font-bold text-amber-900 bg-white border-2 border-[#D4AF37] rounded-md hover:bg-amber-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Printer size={14} />
            <span>Print Alert</span>
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-5">
          <div className="border-b border-gray-200 pb-4">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Notification Details Page</span>
            <h2 className="text-xl font-extrabold text-gray-900">{selectedNotif.title}</h2>
            <p className="text-xs text-gray-500 mt-1">Received Time: {selectedNotif.timeAgo}</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-1">
              <span className="text-[10px] font-bold text-amber-900 uppercase block">Category Type</span>
              <span className="font-extrabold text-amber-900 text-sm uppercase">{selectedNotif.type}</span>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase block">Alert Message Body</span>
              <p className="text-sm font-semibold text-gray-900 leading-relaxed">
                {selectedNotif.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SEPARATE PAGE: Add System Alert Page
  if (pageMode === 'add') {
    return (
      <div className="space-y-6 max-w-2xl font-sans">
        <div className="flex items-center justify-between no-print">
          <button 
            onClick={() => setPageMode('list')}
            className="px-3.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Notifications Center</span>
          </button>
          <span className="text-xs text-gray-500">Broadcaster Studio</span>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-5">
          <div className="border-b border-gray-200 pb-3">
            <h2 className="text-lg font-extrabold text-gray-900">Create System Alert Page</h2>
            <p className="text-xs text-gray-500">Dispatch system-wide notifications, follow-up alerts, or sales targets</p>
          </div>

          <form onSubmit={handleCreateNotification} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Alert Title *</label>
              <input 
                type="text" 
                placeholder="e.g. Urgent Plot Booking Reminder"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Alert Category</label>
              <select 
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
              >
                <option value="lead-reminder">Lead Follow-up Reminder</option>
                <option value="approval">Plot Allotment Approval</option>
                <option value="deal">Confirmed Deal / Sale</option>
                <option value="support">Customer Support Ticket</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Alert Message *</label>
              <textarea 
                rows={4} 
                placeholder="Enter detailed notification content..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setPageMode('list')}
                className="px-4 py-2 font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2 font-bold text-white rounded-md shadow-2xs"
                style={{ backgroundColor: '#D4AF37' }}
              >
                Broadcast Alert
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // DEFAULT LIST PAGE
  return (
    <div className="space-y-5 max-w-full font-sans">
      <div className="print-only-header">
        <h2 className="text-xl font-extrabold uppercase">Promise Assets Limited</h2>
        <p className="text-sm font-bold">System Alerts & Notifications Table</p>
        <p className="text-xs">Printed Date: {new Date().toLocaleDateString('en-GB')}</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Notification Center</h1>
          <p className="text-xs text-gray-500">Real-time alerts for lead follow-ups, site visits, and plot bookings</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setPageMode('add')}
            className="px-3.5 py-1.5 text-xs font-bold text-amber-900 bg-white border-2 border-[#D4AF37] rounded-md hover:bg-amber-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>Add System Alert Page</span>
          </button>
          <button 
            onClick={() => {
              onMarkAllRead();
              setItems(prev => prev.map(n => ({ ...n, isRead: true })));
            }}
            className="px-4 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
            style={{ backgroundColor: '#D4AF37' }}
          >
            <CheckCircle2 size={14} />
            <span>Mark All as Read</span>
          </button>
          <button 
            onClick={() => window.print()}
            className="px-3.5 py-1.5 text-xs font-bold text-amber-900 bg-white border-2 border-[#D4AF37] rounded-md hover:bg-amber-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Total Notifications</span>
          <p className="text-2xl font-extrabold text-gray-900">{items.length}</p>
          <p className="text-[9px] text-amber-700 font-bold">ALL ALERTS</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Unread Alerts</span>
          <p className="text-2xl font-extrabold text-amber-800">{unreadCount}</p>
          <p className="text-[9px] text-amber-700 font-bold">ATTENTION NEEDED</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Follow-up Reminders</span>
          <p className="text-2xl font-extrabold text-emerald-600">18</p>
          <p className="text-[9px] text-emerald-700 font-bold">TODAY'S SCHEDULE</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">System Status</span>
          <p className="text-2xl font-extrabold text-gray-900">Optimal</p>
          <p className="text-[9px] text-gray-400">REAL-TIME SYNC</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-3 no-print">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Search & Filters</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
          >
            <option value="all">Status: All Alerts</option>
            <option value="unread">Unread Only</option>
          </select>
        </div>
      </div>

      {/* Table view */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <span className="text-xs font-bold text-gray-800">Notifications Table ({filteredItems.length} Total)</span>
          <span className="text-[11px] text-gray-500">Live Queue</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/70 text-[10px] font-bold text-gray-600 uppercase border-b border-gray-200 tracking-wider">
                <th className="py-2.5 px-4">SL</th>
                <th className="py-2.5 px-4">Alert Title</th>
                <th className="py-2.5 px-4">Type</th>
                <th className="py-2.5 px-4">Time</th>
                <th className="py-2.5 px-4">Message</th>
                <th className="py-2.5 px-4 text-center">Status</th>
                <th className="py-2.5 px-4 text-center no-print">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {filteredItems.map((n, i) => (
                <tr key={n.id} className={`hover:bg-amber-50/20 transition-colors ${!n.isRead ? 'bg-amber-50/30 font-semibold' : ''}`}>
                  <td className="py-3 px-4 font-bold text-gray-400">0{i + 1}</td>
                  <td className="py-3 px-4 font-bold text-gray-900">{n.title}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase">
                      {n.type || 'Alert'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{n.timeAgo}</td>
                  <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{n.message}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${n.isRead ? 'bg-gray-100 text-gray-600' : 'bg-emerald-100 text-emerald-800'}`}>
                      {n.isRead ? 'Read' : 'Unread'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center no-print">
                    <button 
                      onClick={() => {
                        toggleRead(n.id);
                        setSelectedNotif(n);
                        setPageMode('view');
                      }}
                      className="px-3.5 py-1 text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors shadow-2xs inline-flex items-center gap-1"
                    >
                      <Eye size={11} />
                      <span>View Page</span>
                    </button>
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
