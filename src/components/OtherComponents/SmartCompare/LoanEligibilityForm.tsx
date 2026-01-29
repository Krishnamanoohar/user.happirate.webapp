import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Badge } from "@/components/ui/badge";
import { PrivacyPromiseDialog } from "./PrivacyPromiseDialog";
import { clamp, formatINR } from "./utils";
import type { LoanEligibilityInput, LoanOffer } from "./types";

export type EligibilityResult = {
  score: number; // 0-100
  maxEligibleAmount: number;
  emiToIncomeRatio: number;
  tier: "Excellent" | "Good" | "Fair" | "Needs work";
  offers: LoanOffer[];
};

const OFFERS: LoanOffer[] = [
  {
    id: "hdfc",
    lender: "HDFC Bank",
    interestApr: 10.5,
    processingFeePct: 1.0,
    tenureYears: 5,
    maxAmount: 1_000_000,
    badge: "Fast approval",
  },
  {
    id: "bajaj",
    lender: "Bajaj Finserv",
    interestApr: 13.0,
    processingFeePct: 1.25,
    tenureYears: 3,
    maxAmount: 500_000,
    badge: "Lightning",
  },
  {
    id: "sbi",
    lender: "State Bank of India",
    interestApr: 9.7,
    processingFeePct: 0.35,
    tenureYears: 6,
    maxAmount: 1_200_000,
    badge: "Low fee",
  },
  {
    id: "axis",
    lender: "Axis Bank",
    interestApr: 10.25,
    processingFeePct: 1.25,
    tenureYears: 5,
    maxAmount: 900_000,
  },
];

function computeEligibility(input: LoanEligibilityInput): EligibilityResult {
  const emiToIncomeRatio =
    input.monthlyIncome > 0 ? input.outstandingEmi / input.monthlyIncome : 1;

  const creditComponent = clamp((input.creditScore - 300) / 6, 0, 100); // 300-900 => 0-100
  const ratioComponent = clamp(100 - emiToIncomeRatio * 140, 0, 100);
  const enquiriesPenalty = clamp(input.enquiriesLast12m * 6, 0, 35);
  const expBonus = clamp(input.experienceYears * 2.2, 0, 14);

  const employmentBonus =
    input.employmentType === "Salaried"
      ? 10
      : input.employmentType === "Self-employed"
        ? 6
        : 4;
  const cardBonus = input.hasCreditCard ? 4 : 0;

  const base =
    creditComponent * 0.55 +
    ratioComponent * 0.35 +
    expBonus +
    employmentBonus +
    cardBonus;
  const score = clamp(Math.round(base - enquiriesPenalty), 0, 100);

  // Very lightweight heuristic (UI-only): eligible max amount is capped by affordability & credit tier.
  const affordability = clamp(
    input.monthlyIncome * 18 - input.outstandingEmi * 22,
    0,
    5_000_000,
  );
  const creditMultiplier =
    score >= 80 ? 1.15 : score >= 65 ? 1.0 : score >= 50 ? 0.8 : 0.6;
  const maxEligibleAmount = Math.round(affordability * creditMultiplier);

  const tier: EligibilityResult["tier"] =
    score >= 80
      ? "Excellent"
      : score >= 65
        ? "Good"
        : score >= 50
          ? "Fair"
          : "Needs work";

  const offers = OFFERS.map((o) => ({
    ...o,
    maxAmount: Math.min(o.maxAmount, maxEligibleAmount),
  }))
    .filter((o) => o.maxAmount >= Math.min(input.loanAmount, 50_000))
    .sort((a, b) => a.interestApr - b.interestApr);

  return { score, maxEligibleAmount, emiToIncomeRatio, tier, offers };
}

const SAMPLE_INPUT: LoanEligibilityInput = {
  employmentType: "Self-employed",
  experienceYears: 5,
  monthlyIncome: 150_000,
  outstandingEmi: 12_000,
  loanType: "Personal",
  loanAmount: 500_000,
  hasCreditCard: true,
  enquiriesLast12m: 2,
  creditScore: 760,
};

type Props = {
  value: LoanEligibilityInput;
  onChange: (next: LoanEligibilityInput) => void;
};

