import { useState, useEffect } from "react";

import { Download, FileText, File, Files } from "lucide-react";
import {
  User,
  MapPin,
  Briefcase,
  CreditCard,
  Phone,
  Mail,
  Calendar,
  Shield,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { fetchCreditReport, fetchUserFinDocuments } from "@/api/api";
import ProfileSection from "@/components/ProfileSection/ProfileSection";
import DetailRow from "@/components/DetailRow/DetailRow";
import { Menu, X } from "lucide-react";
import FileUploadZone from "@/components/FileUploadZone";
import { fetchTaxDocuments } from "@/api/api";
import { Button } from "@/components/ui/button";
import { error } from "three";
import { useContextData } from "@/context/AuthContext";
const tabs = [
  { id: "personal", label: "Personal Info", icon: User },
  // { id: "address", label: "Address", icon: MapPin },
  { id: "employment", label: "Employment", icon: Briefcase },
  { id: "credit", label: "Credit Info", icon: CreditCard },
  { id: "documents", label: "Documents", icon: Files },
] as const;

type TabId = (typeof tabs)[number]["id"];

interface ProfileData {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  panCard: string;
  aadhaarCard: string;
  email: string;
  mobile: string;
  gender: string;
  fatherName: string;
  maritalStatus: string;
  nationality: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  residentialStatus: string;
  employmentStatus: string;
  salaryMode: string;
  experience: string;
  uanPfNumber: string;
  monthlyIncome: string;
  previousCompany: string;
  currentCompany: string;
  currentJoinDate: string;
  previousCompanyJoinDate: string;
  previousCompanyRelieveDate: string;
  cibilScore: string;
  recentEnquiries: string;
  settlements: string;
  emiBounces: string;
  creditUtilization: string;
  emergencyName: string;
  emergencyContact: string;
  emergencyRelation: string;
}

const defaultData: ProfileData = {
  firstName: "BIRUDARAJU",
  middleName: "KRISHNA",
  lastName: "MANOHAR",
  dateOfBirth: "28/10/2002",
  panCard: "GKRPM0508Q",
  aadhaarCard: "XXXX XXXX 1234",
  email: "bkrishnamanohar001@gmail.com",
  mobile: "9346926366",
  gender: "Male",
  fatherName: "B Srinivas Raju",
  maritalStatus: "Single",
  nationality: "Indian",
  addressLine1: "S O B SRINIVAS RAJU H NO 5 2 393 ISP GAYATRI NAGAR",
  addressLine2: "VANASTHALIPURAM HAYATHNAGAR RANGAREDDY",
  city: "Hyderabad",
  state: "Telangana",
  pincode: "500070",
  residentialStatus: "Owned",
  employmentStatus: "Salaried",
  salaryMode: "Cash",
  experience: "68 months",
  uanPfNumber: "123456",
  monthlyIncome: "₹1,00,000",
  previousCompany: "adfkjl",
  previousCompanyJoinDate: "01/06/2020",
  previousCompanyRelieveDate: "15/02/2022",
  currentCompany: "Real Variable",
  currentJoinDate: "15/10/2024",
  cibilScore: "890",
  recentEnquiries: "0",
  settlements: "0",
  emiBounces: "0",
  creditUtilization: "0%",
  emergencyName: "Srinivas Raju",
  emergencyContact: "9876543210",
  emergencyRelation: "Father",
};
const formatExperience = (value: string) => {
  if (!value) return "—";

  const totalMonths = parseInt(value.replace(/\D/g, ""));
  if (isNaN(totalMonths)) return value;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years > 0 && months > 0) {
    return `${years} year${years > 1 ? "s" : ""} ${months} month${months > 1 ? "s" : ""}`;
  }

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  }

  return `${months} month${months > 1 ? "s" : ""}`;
};

interface UploadedDoc {
  name: string;
  type: string;
  size: string;
  date: string;
  url: string;
}

interface DocumentSection {
  category: string;
  icon: any;
  docs: UploadedDoc[];
}

