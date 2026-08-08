import React, { useState } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  Award, 
  PieChart, 
  Building, 
  Search, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Eye, 
  FileText, 
  ChevronDown, 
  X,
  ShieldCheck
} from 'lucide-react';
import { AccountsLedgerItem, InventoryPlot } from '../types';

export const InventoryAccountsView: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>('Purbachal Green Valley');
  const [selectedBranch, setSelectedBranch] = useState<string>('All Branches');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [plotStatusFilter, setPlotStatusFilter] = useState<'All' | 'Available' | 'Token Deposit' | 'Sold'>('All');
  const [activeActionRowId, setActiveActionRowId] = useState<string | null>(null);
  const [inspectPlot, setInspectPlot] = useState<InventoryPlot | null>(null);
  const [receiptModalItem, setReceiptModalItem] = useState<AccountsLedgerItem | null>(null);
  const [paidToast, setPaidToast] = useState<string | null>(null);

  // Mock Plot Holdings Data
  const [plots] = useState<InventoryPlot[]>(() => {
    const list: InventoryPlot[] = [];
    const blocks = ['A', 'B', 'C', 'D'];
    let count = 1;

    blocks.forEach((block) => {
      for (let i = 1; i <= 20; i++) {
        const plotNo = `${block}-${100 + i}`;
        let status: 'Available' | 'Token Deposit' | 'Sold' = 'Available';
        let buyerName: string | undefined;
        let salesmanName: string | undefined;
        let bookingDate: string | undefined;

        if (count % 3 === 0) {
          status = 'Sold';
          buyerName = ['Jitu Guha', 'Tanvir Ahmed', 'Mahfuzur Rahman', 'Nusrat Jahan', 'Farhan Kabir'][count % 5];
          salesmanName = ['Siddique Rahman', 'Mehesum Rahman', 'Karim Ullah', 'Rakibul Islam'][count % 4];
          bookingDate = '02 Aug, 2026';
        } else if (count % 7 === 0) {
          status = 'Token Deposit';
          buyerName = ['Kazi Anik', 'Rashedul Hasan', 'Shamsul Haque'][count % 3];
          salesmanName = ['Siddique Rahman', 'Mehesum Rahman'][count % 2];
          bookingDate = '05 Aug, 2026';
        }

        list.push({
          id: `plot_${count}`,
          plotNo,
          block: `Block ${block}`,
          size: count % 2 === 0 ? '5 Katha' : '3 Katha',
          facing: count % 4 === 0 ? 'Corner' : count % 3 === 0 ? 'South' : 'North',
          status,
          price: count % 2 === 0 ? '৳ 1,20,00,000' : '৳ 75,00,000',
          buyerName,
          salesmanName,
          bookingDate
        });
        count++;
      }
    });
    return list;
  });

  // Mock Accounts Ledger Data
  const [ledgerData, setLedgerData] = useState<AccountsLedgerItem[]>([
    {
      id: 'led_1',
      sl: '01',
      bookingDate: '05 Aug, 2026',
      projectName: 'Purbachal Green Valley',
      unitDetails: '5 Katha • South',
      clientName: 'Jitu Guha',
      salesman: 'Siddique Rahman',
      grossSale: '৳ 1,20,00,000',
      commission: '৳ 6,00,000',
      netProfit: '৳ 35,00,000',
      status: 'Commission Paid',
      branch: 'Dhaka HO'
    },
    {
      id: 'led_2',
      sl: '02',
      bookingDate: '04 Aug, 2026',
      projectName: 'Purbachal Green Valley',
      unitDetails: '3 Katha • East',
      clientName: 'Tanvir Ahmed',
      salesman: 'Mehesum Rahman',
      grossSale: '৳ 75,00,000',
      commission: '৳ 3,75,000',
      netProfit: '৳ 22,50,000',
      status: 'Pending',
      branch: 'Dhaka HO'
    },
    {
      id: 'led_3',
      sl: '03',
      bookingDate: '03 Aug, 2026',
      projectName: 'Bashundhara Enclave Villa',
      unitDetails: '2400 SQFT • South-East',
      clientName: 'Mahfuzur Rahman',
      salesman: 'Karim Ullah',
      grossSale: '৳ 2,50,00,000',
      commission: '৳ 12,50,000',
      netProfit: '৳ 65,00,000',
      status: 'Commission Paid',
      branch: 'Dhaka HO'
    },
    {
      id: 'led_4',
      sl: '04',
      bookingDate: '02 Aug, 2026',
      projectName: 'Dhanmondi Horizon Luxury Tower',
      unitDetails: '1800 SQFT • Corner',
      clientName: 'Nusrat Jahan',
      salesman: 'Rakibul Islam',
      grossSale: '৳ 3,10,00,000',
      commission: '৳ 15,50,000',
      netProfit: '৳ 88,00,000',
      status: 'Pending',
      branch: 'Dhanmondi Branch'
    },
    {
      id: 'led_5',
      sl: '05',
      bookingDate: '01 Aug, 2026',
      projectName: 'Purbachal Green Valley',
      unitDetails: '5 Katha • Corner',
      clientName: 'Farhan Kabir',
      salesman: 'Siddique Rahman',
      grossSale: '৳ 1,35,00,000',
      commission: '৳ 6,75,000',
      netProfit: '৳ 38,50,000',
      status: 'On Hold',
      branch: 'Dhaka HO'
    },
    {
      id: 'led_6',
      sl: '06',
      bookingDate: '28 Jul, 2026',
      projectName: 'Chittagong Hillside Valley',
      unitDetails: '10 Katha • North',
      clientName: 'Kazi Anik',
      salesman: 'Mehesum Rahman',
      grossSale: '৳ 2,10,00,000',
      commission: '৳ 10,50,000',
      netProfit: '৳ 55,00,000',
      status: 'Commission Paid',
      branch: 'Chittagong Branch'
    }
  ]);

  // Inventory stats
  const totalPlotsCount = 250;
  const soldCount = 180;
  const tokenCount = 20;
  const availableCount = 70;

  // Filtered ledger rows
  const filteredLedger = ledgerData.filter((item) => {
    const matchesProject = selectedProject === 'All Projects' || item.projectName === selectedProject;
    const matchesBranch = selectedBranch === 'All Branches' || item.branch === selectedBranch;
    const matchesStatus = selectedStatusFilter === 'All' || item.status === selectedStatusFilter;
    const matchesQuery = searchQuery === '' || 
      item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.salesman.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.unitDetails.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesProject && matchesBranch && matchesStatus && matchesQuery;
  });

  // Filtered plots
  const filteredPlots = plots.filter(p => {
    if (plotStatusFilter === 'All') return true;
    return p.status === plotStatusFilter;
  });

  const handleMarkCommissionPaid = (id: string, salesman: string) => {
    setLedgerData(prev => prev.map(item => item.id === id ? { ...item, status: 'Commission Paid' } : item));
    setActiveActionRowId(null);
    setPaidToast(`Commission status updated to PAID for ${salesman}`);
    setTimeout(() => setPaidToast(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-full font-sans pb-10">
      {/* Toast Alert */}
      {paidToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-emerald-500 animate-bounce text-xs font-bold">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{paidToast}</span>
        </div>
      )}

      {/* SECTION 1: FINANCIAL KPI OVERVIEW CARDS (Top Row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 (Green theme): Total Sales Value - ৳120.5M */}
        <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-2xs relative overflow-hidden group hover:border-emerald-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <DollarSign size={20} />
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                +18.4%
              </span>
            </div>
            <p className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Total Sales Value</p>
          </div>
          <div className="mt-3">
            <span className="text-xs font-bold text-gray-400 block uppercase">TOTAL</span>
            <span className="text-3xl font-black text-gray-900 tracking-tight">৳120.5M</span>
          </div>
        </div>

        {/* Card 2 (Orange theme): Total Company Expense - ৳80.0M */}
        <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-2xs relative overflow-hidden group hover:border-amber-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                <CreditCard size={20} />
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-200">
                OPEX/CAPEX
              </span>
            </div>
            <p className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Total Company Expense</p>
          </div>
          <div className="mt-3">
            <span className="text-xs font-bold text-gray-400 block uppercase">TOTAL</span>
            <span className="text-3xl font-black text-gray-900 tracking-tight">৳80.0M</span>
          </div>
        </div>

        {/* Card 3 (Purple theme): Salesman Commission - ৳5.2M */}
        <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-2xs relative overflow-hidden group hover:border-purple-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                <Award size={20} />
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-100 text-purple-800 border border-purple-200">
                5.0% Rate
              </span>
            </div>
            <p className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Salesman Commission</p>
          </div>
          <div className="mt-3">
            <span className="text-xs font-bold text-gray-400 block uppercase">TOTAL</span>
            <span className="text-3xl font-black text-gray-900 tracking-tight">৳5.2M</span>
          </div>
        </div>

        {/* Card 4 (Blue theme): Net Company Profit - ৳35.3M */}
        <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-2xs relative overflow-hidden group hover:border-blue-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <PieChart size={20} />
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 border border-blue-200">
                29.3% Margin
              </span>
            </div>
            <p className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Net Company Profit</p>
          </div>
          <div className="mt-3">
            <span className="text-xs font-bold text-gray-400 block uppercase">TOTAL</span>
            <span className="text-3xl font-black text-emerald-600 tracking-tight">৳35.3M</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: SPLIT CONTENT AREA (Middle & Bottom) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* LEFT COLUMN: Project Inventory Holdings Grid (Width: 40% -> col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Title & Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                  <Building size={16} className="text-amber-600" />
                  <span>Project Holdings - Purbachal Green Valley</span>
                </h3>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="space-y-1.5 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-emerald-700">Sold: {soldCount} / {totalPlotsCount}</span>
                <span className="text-amber-700">Avail: {availableCount} Plots</span>
              </div>
              
              {/* Stacked Progress Bar */}
              <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
                <div 
                  className="bg-slate-700 h-full" 
                  style={{ width: `${(soldCount / totalPlotsCount) * 100}%` }}
                  title={`Sold: ${soldCount}`}
                />
                <div 
                  className="bg-amber-500 h-full" 
                  style={{ width: `${(tokenCount / totalPlotsCount) * 100}%` }}
                  title={`Token Deposit: ${tokenCount}`}
                />
                <div 
                  className="bg-emerald-500 h-full" 
                  style={{ width: `${(availableCount / totalPlotsCount) * 100}%` }}
                  title={`Available: ${availableCount}`}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold pt-0.5">
                <span>Sold (180 Plots)</span>
                <span>Token (20 Plots)</span>
                <span>Available (70 Plots)</span>
              </div>
            </div>

            {/* Legend Filter Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              <button
                onClick={() => setPlotStatusFilter('All')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                  plotStatusFilter === 'All' 
                    ? 'bg-gray-900 text-white shadow-2xs' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setPlotStatusFilter('Available')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
                  plotStatusFilter === 'Available' 
                    ? 'bg-emerald-600 text-white shadow-2xs' 
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Available</span>
              </button>
              <button
                onClick={() => setPlotStatusFilter('Token Deposit')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
                  plotStatusFilter === 'Token Deposit' 
                    ? 'bg-amber-600 text-white shadow-2xs' 
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Token Deposit</span>
              </button>
              <button
                onClick={() => setPlotStatusFilter('Sold')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
                  plotStatusFilter === 'Sold' 
                    ? 'bg-slate-800 text-white shadow-2xs' 
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                <span>Sold/Booked</span>
              </button>
            </div>

            {/* Visual Grid of Small Rounded Rectangular Blocks */}
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 max-h-[360px] overflow-y-auto">
              <div className="grid grid-cols-5 sm:grid-cols-8 gap-1.5">
                {filteredPlots.map((plot) => {
                  let bgColorClass = 'bg-emerald-500 text-white hover:bg-emerald-600';
                  if (plot.status === 'Token Deposit') {
                    bgColorClass = 'bg-amber-500 text-white hover:bg-amber-600';
                  } else if (plot.status === 'Sold') {
                    bgColorClass = 'bg-slate-700 text-slate-100 hover:bg-slate-800';
                  }

                  return (
                    <button
                      key={plot.id}
                      onClick={() => setInspectPlot(plot)}
                      title={`Plot ${plot.plotNo} - ${plot.status} (${plot.size})`}
                      className={`h-9 rounded-md ${bgColorClass} transition-transform transform active:scale-95 flex flex-col items-center justify-center p-1 text-[10px] font-black tracking-tight shadow-2xs cursor-pointer select-none`}
                    >
                      <span className="leading-none">{plot.plotNo}</span>
                      <span className="text-[8px] opacity-80 leading-none mt-0.5">{plot.size.replace(' Katha', 'K')}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span>Click block to view unit info</span>
            <span className="font-extrabold text-amber-700">Total: 250 Plots</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Accounts & Commission Ledger Table (Width: 60% -> col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Header & Title */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                  <FileText size={16} className="text-amber-600" />
                  <span>Recent Bookings & Ledger</span>
                </h3>
              </div>

              {/* Light gray filter dropdowns (Select Project, Select Branch) */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="text-xs font-bold bg-gray-100/80 border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-700 focus:outline-none focus:border-amber-500"
                >
                  <option value="All Projects">Select Project</option>
                  <option value="Purbachal Green Valley">Purbachal Green Valley</option>
                  <option value="Bashundhara Enclave Villa">Bashundhara Enclave Villa</option>
                  <option value="Dhanmondi Horizon Luxury Tower">Dhanmondi Horizon Luxury Tower</option>
                  <option value="Chittagong Hillside Valley">Chittagong Hillside Valley</option>
                </select>

                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="text-xs font-bold bg-gray-100/80 border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-700 focus:outline-none focus:border-amber-500"
                >
                  <option value="All Branches">Select Branch</option>
                  <option value="Dhaka HO">Dhaka HO</option>
                  <option value="Dhanmondi Branch">Dhanmondi Branch</option>
                  <option value="Chittagong Branch">Chittagong Branch</option>
                </select>

                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="text-xs font-bold bg-gray-100/80 border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-700 focus:outline-none focus:border-amber-500"
                >
                  <option value="All">All Status</option>
                  <option value="Commission Paid">Commission Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
            </div>

            {/* Quick Search Bar */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search ledger by client, salesman, or unit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Accounts Table with Clean Horizontal Dividers */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 font-extrabold uppercase tracking-wider text-[10px] border-b border-gray-200">
                    <th className="py-2.5 px-3">SI</th>
                    <th className="py-2.5 px-3">ACTION</th>
                    <th className="py-2.5 px-3">BOOKING DATE</th>
                    <th className="py-2.5 px-3">UNIT DETAILS</th>
                    <th className="py-2.5 px-3">SALESMAN</th>
                    <th className="py-2.5 px-3">GROSS SALE</th>
                    <th className="py-2.5 px-3">COMMISSION (5%)</th>
                    <th className="py-2.5 px-3">NET PROFIT</th>
                    <th className="py-2.5 px-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 font-medium text-xs">
                  {filteredLedger.length > 0 ? (
                    filteredLedger.map((row) => (
                      <tr key={row.id} className="hover:bg-amber-50/20 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-gray-500">{row.sl}</td>
                        
                        {/* ACTION COLUMN: Bright green button with white text saying "Action ⌄" */}
                        <td className="py-3 px-3 relative">
                          <button
                            onClick={() => setActiveActionRowId(activeActionRowId === row.id ? null : row.id)}
                            className="py-1 px-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-[11px] font-extrabold flex items-center gap-1 shadow-2xs transition-colors"
                          >
                            <span>Action</span>
                            <ChevronDown size={12} />
                          </button>

                          {/* Action Dropdown Menu */}
                          {activeActionRowId === row.id && (
                            <div className="absolute left-3 top-10 w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-30 py-1 text-xs space-y-0.5 font-medium">
                              <button
                                onClick={() => {
                                  setReceiptModalItem(row);
                                  setActiveActionRowId(null);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-amber-50 text-gray-800 flex items-center gap-2"
                              >
                                <Eye size={13} className="text-amber-600" />
                                <span>View Receipt</span>
                              </button>

                              {row.status !== 'Commission Paid' && (
                                <button
                                  onClick={() => handleMarkCommissionPaid(row.id, row.salesman)}
                                  className="w-full text-left px-3 py-1.5 hover:bg-emerald-50 text-emerald-800 flex items-center gap-2 font-bold"
                                >
                                  <CheckCircle2 size={13} className="text-emerald-600" />
                                  <span>Pay Commission</span>
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  alert(`Generating commercial invoice for ${row.clientName}...`);
                                  setActiveActionRowId(null);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-gray-100 text-gray-800 flex items-center gap-2"
                              >
                                <FileText size={13} className="text-blue-600" />
                                <span>Generate Invoice</span>
                              </button>

                              <button
                                onClick={() => {
                                  alert(`Downloading Sales Agreement PDF...`);
                                  setActiveActionRowId(null);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-gray-100 text-gray-800 flex items-center gap-2 border-t border-gray-100 pt-1"
                              >
                                <Download size={13} className="text-gray-500" />
                                <span>Download PDF</span>
                              </button>
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-3 font-mono text-[11px] text-gray-500 whitespace-nowrap">
                          {row.bookingDate}
                        </td>

                        {/* UNIT DETAILS COLUMN: Stacked text - Project in black, Specs in orange */}
                        <td className="py-3 px-3 min-w-[170px]">
                          <p className="font-extrabold text-gray-900 leading-tight">{row.projectName}</p>
                          <p className="text-[11px] font-bold text-amber-600 leading-tight mt-0.5">{row.unitDetails}</p>
                        </td>

                        <td className="py-3 px-3 font-semibold text-gray-800 whitespace-nowrap">
                          {row.salesman}
                        </td>

                        <td className="py-3 px-3 font-extrabold text-gray-900 font-mono whitespace-nowrap">
                          {row.grossSale}
                        </td>

                        <td className="py-3 px-3 font-black text-purple-700 font-mono whitespace-nowrap">
                          {row.commission}
                        </td>

                        <td className="py-3 px-3 font-black text-emerald-700 font-mono whitespace-nowrap">
                          {row.netProfit}
                        </td>

                        {/* STATUS COLUMN: Pill Badges */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          {row.status === 'Commission Paid' ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 w-max">
                              <CheckCircle2 size={11} />
                              <span>Commission Paid</span>
                            </span>
                          ) : row.status === 'Pending' ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 w-max">
                              <Clock size={11} />
                              <span>Pending</span>
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1 w-max">
                              <AlertCircle size={11} />
                              <span>On Hold</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-gray-500 text-xs">
                        No transactions found matching selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span>Recent ledger entries</span>
            <span className="font-bold text-gray-800">Total Net Profit: ৳ 35,30,00,000</span>
          </div>
        </div>

      </div>

      {/* MODAL 1: Plot Inspector Modal */}
      {inspectPlot && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-gray-200 shadow-2xl overflow-hidden space-y-4">
            <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building size={18} className="text-amber-400" />
                <h3 className="font-extrabold text-sm">Plot Inspector #{inspectPlot.plotNo}</h3>
              </div>
              <button 
                onClick={() => setInspectPlot(null)}
                className="p-1 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div className="flex items-center justify-between bg-amber-50 p-3 rounded-xl border border-amber-200">
                <div>
                  <span className="text-gray-500 text-[10px] uppercase font-bold block">Status</span>
                  <span className="font-extrabold text-amber-900 text-sm">{inspectPlot.status}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 text-[10px] uppercase font-bold block">Listed Price</span>
                  <span className="font-black text-emerald-700 text-sm">{inspectPlot.price}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-gray-700">
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Plot Size</span>
                  <span className="font-bold text-gray-900">{inspectPlot.size}</span>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Facing</span>
                  <span className="font-bold text-gray-900">{inspectPlot.facing} Facing</span>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Block</span>
                  <span className="font-bold text-gray-900">{inspectPlot.block}</span>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Road Width</span>
                  <span className="font-bold text-gray-900">25 Ft Wide Road</span>
                </div>
              </div>

              {inspectPlot.buyerName && (
                <div className="border-t border-gray-100 pt-3 space-y-1">
                  <span className="font-extrabold text-gray-900 block text-xs">Buyer & Salesman Info</span>
                  <p className="flex justify-between text-gray-600">
                    <span>Buyer Name:</span>
                    <strong className="text-gray-900">{inspectPlot.buyerName}</strong>
                  </p>
                  <p className="flex justify-between text-gray-600">
                    <span>Assigned Salesman:</span>
                    <strong className="text-gray-900">{inspectPlot.salesmanName}</strong>
                  </p>
                  <p className="flex justify-between text-gray-600">
                    <span>Booking Date:</span>
                    <strong className="text-gray-900">{inspectPlot.bookingDate}</strong>
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setInspectPlot(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-bold text-xs"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: View Receipt Modal */}
      {receiptModalItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-gray-200 shadow-2xl overflow-hidden space-y-4">
            <div className="bg-amber-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} />
                <h3 className="font-extrabold text-sm">Official Money Receipt</h3>
              </div>
              <button 
                onClick={() => setReceiptModalItem(null)}
                className="p-1 hover:bg-amber-700 rounded-lg text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="text-center border-b border-gray-200 pb-3">
                <h2 className="text-base font-extrabold text-gray-900">PROMISE ASSETS LIMITED</h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Real Estate Enterprise Money Voucher</p>
                <p className="text-[11px] text-amber-700 font-mono font-bold mt-1">Receipt No: MR-2026-00{receiptModalItem.sl}</p>
              </div>

              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-500">Client / Buyer Name:</span>
                  <strong className="text-gray-900 font-bold">{receiptModalItem.clientName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Project & Unit:</span>
                  <strong className="text-amber-800 font-bold">{receiptModalItem.projectName} ({receiptModalItem.unitDetails})</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sales Executive:</span>
                  <strong className="text-gray-900">{receiptModalItem.salesman}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Gross Sale Value:</span>
                  <strong className="text-gray-900 font-mono font-bold">{receiptModalItem.grossSale}</strong>
                </div>
                <div className="flex justify-between bg-purple-50 p-2 rounded-lg border border-purple-100">
                  <span className="text-purple-900 font-bold">Salesman Commission (5%):</span>
                  <strong className="text-purple-900 font-mono font-extrabold">{receiptModalItem.commission}</strong>
                </div>
                <div className="flex justify-between bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                  <span className="text-emerald-900 font-bold">Net Company Profit:</span>
                  <strong className="text-emerald-900 font-mono font-extrabold">{receiptModalItem.netProfit}</strong>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">Authorized by SA Super Admin</span>
              <button
                onClick={() => {
                  alert(`Printing money receipt for ${receiptModalItem.clientName}...`);
                  setReceiptModalItem(null);
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-2xs"
              >
                <Download size={14} />
                <span>Print Official Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
