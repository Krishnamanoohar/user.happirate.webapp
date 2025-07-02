import React, { useState } from "react";
import { Stepper, Step, StepLabel, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BankApplicationPage() {
  const steps = ["Choose Loan Type", "Fill Application", "Review & Submit"];
  const [activeStep, setActiveStep] = useState(0);
  const [loanType, setLoanType] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const navigate = useNavigate();

  const loanFields = {
    personal: [
      { name: "loanAmount", label: "Desired Loan Amount", type: "number" },
      { name: "employmentStatus", label: "Employment Status", type: "text" },
      { name: "monthlyIncome", label: "Monthly Income", type: "number" },
      { name: "city", label: "City", type: "text" },
      { name: "firstName", label: "First Name", type: "text" },
      { name: "lastName", label: "Last Name", type: "text" },
      { name: "mobileNumber", label: "Mobile Number", type: "tel" },
      { name: "email", label: "E-Mail ID", type: "email" },
      { name: "residentialStatus", label: "Residential Status", type: "text" },
      { name: "companyName", label: "Company Name", type: "text" },
      // { name: "panCard", label: "Upload PAN Card", type: "file" }, // ✅ NEW FILE FIELD
    ],
    home: [
      { name: "loanAmount", label: "Desired Loan Amount", type: "number" },
      { name: "propertyLocation", label: "Property Location", type: "text" },
      {
        name: "propertyValue",
        label: "Estimated Property Value",
        type: "number",
      },
      { name: "downPayment", label: "Down Payment", type: "number" },
      { name: "monthlyIncome", label: "Monthly Income", type: "number" },
      { name: "employmentStatus", label: "Employment Status", type: "text" },
      { name: "firstName", label: "First Name", type: "text" },
      { name: "lastName", label: "Last Name", type: "text" },
      { name: "mobileNumber", label: "Mobile Number", type: "tel" },
      { name: "email", label: "E-Mail ID", type: "email" },
      // { name: "panCard", label: "Upload PAN Card", type: "file" }, // ✅ NEW FILE FIELD
    ],
    education: [
      { name: "loanAmount", label: "Desired Loan Amount", type: "number" },
      { name: "institutionName", label: "Institution Name", type: "text" },
      { name: "courseName", label: "Course Name", type: "text" },
      {
        name: "courseDuration",
        label: "Course Duration (years)",
        type: "number",
      },
      { name: "guardianName", label: "Parent/Guardian Name", type: "text" },
      {
        name: "guardianIncome",
        label: "Guardian Monthly Income",
        type: "number",
      },
      { name: "city", label: "City", type: "text" },
      { name: "firstName", label: "First Name", type: "text" },
      { name: "lastName", label: "Last Name", type: "text" },
      { name: "mobileNumber", label: "Mobile Number", type: "tel" },
      { name: "email", label: "E-Mail ID", type: "email" },
      // { name: "panCard", label: "Upload PAN Card", type: "file" },
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If loanType changes, update derived loanType state
    if (name === "loanType") {
      setLoanType(value);
    }

    // Clear errors as user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleNext = () => {
    if (activeStep === 0) {
      const touchedUpdate = { loanType: true };
      setTouched((prev) => ({ ...prev, ...touchedUpdate }));

      if (!loanType) {
        setErrors({ loanType: "Please select a loan type" });
        return;
      }

      setErrors({});
    }

    if (activeStep === 1) {
      const currentFields = loanFields[loanType] || [];
      const newErrors = {};
      const newTouched = {};

      currentFields.forEach((field) => {
        const value = formData[field.name];
        newTouched[field.name] = true;

        if (!value || value.trim() === "") {
          newErrors[field.name] = `${field.label} is required`;
        }
      });

      setErrors(newErrors);
      setTouched(newTouched);

      if (Object.keys(newErrors).length > 0) return;
      console.log("✅ Submitted data:", formData);
    }

    if (activeStep === 2) {
      setShowModal(true);
      setAnimationDone(false); // reset
      setTimeout(() => {
        setAnimationDone(true);
      }, 1500); // wait 1.5s for tick animation
      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleConfirm = () => {
    setShowModal(false);
    console.log("✅ Final submitted data:", formData);
    navigate("/process");
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderFormFields = () => {
    const fields = loanFields[loanType] || [];
    return (
      <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-6">
        {fields.map((field) => {
          const hasError = errors[field.name];
          const isTouched = touched[field.name];
          const isValid = isTouched && !hasError;

          return (
            <div key={field.name} className="md:col-span-1">
              <label
                htmlFor={field.name}
                className={`block mb-2 text-sm font-medium ${
                  hasError
                    ? "text-red-700 dark:text-red-500"
                    : isValid
                    ? "text-green-700 dark:text-green-500"
                    : "text-gray-900"
                }`}
              >
                {field.label}
              </label>

              {field.type === "file" ? (
                <>
                  <input
                    id={field.name}
                    name={field.name}
                    type="file"
                    className={`block w-full text-sm border rounded-lg cursor-pointer bg-gray-50 focus:outline-none ${
                      hasError
                        ? "border-red-500 text-red-900"
                        : isValid
                        ? "border-green-500 text-green-900"
                        : "border-gray-300 text-gray-900"
                    }`}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field.name]: e.target.files[0],
                      }))
                    }
                    // onBlur={() =>
                    //   setTouched((prev) => ({ ...prev, [field.name]: true }))
                    // }
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    Upload a clear image of your PAN Card.
                  </p>
                </>
              ) : (
                <>
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    // onBlur={() =>
                    //   setTouched((prev) => ({ ...prev, [field.name]: true }))
                    // }
                    className={`${
                      hasError
                        ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                        : isValid
                        ? "bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    } text-sm rounded-lg block w-full p-2.5`}
                    placeholder={field.label}
                  />
                </>
              )}

              {hasError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span>
                  {errors[field.name]}
                </p>
              )}
              {isValid && field.type !== "file" && (
                <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                  <span className="font-medium">Looks good!</span>
                </p>
              )}
            </div>
          );
        })}
      </form>
    );
  };

  return (
    <Card
      variant="elevation"
      elevation={4}
      className="container flex mt-36 mb-12 rounded"
    >
      <div className="w-[50%]"></div>
      <div className="mx-auto p-6 w-[50%]">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && (
          <div className="mt-6">
            <label
              htmlFor="loanType"
              className={`block mb-2 text-sm font-medium text-gray-900`}
            >
              Select Loan Type
            </label>

            <select
              id="loanType"
              name="loanType"
              value={formData.loanType || ""}
              onChange={handleChange}
              //   onBlur={() => setTouched((prev) => ({ ...prev, loanType: true }))}
              className={`${
                errors.loanType
                  ? "bg-red-50 border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500"
                  : touched.loanType
                  ? "bg-green-50 border-green-500 text-green-900 focus:ring-green-500 focus:border-green-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              } text-sm rounded-lg block w-full p-2.5`}
            >
              <option value="">-- Choose --</option>
              <option value="personal">Personal Loan</option>
              <option value="home">Home Loan</option>
              <option value="education">Education Loan</option>
            </select>

            {errors.loanType && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span> {errors.loanType}
              </p>
            )}

            {touched.loanType && !errors.loanType && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                <span className="font-medium">Looks good!</span>
              </p>
            )}
          </div>
        )}
        {activeStep === 1 && renderFormFields()}
        {activeStep === 2 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Review Your Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Show Loan Type */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Loan Type
                </label>
                <input
                  type="text"
                  value={loanType}
                  disabled
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>

              {/* Show all form data fields */}
              {Object.entries(formData).map(([key, value]) => (
                <div key={key}>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (char) => char.toUpperCase())}
                  </label>
                  {value instanceof File ? (
                    <input
                      type="text"
                      value={value.name}
                      disabled
                      className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                  ) : (
                    <input
                      type="text"
                      value={value}
                      disabled
                      className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[100%] max-w-md flex flex-col items-center">
              {!animationDone ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    className="mb-4"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#4CAF50"
                      strokeWidth="6"
                      fill="none"
                      className="animate-circle"
                    />
                    <path
                      d="M30 52 L45 67 L70 40"
                      fill="none"
                      stroke="#4CAF50"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-check"
                    />
                  </svg>
                  <p className="text-lg font-semibold text-gray-800">
                    Application Submitted
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    🎉 Loan Application Submitted!
                  </h2>
                  <p className="text-gray-700 mb-2">
                    Your application has been successfully submitted and is
                    currently under review by our partnered financial
                    institutions.
                  </p>
                  <p className="text-gray-700 mb-2">
                    You will receive regular updates via
                    <span className="font-medium">SMS</span>,
                    <span className="font-medium">Email</span>, and even through
                    <span className="font-medium">WhatsApp</span> if enabled.
                  </p>
                  <p className="text-gray-700 mb-4">
                    You can also monitor the real-time status of your
                    application from your
                    <span className="font-semibold text-blue-700">
                      Loan Tracker Dashboard
                    </span>
                    .
                  </p>
                  <div className="flex justify-end w-full gap-3 mt-6">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      📍 Go to Loan Tracker
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
