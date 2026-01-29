import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { clamp, formatINR } from "../../lib/utils";

const SAMPLE_INPUT = {
  employmentType: "Self-employed",
  loanType: "Personal",
  monthlyIncome: 150000,
  outstandingEmi: 12000,
  experienceYears: 5,
  creditScore: 760,
  loanAmount: 500000,
  enquiriesLast12m: 0,
  hasCreditCard: true,
};

export function NewCompareLoanApplication({ value = SAMPLE_INPUT, onChange }) {
  // Ensure we have a fallback if value is undefined
  const state = value || SAMPLE_INPUT;

  const setState = (updater) => {
    const nextState = typeof updater === "function" ? updater(state) : updater;
    onChange(nextState);
  };

  const score = useMemo(() => {
    const ratio =
      state.monthlyIncome > 0 ? state.outstandingEmi / state.monthlyIncome : 1;
    const base = (state.creditScore - 300) / 6;
    return clamp(Math.round(base - ratio * 50), 0, 100);
  }, [state]);

  const emiRatio = useMemo(() => {
    if (!state.monthlyIncome) return 0;
    return Math.round((state.outstandingEmi / state.monthlyIncome) * 100);
  }, [state.monthlyIncome, state.outstandingEmi]);

  const maxEligible = Math.round(
    state.monthlyIncome * 24 - state.outstandingEmi * 12,
  );

  return (
    <Card className="w-full max-w-3xl mx-auto bg-slate-50/50 shadow-sm border-slate-200">
      <CardHeader className="relative">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Check Loan Eligibility
            </CardTitle>
            <CardDescription className="text-slate-500">
              Quick inputs only — get an instant estimate and lender matches.
            </CardDescription>
          </div>
          <div className="h-6 w-24 rounded-full border border-slate-200 bg-white" />
        </div>

        <div className="mt-6 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-slate-700">
              Eligibility score
            </span>
            <span className="text-sm font-medium text-emerald-600">
              Excellent
            </span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-400 font-medium">
            Strong profile — you'll likely get the best rates.
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">
              Employment type
            </Label>
            <Select
              value={state.employmentType}
              onValueChange={(v) => setState({ ...state, employmentType: v })}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Self-employed">Self-employed</SelectItem>
                <SelectItem value="Salaried">Salaried</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">Loan type</Label>
            <Select
              value={state.loanType}
              onValueChange={(v) => setState({ ...state, loanType: v })}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Home">Home</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label className="text-slate-700 font-semibold">
                Monthly income
              </Label>
              <span className="text-xs text-slate-400 font-mono">
                {formatINR(state.monthlyIncome)}
              </span>
            </div>
            <Slider
              defaultValue={[state.monthlyIncome]}
              value={[state.monthlyIncome]}
              max={500000}
              step={1000}
              onValueChange={([v]) => setState({ ...state, monthlyIncome: v })}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">
              Outstanding EMI (per month)
            </Label>
            <Input
              type="number"
              value={state.outstandingEmi}
              onChange={(e) =>
                setState({ ...state, outstandingEmi: Number(e.target.value) })
              }
              className="bg-white"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label className="text-slate-700 font-semibold">
                Work experience (years)
              </Label>
              <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                {state.experienceYears} Years
              </span>
            </div>
            <Slider
              defaultValue={[state.experienceYears]}
              value={[state.experienceYears]}
              max={40}
              onValueChange={([v]) =>
                setState({ ...state, experienceYears: v })
              }
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">Credit score</Label>
            <Input
              type="number"
              value={state.creditScore}
              onChange={(e) =>
                setState({ ...state, creditScore: Number(e.target.value) })
              }
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">
              Loan amount needed
            </Label>
            <Input
              type="number"
              value={state.loanAmount}
              onChange={(e) =>
                setState({ ...state, loanAmount: Number(e.target.value) })
              }
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">
              Loan enquiries (last 12 months)
            </Label>
            <Input
              type="number"
              value={state.enquiriesLast12m}
              onChange={(e) =>
                setState({ ...state, enquiriesLast12m: Number(e.target.value) })
              }
              className="bg-white"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
          <div className="space-y-0.5">
            <div className="text-sm font-semibold text-slate-700">
              Credit card
            </div>
            <div className="text-xs text-slate-400">
              Helps build credit history and limit utilization.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">No</span>
            <Switch
              checked={state.hasCreditCard}
              onCheckedChange={(v) => setState({ ...state, hasCreditCard: v })}
            />
            <span className="text-xs text-slate-400">Yes</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white border-slate-200 shadow-none">
            <CardContent className="p-4">
              <div className="text-sm font-semibold text-slate-700">
                EMI-to-income
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-3xl font-bold">{emiRatio}%</span>
                <span className="text-[10px] text-slate-400 mt-2">
                  Lower is better
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-none">
            <CardContent className="p-4">
              <div className="text-sm font-semibold text-slate-700">
                Max eligible amount
              </div>
              <div className="flex justify-between items-end mt-2">
                <span className="text-3xl font-bold">
                  {formatINR(maxEligible)}
                </span>
                <span className="text-[10px] text-slate-400 pb-1">
                  Estimated
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-3 pt-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg font-bold text-base shadow-lg shadow-blue-200">
            Find eligible loans
          </Button>
          <Button
            variant="outline"
            type="button"
            className="px-8 py-6 rounded-lg font-bold text-base border-slate-200 text-slate-600 bg-white"
            onClick={() => onChange(SAMPLE_INPUT)}
          >
            Reset sample
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
