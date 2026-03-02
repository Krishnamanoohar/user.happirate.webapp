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
// import { useNavigate } from "react-router-dom";
import {
  fetchCreditReport,
  // sendOtpToMobile,
  //verifyOtpApi,
  personalDetailsVerification,
  submitFinancialProfileDetails,
  updateCreditReport,
  fetchTaxDocuments,
  uploadFinancialDocuments,
} from "../../../src/api/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "@/IntegratedComps/src/components/Navbar";
import axios from "axios";
import Loader from "@/ReactBitsComps/Loader/Loader";
import { EmploymentHistorySection } from "./DynamicEmploymentComp";

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
  // { value: "", label: "Select Employment Status" },
  { value: "salaried", label: "Salaried" },
  { value: "self-employed", label: "Self Employed" },
];

const residentialStatuses = [
  { value: "owned", label: "Owned" },
  { value: "rented", label: "Rented" },
  { value: "family", label: "Living with Family" },
];
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  //union territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

// const formatDateToDDMMYYYY = (isoDate) => {
//   if (!isoDate) return "";
//   const [y, m, d] = isoDate.split("-");
//   return `${d}-${m}-${y}`;
// };
const getTodayISODate = () => {
  return new Date().toISOString().split("T")[0];
};

const normalizeAadhaarForApi = (value) =>
  value?.replace(/\D/g, "").replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3");

const validatePan = (value) => {
  if (!value) return "PAN is required";
  const pan = value.toUpperCase();
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(pan) ? null : "PAN must be in format ABCDE1234F";
};

// const validateGmail = (value) => {
//   if (!value) return "Email is required";
//   const regex = /^[a-z0-9._%+-]+@gmail\.com$/;
//   return regex.test(value.toLowerCase()) ? null : "Enter a valid Gmail address";
// };

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

const buildFileUpload = (data) => ({
  mobileNumber: sessionStorage.getItem("mobile_number"),
});

