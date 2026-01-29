import axios from "axios";
const baseUrl = "https://m3pmjfgx-3000.inc1.devtunnels.ms/api/customer";

const apiClient = axios.create({
  baseUrl: baseUrl,
  headers: { "Content-Type": "application/json" },
});

const checkLoanEligibility = async (payload) => {
  const resp = await apiClient.post("/preliminary-credit-assesment", payload);

  console.log(resp, "resp");
  return resp;
};

const sendOtpToMobile = async (mobile) => {
  const resp = axios.post(`${baseUrl}/send-otp-to-mobile`, {
    mobileNumber: mobile,
  });
  // const resp = await apiClient.post("/send-otp-to-mobile", { mobile: payload });

  console.log(resp, "resp");
  return resp;
};

const verifyOtpApi = async (payload) => {
  const resp = await apiClient.post(
    " https://m3pmjfgx-3000.inc1.devtunnels.ms/customer/send-otp-to-mobile",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  console.log(resp, "resp");
  return resp;
};

const fetchCreditReport = async (payload) => {};

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

export {
  checkLoanEligibility,
  personalDetailsVerification,
  submitFinancialProfileDetails,
  sendOtpToMobile,
  verifyOtpApi,
};
