import React, { useState, useEffect, useRef } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Shield, 
  ChevronRight, 
  Activity, 
  Home, 
  DollarSign, 
  PieChart,
  Bell,
  Menu,
  X,
  Calendar,
  ArrowLeft,
  Info,
  Sparkles,
  Send,
  FileText,
  Mail,
  Share2,
  Download
} from 'lucide-react';

// --- ICON SYSTEM ---
// Maps string names to actual Lucide components for safe rendering
const IconMap = {
    CreditCard, TrendingUp, AlertCircle, CheckCircle, Clock, Shield, ChevronRight, 
    Activity, Home, DollarSign, PieChart, Bell, Menu, X, Calendar, ArrowLeft, 
    Info, Sparkles, Send, FileText, Mail, Share2, Download
};

const Icon = ({ name, className }) => {
    const LucideIcon = IconMap[name];
    if (!LucideIcon) return null;
    return <LucideIcon className={className} />;
};

// --- MOCK DATA ---
const MOCK_API_RESPONSE = {
    customer: {
        name: "Arun Baikani",
        score: 737,
        lastUpdated: "26 Jan 2026",
        nextUpdate: "26 Feb 2026"
    },
    factors: {
        paymentHistory: { status: "Excellent", percentage: 100, impact: "High", color: "text-[#4338ca]" },
        creditUtilization: { status: "Poor", percentage: 97, impact: "High", color: "text-red-600" },
        creditAge: { status: "Good", age: "5 Yrs 6 Mos", impact: "Medium", color: "text-[#4338ca]" },
        totalAccounts: { status: "Good", count: 6, impact: "Low", color: "text-[#4338ca]" },
        inquiries: { status: "Fair", count: 18, impact: "Medium", color: "text-orange-500" }
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
            isLoan: false
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
            paymentHistory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'XXX', 0], 
            isLoan: true
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
            isLoan: true
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
            paymentHistory: ['STD', 'STD', 'STD', 'STD', 'STD', 'STD', 'STD', 'XXX', 'STD', 'STD', 'STD', 'STD'],
            isLoan: true
        }
    ],
    offers: [
        {
            id: 1,
            title: "Reduce your Home Loan EMI",
            description: "Transfer your Aptus loan (17%) to HDFC at 8.75%. Save ₹2.5 Lakhs.",
            action: "Check Eligibility",
            tag: "High Savings",
            color: "bg-white border border-blue-100"
        },
        {
            id: 2,
            title: "Credit Card Upgrade",
            description: "Your Axis card utilization is high. Get a OneCard with ₹2L limit.",
            action: "Apply Now",
            tag: "Score Booster",
            color: "bg-white border border-blue-100"
        }
    ]
};

// --- API SERVICES ---
const API_BASE_URL = 'http://localhost:5000/api';

const callGeminiAPI = async (prompt, contextData) => {
    try {
        // Attempt to call backend
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, context: contextData })
        });
        
        if (!response.ok) throw new Error("Backend unavailable");
        
        const data = await response.json();
        return data.reply;
    } catch (error) {
        // Fallback response if backend is offline or fails
        console.warn("AI Backend Offline, using local fallback logic.");
        await new Promise(r => setTimeout(r, 1000)); // Simulate delay
        
        const p = prompt.toLowerCase();
        if (p.includes("score")) return `Your score is **${contextData.customer.score}**. It's considered good, but paying down your Axis card will help boost it higher!`;
        if (p.includes("axis")) return "Your **Axis Bank** card is at **97% utilization**. This is the main thing hurting your score right now. Try to pay off ₹15k.";
        if (p.includes("loan")) return "Your **Aptus Housing Loan** interest (17%) is quite high. We recommend a balance transfer.";
        
        return "I can help you analyze your credit report. Try asking about your 'score', 'Axis Bank card', or 'loans'. (Note: AI is in offline mode)";
    }
};

// --- SUB-COMPONENTS ---
// These are defined BEFORE OneScoreDashboard to prevent ReferenceErrors

