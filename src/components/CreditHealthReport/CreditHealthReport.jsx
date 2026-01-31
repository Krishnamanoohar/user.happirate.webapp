import React from "react";
import OneScoreDashboard from "../Dashboard/Dashboard";

const CreditHealthReport = () => {
  return (
    <div className="min-h-screen bg-[#EFF6FF] p-6">
      {/* <iframe
        src="/dashboard.html"
        title="Credit Health Report"
        className="w-full h-screen border-0"
      /> */}
      <div className="pt-10">
      <OneScoreDashboard/>
      </div>
    </div>
  );
};

export default CreditHealthReport;
