import React, { useState } from 'react';
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

/**
 * Enhanced Loan application data including details for the side panel
 */
const applications = [
  {
    id: 'LN-20251201',
    type: 'Personal Loan',
    bank: 'HDFC Bank',
    amount: '₹5,00,000',
    tenure: '48 months',
    emi: '₹11,200/mo',
    appliedDate: '01 Dec 2025',
    status: 'Disbursed',
    icon: Briefcase,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    borrower: {
      name: 'Meka Sanjana',
      mobile: '9876543210',
      city: 'Mumbai',
      income: '₹75,000',
      employment: 'Salaried'
    },
    interestRate: '12.5% p.a.',
    eligibilityScore: 85,
    riskScore: 25,
    timeline: [
      { label: 'Lead created', date: '01 Dec 2025, 10:00 am', completed: true },
      { label: 'Application submitted', date: '02 Dec 2025, 02:30 pm', completed: true },
      { label: 'KYC completed', date: '03 Dec 2025, 11:00 am', completed: true },
      { label: 'Sent to Bank', date: '04 Dec 2025, 09:00 am', completed: true },
      { label: 'Sanctioned', date: '06 Dec 2025, 03:00 pm', completed: true },
      { label: 'Disbursed', date: '08 Dec 2025, 01:00 pm', completed: true }
    ]
  },
  {
    id: 'LN-20250915',
    type: 'Home Loan',
    bank: 'SBI',
    amount: '₹35,00,000',
    tenure: '240 months',
    emi: '₹32,500/mo',
    appliedDate: '15 Sep 2025',
    status: 'Active',
    icon: Home,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    borrower: {
      name: 'Arjun Mehta',
      mobile: '9988776655',
      city: 'Bangalore',
      income: '₹1,50,000',
      employment: 'Salaried'
    },
    interestRate: '8.5% p.a.',
    eligibilityScore: 92,
    riskScore: 15,
    timeline: [
      { label: 'Lead created', date: '15 Sep 2025, 11:00 am', completed: true },
      { label: 'Application submitted', date: '16 Sep 2025, 04:00 pm', completed: true },
      { label: 'KYC completed', date: '18 Sep 2025, 10:30 am', completed: true },
      { label: 'Sent to Bank', date: '20 Sep 2025, 02:00 pm', completed: true },
      { label: 'Under Verification', date: 'Processing', completed: false }
    ]
  },
  {
    id: 'LN-20250801',
    type: 'Car Loan',
    bank: 'ICICI Bank',
    amount: '₹8,00,000',
    tenure: '60 months',
    emi: '₹16,800/mo',
    appliedDate: '01 Aug 2025',
    status: 'Closed',
    icon: Car,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    borrower: {
      name: 'Rahul Varma',
      mobile: '9123456789',
      city: 'Delhi',
      income: '₹95,000',
      employment: 'Self-Employed'
    },
    interestRate: '9.2% p.a.',
    eligibilityScore: 78,
    riskScore: 35,
    timeline: [
      { label: 'Completed', date: 'Loan Repaid Fully', completed: true }
    ]
  },
  {
    id: 'LN-20251210',
    type: 'Education Loan',
    bank: 'Axis Bank',
    amount: '₹12,00,000',
    tenure: '84 months',
    emi: '₹18,500/mo',
    appliedDate: '10 Dec 2025',
    status: 'On Hold',
    icon: GraduationCap,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    borrower: {
      name: 'Sanya Iyer',
      mobile: '9888877777',
      city: 'Chennai',
      income: '₹60,000',
      employment: 'Salaried'
    },
    interestRate: '10.5% p.a.',
    eligibilityScore: 65,
    riskScore: 45,
    timeline: [
      { label: 'Lead created', date: '10 Dec 2025', completed: true },
      { label: 'Waiting for Documents', date: 'Action Required', completed: false }
    ]
  },
  {
    id: 'LN-20251105',
    type: 'Business Loan',
    bank: 'Kotak Bank',
    amount: '₹20,00,000',
    tenure: '36 months',
    emi: '₹65,000/mo',
    appliedDate: '05 Nov 2025',
    status: 'Cancelled',
    icon: Building2,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    borrower: {
      name: 'Vikram Singh',
      mobile: '9777766666',
      city: 'Pune',
      income: '₹2,50,000',
      employment: 'Business Owner'
    },
    interestRate: '15% p.a.',
    eligibilityScore: 50,
    riskScore: 70,
    timeline: [
      { label: 'Cancelled by User', date: '06 Nov 2025', completed: false }
    ]
  }
];

