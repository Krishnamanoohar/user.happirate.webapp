import React from "react";
import {
  TrendingUp,
  CreditCard,
  DollarSign,
  PieChart,
  BarChart3,
  Wallet,
} from "lucide-react";

const Sidebar = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: "investments",
      label: "Total Investments",
      icon: TrendingUp,
      value: "₹347,892",
      change: "+12.4%",
      changePositive: true,
      description: "Portfolio Value",
    },
    {
      id: "loans",
      label: "Total Loans",
      icon: CreditCard,
      value: "₹89,450",
      change: "-2.1%",
      changePositive: false,
      description: "Outstanding Balance",
    },
    {
      id: "income",
      label: "Total Income",
      icon: DollarSign,
      value: "₹12,750",
      change: "+5.2%",
      changePositive: true,
      description: "Monthly Income",
    },
  ];

  return (
    <div className="fixed left-6 top-28 bottom-6 w-80 z-40">
      <div className="h-full bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-3 overflow-y-auto">
        <div className="mb-8">
          <h2
            className="font-bold text-gray-800 mb-2"
            style={{ fontSize: "26px" }}
          >
            Financial Overview
          </h2>
          <p className="text-sm text-gray-600">Monitor your financial health</p>
        </div>

        <div
          className="space-y-4 mb-0"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                style={{ borderRadius: "5px" }}
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full p-3 rounded-2xl transition-all duration-300 group transform hover:scale-[1.02] ${
                  isActive
                    ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/25"
                    : "bg-gray-50/80 hover:bg-gray-100/90 text-gray-700 shadow-lg hover:shadow-xl"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isActive
                        ? "bg-white/20"
                        : "bg-gradient-to-br from-blue-500 to-indigo-600"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-white" : "text-white"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      tab.changePositive
                        ? isActive
                          ? "bg-white/20 text-white"
                          : "bg-green-100 text-green-700"
                        : isActive
                        ? "bg-white/20 text-white"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tab.change}
                  </span>
                </div>
                <div className="text-left">
                  <div
                    className={`text-2xl font-bold mb-1 ${
                      isActive ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {tab.value}
                  </div>
                  <div
                    className={`text-sm font-medium mb-1 ${
                      isActive ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </div>
                  <div
                    className={`text-xs ${
                      isActive ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {tab.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-6 border-t border-gray-200/60">
          <h3
            className="text-sm font-semibold text-gray-700 uppercase tracking-wide"
            style={{ fontSize: "16px" }}
          >
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 rounded-xl transition-all duration-200 group">
              <PieChart className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Portfolio Analysis</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 rounded-xl transition-all duration-200 group">
              <BarChart3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Performance Reports</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 rounded-xl transition-all duration-200 group">
              <Wallet className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Budget Planning</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
