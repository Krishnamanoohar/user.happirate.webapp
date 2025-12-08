import React, { useState } from "react";
import UserInputForm from "./UserInputForm/UserInputForm";
import LoanOfferCard from "./LoanOfferCard/LoanOfferCard";
import { motion, AnimatePresence } from "framer-motion";
import { Banks } from "../../Data/banks";

const LoanComparisonPage = () => {
  const [offers, setOffers] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null); // or use multiple for checkboxes
  const [animationKey, setAnimationKey] = useState(0);

  const [userEligibilityData, setUserEligibilityData] = useState({});

  const handleFormSubmit = (userInput) => {
    // Simulated API call or static data fetch

    setOffers(Banks);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div className="starter-section min-vh-100">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="d-flex gap-4 max-w-8xl mx-auto">
          <UserInputForm
            onSubmit={handleFormSubmit}
            formData={userEligibilityData}
            setFormData={setUserEligibilityData}
          />
          <div className="w-full mt-8 grid gap-6">
            <div className="flex items-end hover:shadow-lg">
              {offers.length && (
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#loanApplyModal"
                  className="text-white w-full hover:bg-[#003f7f] font-medium rounded-lg text-sm h-12 bg-[#00519e] px-12"
                >
                  Find Your Eligible Loans
                </button>
              )}
            </div>
            <div className="max-h-[600px] overflow-y-auto pr-2 space-y-6 custom-scrollbar">
              <AnimatePresence>
                {offers.map((offer) => (
                  <motion.div
                    key={`${animationKey}-${offer.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "circIn" }}
                  >
                    <LoanOfferCard
                      key={offer.id}
                      offer={offer}
                      featured={offer.featured || false}
                      selected={selectedBank === offer.id}
                      onSelect={() => setSelectedBank(offer.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanComparisonPage;