const LoanApplication = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(location.state?.goToStep ?? 0);
  // const location = useLocation();

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

    if (location.state?.goToStep !== undefined) {
      setCurrentStep(location.state.goToStep);
    }
  }, []);
  const [emailOptions, setEmailOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [taxNumber, setTaxNumber] = useState("");
  const [isFetchingDocs, setIsFetchingDocs] = useState(false);
  const [filteredStates, setFilteredStates] = useState([]);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const navigate = useNavigate();

  // Form data state (pre-filled)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    panCard: "",
    email: "",
    aadhaarCard: "",
    mobileNumber: "",
    uanNumber: "",
    employmentExperience: "",
    employmentStatus: "",
    gstNumber: "",
    companyName: "",
    monthlyIncome: "",
    residentialStatus: "",
    addressLine1: "",
    // city: "",
    state: "",
    pincode: "",
    loanType: "",
    loanAmount: "",
    cibilScore: "",
    recentEnquiries: "",
    settlements: "",
    emiBounces: "",
    creditCardUtilization: "",
    residentialStability: "",
    existingEmi: "",
    loanTenure: "",
    employmentCategory: "",
    previousCompanyName: "",
    previousCompanyFrom: "",
    previousCompanyTo: "",
    currentCompanyName: "",
    currentCompanyJoiningDate: "",
  });
  const [employmentData, setEmploymentData] = useState([]);

  const isSelfEmployed = formData.employmentStatus === "self-employed";
  const isEmpty = (v) => v === "" || v === null || v === undefined;
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
  const handleFetchTaxDocuments = async () => {
    if (!taxNumber.trim()) {
      toast.error("Please enter Tax Number");
      return;
    }

    try {
      setIsFetchingDocs(true);

      const resp = await fetchTaxDocuments({
        taxNumber,
        mobileNumber: sessionStorage.getItem("mobile_number"),
      });

      const itrFileUrl = resp?.data?.itrUrl;

      if (!itrFileUrl) {
        toast.error("No ITR documents found");
        return;
      }

      // Store in documents state
      setDocuments((prev) => ({
        ...prev,
        itr: {
          name: "ITR_Fetched.pdf",
          url: itrFileUrl,
          fetched: true,
        },
      }));

      toast.success("ITR documents fetched successfully");
    } catch (error) {
      toast.error("Failed to fetch tax documents");
    } finally {
      setIsFetchingDocs(false);
    }
  };
  const validateGST = (value) => {
    if (!value) return null;

    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

    return gstRegex.test(value.toUpperCase())
      ? null
      : "Invalid GST format (e.g. 22ABCDE1234F1Z5)";
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 0) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      // if (!formData.middleName) newErrors.middleName = "Middle name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "DOB is required";
      } else {
        const today = getTodayISODate();
        if (formData.dateOfBirth > today) {
          newErrors.dateOfBirth = "Date of birth cannot be in the future";
        }
      }
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.addressLine1)
        newErrors.addressLine1 = "Address is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.pincode) newErrors.pincode = "Pincode is required";
      if (!formData.aadhaarCard) newErrors.aadhaarCard = "Aadhaar is required";
      if (!formData.aadhaarCard || !/^\d{12}$/.test(formData.aadhaarCard))
        newErrors.aadhaarCard = "Aadhaar must be 12 digits";
      if (!formData.mobileNumber)
        newErrors.mobileNumber = "Mobile number is required";
    }

    if (currentStep === 1) {
      if (!formData.employmentStatus || formData.employmentStatus.trim() === "")
        newErrors.employmentStatus = "Employment Status is Required";
      if (isSelfEmployed) {
        const gstError = validateGST(formData.gstNumber);
        if (gstError) newErrors.gstNumber = gstError;
      }
      if (!formData.monthlyIncome)
        newErrors.monthlyIncome = "Monthly Income is Required";
      if (!isSelfEmployed) {
        if (!formData.employmentCategory)
          newErrors.employmentCategory = "Employment Category is required";
        if (!formData.employmentExperience) {
          newErrors.employmentExperience = "Employment Experience is Required";
        } else if (!/^\d+(\.\d+)?$/.test(formData.employmentExperience)) {
          newErrors.employmentExperience =
            "Only numbers allowed (e.g. 1 or 1.5)";
        }
        // if (!formData.previousCompanyName)
        //   newErrors.previousCompanyName = "Previous Company Name is required";
        // if (formData.previousCompanyName) {
        //   if (!formData.previousCompanyFrom) {
        //     newErrors.previousCompanyFrom =
        //       "Previous Company Joined Date is required";
        //   }

        //   if (!formData.previousCompanyTo) {
        //     newErrors.previousCompanyTo =
        //       "Previous Company Relieving Date is required";
        //   } else if (
        //     formData.previousCompanyFrom &&
        //     formData.previousCompanyTo <= formData.previousCompanyFrom
        //   ) {
        //     newErrors.previousCompanyTo =
        //       "Relieving date must be after joined date";
        //   }
        // }
        // if (!formData.currentCompanyName)
        //   newErrors.currentCompanyName = "Current Company Name is required";
        // if (!formData.currentCompanyJoiningDate)
        //   newErrors.currentCompanyJoiningDate =
        //     "Current Company Joining Date is required";
        // if (!formData.uanNumber)
        //   newErrors.uanNumber = "UAN/PF Number is required";
        // if (!formData.salaryMode)
        //   newErrors.salaryMode = "Salary Mode is required";
      }
      // if (
      //   !formData.residentialStability &
      //   (formData.residentialStability !== 0)
      // )
      //   newErrors.residentialStability = "Residential Stability is required";
    }

    if (currentStep === 2) {
      if (!formData.loanType) newErrors.loanType = "Loan Type is Required";
      if (!formData.loanAmount)
        newErrors.loanAmount = "Loan Amount is Required";
      if (!formData.loanTenure) newErrors.loanTenure = "Loan Tenure Required";
    }

    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
  const [consentError, setConsentError] = useState(false);
  const handleStateChange = (value) => {
    updateFormData("state", value);

    if (!value) {
      setFilteredStates([]);
      setShowStateDropdown(false);
      return;
    }

    const filtered = indianStates.filter((state) =>
      state.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredStates(filtered);
    setShowStateDropdown(true);
  };
  const handleStateSelect = (state) => {
    updateFormData("state", state);
    setShowStateDropdown(false);
  };

  const buildPersonalDetailsPayload = (data) => ({
    mobileNumber: sessionStorage.getItem("mobile_number"),
    firstName: data.firstName,
    lastName: data.lastName,
    middleName: data.middleName,
    dateOfBirth: data.dateOfBirth,
    email: data.email,
    panCard: data.panCard,
    aadharCard: data.aadhaarCard,
    // residentialType: data.residentialStatus,
    addressLine1: data.addressLine1,
    // city: data.city,
    state: data.state,
    pincode: data.pincode,
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
    // residentialStability: Number(data.residentialStability),
    existingEmi: Number(data.existingEmi),
    employmentCategory: data.employmentCategory,
    salaryMode: data.salaryMode,
  });

  const handleNext = async () => {
    if (currentStep === 3 && (!termsAccepted || !privacyAccepted)) {
      setConsentError(true);
      toast.error("Please accept Terms & Privacy Policy");
      return;
    } else {
      setConsentError(false);
    }
    if (!validateStep()) {
      toast.error("Please fill all required fields");
      return;
    }
    setIsLoading(true);
    // STEP 1 → Personal Details API
    if (currentStep === 0) {
      const panError = validatePan(formData.panCard);
      //const emailError = validateGmail(formData.email);

      if (panError) {
        toast.error(panError);
        setIsLoading(false);
        return;
      }
      const payload = buildPersonalDetailsPayload(formData);
      console.log("Personal Details Payload:", payload);

      try {
        const response = await updateCreditReport(payload);
        console.log(response, "response");
        toast.success("Personal details Submitted Sucessfully");
        setCurrentStep(1);
      } catch (error) {
        console.error(
          "Personal details submission failed",
          error.response?.data || error.message,
        );
        toast.error("Personal details submission failed");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // STEP 2 → Employment & Credit API
    if (currentStep === 1) {
      // const errors = validateEmploymentNumbers(formData);
      // if (Object.keys(errors).length) {
      //   alert("Please fix employment details");
      //   return;
      // }

      const payload = buildEmploymentDetailsPayload(formData);

      try {
        const response = await updateCreditReport(payload);
        console.log(response, "response________----");
        toast.success("Employment details Submitted Sucessfully");
        setCurrentStep(2);
      } catch (error) {
        console.error(
          "Employment details submission failed",
          error.response?.data || error.message,
        );
        toast.error("Employment details submission failed");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // STEP 3 → Documents (NO API in old code)
    if (currentStep === 2) {
      try {
        console.log(documents);
        const response = await handleDocumentUpload();
        console.log(response, "response");
      } catch (error) {
        console.log(error, "error");
      } finally {
        setIsLoading(false);
      }

      return;
    }

    // Proceed to fetch eligible loans
    if (currentStep === 3) {
      setIsLoading(false);
      navigate("/eligible-loans");
    }
  };
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log("Final Review Data:", { formData, documents });
    // alert("Application submitted successfully!");
    localStorage.setItem(
      "loanData",
      JSON.stringify({
        loanType: formData.loanType,
        loanAmount: formData.loanAmount,
        loanTenure: formData.loanTenure,
      }),
    );

    navigate("/eligible-loans");
  };
  //   const handleSubmit = () => {
  //   navigate("/smart-selection", {
  //     state: {
  //       desiredAmount: Number(formData.loanAmount),
  //       tenure: Number(formData.loanTenure),
  //     },
  //   });
  // };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error if exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const mapApiResponseToFormData = (apiData, mobile) => {
    // pick PRIMARY email
    const primaryEmail = apiData.emails?.[0]?.email || "";

    // pick RESIDENCE address (fallback to first)
    const addresses = Array.isArray(apiData?.addresses)
      ? apiData?.addresses
      : [];

    const residenceAddress =
      addresses.find((a) => a.type === "Residence") || addresses[0] || {};
    console.log(apiData.dateOfBirth.split("T")[0]);
    const employmentRecords = apiData?.employmentHistory?.employment_data || [];

    let previousCompany = null;
    let currentCompany = null;

    employmentRecords.forEach((job) => {
      const hasExit = job.date_of_exit && job.date_of_exit.trim() !== "";

      if (hasExit) {
        previousCompany = job;
      } else {
        currentCompany = job;
      }
    });

    // Helper to convert DD/MM/YYYY → YYYY-MM-DD
    const convertToISO = (dateString) => {
      if (!dateString) return "";
      const [day, month, year] = dateString.split("/");
      return `${year}-${month}-${day}`;
    };

    const hasUAN =
      employmentRecords.length > 0 && employmentRecords[0]?.uan?.trim() !== "";
    return {
      firstName: apiData.firstName ?? "",
      lastName: apiData.lastName ?? "",
      middleName: apiData.middleName ?? "",
      dateOfBirth: apiData.dateOfBirth.split("T")[0] ?? "",
      panCard: apiData.panCard ?? "",
      email: primaryEmail ?? [],
      aadhaarCard: apiData?.aadharCard ?? "", // ❌ NOT PROVIDED BY API
      mobileNumber: mobile,
      employmentStatus: hasUAN ? "salaried" : "",

      uanNumber: employmentRecords[0]?.uan ?? "",

      employmentExperience: apiData.employmentExperience ?? "",
      employmentCategory: apiData.employmentCategory ?? "",
      salaryMode: apiData.salaryMode ?? "",

      previousCompanyName: previousCompany?.establishment_name ?? "",
      previousCompanyFrom: previousCompany?.date_of_joining
        ? convertToISO(previousCompany.date_of_joining)
        : "",
      previousCompanyTo: previousCompany?.date_of_exit
        ? convertToISO(previousCompany.date_of_exit)
        : "",
      currentCompanyName: currentCompany?.establishment_name ?? "",
      currentCompanyJoiningDate: currentCompany?.date_of_joining
        ? convertToISO(currentCompany.date_of_joining)
        : "",
      monthlyIncome: apiData.monthlyIncome,

      residentialStatus: residenceAddress.type
        ? residenceAddress.type.toLowerCase()
        : "",

      addressLine1: residenceAddress?.streetAddress ?? "",
      city: apiData.city ?? "",
      state: residenceAddress.state ?? "",
      pincode: residenceAddress.pincode ?? "",

      loanType: "", // ❌ USER INPUT
      loanAmount: "", // ❌ USER INPUT

      cibilScore: apiData.cibilScore ?? "",
      recentEnquiries: apiData.last6MonthsEnquiryCount ?? "",
      settlements: apiData.settlements ?? "",
      emiBounces: apiData.emiBounces ?? "",
      creditCardUtilization: apiData.creaditCardUtilization ?? "",
      residentialStability: "", // ❌ NOT PROVIDED
      existingEmi: apiData.existingEmi ?? "",
      loanTenure: apiData.loanTenure ?? "",
      salaryMode: apiData.salaryMode ?? "",
      employmentCategory: apiData.employmentCategory ?? "",
    };
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
    <div className="flex justify-between items-start gap-4 py-2.5 border-b border-border/30 last:border-0">
      <span className="text-muted-foreground text-sm flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-primary/60" />}
        {label}
      </span>
      <span
        className={cn(
          "text-sm font-medium text-right max-w-[60%] break-words whitespace-normal leading-relaxed",
          highlighted ? "text-primary font-semibold" : "text-foreground",
        )}
      >
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

  const autoFillUserDetails = async () => {
    try {
      setPageLoading(true);
      const mobile = sessionStorage.getItem("mobile_number");
      const userId = sessionStorage.getItem("userId");
      console.log(mobile, "mobile");

      if (!mobile) {
        navigate("/sign-in", { replace: true });
        return;
      }
      const resp = await fetchCreditReport({
        mobileNumber: mobile,
        userId: userId,
      });
      console.log("credit report response", resp);
      const apiData = resp?.data?.data;
      setEmploymentData(apiData?.employmentHistory?.employment_data || []);

      if (!apiData) {
        console.error("Credit report API returned empty response", resp);
        return;
      }

      const apiEmails = Array.isArray(apiData.emails)
        ? apiData.emails.map((e) => e.email).filter(Boolean) // Remove empty/null values
        : [];

      // Create Set to remove duplicates and convert back to array
      const uniqueEmails = [...new Set(apiEmails)];
      setEmailOptions(uniqueEmails);

      setFormData((prev) => ({
        ...prev,
        email: apiEmails[0] || "",
      }));

      setFormData((prev) => ({
        ...prev,
        email: apiEmails[0] || "",
      }));

      console.log(
        "mapApiResponseToFormData",
        mapApiResponseToFormData(resp.data.data, mobile),
      );

      sessionStorage.setItem(
        "username",
        `${resp.data.data.firstName} ${resp.data.data.middleName} ${resp.data.data.lastName}`,
      );

      // setFormData(mapApiResponseToFormData(resp.data.data, mobile));
      setFormData((prev) => ({
        ...mapApiResponseToFormData(resp.data.data, mobile),

        // 🔥 Preserve Loan Fields If Already Filled
        loanType: prev.loanType,
        loanAmount: prev.loanAmount,
        loanTenure: prev.loanTenure,
      }));
    } catch (error) {
      console.log("error in auto filling user details", error);
    } finally {
      setPageLoading(false);
    }
  };

  const loanTenureOptions = Array.from({ length: 115 }, (_, i) => {
    const months = i + 6; // start from 6
    return {
      value: String(months),
      label: `${months} Months`,
    };
  });

  const handleDocumentUpload = async () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    // --- NEW: Client-side file size validation ---
    const MAX_FILE_SIZE_MB = 5; // Max size for a SINGLE file (e.g., 5MB)
    const MAX_TOTAL_SIZE_MB = 15; // Max size for the ENTIRE batch (e.g., 15MB)

    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
    const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;

    // Gather all currently selected files into an array, ignoring empty ones
    const selectedFiles = [
      documents.payslip1,
      documents.payslip2,
      documents.payslip3,
      documents.itr,
      documents.photo,
    ].filter(Boolean);

    let totalSize = 0;

    for (const file of selectedFiles) {
      // Check individual file size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast.error(
          `File "${file.name}" is too large. Maximum allowed size is ${MAX_FILE_SIZE_MB}MB.`,
        );
        return; // Stop the upload process instantly
      }
      totalSize += file.size;
    }

    // Check total batch size
    if (totalSize > MAX_TOTAL_SIZE_BYTES) {
      toast.error(
        `Total document size is too large. Maximum allowed is ${MAX_TOTAL_SIZE_MB}MB. Please compress your files.`,
      );
      return; // Stop the upload process instantly
    }
    // ----------------------------------------------

    // 1. Create and pack the FormData
    const formData = new FormData();
    formData.append("userId", userId);

    // Loop and append all payslips under the 'payslips' key
    if (documents.payslip1) formData.append("payslips", documents.payslip1);
    if (documents.payslip2) formData.append("payslips", documents.payslip2);
    if (documents.payslip3) formData.append("payslips", documents.payslip3);
    if (documents.itr) formData.append("itrs", documents.itr);
    if (documents.photo) formData.append("others", documents.photo);

    try {
      const response = await uploadFinancialDocuments(formData);

      if (response.status === 201 || response.status === 200) {
        setCurrentStep(3);
        toast.success("Documents uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload failed:", error);

      // Fallback error handling if a 413 somehow slips through to the client
      if (error.response?.status === 413) {
        toast.error("Files are too large for the server to process.");
      } else {
        toast.error(
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Document upload failed. Is your backend running?",
        );
      }
    }
  };

  // const handleDocumentUpload = async () => {
  //   const userId = sessionStorage.getItem("userId");

  //   if (!userId) {
  //     toast.error("User ID is missing. Please log in again.");
  //     return;
  //   }

  //   // 1. Create and pack the FormData
  //   const formData = new FormData();
  //   formData.append("userId", userId);

  //   // Loop and append all payslips under the 'payslips' key
  //   // Ensure 'documents' state actually contains File objects from the input!
  //   if (documents.payslip1) formData.append("payslips", documents.payslip1);
  //   if (documents.payslip2) formData.append("payslips", documents.payslip2);
  //   if (documents.payslip3) formData.append("payslips", documents.payslip3);
  //   if (documents.itr) formData.append("itrs", documents.itr);
  //   if (documents.photo) formData.append("others", documents.photo);

  //   try {
  //     const response = await uploadFinancialDocuments(formData);

  //     if (response.status === 201 || response.status === 200) {
  //       // setCurrentStep(3); // Move to the next step in your UI
  //       setCurrentStep(3);
  //       toast.success("Documents uploaded successfully!");
  //     }
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //     toast.error(
  //       error.response?.data?.error ||
  //         error.response?.data?.message ||
  //         "Document upload failed. Is your backend running?",
  //     );
  //   }
  // };

  useEffect(() => {
    autoFillUserDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md px-6">
          {/* Sub Message with Brand Color */}
          <p className="text-xl md:text-2xl font-bold text-slate-800 animate-pulse">
            Loading your{" "}
            <span className="text-[#7c3aed]">credit profile...</span>
          </p>

          {/* Modern Bordered Loader Bar */}
          <div className="w-full h-5 bg-white border-2 border-slate-200 rounded-full p-1 shadow-sm">
            {/* Inner Progress Bar */}
            <div
              className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full animate-loader-bar shadow-[0_0_8px_rgba(124,58,237,0.3)]"
              style={{
                width: "40%",
              }} /* Note: Use state/props for dynamic width */
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen justify-center bg-gradient-to-br from-background via-background to-accent/20 ">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
        <div className="px-4 py-8 md:py-12 max-w-7xl w-full mt-10">
          {/* Header */}
          <div className="justify-center text-center mb-8">
            <h1 className="text-4xl md:text-3xl font-bold text-foreground mb-4 mt-4">
              Loan <span className="text-[#7c3bed]">Application</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#7c3bed] to-transparent mx-auto rounded-full opacity-50 mb-4"></div>
            <p className="mt-2 text-muted-foreground">
              Complete all steps to submit your application
            </p>
          </div>

          {/* Step Indicator */}
          <div>
            <StepIndicator steps={steps} currentStep={currentStep + 1} />
          </div>

          {/* Form Content */}
          <div className="mt-8 space-y-6">
            {/* Step 1: Personal Details + Address */}
            {currentStep === 0 && (
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
                      error={errors.firstName}
                    />
                    <FormInput
                      label="Middle Name"
                      value={formData.middleName}
                      onChange={(v) => updateFormData("middleName", v)}
                    // required
                    // error={errors.middleName}
                    />
                    <FormInput
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(v) => updateFormData("lastName", v)}
                      required
                      error={errors.lastName}
                    />
                    <FormInput
                      label="Date of Birth"
                      value={formData.dateOfBirth}
                      onChange={(v) => updateFormData("dateOfBirth", v)}
                      type="date"
                      max={getTodayISODate()} // ✅ prevents future selection
                      required
                      error={errors.dateOfBirth}
                    />
                    <FormInput
                      label="PAN Card"
                      value={formData.panCard}
                      disabled
                      hint="PAN cannot be edited as it's verified from source"
                      error={errors.panCard}
                    />
                    {emailOptions.length > 1 ? (
                      <FormSelect
                        label="E-Mail ID"
                        value={formData.email}
                        onChange={(v) => updateFormData("email", v)}
                        options={Array.from(emailOptions).map((e) => ({
                          value: e,
                          label: e,
                        }))}
                        required
                        error={errors.email}
                      />
                    ) : (
                      <FormInput
                        label="E-Mail ID"
                        value={formData.email}
                        onChange={(v) => updateFormData("email", v)}
                        type="email"
                        required
                        error={errors.email}
                      />
                    )}

                    <FormInput
                      label="Aadhaar Card"
                      type="number"
                      value={formData.aadhaarCard}
                      onChange={(v) => updateFormData("aadhaarCard", v)}
                      required
                      // hint="Aadhaar cannot be edited as it's verified from source"
                      error={errors.aadhaarCard}
                    />
                    <FormInput
                      label="Mobile Number"
                      value={formData.mobileNumber}
                      onChange={(v) => updateFormData("mobileNumber", v)}
                      type="tel"
                      required
                      error={errors.mobileNumber}
                    />
                  </div>

                  {/* Address Section */}
                  <div className="space-y-6 mt-8 pt-6 border-t border-border">
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Address Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Address Line 1
                        </label>

                        <textarea
                          value={formData.addressLine1}
                          onChange={(e) =>
                            updateFormData("addressLine1", e.target.value)
                          }
                          required
                          error={errors.addressLine1}
                          rows={3}
                          className={cn(
                            "w-full rounded-md bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2",
                            errors.addressLine1
                              ? "border border-destructive focus:ring-destructive"
                              : "border border-input focus:ring-primary",
                          )}
                        />
                        {errors.addressLine1 && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.addressLine1}
                          </p>
                        )}
                      </div>

                      {/* <FormInput
                      label="City"
                      value={formData.city}
                      onChange={(v) => updateFormData("city", v)}
                      required
                    /> */}
                      <div className="relative">
                        <FormInput
                          label="State"
                          value={formData.state}
                          onChange={handleStateChange}
                          required
                          error={errors.state}
                          autoComplete="off"
                        />
                        {showStateDropdown && filteredStates.length > 0 && (
                          <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {filteredStates.map((state, index) => (
                              <div
                                key={index}
                                onClick={() => handleStateSelect(state)}
                                className="px-3 py-2 cursor-pointer hover:bg-purple-50"
                              >
                                {state}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <FormInput
                        label="Pincode"
                        value={formData.pincode}
                        onChange={(v) => updateFormData("pincode", v)}
                        required
                        error={errors.pincode}
                      />
                      {/* <FormSelect
                      label="Residential Status"
                      value={formData.residentialStatus}
                      onChange={(v) => updateFormData("residentialStatus", v)}
                      options={residentialStatuses}
                    /> */}
                    </div>
                  </div>
                </div>
              </FormCard>
            )}

            {/* Step 2: Employment & Credit Details (no address) */}
            {currentStep === 1 && (
              <FormCard
                title="Review & Edit Employment and Credit Details"
                subtitle="Please review and update your employment and credit information"
              >
                <EmploymentHistorySection
                  employmentData={employmentData}
                  setEmploymentData={setEmploymentData}
                />
                {/* Employment Section */}
                <div className="space-y-6 mt-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormSelect
                      label="Employment Status"
                      value={formData.employmentStatus}
                      onChange={(v) => updateFormData("employmentStatus", v)}
                      options={employmentStatuses}
                      required
                      error={errors.employmentStatus}
                    />
                    {isSelfEmployed && (
                      <FormInput
                        label="GST Number (Optional)"
                        value={formData.gstNumber}
                        onChange={(v) =>
                          updateFormData("gstNumber", v.toUpperCase())
                        }
                        placeholder="Enter GST Number"
                        error={errors.gstNumber}
                      />
                    )}
                    {!isSelfEmployed && (
                      <>
                        <FormSelect
                          label="Salary Mode"
                          value={formData.salaryMode}
                          onChange={(v) => updateFormData("salaryMode", v)}
                          placeholder="Select Salary Mode"
                          required
                          options={[
                            { value: "bank-transfer", label: "Bank Transfer" },
                            { value: "cash", label: "Cash" },
                          ]}
                          error={errors.salaryMode}
                        />
                        {/* <FormInput
                          label="Employment Category"
                          value={formData.employmentCategory}
                          onChange={(v) =>
                            updateFormData("employmentCategory", v)
                          }
                          required
                          error={errors.employmentCategory}
                        /> */}
                        <FormInput
                          label="Employment Experience (Years)"
                          placeholder="e.g. 1.5"
                          value={formData.employmentExperience || ""}
                          type="number"
                          step="0.1"
                          min="0"
                          inputMode="decimal"
                          onChange={(v) => {
                            // allow only numbers + decimal
                            if (/^\d*\.?\d*$/.test(v)) {
                              updateFormData("employmentExperience", v);
                            }
                          }}
                          required
                          error={errors.employmentExperience}
                        />
                        {/* <FormInput
                          label="UAN / PF Number"
                          value={formData.uanNumber || ""}
                          onChange={(v) =>
                            updateFormData("uanNumber", v.replace(/\D/g, ""))
                          }
                          required
                          error={errors.uanNumber}
                        /> */}
                      </>
                    )}
                    <FormInput
                      label="Monthly Income (₹)"
                      value={formData.monthlyIncome}
                      onChange={(v) => updateFormData("monthlyIncome", v)}
                      type="number"
                      required
                      error={errors.monthlyIncome}
                    />
                    {!isSelfEmployed && (
                      <>
                        {/* <FormInput
                          label="Previous Company Name"
                          value={formData.previousCompanyName || ""}
                          onChange={(v) =>
                            updateFormData("previousCompanyName", v)
                          }
                          placeholder="Enter previous company name"
                          required
                          error={errors.previousCompanyName}
                        /> */}

                        {/* Previous Company From Date - custom with Calendar icon */}
                        {/* <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground flex items-center gap-1">
                            Previous Company Joined Date{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              value={formData.previousCompanyFrom || ""}
                              onChange={(e) =>
                                updateFormData(
                                  "previousCompanyFrom",
                                  e.target.value,
                                )
                              }
                              max={getTodayISODate()}
                              className={cn(
                                "w-full rounded-md bg-background px-3 py-2 pr-10 text-sm border focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer",
                                errors.previousCompanyFrom
                                  ? "border-destructive focus:ring-destructive"
                                  : "border-input",
                              )}
                            />
                            
                          </div>
                          {errors.previousCompanyFrom && (
                            <p className="text-xs text-destructive mt-1">
                              {errors.previousCompanyFrom}
                            </p>
                          )}
                        </div> */}

                        {/* Previous Company To Date - custom with Calendar icon */}
                        {/* <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground flex items-center gap-1">
                            Previous Company Relieving Date{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              value={formData.previousCompanyTo || ""}
                              onChange={(e) =>
                                updateFormData(
                                  "previousCompanyTo",
                                  e.target.value,
                                )
                              }
                              min={formData.previousCompanyFrom || undefined}
                              max={getTodayISODate()}
                              className={cn(
                                "w-full rounded-md bg-background px-3 py-2 pr-10 text-sm border focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer",
                                errors.previousCompanyTo
                                  ? "border-destructive focus:ring-destructive"
                                  : "border-input",
                              )}
                            />
                           
                          </div>
                          {errors.previousCompanyTo && (
                            <p className="text-xs text-destructive mt-1">
                              {errors.previousCompanyTo}
                            </p>
                          )}
                        </div> */}

                        {/* <FormInput
                          label="Current Company Name"
                          value={formData.currentCompanyName || ""}
                          onChange={(v) =>
                            updateFormData("currentCompanyName", v)
                          }
                          placeholder="Enter current company name"
                          required
                          error={errors.currentCompanyName}
                        /> */}

                        {/* Current Company Joining Date - custom with Calendar icon */}
                        {/* <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground flex items-center gap-1">
                            Current Company Joining Date{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              value={formData.currentCompanyJoiningDate || ""}
                              onChange={(e) =>
                                updateFormData(
                                  "currentCompanyJoiningDate",
                                  e.target.value,
                                )
                              }
                              min={formData.previousCompanyTo || undefined}
                              max={getTodayISODate()}
                              className={cn(
                                "w-full rounded-md bg-background px-3 py-2 pr-10 text-sm border focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer",
                                errors.currentCompanyJoiningDate
                                  ? "border-destructive focus:ring-destructive"
                                  : "border-input",
                              )}
                            />
                          </div>
                          {errors.currentCompanyJoiningDate && (
                            <p className="text-xs text-destructive mt-1">
                              {errors.currentCompanyJoiningDate}
                            </p>
                          )}
                        </div> */}
                      </>
                    )}
                  </div>
                </div>

                {/* Credit Details Section */}
                <div className="space-y-6 mt-8 pt-6 border-t border-border">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary" />
                    Credit Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <FormInput
                      label="CIBIL Score"
                      value={formData.cibilScore}
                      disabled
                      placeholder="Enter your CIBIL score"
                      required
                      error={errors.cibilScore}
                    />
                    <FormInput
                      label="Recent Enquiries"
                      value={formData.recentEnquiries}
                      disabled
                      placeholder="Number of recent credit enquiries"
                      required
                      error={errors.recentEnquiries}
                    />
                    <FormInput
                      label="Settlements"
                      value={formData.settlements}
                      disabled
                      placeholder="Any loan settlements"
                      required
                      error={errors.settlements}
                    />
                    <FormInput
                      label="EMI Bounces"
                      value={formData.emiBounces}
                      disabled
                      placeholder="Number of EMI bounces"
                      required
                      error={errors.emiBounces}
                    />
                    <FormInput
                      label="Credit Card Utilization (%)"
                      value={formData.creditCardUtilization}
                      disabled
                      placeholder="e.g., 40%"
                      required
                      error={errors.creditCardUtilization}
                    />
                    {/* <FormSelect
                      label="Residential Stability"
                      value={formData.residentialStability}
                      onChange={(v) =>
                        updateFormData("residentialStability", v)
                      }
                      placeholder="Select stability period"
                      required
                      options={[
                        { value: "1", label: "Less than 1 year" },
                        { value: "3", label: "1-3 years" },
                        { value: "5", label: "3-5 years" },
                        { value: "10", label: "More than 5 years" },
                      ]}
                      error={errors.residentialStability}
                    /> */}
                    <FormInput
                      label="Existing EMI (₹)"
                      value={formData.existingEmi}
                      disabled
                      placeholder="Total existing EMI amount"
                      type="number"
                      required
                      error={errors.existingEmi}
                    />
                  </div>
                </div>
              </FormCard>
            )}

            {/* Step 3: Loan & Documents */}
            {currentStep === 2 && (
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
                      error={errors.loanType}
                    />
                    <FormInput
                      label="Desired Loan Amount (₹)"
                      value={formData.loanAmount}
                      onChange={(v) => updateFormData("loanAmount", v)}
                      placeholder="Enter amount"
                      type="number"
                      required
                      error={errors.loanAmount}
                    />
                    <FormSelect
                      label="Desired Loan Tenure"
                      value={formData.loanTenure}
                      onChange={(v) => updateFormData("loanTenure", v)}
                      options={loanTenureOptions}
                      placeholder="Select tenure"
                      required
                      error={errors.loanTenure}
                    />
                  </div>
                </div>

                {/* Documents Section */}
                <div className="space-y-6 mt-8 pt-6 border-t border-border">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-primary rounded-full" />
                    Required Documents
                  </h3>
                  <div className="flex gap-8 w-full md:w-auto">
                    <input
                      type="text"
                      placeholder="Enter Your Income Tax Efiling Password"
                      value={taxNumber}
                      onChange={(e) => setTaxNumber(e.target.value)}
                      className="h-10 w-70 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />

                    <Button
                      onClick={handleFetchTaxDocuments}
                      disabled={isFetchingDocs}
                      className="h-10"
                    >
                      {isFetchingDocs ? "Fetching..." : "Fetch ITR Documents"}
                    </Button>
                  </div>
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
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Header Summary Card */}
                <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground shadow-xl shadow-primary/25">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-primary-foreground/80 text-sm font-medium mb-1">
                        Application Summary
                      </p>
                      <h2 className="text-2xl font-bold">
                        {formData.firstName} {formData.middleName}{" "}
                        {formData.lastName}
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
                      value={`${formData.firstName} ${formData.middleName} ${formData.lastName}`}
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
                      value={formData.city || "—"}
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
                      value={Number(formData.recentEnquiries) || 0}
                    />
                    <SummaryRow
                      label="EMI Bounces"
                      value={Number(formData.emiBounces) || 0}
                    />
                    <SummaryRow
                      label="Credit Utilization"
                      value={`${Number(formData.creditCardUtilization) || 0}%`}
                    />
                    <SummaryRow
                      label="Settlements"
                      value={Number(formData.settlements) || 0}
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
                    <div
                      className={cn(
                        "flex items-start space-x-3 p-3 rounded-md border",
                        consentError && !termsAccepted
                          ? "border-destructive bg-destructive/5"
                          : "border-border",
                      )}
                    >
                      <Checkbox
                        id="terms"
                        className="mt-0.5 border-primary data-[state=checked]:bg-primary"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => {
                          setTermsAccepted(checked);
                          if (checked && privacyAccepted)
                            setConsentError(false);
                        }}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                      >
                        I hereby declare that all the information provided is
                        true and accurate to the best of my knowledge. I
                        authorize the bank to verify my details and make credit
                        enquiries as necessary.
                      </label>
                    </div>
                    <div
                      className={cn(
                        "flex items-start space-x-3 p-3 rounded-md border",
                        consentError && !privacyAccepted
                          ? "border-destructive bg-destructive/5"
                          : "border-border",
                      )}
                    >
                      <Checkbox
                        id="privacy"
                        className="mt-0.5 border-primary data-[state=checked]:bg-primary"
                        checked={privacyAccepted}
                        onCheckedChange={(checked) => {
                          setPrivacyAccepted(checked);
                          if (checked && termsAccepted) setConsentError(false);
                        }}
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
                {consentError && (
                  <p className="text-sm text-destructive mt-2">
                    Please accept Terms & Privacy Policy to continue
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="h-12 px-6 border-border hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep < 3 && (
              <Button
                onClick={handleNext}
                disabled={isLoading}
                className={cn(
                  "h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25",
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer",
                )}
              >
                {isLoading ? (
                  <Loader size={20} />
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}

            {currentStep === 3 && (
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
