import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import DataTable from './DataTable';
import { MonthlyIncome, OtherIncome } from '../types';

const IncomeTab: React.FC = () => {
  const monthlyIncome: MonthlyIncome[] = [
    {
      id: '1',
      source: 'Software Engineer - TechCorp',
      amount: 8500,
      frequency: 'monthly'
    },
    {
      id: '2',
      source: 'Freelance Development',
      amount: 2200,
      frequency: 'bi-weekly'
    },
    {
      id: '3',
      source: 'Investment Dividends',
      amount: 450,
      frequency: 'quarterly'
    },
    {
      id: '4',
      source: 'Rental Property Income',
      amount: 1600,
      frequency: 'monthly'
    }
  ];

  const otherIncome: OtherIncome[] = [
    {
      id: '1',
      source: 'Tax Refund',
      amount: 3200,
      frequency: 'annual'
    },
    {
      id: '2',
      source: 'Bonus Payment',
      amount: 5000,
      frequency: 'irregular'
    },
    {
      id: '3',
      source: 'Side Business Revenue',
      amount: 1800,
      frequency: 'seasonal'
    },
    {
      id: '4',
      source: 'Consulting Project',
      amount: 4500,
      frequency: 'one-time'
    }
  ];

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'weekly':
      case 'monthly':
        return 'bg-green-100 text-green-800';
      case 'bi-weekly':
      case 'quarterly':
        return 'bg-blue-100 text-blue-800';
      case 'annual':
      case 'seasonal':
        return 'bg-yellow-100 text-yellow-800';
      case 'irregular':
      case 'one-time':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrequencyProgress = (frequency: string) => {
    switch (frequency) {
      case 'weekly': return 100;
      case 'bi-weekly': return 85;
      case 'monthly': return 70;
      case 'quarterly': return 55;
      case 'annual': return 40;
      case 'seasonal': return 30;
      case 'irregular': return 20;
      case 'one-time': return 10;
      default: return 0;
    }
  };

  const monthlyIncomeColumns = [
    {
      key: 'source',
      label: 'Source',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-green-600" />
          </div>
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (value: number) => (
        <span className="font-bold text-green-600 text-lg">${value.toLocaleString()}</span>
      )
    },
    {
      key: 'frequency',
      label: 'Frequency',
      sortable: true,
      render: (value: string) => (
        <div className="space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getFrequencyColor(value)}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
          <div className="w-20">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${getFrequencyProgress(value)}%` }}
              ></div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const otherIncomeColumns = [
    {
      key: 'source',
      label: 'Source',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (value: number) => (
        <span className="font-bold text-emerald-600 text-lg">${value.toLocaleString()}</span>
      )
    },
    {
      key: 'frequency',
      label: 'Frequency',
      sortable: true,
      render: (value: string) => (
        <div className="space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getFrequencyColor(value)}`}>
            {value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ')}
          </span>
          <div className="w-20">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${getFrequencyProgress(value)}%` }}
              ></div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const totalMonthlyIncome = monthlyIncome.reduce((sum, income) => sum + income.amount, 0);
  const totalOtherIncome = otherIncome.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className="space-y-8">
      <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Monthly Income</h3>
              <p className="text-white/80 text-sm">{monthlyIncome.length} regular sources</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-2xl font-bold text-white">
                ${totalMonthlyIncome.toLocaleString()}
              </div>
              <div className="text-white/80 text-sm">Total Monthly</div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <DataTable columns={monthlyIncomeColumns} data={monthlyIncome} stickyHeader />
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Other Income</h3>
              <p className="text-white/80 text-sm">{otherIncome.length} additional sources</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-2xl font-bold text-white">
                ${totalOtherIncome.toLocaleString()}
              </div>
              <div className="text-white/80 text-sm">Total Other</div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <DataTable columns={otherIncomeColumns} data={otherIncome} stickyHeader />
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Income Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700">Monthly Income Breakdown</h4>
            {monthlyIncome.map((income) => {
              const percentage = (income.amount / totalMonthlyIncome) * 100;
              return (
                <div key={income.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 truncate">{income.source}</span>
                    <span className="text-sm text-gray-600">${income.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700">Other Income Breakdown</h4>
            {otherIncome.map((income) => {
              const percentage = (income.amount / totalOtherIncome) * 100;
              return (
                <div key={income.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 truncate">{income.source}</span>
                    <span className="text-sm text-gray-600">${income.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeTab;