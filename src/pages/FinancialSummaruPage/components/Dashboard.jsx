import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import InvestmentsTab from "./InvestmentsTab";
import LoansTab from "./LoansTab";
import IncomeTab from "./IncomeTab";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("investments");

  const renderContent = () => {
    switch (activeTab) {
      case "investments":
        return <InvestmentsTab />;
      case "loans":
        return <LoansTab />;
      case "income":
        return <IncomeTab />;
      default:
        return <InvestmentsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.1),transparent_50%),radial-gradient(circle_at_40%_60%,rgba(34,197,94,0.05),transparent_50%)]"></div>

      {/* <Navbar /> */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="ml-96 pt-32 pr-8 pb-8">
        <div className="max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {activeTab === "investments" && "Investment Portfolio"}
              {activeTab === "loans" && "Loans & Credit"}
              {activeTab === "income" && "Income Sources"}
            </h1>
            <p className="text-gray-600">
              {activeTab === "investments" &&
                "Track and manage your investment portfolio across different asset classes"}
              {activeTab === "loans" &&
                "Monitor your loan accounts and credit card utilization"}
              {activeTab === "income" &&
                "Overview of your income streams and earning patterns"}
            </p>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
