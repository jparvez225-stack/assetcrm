import React, { useState } from 'react';
import { Lead, LEAD_STATUS_LIST, ReferralItem } from '../types';
import { initialReferrals } from '../mockData';
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
  Calendar,
  Share2,
  CheckCircle2,
  X
} from 'lucide-react';

interface AddLeadViewProps {
  onBack: () => void;
  onAddLead: (lead: Lead) => void;
  editingLead?: Lead | null;
  onUpdateLead?: (lead: Lead) => void;
  referrals?: ReferralItem[];
}

export const AddLeadView: React.FC<AddLeadViewProps> = ({ 
  onBack, 
  onAddLead, 
  editingLead, 
  onUpdateLead,
  referrals = initialReferrals
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
    referralId: editingLead?.referralId || '',
    referralName: editingLead?.referralName || '',
    referralPhone: editingLead?.referralPhone || '',
    referralType: editingLead?.referralType || '',
    customReferralName: '',
    status: editingLead?.status || 'New Lead',
    note: editingLead?.note || '',
  });

  const [isCustomReferral, setIsCustomReferral] = useState(
    Boolean(editingLead?.referralName && !referrals.some(r => r.id === editingLead?.referralId))
  );

  const [notification, setNotification] = useState<string | null>(null);

  const selectedReferralObj = referrals.find(r => r.id === formData.referralId);

  const handleReferralChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'CUSTOM') {
      setIsCustomReferral(true);
      setFormData(prev => ({
        ...prev,
        referralId: 'custom',
        referralName: prev.customReferralName || '',
        referralPhone: '',
        referralType: 'External Partner',
        source: prev.source === 'Facebook' ? 'Referral' : prev.source
      }));
    } else if (value === '') {
      setIsCustomReferral(false);
      setFormData(prev => ({
        ...prev,
        referralId: '',
        referralName: '',
        referralPhone: '',
        referralType: '',
        customReferralName: ''
      }));
    } else {
      setIsCustomReferral(false);
      const found = referrals.find(r => r.id === value);
      if (found) {
        setFormData(prev => ({
          ...prev,
          referralId: found.id,
          referralName: found.name,
          referralPhone: found.phone,
          referralType: found.referralType,
          source: 'Referral'
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in Client Name and Phone Number');
      return;
    }

    const finalReferralName = isCustomReferral 
      ? formData.customReferralName.trim() 
      : formData.referralName;

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
        referralId: formData.referralId || undefined,
        referralName: finalReferralName || undefined,
        referralPhone: formData.referralPhone || undefined,
        referralType: formData.referralType || undefined,
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
      referralId: formData.referralId || undefined,
      referralName: finalReferralName || undefined,
      referralPhone: formData.referralPhone || undefined,
      referralType: formData.referralType || undefined,
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
              onChange={(e) => {
                const newSource = e.target.value as Lead['source'];
                setFormData({ ...formData, source: newSource });
              }}
              className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
            >
              <option value="Facebook">Facebook Campaign</option>
              <option value="WhatsApp">WhatsApp Direct</option>
              <option value="Youtube">Youtube Video Ad</option>
              <option value="Portal">Property Portal Inbound</option>
              <option value="Email">Email Outreach</option>
              <option value="Referral">Referral Partner / Agent</option>
              <option value="Direct">Direct Walk-in</option>
            </select>
          </div>

          {/* REFERRAL SELECT OPTION */}
          <div className="md:col-span-2 bg-amber-50/40 p-4 rounded-xl border border-amber-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold text-amber-950">
                <Share2 size={15} className="text-amber-600" />
                <span>Referral Partner / Agent (Select Option)</span>
                <span className="text-[10px] font-normal text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">
                  Affiliate & Referral Network
                </span>
              </label>
              {(formData.referralId || formData.referralName) && (
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomReferral(false);
                    setFormData(prev => ({
                      ...prev,
                      referralId: '',
                      referralName: '',
                      referralPhone: '',
                      referralType: '',
                      customReferralName: ''
                    }));
                  }}
                  className="text-[11px] font-semibold text-amber-800 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <X size={12} />
                  <span>Remove Referral</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <select
                  value={isCustomReferral ? 'CUSTOM' : (formData.referralId || '')}
                  onChange={handleReferralChange}
                  className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-amber-300/80 rounded-md focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs font-medium"
                >
                  <option value="">-- No Referral (Direct / Self) --</option>
                  <optgroup label="Registered Referral Partners & Agents">
                    {referrals.map((ref) => (
                      <option key={ref.id} value={ref.id}>
                        {ref.name} — {ref.referralType} ({ref.phone}) [{ref.branch}]
                      </option>
                    ))}
                  </optgroup>
                  <option value="CUSTOM">+ Other / Custom Referral Partner</option>
                </select>
              </div>

              {isCustomReferral ? (
                <div>
                  <input
                    type="text"
                    placeholder="Enter referrer name / agent details"
                    value={formData.customReferralName || formData.referralName}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        customReferralName: val,
                        referralName: val,
                        referralType: 'External Partner',
                        source: prev.source === 'Facebook' ? 'Referral' : prev.source
                      }));
                    }}
                    className="w-full px-3 py-2 text-xs text-gray-800 bg-white border border-amber-300 rounded-md focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs placeholder-gray-400"
                  />
                </div>
              ) : selectedReferralObj ? (
                <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-md border border-amber-200 text-xs shadow-2xs">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <div className="truncate">
                    <span className="font-bold text-gray-900">{selectedReferralObj.name}</span>
                    <span className="text-gray-500 text-[11px] ml-1.5">({selectedReferralObj.referralType} • {selectedReferralObj.branch})</span>
                  </div>
                  <span className="ml-auto text-[10px] font-bold text-amber-700 bg-amber-100/60 px-1.5 py-0.5 rounded shrink-0">
                    ৳{selectedReferralObj.commission.toLocaleString()}
                  </span>
                </div>
              ) : (
                <div className="flex items-center text-xs text-gray-500 italic bg-white/60 px-3 py-2 rounded-md border border-dashed border-gray-200">
                  Select a registered partner from dropdown or click "+ Other"
                </div>
              )}
            </div>
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


