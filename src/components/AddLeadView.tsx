import React, { useState } from 'react';
import { Lead } from '../types';
import { 
  ArrowLeft, 
  Save, 
  FileText, 
  Building, 
  User, 
  Phone, 
  Mail, 
  Briefcase, 
  CreditCard, 
  MapPin, 
  Maximize2, 
  Compass, 
  DollarSign,
  Image as ImageIcon,
  Calendar
} from 'lucide-react';

interface AddLeadViewProps {
  onBack: () => void;
  onAddLead: (lead: Lead) => void;
}

export const AddLeadView: React.FC<AddLeadViewProps> = ({ onBack, onAddLead }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occupation: '',
    nid: '',
    address: '',
    projectName: 'Purbachal Green Valley Project',
    requiredPlotSize: '5 Katha',
    facingPreference: 'South' as Lead['facingPreference'],
    budgetLimit: '৳ 1.5 Crore',
    assignedSalesman: 'Siddique Rahman',
    source: 'Facebook' as Lead['source'],
    note: '',
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in Client Name and Phone Number');
      return;
    }

    const newLead: Lead = {
      id: `L${Date.now().toString().slice(-3)}`,
      sl: '07',
      date: new Date().toLocaleDateString('en-GB').replace(/\//g, '.'),
      name: formData.name,
      phone: formData.phone,
      email: formData.email || 'client@example.com',
      occupation: formData.occupation || 'Businessman',
      nid: formData.nid || 'N/A',
      address: formData.address || 'Dhaka, Bangladesh',
      projectName: formData.projectName,
      requiredPlotSize: formData.requiredPlotSize,
      facingPreference: formData.facingPreference,
      budgetLimit: formData.budgetLimit,
      projectType: formData.projectName.includes('Tower') ? 'Commercial' : 'Plot',
      prefTime: 'Morning',
      status: 'Contacted',
      assignedSalesman: formData.assignedSalesman,
      source: formData.source,
      lastCallDate: new Date().toISOString().split('T')[0],
      callCount: 1,
      messageCount: 0,
      note: formData.note || 'New property lead created',
    };

    onAddLead(newLead);
    setNotification('New Lead created successfully!');
    setTimeout(() => {
      onBack();
    }, 1000);
  };

  const handleSaveDraft = () => {
    setNotification('Draft saved successfully!');
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-5 font-sans">
      {/* Top Header Bar matching PDF Page 16 & 17 with 'Go Back' pill + 'Add CRM Lead' Title */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200/60">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-md shadow-xs transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span>Go Back</span>
          </button>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Add CRM Lead</h1>
        </div>

        {notification && (
          <div className="px-4 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md animate-pulse">
            {notification}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-6 space-y-6">
        {/* Photo Upload Box matching Page 2 & 12 in PDF */}
        <div className="flex items-center gap-4 p-4 bg-gray-50/60 rounded-lg border border-dashed border-gray-300">
          <div className="relative w-16 h-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 shadow-2xs shrink-0">
            <ImageIcon size={28} />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
              +
            </span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-800">Client / Buyer Profile Photo (Optional)</h4>
            <p className="text-[11px] text-gray-500">Upload profile image (JPG, PNG max 2MB). Preferred size 300x300.</p>
          </div>
        </div>

        {/* 2-Column Form Fields styled like PDF Pages 16 & 17 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter lead name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-gray-400 shadow-2xs"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-gray-400 shadow-2xs"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">WhatsApp Number</label>
            <input
              type="text"
              placeholder="Enter whatsapp number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-gray-400 shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Profession / Occupation</label>
            <input
              type="text"
              placeholder="Enter profession"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-gray-400 shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Institute / Organization</label>
            <input
              type="text"
              placeholder="Enter institute / company"
              value={formData.nid}
              onChange={(e) => setFormData({ ...formData, nid: e.target.value })}
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-gray-400 shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-gray-400 shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Entry Date</label>
            <div className="relative">
              <input
                type="text"
                defaultValue={new Date().toLocaleDateString('en-US')}
                className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
              />
              <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Address</label>
            <input
              type="text"
              placeholder="Enter address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-gray-400 shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Project Name</label>
            <select
              value={formData.projectName}
              onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
            >
              <option value="Purbachal Green Valley Project">Purbachal Green Valley Project</option>
              <option value="Bashundhara Block-I Luxury Heights">Bashundhara Block-I Luxury Heights</option>
              <option value="Gulshan Avenue Commercial Plaza">Gulshan Avenue Commercial Plaza</option>
              <option value="Uttara Model Town Sector 11 Plot">Uttara Model Town Sector 11 Plot</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Plot Facing / Type</label>
            <select
              value={formData.facingPreference}
              onChange={(e) => setFormData({ ...formData, facingPreference: e.target.value as Lead['facingPreference'] })}
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
            >
              <option value="South">South Facing (High Demand)</option>
              <option value="North">North Facing</option>
              <option value="East">East Facing</option>
              <option value="West">West Facing</option>
              <option value="Corner">Corner Plot (Premium)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
            <select
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Follow Up">Follow Up</option>
              <option value="Enrolled">Enrolled / Approved</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Lead Source</label>
            <select
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value as Lead['source'] })}
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
            >
              <option value="Facebook">Facebook Campaign</option>
              <option value="WhatsApp">WhatsApp Direct</option>
              <option value="Youtube">Youtube Video Ad</option>
              <option value="Portal">Property Portal Inbound</option>
              <option value="Email">Email Outreach</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Assigned Counselor / Salesman</label>
            <select
              value={formData.assignedSalesman}
              onChange={(e) => setFormData({ ...formData, assignedSalesman: e.target.value })}
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
            >
              <option value="Siddique Rahman">Siddique Rahman (Sr. Property Advisor)</option>
              <option value="Md. Rahim Sarder">Md. Rahim Sarder (Sr. Real Estate Exec)</option>
              <option value="Md. Karim Shah">Md. Karim Shah (Senior Councilor)</option>
              <option value="Nazma Begum">Nazma Begum (Commercial Lead)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Branch</label>
            <select
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
            >
              <option value="Dhaka Main">Dhaka Main Corporate Office</option>
              <option value="Uttara Branch">Uttara Regional Branch</option>
              <option value="Chittagong Branch">Chittagong Branch</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1">Notes</label>
            <textarea
              rows={3}
              placeholder="Enter activity or lead details notes..."
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-gray-400 shadow-2xs"
            />
          </div>
        </div>

        {/* Action Buttons matching PDF Pages 2, 9, 10, 12, 16, 17 */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-md transition-colors shadow-2xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-xs font-bold text-white rounded-md shadow-sm hover:opacity-90 transition-opacity flex items-center gap-1.5"
            style={{ backgroundColor: '#D4AF37' }}
          >
            <Save size={14} />
            <span>Add CRM Lead</span>
          </button>
        </div>
      </form>
    </div>
  );
};

