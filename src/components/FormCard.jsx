import { cn } from "../lib/utils";

const FormCard = ({ title, subtitle, children, className }) => {
  return (
    <div
      className={cn(
        "bg-card rounded-xl border border-border shadow-card p-6 md:p-8",
        className,
      )}
    >
      {(title || subtitle) && (
        <div className="mb-6 pb-4 border-b border-border">
          {title && (
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default FormCard;
