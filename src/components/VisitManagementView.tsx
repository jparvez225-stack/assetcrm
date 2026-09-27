import React, { useState, useMemo, useEffect } from 'react';
import { 
  UserCheck, 
  Zap, 
  Clock, 
  Building, 
  Star, 
  Search, 
  ChevronDown, 
  Plus, 
  Download, 
  Share2, 
  Eye, 
  Calendar, 
  UserPlus, 
  Edit3, 
  Printer, 
  Check, 
  X, 
  CheckSquare,
  Car,
  MapPin,
  Phone,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users,
  Store,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Sparkles,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Send
} from 'lucide-react';
import { NewVisitBookingPage } from './NewVisitBookingPage';
import { VisitorDetailsInnerPage } from './VisitorDetailsInnerPage';
import { VisitRequest } from '../types';
import { initialVisitRequests } from '../mockData';
import { ConfirmVisitSlotModal } from './ConfirmVisitSlotModal';

export interface VisitorRecord {
  id: string;
  sl: string;
  bookingId: string;
  bookingDate: string;
  visitDate: string;
  reportingTime: string;
  projectName: string;
  salesTeam: string;
  salesman: string;
  name: string;
  phone: string;
  noOfVisitor: number;
  pickupLocation: string;
  driverName: string;
  projectRepresentative: string;
  vehicleNo: string;
  status: 'Site Visit Scheduled' | 'First Contact' | 'Contacted' | 'Visit Completed' | 'Booking Confirmed' | 'Cancelled';
  vehicleStatus: 'Assigned' | 'En Route' | 'On Site' | 'Completed' | 'Standby' | 'Vehicle Conflict';
  
  // Secondary metadata
  whatsapp?: string;
  email?: string;
  unitSpec?: string;
  referrerName?: string;
  referrerType?: string;
  source?: 'Referral' | 'Facebook' | 'WhatsApp' | 'Website' | 'Digital Media' | 'Walk-in' | 'Lead Request';
  category?: string;
  branch?: string;
  notes?: string;
  visitTime?: string;
}

