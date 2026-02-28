"use client";

import React from "react";

interface LoanOfferCardProps {
  data: {
    applicant: string;
    referenceId: string;
    loanType: string;
    status: string;
    sanctionedAmount: string;
    apr: string;
    tenure: string;
  };
}

export const LoanOfferCard = ({ data }: LoanOfferCardProps) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
    <h2 className="text-lg font-bold text-gray-900 mb-6">Accepted Loan Offer</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Applicant</p>
        <p className="text-gray-900 font-semibold">{data.applicant}</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Reference ID</p>
        <p className="text-gray-900 font-semibold">{data.referenceId}</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Loan Type</p>
        <p className="text-gray-900 font-semibold">{data.loanType}</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Status</p>
        <span className={`font-bold ${data.status === 'Disbursed' ? 'text-green-600' : 'text-orange-500'}`}>
          {data.status}
        </span>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 pt-6 border-t border-gray-100">
      <div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Sanctioned Amount</p>
        <p className="text-green-600 text-2xl font-black">₹ {data.sanctionedAmount}</p>
      </div>
      <div className="lg:col-start-3">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">APR</p>
        <p className="text-gray-900 font-semibold">{data.apr}</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Tenure</p>
        <p className="text-gray-900 font-semibold">{data.tenure}</p>
      </div>
    </div>
  </div>
);