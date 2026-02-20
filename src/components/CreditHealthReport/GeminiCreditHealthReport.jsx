import React, { useState, useMemo, useEffect, useRef } from "react";
import { Lock, LogIn } from "lucide-react";
import {
  User,
  CreditCard,
  Search,
  FileText,
  Phone,
  MapPin,
  Mail,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Activity,
  Upload,
  Calendar,
  Banknote,
  Briefcase,
  Filter,
  Info,
  TrendingUp,
  PieChart,
  Clock,
  DollarSign,
  Home,
  Truck,
  GraduationCap,
  Landmark,
  Tractor,
  AlertCircle,
  CheckCircle,
  XCircle,
  Lightbulb,
  MessageSquare,
  Send,
  X,
  Bot,
  Sliders,
  LayoutDashboard,
  ArrowRight,
  Sparkles,
  Copy,
  Target,
  RefreshCw,
  Gift,
  Zap,
  ChevronRight,
} from "lucide-react";
import { fetchChatResponse, fetchRawResponseOfUser } from "@/api/api";
import axios from "axios";
import DashboardLoader from "./CreditHealthLoader";

// --- Global API Helper ---
const callGeminiAPI = async (contextData, prompt) => {
  try {
    const response = await fetchChatResponse(contextData, prompt);
    console.log("response fo the chat", response);
    // const data = await response.json();
    return response;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

// --- Utility Functions for Polymorphic Data ---
const normalizeArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return [data];
};

const extractPartitionData = (partition, keyName) => {
  if (!partition) return [];
  if (Array.isArray(partition)) {
    return partition
      .map((item) => {
        const inner = item[keyName];
        if (!inner) return null;
        return { ...item, ...inner };
      })
      .filter(Boolean);
  }
  if (typeof partition === "object" && partition[keyName]) {
    return normalizeArray(partition[keyName]);
  }
  return [];
};

const parseDate = (dateString) => {
  if (!dateString) return null;
  let day, month, year;

  if (dateString.includes("-")) {
    const parts = dateString.split("-");
    if (parts[0].length === 4) {
      return new Date(dateString);
    }
    [day, month, year] = parts;
  } else if (dateString.length === 8) {
    day = dateString.slice(0, 2);
    month = dateString.slice(2, 4);
    year = dateString.slice(4);
  } else {
    return new Date(dateString);
  }

  return new Date(`${year}-${month}-${day}`);
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = parseDate(dateString);
  if (!date || isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatMonthYear = (dateString) => {
  if (!dateString) return "Unknown Date";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return dateString;
  }
};

const getStatusDescription = (status) => {
  const s = String(status).toUpperCase();
  if (s === "0" || s === "000" || s === "STD") return "Paid on Time";
  if (s === "XXX") return "Not Reported";
  if (s === "SUB") return "Sub-Standard (Risk)";
  if (s === "DBT") return "Doubtful";
  if (s === "LSS") return "Loss";
  if (s === "SMA") return "Special Mention Account";
  if (!isNaN(parseInt(s))) return `Overdue by ${s} Days`;
  return "Unknown Status";
};

const getAccountType = (code, description) => {
  if (
    description &&
    description.length > 0 &&
    description.toLowerCase() !== "null" &&
    description.toLowerCase() !== "undefined"
  ) {
    return description;
  }

  const types = {
    "00": "Other",
    "01": "Auto Loan (Personal)",
    "02": "Housing Loan",
    "03": "Property Loan",
    "04": "Loan Against Shares",
    "05": "Personal Loan",
    "06": "Consumer Loan",
    "07": "Gold Loan",
    "08": "Education Loan",
    "09": "Loan to Professional",
    10: "Credit Card",
    11: "Lease",
    12: "Overdraft",
    13: "Two-wheeler Loan",
    14: "Non-Funded Credit Facility",
    15: "Loan Against Bank Deposits",
    16: "Fleet Card",
    17: "Commercial Vehicle Loan",
    31: "Secured Credit Card",
    32: "Used Car Loan",
    33: "Construction Equipment Loan",
    34: "Tractor Loan",
    35: "Corporate Credit Card",
    36: "Kisan Credit Card",
    37: "Loan on Credit Card",
    38: "PMAY - Affordable Housing",
    39: "MUDRA Loan",
    40: "Microfinance - Business",
    41: "Microfinance - Personal",
    42: "Microfinance - Housing",
    43: "Microfinance - Other",
    44: "PMJDY Overdraft",
    50: "Business Loan - General",
    51: "Business Loan - General",
    52: "Business Loan - Priority Sector (Agri)",
    53: "Business Loan - Priority Sector (Others)",
    54: "Business Loan - Small Business",
    55: "Business Loan - Secured",
    56: "Business Loan - Unsecured",
    57: "Business Loan - Term Loan",
    58: "Business Non-Funded",
    59: "Business Loan Against Bank Deposits",
    61: "Business Loan - Unsecured",
    69: "Business Loan - Other / MFI",
  };

  if (code && types[code]) return types[code];
  if (code) return `Loan Type ${code}`;
  return "General Loan";
};

const getAccountIcon = (code) => {
  const num = parseInt(code);
  if (num === 2 || num === 3 || num === 38) return <Home size={20} />;
  if (num === 1 || num === 13 || num === 32 || num === 17)
    return <Truck size={20} />;
  if (num === 8) return <GraduationCap size={20} />;
  if (num === 10 || num === 31 || num === 35 || num === 16)
    return <CreditCard size={20} />;
  if (num === 7) return <Landmark size={20} />;
  if (num === 34 || num === 36 || num === 52) return <Tractor size={20} />;
  if (num >= 50 && num <= 69) return <Briefcase size={20} />;
  return <Banknote size={20} />;
};

const getLoanCategory = (code) => {
  const unsecuredCodes = ["05", "06", "08", "09", "10", "12", "61"];
  if (unsecuredCodes.includes(code)) return "Unsecured";
  return "Secured";
};

// --- Components ---

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const Badge = ({ children, type = "neutral" }) => {
  const styles = {
    success: "bg-emerald-100 text-emerald-800",
    danger: "bg-rose-100 text-rose-800",
    warning: "bg-amber-100 text-amber-800",
    neutral: "bg-gray-300 text-slate-900 font-semibold",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
  };
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[type] || styles.neutral}`}
    >
      {children}
    </span>
  );
};

const ProgressBar = ({ value, max, colorClass = "bg-blue-600" }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="w-full bg-slate-200 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full ${colorClass}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const ScoreGauge = ({ score }) => {
  const numericScore = parseInt(score, 10);
  let color = "text-rose-500";
  let label = "Poor";

  if (isNaN(numericScore)) {
    color = "text-slate-400";
    label = "N/A";
  } else if (numericScore > 750) {
    color = "text-emerald-500";
    label = "Excellent";
  } else if (numericScore > 700) {
    color = "text-blue-500";
    label = "Good";
  } else if (numericScore > 650) {
    color = "text-amber-500";
    label = "Fair";
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-lg border border-slate-100">
      <div className={`text-5xl font-bold ${color} mb-2`}>{score || "N/A"}</div>
      <div className="text-slate-500 font-medium uppercase tracking-wide text-sm">
        {label}
      </div>
      <div className="text-xs text-slate-400 mt-2">CIBIL TUSC3</div>
    </div>
  );
};

const PaymentGrid = ({ history }) => {
  if (!history || !Array.isArray(history) || history.length === 0)
    return (
      <span className="text-slate-400 text-xs">
        No Payment History Available
      </span>
    );

  const displayHistory = history.slice(0, 36);

  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-1">
        {displayHistory.map((item, idx) => {
          const status = typeof item === "object" ? item.status : item;
          const date = typeof item === "object" ? item.date : null;

          let bg = "bg-slate-200";
          let text = "text-slate-500";
          const s = String(status).toUpperCase();
          const description = getStatusDescription(s);
          const dateLabel = formatMonthYear(date);

          if (s === "0" || s === "000" || s === "STD") {
            bg = "bg-emerald-500";
            text = "text-white";
          } else if (["SUB", "DBT", "LSS"].includes(s) || parseInt(s) > 90) {
            bg = "bg-rose-600";
            text = "text-white";
          } else if (parseInt(s) > 0 || s === "SMA") {
            bg = "bg-amber-500";
            text = "text-white";
          } else if (s === "XXX") {
            bg = "bg-slate-100";
            text = "text-slate-300";
          }

          return (
            <div key={idx} className="group relative">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-md text-[10px] font-bold cursor-help transition-transform hover:scale-110 shadow-sm ${bg} ${text}`}
              >
                {s === "0" || s === "000" || s === "STD" ? "OK" : s}
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-32 p-2 bg-slate-800 text-white text-xs rounded shadow-lg z-20 text-center pointer-events-none">
                <div className="font-semibold text-emerald-300 mb-1 border-b border-slate-600 pb-1">
                  {dateLabel}
                </div>
                <div className="font-medium">{description}</div>
                {s !== "0" && s !== "000" && s !== "STD" && s !== "XXX" && (
                  <div className="mt-1 font-mono text-slate-400">Code: {s}</div>
                )}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-2 text-[10px] text-slate-400">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div> On Time
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-amber-500"></div> Delay/Due
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-rose-600"></div> Default
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-slate-200"></div> No Info
        </div>
      </div>
    </div>
  );
};

