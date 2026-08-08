import React, { useState, useEffect } from 'react';
import { 
  History, 
  Building2, 
  Calendar, 
  Users, 
  PieChart, 
  Home, 
  CheckCircle2, 
  Clock, 
  Search, 
  MapPin, 
  Filter, 
  Layers, 
  DollarSign, 
  Share2, 
  Phone,
  Tag,
  ArrowRight,
  ArrowLeft,
  Plus,
  X
} from 'lucide-react';
import { ProjectHistoryDetail, ProjectUnitStockItem } from '../types';

interface ProjectHistoryViewProps {
  initialProjectId?: string;
  onBackToAllProjects?: () => void;
  onBookUnit?: (projectName: string, unitDetails: string) => void;
}

export const ProjectHistoryView: React.FC<ProjectHistoryViewProps> = ({
  initialProjectId,
  onBackToAllProjects,
  onBookUnit
}) => {
  const [projectList, setProjectList] = useState<ProjectHistoryDetail[]>([
    {
      id: 'proj_hist_1',
      projectName: 'Purbachal Green Valley Project',
      location: 'Sector 22, Purbachal, Dhaka',
      startDate: '15 Jan, 2022',
      completionDate: '30 Dec, 2027',
      projectType: 'Land Project',
      status: 'Ongoing',
      branch: 'Dhaka HO',
      totalCustomers: 185,
      totalShares: 500,
      soldShares: 380,
      availableShares: 120,
      totalFlats: 250,
      vacantFlats: 70,
      soldFlats: 160,
      bookedFlats: 20,
      totalLandArea: '50 Bigha (720 Katha)',
      projectBudget: '৳ 350.0 Million',
      description: 'A mega township project in Purbachal, designed with modern green infrastructure, wide roads, lakeside parks, and commercial blocks.',
      timelineEvents: [
        { date: '15 Jan, 2022', title: 'Land Acquisition & Registration', status: 'Completed', description: 'Acquired 50 Bigha primary plot area in Purbachal Sector 22.' },
        { date: '10 Jun, 2022', title: 'RAJUK & Environmental Clearance', status: 'Completed', description: 'Obtained official approval for township masterplan development.' },
        { date: '01 Feb, 2023', title: 'Boundary Wall & Internal Road Layout', status: 'Completed', description: 'Constructed 60ft primary avenue and perimeter boundary walls.' },
        { date: '15 Aug, 2024', title: 'Phase 1 Plot Allocation & Share Sales', status: 'In Progress', description: 'Allocated 180 plots to primary shareholders and customers.' },
        { date: '20 Nov, 2025', title: 'Electricity & Drainage Infrastructure', status: 'In Progress', description: 'Underground electrical cabling and storm drainage line setup.' },
        { date: '30 Dec, 2027', title: 'Final Handover & Title Deed Transfer', status: 'Upcoming', description: 'Complete physical possession handover to all plot share buyers.' }
      ],
      customerShareholders: [
        { id: 'cs_1', customerName: 'Jitu Guha', phone: '+880 1711-223344', unitNo: 'Plot A-102', sharesCount: 5, purchaseDate: '12 Feb, 2023', amountPaid: '৳ 60,00,000', status: 'Confirmed' },
        { id: 'cs_2', customerName: 'Tanvir Ahmed', phone: '+880 1819-556677', unitNo: 'Plot B-110', sharesCount: 3, purchaseDate: '05 May, 2023', amountPaid: '৳ 37,50,000', status: 'Confirmed' },
        { id: 'cs_3', customerName: 'Farhan Kabir', phone: '+880 1552-443322', unitNo: 'Plot C-205', sharesCount: 5, purchaseDate: '18 Sep, 2023', amountPaid: '৳ 67,50,000', status: 'Confirmed' },
        { id: 'cs_4', customerName: 'Sabrina Mustafiz', phone: '+880 1911-882211', unitNo: 'Plot A-108', sharesCount: 2, purchaseDate: '10 Jan, 2024', amountPaid: '৳ 24,00,000', status: 'Confirmed' },
        { id: 'cs_5', customerName: 'Dr. Rafiqul Islam', phone: '+880 1733-990011', unitNo: 'Plot B-115', sharesCount: 10, purchaseDate: '01 Mar, 2024', amountPaid: '৳ 1,20,00,000', status: 'Confirmed' },
        { id: 'cs_6', customerName: 'Nusrat Jahan', phone: '+880 1678-112233', unitNo: 'Plot D-301', sharesCount: 4, purchaseDate: '15 May, 2024', amountPaid: '৳ 48,00,000', status: 'Token Paid' }
      ]
    },
    {
      id: 'proj_hist_2',
      projectName: 'Bashundhara Enclave Villa & Suites',
      location: 'Block I, Bashundhara R/A, Dhaka',
      startDate: '01 Mar, 2023',
      completionDate: '15 Aug, 2026',
      projectType: 'Residential Building',
      status: 'Ongoing',
      branch: 'Dhaka HO',
      totalCustomers: 92,
      totalShares: 120,
      soldShares: 92,
      availableShares: 28,
      totalFlats: 120,
      vacantFlats: 28,
      soldFlats: 82,
      bookedFlats: 10,
      totalLandArea: '20 Katha (14,400 SQFT)',
      projectBudget: '৳ 520.0 Million',
      description: 'Luxury G+14 residential apartment tower featuring modern amenities, rooftop infinity pool, and underground double parking.',
      timelineEvents: [
        { date: '01 Mar, 2023', title: 'Soil Test & Piling Work', status: 'Completed', description: 'Deep foundation piling work completed with RCC integrity test.' },
        { date: '10 Nov, 2023', title: 'Basement & Structure Construction', status: 'Completed', description: 'Double basement car parking and G+14 column structure erected.' },
        { date: '05 Jul, 2024', title: 'Brick Work & Interior Finishing', status: 'In Progress', description: 'Exterior brick walls, plaster, and plumbing lines installation.' },
        { date: '15 Aug, 2026', title: 'Final Handover & Lift Installation', status: 'Upcoming', description: 'European lift setup, generator connection, and flat keys handover.' }
      ],
      customerShareholders: [
        { id: 'cs_21', customerName: 'Mahfuzur Rahman', phone: '+880 1912-998877', unitNo: 'Flat 4B (2400 SF)', sharesCount: 1, purchaseDate: '14 Jun, 2023', amountPaid: '৳ 2,50,00,000', status: 'Confirmed' },
        { id: 'cs_22', customerName: 'Engr. Shahadat Hossain', phone: '+880 1812-334455', unitNo: 'Flat 6A (2400 SF)', sharesCount: 2, purchaseDate: '20 Aug, 2023', amountPaid: '৳ 5,00,00,000', status: 'Confirmed' },
        { id: 'cs_23', customerName: 'Anowar Hossain', phone: '+880 1722-110099', unitNo: 'Flat 8C (2100 SF)', sharesCount: 1, purchaseDate: '01 Dec, 2023', amountPaid: '৳ 2,10,00,000', status: 'Confirmed' }
      ]
    },
    {
      id: 'proj_hist_3',
      projectName: 'Dhanmondi Horizon Luxury Tower',
      location: 'Road 27, Dhanmondi, Dhaka',
      startDate: '10 Oct, 2021',
      completionDate: '28 Feb, 2025',
      projectType: 'Commercial Complex',
      status: 'Near Completion',
      branch: 'Dhanmondi Branch',
      totalCustomers: 68,
      totalShares: 80,
      soldShares: 68,
      availableShares: 12,
      totalFlats: 80,
      vacantFlats: 12,
      soldFlats: 63,
      bookedFlats: 5,
      totalLandArea: '15 Katha (10,800 SQFT)',
      projectBudget: '৳ 1,200.0 Million',
      description: 'A premium 20-story commercial skyscraper in Dhanmondi featuring corporate office spaces, retail outlets, and multi-cuisine food courts.',
      timelineEvents: [
        { date: '10 Oct, 2021', title: 'Land Lease & RAJUK Commercial Approval', status: 'Completed', description: 'Commercial floor plan approval secured.' },
        { date: '01 May, 2022', title: 'Structural Construction G+20', status: 'Completed', description: 'RCC frame structure completed up to 20th floor.' },
        { date: '15 Dec, 2024', title: 'Glass Facade & Central AC Installation', status: 'In Progress', description: 'Low-E glass curtain wall and central VRF HVAC system.' },
        { date: '28 Feb, 2025', title: 'Commercial Operation Opening', status: 'Upcoming', description: 'Grand inauguration and corporate tenant possession.' }
      ],
      customerShareholders: [
        { id: 'cs_31', customerName: 'Nusrat Jahan', phone: '+880 1678-112233', unitNo: 'Suite 101 (1800 SF)', sharesCount: 2, purchaseDate: '15 Nov, 2022', amountPaid: '৳ 3,10,00,000', status: 'Confirmed' },
        { id: 'cs_32', customerName: 'Apex Logistics Ltd.', phone: '+880 1711-000111', unitNo: 'Floor 12 Full', sharesCount: 8, purchaseDate: '02 Mar, 2023', amountPaid: '৳ 12,80,00,000', status: 'Confirmed' }
      ]
    }
  ]);

  const getMappedId = (id?: string) => {
    if (!id) return 'proj_hist_1';
    if (id === 'proj_1' || id === 'proj_hist_1') return 'proj_hist_1';
    if (id === 'proj_2' || id === 'proj_hist_2') return 'proj_hist_2';
    if (id === 'proj_3' || id === 'proj_hist_3' || id === 'proj_4') return 'proj_hist_3';
    return 'proj_hist_1';
  };

  const [selectedProjectId, setSelectedProjectId] = useState<string>(() => getMappedId(initialProjectId));
  const [customerSearch, setCustomerSearch] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal States
  const [isAddMilestoneModalOpen, setIsAddMilestoneModalOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    date: '',
    title: '',
    status: 'In Progress' as 'Completed' | 'In Progress' | 'Upcoming',
    description: ''
  });

  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);
  const [newUnit, setNewUnit] = useState({
    unitNo: '',
    size: '',
    price: '',
    status: 'Vacant' as 'Vacant' | 'Booked' | 'Sold'
  });

  const [isAddShareholderModalOpen, setIsAddShareholderModalOpen] = useState(false);
  const [newShareholder, setNewShareholder] = useState({
    customerName: '',
    phone: '',
    unitNo: '',
    sharesCount: 1,
    amountPaid: '',
    status: 'Confirmed'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    if (initialProjectId) {
      setSelectedProjectId(getMappedId(initialProjectId));
    }
  }, [initialProjectId]);

  const currentProject = projectList.find(p => p.id === selectedProjectId) || projectList[0];

  const filteredShareholders = currentProject.customerShareholders.filter(cs => 
    cs.customerName.toLowerCase().includes(customerSearch.toLowerCase()) ||
    cs.phone.toLowerCase().includes(customerSearch.toLowerCase()) ||
    cs.unitNo.toLowerCase().includes(customerSearch.toLowerCase())
  );

  // Handle Add Milestone
  const handleAddMilestoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestone.title.trim()) return;

    const eventItem = {
      date: newMilestone.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      title: newMilestone.title,
      status: newMilestone.status,
      description: newMilestone.description || 'Milestone event created.'
    };

    setProjectList(prev => prev.map(proj => {
      if (proj.id === currentProject.id) {
        return {
          ...proj,
          timelineEvents: [eventItem, ...proj.timelineEvents]
        };
      }
      return proj;
    }));

    setIsAddMilestoneModalOpen(false);
    setNewMilestone({ date: '', title: '', status: 'In Progress', description: '' });
    showToast('New milestone event added successfully!');
  };

  // Handle Add Unit
  const handleAddUnitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUnit.unitNo.trim()) return;

    const unitItem: ProjectUnitStockItem = {
      id: 'unit_' + Date.now(),
      unitNo: newUnit.unitNo,
      size: newUnit.size || (currentProject.projectType === 'Land Project' ? '5 Katha' : '1,800 SQFT'),
      price: newUnit.price || '৳ 1.20 Crore',
      status: newUnit.status
    };

    const existingUnits: ProjectUnitStockItem[] = currentProject.customUnits || Array.from({ length: 12 }).map((_, idx) => ({
      id: `default_unit_${idx}`,
      unitNo: `Unit-${101 + idx}`,
      size: currentProject.projectType === 'Land Project' ? '5 Katha' : '1,800 SQFT',
      price: idx % 3 === 0 ? '৳ 1.20 Crore' : idx % 5 === 0 ? 'Token Received' : 'Owned',
      status: (idx % 3 === 0 ? 'Vacant' : idx % 5 === 0 ? 'Booked' : 'Sold') as 'Vacant' | 'Booked' | 'Sold'
    }));

    const updatedUnits = [unitItem, ...existingUnits];
    const vacantCount = updatedUnits.filter(u => u.status === 'Vacant').length;
    const bookedCount = updatedUnits.filter(u => u.status === 'Booked').length;
    const soldCount = updatedUnits.filter(u => u.status === 'Sold').length;

    setProjectList(prev => prev.map(proj => {
      if (proj.id === currentProject.id) {
        return {
          ...proj,
          customUnits: updatedUnits,
          totalFlats: updatedUnits.length,
          vacantFlats: vacantCount,
          bookedFlats: bookedCount,
          soldFlats: soldCount
        };
      }
      return proj;
    }));

    setIsAddUnitModalOpen(false);
    setNewUnit({ unitNo: '', size: '', price: '', status: 'Vacant' });
    showToast(`Unit ${newUnit.unitNo} added to inventory!`);
  };

  // Handle Add Shareholder / Buyer
  const handleAddShareholderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShareholder.customerName.trim()) return;

    const shareholderItem = {
      id: 'cs_' + Date.now(),
      customerName: newShareholder.customerName,
      phone: newShareholder.phone || '+880 1700-000000',
      unitNo: newShareholder.unitNo || 'Unit-101',
      sharesCount: Number(newShareholder.sharesCount) || 1,
      purchaseDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      amountPaid: newShareholder.amountPaid || '৳ 25,00,000',
      status: newShareholder.status
    };

    setProjectList(prev => prev.map(proj => {
      if (proj.id === currentProject.id) {
        return {
          ...proj,
          totalCustomers: proj.totalCustomers + 1,
          customerShareholders: [shareholderItem, ...proj.customerShareholders]
        };
      }
      return proj;
    }));

    setIsAddShareholderModalOpen(false);
    setNewShareholder({ customerName: '', phone: '', unitNo: '', sharesCount: 1, amountPaid: '', status: 'Confirmed' });
    showToast(`Buyer / Shareholder ${newShareholder.customerName} added successfully!`);
  };

  const displayUnits: ProjectUnitStockItem[] = currentProject.customUnits || Array.from({ length: 12 }).map((_, idx) => {
    const isVacant = idx % 3 === 0;
    const isBooked = idx % 5 === 0 && !isVacant;
    return {
      id: `default_unit_${idx}`,
      unitNo: `Unit-${101 + idx}`,
      size: currentProject.projectType === 'Land Project' ? '5 Katha' : '1,800 SQFT',
      price: isVacant ? '৳ 1.20 Crore' : isBooked ? 'Token Received' : 'Owned',
      status: (isVacant ? 'Vacant' : isBooked ? 'Booked' : 'Sold') as 'Vacant' | 'Booked' | 'Sold'
    };
  });

  return (
    <div className="space-y-6 font-sans pb-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Project Overview Card - Clean White Theme */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-2xs space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="flex items-start gap-3">
            {onBackToAllProjects && (
              <button
                onClick={onBackToAllProjects}
                className="p-2 bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-800 rounded-xl transition-all border border-gray-200 flex items-center justify-center shrink-0 mt-0.5 cursor-pointer"
                title="Back to All Projects"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                  {currentProject.projectType}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {currentProject.status}
                </span>
                <span className="text-xs font-bold text-gray-500">Branch: {currentProject.branch}</span>
              </div>
              <h1 className="text-xl font-black tracking-tight text-gray-900 mt-2">{currentProject.projectName}</h1>
              <p className="text-xs text-gray-600 flex items-center gap-1.5 mt-1 font-medium">
                <MapPin size={14} className="text-amber-600 shrink-0" />
                <span>{currentProject.location}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-500 font-mono">Land Area: {currentProject.totalLandArea}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Project Switcher Selector */}
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
              <label className="text-xs font-bold text-gray-700">Project:</label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="text-xs font-extrabold bg-amber-50 border border-amber-300 text-amber-900 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-600 shadow-2xs cursor-pointer"
              >
                {projectList.map(p => (
                  <option key={p.id} value={p.id}>{p.projectName}</option>
                ))}
              </select>
            </div>

            <div className="text-right bg-amber-50/80 p-3 rounded-xl border border-amber-200/80 min-w-[180px]">
              <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block">Estimated Budget</span>
              <span className="text-lg font-black text-amber-900 font-mono">{currentProject.projectBudget}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed max-w-3xl font-medium">
          {currentProject.description}
        </p>

        {/* Key Metrics Dashboard Row - White / Gray Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-1">
          {/* 1. Project Launch & Completion Date */}
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200/80">
            <div className="flex items-center gap-2 text-amber-700 text-[10px] font-extrabold uppercase tracking-wider">
              <Calendar size={14} />
              <span>Project Timeline</span>
            </div>
            <p className="text-xs font-extrabold text-gray-900 mt-2 font-mono">
              Start: <span className="text-amber-800">{currentProject.startDate}</span>
            </p>
            <p className="text-[10px] text-gray-500 font-mono mt-0.5">
              Target: {currentProject.completionDate}
            </p>
          </div>

          {/* 2. Total Customers */}
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200/80">
            <div className="flex items-center gap-2 text-blue-700 text-[10px] font-extrabold uppercase tracking-wider">
              <Users size={14} />
              <span>Total Customers</span>
            </div>
            <p className="text-xl font-black text-gray-900 mt-1 font-mono">
              {currentProject.totalCustomers} <span className="text-xs font-semibold text-gray-500">Buyers</span>
            </p>
            <p className="text-[10px] text-blue-800 font-medium mt-0.5">
              Active booking shareholders
            </p>
          </div>

          {/* 3. Customer Shares Distribution */}
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200/80">
            <div className="flex items-center gap-2 text-purple-700 text-[10px] font-extrabold uppercase tracking-wider">
              <Share2 size={14} />
              <span>Shares Distribution</span>
            </div>
            <p className="text-xl font-black text-gray-900 mt-1 font-mono">
              {currentProject.soldShares} <span className="text-xs font-medium text-gray-400">/ {currentProject.totalShares}</span>
            </p>
            <p className="text-[10px] text-purple-900 font-bold mt-0.5">
              Available: <strong className="text-emerald-700">{currentProject.availableShares} Shares</strong>
            </p>
          </div>

          {/* 4. Vacant Flats / Units Available */}
          <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200/80">
            <div className="flex items-center gap-2 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider">
              <Home size={14} />
              <span>Flats Available to Sell</span>
            </div>
            <p className="text-xl font-black text-emerald-800 mt-1 font-mono">
              {currentProject.vacantFlats} <span className="text-xs font-extrabold text-emerald-900">Vacant</span>
            </p>
            <p className="text-[10px] text-emerald-700 font-medium mt-0.5">
              Out of {currentProject.totalFlats} total units
            </p>
          </div>

          {/* 5. Sold vs Booked Breakdown */}
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200/80 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-orange-700 text-[10px] font-extrabold uppercase tracking-wider">
              <PieChart size={14} />
              <span>Sales Breakdown</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs font-bold font-mono">
              <span className="text-gray-800">{currentProject.soldFlats} Sold</span>
              <span className="text-gray-300">•</span>
              <span className="text-amber-700">{currentProject.bookedFlats} Booked</span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden flex">
              <div 
                className="bg-slate-700 h-full" 
                style={{ width: `${(currentProject.soldFlats / currentProject.totalFlats) * 100}%` }} 
              />
              <div 
                className="bg-amber-500 h-full" 
                style={{ width: `${(currentProject.bookedFlats / currentProject.totalFlats) * 100}%` }} 
              />
              <div 
                className="bg-emerald-500 h-full" 
                style={{ width: `${(currentProject.vacantFlats / currentProject.totalFlats) * 100}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Flat Stock & Customer Shareholders */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* SECTION 1: FLATS & STOCK AVAILABILITY */}
          <div id="section-stock" className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                  <Home size={18} className="text-amber-600" />
                  <span>Flats & Plot Stock Inventory Grid</span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">
                  Available vacant flats ready to sell vs booked/sold units
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-[11px] font-bold">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" />
                    <span className="text-gray-700">Vacant ({currentProject.vacantFlats})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm" />
                    <span className="text-gray-700">Booked ({currentProject.bookedFlats})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-slate-700 rounded-sm" />
                    <span className="text-gray-700">Sold ({currentProject.soldFlats})</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsAddUnitModalOpen(true)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add New</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              {displayUnits.map((u) => {
                const isVacant = u.status === 'Vacant';
                const isBooked = u.status === 'Booked';

                return (
                  <div
                    key={u.id}
                    className={`p-3 rounded-xl border flex flex-col justify-between space-y-2 transition-all ${
                      isVacant
                        ? 'bg-emerald-50/70 border-emerald-300 hover:border-emerald-500 shadow-2xs'
                        : isBooked
                        ? 'bg-amber-50/70 border-amber-300'
                        : 'bg-gray-100/80 border-gray-200 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-gray-900">{u.unitNo}</span>
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                        isVacant ? 'bg-emerald-600 text-white' :
                        isBooked ? 'bg-amber-600 text-white' :
                        'bg-slate-700 text-white'
                      }`}>
                        {u.status}
                      </span>
                    </div>

                    <div className="text-[10px] text-gray-600 font-medium">
                      <p>Size: {u.size}</p>
                      <p className="font-mono font-bold text-gray-900 mt-0.5">
                        {u.price}
                      </p>
                    </div>

                    {isVacant ? (
                      <button 
                        onClick={() => {
                          const unitDetailStr = `${u.unitNo} • ${u.size} • ${currentProject.projectName}`;
                          if (onBookUnit) {
                            onBookUnit(currentProject.projectName, unitDetailStr);
                          } else {
                            alert(`Redirecting to book unit ${u.unitNo}...`);
                          }
                        }}
                        className="w-full py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                      >
                        <span>Book Unit</span>
                        <ArrowRight size={11} />
                      </button>
                    ) : (
                      <div className="text-[9px] text-gray-400 font-semibold text-center py-0.5">
                        Unavailable
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: CUSTOMER SHAREHOLDERS LIST */}
          <div id="section-shareholders" className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                <Users size={18} className="text-amber-600" />
                <span>Customer Shareholders & Unit Buyers</span>
              </h3>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Customer Search */}
                <div className="relative w-48 sm:w-56">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search buyer, unit..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <button
                  onClick={() => setIsAddShareholderModalOpen(true)}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add New</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 font-extrabold uppercase tracking-wider text-[10px] border-b border-gray-200">
                    <th className="py-2.5 px-3">CUSTOMER NAME</th>
                    <th className="py-2.5 px-3">CONTACT</th>
                    <th className="py-2.5 px-3">UNIT NO</th>
                    <th className="py-2.5 px-3 text-center">SHARES</th>
                    <th className="py-2.5 px-3 font-mono">PAID</th>
                    <th className="py-2.5 px-3 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-xs">
                  {filteredShareholders.length > 0 ? (
                    filteredShareholders.map(cs => (
                      <tr key={cs.id} className="hover:bg-amber-50/20 transition-colors">
                        <td className="py-2.5 px-3 font-extrabold text-gray-900">{cs.customerName}</td>
                        <td className="py-2.5 px-3 text-gray-600 font-mono text-[11px] flex items-center gap-1">
                          <Phone size={11} className="text-gray-400 shrink-0" />
                          <span>{cs.phone}</span>
                        </td>
                        <td className="py-2.5 px-3 font-bold text-amber-800">{cs.unitNo}</td>
                        <td className="py-2.5 px-3 text-center font-black text-gray-800">
                          <span className="bg-purple-50 text-purple-800 px-2 py-0.5 rounded-md border border-purple-200 text-[10px]">
                            {cs.sharesCount}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-black text-gray-900 font-mono text-[11px]">{cs.amountPaid}</td>
                        <td className="py-2.5 px-3 text-right">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {cs.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        No customer shareholders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Project History Timeline */}
        <div className="lg:col-span-5 space-y-6">
          <div id="section-timeline" className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs space-y-5 sticky top-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                <Clock size={18} className="text-amber-600" />
                <span>Project Milestone History</span>
              </h3>
              
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  {currentProject.timelineEvents.length} Events
                </span>
                
                <button
                  onClick={() => setIsAddMilestoneModalOpen(true)}
                  className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <Plus size={13} />
                  <span>Add New</span>
                </button>
              </div>
            </div>

            <div className="relative border-l-2 border-amber-200 ml-3 space-y-5 pl-5 py-1">
              {currentProject.timelineEvents.map((evt, idx) => (
                <div key={idx} className="relative group">
                  {/* Status Dot Icon */}
                  <div className={`absolute -left-[27px] top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center text-white ${
                    evt.status === 'Completed' ? 'bg-emerald-600 border-emerald-200' :
                    evt.status === 'In Progress' ? 'bg-amber-500 border-amber-200 animate-pulse' :
                    'bg-gray-300 border-gray-100'
                  }`}>
                    {evt.status === 'Completed' ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                  </div>

                  <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-200/80 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="font-mono text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {evt.date}
                      </span>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                        evt.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        evt.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {evt.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-extrabold text-gray-900 pt-1">{evt.title}</h4>
                    <p className="text-[11px] text-gray-600 font-medium leading-relaxed">{evt.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Modal 1: Add Milestone Event */}
      {isAddMilestoneModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="text-amber-600" size={20} />
                <h3 className="font-extrabold text-gray-900 text-base">Add Project Milestone Event</h3>
              </div>
              <button
                onClick={() => setIsAddMilestoneModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMilestoneSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Milestone Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. RAJUK Approval & Foundation Work"
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Event Date</label>
                  <input
                    type="text"
                    placeholder="e.g. 15 Aug, 2025"
                    value={newMilestone.date}
                    onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Status</label>
                  <select
                    value={newMilestone.status}
                    onChange={(e) => setNewMilestone({ ...newMilestone, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 font-bold bg-gray-50"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description / Details</label>
                <textarea
                  rows={3}
                  placeholder="Describe key achievements or progress in this stage..."
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddMilestoneModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-extrabold shadow-sm cursor-pointer"
                >
                  Add Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Add Unit / Flat Stock */}
      {isAddUnitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Home className="text-emerald-600" size={20} />
                <h3 className="font-extrabold text-gray-900 text-base">Add Flat / Plot Stock Unit</h3>
              </div>
              <button
                onClick={() => setIsAddUnitModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddUnitSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Unit / Plot No *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unit-5A or Plot B-102"
                  value={newUnit.unitNo}
                  onChange={(e) => setNewUnit({ ...newUnit, unitNo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Unit Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 1,800 SQFT or 5 Katha"
                    value={newUnit.size}
                    onChange={(e) => setNewUnit({ ...newUnit, size: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Price</label>
                  <input
                    type="text"
                    placeholder="e.g. ৳ 1.25 Crore"
                    value={newUnit.price}
                    onChange={(e) => setNewUnit({ ...newUnit, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Initial Status</label>
                <select
                  value={newUnit.status}
                  onChange={(e) => setNewUnit({ ...newUnit, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 font-bold bg-gray-50"
                >
                  <option value="Vacant">Vacant (Available to Sell)</option>
                  <option value="Booked">Booked (Token Paid)</option>
                  <option value="Sold">Sold (Confirmed)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddUnitModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold shadow-sm cursor-pointer"
                >
                  Add Unit Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Add Customer Shareholder / Buyer */}
      {isAddShareholderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Users className="text-purple-600" size={20} />
                <h3 className="font-extrabold text-gray-900 text-base">Add Customer Shareholder / Buyer</h3>
              </div>
              <button
                onClick={() => setIsAddShareholderModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddShareholderSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariqul Islam"
                  value={newShareholder.customerName}
                  onChange={(e) => setNewShareholder({ ...newShareholder, customerName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 font-extrabold text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="e.g. +880 1711-889900"
                    value={newShareholder.phone}
                    onChange={(e) => setNewShareholder({ ...newShareholder, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Allocated Unit / Plot</label>
                  <input
                    type="text"
                    placeholder="e.g. Plot A-105 / Flat 3B"
                    value={newShareholder.unitNo}
                    onChange={(e) => setNewShareholder({ ...newShareholder, unitNo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Shares Count</label>
                  <input
                    type="number"
                    min="1"
                    value={newShareholder.sharesCount}
                    onChange={(e) => setNewShareholder({ ...newShareholder, sharesCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 font-extrabold text-center"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Amount Paid</label>
                  <input
                    type="text"
                    placeholder="e.g. ৳ 50,00,000"
                    value={newShareholder.amountPaid}
                    onChange={(e) => setNewShareholder({ ...newShareholder, amountPaid: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Booking Status</label>
                <select
                  value={newShareholder.status}
                  onChange={(e) => setNewShareholder({ ...newShareholder, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 font-bold bg-gray-50"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Token Paid">Token Paid</option>
                  <option value="Pending Approval">Pending Approval</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddShareholderModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-extrabold shadow-sm cursor-pointer"
                >
                  Add Shareholder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
