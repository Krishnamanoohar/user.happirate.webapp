import { ShieldCheck, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
};

export function PrivacyPromiseDialog({
  open,
  onOpenChange,
  onContinue,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 glass ring-soft shadow-elevated sm:max-w-[520px]">
        <DialogHeader className="bg-primary px-6 py-5 text-primary-foreground">
          <DialogTitle className="flex items-center gap-2 text-display text-2xl">
            <ShieldCheck className="h-5 w-5" />
            Your privacy, our promise
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 pt-5">
          <p className="text-sm text-muted-foreground">
            Before we show your matches, here’s exactly what happens to your
            data — and what doesn’t.
          </p>

          <ul className="mt-5 space-y-3">
            <li className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">
                  No spam calls or random follow‑ups.
                </div>
                <div className="text-sm text-muted-foreground">
                  Your inputs are for eligibility estimation only — we don’t
                  sell or distribute contact details.
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">You stay in control.</div>
                <div className="text-sm text-muted-foreground">
                  We won’t share your details with lenders unless you explicitly
                  choose to proceed.
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">
                  Minimal data, maximum clarity.
                </div>
                <div className="text-sm text-muted-foreground">
                  We only ask what’s needed to estimate affordability and match
                  offers — nothing extra.
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Transparent, instant results.</div>
                <div className="text-sm text-muted-foreground">
                  You’ll see an estimated eligibility score and sample matches
                  right away — rates may vary by lender checks.
                </div>
              </div>
            </li>
          </ul>

          <div className="mt-6">
            <Button variant="hero" className="w-full" onClick={onContinue}>
              Show my eligible offers
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Prototype note: nothing is stored or sent — everything stays in
              your browser.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