const INITIAL_VISITORS: VisitorRecord[] = [
  {
    id: 'vis-01',
    sl: '01',
    bookingId: 'BK-2026-0891',
    bookingDate: '2026-09-08',
    visitDate: '2026-09-14',
    reportingTime: '10:30 AM',
    projectName: 'Purbachal Green Valley Project',
    salesTeam: 'Alpha Team (Land Division)',
    salesman: 'Siddique Rahman',
    name: 'Md. Rahim Mia',
    phone: '01700066699',
    noOfVisitor: 3,
    pickupLocation: 'Gulshan-2 Circle (North)',
    driverName: 'Alamgir Hossain (01712334455)',
    projectRepresentative: 'Engr. Tanvir Ahmed',
    vehicleNo: 'Dhaka Metro-GA 24-8812 (Toyota Prado)',
    status: 'Site Visit Scheduled',
    vehicleStatus: 'Assigned',
    whatsapp: '01700066699',
    email: 'jccdhaka@gmail.com',
    referrerName: 'Md. Jahid Parvez',
    referrerType: 'Agent',
    unitSpec: '5 Katha • South',
    source: 'Referral',
    category: 'Digital Media',
    branch: 'Dhaka',
    notes: 'Interest to book 5 Katha South Facing plot by 14-03-2026'
  },
  {
    id: 'vis-02',
    sl: '02',
    bookingId: 'BK-2026-0892',
    bookingDate: '2026-09-09',
    visitDate: '2026-09-15',
    reportingTime: '02:00 PM',
    projectName: 'Bashundhara Block-I Luxury Heights',
    salesTeam: 'Bravo Team (Luxury Condo)',
    salesman: 'Siddique Rahman',
    name: 'Raja Jisan Khan',
    phone: '01700066699',
    noOfVisitor: 2,
    pickupLocation: 'Bashundhara R/A Gate-1',
    driverName: 'Zahirul Islam (01822334411)',
    projectRepresentative: 'Ar. Nabila Rahman',
    vehicleNo: 'Dhaka Metro-CHA 53-1200 (HiAce Micro)',
    status: 'First Contact',
    vehicleStatus: 'Standby',
    whatsapp: '01700066699',
    email: 'jccdhaka@gmail.com',
    unitSpec: '2400 sqft • North',
    source: 'Facebook',
    category: 'Digital Media',
    branch: 'Dhaka',
    notes: 'Budget Problem, requested instalment flexible schedule'
  },
  {
    id: 'vis-03',
    sl: '03',
    bookingId: 'BK-2026-0893',
    bookingDate: '2026-09-07',
    visitDate: '2026-09-13',
    reportingTime: '11:00 AM',
    projectName: 'Gulshan Avenue Commercial Plaza',
    salesTeam: 'Commercial Assets Group',
    salesman: 'Md. Rahim Sarder',
    name: 'Karim Khandokar',
    phone: '01700066699',
    noOfVisitor: 4,
    pickupLocation: 'Banani Road 11 (Head Office)',
    driverName: 'Rafiq Mia (01911223344)',
    projectRepresentative: 'Mahbubur Rahman',
    vehicleNo: 'Dhaka Metro-GA 11-4099 (Corolla Cross)',
    status: 'Contacted',
    vehicleStatus: 'Vehicle Conflict',
    whatsapp: '01700066699',
    email: 'jccdhaka@gmail.com',
    unitSpec: '1800 sqft • Corner',
    source: 'WhatsApp',
    category: 'Digital Media',
    branch: 'Dhaka',
    notes: 'Scheduled site visit for upcoming Saturday'
  },
  {
    id: 'vis-04',
    sl: '04',
    bookingId: 'BK-2026-0894',
    bookingDate: '2026-09-08',
    visitDate: '2026-09-14',
    reportingTime: '03:30 PM',
    projectName: 'Purbachal Green Valley Project',
    salesTeam: 'Alpha Team (Land Division)',
    salesman: 'Siddique Rahman',
    name: 'Abdul Karim',
    phone: '01700066699',
    noOfVisitor: 2,
    pickupLocation: 'Uttara Sector 3 (Plaza)',
    driverName: 'Alamgir Hossain (01712334455)',
    projectRepresentative: 'Engr. Tanvir Ahmed',
    vehicleNo: 'Dhaka Metro-GA 24-8812 (Toyota Prado)',
    status: 'Site Visit Scheduled',
    vehicleStatus: 'Vehicle Conflict',
    whatsapp: '01700066699',
    email: 'jccdhaka@gmail.com',
    referrerName: 'Engr. Faruq Ahmed',
    referrerType: 'Partner',
    unitSpec: '10 Katha • East',
    source: 'Website',
    category: 'Digital Media',
    branch: 'Dhaka',
    notes: 'VIP Corporate visit with family, boundary demarcation review'
  },
  {
    id: 'vis-05',
    sl: '05',
    bookingId: 'BK-2026-0895',
    bookingDate: '2026-09-05',
    visitDate: '2026-09-10',
    reportingTime: '11:30 AM',
    projectName: 'Emerald Hills Residences',
    salesTeam: 'Elite Prime Team',
    salesman: 'Farhana Yasmin',
    name: 'Mustaque Ahmed',
    phone: '01912345678',
    noOfVisitor: 3,
    pickupLocation: 'Dhanmondi 27 (Star Kabab)',
    driverName: 'Zahirul Islam (01822334411)',
    projectRepresentative: 'Sayed Mostafa',
    vehicleNo: 'Dhaka Metro-CHA 53-1200 (HiAce Micro)',
    status: 'Visit Completed',
    vehicleStatus: 'Completed',
    whatsapp: '01912345678',
    email: 'mustaque@gmail.com',
    unitSpec: 'Type A Duplex • Lake View',
    source: 'Digital Media',
    category: 'Digital Media',
    branch: 'Dhaka',
    notes: 'Completed site tour; positive impression, awaiting token advance'
  },
  {
    id: 'vis-06',
    sl: '06',
    bookingId: 'BK-2026-0896',
    bookingDate: '2026-09-04',
    visitDate: '2026-09-08',
    reportingTime: '10:00 AM',
    projectName: 'Promise Crown Sovereign',
    salesTeam: 'NRB Global Desk',
    salesman: 'Rashedul Karim',
    name: 'Kabir Chowdhury (London, UK)',
    phone: '+44 7911 123456',
    noOfVisitor: 2,
    pickupLocation: 'Westin Hotel Dhaka Lobby',
    driverName: 'Rafiq Mia (01911223344)',
    projectRepresentative: 'Asifur Rahman',
    vehicleNo: 'Dhaka Metro-GA 11-4099 (Corolla Cross)',
    status: 'Booking Confirmed',
    vehicleStatus: 'Completed',
    whatsapp: '+44 7911 123456',
    email: 'kabir.uk@yahoo.com',
    referrerName: 'Prime Agency',
    referrerType: 'Affiliate',
    unitSpec: 'Penthouse • 3200 sqft',
    source: 'Referral',
    category: 'Digital Media',
    branch: 'Dhaka',
    notes: 'Expatriate investor; token money submitted via Sonali Bank Remittance'
  },
  {
    id: 'vis-07',
    sl: '07',
    bookingId: 'BK-2026-0897',
    bookingDate: '2026-09-06',
    visitDate: '2026-09-12',
    reportingTime: '03:00 PM',
    projectName: 'Bashundhara Block-I Luxury Heights',
    salesTeam: 'Bravo Team (Luxury Condo)',
    salesman: 'Siddique Rahman',
    name: 'Dr. Shahabuddin Al-Mahmud',
    phone: '01711223344',
    noOfVisitor: 4,
    pickupLocation: 'Evercare Hospital Gate-2',
    driverName: 'Alamgir Hossain (01712334455)',
    projectRepresentative: 'Ar. Nabila Rahman',
    vehicleNo: 'Dhaka Metro-GA 24-8812 (Toyota Prado)',
    status: 'Site Visit Scheduled',
    vehicleStatus: 'En Route',
    whatsapp: '01711223344',
    email: 'dr.shahab@apollo.com.bd',
    referrerName: 'Dr. Munir',
    referrerType: 'Affiliate',
    unitSpec: '3100 sqft • South-East',
    source: 'Referral',
    category: 'Walk-in',
    branch: 'Dhaka',
    notes: 'Requires 2 dedicated car parking slots, requested weekend afternoon slot'
  },
  {
    id: 'vis-08',
    sl: '08',
    bookingId: 'BK-2026-0898',
    bookingDate: '2026-09-07',
    visitDate: '2026-09-13',
    reportingTime: '10:30 AM',
    projectName: 'Purbachal Green Valley Project',
    salesTeam: 'Alpha Team (Land Division)',
    salesman: 'Md. Rahim Sarder',
    name: 'Nusrat Jahan Chowdhury',
    phone: '01819998877',
    noOfVisitor: 3,
    pickupLocation: 'NSU Campus Gate-8',
    driverName: 'Zahirul Islam (01822334411)',
    projectRepresentative: 'Engr. Tanvir Ahmed',
    vehicleNo: 'Dhaka Metro-CHA 53-1200 (HiAce Micro)',
    status: 'Contacted',
    vehicleStatus: 'Standby',
    whatsapp: '01819998877',
    email: 'nusrat.jahan@northsouth.edu',
    unitSpec: '7.5 Katha • North Facing',
    source: 'Facebook',
    category: 'Digital Media',
    branch: 'Dhaka',
    notes: 'Inquired about corner plot boundary safety & lake connection road status'
  },
  {
    id: 'vis-09',
    sl: '09',
    bookingId: 'BK-2026-0899',
    bookingDate: '2026-09-03',
    visitDate: '2026-09-09',
    reportingTime: '02:30 PM',
    projectName: 'Gulshan Avenue Commercial Plaza',
    salesTeam: 'Commercial Assets Group',
    salesman: 'Rashedul Karim',
    name: 'Engr. Tariqul Islam',
    phone: '01915554433',
    noOfVisitor: 5,
    pickupLocation: 'Mohakhali DOHS Gate-3',
    driverName: 'Rafiq Mia (01911223344)',
    projectRepresentative: 'Mahbubur Rahman',
    vehicleNo: 'Dhaka Metro-GA 11-4099 (Corolla Cross)',
    status: 'Visit Completed',
    vehicleStatus: 'Completed',
    whatsapp: '01915554433',
    email: 'tariqul.is@gmail.com',
    unitSpec: '4200 sqft • Full Floor',
    source: 'Website',
    category: 'Digital Media',
    branch: 'Dhaka',
    notes: 'Corporate office setup inquiry for multinational IT firm; site tour satisfied'
  },
  {
    id: 'vis-10',
    sl: '10',
    bookingId: 'BK-2026-0900',
    bookingDate: '2026-09-02',
    visitDate: '2026-09-07',
    reportingTime: '11:00 AM',
    projectName: 'Emerald Hills Residences',
    salesTeam: 'Elite Prime Team',
    salesman: 'Farhana Yasmin',
    name: 'Al-Haj Anwar Hossain',
    phone: '01713332211',
    noOfVisitor: 4,
    pickupLocation: 'Chawkbazar Shahi Masjid',
    driverName: 'Alamgir Hossain (01712334455)',
    projectRepresentative: 'Sayed Mostafa',
    vehicleNo: 'Dhaka Metro-GA 24-8812 (Toyota Prado)',
    status: 'Booking Confirmed',
    vehicleStatus: 'Completed',
    whatsapp: '01713332211',
    email: 'anwar.traders@yahoo.com',
    referrerName: 'Mohammad Farooq',
    referrerType: 'Agent',
    unitSpec: 'Type B Penthouse • 2850 sqft',
    source: 'Walk-in',
    category: 'Walk-in',
    branch: 'Dhaka',
    notes: 'Token money 10 Lakh paid via cheque; drafting deed of agreement'
  },
  {
    id: 'vis-11',
    sl: '11',
    bookingId: 'BK-2026-0901',
    bookingDate: '2026-09-06',
    visitDate: '2026-09-11',
    reportingTime: '04:00 PM',
    projectName: 'Purbachal Green Valley Project',
    salesTeam: 'Alpha Team (Land Division)',
    salesman: 'Siddique Rahman',
    name: 'Mehedi Hasan',
    phone: '01612223344',
    noOfVisitor: 2,
    pickupLocation: 'Uttara House Building',
    driverName: 'Zahirul Islam (01822334411)',
    projectRepresentative: 'Engr. Tanvir Ahmed',
    vehicleNo: 'Dhaka Metro-CHA 53-1200 (HiAce Micro)',
    status: 'Cancelled',
    vehicleStatus: 'Standby',
    whatsapp: '01612223344',
    email: 'mehedi.h@outlook.com',
    unitSpec: '5 Katha • West Facing',
    source: 'Facebook',
    category: 'Digital Media',
    branch: 'Uttara',
    notes: 'Postponed due to personal medical emergency; promised follow up next month'
  },
  {
    id: 'vis-12',
    sl: '12',
    bookingId: 'BK-2026-0902',
    bookingDate: '2026-09-08',
    visitDate: '2026-09-12',
    reportingTime: '11:30 AM',
    projectName: 'Bashundhara Block-I Luxury Heights',
    salesTeam: 'Bravo Team (Luxury Condo)',
    salesman: 'Md. Rahim Sarder',
    name: 'Sayeda Sabrina Sultana',
    phone: '01714448899',
    noOfVisitor: 2,
    pickupLocation: 'Gulshan BRAC Bank Head Office',
    driverName: 'Rafiq Mia (01911223344)',
    projectRepresentative: 'Ar. Nabila Rahman',
    vehicleNo: 'Dhaka Metro-GA 11-4099 (Corolla Cross)',
    status: 'Site Visit Scheduled',
    vehicleStatus: 'On Site',
    whatsapp: '01714448899',
    email: 'sabrina.sultana@bracbank.com',
    referrerName: 'Shakil Ahmed',
    referrerType: 'Agent',
    unitSpec: '1950 sqft • Type C',
    source: 'Referral',
    category: 'Digital Media',
    branch: 'Dhaka',
    notes: 'Bank employee home loan scheme processing; visiting with spouse'
  },
  {
    id: 'vis-13',
    sl: '13',
    bookingId: 'BK-2026-0903',
    bookingDate: '2026-09-10',
    visitDate: '2026-09-16',
    reportingTime: '03:00 PM',
    projectName: 'Promise Crown Sovereign',
    salesTeam: 'Commercial Assets Group',
    salesman: 'Rashedul Karim',
    name: 'Kamrul Hassan Ripon',
    phone: '01817776655',
    noOfVisitor: 3,
    pickupLocation: 'Banani Club Entrance',
    driverName: 'Alamgir Hossain (01712334455)',
    projectRepresentative: 'Asifur Rahman',
    vehicleNo: 'Dhaka Metro-GA 24-8812 (Toyota Prado)',
    status: 'First Contact',
    vehicleStatus: 'Standby',
    whatsapp: '01817776655',
    email: 'kamrul.ripon@texgroup.bd',
    unitSpec: '2700 sqft • North-West',
    source: 'WhatsApp',
    category: 'Digital Media',
    branch: 'Dhaka',
    notes: 'Garment exporter; looking for duplex or luxury condominium in Banani/Gulshan area'
  },
  {
    id: 'vis-14',
    sl: '14',
    bookingId: 'BK-2026-0904',
    bookingDate: '2026-09-09',
    visitDate: '2026-09-15',
    reportingTime: '01:00 PM',
    projectName: 'Purbachal Green Valley Project',
    salesTeam: 'Alpha Team (Land Division)',
    salesman: 'Siddique Rahman',
    name: 'Nasir Uddin Patwary',
    phone: '01720003322',
    noOfVisitor: 4,
    pickupLocation: 'Motijheel Krishi Bhaban',
    driverName: 'Zahirul Islam (01822334411)',
    projectRepresentative: 'Engr. Tanvir Ahmed',
    vehicleNo: 'Dhaka Metro-CHA 53-1200 (HiAce Micro)',
    status: 'Contacted',
    vehicleStatus: 'Standby',
    whatsapp: '01720003322',
    email: 'patwary.agro@gmail.com',
    unitSpec: '10 Katha • Commercial Frontage',
    source: 'Walk-in',
    category: 'Walk-in',
    branch: 'Dhaka',
    notes: 'Agro exporter; interested in frontage commercial plots for cold-chain warehousing'
  },
  {
    id: 'vis-15',
    sl: '15',
    bookingId: 'BK-2026-0905',
    bookingDate: '2026-09-01',
    visitDate: '2026-09-06',
    reportingTime: '04:30 PM',
    projectName: 'Emerald Hills Residences',
    salesTeam: 'Elite Prime Team',
    salesman: 'Farhana Yasmin',
    name: 'Prof. Masudur Rahman',
    phone: '01918887766',
    noOfVisitor: 2,
    pickupLocation: 'Dhaka University Club',
    driverName: 'Rafiq Mia (01911223344)',
    projectRepresentative: 'Sayed Mostafa',
    vehicleNo: 'Dhaka Metro-GA 11-4099 (Corolla Cross)',
    status: 'Visit Completed',
    vehicleStatus: 'Completed',
    whatsapp: '01918887766',
    email: 'masud.du@gmail.com',
    referrerName: 'University Faculty Group',
    referrerType: 'Affiliate',
    unitSpec: '1650 sqft • Garden View',
    source: 'Referral',
    category: 'Digital Media',
    branch: 'Dhaka',
    notes: 'Reviewed construction progress & floor plan layout; requested final quotation'
  },
  {
    id: 'vis-16',
    sl: '16',
    bookingId: 'BK-2026-0906',
    bookingDate: '2026-09-08',
    visitDate: '2026-09-14',
    reportingTime: '11:00 AM',
    projectName: 'Gulshan Avenue Commercial Plaza',
    salesTeam: 'Commercial Assets Group',
    salesman: 'Md. Rahim Sarder',
    name: 'Tanvir Ahmed Babul',
    phone: '01719994411',
    noOfVisitor: 3,
    pickupLocation: 'Chittagong GEC Circle',
    driverName: 'Alamgir Hossain (01712334455)',
    projectRepresentative: 'Mahbubur Rahman',
    vehicleNo: 'Dhaka Metro-GA 24-8812 (Toyota Prado)',
    status: 'Site Visit Scheduled',
    vehicleStatus: 'Assigned',
    whatsapp: '01719994411',
    email: 'tanvir.babul@yahoo.com',
    unitSpec: '1200 sqft • 4th Floor',
    source: 'Website',
    category: 'Digital Media',
    branch: 'Chittagong',
    notes: 'Looking to expand logistics branch office to Dhaka; requested audio-visual site tour'
  },
  {
    id: 'vis-17',
    sl: '17',
    bookingId: 'BK-2026-0907',
    bookingDate: '2026-09-10',
    visitDate: '2026-09-17',
    reportingTime: '02:00 PM',
    projectName: 'Bashundhara Block-I Luxury Heights',
    salesTeam: 'Bravo Team (Luxury Condo)',
    salesman: 'Farhana Yasmin',
    name: 'Mrs. Rokeya Begum',
    phone: '01812233990',
    noOfVisitor: 4,
    pickupLocation: 'Baridhara DOHS Mosque',
    driverName: 'Zahirul Islam (01822334411)',
    projectRepresentative: 'Ar. Nabila Rahman',
    vehicleNo: 'Dhaka Metro-CHA 53-1200 (HiAce Micro)',
    status: 'First Contact',
    vehicleStatus: 'Standby',
    whatsapp: '01812233990',
    email: 'rokeya.begum@gmail.com',
    referrerName: 'Engr. Faruq Ahmed',
    referrerType: 'Partner',
    unitSpec: '2100 sqft • East Facing',
    source: 'Referral',
    category: 'Digital Media',
    branch: 'Dhaka',
    notes: 'Daughter getting married in December; looking for ready flat handover'
  },
  {
    id: 'vis-18',
    sl: '18',
    bookingId: 'BK-2026-0908',
    bookingDate: '2026-09-07',
    visitDate: '2026-09-12',
    reportingTime: '09:30 AM',
    projectName: 'Purbachal Green Valley Project',
    salesTeam: 'Alpha Team (Land Division)',
    salesman: 'Siddique Rahman',
    name: 'Ziaul Hoque Mollah',
    phone: '01710001199',
    noOfVisitor: 2,
    pickupLocation: 'Tejgaon Link Road Office',
    driverName: 'Alamgir Hossain (01712334455)',
    projectRepresentative: 'Engr. Tanvir Ahmed',
    vehicleNo: 'Dhaka Metro-GA 24-8812 (Toyota Prado)',
    status: 'Site Visit Scheduled',
    vehicleStatus: 'On Site',
    whatsapp: '01710001199',
    email: 'ziaul.mollah@tradebd.com',
    unitSpec: '5 Katha • Corner Plot',
    source: 'Walk-in',
    category: 'Walk-in',
    branch: 'Dhaka',
    notes: 'Second visit with architectural consultant to measure soil test coordinates'
  },
  {
    id: 'vis-19',
    sl: '19',
    bookingId: 'BK-2026-0909',
    bookingDate: '2026-09-09',
    visitDate: '2026-09-15',
    reportingTime: '04:30 PM',
    projectName: 'Promise Crown Sovereign',
    salesTeam: 'NRB Global Desk',
    salesman: 'Rashedul Karim',
    name: 'Fahim Faisal',
    phone: '01919998822',
    noOfVisitor: 2,
    pickupLocation: 'Gulshan-1 Police Plaza',
    driverName: 'Rafiq Mia (01911223344)',
    projectRepresentative: 'Asifur Rahman',
    vehicleNo: 'Dhaka Metro-GA 11-4099 (Corolla Cross)',
    status: 'Contacted',
    vehicleStatus: 'Standby',
    whatsapp: '01919998822',
    email: 'fahim.faisal@fintech.com',
    unitSpec: '2350 sqft • Type B',
    source: 'Facebook',
    category: 'Digital Media',
    branch: 'Dhaka',
    notes: 'Young tech executive; evaluating payment installment schedules vs loan options'
  },
  {
    id: 'vis-20',
    sl: '20',
    bookingId: 'BK-2026-0910',
    bookingDate: '2026-09-01',
    visitDate: '2026-09-05',
    reportingTime: '11:00 AM',
    projectName: 'Emerald Hills Residences',
    salesTeam: 'Elite Prime Team',
    salesman: 'Farhana Yasmin',
    name: 'Barrister Asaduzzaman Khan',
    phone: '01715556677',
    noOfVisitor: 3,
    pickupLocation: 'Supreme Court Bar Association Gate',
    driverName: 'Alamgir Hossain (01712334455)',
    projectRepresentative: 'Sayed Mostafa',
    vehicleNo: 'Dhaka Metro-GA 24-8812 (Toyota Prado)',
    status: 'Booking Confirmed',
    vehicleStatus: 'Completed',
    whatsapp: '01715556677',
    email: 'asad.barrister@supremecourt.gov.bd',
    referrerName: 'Advocate Shafiul',
    referrerType: 'Affiliate',
    unitSpec: 'Penthouse • 3400 sqft with Terrace',
    source: 'Referral',
    category: 'Digital Media',
    branch: 'Dhaka',
    notes: 'Supreme Court lawyer; booked top terrace floor, official deed signing on Monday'
  }
];

