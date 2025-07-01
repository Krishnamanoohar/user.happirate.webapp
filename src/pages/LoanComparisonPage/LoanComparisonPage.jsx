import React, { useState } from "react";
import UserInputForm from "./UserInputForm/UserInputForm";
import LoanOfferCard from "./LoanOfferCard/LoanOfferCard";
import { motion, AnimatePresence } from "framer-motion";

const LoanComparisonPage = () => {
  const [offers, setOffers] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null); // or use multiple for checkboxes
  const [animationKey, setAnimationKey] = useState(0);

  const [userEligibilityData, setUserEligibilityData] = useState({});

  const handleFormSubmit = (userInput) => {
    // Simulated API call or static data fetch
    const results = [
      {
        id: 1,
        bank: "HDFC Bank",
        interestRate: "10.5%",
        processingFee: "1%",
        tenure: "5 years",
        maxAmount: "₹10,00,000",
        logo: "hdfc-logo.png",
        featured: true,
      },
      {
        id: 2,
        bank: "Bajaj Finserv",
        interestRate: "13.0%",
        processingFee: "1.25%",
        tenure: "3 years",
        maxAmount: "₹5,00,000",
        logo: "bajaj-logo.png",
        featured: true,
      },
      {
        id: 3,
        bank: "State Bank of India",
        interestRate: "9.7%",
        processingFee: "0.35%",
        tenure: "6 years",
        maxAmount: "₹12,00,000",
        logo: "sbi-logo.jpg",
      },
      {
        id: 4,
        bank: "Axis Bank",
        interestRate: "10.25%",
        processingFee: "1.25%",
        tenure: "5 years",
        maxAmount: "₹9,00,000",
        logo: "axis-logo.jpg",
      },
      {
        id: 5,
        bank: "Kotak Mahindra Bank",
        interestRate: "11.0%",
        processingFee: "0.75%",
        tenure: "4 years",
        maxAmount: "₹7,00,000",
        logo: "kotak-logo.png",
      },
      {
        id: 6,
        bank: "Punjab National Bank",
        interestRate: "10.0%",
        processingFee: "0.50%",
        tenure: "6 years",
        maxAmount: "₹10,00,000",
        logo: "pnb-logo.png",
      },
      {
        id: 7,
        bank: "Yes Bank",
        interestRate: "12.5%",
        processingFee: "2%",
        tenure: "3 years",
        maxAmount: "₹6,00,000",
        logo: "yes-logo.png",
      },
      {
        id: 8,
        bank: "IDFC FIRST Bank",
        interestRate: "9.9%",
        processingFee: "1%",
        tenure: "5 years",
        maxAmount: "₹9,50,000",
        logo: "idfc-logo.png",
      },
      {
        id: 9,
        bank: "Bank of Baroda",
        interestRate: "10.1%",
        processingFee: "0.75%",
        tenure: "5 years",
        maxAmount: "₹8,50,000",
        logo: "baroda-logo.png",
      },
      {
        id: 10,
        bank: "IndusInd Bank",
        interestRate: "11.3%",
        processingFee: "1%",
        tenure: "4 years",
        maxAmount: "₹7,50,000",
        logo: "indusind-logo.png",
      },
      {
        id: 11,
        bank: "ICICI Bank",
        interestRate: "11.2%",
        processingFee: "0.5%",
        tenure: "4 years",
        maxAmount: "₹8,00,000",
        logo: "icici-logo.png",
      },
      {
        id: 12,
        bank: "Tata Capital",
        interestRate: "12.75%",
        processingFee: "1%",
        tenure: "4 years",
        maxAmount: "₹6,00,000",
        logo: "tata-logo.png",
      },
      {
        id: 13,
        bank: "IDBI Bank",
        interestRate: "9.5%",
        processingFee: "0.65%",
        tenure: "6 years",
        maxAmount: "₹10,00,000",
        logo: "idbi-logo.png",
      },
      {
        id: 14,
        bank: "Union Bank of India",
        interestRate: "9.9%",
        processingFee: "0.50%",
        tenure: "5 years",
        maxAmount: "₹9,00,000",
        logo: "union-logo.png",
      },
      {
        id: 15,
        bank: "Canara Bank",
        interestRate: "10.2%",
        processingFee: "0.75%",
        tenure: "6 years",
        maxAmount: "₹11,00,000",
        logo: "canara-logo.jpeg",
      },
      {
        id: 16,
        bank: "Federal Bank",
        interestRate: "10.8%",
        processingFee: "1.5%",
        tenure: "4 years",
        maxAmount: "₹7,50,000",
        logo: "federal-logo.jpeg",
      },
      {
        id: 17,
        bank: "South Indian Bank",
        interestRate: "11.6%",
        processingFee: "1%",
        tenure: "5 years",
        maxAmount: "₹6,50,000",
        logo: "southIndianBank-logo.jpg",
      },
      {
        id: 18,
        bank: "Karur Vysya Bank",
        interestRate: "10.9%",
        processingFee: "1.1%",
        tenure: "4 years",
        maxAmount: "₹8,00,000",
        logo: "kvb-logo.jpeg",
      },
      {
        id: 19,
        bank: "RBL Bank",
        interestRate: "12.0%",
        processingFee: "2%",
        tenure: "3 years",
        maxAmount: "₹5,50,000",
        logo: "rbl-logo.png",
      },
      {
        id: 20,
        bank: "HSBC Bank",
        interestRate: "10.0%",
        processingFee: "0.99%",
        tenure: "5 years",
        maxAmount: "₹10,00,000",
        logo: "hsbc-logo.png",
      },
    ];

    setOffers(results);
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
