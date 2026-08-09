import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  X,
  Building,
  ChevronDown,
  Home,
  TrendingUp,
  Wallet,
  Tag,
  Printer,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { InventoryProjectItem } from '../types';

interface InventoryAllProjectsViewProps {
  onSelectProjectHistory?: (projectId: string) => void;
}

export const InventoryAllProjectsView: React.FC<InventoryAllProjectsViewProps> = ({
  onSelectProjectHistory
}) => {
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [projects, setProjects] = useState<InventoryProjectItem[]>([
    {
      id: 'proj_1',
      projectName: 'Purbachal Green Valley Project',
      location: 'Sector 22, Purbachal, Dhaka',
      projectType: 'Land Project',
      totalUnits: 250,
      availableUnits: 70,
      soldUnits: 180,
      tokenUnits: 20,
      pricePerUnit: '৳ 12L - 18L / Katha',
      totalProjectValue: '৳ 350.0M',
      status: 'Ongoing',
      branch: 'Dhaka HO'
    },
    {
      id: 'proj_2',
      projectName: 'Bashundhara Enclave Villa & Suites',
      location: 'Block I, Bashundhara R/A, Dhaka',
      projectType: 'Residential Building',
      totalUnits: 120,
      availableUnits: 28,
      soldUnits: 92,
      tokenUnits: 10,
      pricePerUnit: '৳ 8,500 / SQFT',
      totalProjectValue: '৳ 520.0M',
      status: 'Ongoing',
      branch: 'Dhaka HO'
    },
    {
      id: 'proj_3',
      projectName: 'Uttara Sector 18 Villa & Apartment',
      location: 'Sector 18, Uttara, Dhaka',
      projectType: 'Residential Building',
      totalUnits: 415,
      availableUnits: 105,
      soldUnits: 310,
      tokenUnits: 30,
      pricePerUnit: '৳ 7,200 / SQFT',
      totalProjectValue: '৳ 890.0M',
      status: 'Near Completion',
      branch: 'Dhaka HO'
    },
    {
      id: 'proj_4',
      projectName: 'Dhanmondi Horizon Luxury Tower',
      location: 'Road 27, Dhanmondi, Dhaka',
      projectType: 'Commercial Complex',
      totalUnits: 80,
      availableUnits: 12,
      soldUnits: 68,
      tokenUnits: 5,
      pricePerUnit: '৳ 18,000 / SQFT',
      totalProjectValue: '৳ 1,200.0M',
      status: 'Ongoing',
      branch: 'Dhanmondi Branch'
    },
    {
      id: 'proj_5',
      projectName: 'Mirpur Commercial Hub & Market',
      location: 'Mirpur 10 Circle, Dhaka',
      projectType: 'Commercial Complex',
      totalUnits: 150,
      availableUnits: 45,
      soldUnits: 105,
      tokenUnits: 12,
      pricePerUnit: '৳ 14,000 / SQFT',
      totalProjectValue: '৳ 640.0M',
      status: 'Ongoing',
      branch: 'Dhaka HO'
    },
    {
      id: 'proj_6',
      projectName: 'Chittagong Hillside Valley',
      location: 'Panchlaish, Chittagong',
      projectType: 'Land Project',
      totalUnits: 300,
      availableUnits: 180,
      soldUnits: 120,
      tokenUnits: 15,
      pricePerUnit: '৳ 8L - 12L / Katha',
      totalProjectValue: '৳ 280.0M',
      status: 'Upcoming',
      branch: 'Chittagong Branch'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedHoldingsProject, setSelectedHoldingsProject] = useState<InventoryProjectItem | null>(null);

  // New Project Form State
  const [newProject, setNewProject] = useState({
    projectName: '',
    location: '',
    projectType: 'Land Project' as InventoryProjectItem['projectType'],
    totalUnits: 100,
    pricePerUnit: '৳ 10L / Katha',
    totalProjectValue: '৳ 150M',
    status: 'Ongoing' as InventoryProjectItem['status'],
    branch: 'Dhaka HO'
  });

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, selectedStatus]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.projectName.trim()) return;

    const item: InventoryProjectItem = {
      id: `proj_${Date.now()}`,
      projectName: newProject.projectName,
      location: newProject.location || 'Dhaka',
      projectType: newProject.projectType,
      totalUnits: Number(newProject.totalUnits) || 100,
      availableUnits: Number(newProject.totalUnits) || 100,
      soldUnits: 0,
      tokenUnits: 0,
      pricePerUnit: newProject.pricePerUnit,
      totalProjectValue: newProject.totalProjectValue,
      status: newProject.status,
      branch: newProject.branch
    };

    setProjects([item, ...projects]);
    setIsAddModalOpen(false);
    showToast('New project added successfully!');
    setNewProject({
      projectName: '',
      location: '',
      projectType: 'Land Project',
      totalUnits: 100,
      pricePerUnit: '৳ 10L / Katha',
      totalProjectValue: '৳ 150M',
      status: 'Ongoing',
      branch: 'Dhaka HO'
    });
  };

  const totalProjectsCount = projects.length;
  const activeProjectsCount = projects.filter(p => p.status === 'Ongoing').length;
  const totalUnitsCount = projects.reduce((acc, curr) => acc + curr.totalUnits, 0);
  const vacantUnitsCount = projects.reduce((acc, curr) => acc + curr.availableUnits, 0);
  const bookedUnitsCount = projects.reduce((acc, curr) => acc + curr.tokenUnits, 0);
  const soldUnitsCount = projects.reduce((acc, curr) => acc + curr.soldUnits, 0);

  const filteredProjects = projects.filter(p => {
    const matchesSearch = searchQuery === '' || 
      p.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || p.projectType === selectedType;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + pageSize);

  // Checkbox selection
  const isAllOnPageSelected = paginatedProjects.length > 0 && paginatedProjects.every(p => selectedProjectIds.includes(p.id));

  const toggleSelectAllPage = () => {
    if (isAllOnPageSelected) {
      const pageIds = paginatedProjects.map(p => p.id);
      setSelectedProjectIds(prev => prev.filter(id => !pageIds.includes(id)));
    } else {
      const pageIds = paginatedProjects.map(p => p.id);
      setSelectedProjectIds(prev => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const toggleSelectProject = (id: string) => {
    setSelectedProjectIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Bulk Actions
  const handleBulkDelete = () => {
    if (selectedProjectIds.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedProjectIds.length} selected project(s)?`)) {
      setProjects(prev => prev.filter(p => !selectedProjectIds.includes(p.id)));
      showToast(`${selectedProjectIds.length} project(s) deleted.`);
      setSelectedProjectIds([]);
    }
  };

  const handleBulkStatusChange = (status: InventoryProjectItem['status']) => {
    if (selectedProjectIds.length === 0) return;
    setProjects(prev => prev.map(p => selectedProjectIds.includes(p.id) ? { ...p, status } : p));
    showToast(`Status updated to "${status}" for ${selectedProjectIds.length} project(s).`);
    setSelectedProjectIds([]);
  };

  // Export CSV & Print
  const handleExportCSV = (exportSelectedOnly = false) => {
    const itemsToExport = exportSelectedOnly 
      ? projects.filter(p => selectedProjectIds.includes(p.id))
      : filteredProjects;

    if (itemsToExport.length === 0) {
      alert('No projects available to export.');
      return;
    }

    const headers = ['Project Name', 'Location', 'Type', 'Total Units', 'Available Units', 'Sold Units', 'Token Units', 'Price Range', 'Total Value', 'Status', 'Branch'];
    const rows = itemsToExport.map(p => [
      `"${p.projectName}"`,
      `"${p.location}"`,
      `"${p.projectType}"`,
      p.totalUnits,
      p.availableUnits,
      p.soldUnits,
      p.tokenUnits,
      `"${p.pricePerUnit}"`,
      `"${p.totalProjectValue}"`,
      `"${p.status}"`,
      `"${p.branch}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', exportSelectedOnly ? 'selected_projects.csv' : 'all_projects_catalog.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${itemsToExport.length} project(s) to CSV!`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-5 font-sans pb-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top CTA Button Container */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-2xs flex justify-end">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-xs font-black transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New</span>
        </button>
      </div>

      {/* KPI Cards Grid (4 Cards with distinct theme colors matching Reference Image) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Projects Overview (Emerald Theme) */}
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
              <span className="text-xl font-black text-gray-900 mt-1">{totalProjectsCount}</span>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-emerald-800 uppercase">ONGOING</span>
              <span className="text-xl font-black text-gray-900 mt-1">{activeProjectsCount}</span>
            </div>
          </div>

          <Building2 className="absolute -right-3 -bottom-3 text-emerald-500/15 w-24 h-24 pointer-events-none z-0" />
        </div>

        {/* Card 2: Units & Stock (Blue Theme) */}
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
              <span className="text-xl font-black text-gray-900 mt-1">{totalUnitsCount}</span>
            </div>

            <div className="bg-blue-50/40 border border-blue-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-blue-800 uppercase">VACANT</span>
              <span className="text-xl font-black text-gray-900 mt-1">{vacantUnitsCount}</span>
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
              <span className="text-xl font-black text-gray-900 mt-1">{bookedUnitsCount}</span>
            </div>

            <div className="bg-purple-50/40 border border-purple-100 p-2.5 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-black tracking-wider text-purple-800 uppercase">SOLD</span>
              <span className="text-xl font-black text-gray-900 mt-1">{soldUnitsCount}</span>
            </div>
          </div>

          <Tag className="absolute -right-3 -bottom-3 text-purple-500/15 w-24 h-24 pointer-events-none z-0" />
        </div>

        {/* Card 4: Portfolio Value (Orange Theme) */}
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
      {selectedProjectIds.length > 0 && (
        <div className="bg-amber-900 text-white rounded-2xl p-3.5 px-5 shadow-lg border border-amber-800 flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <span className="bg-amber-700 text-amber-100 text-xs px-2.5 py-1 rounded-lg font-extrabold font-mono">
              {selectedProjectIds.length} Selected
            </span>
            <span className="text-xs text-amber-200 font-medium hidden sm:inline">Perform bulk operations on selected projects:</span>
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
              <option value="Ongoing">Mark as Ongoing</option>
              <option value="Near Completion">Mark as Near Completion</option>
              <option value="Upcoming">Mark as Upcoming</option>
              <option value="Sold Out">Mark as Sold Out</option>
            </select>

            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </button>

            <button
              onClick={() => setSelectedProjectIds([])}
              className="px-2.5 py-1.5 text-xs text-amber-300 hover:text-white font-bold ml-1 cursor-pointer"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Filter Section */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects by name, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-medium"
          />
        </div>

        {/* Filter Dropdowns & Export/Print Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs font-bold bg-gray-100/80 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="All">All Project Types</option>
            <option value="Land Project">Land Project</option>
            <option value="Residential Building">Residential Building</option>
            <option value="Commercial Complex">Commercial Complex</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs font-bold bg-gray-100/80 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Near Completion">Near Completion</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Sold Out">Sold Out</option>
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
            title="Print Project Catalog Table"
          >
            <Printer size={14} className="text-blue-600" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Projects Table */}
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
                <th className="py-3 px-4">PROJECT DETAILS</th>
                <th className="py-3 px-4">LOCATION</th>
                <th className="py-3 px-4">TYPE</th>
                <th className="py-3 px-4 text-center">TOTAL UNITS</th>
                <th className="py-3 px-4 text-center">AVAILABLE</th>
                <th className="py-3 px-4 text-center">SOLD / TOKEN</th>
                <th className="py-3 px-4">PRICE RANGE</th>
                <th className="py-3 px-4">TOTAL VALUE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {paginatedProjects.length > 0 ? (
                paginatedProjects.map((p) => {
                  const isSelected = selectedProjectIds.includes(p.id);
                  return (
                    <tr key={p.id} className={`transition-colors ${isSelected ? 'bg-amber-50/50' : 'hover:bg-amber-50/20'}`}>
                      <td className="py-3.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectProject(p.id)}
                          className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                        />
                      </td>

                      <td className="py-3.5 px-4 min-w-[200px]">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                            <Building size={16} />
                          </div>
                          <div>
                            <p className="font-extrabold text-gray-900 leading-snug">{p.projectName}</p>
                            <p className="text-[10px] text-gray-400 font-semibold">{p.branch}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-gray-600 min-w-[150px]">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-gray-400 shrink-0" />
                          <span className="truncate">{p.location}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                          {p.projectType}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center font-extrabold text-gray-800">
                        {p.totalUnits}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {p.availableUnits}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center font-semibold text-gray-700">
                        <span className="text-slate-800 font-bold">{p.soldUnits} Sold</span>
                        <span className="text-amber-600 text-[10px] block">({p.tokenUnits} Token)</span>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-amber-800 font-mono whitespace-nowrap">
                        {p.pricePerUnit}
                      </td>

                      <td className="py-3.5 px-4 font-black text-gray-900 font-mono whitespace-nowrap">
                        {p.totalProjectValue}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                          p.status === 'Ongoing' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                          p.status === 'Near Completion' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                          p.status === 'Upcoming' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                          'bg-gray-100 text-gray-800 border border-gray-300'
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
                              
                              <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-20 text-left animate-in fade-in zoom-in-95 duration-100">
                                <button
                                  onClick={() => {
                                    setActiveDropdownId(null);
                                    onSelectProjectHistory?.(p.id);
                                  }}
                                  className="w-full text-left px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-amber-50 hover:text-amber-900 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Eye size={14} className="text-amber-600" />
                                  <span>View Details & History</span>
                                </button>

                                <button
                                  onClick={() => {
                                    setActiveDropdownId(null);
                                    onSelectProjectHistory?.(p.id);
                                  }}
                                  className="w-full text-left px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-900 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Edit size={14} className="text-blue-600" />
                                  <span>Edit Project</span>
                                </button>

                                <div className="my-1 border-t border-gray-100" />

                                <button
                                  onClick={() => {
                                    setActiveDropdownId(null);
                                    setSelectedHoldingsProject(p);
                                  }}
                                  className="w-full text-left px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-emerald-50 hover:text-emerald-900 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Layers size={14} className="text-emerald-600" />
                                  <span>Holdings Grid</span>
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
                  <td colSpan={11} className="py-8 text-center text-gray-400 font-semibold">
                    No projects match your filter query.
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
              Showing <span className="font-black text-gray-900">{filteredProjects.length === 0 ? 0 : startIndex + 1}</span> to{' '}
              <span className="font-black text-gray-900">{Math.min(startIndex + pageSize, filteredProjects.length)}</span> of{' '}
              <span className="font-black text-gray-900">{filteredProjects.length}</span> entries
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
              disabled={safeCurrentPage === totalPages || filteredProjects.length === 0}
              className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold px-2.5"
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Add New Project */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-gray-200 shadow-2xl overflow-hidden">
            <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 size={18} className="text-amber-400" />
                <h3 className="font-extrabold text-sm">Add New Project to Inventory</h3>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddProjectSubmit} className="p-5 space-y-3 text-xs">
              <div>
                <label className="font-extrabold text-gray-700 block mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Purbachal Sector 4 Deluxe Plots"
                  value={newProject.projectName}
                  onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-extrabold text-gray-700 block mb-1">Location Address *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sector 4, Purbachal, Dhaka"
                  value={newProject.location}
                  onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-extrabold text-gray-700 block mb-1">Project Type</label>
                  <select
                    value={newProject.projectType}
                    onChange={(e) => setNewProject({ ...newProject, projectType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-semibold"
                  >
                    <option value="Land Project">Land Project</option>
                    <option value="Residential Building">Residential Building</option>
                    <option value="Commercial Complex">Commercial Complex</option>
                  </select>
                </div>

                <div>
                  <label className="font-extrabold text-gray-700 block mb-1">Total Units / Plots</label>
                  <input
                    type="number"
                    value={newProject.totalUnits}
                    onChange={(e) => setNewProject({ ...newProject, totalUnits: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-extrabold text-gray-700 block mb-1">Price Per Unit</label>
                  <input
                    type="text"
                    value={newProject.pricePerUnit}
                    onChange={(e) => setNewProject({ ...newProject, pricePerUnit: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-extrabold text-gray-700 block mb-1">Total Project Value</label>
                  <input
                    type="text"
                    value={newProject.totalProjectValue}
                    onChange={(e) => setNewProject({ ...newProject, totalProjectValue: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Holdings Grid Preview */}
      {selectedHoldingsProject && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-gray-200 shadow-2xl overflow-hidden space-y-4">
            <div className="bg-amber-600 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm">{selectedHoldingsProject.projectName}</h3>
                <p className="text-[10px] text-amber-100">{selectedHoldingsProject.location}</p>
              </div>
              <button 
                onClick={() => setSelectedHoldingsProject(null)}
                className="p-1 hover:bg-amber-700 rounded-lg text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                  <span className="text-emerald-800 font-extrabold block text-base">{selectedHoldingsProject.availableUnits}</span>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase">Available</span>
                </div>
                <div className="bg-amber-50 p-2 rounded-xl border border-amber-200">
                  <span className="text-amber-800 font-extrabold block text-base">{selectedHoldingsProject.tokenUnits}</span>
                  <span className="text-[10px] text-amber-600 font-bold uppercase">Token Deposit</span>
                </div>
                <div className="bg-slate-100 p-2 rounded-xl border border-slate-300">
                  <span className="text-slate-800 font-extrabold block text-base">{selectedHoldingsProject.soldUnits}</span>
                  <span className="text-[10px] text-slate-600 font-bold uppercase">Sold</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl border border-gray-200">
                  <span className="text-gray-900 font-extrabold block text-base">{selectedHoldingsProject.totalUnits}</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Total Units</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <p className="text-xs font-bold text-gray-700 mb-2">Visual Holdings Plot Grid Preview:</p>
                <div className="grid grid-cols-8 gap-1.5">
                  {Array.from({ length: 32 }).map((_, i) => {
                    const isSold = i % 2 === 0;
                    const isToken = i % 7 === 0;
                    return (
                      <div
                        key={i}
                        className={`h-8 rounded-md flex items-center justify-center text-[9px] font-black text-white ${
                          isSold ? 'bg-slate-700' : isToken ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                      >
                        P-{101 + i}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedHoldingsProject(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold text-xs"
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
