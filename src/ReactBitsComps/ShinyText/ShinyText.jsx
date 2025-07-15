const ShinyText = ({ text, disabled = false, speed = 2, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-badge ${disabled ? "disabled" : ""} ${className}`}
      style={{ animationDuration }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
