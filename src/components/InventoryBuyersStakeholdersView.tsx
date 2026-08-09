import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
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
  Phone, 
  Mail, 
  FileText, 
  DollarSign, 
  Briefcase, 
  Tag, 
  Wallet,
  ShieldCheck,
  TrendingUp,
  MapPin,
  ArrowLeft,
  Plus,
  Calendar,
  CreditCard,
  Receipt,
  Share2,
  PieChart
} from 'lucide-react';
import { BuyerStakeholderItem, BuyerProjectPurchase, BuyerPaymentRecord } from '../types';

export const InventoryBuyersStakeholdersView: React.FC = () => {
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<string>('All');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItemForDetails, setSelectedItemForDetails] = useState<BuyerStakeholderItem | null>(null);
  const [editingItem, setEditingItem] = useState<BuyerStakeholderItem | null>(null);

  // Dedicated Buyer History Full Page View State
  const [viewingBuyerHistory, setViewingBuyerHistory] = useState<BuyerStakeholderItem | null>(null);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isRecordPaymentModalOpen, setIsRecordPaymentModalOpen] = useState(false);

  // New Project Form Data (within Buyer History)
  const [newProjectData, setNewProjectData] = useState({
    projectName: 'Purbachal Green Valley Project',
    unitOrPlotNo: '',
    sharesOrSize: '',
    type: 'Unit Buyer' as BuyerStakeholderItem['type'],
    totalAmount: '',
    paidAmount: '',
    purchaseDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: 'Confirmed' as 'Confirmed' | 'Token Paid'
  });

  // Record Payment Form Data (within Buyer History)
  const [newPaymentData, setNewPaymentData] = useState({
    projectName: '',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    voucherNo: `VCH-${Math.floor(100000 + Math.random() * 900000)}`,
    purpose: 'Installment Payment',
    method: 'Bank Transfer',
    amount: ''
  });

  // Form State (Main Add / Edit Stakeholder)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    nid: '',
    type: 'Unit Buyer' as BuyerStakeholderItem['type'],
    projectName: 'Purbachal Green Valley Project',
    unitOrPlotNo: '',
    sharesOrSize: '',
    totalAmount: '',
    paidAmount: '',
    status: 'Confirmed' as BuyerStakeholderItem['status'],
    address: ''
  });

  // Initial Mock Buyers & Stakeholders Data with Multi-Project History
  const [items, setItems] = useState<BuyerStakeholderItem[]>([
    {
      id: 'bs_1',
      name: 'Engr. Shahadat Hossain',
      phone: '+880 1711-234567',
      email: 'shahadat.engr@gmail.com',
      nid: '198426918239102',
      type: 'Unit Buyer',
      projectName: 'Purbachal Green Valley Project',
      unitOrPlotNo: 'Plot A-102',
      sharesOrSize: '5 Katha',
      totalAmount: '৳ 1,20,00,000',
      paidAmount: '৳ 85,00,000',
      dueAmount: '৳ 35,00,000',
      joiningDate: '12 Jan, 2025',
      status: 'Confirmed',
      address: 'House 42, Road 11, Banani, Dhaka',
      projectPurchases: [
        {
          id: 'pp_1',
          projectName: 'Purbachal Green Valley Project',
          unitOrPlotNo: 'Plot A-102',
          sharesOrSize: '5 Katha',
          type: 'Unit Buyer',
          totalAmount: '৳ 1,20,00,000',
          paidAmount: '৳ 85,00,000',
          dueAmount: '৳ 35,00,000',
          purchaseDate: '12 Jan, 2025',
          status: 'Confirmed'
        },
        {
          id: 'pp_2',
          projectName: 'Promise Heights Commercial',
          unitOrPlotNo: 'Flat 3F-02',
          sharesOrSize: '850 SQFT',
          type: 'Unit Buyer',
          totalAmount: '৳ 75,00,000',
          paidAmount: '৳ 75,00,000',
          dueAmount: '৳ 0',
          purchaseDate: '15 Mar, 2025',
          status: 'Handover Completed'
        }
      ],
      paymentHistory: [
        {
          id: 'pay_1',
          date: '12 Jan, 2025',
          voucherNo: 'VCH-88210',
          projectName: 'Purbachal Green Valley Project',
          purpose: 'Booking Token Money',
          method: 'Bank Transfer',
          amount: '৳ 20,00,000',
          status: 'Verified'
        },
        {
          id: 'pay_2',
          date: '02 Feb, 2025',
          voucherNo: 'VCH-88342',
          projectName: 'Purbachal Green Valley Project',
          purpose: '1st Land Installment',
          method: 'Cheque',
          amount: '৳ 65,00,000',
          status: 'Verified'
        },
        {
          id: 'pay_3',
          date: '15 Mar, 2025',
          voucherNo: 'VCH-89102',
          projectName: 'Promise Heights Commercial',
          purpose: 'Full Unit Payment Clearance',
          method: 'Bank Transfer',
          amount: '৳ 75,00,000',
          status: 'Verified'
        }
      ]
    },
    {
      id: 'bs_2',
      name: 'Tanvir Ahmed Siddique',
      phone: '+880 1819-887766',
      email: 'tanvir.siddique@yahoo.com',
      nid: '197926198273111',
      type: 'Project Shareholder',
      projectName: 'Purbachal Green Valley Project',
      unitOrPlotNo: 'Share Pool #4',
      sharesOrSize: '10 Shares',
      totalAmount: '৳ 2,50,00,000',
      paidAmount: '৳ 2,50,00,000',
      dueAmount: '৳ 0',
      joiningDate: '05 Feb, 2025',
      status: 'Confirmed',
      address: 'Flat 6A, Promise Tower, Dhanmondi, Dhaka',
      projectPurchases: [
        {
          id: 'pp_3',
          projectName: 'Purbachal Green Valley Project',
          unitOrPlotNo: 'Share Pool #4',
          sharesOrSize: '10 Shares',
          type: 'Project Shareholder',
          totalAmount: '৳ 2,50,00,000',
          paidAmount: '৳ 2,50,00,000',
          dueAmount: '৳ 0',
          purchaseDate: '05 Feb, 2025',
          status: 'Confirmed'
        },
        {
          id: 'pp_4',
          projectName: 'Modhumoti Model Town',
          unitOrPlotNo: 'Plot C-40',
          sharesOrSize: '10 Katha',
          type: 'Investor',
          totalAmount: '৳ 1,50,00,000',
          paidAmount: '৳ 1,00,00,000',
          dueAmount: '৳ 50,00,000',
          purchaseDate: '10 Apr, 2025',
          status: 'Confirmed'
        }
      ],
      paymentHistory: [
        {
          id: 'pay_4',
          date: '05 Feb, 2025',
          voucherNo: 'VCH-77210',
          projectName: 'Purbachal Green Valley Project',
          purpose: 'Equity Share Purchase',
          method: 'Bank Transfer',
          amount: '৳ 2,50,00,000',
          status: 'Verified'
        },
        {
          id: 'pay_5',
          date: '10 Apr, 2025',
          voucherNo: 'VCH-78105',
          projectName: 'Modhumoti Model Town',
          purpose: 'Plot Booking & 1st Installment',
          method: 'Bank Transfer',
          amount: '৳ 1,00,00,000',
          status: 'Verified'
        }
      ]
    },
    {
      id: 'bs_3',
      name: 'Mrs. Rafia Begum',
      phone: '+880 1912-334455',
      email: 'rafia.begum@hotmail.com',
      nid: '196826190283722',
      type: 'Unit Buyer',
      projectName: 'Promise Heights Commercial',
      unitOrPlotNo: 'Flat 4B',
      sharesOrSize: '1,850 SQFT',
      totalAmount: '৳ 1,45,00,000',
      paidAmount: '৳ 45,00,000',
      dueAmount: '৳ 1,00,00,000',
      joiningDate: '20 Mar, 2025',
      status: 'Token Paid',
      address: 'Sector 4, Uttara, Dhaka'
    },
    {
      id: 'bs_4',
      name: 'Dr. Mahbubur Rahman',
      phone: '+880 1730-998877',
      email: 'dr.mahbub@squarehospital.org',
      nid: '197226182930122',
      type: 'Joint Venture Partner',
      projectName: 'Modhumoti Model Town',
      unitOrPlotNo: 'Block C Joint Land',
      sharesOrSize: '15 Katha Land Share',
      totalAmount: '৳ 4,00,00,000',
      paidAmount: '৳ 3,00,00,000',
      dueAmount: '৳ 1,00,00,000',
      joiningDate: '10 Apr, 2025',
      status: 'Confirmed',
      address: 'Lake Drive, Gulshan 2, Dhaka'
    },
    {
      id: 'bs_5',
      name: 'Kazi Farhan Ishrak',
      phone: '+880 1678-112233',
      email: 'farhan.ishrak@techcorp.bd',
      nid: '199226198273944',
      type: 'Investor',
      projectName: 'Uttara Model Town Phase 3',
      unitOrPlotNo: 'Pool Investment #A',
      sharesOrSize: '2 Units Equity',
      totalAmount: '৳ 80,00,000',
      paidAmount: '৳ 20,00,000',
      dueAmount: '৳ 60,00,000',
      joiningDate: '02 May, 2025',
      status: 'Pending Verification',
      address: 'Mirpur DOHS, Road 4, Dhaka'
    },
    {
      id: 'bs_6',
      name: 'Kamrul Hassan Choudhury',
      phone: '+880 1552-667788',
      email: 'kamrul.choudhury@gmail.com',
      nid: '198126102938477',
      type: 'Unit Buyer',
      projectName: 'Mirpur Lake City Tower',
      unitOrPlotNo: 'Flat 8A',
      sharesOrSize: '1,650 SQFT',
      totalAmount: '৳ 1,15,00,000',
      paidAmount: '৳ 70,00,000',
      dueAmount: '৳ 45,00,000',
      joiningDate: '18 May, 2025',
      status: 'Confirmed',
      address: 'Section 10, Mirpur, Dhaka'
    }
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, selectedStatus, selectedProject]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Helper function to extract or construct project purchases for a buyer
  const getBuyerPurchases = (buyer: BuyerStakeholderItem): BuyerProjectPurchase[] => {
    if (buyer.projectPurchases && buyer.projectPurchases.length > 0) {
      return buyer.projectPurchases;
    }
    return [{
      id: `proj_init_${buyer.id}`,
      projectName: buyer.projectName,
      unitOrPlotNo: buyer.unitOrPlotNo,
      sharesOrSize: buyer.sharesOrSize,
      type: buyer.type,
      totalAmount: buyer.totalAmount,
      paidAmount: buyer.paidAmount,
      dueAmount: buyer.dueAmount,
      purchaseDate: buyer.joiningDate || '12 Jan, 2025',
      status: buyer.status === 'Confirmed' ? 'Confirmed' : 'Token Paid'
    }];
  };

  // Helper function to extract or construct payment history logs for a buyer
  const getBuyerPayments = (buyer: BuyerStakeholderItem): BuyerPaymentRecord[] => {
    if (buyer.paymentHistory && buyer.paymentHistory.length > 0) {
      return buyer.paymentHistory;
    }
    return [
      {
        id: `pay_1_${buyer.id}`,
        date: buyer.joiningDate || '12 Jan, 2025',
        voucherNo: 'VCH-10821',
        projectName: buyer.projectName,
        purpose: 'Booking Token Money',
        method: 'Bank Transfer',
        amount: '৳ 15,00,000',
        status: 'Verified'
      },
      {
        id: `pay_2_${buyer.id}`,
        date: '28 Feb, 2025',
        voucherNo: 'VCH-10944',
        projectName: buyer.projectName,
        purpose: '1st Installment Clearance',
        method: 'Cheque',
        amount: buyer.paidAmount,
        status: 'Verified'
      }
    ];
  };

  // Handle Form Submission (Add or Edit Stakeholder in main table)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please fill in the buyer name and phone number.');
      return;
    }

    const totalValNum = parseFloat(formData.totalAmount.replace(/[^0-9.]/g, '')) || 0;
    const paidValNum = parseFloat(formData.paidAmount.replace(/[^0-9.]/g, '')) || 0;
    const dueValNum = Math.max(0, totalValNum - paidValNum);

    const formattedTotal = formData.totalAmount.startsWith('৳') ? formData.totalAmount : `৳ ${formData.totalAmount || '0'}`;
    const formattedPaid = formData.paidAmount.startsWith('৳') ? formData.paidAmount : `৳ ${formData.paidAmount || '0'}`;
    const formattedDue = `৳ ${dueValNum.toLocaleString('en-IN')}`;

    if (editingItem) {
      // Update
      setItems(prev => prev.map(item => item.id === editingItem.id ? {
        ...item,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        nid: formData.nid,
        type: formData.type,
        projectName: formData.projectName,
        unitOrPlotNo: formData.unitOrPlotNo || 'N/A',
        sharesOrSize: formData.sharesOrSize || 'N/A',
        totalAmount: formattedTotal,
        paidAmount: formattedPaid,
        dueAmount: formattedDue,
        status: formData.status,
        address: formData.address
      } : item));
      showToast('Buyer / Stakeholder information updated successfully!');
    } else {
      // Add New
      const newItem: BuyerStakeholderItem = {
        id: `bs_${Date.now()}`,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        nid: formData.nid,
        type: formData.type,
        projectName: formData.projectName,
        unitOrPlotNo: formData.unitOrPlotNo || 'N/A',
        sharesOrSize: formData.sharesOrSize || 'N/A',
        totalAmount: formattedTotal,
        paidAmount: formattedPaid,
        dueAmount: formattedDue,
        joiningDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: formData.status,
        address: formData.address,
        projectPurchases: [{
          id: `pp_${Date.now()}`,
          projectName: formData.projectName,
          unitOrPlotNo: formData.unitOrPlotNo || 'N/A',
          sharesOrSize: formData.sharesOrSize || 'N/A',
          type: formData.type,
          totalAmount: formattedTotal,
          paidAmount: formattedPaid,
          dueAmount: formattedDue,
          purchaseDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          status: formData.status === 'Confirmed' ? 'Confirmed' : 'Token Paid'
        }]
      };
      setItems(prev => [newItem, ...prev]);
      showToast('New buyer / stakeholder registered successfully!');
    }

    setIsAddModalOpen(false);
    setEditingItem(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      nid: '',
      type: 'Unit Buyer',
      projectName: 'Purbachal Green Valley Project',
      unitOrPlotNo: '',
      sharesOrSize: '',
      totalAmount: '',
      paidAmount: '',
      status: 'Confirmed',
      address: ''
    });
  };

  const openEditModal = (item: BuyerStakeholderItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      phone: item.phone,
      email: item.email || '',
      nid: item.nid || '',
      type: item.type,
      projectName: item.projectName,
      unitOrPlotNo: item.unitOrPlotNo,
      sharesOrSize: item.sharesOrSize,
      totalAmount: item.totalAmount.replace(/[^0-9]/g, ''),
      paidAmount: item.paidAmount.replace(/[^0-9]/g, ''),
      status: item.status,
      address: item.address || ''
    });
    setIsAddModalOpen(true);
  };

  // Add New Project Purchase to Buyer's History
  const handleAddProjectToBuyer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingBuyerHistory) return;
    if (!newProjectData.unitOrPlotNo.trim()) {
      alert('Please enter a Unit or Plot Number.');
      return;
    }

    const totValNum = parseFloat(newProjectData.totalAmount.replace(/[^0-9.]/g, '')) || 0;
    const paidValNum = parseFloat(newProjectData.paidAmount.replace(/[^0-9.]/g, '')) || 0;
    const dueValNum = Math.max(0, totValNum - paidValNum);

    const formattedTot = newProjectData.totalAmount.startsWith('৳') ? newProjectData.totalAmount : `৳ ${newProjectData.totalAmount || '0'}`;
    const formattedPaid = newProjectData.paidAmount.startsWith('৳') ? newProjectData.paidAmount : `৳ ${newProjectData.paidAmount || '0'}`;
    const formattedDue = `৳ ${dueValNum.toLocaleString('en-IN')}`;

    const newProjPurchase: BuyerProjectPurchase = {
      id: `pp_${Date.now()}`,
      projectName: newProjectData.projectName,
      unitOrPlotNo: newProjectData.unitOrPlotNo,
      sharesOrSize: newProjectData.sharesOrSize || 'N/A',
      type: newProjectData.type,
      totalAmount: formattedTot,
      paidAmount: formattedPaid,
      dueAmount: formattedDue,
      purchaseDate: newProjectData.purchaseDate || 'Today',
      status: newProjectData.status
    };

    const currentPurchases = getBuyerPurchases(viewingBuyerHistory);
    const updatedPurchases = [...currentPurchases, newProjPurchase];

    const updatedBuyer: BuyerStakeholderItem = {
      ...viewingBuyerHistory,
      projectPurchases: updatedPurchases
    };

    setItems(prev => prev.map(item => item.id === updatedBuyer.id ? updatedBuyer : item));
    setViewingBuyerHistory(updatedBuyer);
    setIsAddProjectModalOpen(false);
    showToast(`Added ${newProjectData.projectName} purchase to ${viewingBuyerHistory.name}'s history!`);

    setNewProjectData({
      projectName: 'Purbachal Green Valley Project',
      unitOrPlotNo: '',
      sharesOrSize: '',
      type: 'Unit Buyer',
      totalAmount: '',
      paidAmount: '',
      purchaseDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Confirmed'
    });
  };

  // Record Payment Voucher for Buyer
  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingBuyerHistory) return;
    if (!newPaymentData.amount.trim()) {
      alert('Please enter payment amount.');
      return;
    }

    const projName = newPaymentData.projectName || viewingBuyerHistory.projectName;
    const formattedAmt = newPaymentData.amount.startsWith('৳') ? newPaymentData.amount : `৳ ${newPaymentData.amount}`;

    const newPayRecord: BuyerPaymentRecord = {
      id: `pay_${Date.now()}`,
      date: newPaymentData.date || 'Today',
      voucherNo: newPaymentData.voucherNo || `VCH-${Math.floor(100000 + Math.random() * 900000)}`,
      projectName: projName,
      purpose: newPaymentData.purpose,
      method: newPaymentData.method,
      amount: formattedAmt,
      status: 'Verified'
    };

    const currentPayments = getBuyerPayments(viewingBuyerHistory);
    const updatedPayments = [newPayRecord, ...currentPayments];

    // Update paid & due amounts on the associated project purchase
    const currentPurchases = getBuyerPurchases(viewingBuyerHistory);
    const addedNum = parseFloat(newPaymentData.amount.replace(/[^0-9.]/g, '')) || 0;

    const updatedPurchases = currentPurchases.map(p => {
      if (p.projectName === projName || currentPurchases.length === 1) {
        const oldPaid = parseFloat(p.paidAmount.replace(/[^0-9.]/g, '')) || 0;
        const totNum = parseFloat(p.totalAmount.replace(/[^0-9.]/g, '')) || 0;
        const newPaid = oldPaid + addedNum;
        const newDue = Math.max(0, totNum - newPaid);
        return {
          ...p,
          paidAmount: `৳ ${newPaid.toLocaleString('en-IN')}`,
          dueAmount: `৳ ${newDue.toLocaleString('en-IN')}`
        };
      }
      return p;
    });

    const updatedBuyer: BuyerStakeholderItem = {
      ...viewingBuyerHistory,
      projectPurchases: updatedPurchases,
      paymentHistory: updatedPayments
    };

    setItems(prev => prev.map(item => item.id === updatedBuyer.id ? updatedBuyer : item));
    setViewingBuyerHistory(updatedBuyer);
    setIsRecordPaymentModalOpen(false);
    showToast(`Recorded ${formattedAmt} payment for ${viewingBuyerHistory.name}!`);

    setNewPaymentData({
      projectName: '',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      voucherNo: `VCH-${Math.floor(100000 + Math.random() * 900000)}`,
      purpose: 'Installment Payment',
      method: 'Bank Transfer',
      amount: ''
    });
  };

  // Filter Items
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.unitOrPlotNo.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    const matchesProject = selectedProject === 'All' || item.projectName === selectedProject;

    return matchesSearch && matchesType && matchesStatus && matchesProject;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredItems.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + pageSize);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isAllOnPageSelected = paginatedItems.length > 0 && paginatedItems.every(i => selectedIds.includes(i.id));

  const toggleSelectAllPage = () => {
    if (isAllOnPageSelected) {
      setSelectedIds(prev => prev.filter(id => !paginatedItems.some(item => item.id === id)));
    } else {
      const currentPageIds = paginatedItems.map(i => i.id);
      setSelectedIds(prev => Array.from(new Set([...prev, ...currentPageIds])));
    }
  };

  // If viewing a specific buyer's full history page
  if (viewingBuyerHistory) {
    const currentPurchases = getBuyerPurchases(viewingBuyerHistory);
    const currentPayments = getBuyerPayments(viewingBuyerHistory);

    let grandTotalValue = 0;
    let grandPaidValue = 0;
    let grandDueValue = 0;

    currentPurchases.forEach(p => {
      const totalNum = parseFloat(p.totalAmount.replace(/[^0-9.]/g, '')) || 0;
      const paidNum = parseFloat(p.paidAmount.replace(/[^0-9.]/g, '')) || 0;
      const dueNum = parseFloat(p.dueAmount.replace(/[^0-9.]/g, '')) || 0;
      grandTotalValue += totalNum;
      grandPaidValue += paidNum;
      grandDueValue += dueNum;
    });

    return (
      <div className="space-y-6 max-w-full font-sans select-none pb-12 animate-in fade-in duration-150">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5 duration-200 border border-gray-700">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Buyer Details Card with Integrated Action CTAs */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
            {/* Left: Buyer Identity */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
                {viewingBuyerHistory.name.split(' ').map(n => n[0]).join('').substring(0,2)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-gray-900 text-lg">{viewingBuyerHistory.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {viewingBuyerHistory.type}
                  </span>
                </div>
                <span className="text-xs font-mono text-gray-400 font-bold">ID: #{viewingBuyerHistory.id}</span>
              </div>
            </div>

            {/* Right: CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setIsAddProjectModalOpen(true)}
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Plus size={16} />
                <span>Add Project to History</span>
              </button>

              <button
                onClick={() => setIsRecordPaymentModalOpen(true)}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <CreditCard size={16} />
                <span>Record Payment</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Printer size={15} />
                <span>Print Statement</span>
              </button>
            </div>
          </div>

          {/* Buyer Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-600 font-medium">
            <div className="flex items-center gap-2.5 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
              <Phone size={15} className="text-amber-600 shrink-0" />
              <div className="overflow-hidden">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Phone Number</p>
                <span className="font-mono font-bold text-gray-900 text-xs">{viewingBuyerHistory.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
              <Mail size={15} className="text-amber-600 shrink-0" />
              <div className="overflow-hidden">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Email Address</p>
                <span className="font-semibold text-gray-800 text-xs truncate block">{viewingBuyerHistory.email || 'N/A'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
              <FileText size={15} className="text-amber-600 shrink-0" />
              <div className="overflow-hidden">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">NID Number</p>
                <span className="font-mono font-bold text-gray-800 text-xs">{viewingBuyerHistory.nid || 'N/A'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
              <MapPin size={15} className="text-amber-600 shrink-0" />
              <div className="overflow-hidden">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Address</p>
                <span className="font-semibold text-gray-800 text-xs truncate block">{viewingBuyerHistory.address || 'Dhaka, Bangladesh'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reference Design Matching 4 KPI Summary Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Linked Projects */}
          <div className="bg-white rounded-2xl border border-amber-200/90 p-4 relative overflow-hidden shadow-2xs flex flex-col justify-between min-h-[110px]">
            <div className="flex items-center gap-2 mb-3 z-10 relative">
              <div className="p-1.5 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center">
                <Building2 size={16} />
              </div>
              <h4 className="font-extrabold text-gray-900 text-xs tracking-tight">Linked Projects</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 z-10 relative">
              <div className="bg-amber-50/40 border border-amber-100/80 rounded-xl p-2.5">
                <span className="text-[9px] font-extrabold text-amber-900 uppercase tracking-wider block mb-1">
                  PROJECTS
                </span>
                <p className="text-base font-black text-gray-900 font-mono leading-none">
                  {currentPurchases.length}
                </p>
              </div>
              <div className="bg-amber-50/40 border border-amber-100/80 rounded-xl p-2.5">
                <span className="text-[9px] font-extrabold text-amber-900 uppercase tracking-wider block mb-1">
                  TOTAL UNITS
                </span>
                <p className="text-base font-black text-amber-800 font-mono leading-none">
                  {currentPurchases.length} Units
                </p>
              </div>
            </div>
            <Building2 size={76} className="absolute -right-3 -bottom-3 text-amber-500/10 pointer-events-none" />
          </div>

          {/* Card 2: Total Portfolio Value */}
          <div className="bg-white rounded-2xl border border-blue-200/90 p-4 relative overflow-hidden shadow-2xs flex flex-col justify-between min-h-[110px]">
            <div className="flex items-center gap-2 mb-3 z-10 relative">
              <div className="p-1.5 rounded-lg bg-blue-100/80 text-blue-800 flex items-center justify-center">
                <Wallet size={16} />
              </div>
              <h4 className="font-extrabold text-gray-900 text-xs tracking-tight">Portfolio Valuation</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 z-10 relative">
              <div className="bg-blue-50/40 border border-blue-100/80 rounded-xl p-2.5">
                <span className="text-[9px] font-extrabold text-blue-900 uppercase tracking-wider block mb-1">
                  TOTAL VALUE
                </span>
                <p className="text-xs font-black text-gray-900 font-mono leading-none truncate mt-0.5">
                  ৳ {grandTotalValue.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="bg-blue-50/40 border border-blue-100/80 rounded-xl p-2.5">
                <span className="text-[9px] font-extrabold text-blue-900 uppercase tracking-wider block mb-1">
                  DEAL TYPE
                </span>
                <p className="text-xs font-black text-blue-700 font-mono leading-none truncate mt-0.5">
                  Combined
                </p>
              </div>
            </div>
            <Wallet size={76} className="absolute -right-3 -bottom-3 text-blue-500/10 pointer-events-none" />
          </div>

          {/* Card 3: Total Amount Paid */}
          <div className="bg-white rounded-2xl border border-emerald-200/90 p-4 relative overflow-hidden shadow-2xs flex flex-col justify-between min-h-[110px]">
            <div className="flex items-center gap-2 mb-3 z-10 relative">
              <div className="p-1.5 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center">
                <CreditCard size={16} />
              </div>
              <h4 className="font-extrabold text-gray-900 text-xs tracking-tight">Amount Paid</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 z-10 relative">
              <div className="bg-emerald-50/40 border border-emerald-100/80 rounded-xl p-2.5">
                <span className="text-[9px] font-extrabold text-emerald-900 uppercase tracking-wider block mb-1">
                  PAID AMOUNT
                </span>
                <p className="text-xs font-black text-emerald-700 font-mono leading-none truncate mt-0.5">
                  ৳ {grandPaidValue.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="bg-emerald-50/40 border border-emerald-100/80 rounded-xl p-2.5">
                <span className="text-[9px] font-extrabold text-emerald-900 uppercase tracking-wider block mb-1">
                  FUNDS
                </span>
                <p className="text-xs font-black text-emerald-700 font-mono leading-none truncate mt-0.5">
                  Collected
                </p>
              </div>
            </div>
            <CreditCard size={76} className="absolute -right-3 -bottom-3 text-emerald-500/10 pointer-events-none" />
          </div>

          {/* Card 4: Total Due Balance */}
          <div className="bg-white rounded-2xl border border-rose-200/90 p-4 relative overflow-hidden shadow-2xs flex flex-col justify-between min-h-[110px]">
            <div className="flex items-center gap-2 mb-3 z-10 relative">
              <div className="p-1.5 rounded-lg bg-rose-100/80 text-rose-800 flex items-center justify-center">
                <Receipt size={16} />
              </div>
              <h4 className="font-extrabold text-gray-900 text-xs tracking-tight">Due Balance</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 z-10 relative">
              <div className="bg-rose-50/40 border border-rose-100/80 rounded-xl p-2.5">
                <span className="text-[9px] font-extrabold text-rose-900 uppercase tracking-wider block mb-1">
                  DUE BALANCE
                </span>
                <p className="text-xs font-black text-rose-600 font-mono leading-none truncate mt-0.5">
                  ৳ {grandDueValue.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="bg-rose-50/40 border border-rose-100/80 rounded-xl p-2.5">
                <span className="text-[9px] font-extrabold text-rose-900 uppercase tracking-wider block mb-1">
                  STATUS
                </span>
                <p className="text-xs font-black text-rose-600 font-mono leading-none truncate mt-0.5">
                  Outstanding
                </p>
              </div>
            </div>
            <Receipt size={76} className="absolute -right-3 -bottom-3 text-rose-500/10 pointer-events-none" />
          </div>
        </div>

        {/* 2-Column Section Layout: Left (bam pashe) = Transactions, Right (dan pashe) = Projects History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (bam pashe): Transaction History & Payment Ledger Table */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-white">
              <div>
                <h3 className="text-sm font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                  <Receipt className="text-amber-600" size={18} />
                  <span>Full Transaction & Payment Ledger History</span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Verified payment vouchers, receipts, and bank deposit logs.</p>
              </div>

              <button
                onClick={() => setIsRecordPaymentModalOpen(true)}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Plus size={14} />
                <span>Record Payment</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 font-extrabold uppercase tracking-wider text-[10px] border-b border-gray-200">
                    <th className="py-3 px-3.5">DATE</th>
                    <th className="py-3 px-3.5">VOUCHER NO.</th>
                    <th className="py-3 px-3.5">PROJECT NAME</th>
                    <th className="py-3 px-3.5">PURPOSE / INSTALLMENT</th>
                    <th className="py-3 px-3.5">METHOD</th>
                    <th className="py-3 px-3.5">AMOUNT PAID</th>
                    <th className="py-3 px-3.5 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {currentPayments.length > 0 ? (
                    currentPayments.map((pay) => (
                      <tr key={pay.id} className="hover:bg-amber-50/20 transition-colors">
                        <td className="py-3.5 px-3.5 whitespace-nowrap font-mono font-semibold text-gray-800 text-[11px]">
                          {pay.date}
                        </td>
                        <td className="py-3.5 px-3.5 whitespace-nowrap font-mono font-extrabold text-amber-800 text-[11px]">
                          {pay.voucherNo}
                        </td>
                        <td className="py-3.5 px-3.5 font-bold text-gray-900 text-xs">
                          {pay.projectName}
                        </td>
                        <td className="py-3.5 px-3.5 text-gray-700 font-semibold text-xs">
                          {pay.purpose}
                        </td>
                        <td className="py-3.5 px-3.5 whitespace-nowrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-200">
                            {pay.method}
                          </span>
                        </td>
                        <td className="py-3.5 px-3.5 whitespace-nowrap font-mono font-black text-emerald-700 text-xs">
                          {pay.amount}
                        </td>
                        <td className="py-3.5 px-3.5 text-center whitespace-nowrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {pay.status || 'Verified'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-gray-400 font-medium">
                        No payment ledger transactions logged for this buyer yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column (dan pashe): Associated Projects & Property Holdings History */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                  <Building2 className="text-amber-600" size={18} />
                  <span>Associated Projects & Holdings</span>
                </h3>
                <p className="text-xs text-gray-500">Purchases, plot/flat unit allocations & share holdings.</p>
              </div>

              <button
                onClick={() => setIsAddProjectModalOpen(true)}
                className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs shrink-0"
              >
                <Plus size={14} />
                <span>Link Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {currentPurchases.map((proj, idx) => {
                const totNum = parseFloat(proj.totalAmount.replace(/[^0-9.]/g, '')) || 1;
                const paidNum = parseFloat(proj.paidAmount.replace(/[^0-9.]/g, '')) || 0;
                const pct = Math.min(100, Math.round((paidNum / totNum) * 100));

                return (
                  <div key={proj.id || idx} className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-2xs space-y-3 hover:border-amber-300 transition-all">
                    <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-2.5">
                      <div>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                          {proj.type || 'Unit Buyer'}
                        </span>
                        <h4 className="font-extrabold text-gray-900 text-sm mt-1">{proj.projectName}</h4>
                        <p className="text-xs font-bold text-amber-700 flex items-center gap-1 mt-0.5">
                          <Tag size={12} />
                          <span>{proj.unitOrPlotNo}</span>
                          <span className="text-gray-300 mx-1">•</span>
                          <span className="text-gray-600 font-semibold">{proj.sharesOrSize}</span>
                        </p>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black shrink-0 ${
                        proj.status === 'Handover Completed' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                        proj.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {proj.status}
                      </span>
                    </div>

                    {/* Financial Numbers */}
                    <div className="grid grid-cols-3 gap-2 bg-gray-50 p-2.5 rounded-xl text-center font-mono">
                      <div>
                        <span className="text-[9px] text-gray-400 font-sans font-bold uppercase">Deal Price</span>
                        <p className="font-extrabold text-gray-900 text-xs mt-0.5">{proj.totalAmount}</p>
                      </div>
                      <div>
                        <span className="text-[9px] text-emerald-600 font-sans font-bold uppercase">Paid</span>
                        <p className="font-extrabold text-emerald-700 text-xs mt-0.5">{proj.paidAmount}</p>
                      </div>
                      <div>
                        <span className="text-[9px] text-rose-500 font-sans font-bold uppercase">Due</span>
                        <p className="font-extrabold text-rose-600 text-xs mt-0.5">{proj.dueAmount}</p>
                      </div>
                    </div>

                    {/* Payment Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-gray-500">Payment Completion</span>
                        <span className="text-emerald-700">{pct}% Completed</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-100">
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Calendar size={13} className="text-gray-400" />
                        Booked: {proj.purchaseDate}
                      </span>

                      <button
                        onClick={() => {
                          setNewPaymentData(prev => ({ ...prev, projectName: proj.projectName }));
                          setIsRecordPaymentModalOpen(true);
                        }}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Plus size={13} />
                        <span>Record Payment</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal: Add New Project Purchase to Buyer's History */}
        {isAddProjectModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-base">Link Project Purchase</h3>
                    <p className="text-xs text-gray-500">Add an additional project holding to {viewingBuyerHistory.name}'s history</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddProjectModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddProjectToBuyer} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Select Project Name *</label>
                  <select
                    value={newProjectData.projectName}
                    onChange={(e) => setNewProjectData({ ...newProjectData, projectName: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Purbachal Green Valley Project">Purbachal Green Valley Project</option>
                    <option value="Promise Heights Commercial">Promise Heights Commercial</option>
                    <option value="Modhumoti Model Town">Modhumoti Model Town</option>
                    <option value="Uttara Model Town Phase 3">Uttara Model Town Phase 3</option>
                    <option value="Mirpur Lake City Tower">Mirpur Lake City Tower</option>
                    <option value="Banasree Rose Villa">Banasree Rose Villa</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Unit / Plot No *</label>
                    <input
                      type="text"
                      placeholder="e.g. Plot B-20 or Flat 4A"
                      value={newProjectData.unitOrPlotNo}
                      onChange={(e) => setNewProjectData({ ...newProjectData, unitOrPlotNo: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Size / Shares *</label>
                    <input
                      type="text"
                      placeholder="e.g. 5 Katha / 1500 SQFT"
                      value={newProjectData.sharesOrSize}
                      onChange={(e) => setNewProjectData({ ...newProjectData, sharesOrSize: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Category / Type</label>
                    <select
                      value={newProjectData.type}
                      onChange={(e) => setNewProjectData({ ...newProjectData, type: e.target.value as any })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Unit Buyer">Unit Buyer</option>
                      <option value="Project Shareholder">Project Shareholder</option>
                      <option value="Joint Venture Partner">Joint Venture Partner</option>
                      <option value="Investor">Investor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Status</label>
                    <select
                      value={newProjectData.status}
                      onChange={(e) => setNewProjectData({ ...newProjectData, status: e.target.value as any })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Token Paid">Token Paid</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Total Deal Price (৳) *</label>
                    <input
                      type="text"
                      placeholder="e.g. 12000000"
                      value={newProjectData.totalAmount}
                      onChange={(e) => setNewProjectData({ ...newProjectData, totalAmount: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Paid Amount (৳)</label>
                    <input
                      type="text"
                      placeholder="e.g. 8500000"
                      value={newProjectData.paidAmount}
                      onChange={(e) => setNewProjectData({ ...newProjectData, paidAmount: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Booking / Purchase Date</label>
                  <input
                    type="text"
                    value={newProjectData.purchaseDate}
                    onChange={(e) => setNewProjectData({ ...newProjectData, purchaseDate: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsAddProjectModalOpen(false)}
                    className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-extrabold shadow-sm cursor-pointer"
                  >
                    Save Project Purchase
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Record Payment Voucher */}
        {isRecordPaymentModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                    <Receipt size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-base">Record Payment Voucher</h3>
                    <p className="text-xs text-gray-500">Log new payment received from {viewingBuyerHistory.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsRecordPaymentModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleRecordPayment} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Select Associated Project</label>
                  <select
                    value={newPaymentData.projectName || currentPurchases[0]?.projectName}
                    onChange={(e) => setNewPaymentData({ ...newPaymentData, projectName: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {currentPurchases.map((p, i) => (
                      <option key={i} value={p.projectName}>
                        {p.projectName} ({p.unitOrPlotNo})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Voucher No *</label>
                    <input
                      type="text"
                      value={newPaymentData.voucherNo}
                      onChange={(e) => setNewPaymentData({ ...newPaymentData, voucherNo: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Payment Date</label>
                    <input
                      type="text"
                      value={newPaymentData.date}
                      onChange={(e) => setNewPaymentData({ ...newPaymentData, date: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Payment Purpose / Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. 2nd Installment or Registration Fee"
                    value={newPaymentData.purpose}
                    onChange={(e) => setNewPaymentData({ ...newPaymentData, purpose: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Payment Method</label>
                    <select
                      value={newPaymentData.method}
                      onChange={(e) => setNewPaymentData({ ...newPaymentData, method: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Cash">Cash</option>
                      <option value="Online Payment">Online Payment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Amount Paid (৳) *</label>
                    <input
                      type="text"
                      placeholder="e.g. 500000"
                      value={newPaymentData.amount}
                      onChange={(e) => setNewPaymentData({ ...newPaymentData, amount: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono font-bold text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsRecordPaymentModalOpen(false)}
                    className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold shadow-sm cursor-pointer"
                  >
                    Record Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Calculate summary metrics across all buyers for the top KPI row
  let globalPortfolioValue = 0;
  let globalPaidValue = 0;
  let globalDueValue = 0;
  let totalPropertyUnitsCount = 0;

  items.forEach(buyer => {
    const purchases = getBuyerPurchases(buyer);
    if (purchases.length > 0) {
      purchases.forEach(p => {
        globalPortfolioValue += parseFloat(p.totalAmount.replace(/[^0-9.]/g, '')) || 0;
        globalPaidValue += parseFloat(p.paidAmount.replace(/[^0-9.]/g, '')) || 0;
        globalDueValue += parseFloat(p.dueAmount.replace(/[^0-9.]/g, '')) || 0;
        totalPropertyUnitsCount += 1;
      });
    } else {
      globalPortfolioValue += parseFloat(buyer.totalAmount.replace(/[^0-9.]/g, '')) || 0;
      globalPaidValue += parseFloat(buyer.paidAmount.replace(/[^0-9.]/g, '')) || 0;
      globalDueValue += parseFloat(buyer.dueAmount.replace(/[^0-9.]/g, '')) || 0;
      totalPropertyUnitsCount += 1;
    }
  });

  const totalBuyersCount = items.length;
  const unitBuyersCount = items.filter(i => i.type === 'Unit Buyer').length;
  const shareholdersCount = items.filter(i => i.type !== 'Unit Buyer').length;
  const confirmedBuyersCount = items.filter(i => i.status === 'Confirmed' || i.status === 'Handover Completed').length;
  const bookedBuyersCount = items.filter(i => i.status === 'Token Paid' || i.status === 'Pending Verification').length;

  const formatCurrencyShort = (amount: number) => {
    if (amount >= 10000000) {
      return `৳ ${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `৳ ${(amount / 100000).toFixed(1)} Lac`;
    }
    return `৳ ${amount.toLocaleString('en-IN')}`;
  };

  // Standard All Buyers Table View
  return (
    <div className="space-y-6 max-w-full font-sans select-none pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5 duration-200 border border-gray-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner / Section Header */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-2xs flex justify-end">
        <button
          onClick={() => {
            setEditingItem(null);
            resetForm();
            setIsAddModalOpen(true);
          }}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-extrabold text-xs transition-all shadow-2xs flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus size={16} />
          <span>Add New</span>
        </button>
      </div>

      {/* Reference Design Matching 4 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Buyers Overview (Green theme) */}
        <div className="bg-white rounded-2xl border border-emerald-200/90 p-4 relative overflow-hidden shadow-2xs flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center gap-2 mb-3 z-10 relative">
            <div className="p-1.5 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center">
              <Users size={16} />
            </div>
            <h4 className="font-extrabold text-gray-900 text-xs tracking-tight">Buyers Overview</h4>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10 relative">
            <div className="bg-emerald-50/40 border border-emerald-100/80 rounded-xl p-2.5">
              <span className="text-[9px] font-extrabold text-emerald-900 uppercase tracking-wider block mb-1">
                TOTAL
              </span>
              <p className="text-base font-black text-gray-900 font-mono leading-none">
                {totalBuyersCount}
              </p>
            </div>
            <div className="bg-emerald-50/40 border border-emerald-100/80 rounded-xl p-2.5">
              <span className="text-[9px] font-extrabold text-emerald-900 uppercase tracking-wider block mb-1">
                CONFIRMED
              </span>
              <p className="text-base font-black text-emerald-700 font-mono leading-none">
                {confirmedBuyersCount}
              </p>
            </div>
          </div>
          <Users size={76} className="absolute -right-3 -bottom-3 text-emerald-500/10 pointer-events-none" />
        </div>

        {/* Card 2: Holdings & Units (Blue theme) */}
        <div className="bg-white rounded-2xl border border-blue-200/90 p-4 relative overflow-hidden shadow-2xs flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center gap-2 mb-3 z-10 relative">
            <div className="p-1.5 rounded-lg bg-blue-100/80 text-blue-800 flex items-center justify-center">
              <Building2 size={16} />
            </div>
            <h4 className="font-extrabold text-gray-900 text-xs tracking-tight">Holdings & Units</h4>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10 relative">
            <div className="bg-blue-50/40 border border-blue-100/80 rounded-xl p-2.5">
              <span className="text-[9px] font-extrabold text-blue-900 uppercase tracking-wider block mb-1">
                TOTAL UNITS
              </span>
              <p className="text-base font-black text-gray-900 font-mono leading-none">
                {totalPropertyUnitsCount}
              </p>
            </div>
            <div className="bg-blue-50/40 border border-blue-100/80 rounded-xl p-2.5">
              <span className="text-[9px] font-extrabold text-blue-900 uppercase tracking-wider block mb-1">
                LINKED
              </span>
              <p className="text-base font-black text-blue-700 font-mono leading-none">
                {totalPropertyUnitsCount}
              </p>
            </div>
          </div>
          <Building2 size={76} className="absolute -right-3 -bottom-3 text-blue-500/10 pointer-events-none" />
        </div>

        {/* Card 3: Sales & Collections (Purple theme) */}
        <div className="bg-white rounded-2xl border border-purple-200/90 p-4 relative overflow-hidden shadow-2xs flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center gap-2 mb-3 z-10 relative">
            <div className="p-1.5 rounded-lg bg-purple-100/80 text-purple-800 flex items-center justify-center">
              <Receipt size={16} />
            </div>
            <h4 className="font-extrabold text-gray-900 text-xs tracking-tight">Sales & Collections</h4>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10 relative">
            <div className="bg-purple-50/40 border border-purple-100/80 rounded-xl p-2.5">
              <span className="text-[9px] font-extrabold text-purple-900 uppercase tracking-wider block mb-1">
                PAID
              </span>
              <p className="text-xs font-black text-emerald-700 font-mono leading-none truncate mt-0.5">
                {formatCurrencyShort(globalPaidValue)}
              </p>
            </div>
            <div className="bg-purple-50/40 border border-purple-100/80 rounded-xl p-2.5">
              <span className="text-[9px] font-extrabold text-rose-900 uppercase tracking-wider block mb-1">
                DUE
              </span>
              <p className="text-xs font-black text-rose-600 font-mono leading-none truncate mt-0.5">
                {formatCurrencyShort(globalDueValue)}
              </p>
            </div>
          </div>
          <Receipt size={76} className="absolute -right-3 -bottom-3 text-purple-500/10 pointer-events-none" />
        </div>

        {/* Card 4: Portfolio Valuation (Amber theme) */}
        <div className="bg-white rounded-2xl border border-amber-200/90 p-4 relative overflow-hidden shadow-2xs flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center gap-2 mb-3 z-10 relative">
            <div className="p-1.5 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center">
              <Wallet size={16} />
            </div>
            <h4 className="font-extrabold text-gray-900 text-xs tracking-tight">Portfolio Valuation</h4>
          </div>
          <div className="grid grid-cols-2 gap-2 z-10 relative">
            <div className="bg-amber-50/40 border border-amber-100/80 rounded-xl p-2.5">
              <span className="text-[9px] font-extrabold text-amber-900 uppercase tracking-wider block mb-1">
                EST. VALUE
              </span>
              <p className="text-xs font-black text-gray-900 font-mono leading-none truncate mt-0.5">
                {formatCurrencyShort(globalPortfolioValue)}
              </p>
            </div>
            <div className="bg-amber-50/40 border border-amber-100/80 rounded-xl p-2.5">
              <span className="text-[9px] font-extrabold text-amber-900 uppercase tracking-wider block mb-1">
                BUYERS
              </span>
              <p className="text-base font-black text-amber-800 font-mono leading-none">
                {totalBuyersCount} Active
              </p>
            </div>
          </div>
          <Wallet size={76} className="absolute -right-3 -bottom-3 text-amber-500/10 pointer-events-none" />
        </div>
      </div>

      {/* Single Row Reference Design Search and Control Bar */}
      <div className="bg-white rounded-2xl p-3 border border-gray-200/80 shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Search Box */}
        <div className="relative w-full lg:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search buyers by name, phone, unit/plot, project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
          />
        </div>

        {/* Filters and Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0 justify-end">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
          >
            <option value="All">All Buyer Types</option>
            <option value="Unit Buyer">Unit Buyer</option>
            <option value="Project Shareholder">Project Shareholder</option>
            <option value="Joint Venture Partner">Joint Venture Partner</option>
            <option value="Investor">Investor</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Token Paid">Token Paid</option>
            <option value="Pending Verification">Pending Verification</option>
          </select>

          <button
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," + ["Name,Type,Project,Phone,Amount,Status", ...items.map(i => `${i.name},${i.type},${i.projectName},${i.phone},${i.totalAmount},${i.status}`)].join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "buyers_directory.csv");
              document.body.appendChild(link);
              link.click();
            }}
            className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Main Table Container */}
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
                <th className="py-3 px-4">BUYER DETAILS</th>
                <th className="py-3 px-4">LOCATION & PHONE</th>
                <th className="py-3 px-4">TYPE</th>
                <th className="py-3 px-4 text-center">TOTAL UNITS</th>
                <th className="py-3 px-4">PROJECT & PLOT</th>
                <th className="py-3 px-4">PAID / DUE</th>
                <th className="py-3 px-4">TOTAL VALUE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {paginatedItems.length > 0 ? (
                paginatedItems.map((p) => {
                  const isSelected = selectedIds.includes(p.id);
                  return (
                    <tr key={p.id} className={`transition-colors ${isSelected ? 'bg-amber-50/50' : 'hover:bg-amber-50/20'}`}>
                      <td className="py-3.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(p.id)}
                          className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                        />
                      </td>

                      <td className="py-3.5 px-4 min-w-[200px]">
                        <div 
                          className="cursor-pointer group"
                          onClick={() => setViewingBuyerHistory(p)}
                          title="Click to open full buyer history & project portfolio"
                        >
                          <p className="font-extrabold text-gray-900 group-hover:text-amber-700 transition-colors leading-snug flex items-center gap-1.5">
                            <span>{p.name}</span>
                            <Eye size={12} className="text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold font-mono">ID: #{p.id}</p>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 min-w-[160px]">
                        <p className="font-mono font-bold text-gray-800 text-xs flex items-center gap-1">
                          <Phone size={11} className="text-amber-600" />
                          <span>{p.phone}</span>
                        </p>
                        <p className="text-[10px] text-gray-500 font-medium truncate flex items-center gap-1 mt-0.5">
                          <MapPin size={10} className="text-gray-400" />
                          <span>{p.address || 'Dhaka, Bangladesh'}</span>
                        </p>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          p.type === 'Unit Buyer' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                          p.type === 'Project Shareholder' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                          p.type === 'Joint Venture Partner' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {p.type}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center font-extrabold text-gray-800 font-mono">
                        {getBuyerPurchases(p).length || 1}
                      </td>

                      <td className="py-3.5 px-4 min-w-[170px]">
                        <p className="font-bold text-gray-800 truncate">{p.projectName}</p>
                        <p className="text-[10px] font-bold text-amber-700 flex items-center gap-1 mt-0.5">
                          <Tag size={10} />
                          <span>{p.unitOrPlotNo}</span>
                        </p>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <p className="font-extrabold text-emerald-700 font-mono text-xs">{p.paidAmount}</p>
                        <p className="text-[10px] font-bold text-rose-600 font-mono mt-0.5">Due: {p.dueAmount}</p>
                      </td>

                      <td className="py-3.5 px-4 font-black text-gray-900 font-mono whitespace-nowrap">
                        {p.totalAmount}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                          p.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                          p.status === 'Token Paid' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                          'bg-gray-100 text-gray-700 border border-gray-300'
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
                            className="bg-[#00c875] hover:bg-[#00b368] text-white px-3.5 py-1.5 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 shadow-2xs hover:shadow-md active:scale-95 cursor-pointer mx-auto min-w-[85px]"
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
                                    setViewingBuyerHistory(p);
                                  }}
                                  className="w-full text-left px-3.5 py-2 text-xs font-bold text-amber-900 bg-amber-50/60 hover:bg-amber-100 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Eye size={14} className="text-amber-600" />
                                  <span>View Buyer History</span>
                                </button>

                                <button
                                  onClick={() => {
                                    setActiveDropdownId(null);
                                    openEditModal(p);
                                  }}
                                  className="w-full text-left px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-900 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Edit size={14} className="text-blue-600" />
                                  <span>Edit Info</span>
                                </button>

                                <div className="my-1 border-t border-gray-100" />

                                <button
                                  onClick={() => {
                                    setActiveDropdownId(null);
                                    if (confirm(`Remove ${p.name} from stakeholders database?`)) {
                                      setItems(prev => prev.filter(i => i.id !== p.id));
                                      showToast('Stakeholder removed successfully.');
                                    }
                                  }}
                                  className="w-full text-left px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Trash2 size={14} />
                                  <span>Delete Record</span>
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
                  <td colSpan={10} className="py-12 text-center text-gray-400 font-medium">
                    No buyers or stakeholders match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Reference Design Table Footer / Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600 font-medium bg-gray-50/50">
          <div className="flex items-center gap-3">
            <span>
              Showing <strong className="font-bold text-gray-900">{(currentPage - 1) * pageSize + (paginatedItems.length > 0 ? 1 : 0)}</strong> to <strong className="font-bold text-gray-900">{Math.min(currentPage * pageSize, filteredItems.length)}</strong> of <strong className="font-bold text-gray-900">{filteredItems.length}</strong> entries
            </span>
            <div className="flex items-center gap-1.5 ml-2">
              <span className="text-gray-400 text-[11px]">Rows:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-0.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-2.5 py-1 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 transition-all font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft size={14} />
              <span>Prev</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-7 h-7 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                  currentPage === p
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="px-2.5 py-1 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 transition-all font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal 1: Register / Edit Stakeholder */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
                  <UserPlus size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-base">
                    {editingItem ? 'Edit Stakeholder Record' : 'Register New Stakeholder'}
                  </h3>
                  <p className="text-xs text-gray-500">Enter buyer or partner contract details</p>
                </div>
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

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Engr. Shahadat Hossain"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    placeholder="e.g. +880 1711-XXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. email@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">NID Card Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 198426918239102"
                    value={formData.nid}
                    onChange={(e) => setFormData({ ...formData, nid: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Stakeholder Category *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Unit Buyer">Unit Buyer</option>
                    <option value="Project Shareholder">Project Shareholder</option>
                    <option value="Joint Venture Partner">Joint Venture Partner</option>
                    <option value="Investor">Investor</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Booking Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Token Paid">Token Paid</option>
                    <option value="Pending Verification">Pending Verification</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Assigned Project *</label>
                <select
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Purbachal Green Valley Project">Purbachal Green Valley Project</option>
                  <option value="Promise Heights Commercial">Promise Heights Commercial</option>
                  <option value="Modhumoti Model Town">Modhumoti Model Town</option>
                  <option value="Uttara Model Town Phase 3">Uttara Model Town Phase 3</option>
                  <option value="Mirpur Lake City Tower">Mirpur Lake City Tower</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Unit / Plot / Share #</label>
                  <input
                    type="text"
                    placeholder="e.g. Plot A-102 or Share Pool #4"
                    value={formData.unitOrPlotNo}
                    onChange={(e) => setFormData({ ...formData, unitOrPlotNo: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Shares Count / Unit Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 Katha or 1,850 SQFT"
                    value={formData.sharesOrSize}
                    onChange={(e) => setFormData({ ...formData, sharesOrSize: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Total Deal Value (৳)</label>
                  <input
                    type="text"
                    placeholder="e.g. 12000000"
                    value={formData.totalAmount}
                    onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Paid Amount (৳)</label>
                  <input
                    type="text"
                    placeholder="e.g. 8500000"
                    value={formData.paidAmount}
                    onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="e.g. Banani, Dhaka"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-extrabold shadow-sm cursor-pointer"
                >
                  {editingItem ? 'Save Changes' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Quick View Stakeholder Details Profile Modal */}
      {selectedItemForDetails && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl">
                  <Users size={22} />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-base">{selectedItemForDetails.name}</h3>
                  <p className="text-xs text-gray-500 font-medium">ID: #{selectedItemForDetails.id}</p>
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
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Stakeholder Category</p>
                  <p className="font-bold text-amber-800 mt-0.5">{selectedItemForDetails.type}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Booking Status</p>
                  <p className="font-bold text-emerald-700 mt-0.5">{selectedItemForDetails.status}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone size={14} className="text-amber-600 shrink-0" />
                  <span className="font-mono font-bold">{selectedItemForDetails.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail size={14} className="text-amber-600 shrink-0" />
                  <span>{selectedItemForDetails.email || 'No email registered'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FileText size={14} className="text-amber-600 shrink-0" />
                  <span className="font-mono">NID: {selectedItemForDetails.nid || 'N/A'}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-700">
                  <MapPin size={14} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>{selectedItemForDetails.address || 'Dhaka, Bangladesh'}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-2">
                <p className="font-extrabold text-gray-900 text-xs">Primary Investment & Asset</p>
                <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200/80 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assigned Project:</span>
                    <span className="font-bold text-gray-900">{selectedItemForDetails.projectName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unit / Plot No:</span>
                    <span className="font-extrabold text-amber-800">{selectedItemForDetails.unitOrPlotNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size / Shares:</span>
                    <span className="font-semibold text-gray-800">{selectedItemForDetails.sharesOrSize}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-2">
                <p className="font-extrabold text-gray-900 text-xs">Financial Overview</p>
                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-2.5 bg-gray-100 rounded-xl border border-gray-200">
                    <p className="text-[10px] text-gray-500 font-sans font-bold">Total Deal</p>
                    <p className="font-bold text-gray-900 text-xs mt-0.5">{selectedItemForDetails.totalAmount}</p>
                  </div>
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                    <p className="text-[10px] text-emerald-700 font-sans font-bold">Collected</p>
                    <p className="font-bold text-emerald-800 text-xs mt-0.5">{selectedItemForDetails.paidAmount}</p>
                  </div>
                  <div className="p-2.5 bg-red-50 rounded-xl border border-red-200">
                    <p className="text-[10px] text-red-600 font-sans font-bold">Outstanding</p>
                    <p className="font-bold text-red-700 text-xs mt-0.5">{selectedItemForDetails.dueAmount}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  const b = selectedItemForDetails;
                  setSelectedItemForDetails(null);
                  setViewingBuyerHistory(b);
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Eye size={14} />
                <span>Open Full History Page</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedItemForDetails(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
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
