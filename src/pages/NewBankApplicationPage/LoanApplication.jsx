import { useEffect, useState } from "react";
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
import { useLocation } from "react-router-dom";
import { useContextData } from "@/context/AuthContext";
import {
  personalDetailsVerification,
  submitFinancialProfileDetails,
  updateCreditReport,
  fetchTaxDocuments,
  uploadFinancialDocuments,
  updateLoanRequirements,
  updateConsents,
} from "../../../src/api/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "@/IntegratedComps/src/components/Navbar";
import axios from "axios";
import Loader from "@/ReactBitsComps/Loader/Loader";
import { EmploymentHistorySection } from "./DynamicEmploymentComp";
import ExistingDocumentsSelector from "@/components/ExistingDocumentsSelector/ExistingDocumentsSelector";
import { Input } from "@/components/ui/input";

// ─── Static steps for Personal Loan (4 steps) ────────────────────────────────
const personalLoanSteps = [
  { id: 1, title: "Review & Edit Personal Details" },
  { id: 2, title: "Review & Edit Employment and Credit Details" },
  { id: 3, title: "Select Loan & Upload Documents" },
  { id: 4, title: "Review & Submit" },
];

// ─── Steps for Home Loan (5 steps — extra Property Details step) ──────────────
const homeLoanSteps = [
  { id: 1, title: "Review & Edit Personal Details" },
  { id: 2, title: "Review & Edit Employment and Credit Details" },
  { id: 3, title: "Select Loan & Upload Documents" },
  { id: 4, title: "Property Details" },
  { id: 5, title: "Review & Submit" },
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
];

const residentialStatuses = [
  { value: "owned", label: "Owned" },
  { value: "rented", label: "Rented" },
  { value: "family", label: "Living with Family" },
];

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

// ─── Home Loan specific option lists ─────────────────────────────────────────
const propertyTypes = [
  { value: "apartment", label: "Apartment / Flat" },
  { value: "independent_house", label: "Independent House / Villa" },
  { value: "plot_construction", label: "Plot + Construction" },
  { value: "under_construction", label: "Under Construction Property" },
  { value: "resale", label: "Resale Property" },
  { value: "commercial", label: "Commercial Property" },
];

const propertyOwnershipTypes = [
  { value: "self", label: "Self" },
  { value: "joint", label: "Joint Ownership" },
  { value: "family", label: "Family Owned" },
];

const loanPurposeOptions = [
  { value: "purchase", label: "Purchase of Property" },
  { value: "construction", label: "Construction of House" },
  { value: "renovation", label: "Renovation / Extension" },
  { value: "balance_transfer", label: "Balance Transfer" },
  { value: "top_up", label: "Top-Up Loan" },
];

const coApplicantRelationOptions = [
  { value: "spouse", label: "Spouse" },
  { value: "parent", label: "Parent" },
  { value: "sibling", label: "Sibling" },
  { value: "child", label: "Child (Adult)" },
  { value: "other", label: "Other" },
];

const existingDocuments = [
  { id: "1", name: "ITR_2023-24.pdf", type: "pdf", category: "ITR/Form 16", uploadedAt: "15 Jan 2025", size: "2.3 MB" },
  { id: "2", name: "ITR_2022-23.pdf", type: "pdf", category: "ITR/Form 16", uploadedAt: "10 Mar 2024", size: "1.8 MB" },
  { id: "3", name: "passport_photo.jpg", type: "image", category: "Applicant Photo", uploadedAt: "20 Dec 2024", size: "450 KB" },
  { id: "4", name: "payslip_jan_2025.pdf", type: "pdf", category: "Payslip", uploadedAt: "02 Feb 2025", size: "320 KB" },
  { id: "5", name: "payslip_dec_2024.pdf", type: "pdf", category: "Payslip", uploadedAt: "01 Jan 2025", size: "310 KB" },
  { id: "6", name: "payslip_nov_2024.pdf", type: "pdf", category: "Payslip", uploadedAt: "01 Dec 2024", size: "305 KB" },
];

const getTodayISODate = () => new Date().toISOString().split("T")[0];

const normalizeAadhaarForApi = (value) =>
  value?.replace(/\D/g, "").replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3");

const validatePan = (value) => {
  if (!value) return "PAN is required";
  const pan = value.toUpperCase();
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(pan) ? null : "PAN must be in format ABCDE1234F";
};

