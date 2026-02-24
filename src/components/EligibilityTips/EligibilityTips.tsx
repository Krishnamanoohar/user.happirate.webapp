"use client";

import React from 'react';
import type { EligibilityResult, LoanInputs } from '@/lib/eligibility';
import { Lightbulb, TrendingUp, CreditCard, Timer, Banknote, Sparkles } from 'lucide-react';

interface TipsProps {
  result: EligibilityResult;
  inputs: LoanInputs;
}

const EligibilityTips = ({ result, inputs }: TipsProps) => {
  const tips: { icon: React.ReactNode; text: string }[] = [];

  if (inputs.creditScore < 750) {
    tips.push({ icon: <TrendingUp className="w-4 h-4" />, text: 'Aim for a credit score above 750 for the best interest rates.' });
  }
  if (result.emiToIncome > 40) {
    tips.push({ icon: <Banknote className="w-4 h-4" />, text: 'Try reducing existing EMIs to improve your debt-to-income ratio.' });
  }
  if (!inputs.hasCreditCard) {
    tips.push({ icon: <CreditCard className="w-4 h-4" />, text: 'Having a credit card with a good repayment history can boost your score.' });
  }
  if (inputs.loanEnquiries > 3) {
    tips.push({ icon: <Timer className="w-4 h-4" />, text: 'Too many loan enquiries can hurt your score. Space them out over time.' });
  }
  if (inputs.loanAmountNeeded > result.maxEligibleAmount) {
    tips.push({ icon: <Banknote className="w-4 h-4" />, text: 'The requested amount exceeds your estimated eligibility. Consider reducing it.' });
  }

  if (tips.length === 0) {
    tips.push({ icon: <Sparkles className="w-4 h-4" />, text: 'Your profile looks strong! You\'re well-positioned for competitive loan offers.' });
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wider">
        <Lightbulb className="w-4 h-4 text-purple-600" />
        Personalized Tips
      </h3>
      <div className="space-y-3">
        {tips.map((tip, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100/50 animate-in fade-in slide-in-from-left-4"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="text-purple-600 mt-0.5 shrink-0 bg-white p-1.5 rounded-lg shadow-sm">{tip.icon}</span>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EligibilityTips;