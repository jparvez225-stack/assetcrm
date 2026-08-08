import React, { useState, useEffect } from 'react';
import { 
  WalletCards, 
  Plus, 
  Search, 
  ChevronDown, 
  Eye, 
  CheckCircle2, 
  FileText, 
  Download, 
  Clock, 
  AlertCircle, 
  X, 
  ShieldCheck,
  BookmarkPlus
} from 'lucide-react';
import { AccountsProjectBookingItem } from '../types';

interface AccountsAllProjectsViewProps {
  autoOpenBookModal?: boolean;
  initialBookingData?: {
    projectName?: string;
    unitDetails?: string;
  };
  onCloseAutoBookModal?: () => void;
}

export const AccountsAllProjectsView: React.FC<AccountsAllProjectsViewProps> = ({
  autoOpenBookModal,
  initialBookingData,
  onCloseAutoBookModal
}) => {
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('All Projects');
  const [selectedBranchFilter, setSelectedBranchFilter] = useState('All Branches');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeActionRowId, setActiveActionRowId] = useState<string | null>(null);

  // Modals & Toasts
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isBookUnitModalOpen, setIsBookUnitModalOpen] = useState(false);
  const [receiptItem, setReceiptItem] = useState<AccountsProjectBookingItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Accounts Ledger Data
  const [accountsItems, setAccountsItems] = useState<AccountsProjectBookingItem[]>([
    {
      id: 'acc_1',
      sl: '01',
      projectName: 'Purbachal Green Valley Project',
      location: 'Sector 22, Purbachal, Dhaka',
      customerName: 'Jitu Guha',
      customerPhone: '+880 1711-223344',
      customerEmail: 'jitu@example.com',
      unitDetails: 'Plot A-102 • 5 Katha • South Facing',
      bookingDate: '05 Aug, 2026',
      sellingPrice: '৳ 1,20,00,000',
      commission: '৳ 6,00,000',
      profit: '৳ 35,00,000',
      status: 'Commission Paid',
      branch: 'Dhaka HO',
      salesman: 'Siddique Rahman'
    },
    {
      id: 'acc_2',
      sl: '02',
      projectName: 'Purbachal Green Valley Project',
      location: 'Sector 22, Purbachal, Dhaka',
      customerName: 'Tanvir Ahmed',
      customerPhone: '+880 1819-556677',
      customerEmail: 'tanvir@gmail.com',
      unitDetails: 'Plot B-110 • 3 Katha • East Facing',
      bookingDate: '04 Aug, 2026',
      sellingPrice: '৳ 75,00,000',
      commission: '৳ 3,75,000',
      profit: '৳ 22,50,000',
      status: 'Pending',
      branch: 'Dhaka HO',
      salesman: 'Mehesum Rahman'
    },
    {
      id: 'acc_3',
      sl: '03',
      projectName: 'Bashundhara Enclave Villa & Suites',
      location: 'Block I, Bashundhara R/A, Dhaka',
      customerName: 'Mahfuzur Rahman',
      customerPhone: '+880 1912-998877',
      customerEmail: 'mahfuz@gmail.com',
      unitDetails: 'Flat 4B • 2400 SQFT • South-East',
      bookingDate: '03 Aug, 2026',
      sellingPrice: '৳ 2,50,00,000',
      commission: '৳ 12,50,000',
      profit: '৳ 65,00,000',
      status: 'Commission Paid',
      branch: 'Dhaka HO',
      salesman: 'Karim Ullah'
    },
    {
      id: 'acc_4',
      sl: '04',
      projectName: 'Dhanmondi Horizon Luxury Tower',
      location: 'Road 27, Dhanmondi, Dhaka',
      customerName: 'Nusrat Jahan',
      customerPhone: '+880 1678-112233',
      customerEmail: 'nusrat@yahoo.com',
      unitDetails: 'Suite 101 • 1800 SQFT • Corner',
      bookingDate: '02 Aug, 2026',
      sellingPrice: '৳ 3,10,00,000',
      commission: '৳ 15,50,000',
      profit: '৳ 88,00,000',
      status: 'Pending',
      branch: 'Dhanmondi Branch',
      salesman: 'Rakibul Islam'
    },
    {
      id: 'acc_5',
      sl: '05',
      projectName: 'Purbachal Green Valley Project',
      location: 'Sector 22, Purbachal, Dhaka',
      customerName: 'Farhan Kabir',
      customerPhone: '+880 1552-443322',
      customerEmail: 'farhan@outlook.com',
      unitDetails: 'Plot C-205 • 5 Katha • Corner',
      bookingDate: '01 Aug, 2026',
      sellingPrice: '৳ 1,35,00,000',
      commission: '৳ 6,75,000',
      profit: '৳ 38,50,000',
      status: 'On Hold',
      branch: 'Dhaka HO',
      salesman: 'Siddique Rahman'
    },
    {
      id: 'acc_6',
      sl: '06',
      projectName: 'Chittagong Hillside Valley',
      location: 'Panchlaish, Chittagong',
      customerName: 'Kazi Anik',
      customerPhone: '+880 1311-889900',
      customerEmail: 'kazi.anik@chittagong.bd',
      unitDetails: 'Plot H-50 • 10 Katha • North Facing',
      bookingDate: '28 Jul, 2026',
      sellingPrice: '৳ 2,10,00,000',
      commission: '৳ 10,50,000',
      profit: '৳ 55,00,000',
      status: 'Commission Paid',
      branch: 'Chittagong Branch',
      salesman: 'Mehesum Rahman'
    }
  ]);

  // Form states
  const [newBooking, setNewBooking] = useState({
    projectName: 'Purbachal Green Valley Project',
    location: 'Sector 22, Purbachal, Dhaka',
    customerName: '',
    customerPhone: '',
    unitDetails: 'Plot D-105 • 5 Katha',
    sellingPrice: '৳ 1,20,00,000',
    commission: '৳ 6,00,000',
    profit: '৳ 35,00,000',
    branch: 'Dhaka HO',
    salesman: 'Jahid Parvez'
  });

  useEffect(() => {
    if (autoOpenBookModal) {
      setIsBookUnitModalOpen(true);
      if (initialBookingData) {
        setNewBooking(prev => ({
          ...prev,
          projectName: initialBookingData.projectName || prev.projectName,
          unitDetails: initialBookingData.unitDetails || prev.unitDetails
        }));
      }
    }
  }, [autoOpenBookModal, initialBookingData]);

  const closeBookUnitModal = () => {
    setIsBookUnitModalOpen(false);
    if (onCloseAutoBookModal) {
      onCloseAutoBookModal();
    }
  };

  const [newProjectForm, setNewProjectForm] = useState({
    projectName: '',
    location: '',
    branch: 'Dhaka HO'
  });

  const handleBookUnitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.customerName.trim()) return;

    const newItem: AccountsProjectBookingItem = {
      id: `acc_${Date.now()}`,
      sl: String(accountsItems.length + 1).padStart(2, '0'),
      projectName: newBooking.projectName,
      location: newBooking.location,
      customerName: newBooking.customerName,
      customerPhone: newBooking.customerPhone || '+880 1700-000000',
      unitDetails: newBooking.unitDetails,
      bookingDate: '07 Aug, 2026',
      sellingPrice: newBooking.sellingPrice,
      commission: newBooking.commission,
      profit: newBooking.profit,
      status: 'Pending',
      branch: newBooking.branch,
      salesman: newBooking.salesman
    };

    setAccountsItems([newItem, ...accountsItems]);
    closeBookUnitModal();
    setToastMessage(`New booking successfully registered for ${newBooking.customerName}!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectForm.projectName.trim()) return;

    setIsAddProjectModalOpen(false);
    setToastMessage(`New Project "${newProjectForm.projectName}" added to Accounts system!`);
    setTimeout(() => setToastMessage(null), 3500);
    setNewProjectForm({ projectName: '', location: '', branch: 'Dhaka HO' });
  };

  const handlePayCommission = (id: string, salesman: string) => {
    setAccountsItems(prev => prev.map(item => item.id === id ? { ...item, status: 'Commission Paid' } : item));
    setActiveActionRowId(null);
    setToastMessage(`Commission marked as PAID for ${salesman}`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredItems = accountsItems.filter((item) => {
    const matchesProject = selectedProjectFilter === 'All Projects' || item.projectName === selectedProjectFilter;
    const matchesBranch = selectedBranchFilter === 'All Branches' || item.branch === selectedBranchFilter;
    const matchesStatus = selectedStatusFilter === 'All' || item.status === selectedStatusFilter;
    const matchesQuery = searchQuery === '' ||
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerPhone.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesProject && matchesBranch && matchesStatus && matchesQuery;
  });

  return (
    <div className="space-y-5 font-sans pb-10">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-amber-500 animate-bounce text-xs font-bold">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter Section */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by project, location, customer name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-medium"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedProjectFilter}
            onChange={(e) => setSelectedProjectFilter(e.target.value)}
            className="text-xs font-bold bg-gray-100/80 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All Projects">Select Project</option>
            <option value="Purbachal Green Valley Project">Purbachal Green Valley Project</option>
            <option value="Bashundhara Enclave Villa & Suites">Bashundhara Enclave Villa</option>
            <option value="Dhanmondi Horizon Luxury Tower">Dhanmondi Horizon Luxury Tower</option>
            <option value="Chittagong Hillside Valley">Chittagong Hillside Valley</option>
          </select>

          <select
            value={selectedBranchFilter}
            onChange={(e) => setSelectedBranchFilter(e.target.value)}
            className="text-xs font-bold bg-gray-100/80 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All Branches">Select Branch</option>
            <option value="Dhaka HO">Dhaka HO</option>
            <option value="Dhanmondi Branch">Dhanmondi Branch</option>
            <option value="Chittagong Branch">Chittagong Branch</option>
          </select>

          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="text-xs font-bold bg-gray-100/80 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Statuses</option>
            <option value="Commission Paid">Commission Paid</option>
            <option value="Pending">Pending</option>
            <option value="On Hold">On Hold</option>
          </select>

          <div className="h-5 w-px bg-gray-200 mx-1 hidden sm:block" />

          {/* Action Buttons */}
          <button
            onClick={() => setIsBookUnitModalOpen(true)}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <BookmarkPlus size={15} />
            <span>Book Unit</span>
          </button>

          <button
            onClick={() => setIsAddProjectModalOpen(true)}
            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* ACCOUNTS TABLE WITH EXACT REQUESTED COLUMNS:
          1. Project Name
          2. Location
          3. Customer Details
          4. Book Date
          5. Selling Price
          6. Commission
          7. Profit
          8. Status
          9. Action */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 font-extrabold uppercase tracking-wider text-[10px] border-b border-gray-200">
                <th className="py-3 px-4">PROJECT NAME</th>
                <th className="py-3 px-4">LOCATION</th>
                <th className="py-3 px-4">CUSTOMER DETAILS</th>
                <th className="py-3 px-4 whitespace-nowrap">BOOK DATE</th>
                <th className="py-3 px-4 font-mono">SELLING PRICE</th>
                <th className="py-3 px-4 font-mono">COMMISSION (5%)</th>
                <th className="py-3 px-4 font-mono">PROFIT</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-xs">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-50/20 transition-colors">
                    
                    {/* 1. Project Name */}
                    <td className="py-3.5 px-4 min-w-[200px]">
                      <p className="font-extrabold text-gray-900 leading-snug">{item.projectName}</p>
                      <p className="text-[10px] text-amber-600 font-semibold mt-0.5">{item.unitDetails}</p>
                    </td>

                    {/* 2. Location */}
                    <td className="py-3.5 px-4 text-gray-600 min-w-[160px]">
                      <span className="truncate block font-medium">{item.location}</span>
                      <span className="text-[10px] text-gray-400 font-semibold">{item.branch}</span>
                    </td>

                    {/* 3. Customer Details */}
                    <td className="py-3.5 px-4 min-w-[170px]">
                      <p className="font-bold text-gray-900">{item.customerName}</p>
                      <p className="text-[11px] text-gray-500 font-mono">{item.customerPhone}</p>
                    </td>

                    {/* 4. Book Date */}
                    <td className="py-3.5 px-4 font-mono text-gray-600 whitespace-nowrap">
                      {item.bookingDate}
                    </td>

                    {/* 5. Selling Price */}
                    <td className="py-3.5 px-4 font-extrabold text-gray-900 font-mono whitespace-nowrap">
                      {item.sellingPrice}
                    </td>

                    {/* 6. Commission */}
                    <td className="py-3.5 px-4 font-black text-purple-700 font-mono whitespace-nowrap">
                      {item.commission}
                    </td>

                    {/* 7. Profit */}
                    <td className="py-3.5 px-4 font-black text-emerald-700 font-mono whitespace-nowrap">
                      {item.profit}
                    </td>

                    {/* 8. Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {item.status === 'Commission Paid' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 w-max">
                          <CheckCircle2 size={11} />
                          <span>Commission Paid</span>
                        </span>
                      ) : item.status === 'Pending' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 w-max">
                          <Clock size={11} />
                          <span>Pending</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1 w-max">
                          <AlertCircle size={11} />
                          <span>On Hold</span>
                        </span>
                      )}
                    </td>

                    {/* 9. Action */}
                    <td className="py-3.5 px-4 text-center relative whitespace-nowrap">
                      <button
                        onClick={() => setActiveActionRowId(activeActionRowId === item.id ? null : item.id)}
                        className="py-1 px-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[11px] font-extrabold flex items-center gap-1 shadow-2xs transition-colors mx-auto"
                      >
                        <span>Action</span>
                        <ChevronDown size={12} />
                      </button>

                      {/* Action Dropdown Menu */}
                      {activeActionRowId === item.id && (
                        <div className="absolute right-4 top-11 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-30 py-1 text-xs space-y-0.5 font-medium text-left">
                          <button
                            onClick={() => {
                              setReceiptItem(item);
                              setActiveActionRowId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-amber-50 text-gray-800 flex items-center gap-2"
                          >
                            <Eye size={13} className="text-amber-600" />
                            <span>View Money Receipt</span>
                          </button>

                          {item.status !== 'Commission Paid' && (
                            <button
                              onClick={() => handlePayCommission(item.id, item.salesman)}
                              className="w-full text-left px-3 py-1.5 hover:bg-emerald-50 text-emerald-800 flex items-center gap-2 font-bold"
                            >
                              <CheckCircle2 size={13} className="text-emerald-600" />
                              <span>Pay Commission</span>
                            </button>
                          )}

                          <button
                            onClick={() => {
                              alert(`Generating commercial tax invoice for ${item.customerName}...`);
                              setActiveActionRowId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-gray-100 text-gray-800 flex items-center gap-2"
                          >
                            <FileText size={13} className="text-blue-600" />
                            <span>Generate Invoice</span>
                          </button>

                          <button
                            onClick={() => {
                              alert(`Downloading Sales Agreement PDF...`);
                              setActiveActionRowId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-gray-100 text-gray-800 flex items-center gap-2 border-t border-gray-100 pt-1"
                          >
                            <Download size={13} className="text-gray-500" />
                            <span>Download PDF</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-gray-500">
                    No accounts transactions found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: Book Unit Modal */}
      {isBookUnitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-gray-200 shadow-2xl overflow-hidden">
            <div className="bg-emerald-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookmarkPlus size={18} />
                <h3 className="font-extrabold text-sm">Book New Unit / Plot</h3>
              </div>
              <button 
                onClick={closeBookUnitModal}
                className="p-1 hover:bg-emerald-800 rounded-lg text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleBookUnitSubmit} className="p-5 space-y-3 text-xs">
              <div>
                <label className="font-extrabold text-gray-700 block mb-1">Select Project *</label>
                <select
                  value={newBooking.projectName}
                  onChange={(e) => setNewBooking({ ...newBooking, projectName: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-semibold"
                >
                  <option value="Purbachal Green Valley Project">Purbachal Green Valley Project</option>
                  <option value="Bashundhara Enclave Villa & Suites">Bashundhara Enclave Villa & Suites</option>
                  <option value="Dhanmondi Horizon Luxury Tower">Dhanmondi Horizon Luxury Tower</option>
                  <option value="Chittagong Hillside Valley">Chittagong Hillside Valley</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-extrabold text-gray-700 block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahbubul Alam"
                    value={newBooking.customerName}
                    onChange={(e) => setNewBooking({ ...newBooking, customerName: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-extrabold text-gray-700 block mb-1">Customer Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +880 1712-345678"
                    value={newBooking.customerPhone}
                    onChange={(e) => setNewBooking({ ...newBooking, customerPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-extrabold text-gray-700 block mb-1">Unit / Plot Details</label>
                <input
                  type="text"
                  placeholder="e.g. Plot D-105 • 5 Katha • South Facing"
                  value={newBooking.unitDetails}
                  onChange={(e) => setNewBooking({ ...newBooking, unitDetails: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-extrabold text-gray-700 block mb-1">Selling Price</label>
                  <input
                    type="text"
                    value={newBooking.sellingPrice}
                    onChange={(e) => setNewBooking({ ...newBooking, sellingPrice: e.target.value })}
                    className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="font-extrabold text-gray-700 block mb-1">Commission (5%)</label>
                  <input
                    type="text"
                    value={newBooking.commission}
                    onChange={(e) => setNewBooking({ ...newBooking, commission: e.target.value })}
                    className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="font-extrabold text-gray-700 block mb-1">Profit</label>
                  <input
                    type="text"
                    value={newBooking.profit}
                    onChange={(e) => setNewBooking({ ...newBooking, profit: e.target.value })}
                    className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeBookUnitModal}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Add New Project Modal */}
      {isAddProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-gray-200 shadow-2xl overflow-hidden">
            <div className="bg-amber-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus size={18} />
                <h3 className="font-extrabold text-sm">Add New Project to Accounts</h3>
              </div>
              <button 
                onClick={() => setIsAddProjectModalOpen(false)}
                className="p-1 hover:bg-amber-700 rounded-lg text-white"
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
                  placeholder="e.g. Gulshan Lake Residence Suites"
                  value={newProjectForm.projectName}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, projectName: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-extrabold text-gray-700 block mb-1">Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Road 11, Gulshan 1, Dhaka"
                  value={newProjectForm.location}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, location: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddProjectModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: View Receipt Modal */}
      {receiptItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-gray-200 shadow-2xl overflow-hidden space-y-4">
            <div className="bg-amber-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} />
                <h3 className="font-extrabold text-sm font-mono">Official Money Voucher #{receiptItem.sl}</h3>
              </div>
              <button 
                onClick={() => setReceiptItem(null)}
                className="p-1 hover:bg-amber-700 rounded-lg text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="text-center border-b border-gray-200 pb-3">
                <h2 className="text-base font-black text-gray-900">PROMISE ASSETS LIMITED</h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Real Estate Enterprise Accounts Receipt</p>
                <p className="text-[11px] text-amber-700 font-mono font-bold mt-1">Date: {receiptItem.bookingDate}</p>
              </div>

              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-500">Customer Name:</span>
                  <strong className="text-gray-900 font-bold">{receiptItem.customerName} ({receiptItem.customerPhone})</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Project Name:</span>
                  <strong className="text-amber-800 font-bold">{receiptItem.projectName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <strong className="text-gray-800">{receiptItem.location}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Unit Details:</span>
                  <strong className="text-gray-900">{receiptItem.unitDetails}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Selling Price:</span>
                  <strong className="text-gray-900 font-mono font-bold">{receiptItem.sellingPrice}</strong>
                </div>
                <div className="flex justify-between bg-purple-50 p-2 rounded-lg border border-purple-100">
                  <span className="text-purple-900 font-bold">Commission (5%):</span>
                  <strong className="text-purple-900 font-mono font-extrabold">{receiptItem.commission}</strong>
                </div>
                <div className="flex justify-between bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                  <span className="text-emerald-900 font-bold">Net Company Profit:</span>
                  <strong className="text-emerald-900 font-mono font-extrabold">{receiptItem.profit}</strong>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">Authorized by SA Super Admin</span>
              <button
                onClick={() => {
                  alert(`Printing receipt for ${receiptItem.customerName}...`);
                  setReceiptItem(null);
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-2xs"
              >
                <Download size={14} />
                <span>Print Voucher</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
