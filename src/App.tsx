import React, { useState } from 'react';
import { NavItem, Lead, ReferralItem, CallLog, LeadCategoryItem, NotificationItem } from './types';
import { 
  mockSalesmen, 
  initialLeads, 
  initialReferrals, 
  initialCallLogs, 
  mockCategories, 
  initialNotifications, 
  mockReportRows 
} from './mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { AddLeadView } from './components/AddLeadView';
import { LeadView } from './components/LeadView';
import { CallHistoryView } from './components/CallHistoryView';
import { CategoryView } from './components/CategoryView';
import { SalesmanPerformanceView } from './components/SalesmanPerformanceView';
import { ReferralView } from './components/ReferralView';
import { NotificationView } from './components/NotificationView';
import { ReportView } from './components/ReportView';

export default function App() {
  const [currentNav, setCurrentNav] = useState<NavItem>('dashboard');
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [referrals, setReferrals] = useState<ReferralItem[]>(initialReferrals);
  const [callLogs, setCallLogs] = useState<CallLog[]>(initialCallLogs);
  const [categories, setCategories] = useState<LeadCategoryItem[]>(mockCategories);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>(initialLeads[0]);

  const handleAddLead = (newLead: Lead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  const handleAddReferral = (newRef: ReferralItem) => {
    setReferrals(prev => [newRef, ...prev]);
  };

  const handleAddCallLog = (newLog: CallLog) => {
    setCallLogs(prev => [newLog, ...prev]);
  };

  const handleAddCategory = (newCat: LeadCategoryItem) => {
    setCategories(prev => [newCat, ...prev]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleAssignSalesman = (leadId: string, salesman: string) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, assignedSalesman: salesman } : l));
  };

  return (
    <div className="flex h-screen bg-gray-50/60 overflow-hidden font-sans antialiased text-gray-800">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentNav={currentNav} 
        onNavigate={(nav) => setCurrentNav(nav)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header 
          title={
            currentNav === 'dashboard' ? 'Dashboard Overview' :
            currentNav === 'lead' ? 'Lead Management' :
            currentNav === 'add-lead' ? 'Add New Lead' :
            currentNav === 'lead-activity' ? 'Lead Activity' :
            currentNav === 'call-history' ? 'Call History & Timeline' :
            currentNav === 'lead-category' ? 'Lead Category' :
            currentNav === 'salesman-performance' ? 'Salesman Performance' :
            currentNav === 'referral' ? 'Referral' :
            currentNav === 'notification' ? 'Notification' :
            'Lead Report'
          }
          subtitle="Promise Assets Limited - Real Estate CRM"
          showBack={currentNav !== 'dashboard'}
          onBack={() => setCurrentNav('dashboard')}
        />

        {/* View Switcher with 32px padding */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {currentNav === 'dashboard' && (
            <DashboardView onNavigate={(nav) => setCurrentNav(nav)} />
          )}

          {currentNav === 'add-lead' && (
            <AddLeadView 
              onBack={() => setCurrentNav('lead')} 
              onAddLead={handleAddLead} 
            />
          )}

          {currentNav === 'lead' && (
            <LeadView 
              leads={leads}
              onNavigate={(nav) => setCurrentNav(nav)}
              onSelectLead={(lead) => setSelectedLead(lead)}
              onAssignSalesman={handleAssignSalesman}
            />
          )}

          {(currentNav === 'lead-activity' || currentNav === 'call-history') && (
            <CallHistoryView 
              selectedLead={selectedLead}
              callLogs={callLogs}
              onBack={() => setCurrentNav('lead')}
              onAddCallLog={handleAddCallLog}
            />
          )}

          {currentNav === 'lead-category' && (
            <CategoryView 
              categories={categories}
              onAddCategory={handleAddCategory}
            />
          )}

          {currentNav === 'salesman-performance' && (
            <SalesmanPerformanceView 
              salesmen={mockSalesmen}
            />
          )}

          {currentNav === 'referral' && (
            <ReferralView 
              referrals={referrals}
              onNavigate={(nav) => setCurrentNav(nav)}
              onAddReferral={handleAddReferral}
            />
          )}

          {currentNav === 'notification' && (
            <NotificationView 
              notifications={notifications}
              onMarkAllRead={handleMarkAllNotificationsRead}
            />
          )}

          {currentNav === 'report' && (
            <ReportView 
              reportRows={mockReportRows}
            />
          )}
        </main>
      </div>
    </div>
  );
}
