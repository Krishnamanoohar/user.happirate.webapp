import { useEffect, useState } from "react";
import { LenderCard, Lender } from "@/components/LendarCard/LenderCard";
import { ComparisonTable } from "@/components/ComparisonTable/ComparisonTable";
import { DetailedComparison } from "@/components/DetailedComparison/DetailedComparison";
import { PreSanctionLetter } from "@/components/PreSancsionLetter/PreSanctionLetter";
import { ProvisionalOfferLetter } from "@/components/ProvisionalOfferLetter/ProvisionalOfferLetter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import FunnyLoader from "./CompareLoanPageLoader";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Table,
  ArrowRight,
  X,
  Search,
  Calculator,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { fetchEligibleLoanProducts } from "@/api/api";

type ViewMode = "grid" | "table";
type Stage = "compare" | "detailed" | "letter" | "psl";
type ComparisonTab = "max-sanction" | "customize";

const CompareLoanPage = () => {
  const navigate = useNavigate();
  const [selectedLoanType] = useState("personal");
  const [selectedLenders, setSelectedLenders] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [stage, setStage] = useState<Stage>("compare");
  const [comparisonTab, setComparisonTab] =
    useState<ComparisonTab>("max-sanction");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [formattedAmount, setFormattedAmount] = useState<string>("");
  const [selectedForLetter, setSelectedForLetter] = useState<Lender | null>(
    null,
  );
  const [submittedAmount, setSubmittedAmount] = useState<number | null>(null);
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [loading, setLoading] = useState(false);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [loanTenure, setLoanTenure] = useState<number>(0);

  const handleSelectLender = (id: string) => {
    if (selectedLenders.includes(id)) {
      setSelectedLenders(selectedLenders.filter((l) => l !== id));
    } else if (selectedLenders.length < 2) {
      setSelectedLenders([...selectedLenders, id]);
    }
  };

  const handleCompare = () => {
    if (selectedLenders.length === 2) {
      setStage("detailed");
    }
  };

  const handleSelectForLetter = (lender: Lender) => {
    setSelectedForLetter({
      ...lender,
      requestedAmount:
        comparisonTab === "customize" ? submittedAmount : undefined,
    });
    setStage("letter");
  };

  const handleApplyNow = (lender: Lender) => {
    setSelectedForLetter({
      ...lender,
      requestedAmount:
        comparisonTab === "customize" ? submittedAmount : undefined,
    });
    setStage("letter");
  };

  const handleBackToCompare = () => {
    setStage("compare");
    setSelectedForLetter(null);
  };

  const handleClosePSL = () => {
    setStage("compare");
  };

  const handleFetchEligibleLoans = async (amount: number, tenure: number, type: string, applicationID: string) => {
    try {
      console.log("Fetching eligible loans for amount:", amount, "tenure:", tenure, "and ApplicaionID:", applicationID);
      setLoading(true);

      const resp = await fetchEligibleLoanProducts(amount, tenure, type, applicationID);

      const banks = resp.data.banks.map((bank: any) => ({
        id: bank.bankId,
        name: bank.bankName,
        logo: bank.bankId,
        type: "Bank",
        maxSanctionAmount: bank.maximumEligibleLoanAmount,
        trueAPR: bank.interestRate,
        tenureOptions: bank.tenureOptions || "12-84 months",
        processingFeeMin: bank.processingFee.min,
        processingFeeMax: bank.processingFee.max,
        approvalProbability: bank.approvalProbability,
        disbursalTime: bank.disbursalTime,
        prepaymentCharges: bank.prePaymentCharges,
        pros: [
          "Fastest approval",
          "Lowest APR for existing customers",
          "Flexible EMI options",
        ],
        cons: [
          "Strict eligibility criteria",
          "Higher processing fee for new customers",
        ],
        uniqueAdvantages: [
          "Zero foreclosure after 12 months for salaried",
          "Top-up loan facility",
        ],
        restrictions: ["Minimum income ₹25,000/month", "Age: 21-60 years"],
      }));

      setLenders(banks);
    } catch (error) {
      console.log("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const formatIndianNumber = (value: string) => {
    const numeric = value.replace(/\D/g, "");
    if (!numeric) return "";

    return new Intl.NumberFormat("en-IN").format(Number(numeric));
  };

  const filteredLenders =
    comparisonTab === "customize" && submittedAmount
      ? lenders.filter((l) => l.maxSanctionAmount >= submittedAmount)
      : lenders;

  const selectedLenderObjects = lenders
    .filter((l) => selectedLenders.includes(l.id))
    .map((l) => ({
      ...l,
      requestedAmount:
        comparisonTab === "customize" ? submittedAmount : undefined,
    }));

  useEffect(() => {
    const savedLoanData = JSON.parse(
      sessionStorage.getItem("loanData") || "{}",
    );
    const applicationID = sessionStorage.getItem("applicationId") || ""
    setFormattedAmount(formatIndianNumber(savedLoanData.loanAmount || ""));
    console.log("Loaded loan data from localStorage:", savedLoanData);

    const amount = Number(savedLoanData.loanAmount) || 0;
    const tenure = Number(savedLoanData.loanTenure) || 0;
    const type = String(savedLoanData.loanType) || ""
    setLoanAmount(amount);
    setLoanTenure(tenure);

    if (amount && tenure) {
      handleFetchEligibleLoans(amount, tenure, type, applicationID);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="flex justify-center">
        <main className="w-full max-w-6xl mx-auto px-4 py-10">
          {stage === "compare" && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-8">
                <Button
                  variant="ghost"
                  onClick={() => {
                    const savedLoanData = JSON.parse(
                      localStorage.getItem("loanData") || "{}",
                    );
                    sessionStorage.setItem(
                      "loanData",
                      JSON.stringify({
                        ...savedLoanData,
                        loanType: selectedLoanType, // update only type
                      }),
                    );

                    navigate("/loan-application", {
                      state: { goToStep: 3 },
                    });
                  }}
                  className="
                  flex items-center gap-2
                  text-gray-500
                  bg-gray-200
                  hover:bg-purple-600
                  hover:text-white
                  hover:shadow-md
                  !rounded-xl
                  transition-all mt-18
                "
                >
                  ← Back to Loan Application
                </Button>
              </div>

              <section className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Compare {filteredLenders.length} Lenders
                  </h2>
                  <p className="text-muted-foreground">
                    Find the best loan offers tailored to your needs
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex bg-white border rounded-xl p-1 shadow-sm">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        viewMode === "grid"
                          ? "bg-purple-600 text-white shadow-sm"
                          : "text-gray-500 hover:text-gray-900",
                      )}
                    >
                      <LayoutGrid className="w-4 h-4" />
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode("table")}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        viewMode === "table"
                          ? "bg-purple-600 text-white shadow-sm"
                          : "text-gray-500 hover:text-gray-900",
                      )}
                    >
                      <Table className="w-4 h-4" />
                      Table
                    </button>
                  </div>

                  {selectedLenders.length === 2 && (
                    <Button
                      onClick={handleCompare}
                      className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold px-6 h-11 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      Compare Now
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </section>

              {/* Tabs Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
                    <button
                      onClick={() => setComparisonTab("max-sanction")}
                      className={cn(
                        "flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all",
                        comparisonTab === "max-sanction"
                          ? "bg-white text-purple-600 shadow-sm"
                          : "text-gray-500 hover:text-gray-700",
                      )}
                    >
                      <TrendingUp className="w-4 h-4" />
                      Max Sanction
                    </button>
                    <button
                      onClick={() => setComparisonTab("customize")}
                      className={cn(
                        "flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all",
                        comparisonTab === "customize"
                          ? "bg-white text-purple-600 shadow-sm"
                          : "text-gray-500 hover:text-gray-700",
                      )}
                    >
                      <Calculator className="w-4 h-4" />
                      Customize Amount
                    </button>
                  </div>

                  {comparisonTab === "customize" && (
                    <div className="flex items-center gap-3 w-full md:w-auto animate-in slide-in-from-right-4 duration-300">
                      <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Enter loan amount (e.g. 500000)"
                          value={formattedAmount}
                          onChange={(e) => {
                            const raw = e.target.value.replace(/\D/g, "");
                            setCustomAmount(raw);
                            setFormattedAmount(formatIndianNumber(raw));
                          }}
                          className="pl-10 rounded-xl border-gray-200 focus:ring-purple-500"
                        />
                      </div>
                      <Button
                        onClick={() => {
                          if (!customAmount || !loanTenure) return;

                          const amount = Number(customAmount);

                          setSubmittedAmount(amount); // 👈 important
                          setLoanAmount(amount);

                          handleFetchEligibleLoans(amount, loanTenure);
                        }}
                        disabled={!customAmount}
                        className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Submit
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {selectedLenders.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedLenderObjects.map((lender) => (
                    <div
                      key={lender.id}
                      className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold border border-purple-100 shadow-sm"
                    >
                      {lender.name}
                      <button
                        onClick={() => handleSelectLender(lender.id)}
                        className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <span className="text-sm text-gray-500 self-center ml-2">
                    {selectedLenders.length}/2 selected for comparison
                  </span>
                </div>
              )}

              {loading ? (
                <FunnyLoader />
              ) : (
                <div className="space-y-6">
                  {filteredLenders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
                      <p className="text-gray-500">
                        No lenders found for this amount. Try a lower amount.
                      </p>
                    </div>
                  ) : viewMode === "grid" ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredLenders.map((lender) => (
                        <LenderCard
                          key={lender.id}
                          lender={lender}
                          isSelected={selectedLenders.includes(lender.id)}
                          onSelect={handleSelectLender}
                          disabled={
                            selectedLenders.length >= 2 &&
                            !selectedLenders.includes(lender.id)
                          }
                          onApplyNow={handleApplyNow}
                          customAmount={
                            comparisonTab === "customize"
                              ? (submittedAmount ?? undefined)
                              : undefined
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    <ComparisonTable
                      lenders={filteredLenders}
                      selectedLenders={selectedLenders}
                      onSelectLender={handleSelectLender}
                      onApplyNow={handleApplyNow}
                      customAmount={
                        comparisonTab === "customize"
                          ? Number(customAmount)
                          : undefined
                      }
                    />
                  )}
                </div>
              )}

              <p className="text-center text-muted-foreground text-sm mt-12">
                Select any 2 lenders to compare, or click "Apply Now" to start
                your application directly.
              </p>
            </div>
          )}

          {stage === "psl" && (
            <ProvisionalOfferLetter
              onClose={handleClosePSL}
              onApplyNow={handleApplyNow}
            />
          )}

          {stage === "detailed" && selectedLenderObjects.length === 2 && (
            <div>
              <Button
                variant="ghost"
                onClick={handleBackToCompare}
                className="mb-6 text-gray-500 hover:bg-purple-600 hover:text-white rounded-xl transition-all mt-20"
              >
                ← Back to all lenders
              </Button>
              <h2 className="text-3xl font-bold text-center mb-8">
                Side-by-Side Comparison
              </h2>
              <DetailedComparison
                lender1={selectedLenderObjects[0]}
                lender2={selectedLenderObjects[1]}
                onSelectForLetter={handleSelectForLetter}
              />
            </div>
          )}

          {stage === "letter" && selectedForLetter && (
            <PreSanctionLetter
              lender={selectedForLetter}
              loanType={selectedLoanType}
              onBack={handleBackToCompare}
            />
          )}
        </main>
      </div>

      <footer className="bg-white border-t py-12 mt-20">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © 2026 Happirate. All loan offers are subject to lender terms and
            conditions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CompareLoanPage;
