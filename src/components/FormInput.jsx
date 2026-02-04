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
  error
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
          "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-input focus:ring-primary"
        )}
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
            {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