export interface VisitManagementViewProps {
  visitRequests?: VisitRequest[];
  onConfirmVisitRequest?: (confirmedData: {
    requestId: string;
    leadId: string;
    bookingId: string;
    visitDate: string;
    reportingTime: string;
    vehicleNo: string;
    driverName: string;
    projectRepresentative: string;
    pickupLocation: string;
    notes: string;
  }) => void;
  onNavigateToLeads?: () => void;
}

export const VisitManagementView: React.FC<VisitManagementViewProps> = ({
  visitRequests: propVisitRequests,
  onConfirmVisitRequest,
  onNavigateToLeads
}) => {
  const [visitors, setVisitors] = useState<VisitorRecord[]>(INITIAL_VISITORS);
  const [internalRequests, setInternalRequests] = useState<VisitRequest[]>(initialVisitRequests);
  const requests = propVisitRequests || internalRequests;
  const [activeSubTab, setActiveSubTab] = useState<'manifest' | 'requests'>('manifest');
  const [confirmingRequest, setConfirmingRequest] = useState<VisitRequest | null>(null);
  const [requestSearchTerm, setRequestSearchTerm] = useState('');
  const [requestStatusFilter, setRequestStatusFilter] = useState<'All' | 'Pending Review' | 'Confirmed'>('All');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedProject, setSelectedProject] = useState('All');
  const [pageSize, setPageSize] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedBranch, setSelectedBranch] = useState('Dhaka');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeActionRow, setActiveActionRow] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Inner page view state
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);

  // Modals & Inner Page
  const [viewDetailsVisitor, setViewDetailsVisitor] = useState<VisitorRecord | null>(null);
  const [assignVisitorId, setAssignVisitorId] = useState<string | null>(null);
  const [rescheduleVisitor, setRescheduleVisitor] = useState<VisitorRecord | null>(null);
  const [gatePassVisitor, setGatePassVisitor] = useState<VisitorRecord | null>(null);
  const [smsVisitor, setSmsVisitor] = useState<VisitorRecord | null>(null);

  // Sorting state for table
  const [sortField, setSortField] = useState<keyof VisitorRecord | null>('bookingDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Handle back button from Header
  useEffect(() => {
    const handleCrmBack = (e: Event) => {
      if (viewDetailsVisitor) {
        e.preventDefault();
        setViewDetailsVisitor(null);
      } else if (isCreatingBooking) {
        e.preventDefault();
        setIsCreatingBooking(false);
      }
    };
    window.addEventListener('crm-back-pressed', handleCrmBack);
    return () => window.removeEventListener('crm-back-pressed', handleCrmBack);
  }, [viewDetailsVisitor, isCreatingBooking]);

  const handleSort = (field: keyof VisitorRecord) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const pendingRequestsCount = useMemo(() => {
    return requests.filter(r => r.status === 'Pending Review').length;
  }, [requests]);

  const filteredRequests = useMemo(() => {
    return requests.filter(r => {
      const matchSearch =
        requestSearchTerm === '' ||
        r.clientName.toLowerCase().includes(requestSearchTerm.toLowerCase()) ||
        r.clientPhone.includes(requestSearchTerm) ||
        r.projectName.toLowerCase().includes(requestSearchTerm.toLowerCase()) ||
        (r.assignedSalesman && r.assignedSalesman.toLowerCase().includes(requestSearchTerm.toLowerCase())) ||
        (r.pickupLocation && r.pickupLocation.toLowerCase().includes(requestSearchTerm.toLowerCase()));

      const matchStatus =
        requestStatusFilter === 'All' ||
        r.status === requestStatusFilter;

      return matchSearch && matchStatus;
    });
  }, [requests, requestSearchTerm, requestStatusFilter]);

  const handleExecuteConfirmation = (confirmedData: {
    requestId: string;
    leadId: string;
    bookingId: string;
    visitDate: string;
    reportingTime: string;
    vehicleNo: string;
    driverName: string;
    projectRepresentative: string;
    pickupLocation: string;
    notes: string;
  }) => {
    if (onConfirmVisitRequest) {
      onConfirmVisitRequest(confirmedData);
    }

    setInternalRequests(prev => prev.map(req => {
      if (req.id === confirmedData.requestId || req.leadId === confirmedData.leadId) {
        return {
          ...req,
          status: 'Confirmed',
          confirmedBookingId: confirmedData.bookingId,
          assignedVehicle: confirmedData.vehicleNo,
          assignedDriver: confirmedData.driverName,
          assignedHost: confirmedData.projectRepresentative,
          confirmedAt: new Date().toISOString()
        };
      }
      return req;
    }));

    // Auto promote into visitors list if not already present
    const targetReq = requests.find(r => r.id === confirmedData.requestId || r.leadId === confirmedData.leadId);
    if (targetReq) {
      const newRecord: VisitorRecord = {
        id: `vis-${Date.now().toString().slice(-4)}`,
        sl: String(visitors.length + 1).padStart(2, '0'),
        bookingId: confirmedData.bookingId,
        bookingDate: new Date().toISOString().split('T')[0],
        visitDate: confirmedData.visitDate,
        reportingTime: confirmedData.reportingTime,
        projectName: targetReq.projectName,
        salesTeam: 'Direct Sales Team',
        salesman: targetReq.assignedSalesman || 'Siddique Rahman',
        name: targetReq.clientName,
        phone: targetReq.clientPhone,
        noOfVisitor: targetReq.guestCount || 2,
        pickupLocation: confirmedData.pickupLocation,
        driverName: confirmedData.driverName,
        projectRepresentative: confirmedData.projectRepresentative,
        vehicleNo: confirmedData.vehicleNo,
        status: 'Site Visit Scheduled',
        vehicleStatus: 'Assigned',
        whatsapp: targetReq.clientPhone,
        email: targetReq.clientEmail || '',
        unitSpec: targetReq.requiredPlotSize ? `${targetReq.requiredPlotSize} • ${targetReq.facingPreference || 'North Facing'}` : 'Site Visit Demo',
        source: (targetReq.source as VisitorRecord['source']) || 'Lead Request',
        category: 'Digital Media',
        branch: 'Dhaka',
        notes: confirmedData.notes || `Promoted from Lead: ${targetReq.leadId}`
      };
      setVisitors(prev => [newRecord, ...prev]);
    }

    setConfirmingRequest(null);
    showToast(`Booking ${confirmedData.bookingId} confirmed! Vehicle allocated. Notification & SMS sent to ${targetReq?.clientName || 'client'} and ${targetReq?.assignedSalesman || 'Sales Team'}.`);
  };

  // Filter logic
  const filteredVisitors = useMemo(() => {
    return visitors.filter((v) => {
      const matchSearch =
        searchTerm === '' ||
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.phone.includes(searchTerm) ||
        v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.salesman.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (v.referrerName && v.referrerName.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchProject =
        selectedProject === 'All' ||
        v.projectName.toLowerCase().includes(selectedProject.toLowerCase());

      const matchStatus =
        selectedStatus === 'All' ||
        v.status === selectedStatus;

      // Date Range filter
      let matchDate = true;
      if (selectedDateRange !== 'All' && v.visitDate) {
        const itemDate = new Date(v.visitDate);
        const refDate = new Date('2026-09-12'); // active reference context
        if (selectedDateRange === 'Today') {
          matchDate = v.visitDate === '2026-09-12';
        } else if (selectedDateRange === 'Tomorrow') {
          matchDate = v.visitDate === '2026-09-13';
        } else if (selectedDateRange === 'This Week') {
          const diffDays = Math.abs((itemDate.getTime() - refDate.getTime()) / (1000 * 3600 * 24));
          matchDate = diffDays <= 7;
        } else if (selectedDateRange === 'This Month') {
          matchDate = v.visitDate.startsWith('2026-09');
        } else if (selectedDateRange === 'Last 30 Days') {
          const diffDays = Math.abs((itemDate.getTime() - refDate.getTime()) / (1000 * 3600 * 24));
          matchDate = diffDays <= 30;
        }
      }

      const matchBranch =
        selectedBranch === 'All' ||
        v.branch.toLowerCase() === selectedBranch.toLowerCase();

      return matchSearch && matchProject && matchStatus && matchDate && matchBranch;
    });
  }, [visitors, searchTerm, selectedProject, selectedStatus, selectedDateRange, selectedBranch]);

  const sortedVisitors = useMemo(() => {
    if (!sortField) return filteredVisitors;
    return [...filteredVisitors].sort((a, b) => {
      let aVal = a[sortField] ?? '';
      let bVal = b[sortField] ?? '';

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }

      aVal = aVal.toString().toLowerCase();
      bVal = bVal.toString().toLowerCase();

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredVisitors, sortField, sortOrder]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(sortedVisitors.length / pageSize));
  
  // Ensure current page is valid when filters change
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedVisitors = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * pageSize;
    return sortedVisitors.slice(startIndex, startIndex + pageSize);
  }, [sortedVisitors, validCurrentPage, pageSize]);

  const isAllSelected = paginatedVisitors.length > 0 && paginatedVisitors.every(v => selectedIds.includes(v.id));

  // Dynamic KPI Metrics Calculation
  const metrics = useMemo(() => {
    const totalBooking = visitors.length;
    const confirmed = visitors.filter(v => v.status === 'Booking Confirmed' || v.status === 'Site Visit Scheduled').length;
    const completedVisits = visitors.filter(v => v.status === 'Visit Completed').length;
    const cancelled = visitors.filter(v => v.status === 'Cancelled').length;
    const vehicleConflicts = visitors.filter(v => v.vehicleStatus === 'Vehicle Conflict').length;
    const affiliate = visitors.filter(v => v.source === 'Referral' || (v.referrerName && v.referrerName.trim() !== '')).length;
    const offlineSales = visitors.filter(v => v.source === 'Walk-in' || v.category?.toLowerCase().includes('offline') || v.category?.toLowerCase().includes('direct')).length;

    return {
      totalBooking,
      confirmed,
      completedVisits,
      cancelled,
      vehicleConflicts,
      affiliate,
      offlineSales
    };
  }, [visitors]);

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(prev => prev.filter(id => !paginatedVisitors.some(v => v.id === id)));
    } else {
      const pageIds = paginatedVisitors.map((v) => v.id);
      setSelectedIds(prev => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAssignSalesman = (salesmanName: string) => {
    if (assignVisitorId) {
      setVisitors((prev) =>
        prev.map((v) => (v.id === assignVisitorId ? { ...v, salesman: salesmanName } : v))
      );
      setViewDetailsVisitor((prev) =>
        prev && prev.id === assignVisitorId ? { ...prev, salesman: salesmanName } : prev
      );
      showToast(`Salesman assigned to "${salesmanName}"`);
      setAssignVisitorId(null);
    } else if (selectedIds.length > 0) {
      setVisitors((prev) =>
        prev.map((v) => (selectedIds.includes(v.id) ? { ...v, salesman: salesmanName } : v))
      );
      showToast(`${selectedIds.length} visitors assigned to ${salesmanName}`);
      setSelectedIds([]);
    }
  };

  const handleStatusChange = (id: string, newStatus: VisitorRecord['status']) => {
    setVisitors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
    );
    setViewDetailsVisitor((prev) =>
      prev && prev.id === id ? { ...prev, status: newStatus } : prev
    );
    showToast(`Visit status updated to ${newStatus}`);
    setActiveActionRow(null);
  };

  const handleConfirmReschedule = (id: string, newDate: string, newTime: string) => {
    setVisitors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, visitDate: newDate, reportingTime: newTime, visitTime: newTime, status: 'Site Visit Scheduled' } : v))
    );
    setViewDetailsVisitor((prev) =>
      prev && prev.id === id ? { ...prev, visitDate: newDate, reportingTime: newTime, visitTime: newTime, status: 'Site Visit Scheduled' } : prev
    );
    showToast(`Visit rescheduled for ${newDate} at ${newTime}`);
    setRescheduleVisitor(null);
  };

  const handleSendSmsFromModal = (msgText: string, recipientType: 'client' | 'driver') => {
    if (!smsVisitor) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const target = recipientType === 'client' ? smsVisitor.phone : (smsVisitor.driverName || 'Driver');
    const updatedNotes = smsVisitor.notes 
      ? `${smsVisitor.notes}\n[SMS sent to ${recipientType} (${target}) at ${timestamp}: "${msgText}"]`
      : `[SMS sent to ${recipientType} (${target}) at ${timestamp}: "${msgText}"]`;

    setVisitors(prev => prev.map(v => v.id === smsVisitor.id ? { ...v, notes: updatedNotes } : v));
    setViewDetailsVisitor(prev => prev && prev.id === smsVisitor.id ? { ...prev, notes: updatedNotes } : prev);
    showToast(`Short text / SMS dispatched to ${target}`);
    setSmsVisitor(null);
  };

  const handleExport = (type: 'Excel' | 'PDF') => {
    showToast(`Exporting ${sortedVisitors.length} visitor records to ${type}...`);
  };

  const renderSharedModals = () => (
    <>
      {/* MODAL: ASSIGN SALESMAN */}
      {assignVisitorId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <h4 className="font-bold text-gray-900 text-sm">Assign Sales Representative</h4>
            <div className="space-y-1.5 text-xs">
              {['Siddique Rahman', 'Md. Rahim Sarder', 'Farhana Yasmin', 'Rashedul Karim'].map((sName) => (
                <button
                  key={sName}
                  onClick={() => handleAssignSalesman(sName)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-900 font-medium border border-gray-100 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>{sName}</span>
                  <ChevronDown size={12} className="-rotate-90 text-gray-400" />
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setAssignVisitorId(null)}
                className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PRINT GATE PASS */}
      {gatePassVisitor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="text-center border-b border-gray-200 pb-3">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">Promise Assets Limited</span>
              <h3 className="text-base font-extrabold text-gray-900">Official Site Visit Security Pass</h3>
              <p className="text-[10px] text-gray-400">Pass No: PAL-VIS-PASS-{gatePassVisitor.sl}-2026</p>
            </div>

            <div className="space-y-2 border border-dashed border-gray-300 p-3.5 rounded-xl bg-gray-50/50">
              <div className="flex justify-between">
                <span className="text-gray-500">Visitor:</span>
                <span className="font-bold text-gray-900">{gatePassVisitor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone:</span>
                <span className="font-bold text-gray-900">{gatePassVisitor.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Destination Site:</span>
                <span className="font-bold text-amber-900">{gatePassVisitor.projectName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Visit Schedule:</span>
                <span className="font-bold text-gray-900">{gatePassVisitor.visitDate || '2026-09-14'} @ {gatePassVisitor.reportingTime || gatePassVisitor.visitTime || '10:30 AM'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Assigned Vehicle:</span>
                <span className="font-bold text-gray-800">{gatePassVisitor.vehicleNo || 'Dhaka Metro-GA 24-8812'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Assigned Host:</span>
                <span className="font-bold text-gray-800">{gatePassVisitor.salesman}</span>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 text-center italic">
              Authorized by Security Protocol & Promise Assets Site Management.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setGatePassVisitor(null)}
                className="px-3.5 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                  showToast('Gate pass sent to printer.');
                }}
                className="px-4 py-1.5 text-white rounded-lg font-bold shadow-sm cursor-pointer"
                style={{ backgroundColor: '#c7a259' }}
              >
                Print Slip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SCHEDULE / RESCHEDULE */}
      {rescheduleVisitor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4 text-xs">
            <h4 className="font-bold text-gray-900 text-sm">Reschedule Site Tour</h4>
            <p className="text-gray-500 text-[11px]">Updating visit date for <strong>{rescheduleVisitor.name}</strong></p>

            <div className="space-y-3">
              <div>
                <label className="block text-gray-700 font-bold mb-1">New Date</label>
                <input
                  type="date"
                  defaultValue={rescheduleVisitor.visitDate || '2026-09-16'}
                  id="newVisitDate"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1">New Time</label>
                <input
                  type="text"
                  defaultValue={rescheduleVisitor.reportingTime || rescheduleVisitor.visitTime || '11:30 AM'}
                  id="newVisitTime"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRescheduleVisitor(null)}
                className="px-3 py-1.5 border border-gray-200 rounded-md text-gray-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const d = (document.getElementById('newVisitDate') as HTMLInputElement)?.value;
                  const t = (document.getElementById('newVisitTime') as HTMLInputElement)?.value;
                  handleConfirmReschedule(rescheduleVisitor.id, d || rescheduleVisitor.visitDate, t || '11:30 AM');
                }}
                className="px-4 py-1.5 text-white rounded-md font-bold cursor-pointer"
                style={{ backgroundColor: '#c7a259' }}
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SEND SHORT TEXT (SMS) */}
      {smsVisitor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 text-xs border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Send size={15} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Send Short Text (SMS)</h4>
                  <p className="text-[11px] text-gray-500">To: {smsVisitor.name} ({smsVisitor.phone})</p>
                </div>
              </div>
              <button
                onClick={() => setSmsVisitor(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Select Message Template</label>
                <select
                  id="smsTemplateSelect"
                  defaultValue="confirmation"
                  onChange={(e) => {
                    const textEl = document.getElementById('smsMessageText') as HTMLTextAreaElement;
                    if (!textEl) return;
                    if (e.target.value === 'confirmation') {
                      textEl.value = `Dear ${smsVisitor.name}, your site visit for ${smsVisitor.projectName} is confirmed for ${smsVisitor.visitDate} at ${smsVisitor.reportingTime}. Transport: ${smsVisitor.vehicleNo}. Driver: ${smsVisitor.driverName}. PAL Security.`;
                    } else if (e.target.value === 'driver') {
                      textEl.value = `Dear ${smsVisitor.name}, your driver ${smsVisitor.driverName} is assigned for site tour of ${smsVisitor.projectName}. Pickup: ${smsVisitor.pickupLocation}.`;
                    } else if (e.target.value === 'reminder') {
                      textEl.value = `Dear ${smsVisitor.name}, reminder: your site tour of ${smsVisitor.projectName} is today at ${smsVisitor.reportingTime}. We look forward to seeing you.`;
                    }
                  }}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                >
                  <option value="confirmation">Visit Confirmation & Transport</option>
                  <option value="driver">Driver & Pickup Location</option>
                  <option value="reminder">Visit Reminder Notice</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Message Text</label>
                <textarea
                  id="smsMessageText"
                  defaultValue={`Dear ${smsVisitor.name}, your site visit for ${smsVisitor.projectName} is confirmed for ${smsVisitor.visitDate} at ${smsVisitor.reportingTime}. Transport: ${smsVisitor.vehicleNo}. Driver: ${smsVisitor.driverName}. PAL Security.`}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setSmsVisitor(null)}
                className="px-3.5 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const text = (document.getElementById('smsMessageText') as HTMLTextAreaElement)?.value || '';
                  handleSendSmsFromModal(text, 'client');
                }}
                className="px-4 py-1.5 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg font-bold shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Send size={13} />
                <span>Send SMS</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // If user is on the New Visit Booking inner page
  if (isCreatingBooking) {
    return (
      <div className="space-y-5">
        <NewVisitBookingPage
          onCancel={() => setIsCreatingBooking(false)}
          onSave={(newRecord) => {
            setVisitors([newRecord, ...visitors]);
            setIsCreatingBooking(false);
            showToast(`Visit booking "${newRecord.bookingId}" for ${newRecord.name} recorded successfully.`);
          }}
        />
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-gray-700 animate-slide-up">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // If user is on the Visitor Details inner page
  if (viewDetailsVisitor) {
    return (
      <div className="space-y-5">
        <VisitorDetailsInnerPage
          visitor={viewDetailsVisitor}
          onBack={() => setViewDetailsVisitor(null)}
          onUpdateStatus={(id, newStatus) => {
            handleStatusChange(id, newStatus as any);
          }}
          onPrintGatePass={(record) => {
            setGatePassVisitor(record);
          }}
          onReschedule={(record) => {
            setRescheduleVisitor(record);
          }}
          onAssignSalesman={(id) => {
            setAssignVisitorId(id);
          }}
          onUpdateSalesman={(id, salesmanName, salesTeam) => {
            setVisitors(prev => prev.map(item => item.id === id ? { ...item, salesman: salesmanName, ...(salesTeam ? { salesTeam } : {}) } : item));
            setViewDetailsVisitor(prev => prev && prev.id === id ? { ...prev, salesman: salesmanName, ...(salesTeam ? { salesTeam } : {}) } : null);
            showToast(`Sales officer assigned to ${salesmanName}`);
          }}
          onUpdateFleet={(id, vehicleNo, driverName, vehicleStatus) => {
            setVisitors(prev => prev.map(item => item.id === id ? { ...item, vehicleNo, driverName, vehicleStatus } : item));
            setViewDetailsVisitor(prev => prev && prev.id === id ? { ...prev, vehicleNo, driverName, vehicleStatus } : null);
            showToast('Vehicle and driver allocation updated successfully.');
          }}
          onSaveNotes={(id, notes) => {
            setVisitors(prev => prev.map(item => item.id === id ? { ...item, notes } : item));
            setViewDetailsVisitor(prev => prev && prev.id === id ? { ...prev, notes } : null);
            showToast('Notes and remarks updated successfully.');
          }}
          onUpdatePickupLocation={(id, pickupLocation) => {
            setVisitors(prev => prev.map(item => item.id === id ? { ...item, pickupLocation } : item));
            setViewDetailsVisitor(prev => prev && prev.id === id ? { ...prev, pickupLocation } : null);
            showToast('Pick-up location updated successfully.');
          }}
          onSendShortText={(record) => {
            setSmsVisitor(record);
          }}
        />
        {/* Render shared modals right here so they work on the inner page! */}
        {renderSharedModals()}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-gray-700 animate-slide-up">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Top Navigation Bar & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-200/80 shadow-2xs">
        <h2 className="text-base font-bold text-gray-900 px-1">Visitor List</h2>

        <div className="flex items-center gap-2">
          <button 
            id="btn-new-visit-booking"
            onClick={() => setIsCreatingBooking(true)}
            className="px-4 py-2 text-xs font-bold text-white rounded-lg shadow-sm hover:opacity-95 active:scale-[0.98] transition-all flex items-center gap-2 tracking-wide cursor-pointer"
            style={{ backgroundColor: '#c7a259' }}
          >
            <Plus size={15} className="stroke-[2.5]" />
            <span>New Visit Booking</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'manifest' ? (
        <>
          {/* Top 7 Metric Cards for Visit Management */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {/* Card 1: Total Booking */}
        <div className="bg-white rounded-2xl p-3.5 border border-amber-200/90 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between gap-1 mb-2 z-10">
            <span className="font-extrabold text-xs text-gray-900 tracking-tight truncate">Total Booking</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <CalendarCheck size={14} />
            </div>
          </div>
          <div className="z-10 mt-1">
            <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">{metrics.totalBooking}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                100% Manifest
              </span>
            </div>
          </div>
          <CalendarCheck size={65} className="absolute -right-3 -bottom-3 text-amber-500/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 2: Confirmed */}
        <div className="bg-white rounded-2xl p-3.5 border border-blue-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between gap-1 mb-2 z-10">
            <span className="font-extrabold text-xs text-gray-900 tracking-tight truncate">Confirmed</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <CheckCircle2 size={14} />
            </div>
          </div>
          <div className="z-10 mt-1">
            <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">{metrics.confirmed}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                {metrics.totalBooking > 0 ? Math.round((metrics.confirmed / metrics.totalBooking) * 100) : 0}% Ratio
              </span>
            </div>
          </div>
          <CheckCircle2 size={65} className="absolute -right-3 -bottom-3 text-blue-500/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 3: Completed Visits */}
        <div className="bg-white rounded-2xl p-3.5 border border-emerald-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between gap-1 mb-2 z-10">
            <span className="font-extrabold text-xs text-gray-900 tracking-tight truncate">Completed Visits</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Building size={14} />
            </div>
          </div>
          <div className="z-10 mt-1">
            <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">{metrics.completedVisits}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                Site Tour Done
              </span>
            </div>
          </div>
          <Building size={65} className="absolute -right-3 -bottom-3 text-emerald-500/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 4: Cancelled */}
        <div className="bg-white rounded-2xl p-3.5 border border-rose-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between gap-1 mb-2 z-10">
            <span className="font-extrabold text-xs text-gray-900 tracking-tight truncate">Cancelled</span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <XCircle size={14} />
            </div>
          </div>
          <div className="z-10 mt-1">
            <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">{metrics.cancelled}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">
                Rescheduled
              </span>
            </div>
          </div>
          <XCircle size={65} className="absolute -right-3 -bottom-3 text-rose-500/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 5: Vehicles Conflicts */}
        <div className="bg-white rounded-2xl p-3.5 border border-red-200 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all bg-red-50/20">
          <div className="flex items-center justify-between gap-1 mb-2 z-10">
            <span className="font-extrabold text-xs text-gray-900 tracking-tight truncate">Vehicles Conflicts</span>
            <div className="p-1.5 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 animate-pulse">
              <AlertTriangle size={14} />
            </div>
          </div>
          <div className="z-10 mt-1">
            <div className="text-xl sm:text-2xl font-black text-red-700 tracking-tight">{metrics.vehicleConflicts}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] font-bold text-red-700 bg-red-100/80 px-1.5 py-0.5 rounded border border-red-200">
                {metrics.vehicleConflicts > 0 ? 'Action Req.' : 'Clear'}
              </span>
            </div>
          </div>
          <Car size={65} className="absolute -right-3 -bottom-3 text-red-500/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 6: Affiliate */}
        <div className="bg-white rounded-2xl p-3.5 border border-purple-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between gap-1 mb-2 z-10">
            <span className="font-extrabold text-xs text-gray-900 tracking-tight truncate">Affiliate</span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Users size={14} />
            </div>
          </div>
          <div className="z-10 mt-1">
            <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">{metrics.affiliate}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100">
                Brokers & Partners
              </span>
            </div>
          </div>
          <Users size={65} className="absolute -right-3 -bottom-3 text-purple-500/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>

        {/* Card 7: Offline sales */}
        <div className="bg-white rounded-2xl p-3.5 border border-cyan-100 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between gap-1 mb-2 z-10">
            <span className="font-extrabold text-xs text-gray-900 tracking-tight truncate">Offline sales</span>
            <div className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
              <Store size={14} />
            </div>
          </div>
          <div className="z-10 mt-1">
            <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">{metrics.offlineSales}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-100">
                Walk-in & Direct
              </span>
            </div>
          </div>
          <Store size={65} className="absolute -right-3 -bottom-3 text-cyan-500/10 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* FILTERS Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-amber-600" />
            <h4 className="text-xs font-bold text-gray-700 tracking-wider">Filters</h4>
          </div>
          {(searchTerm || selectedDateRange !== 'All' || selectedStatus !== 'All' || selectedProject !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDateRange('All');
                setSelectedStatus('All');
                setSelectedProject('All');
                setCurrentPage(1);
              }}
              className="text-[11px] font-semibold text-amber-600 hover:text-amber-700 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* 1. Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* 2. All Dates */}
          <select
            value={selectedDateRange}
            onChange={(e) => {
              setSelectedDateRange(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium cursor-pointer"
          >
            <option value="All">All Dates</option>
            <option value="Today">Today</option>
            <option value="Tomorrow">Tomorrow</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="Last 30 Days">Last 30 Days</option>
          </select>

          {/* 3. All status */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium cursor-pointer"
          >
            <option value="All">All status</option>
            <option value="Site Visit Scheduled">Site Visit Scheduled</option>
            <option value="First Contact">First Contact</option>
            <option value="Contacted">Contacted</option>
            <option value="Visit Completed">Visit Completed</option>
            <option value="Booking Confirmed">Booking Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* 4. All projects */}
          <select
            value={selectedProject}
            onChange={(e) => {
              setSelectedProject(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium cursor-pointer"
          >
            <option value="All">All projects</option>
            <option value="Purbachal">Purbachal Green Valley Project</option>
            <option value="Bashundhara">Bashundhara Block-I Luxury Heights</option>
            <option value="Gulshan">Gulshan Avenue Commercial Plaza</option>
            <option value="Emerald">Emerald Hills Residences</option>
            <option value="Crown">Promise Crown Sovereign</option>
          </select>

          {/* 5. Per page */}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium cursor-pointer"
          >
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>

          {/* 6. Sort By */}
          <select
            value={`${sortField}-${sortOrder}`}
            onChange={(e) => {
              const parts = e.target.value.split('-');
              const field = parts[0] as keyof VisitorRecord;
              const order = parts[1] as 'asc' | 'desc';
              setSortField(field);
              setSortOrder(order);
            }}
            className="px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium cursor-pointer"
          >
            <option value="bookingDate-desc">Sort: Date (Newest)</option>
            <option value="bookingDate-asc">Sort: Date (Oldest)</option>
            <option value="name-asc">Sort: Name (A-Z)</option>
            <option value="name-desc">Sort: Name (Z-A)</option>
            <option value="bookingId-asc">Sort: Booking ID (Asc)</option>
            <option value="bookingId-desc">Sort: Booking ID (Desc)</option>
            <option value="projectName-asc">Sort: Project (A-Z)</option>
            <option value="status-asc">Sort: Visit Status</option>
          </select>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-md flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2 text-xs font-bold">
            <Check size={16} />
            <span>{toastMessage}</span>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-white/80 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-300 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-950 font-bold text-xs">
            <CheckSquare size={18} className="text-amber-700" />
            <span>{selectedIds.length} Visitor{selectedIds.length > 1 ? 's' : ''} Selected</span>
            <span className="text-gray-400 font-normal">|</span>
            <button 
              onClick={toggleSelectAll}
              className="text-amber-800 hover:underline font-semibold"
            >
              {isAllSelected ? 'Deselect All' : 'Select All Filtered'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setAssignVisitorId(null);
              }}
              className="px-4 py-1.5 text-xs font-bold text-white rounded-lg shadow-sm hover:opacity-90 transition-all flex items-center gap-1.5"
              style={{ backgroundColor: '#c7a259' }}
            >
              <UserPlus size={14} />
              <span>Assign Salesman ({selectedIds.length})</span>
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Main Table Container matching screenshot */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-800">
              Visitor List ({filteredVisitors.length} Total)
            </span>
            {selectedIds.length > 0 && (
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                {selectedIds.length} selected
              </span>
            )}
          </div>
          <button 
            onClick={() => handleExport('PDF')}
            className="text-[11px] text-gray-500 hover:text-gray-800 font-medium cursor-pointer"
          >
            Export PDF / Excel
          </button>
        </div>

        <div className="overflow-x-auto min-h-[420px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/80 text-[11px] font-bold text-gray-700 border-b border-gray-200 tracking-wider">
                <th className="py-3 px-3 text-center w-[46px] min-w-[46px] max-w-[46px] sticky left-0 bg-gray-100 z-20">
                  <input 
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    title="Select All / Deselect All"
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer accent-amber-600"
                  />
                </th>
                <th 
                  onClick={() => handleSort('bookingId')}
                  className="py-3 px-3 w-[130px] min-w-[130px] max-w-[130px] whitespace-nowrap sticky left-[46px] bg-gray-100 z-20 cursor-pointer hover:bg-gray-200/90 transition-colors select-none"
                  title="Click to Sort by Booking ID"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Booking ID</span>
                    <span className="text-gray-400">
                      {sortField === 'bookingId' ? (
                        sortOrder === 'asc' ? <ArrowUp size={11} className="text-amber-700" /> : <ArrowDown size={11} className="text-amber-700" />
                      ) : (
                        <ArrowUpDown size={10} className="opacity-40" />
                      )}
                    </span>
                  </div>
                </th>
                <th className="py-3 px-3 text-center w-[105px] min-w-[105px] max-w-[105px] whitespace-nowrap sticky left-[176px] bg-gray-100 z-20 border-r border-gray-200/80 shadow-[3px_0_5px_-2px_rgba(0,0,0,0.06)]">Action</th>
                <th 
                  onClick={() => handleSort('bookingDate')}
                  className="py-3 px-3 min-w-[115px] whitespace-nowrap cursor-pointer hover:bg-gray-200/90 transition-colors select-none"
                  title="Click to Sort by Booking Date"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Booking Date</span>
                    <span className="text-gray-400">
                      {sortField === 'bookingDate' ? (
                        sortOrder === 'asc' ? <ArrowUp size={11} className="text-amber-700" /> : <ArrowDown size={11} className="text-amber-700" />
                      ) : (
                        <ArrowUpDown size={10} className="opacity-40" />
                      )}
                    </span>
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('visitDate')}
                  className="py-3 px-3 min-w-[110px] whitespace-nowrap cursor-pointer hover:bg-gray-200/90 transition-colors select-none"
                  title="Click to Sort by Visit Date"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Visit Date</span>
                    <span className="text-gray-400">
                      {sortField === 'visitDate' ? (
                        sortOrder === 'asc' ? <ArrowUp size={11} className="text-amber-700" /> : <ArrowDown size={11} className="text-amber-700" />
                      ) : (
                        <ArrowUpDown size={10} className="opacity-40" />
                      )}
                    </span>
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('reportingTime')}
                  className="py-3 px-3 min-w-[115px] whitespace-nowrap cursor-pointer hover:bg-gray-200/90 transition-colors select-none"
                  title="Click to Sort by Reporting Time"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Reporting Time</span>
                    <span className="text-gray-400">
                      {sortField === 'reportingTime' ? (
                        sortOrder === 'asc' ? <ArrowUp size={11} className="text-amber-700" /> : <ArrowDown size={11} className="text-amber-700" />
                      ) : (
                        <ArrowUpDown size={10} className="opacity-40" />
                      )}
                    </span>
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('projectName')}
                  className="py-3 px-3 min-w-[190px] whitespace-nowrap cursor-pointer hover:bg-gray-200/90 transition-colors select-none"
                  title="Click to Sort by Project Name"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Project</span>
                    <span className="text-gray-400">
                      {sortField === 'projectName' ? (
                        sortOrder === 'asc' ? <ArrowUp size={11} className="text-amber-700" /> : <ArrowDown size={11} className="text-amber-700" />
                      ) : (
                        <ArrowUpDown size={10} className="opacity-40" />
                      )}
                    </span>
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('salesTeam')}
                  className="py-3 px-3 min-w-[150px] whitespace-nowrap cursor-pointer hover:bg-gray-200/90 transition-colors select-none"
                  title="Click to Sort by Sales Team"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Sales Team</span>
                    <span className="text-gray-400">
                      {sortField === 'salesTeam' ? (
                        sortOrder === 'asc' ? <ArrowUp size={11} className="text-amber-700" /> : <ArrowDown size={11} className="text-amber-700" />
                      ) : (
                        <ArrowUpDown size={10} className="opacity-40" />
                      )}
                    </span>
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('salesman')}
                  className="py-3 px-3 min-w-[140px] whitespace-nowrap cursor-pointer hover:bg-gray-200/90 transition-colors select-none"
                  title="Click to Sort by Sales Person"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Sales Person</span>
                    <span className="text-gray-400">
                      {sortField === 'salesman' ? (
                        sortOrder === 'asc' ? <ArrowUp size={11} className="text-amber-700" /> : <ArrowDown size={11} className="text-amber-700" />
                      ) : (
                        <ArrowUpDown size={10} className="opacity-40" />
                      )}
                    </span>
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('name')}
                  className="py-3 px-3 min-w-[170px] whitespace-nowrap cursor-pointer hover:bg-gray-200/90 transition-colors select-none"
                  title="Click to Sort by Customer Name"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Customer / Lead Name</span>
                    <span className="text-gray-400">
                      {sortField === 'name' ? (
                        sortOrder === 'asc' ? <ArrowUp size={11} className="text-amber-700" /> : <ArrowDown size={11} className="text-amber-700" />
                      ) : (
                        <ArrowUpDown size={10} className="opacity-40" />
                      )}
                    </span>
                  </div>
                </th>
                <th className="py-3 px-3 min-w-[125px] whitespace-nowrap">Mobile Number</th>
                <th 
                  onClick={() => handleSort('noOfVisitor')}
                  className="py-3 px-3 text-center min-w-[95px] whitespace-nowrap cursor-pointer hover:bg-gray-200/90 transition-colors select-none"
                  title="Click to Sort by Visitor Count"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>No. Visitor</span>
                    <span className="text-gray-400">
                      {sortField === 'noOfVisitor' ? (
                        sortOrder === 'asc' ? <ArrowUp size={11} className="text-amber-700" /> : <ArrowDown size={11} className="text-amber-700" />
                      ) : (
                        <ArrowUpDown size={10} className="opacity-40" />
                      )}
                    </span>
                  </div>
                </th>
                <th className="py-3 px-3 min-w-[180px] whitespace-nowrap">Pick up Location</th>
                <th className="py-3 px-3 min-w-[160px] whitespace-nowrap">Driver</th>
                <th className="py-3 px-3 min-w-[160px] whitespace-nowrap">Project Representative</th>
                <th className="py-3 px-3 min-w-[180px] whitespace-nowrap">Vehicle</th>
                <th 
                  onClick={() => handleSort('status')}
                  className="py-3 px-3 text-center min-w-[140px] whitespace-nowrap cursor-pointer hover:bg-gray-200/90 transition-colors select-none"
                  title="Click to Sort by Visit Status"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Visit Status</span>
                    <span className="text-gray-400">
                      {sortField === 'status' ? (
                        sortOrder === 'asc' ? <ArrowUp size={11} className="text-amber-700" /> : <ArrowDown size={11} className="text-amber-700" />
                      ) : (
                        <ArrowUpDown size={10} className="opacity-40" />
                      )}
                    </span>
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('vehicleStatus')}
                  className="py-3 px-3 text-center min-w-[130px] whitespace-nowrap cursor-pointer hover:bg-gray-200/90 transition-colors select-none"
                  title="Click to Sort by Vehicle Status"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Vehicle Status</span>
                    <span className="text-gray-400">
                      {sortField === 'vehicleStatus' ? (
                        sortOrder === 'asc' ? <ArrowUp size={11} className="text-amber-700" /> : <ArrowDown size={11} className="text-amber-700" />
                      ) : (
                        <ArrowUpDown size={10} className="opacity-40" />
                      )}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {paginatedVisitors.map((v, index) => {
                const isSelected = selectedIds.includes(v.id);
                const isActionActive = activeActionRow === v.id;
                const isNearBottom = paginatedVisitors.length > 3 && index >= paginatedVisitors.length - 3;
                return (
                  <tr 
                    key={v.id} 
                    className={`group transition-colors ${isSelected ? 'bg-amber-50/50' : 'hover:bg-amber-50/20'} ${
                      isActionActive ? 'relative z-30' : ''
                    }`}
                  >
                    {/* Checkbox (Sticky) */}
                    <td className={`py-3 px-3 text-center w-[46px] min-w-[46px] max-w-[46px] sticky left-0 z-10 ${
                      isSelected ? 'bg-amber-50' : 'bg-white group-hover:bg-amber-50/30'
                    }`}>
                      <input 
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(v.id)}
                        className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer accent-amber-600"
                      />
                    </td>

                    {/* Booking ID (Sticky) */}
                    <td className={`py-3 px-3 font-bold text-gray-900 whitespace-nowrap w-[130px] min-w-[130px] max-w-[130px] sticky left-[46px] z-10 ${
                      isSelected ? 'bg-amber-50' : 'bg-white group-hover:bg-amber-50/30'
                    }`}>
                      <button
                        onClick={() => setViewDetailsVisitor(v)}
                        className="flex items-center gap-1.5 cursor-pointer text-left group/id"
                        title="View Details"
                      >
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-200 group-hover/id:border-amber-400 group-hover/id:bg-amber-50 group-hover/id:text-amber-900 transition-colors">
                          {v.bookingId}
                        </span>
                      </button>
                    </td>

                    {/* Action Button (Sticky right after Booking ID) */}
                    <td className={`py-3 px-3 text-center w-[105px] min-w-[105px] max-w-[105px] sticky left-[176px] border-r border-gray-200/80 shadow-[3px_0_5px_-2px_rgba(0,0,0,0.06)] ${
                      isActionActive ? 'z-40 bg-white' : `z-10 ${isSelected ? 'bg-amber-50' : 'bg-white group-hover:bg-amber-50/30'}`
                    }`}>
                      <div className="relative inline-block text-left">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveActionRow(isActionActive ? null : v.id);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-[11px] rounded-full shadow-2xs transition-all focus:outline-none cursor-pointer"
                        >
                          <span>Action</span>
                          <ChevronDown size={11} className={`transition-transform duration-150 ${isActionActive ? 'rotate-180' : ''}`} />
                        </button>

                        {isActionActive && (
                          <>
                            <div 
                              className="fixed inset-0 z-40 cursor-default" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveActionRow(null);
                              }} 
                            />
                            <div className={`absolute left-0 ${
                              isNearBottom ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
                            } w-52 bg-white rounded-xl shadow-2xl border border-gray-200/90 py-1.5 z-50 text-left text-xs`}>
                              <button
                                onClick={() => {
                                  setActiveActionRow(null);
                                  setViewDetailsVisitor(v);
                                }}
                                className="w-full px-3.5 py-2 flex items-center gap-2.5 hover:bg-emerald-50 text-gray-800 hover:text-emerald-800 font-medium transition-colors cursor-pointer"
                              >
                                <Eye size={14} className="text-emerald-600 shrink-0" />
                                <span className="whitespace-nowrap">View Details</span>
                              </button>
                              <button
                                onClick={() => {
                                  setActiveActionRow(null);
                                  setGatePassVisitor(v);
                                }}
                                className="w-full px-3.5 py-2 flex items-center gap-2.5 hover:bg-amber-50 text-gray-800 hover:text-amber-900 font-medium border-t border-gray-100 transition-colors cursor-pointer"
                              >
                                <Printer size={14} className="text-amber-600 shrink-0" />
                                <span className="whitespace-nowrap">Print Gate Pass</span>
                              </button>
                              <button
                                onClick={() => {
                                  setActiveActionRow(null);
                                  setRescheduleVisitor(v);
                                }}
                                className="w-full px-3.5 py-2 flex items-center gap-2.5 hover:bg-blue-50 text-gray-800 hover:text-blue-800 font-medium border-t border-gray-100 transition-colors cursor-pointer"
                              >
                                <Calendar size={14} className="text-blue-600 shrink-0" />
                                <span className="whitespace-nowrap">Schedule / Reschedule</span>
                              </button>
                              <button
                                onClick={() => {
                                  setActiveActionRow(null);
                                  setAssignVisitorId(v.id);
                                }}
                                className="w-full px-3.5 py-2 flex items-center gap-2.5 hover:bg-purple-50 text-gray-800 hover:text-purple-800 font-medium border-t border-gray-100 transition-colors cursor-pointer"
                              >
                                <UserPlus size={14} className="text-purple-600 shrink-0" />
                                <span className="whitespace-nowrap">Assign Salesman</span>
                              </button>
                              <button
                                onClick={() => {
                                  setActiveActionRow(null);
                                  setSmsVisitor(v);
                                }}
                                className="w-full px-3.5 py-2 flex items-center gap-2.5 hover:bg-emerald-50 text-gray-800 hover:text-emerald-900 font-medium border-t border-gray-100 transition-colors cursor-pointer"
                              >
                                <Send size={14} className="text-emerald-600 shrink-0" />
                                <span className="whitespace-nowrap">Send Short Text (SMS)</span>
                              </button>
                              
                              <div className="border-t border-gray-100 px-3.5 pt-2 pb-1 text-[10px] font-bold text-gray-400 tracking-wider">
                                Quick Status
                              </div>
                              <button
                                onClick={() => {
                                  setActiveActionRow(null);
                                  handleStatusChange(v.id, 'Visit Completed');
                                }}
                                className="w-full px-3.5 py-1.5 flex items-center gap-2.5 hover:bg-emerald-50 text-emerald-700 text-xs font-medium transition-colors cursor-pointer"
                              >
                                <Check size={13} className="shrink-0" />
                                <span className="whitespace-nowrap">Mark Completed</span>
                              </button>
                              <button
                                onClick={() => {
                                  setActiveActionRow(null);
                                  handleStatusChange(v.id, 'Booking Confirmed');
                                }}
                                className="w-full px-3.5 py-1.5 flex items-center gap-2.5 hover:bg-amber-50 text-amber-700 text-xs font-medium transition-colors cursor-pointer"
                              >
                                <Check size={13} className="shrink-0" />
                                <span className="whitespace-nowrap">Mark Booked / Sold</span>
                              </button>
                              <button
                                onClick={() => {
                                  setActiveActionRow(null);
                                  handleStatusChange(v.id, 'Cancelled');
                                }}
                                className="w-full px-3.5 py-1.5 flex items-center gap-2.5 hover:bg-rose-50 text-rose-700 text-xs font-medium transition-colors cursor-pointer"
                              >
                                <XCircle size={13} className="shrink-0" />
                                <span className="whitespace-nowrap">Mark Cancelled</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Booking Date */}
                    <td className="py-3 px-3 text-gray-600 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Calendar size={12} className="text-gray-400 shrink-0" />
                        <span>{v.bookingDate}</span>
                      </div>
                    </td>

                    {/* Visit Date */}
                    <td className="py-3 px-3 font-semibold text-gray-800 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Calendar size={12} className="text-amber-600 shrink-0" />
                        <span>{v.visitDate}</span>
                      </div>
                    </td>

                    {/* Reporting Time */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-gray-700">
                        <Clock size={12} className="text-amber-600 shrink-0" />
                        <span>{v.reportingTime}</span>
                      </div>
                    </td>

                    {/* Project */}
                    <td className="py-3 px-3">
                      <p className="font-bold text-gray-900 leading-tight truncate max-w-[200px]" title={v.projectName}>{v.projectName}</p>
                      {v.unitSpec && (
                        <p className="text-[10px] text-amber-700 font-semibold">{v.unitSpec}</p>
                      )}
                    </td>

                    {/* Sales Team */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                        <Users size={11} className="text-gray-500 shrink-0" />
                        <span>{v.salesTeam}</span>
                      </span>
                    </td>

                    {/* Sales Person */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center justify-between gap-1 group">
                        <span className="font-semibold text-gray-800">{v.salesman}</span>
                        <button
                          onClick={() => setAssignVisitorId(v.id)}
                          title="Reassign Sales Person"
                          className="text-gray-400 hover:text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                        >
                          <Edit3 size={12} />
                        </button>
                      </div>
                    </td>

                    {/* Customer / Lead Name */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <button
                        onClick={() => setViewDetailsVisitor(v)}
                        className="font-bold text-gray-900 text-[13px] hover:text-amber-700 hover:underline text-left cursor-pointer transition-colors block"
                        title="View Details"
                      >
                        {v.name}
                      </button>
                      {v.category && (
                        <span className="text-[10px] text-gray-500 block">{v.category}</span>
                      )}
                    </td>

                    {/* Mobile Number */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-[11px] font-medium text-gray-700">
                        <Phone size={12} className="text-gray-400 shrink-0" />
                        <span>{v.phone}</span>
                      </div>
                      {v.whatsapp && v.whatsapp !== v.phone && (
                        <span className="text-[10px] text-emerald-600 block">WA: {v.whatsapp}</span>
                      )}
                    </td>

                    {/* No. Visitor */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {v.noOfVisitor} Pax
                      </span>
                    </td>

                    {/* Pick up Location */}
                    <td className="py-3 px-3">
                      <div className="flex items-start gap-1 text-[11px] text-gray-700">
                        <MapPin size={12} className="text-rose-500 shrink-0 mt-0.5" />
                        <span className="truncate max-w-[170px]" title={v.pickupLocation}>{v.pickupLocation}</span>
                      </div>
                    </td>

                    {/* Driver */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="text-[11px] text-gray-800">
                        <p className="font-medium truncate max-w-[150px]" title={v.driverName}>{v.driverName}</p>
                      </div>
                    </td>

                    {/* Project Representative */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-[11px] text-gray-800">
                        <UserCheck size={12} className="text-teal-600 shrink-0" />
                        <span className="font-medium">{v.projectRepresentative}</span>
                      </div>
                    </td>

                    {/* Vehicle */}
                    <td className="py-3 px-3">
                      <div className="flex items-start gap-1 text-[11px] text-gray-800">
                        <Car size={12} className="text-amber-600 shrink-0 mt-0.5" />
                        <span className="truncate max-w-[170px]" title={v.vehicleNo}>{v.vehicleNo}</span>
                      </div>
                    </td>

                    {/* Visit Status */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block whitespace-nowrap ${
                        v.status === 'Site Visit Scheduled' 
                          ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                          : v.status === 'First Contact'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : v.status === 'Contacted'
                          ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                          : v.status === 'Visit Completed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : v.status === 'Booking Confirmed'
                          ? 'bg-emerald-600 text-white shadow-2xs font-extrabold'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}>
                        {v.status}
                      </span>
                    </td>

                    {/* Vehicle Status */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                        v.vehicleStatus === 'Vehicle Conflict'
                          ? 'bg-red-100 text-red-700 border border-red-300 font-extrabold animate-pulse'
                          : v.vehicleStatus === 'Assigned'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : v.vehicleStatus === 'En Route'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : v.vehicleStatus === 'On Site'
                          ? 'bg-teal-50 text-teal-700 border border-teal-200'
                          : v.vehicleStatus === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          v.vehicleStatus === 'Vehicle Conflict' ? 'bg-red-600' :
                          v.vehicleStatus === 'Assigned' ? 'bg-blue-600' :
                          v.vehicleStatus === 'En Route' ? 'bg-amber-600' :
                          v.vehicleStatus === 'On Site' ? 'bg-teal-600' :
                          v.vehicleStatus === 'Completed' ? 'bg-emerald-600' : 'bg-gray-500'
                        }`} />
                        <span>{v.vehicleStatus}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filteredVisitors.length === 0 && (
                <tr>
                  <td colSpan={18} className="py-12 text-center text-gray-400">
                    <p className="text-sm font-semibold text-gray-600">No visitor bookings found matching current filters</p>
                    <p className="text-xs mt-1">Try changing your search keywords or resetting status filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-5 py-3.5 border-t border-gray-200/80 bg-gray-50/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-2 font-medium">
            <span>
              Showing <span className="font-bold text-gray-900">{filteredVisitors.length === 0 ? 0 : (validCurrentPage - 1) * pageSize + 1}</span> to{' '}
              <span className="font-bold text-gray-900">{Math.min(validCurrentPage * pageSize, filteredVisitors.length)}</span> of{' '}
              <span className="font-bold text-gray-900">{filteredVisitors.length}</span> leads
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">Page {validCurrentPage} of {totalPages}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* First Page */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={validCurrentPage === 1}
              className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="First Page"
            >
              <ChevronsLeft size={14} />
            </button>

            {/* Prev Page */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={validCurrentPage === 1}
              className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-medium transition-colors"
            >
              <ChevronLeft size={14} />
              <span>Previous</span>
            </button>

            {/* Page Number Buttons */}
            <div className="flex items-center gap-1 mx-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                    page === validCurrentPage
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Page */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={validCurrentPage === totalPages}
              className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-medium transition-colors"
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>

            {/* Last Page */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={validCurrentPage === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Last Page"
            >
              <ChevronsRight size={14} />
            </button>
          </div>
        </div>
      </div>
        </>
      ) : (
        /* ================= LEAD VISIT REQUESTS & FLEET SLOT DESK ================= */
        <div className="space-y-5">
          {/* Requests Top 4 Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* KPI 1: Inbound Lead Requests */}
            <div className="bg-white rounded-2xl p-4 border border-blue-200/80 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
              <div className="flex items-center justify-between gap-1 mb-2 z-10">
                <span className="font-extrabold text-xs text-gray-900 tracking-tight">Total Inbound Requests</span>
                <div className="p-2 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Calendar size={18} />
                </div>
              </div>
              <div className="z-10 mt-1">
                <div className="text-2xl font-black text-gray-900 tracking-tight">{requests.length}</div>
                <div className="text-[10px] font-bold text-blue-700 mt-1">
                  Requested from Lead CRM
                </div>
              </div>
              <Calendar size={75} className="absolute -right-3 -bottom-3 text-blue-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
            </div>

            {/* KPI 2: Pending Slot Check */}
            <div className="bg-white rounded-2xl p-4 border border-amber-300 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all bg-gradient-to-br from-white to-amber-50/40">
              <div className="flex items-center justify-between gap-1 mb-2 z-10">
                <span className="font-extrabold text-xs text-amber-950 tracking-tight flex items-center gap-1.5">
                  <span>Pending Slot Verification</span>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                </span>
                <div className="p-2 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <Clock size={18} />
                </div>
              </div>
              <div className="z-10 mt-1">
                <div className="text-2xl font-black text-amber-950 tracking-tight">{pendingRequestsCount}</div>
                <div className="text-[10px] font-bold text-amber-800 mt-1">
                  Awaiting Vehicle Slot Confirmation
                </div>
              </div>
              <Clock size={75} className="absolute -right-3 -bottom-3 text-amber-500/15 pointer-events-none group-hover:scale-110 transition-transform" />
            </div>

            {/* KPI 3: Confirmed & Dispatched */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-200/80 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
              <div className="flex items-center justify-between gap-1 mb-2 z-10">
                <span className="font-extrabold text-xs text-gray-900 tracking-tight">Confirmed Bookings</span>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <div className="z-10 mt-1">
                <div className="text-2xl font-black text-gray-900 tracking-tight">
                  {requests.filter(r => r.status === 'Confirmed').length}
                </div>
                <div className="text-[10px] font-bold text-emerald-700 mt-1">
                  Slots Allocated & Promoted to Manifest
                </div>
              </div>
              <CheckCircle2 size={75} className="absolute -right-3 -bottom-3 text-emerald-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
            </div>

            {/* KPI 4: Fleet Transport Capacity */}
            <div className="bg-white rounded-2xl p-4 border border-purple-200/80 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
              <div className="flex items-center justify-between gap-1 mb-2 z-10">
                <span className="font-extrabold text-xs text-gray-900 tracking-tight">Fleet Availability</span>
                <div className="p-2 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Car size={18} />
                </div>
              </div>
              <div className="z-10 mt-1">
                <div className="text-2xl font-black text-gray-900 tracking-tight">5 Vehicles Free</div>
                <div className="text-[10px] font-bold text-purple-700 mt-1">
                  VIP Prado, HiAce, Noah on Standby
                </div>
              </div>
              <Car size={75} className="absolute -right-3 -bottom-3 text-purple-400/10 pointer-events-none group-hover:scale-110 transition-transform" />
            </div>
          </div>

          {/* Workflow Explanation Banner */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-2xs flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700 shrink-0">
              <Sparkles size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-gray-900 flex items-center gap-2">
                <span>Site Visit Confirmation Desk (ভিজিটর স্লট বুকিং ডেস্কে স্বাগতম)</span>
                <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Prompt 9 Compliant Workflow</span>
              </h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                When a sales executive registers a prospective client with a preferred site visit date, the request is routed here in real-time. 
                The transport desk verifies available fleet slots on that date, assigns driver/vehicle and confirms the booking. 
                Instant confirmations and SMS pass details are synchronized with both the Lead and the Sales Officer.
              </p>
            </div>
          </div>

          {/* Requests Filter Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lead by name, phone, project, location..."
                  value={requestSearchTerm}
                  onChange={(e) => setRequestSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-gray-400"
                />
              </div>

              <select
                value={requestStatusFilter}
                onChange={(e) => setRequestStatusFilter(e.target.value as any)}
                className="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-amber-500 font-medium cursor-pointer"
              >
                <option value="All">All Requests ({requests.length})</option>
                <option value="Pending Review">Pending Review ({pendingRequestsCount})</option>
                <option value="Confirmed">Confirmed ({requests.filter(r => r.status === 'Confirmed').length})</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Showing <strong>{filteredRequests.length}</strong> of <strong>{requests.length}</strong> requests</span>
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/75 text-[11px] font-bold text-gray-700 tracking-wider uppercase">
                    <th className="py-3 px-3.5 text-center w-12">SI</th>
                    <th className="py-3 px-4">Lead Client Profile</th>
                    <th className="py-3 px-4">Project & Demand</th>
                    <th className="py-3 px-4">Sales Officer</th>
                    <th className="py-3 px-4 bg-amber-50/50 border-x border-amber-200/50 text-amber-950 font-black">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-amber-700" />
                        <span>Preferred Visit Date & Slot (ভিজিটের তারিখ)</span>
                      </div>
                    </th>
                    <th className="py-3 px-4">Pickup & Capacity</th>
                    <th className="py-3 px-3.5 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Slot Confirmation Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-normal">
                  {filteredRequests.map((req, idx) => (
                    <tr key={req.id} className="hover:bg-amber-50/20 transition-colors">
                      <td className="py-3.5 px-3.5 text-center font-bold text-gray-500">
                        {String(idx + 1).padStart(2, '0')}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-900 text-xs">{req.clientName}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-gray-600 font-semibold">{req.clientPhone}</span>
                          <a
                            href={`https://wa.me/88${req.clientPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-emerald-700 font-bold hover:underline"
                            title="Open WhatsApp"
                          >
                            WhatsApp
                          </a>
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">
                          ID: {req.leadId} {req.clientEmail ? `• ${req.clientEmail}` : ''}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-900">{req.projectName}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          {req.requiredPlotSize ? `${req.requiredPlotSize} Plot` : '3 Katha Plot'}
                          {req.facingPreference ? ` • ${req.facingPreference}` : ''}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-800">{req.assignedSalesman || 'Assigned Officer'}</div>
                        <div className="text-[10px] text-gray-400">Direct Representative</div>
                      </td>

                      <td className="py-3.5 px-4 bg-amber-50/30 border-x border-amber-200/40">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-950 font-black text-xs border border-amber-300 shadow-2xs">
                          <Calendar size={13} className="text-amber-700" />
                          <span>{req.preferredVisitDate}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-700 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock size={11} className="text-amber-600" />
                            <strong>{req.preferredVisitTime || '10:30 AM'}</strong>
                          </span>
                          <span className="text-gray-300">•</span>
                          <span>{req.guestCount || 2} Visitors</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-start gap-1 text-gray-700 text-xs">
                          <MapPin size={12} className="text-rose-500 shrink-0 mt-0.5" />
                          <span className="font-medium line-clamp-1">{req.pickupLocation || 'Office / Designated Point'}</span>
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">
                          Req guests: {req.guestCount || 2} persons
                        </div>
                      </td>

                      <td className="py-3.5 px-3.5 text-center">
                        {req.status === 'Confirmed' ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
                            <Check size={11} />
                            <span>Confirmed</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 inline-flex items-center gap-1 animate-pulse">
                            <Clock size={11} />
                            <span>Pending Slot</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        {req.status === 'Confirmed' ? (
                          <div className="flex flex-col items-center gap-1">
                            <div className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-[11px] font-bold">
                              Booking: {req.confirmedBookingId || 'BK-CONFIRMED'}
                            </div>
                            <div className="text-[10px] text-gray-500 truncate max-w-[140px]">
                              {req.assignedVehicle ? req.assignedVehicle.split('(')[0] : 'Vehicle Assigned'}
                            </div>
                            <button
                              onClick={() => setConfirmingRequest(req)}
                              className="text-[10px] text-amber-700 font-bold hover:underline cursor-pointer"
                            >
                              Re-verify / Edit Slot
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmingRequest(req)}
                            className="px-3.5 py-2 rounded-xl text-white font-bold text-xs shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5 w-full cursor-pointer"
                            style={{ backgroundColor: '#c7a259' }}
                            title="Check vehicle availability on this date and confirm slot"
                          >
                            <Car size={14} />
                            <span>Check Slot & Confirm (বুকিং)</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredRequests.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-gray-400">
                        <Calendar size={36} className="mx-auto mb-2 text-gray-300" />
                        <p className="text-sm font-semibold text-gray-700">No lead visit requests found</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          When leads request a site visit, they will show up here for slot verification.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ASSIGN SALESMAN */}
      {assignVisitorId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <h4 className="font-bold text-gray-900 text-sm">Assign Sales Representative</h4>
            <div className="space-y-1.5 text-xs">
              {['Siddique Rahman', 'Md. Rahim Sarder', 'Farhana Yasmin', 'Rashedul Karim'].map((sName) => (
                <button
                  key={sName}
                  onClick={() => handleAssignSalesman(sName)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-900 font-medium border border-gray-100 transition-colors flex items-center justify-between"
                >
                  <span>{sName}</span>
                  <ChevronDown size={12} className="-rotate-90 text-gray-400" />
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setAssignVisitorId(null)}
                className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PRINT GATE PASS */}
      {gatePassVisitor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="text-center border-b border-gray-200 pb-3">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">Promise Assets Limited</span>
              <h3 className="text-base font-extrabold text-gray-900">Official Site Visit Security Pass</h3>
              <p className="text-[10px] text-gray-400">Pass No: PAL-VIS-PASS-{gatePassVisitor.sl}-2026</p>
            </div>

            <div className="space-y-2 border border-dashed border-gray-300 p-3.5 rounded-xl bg-gray-50/50">
              <div className="flex justify-between">
                <span className="text-gray-500">Visitor:</span>
                <span className="font-bold text-gray-900">{gatePassVisitor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone:</span>
                <span className="font-bold text-gray-900">{gatePassVisitor.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Destination Site:</span>
                <span className="font-bold text-amber-900">{gatePassVisitor.projectName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Visit Schedule:</span>
                <span className="font-bold text-gray-900">{gatePassVisitor.visitDate || '2026-09-14'} @ {gatePassVisitor.visitTime || '10:30 AM'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Assigned Vehicle:</span>
                <span className="font-bold text-gray-800">{gatePassVisitor.vehicleNo || 'Dhaka Metro-GA 24-8812'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Assigned Host:</span>
                <span className="font-bold text-gray-800">{gatePassVisitor.salesman}</span>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 text-center italic">
              Authorized by Security Protocol & Promise Assets Site Management.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setGatePassVisitor(null)}
                className="px-3.5 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                  showToast('Gate pass sent to printer.');
                }}
                className="px-4 py-1.5 text-white rounded-lg font-bold shadow-sm"
                style={{ backgroundColor: '#c7a259' }}
              >
                Print Slip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SCHEDULE / RESCHEDULE */}
      {rescheduleVisitor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4 text-xs">
            <h4 className="font-bold text-gray-900 text-sm">Reschedule Site Tour</h4>
            <p className="text-gray-500 text-[11px]">Updating visit date for <strong>{rescheduleVisitor.name}</strong></p>

            <div className="space-y-3">
              <div>
                <label className="block text-gray-700 font-bold mb-1">New Date</label>
                <input
                  type="date"
                  defaultValue={rescheduleVisitor.visitDate || '2026-09-16'}
                  id="newVisitDate"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1">New Time</label>
                <input
                  type="text"
                  defaultValue={rescheduleVisitor.visitTime || '11:30 AM'}
                  id="newVisitTime"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRescheduleVisitor(null)}
                className="px-3 py-1.5 border border-gray-200 rounded-md text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const d = (document.getElementById('newVisitDate') as HTMLInputElement)?.value;
                  const t = (document.getElementById('newVisitTime') as HTMLInputElement)?.value;
                  setVisitors((prev) =>
                    prev.map((v) => (v.id === rescheduleVisitor.id ? { ...v, visitDate: d, visitTime: t, status: 'Site Visit Scheduled' } : v))
                  );
                  showToast(`Visit rescheduled for ${d} at ${t}`);
                  setRescheduleVisitor(null);
                }}
                className="px-4 py-1.5 text-white rounded-md font-bold"
                style={{ backgroundColor: '#c7a259' }}
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM VISIT SLOT MODAL */}
      {confirmingRequest && (
        <ConfirmVisitSlotModal
          request={confirmingRequest}
          isOpen={Boolean(confirmingRequest)}
          onClose={() => setConfirmingRequest(null)}
          existingBookingsOnDate={visitors
            .filter(v => v.visitDate === confirmingRequest.preferredVisitDate)
            .map(v => ({
              vehicleNo: v.vehicleNo,
              reportingTime: v.reportingTime,
              customerName: v.name
            }))
          }
          onConfirm={handleExecuteConfirmation}
        />
      )}
    </div>
  );
};
