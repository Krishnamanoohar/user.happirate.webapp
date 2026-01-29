import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Briefcase,
  MapPin,
  Send,
  CreditCard,
  IndianRupee,
  Phone,
  Mail,
  Calendar,
  Building,
  Home,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import StepIndicator from "../../components/StepIndicator";
import FormCard from "../../components/FormCard";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import FileUploadZone from "../../components/FileUploadZone";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import {
  // sendOtpToMobile,
  //verifyOtpApi,
  personalDetailsVerification,
  submitFinancialProfileDetails,
} from "../../../src/api/api";
const steps = [
  { id: 1, title: "Review & Edit Personal Details" },
  { id: 2, title: "Review & Edit Employment and Credit Details" },
  { id: 3, title: "Select Loan & Upload Documents" },
  { id: 4, title: "Review & Submit" },
];

const loanTypes = [
  { value: "personal", label: "Personal Loan" },
  { value: "home", label: "Home Loan" },
  { value: "education", label: "Education Loan" },
  { value: "vehicle", label: "Vehicle Loan" },
  { value: "business", label: "Business Loan" },
];

const employmentStatuses = [
  { value: "salaried", label: "Salaried" },
  { value: "self-employed", label: "Self Employed" },
  { value: "business", label: "Business Owner" },
  { value: "retired", label: "Retired" },
];

const residentialStatuses = [
  { value: "owned", label: "Owned" },
  { value: "rented", label: "Rented" },
  { value: "family", label: "Living with Family" },
];

// Mock fetched data (simulating auto-fetched from Aadhaar-linked data)
const mockFetchedData = {
  firstName: "Maya",
  lastName: "Reddy",
  dateOfBirth: "1992-09-22",
  panCard: "FIHMP6789L",
  email: "maya.reddy@example.com",
  aadhaarCard: "3887 2202 4544",
  mobileNumber: "8019904780",
  employmentStatus: "salaried",
  companyName: "NovaTech Services Pvt Ltd",
  monthlyIncome: "78000",
  residentialStatus: "rented",
  addressLine1: "Flat 402, Green Valley Apartments",
  city: "Hyderabad",
  state: "Telangana",
  pincode: "500084",
  loanType: "education",
  loanAmount: "500000",
  cibilScore: "745",
  recentEnquiries: "2",
  settlements: "0",
  emiBounces: "0",
  creditCardUtilization: "35",
  residentialStability: "3",
  existingEmi: "15000",
};

const formatDateToDDMMYYYY = (isoDate) => {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-");
  return `${d}-${m}-${y}`;
};

const normalizeAadhaarForApi = (value) =>
  value?.replace(/\D/g, "").replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3");

const validatePan = (value) => {
  if (!value) return "PAN is required";
  const pan = value.toUpperCase();
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(pan) ? null : "PAN must be in format ABCDE1234F";
};

const validateGmail = (value) => {
  if (!value) return "Email is required";
  const regex = /^[a-z0-9._%+-]+@gmail\.com$/;
  return regex.test(value.toLowerCase()) ? null : "Enter a valid Gmail address";
};

const validateEmploymentNumbers = (data) => {
  const errors = {};

  if (Number(data.monthlyIncome) <= 0) {
    errors.monthlyIncome = "Monthly income must be greater than 0";
  }

  if (Number(data.cibilScore) < 300 || Number(data.cibilScore) > 900) {
    errors.cibilScore = "CIBIL score must be between 300 and 900";
  }

  if (!/^\d{6}$/.test(data.pincode)) {
    errors.pincode = "Pincode must be 6 digits";
  }

  if (!/^\d{12}$/.test(data.uanNumber)) {
    errors.uanNumber = "UAN must be 12 digits";
  }

  return errors;
};

const buildPersonalDetailsPayload = (data) => ({
  firstName: data.firstName,
  lastName: data.lastName,
  dateOfBirth: formatDateToDDMMYYYY(data.dateOfBirth),
  email: data.email,
  panCard: data.panCard,
  aadharCard: normalizeAadhaarForApi(data.aadhaarCard), // 👈 SAME AS OLD
});

const buildEmploymentDetailsPayload = (data) => ({
  employmentStatus: data.employmentStatus,
  companyName: data.companyName,
  uanNumber: data.uanNumber,
  monthlyIncome: Number(data.monthlyIncome),
  cibilScore: Number(data.cibilScore),
  recentEnquiries: Number(data.recentEnquiries),
  settlements: Number(data.settlements),
  emiBounces: Number(data.emiBounces),
  creditCardUtilization: Number(data.creditCardUtilization),
  residentialStability: Number(data.residentialStability),
  existingEmi: Number(data.existingEmi),
  residentialType: data.residentialStatus,
  addressLine1: data.addressLine1,
  city: data.city,
  state: data.state,
  pincode: data.pincode,
});

