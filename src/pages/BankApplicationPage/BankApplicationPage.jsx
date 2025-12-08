// import React, { useState } from "react";
// import { Stepper, Step, StepLabel, Card } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export default function BankApplicationPage() {
//   const steps = ["Choose Loan Type", "Fill Application", "Review & Submit"];
//   const [activeStep, setActiveStep] = useState(0);
//   const [loanType, setLoanType] = useState("");
//   const [formData, setFormData] = useState({});
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [animationDone, setAnimationDone] = useState(false);
//   const navigate = useNavigate();

//   const loanFields = {
//     personal: [
//       { name: "loanAmount", label: "Desired Loan Amount", type: "number" },
//       { name: "employmentStatus", label: "Employment Status", type: "text" },
//       { name: "monthlyIncome", label: "Monthly Income", type: "number" },
//       { name: "city", label: "City", type: "text" },
//       { name: "firstName", label: "First Name", type: "text" },
//       { name: "lastName", label: "Last Name", type: "text" },
//       { name: "mobileNumber", label: "Mobile Number", type: "tel" },
//       { name: "email", label: "E-Mail ID", type: "email" },
//       { name: "residentialStatus", label: "Residential Status", type: "text" },
//       { name: "companyName", label: "Company Name", type: "text" },
//       // { name: "panCard", label: "Upload PAN Card", type: "file" }, // ✅ NEW FILE FIELD
//     ],
//     home: [
//       { name: "loanAmount", label: "Desired Loan Amount", type: "number" },
//       { name: "propertyLocation", label: "Property Location", type: "text" },
//       {
//         name: "propertyValue",
//         label: "Estimated Property Value",
//         type: "number",
//       },
//       { name: "downPayment", label: "Down Payment", type: "number" },
//       { name: "monthlyIncome", label: "Monthly Income", type: "number" },
//       { name: "employmentStatus", label: "Employment Status", type: "text" },
//       { name: "firstName", label: "First Name", type: "text" },
//       { name: "lastName", label: "Last Name", type: "text" },
//       { name: "mobileNumber", label: "Mobile Number", type: "tel" },
//       { name: "email", label: "E-Mail ID", type: "email" },
//       // { name: "panCard", label: "Upload PAN Card", type: "file" }, // ✅ NEW FILE FIELD
//     ],
//     education: [
//       { name: "loanAmount", label: "Desired Loan Amount", type: "number" },
//       { name: "institutionName", label: "Institution Name", type: "text" },
//       { name: "courseName", label: "Course Name", type: "text" },
//       {
//         name: "courseDuration",
//         label: "Course Duration (years)",
//         type: "number",
//       },
//       { name: "guardianName", label: "Parent/Guardian Name", type: "text" },
//       {
//         name: "guardianIncome",
//         label: "Guardian Monthly Income",
//         type: "number",
//       },
//       { name: "city", label: "City", type: "text" },
//       { name: "firstName", label: "First Name", type: "text" },
//       { name: "lastName", label: "Last Name", type: "text" },
//       { name: "mobileNumber", label: "Mobile Number", type: "tel" },
//       { name: "email", label: "E-Mail ID", type: "email" },
//       // { name: "panCard", label: "Upload PAN Card", type: "file" },
//     ],
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     console.log(value);

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // If loanType changes, update derived loanType state
//     if (name === "loanType") {
//       setLoanType(value);
//     }

//     // Clear errors as user types
//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   };

//   const handleNext = () => {
//     if (activeStep === 0) {
//       const touchedUpdate = { loanType: true };
//       setTouched((prev) => ({ ...prev, ...touchedUpdate }));

//       if (!loanType) {
//         setErrors({ loanType: "Please select a loan type" });
//         return;
//       }

//       setErrors({});
//     }

//     if (activeStep === 1) {
//       const currentFields = loanFields[loanType] || [];
//       const newErrors = {};
//       const newTouched = {};

