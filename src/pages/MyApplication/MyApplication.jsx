// import React, { useState } from 'react';
// import { 
//   Info, 
//   Briefcase, 
//   Home, 
//   Car, 
//   GraduationCap, 
//   Building2, 
//   CheckCircle2, 
//   Clock, 
//   XCircle, 
//   MinusCircle,
//   User,
//   FileText,
//   ShieldCheck,
//   History,
//   X
// } from 'lucide-react';

// /**
//  * Enhanced Loan application data including details for the side panel
//  */
// const applications = [
//   {
//     id: 'LN-20251201',
//     type: 'Personal Loan',
//     bank: 'HDFC Bank',
//     amount: '₹5,00,000',
//     tenure: '48 months',
//     emi: '₹11,200/mo',
//     appliedDate: '01 Dec 2025',
//     status: 'Disbursed',
//     icon: Briefcase,
//     iconBg: 'bg-purple-100',
//     iconColor: 'text-purple-600',
//     borrower: {
//       name: 'Meka Sanjana',
//       mobile: '9876543210',
//       city: 'Mumbai',
//       income: '₹75,000',
//       employment: 'Salaried'
//     },
//     interestRate: '12.5% p.a.',
//     eligibilityScore: 85,
//     riskScore: 25,
//     timeline: [
//       { label: 'Lead created', date: '01 Dec 2025, 10:00 am', completed: true },
//       { label: 'Application submitted', date: '02 Dec 2025, 02:30 pm', completed: true },
//       { label: 'KYC completed', date: '03 Dec 2025, 11:00 am', completed: true },
//       { label: 'Sent to Bank', date: '04 Dec 2025, 09:00 am', completed: true },
//       { label: 'Sanctioned', date: '06 Dec 2025, 03:00 pm', completed: true },
//       { label: 'Disbursed', date: '08 Dec 2025, 01:00 pm', completed: true }
//     ]
//   },
//   {
//     id: 'LN-20250915',
//     type: 'Home Loan',
//     bank: 'SBI',
//     amount: '₹35,00,000',
//     tenure: '240 months',
//     emi: '₹32,500/mo',
//     appliedDate: '15 Sep 2025',
//     status: 'Active',
//     icon: Home,
//     iconBg: 'bg-orange-100',
//     iconColor: 'text-orange-600',
//     borrower: {
//       name: 'Arjun Mehta',
//       mobile: '9988776655',
//       city: 'Bangalore',
//       income: '₹1,50,000',
//       employment: 'Salaried'
//     },
//     interestRate: '8.5% p.a.',
//     eligibilityScore: 92,
//     riskScore: 15,
//     timeline: [
//       { label: 'Lead created', date: '15 Sep 2025, 11:00 am', completed: true },
//       { label: 'Application submitted', date: '16 Sep 2025, 04:00 pm', completed: true },
//       { label: 'KYC completed', date: '18 Sep 2025, 10:30 am', completed: true },
//       { label: 'Sent to Bank', date: '20 Sep 2025, 02:00 pm', completed: true },
//       { label: 'Under Verification', date: 'Processing', completed: false }
//     ]
//   },
//   {
//     id: 'LN-20250801',
//     type: 'Car Loan',
//     bank: 'ICICI Bank',
//     amount: '₹8,00,000',
//     tenure: '60 months',
//     emi: '₹16,800/mo',
//     appliedDate: '01 Aug 2025',
//     status: 'Closed',
//     icon: Car,
//     iconBg: 'bg-blue-100',
//     iconColor: 'text-blue-600',
//     borrower: {
//       name: 'Rahul Varma',
//       mobile: '9123456789',
//       city: 'Delhi',
//       income: '₹95,000',
//       employment: 'Self-Employed'
//     },
//     interestRate: '9.2% p.a.',
//     eligibilityScore: 78,
//     riskScore: 35,
//     timeline: [
//       { label: 'Completed', date: 'Loan Repaid Fully', completed: true }
//     ]
//   },
//   {
//     id: 'LN-20251210',
//     type: 'Education Loan',
//     bank: 'Axis Bank',
//     amount: '₹12,00,000',
//     tenure: '84 months',
//     emi: '₹18,500/mo',
//     appliedDate: '10 Dec 2025',
//     status: 'On Hold',
//     icon: GraduationCap,
//     iconBg: 'bg-indigo-100',
//     iconColor: 'text-indigo-600',
//     borrower: {
//       name: 'Sanya Iyer',
//       mobile: '9888877777',
//       city: 'Chennai',
//       income: '₹60,000',
//       employment: 'Salaried'
//     },
//     interestRate: '10.5% p.a.',
//     eligibilityScore: 65,
//     riskScore: 45,
//     timeline: [
//       { label: 'Lead created', date: '10 Dec 2025', completed: true },
//       { label: 'Waiting for Documents', date: 'Action Required', completed: false }
//     ]
//   },
//   {
//     id: 'LN-20251105',
//     type: 'Business Loan',
//     bank: 'Kotak Bank',
//     amount: '₹20,00,000',
//     tenure: '36 months',
//     emi: '₹65,000/mo',
//     appliedDate: '05 Nov 2025',
//     status: 'Cancelled',
//     icon: Building2,
//     iconBg: 'bg-slate-100',
//     iconColor: 'text-slate-600',
//     borrower: {
//       name: 'Vikram Singh',
//       mobile: '9777766666',
//       city: 'Pune',
//       income: '₹2,50,000',
//       employment: 'Business Owner'
//     },
//     interestRate: '15% p.a.',
//     eligibilityScore: 50,
//     riskScore: 70,
//     timeline: [
//       { label: 'Cancelled by User', date: '06 Nov 2025', completed: false }
//     ]
//   }
// ];

