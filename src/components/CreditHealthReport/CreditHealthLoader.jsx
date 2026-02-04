import React from "react";

const loadingMessages = [
  "Analyzing your credit profile...",
  "Fetching CIBIL data...",
  "Calculating risk factors...",
  "Generating insights...",
  "Almost ready..."
];

export default function DashboardLoader() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % loadingMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      {/* Image */}


      {/* Main Text */}
      <h1 className="text-xl font-semibold text-slate-800 mb-2">
        Loading Your Credit Dashboard
      </h1>

      {/* Dynamic Text */}
      <p className="text-sm text-slate-500 animate-pulse">
        {loadingMessages[index]}
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-slate-200 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-blue-600 animate-loader-bar" />
      </div>
    </div>
  );
}
