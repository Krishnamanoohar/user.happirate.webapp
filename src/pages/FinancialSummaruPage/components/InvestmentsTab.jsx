import React from "react";
import { Landmark, TrendingUp, BarChart3, Shield } from "lucide-react";
import InvestmentCard from "./InvestmentCard";
import DataTable from "./DataTable";

const InvestmentsTab = () => {
  const fixedDeposits = [
    {
      id: "1",
      institution: "Chase Bank",
      interestRate: 4.5,
      amount: 50000,
      maturityDate: "2025-06-15",
    },
    {
      id: "2",
      institution: "Wells Fargo",
      interestRate: 4.2,
      amount: 75000,
      maturityDate: "2025-12-20",
    },
    {
      id: "3",
      institution: "Bank of America",
      interestRate: 4.8,
      amount: 30000,
      maturityDate: "2024-09-10",
    },
  ];

  const mutualFunds = [
    {
      id: "1",
      institution: "Vanguard",
      avgInterestRate: 12.5,
      amount: 85000,
      status: "active",
    },
    {
      id: "2",
      institution: "Fidelity",
      avgInterestRate: 10.8,
      amount: 62000,
      status: "active",
    },
    {
      id: "3",
      institution: "Charles Schwab",
      avgInterestRate: 11.2,
      amount: 45000,
      status: "pending",
    },
  ];

  const stocks = [
    {
      id: "1",
      platform: "Robinhood",
      variableRateLabel: "High Growth",
      amount: 45000,
      status: "active",
    },
    {
      id: "2",
      platform: "E*TRADE",
      variableRateLabel: "Dividend Focus",
      amount: 38000,
      status: "active",
    },
    {
      id: "3",
      platform: "TD Ameritrade",
      variableRateLabel: "Tech Sector",
      amount: 52000,
      status: "active",
    },
  ];

  const bonds = [
    {
      id: "1",
      institution: "US Treasury",
      interestRate: 3.8,
      amount: 25000,
      maturityDate: "2027-03-15",
    },
    {
      id: "2",
      institution: "Corporate Bond - Apple",
      interestRate: 4.2,
      amount: 15000,
      maturityDate: "2026-08-20",
    },
  ];

  const fdColumns = [
    {
      key: "institution",
      label: "Institution",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Landmark className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: "interestRate",
      label: "Interest Rate",
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-blue-600">{value}%</span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-gray-900">
          ₹{value.toLocaleString()}
        </span>
      ),
    },
    {
      key: "maturityDate",
      label: "Maturity Date",
      sortable: true,
      render: (value) => (
        <span className="text-gray-600">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const mfColumns = [
    {
      key: "institution",
      label: "Institution",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: "avgInterestRate",
      label: "Avg. Interest Rate",
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-green-600">{value}%</span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-gray-900">
          ₹{value.toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : value === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
  ];

  const stockColumns = [
    {
      key: "platform",
      label: "Platform",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-purple-600" />
          </div>
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: "variableRateLabel",
      label: "Variable Rate Label",
      sortable: true,
      render: (value) => (
        <span className="font-medium text-purple-600">{value}</span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-gray-900">
          ₹{value.toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : value === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
  ];

  const bondColumns = [
    {
      key: "institution",
      label: "Institution",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: "interestRate",
      label: "Interest Rate",
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-indigo-600">{value}%</span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-gray-900">
          ₹{value.toLocaleString()}
        </span>
      ),
    },
    {
      key: "maturityDate",
      label: "Maturity Date",
      sortable: true,
      render: (value) => (
        <span className="text-gray-600">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const totalFD = fixedDeposits.reduce((sum, fd) => sum + fd.amount, 0);
  const totalMF = mutualFunds.reduce((sum, mf) => sum + mf.amount, 0);
  const totalStocks = stocks.reduce((sum, stock) => sum + stock.amount, 0);
  const totalBonds = bonds.reduce((sum, bond) => sum + bond.amount, 0);

  return (
    <div className="space-y-4">
      <InvestmentCard
        title="Fixed Deposits"
        icon={<Landmark className="w-6 h-6 text-white" />}
        totalAmount={`₹${totalFD.toLocaleString()}`}
        count={fixedDeposits.length}
        gradient="bg-gradient-to-br from-blue-500 to-blue-700"
      >
        <DataTable columns={fdColumns} data={fixedDeposits} />
      </InvestmentCard>

      <InvestmentCard
        title="Mutual Funds"
        icon={<TrendingUp className="w-6 h-6 text-white" />}
        totalAmount={`₹${totalMF.toLocaleString()}`}
        count={mutualFunds.length}
        gradient="bg-gradient-to-br from-green-500 to-green-700"
      >
        <DataTable columns={mfColumns} data={mutualFunds} />
      </InvestmentCard>

      <InvestmentCard
        title="Stocks"
        icon={<BarChart3 className="w-6 h-6 text-white" />}
        totalAmount={`₹${totalStocks.toLocaleString()}`}
        count={stocks.length}
        gradient="bg-gradient-to-br from-purple-500 to-purple-700"
      >
        <DataTable columns={stockColumns} data={stocks} />
      </InvestmentCard>

      <InvestmentCard
        title="Bonds"
        icon={<Shield className="w-6 h-6 text-white" />}
        totalAmount={`₹${totalBonds.toLocaleString()}`}
        count={bonds.length}
        gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
      >
        <DataTable columns={bondColumns} data={bonds} />
      </InvestmentCard>
    </div>
  );
};

export default InvestmentsTab;
