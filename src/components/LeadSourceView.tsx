import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  FilterX, 
  ChevronDown, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  MoreVertical,
  X,
  Layers
} from 'lucide-react';
import { LeadSourceItem } from '../types';
import { mockLeadSources } from '../mockData';

export const LeadSourceView: React.FC = () => {
  const [sources, setSources] = useState<LeadSourceItem[]>(mockLeadSources);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('default');
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<LeadSourceItem | null>(null);
  const [sourceNameInput, setSourceNameInput] = useState('');
  const [sourceStatusInput, setSourceStatusInput] = useState<'Active' | 'Inactive'>('Active');
  
  // Action menu open state for specific row
  const [activeActionRow, setActiveActionRow] = useState<string | null>(null);

  // Filter & Sort logic
  const filteredSources = useMemo(() => {
    let result = [...sources];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((s) => s.name.toLowerCase().includes(q));
    }

    // Status Filter
    if (statusFilter !== 'All') {
      result = result.filter((s) => s.status === statusFilter);
    }

    // Sort Order
    if (sortOrder === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOrder === 'leads-desc') {
      result.sort((a, b) => b.leadsCount - a.leadsCount);
    } else if (sortOrder === 'leads-asc') {
      result.sort((a, b) => a.leadsCount - b.leadsCount);
    }

    return result;
  }, [sources, searchQuery, statusFilter, sortOrder]);

  // Paginated list
  const paginatedSources = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredSources.slice(start, start + perPage);
  }, [filteredSources, currentPage, perPage]);

  const totalPages = Math.ceil(filteredSources.length / perPage) || 1;

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setSortOrder('default');
    setPerPage(10);
    setCurrentPage(1);
  };

  const handleOpenAddModal = () => {
    setEditingSource(null);
    setSourceNameInput('');
    setSourceStatusInput('Active');
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (source: LeadSourceItem) => {
    setEditingSource(source);
    setSourceNameInput(source.name);
    setSourceStatusInput(source.status);
    setIsAddModalOpen(true);
    setActiveActionRow(null);
  };

  const handleSaveSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceNameInput.trim()) return;

    if (editingSource) {
      setSources((prev) =>
        prev.map((item) =>
          item.id === editingSource.id
            ? { ...item, name: sourceNameInput.trim(), status: sourceStatusInput }
            : item
        )
      );
    } else {
      const newSource: LeadSourceItem = {
        id: `src-${Date.now()}`,
        sl: sources.length + 1,
        name: sourceNameInput.trim(),
        leadsCount: 0,
        currentWeek: 0,
        lastWeek: 0,
        performancePercent: 0,
        status: sourceStatusInput,
      };
      setSources((prev) => [...prev, newSource]);
    }

    setIsAddModalOpen(false);
    setSourceNameInput('');
  };

  const handleDeleteSource = (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead source?')) {
      setSources((prev) => prev.filter((item) => item.id !== id));
      setActiveActionRow(null);
    }
  };

  const handleToggleStatus = (id: string) => {
    setSources((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'Active' ? 'Inactive' : 'Active' }
          : item
      )
    );
    setActiveActionRow(null);
  };

  return (
    <div className="space-y-5 pb-8 select-none">
      {/* Action Bar */}
      <div className="flex justify-end">
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all focus:outline-none"
        >
          <PlusCircle size={15} />
          <span>Add New</span>
        </button>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
          <span className="text-xs font-extrabold text-gray-900 flex items-center gap-1.5">
            Filters
          </span>
          <button
            onClick={handleClearFilters}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-amber-700 bg-gray-50 hover:bg-amber-50 px-2.5 py-1 rounded-md border border-gray-200 transition-colors"
          >
            <FilterX size={13} />
            <span>Clear Filters</span>
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative col-span-1 sm:col-span-2">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search sources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              <option value="All">Status (All)</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Sort Order Dropdown */}
          <div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              <option value="default">Sort Order</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="leads-desc">Highest Leads</option>
              <option value="leads-asc">Lowest Leads</option>
            </select>
          </div>
        </div>

        {/* Show Per Page */}
        <div className="pt-1 flex items-center justify-between">
          <div className="w-48">
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value={10}>Show Per Page (10)</option>
              <option value={25}>Show Per Page (25)</option>
              <option value={50}>Show Per Page (50)</option>
              <option value={100}>Show Per Page (100)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        {/* Table Header Label */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
            <span>Lead Sources</span>
            <span className="text-[11px] font-medium text-gray-500">({filteredSources.length} total)</span>
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-gray-100/70 text-[10px] font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                <th className="py-3 px-4 w-12 text-center">SI</th>
                <th className="py-3 px-4 w-28 text-center">Action</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4 text-center">Leads Count</th>
                <th className="py-3 px-4 text-center">Current Week</th>
                <th className="py-3 px-4 text-center">Last Week</th>
                <th className="py-3 px-6 text-center">Performance</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {paginatedSources.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No lead sources found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedSources.map((item, idx) => {
                  const displayIndex = (currentPage - 1) * perPage + idx + 1;
                  const isMenuOpen = activeActionRow === item.id;

                  return (
                    <tr key={item.id} className="hover:bg-amber-50/20 transition-colors relative">
                      {/* SI */}
                      <td className="py-3.5 px-4 text-center text-gray-500 font-bold">{displayIndex}</td>

                      {/* Action Button & Dropdown */}
                      <td className="py-3.5 px-4 text-center relative">
                        <div className="inline-block text-left">
                          <button
                            onClick={() => setActiveActionRow(isMenuOpen ? null : item.id)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-full shadow-2xs transition-all focus:outline-none"
                          >
                            <span>Action</span>
                            <ChevronDown size={11} />
                          </button>

                          {/* Action Popover Menu */}
                          {isMenuOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setActiveActionRow(null)} 
                              />
                              <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 text-left text-xs">
                                <button
                                  onClick={() => handleOpenEditModal(item)}
                                  className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-amber-50 text-gray-700 font-medium"
                                >
                                  <Edit3 size={13} className="text-amber-600" />
                                  <span>Edit Source</span>
                                </button>
                                <button
                                  onClick={() => handleToggleStatus(item.id)}
                                  className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-amber-50 text-gray-700 font-medium"
                                >
                                  {item.status === 'Active' ? (
                                    <>
                                      <XCircle size={13} className="text-amber-600" />
                                      <span>Mark Inactive</span>
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle2 size={13} className="text-emerald-600" />
                                      <span>Mark Active</span>
                                    </>
                                  )}
                                </button>
                                <button
                                  onClick={() => handleDeleteSource(item.id)}
                                  className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-red-50 text-red-600 font-medium border-t border-gray-100"
                                >
                                  <Trash2 size={13} />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Name */}
                      <td className="py-3.5 px-4 font-bold text-gray-900">{item.name}</td>

                      {/* Leads Count Pill Badge */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center justify-center min-w-[32px] px-2.5 py-0.5 rounded-full text-xs font-extrabold text-white bg-[#1E1B4B] shadow-2xs">
                          {item.leadsCount}
                        </span>
                      </td>

                      {/* Current Week */}
                      <td className="py-3.5 px-4 text-center font-bold text-gray-800">{item.currentWeek}</td>

                      {/* Last Week */}
                      <td className="py-3.5 px-4 text-center font-bold text-gray-800">{item.lastWeek}</td>

                      {/* Performance */}
                      <td className="py-3.5 px-6 text-center">
                        {item.performancePercent > 0 ? (
                          <span className="inline-flex items-center gap-1 font-bold text-emerald-600 text-[11px]">
                            <TrendingUp size={13} />
                            <span>↑ {item.performancePercent.toFixed(1)}% From Last Week</span>
                          </span>
                        ) : item.performancePercent < 0 ? (
                          <span className="inline-flex items-center gap-1 font-bold text-gray-500 text-[11px]">
                            <TrendingDown size={13} />
                            <span>↓ {Math.abs(item.performancePercent).toFixed(1)}% From Last Week</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-bold text-gray-500 text-[11px]">
                            <Minus size={13} />
                            <span>0% From Last Week</span>
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        {item.status === 'Active' ? (
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600 border border-gray-300">
                            Inactive
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>
              Showing {Math.min((currentPage - 1) * perPage + 1, filteredSources.length)} to{' '}
              {Math.min(currentPage * perPage, filteredSources.length)} of {filteredSources.length} entries
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-2.5 py-1 rounded border border-gray-200 font-bold hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`px-2.5 py-1 rounded font-bold border ${
                    currentPage === p
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'border-gray-200 text-gray-700 hover:bg-white'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1 rounded border border-gray-200 font-bold hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
              <h3 className="font-extrabold text-gray-900 text-sm">
                {editingSource ? 'Edit Lead Source' : 'Add New Lead Source'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveSource} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Source Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TikTok Ads, Trade Show, Email Campaign"
                  value={sourceNameInput}
                  onChange={(e) => setSourceNameInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Status</label>
                <select
                  value={sourceStatusInput}
                  onChange={(e) => setSourceStatusInput(e.target.value as 'Active' | 'Inactive')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-amber-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                >
                  {editingSource ? 'Save Changes' : 'Create Source'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
