"use client";

import React from "react";
import type { LenderMatch } from "@/lib/eligibility";
import { Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LenderMatchesProps {
  lenders: LenderMatch[];
}

const LenderMatches = ({ lenders }: LenderMatchesProps) => {
  if (lenders.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
        <p className="text-gray-500 font-medium">
          Improve your score to see lender matches.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {lenders.map((lender, i) => (
        <div
          key={lender.name}
          className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 group cursor-pointer animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/20 text-white font-bold text-sm">
                  {lender.logo}
                </div>{" "}
              </div>
              <div>
                <p className="text-base font-bold text-gray-900">
                  {lender.name}
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  {lender.tenure} · {lender.processingFee} fee
                </p>
              </div>
            </div>
            <div className="text-right flex items-center gap-6">
              <div>
                <p className="text-lg font-black text-purple-600">
                  {lender.interestRate}% p.a.
                </p>
                <div className="flex items-center justify-end gap-1">
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase px-1.5 py-0.5 rounded",
                      lender.approval === "High"
                        ? "bg-green-100 text-green-700"
                        : lender.approval === "Medium"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700",
                    )}
                  >
                    {lender.approval} Approval
                  </span>
                </div>
              </div>
              {/* <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LenderMatches;
