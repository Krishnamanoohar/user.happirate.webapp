import React from 'react';
import { Building2, CreditCard as CreditCardIcon } from 'lucide-react';
import DataTable from './DataTable';
import { LoanAccount, CreditCard } from '../types';

const LoansTab: React.FC = () => {
  const loanAccounts: LoanAccount[] = [
    {
      id: '1',
      bank: 'Chase Bank',
      interestRate: 3.5,
      tenure: 30,
      emi: 2247,
      outstanding: 285000
    },
    {
      id: '2',
      bank: 'Wells Fargo',
      interestRate: 4.2,
      tenure: 15,
      emi: 1850,
      outstanding: 165000
    },
    {
      id: '3',
      bank: 'Bank of America',
      interestRate: 5.8,
      tenure: 7,
      emi: 680,
      outstanding: 28500
    }
  ];

  const creditCards: CreditCard[] = [
    {
      id: '1',
      bankName: 'Chase Sapphire',
      creditLimit: 15000,
      utilizedLimit: 3200,
      remainingLimit: 11800
    },
    {
      id: '2',
      bankName: 'American Express Gold',
      creditLimit: 25000,
      utilizedLimit: 8500,
      remainingLimit: 16500
    },
    {
      id: '3',
      bankName: 'Citi Double Cash',
      creditLimit: 12000,
      utilizedLimit: 2100,
      remainingLimit: 9900
    }
  ];

  const loanColumns = [
    {
      key: 'bank',
      label: 'Bank',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-4 h-4 text-orange-600" />
          </div>
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: 'interestRate',
      label: 'Interest Rate',
      sortable: true,
      render: (value: number) => (
        <span className="font-semibold text-orange-600">{value}%</span>
      )
    },
    {
      key: 'tenure',
      label: 'Tenure',
      sortable: true,
      render: (value: number) => (
        <span className="text-gray-600">{value} years</span>
      )
    },
    {
      key: 'emi',
      label: 'EMI',
      sortable: true,
      render: (value: number) => (
        <span className="font-semibold text-gray-900">${value.toLocaleString()}</span>
      )
    },
    {
      key: 'outstanding',
      label: 'Outstanding Balance',
      sortable: true,
      render: (value: number) => (
        <span className="font-bold text-red-600">${value.toLocaleString()}</span>
      )
    }
  ];

  const creditCardColumns = [
    {
      key: 'bankName',
      label: 'Bank Name',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
            <CreditCardIcon className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: 'creditLimit',
      label: 'Credit Limit',
      sortable: true,
      render: (value: number) => (
        <span className="font-semibold text-gray-900">${value.toLocaleString()}</span>
      )
    },
    {
      key: 'utilizedLimit',
      label: 'Utilized Limit',
      sortable: true,
      render: (value: number, row: CreditCard) => {
        const utilizationPercent = (value / row.creditLimit) * 100;
        return (
          <div>
            <span className="font-semibold text-red-600">${value.toLocaleString()}</span>
            <div className="text-xs text-gray-500">{utilizationPercent.toFixed(1)}% utilized</div>
          </div>
        );
      }
    },
    {
      key: 'remainingLimit',
      label: 'Remaining Limit',
      sortable: true,
      render: (value: number) => (
        <span className="font-semibold text-green-600">${value.toLocaleString()}</span>
      )
    },
    {
      key: 'utilization',
      label: 'Utilization',
      render: (value: any, row: CreditCard) => {
        const utilizationPercent = (row.utilizedLimit / row.creditLimit) * 100;
        const isHigh = utilizationPercent > 70;
        const isMedium = utilizationPercent > 30;
        
        return (
          <div className="w-24">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  isHigh ? 'bg-red-500' : isMedium ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${utilizationPercent}%` }}
              ></div>
            </div>
            <div className={`text-xs font-medium ${
              isHigh ? 'text-red-600' : isMedium ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {utilizationPercent.toFixed(1)}%
            </div>
          </div>
        );
      }
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Loan Accounts</h3>
              <p className="text-white/80 text-sm">{loanAccounts.length} active loans</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-2xl font-bold text-white">
                ${loanAccounts.reduce((sum, loan) => sum + loan.outstanding, 0).toLocaleString()}
              </div>
              <div className="text-white/80 text-sm">Total Outstanding</div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <DataTable columns={loanColumns} data={loanAccounts} stickyHeader />
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <CreditCardIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Credit Cards</h3>
              <p className="text-white/80 text-sm">{creditCards.length} active cards</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-2xl font-bold text-white">
                ${creditCards.reduce((sum, card) => sum + card.creditLimit, 0).toLocaleString()}
              </div>
              <div className="text-white/80 text-sm">Total Credit Limit</div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <DataTable columns={creditCardColumns} data={creditCards} stickyHeader />
        </div>
      </div>
    </div>
  );
};

export default LoansTab;