// const StatusBadge = ({ status }) => {
//   const styles = {
//     'Disbursed': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', icon: <CheckCircle2 size={12} className="mr-1" /> },
//     'Active': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', icon: <CheckCircle2 size={12} className="mr-1" /> },
//     'Closed': { bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-200', icon: <MinusCircle size={12} className="mr-1" /> },
//     'On Hold': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', icon: <Clock size={12} className="mr-1" /> },
//     'Cancelled': { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', icon: <XCircle size={12} className="mr-1" /> }
//   };
//   const style = styles[status] || styles['Active'];
//   return (
//     <div className={`flex items-center self-start px-2.5 py-1 rounded-full text-[10px] font-semibold border ${style.bg} ${style.text} ${style.border}`}>
//       {style.icon}
//       {status}
//     </div>
//   );
// };

// export default function MyApplication() {
//   const [selectedId, setSelectedId] = useState(null);
//   const selectedApp = applications.find(a => a.id === selectedId);

//   const handleSelect = (id) => {
//     setSelectedId(id);
//   };

//   const handleClose = () => {
//     setSelectedId(null);
//   };  

//   return (

//     <div className="min-h-screen bg-[#fcfaff] font-sans text-slate-900 transition-all duration-300">
//       <div className={`mx-auto p-4 md:p-6 lg:p-8 transition-all duration-500 ${selectedId ? 'max-w-[1400px]' : 'max-w-5xl'}`}>
//         <div className="flex flex-col lg:flex-row gap-6 items-start mt-10">

//           {/* LEFT COLUMN: List View */}
//           <div className={`transition-all duration-500 w-full shrink-0 ${selectedId ? 'lg:w-[40%]' : 'lg:w-full'}`}>
//             <header className="mb-6 h-[60px] flex flex-col justify-center">
//               <h1 className="text-2xl font-bold text-slate-800 tracking-tight">My Applications</h1>
//               <p className="text-sm text-slate-400 mt-1 font-medium">Track all your loan applications</p>
//             </header>

//             <div className="bg-[#f5efff] border border-purple-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
//               <Info className="text-purple-600 mt-0.5 shrink-0" size={18} />
//               <p className="text-[13px] text-purple-900 leading-snug">
//                 <span className="font-semibold">Eligible loans available!</span> You have pre-approved loan offers. Eligibility data is held only for <span className="font-bold">7 days</span> — act before it expires.
//               </p>
//             </div>

//             <div className="space-y-4">
//               {applications.map((app) => (
//                 <div 
//                   key={app.id} 
//                   onClick={() => handleSelect(app.id)}
//                   className={`bg-white border rounded-2xl p-5 shadow-sm cursor-pointer transition-all duration-300 group ${
//                     selectedId === app.id 
//                       ? 'border-purple-500 ring-1 ring-purple-500 bg-purple-50/10' 
//                       : 'border-slate-100 hover:border-purple-200 hover:shadow-md'
//                   }`}
//                 >
//                   <div className="flex justify-between items-start mb-6">
//                     <div className="flex gap-4">
//                       <div className={`p-3 rounded-xl transition-colors duration-300 flex items-center justify-center shrink-0 ${app.iconBg} ${app.iconColor} group-hover:bg-purple-100 group-hover:text-purple-600`}>
//                         <app.icon size={22} />
//                       </div>
//                       <div className="flex flex-col justify-center">
//                         <h2 className="font-bold text-[15px] text-slate-800 leading-tight">{app.type}</h2>
//                         <p className="text-[11px] font-medium text-slate-400 mt-1">{app.id} • {app.bank}</p>
//                       </div>
//                     </div>
//                     <StatusBadge status={app.status} />
//                   </div>

