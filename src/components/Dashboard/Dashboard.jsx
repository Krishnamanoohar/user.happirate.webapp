/* ================= ICONS ================= */

const Icons = {
  CreditCard: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  ),
  TrendingUp: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  AlertCircle: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  ),
  CheckCircle: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Clock: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Shield: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  ChevronRight: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  Activity: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  Home: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  DollarSign: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  PieChart: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  ),
  Bell: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  Menu: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  ),
  X: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  Calendar: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  ),
  Info: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
  Sparkles: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M9 3v4" />
      <path d="M3 5h4" />
      <path d="M3 9h4" />
    </svg>
  ),
  Send: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="11" y1="2" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  FileText: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  ),
  Mail: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Share2: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  ),
  Download: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  ),
};

const Icon = ({ name, className }) => {
  const IconComponent = Icons[name];
  return IconComponent ? (
    <div className={className}>
      <IconComponent />
    </div>
  ) : null;
};

/* ================= STATIC DATA ================= */

/* ================= COMPONENTS ================= */

/* ================= MAIN DASHBOARD ================= */
import React, { useState, useEffect, useRef } from "react";
import { Slider } from "@radix-ui/react-slider";

export default function OneScoreDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedFactor, setSelectedFactor] = useState(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const tabs = ["Dashboard", "Accounts", "Reports", "Offers"];

  // Mock API response data - You should replace this with your actual data
  const apiResponse = {
    customer: {
      name: "Arun Baikani",
      score: 737,
      lastUpdated: "26 Jan 2026",
      nextUpdate: "26 Feb 2026",
    },
    factors: {
      paymentHistory: {
        status: "Excellent",
        percentage: 100,
        impact: "High",
        color: "text-[#4338ca]",
      },
      creditUtilization: {
        status: "Poor",
        percentage: 97,
        impact: "High",
        color: "text-red-600",
      },
      creditAge: {
        status: "Good",
        age: "5 Yrs 6 Mos",
        impact: "Medium",
        color: "text-[#4338ca]",
      },
      totalAccounts: {
        status: "Good",
        count: 6,
        impact: "Low",
        color: "text-[#4338ca]",
      },
      inquiries: {
        status: "Fair",
        count: 18,
        impact: "Medium",
        color: "text-orange-500",
      },
    },
    accounts: [
      {
        id: 1,
        bank: "AXIS BANK",
        type: "Credit Card",
        accountNumber: "...8676",
        balance: 38095,
        limit: 39000,
        status: "Active",
        dateOpened: "09 Dec 2025",
        lastPaymentDate: "01 Jan 2026",
        iconName: "CreditCard",
        alert: "High Utilization (97%)",
        paymentHistory: [0, 0, 0, 0, 0, 0],
        isLoan: false,
      },
      {
        id: 2,
        bank: "APTUS",
        type: "Housing Loan",
        accountNumber: "...9677",
        balance: 737712,
        limit: 1052305,
        roi: "17.00%",
        emi: "₹18,289",
        tenure: "120 Months",
        dateOpened: "31 Dec 2020",
        lastPaymentDate: "10 Jan 2026",
        status: "Active",
        iconName: "Home",
        alert: "High Interest Rate",
        paymentHistory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "XXX", 0],
        isLoan: true,
      },
      {
        id: 3,
        bank: "HDFC BANK",
        type: "Personal Loan",
        accountNumber: "...3075",
        balance: 469495,
        limit: 575000,
        roi: "11.5%",
        emi: "₹12,756",
        dateOpened: "13 Nov 2024",
        lastPaymentDate: "07 Jan 2026",
        status: "Active",
        iconName: "DollarSign",
        paymentHistory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        isLoan: true,
      },
      {
        id: 4,
        bank: "TGB",
        type: "Consumer Loan",
        accountNumber: "...1192",
        balance: 89975,
        limit: 90000,
        status: "Active",
        roi: "7.00%",
        emi: "₹2,500",
        dateOpened: "10 Jun 2020",
        lastPaymentDate: "14 Nov 2025",
        iconName: "Activity",
        paymentHistory: [
          "STD",
          "STD",
          "STD",
          "STD",
          "STD",
          "STD",
          "STD",
          "XXX",
          "STD",
          "STD",
          "STD",
          "STD",
        ],
        isLoan: true,
      },
    ],
    offers: [
      {
        id: 1,
        title: "Reduce your Home Loan EMI",
        description:
          "Transfer your Aptus loan (17%) to HDFC at 8.75%. Save ₹2.5 Lakhs.",
        action: "Check Eligibility",
        tag: "High Savings",
        color: "bg-white border border-blue-100",
      },
      {
        id: 2,
        title: "Credit Card Upgrade",
        description:
          "Your Axis card utilization is high. Get a OneCard with ₹2L limit.",
        action: "Apply Now",
        tag: "Score Booster",
        color: "bg-white border border-blue-100",
      },
    ],
  };
  const ScoreGauge = ({ score }) => {
    const radius = 80;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset =
      circumference - ((score - 300) / 600) * circumference;
    let scoreColor = "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]";
    if (score < 650) scoreColor = "text-red-300";

    return (
      <div className="relative flex flex-col items-center justify-center p-6 bg-[#172554] rounded-3xl shadow-xl hover:shadow-2xl transition-all">
        <div className="relative">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-90"
          >
            <circle
              stroke="#FFFFFF"
              strokeWidth={stroke}
              strokeOpacity="0.1"
              fill="transparent"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              strokeLinecap="round"
            />
            <circle
              stroke="currentColor"
              strokeWidth={stroke}
              strokeDasharray={circumference + " " + circumference}
              style={{
                strokeDashoffset,
                transition: "stroke-dashoffset 1s ease-in-out",
              }}
              className={`${scoreColor}`}
              fill="transparent"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white drop-shadow-md">
              {score}
            </span>
            <span className="text-xs text-indigo-100 uppercase tracking-wider mt-1">
              CIBIL Score
            </span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-indigo-100 text-sm">
            Last updated: {apiResponse.customer.lastUpdated}
          </p>
          <div className="flex items-center justify-center mt-2 space-x-2">
            <div className="px-2 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20 flex items-center shadow-sm">
              <span className="mr-1">
                <Icon name="TrendingUp" className="w-3 h-3" />
              </span>{" "}
              Top 25% of borrowers
            </div>
          </div>
        </div>
      </div>
    );
  };
  const OfferCard = ({ offer }) => (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 mb-4 ${offer.color} shadow-sm transform transition hover:scale-[1.01]`}
    >
      <div className="absolute top-0 right-0 p-3 opacity-[0.05] pointer-events-none">
        <Icon name="DollarSign" className="w-24 h-24 text-blue-900" />
      </div>
      <div className="relative z-10">
        <div className="inline-block px-2 py-1 bg-blue-100 rounded text-xs font-bold text-blue-700 mb-2 border border-blue-200">
          {offer.tag}
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">{offer.title}</h3>
        <p className="text-slate-600 text-sm mb-4 max-w-[80%]">
          {offer.description}
        </p>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-slate-800 transition-colors shadow-md">
          {offer.action}
        </button>
      </div>
    </div>
  );

  const FactorCard = ({ title, status, value, color, iconName, onClick }) => (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-center space-x-3">
        <div
          className={`p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors text-blue-700`}
        >
          <Icon name={iconName} className="w-5 h-5" />
        </div>
        <div>
          <p className="text-slate-500 text-xs uppercase tracking-wide">
            {title}
          </p>
          <p
            className={`font-semibold text-sm ${color.includes("#") ? `text-[${color}]` : color}`}
          >
            {status}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-slate-900 font-bold">{value}</p>
        <div className="ml-auto mt-1">
          <Icon name="ChevronRight" className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  );

  const AccountItem = ({ account, onClick }) => {
    const utilization = account.limit
      ? Math.min((account.balance / account.limit) * 100, 100)
      : 0;
    const isHighUtil = utilization > 50;

    return (
      <div
        onClick={() => onClick(account)}
        className="group relative overflow-hidden bg-white border border-blue-100 rounded-2xl p-5 mb-4 cursor-pointer transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-50 rounded-full blur-3xl group-hover:bg-blue-100 transition-all duration-500"></div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <div
              className={`p-3.5 rounded-2xl bg-slate-50 border border-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-300`}
            >
              <Icon name={account.iconName} className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 tracking-wide">
                {account.bank}
              </h4>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {account.type}
                </span>
                <span className="text-xs text-slate-400 tracking-wider font-mono">
                  •••• {account.accountNumber.slice(-4)}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">
                Current Balance
              </span>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                ₹{account.balance.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 relative z-10">
          <div className="flex items-center space-x-3">
            {account.alert ? (
              <div
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full border ${account.alert.includes("Interest") || isHighUtil ? "bg-red-50 border-red-200 text-red-600" : "bg-yellow-50 border-yellow-200 text-yellow-600"}`}
              >
                <Icon name="AlertCircle" className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">{account.alert}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-600">
                <Icon name="CheckCircle" className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Healthy Account</span>
              </div>
            )}
            {account.roi && (
              <div className="hidden sm:block px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
                <span className="text-xs font-medium">{account.roi} ROI</span>
              </div>
            )}
          </div>
          <div className="text-right pl-4">
            {account.limit && !account.isLoan ? (
              <div className="flex flex-col items-end w-32">
                <div className="flex justify-between w-full text-[10px] text-slate-500 mb-1.5 font-medium">
                  <span>Limit Used</span>
                  <span
                    className={isHighUtil ? "text-red-500" : "text-green-600"}
                  >
                    {Math.round(utilization)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${isHighUtil ? "bg-red-500" : "bg-blue-600"}`}
                    style={{ width: `${utilization}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="text-[10px] uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                Active Loan
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const AccountDetailView = ({ account, onBack }) => {
    console.log("AccountDetailView received account:", account); // Debug log

    if (!account) {
      return (
        <div className="animate-fade-in-up">
          <div className="flex items-center space-x-3 mb-6">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200"
            >
              <Icon name="ArrowLeft" className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">
              No Account Selected
            </h1>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
            <Icon
              name="AlertCircle"
              className="w-12 h-12 text-slate-400 mx-auto mb-4"
            />
            <p className="text-slate-600">
              No account data available. Please go back and select an account.
            </p>
          </div>
        </div>
      );
    }

    const utilization = Math.min((account.balance / account.limit) * 100, 100);
    const progressColor =
      utilization > 90
        ? "bg-red-500"
        : utilization > 50
          ? "bg-yellow-500"
          : "bg-green-500";
    const progressTextColor =
      utilization > 90
        ? "text-red-600"
        : utilization > 50
          ? "text-yellow-600"
          : "text-green-600";
    const progressBgColor =
      utilization > 90
        ? "bg-red-50"
        : utilization > 50
          ? "bg-yellow-50"
          : "bg-green-50";

    return (
      <div className="animate-fade-in-up">
        <div className="flex items-center space-x-3 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200"
          >
            <Icon name="ArrowLeft" className="w-5 h-5 text-slate-600" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">
            {account.bank} Details
          </h1>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-slate-500 text-sm mb-1">{account.type}</p>
              <h2 className="text-3xl font-bold text-slate-900">
                ₹{account.balance.toLocaleString()}
              </h2>
              <p className="text-xs text-slate-500 mt-1">Current Balance</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-blue-600">
              <Icon name={account.iconName} className="w-6 h-6" />
            </div>
          </div>

          {/* Radix UI Slider Style Utilization Bar */}
          <div className="mb-2">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="text-sm text-slate-600">
                  {account.isLoan ? "Principal Repaid" : "Credit Utilization"}
                </span>
              </div>
              <span className={`text-sm font-semibold ${progressTextColor}`}>
                {Math.round(utilization)}%
              </span>
            </div>

            {/* Slider Track */}
            <div className="relative">
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${progressColor} rounded-full transition-all duration-500`}
                  style={{ width: `${utilization}%` }}
                ></div>
              </div>

              {/* Slider Thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-slate-300 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
                style={{ left: `calc(${utilization}% - 10px)` }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${progressColor}`}
                  ></div>
                </div>
              </div>
            </div>

            {/* Slider Labels */}
            <div className="flex justify-between mt-3">
              <div className="text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <span>₹0</span>
                </div>
              </div>
              <div className="text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <span>Limit: ₹{account.limit.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Utilization Status Indicator */}
            <div
              className={`mt-4 px-3 py-2 rounded-lg ${progressBgColor} border ${progressTextColor.replace("text", "border")} border-opacity-30`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${progressColor}`}
                  ></div>
                  <span className={`text-xs font-medium ${progressTextColor}`}>
                    {utilization > 90
                      ? "Critical"
                      : utilization > 50
                        ? "Moderate"
                        : "Good"}
                  </span>
                </div>
                <span className="text-xs text-slate-600">
                  {utilization > 90
                    ? "Above 90%"
                    : utilization > 50
                      ? "50-90%"
                      : "Below 50%"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-xs mb-1">Interest Rate</p>
            <p className="text-slate-900 font-semibold">
              {account.roi || "N/A"}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-xs mb-1">Monthly EMI</p>
            <p className="text-slate-900 font-semibold">
              {account.emi || "N/A"}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-xs mb-1">Date Opened</p>
            <div className="flex items-center text-slate-900 font-semibold text-sm">
              <span className="mr-1.5">
                <Icon name="Calendar" className="w-3 h-3 text-blue-600" />
              </span>
              {account.dateOpened}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-xs mb-1">Last Payment</p>
            <div className="flex items-center text-slate-900 font-semibold text-sm">
              <span className="mr-1.5">
                <Icon name="Clock" className="w-3 h-3 text-blue-600" />
              </span>
              {account.lastPaymentDate}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900 font-semibold text-sm">
              Payment History
            </h3>
            <span className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200">
              Recent 12 Months
            </span>
          </div>
          <div className="flex justify-between items-center px-1">
            {account.paymentHistory &&
              account.paymentHistory.map((status, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center group relative"
                >
                  <div
                    className={`w-3 h-3 rounded-full mb-2 ${
                      status === 0 || status === "STD"
                        ? "bg-green-500"
                        : status === "XXX"
                          ? "bg-slate-300"
                          : "bg-red-500"
                    }`}
                  ></div>
                  <div className="absolute -top-8 bg-slate-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                    {status === 0 || status === "STD"
                      ? "On Time"
                      : status === "XXX"
                        ? "Unknown"
                        : "Delayed"}
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-3 flex justify-between text-[10px] text-slate-400 uppercase tracking-widest">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>

        {account.alert && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start space-x-3">
            <Icon
              name="Info"
              className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
            />
            <div>
              <h4 className="text-red-800 font-medium text-sm">
                Attention Needed
              </h4>
              <p className="text-red-600 text-xs mt-1">
                This account has {account.alert.toLowerCase()}.{" "}
                {account.isLoan
                  ? "Consider a balance transfer."
                  : "Try to keep utilization below 30%."}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const FinancialAssistant = ({ onClose }) => (
    <div className="fixed right-0 top-0 w-full md:w-[360px] h-full bg-white shadow-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">FinAI Assistant</h3>
        <button onClick={onClose}>
          <Icon name="X" />
        </button>
      </div>
      <p className="text-sm text-slate-600">
        Pay down your Axis Bank credit card to reduce 97% utilization.
      </p>
    </div>
  );

  const handlePrint = () => window.print();

  const handleWhatsApp = () => {
    alert(
      "Report Sent to WhatsApp! 📱\n\n(In a real app, this would trigger a backend API to send the PDF via WhatsApp Business API)",
    );
  };

  const handleGmail = () => {
    alert(
      "Report Sent to Gmail! 📧\n\n(In a real app, this would trigger an email service like SendGrid)",
    );
  };

  const handleDownload = () => {
    setIsDownloading(true);
    const element = document.getElementById("report-content");

    if (typeof html2pdf !== "undefined") {
      const opt = {
        margin: [0.5, 0.5],
        filename: `Happirate_Report_${apiResponse.customer.name.replace(/\s+/g, "_")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => setIsDownloading(false))
        .catch((err) => {
          console.error("PDF Gen Error:", err);
          setIsDownloading(false);
          window.print();
        });
    } else {
      window.print();
      setIsDownloading(false);
    }
  };
  const FactorDetailView = ({ factorKey, data, onBack }) => {
    const factorContent = {
      paymentHistory: {
        title: "Payment History",
        desc: "Payment history accounts for 35% of your credit score. It shows whether you've made your past credit payments on time.",
        tip: "Always pay at least the minimum amount due on time to keep this factor green.",
        iconName: "CheckCircle",
      },
      creditUtilization: {
        title: "Credit Utilization",
        desc: "This accounts for 30% of your score. It is the ratio of your outstanding credit card balances to your total credit card limits.",
        tip: "A utilization ratio above 30% signals high risk to lenders. Try to pay down balances.",
        iconName: "PieChart",
      },
      creditAge: {
        title: "Age of Accounts",
        desc: "This accounts for 15% of your score. It averages the age of your open credit accounts.",
        tip: "Avoid closing old credit cards, as they help increase your average credit age.",
        iconName: "Clock",
      },
      totalAccounts: {
        title: "Total Accounts",
        desc: "This makes up 10% of your score. It looks at the total number of open and closed accounts.",
        tip: "A healthy mix of secured (loans) and unsecured (cards) credit is beneficial.",
        iconName: "CreditCard",
      },
      inquiries: {
        title: "Hard Inquiries",
        desc: "This accounts for 10% of your score. Hard inquiries occur when a lender checks your credit for a new application.",
        tip: "Limit new credit applications. Multiple inquiries in a short time can lower your score.",
        iconName: "Activity",
      },
    };

    const content = factorContent[factorKey];
    const displayValue = data.percentage
      ? `${data.percentage}%`
      : data.age || data.count;

    return (
      <div className="animate-fade-in-up">
        <div className="flex items-center space-x-3 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200"
          >
            <Icon name="ArrowLeft" className="w-5 h-5 text-slate-600" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">{content.title}</h1>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg mb-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-500 text-sm mb-1">Status</p>
              <h2
                className={`text-3xl font-bold ${data.color.replace("text-", "text-")}`
                  .replace("text-[", "text-[")
                  .replace("]", "]")}
              >
                {data.status}
              </h2>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-blue-600">
              <Icon name={content.iconName} className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-6">
            <p className="text-slate-900 font-semibold text-lg">
              {displayValue}
            </p>
            <p className="text-slate-500 text-xs mt-1">Current Value</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
          <h3 className="font-bold text-slate-900 mb-2">
            What does this mean?
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {content.desc}
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
          <Icon
            name="Sparkles"
            className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
          />
          <div>
            <h4 className="font-bold text-blue-900 text-sm">Pro Tip</h4>
            <p className="text-blue-700 text-xs mt-1">{content.tip}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#EFF6FF]">
      {/* Tabs */}
      <div className="relative mt-20 flex justify-center ">
        {/* Tabs container */}
        <div className="relative w-fit">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedAccount(null);
                }}
                className={`relative px-6 py-3 text-sm font-semibold transition-colors
            ${
              activeTab === tab
                ? "text-purple-600"
                : "text-gray-600 hover:text-purple-500"
            }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Active Indicator */}
          <span
            className="absolute bottom-0 h-[3px] bg-purple-600 rounded-full transition-all duration-300"
            style={{
              width: `${100 / tabs.length}%`,
              left: `${(100 / tabs.length) * tabs.indexOf(activeTab)}%`,
            }}
          />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 relative z-10 mt-20">
        {activeTab === "Dashboard" && !selectedAccount && !selectedFactor && (
          <div className="animate-fade-in-up">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900">
                Hello, {apiResponse.customer.name}
              </h1>
              <p className="text-slate-500">
                Here is your financial health overview.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <ScoreGauge score={apiResponse.customer.score} />
              <div className="flex flex-col space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all">
                  <h3 className="text-slate-900 font-semibold mb-3 flex items-center">
                    <span className="mr-2 text-red-500">
                      <Icon name="AlertCircle" className="w-4 h-4" />
                    </span>{" "}
                    Action Required
                  </h3>
                  <p className="text-slate-600 text-sm mb-3">
                    Your credit utilization on <b>Axis Bank Credit Card</b> is{" "}
                    <b>97%</b>. High utilization negatively impacts your score.
                  </p>
                  <button className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center">
                    View Tips to improve{" "}
                    <span className="ml-1">
                      <Icon name="ChevronRight" className="w-4 h-4" />
                    </span>
                  </button>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all">
                  <h3 className="text-slate-900 font-semibold mb-3 flex items-center">
                    <span className="mr-2 text-green-500">
                      <Icon name="TrendingUp" className="w-4 h-4" />
                    </span>{" "}
                    Score Simulation
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Paying off <b>₹15,000</b> on your credit card could boost
                    your score by <b>+22 points</b>.
                  </p>
                </div>
              </div>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Score Factors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <FactorCard
                title="Payment History"
                status={apiResponse.factors.paymentHistory.status}
                value={`${apiResponse.factors.paymentHistory.percentage}%`}
                color={apiResponse.factors.paymentHistory.color}
                iconName="CheckCircle"
                onClick={() => setSelectedFactor("paymentHistory")}
              />
              <FactorCard
                title="Credit Utilization"
                status={apiResponse.factors.creditUtilization.status}
                value={`${apiResponse.factors.creditUtilization.percentage}%`}
                color={apiResponse.factors.creditUtilization.color}
                iconName="PieChart"
                onClick={() => setSelectedFactor("creditUtilization")}
              />
              <FactorCard
                title="Age of Accounts"
                status={apiResponse.factors.creditAge.status}
                value={apiResponse.factors.creditAge.age}
                color={apiResponse.factors.creditAge.color}
                iconName="Clock"
                onClick={() => setSelectedFactor("creditAge")}
              />
              <FactorCard
                title="Total Accounts"
                status={apiResponse.factors.totalAccounts.status}
                value={apiResponse.factors.totalAccounts.count}
                color={apiResponse.factors.totalAccounts.color}
                iconName="CreditCard"
                onClick={() => setSelectedFactor("totalAccounts")}
              />
              <FactorCard
                title="Hard Inquiries"
                status={apiResponse.factors.inquiries.status}
                value={apiResponse.factors.inquiries.count}
                color={apiResponse.factors.inquiries.color}
                iconName="Activity"
                onClick={() => setSelectedFactor("inquiries")}
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Recommended for You
              </h2>
              <button
                onClick={() => activeTab("offers")}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                See all
              </button>
            </div>
            <div>
              {apiResponse.offers.slice(0, 1).map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        )}

        {selectedFactor && (
          <FactorDetailView
            factorKey={selectedFactor}
            data={apiResponse.factors[selectedFactor]}
            onBack={() => setSelectedFactor(null)}
          />
        )}
      </main>
      {/* Accounts List */}
      {activeTab === "Accounts" && !selectedAccount && (
        <div className="space-y-4">
          {apiResponse.accounts.map((acc) => (
            <AccountItem
              key={acc.id}
              account={acc}
              onClick={setSelectedAccount}
            />
          ))}
        </div>
      )}
      {/* Account Detail View */}
      {selectedAccount && (
        <AccountDetailView
          account={selectedAccount}
          onBack={() => setSelectedAccount(null)}
        />
      )}
      {/* Reports */}
      {activeTab === "Reports" && (
        <div className="animate-fade-in-up max-w-4xl mx-auto=">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 no-print">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Professional Credit Report
              </h1>
              <p className="text-slate-500">
                Comprehensive financial analysis for {apiResponse.customer.name}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                <Icon name="Share2" className="w-4 h-4" /> WhatsApp
              </button>

              <button
                onClick={handleGmail}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                <Icon name="Mail" className="w-4 h-4" /> Gmail
              </button>

              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-70 disabled:cursor-wait"
              >
                <Icon name="Download" className="w-4 h-4" />
                {isDownloading ? "Downloading..." : "PDF"}
              </button>
            </div>
          </div>

          {/* FULL REPORT CONTENT */}
          <div
            id="report-content"
            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 print-container relative overflow-hidden"
          >
            {/* Watermark Layer */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
              <img
                src="./WhatsApp%20Image%202026-01-02%20at%2018.54.30.jpg"
                alt=""
                className="w-96 h-96 object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>

            {/* Report Content - z-10 ensures it sits above watermark */}
            <div className="relative z-10">
              {/* Report Header */}
              <div className="border-b border-slate-200 pb-6 mb-6 flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <img
                      src="./WhatsApp%20Image%202026-01-02%20at%2018.54.30.jpg"
                      alt="Happirate Logo"
                      className="h-8 w-auto object-contain"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/100x40/transparent/3C539C?text=Happirate";
                      }}
                    />
                    Happirate
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    Generated on: {new Date().toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900">
                    {apiResponse.customer.name}
                  </div>
                  <div className="text-sm text-slate-500">
                    ID: #USER-8923-AB
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-slate-900 mb-4 border-l-4 border-blue-600 pl-3">
                  Executive Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-sm text-slate-500 mb-1">
                      CIBIL Score
                    </div>
                    <div className="text-3xl font-bold text-blue-600">
                      {apiResponse.customer.score}
                    </div>
                    <div className="text-xs text-green-600 font-medium mt-1">
                      Top 25% of borrowers
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-sm text-slate-500 mb-1">
                      Total Debt
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹12.45L
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Across 4 active accounts
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-sm text-slate-500 mb-1">
                      Credit Health
                    </div>
                    <div className="text-3xl font-bold text-orange-500">
                      Fair
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Needs attention on utilization
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Insights */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-slate-900 mb-4 border-l-4 border-blue-600 pl-3">
                  Credit Factors Analysis
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                    <Icon
                      name="AlertCircle"
                      className="w-5 h-5 text-red-600 mt-0.5"
                    />
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        High Credit Utilization (Critical)
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Your Axis Bank Credit Card utilization is at{" "}
                        <span className="font-bold text-red-600">97%</span>{" "}
                        (₹38,095 / ₹39,000). This is the primary factor
                        suppressing your score. Recommended utilization is below
                        30%.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                    <Icon
                      name="CheckCircle"
                      className="w-5 h-5 text-green-600 mt-0.5"
                    />
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Excellent Payment History
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        You have a{" "}
                        <span className="font-bold text-green-600">100%</span>{" "}
                        on-time payment record across all active loans and
                        credit cards. This is a strong foundation for future
                        credit approvals.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <Icon
                      name="Info"
                      className="w-5 h-5 text-blue-600 mt-0.5"
                    />
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Loan Portfolio Mix
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        You have a healthy mix of secured (Housing Loan) and
                        unsecured (Personal Loan, Credit Card) credit. However,
                        the interest rate on your Aptus Housing Loan (
                        <span className="font-bold">17%</span>) is significantly
                        above market average.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Plan */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-slate-900 mb-4 border-l-4 border-blue-600 pl-3">
                  Recommended Action Plan
                </h2>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-2">
                  <li>
                    <strong>Immediate:</strong> Pay down at least ₹25,000 on
                    your Axis Bank credit card to reduce utilization below 30%.
                  </li>
                  <li>
                    <strong>Short Term:</strong> Apply for a Housing Loan
                    Balance Transfer. Switching to a bank like HDFC or SBI could
                    lower your rate from 17% to ~8.50%.
                  </li>
                  <li>
                    <strong>Monitoring:</strong> Avoid new credit inquiries for
                    the next 3 months to let your score recover.
                  </li>
                </ul>
              </div>

              {/* Footer */}
              <div className="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
                <p>
                  This report is generated by Happirate Financial Services. Data
                  is based on the latest CIBIL fetch.
                </p>
                <p className="mt-1">Confidential • For Personal Use Only</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "Offers" && !selectedAccount && (
        <div className="animate-fade-in-up">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              Curated Offers
            </h1>
            <p className="text-slate-500">
              Personalized financial products based on your credit profile.
            </p>
          </div>
          <div className="grid gap-6">
            {apiResponse.offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
            <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Pre-Approved Personal Loan
                </h3>
                <p className="text-slate-500 text-sm">
                  Unlock up to ₹5 Lakhs instantly at 10.99%.
                </p>
              </div>
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      )}
      {/* AI Button */}
      {!isAiOpen && (
        <button
          onClick={() => setIsAiOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg"
        >
          <Icon name="Sparkles" />
        </button>
      )}
      {isAiOpen && <FinancialAssistant onClose={() => setIsAiOpen(false)} />}
    </div>
  );
}
