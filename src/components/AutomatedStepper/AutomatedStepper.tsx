"use client";

import React from "react";
import { Check, Loader2 } from "lucide-react";

interface Step {
  id: number;
  title: string;
}

interface AutomatedStepperProps {
  currentStep: number;
  steps: Step[];
}

export const AutomatedStepper = ({ currentStep, steps }: AutomatedStepperProps) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-lg font-bold text-gray-900">Application Progress</h2>
      <span className="text-violet-600 font-black text-sm bg-violet-50 px-3 py-1 rounded-full">
        {Math.round((currentStep / steps.length) * 100)}% Complete
      </span>
    </div>
    <div className="relative px-2">
      <div className="absolute top-5 left-5 right-5 h-1 bg-gray-100 rounded-full z-0" />
      <div 
        className="absolute top-5 left-5 h-1 bg-green-500 rounded-full z-0 transition-all duration-1000 ease-in-out"
        style={{ width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 10px)` }}
      />
      <div className="relative z-10 flex justify-between">
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          return (
            <div key={step.id} className="flex flex-col items-center" style={{ width: '8%' }}>
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500
                ${isCompleted ? "bg-green-500 text-white shadow-lg shadow-green-200" : isActive ? "bg-violet-600 text-white ring-4 ring-violet-100 shadow-lg shadow-violet-200" : "bg-gray-100 text-gray-400"}
              `}>
                {isCompleted ? <Check className="w-5 h-5" /> : isActive ? <Loader2 className="w-5 h-5 animate-spin" /> : step.id}
              </div>
              <span className={`mt-3 text-[10px] text-center font-bold leading-tight hidden md:block uppercase tracking-tighter ${isActive || isCompleted ? "text-gray-900" : "text-gray-400"}`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);