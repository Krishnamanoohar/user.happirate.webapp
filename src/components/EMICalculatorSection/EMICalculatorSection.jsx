import React, { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { calculateLoanEMI } from "../../utils/calculateLoan";
import {
  BookOpenCheck,
  Building2,
  CarFront,
  SquareUserRound,
} from "lucide-react";

export default function EMICalculatorSection() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(5);

  const { monthlyEMI, totalPrincipal, totalInterest, totalAmount } =
    calculateLoanEMI(principal, rate, tenure);

  const loanTypes = [
    {
      title: "Personal Loan",
      icon: <SquareUserRound />,
    },
    {
      title: "Educational Loan",
      icon: <BookOpenCheck />,
    },
    {
      title: "Business Loan",
      icon: <Building2 />,
    },
    {
      title: "Vehicle Loan",
      icon: <CarFront />,
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen dark-background">
      <div className="max-w-7xl mt-6">
        <h1 className="text-3xl text-[#52556C] font-bold mb-6 w-full">
          EMI Calculator
        </h1>

        <div className="rounded-2xl shadow border px-10 py-8 flex flex-row w-full gap-8 my-8 glass-background">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="text-[#fff] mb-8">Loan Type</span>
              <div className="flex flex-row gap-4">
                {loanTypes.map((item) => (
                  <div className="flex flex-col items-center shadow-2xl p-4 rounded-2 gap-2 cursor-pointer shadow-[0_0_10px_5px_rgba(255,255,255,0.2)]">
                    <div>{item.icon}</div>
                    <div>{item.title}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <div className="flex-1 flex flex-col gap-6">
                <div>
                  <div className="flex w-full items-center justify-between mb-4">
                    <span className="text-[#fff]">Loan amount</span>
                    <span className="bg-transparent border-1 text-[#fff] rounded px-1 py-0 font-bold text-lg tracking-wider">
                      ₹
                      <input
                        type="number"
                        value={principal}
                        className="bg-transparent border-0 focus:outline-0 focus:border-0 active:outline-0 active:outline-0 w-[8rem]"
                        onChange={(e)=>setPrincipal(e.target.value)}
                      />
                    </span>
                  </div>

                  <input
                    type="range"
                    min={10000}
                    max={1000000}
                    step={1000}
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full h-2 accent-[#E9EAF1] bg-[#E9EAF1] rounded-lg outline-none"
                  />
                </div>
                <div>
                  <div className="flex w-full items-center justify-between mb-4">
                    <span className="text-[#fff]">Rate of interest (p.a)</span>
                    <span className="bg-transparent border-1 text-[#fff] rounded px-4 py-1 font-bold text-lg tracking-wider">
                      {rate} <span className="font-medium">%</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={20}
                    step={0.1}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 accent-[#E9EAF1] bg-[#E9EAF1] rounded-lg outline-none"
                  />
                </div>
                <div>
                  <div className="flex w-full items-center justify-between mb-4">
                    <span className="text-[#fff]">Loan tenure</span>
                    <span className="bg-transparent border-1 text-[#fff] rounded px-4 py-1 font-bold text-lg tracking-wider">
                      {tenure} <span className="font-medium">Yr</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    step={1}
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full h-2 accent-[#E9EAF1] bg-[#E9EAF1] rounded-lg outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="w-full p-2 rounded-1">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-[#fff] text-base">
                  <span>Monthly EMI</span>
                  <span className="font-medium text-[#fff]">₹{monthlyEMI}</span>
                </div>
                <div className="flex justify-between text-[#fff] text-base">
                  <span>Principal amount</span>
                  <span className="font-medium text-[#fff]">₹{principal}</span>
                </div>
                <div className="flex justify-between text-[#fff] text-base">
                  <span>Total interest</span>
                  <span className="font-medium text-[#fff]">
                    ₹{totalInterest}
                  </span>
                </div>
                <div className="flex justify-between text-[#fff] text-base">
                  <span>Total amount</span>
                  <span className="font-medium text-[#fff]">
                    ₹{totalPrincipal}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col items-center flex-shrink-0 mt-8"
            style={{ width: "310px" }}
          >
            <div className="flex gap-6 text-sm mb-8 w-full justify-center">
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-2 rounded bg-[#f7fafd]" />
                Principal amount
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-2 rounded bg-[#a588e3]" />
                Interest amount
              </div>
            </div>
            <PieChart
              data={[
                { value: principal, color: "#f7fafd" },
                { value: Number(totalInterest), color: "#a588e3" },
              ]}
              totalValue={principal + Number(totalInterest)}
              lineWidth={40}
              startAngle={270}
              rounded={false}
              animate
              className="mb-3"
              style={{ height: 200 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
