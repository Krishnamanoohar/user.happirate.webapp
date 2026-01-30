import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatINR } from "./utils";
import type { LoanOffer } from "./types";
import { ShieldCheck, Timer, Percent, Wallet } from "lucide-react";

type Props = {
  offers: LoanOffer[];
  requestedAmount: number;
};

export function LoanOffers({ offers, requestedAmount }: Props) {
  return (
    <section id="offers" className="space-y-4 p-0">
      <header className="space-y-2">
        <h2 className="text-display text-2xl">Matched offers</h2>
        <p className="text-sm text-muted-foreground">
          Based on your inputs, these lenders can likely cover{" "}
          {formatINR(requestedAmount)} (or close to it).
        </p>
      </header>

      {offers.length === 0 ? (
        <Card className="glass">
          <CardContent className="p-6">
            <div className="text-sm font-medium">No matches yet</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Try lowering the requested amount, reducing outstanding EMIs, or
              improving credit score.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {offers.map((o) => (
            <Card key={o.id} className="glass ring-soft">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-display text-xl">
                    {o.lender}
                  </CardTitle>
                  {o.badge ? (
                    <Badge className="glass-strong ring-soft">{o.badge}</Badge>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid gap-3 sm:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">
                        {o.interestApr.toFixed(2)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Interest (APR)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">{o.score}</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">
                        {o.tenureYears} years
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Tenure
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">
                        {formatINR(o.maxAmount)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Max amount
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Estimates only — final rates depend on lender checks.
                  </div>
                  <div className="text-sm font-medium">
                    Eligible up to {formatINR(o.maxAmount)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