export function LoanEligibilityForm({ value, onChange }: Props) {
  const [state, setState] = useState<LoanEligibilityInput>({
    employmentType: "Self-employed",
    experienceYears: 5,
    monthlyIncome: 150_000,
    outstandingEmi: 12_000,
    loanType: "Personal",
    loanAmount: 500_000,
    hasCreditCard: true,
    enquiriesLast12m: 2,
    creditScore: 760,
  });

  // const result = useMemo(() => computeEligibility(input), [input]);
  // const state = value;
  // const setState = (
  //   updater: (prev: LoanEligibilityInput) => LoanEligibilityInput,
  // ) => onChange(updater(state));

  const [privacyOpen, setPrivacyOpen] = useState(false);

  const result = useMemo(() => computeEligibility(state), [state]);

  const tierMeta =
    result.tier === "Excellent"
      ? {
          label: "Excellent",
          desc: "Strong profile — you’ll likely get the best rates.",
        }
      : result.tier === "Good"
        ? {
            label: "Good",
            desc: "Healthy profile — multiple lenders should match.",
          }
        : result.tier === "Fair"
          ? {
              label: "Fair",
              desc: "Possible approval — optimizing EMIs can help.",
            }
          : {
              label: "Needs work",
              desc: "Boost your score or reduce obligations.",
            };

  const ratioLabel = clamp(result.emiToIncomeRatio * 100, 0, 99).toFixed(0);
  const scoreWidth = `${result.score}%`;

  return (
    <>
      <PrivacyPromiseDialog
        open={privacyOpen}
        onOpenChange={setPrivacyOpen}
        onContinue={() => {
          setPrivacyOpen(false);
          // UI-only: keeps everything local; just scrolls to results
          document
            .getElementById("offers")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />

      <Card className="glass grain shadow-elevated">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-display text-2xl">
                Check Loan Eligibility
              </CardTitle>
              <CardDescription>
                Quick inputs only — get an instant estimate and lender matches.
              </CardDescription>
            </div>
            <Badge className="glass-strong ring-soft">No personal info</Badge>
          </div>

          <div className="mt-4 rounded-lg glass-strong ring-soft p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Eligibility score</div>
              <div className="text-sm text-muted-foreground">
                {tierMeta.label}
              </div>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-primary-glow"
                style={{ width: scoreWidth }}
              />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {tierMeta.desc}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Employment type</Label>
              <Select
                value={state.employmentType}
                onValueChange={(v) =>
                  setState((s) => ({ ...s, employmentType: v as any }))
                }
              >
                <SelectTrigger className="glass-strong ring-soft">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Salaried">Salaried</SelectItem>
                  <SelectItem value="Self-employed">Self-employed</SelectItem>
                  <SelectItem value="Freelancer">Freelancer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Loan type</Label>
              <Select
                value={state.loanType}
                onValueChange={(v) =>
                  setState((s) => ({ ...s, loanType: v as any }))
                }
              >
                <SelectTrigger className="glass-strong ring-soft">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Home">Home</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Monthly income</Label>
                <div className="text-xs text-muted-foreground">
                  {formatINR(state.monthlyIncome)}
                </div>
              </div>
              <Slider
                value={[state.monthlyIncome]}
                min={10_000}
                max={500_000}
                step={1_000}
                onValueChange={(v) =>
                  setState((s) => ({
                    ...s,
                    monthlyIncome: v[0] ?? s.monthlyIncome,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Outstanding EMI (per month)</Label>
              <Input
                className="glass-strong ring-soft"
                inputMode="numeric"
                value={state.outstandingEmi}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    outstandingEmi: clamp(
                      Number(e.target.value || 0),
                      0,
                      500_000,
                    ),
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Work experience (years)</Label>
              <Input
                className="glass-strong ring-soft"
                inputMode="numeric"
                value={state.experienceYears}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    experienceYears: clamp(Number(e.target.value || 0), 0, 40),
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Credit score</Label>
              <Input
                className="glass-strong ring-soft"
                inputMode="numeric"
                value={state.creditScore}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    creditScore: clamp(Number(e.target.value || 0), 300, 900),
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Loan amount needed</Label>
              <Input
                className="glass-strong ring-soft"
                inputMode="numeric"
                value={state.loanAmount}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    loanAmount: clamp(
                      Number(e.target.value || 0),
                      10_000,
                      5_000_000,
                    ),
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Loan enquiries (last 12 months)</Label>
              <Input
                className="glass-strong ring-soft"
                inputMode="numeric"
                value={state.enquiriesLast12m}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    enquiriesLast12m: clamp(Number(e.target.value || 0), 0, 20),
                  }))
                }
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg glass-strong ring-soft p-4">
            <div className="space-y-1">
              <div className="text-sm font-medium">Credit card</div>
              <div className="text-xs text-muted-foreground">
                Helps build credit history and limit utilization.
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">No</div>
              <Switch
                checked={state.hasCreditCard}
                onCheckedChange={(checked) =>
                  setState((s) => ({ ...s, hasCreditCard: checked }))
                }
              />
              <div className="text-sm text-muted-foreground">Yes</div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg glass-strong ring-soft p-4">
              <div className="text-sm font-medium">EMI-to-income</div>
              <div className="mt-2 flex items-end justify-between">
                <div className="text-display text-3xl">{ratioLabel}%</div>
                <div className="text-xs text-muted-foreground">
                  Lower is better
                </div>
              </div>
            </div>
            <div className="rounded-lg glass-strong ring-soft p-4">
              <div className="text-sm font-medium">Max eligible amount</div>
              <div className="mt-2 flex items-end justify-between">
                <div className="text-display text-3xl">
                  {formatINR(result.maxEligibleAmount)}
                </div>
                <div className="text-xs text-muted-foreground">Estimated</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="hero"
              className="w-full sm:w-auto"
              onClick={(e) => {
                // Radix can interpret the opening click as an outside interaction and immediately close.
                // Defer opening to the next tick so the dialog reliably appears.
                e.preventDefault();
                e.stopPropagation();
                window.setTimeout(() => setPrivacyOpen(true), 0);
              }}
            >
              Find eligible loans
            </Button>
            <Button
              type="button"
              variant="glass"
              className="w-full sm:w-auto"
              onClick={() => onChange(SAMPLE_INPUT)}
            >
              Reset sample
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export { computeEligibility };
