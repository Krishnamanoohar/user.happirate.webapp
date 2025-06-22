import React from "react";
import { CheckCircle, Banknote, ShieldCheck, Clock4 } from "lucide-react";

const LoanOfferCard = ({ offer, selected, onSelect }) => {
  return (
    <div
      className={`relative flex items-start border-2 rounded-2xl p-6 shadow-xl transition-all duration-300 cursor-pointer 
        ${selected ? "border-blue-600 bg-blue-100" : "border-gray-200 bg-white"}
      `}
      onClick={onSelect}
      style={{ userSelect: "none" }}
    >
      {/* Center: Logo and Info */}
      <div className="flex-grow space-y-3">
        <div className="flex items-center gap-3">
          {offer.logo && (
            <img
              src={`/assets/img/bank-logos/${offer.logo}`}
              alt={`${offer.bank} Logo`}
              className="w-12 h-12 object-contain rounded shadow-sm bg-white p-1 border"
            />
          )}
          <h3 className="text-xl font-semibold text-gray-900">{offer.bank}</h3>
        </div>

        <div className="text-sm text-gray-700 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Banknote size={20} className="text-blue-500" />
            <span>
              <strong>{offer.interestRate}</strong> Interest
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-emerald-500" />
            <span>{offer.processingFee} Fee</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock4 size={20} className="text-orange-500" />
            <span>{offer.tenure}</span>
          </div>
          <div className="flex items-center gap-2">
            <Banknote size={20} className="text-purple-500" />
            <span>{offer.maxAmount}</span>
          </div>
        </div>
      </div>

      {selected && (
        <div className="absolute d-flex align-items-start justify-center text-sm flex-row gap-2 top-3 right-3 text-blue-600">
          <p className="text-md">Selected</p>
          <CheckCircle size={20} />
        </div>
      )}
    </div>
  );
};

export default LoanOfferCard;