//       currentFields.forEach((field) => {
//         const value = formData[field.name];
//         newTouched[field.name] = true;

//         if (!value || value.trim() === "") {
//           newErrors[field.name] = `${field.label} is required`;
//         }
//       });

//       setErrors(newErrors);
//       setTouched(newTouched);

//       if (Object.keys(newErrors).length > 0) return;
//       console.log("✅ Submitted data:", formData);
//     }

//     if (activeStep === 2) {
//       setShowModal(true);
//       setAnimationDone(false); // reset
//       setTimeout(() => {
//         setAnimationDone(true);
//       }, 1500); // wait 1.5s for tick animation
//       return;
//     }

//     setActiveStep((prev) => prev + 1);
//   };

//   const handleConfirm = () => {
//     setShowModal(false);
//     console.log("✅ Final submitted data:", formData);
//     navigate("/process");
//   };

//   const handleBack = () => {
//     setActiveStep((prev) => prev - 1);
//   };

//   const renderFormFields = () => {
//     const fields = loanFields[loanType] || [];
//     return (
//       <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-6">
//         {fields.map((field) => {
//           const hasError = errors[field.name];
//           const isTouched = touched[field.name];
//           const isValid = isTouched && !hasError;

//           return (
//             <div key={field.name} className="md:col-span-1">
//               <label
//                 htmlFor={field.name}
//                 className={`block mb-2 text-sm font-medium ${
//                   hasError
//                     ? "text-red-700 dark:text-red-500"
//                     : isValid
//                     ? "text-green-700 dark:text-green-500"
//                     : "text-gray-900"
//                 }`}
//               >
//                 {field.label}
//               </label>

//               {field.type === "file" ? (
//                 <>
//                   <input
//                     id={field.name}
//                     name={field.name}
//                     type="file"
//                     className={`block w-full text-sm border rounded-lg cursor-pointer bg-gray-50 focus:outline-none ${
//                       hasError
//                         ? "border-red-500 text-red-900"
//                         : isValid
//                         ? "border-green-500 text-green-900"
//                         : "border-gray-300 text-gray-900"
//                     }`}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         [field.name]: e.target.files[0],
//                       }))
//                     }
//                     // onBlur={() =>
//                     //   setTouched((prev) => ({ ...prev, [field.name]: true }))
//                     // }
//                   />
//                   <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
//                     Upload a clear image of your PAN Card.
//                   </p>
//                 </>
//               ) : (
//                 <>
//                   <input
//                     id={field.name}
//                     type={field.type}
//                     name={field.name}
//                     value={formData[field.name] || ""}
//                     onChange={handleChange}
//                     // onBlur={() =>
//                     //   setTouched((prev) => ({ ...prev, [field.name]: true }))
//                     // }
//                     className={`${
//                       hasError
//                         ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
//                         : isValid
//                         ? "bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500"
//                         : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
//                     } text-sm rounded-lg block w-full p-2.5`}
//                     placeholder={field.label}
//                   />
//                 </>
//               )}

//               {hasError && (
//                 <p className="mt-2 text-sm text-red-600 dark:text-red-500">
//                   <span className="font-medium">Oops!</span>
//                   {errors[field.name]}
//                 </p>
//               )}
//               {isValid && field.type !== "file" && (
//                 <p className="mt-2 text-sm text-green-600 dark:text-green-500">
//                   <span className="font-medium">Looks good!</span>
//                 </p>
//               )}
//             </div>
//           );
//         })}
//       </form>
//     );
//   };

//   return (
//     <Card
//       variant="elevation"
//       elevation={4}
//       className="container flex mt-36 mb-12 rounded"
//     >
//       <div className="w-[50%]"></div>
//       <div className="mx-auto p-6 w-[50%]">
//         <Stepper activeStep={activeStep} alternativeLabel>
//           {steps.map((label) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>
//         {activeStep === 0 && (
//           <div className="mt-6">
//             <label
//               htmlFor="loanType"
//               className={`block mb-2 text-sm font-medium text-gray-900`}
//             >
//               Select Loan Type
//             </label>

