import React, { useState, useEffect } from 'react';
import { 
  WalletCards, 
  Plus, 
  Search, 
  ChevronDown, 
  Eye, 
  CheckCircle2, 
  FileText, 
  Download, 
  Clock, 
  AlertCircle, 
  X, 
  ShieldCheck,
  Building2,
  MapPin,
  Users,
  Landmark,
  Receipt,
  CreditCard,
  TrendingUp,
  Calculator,
  UserCheck,
  Printer,
  ArrowRight,
  DollarSign,
  FileCheck,
  Briefcase,
  Layers,
  Banknote,
  Calendar,
  Filter,
  MoreVertical,
  Check,
  ArrowUpRight,
  PieChart,
  User,
  Phone,
  Tag
} from 'lucide-react';

interface AccountsAllProjectsViewProps {
  activeTabProp?: 'all' | 'land' | 'expenses' | 'commission' | 'collections';
  autoOpenBookModal?: boolean;
  initialBookingData?: {
    projectName?: string;
    unitDetails?: string;
  };
  onCloseAutoBookModal?: () => void;
}

export const AccountsAllProjectsView: React.FC<AccountsAllProjectsViewProps> = ({
  activeTabProp = 'all',
  autoOpenBookModal,
  initialBookingData,
  onCloseAutoBookModal
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'land' | 'expenses' | 'commission' | 'collections'>(activeTabProp);

  useEffect(() => {
    if (activeTabProp) {
      setActiveTab(activeTabProp);
    }
  }, [activeTabProp]);

  // Global filters & selection state
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('All Projects');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState('All Time');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [activeActionRowId, setActiveActionRowId] = useState<string | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleSelectAll = (ids: string[]) => {
    if (selectedRows.length === ids.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(ids);
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(r => r !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // ---------------------------------------------------------------------------
  // PAGE 1: ALL PROJECTS OVERVIEW
  // ---------------------------------------------------------------------------
  const page1ProjectsData = [
    {
      id: 'p1_1',
      projectName: 'Purbachal Green Valley Project',
      location: 'Sector 22, Purbachal, Dhaka',
      totalBudget: '৳ 35,00,00,000',
      landCost: '৳ 14,20,00,000',
      constExpense: '৳ 12,80,00,000',
      collected: '৳ 28,50,00,000',
      outstanding: '৳ 6,50,00,000',
      status: 'Paid/Approved'
    },
    {
      id: 'p1_2',
      projectName: 'Bashundhara Enclave Villa & Suites',
      location: 'Block I, Bashundhara R/A, Dhaka',
      totalBudget: '৳ 22,00,00,000',
      landCost: '৳ 8,50,00,000',
      constExpense: '৳ 7,20,00,000',
      collected: '৳ 18,90,00,000',
      outstanding: '৳ 3,10,00,000',
      status: 'Paid/Approved'
    },
    {
      id: 'p1_3',
      projectName: 'Dhanmondi Horizon Luxury Tower',
      location: 'Road 27, Dhanmondi, Dhaka',
      totalBudget: '৳ 45,00,00,000',
      landCost: '৳ 18,00,00,000',
      constExpense: '৳ 16,50,00,000',
      collected: '৳ 31,00,00,000',
      outstanding: '৳ 14,00,00,000',
      status: 'Pending'
    },
    {
      id: 'p1_4',
      projectName: 'Uttara Sector 18 Lakeview Horizon',
      location: 'Sector 18, Uttara, Dhaka',
      totalBudget: '৳ 18,50,00,000',
      landCost: '৳ 7,20,00,000',
      constExpense: '৳ 5,80,00,000',
      collected: '৳ 11,20,00,000',
      outstanding: '৳ 7,30,00,000',
      status: 'Pending'
    },
    {
      id: 'p1_5',
      projectName: 'Chittagong Hillside Bay Resort & Villas',
      location: 'Panchlaish, Chittagong',
      totalBudget: '৳ 28,00,00,000',
      landCost: '৳ 11,00,00,000',
      constExpense: '৳ 9,50,00,000',
      collected: '৳ 15,00,00,000',
      outstanding: '৳ 13,00,00,000',
      status: 'Overdue'
    }
  ];

  // ---------------------------------------------------------------------------
  // PAGE 2: LAND PURCHASE LEDGER
  // ---------------------------------------------------------------------------
  const [landLedgers, setLandLedgers] = useState([
    {
      id: 'lnd_101',
      deedId: 'LND-2026-8812',
      sellerName: 'Alhaj Munsur Ali & Brothers',
      phone: '+880 1711-889911',
      projectName: 'Purbachal Green Valley Project',
      location: 'Plot 45-B, Sector 22, Purbachal',
      totalValue: '৳ 8,50,00,000',
      paid: '৳ 7,00,00,000',
      due: '৳ 1,50,00,000',
      nextPaymentDate: '15 Aug, 2026',
      status: 'Pending'
    },
    {
      id: 'lnd_102',
      deedId: 'LND-2025-4102',
      sellerName: 'Hazi Bazlur Rahman Estate',
      phone: '+880 1819-223344',
      projectName: 'Bashundhara Enclave Villa',
      location: 'Block I, Plot 12, Bashundhara',
      totalValue: '৳ 4,20,00,000',
      paid: '৳ 4,20,00,000',
      due: '৳ 0',
      nextPaymentDate: 'Completed',
      status: 'Paid/Approved'
    },
    {
      id: 'lnd_103',
      deedId: 'LND-2026-1190',
      sellerName: 'Syed Shamsul Haque Holdings',
      phone: '+880 1911-554433',
      projectName: 'Uttara Sector 18 Lakeview',
      location: 'Sector 18, Road 4, Uttara',
      totalValue: '৳ 6,80,00,000',
      paid: '৳ 4,50,00,000',
      due: '৳ 2,30,00,000',
      nextPaymentDate: '25 Aug, 2026',
      status: 'Pending'
    },
    {
      id: 'lnd_104',
      deedId: 'LND-2025-9921',
      sellerName: 'Kazi Nazrul Islam Descendants',
      phone: '+880 1678-001122',
      projectName: 'Dhanmondi Horizon Tower',
      location: 'Road 27, Dhanmondi, Dhaka',
      totalValue: '৳ 12,50,00,000',
      paid: '৳ 9,00,00,000',
      due: '৳ 3,50,00,000',
      nextPaymentDate: '01 Sep, 2026',
      status: 'Overdue'
    }
  ]);

  // ---------------------------------------------------------------------------
  // PAGE 3: PROJECT EXPENSES & FEES
  // ---------------------------------------------------------------------------
  const [projectExpenses, setProjectExpenses] = useState([
    {
      id: 'exp_1',
      voucherId: 'VCH-REG-8820',
      projectName: 'Purbachal Green Valley Project',
      category: 'Registration & Deed (দলিল খরচ)',
      submittedBy: 'Tanvir Ahmed (Legal Officer)',
      date: '05 Aug, 2026',
      amount: '৳ 18,50,000',
      status: 'Paid/Approved'
    },
    {
      id: 'exp_2',
      voucherId: 'VCH-SIT-1044',
      projectName: 'Purbachal Green Valley Project',
      category: 'Site Visit & Transport (সাইট ভিজিট)',
      submittedBy: 'Siddique Rahman (Sales Ex.)',
      date: '04 Aug, 2026',
      amount: '৳ 65,000',
      status: 'Paid/Approved'
    },
    {
      id: 'exp_3',
      voucherId: 'VCH-ENG-3091',
      projectName: 'Bashundhara Enclave Villa & Suites',
      category: 'Soil Test & Architect Approval',
      submittedBy: 'Engr. Mahfuzur Rahman',
      date: '02 Aug, 2026',
      amount: '৳ 3,20,000',
      status: 'Pending'
    },
    {
      id: 'exp_4',
      voucherId: 'VCH-DEV-7712',
      projectName: 'Uttara Sector 18 Lakeview',
      category: 'Land Development & Earth Filling',
      submittedBy: 'Project Engr. Rakib',
      date: '01 Aug, 2026',
      amount: '৳ 12,00,000',
      status: 'Paid/Approved'
    },
    {
      id: 'exp_5',
      voucherId: 'VCH-GOV-9011',
      projectName: 'Dhanmondi Horizon Luxury Tower',
      category: 'Legal & RAJUK Plan Approval',
      submittedBy: 'Karim Ullah (Consultant)',
      date: '28 Jul, 2026',
      amount: '৳ 5,50,000',
      status: 'Overdue'
    }
  ]);

  // ---------------------------------------------------------------------------
  // PAGE 4: AGENT COMMISSION LEDGERS
  // ---------------------------------------------------------------------------
  const [agentCommissions, setAgentCommissions] = useState([
    {
      id: 'ag_1',
      agentName: 'Siddique Rahman',
      agentId: 'AGT-881',
      phone: '+880 1711-223344',
      unitSold: 'Plot A-102 (Purbachal 5 Katha)',
      salesValue: '৳ 1,20,00,000',
      commissionRate: '5.0%',
      totalCommission: '৳ 6,00,000',
      paid: '৳ 6,00,000',
      due: '৳ 0',
      status: 'Paid/Approved'
    },
    {
      id: 'ag_2',
      agentName: 'Mehesum Rahman',
      agentId: 'AGT-882',
      phone: '+880 1819-556677',
      unitSold: 'Plot B-110 (Purbachal 3 Katha)',
      salesValue: '৳ 75,00,000',
      commissionRate: '5.0%',
      totalCommission: '৳ 3,75,000',
      paid: '৳ 0',
      due: '৳ 3,75,000',
      status: 'Pending'
    },
    {
      id: 'ag_3',
      agentName: 'Jamal Hossain (External Broker)',
      agentId: 'BRK-501',
      phone: '+880 1911-001122',
      unitSold: 'Suite 101 (Dhanmondi 1800 SQFT)',
      salesValue: '৳ 3,10,00,000',
      commissionRate: '3.5%',
      totalCommission: '৳ 10,85,000',
      paid: '৳ 5,00,00,000',
      due: '৳ 5,85,000',
      status: 'Pending'
    },
    {
      id: 'ag_4',
      agentName: 'Karim Ullah',
      agentId: 'AGT-884',
      phone: '+880 1552-998877',
      unitSold: 'Flat 4B (Bashundhara 2400 SQFT)',
      salesValue: '৳ 2,50,00,000',
      commissionRate: '5.0%',
      totalCommission: '৳ 12,50,000',
      paid: '৳ 12,50,000',
      due: '৳ 0',
      status: 'Paid/Approved'
    }
  ]);

  // ---------------------------------------------------------------------------
  // PAGE 5: INCOME & COLLECTIONS
  // ---------------------------------------------------------------------------
  const [collections, setCollections] = useState([
    {
      id: 'col_1',
      receiptNo: 'RCT-2026-9901',
      clientName: 'Jitu Guha',
      phone: '+880 1711-223344',
      unitSold: 'Purbachal Plot A-102',
      paymentMode: 'Bank Deposit',
      date: '05 Aug, 2026',
      collectedAmount: '৳ 25,00,000',
      dues: '৳ 95,00,000',
      status: 'Paid/Approved'
    },
    {
      id: 'col_2',
      receiptNo: 'RCT-2026-9902',
      clientName: 'Tanvir Ahmed',
      phone: '+880 1819-556677',
      unitSold: 'Purbachal Plot B-110',
      paymentMode: 'bKash / MFS',
      date: '04 Aug, 2026',
      collectedAmount: '৳ 5,00,000',
      dues: '৳ 70,00,000',
      status: 'Paid/Approved'
    },
    {
      id: 'col_3',
      receiptNo: 'RCT-2026-9903',
      clientName: 'Mahfuzur Rahman',
      phone: '+880 1912-998877',
      unitSold: 'Bashundhara Flat 4B',
      paymentMode: 'Cheque Deposit',
      date: '03 Aug, 2026',
      collectedAmount: '৳ 10,00,000',
      dues: '৳ 2,40,00,000',
      status: 'Pending'
    },
    {
      id: 'col_4',
      receiptNo: 'RCT-2026-9904',
      clientName: 'Nusrat Jahan',
      phone: '+880 1678-112233',
      unitSold: 'Dhanmondi Suite 101',
      paymentMode: 'Pay Order',
      date: '01 Aug, 2026',
      collectedAmount: '৳ 15,00,000',
      dues: '৳ 2,95,00,000',
      status: 'Overdue'
    }
  ]);

  // Modal forms
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalFormType, setModalFormType] = useState<'all' | 'land' | 'expenses' | 'commission' | 'collections'>('all');

  const openAddModal = (type: 'all' | 'land' | 'expenses' | 'commission' | 'collections') => {
    setModalFormType(type);
    setIsAddModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddModalOpen(false);
    showToast(`New entry successfully added to ${activeTab.toUpperCase()} ledger!`);
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-gray-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-gray-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* PRIMARY ACTION AREA AT TOP OF PAGE 1 */}
      {activeTab === 'all' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-base font-black text-gray-900">All Projects Overview</h2>
              <p className="text-xs text-gray-500 font-medium">Consolidated financial overview across all real estate projects</p>
            </div>
            <button
              onClick={() => openAddModal('all')}
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Plus size={16} className="stroke-[3]" />
              <span>+ Add New Project Ledger</span>
            </button>
          </div>
          {/* KPI Summary Cards (4 Spanning Width, Delicate Shadow, Watermark Icon) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Green Accent */}
            <div className="bg-white rounded-2xl border border-emerald-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider">TOTAL INVESTMENT</span>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <TrendingUp size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-emerald-900 font-mono">৳ 148.50 Cr</p>
              <p className="text-[10px] text-emerald-700 font-bold mt-1">Across 12 Active Real Estate Projects</p>
              {/* Background Watermark Icon */}
              <Building2 className="absolute -right-3 -bottom-3 size-24 text-emerald-500/5 pointer-events-none" />
            </div>

            {/* Card 2: Blue Accent */}
            <div className="bg-white rounded-2xl border border-blue-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-blue-800 uppercase tracking-wider">TOTAL EXPENSES</span>
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Receipt size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-blue-900 font-mono">৳ 62.20 Cr</p>
              <p className="text-[10px] text-blue-700 font-bold mt-1">Land acquisition + Construction costs</p>
              <Layers className="absolute -right-3 -bottom-3 size-24 text-blue-500/5 pointer-events-none" />
            </div>

            {/* Card 3: Purple Accent */}
            <div className="bg-white rounded-2xl border border-purple-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-purple-800 uppercase tracking-wider">TOTAL REVENUE</span>
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <WalletCards size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-purple-900 font-mono">৳ 104.60 Cr</p>
              <p className="text-[10px] text-purple-700 font-bold mt-1">Gross plot & flat sales booking value</p>
              <Landmark className="absolute -right-3 -bottom-3 size-24 text-purple-500/5 pointer-events-none" />
            </div>

            {/* Card 4: Orange Accent */}
            <div className="bg-white rounded-2xl border border-orange-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-orange-800 uppercase tracking-wider">NET BALANCE</span>
                <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                  <Calculator size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-orange-900 font-mono">৳ 42.40 Cr</p>
              <p className="text-[10px] text-orange-700 font-bold mt-1">Net profit after total cost deduction</p>
              <PieChart className="absolute -right-3 -bottom-3 size-24 text-orange-500/5 pointer-events-none" />
            </div>
          </div>

          {/* Table Filters & Controls */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap">
              {/* Left Search Bar */}
              <div className="relative flex-1 min-w-[240px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search project name, location..."
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              {/* Right Filters & Secondary Outline Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={selectedProjectFilter}
                  onChange={(e) => setSelectedProjectFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none"
                >
                  <option value="All Projects">All Projects</option>
                  <option value="Purbachal Green Valley Project">Purbachal Green Valley</option>
                  <option value="Bashundhara Enclave Villa & Suites">Bashundhara Enclave</option>
                  <option value="Dhanmondi Horizon Luxury Tower">Dhanmondi Horizon</option>
                </select>

                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Paid/Approved">Paid/Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>

                <button 
                  onClick={() => showToast('Exporting All Projects CSV report...')}
                  className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>

                <button 
                  onClick={() => window.print()}
                  className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Printer size={14} />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* DATA TABLE - PAGE 1 */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/90 text-gray-500 font-extrabold uppercase border-b border-gray-100">
                  <tr>
                    <th className="py-3.5 px-4 w-10">
                      <input 
                        type="checkbox" 
                        checked={selectedRows.length === page1ProjectsData.length}
                        onChange={() => toggleSelectAll(page1ProjectsData.map(p => p.id))}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                      />
                    </th>
                    <th className="py-3.5 px-4">Project Name</th>
                    <th className="py-3.5 px-4">Total Budget</th>
                    <th className="py-3.5 px-4">Land Cost</th>
                    <th className="py-3.5 px-4">Const. Expense</th>
                    <th className="py-3.5 px-4 text-right">Collected</th>
                    <th className="py-3.5 px-4 text-right">Outstanding</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {page1ProjectsData
                    .filter(p => {
                      const matchSearch = searchQuery === '' || p.projectName.toLowerCase().includes(searchQuery.toLowerCase());
                      const matchProject = selectedProjectFilter === 'All Projects' || p.projectName === selectedProjectFilter;
                      const matchStatus = selectedStatusFilter === 'All' || p.status === selectedStatusFilter;
                      return matchSearch && matchProject && matchStatus;
                    })
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-amber-50/20 transition-colors">
                        <td className="py-3.5 px-4">
                          <input 
                            type="checkbox" 
                            checked={selectedRows.includes(item.id)}
                            onChange={() => toggleSelectRow(item.id)}
                            className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                          />
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                              <Building2 size={15} />
                            </div>
                            <div>
                              <p className="font-extrabold text-gray-900">{item.projectName}</p>
                              <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1 mt-0.5">
                                <MapPin size={10} />
                                <span>{item.location}</span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-black text-gray-900 font-mono">{item.totalBudget}</td>
                        <td className="py-3.5 px-4 font-bold text-gray-800 font-mono">{item.landCost}</td>
                        <td className="py-3.5 px-4 font-bold text-gray-800 font-mono">{item.constExpense}</td>
                        <td className="py-3.5 px-4 font-black text-emerald-700 font-mono text-right">{item.collected}</td>
                        <td className="py-3.5 px-4 font-bold text-rose-600 font-mono text-right">{item.outstanding}</td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black inline-block ${
                            item.status === 'Paid/Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            item.status === 'Pending' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                            'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="relative inline-block text-left">
                            <button
                              onClick={() => setActiveActionRowId(activeActionRowId === item.id ? null : item.id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center gap-1 ml-auto cursor-pointer"
                            >
                              <span>Action</span>
                              <ChevronDown size={14} />
                            </button>
                            {activeActionRowId === item.id && (
                              <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-gray-200 py-1 z-30 font-bold text-xs text-gray-700">
                                <button onClick={() => { setActiveActionRowId(null); showToast(`Viewing ledger details for ${item.projectName}`); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2">
                                  <Eye size={14} /> View Ledger
                                </button>
                                <button onClick={() => { setActiveActionRowId(null); showToast(`Printing statement for ${item.projectName}`); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2">
                                  <Printer size={14} /> Print Report
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER PAGINATION */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap text-xs text-gray-500 font-medium bg-gray-50/50">
              <div className="flex items-center gap-3">
                <span>Showing 1 to 5 of 12 entries</span>
                <div className="flex items-center gap-1.5">
                  <span>Rows per page:</span>
                  <select className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-1 font-bold">
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 cursor-not-allowed">Prev</button>
                <button className="px-3 py-1 bg-amber-500 text-white rounded-lg font-black shadow-2xs">1</button>
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer">2</button>
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer">3</button>
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* PAGE 2: LAND PURCHASE LEDGER                                        */}
      {/* =================================================================== */}
      {activeTab === 'land' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-base font-black text-gray-900">Land Purchase Ledger</h2>
              <p className="text-xs text-gray-500 font-medium">Land acquisitions, land seller deeds, and installment schedules</p>
            </div>
            <button
              onClick={() => openAddModal('land')}
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Plus size={16} className="stroke-[3]" />
              <span>+ New Land Purchase</span>
            </button>
          </div>
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-emerald-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider">TOTAL LAND VALUE</span>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <Landmark size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-emerald-900 font-mono">৳ 32.00 Cr</p>
              <p className="text-[10px] text-emerald-700 font-bold mt-1">Total contracted land buying price</p>
              <Landmark className="absolute -right-3 -bottom-3 size-24 text-emerald-500/5 pointer-events-none" />
            </div>

            <div className="bg-white rounded-2xl border border-blue-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-blue-800 uppercase tracking-wider">PAID AMOUNT</span>
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-blue-900 font-mono">৳ 24.70 Cr</p>
              <p className="text-[10px] text-blue-700 font-bold mt-1">Disbursed to landowners & deeds</p>
              <CheckCircle2 className="absolute -right-3 -bottom-3 size-24 text-blue-500/5 pointer-events-none" />
            </div>

            <div className="bg-white rounded-2xl border border-purple-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-purple-800 uppercase tracking-wider">DUE AMOUNT</span>
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <Clock size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-purple-900 font-mono">৳ 7.30 Cr</p>
              <p className="text-[10px] text-purple-700 font-bold mt-1">Remaining land purchase liability</p>
              <Clock className="absolute -right-3 -bottom-3 size-24 text-purple-500/5 pointer-events-none" />
            </div>

            <div className="bg-white rounded-2xl border border-orange-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-orange-800 uppercase tracking-wider">UPCOMING INSTALLMENTS</span>
                <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                  <Calendar size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-orange-900 font-mono">৳ 3.80 Cr</p>
              <p className="text-[10px] text-orange-700 font-bold mt-1">Due within next 30 days</p>
              <Calendar className="absolute -right-3 -bottom-3 size-24 text-orange-500/5 pointer-events-none" />
            </div>
          </div>

          {/* Table Controls */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap">
              <div className="relative flex-1 min-w-[240px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search deed ID, seller name, location..."
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={selectedProjectFilter}
                  onChange={(e) => setSelectedProjectFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none"
                >
                  <option value="All Projects">All Projects</option>
                  <option value="Purbachal Green Valley Project">Purbachal Green Valley</option>
                  <option value="Bashundhara Enclave Villa">Bashundhara Enclave</option>
                  <option value="Uttara Sector 18 Lakeview">Uttara Sector 18</option>
                </select>

                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Paid/Approved">Paid/Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>

                <button 
                  onClick={() => showToast('Exporting Land Purchase Ledger CSV...')}
                  className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>

                <button 
                  onClick={() => window.print()}
                  className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Printer size={14} />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* DATA TABLE - PAGE 2 */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/90 text-gray-500 font-extrabold uppercase border-b border-gray-100">
                  <tr>
                    <th className="py-3.5 px-4 w-10">
                      <input 
                        type="checkbox" 
                        checked={selectedRows.length === landLedgers.length}
                        onChange={() => toggleSelectAll(landLedgers.map(l => l.id))}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                      />
                    </th>
                    <th className="py-3.5 px-4">Deed / Ledger ID</th>
                    <th className="py-3.5 px-4">Seller Name</th>
                    <th className="py-3.5 px-4">Location / Plot</th>
                    <th className="py-3.5 px-4">Total Value</th>
                    <th className="py-3.5 px-4">Paid</th>
                    <th className="py-3.5 px-4">Due</th>
                    <th className="py-3.5 px-4">Next Payment Date</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {landLedgers
                    .filter(l => {
                      const matchSearch = searchQuery === '' || 
                        l.deedId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        l.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
                      const matchStatus = selectedStatusFilter === 'All' || l.status === selectedStatusFilter;
                      return matchSearch && matchStatus;
                    })
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-amber-50/20 transition-colors">
                        <td className="py-3.5 px-4">
                          <input 
                            type="checkbox" 
                            checked={selectedRows.includes(item.id)}
                            onChange={() => toggleSelectRow(item.id)}
                            className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                          />
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <FileText size={15} className="text-amber-600 shrink-0" />
                            <span className="font-extrabold text-gray-900 font-mono">{item.deedId}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-gray-900">{item.sellerName}</p>
                          <p className="text-[10px] text-gray-400 font-mono">{item.phone}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-gray-800">{item.projectName}</p>
                          <p className="text-[10px] text-gray-400">{item.location}</p>
                        </td>
                        <td className="py-3.5 px-4 font-black text-gray-900 font-mono">{item.totalValue}</td>
                        <td className="py-3.5 px-4 font-extrabold text-emerald-700 font-mono">{item.paid}</td>
                        <td className="py-3.5 px-4 font-extrabold text-rose-600 font-mono">{item.due}</td>
                        <td className="py-3.5 px-4 font-semibold text-gray-700 font-mono">{item.nextPaymentDate}</td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black inline-block ${
                            item.status === 'Paid/Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            item.status === 'Pending' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                            'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="relative inline-block text-left">
                            <button
                              onClick={() => setActiveActionRowId(activeActionRowId === item.id ? null : item.id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center gap-1 ml-auto cursor-pointer"
                            >
                              <span>Action</span>
                              <ChevronDown size={14} />
                            </button>
                            {activeActionRowId === item.id && (
                              <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-gray-200 py-1 z-30 font-bold text-xs text-gray-700">
                                <button onClick={() => { setActiveActionRowId(null); showToast(`Viewing deed statement for ${item.deedId}`); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2">
                                  <Eye size={14} /> View Deed
                                </button>
                                <button onClick={() => { setActiveActionRowId(null); showToast(`Disbursing installment for ${item.deedId}`); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2">
                                  <DollarSign size={14} /> Pay Due
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER PAGINATION */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap text-xs text-gray-500 font-medium bg-gray-50/50">
              <div className="flex items-center gap-3">
                <span>Showing 1 to 4 of 4 entries</span>
                <div className="flex items-center gap-1.5">
                  <span>Rows per page:</span>
                  <select className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700">
                    <option>10</option>
                    <option>25</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-1 font-bold">
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 cursor-not-allowed">Prev</button>
                <button className="px-3 py-1 bg-amber-500 text-white rounded-lg font-black shadow-2xs">1</button>
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 cursor-not-allowed">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* PAGE 3: PROJECT EXPENSES & FEES                                     */}
      {/* =================================================================== */}
      {activeTab === 'expenses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-base font-black text-gray-900">Project Expenses & Fees</h2>
              <p className="text-xs text-gray-500 font-medium">Log registration deeds, site visits, legal approvals, and construction vouchers</p>
            </div>
            <button
              onClick={() => openAddModal('expenses')}
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Plus size={16} className="stroke-[3]" />
              <span>+ Log Expense Voucher</span>
            </button>
          </div>
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-emerald-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider">TOTAL EXPENSES</span>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <Receipt size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-emerald-900 font-mono">৳ 39.85 Lakh</p>
              <p className="text-[10px] text-emerald-700 font-bold mt-1">Total overhead & project operational fees</p>
              <Receipt className="absolute -right-3 -bottom-3 size-24 text-emerald-500/5 pointer-events-none" />
            </div>

            <div className="bg-white rounded-2xl border border-blue-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-blue-800 uppercase tracking-wider">APPROVED</span>
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <ShieldCheck size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-blue-900 font-mono">৳ 31.15 Lakh</p>
              <p className="text-[10px] text-blue-700 font-bold mt-1">Verified and disbursed vouchers</p>
              <ShieldCheck className="absolute -right-3 -bottom-3 size-24 text-blue-500/5 pointer-events-none" />
            </div>

            <div className="bg-white rounded-2xl border border-purple-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-purple-800 uppercase tracking-wider">PENDING APPROVAL</span>
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <Clock size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-purple-900 font-mono">৳ 3.20 Lakh</p>
              <p className="text-[10px] text-purple-700 font-bold mt-1">Awaiting management audit sign-off</p>
              <Clock className="absolute -right-3 -bottom-3 size-24 text-purple-500/5 pointer-events-none" />
            </div>

            <div className="bg-white rounded-2xl border border-orange-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-orange-800 uppercase tracking-wider">THIS MONTH'S EXPENSE</span>
                <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                  <Calendar size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-orange-900 font-mono">৳ 8.70 Lakh</p>
              <p className="text-[10px] text-orange-700 font-bold mt-1">Deed, site visit & survey costs (Aug 2026)</p>
              <Calendar className="absolute -right-3 -bottom-3 size-24 text-orange-500/5 pointer-events-none" />
            </div>
          </div>

          {/* Table Controls */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap">
              <div className="relative flex-1 min-w-[240px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search voucher ID, project, category..."
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={selectedProjectFilter}
                  onChange={(e) => setSelectedProjectFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none"
                >
                  <option value="All Projects">All Projects</option>
                  <option value="Purbachal Green Valley Project">Purbachal Green Valley</option>
                  <option value="Bashundhara Enclave Villa & Suites">Bashundhara Enclave</option>
                  <option value="Dhanmondi Horizon Luxury Tower">Dhanmondi Horizon</option>
                </select>

                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Paid/Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Rejected</option>
                </select>

                <button 
                  onClick={() => showToast('Exporting Project Expenses CSV...')}
                  className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>

                <button 
                  onClick={() => window.print()}
                  className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Printer size={14} />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* DATA TABLE - PAGE 3 */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/90 text-gray-500 font-extrabold uppercase border-b border-gray-100">
                  <tr>
                    <th className="py-3.5 px-4 w-10">
                      <input 
                        type="checkbox" 
                        checked={selectedRows.length === projectExpenses.length}
                        onChange={() => toggleSelectAll(projectExpenses.map(e => e.id))}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                      />
                    </th>
                    <th className="py-3.5 px-4">Voucher ID</th>
                    <th className="py-3.5 px-4">Project Name</th>
                    <th className="py-3.5 px-4">Expense Category</th>
                    <th className="py-3.5 px-4">Submitted By</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Amount (৳)</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {projectExpenses
                    .filter(exp => {
                      const matchSearch = searchQuery === '' || 
                        exp.voucherId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        exp.category.toLowerCase().includes(searchQuery.toLowerCase());
                      const matchStatus = selectedStatusFilter === 'All' || exp.status === selectedStatusFilter;
                      return matchSearch && matchStatus;
                    })
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-amber-50/20 transition-colors">
                        <td className="py-3.5 px-4">
                          <input 
                            type="checkbox" 
                            checked={selectedRows.includes(item.id)}
                            onChange={() => toggleSelectRow(item.id)}
                            className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                          />
                        </td>
                        <td className="py-3.5 px-4 font-mono font-extrabold text-amber-800">{item.voucherId}</td>
                        <td className="py-3.5 px-4 font-extrabold text-gray-900">{item.projectName}</td>
                        <td className="py-3.5 px-4 font-bold text-gray-800">{item.category}</td>
                        <td className="py-3.5 px-4 text-gray-600">{item.submittedBy}</td>
                        <td className="py-3.5 px-4 font-mono text-gray-500">{item.date}</td>
                        <td className="py-3.5 px-4 font-black text-gray-900 font-mono text-right">{item.amount}</td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black inline-block ${
                            item.status === 'Paid/Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            item.status === 'Pending' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                            'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {item.status === 'Paid/Approved' ? 'Approved' : item.status === 'Pending' ? 'Pending' : 'Rejected'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="relative inline-block text-left">
                            <button
                              onClick={() => setActiveActionRowId(activeActionRowId === item.id ? null : item.id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center gap-1 ml-auto cursor-pointer"
                            >
                              <span>Action</span>
                              <ChevronDown size={14} />
                            </button>
                            {activeActionRowId === item.id && (
                              <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-gray-200 py-1 z-30 font-bold text-xs text-gray-700">
                                <button onClick={() => { setActiveActionRowId(null); showToast(`Viewing voucher ${item.voucherId}`); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2">
                                  <Eye size={14} /> View Voucher
                                </button>
                                <button onClick={() => { setActiveActionRowId(null); showToast(`Voucher ${item.voucherId} approved!`); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 text-emerald-700">
                                  <CheckCircle2 size={14} /> Approve
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER PAGINATION */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap text-xs text-gray-500 font-medium bg-gray-50/50">
              <div className="flex items-center gap-3">
                <span>Showing 1 to 5 of 5 entries</span>
                <div className="flex items-center gap-1.5">
                  <span>Rows per page:</span>
                  <select className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700">
                    <option>10</option>
                    <option>25</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-1 font-bold">
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 cursor-not-allowed">Prev</button>
                <button className="px-3 py-1 bg-amber-500 text-white rounded-lg font-black shadow-2xs">1</button>
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 cursor-not-allowed">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* PAGE 4: AGENT COMMISSION LEDGERS                                    */}
      {/* =================================================================== */}
      {activeTab === 'commission' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-base font-black text-gray-900">Agent Commission Ledgers</h2>
              <p className="text-xs text-gray-500 font-medium">Manage sales representative earnings, commission percentages, and disbursements</p>
            </div>
            <button
              onClick={() => openAddModal('commission')}
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Plus size={16} className="stroke-[3]" />
              <span>+ Add Agent Commission</span>
            </button>
          </div>
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-emerald-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider">TOTAL COMMISSION</span>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <Calculator size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-emerald-900 font-mono">৳ 33.10 Lakh</p>
              <p className="text-[10px] text-emerald-700 font-bold mt-1">Total earned commissions across sales team</p>
              <Calculator className="absolute -right-3 -bottom-3 size-24 text-emerald-500/5 pointer-events-none" />
            </div>

            <div className="bg-white rounded-2xl border border-blue-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-blue-800 uppercase tracking-wider">PAID COMMISSION</span>
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-blue-900 font-mono">৳ 23.50 Lakh</p>
              <p className="text-[10px] text-blue-700 font-bold mt-1">Disbursed to agents & brokers</p>
              <CheckCircle2 className="absolute -right-3 -bottom-3 size-24 text-blue-500/5 pointer-events-none" />
            </div>

            <div className="bg-white rounded-2xl border border-purple-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-purple-800 uppercase tracking-wider">PAYABLE AMOUNT</span>
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <Clock size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-purple-900 font-mono">৳ 9.60 Lakh</p>
              <p className="text-[10px] text-purple-700 font-bold mt-1">Pending payout liability</p>
              <Clock className="absolute -right-3 -bottom-3 size-24 text-purple-500/5 pointer-events-none" />
            </div>

            <div className="bg-white rounded-2xl border border-orange-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-orange-800 uppercase tracking-wider">ACTIVE AGENTS</span>
                <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                  <UserCheck size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-orange-900 font-mono">18 Reps</p>
              <p className="text-[10px] text-orange-700 font-bold mt-1">In-house executives & external brokers</p>
              <UserCheck className="absolute -right-3 -bottom-3 size-24 text-orange-500/5 pointer-events-none" />
            </div>
          </div>

          {/* Table Controls */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap">
              <div className="relative flex-1 min-w-[240px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search agent name, ID, unit sold..."
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Paid/Approved">Paid/Approved</option>
                  <option value="Pending">Pending</option>
                </select>

                <button 
                  onClick={() => showToast('Exporting Agent Commission Ledger CSV...')}
                  className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>

                <button 
                  onClick={() => window.print()}
                  className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Printer size={14} />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* DATA TABLE - PAGE 4 */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/90 text-gray-500 font-extrabold uppercase border-b border-gray-100">
                  <tr>
                    <th className="py-3.5 px-4 w-10">
                      <input 
                        type="checkbox" 
                        checked={selectedRows.length === agentCommissions.length}
                        onChange={() => toggleSelectAll(agentCommissions.map(a => a.id))}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                      />
                    </th>
                    <th className="py-3.5 px-4">Agent Name & ID</th>
                    <th className="py-3.5 px-4">Project / Unit Sold</th>
                    <th className="py-3.5 px-4">Sales Value</th>
                    <th className="py-3.5 px-4">Commission (%)</th>
                    <th className="py-3.5 px-4">Total Commission</th>
                    <th className="py-3.5 px-4">Paid</th>
                    <th className="py-3.5 px-4">Due</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {agentCommissions
                    .filter(a => {
                      const matchSearch = searchQuery === '' || 
                        a.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.agentId.toLowerCase().includes(searchQuery.toLowerCase());
                      const matchStatus = selectedStatusFilter === 'All' || a.status === selectedStatusFilter;
                      return matchSearch && matchStatus;
                    })
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-amber-50/20 transition-colors">
                        <td className="py-3.5 px-4">
                          <input 
                            type="checkbox" 
                            checked={selectedRows.includes(item.id)}
                            onChange={() => toggleSelectRow(item.id)}
                            className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                          />
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <UserCheck size={15} className="text-amber-600 shrink-0" />
                            <div>
                              <p className="font-extrabold text-gray-900">{item.agentName}</p>
                              <p className="text-[10px] text-gray-400 font-mono">{item.agentId} • {item.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-gray-800">{item.unitSold}</td>
                        <td className="py-3.5 px-4 font-black text-gray-900 font-mono">{item.salesValue}</td>
                        <td className="py-3.5 px-4 font-extrabold text-amber-800 font-mono">{item.commissionRate}</td>
                        <td className="py-3.5 px-4 font-black text-emerald-800 font-mono">{item.totalCommission}</td>
                        <td className="py-3.5 px-4 font-extrabold text-blue-700 font-mono">{item.paid}</td>
                        <td className="py-3.5 px-4 font-extrabold text-rose-600 font-mono">{item.due}</td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black inline-block ${
                            item.status === 'Paid/Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="relative inline-block text-left">
                            <button
                              onClick={() => setActiveActionRowId(activeActionRowId === item.id ? null : item.id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center gap-1 ml-auto cursor-pointer"
                            >
                              <span>Action</span>
                              <ChevronDown size={14} />
                            </button>
                            {activeActionRowId === item.id && (
                              <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-gray-200 py-1 z-30 font-bold text-xs text-gray-700">
                                <button onClick={() => { setActiveActionRowId(null); showToast(`Viewing agent ledger for ${item.agentName}`); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2">
                                  <Eye size={14} /> View Ledger
                                </button>
                                <button onClick={() => { setActiveActionRowId(null); showToast(`Commission payout initiated for ${item.agentName}`); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 text-emerald-700">
                                  <DollarSign size={14} /> Pay Commission
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER PAGINATION */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap text-xs text-gray-500 font-medium bg-gray-50/50">
              <div className="flex items-center gap-3">
                <span>Showing 1 to 4 of 4 entries</span>
                <div className="flex items-center gap-1.5">
                  <span>Rows per page:</span>
                  <select className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700">
                    <option>10</option>
                    <option>25</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-1 font-bold">
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 cursor-not-allowed">Prev</button>
                <button className="px-3 py-1 bg-amber-500 text-white rounded-lg font-black shadow-2xs">1</button>
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 cursor-not-allowed">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* PAGE 5: INCOME & COLLECTIONS                                        */}
      {/* =================================================================== */}
      {activeTab === 'collections' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-base font-black text-gray-900">Income & Collections</h2>
              <p className="text-xs text-gray-500 font-medium">Record client money receipts, bank deposits, pay orders, and overdue balances</p>
            </div>
            <button
              onClick={() => openAddModal('collections')}
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Plus size={16} className="stroke-[3]" />
              <span>+ Record Collection</span>
            </button>
          </div>
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-emerald-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider">TOTAL COLLECTIONS</span>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <CreditCard size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-emerald-900 font-mono">৳ 58.40 Cr</p>
              <p className="text-[10px] text-emerald-700 font-bold mt-1">Realized customer deposits & installments</p>
              <CreditCard className="absolute -right-3 -bottom-3 size-24 text-emerald-500/5 pointer-events-none" />
            </div>

            <div className="bg-white rounded-2xl border border-blue-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-blue-800 uppercase tracking-wider">TARGET COLLECTION</span>
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <TrendingUp size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-blue-900 font-mono">৳ 65.00 Cr</p>
              <p className="text-[10px] text-blue-700 font-bold mt-1">Monthly collection benchmark</p>
              <TrendingUp className="absolute -right-3 -bottom-3 size-24 text-blue-500/5 pointer-events-none" />
            </div>

            <div className="bg-white rounded-2xl border border-purple-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-purple-800 uppercase tracking-wider">OVERDUE PAYMENTS</span>
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <AlertCircle size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-purple-900 font-mono">৳ 6.60 Cr</p>
              <p className="text-[10px] text-purple-700 font-bold mt-1">Pending customer installment dues</p>
              <AlertCircle className="absolute -right-3 -bottom-3 size-24 text-purple-500/5 pointer-events-none" />
            </div>

            <div className="bg-white rounded-2xl border border-orange-200/90 p-5 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-orange-800 uppercase tracking-wider">TODAY'S COLLECTION</span>
                <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                  <Banknote size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-orange-900 font-mono">৳ 30.00 Lakh</p>
              <p className="text-[10px] text-orange-700 font-bold mt-1">Cleared today across all accounts</p>
              <Banknote className="absolute -right-3 -bottom-3 size-24 text-orange-500/5 pointer-events-none" />
            </div>
          </div>

          {/* Table Controls */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap">
              <div className="relative flex-1 min-w-[240px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search receipt no, client name, unit..."
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Paid/Approved">Cleared</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Bounced / Overdue</option>
                </select>

                <button 
                  onClick={() => showToast('Exporting Collections CSV...')}
                  className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>

                <button 
                  onClick={() => window.print()}
                  className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Printer size={14} />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* DATA TABLE - PAGE 5 */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/90 text-gray-500 font-extrabold uppercase border-b border-gray-100">
                  <tr>
                    <th className="py-3.5 px-4 w-10">
                      <input 
                        type="checkbox" 
                        checked={selectedRows.length === collections.length}
                        onChange={() => toggleSelectAll(collections.map(c => c.id))}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                      />
                    </th>
                    <th className="py-3.5 px-4">Receipt No</th>
                    <th className="py-3.5 px-4">Client Name</th>
                    <th className="py-3.5 px-4">Project / Unit</th>
                    <th className="py-3.5 px-4">Payment Mode</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Amount Collected</th>
                    <th className="py-3.5 px-4 text-right">Dues</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {collections
                    .filter(c => {
                      const matchSearch = searchQuery === '' || 
                        c.receiptNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.clientName.toLowerCase().includes(searchQuery.toLowerCase());
                      const matchStatus = selectedStatusFilter === 'All' || c.status === selectedStatusFilter;
                      return matchSearch && matchStatus;
                    })
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-amber-50/20 transition-colors">
                        <td className="py-3.5 px-4">
                          <input 
                            type="checkbox" 
                            checked={selectedRows.includes(item.id)}
                            onChange={() => toggleSelectRow(item.id)}
                            className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                          />
                        </td>
                        <td className="py-3.5 px-4 font-mono font-extrabold text-amber-800">{item.receiptNo}</td>
                        <td className="py-3.5 px-4">
                          <p className="font-extrabold text-gray-900">{item.clientName}</p>
                          <p className="text-[10px] text-gray-400 font-mono">{item.phone}</p>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-gray-800">{item.unitSold}</td>
                        <td className="py-3.5 px-4 font-semibold text-gray-700">{item.paymentMode}</td>
                        <td className="py-3.5 px-4 font-mono text-gray-500">{item.date}</td>
                        <td className="py-3.5 px-4 font-black text-emerald-700 font-mono text-right">{item.collectedAmount}</td>
                        <td className="py-3.5 px-4 font-extrabold text-rose-600 font-mono text-right">{item.dues}</td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black inline-block ${
                            item.status === 'Paid/Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            item.status === 'Pending' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                            'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {item.status === 'Paid/Approved' ? 'Cleared' : item.status === 'Pending' ? 'Pending' : 'Bounced'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="relative inline-block text-left">
                            <button
                              onClick={() => setActiveActionRowId(activeActionRowId === item.id ? null : item.id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center gap-1 ml-auto cursor-pointer"
                            >
                              <span>Action</span>
                              <ChevronDown size={14} />
                            </button>
                            {activeActionRowId === item.id && (
                              <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-gray-200 py-1 z-30 font-bold text-xs text-gray-700">
                                <button onClick={() => { setActiveActionRowId(null); showToast(`Viewing money receipt ${item.receiptNo}`); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2">
                                  <FileText size={14} /> View Receipt
                                </button>
                                <button onClick={() => { setActiveActionRowId(null); showToast(`Printing collection slip for ${item.receiptNo}`); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2">
                                  <Printer size={14} /> Print Receipt
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER PAGINATION */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap text-xs text-gray-500 font-medium bg-gray-50/50">
              <div className="flex items-center gap-3">
                <span>Showing 1 to 4 of 4 entries</span>
                <div className="flex items-center gap-1.5">
                  <span>Rows per page:</span>
                  <select className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700">
                    <option>10</option>
                    <option>25</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-1 font-bold">
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 cursor-not-allowed">Prev</button>
                <button className="px-3 py-1 bg-amber-500 text-white rounded-lg font-black shadow-2xs">1</button>
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 cursor-not-allowed">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UNIVERSAL ADD ENTRY MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                <Plus size={18} className="text-orange-500" />
                <span>
                  {modalFormType === 'all' && 'Add New Project Overview Ledger'}
                  {modalFormType === 'land' && 'Add New Land Purchase Record'}
                  {modalFormType === 'expenses' && 'Log Project Expense Voucher'}
                  {modalFormType === 'commission' && 'Add Agent Commission Deal'}
                  {modalFormType === 'collections' && 'Record Customer Collection'}
                </span>
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4 text-xs font-medium text-gray-700">
              <div>
                <label className="block font-bold text-gray-900 mb-1">Project Name</label>
                <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-semibold">
                  <option>Purbachal Green Valley Project</option>
                  <option>Bashundhara Enclave Villa & Suites</option>
                  <option>Dhanmondi Horizon Luxury Tower</option>
                  <option>Uttara Sector 18 Lakeview Horizon</option>
                </select>
              </div>

              {modalFormType === 'land' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-900 mb-1">Landowner / Seller Name</label>
                      <input type="text" placeholder="e.g. Alhaj Munsur Ali" required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none" />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-900 mb-1">Phone Number</label>
                      <input type="text" placeholder="+880 1711..." className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-900 mb-1">Total Value (৳)</label>
                      <input type="text" placeholder="e.g. 5,00,00,000" required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none font-mono" />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-900 mb-1">Paid Amount (৳)</label>
                      <input type="text" placeholder="e.g. 3,00,00,000" required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none font-mono" />
                    </div>
                  </div>
                </>
              )}

              {modalFormType === 'expenses' && (
                <>
                  <div>
                    <label className="block font-bold text-gray-900 mb-1">Expense Category</label>
                    <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none font-semibold">
                      <option>Registration & Deed (দলিল খরচ)</option>
                      <option>Site Visit & Transport (সাইট ভিজিট)</option>
                      <option>Soil Test & Architect Approval</option>
                      <option>Land Development & Earth Filling</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-900 mb-1">Amount (৳)</label>
                      <input type="text" placeholder="e.g. 50,000" required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none font-mono" />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-900 mb-1">Submitted By</label>
                      <input type="text" placeholder="Name / Designation" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none" />
                    </div>
                  </div>
                </>
              )}

              {modalFormType === 'commission' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-900 mb-1">Agent Name</label>
                      <input type="text" placeholder="e.g. Siddique Rahman" required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none" />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-900 mb-1">Unit / Plot Sold</label>
                      <input type="text" placeholder="e.g. Plot A-102" required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-900 mb-1">Sales Value (৳)</label>
                      <input type="text" placeholder="e.g. 1,20,00,000" required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none font-mono" />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-900 mb-1">Commission Rate (%)</label>
                      <input type="text" placeholder="5.0%" defaultValue="5.0%" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none font-mono" />
                    </div>
                  </div>
                </>
              )}

              {modalFormType === 'collections' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-900 mb-1">Client Name</label>
                      <input type="text" placeholder="e.g. Jitu Guha" required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none" />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-900 mb-1">Payment Mode</label>
                      <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none font-semibold">
                        <option>Bank Deposit</option>
                        <option>bKash / MFS</option>
                        <option>Cheque Deposit</option>
                        <option>Pay Order</option>
                        <option>Cash</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-900 mb-1">Amount Collected (৳)</label>
                    <input type="text" placeholder="e.g. 5,00,000" required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none font-mono" />
                  </div>
                </>
              )}

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-black shadow-md cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <Plus size={16} /> Save Ledger Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
