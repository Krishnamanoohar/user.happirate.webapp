import { cn } from "../lib/utils";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const FormSelect = ({
  label,
  placeholder,
  value,
  onChange,
  options,
  required,
  className,
  error,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            aria-invalid={!!error}
            className={cn(
              "h-12 bg-card border transition-all duration-200 focus:ring-2",
              error
                ? "border-red-500 ring-red-500/20 data-[state=open]:border-red-500"
                : "border-border focus:border-primary focus:ring-primary/20"
            )}
          >
          <SelectValue
            placeholder={placeholder || `Select ${label.toLowerCase()}`}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormSelect;
