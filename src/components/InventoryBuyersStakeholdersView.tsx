import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Download, 
  Printer, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Eye, 
  Edit, 
  CheckCircle2, 
  X, 
  Building2, 
  Phone, 
  Mail, 
  FileText, 
  DollarSign, 
  Briefcase, 
  Tag, 
  Wallet,
  ShieldCheck,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { BuyerStakeholderItem } from '../types';

export const InventoryBuyersStakeholdersView: React.FC = () => {
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<string>('All');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItemForDetails, setSelectedItemForDetails] = useState<BuyerStakeholderItem | null>(null);
  const [editingItem, setEditingItem] = useState<BuyerStakeholderItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    nid: '',
    type: 'Unit Buyer' as BuyerStakeholderItem['type'],
    projectName: 'Purbachal Green Valley Project',
    unitOrPlotNo: '',
    sharesOrSize: '',
    totalAmount: '',
    paidAmount: '',
    status: 'Confirmed' as BuyerStakeholderItem['status'],
    address: ''
  });

  // Initial Mock Buyers & Stakeholders Data
  const [items, setItems] = useState<BuyerStakeholderItem[]>([
    {
      id: 'bs_1',
      name: 'Engr. Shahadat Hossain',
      phone: '+880 1711-234567',
      email: 'shahadat.engr@gmail.com',
      nid: '198426918239102',
      type: 'Unit Buyer',
      projectName: 'Purbachal Green Valley Project',
      unitOrPlotNo: 'Plot A-102',
      sharesOrSize: '5 Katha',
      totalAmount: '৳ 1,20,00,000',
      paidAmount: '৳ 85,00,000',
      dueAmount: '৳ 35,00,000',
      joiningDate: '12 Jan, 2025',
      status: 'Confirmed',
      address: 'House 42, Road 11, Banani, Dhaka'
    },
    {
      id: 'bs_2',
      name: 'Tanvir Ahmed Siddique',
      phone: '+880 1819-887766',
      email: 'tanvir.siddique@yahoo.com',
      nid: '197926198273111',
      type: 'Project Shareholder',
      projectName: 'Purbachal Green Valley Project',
      unitOrPlotNo: 'Share Pool #4',
      sharesOrSize: '10 Shares',
      totalAmount: '৳ 2,50,00,000',
      paidAmount: '৳ 2,50,00,000',
      dueAmount: '৳ 0',
      joiningDate: '05 Feb, 2025',
      status: 'Confirmed',
      address: 'Flat 6A, Promise Tower, Dhanmondi, Dhaka'
    },
    {
      id: 'bs_3',
      name: 'Mrs. Rafia Begum',
      phone: '+880 1912-334455',
      email: 'rafia.begum@hotmail.com',
      nid: '196826190283722',
      type: 'Unit Buyer',
      projectName: 'Promise Heights Commercial',
      unitOrPlotNo: 'Flat 4B',
      sharesOrSize: '1,850 SQFT',
      totalAmount: '৳ 1,45,00,000',
      paidAmount: '৳ 45,00,000',
      dueAmount: '৳ 1,00,00,000',
      joiningDate: '20 Mar, 2025',
      status: 'Token Paid',
      address: 'Sector 4, Uttara, Dhaka'
    },
    {
      id: 'bs_4',
      name: 'Dr. Mahbubur Rahman',
      phone: '+880 1730-998877',
      email: 'dr.mahbub@squarehospital.org',
      nid: '197226182930122',
      type: 'Joint Venture Partner',
      projectName: 'Modhumoti Model Town',
      unitOrPlotNo: 'Block C Joint Land',
      sharesOrSize: '15 Katha Land Share',
      totalAmount: '৳ 4,00,00,000',
      paidAmount: '৳ 3,00,00,000',
      dueAmount: '৳ 1,00,00,000',
      joiningDate: '10 Apr, 2025',
      status: 'Confirmed',
      address: 'Lake Drive, Gulshan 2, Dhaka'
    },
    {
      id: 'bs_5',
      name: 'Kazi Farhan Ishrak',
      phone: '+880 1678-112233',
      email: 'farhan.ishrak@techcorp.bd',
      nid: '199226198273944',
      type: 'Investor',
      projectName: 'Uttara Model Town Phase 3',
      unitOrPlotNo: 'Pool Investment #A',
      sharesOrSize: '2 Units Equity',
      totalAmount: '৳ 80,00,000',
      paidAmount: '৳ 20,00,000',
      dueAmount: '৳ 60,00,000',
      joiningDate: '02 May, 2025',
      status: 'Pending Verification',
      address: 'Mirpur DOHS, Road 4, Dhaka'
    },
    {
      id: 'bs_6',
      name: 'Kamrul Hassan Choudhury',
      phone: '+880 1552-667788',
      email: 'kamrul.choudhury@gmail.com',
      nid: '198126102938477',
      type: 'Unit Buyer',
      projectName: 'Mirpur Lake City Tower',
      unitOrPlotNo: 'Flat 8A',
      sharesOrSize: '1,650 SQFT',
      totalAmount: '৳ 1,15,00,000',
      paidAmount: '৳ 70,00,000',
      dueAmount: '৳ 45,00,000',
      joiningDate: '18 May, 2025',
      status: 'Confirmed',
      address: 'Section 10, Mirpur, Dhaka'
    }
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, selectedStatus, selectedProject]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle Form Submission (Add or Edit)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please fill in the buyer name and phone number.');
      return;
    }

    const totalValNum = parseFloat(formData.totalAmount.replace(/[^0-9.]/g, '')) || 0;
    const paidValNum = parseFloat(formData.paidAmount.replace(/[^0-9.]/g, '')) || 0;
    const dueValNum = Math.max(0, totalValNum - paidValNum);

    const formattedTotal = formData.totalAmount.startsWith('৳') ? formData.totalAmount : `৳ ${formData.totalAmount || '0'}`;
    const formattedPaid = formData.paidAmount.startsWith('৳') ? formData.paidAmount : `৳ ${formData.paidAmount || '0'}`;
    const formattedDue = `৳ ${dueValNum.toLocaleString('en-IN')}`;

    if (editingItem) {
      // Update
      setItems(prev => prev.map(item => item.id === editingItem.id ? {
        ...item,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        nid: formData.nid,
        type: formData.type,
        projectName: formData.projectName,
        unitOrPlotNo: formData.unitOrPlotNo || 'Unit-101',
        sharesOrSize: formData.sharesOrSize || '1 Share',
        totalAmount: formattedTotal,
        paidAmount: formattedPaid,
        dueAmount: formattedDue,
        status: formData.status,
        address: formData.address
      } : item));
      showToast('Buyer / Stakeholder details updated successfully!');
    } else {
      // Create
      const newItem: BuyerStakeholderItem = {
        id: 'bs_' + Date.now(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email || 'N/A',
        nid: formData.nid || 'N/A',
        type: formData.type,
        projectName: formData.projectName,
        unitOrPlotNo: formData.unitOrPlotNo || 'Unit-101',
        sharesOrSize: formData.sharesOrSize || '1 Share',
        totalAmount: formattedTotal,
        paidAmount: formattedPaid,
        dueAmount: formattedDue,
        joiningDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: formData.status,
        address: formData.address || 'N/A'
      };

      setItems([newItem, ...items]);
      showToast('New Buyer / Stakeholder added successfully!');
    }

    setIsAddModalOpen(false);
    setEditingItem(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      nid: '',
      type: 'Unit Buyer',
      projectName: 'Purbachal Green Valley Project',
      unitOrPlotNo: '',
      sharesOrSize: '',
      totalAmount: '',
      paidAmount: '',
      status: 'Confirmed',
      address: ''
    });
  };

  const openEditModal = (item: BuyerStakeholderItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      phone: item.phone,
      email: item.email || '',
      nid: item.nid || '',
      type: item.type,
      projectName: item.projectName,
      unitOrPlotNo: item.unitOrPlotNo,
      sharesOrSize: item.sharesOrSize,
      totalAmount: item.totalAmount,
      paidAmount: item.paidAmount,
      status: item.status,
      address: item.address || ''
    });
    setIsAddModalOpen(true);
  };

  // Filter Logic
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.unitOrPlotNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.nid && item.nid.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    const matchesProject = selectedProject === 'All' || item.projectName === selectedProject;

    return matchesSearch && matchesType && matchesStatus && matchesProject;
  });

  // KPI Calculations
  const totalStakeholdersCount = items.length;
  const unitBuyersCount = items.filter(i => i.type === 'Unit Buyer').length;
  const shareholdersCount = items.filter(i => i.type === 'Project Shareholder' || i.type === 'Investor' || i.type === 'Joint Venture Partner').length;
  const confirmedCount = items.filter(i => i.status === 'Confirmed').length;
  const pendingCount = items.filter(i => i.status !== 'Confirmed').length;
  
  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + pageSize);

  // Checkbox Selection
  const isAllOnPageSelected = paginatedItems.length > 0 && paginatedItems.every(p => selectedIds.includes(p.id));

  const toggleSelectAllPage = () => {
    if (isAllOnPageSelected) {
      const pageIds = paginatedItems.map(p => p.id);
      setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
    } else {
      const pageIds = paginatedItems.map(p => p.id);
      setSelectedIds(prev => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Bulk Actions
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedIds.length} selected stakeholder(s)?`)) {
      setItems(prev => prev.filter(p => !selectedIds.includes(p.id)));
      showToast(`${selectedIds.length} item(s) deleted.`);
      setSelectedIds([]);
    }
  };

  const handleBulkStatusChange = (status: BuyerStakeholderItem['status']) => {
    if (selectedIds.length === 0) return;
    setItems(prev => prev.map(p => selectedIds.includes(p.id) ? { ...p, status } : p));
    showToast(`Status updated to "${status}" for ${selectedIds.length} item(s).`);
    setSelectedIds([]);
  };

  // Export CSV & Print
  const handleExportCSV = (exportSelectedOnly = false) => {
    const itemsToExport = exportSelectedOnly 
      ? items.filter(p => selectedIds.includes(p.id))
      : filteredItems;

    if (itemsToExport.length === 0) {
      alert('No data available to export.');
      return;
    }

    const headers = ['Full Name', 'Phone', 'Email', 'NID', 'Stakeholder Type', 'Project Name', 'Unit / Plot', 'Shares / Size', 'Total Amount', 'Paid Amount', 'Due Amount', 'Joining Date', 'Status'];
    const rows = itemsToExport.map(p => [
      `"${p.name}"`,
      `"${p.phone}"`,
      `"${p.email || ''}"`,
      `"${p.nid || ''}"`,
      `"${p.type}"`,
      `"${p.projectName}"`,
      `"${p.unitOrPlotNo}"`,
      `"${p.sharesOrSize}"`,
      `"${p.totalAmount}"`,
      `"${p.paidAmount}"`,
      `"${p.dueAmount}"`,
      `"${p.joiningDate}"`,
      `"${p.status}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', exportSelectedOnly ? 'selected_stakeholders.csv' : 'all_buyers_and_stakeholders.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${itemsToExport.length} stakeholder record(s) to CSV!`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 font-sans pb-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* KPI Cards Grid (Matching Reference Image Design) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Buyers Overview (Green Theme) */}
        <div className="bg-white rounded-2xl p-3.5 border border-emerald-200/90 shadow-2xs relative overflow-hidden transition-all hover:border-emerald-300 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2.5 relative z-10">
            <div className="p-1.5 rounded-lg bg-emerald-100/80 text-emerald-700 shrink-0">
              <Building2 size={16} />
            </div>
            <span className="font-extrabold text-gray-900 text-xs tracking-tight">Buyers Overview</span>
          </div>
          <div className="grid grid-cols-2 gap-2 relative z-10">
            <div className="bg-emerald-50/40 border border-emerald-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-emerald-800 uppercase">TOTAL</span>
              <span className="text-xl font-black text-gray-900 mt-1">{totalStakeholdersCount}</span>
            </div>
            <div className="bg-emerald-50/40 border border-emerald-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-emerald-800 uppercase">ACTIVE</span>
              <span className="text-xl font-black text-gray-900 mt-1">{confirmedCount}</span>
            </div>
          </div>
          <Building2 className="absolute -right-3 -bottom-3 text-emerald-500/15 w-24 h-24 pointer-events-none z-0" />
        </div>

        {/* Card 2: Buyer Categories (Blue Theme) */}
        <div className="bg-white rounded-2xl p-3.5 border border-blue-200/90 shadow-2xs relative overflow-hidden transition-all hover:border-blue-300 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2.5 relative z-10">
            <div className="p-1.5 rounded-lg bg-blue-100/80 text-blue-700 shrink-0">
              <Users size={16} />
            </div>
            <span className="font-extrabold text-gray-900 text-xs tracking-tight">Buyer Categories</span>
          </div>
          <div className="grid grid-cols-2 gap-2 relative z-10">
            <div className="bg-blue-50/40 border border-blue-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-blue-800 uppercase">UNIT BUYERS</span>
              <span className="text-xl font-black text-gray-900 mt-1">{unitBuyersCount}</span>
            </div>
            <div className="bg-blue-50/40 border border-blue-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-blue-800 uppercase">SHAREHOLDERS</span>
              <span className="text-xl font-black text-gray-900 mt-1">{shareholdersCount}</span>
            </div>
          </div>
          <Users className="absolute -right-3 -bottom-3 text-blue-500/15 w-24 h-24 pointer-events-none z-0" />
        </div>

        {/* Card 3: Sales & Bookings (Purple Theme) */}
        <div className="bg-white rounded-2xl p-3.5 border border-purple-200/90 shadow-2xs relative overflow-hidden transition-all hover:border-purple-300 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2.5 relative z-10">
            <div className="p-1.5 rounded-lg bg-purple-100/80 text-purple-700 shrink-0">
              <Tag size={16} />
            </div>
            <span className="font-extrabold text-gray-900 text-xs tracking-tight">Sales & Bookings</span>
          </div>
          <div className="grid grid-cols-2 gap-2 relative z-10">
            <div className="bg-purple-50/40 border border-purple-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-purple-800 uppercase">BOOKED</span>
              <span className="text-xl font-black text-gray-900 mt-1">{confirmedCount}</span>
            </div>
            <div className="bg-purple-50/40 border border-purple-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-purple-800 uppercase">PENDING</span>
              <span className="text-xl font-black text-gray-900 mt-1">{pendingCount}</span>
            </div>
          </div>
          <Tag className="absolute -right-3 -bottom-3 text-purple-500/15 w-24 h-24 pointer-events-none z-0" />
        </div>

        {/* Card 4: Portfolio Valuation (Amber Theme) */}
        <div className="bg-white rounded-2xl p-3.5 border border-amber-200/90 shadow-2xs relative overflow-hidden transition-all hover:border-amber-300 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2.5 relative z-10">
            <div className="p-1.5 rounded-lg bg-amber-100/80 text-amber-700 shrink-0">
              <Wallet size={16} />
            </div>
            <span className="font-extrabold text-gray-900 text-xs tracking-tight">Portfolio Valuation</span>
          </div>
          <div className="grid grid-cols-2 gap-2 relative z-10">
            <div className="bg-amber-50/40 border border-amber-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-amber-800 uppercase">EST. VALUE</span>
              <span className="text-base font-black text-gray-900 mt-1 font-mono">৳ 10.55B</span>
            </div>
            <div className="bg-amber-50/40 border border-amber-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-amber-800 uppercase">COLLECTED</span>
              <span className="text-base font-black text-gray-900 mt-1 font-mono">৳ 7.05B</span>
            </div>
          </div>
          <Wallet className="absolute -right-3 -bottom-3 text-amber-500/15 w-24 h-24 pointer-events-none z-0" />
        </div>
      </div>

      {/* Bulk Action Bar (When items selected) */}
      {selectedIds.length > 0 && (
        <div className="bg-amber-900 text-white rounded-2xl p-3.5 px-5 shadow-lg border border-amber-800 flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <span className="bg-amber-700 text-amber-100 text-xs px-2.5 py-1 rounded-lg font-extrabold font-mono">
              {selectedIds.length} Selected
            </span>
            <span className="text-xs text-amber-200 font-medium hidden sm:inline">Bulk actions on selected stakeholders:</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleExportCSV(true)}
              className="px-3 py-1.5 bg-amber-800 hover:bg-amber-700 text-amber-100 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download size={14} />
              <span>Export Selected</span>
            </button>

            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleBulkStatusChange(e.target.value as any);
                  e.target.value = '';
                }
              }}
              className="bg-amber-800 hover:bg-amber-700 text-amber-100 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-700 focus:outline-none cursor-pointer"
            >
              <option value="">Change Status...</option>
              <option value="Confirmed">Mark Confirmed</option>
              <option value="Token Paid">Mark Token Paid</option>
              <option value="Pending Verification">Mark Pending</option>
            </select>

            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </button>

            <button
              onClick={() => setSelectedIds([])}
              className="px-2.5 py-1.5 text-xs text-amber-300 hover:text-white font-bold ml-1 cursor-pointer"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Filter Section (Structure Required by User) */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search name, phone, plot/unit, NID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-medium"
          />
        </div>

        {/* Filter Dropdowns & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Stakeholder Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs font-bold bg-gray-100/80 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="Unit Buyer">Unit Buyer</option>
            <option value="Project Shareholder">Project Shareholder</option>
            <option value="Joint Venture Partner">Joint Venture Partner</option>
            <option value="Investor">Investor</option>
          </select>

          {/* Project Filter */}
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="text-xs font-bold bg-gray-100/80 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700 focus:outline-none focus:border-amber-500 cursor-pointer max-w-[160px] truncate"
          >
            <option value="All">All Projects</option>
            <option value="Purbachal Green Valley Project">Purbachal Green Valley</option>
            <option value="Promise Heights Commercial">Promise Heights Commercial</option>
            <option value="Modhumoti Model Town">Modhumoti Model Town</option>
            <option value="Uttara Model Town Phase 3">Uttara Model Town</option>
            <option value="Mirpur Lake City Tower">Mirpur Lake City Tower</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs font-bold bg-gray-100/80 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Token Paid">Token Paid</option>
            <option value="Pending Verification">Pending Verification</option>
          </select>

          <div className="h-5 w-px bg-gray-200 mx-1 hidden sm:block" />

          {/* Export CSV Button */}
          <button
            onClick={() => handleExportCSV(false)}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            title="Export Table to CSV File"
          >
            <Download size={14} className="text-emerald-600" />
            <span>Export CSV</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            title="Print Stakeholders Table"
          >
            <Printer size={14} className="text-blue-600" />
            <span>Print</span>
          </button>

          {/* Add New CTA Button */}
          <button
            onClick={() => {
              setEditingItem(null);
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <UserPlus size={15} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* Main Table Container (Structure Required by User) */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 font-extrabold uppercase tracking-wider text-[10px] border-b border-gray-200">
                <th className="py-3 px-3 text-center w-10">
                  <input
                    type="checkbox"
                    checked={isAllOnPageSelected}
                    onChange={toggleSelectAllPage}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                    title="Select/Deselect All on Current Page"
                  />
                </th>
                <th className="py-3 px-4">STAKEHOLDER NAME & CONTACT</th>
                <th className="py-3 px-4">TYPE</th>
                <th className="py-3 px-4">PROJECT & UNIT / PLOT</th>
                <th className="py-3 px-4 text-center">SHARES / SIZE</th>
                <th className="py-3 px-4">TOTAL DEAL VALUE</th>
                <th className="py-3 px-4">PAID AMOUNT</th>
                <th className="py-3 px-4">DUE BALANCE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {paginatedItems.length > 0 ? (
                paginatedItems.map((p) => {
                  const isSelected = selectedIds.includes(p.id);
                  return (
                    <tr key={p.id} className={`transition-colors ${isSelected ? 'bg-amber-50/50' : 'hover:bg-amber-50/20'}`}>
                      <td className="py-3.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(p.id)}
                          className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                        />
                      </td>

                      <td className="py-3.5 px-4 min-w-[200px]">
                        <div>
                          <p className="font-extrabold text-gray-900 leading-snug">{p.name}</p>
                          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium mt-0.5">
                            <span className="flex items-center gap-1 font-mono">
                              <Phone size={11} className="text-gray-400" />
                              {p.phone}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          p.type === 'Unit Buyer' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                          p.type === 'Project Shareholder' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                          p.type === 'Joint Venture Partner' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {p.type}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 min-w-[170px]">
                        <p className="font-bold text-gray-800 truncate">{p.projectName}</p>
                        <p className="text-[10px] font-bold text-amber-700 flex items-center gap-1 mt-0.5">
                          <Tag size={10} />
                          <span>{p.unitOrPlotNo}</span>
                        </p>
                      </td>

                      <td className="py-3.5 px-4 text-center font-extrabold text-gray-700 whitespace-nowrap">
                        {p.sharesOrSize}
                      </td>

                      <td className="py-3.5 px-4 font-extrabold text-gray-900 font-mono whitespace-nowrap">
                        {p.totalAmount}
                      </td>

                      <td className="py-3.5 px-4 font-extrabold text-emerald-700 font-mono whitespace-nowrap">
                        {p.paidAmount}
                      </td>

                      <td className="py-3.5 px-4 font-bold text-red-600 font-mono whitespace-nowrap">
                        {p.dueAmount}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                          p.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                          p.status === 'Token Paid' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                          'bg-gray-100 text-gray-700 border border-gray-300'
                        }`}>
                          {p.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="relative inline-block text-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdownId(activeDropdownId === p.id ? null : p.id);
                            }}
                            className="bg-[#00c875] hover:bg-[#00b368] text-white px-3 py-1.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-md active:scale-95 cursor-pointer mx-auto min-w-[85px]"
                          >
                            <span>Action</span>
                            <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdownId === p.id ? 'rotate-180' : ''}`} />
                          </button>

                          {activeDropdownId === p.id && (
                            <>
                              <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setActiveDropdownId(null)} 
                              />
                              
                              <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-20 text-left animate-in fade-in zoom-in-95 duration-100">
                                <button
                                  onClick={() => {
                                    setActiveDropdownId(null);
                                    setSelectedItemForDetails(p);
                                  }}
                                  className="w-full text-left px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-amber-50 hover:text-amber-900 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Eye size={14} className="text-amber-600" />
                                  <span>View Profile</span>
                                </button>

                                <button
                                  onClick={() => {
                                    setActiveDropdownId(null);
                                    openEditModal(p);
                                  }}
                                  className="w-full text-left px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-900 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Edit size={14} className="text-blue-600" />
                                  <span>Edit Info</span>
                                </button>

                                <div className="my-1 border-t border-gray-100" />

                                <button
                                  onClick={() => {
                                    setActiveDropdownId(null);
                                    if (confirm(`Remove ${p.name} from stakeholders database?`)) {
                                      setItems(prev => prev.filter(i => i.id !== p.id));
                                      showToast('Stakeholder removed successfully.');
                                    }
                                  }}
                                  className="w-full text-left px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Trash2 size={14} />
                                  <span>Delete Record</span>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-gray-400 font-semibold">
                    No buyers or stakeholders match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Bar */}
        <div className="bg-gray-50 border-t border-gray-200/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 text-gray-600 font-semibold">
            <span>
              Showing <span className="font-black text-gray-900">{filteredItems.length === 0 ? 0 : startIndex + 1}</span> to{' '}
              <span className="font-black text-gray-900">{Math.min(startIndex + pageSize, filteredItems.length)}</span> of{' '}
              <span className="font-black text-gray-900">{filteredItems.length}</span> entries
            </span>

            <div className="flex items-center gap-1.5 ml-2">
              <span className="text-[11px] text-gray-400">Rows:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={safeCurrentPage === 1}
              className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold px-2.5"
            >
              <ChevronLeft size={14} />
              <span>Prev</span>
            </button>

            <div className="flex items-center gap-1 px-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`min-w-[28px] h-7 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    safeCurrentPage === pageNum
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={safeCurrentPage === totalPages || filteredItems.length === 0}
              className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold px-2.5"
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal 1: Add / Edit Buyer & Stakeholder Form (CTA Click Response) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="text-amber-600" size={20} />
                <h3 className="font-extrabold text-gray-900 text-base">
                  {editingItem ? 'Edit Buyer' : 'Add New Buyer'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingItem(null);
                }}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Engr. Shahadat Hossain"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-bold text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +880 1711-000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">NID / Passport No</label>
                  <input
                    type="text"
                    placeholder="e.g. 198426918239102"
                    value={formData.nid}
                    onChange={(e) => setFormData({ ...formData, nid: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. buyer@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Stakeholder Category *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-bold bg-gray-50"
                  >
                    <option value="Unit Buyer">Unit Buyer (Flat/Plot)</option>
                    <option value="Project Shareholder">Project Shareholder</option>
                    <option value="Joint Venture Partner">Joint Venture Partner</option>
                    <option value="Investor">Investor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Assigned Project *</label>
                <select
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-bold bg-gray-50"
                >
                  <option value="Purbachal Green Valley Project">Purbachal Green Valley Project</option>
                  <option value="Promise Heights Commercial">Promise Heights Commercial</option>
                  <option value="Modhumoti Model Town">Modhumoti Model Town</option>
                  <option value="Uttara Model Town Phase 3">Uttara Model Town Phase 3</option>
                  <option value="Mirpur Lake City Tower">Mirpur Lake City Tower</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Unit / Plot / Share No</label>
                  <input
                    type="text"
                    placeholder="e.g. Flat 4B or Plot A-102"
                    value={formData.unitOrPlotNo}
                    onChange={(e) => setFormData({ ...formData, unitOrPlotNo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Shares Count / Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 1,850 SQFT or 5 Katha"
                    value={formData.sharesOrSize}
                    onChange={(e) => setFormData({ ...formData, sharesOrSize: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Total Deal Value (৳)</label>
                  <input
                    type="text"
                    placeholder="e.g. 1,20,00,000"
                    value={formData.totalAmount}
                    onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Booking / Paid Amount (৳)</label>
                  <input
                    type="text"
                    placeholder="e.g. 35,00,000"
                    value={formData.paidAmount}
                    onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-bold bg-gray-50"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Token Paid">Token Paid</option>
                  <option value="Pending Verification">Pending Verification</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Mailing Address / Remarks</label>
                <textarea
                  rows={2}
                  placeholder="e.g. House 42, Road 11, Banani, Dhaka"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-extrabold shadow-sm cursor-pointer"
                >
                  {editingItem ? 'Save Changes' : 'Register Stakeholder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: View Stakeholder Details Profile */}
      {selectedItemForDetails && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl">
                  <Users size={22} />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-base">{selectedItemForDetails.name}</h3>
                  <p className="text-xs text-gray-500 font-medium">ID: #{selectedItemForDetails.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedItemForDetails(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs font-medium">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-200/80">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Stakeholder Category</p>
                  <p className="font-bold text-amber-800 mt-0.5">{selectedItemForDetails.type}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Booking Status</p>
                  <p className="font-bold text-emerald-700 mt-0.5">{selectedItemForDetails.status}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone size={14} className="text-amber-600 shrink-0" />
                  <span className="font-mono font-bold">{selectedItemForDetails.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail size={14} className="text-amber-600 shrink-0" />
                  <span>{selectedItemForDetails.email || 'No email registered'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FileText size={14} className="text-amber-600 shrink-0" />
                  <span className="font-mono">NID: {selectedItemForDetails.nid || 'N/A'}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-700">
                  <MapPin size={14} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>{selectedItemForDetails.address || 'Dhaka, Bangladesh'}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-2">
                <p className="font-extrabold text-gray-900 text-xs">Investment & Asset Details</p>
                <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200/80 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assigned Project:</span>
                    <span className="font-bold text-gray-900">{selectedItemForDetails.projectName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unit / Plot No:</span>
                    <span className="font-extrabold text-amber-800">{selectedItemForDetails.unitOrPlotNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size / Shares:</span>
                    <span className="font-semibold text-gray-800">{selectedItemForDetails.sharesOrSize}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-2">
                <p className="font-extrabold text-gray-900 text-xs">Financial Overview</p>
                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-2.5 bg-gray-100 rounded-xl border border-gray-200">
                    <p className="text-[10px] text-gray-500 font-sans font-bold">Total Deal</p>
                    <p className="font-bold text-gray-900 text-xs mt-0.5">{selectedItemForDetails.totalAmount}</p>
                  </div>
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                    <p className="text-[10px] text-emerald-700 font-sans font-bold">Collected</p>
                    <p className="font-bold text-emerald-800 text-xs mt-0.5">{selectedItemForDetails.paidAmount}</p>
                  </div>
                  <div className="p-2.5 bg-red-50 rounded-xl border border-red-200">
                    <p className="text-[10px] text-red-600 font-sans font-bold">Outstanding</p>
                    <p className="font-bold text-red-700 text-xs mt-0.5">{selectedItemForDetails.dueAmount}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setSelectedItemForDetails(null)}
                className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