//                   <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 pt-5 border-t border-slate-50`}>
//                     {[
//                       { label: 'Amount', value: app.amount },
//                       { label: 'Tenure', value: app.tenure },
//                       { label: 'EMI', value: app.emi },
//                       { label: 'Applied', value: app.appliedDate }
//                     ].map((item, idx) => (
//                       <div key={idx} className="flex flex-col">
//                         <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">{item.label}</span>
//                         <span className="font-bold text-slate-800 text-[13px]">{item.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT COLUMN: Detail View */}
//           {selectedId && (
//             <div className="w-full lg:w-[60%] animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col">
//               {/* Spacer to align header with left column header */}
//               <div className="h-[60px] mb-6 flex items-end justify-end px-2">
//                 <button 
//                   onClick={handleClose}
//                   className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all font-medium text-xs"
//                 >
//                   <X size={16} /> Close Details
//                 </button>
//               </div>

//               <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-xl shadow-slate-200/50 h-full relative">

//                 {/* Detail Header */}
//                 <div className="flex flex-col gap-1 mb-8">
//                   <div className="flex items-center gap-3">
//                     <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{selectedApp.id}</h2>
//                     <StatusBadge status={selectedApp.status} />
//                   </div>
//                   <p className="text-sm font-medium text-slate-400">{selectedApp.borrower.name} • {selectedApp.type}</p>
//                 </div>

//                 <div className="space-y-6">

//                   {/* Borrower Details Section */}
//                   <section className="bg-slate-50/50 border border-slate-100/80 rounded-2xl p-5">
//                     <div className="flex items-center gap-2 mb-4">
//                       <User size={16} className="text-slate-400" />
//                       <h3 className="font-bold text-slate-600 text-[13px] uppercase tracking-wide">Borrower Details</h3>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5">
//                       {[
//                         { label: 'Name', value: selectedApp.borrower.name },
//                         { label: 'Mobile', value: selectedApp.borrower.mobile },
//                         { label: 'City', value: selectedApp.borrower.city },
//                         { label: 'Income', value: selectedApp.borrower.income },
//                         { label: 'Employment', value: selectedApp.borrower.employment }
//                       ].map((item, idx) => (
//                         <div key={idx} className="flex items-center justify-between border-b border-slate-100/50 pb-2 last:border-0 last:pb-0">
//                           <span className="text-[11px] font-medium text-slate-400">{item.label}</span>
//                           <span className="text-[12px] font-bold text-slate-700">{item.value}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </section>

//                   {/* Loan Details Section */}
//                   <section className="bg-slate-50/50 border border-slate-100/80 rounded-2xl p-5">
//                     <div className="flex items-center gap-2 mb-4">
//                       <FileText size={16} className="text-slate-400" />
//                       <h3 className="font-bold text-slate-600 text-[13px] uppercase tracking-wide">Loan Details</h3>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5">
//                       {[
//                         { label: 'Amount', value: selectedApp.amount },
//                         { label: 'Tenure', value: selectedApp.tenure },
//                         { label: 'Lender', value: selectedApp.bank },
//                         { label: 'Interest Rate', value: selectedApp.interestRate },
//                         { label: 'EMI', value: selectedApp.emi }
//                       ].map((item, idx) => (
//                         <div key={idx} className="flex items-center justify-between border-b border-slate-100/50 pb-2 last:border-0 last:pb-0">
//                           <span className="text-[11px] font-medium text-slate-400">{item.label}</span>
//                           <span className="text-[12px] font-bold text-slate-700">{item.value}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </section>

