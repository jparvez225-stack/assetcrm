import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Plus, 
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
  Tag, 
  Layers, 
  Compass, 
  DollarSign, 
  User, 
  Calendar, 
  CheckSquare, 
  TrendingUp,
  SlidersHorizontal,
  Bookmark,
  Wallet
} from 'lucide-react';
import { FlatPlotStockItem } from '../types';

export const InventoryFlatsPlotStockView: React.FC = () => {
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<string>('All');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItemForDetails, setSelectedItemForDetails] = useState<FlatPlotStockItem | null>(null);
  const [editingItem, setEditingItem] = useState<FlatPlotStockItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    unitPlotNo: '',
    projectName: 'Purbachal Green Valley Project',
    type: 'Flat' as FlatPlotStockItem['type'],
    size: '',
    floorOrBlock: '',
    facing: 'South-East Facing',
    price: '',
    status: 'Vacant' as FlatPlotStockItem['status'],
    buyerName: '',
    bookingDate: '',
    remarks: ''
  });

  // Initial Mock Flat & Plot Stock Data
  const [items, setItems] = useState<FlatPlotStockItem[]>([
    {
      id: 'fps_1',
      unitPlotNo: 'Plot A-102',
      projectName: 'Purbachal Green Valley Project',
      type: 'Plot',
      size: '5 Katha',
      floorOrBlock: 'Block A',
      facing: 'Corner Road Facing (South-East)',
      price: '৳ 1,20,00,000',
      status: 'Vacant',
      remarks: 'Prime location near 300ft highway avenue'
    },
    {
      id: 'fps_2',
      unitPlotNo: 'Flat 4B',
      projectName: 'Promise Heights Commercial',
      type: 'Flat',
      size: '1,850 SQFT',
      floorOrBlock: '4th Floor',
      facing: 'North-East Facing',
      price: '৳ 1,45,00,000',
      status: 'Booked',
      buyerName: 'Mrs. Rafia Begum',
      bookingDate: '20 Mar, 2025',
      remarks: 'Token amount ৳ 10 Lac received'
    },
    {
      id: 'fps_3',
      unitPlotNo: 'Plot B-205',
      projectName: 'Purbachal Green Valley Project',
      type: 'Plot',
      size: '3 Katha',
      floorOrBlock: 'Block B',
      facing: 'South Facing (Lake View)',
      price: '৳ 75,00,000',
      status: 'Sold',
      buyerName: 'Engr. Shahadat Hossain',
      bookingDate: '12 Jan, 2025',
      remarks: 'Full payment registered with land deed'
    },
    {
      id: 'fps_4',
      unitPlotNo: 'Shop 101',
      projectName: 'Promise Heights Commercial',
      type: 'Commercial Space',
      size: '650 SQFT',
      floorOrBlock: 'Ground Floor',
      facing: 'Main Road Frontage',
      price: '৳ 2,10,00,000',
      status: 'Vacant',
      remarks: 'High footfall retail commercial space'
    },
    {
      id: 'fps_5',
      unitPlotNo: 'Flat 7A',
      projectName: 'Mirpur Lake City Tower',
      type: 'Flat',
      size: '1,650 SQFT',
      floorOrBlock: '7th Floor',
      facing: 'West Facing (Lake View)',
      price: '৳ 1,15,00,000',
      status: 'Booked',
      buyerName: 'Kamrul Hassan Choudhury',
      bookingDate: '18 May, 2025',
      remarks: 'Installment plan activated'
    },
    {
      id: 'fps_6',
      unitPlotNo: 'Plot C-301',
      projectName: 'Modhumoti Model Town',
      type: 'Plot',
      size: '10 Katha',
      floorOrBlock: 'Block C',
      facing: 'Double Side Road Facing',
      price: '৳ 2,80,00,000',
      status: 'Hold',
      remarks: 'Reserved for VIP allotment review'
    },
    {
      id: 'fps_7',
      unitPlotNo: 'Flat 5C',
      projectName: 'Uttara Model Town Phase 3',
      type: 'Flat',
      size: '2,100 SQFT',
      floorOrBlock: '5th Floor',
      facing: 'South Facing',
      price: '৳ 1,85,00,000',
      status: 'Vacant',
      remarks: '3 Bed, 4 Bath, Penthouse style finishing'
    }
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, selectedStatus, selectedProject]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle Form Submit (Add or Edit)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.unitPlotNo.trim()) {
      alert('Please enter Unit / Plot Number.');
      return;
    }

    const formattedPrice = formData.price.startsWith('৳') ? formData.price : `৳ ${formData.price || '0'}`;

    if (editingItem) {
      // Update
      setItems(prev => prev.map(item => item.id === editingItem.id ? {
        ...item,
        unitPlotNo: formData.unitPlotNo,
        projectName: formData.projectName,
        type: formData.type,
        size: formData.size || (formData.type === 'Plot' ? '5 Katha' : '1,800 SQFT'),
        floorOrBlock: formData.floorOrBlock || 'Main Block',
        facing: formData.facing,
        price: formattedPrice,
        status: formData.status,
        buyerName: formData.buyerName || undefined,
        bookingDate: formData.bookingDate || undefined,
        remarks: formData.remarks || ''
      } : item));
      showToast('Flat / Plot stock item updated successfully!');
    } else {
      // Add
      const newItem: FlatPlotStockItem = {
        id: 'fps_' + Date.now(),
        unitPlotNo: formData.unitPlotNo,
        projectName: formData.projectName,
        type: formData.type,
        size: formData.size || (formData.type === 'Plot' ? '5 Katha' : '1,800 SQFT'),
        floorOrBlock: formData.floorOrBlock || 'Main Block',
        facing: formData.facing,
        price: formattedPrice,
        status: formData.status,
        buyerName: formData.buyerName || undefined,
        bookingDate: formData.bookingDate || (formData.status !== 'Vacant' ? new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : undefined),
        remarks: formData.remarks || ''
      };

      setItems([newItem, ...items]);
      showToast(`Stock item "${formData.unitPlotNo}" added successfully!`);
    }

    setIsAddModalOpen(false);
    setEditingItem(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      unitPlotNo: '',
      projectName: 'Purbachal Green Valley Project',
      type: 'Flat',
      size: '',
      floorOrBlock: '',
      facing: 'South-East Facing',
      price: '',
      status: 'Vacant',
      buyerName: '',
      bookingDate: '',
      remarks: ''
    });
  };

  const openEditModal = (item: FlatPlotStockItem) => {
    setEditingItem(item);
    setFormData({
      unitPlotNo: item.unitPlotNo,
      projectName: item.projectName,
      type: item.type,
      size: item.size,
      floorOrBlock: item.floorOrBlock,
      facing: item.facing,
      price: item.price,
      status: item.status,
      buyerName: item.buyerName || '',
      bookingDate: item.bookingDate || '',
      remarks: item.remarks || ''
    });
    setIsAddModalOpen(true);
  };

  // Filter Logic
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.unitPlotNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.size.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.buyerName && item.buyerName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    const matchesProject = selectedProject === 'All' || item.projectName === selectedProject;

    return matchesSearch && matchesType && matchesStatus && matchesProject;
  });

  // KPI Calculations
  const totalStockCount = items.length;
  const vacantCount = items.filter(i => i.status === 'Vacant').length;
  const bookedCount = items.filter(i => i.status === 'Booked').length;
  const soldCount = items.filter(i => i.status === 'Sold').length;
  const totalProjectsCount = new Set(items.map(i => i.projectName)).size;

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
    if (confirm(`Are you sure you want to delete ${selectedIds.length} selected stock item(s)?`)) {
      setItems(prev => prev.filter(p => !selectedIds.includes(p.id)));
      showToast(`${selectedIds.length} stock item(s) deleted.`);
      setSelectedIds([]);
    }
  };

  const handleBulkStatusChange = (status: FlatPlotStockItem['status']) => {
    if (selectedIds.length === 0) return;
    setItems(prev => prev.map(p => selectedIds.includes(p.id) ? { ...p, status } : p));
    showToast(`Status changed to "${status}" for ${selectedIds.length} item(s).`);
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

    const headers = ['Unit/Plot No', 'Project Name', 'Type', 'Size', 'Floor/Block', 'Facing', 'Price', 'Status', 'Buyer Name', 'Booking Date', 'Remarks'];
    const rows = itemsToExport.map(p => [
      `"${p.unitPlotNo}"`,
      `"${p.projectName}"`,
      `"${p.type}"`,
      `"${p.size}"`,
      `"${p.floorOrBlock}"`,
      `"${p.facing}"`,
      `"${p.price}"`,
      `"${p.status}"`,
      `"${p.buyerName || 'N/A'}"`,
      `"${p.bookingDate || 'N/A'}"`,
      `"${p.remarks || ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', exportSelectedOnly ? 'selected_stock.csv' : 'flats_plot_stock.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${itemsToExport.length} stock item(s) to CSV!`);
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
        {/* Card 1: Projects Overview (Green Theme) */}
        <div className="bg-white rounded-2xl p-3.5 border border-emerald-200/90 shadow-2xs relative overflow-hidden transition-all hover:border-emerald-300 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2.5 relative z-10">
            <div className="p-1.5 rounded-lg bg-emerald-100/80 text-emerald-700 shrink-0">
              <Building2 size={16} />
            </div>
            <span className="font-extrabold text-gray-900 text-xs tracking-tight">Projects Overview</span>
          </div>
          <div className="grid grid-cols-2 gap-2 relative z-10">
            <div className="bg-emerald-50/40 border border-emerald-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-emerald-800 uppercase">TOTAL</span>
              <span className="text-xl font-black text-gray-900 mt-1">{totalProjectsCount || 6}</span>
            </div>
            <div className="bg-emerald-50/40 border border-emerald-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-emerald-800 uppercase">ONGOING</span>
              <span className="text-xl font-black text-gray-900 mt-1">{Math.max(1, totalProjectsCount - 1) || 4}</span>
            </div>
          </div>
          <Building2 className="absolute -right-3 -bottom-3 text-emerald-500/15 w-24 h-24 pointer-events-none z-0" />
        </div>

        {/* Card 2: Stock Availability (Blue Theme) */}
        <div className="bg-white rounded-2xl p-3.5 border border-blue-200/90 shadow-2xs relative overflow-hidden transition-all hover:border-blue-300 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2.5 relative z-10">
            <div className="p-1.5 rounded-lg bg-blue-100/80 text-blue-700 shrink-0">
              <Home size={16} />
            </div>
            <span className="font-extrabold text-gray-900 text-xs tracking-tight">Stock Availability</span>
          </div>
          <div className="grid grid-cols-2 gap-2 relative z-10">
            <div className="bg-blue-50/40 border border-blue-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-blue-800 uppercase">TOTAL UNITS</span>
              <span className="text-xl font-black text-gray-900 mt-1">{totalStockCount}</span>
            </div>
            <div className="bg-blue-50/40 border border-blue-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-blue-800 uppercase">VACANT</span>
              <span className="text-xl font-black text-gray-900 mt-1">{vacantCount}</span>
            </div>
          </div>
          <Home className="absolute -right-3 -bottom-3 text-blue-500/15 w-24 h-24 pointer-events-none z-0" />
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
              <span className="text-xl font-black text-gray-900 mt-1">{bookedCount}</span>
            </div>
            <div className="bg-purple-50/40 border border-purple-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-purple-800 uppercase">SOLD</span>
              <span className="text-xl font-black text-gray-900 mt-1">{soldCount}</span>
            </div>
          </div>
          <Tag className="absolute -right-3 -bottom-3 text-purple-500/15 w-24 h-24 pointer-events-none z-0" />
        </div>

        {/* Card 4: Project Valuation (Amber Theme) */}
        <div className="bg-white rounded-2xl p-3.5 border border-amber-200/90 shadow-2xs relative overflow-hidden transition-all hover:border-amber-300 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2.5 relative z-10">
            <div className="p-1.5 rounded-lg bg-amber-100/80 text-amber-700 shrink-0">
              <Wallet size={16} />
            </div>
            <span className="font-extrabold text-gray-900 text-xs tracking-tight">Project Valuation</span>
          </div>
          <div className="grid grid-cols-2 gap-2 relative z-10">
            <div className="bg-amber-50/40 border border-amber-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-amber-800 uppercase">EST. VALUE</span>
              <span className="text-base font-black text-gray-900 mt-1 font-mono">৳ 3.88B</span>
            </div>
            <div className="bg-amber-50/40 border border-amber-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-amber-800 uppercase">BRANCHES</span>
              <span className="text-base font-black text-gray-900 mt-1">3 Active</span>
            </div>
          </div>
          <Wallet className="absolute -right-3 -bottom-3 text-amber-500/15 w-24 h-24 pointer-events-none z-0" />
        </div>
      </div>

      {/* Bulk Action Bar (When items selected) */}
      {selectedIds.length > 0 && (
        <div className="bg-emerald-950 text-white rounded-2xl p-3.5 px-5 shadow-lg border border-emerald-800 flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-800 text-emerald-100 text-xs px-2.5 py-1 rounded-lg font-extrabold font-mono">
              {selectedIds.length} Selected
            </span>
            <span className="text-xs text-emerald-200 font-medium hidden sm:inline">Bulk stock management operations:</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleExportCSV(true)}
              className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
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
              className="bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-700 focus:outline-none cursor-pointer"
            >
              <option value="">Change Status...</option>
              <option value="Vacant">Set Vacant</option>
              <option value="Booked">Set Booked</option>
              <option value="Sold">Set Sold</option>
              <option value="Hold">Set Hold</option>
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
              className="px-2.5 py-1.5 text-xs text-emerald-300 hover:text-white font-bold ml-1 cursor-pointer"
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
            placeholder="Search unit/plot, project, buyer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 font-medium"
          />
        </div>

        {/* Filter Dropdowns & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Stock Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs font-bold bg-gray-100/80 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="Flat">Flat</option>
            <option value="Plot">Plot</option>
            <option value="Commercial Space">Commercial Space</option>
          </select>

          {/* Project Filter */}
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="text-xs font-bold bg-gray-100/80 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700 focus:outline-none focus:border-emerald-500 cursor-pointer max-w-[160px] truncate"
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
            className="text-xs font-bold bg-gray-100/80 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Vacant">Vacant</option>
            <option value="Booked">Booked</option>
            <option value="Sold">Sold</option>
            <option value="Hold">Hold</option>
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
            title="Print Stock Table"
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
            <Plus size={15} />
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
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    title="Select/Deselect All on Current Page"
                  />
                </th>
                <th className="py-3 px-4">UNIT / PLOT NO</th>
                <th className="py-3 px-4">PROJECT NAME</th>
                <th className="py-3 px-4">TYPE</th>
                <th className="py-3 px-4">SIZE & FLOOR / BLOCK</th>
                <th className="py-3 px-4">FACING</th>
                <th className="py-3 px-4">PRICE / VALUE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">BUYER / ALLOTMENT</th>
                <th className="py-3 px-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {paginatedItems.length > 0 ? (
                paginatedItems.map((p) => {
                  const isSelected = selectedIds.includes(p.id);
                  return (
                    <tr key={p.id} className={`transition-colors ${isSelected ? 'bg-emerald-50/50' : 'hover:bg-emerald-50/20'}`}>
                      <td className="py-3.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(p.id)}
                          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                      </td>

                      <td className="py-3.5 px-4 font-black text-gray-900 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Tag size={13} className="text-emerald-600 shrink-0" />
                          <span>{p.unitPlotNo}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 min-w-[170px]">
                        <p className="font-bold text-gray-800">{p.projectName}</p>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          p.type === 'Flat' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          p.type === 'Plot' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                          'bg-purple-50 text-purple-800 border-purple-200'
                        }`}>
                          {p.type}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <p className="font-extrabold text-gray-900">{p.size}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{p.floorOrBlock}</p>
                      </td>

                      <td className="py-3.5 px-4 text-gray-600 text-[11px] min-w-[150px]">
                        {p.facing}
                      </td>

                      <td className="py-3.5 px-4 font-black text-gray-900 font-mono whitespace-nowrap">
                        {p.price}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                          p.status === 'Vacant' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                          p.status === 'Booked' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                          p.status === 'Sold' ? 'bg-indigo-100 text-indigo-800 border border-indigo-300' :
                          'bg-gray-100 text-gray-700 border border-gray-300'
                        }`}>
                          {p.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 min-w-[150px]">
                        {p.buyerName ? (
                          <div>
                            <p className="font-extrabold text-gray-900">{p.buyerName}</p>
                            {p.bookingDate && (
                              <p className="text-[10px] text-amber-700 font-semibold font-mono">{p.bookingDate}</p>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-[11px] font-medium">— Unassigned</span>
                        )}
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
                                  className="w-full text-left px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-emerald-50 hover:text-emerald-900 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Eye size={14} className="text-emerald-600" />
                                  <span>View Details</span>
                                </button>

                                <button
                                  onClick={() => {
                                    setActiveDropdownId(null);
                                    openEditModal(p);
                                  }}
                                  className="w-full text-left px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-900 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Edit size={14} className="text-blue-600" />
                                  <span>Edit Stock</span>
                                </button>

                                <div className="my-1 border-t border-gray-100" />

                                <button
                                  onClick={() => {
                                    setActiveDropdownId(null);
                                    if (confirm(`Remove "${p.unitPlotNo}" from stock inventory?`)) {
                                      setItems(prev => prev.filter(i => i.id !== p.id));
                                      showToast('Stock item deleted successfully.');
                                    }
                                  }}
                                  className="w-full text-left px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Trash2 size={14} />
                                  <span>Delete Stock</span>
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
                    No flats or plot stock match your criteria.
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
                <option value={6}>6</option>
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
                      ? 'bg-emerald-600 text-white shadow-2xs'
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

      {/* Modal 1: Add / Edit Flat & Plot Stock Form (Form Opens on CTA Click) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Home className="text-emerald-600" size={20} />
                <h3 className="font-extrabold text-gray-900 text-base">
                  {editingItem ? 'Edit Flat / Plot Stock' : 'Add New'}
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
                <label className="block font-bold text-gray-700 mb-1">Unit / Plot Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Plot A-102 or Flat 4B"
                  value={formData.unitPlotNo}
                  onChange={(e) => setFormData({ ...formData, unitPlotNo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 font-bold text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 font-bold bg-gray-50"
                  >
                    <option value="Flat">Flat</option>
                    <option value="Plot">Plot</option>
                    <option value="Commercial Space">Commercial Space</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Project Name *</label>
                  <select
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 font-bold bg-gray-50"
                  >
                    <option value="Purbachal Green Valley Project">Purbachal Green Valley Project</option>
                    <option value="Promise Heights Commercial">Promise Heights Commercial</option>
                    <option value="Modhumoti Model Town">Modhumoti Model Town</option>
                    <option value="Uttara Model Town Phase 3">Uttara Model Town Phase 3</option>
                    <option value="Mirpur Lake City Tower">Mirpur Lake City Tower</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Size (SQFT / Katha)</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 Katha or 1,850 SQFT"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Floor / Block</label>
                  <input
                    type="text"
                    placeholder="e.g. 4th Floor or Block A"
                    value={formData.floorOrBlock}
                    onChange={(e) => setFormData({ ...formData, floorOrBlock: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Facing / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. South-East Facing (Road)"
                    value={formData.facing}
                    onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Asking Price / Valuation (৳)</label>
                  <input
                    type="text"
                    placeholder="e.g. 1,20,00,000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Availability Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 font-bold bg-gray-50"
                >
                  <option value="Vacant">Vacant (Available for sale)</option>
                  <option value="Booked">Booked (Token received)</option>
                  <option value="Sold">Sold (Registered)</option>
                  <option value="Hold">Hold (Reserved)</option>
                </select>
              </div>

              {formData.status !== 'Vacant' && (
                <div className="grid grid-cols-2 gap-3 bg-amber-50/70 p-3 rounded-xl border border-amber-200">
                  <div>
                    <label className="block font-bold text-gray-800 mb-1">Allotted Buyer Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Engr. Shahadat Hossain"
                      value={formData.buyerName}
                      onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-bold text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-800 mb-1">Booking Date</label>
                    <input
                      type="text"
                      placeholder="e.g. 15 Jan, 2025"
                      value={formData.bookingDate}
                      onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block font-bold text-gray-700 mb-1">Remarks / Location Features</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Near 300ft highway, corner plot with double road access..."
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
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
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold shadow-sm cursor-pointer"
                >
                  {editingItem ? 'Save Stock Item' : 'Add Stock Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: View Stock Details */}
      {selectedItemForDetails && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Home size={22} />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-base">{selectedItemForDetails.unitPlotNo}</h3>
                  <p className="text-xs text-gray-500 font-medium">{selectedItemForDetails.projectName}</p>
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
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Stock Type</p>
                  <p className="font-bold text-gray-900 mt-0.5">{selectedItemForDetails.type}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Availability Status</p>
                  <p className="font-extrabold text-emerald-700 mt-0.5">{selectedItemForDetails.status}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border border-gray-100 rounded-xl bg-white">
                  <p className="text-[10px] text-gray-400 font-bold">Size / Measurement</p>
                  <p className="font-extrabold text-gray-900 mt-0.5">{selectedItemForDetails.size}</p>
                </div>
                <div className="p-3 border border-gray-100 rounded-xl bg-white">
                  <p className="text-[10px] text-gray-400 font-bold">Floor / Block</p>
                  <p className="font-bold text-gray-800 mt-0.5">{selectedItemForDetails.floorOrBlock}</p>
                </div>
              </div>

              <div className="p-3 border border-gray-100 rounded-xl bg-white space-y-1">
                <p className="text-[10px] text-gray-400 font-bold">Facing & Location Features</p>
                <p className="font-semibold text-gray-800">{selectedItemForDetails.facing}</p>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-emerald-800 font-bold">Asking Price / Stock Valuation</p>
                  <p className="text-base font-black text-emerald-900 font-mono mt-0.5">{selectedItemForDetails.price}</p>
                </div>
              </div>

              {selectedItemForDetails.buyerName && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                  <p className="text-[10px] text-amber-800 font-bold uppercase">Allotted Buyer Information</p>
                  <p className="font-extrabold text-gray-900 text-sm">{selectedItemForDetails.buyerName}</p>
                  {selectedItemForDetails.bookingDate && (
                    <p className="text-[11px] text-amber-800 font-mono">Booking Date: {selectedItemForDetails.bookingDate}</p>
                  )}
                </div>
              )}

              {selectedItemForDetails.remarks && (
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-[10px] text-gray-400 font-bold">Remarks / Notes</p>
                  <p className="text-gray-700 mt-0.5">{selectedItemForDetails.remarks}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
              <button
                onClick={() => setSelectedItemForDetails(null)}
                className="px-5 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
