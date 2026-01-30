export type EmploymentType = "Salaried" | "Self-employed" | "Freelancer";
export type LoanType = "Personal" | "Home" | "Business" | "Education";

export type LoanEligibilityInput = {
  creditCardOutstandingAmount: any;
  employmentType: EmploymentType;
  experienceYears: number;
  monthlyIncome: number;
  outstandingEmi: number;
  loanType: LoanType;
  loanAmount: number;
  hasCreditCard: boolean;
  enquiriesLast12m: number;
  creditScore: number;
};

export type LoanOffer = {
    id: string;
    lender: string;
    interestApr: number;
    score: number;
    tenureYears: number;
    maxAmount: number;
    badge?: string;
};
