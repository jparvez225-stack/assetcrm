export type NavItem = 
  | 'dashboard'
  | 'lead'
  | 'add-lead'
  | 'lead-activity'
  | 'call-history'
  | 'lead-category'
  | 'salesman-performance'
  | 'referral'
  | 'referral-details'
  | 'notification'
  | 'report';

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
  status: 'Enrolled' | 'Contacted' | 'Follow Up' | 'Interested' | 'Busy' | 'Site Visit' | 'Booked/Sold' | 'Lost';
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
  type: 'Enrolled' | 'Call' | 'Interested' | 'Busy' | 'Follow Up' | 'Site Visit' | 'Booked/Sold' | 'Lost';
  date: string;
  time: string;
  notes: string;
  nextFollowUpDate?: string;
  callResult?: string;
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
