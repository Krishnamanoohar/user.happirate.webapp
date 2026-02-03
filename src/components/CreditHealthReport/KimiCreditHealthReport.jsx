import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  User,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  Activity,
  MessageCircle,
  X,
  Send,
  Bot,
  Sparkles,
  ArrowRight,
  Shield,
  Wallet,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
  Info,
  Zap,
  Award,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Main App Component
export default function KimiCreditHealthReport() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm your AI Credit Assistant. How can I help you improve your credit score today?",
      time: "Just now",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [userName, setUserName] = useState("Arun Baikani");
  const [creditScore, setCreditScore] = useState(737);
  const [lastUpdated, setLastUpdated] = useState("26 Jan 2026");

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "solutions", label: "Solutions", icon: Zap },
    { id: "get-in-touch", label: "Get In Touch", icon: MessageCircle },
    { id: "emi-calculator", label: "EMI Calculator", icon: Calculator },
    { id: "credit-health", label: "Credit Health", icon: Activity },
    { id: "smart-compares", label: "Smart Compares", icon: Target },
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessages = [
      ...chatMessages,
      { type: "user", text: inputMessage, time: "Just now" },
    ];
    setChatMessages(newMessages);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: getBotResponse(inputMessage),
          time: "Just now",
        },
      ]);
    }, 1000);
  };

  const getBotResponse = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes("score") || lower.includes("cibil")) {
      return 'Your current CIBIL score is 737, which is in the "Good" range. To improve it to "Excellent" (750+), focus on reducing your credit utilization below 30%.';
    }
    if (lower.includes("utilization") || lower.includes("credit card")) {
      return "Your credit utilization is at 97%, which is negatively impacting your score. I recommend paying off at least ₹15,000 to bring it below 30%.";
    }
    if (lower.includes("improve") || lower.includes("tips")) {
      return "Here are 3 quick wins: 1) Pay down credit card balances, 2) Avoid new hard inquiries for 6 months, 3) Set up automatic payments for 100% on-time history.";
    }
    return "I can help you understand your credit factors, suggest improvement strategies, or compare loan offers. What would you like to know?";
  };

  return (
    <div className="min-h-screen pt-20 bg-[#f0f4f8] font-sans text-slate-800">
      {/* Header */}
      {/* <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-xl flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900">
                  Happirate
                </span>
                <span className="block text-xs text-[#6366f1] font-medium -mt-1">
                  Happirate
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center group transition-all duration-300 ${
                    activeTab === item.id
                      ? "text-[#6366f1]"
                      : "text-slate-600 hover:text-[#6366f1]"
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.id === "dashboard" && (
                    <span
                      className={`text-xs mt-0.5 ${activeTab === item.id ? "text-[#6366f1]" : "text-slate-400"}`}
                    >
                      Dashboard
                    </span>
                  )}
                  {item.id === "emi-calculator" && (
                    <span
                      className={`text-xs mt-0.5 ${activeTab === item.id ? "text-[#6366f1]" : "text-slate-400"}`}
                    >
                      Accounts
                    </span>
                  )}
                  <div
                    className={`h-0.5 w-full mt-1 rounded-full transition-all duration-300 ${
                      activeTab === item.id
                        ? "bg-[#6366f1]"
                        : "bg-transparent group-hover:bg-[#6366f1]/30"
                    }`}
                  />
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-600 hover:text-[#6366f1] transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-sm font-bold">
                  AB
                </div>
              </div>

              <button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#6366f1]/30">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pl-8 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900">
            Hello, {userName}
          </h1>
          <p className="text-slate-500 mt-1">
            Here is your financial health overview.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* CIBIL Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/30"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              {/* Score Circle */}
              <div className="relative w-48 h-48 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: creditScore / 900 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-6xl font-bold"
                  >
                    {creditScore}
                  </motion.span>
                  <span className="text-blue-200 text-sm font-medium mt-1">
                    CIBIL SCORE
                  </span>
                </div>
              </div>

              <p className="text-blue-200 text-sm mb-4">
                Last updated: {lastUpdated}
              </p>

              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium">
                  Top 25% of borrowers
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Alerts & Simulation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Action Required */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Action Required
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Your credit utilization on{" "}
                    <span className="font-semibold text-slate-900">
                      Axis Bank Credit Card
                    </span>{" "}
                    is <span className="font-bold text-red-500">97%</span>. High
                    utilization negatively impacts your score.
                  </p>
                  <button className="flex items-center text-[#6366f1] font-semibold hover:gap-2 transition-all group">
                    View Tips to improve
                    <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Score Simulation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Score Simulation
                  </h3>
                  <p className="text-slate-600">
                    Paying off{" "}
                    <span className="font-bold text-slate-900">₹15,000</span> on
                    your credit card could boost your score by{" "}
                    <span className="font-bold text-green-600 text-lg">
                      +22 points
                    </span>
                    .
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Score Factors Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Score Factors
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Payment History */}
            <ScoreFactorCard
              icon={CheckCircle2}
              iconColor="text-blue-500"
              bgColor="bg-blue-50"
              title="PAYMENT HISTORY"
              subtitle="Excellent"
              value="100%"
              status="good"
            />

            {/* Credit Utilization */}
            <ScoreFactorCard
              icon={Activity}
              iconColor="text-red-500"
              bgColor="bg-red-50"
              title="CREDIT UTILIZATION"
              subtitle="Poor"
              subtitleColor="text-red-500"
              value="97%"
              status="bad"
            />

            {/* Age of Accounts */}
            <ScoreFactorCard
              icon={Clock}
              iconColor="text-blue-500"
              bgColor="bg-blue-50"
              title="AGE OF ACCOUNTS"
              subtitle="Good"
              value="5 Yrs 6 Mos"
              status="good"
            />

            {/* Total Accounts */}
            <ScoreFactorCard
              icon={CreditCard}
              iconColor="text-blue-500"
              bgColor="bg-blue-50"
              title="TOTAL ACCOUNTS"
              subtitle="Good"
              value="6"
              status="good"
            />

            {/* Hard Inquiries */}
            <ScoreFactorCard
              icon={Zap}
              iconColor="text-orange-500"
              bgColor="bg-orange-50"
              title="HARD INQUIRIES"
              subtitle="Fair"
              subtitleColor="text-orange-500"
              value="18"
              status="warning"
            />
          </div>
        </motion.div>

        {/* Recommended Section Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-between items-center"
        >
          <h2 className="text-xl font-bold text-slate-900">
            Recommended for You
          </h2>
          <button className="text-[#6366f1] font-semibold hover:underline">
            See all
          </button>
        </motion.div>
      </main>

      {/* Chat Bot */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-96 mb-4 overflow-hidden border border-slate-200"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] p-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      Credit Assistant
                    </h3>
                    <div className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-white/80 text-xs">Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {chatMessages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 ${
                        msg.type === "user"
                          ? "bg-[#6366f1] text-white rounded-br-none"
                          : "bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span
                        className={`text-xs mt-1 block ${
                          msg.type === "user"
                            ? "text-white/70"
                            : "text-slate-400"
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="px-4 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto">
                {[
                  "Improve Score",
                  "Check Utilization",
                  "Loan Offers",
                  "Dispute Error",
                ].map((action) => (
                  <button
                    key={action}
                    onClick={() => {
                      setInputMessage(action);
                      handleSendMessage();
                    }}
                    className="whitespace-nowrap px-3 py-1.5 bg-slate-100 hover:bg-[#6366f1]/10 hover:text-[#6366f1] rounded-full text-xs font-medium transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white border-t border-slate-200">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask about your credit..."
                    className="flex-1 bg-slate-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#6366f1] focus:bg-white transition-all outline-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="w-10 h-10 bg-[#6366f1] hover:bg-[#4f46e5] rounded-full flex items-center justify-center text-white transition-colors shadow-lg shadow-[#6366f1]/30"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white transition-all ${
            isChatOpen
              ? "bg-slate-800 rotate-90"
              : "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:shadow-[#6366f1]/50"
          }`}
        >
          {isChatOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </motion.button>
      </div>

      {/* Floating Sparkle Effect */}
      <div className="fixed bottom-24 right-6 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Sparkles className="w-6 h-6 text-[#6366f1]" />
        </motion.div>
      </div>
    </div>
  );
}

// Score Factor Card Component
function ScoreFactorCard({
  icon: Icon,
  iconColor,
  bgColor,
  title,
  subtitle,
  subtitleColor,
  value,
  status,
}) {
  const getStatusColor = () => {
    switch (status) {
      case "good":
        return "text-slate-900";
      case "bad":
        return "text-red-600";
      case "warning":
        return "text-orange-600";
      default:
        return "text-slate-900";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, shadow: "0 10px 40px -10px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 cursor-pointer group transition-all hover:border-[#6366f1]/30"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}
          >
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold tracking-wider">
              {title}
            </p>
            <p
              className={`text-sm font-medium ${subtitleColor || "text-slate-700"}`}
            >
              {subtitle}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-xl font-bold ${getStatusColor()}`}>{value}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#6366f1] group-hover:translate-x-1 transition-all" />
      </div>
    </motion.div>
  );
}

// Calculator Icon Component
function Calculator({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  );
}
