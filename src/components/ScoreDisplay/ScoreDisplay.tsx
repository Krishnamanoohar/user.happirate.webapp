"use client";

import React from 'react';
import type { EligibilityResult } from '@/lib/eligibility';
import { formatCurrency } from '@/lib/eligibility';
import { TrendingUp, TrendingDown, Percent, IndianRupee, Clock, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScoreDisplayProps {
  result: EligibilityResult;
}

const ScoreDisplay = ({ result }: ScoreDisplayProps) => {
  const tierColor = {
    Excellent: 'text-green-600',
    Good: 'text-blue-600',
    Fair: 'text-orange-500',
    Poor: 'text-red-500',
  }[result.tier];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Eligibility score</h3>
          <span className={cn("text-lg font-bold px-3 py-1 bg-opacity-10", tierColor, 
            result.tier === 'Excellent' ? 'text-green-500' : 
            result.tier === 'Good' ? 'text-blue-500' : 
            result.tier === 'Fair' ? 'text-orange-500' : 'text-red-500'
          )}>
            {result.tier}
          </span>
        </div>
<div className="h-2.5 w-full rounded-full bg-gray-200/70 overflow-hidden">
  <div
    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600 transition-all duration-700 ease-out"
    style={{ width: `${result.score}%` }}
  />
</div>
        <p className="text-sm text-gray-600 font-medium">{result.message}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          icon={<Percent className="w-4 h-4" />}
          label="EMI-to-income"
          value={`${result.emiToIncome}%`}
          sub={result.emiToIncome < 40 ? 'Healthy' : 'High'}
          subIcon={result.emiToIncome < 40 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
          positive={result.emiToIncome < 40}
        />
        <StatCard
          icon={<IndianRupee className="w-4 h-4" />}
          label="Max eligible amount"
          value={formatCurrency(result.maxEligibleAmount)}
          sub="Estimated"
        />
        <StatCard
          icon={<Clock className="w-4 h-4" />}
          label="Monthly EMI estimate"
          value={formatCurrency(result.monthlyEMIEstimate)}
          sub="For 5-year tenure"
        />
        <StatCard
          icon={<Shield className="w-4 h-4" />}
          label="Interest rate range"
          value={`${result.interestRateRange[0]}% – ${result.interestRateRange[1]}%`}
          sub="Per annum"
        />
      </div>
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  sub,
  subIcon,
  positive,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  subIcon?: React.ReactNode;
  positive?: boolean;
}) => (
<div className="bg-white p-5 rounded-2xl 
  border border-purple-100 
  shadow-[0_4px_12px_rgba(139,92,246,0.08)]
  hover:shadow-[0_10px_25px_rgba(139,92,246,0.18)]
  hover:border-purple-300
  hover:-translate-y-1
  transition-all duration-300 ease-out">
    <div className="flex items-center gap-2 text-gray-400 mb-2">
      <div className="p-1.5 bg-gray-50 rounded-lg">{icon}</div>
      <span className="text-xs font-bold uppercase tracking-tight">{label}</span>
    </div>
    <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
    <div className={cn(
      "flex items-center gap-1 text-xs font-semibold",
      positive !== undefined ? (positive ? 'text-green-600' : 'text-red-500') : 'text-gray-500'
    )}>
      {subIcon}
      <span>{sub}</span>
    </div>
  </div>
);

export default ScoreDisplay;