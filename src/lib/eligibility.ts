export interface LoanInputs {
  employmentType: string;
  loanType: string;
  monthlyIncome: number;
  outstandingEMI: number;
  workExperience: number;
  creditScore: number;
  loanAmountNeeded: number;
  loanEnquiries: number;
  hasCreditCard: boolean;
  creditCardOutstanding: number;
}

export interface EligibilityResult {
  score: number;
  tier: "Excellent" | "Good" | "Fair" | "Poor";
  message: string;
  emiToIncome: number;
  maxEligibleAmount: number;
  monthlyEMIEstimate: number;
  interestRateRange: [number, number];
}

export interface LenderMatch {
  name: string;
  interestRate: number;
  maxAmount: number;
  processingFee: string;
  tenure: string;
  approval: string;
}

export function calculateEligibility(inputs: LoanInputs): EligibilityResult {
  let score = 0;

  // Credit score (max 35)
  if (inputs.creditScore >= 750) score += 35;
  else if (inputs.creditScore >= 700) score += 25;
  else if (inputs.creditScore >= 650) score += 15;
  else if (inputs.creditScore >= 600) score += 5;
  else score += 0;

  // EMI-to-income ratio
  const totalEMI =
    inputs.outstandingEMI +
    (inputs.hasCreditCard ? inputs.creditCardOutstanding * 0.05 : 0);
  const emiToIncome =
    inputs.monthlyIncome > 0 ? (totalEMI / inputs.monthlyIncome) * 100 : 100;

  if (emiToIncome < 20) score += 25;
  else if (emiToIncome < 40) score += 15;
  else if (emiToIncome < 60) score += 5;
  else score += 0;

  // Work experience (max 10)
  if (inputs.workExperience >= 5) score += 10;
  else if (inputs.workExperience >= 2) score += 5;

  // Employment stability (max 10)
  if (inputs.employmentType === "salaried") score += 10;
  else if (inputs.employmentType === "self-employed") score += 5;

  // Credit card discipline (max 10)
  if (
    inputs.hasCreditCard &&
    inputs.creditCardOutstanding < inputs.monthlyIncome * 0.3
  )
    score += 10;
// Loan enquiries (max 10)
if (inputs.loanEnquiries <= 1) score += 10;
else if (inputs.loanEnquiries <= 3) score += 5;

  score = Math.max(0, Math.min(100, score));

  const tier =
    score >= 80
      ? "Excellent"
      : score >= 60
        ? "Good"
        : score >= 40
          ? "Fair"
          : "Poor";
  const messages: Record<string, string> = {
    Excellent: "Strong profile — you'll likely get the best rates.",
    Good: "Good profile — competitive offers expected.",
    Fair: "Average profile — some options available with conditions.",
    Poor: "Needs improvement — consider boosting your credit score first.",
  };

  const availableIncome = inputs.monthlyIncome - totalEMI;
  const maxEMI = availableIncome * 0.5;
  const baseRate = score >= 80 ? 9 : score >= 60 ? 12 : score >= 40 ? 15 : 18;
  const maxEligibleAmount = Math.max(
    0,
    Math.round((maxEMI * 12 * 5) / (1 + (baseRate / 100) * 5)),
  );
  const monthlyEMIEstimate =
    inputs.loanAmountNeeded > 0
      ? Math.round(
          (inputs.loanAmountNeeded * (1 + (baseRate / 100) * 5)) / (5 * 12),
        )
      : 0;

  return {
    score,
    tier,
    message: messages[tier],
    emiToIncome: Math.round(emiToIncome * 10) / 10,
    maxEligibleAmount,
    monthlyEMIEstimate,
    interestRateRange: [baseRate, baseRate + 3],
  };
}

export function getSampleLenders(
  result: EligibilityResult,
  loanType: string,
): LenderMatch[] {
  if (result.score < 30) return [];

  const lenders: LenderMatch[] = [
    {
      name: "HDFC Bank",
      interestRate: result.interestRateRange[0],
      maxAmount: result.maxEligibleAmount * 1.2,
      processingFee: "0.5%",
      tenure: "Up to 7 years",
      approval: result.score >= 70 ? "High" : "Medium",
    },
    {
      name: "SBI",
      interestRate: result.interestRateRange[0] - 0.5,
      maxAmount: result.maxEligibleAmount * 1.1,
      processingFee: "0.35%",
      tenure: "Up to 5 years",
      approval: result.score >= 60 ? "High" : "Medium",
    },
    {
      name: "ICICI Bank",
      interestRate: result.interestRateRange[0] + 0.5,
      maxAmount: result.maxEligibleAmount,
      processingFee: "0.75%",
      tenure: "Up to 6 years",
      approval: result.score >= 65 ? "High" : "Low",
    },
    {
      name: "Bajaj Finserv",
      interestRate: result.interestRateRange[0] + 1,
      maxAmount: result.maxEligibleAmount * 0.9,
      processingFee: "1%",
      tenure: "Up to 5 years",
      approval: "Medium",
    },
  ];

  return lenders.filter(
    (_, i) => i < (result.score >= 70 ? 4 : result.score >= 50 ? 3 : 2),
  );
}

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}
