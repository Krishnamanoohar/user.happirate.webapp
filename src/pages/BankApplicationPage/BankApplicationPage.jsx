import React, { useState, useRef } from "react";
import { Stepper, Step, StepLabel, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProvisionalSanctionLetter from "./ProvisionalSanctionLetter";
import { CheckCircle } from "lucide-react"; // For the success modal icon
import {
  sendOtpToMobile,
  verifyOtpApi,
  personalDetailsVerification,
  submitFinancialProfileDetails,
} from "../../../src/api/api";
import { ToastContainer, toast } from "react-toastify";

// --- DUMMY DATA FOR FETCHED USER ---
const DUMMY_USER_DATA1 = {
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

const DUMMY_USER_DATA = {
  firstName: "Maya",
  lastName: "Reddy",
  email: "maya.reddy@example.com",
  panCard: "FIHMP6789L",
  aadharCard: "3887 2202 4544",
  dateOfBirth: "1992-09-22",
  employmentStatus: "Salaried",
  companyName: "NovaTech Services Pvt Ltd",
  monthlyIncome: 78000,
  residentialStatus: "Rented",
  address: {
    line1: "Flat 402, Green Valley Apartments",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500084",
  },
  aadhar: "4678 3190 5821", // demo-only, not real
};

export default function BankApplicationPage() {
  const steps = [
    "Verify Mobile & Fetch Data",
    "Review & Edit Personal Details",
    "Review & Edit Employment and Credit Details",
    "Select Loan & Upload Documents",
    "Review & Submit",
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
const [showPreviewModal, setShowPreviewModal] = useState(false);
const [pslPdfUrl, setPslPdfUrl] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    panCard: "",
    dateOfBirth: "",
    employmentStatus: "",
    companyName: "",
    monthlyIncome: "",
    residentialStatus: "",
    addressLine1: "",
    city: "",
    state: "",
    pincode: "",
    loanType: "",
    loanAmount: "",
    itrFile: null,
    payslipsFile: null,
    photoFile: null,
  });

  const [consentChecked, setConsentChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [showProceedSuccess, setShowProceedSuccess] = useState(false); // NEW state for final confirmation
  const navigate = useNavigate();

  const otpRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const [previewFile, setPreviewFile] = useState(null);

  const formatDateToDDMMYYYY = (isoDate) => {
    if (!isoDate) return "";

    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

  const normalizeAadhaarForApi = (value) => {
    return value
      ?.replace(/\D/g, "")
      ?.replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3");
  };
  
  const validateAadhaar = (value) => {
    if (!value) return "Aadhaar number is required";
    const regex = /^\d{4}-\d{4}-\d{4}$/;
    return regex.test(value)
      ? null
      : "Aadhaar must be in format XXXX-XXXX-XXXX";
  };

  const validatePan = (value) => {
    if (!value) return "PAN is required";
    const pan = value.toUpperCase();
    const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return regex.test(pan) ? null : "PAN must be in format ABCDE1234F";
  };

  const validateGmail = (value) => {
    if (!value) return "Email is required";
    const regex = /^[a-z0-9._%+-]+@gmail\.com$/;
    return regex.test(value.toLowerCase())
      ? null
      : "Enter a valid Gmail address";
  };

  const validateEmploymentNumbers = () => {
    const errors = {};

    if (Number(formData.monthlyIncome) <= 0) {
      errors.monthlyIncome = "Monthly income must be greater than 0";
    }

    if (
      Number(formData.cibilScore) < 300 ||
      Number(formData.cibilScore) > 900
    ) {
      errors.cibilScore = "CIBIL score must be between 300 and 900";
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = "Pincode must be 6 digits";
    }

    if (!/^\d{12}$/.test(formData.uanNumber)) {
      errors.uanNumber = "UAN must be 12 digits";
    }

    return errors;
  };

  const mapDummyData = (data) => ({
    ...data,
    addressLine1: data.address.line1,
    city: data.address.city,
    state: data.address.state,
    pincode: data.address.pincode,
  });
const submitApplication = async () => {
  const payload = new FormData();

  // Append full form JSON
  payload.append("applicationData", JSON.stringify({
    mobileNumber,
    ...formData
  }));

  // Append files
  payload.append("itrFile", formData.itrFile);
  payload.append("photoFile", formData.photoFile);
  payload.append("payslip1", formData.payslip_1);
  payload.append("payslip2", formData.payslip_2);
  payload.append("payslip3", formData.payslip_3);

  const res = await fetch("http://localhost:8000/api/loan/submit", {
    method: "POST",
    body: payload
  });

  const data = await res.json();
  console.log("Application stored:", data);
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobileNumber(value);
    setErrors((prev) => ({ ...prev, mobileNumber: "" }));
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrors((prev) => ({ ...prev, otp: "" }));

    if (value && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus();
    }
    if (newOtp.every((digit) => digit !== "") && newOtp.length === 4) {
      setTimeout(() => verifyOtp(newOtp.join("")), 100);
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const buildMobilePayload = () => ({
    mobileNumber,
  });

  const buildPersonalDetailsPayload = () => ({
    firstName: formData.firstName,
    lastName: formData.lastName,
    dateOfBirth: formatDateToDDMMYYYY(formData.dateOfBirth),
    email: formData.email,
    panCard: formData.panCard,
    aadharCard: normalizeAadhaarForApi(formData.aadharCard),
  });

  const buildEmploymentDetailsPayload = () => ({
    employmentStatus: formData.employmentStatus,
    companyName: formData.companyName,
    uanNumber: formData.uanNumber,
    monthlyIncome: Number(formData.monthlyIncome),
    cibilScore: Number(formData.cibilScore),
    recentEnquiries: Number(formData.recentEnquiries),
    settlements: Number(formData.settlements),
    emiBounces: Number(formData.emiBounces),
    creditCardUtilization: Number(formData.creditCardUtilization),
    residentialStability: Number(formData.residentialStability),
    existingEmi: Number(formData.existingEmi),
    residentialType: formData.residentialType,
    addressLine1: formData.addressLine1,
    city: formData.city,
    state: formData.state,
    pincode: formData.pincode,
  });

  // const sendOtp = () => {
  //   if (mobileNumber.length !== 10) {
  //     setErrors({
  //       mobileNumber: "Please enter a valid 10-digit mobile number",
  //     });
  //     return;
  //   }
  //   if (!consentChecked) {
  //     setErrors({ consent: "You must agree to the consent statement." });
  //     return;
  //   }

  //   setIsOtpSent(true);
  //   setErrors({});
  //   console.log(`Fake OTP sent to: ${mobileNumber}`);
  // };

  const sendOtp = async () => {
    if (mobileNumber.length !== 10) {
      setErrors({
        mobileNumber: "Please enter a valid 10-digit mobile number",
      });
      return;
    }
    if (!consentChecked) {
      setErrors({ consent: "You must agree to the consent statement." });
      return;
    }

    setIsOtpSent(true);
    setErrors({});
    console.log(`Fake OTP sent to: ${mobileNumber}`);
  };

  const verifyOtp = async (enteredOtp) => {
    if (enteredOtp.length !== 6) {
      setErrors({ otp: "Enter valid 6-digit OTP" });
      return;
    }

  try {
    const res = await fetch("http://localhost:8000/api/kyc/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: mobileNumber }),
    });

    const kycData = await res.json();

    try {
      // const response = await verifyOtpApi(payload);
      const response = {
        status: "SUCCESS",
        message: "Application already exists",
        applicationId: "APP-1769421857214-714919",
        currentStep: 1,
        userProfile: {
          mobileNumber: "9346521702",
          firstName: "BAIKAN",
          lastName: "ARUN",
          dateOfBirth: "19/05/2000",
          panCard: "DQQPA3737P",
          email: "ARUNBAIKANI2000@GMAIL.COM",
          aadharCard: "XXXXXXXX0189",
          cibilScore: "760",
          residentialStatus: "Owns,Primary",
          addressLine1: "H NO 4-46 KUMMAR PALLY MANDAL BASHEERABAD",
          city: "BASHEERABAD",
          state: "AP",
          pincode: "503225",
        },
      };
      const profile = response?.userProfile;
      console.log("response------------>", response);
      toast.success("Otp Verified Successfully");
      setIsMobileVerified(true);
      setErrors({});
      setFormData((prev) => ({
        ...prev,

        // basic info
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        panCard: profile.panCard || "",
        aadharCard: profile.aadharCard || "",
        monthlyIncome: profile.monthlyIncome || "",
        cibilScore: profile.cibilScore || "",

        // address
        addressLine1: profile.addressLine1 || "",
        city: profile.city || "",
        state: profile.state || "",
        pincode: profile.pincode || "",

        // residential mapping (IMPORTANT)
        residentialType: profile.residentialStatus || "",

        // date formatting
        dateOfBirth: profile.dateOfBirth
          ? profile.dateOfBirth.split("/").reverse().join("-")
          : "",
      }));
      // setFormData((prev) => ({
      //   ...prev,
      //   ...mapDummyData(DUMMY_USER_DATA),
      // }));

      setTimeout(() => setActiveStep(1), 300);
    } catch (error) {
      toast.error("OTP verification failed");
      console.error(
        "OTP verification failed:",
        error.response?.data || error.message,
      );

      setErrors({ otp: error.response?.data?.message || "Invalid OTP" });
      setOtp(["", "", "", "", "", ""]);
      otpRefs[0]?.current?.focus();
    }
  };

  const handleNext = () => {
    let newErrors = {};

    if (activeStep === 0) {
      if (!isMobileVerified) {
        if (!mobileNumber || mobileNumber.length !== 10) {
          newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
        }
        if (!consentChecked) {
          newErrors.consent = "You must provide consent to proceed.";
        }
        if (isOtpSent && otp.some((d) => d === "")) {
          newErrors.otp = "Please enter the 6-digit OTP.";
        }

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }

        if (isOtpSent) {
          verifyOtp(otp.join(""));
          return;
        }
        sendOtp();
        return;
      }
    }

    if (activeStep === 1 || activeStep === 2) {
      const fieldsToValidate =
        activeStep === 1
          ? ["firstName", "lastName", "email", "panCard"]
          : ["monthlyIncome", "employmentStatus", "addressLine1"];
      fieldsToValidate.forEach((field) => {
        if (!formData[field]) {
          newErrors[field] = `${field
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} is required.`;
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }

    if (activeStep === 3) {
  const requiredFiles = ["itrFile", "photoFile", "payslip_1", "payslip_2", "payslip_3"];
  let fileErrors = {};

  requiredFiles.forEach((f) => {
    if (!formData[f]) fileErrors[f] = "Required";
  });

  if (Object.keys(fileErrors).length > 0) {
    setErrors(fileErrors);
    return;
  }

  // Instead of moving to step 4 directly
  setShowPreviewModal(true);
  return;
}


    if (activeStep === steps.length - 1) {
      // Final Review -> Show PSL modal
      setShowModal(true);
      setAnimationDone(false); // reset animation state
      setTimeout(() => {
        setAnimationDone(true); // Simulate PSL generation complete
      }, 1500);
      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  // Function to handle "Accept & Proceed" from PSL
  const handleAcceptAndProceed = () => {
    setShowModal(false); // Close the PSL modal
    setShowProceedSuccess(true); // Show the final success popup
  };

  const handleFinalNavigation = () => {
    setShowProceedSuccess(false);
    console.log("✅ Final submission data for tracking:", formData);
    navigate("/loan-tracking-dashboard"); // Redirect to the tracking page
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setErrors({});
  };

  // Helper to render editable/review fields (Unchanged)
  const renderEditableFields = (fields, title) => {
    // ... (renderEditableFields content remains the same)
    const personalFields = [
      { name: "firstName", label: "First Name" },
      { name: "lastName", label: "Last Name" },
      { name: "dateOfBirth", label: "Date of Birth", type: "date" },
      { name: "panCard", label: "PAN Card", disabled: true },
      { name: "email", label: "E-Mail ID", type: "email" },
      { name: "aadharCard", label: "Aadhar Card" },
      { name: "addressLine1", label: "Address Line 1" },
      { name: "city", label: "City" },
      { name: "state", label: "State" },
      { name: "pincode", label: "Pincode" },
      { name: "residentialType", label: "Residential Type" },
    ];

    const employmentFields = [
      { name: "employmentStatus", label: "Employment Status" },
      { name: "companyName", label: "Company Name" },
      { name: "uan", label: "UAN / PF Number" },
      { name: "monthlyIncome", label: "Monthly Income (₹)", type: "number" },
      { name: "cibilScore", label: "Cibil Score", type: "number" },
      { name: "recentEnquiries", label: "Recent Enquiries" },
      { name: "settlements", label: "Settlements" },
      { name: "emiBounces", label: "EMI Bounces" },
      { name: "creditCardUtilization", label: "Credit Card Utilization" },
      { name: "residentialStability", label: "Residential Stability" },
      { name: "existingEmi", label: "Existing EMI" },
    ];

    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-700">{title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
          {(title.includes("Personal") ? personalFields : employmentFields).map(
            ({ name, label, type = "text", disabled = false }) => {
              const hasError = errors[name];
              const isFile = type === "file";
              const displayValue = isFile
                ? formData[name]
                  ? formData[name].name
                  : ""
                : formData[name] || "";

              return (
                <div key={name} className="md:col-span-1">
                  <label
                    htmlFor={name}
                    className={`block mb-2 text-sm font-medium ${
                      hasError ? "text-red-700" : "text-gray-900"
                    }`}
                  >
                    {label}
                  </label>

                  {isFile ? (
                    <>
                      <input
                        id={name}
                        name={name}
                        type="file"
                        onChange={handleFileChange}
                        className={`block w-full text-sm border rounded-lg cursor-pointer bg-gray-50 focus:outline-none ${
                          hasError
                            ? "border-red-500 text-red-900"
                            : "border-gray-300 text-gray-900"
                        }`}
                      />
                      {displayValue && (
                        <p className="mt-1 text-xs text-gray-500">
                          File attached: {displayValue}
                        </p>
                      )}
                    </>
                  ) : (
                    <input
                      id={name}
                      type={type}
                      name={name}
                      value={displayValue}
                      onChange={handleChange}
                      disabled={disabled && isMobileVerified}
                      className={`text-sm rounded-lg block w-full p-2.5 ${
                        hasError
                          ? "bg-red-50 border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      } ${
                        disabled
                          ? "disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed"
                          : ""
                      }`}
                      placeholder={label}
                    />
                  )}

                  {hasError && (
                    <p className="mt-2 text-sm text-red-600 font-medium">
                      {errors[name]}
                    </p>
                  )}
                </div>
              );
            }
          )}
        </div>
        <p className="mt-4 text-sm text-gray-600 italic">
          *Review the pre-filled data. You may edit any field if needed.
        </p>
      </div>
    );
    // ...
  };

  // Field definitions for review steps (Moved inside renderEditableFields to avoid redundancy)

  const renderStepContent = () => {
    switch (activeStep) {
      case 0: // Verify Mobile & Fetch Data
        return (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-bold mb-4 text-gray-700">
              Step 1: Mobile Verification
            </h3>
            <div className="mb-4">
              <label
                htmlFor="mobileNumber"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter Aadhaar-Linked Mobile Number
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

            {/* 2. Consent Checkbox */}
            <div className="flex items-center mb-4">
              <input
                id="consent"
                type="checkbox"
                checked={consentChecked}
                onChange={() => {
                  setConsentChecked(!consentChecked);
                  setErrors((prev) => ({ ...prev, consent: "" }));
                }}
                disabled={isOtpSent}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="consent"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                I authorize this bank to securely fetch my personal, income, and
                KYC details via my Aadhaar-linked mobile number for instant
                pre-approval checks.
              </label>
            </div>
            {errors.consent && (
              <p className="mb-4 text-sm text-red-600 font-medium">
                {errors.consent}
              </p>
            )}

            {isOtpSent && !isMobileVerified && (
              <div className="mt-4">
                <p className="mb-3 text-sm text-green-600 font-medium">
                  OTP Sent to {mobileNumber}. Please check your mobile. (Use
                  **1234** for demo)
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

      case 1: // Review & Edit Personal Details
        return renderEditableFields(null, "Review & Edit Personal Details");

      case 2: // Review & Edit Employment & Income
        return renderEditableFields(
          null,
          "Review & Edit Employment, Income & Address"
        );

      case 3: // Select Loan & Upload Documents
        return (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Step 4: Loan Requirement & Document Upload
            </h3>

            {/* Loan Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <label
                  htmlFor="loanType"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Loan Type *
                </label>
                <select
                  id="loanType"
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleChange}
                  className={`text-sm rounded-lg block w-full p-2.5 ${
                    errors.loanType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">-- Choose Loan Type --</option>
                  <option value="personal">Personal Loan</option>
                  {/* <option value="home">Home Loan</option> */}
                  <option value="education">Education Loan</option>
                  <option value="buisness">Buisness Loan</option>
                  <option value="home">Home Loan</option>
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
                  Desired Loan Amount (₹) *
                </label>
                <input
                  id="loanAmount"
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
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

            {/* 3. Document Upload Section */}
            <h4 className="font-semibold text-lg text-gray-700 mb-3 border-t pt-4">
              Required Documents
            </h4>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "itrFile", label: "Last 3 Years ITR/Form 16 *" },
                { name: "photoFile", label: "Applicant Photo Upload *" },
                { name: "payslipsFile", label: "Last 3 Months Payslips *" },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="file"
                    accept={
                      field.name === "photoFile"
                        ? "image/*"
                        : ".pdf,.doc,.docx,.jpg,.png"
                    }
                    onChange={handleFileChange}
                    className={`block w-full text-sm border rounded-lg cursor-pointer bg-white focus:outline-none ${
                      errors[field.name]
                        ? "border-red-500 text-red-900"
                        : "border-gray-300 text-gray-900"
                    }`}
                  />
                  {formData[field.name] && (
                    <p className="mt-1 text-xs text-gray-500">
                      Attached: {formData[field.name].name}
                    </p>
                  )}
                  {errors[field.name] && (
                    <p className="mt-2 text-sm text-red-600 font-medium">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "itrFile", label: "Last 3 Years ITR/Form 16 *" },
                { name: "photoFile", label: "Applicant Photo Upload *" },
                { name: "payslipsFile", label: "Last 3 Months Payslips *" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    {field.label}
                  </label>

                  {field.name === "payslipsFile" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                      {[1, 2, 3].map((n) => {
                        const fieldKey = `payslip_${n}`;
                        const file = formData[fieldKey];

                        return (
                          <div
                            key={fieldKey}
                            className="flex flex-col items-center gap-1"
                          >
                            <div
                              onClick={() =>
                                document.getElementById(fieldKey).click()
                              }
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => {
                                e.preventDefault();
                                handleFileChange({
                                  target: {
                                    name: fieldKey,
                                    files: e.dataTransfer.files,
                                  },
                                });
                              }}
                              className={`flex flex-col items-center justify-center h-28 w-full rounded-xl border-2 border-dashed cursor-pointer transition px-2
              ${
                errors[fieldKey]
                  ? "border-red-400 bg-red-50"
                  : "border-blue-300 bg-blue-50 hover:bg-blue-100"
              }`}
                            >
                              <svg
                                className="w-8 h-8 text-blue-500 mb-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h4l2-2h2l2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z" />
                              </svg>

                              <p className="text-[11px] text-gray-600 text-center truncate w-full">
                                {file ? file.name : "Drag or click"}
                              </p>

                              <input
                                id={fieldKey}
                                type="file"
                                name={fieldKey}
                                hidden
                                accept=".pdf"
                                onChange={handleFileChange}
                              />
                            </div>

                            {/* 🔹 PREVIEW BUTTON */}
                            {file && (
                              <button
                                type="button"
                                onClick={() => setPreviewFile(file)}
                                className="text-xs text-blue-600 hover:underline"
                              >
                                Preview
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      <input
                        id={field.name}
                        name={field.name}
                        type="file"
                        accept={
                          field.name === "photoFile"
                            ? "image/*"
                            : ".pdf,.doc,.docx,.jpg,.png"
                        }
                        onChange={handleFileChange}
                        className={`block w-full text-sm border rounded-lg cursor-pointer bg-white focus:outline-none ${
                          errors[field.name]
                            ? "border-red-500 text-red-900"
                            : "border-gray-300 text-gray-900"
                        }`}
                      />

                      {formData[field.name] && (
                        <p className="mt-1 text-xs text-gray-500">
                          Attached: {formData[field.name].name}
                        </p>
                      )}
                    </>
                  )}

                  {errors[field.name] && (
                    <p className="mt-2 text-sm text-red-600 font-medium">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {previewFile && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-xl w-full max-w-3xl relative max-h-[90vh] overflow-auto">
                  <button
                    className="absolute top-2 right-3 text-gray-600 hover:text-gray-800"
                    onClick={() => setPreviewFile(null)}
                  >
                    ✕
                  </button>

                  {previewFile.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(previewFile)}
                      alt="Preview"
                      className="max-h-[80vh] mx-auto"
                    />
                  ) : (
                    <iframe
                      src={URL.createObjectURL(previewFile)}
                      className="w-full h-[80vh]"
                      title="Preview"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 4: // Final Review & Submit
        const reviewKeys = Object.keys(formData).filter(
          (key) => !(formData[key] instanceof File)
        );

        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4 text-green-700">
              Final Review: Confirm & Submit
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg bg-gray-50">
              {/* Review Loan Details & Mobile Number */}
              <div className="md:col-span-2">
                <h4 className="font-bold text-lg text-blue-600 mb-2 border-b pb-1">
                  Loan & Contact Details
                </h4>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">Mobile Number:</span>
                  <span className="text-gray-700">{mobileNumber}</span>
                </div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">Loan Type:</span>
                  <span className="text-gray-700">{formData.loanType}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="font-medium">Loan Amount (₹):</span>
                  <span className="text-gray-700">{formData.loanAmount}</span>
                </div>
              </div>

              {/* Review Personal/Employment Data */}
              <div className="md:col-span-2 mt-2">
                <h4 className="font-bold text-lg text-blue-600 mb-2 border-b pb-1">
                  Applicant Details
                </h4>
                {reviewKeys.map((key) => {
                  if (key === "loanType" || key === "loanAmount") return null;
                  const label = key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase());
                  return (
                    <div
                      key={key}
                      className="flex justify-between mb-1 text-sm"
                    >
                      <span className="font-medium">{label}:</span>
                      {typeof formData[key] === "object" &&
                      key === "address" ? (
                        <div className="text-gray-700 font-light text-right">
                          <div>{formData[key].line1}</div>
                          <div>
                            {formData[key].city}, {formData[key].state}
                          </div>
                          <div>{formData[key].pincode}</div>
                        </div>
                      ) : (
                        <span className="text-gray-700 font-light">
                          {formData[key]}
                        </span>
                      )}

                      {/* <span className="text-gray-700 font-light">
                        {formData[key]}
                      </span> */}
                    </div>
                  );
                })}
              </div>

              {/* Review Uploaded Documents */}
              <div className="md:col-span-2 mt-2">
                <h4 className="font-bold text-lg text-blue-600 mb-2 border-b pb-1">
                  Uploaded Documents
                </h4>
                {[
                  { key: "itrFile", label: "Last 3 Months ITR" },
                  { key: "payslipsFile", label: "Last 3 Months Payslips" },
                  { key: "photoFile", label: "Applicant Photo" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex justify-between mb-1 text-sm">
                    <span className="font-medium">{label}:</span>
                    <span className="text-green-700 font-light">
                      {formData[key]
                        ? `✅ ${formData[key].name}`
                        : "❌ Not Uploaded"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm text-red-600 font-semibold">
              By clicking 'View Sanction Letter', you are submitting the
              application for initial assessment.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card
      variant="elevation"
      elevation={4}
      className="container flex mt-6 mb-12 rounded mx-auto max-w-4xl"
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
              disabled={
                activeStep === 0 &&
                !isMobileVerified &&
                (!consentChecked ||
                  !mobileNumber ||
                  (isOtpSent && otp.some((d) => d === "")))
              }
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {activeStep === steps.length - 1
                ? "View Sanction Letter"
                : activeStep === 0 && !isOtpSent
                ? "Send OTP"
                : activeStep === 0 && isOtpSent && !isMobileVerified
                ? "Verify OTP"
                : "Next"}
            </button>
          </div>

          {/* Modal 1: Provisional Sanction Letter (PSL) */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="w-full max-w-5xl h-[90vh]">
                {!animationDone ? (
                  <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center justify-center h-full">
                    <div className="relative w-20 h-20 mb-4">
                      <div className="absolute inset-0 border-4 border-t-4 border-blue-500 border-opacity-50 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">
                        AI
                      </div>
                    </div>
                    <p className="text-xl font-semibold text-gray-800">
                      Generating Provisional Sanction Letter...
                    </p>
                  </div>
                ) : (
                  <>
                    <ProvisionalSanctionLetter
                      userData={formData}
                      loanDetails={{
                        loanType: formData.loanType,
                        loanAmount: formData.loanAmount,
                      }}
                      onAcceptAndProceed={handleAcceptAndProceed} // Pass the new handler
                    />

                    {/* Floating buttons at the bottom of the visible screen/modal */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-2xl flex justify-between gap-3 p-2 bg-white rounded-lg shadow-xl z-30">
                      <button
                        onClick={() => setShowModal(false)}
                        className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                      >
                        Close Letter
                      </button>
                      {/* Note: Accept & Proceed button is inside PSL component now, but keep this spot for design */}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Modal 2: Final Success Confirmation and Navigation */}
          {showProceedSuccess && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md flex flex-col items-center text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Offer Accepted! 🎉
                </h2>
                <p className="text-gray-700 mb-4">
                  You have successfully accepted the provisional loan offer. We
                  are now preparing your application for final disbursement.
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  You will be redirected to your **Loan Tracking Dashboard** to
                  complete the final processing steps.
                </p>
                <button
                  onClick={submitApplication}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition w-full"
                >
                  🚀 Go to Loan Tracking Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
