import axios from "axios";
const baseUrl = "";

const checkLoanEligibility = async (payload) => {
  const resp = await axios.post(
    "https://m3pmjfgx-3000.inc1.devtunnels.ms/customer/preliminary-credit-assesment",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  console.log(resp, "resp");

  return resp;
};

const sendOtpToMobile = async (payload) => {
  const resp = await axios.post(
    "https://m3pmjfgx-3000.inc1.devtunnels.ms/customer/send-otp-to-mobile",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  console.log(resp, "resp");

  return resp;
};
const verifyOtpApi = async (payload) => {
  const resp = await axios.post(
    "https://m3pmjfgx-3000.inc1.devtunnels.ms/customer/validate-otp",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  console.log(resp, "resp");

  return resp;
};
const personalDetailsVerification = async (payload) => {
  const resp = await axios.post(
    "https://m3pmjfgx-3000.inc1.devtunnels.ms/customer/submit-personal-details",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  console.log(resp, "resp");
  return resp;
};
const submitFinancialProfileDetails = async (payload) => {
  const resp = await axios.post(
    "https://m3pmjfgx-3000.inc1.devtunnels.ms/customer/financial-profile-details",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  console.log(resp, "resp");

  return resp;
};

export {
  checkLoanEligibility,
  sendOtpToMobile,
  verifyOtpApi,
  personalDetailsVerification,
  submitFinancialProfileDetails,
};