//                   {/* Eligibility & Risk Section */}
//                   <section className="bg-slate-50/50 border border-slate-100/80 rounded-2xl p-5">
//                     <div className="flex items-center gap-2 mb-5">
//                       <ShieldCheck size={16} className="text-slate-400" />
//                       <h3 className="font-bold text-slate-600 text-[13px] uppercase tracking-wide">Eligibility & Risk</h3>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//                       <div className="space-y-4">
//                         <div>
//                           <div className="flex justify-between mb-1.5">
//                             <span className="text-[11px] font-bold text-slate-500">Eligibility Score</span>
//                             <span className="text-[11px] font-bold text-slate-800">{selectedApp.eligibilityScore}/100</span>
//                           </div>
//                           <div className="w-full bg-slate-200/60 rounded-full h-2 overflow-hidden">
//                             <div className="bg-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: `${selectedApp.eligibilityScore}%` }}></div>
//                           </div>
//                         </div>
//                         <div>
//                           <div className="flex justify-between mb-1.5">
//                             <span className="text-[11px] font-bold text-slate-500">Risk Score</span>
//                             <span className="text-[11px] font-bold text-slate-800">{selectedApp.riskScore}/100</span>
//                           </div>
//                           <div className="w-full bg-slate-200/60 rounded-full h-2 overflow-hidden">
//                             <div className="bg-emerald-400 h-full rounded-full transition-all duration-700" style={{ width: `${selectedApp.riskScore}%` }}></div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="space-y-3">
//                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Recommended Lenders</p>
//                         <div className="space-y-2.5">
//                           {['HDFC Bank', 'ICICI Bank', 'Axis Bank'].map((lender, i) => (
//                             <div key={i} className="flex items-center justify-between border-b border-slate-100/50 pb-1.5 last:border-0 last:pb-0">
//                               <p className="text-xs font-bold text-slate-700">{lender}</p>
//                               <CheckCircle2 size={14} className="text-emerald-500" />
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </section>

//                   {/* Application Timeline Section */}
//                   <section className="bg-slate-50/50 border border-slate-100/80 rounded-2xl p-6">
//                     <div className="flex items-center gap-2 mb-6">
//                       <History size={16} className="text-slate-400" />
//                       <h3 className="font-bold text-slate-600 text-[13px] uppercase tracking-wide">Application Timeline</h3>
//                     </div>

//                     <div className="space-y-6 relative">
//                       {selectedApp.timeline.map((item, idx) => (
//                         <div key={idx} className="flex gap-4 relative">
//                           {/* Connecting Line */}
//                           {idx !== selectedApp.timeline.length - 1 && (
//                             <div className={`absolute left-[11px] top-6 w-[2px] h-[calc(100%+8px)] ${item.completed ? 'bg-emerald-100' : 'bg-slate-100'}`}></div>
//                           )}

//                           <div className="shrink-0 mt-0.5 z-10">
//                             {item.completed ? (
//                               <CheckCircle2 size={22} className="text-emerald-500 fill-white" />
//                             ) : (
//                               <div className="w-[22px] h-[22px] rounded-full border-2 border-slate-200 bg-white shadow-sm"></div>
//                             )}
//                           </div>

//                           <div className="flex flex-col justify-center">
//                             <p className={`text-[13px] font-bold ${item.completed ? 'text-slate-700' : 'text-slate-400'}`}>
//                               {item.label}
//                             </p>
//                             <p className="text-[10px] font-medium text-slate-400 mt-0.5">{item.date}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </section>

//                 </div>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { useContextData } from '@/context/AuthContext';
import { Lock, LogIn, ChevronRight } from "lucide-react";
import LoginGate from '@/components/LoginGate/LoginGate';
import {
    Info,
    Briefcase,
    Home,
    Car,
    GraduationCap,
    Building2,
    CheckCircle2,
    Clock,
    XCircle,
    MinusCircle,
    User,
    FileText,
    ShieldCheck,
    History,
    X
} from 'lucide-react';

// ─── Helpers ────────────────────────────────────────────────────────────────

