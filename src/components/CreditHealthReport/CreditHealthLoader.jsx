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
      <p className="text-xl md:text-2xl font-bold text-slate-800 animate-pulse mb-6">
        Loading your <span className="text-[#7c3aed]">Credit Dashboard...</span>
      </p>

      {/* Dynamic Text */}
      <p className="text-sm text-slate-600 animate-pulse mb-4">
        {loadingMessages[index]}
      </p>

      {/* Progress Bar */}
      <div className="w-100 h-5 bg-white border-2 border-slate-200 rounded-full mt-6 p-1 shadow-sm">
        <div 
          className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full animate-loader-bar shadow-[0_0_10px_rgba(139,92,246,0.3)]" 
        />
      </div>
    </div>
  );
}