const LoanApplication = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const navigate = useNavigate();

  // Form data state (pre-filled)
  const [formData, setFormData] = useState({
    ...mockFetchedData,
  });

  // Uploaded documents state
  const [documents, setDocuments] = useState({
    itr: null,
    photo: null,
    payslip1: null,
    payslip2: null,
    payslip3: null,
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleNext = async () => {
    // STEP 1 → Personal Details API
    if (currentStep === 1) {
      const panError = validatePan(formData.panCard);
      const emailError = validateGmail(formData.email);

      if (panError || emailError) {
        alert(panError || emailError);
        return;
      }
      const payload = buildPersonalDetailsPayload(formData);
      console.log("Personal Details Payload:", payload);

      try {
        await personalDetailsVerification(payload);
        setCurrentStep(2);
      } catch (error) {
        console.error(
          "Personal details submission failed",
          error.response?.data || error.message,
        );
        alert("Personal details submission failed");
      }
      return;
    }

    // STEP 2 → Employment & Credit API
    if (currentStep === 2) {
      const errors = validateEmploymentNumbers(formData);
      if (Object.keys(errors).length) {
        alert("Please fix employment details");
        return;
      }

      const payload = buildEmploymentDetailsPayload(formData);

      try {
        await submitFinancialProfileDetails(payload);
        setCurrentStep(3);
      } catch (error) {
        console.error(
          "Employment details submission failed",
          error.response?.data || error.message,
        );
        alert("Employment details submission failed");
      }
      return;
    }

    // STEP 3 → Documents (NO API in old code)
    if (currentStep === 3) {
      setCurrentStep(4);
      return;
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log("Final Review Data:", { formData, documents });
    // alert("Application submitted successfully!");
    navigate('/compare-loan')
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Enhanced Summary Section Component
  const SummarySection = ({ title, icon: Icon, children }) => (
    <div className="bg-card rounded-xl border border-border/50 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-primary/10 to-accent/30 px-5 py-3 border-b border-border/50">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          {title}
        </h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );

  const SummaryRow = ({ label, value, icon: Icon, highlighted }) => (
    <div className="flex justify-between items-center py-2.5 border-b border-border/30 last:border-0">
      <span className="text-muted-foreground text-sm flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-primary/60" />}
        {label}
      </span>
      <span
        className={cn(
          "text-sm font-medium",
          highlighted ? "text-primary font-semibold" : "text-foreground",
        )}
      >
        {value || "—"}
      </span>
    </div>
  );

  const DocumentStatus = ({ label, file, icon: Icon }) => (
    <div className="flex justify-between items-center py-2.5 border-b border-border/30 last:border-0">
      <span className="text-muted-foreground text-sm flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-primary/60" />}
        {label}
      </span>
      {file ? (
        <span className="text-sm font-medium text-success flex items-center gap-1.5 bg-success/10 px-2.5 py-1 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Uploaded
        </span>
      ) : (
        <span className="text-sm font-medium text-destructive flex items-center gap-1.5 bg-destructive/10 px-2.5 py-1 rounded-full">
          <AlertCircle className="w-3.5 h-3.5" />
          Missing
        </span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <div className="px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Loan Application
          </h1>
          <p className="mt-2 text-muted-foreground">
            Complete all steps to submit your application
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} />

        {/* Form Content */}
        <div className="mt-8 space-y-6">
          {/* Step 1: Personal Details + Address */}
          {currentStep === 1 && (
            <FormCard
              title="Review & Edit Personal Details"
              subtitle="Your details have been auto-fetched. You may edit any field if needed."
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg border border-accent mb-6">
                  <User className="w-5 h-5 text-primary" />
                  <p className="text-sm text-accent-foreground italic">
                    *Review the pre-filled data. You may edit any field if
                    needed.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <FormInput
                    label="First Name"
                    value={formData.firstName}
                    onChange={(v) => updateFormData("firstName", v)}
                    required
                  />
                  <FormInput
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(v) => updateFormData("lastName", v)}
                    required
                  />
                  <FormInput
                    label="Date of Birth"
                    value={formData.dateOfBirth}
                    onChange={(v) => updateFormData("dateOfBirth", v)}
                    type="date"
                    required
                  />
                  <FormInput
                    label="PAN Card"
                    value={formData.panCard}
                    disabled
                    hint="PAN cannot be edited as it's verified from source"
                  />
                  <FormInput
                    label="E-Mail ID"
                    value={formData.email}
                    onChange={(v) => updateFormData("email", v)}
                    type="email"
                    required
                  />
                  <FormInput
                    label="Aadhaar Card"
                    value={formData.aadhaarCard}
                    disabled
                    hint="Aadhaar cannot be edited as it's verified from source"
                  />
                  <FormInput
                    label="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={(v) => updateFormData("mobileNumber", v)}
                    type="tel"
                    required
                  />
                </div>

                {/* Address Section */}
                <div className="space-y-6 mt-8 pt-6 border-t border-border">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Address Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <FormInput
                        label="Address Line 1"
                        value={formData.addressLine1}
                        onChange={(v) => updateFormData("addressLine1", v)}
                        required
                      />
                    </div>
                    <FormInput
                      label="City"
                      value={formData.city}
                      onChange={(v) => updateFormData("city", v)}
                      required
                    />
                    <FormInput
                      label="State"
                      value={formData.state}
                      onChange={(v) => updateFormData("state", v)}
                      required
                    />
                    <FormInput
                      label="Pincode"
                      value={formData.pincode}
                      onChange={(v) => updateFormData("pincode", v)}
                      required
                    />
                    <FormSelect
                      label="Residential Status"
                      value={formData.residentialStatus}
                      onChange={(v) => updateFormData("residentialStatus", v)}
                      options={residentialStatuses}
                    />
                  </div>
                </div>
              </div>
            </FormCard>
          )}

          {/* Step 2: Employment & Credit Details (no address) */}
          {currentStep === 2 && (
            <FormCard
              title="Review & Edit Employment and Credit Details"
              subtitle="Please review and update your employment and credit information"
            >
              {/* Employment Section */}
              <div className="space-y-6">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Employment Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormSelect
                    label="Employment Status"
                    value={formData.employmentStatus}
                    onChange={(v) => updateFormData("employmentStatus", v)}
                    options={employmentStatuses}
                    required
                  />
                  <FormInput
                    label="Company Name"
                    value={formData.companyName}
                    onChange={(v) => updateFormData("companyName", v)}
                    required
                  />
                  <FormInput
                    label="UAN / PF Number"
                    value={formData.uanNumber || ""}
                    onChange={(v) => updateFormData("uanNumber", v)}
                    required
                  />

                  <FormInput
                    label="Monthly Income (₹)"
                    value={formData.monthlyIncome}
                    onChange={(v) => updateFormData("monthlyIncome", v)}
                    type="number"
                    required
                  />
                </div>
              </div>

              {/* Credit Details Section */}
              <div className="space-y-6 mt-8 pt-6 border-t border-border">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  Credit Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput
                    label="CIBIL Score"
                    value={formData.cibilScore}
                    onChange={(v) => updateFormData("cibilScore", v)}
                    placeholder="Enter your CIBIL score"
                  />
                  <FormInput
                    label="Recent Enquiries"
                    value={formData.recentEnquiries}
                    onChange={(v) => updateFormData("recentEnquiries", v)}
                    placeholder="Number of recent credit enquiries"
                  />
                  <FormInput
                    label="Settlements"
                    value={formData.settlements}
                    onChange={(v) => updateFormData("settlements", v)}
                    placeholder="Any loan settlements"
                  />
                  <FormInput
                    label="EMI Bounces"
                    value={formData.emiBounces}
                    onChange={(v) => updateFormData("emiBounces", v)}
                    placeholder="Number of EMI bounces"
                  />
                  <FormInput
                    label="Credit Card Utilization (%)"
                    value={formData.creditCardUtilization}
                    onChange={(v) => updateFormData("creditCardUtilization", v)}
                    placeholder="e.g., 40%"
                  />
                  <FormSelect
                    label="Residential Stability"
                    value={formData.residentialStability}
                    onChange={(v) => updateFormData("residentialStability", v)}
                    placeholder="Select stability period"
                    options={[
                      { value: "1", label: "Less than 1 year" },
                      { value: "3", label: "1-3 years" },
                      { value: "5", label: "3-5 years" },
                      { value: "10", label: "More than 5 years" },
                    ]}
                  />
                  <FormInput
                    label="Existing EMI (₹)"
                    value={formData.existingEmi}
                    onChange={(v) => updateFormData("existingEmi", v)}
                    placeholder="Total existing EMI amount"
                    type="number"
                  />
                </div>
              </div>
            </FormCard>
          )}

          {/* Step 3: Loan & Documents */}
          {currentStep === 3 && (
            <FormCard
              title="Loan Requirement & Document Upload"
              subtitle="Select your loan type and upload required documents"
            >
              {/* Loan Details */}
              <div className="space-y-6">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-primary rounded-full" />
                  Loan Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormSelect
                    label="Loan Type"
                    value={formData.loanType}
                    onChange={(v) => updateFormData("loanType", v)}
                    options={loanTypes}
                    required
                  />
                  <FormInput
                    label="Desired Loan Amount (₹)"
                    value={formData.loanAmount}
                    onChange={(v) => updateFormData("loanAmount", v)}
                    placeholder="Enter amount"
                    type="number"
                    required
                  />
                </div>
              </div>

              {/* Documents Section */}
              <div className="space-y-6 mt-8 pt-6 border-t border-border">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-primary rounded-full" />
                  Required Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FileUploadZone
                    label="Last 3 Years ITR/Form 16"
                    required
                    accept=".pdf,.jpg,.png"
                    onFileSelect={(file) =>
                      setDocuments((prev) => ({ ...prev, itr: file }))
                    }
                  />
                  <FileUploadZone
                    label="Applicant Photo"
                    required
                    accept=".jpg,.png,.jpeg"
                    onFileSelect={(file) =>
                      setDocuments((prev) => ({ ...prev, photo: file }))
                    }
                  />
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-foreground mb-4">
                    Last 3 Months Payslips
                    <span className="text-destructive ml-1">*</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FileUploadZone
                      label="Month 1"
                      required
                      accept=".pdf,.jpg,.png"
                      compact
                      onFileSelect={(file) =>
                        setDocuments((prev) => ({ ...prev, payslip1: file }))
                      }
                    />
                    <FileUploadZone
                      label="Month 2"
                      required
                      accept=".pdf,.jpg,.png"
                      compact
                      onFileSelect={(file) =>
                        setDocuments((prev) => ({ ...prev, payslip2: file }))
                      }
                    />
                    <FileUploadZone
                      label="Month 3"
                      required
                      accept=".pdf,.jpg,.png"
                      compact
                      onFileSelect={(file) =>
                        setDocuments((prev) => ({ ...prev, payslip3: file }))
                      }
                    />
                  </div>
                </div>
              </div>
            </FormCard>
          )}

          {/* Step 4: Review & Submit - Enhanced */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {/* Header Summary Card */}
              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground shadow-xl shadow-primary/25">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-primary-foreground/80 text-sm font-medium mb-1">
                      Application Summary
                    </p>
                    <h2 className="text-2xl font-bold">
                      {formData.firstName} {formData.lastName}
                    </h2>
                    <p className="text-primary-foreground/80 mt-1">
                      {formData.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary-foreground/80 text-sm font-medium mb-1">
                      Requested Amount
                    </p>
                    <p className="text-3xl font-bold">
                      ₹{Number(formData.loanAmount).toLocaleString("en-IN")}
                    </p>
                    <p className="text-primary-foreground/80 mt-1">
                      {
                        loanTypes.find((l) => l.value === formData.loanType)
                          ?.label
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Details */}
                <SummarySection title="Personal Details" icon={User}>
                  <SummaryRow
                    label="Full Name"
                    value={`${formData.firstName} ${formData.lastName}`}
                    icon={User}
                  />
                  <SummaryRow
                    label="Date of Birth"
                    value={formData.dateOfBirth}
                    icon={Calendar}
                  />
                  <SummaryRow
                    label="Mobile"
                    value={formData.mobileNumber}
                    icon={Phone}
                  />
                  <SummaryRow
                    label="Email"
                    value={formData.email}
                    icon={Mail}
                  />
                  <SummaryRow
                    label="PAN Card"
                    value={formData.panCard}
                    icon={CreditCard}
                    highlighted
                  />
                  <SummaryRow
                    label="Aadhaar"
                    value={formData.aadhaarCard}
                    icon={CreditCard}
                    highlighted
                  />
                </SummarySection>

                {/* Address Details */}
                <SummarySection title="Address Details" icon={MapPin}>
                  <SummaryRow
                    label="Address"
                    value={formData.addressLine1}
                    icon={Home}
                  />
                  <SummaryRow
                    label="City"
                    value={formData.city}
                    icon={Building}
                  />
                  <SummaryRow
                    label="State"
                    value={formData.state}
                    icon={MapPin}
                  />
                  <SummaryRow label="Pincode" value={formData.pincode} />
                  <SummaryRow
                    label="Residential Status"
                    value={
                      residentialStatuses.find(
                        (r) => r.value === formData.residentialStatus,
                      )?.label || ""
                    }
                  />
                </SummarySection>

                {/* Employment Details */}
                <SummarySection title="Employment Details" icon={Briefcase}>
                  <SummaryRow
                    label="Status"
                    value={
                      employmentStatuses.find(
                        (e) => e.value === formData.employmentStatus,
                      )?.label || ""
                    }
                    icon={Briefcase}
                  />
                  <SummaryRow
                    label="Company"
                    value={formData.companyName}
                    icon={Building}
                  />
                  <SummaryRow
                    label="Monthly Income"
                    value={`₹${Number(formData.monthlyIncome).toLocaleString("en-IN")}`}
                    icon={IndianRupee}
                    highlighted
                  />
                  <SummaryRow
                    label="Existing EMI"
                    value={`₹${Number(formData.existingEmi).toLocaleString("en-IN")}`}
                  />
                </SummarySection>

                {/* Credit Details */}
                <SummarySection title="Credit Information" icon={CreditCard}>
                  <SummaryRow
                    label="CIBIL Score"
                    value={formData.cibilScore}
                    icon={CreditCard}
                    highlighted
                  />
                  <SummaryRow
                    label="Recent Enquiries"
                    value={formData.recentEnquiries}
                  />
                  <SummaryRow label="EMI Bounces" value={formData.emiBounces} />
                  <SummaryRow
                    label="Credit Utilization"
                    value={`${formData.creditCardUtilization}%`}
                  />
                  <SummaryRow
                    label="Settlements"
                    value={formData.settlements}
                  />
                </SummarySection>
              </div>

              {/* Loan Details */}
              <SummarySection title="Loan Requirements" icon={IndianRupee}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SummaryRow
                    label="Loan Type"
                    value={
                      loanTypes.find((l) => l.value === formData.loanType)
                        ?.label || ""
                    }
                    highlighted
                  />
                  <SummaryRow
                    label="Loan Amount"
                    value={`₹${Number(formData.loanAmount).toLocaleString("en-IN")}`}
                    highlighted
                  />
                </div>
              </SummarySection>

              {/* Uploaded Documents */}
              <SummarySection title="Uploaded Documents" icon={FileText}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  <DocumentStatus
                    label="ITR/Form 16"
                    file={documents.itr}
                    icon={FileText}
                  />
                  <DocumentStatus
                    label="Applicant Photo"
                    file={documents.photo}
                    icon={User}
                  />
                  <DocumentStatus
                    label="Payslip - Month 1"
                    file={documents.payslip1}
                    icon={FileText}
                  />
                  <DocumentStatus
                    label="Payslip - Month 2"
                    file={documents.payslip2}
                    icon={FileText}
                  />
                  <DocumentStatus
                    label="Payslip - Month 3"
                    file={documents.payslip3}
                    icon={FileText}
                  />
                </div>
              </SummarySection>

              {/* Terms & Consent */}
              <div className="bg-card rounded-xl border border-border/50 p-6 shadow-sm">
                <h3 className="text-base font-semibold text-foreground mb-4">
                  Terms & Consent
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      className="mt-0.5 border-primary data-[state=checked]:bg-primary"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked)}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                    >
                      I hereby declare that all the information provided is true
                      and accurate to the best of my knowledge. I authorize the
                      bank to verify my details and make credit enquiries as
                      necessary.
                    </label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacy"
                      className="mt-0.5 border-primary data-[state=checked]:bg-primary"
                      checked={privacyAccepted}
                      onCheckedChange={(checked) => setPrivacyAccepted(checked)}
                    />
                    <label
                      htmlFor="privacy"
                      className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                    >
                      I have read and agree to the{" "}
                      <span className="text-primary underline cursor-pointer font-medium">
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span className="text-primary underline cursor-pointer font-medium">
                        Privacy Policy
                      </span>
                      .
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="h-12 px-6 border-border hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep < 4 && (
            <Button
              onClick={handleNext}
              className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}

          {currentStep === 4 && (
            <Button
              onClick={handleSubmit}
              disabled={!termsAccepted || !privacyAccepted}
              className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 disabled:opacity-50"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Application
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
