import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserInputForm = ({ onSubmit, formData, setFormData }) => {
  const [income, setIncome] = useState(25); // in thousands
  const [hasActiveEmi, setHasActiveEmi] = useState("no");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleContinue = () => {
    navigate("/loan-application");
  };

  return (
    <div className="col-lg-6">
      <div className="contact-form" data-aos="fade-up" data-aos-delay="300">
        <h3>Check Your Loan Eligibility</h3>
        <p>
          Provide some quick details to compare loans across banks. No personal
          info needed — just basic insights to find your best match.
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
              <select className="form-control" required>
                <option value="">Select Type</option>
                <option value="salaried">Salaried</option>
                <option value="self-employed">Self-employed</option>
                <option value="business">Business Owner</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">City Type</label>
              <select className="form-control" required>
                <option value="">Select City Tier</option>
                <option value="tier1">Tier-1</option>
                <option value="tier2">Tier-2</option>
                <option value="rural">Rural</option>
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label">Monthly Income: ₹{income}k</label>
              <input
                type="range"
                min="10"
                max="200"
                value={income}
                className="form-range"
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Do you have any active EMIs?</label>
              <select
                className="form-control"
                required
                onChange={(e) => setHasActiveEmi(e.target.value)}
              >
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {hasActiveEmi === "yes" && (
              <div className="col-md-6 mt-3">
                <label className="form-label">
                  Current Monthly EMI Spending
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter amount e.g. ₹10,000"
                  required
                />
              </div>
            )}

            <div className="col-md-6">
              <label className="form-label">Loan Type</label>
              <select className="form-control" required>
                <option value="">Select Type</option>
                <option value="personal">Personal Loan</option>
                <option value="home">Home Loan</option>
                <option value="car">Car Loan</option>
                <option value="education">Education Loan</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Loan Amount (₹)</label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 500000"
                required
              />
            </div>

            <div className="flex flex-col justify-between col-md-6">
              <label className="form-label">Preferred Tenure</label>
              <select className="form-control" required>
                <option value="">Select Tenure</option>
                <option value="1">1 Year</option>
                <option value="3">3 Years</option>
                <option value="5">5 Years</option>
                <option value="7">7 Years</option>
              </select>
            </div>

            {/* <div className="col-md-12"> */}
            <div
              className={`${hasActiveEmi === "yes" ? "col-md-6" : "col-md-12"}`}
            >
              <label className="form-label">
                Credit Score Range (
                <small className="text-muted">
                  Don’t know your credit score?{" "}
                  <a href="/check-credit-score" className="text-primary">
                    Click here to check
                  </a>
                </small>
                )
              </label>
              <select className="form-control">
                <option value="">Select</option>
                <option value="low">Below 600</option>
                <option value="mid">600 - 750</option>
                <option value="high">750+</option>
              </select>
            </div>

            <div className="col-12 text-center">
              <button
                type="submit"
                className="w-full px-4 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                  We understand how important your personal information is. When
                  you apply through our platform:
                </p>
                <ul className="list-unstyled ps-3 text-muted">
                  <li>
                    ✅ <strong>No spam calls</strong> from third-party agents.
                  </li>
                  <li>
                    ✅ <strong>No data sharing</strong> without your permission.
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
                  We do not store or sell your data. You are always in control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInputForm;