// --- Email Draft Component ---
const EmailDraftModal = ({ account, type, onClose }) => {
  const [emailContent, setEmailContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateDraft = async () => {
      if (!account) return;

      const prompt = `Write a professional email to ${account.creditorName} regarding Account Number ${account.accountNumber}. 
            Account Type: ${type}. 
            Current Status: ${account.amountPastDue > 0 ? `Overdue by ₹${account.amountPastDue}` : "Active/Closed"}.
            
            Context: I want to ${account.amountPastDue > 0 ? "inquire about the overdue amount and propose a payment plan" : "request a No Objection Certificate (NOC) or closure statement"}.
            
            The email should be formal, polite, and request a quick response. Include placeholders for [My Name] and [My Phone]. Provide a Subject Line and Body.`;

      try {
        const text = await callGeminiAPI(prompt);
        setEmailContent(text || "Could not generate draft.");
      } catch (e) {
        setEmailContent("Error generating email draft. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    generateDraft();
  }, [account, type]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailContent);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="text-purple-500" size={18} />
            AI Email Draft
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-slate-100 rounded w-3/4"></div>
              <div className="h-32 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-1/2"></div>
            </div>
          ) : (
            <textarea
              className="w-full h-64 p-3 border border-slate-200 rounded-lg text-sm text-slate-700 font-mono focus:ring-2 focus:ring-purple-500 outline-none resize-none bg-slate-50"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
            />
          )}
        </div>
        <div className="p-4 border-t border-slate-100 flex justify-end gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
          >
            <Copy size={16} /> Copy Text
          </button>
          <button
            onClick={() =>
              window.open(
                `mailto:support@${account.creditorName.toLowerCase().replace(" ", "")}.com?body=${encodeURIComponent(emailContent)}`,
              )
            }
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Mail size={16} /> Open Mail App
          </button>
        </div>
      </div>
    </div>
  );
};
const estimateInterestRate = (principal, emi, months) => {
  if (!principal || !emi || !months || principal <= 0 || emi <= 0) return null;

  let low = 0.0001;
  let high = 0.05; // up to 60% annual
  let rate = 0;

  for (let i = 0; i < 50; i++) {
    rate = (low + high) / 2;
    const calcEmi =
      (principal * rate * Math.pow(1 + rate, months)) /
      (Math.pow(1 + rate, months) - 1);

    if (calcEmi > emi) high = rate;
    else low = rate;
  }

  return (rate * 12 * 100).toFixed(2); // annual %
};
const estimateMonthsSinceOpened = (dateOpened) => {
  if (!dateOpened) return null;
  const d = new Date(dateOpened);
  if (isNaN(d)) return null;

  const now = new Date();
  return Math.max(
    1,
    (now.getFullYear() - d.getFullYear()) * 12 +
      (now.getMonth() - d.getMonth())
  );
};


