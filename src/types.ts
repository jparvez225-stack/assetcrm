export type NavItem = 
  | 'dashboard'
  | 'lead'
  | 'add-lead'
  | 'lead-activity'
  | 'call-history'
  | 'lead-category'
  | 'lead-source'
  | 'salesman-performance'
  | 'referral'
  | 'referral-details'
  | 'notification'
  | 'report'
  | 'inventory-all-projects'
  | 'inventory-project-history'
  | 'inventory-buyers-stakeholders'
  | 'inventory-flats-plot-stock'
  | 'accounts-all-projects';

export interface FlatPlotStockItem {
  id: string;
  unitPlotNo: string;
  projectName: string;
  type: 'Flat' | 'Plot' | 'Commercial Space';
  size: string;
  floorOrBlock: string;
  facing: string;
  price: string;
  status: 'Vacant' | 'Booked' | 'Sold' | 'Hold';
  buyerName?: string;
  bookingDate?: string;
  remarks?: string;
}

export interface BuyerPaymentRecord {
  id: string;
  date: string;
  voucherNo: string;
  projectName: string;
  purpose: string;
  method: string;
  amount: string;
  status: 'Verified' | 'Pending' | 'Rejected';
}

export interface BuyerProjectPurchase {
  id: string;
  projectName: string;
  unitOrPlotNo: string;
  sharesOrSize: string;
  type: 'Unit Buyer' | 'Project Shareholder' | 'Joint Venture Partner' | 'Investor';
  totalAmount: string;
  paidAmount: string;
  dueAmount: string;
  purchaseDate: string;
  status: 'Confirmed' | 'Token Paid' | 'Pending Verification' | 'Handover Completed';
  payments?: BuyerPaymentRecord[];
}

export interface BuyerStakeholderItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  nid?: string;
  type: 'Unit Buyer' | 'Project Shareholder' | 'Joint Venture Partner' | 'Investor';
  projectName: string;
  unitOrPlotNo: string;
  sharesOrSize: string;
  totalAmount: string;
  paidAmount: string;
  dueAmount: string;
  joiningDate: string;
  status: 'Confirmed' | 'Token Paid' | 'Pending Verification';
  address?: string;
  projectPurchases?: BuyerProjectPurchase[];
  paymentHistory?: BuyerPaymentRecord[];
}

export interface ProjectUnitStockItem {
  id: string;
  unitNo: string;
  size: string;
  price: string;
  status: 'Vacant' | 'Booked' | 'Sold';
}

export interface ProjectHistoryDetail {
  id: string;
  projectName: string;
  location: string;
  startDate: string;
  completionDate: string;
  projectType: 'Land Project' | 'Residential Building' | 'Commercial Complex';
  status: 'Ongoing' | 'Near Completion' | 'Sold Out' | 'Upcoming';
  branch: string;
  totalCustomers: number;
  totalShares: number;
  soldShares: number;
  availableShares: number;
  totalFlats: number;
  vacantFlats: number;
  soldFlats: number;
  bookedFlats: number;
  totalLandArea: string;
  projectBudget: string;
  description: string;
  customUnits?: ProjectUnitStockItem[];
  timelineEvents: {
    date: string;
    title: string;
    status: 'Completed' | 'In Progress' | 'Upcoming';
    description: string;
  }[];
  customerShareholders: {
    id: string;
    customerName: string;
    phone: string;
    unitNo: string;
    sharesCount: number;
    purchaseDate: string;
    amountPaid: string;
    status: string;
  }[];
}

export interface InventoryProjectItem {
  id: string;
  projectName: string;
  location: string;
  projectType: 'Land Project' | 'Residential Building' | 'Commercial Complex';
  totalUnits: number;
  availableUnits: number;
  soldUnits: number;
  tokenUnits: number;
  pricePerUnit: string;
  totalProjectValue: string;
  status: 'Ongoing' | 'Near Completion' | 'Sold Out' | 'Upcoming';
  branch: string;
}

export interface AccountsProjectBookingItem {
  id: string;
  sl: string;
  projectName: string;
  location: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  unitDetails: string;
  bookingDate: string;
  sellingPrice: string;
  commission: string;
  profit: string;
  status: 'Commission Paid' | 'Pending' | 'On Hold';
  branch: string;
  salesman: string;
}

export interface InventoryPlot {
  id: string;
  plotNo: string;
  block: string;
  size: string; // e.g. 5 Katha
  facing: string; // e.g. South
  status: 'Available' | 'Token Deposit' | 'Sold';
  price: string;
  buyerName?: string;
  phone?: string;
  salesmanName?: string;
  bookingDate?: string;
}

export interface AccountsLedgerItem {
  id: string;
  sl: string;
  bookingDate: string;
  projectName: string;
  unitDetails: string; // e.g. Plot A-102 • 5 Katha • South
  clientName: string;
  salesman: string;
  grossSale: string;
  commission: string;
  netProfit: string;
  status: 'Commission Paid' | 'Pending' | 'On Hold';
  branch: string;
}

