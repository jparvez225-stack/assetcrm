import React, { useState } from 'react';
import { LeadCategoryItem } from '../types';
import { Layers, Plus, Search, Filter, Eye, CheckCircle2, ArrowLeft, Printer } from 'lucide-react';

interface CategoryViewProps {
  categories: LeadCategoryItem[];
  onAddCategory: (cat: LeadCategoryItem) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ categories, onAddCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  
  // Navigation inside view: 'list' | 'add' | 'view'
  const [pageMode, setPageMode] = useState<'list' | 'add' | 'view'>('list');
  const [selectedCategory, setSelectedCategory] = useState<LeadCategoryItem | null>(null);

  // Add form state
  const [catName, setCatName] = useState('');
  const [catNote, setCatNote] = useState('');

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName) return;

    const newCat: LeadCategoryItem = {
      id: `cat_${Date.now()}`,
      sl: `0${categories.length + 1}`,
      name: catName,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=100',
      totalLeads: 1250,
      status: true,
      note: catNote || 'New marketing category'
    };

    onAddCategory(newCat);
    setCatName('');
    setCatNote('');
    setPageMode('list');
  };

  const filteredCategories = categories.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.note.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || (statusFilter === 'Active' ? c.status : !c.status);
    return matchesSearch && matchesStatus;
  });

  const totalInquiries = categories.reduce((sum, c) => sum + c.totalLeads, 0);

  // SEPARATE PAGE: View Category Page
  if (pageMode === 'view' && selectedCategory) {
    return (
      <div className="space-y-6 max-w-full font-sans">
        <div className="print-only-header">
          <h2 className="text-xl font-extrabold uppercase">Promise Assets Limited</h2>
          <p className="text-sm font-bold">Marketing Channel & Category Analytics Sheet</p>
          <p className="text-xs">Printed Date: {new Date().toLocaleDateString('en-GB')}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
          <button 
            onClick={() => setPageMode('list')}
            className="px-3.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5 w-fit shadow-2xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Categories List</span>
          </button>

          <button 
            onClick={() => window.print()}
            className="px-4 py-1.5 text-xs font-bold text-amber-900 bg-white border-2 border-[#D4AF37] rounded-md hover:bg-amber-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Printer size={14} />
            <span>Print Sheet</span>
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-6">
          <div className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Lead Category Analytics Page</span>
              <h2 className="text-2xl font-extrabold text-gray-900">{selectedCategory.name}</h2>
              <p className="text-xs text-gray-500 mt-1">Marketing Channel ID: {selectedCategory.id}</p>
            </div>

            <div className="bg-amber-50 px-4 py-2 rounded-xl border border-amber-200 text-right">
              <span className="text-[10px] text-amber-900 font-bold block uppercase">Attributed Inquiries</span>
              <span className="text-2xl font-extrabold text-amber-900">{selectedCategory.totalLeads.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
              <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1.5">Channel Status</h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-gray-400 text-[10px] font-bold block">Status</span>
                  <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold ${selectedCategory.status ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {selectedCategory.status ? 'Active Marketing Channel' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
              <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1.5">Campaign Notes & Target Strategy</h3>
              <p className="text-xs text-gray-800 font-medium leading-relaxed">
                {selectedCategory.note || 'No notes available for this category.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SEPARATE PAGE: Add Category Page
  if (pageMode === 'add') {
    return (
      <div className="space-y-6 max-w-2xl font-sans">
        <div className="flex items-center justify-between no-print">
          <button 
            onClick={() => setPageMode('list')}
            className="px-3.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Categories List</span>
          </button>
          <span className="text-xs text-gray-500">Marketing Config</span>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-5">
          <div className="border-b border-gray-200 pb-3">
            <h2 className="text-lg font-extrabold text-gray-900">Add Marketing Channel / Category Page</h2>
            <p className="text-xs text-gray-500">Configure new real estate promotional channels and inquiry sources</p>
          </div>

          <form onSubmit={handleCreateCategory} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Category Name *</label>
              <input 
                type="text" 
                placeholder="e.g. Billboard Ads / Newspaper Circular"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Channel Strategy Notes</label>
              <textarea 
                rows={4} 
                placeholder="Enter campaign details and target audience notes..."
                value={catNote}
                onChange={(e) => setCatNote(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500"
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
                Save Category Page
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
        <p className="text-sm font-bold">Lead Categories & Promotional Channels List</p>
        <p className="text-xs">Printed Date: {new Date().toLocaleDateString('en-GB')}</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Lead Categories & Channels</h1>
          <p className="text-xs text-gray-500">Manage real estate marketing channels, campaign categories, and source performance</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setPageMode('add')}
            className="px-4 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
            style={{ backgroundColor: '#D4AF37' }}
          >
            <Plus size={14} />
            <span>Add Category Page</span>
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
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Total Categories</span>
          <p className="text-2xl font-extrabold text-gray-900">{categories.length}</p>
          <p className="text-[9px] text-amber-700 font-bold">ACTIVE MARKETING CHANNELS</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Active Channels</span>
          <p className="text-2xl font-extrabold text-emerald-600">
            {categories.filter(c => c.status).length}
          </p>
          <p className="text-[9px] text-emerald-700 font-bold">LIVE CAMPAIGNS</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Total Inquiries</span>
          <p className="text-2xl font-extrabold text-amber-800">{totalInquiries.toLocaleString()}</p>
          <p className="text-[9px] text-amber-700 font-bold">GENERATED LEADS</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Top Performing</span>
          <p className="text-sm font-extrabold text-gray-900 truncate">Facebook Ads</p>
          <p className="text-[9px] text-gray-400">HIGHEST ROI</p>
        </div>
      </div>

      {/* Search & Filter bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-3 no-print">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Search & Filters</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search Lead Categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
          >
            <option value="All">Status: All Categories</option>
            <option value="Active">Active Channels Only</option>
            <option value="Inactive">Inactive Channels</option>
          </select>
        </div>
      </div>

      {/* Categories Table List */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <span className="text-xs font-bold text-gray-800">Category List ({filteredCategories.length} Total)</span>
          <span className="text-[11px] text-gray-500">Real-Time Data</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/70 text-[10px] font-bold text-gray-600 uppercase border-b border-gray-200 tracking-wider">
                <th className="py-2.5 px-4">SL</th>
                <th className="py-2.5 px-4">Category Name</th>
                <th className="py-2.5 px-4 text-center">Category Image</th>
                <th className="py-2.5 px-4 text-center">Total Leads</th>
                <th className="py-2.5 px-4 text-center">Status</th>
                <th className="py-2.5 px-4 text-center no-print">Action</th>
                <th className="py-2.5 px-4">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {filteredCategories.map((cat, i) => (
                <tr key={cat.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="py-3 px-4 font-bold text-gray-400">{cat.sl || `0${i+1}`}</td>
                  <td className="py-3 px-4 font-bold text-gray-900">{cat.name}</td>
                  <td className="py-3 px-4 text-center">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-8 h-8 rounded-full object-cover border border-amber-300 mx-auto"
                    />
                  </td>
                  <td className="py-3 px-4 text-center font-extrabold text-amber-700">
                    {cat.totalLeads.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <input 
                      type="checkbox" 
                      checked={cat.status} 
                      readOnly 
                      className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 border-gray-300"
                    />
                  </td>
                  <td className="py-3 px-4 text-center no-print">
                    <button 
                      onClick={() => {
                        setSelectedCategory(cat);
                        setPageMode('view');
                      }}
                      className="px-3.5 py-1 text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors shadow-2xs inline-flex items-center gap-1"
                    >
                      <Eye size={11} />
                      <span>View Page</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-xs max-w-xs truncate">{cat.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