const AccountsList = ({ accounts }) => {
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [draftAccount, setDraftAccount] = useState(null); // { acc, type }

  useEffect(() => {
    if (accounts) {
      setExpandedIndices(accounts.map((_, i) => i));
    }
  }, [accounts]);

  const toggleAccordion = (index) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  if (!accounts || accounts.length === 0)
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-dashed border-slate-200">
        No accounts found matching your filters.
      </div>
    );
    console.log("accounts", accounts)
  return (
    <div className="space-y-4">
      {accounts.map((item, index) => {
        const acc = item.Tradeline || item;
        const isExpanded = expandedIndices.includes(index);
        const balance = parseInt(acc.currentBalance || 0);
        const highCredit = parseInt(
          acc.highBalance || acc.GrantedTrade?.CreditLimit || 0,
        );

        let emiAmount = acc.GrantedTrade?.EMIAmount;
        let displayEmi = "N/A";
//         let rawRate = acc.GrantedTrade?.interestRate;
// let interestRate =
//   rawRate && rawRate !== "-1" && rawRate !== "-1.00"
//     ? `${parseFloat(rawRate)}%`
//     : "N/A";
        let rawRate = acc.GrantedTrade?.interestRate;

let interestRate = "N/A";

if (rawRate && rawRate !== "-1" && rawRate !== "-1.00") {
  interestRate = `${parseFloat(rawRate)}%`;
} else {
  const principal =
    parseInt(acc.highBalance || acc.GrantedTrade?.CreditLimit || 0);

  const emi = parseInt(acc.GrantedTrade?.EMIAmount || 0);

  const months =
    parseInt(acc.GrantedTrade?.termMonths) ||
    estimateMonthsSinceOpened(acc.dateOpened);

  const est = estimateInterestRate(principal, emi, months);

  if (est) interestRate = `~${est}%`;
}

        if (emiAmount && emiAmount !== "-1" && emiAmount !== "") {
          displayEmi = `₹${parseInt(emiAmount).toLocaleString()}`;
        }

        const typeCode =
          acc.AccountType?.symbol ||
          acc.accountTypeSymbol ||
          acc.GrantedTrade?.AccountType?.symbol ||
          item.accountTypeSymbol;

        const typeDesc = acc.AccountType?.description;
        const accountType = getAccountType(typeCode, typeDesc);
        const AccountIcon = getAccountIcon(typeCode);

        const isClosed = acc.dateClosed && acc.dateClosed !== "";
        const isOverdue = parseInt(acc.amountPastDue) > 0;

        return (
          <Card
            key={index}
            className="transition-all duration-200 hover:shadow-md border-l-4 border-l-transparent hover:border-l-blue-500"
          >
            <div
              className="p-4 flex items-center justify-between cursor-pointer bg-white"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg ${accountType.includes("Credit Card") ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"}`}
                >
                  {AccountIcon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">
                    {acc.creditorName || "Unknown Bank"}
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500 mt-1 items-center">
                    <span
                      className={`font-medium px-2 py-0.5 rounded ${accountType.includes("Credit Card") ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-700"}`}
                    >
                      {accountType}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="font-mono">
                      Acct:{" "}
                      {acc.accountNumber
                        ?.slice(-4)
                        .padStart(acc.accountNumber?.length, "*")}
                    </span>
                    {isClosed && (
                      <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">
                        Closed
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-8 text-right">
                <div className="hidden sm:block">
                  <div className="font-semibold text-slate-700">
                    {displayEmi}
                  </div>
                  <div className="text-xs text-slate-400">Monthly EMI</div>
                </div>

                <div>
                  <div className="font-semibold text-slate-700">
                    ₹{balance.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400">
                    Outstanding Amount
                  </div>
                </div>
                <div>
                  <div className="font-bold text-slate-00">
                      {interestRate}
                  </div>
                  <div className="text-xs text-slate-400">
                    Interest Rate
                  </div>
                </div>
              </div>

              <div className="ml-4 text-slate-400">
                {isExpanded ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            </div>

            {isExpanded && (
              <div className="px-4 pb-4 pt-0 bg-slate-50/50 border-t border-slate-100">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4 text-sm">
                  <div>
                    <span className="text-slate-400 block text-xs flex items-center gap-1">
                      <Calendar size={10} /> Date Opened
                    </span>
                    <span className="font-medium text-slate-700">
                      {formatDate(acc.dateOpened)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs flex items-center gap-1">
                      <Calendar size={10} /> Date Reported
                    </span>
                    <span className="font-medium text-slate-700">
                      {formatDate(acc.dateReported)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">
                      High Credit / Limit
                    </span>
                    <span className="font-medium text-slate-700">
                      ₹{highCredit.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs flex items-center gap-1">
                      <Banknote size={10} /> EMI Amount
                    </span>
                    <span className="font-medium text-slate-700">
                      {displayEmi}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Status</span>
                    {isClosed ? (
                      <Badge type="neutral">
                        Closed: {formatDate(acc.dateClosed)}
                      </Badge>
                    ) : (
                      <Badge type={isOverdue ? "danger" : "success"}>
                        {isOverdue
                          ? `Overdue: ₹${acc.amountPastDue}`
                          : "Active & Regular"}
                      </Badge>
                    )}
                  </div>
                </div>

                {acc.GrantedTrade && (
                  <div className="mt-2 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                        Payment History
                      </span>
                      <div className="group relative">
                        <Info
                          size={12}
                          className="text-slate-400 cursor-help"
                        />
                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg z-10">
                          Displays payment behavior for recent months. Green
                          indicates timely payments.
                        </div>
                      </div>
                    </div>
                    <PaymentGrid
                      history={normalizeArray(
                        acc.GrantedTrade.PayStatusHistory?.MonthlyPayStatus,
                      )}
                    />
                  </div>
                )}

                {/* AI Action Button */}
                <div className="flex justify-end pt-3 border-t border-slate-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDraftAccount({ acc, type: accountType });
                    }}
                    className="flex items-center gap-2 text-xs font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Sparkles size={14} />
                    {isOverdue
                      ? "Draft Dispute Letter"
                      : "Draft Inquiry/NOC Email"}
                  </button>
                </div>
              </div>
            )}
          </Card>
        );
      })}

      {draftAccount && (
        <EmailDraftModal
          account={draftAccount.acc}
          type={draftAccount.type}
          onClose={() => setDraftAccount(null)}
        />
      )}
    </div>
  );
};

const EnquiryList = ({ enquiries }) => {
  if (!enquiries || enquiries.length === 0)
    return <div className="p-4 text-slate-500">No inquiries found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 text-slate-500 font-medium">
          <tr>
            <th className="px-4 py-3 rounded-tl-lg">Date</th>
            <th className="px-4 py-3">Institution</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3 rounded-tr-lg">Purpose</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {enquiries.map((enq, idx) => {
            const purposeCode = enq.inquiryType || enq.inquiryPurpose;
            const purpose = getAccountType(purposeCode, "");

            return (
              <tr key={idx} className="hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-slate-700">
                  {formatDate(enq.inquiryDate || enq.dateOfInquiry)}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {enq.subscriberName || enq.memberShortName}
                </td>
                <td className="px-4 py-3 font-mono text-slate-600">
                  ₹
                  {parseInt(
                    enq.amount || enq.inquiryAmount || 0,
                  ).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <Badge type="neutral">{purpose || "General"}</Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const MetricCard = ({
  title,
  value,
  subtext,
  icon: Icon,
  colorClass = "bg-blue-50 text-blue-600",
}) => (
  <Card className="p-4 flex items-start gap-4">
    <div className={`p-3 rounded-lg ${colorClass}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <h3 className="text-xl font-bold text-slate-800 mt-1">{value}</h3>
      {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
    </div>
  </Card>
);

const CreditAnalysisView = ({ analysis }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Card className="p-6 border-l-4 border-l-rose-500">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <AlertCircle size={20} className="text-rose-500" />
          Areas of Concern (Lacking)
        </h3>
        {analysis.issues.length > 0 ? (
          <ul className="space-y-3">
            {analysis.issues.map((issue, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-slate-700 items-start p-2 rounded hover:bg-rose-50"
              >
                <XCircle size={16} className="text-rose-500 mt-0.5 shrink-0" />
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-slate-400">
            <CheckCircle size={32} className="text-emerald-400 mb-2" />
            <p>No major issues found!</p>
          </div>
        )}
      </Card>

      <Card className="p-6 border-l-4 border-l-emerald-500">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Lightbulb size={20} className="text-emerald-500" />
          Recommendations to Improve
        </h3>
        {analysis.suggestions.length > 0 ? (
          <ul className="space-y-3">
            {analysis.suggestions.map((sug, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-slate-700 items-start p-2 rounded hover:bg-emerald-50"
              >
                <CheckCircle
                  size={16}
                  className="text-emerald-500 mt-0.5 shrink-0"
                />
                <span>{sug}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-slate-400 text-sm text-center">
            Keep maintaining your current habits!
          </div>
        )}
      </Card>
    </div>
  );
};

const InsightsView = ({ analysis }) => {
  const [income, setIncome] = useState("");
  const [dti, setDti] = useState(0);

  // Calculate DTI whenever income changes
  useEffect(() => {
    const monthlyIncome = parseInt(income) || 0;
    const calcDti =
      monthlyIncome > 0
        ? Math.round((analysis.totalMonthlyEMI / monthlyIncome) * 100)
        : 0;
    setDti(calcDti);
  }, [income, analysis.totalMonthlyEMI]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Debt Balance"
          value={`₹${analysis.totalBalance.toLocaleString()}`}
          subtext="Across all active accounts"
          icon={Banknote}
          colorClass="bg-emerald-50 text-emerald-600"
        />
        <MetricCard
          title="Credit Utilization"
          value={`${analysis.utilizationPct}%`}
          subtext={`₹${analysis.creditCardBalance.toLocaleString()} used of ₹${analysis.creditCardLimit.toLocaleString()}`}
          icon={PieChart}
          colorClass={
            analysis.utilizationPct > 30
              ? "bg-amber-50 text-amber-600"
              : "bg-blue-50 text-blue-600"
          }
        />
        <MetricCard
          title="Credit Age"
          value={analysis.ageString}
          subtext={`Oldest account opened ${analysis.ageString} ago`}
          icon={Clock}
          colorClass="bg-purple-50 text-purple-600"
        />
        <MetricCard
          title="Active Accounts"
          value={analysis.activeAccountsCount}
          subtext={`${analysis.securedCount} Secured, ${analysis.unsecuredCount} Unsecured`}
          icon={Briefcase}
          colorClass="bg-indigo-50 text-indigo-600"
        />
      </div>

      <CreditAnalysisView analysis={analysis} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DTI Calculator */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-500" />
              DTI Calculator
            </h3>
            {dti > 0 && (
              <Badge type={dti > 40 ? "danger" : "success"}>DTI: {dti}%</Badge>
            )}
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-500">
              Debt-to-Income (DTI) ratio is a key indicator of your ability to
              manage monthly payments. Enter your monthly income to see your DTI
              based on report data.
            </p>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">
                  Total Monthly EMI Obligations
                </span>
                <span className="font-bold text-slate-800">
                  ₹{analysis.totalMonthlyEMI.toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400">₹</span>
                  </div>
                  <input
                    type="number"
                    className="pl-7 w-full p-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter Monthly Income"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {income && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">DTI Ratio</span>
                  <span
                    className={`font-bold ${dti > 40 ? "text-rose-600" : "text-emerald-600"}`}
                  >
                    {dti}%
                  </span>
                </div>
                <ProgressBar
                  value={dti}
                  max={100}
                  colorClass={dti > 40 ? "bg-rose-500" : "bg-emerald-500"}
                />
                <p className="text-xs text-slate-400 mt-2">
                  {dti > 40
                    ? "Your DTI is high. Lenders typically prefer a DTI below 40%."
                    : "Your DTI is healthy. You have good capacity for new credit."}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Account Mix */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity size={20} className="text-purple-500" />
            Credit Mix
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">
                  Secured Loans ({analysis.securedCount})
                </span>
                <span className="text-slate-400 text-xs">
                  Housing, Auto, Gold
                </span>
              </div>
              <ProgressBar
                value={analysis.securedCount}
                max={analysis.securedCount + analysis.unsecuredCount}
                colorClass="bg-purple-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">
                  Unsecured Loans ({analysis.unsecuredCount})
                </span>
                <span className="text-slate-400 text-xs">
                  Personal, Credit Cards
                </span>
              </div>
              <ProgressBar
                value={analysis.unsecuredCount}
                max={analysis.securedCount + analysis.unsecuredCount}
                colorClass="bg-pink-500"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-xs text-blue-800">
              <strong>Tip:</strong> A healthy mix of secured and unsecured
              credit can positively impact your score.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- Chatbot Component ---
const ChatWidget = ({ reportData, analysis }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: `Hi ${sessionStorage.getItem("username")?.split(" ")}! I'm your Credit Assistant. I've analyzed your report. Ask me anything about your score, loans, or how to improve.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const contextData = {
      Name: reportData.name,
      Score: reportData.score,
      ActiveAccounts: analysis.activeAccountsCount,
      TotalDebt: analysis.totalBalance,
      CreditUtilization: `${analysis.utilizationPct}%`,
      OldestAccountAge: analysis.ageString,
      RecentEnquiries: reportData.enquiries.length,
      RedFlags: analysis.issues,
      Recommendations: analysis.suggestions,
      AccountsSummary: reportData.accounts
        .map((acc) => {
          const a = acc.Tradeline || acc;
          return `${a.creditorName} (${getAccountType(a.AccountType?.symbol || a.accountTypeSymbol)}): Balance ₹${a.currentBalance}, Status ${parseInt(a.amountPastDue) > 0 ? "Overdue" : "Regular"}`;
        })
        .slice(0, 10),
    };

    // const systemPrompt = `You are CreditWise, an expert financial assistant. You are talking to ${reportData.name}.
    //     Here is their credit report summary: ${JSON.stringify(contextData)}.

    //     Rules:
    //     1. Be concise, professional, and encouraging.
    //     2. Answer strictly based on the provided JSON data.
    //     3. If asked about improving score, use the 'Recommendations' provided.
    //     4. If asked about debt, mention the specific numbers.
    //     5. Keep responses under 3 sentences unless asked for a detailed list.`;

    try {
      const aiText = await callGeminiAPI({
        contextData,
        message: userMsg.text,
      });
      console.log("AI TEXT", aiText);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: aiText || "I'm having trouble analyzing that right now.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I lost connection to the server. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[500px] transition-all animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">HappiRate Assistant</h3>
                <p className="text-[10px] text-blue-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>{" "}
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-blue-100 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-500 border border-slate-100 rounded-2xl rounded-tl-none px-4 py-2 text-xs flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 border border-transparent focus-within:border-blue-300 focus-within:bg-white transition-all">
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                placeholder="Ask about your credit score..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className={`p-1.5 rounded-full transition-colors ${
                  input.trim() && !loading
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-slate-300 text-slate-500 cursor-not-allowed"
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center ${
          isOpen
            ? "bg-slate-700 rotate-90 scale-0 opacity-0 hidden"
            : "bg-blue-600 hover:bg-blue-700 text-white scale-100 opacity-100"
        }`}
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

// --- New Dashboard Component ---
const DashboardView = ({ reportData, analysis, setActiveTab }) => {
  // Default state matches the static design initially
  const [recommendation, setRecommendation] = useState({
    tag: "High Savings",
    title: "Reduce your Loan EMI",
    description: "Transfer your high interest loan to HDFC at 8.75%.",
  });

  useEffect(() => {
    const fetchPersonalizedOffer = async () => {
      if (!reportData || !analysis) return;

      const prompt = `Act as a financial algorithm. Analyze this credit profile:
            Score: ${reportData.score}
            Total Debt: ${analysis.totalBalance}
            Utilization: ${analysis.utilizationPct}%
            Active Accounts: ${analysis.activeAccountsCount}
            
            Generate ONE single, highly specific financial offer recommendation title and description for a dashboard banner.
            
            Logic:
            - If Utilization > 30%: Suggest Balance Transfer Card (Tag: "Debt Relief").
            - If Score > 750: Suggest Premium Rewards Credit Card (Tag: "Exclusive Offer").
            - If Total Debt > 500000: Suggest Personal Loan for Refinancing (Tag: "High Savings").
            - If Score < 700: Suggest Credit Builder Card (Tag: "Score Boost").
            
            Return ONLY a JSON object (no markdown) with keys: "tag", "title", "description".
            Example: {"tag": "High Savings", "title": "Reduce Loan EMI", "description": "Transfer your loan to HDFC at 8.75%."}`;

      try {
        const text = await callGeminiAPI(prompt);
        // Extract JSON if wrapped in code blocks
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : text;
        const data = JSON.parse(jsonString);

        // Update state with AI response
        if (data && data.title) {
          setRecommendation(data);
        }
      } catch (e) {
        console.error("Failed to fetch AI recommendation", e);
        // Keep default state on error
      }
    };

    fetchPersonalizedOffer();
  }, [reportData?.score, analysis?.totalBalance, analysis?.utilizationPct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min">
      {/* 1. Recommended for You Section (Full Width) */}

      {/* 2. Score Card (1 Column) */}
      {/* <div className="col-span-full md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
        <h3 className="text-slate-500 font-medium mb-2 uppercase text-xs tracking-wider">
          Credit Score
        </h3>
        <div className="relative w-full flex justify-center">
          <ScoreGauge score={reportData?.score} />
        </div>
      </div> */}

      {/* 3. Profile Summary (1 Column) */}
      <div
        onClick={() => setActiveTab("profile")}
        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between"
      >
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
              <User size={24} />
            </div>
            <ArrowRight
              size={20}
              className="text-slate-300 group-hover:text-blue-500 transition-colors"
            />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Profile</h3>
          <p className="text-sm text-slate-500">View contact details.</p>
        </div>
        <div className="flex gap-2 mt-4">
          <Badge type="neutral">{reportData?.emails.length} Emails</Badge>
        </div>
      </div>

      {/* 4. Accounts Summary (1 Column) */}
      <div
        onClick={() => setActiveTab("accounts")}
        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between"
      >
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600 group-hover:bg-purple-100 transition-colors">
              <CreditCard size={24} />
            </div>
            <ArrowRight
              size={20}
              className="text-slate-300 group-hover:text-purple-500 transition-colors"
            />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Accounts</h3>
          <p className="text-sm text-slate-500">
            {analysis?.activeAccountsCount} Active Loans
          </p>
        </div>
        <div className="mt-4">
          <span className="text-2xl font-bold text-slate-700">
            {reportData?.accounts.length}
          </span>
          <span className="text-xs text-slate-400 ml-1">Total</span>
        </div>
      </div>

      {/* 5. Enquiries Summary (1 Column) */}
      <div
        onClick={() => setActiveTab("enquiries")}
        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between"
      >
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-50 rounded-lg text-amber-600 group-hover:bg-amber-100 transition-colors">
              <Search size={24} />
            </div>
            <ArrowRight
              size={20}
              className="text-slate-300 group-hover:text-amber-500 transition-colors"
            />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Enquiries</h3>
          <p className="text-sm text-slate-500">Recent checks.</p>
        </div>
        <div className="mt-4">
          <span className="text-2xl font-bold text-slate-700">
            {reportData?.enquiries.length}
          </span>
          <span className="text-xs text-slate-400 ml-1">Total</span>
        </div>
      </div>

      {/* 6. Insights Summary (1 Column) */}
      <div
        onClick={() => setActiveTab("insights")}
        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between"
      >
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600 group-hover:bg-emerald-100 transition-colors">
              <TrendingUp size={24} />
            </div>
            <ArrowRight
              size={20}
              className="text-slate-300 group-hover:text-emerald-500 transition-colors"
            />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Insights</h3>
          <p className="text-sm text-slate-500">Analysis & DTI.</p>
        </div>
        <div className="mt-4">
          {analysis?.issues.length > 0 ? (
            <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 px-2 py-1 rounded w-fit">
              <AlertCircle size={12} /> {analysis.issues.length} Risks
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-fit">
              <CheckCircle size={12} /> Healthy
            </div>
          )}
        </div>
      </div>
      <div className="col-span-full mb-2">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-slate-800">
            Recommended for You
          </h2>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            See all offers
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="z-10 relative max-w-lg">
            <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide mb-2 inline-block">
              {recommendation?.tag || ""}
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {recommendation?.title || ""}
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              {recommendation?.description || ""}
            </p>
            <button className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
              Check Eligibility
            </button>
          </div>

          {/* Dollar Sign Illustration - Preserved specific style */}
          <div className="hidden md:block text-slate-100 absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <DollarSign size={140} strokeWidth={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioGate = () => {
  const handleLogin = () => {
    // store where user wanted to go
    sessionStorage.setItem("redirectAfterLogin", "/credit-health-report");
    window.location.pathname = "/sign-in";
  };
  return (
    <div className="flex items-center justify-center min-h-screen w-full p-6 bg-slate-50 rounded-2xl border border-slate-200">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon & Visual Guard */}
        <div className="relative mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
          <Lock className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
          <div className="absolute inset-0 rounded-full border-4 border-blue-50 border-t-blue-500 animate-spin-slow" />
        </div>

        {/* Content Section */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">
            Personal Financial Portfolio
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Your financial health data, credit insights, and customized
            portfolio tracking are protected. Sign in to access your secure
            dashboard.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleLogin}
          className="group relative w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-slate-200"
        >
          <LogIn className="w-4 h-4" />
          <span>Login to View Portfolio</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Trust Badge */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-[11px] uppercase tracking-widest text-slate-400 font-medium">
            256-bit Encrypted Security
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function GeminiCreditHealthReport() {
  const [jsonData, setJsonData] = useState(null);
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard"); // Default to Dashboard
  const [accountFilter, setAccountFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [bankSearch, setBankSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const handleParse = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonData(parsed);
      setError(null);
      setActiveTab("dashboard"); // Reset to dashboard on new parse
    } catch (e) {
      setError("Invalid JSON format. Please check your input.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        setJsonData(parsed);
        setError(null);
        setActiveTab("dashboard"); // Reset to dashboard
      } catch (err) {
        setError("Error parsing JSON file.");
      }
    };
    reader.readAsText(file);
  };

  // --- Data Extraction Logic ---
  const reportData = useMemo(() => {
    if (!jsonData) return null;

    let root = jsonData;
    if (
      jsonData.data?.GetCustomerAssetsResponse?.GetCustomerAssetsSuccess?.Asset
        ?.TrueLinkCreditReport
    ) {
      root =
        jsonData.data.GetCustomerAssetsResponse.GetCustomerAssetsSuccess.Asset
          .TrueLinkCreditReport;
    } else if (jsonData.GetCustomerAssetsResponse) {
      root =
        jsonData.GetCustomerAssetsResponse.GetCustomerAssetsSuccess.Asset
          .TrueLinkCreditReport;
    } else if (jsonData.TrueLinkCreditReport) {
      root = jsonData.TrueLinkCreditReport;
    }

    const borrower = root.Borrower || {};

    const names = borrower.BorrowerName?.Name || {};
    const name =
      `${names.Forename || ""} ${names.Surname || ""} ${names.name1 || ""}`.trim();

    const dobData = borrower.Birth?.BirthDate || borrower.Birth || {};
    const dob = `${dobData.day || ""}-${dobData.month || ""}-${dobData.year || ""}`;

    const emails = normalizeArray(borrower.EmailAddress);
    const phones = normalizeArray(borrower.BorrowerTelephone);
    const addresses = normalizeArray(borrower.BorrowerAddress);
    const ids = normalizeArray(borrower.IdentifierPartition?.Identifier);

    const scoreObj = borrower.CreditScore || {};
    const score =
      scoreObj.riskScore ||
      scoreObj.score ||
      (Array.isArray(scoreObj) ? scoreObj[0]?.score : "N/A");

    const tradeLinePartition = root.TradeLinePartition;
    const accounts = extractPartitionData(tradeLinePartition, "Tradeline");

    const inquiryPartition = root.InquiryPartition;
    const enquiries = extractPartitionData(inquiryPartition, "Inquiry");

    return {
      name,
      dob,
      gender: borrower.Gender,
      score,
      emails,
      phones,
      addresses,
      ids,
      accounts,
      enquiries,
    };
  }, [jsonData]);

  // Derived Calculations
  const analysis = useMemo(() => {
    if (!reportData) return null;

    let totalBalance = 0;
    let totalMonthlyEMI = 0;
    let creditCardUtilization = { limit: 0, balance: 0 };
    let securedCount = 0;
    let unsecuredCount = 0;
    let oldestDate = new Date();
    let activeAccountsCount = 0;
    const issues = [];
    const suggestions = [];
    let latePaymentCount = 0;

    reportData?.accounts.forEach((item) => {
      const acc = item.Tradeline || item;
      const isActive = !acc.dateClosed;

      // Payment History Check
      const history = normalizeArray(
        acc.GrantedTrade?.PayStatusHistory?.MonthlyPayStatus,
      );
      const recentBadStatus = history.slice(0, 12).some((m) => {
        const s = String(m.status || m).toUpperCase();
        return !["0", "000", "STD", "XXX"].includes(s);
      });
      if (recentBadStatus) latePaymentCount++;

      // Current Overdue Check
      const overdueAmt = parseInt(acc.amountPastDue);
      if (!isNaN(overdueAmt) && overdueAmt > 0) {
        issues.push(
          `Overdue amount of ₹${overdueAmt.toLocaleString()} on ${acc.creditorName} (${getAccountType(acc.AccountType?.symbol || acc.accountTypeSymbol)}).`,
        );
      }

      if (isActive) {
        activeAccountsCount++;
        const bal = parseInt(acc.currentBalance || 0);
        if (!isNaN(bal)) totalBalance += bal;

        const emi = parseInt(acc.GrantedTrade?.EMIAmount || 0);
        if (!isNaN(emi) && emi > 0) totalMonthlyEMI += emi;

        const typeCode =
          acc.AccountType?.symbol ||
          acc.accountTypeSymbol ||
          item.accountTypeSymbol;
        if (typeCode === "10") {
          const limit = parseInt(
            acc.highBalance || acc.GrantedTrade?.CreditLimit || 0,
          );
          creditCardUtilization.balance += bal;
          creditCardUtilization.limit += limit;
        }
      }

      const typeCode =
        acc.AccountType?.symbol ||
        acc.accountTypeSymbol ||
        item.accountTypeSymbol;
      if (getLoanCategory(typeCode) === "Secured") securedCount++;
      else unsecuredCount++;

      const openDate = parseDate(acc.dateOpened);
      if (openDate && openDate < oldestDate) oldestDate = openDate;
    });

    if (latePaymentCount > 0) {
      issues.push(
        `Irregular payment history detected on ${latePaymentCount} account(s) in the last 12 months.`,
      );
      suggestions.push(
        "Ensure 100% on-time payments for the next 12-24 months. Automate your payments to avoid missing due dates.",
      );
    } else {
      suggestions.push(
        "Great job on payment consistency! Continue paying on time as this has the highest impact on your score.",
      );
    }

    const utilizationPct =
      creditCardUtilization.limit > 0
        ? Math.round(
            (creditCardUtilization.balance / creditCardUtilization.limit) * 100,
          )
        : 0;

    if (utilizationPct > 30) {
      issues.push(
        `High Credit Utilization (${utilizationPct}%) on credit cards.`,
      );
      suggestions.push(
        "Reduce your credit card spending to below 30% of your limit. Consider paying off balances mid-cycle to lower reported utilization.",
      );
    }

    if (reportData?.enquiries.length > 5) {
      issues.push(
        `High number of credit enquiries (${reportData?.enquiries.length}) found.`,
      );
      suggestions.push(
        "Avoid applying for new loans or credit cards for at least 6 months. Each hard enquiry temporarily dips your score.",
      );
    }

    if (securedCount === 0 && unsecuredCount > 0) {
      issues.push(
        "Credit portfolio lacks diversity (only unsecured loans found).",
      );
      suggestions.push(
        "While not urgent, a healthy mix of secured (Home/Auto) and unsecured loans helps the score long-term.",
      );
    }

    const now = new Date();
    const yearsHistory = now.getFullYear() - oldestDate.getFullYear();
    const monthsHistory = now.getMonth() - oldestDate.getMonth();
    const totalMonths = yearsHistory * 12 + monthsHistory;
    const ageString = `${Math.floor(totalMonths / 12)}y ${totalMonths % 12}m`;

    if (totalMonths < 24) {
      issues.push(`Credit history is relatively new (${ageString}).`);
      suggestions.push(
        "Keep your oldest accounts open and active. Length of credit history builds trust over time.",
      );
    }

    return {
      totalBalance,
      totalMonthlyEMI,
      utilizationPct,
      creditCardLimit: creditCardUtilization.limit,
      creditCardBalance: creditCardUtilization.balance,
      securedCount,
      unsecuredCount,
      ageString,
      activeAccountsCount,
      issues,
      suggestions,
    };
  }, [reportData]);

  // Extract unique loan types for the dropdown
  const availableLoanTypes = useMemo(() => {
    if (!reportData || !reportData.accounts) return [];
    const types = new Set();
    reportData.accounts.forEach((item) => {
      const acc = item.Tradeline || item;
      const typeCode =
        acc.AccountType?.symbol ||
        acc.accountTypeSymbol ||
        item.accountTypeSymbol;
      const typeDesc = acc.AccountType?.description;
      types.add(getAccountType(typeCode, typeDesc));
    });
    return Array.from(types).sort();
  }, [reportData]);
  console.log("reportData",reportData);
  const filteredAccounts = useMemo(() => {
    if (!reportData || !reportData.accounts) return [];

    return reportData.accounts.filter((item) => {
      const acc = item.Tradeline || item;
      const isClosed = acc.dateClosed && acc.dateClosed !== "";

      // Status Filter
      if (accountFilter === "active" && isClosed) return false;
      if (accountFilter === "closed" && !isClosed) return false;

      // Type Filter
      if (typeFilter !== "all") {
        const typeCode =
          acc.AccountType?.symbol ||
          acc.accountTypeSymbol ||
          item.accountTypeSymbol;
        const typeDesc = acc.AccountType?.description;
        const currentType = getAccountType(typeCode, typeDesc);
        if (currentType !== typeFilter) return false;
      }

      // Bank Search
      if (bankSearch) {
        const bankName = (acc.creditorName || "").toLowerCase();
        if (!bankName.includes(bankSearch.toLowerCase())) return false;
      }

      return true;
    });
  }, [reportData, accountFilter, typeFilter, bankSearch]);

  const fetchDashboardData = async () => {
    // const resp = await fetchRawResponseOfUser();
    // setJsonData(resp?.data?.data?.rawData);
    // console.log("resp", resp);
    try {
      setLoading(true);
      const resp = await fetchRawResponseOfUser();
      setJsonData(resp?.data?.data?.rawData);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    sessionStorage.getItem("mobile_number") ? fetchDashboardData() : "";
  }, []);

  if (!sessionStorage.getItem("mobile_number")) return <PortfolioGate />;
  if (loading) return <DashboardLoader />;
  console.log("Extracted Report Data:", reportData);
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      {/* Header */}
      {/* <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-blue-600" />
            <h1 className="font-bold text-lg">
              CIBIL{" "}
              <span className="font-normal text-slate-500">Dashboard</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`text-sm font-medium ${activeTab === "dashboard" ? "text-blue-600" : "text-slate-500 hover:text-blue-600"}`}
            >
              Overview
            </button>
            <button
              onClick={() => setJsonData(null)}
              className="text-sm text-slate-500 hover:text-blue-600 font-medium"
            >
              Upload New File
            </button>
          </div>
        </div>
      </header> */}

      <main className="max-w-7xl pt-24 mx-auto px-4 py-8 space-y-6">
        {/* Profile Header Card */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-2xl font-bold">
              {reportData?.name.charAt(0)}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-900">
                {reportData?.name}
              </h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <User size={14} /> {reportData?.gender}
                </span>
                <span className="flex items-center gap-1">
                  <Activity size={14} /> DOB:{" "}
                  {reportData?.dob.replace("undefined-undefined-", "")}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                {reportData?.ids.map((id, i) => (
                  <Badge key={i} type="blue">
                    {id.ID?.IdentifierName || id.idType || "ID"}:{" "}
                    {id.ID?.Id || id.idNumber}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="w-full md:w-auto">
              <ScoreGauge score={reportData?.score} />
            </div>
          </div>
        </Card>
        {/* Tabs - Only show navigation tabs if NOT in Dashboard view, OR show dashboard tab as first item */}
        <div className="flex border-b border-slate-200 overflow-x-auto">
          {["dashboard", "profile", "accounts", "enquiries", "insights"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab === "dashboard" ? (
                  <span className="flex items-center gap-2">
                    <LayoutDashboard size={16} /> Overview
                  </span>
                ) : (
                  tab
                )}
              </button>
            ),
          )}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === "dashboard" && (
            <DashboardView
              reportData={reportData}
              analysis={analysis}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "profile" && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <div className="p-4 border-b border-slate-100 font-semibold flex items-center gap-2">
                  <Phone size={18} className="text-blue-500" /> Contact Info
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                      Emails
                    </label>
                    <ul className="mt-1 space-y-1">
                      {reportData.emails.length ? (
                        reportData.emails.map((e, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-slate-700"
                          >
                            <Mail size={14} className="text-slate-400" />{" "}
                            {e.Email || e.emailID}
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-slate-400">
                          No emails found
                        </li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                      Phones
                    </label>
                    <ul className="mt-1 space-y-1">
                      {reportData.phones.length ? (
                        reportData.phones.map((p, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-slate-700"
                          >
                            <Phone size={14} className="text-slate-400" />{" "}
                            {p.PhoneNumber?.Number || p.telephoneNumber}
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-slate-400">
                          No phones found
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4 border-b border-slate-100 font-semibold flex items-center gap-2">
                  <MapPin size={18} className="text-blue-500" /> Addresses
                </div>
                <div className="p-4">
                  <ul className="space-y-4">
                    {reportData.addresses.length ? (
                      reportData.addresses.map((addr, i) => {
                        const a = addr.CreditAddress || addr;
                        return (
                          <li
                            key={i}
                            className="text-sm text-slate-600 pb-3 border-b border-slate-50 last:border-0 last:pb-0"
                          >
                            <div className="font-medium text-slate-800 mb-1">
                              {i + 1}
                            </div>
                            <div className="w-[50%]">
                              {a.line1 || a.StreetAddress} {a.line2} {a.City}{" "}
                              {a.State} - {a.PostalCode || a.pinCode}
                            </div>
                          </li>
                        );
                      })
                    ) : (
                      <li className="text-sm text-slate-400">
                        No addresses found
                      </li>
                    )}
                  </ul>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "accounts" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Trade Lines
                    </h3>
                    <p className="text-xs text-slate-500">
                      Showing {filteredAccounts.length} accounts
                    </p>
                  </div>
                  {/* Status Tabs */}
                  <div className="flex bg-slate-100 p-1 rounded-lg self-start">
                    {["all", "active", "closed"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setAccountFilter(filter)}
                        className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-all ${
                          accountFilter === filter
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Bank Search */}
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-2.5 text-slate-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search by Bank Name..."
                      className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={bankSearch}
                      onChange={(e) => setBankSearch(e.target.value)}
                    />
                  </div>

                  {/* Loan Type Dropdown */}
                  <div className="relative min-w-[200px]">
                    <Sliders
                      className="absolute left-3 top-2.5 text-slate-400"
                      size={16}
                    />
                    <select
                      className="w-full pl-9 pr-8 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      <option value="all">All Loan Types</option>
                      {availableLoanTypes.map((type, i) => (
                        <option key={i} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-2.5 text-slate-400 pointer-events-none"
                      size={16}
                    />
                  </div>
                </div>
              </div>
              <AccountsList accounts={filteredAccounts} />
            </div>
          )}

          {activeTab === "enquiries" && (
            <Card>
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">
                  Recent Enquiries ({reportData.enquiries.length})
                </h3>
                <Search size={18} className="text-slate-400" />
              </div>
              <EnquiryList enquiries={reportData.enquiries} />
            </Card>
          )}

          {activeTab === "insights" && <InsightsView analysis={analysis} />}
        </div>
      </main>

      {/* AI Chatbot Widget */}
      <ChatWidget reportData={reportData} analysis={analysis} />
    </div>
  );
}