const StatusBadge = ({ status }) => {
  const styles = {
    'Disbursed': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', icon: <CheckCircle2 size={12} className="mr-1" /> },
    'Active': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', icon: <CheckCircle2 size={12} className="mr-1" /> },
    'Closed': { bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-200', icon: <MinusCircle size={12} className="mr-1" /> },
    'On Hold': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', icon: <Clock size={12} className="mr-1" /> },
    'Cancelled': { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', icon: <XCircle size={12} className="mr-1" /> }
  };
  const style = styles[status] || styles['Active'];
  return (
    <div className={`flex items-center self-start px-2.5 py-1 rounded-full text-[10px] font-semibold border ${style.bg} ${style.text} ${style.border}`}>
      {style.icon}
      {status}
    </div>
  );
};

export default function MyApplication() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedApp = applications.find(a => a.id === selectedId);

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleClose = () => {
    setSelectedId(null);
  };  

  return (
      
    <div className="min-h-screen bg-[#fcfaff] font-sans text-slate-900 transition-all duration-300">
      <div className={`mx-auto p-4 md:p-6 lg:p-8 transition-all duration-500 ${selectedId ? 'max-w-[1400px]' : 'max-w-5xl'}`}>
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

            <div className="space-y-4">
              {applications.map((app) => (
                <div 
                  key={app.id} 
                  onClick={() => handleSelect(app.id)}
                  className={`bg-white border rounded-2xl p-5 shadow-sm cursor-pointer transition-all duration-300 group ${
                    selectedId === app.id 
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
                        <p className="text-[11px] font-medium text-slate-400 mt-1">{app.id} • {app.bank}</p>
                      </div>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>

                  <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 pt-5 border-t border-slate-50`}>
                    {[
                      { label: 'Amount', value: app.amount },
                      { label: 'Tenure', value: app.tenure },
                      { label: 'EMI', value: app.emi },
                      { label: 'Applied', value: app.appliedDate }
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
          </div>

          {/* RIGHT COLUMN: Detail View */}
          {selectedId && (
            <div className="w-full lg:w-[60%] animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col">
              {/* Spacer to align header with left column header */}
              <div className="h-[60px] mb-6 flex items-end justify-end px-2">
                <button 
                  onClick={handleClose}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all font-medium text-xs"
                >
                  <X size={16} /> Close Details
                </button>
              </div>

              <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-xl shadow-slate-200/50 h-full relative">
                
                {/* Detail Header */}
                <div className="flex flex-col gap-1 mb-8">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{selectedApp.id}</h2>
                    <StatusBadge status={selectedApp.status} />
                  </div>
                  <p className="text-sm font-medium text-slate-400">{selectedApp.borrower.name} • {selectedApp.type}</p>
                </div>

                <div className="space-y-6">
                  
                  {/* Borrower Details Section */}
                  <section className="bg-slate-50/50 border border-slate-100/80 rounded-2xl p-5">
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
                        { label: 'Employment', value: selectedApp.borrower.employment }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between border-b border-slate-100/50 pb-2 last:border-0 last:pb-0">
                          <span className="text-[11px] font-medium text-slate-400">{item.label}</span>
                          <span className="text-[12px] font-bold text-slate-700">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Loan Details Section */}
                  <section className="bg-slate-50/50 border border-slate-100/80 rounded-2xl p-5">
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
                        { label: 'EMI', value: selectedApp.emi }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between border-b border-slate-100/50 pb-2 last:border-0 last:pb-0">
                          <span className="text-[11px] font-medium text-slate-400">{item.label}</span>
                          <span className="text-[12px] font-bold text-slate-700">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Eligibility & Risk Section */}
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
                          {['HDFC Bank', 'ICICI Bank', 'Axis Bank'].map((lender, i) => (
                            <div key={i} className="flex items-center justify-between border-b border-slate-100/50 pb-1.5 last:border-0 last:pb-0">
                              <p className="text-xs font-bold text-slate-700">{lender}</p>
                              <CheckCircle2 size={14} className="text-emerald-500" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Application Timeline Section */}
                  <section className="bg-slate-50/50 border border-slate-100/80 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <History size={16} className="text-slate-400" />
                      <h3 className="font-bold text-slate-600 text-[13px] uppercase tracking-wide">Application Timeline</h3>
                    </div>

                    <div className="space-y-6 relative">
                      {selectedApp.timeline.map((item, idx) => (
                        <div key={idx} className="flex gap-4 relative">
                          {/* Connecting Line */}
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