const ScoreGauge = ({ score, lastUpdated }) => {
    const radius = 80;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - ((score - 300) / 600) * circumference;
    let scoreColor = "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]";
    
    if (score < 650) scoreColor = "text-red-300";
    else if (score < 750) scoreColor = "text-yellow-300";
    else scoreColor = "text-green-300";

    return (
        <div className="relative flex flex-col items-center justify-center p-8 bg-[#172554] rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
                <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                    <circle stroke="#FFFFFF" strokeWidth={stroke} strokeOpacity="0.1" fill="transparent" r={normalizedRadius} cx={radius} cy={radius} strokeLinecap="round" />
                    <circle 
                        stroke="currentColor" 
                        strokeWidth={stroke} 
                        strokeDasharray={circumference + ' ' + circumference} 
                        style={{ strokeDashoffset, transition: 'stroke-dashoffset 1.5s ease-in-out' }} 
                        className={scoreColor} 
                        fill="transparent" 
                        r={normalizedRadius} 
                        cx={radius} 
                        cy={radius} 
                        strokeLinecap="round" 
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-white drop-shadow-md">{score}</span>
                    <span className="text-xs text-indigo-200 uppercase tracking-wider mt-1 font-semibold">CIBIL Score</span>
                </div>
            </div>
            <div className="mt-6 text-center">
                <p className="text-indigo-200 text-sm mb-2">Updated: {lastUpdated}</p>
                <div className="inline-flex items-center px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20 shadow-sm">
                    <TrendingUp className="w-3 h-3 mr-1.5" /> 
                    Top 25% of borrowers
                </div>
            </div>
        </div>
    );
};

