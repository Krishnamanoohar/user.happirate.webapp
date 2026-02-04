import axios from "axios";
const localUrl = "https://m3pmjfgx-3000.inc1.devtunnels.ms/api/customer";

const apiClient = axios.create({
  baseURL: localUrl,
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

const fetchEligibleLoanProducts = async () => {
  const mobile = sessionStorage.getItem("mobile_number")
  const resp = await apiClient.post("/provisional-credit-assesment", {
    mobileNumber: mobile
  })
  return resp
}

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
    const mobile = sessionStorage.getItem("mobile_number")
    const resp = await axios.post(`${localUrl}/fetch-credit-health`, { mobileNumber: mobile })
    return resp
  } catch (error) {
    console.log("Error in fetching user raw response", error)
  }
}

const fetchChatResponse = async ({ contextData, message }) => {
  try {
    const userId = sessionStorage.getItem("userId")
    const resp = await apiClient.post("/chat-handler", { userId, message, contextData })
    console.log("Response of chat", resp)
    return resp?.data?.reply
  } catch (error) {
    console.log("Error in handling chat", error)
  }
}

export {
  checkLoanEligibility, personalDetailsVerification,
  submitFinancialProfileDetails,
  sendOtpToMobile,
  verifyOtp,
  fetchCreditReport,
  updateCreditReport,
  fetchEligibleLoanProducts,
  fetchRawResponseOfUser,
  fetchChatResponse
};