//             <select
//               id="loanType"
//               name="loanType"
//               value={formData.loanType || ""}
//               onChange={handleChange}
//               //   onBlur={() => setTouched((prev) => ({ ...prev, loanType: true }))}
//               className={`${
//                 errors.loanType
//                   ? "bg-red-50 border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500"
//                   : touched.loanType
//                   ? "bg-green-50 border-green-500 text-green-900 focus:ring-green-500 focus:border-green-500"
//                   : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
//               } text-sm rounded-lg block w-full p-2.5`}
//             >
//               <option value="">-- Choose --</option>
//               <option value="personal">Personal Loan</option>
//               <option value="home">Home Loan</option>
//               <option value="education">Education Loan</option>
//             </select>

//             {errors.loanType && (
//               <p className="mt-2 text-sm text-red-600 dark:text-red-500">
//                 <span className="font-medium">Oops!</span> {errors.loanType}
//               </p>
//             )}

//             {touched.loanType && !errors.loanType && (
//               <p className="mt-2 text-sm text-green-600 dark:text-green-500">
//                 <span className="font-medium">Looks good!</span>
//               </p>
//             )}
//           </div>
//         )}
//         {activeStep === 1 && renderFormFields()}
//         {activeStep === 2 && (
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-4">Review Your Details</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Show Loan Type */}
//               <div>
//                 <label className="block mb-2 text-sm font-medium text-gray-900">
//                   Loan Type
//                 </label>
//                 <input
//                   type="text"
//                   value={loanType}
//                   disabled
//                   className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                 />
//               </div>

//               {/* Show all form data fields */}
//               {Object.entries(formData).map(([key, value]) => (
//                 <div key={key}>
//                   <label className="block mb-2 text-sm font-medium text-gray-900">
//                     {key
//                       .replace(/([A-Z])/g, " $1")
//                       .replace(/^./, (char) => char.toUpperCase())}
//                   </label>
//                   {value instanceof File ? (
//                     <input
//                       type="text"
//                       value={value.name}
//                       disabled
//                       className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                     />
//                   ) : (
//                     <input
//                       type="text"
//                       value={value}
//                       disabled
//                       className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex justify-between mt-6">
//           <button
//             onClick={handleBack}
//             disabled={activeStep === 0}
//             className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
//           >
//             Back
//           </button>
//           <button
//             onClick={handleNext}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             {activeStep === steps.length - 1 ? "Submit" : "Next"}
//           </button>
//         </div>

