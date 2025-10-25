export function calculateLoanEMI(principal, annualRate, tenureYears) {
  console.log("principal, annualRate, tenureYears", principal, annualRate, tenureYears)

  const monthlyRate = annualRate / 12 / 100;
  const months = tenureYears * 12;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalAmount = emi * months;
  const totalInterest = totalAmount - principal;

  return {
    monthlyEMI: emi.toFixed(2),
    totalPrincipal: principal?.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
  };
}
