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

  const [loanType, setLoanType] = useState(0);

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
      <div className="container max-w-[100%] mt-6">
        <h1 className="text-3xl text-[#52556C] font-bold mb-6 w-full">
          EMI Calculator
        </h1>

        <div className="rounded-2xl shadow border px-10 py-8 flex flex-row justify-between w-full gap-8 my-8 glass-background">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="text-[#fff] mb-8">Loan Type</span>
              <div className="flex flex-row gap-4">
                {loanTypes.map((item, index) => (
                  <div
                    className={`flex flex-col items-center shadow-2xl p-4 rounded-2 gap-2 cursor-pointer ${
                      loanType == index
                        ? "shadow-[0_0_10px_5px_rgba(255,255,255,0.6)] border-white border-1"
                        : "shadow-[0_0_10px_5px_rgba(255,255,255,0.2)]"
                    }`}
                    key={index}
                    onClick={() => setLoanType(index)}
                  >
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
                        className="bg-transparent border-0 focus:outline-0 focus:border-0 active:outline-0 active:outline-0 w-[8rem] text-right"
                        onChange={(e) => setPrincipal(e.target.value)}
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
            className="flex flex-col justify-between items-center flex-shrink-0"
            style={{ flexGrow: 1 }}
          >
            <div className="flex gap-6 text-sm mb-8 w-full justify-center mt-4">
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-2 rounded bg-[#f7fafd]" />
                Principal amount
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-2 rounded bg-[#4c45a5]" />
                Interest amount
              </div>
            </div>
            <PieChart
              data={[
                { value: principal, color: "#f7fafd" },
                { value: Number(totalInterest), color: "#4c45a5" },
              ]}
              totalValue={principal + Number(totalInterest)}
              lineWidth={40}
              startAngle={270}
              rounded={false}
              animate
              className="mb-3"
              style={{ height: 250 }}
            />

            <div className="max-w-md w-full border border-gray-200 rounded-xl shadow-sm p-8 text-center">
              <div className="flex justify-center mb-6">
               <img src="assets/img/cash-bank.png" alt="" className="w-full rounded-1" width={100}/>
              </div>

              <h2
                className="text-sm font-semibold text-gray-800 mb-2"
                style={{ fontSize: "24px" }}
              >
                Find the loan that fits your life.
              </h2>

              <p className="text-gray-500 mb-6 text-sm">
                Join millions of Indians who trust and love Groww
              </p>

              <button className=" w-full bg-[#4c45a5] hover:opacity-95 text-white py-2 px-6 rounded-md transition-colors rounded">
                EXPLORE SOLUTIONS
              </button>
            </div>
          </div>
        </div>

        <div className="text-white p-0 flex flex-col md:flex-row gap-4 pb-4 px-0 md:px-0">
          {/* Card 1 */}
          <div className="w-full border border-[#4c45a5] rounded-2xl p-6 md:p-8 leading-relaxed glass-background emi-info-card">
            <h3 className="text-lg font-semibold text-[#2f2f2f] mb-3">
              How to Calculate Your Monthly Installments
            </h3>
            <p className="text-white text-sm mb-2">
              While the EMI calculator simplifies monthly loan estimates,
              knowing the underlying formula offers valuable insight. Here's the
              simplified formula:
            </p>
            <h6 className="mt-4">EMI Calculation Formula: </h6>
            <i className="text-sm font-medium text-white-800 my-4">
              EMI = [P x R x (1 + R)^N] / [(1 + R)^N - 1]
            </i>
            <br />
            <br />
            <p className="text-sm text-white">
              <span className="font-bold">Where:</span>
              <br />P = Principal loan amount
              <br />R = Monthly interest rate (annual rate divided by 12)
              <br />N = Loan tenure in months
              <br />
              Remember, this formula serves as a foundational understanding.
              Always use a reliable EMI calculator.
            </p>
          </div>

          {/* Card 2 */}
          <div className="w-full border border-[#7B1E3B] rounded-2xl p-6 md:p-8 leading-relaxed glass-background emi-info-card">
            <h3 className="text-lg font-semibold text-[#2f2f2f] mb-3">
              What is EMI?
            </h3>
            <p className="text-white text-sm">
              An EMI (Equated Monthly Instalment) is the fixed amount you pay
              every month towards your loan — covering both the principal and
              the interest.
            </p>
            <p className="text-white text-sm">
              <h6>Here’s how it helps you:</h6>
              <p>
                <u>Budget effectively:</u> See how your EMI fits into your monthly
                income and expenses.
              </p>{" "}
              <p>
                <u>Compare options:</u> Adjust loan amounts or tenures to find what
                works best for your budget.
              </p>
              <p><u>Make informed choices:</u> Understand your repayment obligations before you apply — no
              surprises later.</p>
              
            </p>
            <p className="text-white text-sm">
              Planning a loan is an important financial step. Happirate’s EMI
              Calculator gives you clarity and confidence before you borrow.
            </p>
            <p className="text-white text-sm">
              <u className="font-bold">Note:</u> The EMI shown is based on the details you provide. Actual
              rates and terms may vary depending on the lender’s policies and
              your credit profile.{" "}
            </p>
          </div>

          {/* Card 3 */}
          <div className="w-full border border-[#7B1E3B] rounded-2xl p-6 md:p-8 leading-relaxed glass-background emi-info-card">
            <h3 className="text-lg font-semibold text-[#2f2f2f] mb-3">
              Using the EMI Calculator
            </h3>
            <ul className="text-white text-sm list-disc pl-5 space-y-2 mb-3">
              <li>
                <u>Identify your loan type:</u> Select the appropriate
                calculator based on your desired loan (personal, car, bike, home
                or business).
              </li>
              <li>
                <u>Enter the loan amount:</u> Specify the total sum
                you intend to borrow.
              </li>
              <li>
                <u>Outline the loan term:</u> Indicate the desired
                duration of your repayment period (typically in months or
                years).
              </li>
              <li>
                <u>Provide the interest rate:</u> This crucial factor
                determines the cost of your loan. You can find this information
                on the chosen institution's website or by contacting them
                directly.
              </li>
            </ul>
            <p className="text-sm text-white">
              Instantly, the calculator reveals your estimated EMI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
