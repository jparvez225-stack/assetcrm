import React, { useState } from 'react';
import { Lead, LEAD_STATUS_LIST } from '../types';
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
  editingLead?: Lead | null;
  onUpdateLead?: (lead: Lead) => void;
}

export const AddLeadView: React.FC<AddLeadViewProps> = ({ 
  onBack, 
  onAddLead, 
  editingLead, 
  onUpdateLead 
}) => {
  const [formData, setFormData] = useState({
    name: editingLead?.name || '',
    phone: editingLead?.phone || '',
    email: editingLead?.email || '',
    occupation: editingLead?.occupation || '',
    nid: editingLead?.nid || '',
    address: editingLead?.address || '',
    projectName: editingLead?.projectName || 'Purbachal Green Valley Project',
    requiredPlotSize: editingLead?.requiredPlotSize || '5 Katha',
    facingPreference: editingLead?.facingPreference || ('South' as Lead['facingPreference']),
    budgetLimit: editingLead?.budgetLimit || '৳ 1.5 Crore',
    assignedSalesman: editingLead?.assignedSalesman || 'Siddique Rahman',
    source: editingLead?.source || ('Facebook' as Lead['source']),
    status: editingLead?.status || 'New Lead',
    note: editingLead?.note || '',
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in Client Name and Phone Number');
      return;
    }

    if (editingLead && onUpdateLead) {
      const updatedLead: Lead = {
        ...editingLead,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        occupation: formData.occupation,
        nid: formData.nid,
        address: formData.address,
        projectName: formData.projectName,
        requiredPlotSize: formData.requiredPlotSize,
        facingPreference: formData.facingPreference,
        budgetLimit: formData.budgetLimit,
        assignedSalesman: formData.assignedSalesman,
        source: formData.source,
        status: formData.status as Lead['status'],
        note: formData.note,
      };
      onUpdateLead(updatedLead);
      setNotification('Lead details updated successfully!');
      setTimeout(() => {
        onBack();
      }, 1000);
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
      status: formData.status as Lead['status'],
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
    <div className="space-y-5 max-w-full font-sans">
      {notification && (
        <div className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md animate-pulse text-center">
          {notification}
        </div>
      )}

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
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Lead['status'] })}
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs font-medium"
            >
              {LEAD_STATUS_LIST.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
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
            <label className="block text-xs font-semibold text-gray-700 mb-1">Assigned Salesman</label>
            <select
              value={formData.assignedSalesman}
              onChange={(e) => setFormData({ ...formData, assignedSalesman: e.target.value })}
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
            >
              <option value="Siddique Rahman">Siddique Rahman (Sr. Property Advisor)</option>
              <option value="Md. Rahim Sarder">Md. Rahim Sarder (Sr. Real Estate Exec)</option>
              <option value="Md. Karim Shah">Md. Karim Shah (Senior Salesman)</option>
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
            style={{ backgroundColor: '#c7a259' }}
          >
            <Save size={14} />
            <span>{editingLead ? 'Update Lead Details' : 'Add CRM Lead'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

