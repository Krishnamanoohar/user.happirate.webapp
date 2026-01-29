import { cn } from "../lib/utils";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Lock } from "lucide-react";

const FormInput = ({
  label,
  placeholder,
  value,
  onChange,
  required,
  type = "text",
  className,
  disabled,
  hint,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium text-foreground flex items-center gap-2">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
        {disabled && <Lock className="w-3 h-3 text-muted-foreground" />}
      </Label>
      <Input
        type={type}
        placeholder={placeholder || label}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={cn(
          "h-12 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/60",
          disabled
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-card",
        )}
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
};

export default FormInput;