const FactorCard = ({ title, status, value, color, iconName, onClick }) => (
    <div 
        onClick={onClick} 
        className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
    >
        <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors text-blue-700`}>
                <Icon name={iconName} className="w-6 h-6" />
            </div>
            <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
                <p className={`font-bold text-sm ${color.includes('#') ? `text-[${color}]` : color}`}>{status}</p>
            </div>
        </div>
        <div className="text-right mt-2 flex justify-end items-center">
            <p className="text-slate-900 font-bold text-lg">{value}</p>
            <ChevronRight className="w-4 h-4 text-slate-400 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
    </div>
);

const OfferCard = ({ offer }) => (
    <div className={`relative overflow-hidden rounded-2xl p-5 mb-4 ${offer.color} shadow-sm transform transition hover:scale-[1.01]`}>
        <div className="absolute top-0 right-0 p-3 opacity-[0.05] pointer-events-none"><DollarSign className="w-24 h-24 text-blue-900" /></div>
        <div className="relative z-10">
            <div className="inline-block px-2 py-1 bg-blue-100 rounded text-xs font-bold text-blue-700 mb-2 border border-blue-200">{offer.tag}</div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{offer.title}</h3>
            <p className="text-slate-600 text-sm mb-4 max-w-[80%]">{offer.description}</p>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-slate-800 transition-colors shadow-md">{offer.action}</button>
        </div>
    </div>
);

const AccountItem = ({ account, onClick }) => {
    const utilization = account.limit ? Math.min((account.balance / account.limit) * 100, 100) : 0;
    const isHighUtil = utilization > 50;
    
    return (
        <div onClick={() => onClick(account)} className="group relative overflow-hidden bg-white border border-blue-100 rounded-2xl p-5 mb-4 cursor-pointer transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-50 rounded-full blur-3xl group-hover:bg-blue-100 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            
            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-4">
                    <div className={`p-3.5 rounded-2xl bg-slate-50 border border-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                        <Icon name={account.iconName} className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-slate-900 tracking-wide">{account.bank}</h4>
                        <div className="flex items-center space-x-2 mt-0.5">
                            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{account.type}</span>
                            <span className="text-xs text-slate-400 tracking-wider font-mono">•••• {account.accountNumber.slice(-4)}</span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5 font-semibold">Current Balance</span>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">₹{account.balance.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 relative z-10">
                <div className="flex items-center space-x-3">
                    {account.alert ? (
                        <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full border ${account.alert.includes('Interest') || isHighUtil ? 'bg-red-50 border-red-200 text-red-600' : 'bg-yellow-50 border-yellow-200 text-yellow-600'}`}>
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span className="text-xs font-semibold">{account.alert}</span>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-600">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span className="text-xs font-semibold">Healthy</span>
                        </div>
                    )}
                    {account.roi && <div className="hidden sm:block px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600"><span className="text-xs font-medium">{account.roi} ROI</span></div>}
                </div>
                
                <div className="text-right pl-4 flex-1 max-w-[140px]">
                    {account.limit && !account.isLoan ? (
                        <div className="flex flex-col items-end w-full">
                            <div className="flex justify-between w-full text-[10px] text-slate-500 mb-1.5 font-medium"><span>Limit Used</span><span className={isHighUtil ? 'text-red-500' : 'text-green-600'}>{Math.round(utilization)}%</span></div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-1000 ${isHighUtil ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${utilization}%` }}></div></div>
                        </div>
                    ) : (
                        <div className="text-[10px] uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200 inline-block">Active Loan</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AccountDetailView = ({ account, onBack }) => {
    const utilization = Math.min((account.balance / account.limit) * 100, 100);
    const progressColor = utilization > 90 ? 'bg-red-500' : utilization > 50 ? 'bg-yellow-500' : 'bg-green-500';

    return (
        <div className="animate-fade-in-up">
            <div className="flex items-center space-x-3 mb-6">
                <button onClick={onBack} className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200 shadow-sm"><ArrowLeft className="w-5 h-5 text-slate-600" /></button>
                <h1 className="text-xl font-bold text-slate-900">{account.bank} Details</h1>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg mb-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
                <div className="flex items-start justify-between mb-6 relative z-10">
                    <div>
                        <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wide">{account.type}</p>
                        <h2 className="text-4xl font-extrabold text-slate-900">₹{account.balance.toLocaleString()}</h2>
                        <p className="text-xs text-slate-500 mt-2 font-medium">Current Outstanding Balance</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-blue-600 shadow-sm">
                        <Icon name={account.iconName} className="w-8 h-8" />
                    </div>
                </div>

                <div className="mb-2 relative z-10">
                    <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
                        <span>{account.isLoan ? "Principal Repaid" : "Credit Limit Used"}</span>
                        <span className={utilization > 50 ? 'text-red-500' : 'text-green-600'}>{Math.round(utilization)}%</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <div className={`h-full ${progressColor} rounded-full transition-all duration-1000`} style={{ width: `${utilization}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                         <span>₹0</span>
                         <span>Total Limit: ₹{account.limit.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                    <p className="text-slate-500 text-xs mb-1 font-bold uppercase">Interest Rate</p>
                    <p className="text-slate-900 font-bold text-lg">{account.roi || "N/A"}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                     <p className="text-slate-500 text-xs mb-1 font-bold uppercase">Monthly EMI</p>
                     <p className="text-slate-900 font-bold text-lg">{account.emi || "N/A"}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                     <p className="text-slate-500 text-xs mb-1 font-bold uppercase">Date Opened</p>
                     <div className="flex items-center text-slate-900 font-semibold text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                        {account.dateOpened}
                     </div>
                </div>
                 <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                     <p className="text-slate-500 text-xs mb-1 font-bold uppercase">Last Payment</p>
                     <div className="flex items-center text-slate-900 font-semibold text-sm">
                        <Clock className="w-4 h-4 mr-2 text-blue-600" />
                        {account.lastPaymentDate}
                     </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-slate-900 font-bold text-sm">Payment History</h3>
                    <span className="text-xs text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200 font-medium">Recent 12 Months</span>
                </div>
                <div className="flex justify-between items-center px-2">
                    {account.paymentHistory.map((status, index) => (
                        <div key={index} className="flex flex-col items-center group relative">
                            <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full mb-2 transition-all duration-300 group-hover:scale-125 ${status === 0 || status === 'STD' ? 'bg-green-500' : status === 'XXX' ? 'bg-slate-300' : 'bg-red-500'}`}></div>
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-[10px] text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-20 pointer-events-none">
                                {status === 0 || status === 'STD' ? 'On Time' : status === 'XXX' ? 'Unknown' : 'Delayed'}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-3 flex justify-between text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    <span>Dec</span><span>Jan</span>
                </div>
            </div>

            {account.alert && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-5 flex items-start space-x-4 shadow-sm">
                    <div className="p-2 bg-red-100 rounded-full">
                        <Info className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <h4 className="text-red-800 font-bold text-sm">Attention Needed</h4>
                        <p className="text-red-600 text-xs mt-1 leading-relaxed">
                            This account has a {account.alert.toLowerCase()}. 
                            {account.isLoan ? " Consider a balance transfer to lower interest." : " Try to keep utilization below 30% to boost your score."}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

const FactorDetailView = ({ factorKey, data, onBack }) => {
    const factorContent = {
        paymentHistory: {
            title: "Payment History",
            desc: "Payment history accounts for 35% of your credit score. It shows whether you've made your past credit payments on time.",
            tip: "Always pay at least the minimum amount due on time to keep this factor green.",
            iconName: "CheckCircle"
        },
        creditUtilization: {
            title: "Credit Utilization",
            desc: "This accounts for 30% of your score. It is the ratio of your outstanding credit card balances to your total credit card limits.",
            tip: "A utilization ratio above 30% signals high risk to lenders. Try to pay down balances.",
            iconName: "PieChart"
        },
        creditAge: {
            title: "Age of Accounts",
            desc: "This accounts for 15% of your score. It averages the age of your open credit accounts.",
            tip: "Avoid closing old credit cards, as they help increase your average credit age.",
            iconName: "Clock"
        },
        totalAccounts: {
            title: "Total Accounts",
            desc: "This makes up 10% of your score. It looks at the total number of open and closed accounts.",
            tip: "A healthy mix of secured (loans) and unsecured (cards) credit is beneficial.",
            iconName: "CreditCard"
        },
        inquiries: {
            title: "Hard Inquiries",
            desc: "This accounts for 10% of your score. Hard inquiries occur when a lender checks your credit for a new application.",
            tip: "Limit new credit applications. Multiple inquiries in a short time can lower your score.",
            iconName: "Activity"
        }
    };

    const content = factorContent[factorKey];
    const displayValue = data.percentage ? `${data.percentage}%` : (data.age || data.count);

    return (
        <div className="animate-fade-in-up">
            <div className="flex items-center space-x-3 mb-6">
                <button onClick={onBack} className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200 shadow-sm"><ArrowLeft className="w-5 h-5 text-slate-600" /></button>
                <h1 className="text-xl font-bold text-slate-900">{content.title}</h1>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg mb-6">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-slate-500 text-sm mb-1 font-medium">Current Status</p>
                        <h2 className={`text-3xl font-extrabold ${data.color.replace('text-', 'text-')}`.replace('text-[', 'text-[').replace(']', ']')}>{data.status}</h2> 
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-blue-600 shadow-sm">
                        <Icon name={content.iconName} className="w-6 h-6" />
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100">
                    <p className="text-slate-900 font-bold text-xl">{displayValue}</p>
                    <p className="text-slate-500 text-xs mt-1 font-medium uppercase tracking-wide">Measured Value</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
                <h3 className="font-bold text-slate-900 mb-3">What does this mean?</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{content.desc}</p>
            </div>

            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex gap-4 shadow-sm">
                <div className="p-2 bg-white rounded-full shadow-sm h-fit">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h4 className="font-bold text-blue-900 text-sm">Pro Tip</h4>
                    <p className="text-blue-700 text-sm mt-1 leading-relaxed">{content.tip}</p>
                </div>
            </div>
        </div>
    );
};

const FinancialAssistant = ({ onClose, apiResponse }) => {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hi Arun! I'm FinAI, your credit assistant. 🤖\n\nI've analyzed your report. How can I help you save money or improve your score today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (textOverride = null) => {
        const textToSend = textOverride || input;
        if (!textToSend.trim()) return;

        setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
        setInput("");
        setIsLoading(true);

        const response = await callGeminiAPI(textToSend, apiResponse);

        setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        setIsLoading(false);
    };

    const QuickPrompt = ({ text }) => (
        <button onClick={() => handleSend(text)} className="bg-blue-50 border border-blue-200 text-blue-600 text-xs px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors whitespace-nowrap font-medium shadow-sm">{text}</button>
    );

    return (
        <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white shadow-2xl z-[60] flex flex-col animate-slide-in-right border-l border-slate-200 text-slate-800">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white shadow-sm z-10">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-sm">FinAI Assistant</h3>
                        <p className="text-[10px] text-green-600 flex items-center font-medium bg-green-50 px-2 py-0.5 rounded-full w-fit mt-0.5">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span> Online
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 scroll-smooth">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl p-3.5 text-sm shadow-sm ${
                            msg.role === 'user' 
                                ? 'bg-blue-600 text-white rounded-br-none' 
                                : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'
                        }`}>
                            {msg.text.split('\n').map((line, i) => (
                                <p key={i} className={i > 0 ? 'mt-2' : ''} dangerouslySetInnerHTML={{ 
                                    __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                                }} />
                            ))}
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex justify-start mb-4">
                        <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center space-x-2 w-fit">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
                <QuickPrompt text="How do I increase my score?" />
                <QuickPrompt text="Analyze my Axis Bank card" />
                <QuickPrompt text="What offers do you have?" />
            </div>

            <div className="p-4 bg-white border-t border-slate-100 pb-8">
                <div className="flex items-center space-x-2 bg-slate-50 rounded-full px-4 py-2 border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                        placeholder="Ask anything about your finances..." 
                        className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400" 
                    />
                    <button 
                        onClick={() => handleSend()} 
                        disabled={isLoading || !input.trim()} 
                        className="p-2 bg-blue-600 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors shadow-md transform hover:scale-105 active:scale-95"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const ReportView = ({ apiResponse }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const sendReport = async (type) => {
        try {
            const res = await fetch(`${API_BASE_URL}/send-report`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, mobileNumber: "9346521702" })
            });
            const data = await res.json();
            alert(data.message);
        } catch (e) {
            setTimeout(() => alert(`Report successfully sent to your ${type}!`), 500);
        }
    };

    const handleDownload = () => {
        setIsDownloading(true);
        const element = document.getElementById('report-content');
        
        // Safe check for html2pdf
        if (window.html2pdf) {
            const opt = {
                margin: [0.5, 0.5],
                filename: `Happirate_Report_${apiResponse.customer.name.replace(/\s+/g, '_')}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            
            window.html2pdf().set(opt).from(element).save()
                .then(() => setIsDownloading(false))
                .catch((err) => {
                    console.error("PDF Gen Error:", err);
                    setIsDownloading(false);
                    window.print(); // Fallback
                });
        } else {
            console.warn("html2pdf library not found. Falling back to browser print.");
            window.print();
            setIsDownloading(false);
        }
    };

    return (
        <div className="animate-fade-in-up max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 no-print">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Professional Credit Report</h1>
                    <p className="text-slate-500">Comprehensive financial analysis for {apiResponse.customer.name}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => sendReport('whatsapp')} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm hover:shadow-md">
                        <Share2 className="w-4 h-4" /> WhatsApp
                    </button>
                    <button onClick={() => sendReport('email')} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm hover:shadow-md">
                        <Mail className="w-4 h-4" /> Gmail
                    </button>
                    <button onClick={handleDownload} disabled={isDownloading} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-70 disabled:cursor-wait shadow-sm hover:shadow-md">
                        <Download className="w-4 h-4" /> 
                        {isDownloading ? 'Generating...' : 'PDF Download'}
                    </button>
                </div>
            </div>

            <div id="report-content" className="bg-white p-12 rounded-none shadow-2xl border border-slate-200 print-container relative overflow-hidden min-h-[1000px]">
                {/* Subtle Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <h1 className="text-9xl font-bold text-slate-100 rotate-[-45deg] select-none">HAPPIRATE</h1>
                </div>

                <div className="relative z-10">
                    {/* Header */}
                    <div className="border-b-2 border-slate-100 pb-8 mb-8 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-md">H</div>
                            <div>
                                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">Happirate</div>
                                <div className="text-sm text-slate-500 font-medium">Financial Wellness Report</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-bold text-slate-900">{apiResponse.customer.name}</div>
                            <div className="text-sm text-slate-500">Report Date: {new Date().toLocaleDateString()}</div>
                        </div>
                    </div>

                    {/* Executive Summary */}
                    <div className="mb-10">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wider flex items-center">
                            <span className="w-1 h-6 bg-blue-600 mr-3 rounded-full"></span> Executive Summary
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <div className="text-sm text-slate-500 mb-1 font-medium uppercase">CIBIL Score</div>
                                <div className="text-4xl font-extrabold text-blue-600">{apiResponse.customer.score}</div>
                                <div className="text-xs text-green-600 font-bold mt-2 bg-green-100 px-2 py-1 rounded-full w-fit">Excellent</div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <div className="text-sm text-slate-500 mb-1 font-medium uppercase">Total Active Debt</div>
                                <div className="text-4xl font-extrabold text-slate-900">₹12.45L</div>
                                <div className="text-xs text-slate-500 font-medium mt-2">Across 4 Accounts</div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <div className="text-sm text-slate-500 mb-1 font-medium uppercase">Overall Health</div>
                                <div className="text-4xl font-extrabold text-orange-500">Fair</div>
                                <div className="text-xs text-orange-600 font-bold mt-2 bg-orange-100 px-2 py-1 rounded-full w-fit">Action Required</div>
                            </div>
                        </div>
                    </div>

                    {/* Analysis Section */}
                    <div className="mb-10">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wider flex items-center">
                             <span className="w-1 h-6 bg-blue-600 mr-3 rounded-full"></span> Deep Dive Analysis
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-5 p-5 bg-red-50/50 rounded-xl border border-red-100">
                                <div className="p-2 bg-red-100 rounded-lg text-red-600"><AlertCircle className="w-6 h-6" /></div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">High Credit Utilization (Critical)</h3>
                                    <p className="text-slate-600 mt-1 leading-relaxed">
                                        Your Axis Bank Credit Card utilization is currently at <span className="font-bold text-red-600 bg-red-100 px-1 rounded">97%</span> (₹38,095 / ₹39,000). 
                                        Lenders view anything above 30% as high risk. This is the single biggest factor dragging down your score.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-5 p-5 bg-green-50/50 rounded-xl border border-green-100">
                                <div className="p-2 bg-green-100 rounded-lg text-green-600"><CheckCircle className="w-6 h-6" /></div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">Excellent Payment History</h3>
                                    <p className="text-slate-600 mt-1 leading-relaxed">
                                        You have a flawless <span className="font-bold text-green-600 bg-green-100 px-1 rounded">100%</span> on-time payment record. 
                                        Consistency is key, and you are doing great here. Keep this up!
                                    </p>
                                </div>
                            </div>

                             <div className="flex items-start gap-5 p-5 bg-blue-50/50 rounded-xl border border-blue-100">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Info className="w-6 h-6" /></div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">Interest Rate Optimization</h3>
                                    <p className="text-slate-600 mt-1 leading-relaxed">
                                        Your Aptus Housing Loan is currently at <span className="font-bold">17.00%</span> interest. 
                                        Market rates for similar profiles are around 8.50%. This gap indicates you are overpaying significantly on interest.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Plan */}
                    <div className="mb-10 p-6 bg-slate-900 rounded-2xl text-white shadow-xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
                        <h2 className="text-lg font-bold mb-4 uppercase tracking-wider border-b border-slate-700 pb-4">Recommended Action Plan</h2>
                        <ul className="space-y-4 relative z-10">
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                                <div>
                                    <strong className="block text-blue-200">Immediate Action</strong>
                                    <span className="text-slate-300 text-sm">Pay down at least ₹25,000 on your Axis Bank credit card to bring utilization below 30%.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                                <div>
                                    <strong className="block text-blue-200">Balance Transfer</strong>
                                    <span className="text-slate-300 text-sm">Apply for a Housing Loan Balance Transfer with HDFC or SBI to cut your EMI by almost half.</span>
                                </div>
                            </li>
                             <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                                <div>
                                    <strong className="block text-blue-200">Credit Pause</strong>
                                    <span className="text-slate-300 text-sm">Avoid applying for new personal loans for 90 days to let your score recover from recent inquiries.</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-auto pt-8 border-t border-slate-200 text-center">
                        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            This report is generated by Happirate Financial Services based on credit data available as of {new Date().toLocaleDateString()}. 
                            This document is confidential and intended solely for the use of the individual to whom it is addressed. 
                            Not a legal document.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN DASHBOARD COMPONENT ---

const OneScoreDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [selectedFactor, setSelectedFactor] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAiOpen, setIsAiOpen] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initial Fetch on Load
    useEffect(() => {
        // In a real login flow, this ID comes from auth
        const demoMobile = "9346521702"; 

        fetch(`${API_BASE_URL}/dashboard`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobileNumber: demoMobile })
        })
        .then(res => res.json())
        .then(data => {
            setApiResponse(data);
            setIsLoading(false);
        })
        .catch(err => {
            console.warn("Backend unavailable, using mock data for preview.", err);
            // Fallback to mock data if backend fails
            setApiResponse(MOCK_API_RESPONSE);
            setIsLoading(false);
        });
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedAccount(null);
        setSelectedFactor(null);
    };

    if (isLoading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFF6FF] text-slate-500 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="font-medium animate-pulse">Loading Happirate Dashboard...</p>
        </div>
    );

    if (!apiResponse) return <div className="min-h-screen flex items-center justify-center bg-[#EFF6FF] text-red-500">Failed to load data.</div>;

    return (
        <div className="min-h-screen bg-[#EFF6FF] text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 relative overflow-x-hidden">
            {/* STICKY HEADER */}
            <header className="sticky top-0 z-50 bg-[#EFF6FF]/90 backdrop-blur-md border-b border-blue-200/50 shadow-sm transition-all duration-300">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-center">
                    
                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-1 bg-white/50 p-1 rounded-full border border-blue-100">
                        {['dashboard', 'accounts', 'offers', 'report'].map((tab) => (
                            <button 
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                    activeTab === tab 
                                    ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                                    : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                </div>
            </header>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-blue-100 p-4 shadow-lg animate-slide-in-right">
                    {['dashboard', 'accounts', 'offers', 'report'].map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => { handleTabChange(tab); setIsMobileMenuOpen(false); }} 
                            className={`block w-full text-left py-3 px-4 rounded-lg mb-1 font-medium transition-colors ${
                                activeTab === tab ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            )}

            {/* MAIN CONTENT AREA */}
            <main className="max-w-4xl mx-auto px-4 py-8 relative z-10 min-h-[calc(100vh-64px)]">
                
                {/* DASHBOARD TAB */}
                {activeTab === 'dashboard' && !selectedAccount && !selectedFactor && (
                    <div className="animate-fade-in-up space-y-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Hello, {apiResponse.customer.name} 👋</h1>
                                <p className="text-slate-500 mt-1">Here is your financial health overview for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric'})}.</p>
                            </div>
                            <div className="text-sm font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full w-fit">
                                Credit Health: Good
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ScoreGauge score={apiResponse.customer.score} lastUpdated={apiResponse.customer.lastUpdated} />
                            
                            <div className="flex flex-col space-y-4">
                                <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 w-24 h-24 bg-red-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                                    <h3 className="text-slate-900 font-bold mb-3 flex items-center relative z-10">
                                        <div className="p-1.5 bg-red-100 rounded-lg mr-2 text-red-600"><AlertCircle className="w-5 h-5" /></div>
                                        Action Required
                                    </h3>
                                    <p className="text-slate-600 text-sm mb-4 leading-relaxed relative z-10">
                                        Your credit utilization on <b>Axis Bank Credit Card</b> is <span className="text-red-600 font-bold">97%</span>. High utilization negatively impacts your score.
                                    </p>
                                    <button className="text-sm text-blue-600 font-bold hover:text-blue-800 flex items-center relative z-10 group-hover:translate-x-1 transition-transform">
                                        View Tips to improve <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>

                                <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                                    <h3 className="text-slate-900 font-bold mb-3 flex items-center relative z-10">
                                        <div className="p-1.5 bg-green-100 rounded-lg mr-2 text-green-600"><TrendingUp className="w-5 h-5" /></div>
                                        Score Simulation
                                    </h3>
                                    <p className="text-slate-600 text-sm relative z-10">
                                        Paying off <b className="text-slate-900">₹15,000</b> on your credit card could boost your score by <b className="text-green-600">+22 points</b>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-4 px-1">Score Factors</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <FactorCard title="Payment History" status={apiResponse.factors.paymentHistory.status} value={`${apiResponse.factors.paymentHistory.percentage}%`} color={apiResponse.factors.paymentHistory.color} iconName="CheckCircle" onClick={() => setSelectedFactor('paymentHistory')} />
                                <FactorCard title="Credit Utilization" status={apiResponse.factors.creditUtilization.status} value={`${apiResponse.factors.creditUtilization.percentage}%`} color={apiResponse.factors.creditUtilization.color} iconName="PieChart" onClick={() => setSelectedFactor('creditUtilization')} />
                                <FactorCard title="Age of Accounts" status={apiResponse.factors.creditAge.status} value={apiResponse.factors.creditAge.age} color={apiResponse.factors.creditAge.color} iconName="Clock" onClick={() => setSelectedFactor('creditAge')} />
                                <FactorCard title="Total Accounts" status={apiResponse.factors.totalAccounts.status} value={apiResponse.factors.totalAccounts.count} color={apiResponse.factors.totalAccounts.color} iconName="CreditCard" onClick={() => setSelectedFactor('totalAccounts')} />
                                <FactorCard title="Hard Inquiries" status={apiResponse.factors.inquiries.status} value={apiResponse.factors.inquiries.count} color={apiResponse.factors.inquiries.color} iconName="Activity" onClick={() => setSelectedFactor('inquiries')} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-4 px-1">
                                <h2 className="text-xl font-bold text-slate-900">Recommended for You</h2>
                                <button onClick={() => handleTabChange('offers')} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">See all offers</button>
                            </div>
                            <div className="grid gap-4">
                                {apiResponse.offers.slice(0, 1).map(offer => (
                                    <OfferCard key={offer.id} offer={offer} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* FACTOR DETAIL VIEW */}
                {selectedFactor && (
                    <FactorDetailView 
                        factorKey={selectedFactor} 
                        data={apiResponse.factors[selectedFactor]} 
                        onBack={() => setSelectedFactor(null)} 
                    />
                )}

                {/* ACCOUNTS TAB */}
                {activeTab === 'accounts' && !selectedAccount && (
                    <div className="animate-fade-in-up">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-slate-900">Active Accounts</h1>
                            <p className="text-slate-500">Manage your loans and credit cards.</p>
                        </div>
                        <div className="space-y-4">
                            {apiResponse.accounts.map(account => (
                                <AccountItem key={account.id} account={account} onClick={setSelectedAccount} />
                            ))}
                        </div>
                        <div className="mt-8 p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center hover:bg-white transition-colors cursor-pointer group">
                            <p className="text-slate-500 text-sm font-medium group-hover:text-slate-700">Found a discrepancy in your report?</p>
                            <button className="mt-2 text-blue-600 font-bold hover:underline">Raise a Dispute</button>
                        </div>
                    </div>
                )}

                {/* ACCOUNT DETAIL VIEW */}
                {selectedAccount && (
                    <AccountDetailView 
                        account={selectedAccount} 
                        onBack={() => setSelectedAccount(null)} 
                    />
                )}

                {/* OFFERS TAB */}
                {activeTab === 'offers' && !selectedAccount && (
                    <div className="animate-fade-in-up">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-slate-900">Curated Offers</h1>
                            <p className="text-slate-500">Personalized financial products based on your credit profile.</p>
                        </div>
                        <div className="grid gap-6">
                            {apiResponse.offers.map(offer => (
                                <OfferCard key={offer.id} offer={offer} />
                            ))}
                            <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col md:flex-row items-center justify-between hover:shadow-md transition-shadow">
                                <div className="mb-4 md:mb-0">
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Pre-Approved Personal Loan</h3>
                                    <p className="text-slate-600 text-sm">Unlock up to ₹5 Lakhs instantly at 10.99%.</p>
                                </div>
                                <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-slate-500/30">View Details</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* REPORT TAB */}
                {activeTab === 'report' && !selectedAccount && (
                    <ReportView apiResponse={apiResponse} />
                )}

                {/* AI FLOATING BUTTON */}
                {!isAiOpen && (
                    <button 
                        onClick={() => setIsAiOpen(true)}
                        className="fixed bottom-8 right-8 p-4 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform z-50 animate-bounce-subtle border-4 border-white/20"
                        title="Chat with FinAI"
                    >
                        <Sparkles className="w-6 h-6" />
                    </button>
                )}

                {/* AI MODAL */}
                {isAiOpen && <FinancialAssistant onClose={() => setIsAiOpen(false)} apiResponse={apiResponse} />}
            </main>
        </div>
    );
};

export default OneScoreDashboard;