import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoanEligibilityForm, computeEligibility } from "./LoanEligibilityForm";
import { LoanOffers } from "./LoanOffers";
import { InteractiveBackdrop } from "./InteractiveBackdrop";
import type { LoanEligibilityInput } from "./types";

const SmartComparePage = () => {
  console.log("SMART COMPARE");
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

  return (
    <div className="min-h-screen bg-app">
      {/* <InteractiveBackdrop className="relative min-h-screen" /> */}
      <div className="relative">
        {/* <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl glass ring-soft shadow-glow" />
            <div className="leading-tight">
              <div className="text-display text-base">LoanLens</div>
              <div className="text-xs text-muted-foreground">
                Eligibility & offers
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="glass"
              size="sm"
              onClick={() =>
                document
                  .getElementById("offers")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View offers
            </Button>
            <Button
              variant="hero"
              size="sm"
              onClick={() =>
                document
                  .getElementById("form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Start
            </Button>
          </div>
        </header> */}

        <main className="mx-auto w-full max-w-6xl px-6 pb-16">
          {/* <section className="grid gap-8 pb-10 pt-4 lg:grid-cols-12 lg:items-start"> */}
          <section className="grid gap-8 pb-10 pt-4 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
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
                    className="w-full sm:w-auto"
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
                    className="w-full sm:w-auto"
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
            </div>

            <div className="lg:col-span-7">
              <div id="form" className="scroll-mt-24">
                <LoanEligibilityForm value={input} onChange={setInput} />
              </div>
            </div>
          </section>

          <LoanOffers
            offers={result.offers}
            requestedAmount={input.loanAmount}
          />
        </main>

        <footer className="mx-auto w-full max-w-6xl px-6 pb-10">
          <div className="glass ring-soft rounded-xl p-4 text-xs text-muted-foreground">
            This page is a UI prototype (no backend). Add authentication + saved
            applications if you want persistence.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SmartComparePage;
