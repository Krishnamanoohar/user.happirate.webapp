"use client";

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { LoanInputs } from '@/lib/eligibility';

interface EligibilityFormProps {
  inputs: LoanInputs;
  onChange: (inputs: LoanInputs) => void;
}

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-gray-700">{label}</Label>
    {children}
  </div>
);

const EligibilityForm = ({ inputs, onChange }: EligibilityFormProps) => {
  const update = (partial: Partial<LoanInputs>) => onChange({ ...inputs, ...partial });

//   return (
//     <div className="space-y-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <FormField label="Employment type">
//           <Select value={inputs.employmentType} onValueChange={(v) => update({ employmentType: v })}>
//             <SelectTrigger className="bg-white border-gray-200 rounded-xl focus:ring-purple-500">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="salaried">Salaried</SelectItem>
//               <SelectItem value="self-employed">Self-employed</SelectItem>
//               <SelectItem value="freelancer">Freelancer</SelectItem>
//               <SelectItem value="business">Business Owner</SelectItem>
//             </SelectContent>
//           </Select>
//         </FormField>

//         <FormField label="Loan type">
//           <Select value={inputs.loanType} onValueChange={(v) => update({ loanType: v })}>
//             <SelectTrigger className="bg-white border-gray-200 rounded-xl focus:ring-purple-500">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="personal">Personal</SelectItem>
//               <SelectItem value="home">Home</SelectItem>
//               <SelectItem value="vehicle">Vehicle</SelectItem>
//               <SelectItem value="education">Education</SelectItem>
//               <SelectItem value="business">Business</SelectItem>
//             </SelectContent>
//           </Select>
//         </FormField>
//       </div>

//       <FormField label="Monthly income">
//         <div className="space-y-4">
//           <div className="flex justify-between items-center">
//             <span className="text-xs text-gray-400">₹10,000</span>
//             <span className="text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-lg">
//               ₹{inputs.monthlyIncome.toLocaleString('en-IN')}
//             </span>
//             <span className="text-xs text-gray-400">₹5,00,000</span>
//           </div>
//           <Slider
//             value={[inputs.monthlyIncome]}
//             onValueChange={([v]) => update({ monthlyIncome: v })}
//             min={10000}
//             max={500000}
//             step={5000}
//             className="py-4"
//           />
//         </div>
//       </FormField>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <FormField label="Outstanding EMI (per month)">
//           <Input
//             type="number"
//             value={inputs.outstandingEMI || ''}
//             onChange={(e) => update({ outstandingEMI: Number(e.target.value) || 0 })}
//             placeholder="0"
//             className="bg-white border-gray-200 rounded-xl focus:ring-purple-500"
//           />
//         </FormField>

//         <FormField label="Work experience (years)">
//           <Input
//             type="number"
//             value={inputs.workExperience || ''}
//             onChange={(e) => update({ workExperience: Math.min(50, Number(e.target.value) || 0) })}
//             placeholder="0"
//             className="bg-white border-gray-200 rounded-xl focus:ring-purple-500"
//           />
//         </FormField>

//         <FormField label="Credit score">
//           <Input
//             type="number"
//             value={inputs.creditScore || ''}
//             onChange={(e) => update({ creditScore: Math.min(900, Number(e.target.value) || 0) })}
//             placeholder="300-900"
//             className="bg-white border-gray-200 rounded-xl focus:ring-purple-500"
//           />
//         </FormField>

//         <FormField label="Loan amount needed">
//           <Input
//             type="number"
//             value={inputs.loanAmountNeeded || ''}
//             onChange={(e) => update({ loanAmountNeeded: Number(e.target.value) || 0 })}
//             placeholder="₹"
//             className="bg-white border-gray-200 rounded-xl focus:ring-purple-500"
//           />
//         </FormField>
//       </div>

//       <div className="bg-gray-50 p-5 rounded-2xl space-y-4 border border-gray-100">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-semibold text-gray-900">Credit card</p>
//             <p className="text-xs text-gray-500">Helps build credit history</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="text-xs font-medium text-gray-400">No</span>
//             <Switch
//               checked={inputs.hasCreditCard}
//               onCheckedChange={(v) => update({ hasCreditCard: v })}
//             />
//             <span className="text-xs font-medium text-purple-600">Yes</span>
//           </div>
//         </div>

//         {inputs.hasCreditCard && (
//           <div className="animate-in fade-in slide-in-from-top-2 duration-300">
//             <FormField label="Credit card outstanding amount">
//               <Input
//                 type="number"
//                 value={inputs.creditCardOutstanding || ''}
//                 onChange={(e) => update({ creditCardOutstanding: Number(e.target.value) || 0 })}
//                 placeholder="0"
//                 className="bg-white border-gray-200 rounded-xl focus:ring-purple-500"
//               />
//             </FormField>
//           </div>
//         )}
//       </div>
//     </div>
//   );
return (
  <div className="space-y-10">

    {/* Top Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

      <FormField label="Employment type">
        <Select value={inputs.employmentType} onValueChange={(v) => update({ employmentType: v })}>
          <SelectTrigger className="h-12 rounded-2xl border border-gray-200 bg-white/90 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="salaried">Salaried</SelectItem>
            <SelectItem value="self-employed">Self-employed</SelectItem>
            <SelectItem value="freelancer">Freelancer</SelectItem>
            <SelectItem value="business">Business Owner</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Loan type">
        <Select value={inputs.loanType} onValueChange={(v) => update({ loanType: v })}>
          <SelectTrigger className="h-12 rounded-2xl border border-gray-200 bg-white/90 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="home">Home</SelectItem>
            <SelectItem value="vehicle">Vehicle</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

    </div>

    {/* Monthly Income Slider */}
    <FormField label="Monthly income">
      <div className="space-y-5">

        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>₹10,000</span>
          <span className="text-purple-600 font-bold text-base">
            ₹{inputs.monthlyIncome.toLocaleString("en-IN")}
          </span>
          <span>₹5,00,000</span>
        </div>

        <Slider
          value={[inputs.monthlyIncome]}
          onValueChange={([v]) => update({ monthlyIncome: v })}
          min={10000}
          max={500000}
          step={5000}
          className="py-3"
        />
      </div>
    </FormField>

    {/* Inputs Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

      <FormField label="Outstanding EMI (per month)">
        <Input
          type="number"
          value={inputs.outstandingEMI || ""}
          onChange={(e) => update({ outstandingEMI: Number(e.target.value) || 0 })}
          className="h-12 rounded-2xl border border-gray-200 bg-white/90 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all"
        />
      </FormField>

      <FormField label="Work experience (years)">
        <Input
          type="number"
          value={inputs.workExperience || ""}
          onChange={(e) => update({ workExperience: Math.min(50, Number(e.target.value) || 0) })}
          className="h-12 rounded-2xl border border-gray-200 bg-white/90 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all"
        />
      </FormField>

      <FormField label="Credit score">
        <Input
          type="number"
          value={inputs.creditScore || ""}
          onChange={(e) => update({ creditScore: Math.min(900, Number(e.target.value) || 0) })}
          className="h-12 rounded-2xl border border-gray-200 bg-white/90 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all"
        />
      </FormField>

      <FormField label="Loan amount needed">
        <Input
          type="number"
          value={inputs.loanAmountNeeded || ""}
          onChange={(e) => update({ loanAmountNeeded: Number(e.target.value) || 0 })}
          className="h-12 rounded-2xl border border-gray-200 bg-white/90 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all"
        />
      </FormField>

    </div>

    {/* Credit Card Section */}
    <div className="rounded-[2rem] border border-purple-100 bg-gradient-to-br from-white to-purple-50/40 p-6 shadow-inner">

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-base font-semibold text-gray-900">Credit card</p>
          <p className="text-sm text-gray-500">Helps build credit history and limit utilization.</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">No</span>
          <Switch
            checked={inputs.hasCreditCard}
            onCheckedChange={(v) => update({ hasCreditCard: v })}
          />
          <span className="text-xs font-medium text-purple-600">Yes</span>
        </div>
      </div>

      {inputs.hasCreditCard && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <FormField label="Credit card outstanding amount">
            <Input
              type="number"
              value={inputs.creditCardOutstanding || ""}
              onChange={(e) => update({ creditCardOutstanding: Number(e.target.value) || 0 })}
              className="h-12 rounded-2xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all"
            />
          </FormField>
        </div>
      )}

    </div>
  </div>
);
};

export default EligibilityForm;