const ProfilePage = () => {
  const { creditProfile, isLoading } = useContextData();
  const [activeTab, setActiveTab] = useState<TabId>("personal");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [taxNumber, setTaxNumber] = useState("");
  const [isFetchingDocs, setIsFetchingDocs] = useState(false);
  const [document, setDocument] = useState<DocumentSection[]>([]);
  const [documents, setDocuments] = useState({
    itr: null,
    photo: null,
    payslip1: null,
    payslip2: null,
    payslip3: null,
  });
  const userInfo = sessionStorage.getItem("userId");
  console.log("creditProfile", creditProfile);

  const fetchUploadedDocuments = async () => {
    try {
      if (!userInfo) return;

      const response = await fetchUserFinDocuments(userInfo);
      const files = response?.data?.documents || [];

      const formatDisplayName = (fileName: string) => {
        // Remove timestamp prefix
        const parts = fileName.split("_");
        if (!isNaN(Number(parts[0]))) {
          parts.shift();
        }

        const withoutTimestamp = parts.join("_");
        const ext = withoutTimestamp.split(".").pop();
        const base = withoutTimestamp.replace(`.${ext}`, "");

        // Clean unwanted patterns
        const cleaned = base
          .replace(/payslip/gi, "")
          .replace(/itr/gi, "")
          .replace(/form16/gi, "")
          .replace(/[-_]+/g, " ")
          .trim();

        // Decide prefix dynamically
        let prefix = "Document";
        const lower = fileName.toLowerCase();

        if (lower.includes("payslip")) prefix = "Payslip";
        else if (lower.includes("itr") || lower.includes("form16"))
          prefix = "ITR";

        // Final format → Payslip-FileName-Type.pdf
        return `${prefix} - ${cleaned.replace(/\s+/g, "_")}.${ext}`;
      };

      const extractDateFromName = (fileName: string) => {
        const timestamp = fileName.split("_")[0];
        const date = new Date(Number(timestamp));

        if (isNaN(date.getTime())) return "Unknown";

        return date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      };

      const getFileType = (fileName: string) =>
        fileName.split("_").pop()?.toUpperCase() || "FILE";

      const grouped = {
        Payslips: [] as UploadedDoc[],
        ITR: [] as UploadedDoc[],
        Others: [] as UploadedDoc[],
      };

      files.forEach((file: any) => {
        const cleanFileName = (fileName: string) => {
          const parts = fileName.split("_");

          if (!isNaN(Number(parts[0]))) {
            parts.shift();
          }

          return parts.join("_").replace(/_-_/g, " ").replace(/_+/g, "_");
        };

        const doc: UploadedDoc = {
          name: formatDisplayName(file.fileName),
          type: getFileType(file.fileName),
          size: null,
          date: extractDateFromName(file.fileName),
          url: file.viewUrl,
        };

        const lower = file.fileName.toLowerCase();

        if (lower.includes("payslip")) {
          grouped.Payslips.push(doc);
        } else if (
          lower.includes("itr") ||
          lower.includes("form16") ||
          lower.includes("tax")
        ) {
          grouped.ITR.push(doc);
        } else {
          grouped.Others.push(doc);
        }
      });

      const formatted: DocumentSection[] = [
        {
          category: "Payslips",
          icon: FileText,
          docs: grouped.Payslips,
        },
        {
          category: "ITR Documents",
          icon: FileText,
          docs: grouped.ITR,
        },
        {
          category: "Other Documents",
          icon: FileText,
          docs: grouped.Others,
        },
      ].filter((section) => section.docs.length > 0);

      setDocument(formatted);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const getCibilBadge = (score: string) => {
    const s = parseInt(score);

    if (s >= 750)
      return {
        label: "Excellent",
        color: "bg-green-500/10 text-green-600 border-green-500/20",
      };

    if (s >= 650)
      return {
        label: "Good",
        color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      };

    return {
      label: "Poor",
      color: "bg-red-500/10 text-red-600 border-red-500/20",
    };
  };

  const cibil = getCibilBadge(creditProfile?.cibilScore || "0");
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
  if (isLoading || !creditProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md px-6">
          <p className="text-xl md:text-2xl font-bold text-slate-800 animate-pulse">
            Loading your <span className="text-[#7c3aed]">profile...</span>
          </p>

          <div className="w-full h-5 bg-white border-2 border-slate-200 rounded-full p-1 shadow-sm">
            <div
              className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full animate-loader-bar shadow-[0_0_8px_rgba(124,58,237,0.3)]"
              style={{ width: "60%" }}
            />
          </div>
        </div>
      </div>
    );
  }
  console.log("user profile credit", creditProfile);
  return (
    <div className="min-h-screen bg-background mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
        {" "}
        {/* Sidebar */}
        <>
          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <aside
            className={`
      fixed md:static
      top-0 left-0
      z-50 md:z-auto
      h-screen w-64
      bg-card border-r border-border
      transform transition-transform duration-300 ease-in-out
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0
      flex flex-col
    `}
          >
            {/* Close button - Mobile only */}
            <div className="md:hidden flex justify-end p-4">
              <button onClick={() => setIsSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Profile mini card */}
            <div className="p-4 mx-3 mt-4 rounded-xl bg-secondary/60 border border-border/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-violet-200 from-primary/20 to-accent flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">
                    {creditProfile?.firstName?.[0] || ""}
                    {creditProfile?.lastName?.[0] || ""}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {creditProfile?.firstName} {creditProfile?.lastName}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {creditProfile?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-3 mt-6 space-y-1 overflow-y-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsSidebarOpen(false); // auto close on mobile
                    }}
                    className={`w-full mt-2 flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </aside>
        </>
        {/* Main content */}
        <main className="flex-1 min-h-screen">
          {/* Top bar */}

          <header className="sticky top-0 z-40 bg-background/60 md:bg-background/80 backdrop-blur-md border-b border-border/60">
            <div className="px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
              {/* Left section */}
              <div className="flex items-center gap-3 min-w-0">
                {/* Burger */}
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="md:hidden p-2 rounded-lg hover:bg-secondary shrink-0"
                >
                  <Menu className="h-5 w-5" />
                </button>

                <div className="min-w-0">
                  <h2 className="text-sm md:text-lg font-bold text-foreground truncate">
                    {tabs.find((t) => t.id === activeTab)?.label}
                  </h2>
                  <p className="text-[10px] md:text-xs text-muted-foreground truncate">
                    View and manage your details
                  </p>
                </div>
              </div>

              {/* CIBIL Section */}
              <div className="text-right shrink-0">
                <p className="text-[10px] md:text-xs text-muted-foreground">
                  CIBIL Score
                </p>

                <div className="flex items-center gap-2 mt-0.5 justify-end">
                  <span className="text-lg md:text-xl font-bold text-primary font-mono">
                    {creditProfile?.cibilScore}
                  </span>

                  <span
                    className={`text-[9px] md:text-[10px] font-medium px-2 py-0.5 rounded-full border ${cibil.color}`}
                  >
                    {cibil.label}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="w-full px-6 py-6" key={activeTab}>
            {" "}
            {activeTab === "personal" && (
              <div className="space-y-6">
                <ProfileSection icon={User} title="Basic Information">
                  <DetailRow
                    label="Full Name"
                    value={
                      `${creditProfile?.firstName} ${creditProfile?.middleName} ${creditProfile?.lastName}` ||
                      "Not provided"
                    }
                  />
                  <DetailRow
                    label="Date of Birth"
                    value={
                      creditProfile?.dateOfBirth
                        ? new Date(
                            creditProfile.dateOfBirth,
                          ).toLocaleDateString()
                        : "Not provided"
                    }
                  />
                  <DetailRow
                    label="Gender"
                    value={creditProfile?.Gender || "Not provided"}
                  />
                  {/* <DetailRow
                    label="Father's Name"
                    value={creditProfile?.fatherName}
                  />
                  <DetailRow
                    label="Marital Status"
                    value={creditProfile?.maritalStatus}
                  />
                  <DetailRow
                    label="Nationality"
                    value={creditProfile?.nationality}
                  /> */}
                </ProfileSection>
                <ProfileSection icon={Shield} title="Identity & Contact">
                  <DetailRow
                    label="PAN Card"
                    value={creditProfile?.panCard}
                    highlight
                  />
                  {/* <DetailRow
                    label="Aadhaar"
                    value={creditProfile?.aadhaarCard}
                    masked
                  /> */}
                  {/* <DetailRow label="Email" value={creditProfile?.email} /> */}
                  <DetailRow
                    label="Mobile"
                    value={sessionStorage.getItem("mobile_number")}
                  />
                </ProfileSection>
                <ProfileSection icon={Mail} title="Emails">
                  {creditProfile?.emails?.map((item, idx) => (
                    <DetailRow
                      key={idx}
                      label="Mail"
                      value={item?.email || "_"}
                      highlight={item?.type === "Primary"}
                    />
                  ))}
                </ProfileSection>
                <ProfileSection icon={MapPin} title="Address Details">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {creditProfile?.addresses?.map((address, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-md transition-all"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-semibold text-foreground">
                            Address {idx + 1}
                          </p>

                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              address?.type === "Residence"
                                ? "bg-green-100 text-green-700"
                                : address?.type === "Office"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {address?.type || "Other"}
                          </span>
                        </div>

                        {/* Address */}
                        <p className="text-sm text-foreground leading-relaxed">
                          {address?.streetAddress}
                        </p>

                        {/* Footer */}
                        <div className="mt-3 text-xs text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                          <span>State: {address?.state}</span>
                          <span>Pincode: {address?.pincode}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ProfileSection>
              </div>
            )}
            {/* {activeTab === "address" && (
            <ProfileSection icon={MapPin} title="Address Details">
              <DetailRow label="Address Line 1" value={creditProfile?.addressLine1} />
              <DetailRow label="Address Line 2" value={creditProfile?.addressLine2} />
              <DetailRow label="City" value={creditProfile?.city} />
              <DetailRow label="State" value={creditProfile?.state} />
              <DetailRow label="Pincode" value={creditProfile?.pincode} />
              <DetailRow
                label="Residential Status"
                value={creditProfile?.residentialStatus}
              />
            </ProfileSection>
          )} */}
            {activeTab === "employment" && (
              <div className="space-y-6">
                <ProfileSection icon={Briefcase} title="Current Employment">
                  <DetailRow
                    label="Status"
                    value={creditProfile?.employmentStatus}
                  />
                  <DetailRow
                    label="Salary Mode"
                    value={creditProfile?.salaryMode}
                  />
                  <DetailRow
                    label="Experience"
                    value={
                      creditProfile?.employmentExperience != null
                        ? `${creditProfile.employmentExperience} year${
                            creditProfile.employmentExperience > 1 ? "s" : ""
                          }`
                        : "Not provided"
                    }
                  />
                  <DetailRow
                    label="UAN / PF Number"
                    value={
                      creditProfile?.uanNumber?.trim()
                        ? creditProfile.uanNumber
                        : "Not provided"
                    }
                  />
                  <DetailRow
                    label="Monthly Income"
                    value={creditProfile?.monthlyIncome}
                    highlight
                  />
                </ProfileSection>
                <ProfileSection icon={Briefcase} title="Company Details">
                  <DetailRow
                    label="Current Company"
                    value={creditProfile?.companyName}
                  />
                  <DetailRow
                    label="Current Joining Date"
                    value={creditProfile?.currentJoinDate}
                  />

                  {creditProfile?.previousCompanyJoinDate &&
                    creditProfile?.previousCompanyRelieveDate && (
                      <>
                        <DetailRow
                          label="Previous Company"
                          value={creditProfile?.previousCompany}
                        />
                        <DetailRow
                          label="Previous Joining Date"
                          value={creditProfile?.previousCompanyJoinDate}
                        />
                        <DetailRow
                          label="Previous Relieving Date"
                          value={creditProfile?.previousCompanyRelieveDate}
                        />
                      </>
                    )}
                </ProfileSection>
              </div>
            )}
            {activeTab === "credit" && (
              <div className="space-y-6">
                <ProfileSection icon={CreditCard} title="Credit Score">
                  <DetailRow
                    label="CIBIL Score"
                    value={creditProfile?.cibilScore}
                    highlight
                  />
                  <DetailRow
                    label="Recent Enquiries"
                    value={creditProfile?.last6MonthsEnquiryCount || "0"}
                  />
                  <DetailRow
                    label="Settlements"
                    value={creditProfile?.settlements || "0"}
                  />
                  <DetailRow
                    label="EMI Bounces"
                    value={creditProfile?.emiBounces || '0'}
                  />
                  <DetailRow
                    label="Credit Utilization"
                    value={creditProfile?.creaditCardUtilization || "0"}
                  />
                </ProfileSection>
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
              </div>
            )}
            {/* {activeTab === "emergency" && (
            <ProfileSection icon={AlertCircle} title="Emergency Contact">
              <DetailRow label="Contact Name" value={creditProfile?.emergencyName} />
              <DetailRow label="Relationship" value={creditProfile?.emergencyRelation} />
              <DetailRow label="Phone Number" value={creditProfile?.emergencyContact} />
            </ProfileSection>
          )} */}
            {activeTab === "documents" && (
              <div className="max-w-3xl">
                <div className="flex flex-col gap-6">
                  {document.map((section) => (
                    <div key={section.category}>
                      <div className="flex items-center gap-2 mb-3">
                        <section.icon className="h-4 w-4 text-primary" />
                        <h2 className="text-sm font-semibold text-foreground">
                          {section.category}
                        </h2>
                      </div>
                      <div className="flex flex-col gap-2">
                        {section.docs.map((doc) => (
                          <div
                            key={doc.url}
                            className="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-3 hover:border-primary/40 hover:shadow-sm transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                                <File className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">
                                  {doc.name}
                                </p>
                                <p className="text-[11px] text-muted-foreground">
                                  Uploaded {doc.date}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(doc.url, "_blank");
                              }}
                              className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-lg hover:bg-accent group-hover:opacity-100 opacity-70"
                            >
                              <Download className="h-3.5 w-3.5" />
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