const LoanApplication = () => {
  const { creditProfile } = useContextData();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(location.state?.goToStep ?? 0);
  const [emailOptions, setEmailOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [taxNumber, setTaxNumber] = useState("");
  const [isFetchingDocs, setIsFetchingDocs] = useState(false);
  const [filteredStates, setFilteredStates] = useState([]);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [filteredPropertyStates, setFilteredPropertyStates] = useState([]);
  const [showPropertyStateDropdown, setShowPropertyStateDropdown] = useState(false);
  const [phoneOptions, setPhoneOptions] = useState([]);
  const [applicationId, setApplicationId] = useState(null);
  const [selectedDocIds, setSelectedDocIds] = useState([]);
  const [documentErrors, setDocumentErrors] = useState({});
  const [documentValidationTriggered, setDocumentValidationTriggered] = useState(false);
  const [hasCoApplicant, setHasCoApplicant] = useState(false);

  const [documents, setDocuments] = useState({
    itr: null,
    photo: null,
    payslip1: null,
    payslip2: null,
    payslip3: null,
    // Home loan specific documents
    propertyDocument: null,
    saleAgreement: null,
    noc: null,
    titleDeed: null,
    approvedPlan: null,
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [employmentErrors, setEmploymentErrors] = useState([]);

  const [formData, setFormData] = useState({
    // Personal
    firstName: "", lastName: "", middleName: "", dateOfBirth: "",
    panCard: "", email: "", aadhaarCard: "", mobileNumber: "",
    // Employment
    uanNumber: "", employmentExperience: "", employmentStatus: "",
    gstNumber: "", companyName: "", monthlyIncome: "",
    residentialStatus: "", addressLine1: "", state: "", pincode: "",
    // Loan common
    loanType: "", loanAmount: "", loanTenure: "",
    // Credit
    cibilScore: "", recentEnquiries: "", settlements: "",
    emiBounces: "", creditCardUtilization: "", residentialStability: "",
    existingEmi: "", employmentCategory: "", salaryMode: "",
    // ── Home Loan specific ──────────────────────────────────────────────────
    // Property Info
    propertyType: "",
    propertyAddress: "",
    propertyState: "",
    propertyPincode: "",
    propertyValue: "",          // Market value of the property
    downPaymentAmount: "",      // Amount applicant will pay upfront
    loanPurpose: "",
    propertyOwnershipType: "",
    builderName: "",            // Only for under-construction
    possessionDate: "",         // Expected possession date
    // Co-applicant
    coApplicantName: "",
    coApplicantRelation: "",
    coApplicantDOB: "",
    coApplicantPAN: "",
    coApplicantMonthlyIncome: "",
    coApplicantEmploymentStatus: "",
  });

  const [employmentData, setEmploymentData] = useState([]);

  // ─── Derived helpers ────────────────────────────────────────────────────────
  const isHomeLoan = formData.loanType === "home";
  const isSelfEmployed = formData.employmentStatus === "self-employed";

  // Dynamic steps based on loan type
  const steps = isHomeLoan ? homeLoanSteps : personalLoanSteps;

  // Total step indices (0-based):
  //   Personal Loan: 0=Personal, 1=Employment, 2=Loan+Docs, 3=Review
  //   Home Loan:     0=Personal, 1=Employment, 2=Loan+Docs, 3=PropertyDetails, 4=Review
  const reviewStep = isHomeLoan ? 4 : 3;
  const propertyStep = 3; // only exists for home loan

  // ─── Document helpers ────────────────────────────────────────────────────────
  const hasITR = selectedDocIds.some((id) =>
    existingDocuments.find((d) => d.id === id && d.category === "ITR/Form 16"),
  );
  const hasPhoto = selectedDocIds.some((id) =>
    existingDocuments.find((d) => d.id === id && d.category === "Applicant Photo"),
  );
  const selectedPayslips = selectedDocIds.filter((id) =>
    existingDocuments.find((d) => d.id === id && d.category === "Payslip"),
  );
  const payslipsNeeded = Math.max(0, 3 - selectedPayslips.length);

  // ─── Fetch tax documents ─────────────────────────────────────────────────────
  const handleFetchTaxDocuments = async () => {
    if (!taxNumber.trim()) { toast.error("Please enter Tax Number"); return; }
    try {
      setIsFetchingDocs(true);
      const resp = await fetchTaxDocuments({ taxNumber, mobileNumber: sessionStorage.getItem("mobile_number") });
      const itrFileUrl = resp?.data?.itrUrl;
      if (!itrFileUrl) { toast.error("No ITR documents found"); return; }
      setDocuments((prev) => ({ ...prev, itr: { name: "ITR_Fetched.pdf", url: itrFileUrl, fetched: true } }));
      toast.success("ITR documents fetched successfully");
    } catch { toast.error("Failed to fetch tax documents"); }
    finally { setIsFetchingDocs(false); }
  };

  // ─── Document validation ─────────────────────────────────────────────────────
  const validateDocuments = () => {
    const newErrors = {};
    if (!documents.itr) newErrors.itr = "ITR document is required";
    if (!documents.photo) newErrors.photo = "Applicant photo is required";
    if (!isSelfEmployed) {
      const uploadedPayslips = [documents.payslip1, documents.payslip2, documents.payslip3].filter(Boolean).length;
      if (uploadedPayslips < 3) newErrors.payslips = "All 3 payslips are required";
    }
    // Home loan additional required docs
    if (isHomeLoan) {
      if (!documents.propertyDocument) newErrors.propertyDocument = "Property document is required";
      if (!documents.saleAgreement) newErrors.saleAgreement = "Sale agreement / allotment letter is required";
    }
    setDocumentErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Home Loan property step validation ──────────────────────────────────────
  const validatePropertyStep = () => {
    const newErrors = {};
    if (!formData.loanPurpose) newErrors.loanPurpose = "Loan purpose is required";
    if (!formData.propertyType) newErrors.propertyType = "Property type is required";
    if (!formData.propertyAddress) newErrors.propertyAddress = "Property address is required";
    if (!formData.propertyState) newErrors.propertyState = "Property state is required";
    if (!formData.propertyPincode || !/^\d{6}$/.test(formData.propertyPincode))
      newErrors.propertyPincode = "Valid 6-digit pincode is required";
    if (!formData.propertyValue || Number(formData.propertyValue) <= 0)
      newErrors.propertyValue = "Property value must be greater than 0";
    if (!formData.downPaymentAmount || Number(formData.downPaymentAmount) <= 0)
      newErrors.downPaymentAmount = "Down payment amount is required";
    if (Number(formData.downPaymentAmount) >= Number(formData.propertyValue))
      newErrors.downPaymentAmount = "Down payment must be less than property value";
    if (!formData.propertyOwnershipType) newErrors.propertyOwnershipType = "Ownership type is required";
    if (formData.propertyType === "under_construction") {
      if (!formData.possessionDate) newErrors.possessionDate = "Expected possession date is required";
    }
    // Co-applicant validation (only if toggled on)
    if (hasCoApplicant) {
      if (!formData.coApplicantName) newErrors.coApplicantName = "Co-applicant name is required";
      if (!formData.coApplicantRelation) newErrors.coApplicantRelation = "Relation is required";
      if (!formData.coApplicantDOB) newErrors.coApplicantDOB = "Co-applicant date of birth is required";
      if (!formData.coApplicantPAN || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.coApplicantPAN.toUpperCase()))
        newErrors.coApplicantPAN = "Valid PAN required (e.g. ABCDE1234F)";
      if (!formData.coApplicantMonthlyIncome || Number(formData.coApplicantMonthlyIncome) <= 0)
        newErrors.coApplicantMonthlyIncome = "Co-applicant monthly income is required";
      if (!formData.coApplicantEmploymentStatus) newErrors.coApplicantEmploymentStatus = "Employment status is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateGST = (value) => {
    if (!value) return null;
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(value.toUpperCase()) ? null : "Invalid GST format (e.g. 22ABCDE1234F1Z5)";
  };

  const validateEmploymentHistory = () => {
    const empErrors = [];
    let isValid = true;
    employmentData.forEach((record, index) => {
      const recordErrors = {};
      if (!record.name?.trim()) { recordErrors.name = "Employee name is required"; isValid = false; }
      if (!record.guardian_name?.trim()) { recordErrors.guardian_name = "Guardian name is required"; isValid = false; }
      if (!record.establishment_name?.trim()) { recordErrors.establishment_name = "Establishment name is required"; isValid = false; }
      if (!record.uan || !/^\d{12}$/.test(record.uan)) { recordErrors.uan = "UAN must be 12 digits"; isValid = false; }
      if (!record.date_of_joining) { recordErrors.date_of_joining = "Date of joining is required"; isValid = false; }
      empErrors[index] = recordErrors;
    });
    setEmploymentErrors(empErrors);
    return isValid;
  };

  // ─── Per-step validation ─────────────────────────────────────────────────────
  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 0) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "DOB is required";
      } else if (formData.dateOfBirth > getTodayISODate()) {
        newErrors.dateOfBirth = "Date of birth cannot be in the future";
      }
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.addressLine1) newErrors.addressLine1 = "Address is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.pincode) newErrors.pincode = "Pincode is required";
      if (!formData.aadhaarCard || !/^\d{12}$/.test(formData.aadhaarCard))
        newErrors.aadhaarCard = "Aadhaar must be 12 digits";
      if (!formData.mobileNumber) newErrors.mobileNumber = "Mobile number is required";
    }

    if (currentStep === 1) {
      if (!formData.employmentStatus || formData.employmentStatus.trim() === "")
        newErrors.employmentStatus = "Employment Status is Required";
      if (isSelfEmployed) {
        const gstError = validateGST(formData.gstNumber);
        if (gstError) newErrors.gstNumber = gstError;
      }
      if (!formData.monthlyIncome) newErrors.monthlyIncome = "Monthly Income is Required";
      if (!isSelfEmployed) {
        if (!formData.employmentCategory) newErrors.employmentCategory = "Employment Category is required";
        if (!formData.employmentExperience) {
          newErrors.employmentExperience = "Employment Experience is Required";
        } else if (!/^\d+(\.\d+)?$/.test(formData.employmentExperience)) {
          newErrors.employmentExperience = "Only numbers allowed (e.g. 1 or 1.5)";
        }
      }
    }

    if (currentStep === 2) {
      if (!formData.loanType) newErrors.loanType = "Loan Type is Required";
      if (!formData.loanAmount) newErrors.loanAmount = "Loan Amount is Required";
      if (!formData.loanTenure) newErrors.loanTenure = "Loan Tenure Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── State dropdown helpers ──────────────────────────────────────────────────
  const handleStateChange = (value) => {
    updateFormData("state", value);
    if (!value) { setFilteredStates([]); setShowStateDropdown(false); return; }
    setFilteredStates(indianStates.filter((s) => s.toLowerCase().includes(value.toLowerCase())));
    setShowStateDropdown(true);
  };
  const handleStateSelect = (state) => { updateFormData("state", state); setShowStateDropdown(false); };

  const handlePropertyStateChange = (value) => {
    updateFormData("propertyState", value);
    if (!value) { setFilteredPropertyStates([]); setShowPropertyStateDropdown(false); return; }
    setFilteredPropertyStates(indianStates.filter((s) => s.toLowerCase().includes(value.toLowerCase())));
    setShowPropertyStateDropdown(true);
  };
  const handlePropertyStateSelect = (state) => { updateFormData("propertyState", state); setShowPropertyStateDropdown(false); };

  // ─── Payload builders ────────────────────────────────────────────────────────
  const buildPersonalDetailsPayload = (data) => ({
    mobileNumber: sessionStorage.getItem("mobile_number"),
    firstName: data.firstName, lastName: data.lastName, middleName: data.middleName,
    dateOfBirth: data.dateOfBirth,
    emails: [{ email: data.email, type: "Primary" }],
    panCard: data.panCard, aadharCard: data.aadhaarCard,
    addressLine1: data.addressLine1, state: data.state, pincode: data.pincode,
  });

  const buildEmploymentDetailsPayload = (data) => ({
    mobileNumber: sessionStorage.getItem("mobile_number"),
    employmentStatus: data.employmentStatus,
    gstNumber: data.gstNumber || null,
    companyName: data.companyName,
    uanNumber: data.uanNumber,
    employmentHistory: { employment_data: employmentData },
    employmentExperience: data.employmentExperience,
    previousCompanyName: data.previousCompanyName,
    previousCompanyFrom: data.previousCompanyFrom,
    previousCompanyTo: data.previousCompanyTo,
    currentCompanyName: data.currentCompanyName,
    currentCompanyJoiningDate: data.currentCompanyJoiningDate,
    monthlyIncome: Number(data.monthlyIncome),
    cibilScore: Number(data.cibilScore),
    recentEnquiries: Number(data.recentEnquiries),
    settlements: Number(data.settlements),
    emiBounces: Number(data.emiBounces),
    creditCardUtilization: Number(data.creditCardUtilization),
    existingEmi: Number(data.existingEmi),
    employmentCategory: data.employmentCategory,
    salaryMode: data.salaryMode,
  });

  const buildHomeLoanPropertyPayload = (data) => ({
    mobileNumber: sessionStorage.getItem("mobile_number"),
    applicationId,
    loanPurpose: data.loanPurpose,
    propertyType: data.propertyType,
    propertyAddress: data.propertyAddress,
    propertyState: data.propertyState,
    propertyPincode: data.propertyPincode,
    propertyValue: Number(data.propertyValue),
    downPaymentAmount: Number(data.downPaymentAmount),
    propertyOwnershipType: data.propertyOwnershipType,
    builderName: data.builderName || null,
    possessionDate: data.possessionDate || null,
    coApplicant: hasCoApplicant
      ? {
        name: data.coApplicantName,
        relation: data.coApplicantRelation,
        dateOfBirth: data.coApplicantDOB,
        panCard: data.coApplicantPAN,
        monthlyIncome: Number(data.coApplicantMonthlyIncome),
        employmentStatus: data.coApplicantEmploymentStatus,
      }
      : null,
  });

  // ─── Navigation handlers ─────────────────────────────────────────────────────
  const handleNext = async () => {
    if (currentStep === reviewStep && (!termsAccepted || !privacyAccepted)) {
      setConsentError(true);
      toast.error("Please accept Terms & Privacy Policy");
      return;
    } else {
      setConsentError(false);
    }

    // Property step for home loan
    if (isHomeLoan && currentStep === propertyStep) {
      if (!validatePropertyStep()) {
        toast.error("Please fill all required property details");
        return;
      }
      // Could call a property details API here
      setCurrentStep(currentStep + 1);
      return;
    }

    if (!validateStep()) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);

    // STEP 1 → Personal Details
    if (currentStep === 0) {
      const panError = validatePan(formData.panCard);
      if (panError) { toast.error(panError); setIsLoading(false); return; }
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        toast.error("Please enter a valid email address"); setIsLoading(false); return;
      }
      const payload = buildPersonalDetailsPayload(formData);
      try {
        await updateCreditReport(payload);
        toast.success("Personal details Submitted Successfully");
        setCurrentStep(1);
      } catch (error) {
        toast.error("Personal details submission failed");
      } finally { setIsLoading(false); }
      return;
    }

    // STEP 2 → Employment & Credit
    if (currentStep === 1) {
      const isEmploymentValid = validateEmploymentHistory();
      if (!isEmploymentValid) { toast.error("Please fill all required employment details"); setIsLoading(false); return; }
      const payload = buildEmploymentDetailsPayload(formData);
      try {
        await updateCreditReport(payload);
        toast.success("Employment details Submitted Successfully");
        setCurrentStep(2);
      } catch (error) {
        toast.error("Employment details submission failed");
      } finally { setIsLoading(false); }
      return;
    }

    // STEP 3 → Documents
    if (currentStep === 2) {
      setDocumentValidationTriggered(true);
      if (!validateDocuments()) {
        toast.error("Please upload all required documents");
        setIsLoading(false);
        return;
      }
      try {
        await handleDocumentUpload();
        await handleUpdateLoanRequirements();
        setCurrentStep(isHomeLoan ? propertyStep : reviewStep);
      } catch (error) {
        console.log(error, "error");
      } finally { setIsLoading(false); }

      // Home loan goes to property step next, personal loan goes to review
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!termsAccepted || !privacyAccepted) {
      setConsentError(true);
      toast.error("Please accept Terms & Privacy Policy");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const payload = {
      applicationId,
      userId: sessionStorage.getItem("userId"),
      consents: {
        infoAccuracyAndCreditEnquiry: termsAccepted,
        termsAndPrivacyPolicy: privacyAccepted,
      },
    };
    try {
      await updateConsents(payload);
      sessionStorage.setItem("loanData", JSON.stringify({
        loanType: formData.loanType, loanAmount: formData.loanAmount, loanTenure: formData.loanTenure,
      }));
      navigate("/eligible-loans");
    } catch (error) {
      console.error("Error updating consents:", error);
    } finally { setIsLoading(false); }
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
    }
  };

  const mapApiResponseToFormData = (apiData, mobile) => {
    const primaryEmail = apiData.emails?.[0]?.email || "";
    const addresses = Array.isArray(apiData?.addresses) ? apiData.addresses : [];
    const residenceAddress = addresses.find((a) => a.type === "Residence") || addresses[0] || {};
    const employmentRecords = apiData?.employmentHistory?.employment_data || [];
    const hasUAN = employmentRecords.length > 0 && employmentRecords[0]?.uan?.trim() !== "";
    return {
      firstName: apiData.firstName ?? "", lastName: apiData.lastName ?? "",
      middleName: apiData.middleName ?? "", dateOfBirth: apiData?.dateOfBirth?.split?.("T")[0] ?? "",
      panCard: apiData.panCard ?? "", email: primaryEmail ?? "",
      aadhaarCard: apiData?.aadharCard ?? "", mobileNumber: mobile,
      employmentStatus: hasUAN ? "salaried" : "",
      uanNumber: employmentRecords[0]?.uan ?? "",
      employmentExperience: apiData.employmentExperience ?? "",
      employmentCategory: apiData.employmentCategory ?? "",
      salaryMode: apiData.salaryMode ?? "",
      monthlyIncome: apiData.monthlyIncome ?? "",
      residentialStatus: residenceAddress?.type ? residenceAddress.type.toLowerCase() : "",
      addressLine1: residenceAddress?.streetAddress ?? "",
      city: apiData.city ?? "", state: residenceAddress.state ?? "",
      pincode: residenceAddress.pincode ?? "",
      loanType: "", loanAmount: "",
      cibilScore: apiData.cibilScore ?? "",
      recentEnquiries: apiData.last6MonthsEnquiryCount ?? "",
      settlements: apiData.settlements ?? "", emiBounces: apiData.emiBounces ?? "",
      creditCardUtilization: apiData.creaditCardUtilization ?? "",
      residentialStability: "", existingEmi: apiData.existingEmi ?? "",
      loanTenure: apiData.loanTenure ?? "",
      // Home loan fields default empty
      propertyType: "", propertyAddress: "", propertyState: "", propertyPincode: "",
      propertyValue: "", downPaymentAmount: "", loanPurpose: "",
      propertyOwnershipType: "", builderName: "", possessionDate: "",
      coApplicantName: "", coApplicantRelation: "", coApplicantDOB: "",
      coApplicantPAN: "", coApplicantMonthlyIncome: "", coApplicantEmploymentStatus: "",
    };
  };

  // ─── Tenure options ───────────────────────────────────────────────────────────
  const loanTenureOptions = Array.from({ length: 20 }, (_, i) => {
    const months = 6 + i * 6;
    let label;
    if (months < 12) { label = `${months} Months`; }
    else {
      const years = months / 12;
      label = Number.isInteger(years) ? `${years} Year${years > 1 ? "s" : ""}` : `${years} Years`;
    }
    return { value: String(months), label };
  });

  // Home loan tenure goes up to 30 years (360 months), 1-year increments
  const homeLoanTenureOptions = Array.from({ length: 30 }, (_, i) => {
    const years = i + 1;
    return { value: String(years * 12), label: `${years} Year${years > 1 ? "s" : ""}` };
  });

  const activeTenureOptions = isHomeLoan ? homeLoanTenureOptions : loanTenureOptions;

  // ─── Document upload ─────────────────────────────────────────────────────────
  const handleUpdateLoanRequirements = async () => {
    try {
      await updateLoanRequirements({
        userId: sessionStorage.getItem("userId"),
        loanType: formData.loanType,
        applicationId,
        requestedAmount: formData.loanAmount,
        preferredTenure: formData.loanTenure,
      });
    } catch (error) {
      console.log(error, "error in updating loan requirements");
    }
  };
  const formatIndianNumber = (value) => {
    if (!value) return "";
    const num = value.toString().replace(/,/g, "");
    return new Intl.NumberFormat("en-IN").format(Number(num));
  };
  const handleDocumentUpload = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) { toast.error("User ID is missing. Please log in again."); return; }
    const fd = new FormData();
    fd.append("userId", userId);
    if (documents.payslip1) fd.append("payslips", documents.payslip1);
    if (documents.payslip2) fd.append("payslips", documents.payslip2);
    if (documents.payslip3) fd.append("payslips", documents.payslip3);
    if (documents.itr) fd.append("itrs", documents.itr);
    if (documents.photo) fd.append("others", documents.photo);
    // Home loan docs
    if (formData.loanType === "home") {
      if (documents.propertyDocument) fd.append("others", documents.propertyDocument);
      if (documents.saleAgreement) fd.append("others", documents.saleAgreement);
      if (documents.noc) fd.append("others", documents.noc);
      if (documents.titleDeed) fd.append("others", documents.titleDeed);
      if (documents.approvedPlan) fd.append("others", documents.approvedPlan);
    }
    try {
      const response = await uploadFinancialDocuments(fd);
      if (response.status === 201 || response.status === 200) {
        toast.success("Documents uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(error.response?.data?.error || error.response?.data?.message || "Document upload failed.");
    }
  };

  // ─── Effects ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!creditProfile) return;
    const mobile = sessionStorage.getItem("mobile_number");
    const appId = creditProfile?.applicationId || null;
    setApplicationId(appId);
    if (appId) sessionStorage.setItem("applicationId", appId);
    const apiData = creditProfile?.data || creditProfile;
    if (!apiData) return;
    setEmploymentData(apiData?.employmentHistory?.employment_data || []);
    const apiEmails = Array.isArray(apiData.emails) ? apiData.emails.map((e) => e.email).filter(Boolean) : [];
    setEmailOptions([...new Set(apiEmails)]);
    const apiPhones = Array.isArray(apiData.phoneNumbers)
      ? apiData.phoneNumbers.map((p) => p.Number).filter((num) => /^\d{10}$/.test(num))
      : [];
    setPhoneOptions([...new Set(apiPhones)]);
    setFormData((prev) => ({
      ...mapApiResponseToFormData(apiData, mobile),
      loanType: prev.loanType, loanAmount: prev.loanAmount, loanTenure: prev.loanTenure,
    }));
    setPageLoading(false);
  }, [creditProfile]);

  useEffect(() => {
    if (location.state) {
      setCurrentStep(location.state.goToStep ?? 0);
      setFormData((prev) => ({
        ...prev,
        loanType: location.state.loanType ?? prev.loanType,
        loanAmount: location.state.loanAmount ?? prev.loanAmount,
      }));
    }
  }, [location.state]);

  useEffect(() => {
    const savedLoanData = localStorage.getItem("loanData");
    if (savedLoanData) {
      const parsed = JSON.parse(savedLoanData);
      setFormData((prev) => ({
        ...prev,
        loanType: parsed.loanType ?? prev.loanType,
        loanAmount: parsed.loanAmount ?? prev.loanAmount,
        loanTenure: parsed.loanTenure ?? prev.loanTenure,
      }));
    }
    if (location.state?.goToStep !== undefined) setCurrentStep(location.state.goToStep);
  }, []);

  // ─── Summary sub-components ──────────────────────────────────────────────────
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
    <div className="flex justify-between items-start gap-4 py-2.5 border-b border-border/30 last:border-0">
      <span className="text-muted-foreground text-sm flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-primary/60" />}
        {label}
      </span>
      <span className={cn(
        "text-sm font-medium text-right max-w-[60%] break-words whitespace-normal leading-relaxed",
        highlighted ? "text-primary font-semibold" : "text-foreground",
      )}>
        {value ?? "—"}
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
          <CheckCircle2 className="w-3.5 h-3.5" />Uploaded
        </span>
      ) : (
        <span className="text-sm font-medium text-destructive flex items-center gap-1.5 bg-destructive/10 px-2.5 py-1 rounded-full">
          <AlertCircle className="w-3.5 h-3.5" />Missing
        </span>
      )}
    </div>
  );

  // ─── Loading screen ──────────────────────────────────────────────────────────
  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md px-6">
          <p className="text-xl md:text-2xl font-bold text-slate-800 animate-pulse">
            Loading your <span className="text-[#7c3aed]">credit profile...</span>
          </p>
          <div className="w-full h-5 bg-white border-2 border-slate-200 rounded-full p-1 shadow-sm">
            <div
              className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full animate-loader-bar shadow-[0_0_8px_rgba(124,58,237,0.3)]"
              style={{ width: "40%" }}
            />
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  return (
    <>
      <div className="flex min-h-screen justify-center bg-gradient-to-br from-background via-background to-accent/20">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable theme="light" />
        <div className="px-4 py-8 md:py-12 max-w-7xl w-full mt-10">

          {/* Header */}
          <div className="justify-center text-center mb-8">
            <h1 className="text-4xl md:text-3xl font-bold text-foreground mb-4 mt-4">
              Loan <span className="text-[#7c3bed]">Application</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#7c3bed] to-transparent mx-auto rounded-full opacity-50 mb-4"></div>
            <p className="mt-2 text-muted-foreground">Complete all steps to submit your application</p>
          </div>

          {/* Step Indicator — dynamic based on loan type */}
          <div>
            <StepIndicator steps={steps} currentStep={currentStep + 1} />
          </div>

          <div className="mt-8 space-y-6">

            {/* ── STEP 1: Personal Details ────────────────────────────────────── */}
            {currentStep === 0 && (
              <FormCard
                title="Review & Edit Personal Details"
                subtitle="Your details have been auto-fetched. You may edit any field if needed."
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg border border-accent mb-6">
                    <User className="w-5 h-5 text-primary" />
                    <p className="text-sm text-accent-foreground italic">
                      *Review the pre-filled data. You may edit any field if needed.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <FormInput label="First Name" value={formData.firstName} onChange={(v) => updateFormData("firstName", v)} required error={errors.firstName} />
                    <FormInput label="Middle Name" value={formData.middleName} onChange={(v) => updateFormData("middleName", v)} />
                    <FormInput label="Last Name" value={formData.lastName} onChange={(v) => updateFormData("lastName", v)} required error={errors.lastName} />
                    <FormInput label="Date of Birth" value={formData.dateOfBirth} onChange={(v) => updateFormData("dateOfBirth", v)} type="date" max={getTodayISODate()} required error={errors.dateOfBirth} />
                    <FormInput label="PAN Card" value={formData.panCard} disabled hint="PAN cannot be edited as it's verified from source" error={errors.panCard} />
                    {emailOptions.length > 0 ? (
                      <FormSelect label="E-Mail ID" value={formData.email} onChange={(v) => updateFormData("email", v)} options={Array.from(emailOptions).map((e) => ({ value: e, label: e }))} required error={errors.email} />
                    ) : (
                      <FormInput label="E-Mail ID" value={formData.email} onChange={(v) => updateFormData("email", v)} type="email" required error={errors.email} />
                    )}
                    <FormInput label="Aadhaar Card" type="number" value={formData.aadhaarCard} onChange={(v) => updateFormData("aadhaarCard", v)} required error={errors.aadhaarCard} />
                    {phoneOptions.length > 1 ? (
                      <FormSelect label="Mobile Number" value={formData.mobileNumber} onChange={(v) => updateFormData("mobileNumber", v)} options={phoneOptions.map((num) => ({ value: num, label: num }))} required error={errors.mobileNumber} />
                    ) : (
                      <FormInput label="Mobile Number" value={formData.mobileNumber} onChange={(v) => updateFormData("mobileNumber", v)} type="tel" required error={errors.mobileNumber} />
                    )}
                  </div>

                  {/* Address Section */}
                  <div className="space-y-6 mt-8 pt-6 border-t border-border">
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Address Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-foreground">Address Line 1 <span className="text-destructive">*</span></label>
                        <textarea
                          value={formData.addressLine1}
                          onChange={(e) => updateFormData("addressLine1", e.target.value)}
                          rows={3}
                          className={cn(
                            "w-full rounded-md bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2",
                            errors.addressLine1 ? "border border-destructive focus:ring-destructive" : "border border-input focus:ring-primary",
                          )}
                        />
                        {errors.addressLine1 && <p className="text-sm text-destructive mt-1">{errors.addressLine1}</p>}
                      </div>
                      <div className="relative">
                        <FormInput label="State" value={formData.state} onChange={handleStateChange} required error={errors.state} autoComplete="off" />
                        {showStateDropdown && filteredStates.length > 0 && (
                          <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {filteredStates.map((state, index) => (
                              <div key={index} onClick={() => handleStateSelect(state)} className="px-3 py-2 cursor-pointer hover:bg-purple-50">{state}</div>
                            ))}
                          </div>
                        )}
                      </div>
                      <FormInput label="Pincode" value={formData.pincode} onChange={(v) => updateFormData("pincode", v)} required error={errors.pincode} />
                    </div>
                  </div>
                </div>
              </FormCard>
            )}

            {/* ── STEP 2: Employment & Credit Details ────────────────────────── */}
            {currentStep === 1 && (
              <FormCard title="Review & Edit Employment and Credit Details" subtitle="Please review and update your employment and credit information">
                {!isSelfEmployed && (
                  <EmploymentHistorySection employmentData={employmentData} setEmploymentData={setEmploymentData} errors={employmentErrors} />
                )}
                <div className="space-y-6 mt-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormSelect label="Employment Status" placeholder="Select Status" value={formData.employmentStatus} onChange={(v) => updateFormData("employmentStatus", v)} options={employmentStatuses} required error={errors.employmentStatus} />
                    {isSelfEmployed && (
                      <FormInput label="GST Number (Optional)" value={formData.gstNumber} onChange={(v) => updateFormData("gstNumber", v.toUpperCase())} placeholder="Enter GST Number" error={errors.gstNumber} />
                    )}
                    {!isSelfEmployed && (
                      <>
                        <FormSelect label="Salary Mode" value={formData.salaryMode} onChange={(v) => updateFormData("salaryMode", v)} placeholder="Select Salary Mode" required options={[{ value: "bank-transfer", label: "Bank Transfer" }, { value: "cash", label: "Cash" }]} error={errors.salaryMode} />
                        <FormInput label="Employment Experience (Years)" placeholder="e.g. 1.5" value={formData.employmentExperience || ""} type="number" step="0.1" min="0" inputMode="decimal" onChange={(v) => { if (/^\d*\.?\d*$/.test(v)) updateFormData("employmentExperience", v); }} required error={errors.employmentExperience} />
                      </>
                    )}
                    <FormInput label="Monthly Income (₹)" value={formData.monthlyIncome} onChange={(v) => updateFormData("monthlyIncome", v)} type="number" required error={errors.monthlyIncome} />
                  </div>
                </div>

                {/* Credit Details */}
                <div className="space-y-6 mt-8 pt-6 border-t border-border">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary" />
                    Credit Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <FormInput label="CIBIL Score" value={formData.cibilScore} disabled placeholder="Enter your CIBIL score" required error={errors.cibilScore} />
                    <FormInput label="Recent Enquiries" value={formData.recentEnquiries} disabled placeholder="Number of recent credit enquiries" required error={errors.recentEnquiries} />
                    <FormInput label="Settlements" value={formData.settlements} disabled placeholder="Any loan settlements" required error={errors.settlements} />
                    <FormInput label="EMI Bounces" value={formData.emiBounces} disabled placeholder="Number of EMI bounces" required error={errors.emiBounces} />
                    <FormInput label="Credit Card Utilization (%)" value={formData.creditCardUtilization} disabled placeholder="e.g., 40%" required error={errors.creditCardUtilization} />
                    <FormInput label="Existing EMI (₹)" value={formData.existingEmi} disabled placeholder="Total existing EMI amount" type="number" required error={errors.existingEmi} />
                  </div>
                </div>
              </FormCard>
            )}

            {/* ── STEP 3: Loan Type + Documents ──────────────────────────────── */}
            {currentStep === 2 && (
              <FormCard title="Loan Requirement & Document Upload" subtitle="Select your loan type and upload required documents">

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
                      onChange={(v) => {
                        updateFormData("loanType", v);
                        // Reset tenure when switching loan type since tenure options differ
                        updateFormData("loanTenure", "");
                      }}
                      options={loanTypes}
                      required
                      error={errors.loanType}
                    />
                    <FormInput
                      label="Desired Loan Amount (₹)"
                      value={formatIndianNumber(formData.loanAmount)}
                      onChange={(v) => {
                        const rawValue = v.replace(/,/g, "").replace(/\D/g, "");
                        updateFormData("loanAmount", rawValue);
                      }}
                      placeholder="Enter amount"
                      type="text"
                      required
                      error={errors.loanAmount}
                    />
                    <FormSelect label="Desired Loan Tenure" value={formData.loanTenure} onChange={(v) => updateFormData("loanTenure", v)} options={activeTenureOptions} placeholder="Select tenure" required error={errors.loanTenure} />

                    {/* Home Loan: show loan purpose inline alongside other loan fields */}
                    {isHomeLoan && (
                      <FormSelect
                        label="Loan Purpose"
                        value={formData.loanPurpose}
                        onChange={(v) => updateFormData("loanPurpose", v)}
                        options={loanPurposeOptions}
                        required
                        error={errors.loanPurpose}
                      />
                    )}
                  </div>

                  {/* ── Home Loan info banner ─────────────────────────────────── */}
                  {isHomeLoan && (
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Home className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-blue-800">Home Loan Selected</p>
                        <p className="text-sm text-blue-600 mt-0.5">
                          After uploading documents you'll fill in property and co-applicant details on the next step.
                          Tenure options go up to 30 years.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Documents Section */}
                <div className="space-y-6 mt-8 pt-6 border-t border-border">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-primary rounded-full" />
                    Required Documents
                  </h3>

                  {/* Common docs (ITR + Photo) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FileUploadZone label="Last 3 Years ITR/Form 16" required accept=".pdf,.jpg,.png" file={documents.itr} error={documentValidationTriggered && !!documentErrors.itr} onFileSelect={(file) => setDocuments((prev) => ({ ...prev, itr: file }))} />
                    <FileUploadZone label="Applicant Photo" required accept=".jpg,.png,.jpeg" file={documents.photo} error={documentValidationTriggered && !!documentErrors.photo} onFileSelect={(file) => setDocuments((prev) => ({ ...prev, photo: file }))} />
                  </div>

                  {/* Payslips — only for salaried */}
                  {!isSelfEmployed && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-foreground mb-4">
                        Last 3 Months Payslips<span className="text-destructive ml-1">*</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <FileUploadZone label="Month 1" required accept=".pdf,.jpg,.png" file={documents.payslip1} error={documentValidationTriggered && !!documentErrors.payslips} compact onFileSelect={(file) => setDocuments((prev) => ({ ...prev, payslip1: file }))} />
                        <FileUploadZone label="Month 2" required accept=".pdf,.jpg,.png" file={documents.payslip2} error={documentValidationTriggered && !!documentErrors.payslips} compact onFileSelect={(file) => setDocuments((prev) => ({ ...prev, payslip2: file }))} />
                        <FileUploadZone label="Month 3" required accept=".pdf,.jpg,.png" file={documents.payslip3} error={documentValidationTriggered && !!documentErrors.payslips} compact onFileSelect={(file) => setDocuments((prev) => ({ ...prev, payslip3: file }))} />
                      </div>
                    </div>
                  )}

                  {/* ── Home Loan specific documents ─────────────────────────── */}
                  {isHomeLoan && (
                    <div className="mt-6 space-y-4">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Home className="w-4 h-4 text-primary" />
                        Property Documents
                      </h4>
                      <p className="text-xs text-muted-foreground -mt-2">
                        Upload property-related documents. Marked <span className="text-destructive font-medium">*</span> items are mandatory.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Required */}
                        <FileUploadZone
                          label="Property Document / Allotment Letter"
                          required
                          accept=".pdf,.jpg,.png"
                          file={documents.propertyDocument}
                          error={documentValidationTriggered && !!documentErrors.propertyDocument}
                          onFileSelect={(file) => setDocuments((prev) => ({ ...prev, propertyDocument: file }))}
                        />
                        <FileUploadZone
                          label="Sale Agreement / Booking Receipt"
                          required
                          accept=".pdf,.jpg,.png"
                          file={documents.saleAgreement}
                          error={documentValidationTriggered && !!documentErrors.saleAgreement}
                          onFileSelect={(file) => setDocuments((prev) => ({ ...prev, saleAgreement: file }))}
                        />
                        {/* Optional */}
                        <FileUploadZone
                          label="Title Deed (Optional)"
                          accept=".pdf,.jpg,.png"
                          file={documents.titleDeed}
                          onFileSelect={(file) => setDocuments((prev) => ({ ...prev, titleDeed: file }))}
                        />
                        <FileUploadZone
                          label="Approved Building Plan (Optional)"
                          accept=".pdf,.jpg,.png"
                          file={documents.approvedPlan}
                          onFileSelect={(file) => setDocuments((prev) => ({ ...prev, approvedPlan: file }))}
                        />
                        <FileUploadZone
                          label="NOC from Builder/Society (Optional)"
                          accept=".pdf,.jpg,.png"
                          file={documents.noc}
                          onFileSelect={(file) => setDocuments((prev) => ({ ...prev, noc: file }))}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </FormCard>
            )}

            {/* ── STEP 4 (Home Loan only): Property Details ──────────────────── */}
            {isHomeLoan && currentStep === propertyStep && (
              <FormCard
                title="Property & Co-Applicant Details"
                subtitle="Provide details about the property you intend to purchase and any co-applicant"
              >
                {/* Property Information */}
                <div className="space-y-6">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                    <Home className="w-4 h-4 text-primary" />
                    Property Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormSelect label="Property Type" value={formData.propertyType} onChange={(v) => updateFormData("propertyType", v)} options={propertyTypes} required error={errors.propertyType} />
                    <FormSelect label="Ownership Type" value={formData.propertyOwnershipType} onChange={(v) => updateFormData("propertyOwnershipType", v)} options={propertyOwnershipTypes} required error={errors.propertyOwnershipType} />
                    <FormInput label="Market Value of Property (₹)" value={formData.propertyValue} onChange={(v) => updateFormData("propertyValue", v)} type="number" placeholder="e.g. 5000000" required error={errors.propertyValue} />
                    <FormInput label="Down Payment Amount (₹)" value={formData.downPaymentAmount} onChange={(v) => updateFormData("downPaymentAmount", v)} type="number" placeholder="Amount you will pay upfront" required error={errors.downPaymentAmount} />

                    {/* Derived LTV display */}
                    {formData.propertyValue && formData.downPaymentAmount && Number(formData.propertyValue) > 0 && (
                      <div className="md:col-span-2 flex items-center gap-4 p-3 bg-accent/40 rounded-lg border border-accent">
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Loan-to-Value (LTV) Ratio</p>
                          <p className="text-lg font-semibold text-primary">
                            {(((Number(formData.propertyValue) - Number(formData.downPaymentAmount)) / Number(formData.propertyValue)) * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Estimated Loan Required</p>
                          <p className="text-lg font-semibold text-foreground">
                            ₹{Math.max(0, Number(formData.propertyValue) - Number(formData.downPaymentAmount)).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Under-construction extras */}
                    {formData.propertyType === "under_construction" && (
                      <>
                        <FormInput label="Builder / Developer Name" value={formData.builderName} onChange={(v) => updateFormData("builderName", v)} placeholder="Enter builder name" error={errors.builderName} />
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground flex items-center gap-1">
                            Expected Possession Date <span className="text-destructive">*</span>
                          </label>
                          <input
                            type="date"
                            value={formData.possessionDate || ""}
                            min={getTodayISODate()}
                            onChange={(e) => updateFormData("possessionDate", e.target.value)}
                            className={cn(
                              "w-full rounded-md bg-background px-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-primary",
                              errors.possessionDate ? "border-destructive" : "border-input",
                            )}
                          />
                          {errors.possessionDate && <p className="text-xs text-destructive mt-1">{errors.possessionDate}</p>}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Property Address */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-2">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-1">
                        Property Address <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        value={formData.propertyAddress}
                        onChange={(e) => updateFormData("propertyAddress", e.target.value)}
                        rows={3}
                        placeholder="Full address of the property"
                        className={cn(
                          "w-full rounded-md bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2",
                          errors.propertyAddress ? "border border-destructive focus:ring-destructive" : "border border-input focus:ring-primary",
                        )}
                      />
                      {errors.propertyAddress && <p className="text-sm text-destructive mt-1">{errors.propertyAddress}</p>}
                    </div>
                    <div className="relative">
                      <FormInput label="Property State" value={formData.propertyState} onChange={handlePropertyStateChange} required error={errors.propertyState} autoComplete="off" />
                      {showPropertyStateDropdown && filteredPropertyStates.length > 0 && (
                        <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                          {filteredPropertyStates.map((state, index) => (
                            <div key={index} onClick={() => handlePropertyStateSelect(state)} className="px-3 py-2 cursor-pointer hover:bg-purple-50">{state}</div>
                          ))}
                        </div>
                      )}
                    </div>
                    <FormInput label="Property Pincode" value={formData.propertyPincode} onChange={(v) => updateFormData("propertyPincode", v.replace(/\D/g, "").slice(0, 6))} placeholder="6-digit pincode" required error={errors.propertyPincode} />
                  </div>
                </div>

                {/* Co-Applicant Section */}
                <div className="space-y-6 mt-8 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Co-Applicant Details
                    </h3>
                    {/* Toggle switch */}
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <div
                        onClick={() => setHasCoApplicant((v) => !v)}
                        className={cn(
                          "relative w-11 h-6 rounded-full transition-colors duration-200",
                          hasCoApplicant ? "bg-primary" : "bg-muted",
                        )}
                      >
                        <div className={cn(
                          "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200",
                          hasCoApplicant ? "translate-x-5" : "translate-x-0",
                        )} />
                      </div>
                      <span className="text-sm text-muted-foreground">{hasCoApplicant ? "Added" : "Add Co-Applicant"}</span>
                    </label>
                  </div>

                  {!hasCoApplicant && (
                    <p className="text-sm text-muted-foreground">
                      Adding a co-applicant (e.g. spouse) can improve your loan eligibility. Toggle the switch above to add one.
                    </p>
                  )}

                  {hasCoApplicant && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormInput label="Co-Applicant Full Name" value={formData.coApplicantName} onChange={(v) => updateFormData("coApplicantName", v)} placeholder="Enter full name" required error={errors.coApplicantName} />
                      <FormSelect label="Relation with Applicant" value={formData.coApplicantRelation} onChange={(v) => updateFormData("coApplicantRelation", v)} options={coApplicantRelationOptions} required error={errors.coApplicantRelation} />
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-1">
                          Date of Birth <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="date"
                          value={formData.coApplicantDOB || ""}
                          max={getTodayISODate()}
                          onChange={(e) => updateFormData("coApplicantDOB", e.target.value)}
                          className={cn(
                            "w-full rounded-md bg-background px-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-primary",
                            errors.coApplicantDOB ? "border-destructive" : "border-input",
                          )}
                        />
                        {errors.coApplicantDOB && <p className="text-xs text-destructive mt-1">{errors.coApplicantDOB}</p>}
                      </div>
                      <FormInput
                        label="Co-Applicant PAN"
                        value={formData.coApplicantPAN}
                        onChange={(v) => updateFormData("coApplicantPAN", v.toUpperCase())}
                        placeholder="ABCDE1234F"
                        required
                        error={errors.coApplicantPAN}
                      />
                      <FormSelect label="Employment Status" value={formData.coApplicantEmploymentStatus} onChange={(v) => updateFormData("coApplicantEmploymentStatus", v)} options={employmentStatuses} required error={errors.coApplicantEmploymentStatus} />
                      <FormInput label="Monthly Income (₹)" value={formData.coApplicantMonthlyIncome} onChange={(v) => updateFormData("coApplicantMonthlyIncome", v)} type="number" placeholder="Co-applicant monthly income" required error={errors.coApplicantMonthlyIncome} />
                    </div>
                  )}
                </div>
              </FormCard>
            )}

            {/* ── REVIEW STEP ─────────────────────────────────────────────────── */}
            {currentStep === reviewStep && (
              <div className="space-y-6">
                {/* Header Summary Card */}
                <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground shadow-xl shadow-primary/25">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-primary-foreground/80 text-sm font-medium mb-1">Application Summary</p>
                      <h2 className="text-2xl font-bold">{formData.firstName} {formData.middleName} {formData.lastName}</h2>
                      <p className="text-primary-foreground/80 mt-1">{formData.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary-foreground/80 text-sm font-medium mb-1">Requested Amount</p>
                      <p className="text-3xl font-bold">₹{Number(formData.loanAmount).toLocaleString("en-IN")}</p>
                      <p className="text-primary-foreground/80 mt-1">{loanTypes.find((l) => l.value === formData.loanType)?.label}</p>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SummarySection title="Personal Details" icon={User}>
                    <SummaryRow label="Full Name" value={`${formData.firstName} ${formData.middleName} ${formData.lastName}`} icon={User} />
                    <SummaryRow label="Date of Birth" value={formData.dateOfBirth} icon={Calendar} />
                    <SummaryRow label="Mobile" value={formData.mobileNumber} icon={Phone} />
                    <SummaryRow label="Email" value={formData.email} icon={Mail} />
                    <SummaryRow label="PAN Card" value={formData.panCard} icon={CreditCard} highlighted />
                    <SummaryRow label="Aadhaar" value={formData.aadhaarCard} icon={CreditCard} highlighted />
                  </SummarySection>

                  <SummarySection title="Address Details" icon={MapPin}>
                    <SummaryRow label="Address" value={formData.addressLine1} icon={Home} />
                    <SummaryRow label="State" value={formData.state} icon={MapPin} />
                    <SummaryRow label="Pincode" value={formData.pincode} />
                  </SummarySection>

                  <SummarySection title="Employment Details" icon={Briefcase}>
                    <SummaryRow label="Status" value={employmentStatuses.find((e) => e.value === formData.employmentStatus)?.label || ""} icon={Briefcase} />
                    <SummaryRow label="Company" value={formData.companyName} icon={Building} />
                    <SummaryRow label="Monthly Income" value={`₹${Number(formData.monthlyIncome).toLocaleString("en-IN")}`} icon={IndianRupee} highlighted />
                    <SummaryRow label="Existing EMI" value={`₹${Number(formData.existingEmi).toLocaleString("en-IN")}`} />
                  </SummarySection>

                  <SummarySection title="Credit Information" icon={CreditCard}>
                    <SummaryRow label="CIBIL Score" value={formData.cibilScore} icon={CreditCard} highlighted />
                    <SummaryRow label="Recent Enquiries" value={Number(formData.recentEnquiries) || 0} />
                    <SummaryRow label="EMI Bounces" value={Number(formData.emiBounces) || 0} />
                    <SummaryRow label="Credit Utilization" value={`${Number(formData.creditCardUtilization) || 0}%`} />
                    <SummaryRow label="Settlements" value={Number(formData.settlements) || 0} />
                  </SummarySection>
                </div>

                {/* Loan Details */}
                <SummarySection title="Loan Requirements" icon={IndianRupee}>
                  <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
                    <SummaryRow label="Loan Type" value={loanTypes.find((l) => l.value === formData.loanType)?.label || ""} highlighted />
                    <SummaryRow label="Loan Amount" value={`₹${Number(formData.loanAmount).toLocaleString("en-IN")}`} highlighted />
                    <SummaryRow label="Tenure" value={activeTenureOptions.find((t) => t.value === formData.loanTenure)?.label || ""} />
                  </div>
                </SummarySection>

                {/* Home Loan: Property Summary */}
                {isHomeLoan && (
                  <SummarySection title="Property Details" icon={Home}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                      <SummaryRow label="Loan Purpose" value={loanPurposeOptions.find((l) => l.value === formData.loanPurpose)?.label || ""} />
                      <SummaryRow label="Property Type" value={propertyTypes.find((p) => p.value === formData.propertyType)?.label || ""} highlighted />
                      <SummaryRow label="Property Value" value={`₹${Number(formData.propertyValue).toLocaleString("en-IN")}`} highlighted />
                      <SummaryRow label="Down Payment" value={`₹${Number(formData.downPaymentAmount).toLocaleString("en-IN")}`} />
                      <SummaryRow label="Property State" value={formData.propertyState} icon={MapPin} />
                      <SummaryRow label="Property Pincode" value={formData.propertyPincode} />
                      <SummaryRow label="Ownership Type" value={propertyOwnershipTypes.find((o) => o.value === formData.propertyOwnershipType)?.label || ""} />
                      {formData.propertyType === "under_construction" && (
                        <>
                          <SummaryRow label="Builder Name" value={formData.builderName} />
                          <SummaryRow label="Expected Possession" value={formData.possessionDate} icon={Calendar} />
                        </>
                      )}
                    </div>
                    {hasCoApplicant && (
                      <div className="mt-4 pt-4 border-t border-border/30">
                        <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          Co-Applicant
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                          <SummaryRow label="Name" value={formData.coApplicantName} />
                          <SummaryRow label="Relation" value={coApplicantRelationOptions.find((r) => r.value === formData.coApplicantRelation)?.label || ""} />
                          <SummaryRow label="PAN" value={formData.coApplicantPAN} highlighted />
                          <SummaryRow label="Monthly Income" value={`₹${Number(formData.coApplicantMonthlyIncome).toLocaleString("en-IN")}`} highlighted />
                          <SummaryRow label="Employment Status" value={employmentStatuses.find((e) => e.value === formData.coApplicantEmploymentStatus)?.label || ""} />
                        </div>
                      </div>
                    )}
                  </SummarySection>
                )}

                {/* Uploaded Documents */}
                <SummarySection title="Uploaded Documents" icon={FileText}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <DocumentStatus label="ITR/Form 16" file={documents.itr} icon={FileText} />
                    <DocumentStatus label="Applicant Photo" file={documents.photo} icon={User} />
                    {!isSelfEmployed && (
                      <>
                        <DocumentStatus label="Payslip - Month 1" file={documents.payslip1} icon={FileText} />
                        <DocumentStatus label="Payslip - Month 2" file={documents.payslip2} icon={FileText} />
                        <DocumentStatus label="Payslip - Month 3" file={documents.payslip3} icon={FileText} />
                      </>
                    )}
                    {isHomeLoan && (
                      <>
                        <DocumentStatus label="Property Document" file={documents.propertyDocument} icon={FileText} />
                        <DocumentStatus label="Sale Agreement" file={documents.saleAgreement} icon={FileText} />
                        {documents.titleDeed && <DocumentStatus label="Title Deed" file={documents.titleDeed} icon={FileText} />}
                        {documents.approvedPlan && <DocumentStatus label="Approved Building Plan" file={documents.approvedPlan} icon={FileText} />}
                        {documents.noc && <DocumentStatus label="NOC" file={documents.noc} icon={FileText} />}
                      </>
                    )}
                  </div>
                </SummarySection>

                {/* Terms & Consent */}
                <div className="bg-card rounded-xl border border-border/50 p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-foreground mb-4">Terms & Consent</h3>
                  <div className="space-y-4">
                    <div className={cn("flex items-start space-x-3 p-3 rounded-md border", consentError && !termsAccepted ? "border-destructive bg-destructive/5" : "border-border")}>
                      <Checkbox id="terms" className="mt-0.5 border-primary data-[state=checked]:bg-primary" checked={termsAccepted} onCheckedChange={(checked) => { setTermsAccepted(checked); if (checked && privacyAccepted) setConsentError(false); }} />
                      <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                        I hereby declare that all the information provided is true and accurate to the best of my knowledge. I authorize the bank to verify my details and make credit enquiries as necessary.
                      </label>
                    </div>
                    <div className={cn("flex items-start space-x-3 p-3 rounded-md border", consentError && !privacyAccepted ? "border-destructive bg-destructive/5" : "border-border")}>
                      <Checkbox id="privacy" className="mt-0.5 border-primary data-[state=checked]:bg-primary" checked={privacyAccepted} onCheckedChange={(checked) => { setPrivacyAccepted(checked); if (checked && termsAccepted) setConsentError(false); }} />
                      <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                        I have read and agree to the{" "}
                        <span className="text-primary underline cursor-pointer font-medium">Terms of Service</span>{" "}
                        and{" "}
                        <span className="text-primary underline cursor-pointer font-medium">Privacy Policy</span>.
                      </label>
                    </div>
                  </div>
                </div>
                {consentError && <p className="text-sm text-destructive mt-2">Please accept Terms & Privacy Policy to continue</p>}
              </div>
            )}
          </div>

          {/* ── Navigation Buttons ──────────────────────────────────────────────── */}
          <div className="mt-8 flex justify-between items-center">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0} className="h-12 px-6 border-border hover:bg-muted">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep < reviewStep && (
              <Button
                onClick={handleNext}
                disabled={isLoading}
                className={cn(
                  "h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25",
                  isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                )}
              >
                {isLoading ? <Loader size={20} /> : (<>Next<ArrowRight className="w-4 h-4 ml-2" /></>)}
              </Button>
            )}

            {currentStep === reviewStep && (
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
    </>
  );
};

export default LoanApplication;