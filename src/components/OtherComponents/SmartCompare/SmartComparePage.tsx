"use client";

import React, { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Sparkles,
  RotateCcw,
  LayoutDashboard,
} from "lucide-react";
import EligibilityForm from "@/components/EligibilityForm/EligibilityForm";
import ScoreDisplay from "@/components/ScoreDisplay/ScoreDisplay";
import LenderMatches from "@/components/LenderMatches/LenderMatches";
import EligibilityTips from "@/components/EligibilityTips/EligibilityTips";
import {
  calculateEligibility,
  getSampleLenders,
  type LoanInputs,
} from "@/lib/eligibility";
import { useNavigate } from "react-router-dom";

const defaultInputs: LoanInputs = {
  employmentType: "salaried",
  loanType: "personal",
  monthlyIncome: 150000,
  outstandingEMI: 12000,
  workExperience: 5,
  creditScore: 760,
  loanAmountNeeded: 500000,
  loanEnquiries: 2,
  hasCreditCard: true,
  creditCardOutstanding: 0,
};

const SmartComparePage = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<LoanInputs>(defaultInputs);

  const result = useMemo(() => {
  const r = calculateEligibility(inputs);
  return r;
}, [inputs]);
  const lenders = useMemo(
    () => getSampleLenders(result, inputs.loanType),
    [result, inputs.loanType],
  );

  const handleReset = () => setInputs(defaultInputs);

  return (
    <div className="min-h-screen bg-[#F8F7FF] relative overflow-hidden mt-10">
      {/* Ambient glow orbs */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-200/30 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-violet-200/30 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <header className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            Know your eligibility{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600 drop-shadow-sm">
              in minutes.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Tune inputs and instantly see how lenders might respond — no
            personal info needed.
          </p>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Form & Score */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Check Loan Eligibility
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    Quick inputs only — get an instant estimate.
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="border-purple-200 text-purple-600 bg-purple-50/50 gap-1.5 px-4 py-1.5 rounded-full font-bold"
                >
                  <ShieldCheck className="w-4 h-4" />
                  No personal info
                </Badge>
              </div>

              {/* Score Bar Section */}
              <div className="mb-12">
                <ScoreDisplay result={result} />
              </div>

              <div className="pt-8 border-t border-gray-100">
                <EligibilityForm inputs={inputs} onChange={setInputs} />
              </div>

              <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-100">
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  className="gap-2 text-gray-400 bg-gray-100 hover:text-purple-600 hover:bg-purple-50 rounded-xl font-bold"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Inputs
                </Button>
                {/* <Button
                  onClick={() => navigate("/compare-loans")}
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-8 py-6 font-bold shadow-lg shadow-purple-500/20 flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  View Detailed Comparison
                </Button> */}
              </div>
            </div>
          </div>

          {/* Right: Results & Tips */}
          {/* Right: Results & Tips */}
          <div className="lg:col-span-5 space-y-8 h-fit">
            {" "}
            {/* Added h-fit here */}
            <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-xl">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Results Analysis
                </h2>
              </div>

              <Tabs defaultValue="eligibility" className="w-full">
                {/* Tab Switcher with Violet Active State */}
                <TabsList className="w-full bg-gray-100/50 p-1 rounded-xl mb-6 grid grid-cols-2">
                  <TabsTrigger
                    value="eligibility"
                    className="py-2.5 rounded-lg font-bold transition-all
            data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                  >
                    Check Eligibility
                  </TabsTrigger>
                  <TabsTrigger
                    value="matches"
                    className="py-2.5 rounded-lg font-bold transition-all
            data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                  >
                    Lender Matches
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="eligibility"
                  className="mt-0 animate-in fade-in duration-500"
                >
                  {/* Reduced padding from py-12 to py-8 to fix height issue */}
                  <div className="text-center py-8 bg-gradient-to-b from-purple-50 to-white rounded-[2rem] border border-purple-100/50 shadow-inner mb-6">
                    <p className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-violet-700">
                      {result.score}
                    </p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                      out of 100
                    </p>
                  </div>

                  <EligibilityTips result={result} inputs={inputs} />
                </TabsContent>

                <TabsContent
                  value="matches"
                  className="mt-0 animate-in fade-in duration-500"
                >
                  <LenderMatches lenders={lenders} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartComparePage;
