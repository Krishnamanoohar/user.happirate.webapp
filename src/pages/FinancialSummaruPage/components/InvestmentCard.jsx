import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const InvestmentCard = ({
  title,
  icon,
  children,
  totalAmount,
  count,
  gradient,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl overflow-hidden">
      <div
        className={`${gradient} p-3 cursor-pointer transition-all duration-200 hover:shadow-lg`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              {icon}
            </div>
            <div>
              <h3
                className="text-lg font-bold text-white"
                style={{ fontSize: "18px", marginBottom: "0" }}
              >
                {title}
              </h3>
              <p className="text-white/80 text-sm mb-0">
                {count} {count === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{totalAmount}</div>
              <div className="text-white/80 text-sm">Total Value</div>
            </div>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-white" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && <div className="p-6">{children}</div>}
    </div>
  );
};

export default InvestmentCard;
