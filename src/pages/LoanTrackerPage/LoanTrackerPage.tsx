"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  PartyPopper,
  Phone,
  Eye,
  Download,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoanOfferCard } from "@/components/LoanOfferCard/LoanOfferCard";
import { AutomatedStepper } from "@/components/AutomatedStepper/AutomatedStepper";
import { useLocation } from "react-router-dom";
const STEP_DATA = [
  {
    id: 1,
    title: "Application Submitted",
    status: "We’ve received your application and it's now in our system.",
  },
  {
    id: 2,
    title: "Initial Review",
    status:
      "Your basic details are verified and sent for next-level processing.",
  },
  {
    id: 3,
    title: "Document Verification",
    status: "Your documents are under verification by our operations team.",
  },
  {
    id: 4,
    title: "Credit Assessment",
    status:
      "We will assess your credit profile once document verification is done.",
  },
  {
    id: 5,
    title: "Approval & Offer",
    status:
      "If approved, your personalized offer will be available for review.",
  },
  {
    id: 6,
    title: "Final Disbursement",
    status: "The loan amount will be transferred to your bank account.",
  },
];

const LoanTrackerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const trackerData = location.state;
  const [currentStep] = useState(2);
  const loanData = {
    applicant: trackerData?.applicant || "Applicant",
    referenceId: trackerData?.referenceId || "N/A",
    loanType: trackerData?.loanType || "Personal Loan",
    status: currentStep === STEP_DATA.length ? "Disbursed" : "Processing",
    sanctionedAmount: trackerData?.sanctionedAmount
      ? new Intl.NumberFormat("en-IN").format(trackerData.sanctionedAmount)
      : "0",
    apr: trackerData?.apr ? `${trackerData.apr}%` : "N/A",
    tenure: trackerData?.tenure || "N/A",
  };

  const currentStepData = STEP_DATA.find((s) => s.id === currentStep);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 mt-15">
      <main className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-500 rounded-2xl shadow-lg shadow-violet-200">
              {currentStep === STEP_DATA.length ? (
                <PartyPopper className="w-8 h-8 text-white" />
              ) : (
                <Clock className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                {currentStep === STEP_DATA.length
                  ? "Loan Disbursed!"
                  : "Application Tracker"}
              </h1>
              <p className="text-gray-500 font-medium">
                Real-time status of your loan request
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/")}
            className="
      bg-gray-200 
      text-gray-700 
      hover:bg-violet-600 
      hover:text-white 
      transition-all 
      duration-300 
      rounded-xl
      px-6
      h-10
      shadow-sm
    "
          >
            Back to Home
          </Button>
        </div>

        <div className="space-y-8">
          <LoanOfferCard data={loanData} />

          <AutomatedStepper currentStep={currentStep} steps={STEP_DATA} />

          {currentStepData && (
            <div
              className={`bg-white rounded-2xl border-l-8 p-8 shadow-sm transition-all duration-500 ${currentStep === STEP_DATA.length ? "border-l-green-500" : "border-l-violet-600"}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black text-gray-900">
                  Step {currentStep}: {currentStepData.title}
                </h2>
                {currentStep < STEP_DATA.length && (
                  <Loader2 className="w-6 h-6 text-violet-600 animate-spin" />
                )}
              </div>
              <p className="text-gray-600 text-xl leading-relaxed font-medium">
                {currentStepData.status}
              </p>
            </div>
          )}

          {/* 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <Phone className="w-6 h-6 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-500 text-sm mb-4">Our Relationship Managers are available 24/7.</p>
              <button className="text-blue-600 font-black text-sm hover:underline">Call Support</button>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <Eye className="w-6 h-6 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-2">View Details</h3>
              <p className="text-gray-500 text-sm mb-4">Review your submitted application and documents.</p>
              <button className="text-blue-600 font-black text-sm hover:underline">View Application</button>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <Download className="w-6 h-6 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-2">Documents</h3>
              <p className="text-gray-500 text-sm mb-4">Download your provisional sanction letter.</p>
              <button className="text-blue-600 font-black text-sm hover:underline">Download Files</button>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default LoanTrackerPage;
