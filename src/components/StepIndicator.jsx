import { Check } from "lucide-react";
import { cn } from "../lib/utils";

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    isCompleted && "bg-success text-success-foreground",
                    isCurrent &&
                      "bg-primary text-primary-foreground shadow-lg shadow-primary/30",
                    !isCompleted &&
                      !isCurrent &&
                      "bg-muted text-muted-foreground",
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium text-center max-w-[120px] leading-tight",
                    isCurrent && "text-primary",
                    isCompleted && "text-success",
                    !isCompleted && !isCurrent && "text-muted-foreground",
                  )}
                >
                  {step.title}
                </span>
              </div>
              {!isLast && (
                <div className="flex-1 mx-3 h-0.5 -mt-6">
                  <div
                    className={cn(
                      "h-full transition-all duration-300",
                      isCompleted ? "bg-success" : "bg-border",
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