const LOAN_TYPE_CONFIG = {
    personal: { label: 'Personal Loan', Icon: Briefcase, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
    home: { label: 'Home Loan', Icon: Home, iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
    car: { label: 'Car Loan', Icon: Car, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    education: { label: 'Education Loan', Icon: GraduationCap, iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
    business: { label: 'Business Loan', Icon: Building2, iconBg: 'bg-slate-100', iconColor: 'text-slate-600' },
};

const STATUS_MAP = {
    draft: 'Draft',
    active: 'Active',
    submitted: 'Submitted',
    disbursed: 'Disbursed',
    closed: 'Closed',
    cancelled: 'Cancelled',
    rejected: 'Cancelled',
    sanctioned: 'Active',
};

const STEP_LABEL_MAP = {
    CONSENTS_PENDING: 'Consents Pending',
    KYC_PENDING: 'KYC Pending',
    APPLICATION_SUBMITTED: 'Application Submitted',
    SENT_TO_BANK: 'Sent to Bank',
    UNDER_VERIFICATION: 'Under Verification',
    SANCTIONED: 'Sanctioned',
    DISBURSED: 'Disbursed',
    CANCELLED: 'Cancelled',
    OFFERS_GENERATED: 'Offers Generated',
};

/** Format a number to Indian rupee string e.g. ₹5,00,000 */
function formatINR(amount) {
    if (amount == null) return '—';
    return '₹' + Number(amount).toLocaleString('en-IN');
}

/** Format tenure in months: e.g. 7 → "7 months", 24 → "24 months" */
function formatTenure(months) {
    if (months == null) return '—';
    return `${months} months`;
}

/** Rough EMI calculation */
function calcEMI(principal, annualRate, tenureMonths) {
    if (!principal || !annualRate || !tenureMonths) return '—';
    const r = annualRate / 12 / 100;
    const n = tenureMonths;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return formatINR(Math.round(emi)) + '/mo';
}

/** Pick the best offer (highest approval probability) */
function getBestOffer(offers = []) {
    if (!offers.length) return null;
    return offers.reduce((best, o) =>
        (o.approvalProbability > (best?.approvalProbability ?? 0) ? o : best), offers[0]);
}

/** Build timeline steps from currentStep */
function buildTimeline(currentStep, status, createdAt) {
    const steps = [
        'APPLICATION_SUBMITTED',
        'KYC_PENDING',
        'CONSENTS_PENDING',
        'SENT_TO_BANK',
        'UNDER_VERIFICATION',
        'SANCTIONED',
        'DISBURSED',
    ];

    let currentIdx = steps.indexOf(currentStep);

    // If backend step not in list
    if (currentIdx === -1) {
        if (status === "submitted") {
            currentIdx = 1; // APPLICATION_SUBMITTED completed
        } else {
            currentIdx = 0;
        }
    }

    return steps.map((step, idx) => ({
        label: STEP_LABEL_MAP[step] || step,
        date:
            idx < currentIdx
                ? "Completed"
                : idx === currentIdx
                    ? "In Progress"
                    : "Pending",
        completed: idx < currentIdx,
    }));
}

/** Transform a raw API application object into the shape the UI expects */
function transformApplication(raw) {
    const loanType = (raw.loanType || 'personal').toLowerCase();
    const config = LOAN_TYPE_CONFIG[loanType] || LOAN_TYPE_CONFIG.personal;

    const uiStatus = STATUS_MAP[raw.status] || 'On Hold';
    const bestOffer = getBestOffer(raw.providedOffer);
    const allOffers = raw.providedOffer || [];

    // Prefer the best offer's rate, else first eligible offer
    const interestRate = bestOffer ? `${bestOffer.interestRate}% p.a.` : '—';
    const maxAmount = bestOffer?.maximumEligibleLoanAmount ?? raw.requestedAmount;
    const bank = bestOffer?.bankName ?? '—';

    const emi = calcEMI(
        raw.requestedAmount,
        bestOffer?.interestRate,
        raw.preferredTenure
    );

    // Eligibility score: average approvalProbability of eligible offers
    const eligibleOffers = allOffers.filter(o => o.eligible);
    const eligibilityScore = eligibleOffers.length
        ? Math.round(eligibleOffers.reduce((s, o) => s + o.approvalProbability, 0) / eligibleOffers.length)
        : 0;

    // Risk score: inverse proxy (lower approval → higher risk), clamped 0–100
    const riskScore = Math.max(0, Math.min(100, 100 - eligibilityScore));
    const credit = raw.creditProfileId || {};

    // get valid phone number (10 digits)
    const mobile =
        credit.phoneNumbers
            ?.map(p => p.Number)
            ?.find(num => /^\d{10}$/.test(num)) || '—';

    // get city from address if available
    const city =
        credit.addresses?.[0]?.state ||
        credit.city ||
        '—';

    const borrower = {
        name: credit.fullName || 'Applicant',
        mobile,
        city,
        income: credit.monthlyIncome
            ? formatINR(credit.monthlyIncome)
            : '—',
        employment: credit.employmentStatus || '—',
    };


    const appliedDate = raw.submittedAt
        ? new Date(raw.submittedAt).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
        : raw.createdAt
            ? new Date(raw.createdAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })
            : '—';

    const timeline = buildTimeline(raw.currentStep, raw.status, raw.createdAt);

    // Recommended lenders: top 3 by approvalProbability
    const recommendedLenders = [...allOffers]
        .sort((a, b) => b.approvalProbability - a.approvalProbability)
        .slice(0, 3)
        .map(o => o.bankName);

    return {
        id: raw._id,
        type: config.label,
        bank,
        amount: formatINR(raw.requestedAmount),
        tenure: formatTenure(raw.preferredTenure),
        emi,
        appliedDate,
        status: uiStatus,
        icon: config.Icon,
        iconBg: config.iconBg,
        iconColor: config.iconColor,
        borrower,
        interestRate,
        eligibilityScore,
        riskScore,
        timeline,
        recommendedLenders,
        allOffers,
    };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
    const styles = {
        'Submitted': {
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
            border: 'border-emerald-200',
            icon: <CheckCircle2 size={12} className="mr-1" />
        },

        'Completed': {
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
            border: 'border-emerald-200',
            icon: <CheckCircle2 size={12} className="mr-1" />
        },

        'Disbursed': {
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
            border: 'border-emerald-200',
            icon: <CheckCircle2 size={12} className="mr-1" />
        },

        'Active': {
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
            border: 'border-emerald-200',
            icon: <CheckCircle2 size={12} className="mr-1" />
        },

        'Closed': {
            bg: 'bg-slate-50',
            text: 'text-slate-500',
            border: 'border-slate-200',
            icon: <MinusCircle size={12} className="mr-1" />
        },

        'On Hold': {
            bg: 'bg-amber-50',
            text: 'text-amber-600',
            border: 'border-amber-200',
            icon: <Clock size={12} className="mr-1" />
        },

        'Cancelled': {
            bg: 'bg-rose-50',
            text: 'text-rose-600',
            border: 'border-rose-200',
            icon: <XCircle size={12} className="mr-1" />
        }
    };
    const style = styles[status] || styles['On Hold'];
    return (
        <div className={`flex items-center self-start px-2.5 py-1 rounded-full text-[10px] font-semibold border ${style.bg} ${style.text} ${style.border}`}>
            {style.icon}
            {status}
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MyApplication() {
    const mobileNumber = sessionStorage.getItem("mobile_number");

    if (!mobileNumber) {
        return (
            <LoginGate
                title="View Your Applications"
                description="Your loan applications and progress timeline are secured. Please login to track your applications."
                redirectPath="/my-applicaton"
                buttonText="Login to View Applications"
            />
        );

    }
    const { applications: rawApplications, isLoading } = useContextData();
    // const isLoading = rawApplications === undefined || rawApplications === null;
    const [selectedId, setSelectedId] = useState(null);

    // Transform raw API data → UI-ready shape
    const applications = (rawApplications || []).map(transformApplication);
    const selectedApp = applications.find(a => a.id === selectedId);

    return (
        <div className="min-h-screen bg-[#fcfaff] font-sans text-slate-900 transition-all duration-300 mt-5">
            <div className={`mx-auto p-4 md:p-6 lg:p-8 transition-all duration-500 ${selectedId ? 'max-w-[1290px]' : 'max-w-5xl'}`}>
                <div className="flex flex-col lg:flex-row gap-6 items-start mt-10">

                    {/* LEFT COLUMN: List View */}
                    <div className={`transition-all duration-500 w-full shrink-0 ${selectedId ? 'lg:w-[40%]' : 'lg:w-full'}`}>
                        <header className="mb-6 h-[60px] flex flex-col justify-center">
                            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">My Applications</h1>
                            <p className="text-sm text-slate-400 mt-1 font-medium">Track all your loan applications</p>
                        </header>

                        <div className="bg-[#f5efff] border border-purple-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
                            <Info className="text-purple-600 mt-0.5 shrink-0" size={18} />
                            <p className="text-[13px] text-purple-900 leading-snug">
                                <span className="font-semibold">Eligible loans available!</span> You have pre-approved loan offers. Eligibility data is held only for <span className="font-bold">7 days</span> — act before it expires.
                            </p>
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                                    <p className="text-sm text-slate-400">Loading applications...</p>
                                </div>
                            </div>
                        ) : applications.length === 0 ? (
                            <div className="text-center text-slate-400 py-16 text-sm">
                                No applications found.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {applications.map((app) => (
                                    <div
                                        key={app.id}
                                        onClick={() => setSelectedId(app.id)}
                                        className={`bg-white border rounded-2xl p-5 shadow-sm cursor-pointer transition-all duration-300 group ${selectedId === app.id
                                            ? 'border-purple-500 ring-1 ring-purple-500 bg-purple-50/10'
                                            : 'border-slate-100 hover:border-purple-200 hover:shadow-md'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex gap-4">
                                                <div className={`p-3 rounded-xl transition-colors duration-300 flex items-center justify-center shrink-0 ${app.iconBg} ${app.iconColor} group-hover:bg-purple-100 group-hover:text-purple-600`}>
                                                    <app.icon size={22} />
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <h2 className="font-bold text-[15px] text-slate-800 leading-tight">{app.type}</h2>
                                                    <p className="text-[11px] font-medium text-slate-400 mt-1">{app.id?.slice(-8)?.toUpperCase()} • {app.bank}</p>
                                                </div>
                                            </div>
                                            <StatusBadge status={app.status} />
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-5 border-t border-slate-50">
                                            {[
                                                { label: 'Amount', value: app.amount },
                                                { label: 'Tenure', value: app.tenure },
                                                { label: 'Approximated EMI', value: app.emi },
                                                { label: 'Applied', value: app.appliedDate },
                                            ].map((item, idx) => (
                                                <div key={idx} className="flex flex-col">
                                                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">{item.label}</span>
                                                    <span className="font-bold text-slate-800 text-[13px]">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Detail View */}
                    {selectedId && selectedApp && (
                        <div className="w-full lg:w-[60%] animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col">
                            <div className="h-[60px] mb-6 flex items-end justify-end px-2">
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all font-medium text-xs"
                                >
                                    <X size={16} /> Close Details
                                </button>
                            </div>

                            <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-xl shadow-slate-200/50 h-full relative">

                                {/* Detail Header */}
                                <div className="flex flex-col gap-1 mb-8">
                                    <div className="flex items-center gap-3 justify-between">
                                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{selectedApp.type}</h2>
                                        <StatusBadge status={selectedApp.status} />
                                    </div>
                                    <p className="text-sm font-medium text-slate-400">{selectedApp.appliedDate}</p>
                                </div>

                                <div className="space-y-6">

                                    {/* Borrower Details */}
                                    <section className="bg-gray-100 border border-slate-100/80 rounded-2xl p-5">
                                        <div className="flex items-center gap-2 mb-4">
                                            <User size={16} className="text-slate-400" />
                                            <h3 className="font-bold text-slate-600 text-[13px] uppercase tracking-wide">Borrower Details</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5">
                                            {[
                                                { label: 'Name', value: selectedApp.borrower.name },
                                                { label: 'Mobile', value: selectedApp.borrower.mobile },
                                                { label: 'City', value: selectedApp.borrower.city },
                                                { label: 'Income', value: selectedApp.borrower.income },
                                                { label: 'Employment', value: selectedApp.borrower.employment },
                                            ].map((item, idx) => (
                                                <div key={idx} className="flex items-center justify-between border-b border-slate-100/50 pb-2 last:border-0 last:pb-0">
                                                    <span className="text-[11px] font-medium text-slate-400">{item.label}</span>
                                                    <span className="text-[12px] font-bold text-slate-700">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Loan Details */}
                                    <section className="bg-gray-100 border border-slate-100/80 rounded-2xl p-5">
                                        <div className="flex items-center gap-2 mb-4">
                                            <FileText size={16} className="text-slate-400" />
                                            <h3 className="font-bold text-slate-600 text-[13px] uppercase tracking-wide">Loan Details</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5">
                                            {[
                                                { label: 'Amount', value: selectedApp.amount },
                                                { label: 'Tenure', value: selectedApp.tenure },
                                                { label: 'Lender', value: selectedApp.bank },
                                                { label: 'Interest Rate', value: selectedApp.interestRate },
                                                { label: 'EMI', value: selectedApp.emi },
                                            ].map((item, idx) => (
                                                <div key={idx} className="flex items-center justify-between border-b border-slate-100/50 pb-2 last:border-0 last:pb-0">
                                                    <span className="text-[11px] font-medium text-slate-400">{item.label}</span>
                                                    <span className="text-[12px] font-bold text-slate-700">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Eligibility & Risk */}
                                    <section className="bg-slate-50/50 border border-slate-100/80 rounded-2xl p-5">
                                        <div className="flex items-center gap-2 mb-5">
                                            <ShieldCheck size={16} className="text-slate-400" />
                                            <h3 className="font-bold text-slate-600 text-[13px] uppercase tracking-wide">Eligibility & Risk</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex justify-between mb-1.5">
                                                        <span className="text-[11px] font-bold text-slate-500">Eligibility Score</span>
                                                        <span className="text-[11px] font-bold text-slate-800">{selectedApp.eligibilityScore}/100</span>
                                                    </div>
                                                    <div className="w-full bg-slate-200/60 rounded-full h-2 overflow-hidden">
                                                        <div className="bg-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: `${selectedApp.eligibilityScore}%` }}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between mb-1.5">
                                                        <span className="text-[11px] font-bold text-slate-500">Risk Score</span>
                                                        <span className="text-[11px] font-bold text-slate-800">{selectedApp.riskScore}/100</span>
                                                    </div>
                                                    <div className="w-full bg-slate-200/60 rounded-full h-2 overflow-hidden">
                                                        <div className="bg-emerald-400 h-full rounded-full transition-all duration-700" style={{ width: `${selectedApp.riskScore}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Recommended Lenders</p>
                                                <div className="space-y-2.5">
                                                    {(selectedApp.recommendedLenders.length > 0
                                                        ? selectedApp.recommendedLenders
                                                        : ['—']
                                                    ).map((lender, i) => (
                                                        <div key={i} className="flex items-center justify-between border-b border-slate-100/50 pb-1.5 last:border-0 last:pb-0">
                                                            <p className="text-xs font-bold text-slate-700">{lender}</p>
                                                            <CheckCircle2 size={14} className="text-emerald-500" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Offer Details Table */}
                                        {selectedApp.allOffers.length > 0 && (
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">All Offers</p>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-[11px]">
                                                        <thead>
                                                            <tr className="border-b border-slate-100">
                                                                {['Bank', 'Rate', 'Max Amount', 'Approval %', 'Disbursal'].map(h => (
                                                                    <th key={h} className="text-left font-bold text-slate-400 pb-2 pr-4">{h}</th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {selectedApp.allOffers.map((offer, i) => (
                                                                <tr key={i} className="border-b border-slate-50 last:border-0">
                                                                    <td className="py-2 pr-4 font-bold text-slate-700">{offer.bankName}</td>
                                                                    <td className="py-2 pr-4 text-slate-600">{offer.interestRate}%</td>
                                                                    <td className="py-2 pr-4 text-slate-600">{formatINR(offer.maximumEligibleLoanAmount)}</td>
                                                                    <td className="py-2 pr-4">
                                                                        <span className="text-emerald-600 font-bold">{offer.approvalProbability?.toFixed(0)}%</span>
                                                                    </td>
                                                                    <td className="py-2 text-slate-600">
                                                                        {offer.disbursalTime?.from}–{offer.disbursalTime?.to} {offer.disbursalTime?.unit}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
                                    </section>

                                    {/* Application Timeline */}
                                    <section className="bg-slate-50/50 border border-slate-100/80 rounded-2xl p-6">
                                        <div className="flex items-center gap-2 mb-6">
                                            <History size={16} className="text-slate-400" />
                                            <h3 className="font-bold text-slate-600 text-[13px] uppercase tracking-wide">Application Timeline</h3>
                                        </div>

                                        <div className="space-y-6 relative">
                                            {selectedApp.timeline.map((item, idx) => (
                                                <div key={idx} className="flex gap-4 relative">
                                                    {idx !== selectedApp.timeline.length - 1 && (
                                                        <div className={`absolute left-[11px] top-6 w-[2px] h-[calc(100%+8px)] ${item.completed ? 'bg-emerald-100' : 'bg-slate-100'}`}></div>
                                                    )}
                                                    <div className="shrink-0 mt-0.5 z-10">
                                                        {item.completed ? (
                                                            <CheckCircle2 size={22} className="text-emerald-500 fill-white" />
                                                        ) : (
                                                            <div className="w-[22px] h-[22px] rounded-full border-2 border-slate-200 bg-white shadow-sm"></div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <p className={`text-[13px] font-bold ${item.completed ? 'text-slate-700' : 'text-slate-400'}`}>
                                                            {item.label}
                                                        </p>
                                                        <p className="text-[10px] font-medium text-slate-400 mt-0.5">{item.date}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}