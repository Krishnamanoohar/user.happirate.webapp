// src/components/BankList.jsx
import React from "react";
import { Button } from "@mui/material";
import { Banknote, Percent } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
// import { Banks } from "../../../Data/banks";

const Banks = [
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

const banks = Banks.map((item) => ({
  name: item.bank,
  interest: item.interestRate,
  amount: item.maxAmount.replace(/,/g, ""), // optional cleanup
  logo: `/assets/img/bank-logos/${item.logo}`,
}));

const rowVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, type: "spring", stiffness: 60 },
  }),
};

export default function AnimatedTable() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: ["0%", "-50%"], // scroll half (because we’re doubling the list)
      transition: {
        duration: 30, // slower = smoother
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  // Duplicate the list to make loop seamless
  const loopingBanks = [...banks, ...banks];

  return (
    <div className="absolute top-[10%] right-[-5%] bottom-0 rounded-2xl shadow-lg border-transparent overflow-hidden group w-[53%] max-w-3xl mx-auto backdrop-blur-md bg-gradient-to-br from-black via-neutral-900 to-zinc-800 shadow-white shadow-2xl bg-transparent shadow-[0_0_6px_#ffd700,0_0_12px_#ffbf00,0_0_24px_#ffaa00] gold-glow">
      {/* shadow-[0_0_20px_5px_rgba(255,255,255,0.6)]  */}
      {/* Cards */}
      <div className="flex justify-between m-4 gap-4 mb-0 rounded-xl">
        {/* Total Disbursed Card */}
        <div className="bg-black/80 border border-white/10 rounded-xl p-4 flex items-center justify-between grow-1 shadow-[0_0_20px_5px_rgba(255,255,255,0.6)]">
          <div>
            <div className="text-sm text-gray-400 mb-1">Total Disbursed</div>
            <div className="text-xl font-semibold">₹6,320 Lakh</div>
          </div>
          <Banknote className="w-6 h-6 opacity-80 text-white" />
          {/* Or: <span className="text-2xl">💰</span> */}
        </div>

        {/* Avg. Interest Rate Card */}
        <div className="bg-black/80 border border-white/10 rounded-xl p-4 flex items-center justify-between grow-1 shadow-[0_0_20px_5px_rgba(255,255,255,0.6)]">
          <div>
            <div className="text-sm text-gray-400 mb-1">Avg. Interest Rate</div>
            <div className="text-xl font-semibold">7.34%</div>
          </div>
          <Percent className="w-6 h-6 opacity-80 text-white" />
          {/* Or: <span className="text-2xl">📈</span> */}
        </div>
      </div>

      {/* Background */}
      <div className="mt-4 overflow-hidden">
        <motion.div animate={controls}>
          <div className="relative z-10 p-4 rounded-2xl space-y-8 overflow-hidden">
            {loopingBanks?.map((bank, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={rowVariants}
                className="flex items-center justify-between bg-transparent px-4 py-3 border border-white/10 rounded-xl text-white shadow-[0_0_20px_5px_rgba(255,255,255,0.6)]"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="h-10 w-10 object-contain"
                  />
                  <div>
                    <div className="text-lg font-semibold">{bank.name}</div>
                    <div className="text-sm text-gray-300">
                      Interest: {bank.interest}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-white font-medium">{bank.amount}</div>
                  <Button
                    variant="outlined"
                    size="small"
                    className="text-white border-white hover:border-green-500 hover:text-green-400 transition-all mt-1"
                    style={{ borderColor: "white", color: "white" }}
                  >
                    Apply
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
