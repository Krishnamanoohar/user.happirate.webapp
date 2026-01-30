import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoanEligibilityForm, computeEligibility } from "./LoanEligibilityForm";
import { LoanOffers } from "./LoanOffers";
import type { LoanEligibilityInput, LoanOffer } from "./types";

const SmartComparePage = () => {
  const [input, setInput] = useState<LoanEligibilityInput>({
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

  const result = useMemo(() => computeEligibility(input), [input]);

  const [apiOffers, setApiOffers] = useState<LoanOffer[]>([]);
  const [showOffers, setShowOffers] = useState(false); // ✅ controls right side

  return (
    <div className="min-h-screen bg-app">
      <main className="mx-auto w-full max-w-6xl px-6 pb-16">
        <section className="grid gap-8 pb-10 pt-4 lg:grid-cols-12 lg:items-start">
          {/* LEFT — FORM */}
          <div className="lg:col-span-7">
            <div id="form" className="scroll-mt-24">
              <LoanEligibilityForm
                value={input}
                onChange={setInput}
                onEligibilityResult={(offers) => {
                  setApiOffers(offers);
                  setShowOffers(true); // ✅ switch view
                }}
              />
            </div>
          </div>

          {/* RIGHT — CONDITIONAL */}
          <div className="lg:col-span-5">
            {!showOffers ? (
              /* BEFORE SUBMIT */
              <div className="space-y-5">
                <h1 className="text-display text-4xl leading-[1.05] sm:text-5xl">
                  Know your eligibility in{" "}
                  <span className="text-primary">minutes</span>.
                </h1>

                <p className="text-base text-muted-foreground">
                  A Keytom-style, glassy experience for quick loan checks — tune
                  inputs and instantly see how lenders might respond.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    variant="hero"
                    onClick={() =>
                      document
                        .getElementById("form")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Check eligibility
                  </Button>

                  <Button
                    variant="glass"
                    onClick={() =>
                      document
                        .getElementById("offers")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    See sample matches
                  </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="glass ring-soft rounded-xl p-4">
                    <div className="text-xs text-muted-foreground">
                      Sample score
                    </div>
                    <div className="text-display text-2xl">
                      {result.score}/100
                    </div>
                  </div>

                  <div className="glass ring-soft rounded-xl p-4">
                    <div className="text-xs text-muted-foreground">Tier</div>
                    <div className="text-display text-2xl">{result.tier}</div>
                  </div>

                  <div className="glass ring-soft rounded-xl p-4">
                    <div className="text-xs text-muted-foreground">Matches</div>
                    <div className="text-display text-2xl">
                      {result.offers.length}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* AFTER SUBMIT */
              <LoanOffers
                offers={apiOffers}
                requestedAmount={input.loanAmount}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SmartComparePage;
