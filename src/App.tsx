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
import { LeadActivityView } from './components/LeadActivityView';
import { CallHistoryView } from './components/CallHistoryView';
import { CategoryView } from './components/CategoryView';
import { LeadSourceView } from './components/LeadSourceView';
import { SalesmanPerformanceView } from './components/SalesmanPerformanceView';
import { ReferralView } from './components/ReferralView';
import { NotificationView } from './components/NotificationView';
import { ReportView } from './components/ReportView';
import { InventoryAllProjectsView } from './components/InventoryAllProjectsView';
import { AccountsAllProjectsView } from './components/AccountsAllProjectsView';
import { ProjectHistoryView } from './components/ProjectHistoryView';
import { InventoryBuyersStakeholdersView } from './components/InventoryBuyersStakeholdersView';
import { InventoryFlatsPlotStockView } from './components/InventoryFlatsPlotStockView';

export default function App() {
  const [currentNav, setCurrentNav] = useState<NavItem>('inventory-all-projects');
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [referrals, setReferrals] = useState<ReferralItem[]>(initialReferrals);
  const [callLogs, setCallLogs] = useState<CallLog[]>(initialCallLogs);
  const [categories, setCategories] = useState<LeadCategoryItem[]>(mockCategories);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>(initialLeads[0]);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [selectedProjectIdForHistory, setSelectedProjectIdForHistory] = useState<string>('proj_1');
  const [bookingPrefill, setBookingPrefill] = useState<{
    isOpen: boolean;
    projectName?: string;
    unitDetails?: string;
  }>({ isOpen: false });

  const handleAddLead = (newLead: Lead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
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
            currentNav === 'call-history' ? 'Lead Activity & Call Logs' :
            currentNav === 'lead-category' ? 'Lead Category' :
            currentNav === 'lead-source' ? 'Lead Sources' :
            currentNav === 'salesman-performance' ? 'Salesman Performance Report' :
            currentNav === 'inventory-all-projects' ? 'Inventory Management - All Projects' :
            currentNav === 'inventory-project-history' ? 'Inventory Management - Project History' :
            currentNav === 'inventory-buyers-stakeholders' ? 'Inventory Management - All Buyers' :
            currentNav === 'inventory-flats-plot-stock' ? 'Inventory Management - All Assets' :
            currentNav === 'accounts-all-projects' ? 'Accounts Management - All Projects' :
            currentNav === 'accounts-land-purchase' ? 'Accounts Management - Land Purchase Ledger' :
            currentNav === 'accounts-project-expenses' ? 'Accounts Management - Project Expenses & Fees' :
            currentNav === 'accounts-agent-commission' ? 'Accounts Management - Agent Commission Ledgers' :
            currentNav === 'accounts-collections' ? 'Accounts Management - Income & Collections' :
            currentNav === 'referral' ? 'Referral Management' :
            currentNav === 'notification' ? 'Notification Center' :
            'Lead Report & Analytics'
          }
          subtitle="Promise Assets Limited - Real Estate CRM"
          showBack={currentNav !== 'dashboard'}
          onBack={() => {
            if (currentNav === 'call-history') {
              setCurrentNav('lead-activity');
            } else if (currentNav === 'add-lead') {
              setCurrentNav('lead');
            } else {
              setCurrentNav('dashboard');
            }
          }}
        />

        {/* View Switcher with 32px padding */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {currentNav === 'dashboard' && (
            <DashboardView onNavigate={(nav) => setCurrentNav(nav)} />
          )}

          {currentNav === 'add-lead' && (
            <AddLeadView 
              editingLead={editingLead}
              referrals={referrals}
              onBack={() => {
                setEditingLead(null);
                setCurrentNav('lead');
              }} 
              onAddLead={handleAddLead} 
              onUpdateLead={handleUpdateLead}
            />
          )}

          {currentNav === 'lead' && (
            <LeadView 
              leads={leads}
              onNavigate={(nav) => setCurrentNav(nav)}
              onSelectLead={(lead) => setSelectedLead(lead)}
              onEditLead={(lead) => setEditingLead(lead)}
              onAssignSalesman={handleAssignSalesman}
            />
          )}

          {currentNav === 'lead-activity' && (
            <LeadActivityView 
              leads={leads}
              onNavigate={(nav) => setCurrentNav(nav)}
              onSelectLead={(lead) => setSelectedLead(lead)}
            />
          )}

          {currentNav === 'call-history' && (
            <CallHistoryView 
              selectedLead={selectedLead}
              callLogs={callLogs}
              onBack={() => setCurrentNav('lead-activity')}
              onAddCallLog={handleAddCallLog}
            />
          )}

          {currentNav === 'lead-category' && (
            <CategoryView 
              categories={categories}
              onAddCategory={handleAddCategory}
            />
          )}

          {currentNav === 'lead-source' && (
            <LeadSourceView />
          )}

          {currentNav === 'salesman-performance' && (
            <SalesmanPerformanceView 
              salesmen={mockSalesmen}
            />
          )}

          {currentNav === 'inventory-all-projects' && (
            <InventoryAllProjectsView 
              onSelectProjectHistory={(projectId) => {
                setSelectedProjectIdForHistory(projectId);
                setCurrentNav('inventory-project-history');
              }}
            />
          )}

          {currentNav === 'inventory-project-history' && (
            <ProjectHistoryView 
              initialProjectId={selectedProjectIdForHistory}
              onBackToAllProjects={() => setCurrentNav('inventory-all-projects')}
              onBookUnit={(projectName, unitDetails) => {
                setBookingPrefill({
                  isOpen: true,
                  projectName,
                  unitDetails
                });
                setCurrentNav('accounts-all-projects');
              }}
            />
          )}

          {currentNav === 'inventory-buyers-stakeholders' && (
            <InventoryBuyersStakeholdersView />
          )}

          {currentNav === 'inventory-flats-plot-stock' && (
            <InventoryFlatsPlotStockView />
          )}

          {(currentNav === 'accounts-all-projects' ||
            currentNav === 'accounts-land-purchase' ||
            currentNav === 'accounts-project-expenses' ||
            currentNav === 'accounts-agent-commission' ||
            currentNav === 'accounts-collections') && (
            <AccountsAllProjectsView 
              activeTabProp={
                currentNav === 'accounts-land-purchase' ? 'land' :
                currentNav === 'accounts-project-expenses' ? 'expenses' :
                currentNav === 'accounts-agent-commission' ? 'commission' :
                currentNav === 'accounts-collections' ? 'collections' :
                'all'
              }
              autoOpenBookModal={bookingPrefill.isOpen}
              initialBookingData={{
                projectName: bookingPrefill.projectName,
                unitDetails: bookingPrefill.unitDetails
              }}
              onCloseAutoBookModal={() => setBookingPrefill({ isOpen: false })}
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