//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-[100%] max-w-md flex flex-col items-center">
//               {!animationDone ? (
//                 <div className="flex flex-col items-center justify-center py-6">
//                   <svg
//                     width="100"
//                     height="100"
//                     viewBox="0 0 100 100"
//                     className="mb-4"
//                   >
//                     <circle
//                       cx="50"
//                       cy="50"
//                       r="45"
//                       stroke="#4CAF50"
//                       strokeWidth="6"
//                       fill="none"
//                       className="animate-circle"
//                     />
//                     <path
//                       d="M30 52 L45 67 L70 40"
//                       fill="none"
//                       stroke="#4CAF50"
//                       strokeWidth="6"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="animate-check"
//                     />
//                   </svg>
//                   <p className="text-lg font-semibold text-gray-800">
//                     Application Submitted
//                   </p>
//                 </div>
//               ) : (
//                 <>
//                   <h2 className="text-2xl font-bold text-gray-800 mb-3">
//                     🎉 Loan Application Submitted!
//                   </h2>
//                   <p className="text-gray-700 mb-2">
//                     Your application has been successfully submitted and is
//                     currently under review by our partnered financial
//                     institutions.
//                   </p>
//                   <p className="text-gray-700 mb-2">
//                     You will receive regular updates via
//                     <span className="font-medium">SMS</span>,
//                     <span className="font-medium">Email</span>, and even through
//                     <span className="font-medium">WhatsApp</span> if enabled.
//                   </p>
//                   <p className="text-gray-700 mb-4">
//                     You can also monitor the real-time status of your
//                     application from your
//                     <span className="font-semibold text-blue-700">
//                       Loan Tracker Dashboard
//                     </span>
//                     .
//                   </p>
//                   <div className="flex justify-end w-full gap-3 mt-6">
//                     <button
//                       onClick={() => setShowModal(false)}
//                       className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
//                     >
//                       Close
//                     </button>
//                     <button
//                       onClick={handleConfirm}
//                       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//                     >
//                       📍 Go to Loan Tracker
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </Card>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import { Stepper, Step, StepLabel, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

// --- DUMMY DATA FOR FETCHED USER ---
const DUMMY_USER_DATA = {
  firstName: "Aarav",
  lastName: "Sharma",
  email: "aarav.sharma@example.com",
  panCard: "ABCDE1234F",
  dateOfBirth: "1990-05-15",
  employmentStatus: "Salaried",
  companyName: "TechCorp Solutions",
  monthlyIncome: 85000,
  residentialStatus: "Own",
  address: {
    line1: "123, Jubilee Hills Road",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500033",
  },
};
// ------------------------------------

export default function BankApplicationPage() {
  // New steps to reflect the Aadhaar/API-based flow
  const steps = [
    "Verify Mobile & Fetch Data",
    "Review Personal Details",
    "Review Employment & Income",
    "Select Loan Requirement", // The final step for loan details
    "Review & Submit",
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [fetchedUserData, setFetchedUserData] = useState({});
  const [loanDetails, setLoanDetails] = useState({
    loanType: "",
    loanAmount: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const navigate = useNavigate();

  // Ref for OTP inputs to handle auto-focus
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Separate the fetched data for review steps
  const personalDetails = {
    "First Name": fetchedUserData.firstName,
    "Last Name": fetchedUserData.lastName,
    "Date of Birth": fetchedUserData.dateOfBirth,
    "PAN Card": fetchedUserData.panCard,
    "E-Mail ID": fetchedUserData.email,
  };

  const contactAndIncome = {
    "Mobile Number": mobileNumber,
    "Employment Status": fetchedUserData.employmentStatus,
    "Company Name": fetchedUserData.companyName,
    "Monthly Income": fetchedUserData.monthlyIncome,
    "Residential Status": fetchedUserData.residentialStatus,
    Address: `${fetchedUserData.address?.line1}, ${fetchedUserData.address?.city}, ${fetchedUserData.address?.state} - ${fetchedUserData.address?.pincode}`,
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobileNumber(value);
    // Clear errors when user types
    setErrors((prev) => ({ ...prev, mobileNumber: "" }));
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrors((prev) => ({ ...prev, otp: "" }));

    // Auto-focus to the next input field
    if (value && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus();
    }
    // Auto-verify if all fields are filled
    if (newOtp.every((digit) => digit !== "") && newOtp.length === 4) {
      setTimeout(() => verifyOtp(newOtp.join("")), 100);
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const sendOtp = () => {
    if (mobileNumber.length !== 10) {
      setErrors({
        mobileNumber: "Please enter a valid 10-digit mobile number",
      });
      return;
    }
    setIsOtpSent(true);
    setErrors({});
    console.log(`Fake OTP sent to: ${mobileNumber}`);
  };

  const verifyOtp = (enteredOtp) => {
    // Dummy verification logic
    if (enteredOtp === "1234") {
      setIsMobileVerified(true);
      setFetchedUserData(DUMMY_USER_DATA); // Populate with fetched data
      setErrors({});
      setTimeout(() => setActiveStep(1), 500); // Move to next step after verification
    } else {
      setErrors({ otp: "Invalid OTP. Please try again." });
      setOtp(["", "", "", ""]); // Reset OTP fields
      otpRefs[0].current.focus();
    }
  };

  const handleLoanDetailsChange = (e) => {
    const { name, value } = e.target;
    setLoanDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNext = () => {
    let newErrors = {};

    if (activeStep === 0) {
      if (!isMobileVerified) {
        if (!mobileNumber || mobileNumber.length !== 10) {
          newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
        }
        if (isOtpSent && otp.some((d) => d === "")) {
          newErrors.otp = "Please enter the 4-digit OTP.";
        }
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
        if (isOtpSent) {
          verifyOtp(otp.join("")); // Manual trigger for OTP check
          return;
        }
        sendOtp();
        return;
      }
    }

    if (activeStep === 3) {
      if (!loanDetails.loanType) {
        newErrors.loanType = "Please select a loan type.";
      }
      if (!loanDetails.loanAmount || Number(loanDetails.loanAmount) <= 0) {
        newErrors.loanAmount = "Enter a valid loan amount.";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }

    if (activeStep === steps.length - 1) {
      // Final Review & Submit step
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
    console.log("✅ Final submitted data:", {
      ...fetchedUserData,
      mobileNumber,
      ...loanDetails,
    });
    navigate("/process");
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setErrors({}); // Clear errors on back
  };

  const renderDataReview = (data, title) => (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4 text-blue-700">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              {key}
            </label>
            <input
              type="text"
              value={value}
              disabled
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:opacity-100"
            />
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600 italic">
        *Data fetched via your Aadhaar-linked mobile number. Please proceed if
        the details are correct.
      </p>
    </div>
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case 0: // Verify Mobile & Fetch Data
        return (
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-bold mb-4 text-gray-700">
              Step 1: Mobile Verification (Aadhaar Linked)
            </h3>
            <div className="mb-4">
              <label
                htmlFor="mobileNumber"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter Mobile Number
              </label>
              <input
                id="mobileNumber"
                type="tel"
                value={mobileNumber}
                onChange={handleMobileChange}
                disabled={isOtpSent}
                className={`text-sm rounded-lg block w-full p-2.5 ${
                  errors.mobileNumber
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
                placeholder="10-digit mobile number"
              />
              {errors.mobileNumber && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            {isOtpSent && !isMobileVerified && (
              <div className="mt-4">
                <p className="mb-3 text-sm text-green-600 font-medium">
                  OTP Sent to {mobileNumber}. Please check your Aadhaar-linked
                  mobile. (Use **1234** for demo)
                </p>
                <div className="flex justify-between max-w-xs mx-auto space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={otpRefs[index]}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg ${
                        errors.otp
                          ? "border-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                    />
                  ))}
                </div>
                {errors.otp && (
                  <p className="mt-2 text-sm text-red-600 font-medium text-center">
                    {errors.otp}
                  </p>
                )}
              </div>
            )}
          </div>
        );

      case 1: // Review Personal Details
        return renderDataReview(personalDetails, "Review Personal Details");

      case 2: // Review Employment & Income
        return renderDataReview(
          contactAndIncome,
          "Review Contact, Employment & Income"
        );

      case 3: // Select Loan Requirement
        return (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Step 4: Select Your Loan Requirement
            </h3>
            <div className="mb-4">
              <label
                htmlFor="loanType"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Loan Type
              </label>
              <select
                id="loanType"
                name="loanType"
                value={loanDetails.loanType}
                onChange={handleLoanDetailsChange}
                className={`text-sm rounded-lg block w-full p-2.5 ${
                  errors.loanType ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">-- Choose Loan Type --</option>
                <option value="personal">Personal Loan</option>
                <option value="home">Home Loan</option>
                <option value="education">Education Loan</option>
              </select>
              {errors.loanType && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {errors.loanType}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="loanAmount"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Desired Loan Amount (₹)
              </label>
              <input
                id="loanAmount"
                type="number"
                name="loanAmount"
                value={loanDetails.loanAmount}
                onChange={handleLoanDetailsChange}
                className={`text-sm rounded-lg block w-full p-2.5 ${
                  errors.loanAmount ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., 500000"
              />
              {errors.loanAmount && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {errors.loanAmount}
                </p>
              )}
            </div>
          </div>
        );

      case 4: // Final Review & Submit
        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4 text-green-700">
              Final Review: Confirm & Submit
            </h3>
            {/* Consolidated Review of all data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg bg-gray-50">
              <div className="md:col-span-2">
                <h4 className="font-bold text-lg text-blue-600 mb-2 border-b pb-1">
                  Loan Details
                </h4>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Loan Type:</span>
                  <span className="text-gray-700">
                    {loanDetails.loanType.charAt(0).toUpperCase() +
                      loanDetails.loanType.slice(1) || "Not Selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Loan Amount (₹):</span>
                  <span className="text-gray-700">
                    {loanDetails.loanAmount || "Not Entered"}
                  </span>
                </div>
              </div>

              <div className="md:col-span-2 mt-4">
                <h4 className="font-bold text-lg text-blue-600 mb-2 border-b pb-1">
                  Applicant Details (Auto-Filled)
                </h4>
                {[
                  ...Object.entries(personalDetails),
                  ...Object.entries(contactAndIncome),
                ].map(([key, value]) => (
                  <div key={key} className="flex justify-between mb-1 text-sm">
                    <span className="font-medium">{key}:</span>
                    <span className="text-gray-700 font-light">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm text-red-600 font-semibold">
              By clicking 'Submit', you confirm that all the details provided
              are correct and authorize us to process your loan application.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const showNextButton =
    activeStep === 0
      ? (isOtpSent && otp.every((d) => d !== "") && !isMobileVerified) || // OTP filled but not verified
        isMobileVerified // Verified
      : true;

  return (
    <Card
      variant="elevation"
      elevation={4}
      className="container flex mt-3 mb-12 rounded max-w-5xl" // Adjusted max-width for better layout
    >
      <div className="w-full">
        <div className="mx-auto p-6">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Render Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-4 border-t">
            <button
              onClick={handleBack}
              disabled={activeStep === 0}
              className="bg-gray-300 px-6 py-2 rounded-lg disabled:opacity-50 text-gray-800 font-medium hover:bg-gray-400 transition"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              // disabled={
              //   activeStep === 0 &&
              //   !isMobileVerified &&
              //   (!isOtpSent || otp.some((d) => d === ""))
              // } // Disable next in step 0 until verified or ready to send/verify
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {activeStep === steps.length - 1
                ? "Submit Application"
                : activeStep === 0 && !isOtpSent
                ? "Send OTP"
                : activeStep === 0 && isOtpSent && !isMobileVerified
                ? "Verify OTP"
                : "Next"}
            </button>
          </div>

          {/* Submission Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md flex flex-col items-center">
                {!animationDone ? (
                  // Animation Placeholder
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative w-20 h-20 mb-4">
                      <div className="absolute inset-0 border-4 border-t-4 border-blue-500 border-opacity-50 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">
                        ...
                      </div>
                    </div>
                    <p className="text-xl font-semibold text-gray-800">
                      Processing Application...
                    </p>
                  </div>
                ) : (
                  // Success Message
                  <>
                    <svg
                      className="w-16 h-16 text-green-500 mb-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                      🎉 Loan Application Submitted!
                    </h2>
                    <p className="text-gray-700 mb-2 text-center">
                      Your application for a **
                      {loanDetails.loanType.toUpperCase()} Loan** of **₹
                      {loanDetails.loanAmount}** has been successfully
                      submitted.
                    </p>
                    <p className="text-sm text-gray-600 mb-4 text-center">
                      We've fetched your personal details and are now reviewing
                      your eligibility. You'll receive updates shortly.
                    </p>
                    <div className="flex justify-end w-full gap-3 mt-6">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                      >
                        Close
                      </button>
                      <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
      </div>
    </Card>
  );
}
