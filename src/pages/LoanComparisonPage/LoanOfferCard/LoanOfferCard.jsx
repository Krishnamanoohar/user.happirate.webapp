import { Chip } from "@mui/material";
import { CheckCircle, Banknote, ShieldCheck, Clock4 } from "lucide-react";

const LoanOfferCard = ({ offer, onSelect, featured = false }) => {
  return (
    <div className="relative">
      {featured && (
        <Chip
          label="Lightning Fast!"
          color="success"
          size="small"
          sx={{
            position: "absolute",
            top: -10,
            right: 15,
            zIndex: 10,
            fontWeight: "bold",
            textTransform: "uppercase",
            background: "linear-gradient(90deg, #FFD700, #FFA500)",
            color: "#fff",
            boxShadow: "0 0 8px rgba(255, 215, 0, 0.8)",
          }}
        />
      )}

      <div
        className={`relative flex items-start border-2 rounded-2xl p-6 shadow-xl transition-all duration-300 cursor-pointer border-gray-200 bg-white mt-3 ${
          featured ? "border border-[#FFA500]" : ""
        }`}
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
            <h3 className="text-xl font-semibold text-gray-900">
              {offer.bank}
            </h3>
          </div>

          <div className="flex justify-between">
            <div className="text-sm text-gray-700 grid grid-cols-4 gap-3">
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

            {/* <div className="flex items-end hover:shadow-lg">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#loanApplyModal"
                className="text-white hover:bg-[#003f7f] font-medium rounded-lg text-sm h-12 bg-[#00519e] px-12"
              >
                Apply
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanOfferCard;
