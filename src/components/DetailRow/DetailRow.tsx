interface DetailRowProps {
  label: string;
  value: string | number | undefined;
  highlight?: boolean;
  masked?: boolean;
}

const DetailRow = ({ label, value, highlight = false, masked = false }: DetailRowProps) => {
  const displayValue = value || "—";
  const maskedValue =
    masked && typeof value === "string" && value.length > 4
      ? "•••• •••• " + value.slice(-4)
      : displayValue;

  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-violet-50 transition-colors group">
      <span className="text-md text-muted-foreground">{label}</span>
      <span
        className={`text-md font-medium ${
          highlight ? "text-primary font-semibold" : "text-foreground"
        }`}
      >
        {masked ? maskedValue : displayValue}
      </span>
    </div>
  );
};

export default DetailRow;
