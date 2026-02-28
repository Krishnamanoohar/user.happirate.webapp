import axios from "axios";

// const API_URL = "https://node-happirate-server.vercel.app/api/customer"
const API_URL = "https://m3pmjfgx-3000.inc1.devtunnels.ms/api/customer";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

const checkLoanEligibility = async (payload) => {
  const resp = await apiClient.post("/preliminary-credit-assesment", payload);

  console.log(resp, "resp");
  return resp;
};

const sendOtpToMobile = async (mobile) => {
  const resp = await apiClient.post("/send-otp-to-mobile", {
    mobileNumber: mobile,
  });

  console.log(resp, "resp");
  return resp;
};

const verifyOtp = async (payload) => {
  const resp = await apiClient.post("/validate-otp", payload);
  console.log(resp, "resp");
  return resp;
};

const fetchCreditReport = async (payload) => {
  const resp = await apiClient.post("/fetch-credit-report", payload);

  console.log("Response for credit report", resp);
  return resp;
};
const updateCreditReport = async (payload) => {
  const resp = await apiClient.post("/update-credit-report", payload);
  console.log("Response for credit report", resp);
  return resp;
};

const uploadFinancialDocuments = async (formData) => {
  const resp = await apiClient.post("/docs/upload-batch", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("Response for document upload", resp);
  return resp;
};

const fetchUserFinDocuments = async (userId) => {
  const resp = await apiClient.get(`/docs/${userId}`);
  console.log("fetchUserFinDocuments response", resp);
  return resp;
};

// const fetchEligibleLoanProducts = async () => {
//   const mobile = sessionStorage.getItem("mobile_number")
//   const resp = await apiClient.post("/provisional-credit-assesment", {
//     mobileNumber: mobile
//   })
//   return resp
// }

const fetchEligibleLoanProducts = async (
  requestedLoanAmount,
  requestedLoanTenure,
) => {
  const mobile = sessionStorage.getItem("mobile_number");

  const resp = await apiClient.post("/provisional-credit-assesment", {
    mobileNumber: mobile,
    requestedLoanAmount,
    requestedLoanTenure,
  });

  return resp;
};

const personalDetailsVerification = async (payload) => {
  const resp = await apiClient.post("/submit-personal-details", payload);

  console.log(resp, "resp");
  return resp;
};

const submitFinancialProfileDetails = async (payload) => {
  const resp = await apiClient.post("/financial-profile-details", payload);

  console.log(resp, "resp");
  return resp;
};

const fetchRawResponseOfUser = async () => {
  try {
    const mobile = sessionStorage.getItem("mobile_number");
    const resp = await apiClient.post("/fetch-credit-health", {
      mobileNumber: mobile,
    });
    return resp;
  } catch (error) {
    console.log("Error in fetching user raw response", error);
  }
};

const fetchChatResponse = async ({ contextData, message }) => {
  try {
    const userId = sessionStorage.getItem("userId");
    const resp = await apiClient.post("/chat-handler", {
      userId,
      message,
      contextData,
    });
    console.log("Response of chat", resp);
    return resp?.data?.reply;
  } catch (error) {
    console.log("Error in handling chat", error);
  }
};
const fetchTaxDocuments = async (payload) => {
  const resp = await apiClient.post("/fetch-tax-documents", payload);
  console.log("Tax document response", resp);
  return resp;
};

export {
  checkLoanEligibility,
  personalDetailsVerification,
  submitFinancialProfileDetails,
  sendOtpToMobile,
  verifyOtp,
  fetchCreditReport,
  updateCreditReport,
  fetchEligibleLoanProducts,
  fetchRawResponseOfUser,
  fetchChatResponse,
  fetchTaxDocuments,
  uploadFinancialDocuments,
  fetchUserFinDocuments
};
