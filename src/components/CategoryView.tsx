import React, { useState } from 'react';
import { LeadCategoryItem } from '../types';
import { Layers, Plus, Search, Edit3, Trash2, CheckCircle2 } from 'lucide-react';

interface CategoryViewProps {
  categories: LeadCategoryItem[];
  onAddCategory: (cat: LeadCategoryItem) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ categories, onAddCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5 max-w-full font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Lead Category</h1>
          <p className="text-xs text-gray-500">Manage real estate marketing channels and campaign categories</p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-1.5 text-xs font-bold text-white rounded-md shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
          style={{ backgroundColor: '#D4AF37' }}
        >
          <Plus size={14} />
          <span>Add Lead Category</span>
        </button>
      </div>

      {/* Categories Table List matching Page 12 */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="p-3.5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="relative w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search Lead Categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-amber-500"
            />
          </div>

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
                  style={{ backgroundColor: '#D4AF37' }}
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

