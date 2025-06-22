import React, { useState } from "react";

const UserInputForm = ({ onSubmit }) => {
  const [income, setIncome] = useState(25); // in thousands

  const [formData, setFormData] = useState({
    amount: "",
    tenure: "",
    income: "",
    city: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
              <select className="form-control" required>
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

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

            <div className="col-md-6">
              <label className="form-label">Preferred Tenure</label>
              <select className="form-control" required>
                <option value="">Select Tenure</option>
                <option value="1">1 Year</option>
                <option value="3">3 Years</option>
                <option value="5">5 Years</option>
                <option value="7">7 Years</option>
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label">
                Credit Score Range (optional)
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
      </div>
    </div>
  );
};

export default UserInputForm;