export interface LeadSourceItem {
  id: string;
  sl: number;
  name: string;
  leadsCount: number;
  currentWeek: number;
  lastWeek: number;
  performancePercent: number;
  status: 'Active' | 'Inactive';
}

export type LeadStatus = 
  | 'New Lead'
  | 'Assigned'
  | 'First Contact'
  | 'Contacted'
  | 'No Answer'
  | 'Busy'
  | 'Callback Requested'
  | 'Follow-up Scheduled'
  | 'Brochure & Price Shared'
  | 'Interested'
  | 'Highly Interested'
  | 'Site Visit Scheduled'
  | 'Site Visit Completed'
  | 'Negotiation'
  | 'Booking'
  | 'Booking Money Pending'
  | 'Booking Confirmed'
  | 'Documentation Pending'
  | 'Agreement Signed'
  | 'Payment Pending'
  | 'Payment Completed'
  | 'Closed Won'
  | 'Closed Lost';

export const LEAD_STATUS_LIST: LeadStatus[] = [
  'New Lead',
  'Assigned',
  'First Contact',
  'Contacted',
  'No Answer',
  'Busy',
  'Callback Requested',
  'Follow-up Scheduled',
  'Brochure & Price Shared',
  'Interested',
  'Highly Interested',
  'Site Visit Scheduled',
  'Site Visit Completed',
  'Negotiation',
  'Booking',
  'Booking Money Pending',
  'Booking Confirmed',
  'Documentation Pending',
  'Agreement Signed',
  'Payment Pending',
  'Payment Completed',
  'Closed Won',
  'Closed Lost',
];

export interface Lead {
  id: string;
  sl: string;
  date: string;
  name: string; // Client/Buyer Name
  phone: string;
  email: string;
  occupation: string;
  nid: string;
  address: string;
  // Plot / Real Estate Preferences
  projectName: string; // e.g., Purbachal Green City, Bashundhara Enclave
  requiredPlotSize: string; // e.g., 5 Katha, 3 Katha, 2400 sqft
  facingPreference: 'South' | 'North' | 'East' | 'West' | 'Corner';
  budgetLimit: string; // e.g. ৳ 1.5 Crore
  projectType: 'Residential' | 'Commercial' | 'Plot' | 'Luxury Villa';
  prefTime: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  status: LeadStatus;
  assignedSalesman: string;
  source: 'Facebook' | 'WhatsApp' | 'Youtube' | 'Portal' | 'Email';
  lastCallDate: string;
  callCount: number;
  messageCount: number;
  note: string;
  lostReason?: 'Budget' | 'Unresponsive' | 'Competitor' | 'Location Issue';
}

export interface Salesman {
  id: string;
  name: string;
  title: string;
  department: string;
  avatar: string;
  phone: string;
  email: string;
  totalLeadAssign: number;
  bookedSold: number;
  contacted: number;
  lost: number;
  performanceRate: number; // percentage
  score: string; // e.g. "92/100"
  isTopPerformer?: boolean;
}

export interface ReferralItem {
  id: string;
  sl: string;
  name: string;
  phone: string;
  email: string;
  occupation: string;
  nid: string;
  dob: string;
  instituteCompany: string;
  address: string;
  bloodGroup: string;
  bkashNumber: string;
  branch: string;
  referralType: 'Student/Influencer/Agent' | 'Agent' | 'Influencer' | 'Client';
  totalVisitors: number;
  enrolledBookings: number;
  interested: number;
  date: string;
  commission: number;
  status: 'Active' | 'Inactive';
  paymentHistory?: {
    totalCommission: number;
    withdrawn: number;
    currentBalance: number;
  };
}

export interface CallLog {
  id: string;
  leadId: string;
  leadName: string;
  projectName: string;
  phone: string;
  email: string;
  type: string;
  date: string;
  time: string;
  notes: string;
  nextFollowUpDate?: string;
  callResult?: LeadStatus | string;
  duration?: string;
  executiveName?: string;
  channel?: 'Phone Call' | 'WhatsApp' | 'Site Visit' | 'Office Meeting' | 'Email' | 'System';
}

export interface LeadCategoryItem {
  id: string;
  sl: string;
  name: string;
  image: string;
  totalLeads: number;
  status: boolean;
  note: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  isRead: boolean;
  type: 'lead-reminder' | 'approval' | 'support' | 'deal';
}

export interface ReportRow {
  id: string;
  consultant: string;
  projectName: string;
  branch: string;
  totalLeads: number;
  assignedLeads: number;
  contacted: number;
  remaining: number;
  busy: number;
  interested: number;
  followUp: number;
  enrolled: number;
  cancelled: number;
  notReceived: number;
  callRejected: number;
  progress: string;
}
