import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSpeedometer from "react-d3-speedometer";
import api from "../../../api/api";
const UserInputForm = ({ onSubmit, formData, setFormData }) => {
  const [income, setIncome] = useState(0); // in thousands
  const [hasActiveEmi, setHasActiveEmi] = useState("no");
  const [loanType, setLoanType] = useState("");
  const [tenure, setTenure] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [creditOption, setCreditOption] = useState("");
  const [creditCardAmount, setCreditCardAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanEnquiry, setLoanEnquiry] = useState("");
  const [outstandingEmi, setOutstandingEmi] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [currentMonthEmi, setCurrentMonthEmi] = useState("");

  // const tenureOptionsByLoanType = {
  //   personal: ["1-2Yrs", "2-3Yrs", "3-4Yrs", "4-5Yrs", "5+Yrs"],
  //   buisness: ["1-3Yrs", "3-6Yrs", "6-8Yrs", "8-10Yrs", "10+Yrs"],
  //   home: ["10-15Yrs", "15-20Yrs", "20-25Yrs", "25-30Yrs", "30+Yrs"],
  //   education: ["5-7Yrs", "7-10Yrs", "10-12Yrs", "12-15Yrs", "15+Yrs"],
  // };

  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(formData);
  // };

  const buildPayload = () => ({
    employmentType: employmentType,
    monthlySalary: Number(income),
    employmentExperienceYears: Number(years),
    outstandingEMIAmount: Number(outstandingEmi),
    requiredLoanType: loanType,
    requiredLoanAmount: Number(loanAmount),
    isCreditCardHolder: creditOption === "yes",
    creditCardOutstandingAmount:
      creditOption === "yes" ? Number(creditCardAmount) : 0,
    loanEnquiryCountLast12Months: Number(loanEnquiry),
    creditScore: Number(creditScore),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);

    const payload = buildPayload();
    console.log("Submitting payload:", payload);

    try {
      const result = await api.checkLoanEligibility(payload);
      console.log("Eligibility result:", result);
    } catch (err) {
      console.error("Failed to submit eligibility", err);
    }
  };

  const handleContinue = () => {
    navigate("/loan-application");
  };

  return (
    <>
      <div className="col-lg-6 pt-0">
        <div className="contact-form" data-aos="fade-up" data-aos-delay="300">
          <h2 className="text-[30px] text-white font-bold mb-4">
            Check Your Loan Eligibility
          </h2>
          <p className="font-light text-[15px]">
            Provide some quick details to compare loans across banks. No
            personal info needed — just basic insights to find your best match.
          </p>
          <form
            onSubmit={handleSubmit}
            className="php-email-form"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="row gy-4">
              <div className="col-md-6">
                <label className="form-label">Employment Type</label>
                <select
                  className="form-control text-white custom-select"
                  onChange={(e) => setEmploymentType(e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="salaried">Salaried</option>
                  <option value="self-employed">Self-employed</option>
                  <option value="business">Other than Individual </option>
                </select>
              </div>

              {/* <div className="col-md-6">
                <label className="form-label">City Type</label>
                <select
                  className="form-control  text-white back  custom-select"
                  required
                >
                  <option value="">Select City Tier</option>
                  <option value="tier1">Tier-1</option>
                  <option value="tier2">Tier-2</option>
                  <option value="rural">Rural</option>
                </select>
              </div> */}
              <div className="col-md-6 ">
                <div className="flex items-center gap-4 mb-2 justify-between">
                  <label className="form-label mb-0">Monthly Income</label>

                  <div className="flex items-center gap-2 w-[130px]">
                    <span className="text-white">₹</span>
                    <input
                      type="number"
                      min="1000"
                      max="2000000"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      className="form-control text-white"
                      placeholder="e.g. 25000"
                    />
                  </div>
                </div>

                <input
                  type="range"
                  min="1000"
                  max="2000000"
                  value={income}
                  className="form-range income-range w-[300px]"
                  onChange={(e) => setIncome(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Employment Experience</label>

                <div className="row">
                  <div className="col-6">
                    <select
                      className="form-control  text-white  custom-select"
                      onChange={(e) => setYears(e.target.value)}
                      required
                    >
                      <option value="">Years</option>
                      {[...Array(20)].map((_, i) => (
                        <option key={i} value={`${i + 1}-${i + 2}`}>
                          {i + 1}-{i + 2} Years
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-6">
                    <select
                      className="form-control  text-white  custom-select"
                      required
                    >
                      <option value="">Months</option>
                      {[...Array(11)].map((_, i) => (
                        <option key={i} value={`${i + 1}-${i + 2}`}>
                          {i + 1}-{i + 2} Months
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Outstanding EMI Amount(₹)</label>
                <input
                  type="number"
                  className="form-control text-white"
                  placeholder="Enter amount e.g. 10000"
                  min="1"
                  //onChange={(e) => setHasActiveEmi(e.target.value)}
                  onChange={(e) => {
                    setOutstandingEmi(e.target.value);
                  }}
                />
              </div>

              {hasActiveEmi === "yes" && (
                <div className="col-md-6 mt-3">
                  <label className="form-label">
                    Current Monthly EMI Spending
                  </label>
                  <input
                    type="number"
                    className="form-control text-white"
                    placeholder="Enter amount e.g. ₹10,000"
                    onChange={(e) => {
                      setCurrentMonthEmi(e.target.value);
                    }}
                    required
                  />
                </div>
              )}

              <div className="col-md-6">
                <label className="form-label">Loan Type</label>
                <select
                  className="form-control text-white custom-select"
                  required
                  value={loanType}
                  onChange={(e) => {
                    setLoanType(e.target.value);
                    setTenure("");
                  }}
                >
                  <option value="">Select Type</option>
                  <option value="personal">Personal Loan</option>
                  <option value="business">Business Loan</option>
                  <option value="home">Home Loan</option>
                  <option value="education">Education Loan</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Loan Amount (₹)</label>
                <input
                  type="number"
                  className="form-control text-white"
                  min="1"
                  placeholder="e.g. 500000"
                  onChange={(e) => setLoanAmount(e.target.value)}
                  required
                />
              </div>

              {/* <div className="flex flex-col justify-between col-md-6">
                <label className="form-label">Preferred Tenure</label>
                <select
                  className="form-control text-white custom-select"
                  required
                  value={tenure}
                  disabled={!loanType}
                  onChange={(e) => setTenure(e.target.value)}
                >
                  <option value="">
                    {loanType ? "Select Tenure" : "Select"}
                  </option>

                  {(tenureOptionsByLoanType[loanType] || []).map((label) => (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  ))}
                </select>
              </div> */}

              {/* <div className="col-md-12"> */}

              <div className="col-md-6">
                <label className="form-label">Do you have Credit Card?</label>
                <select
                  className="form-control text-white custom-select"
                  required
                  value={creditOption}
                  onChange={(e) => {
                    setCreditOption(e.target.value);
                  }}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {creditOption === "yes" && (
                <div className="col-md-6">
                  <label className="form-label">
                    Credit Card Outstanding Amount (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control text-white"
                    placeholder="Enter amount e.g. 25000"
                    min="1"
                    value={creditCardAmount}
                    onChange={(e) => setCreditCardAmount(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="col-md-6">
                <label className="form-label">
                  Loan Enquiry History(Last 6-12 Months )
                </label>
                <input
                  type="number"
                  className="form-control text-white"
                  placeholder="e.g.0"
                  min="1"
                  onChange={(e) => {
                    setLoanEnquiry(e.target.value);
                  }}
                  required
                />
              </div>

              {/* <div
                className={`${
                  hasActiveEmi === "yes" ? "col-md-6" : "col-md-12"
                }`}
              >
                <label className="form-label">
                  Credit Score Range (
                  <small className="text-white">
                    Don’t know your credit score?{" "}
                    <a href="/check-credit-score" className="text-primary">
                      Click here to check
                    </a>
                  </small>
                  )
                </label>
                <select
                  className="form-control  text-white  custom-select"
                  onChange={(e) => setCreditScore(e.target.value)}
                  style={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    border: "1px solid #333",
                    appearance: "none",
                  }}
                >
                  <option value="">Select</option>
                  <option value="low">Below 600</option>
                  <option value="mid">600 - 750</option>
                  <option value="high">750+</option>
                </select>
              </div> */}

              <div
                className={`${
                  hasActiveEmi === "yes" ? "col-md-6" : "col-md-12"
                }`}
              >
                <label className="form-label">
                  Credit Score (
                  <small className="text-white">
                    Don’t know your credit score?{" "}
                    <a href="/check-credit-score" className="text-primary">
                      Click here to check
                    </a>
                  </small>
                  )
                </label>

                <input
                  type="number"
                  min={300}
                  max={900}
                  placeholder="Enter credit score (300 - 900)"
                  className="form-control text-white"
                  value={creditScore}
                  onChange={(e) => {
                    setCreditScore(e.target.value);
                  }}
                  style={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    border: "1px solid #333",
                    appearance: "none",
                  }}
                />
              </div>

              <div className="col-12 text-center">
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-base font-medium text-center text-black bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  style={{ backgroundColor: "var(--accent-color)" }}
                >
                  Compare Loan Offers
                </button>
              </div>
            </div>
          </form>
          <div
            className="modal fade"
            id="loanApplyModal"
            tabIndex="1"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow">
                <div className="modal-header bg-[#00519e] text-white">
                  <h5 className="modal-title text-white">
                    Your Privacy, Our Promise
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="text-muted mb-3">
                    We understand how important your personal information is.
                    When you apply through our platform:
                  </p>
                  <ul className="list-unstyled ps-3 text-muted">
                    <li>
                      ✅ <strong>No spam calls</strong> from third-party agents.
                    </li>
                    <li>
                      ✅ <strong>No data sharing</strong> without your
                      permission.
                    </li>
                    <li>
                      ✅ <strong>Bank-grade security</strong> to protect your
                      information.
                    </li>
                    <li>✅ Only verified lenders will see your application.</li>
                  </ul>
                  <button
                    className="btn btn-primary bg-[#00519e] w-100 mt-3"
                    onClick={handleContinue}
                    data-bs-dismiss="modal"
                  >
                    Continue to Application
                  </button>
                  <p className="text-xs text-center text-muted mt-2">
                    We do not store or sell your data. You are always in
                    control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="col-lg-6 border-amber-50">
        <div className="flex justify-center ml-35 mt-40">
          <div>
            <ReactSpeedometer
              width={400}
              height={300}
              maxValue={180}
              value={90}
              needleColor="black"
              startColor="red"
              segments={5}
              endColor="green"
              currentValueText="Score: ${value} "
            />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default UserInputForm;
