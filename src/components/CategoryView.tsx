import React, { useState } from 'react';
import { LeadCategoryItem } from '../types';
import { Layers, Plus, Search, Edit3, Trash2, CheckCircle2, ChevronDown } from 'lucide-react';

interface CategoryViewProps {
  categories: LeadCategoryItem[];
  onAddCategory: (cat: LeadCategoryItem) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ categories, onAddCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [perPage, setPerPage] = useState('10');
  const [showAddModal, setShowAddModal] = useState(false);
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
      totalLeads: 12500,
      status: true,
      note: catNote || 'New lead category added'
    };

    onAddCategory(newCat);
    setCatName('');
    setCatNote('');
    setShowAddModal(false);
  };

  const filteredCategories = categories
    .filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (c.note && c.note.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = selectedStatus === 'All' || 
                            (selectedStatus === 'Active' && c.status) || 
                            (selectedStatus === 'Inactive' && !c.status);
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === 'Most Leads') {
        return b.totalLeads - a.totalLeads;
      }
      if (sortOrder === 'Oldest') {
        return a.id.localeCompare(b.id);
      }
      return b.id.localeCompare(a.id);
    });

  return (
    <div className="space-y-5 max-w-full font-sans">
      <div className="flex justify-end">
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
          style={{ backgroundColor: '#c7a259' }}
        >
          <Plus size={14} />
          <span>+ Add Lead Category</span>
        </button>
      </div>

      {/* Filters Card matching exact screenshot layout */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
        <h2 className="text-sm font-extrabold text-gray-900 tracking-tight">Filters</h2>

        <div className="space-y-3">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Search Categories Input */}
            <div className="relative lg:col-span-1">
              <Search className="absolute left-3.5 top-2.5 text-gray-400" size={15} />
              <input 
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
              />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none shadow-2xs"
              >
                <option value="All">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-2.5 text-gray-400 pointer-events-none" size={15} />
            </div>

            {/* Sort Order Dropdown */}
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none shadow-2xs"
              >
                <option value="Newest">Sort Order</option>
                <option value="Newest">Newest First</option>
                <option value="Oldest">Oldest First</option>
                <option value="Most Leads">Most Leads</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-2.5 text-gray-400 pointer-events-none" size={15} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative sm:col-span-1">
              <select
                value={perPage}
                onChange={(e) => setPerPage(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none shadow-2xs"
              >
                <option value="10">Show Per Page</option>
                <option value="10">10 Per Page</option>
                <option value="25">25 Per Page</option>
                <option value="50">50 Per Page</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-2.5 text-gray-400 pointer-events-none" size={15} />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Table List matching Page 12 */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="p-3.5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <span className="text-xs font-bold text-gray-800">Category List ({filteredCategories.length})</span>
          <span className="text-xs font-semibold text-gray-500">Total {filteredCategories.length} Categories</span>
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
                <th className="py-2.5 px-4 text-center">Action</th>
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
                  <td className="py-3 px-4 text-center">
                    <button className="px-3 py-1 text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors shadow-2xs">
                      Action
                    </button>
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-xs">{cat.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-5 w-full max-w-md space-y-4 shadow-xl border border-gray-200">
            <h3 className="font-extrabold text-base text-gray-900">+ Add Lead Category</h3>
            <form onSubmit={handleCreateCategory} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Category Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Billboard Leads / Facebook Ads"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Note</label>
                <textarea 
                  rows={3} 
                  placeholder="Add your category notes..."
                  value={catNote}
                  onChange={(e) => setCatNote(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs"
                  style={{ backgroundColor: '#c7a259' }}
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

