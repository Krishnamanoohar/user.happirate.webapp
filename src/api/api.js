import axios from "axios";
const baseUrl = "http://localhost:3000/api";
// const baseUrl = "https://m3pmjfgx-3000.inc1.devtunnels.ms";

const checkLoanEligibility = async (payload) => {
  const resp = await axios.post(
    `${baseUrl}/customer/preliminary-credit-assesment`,
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
    `${baseUrl}/customer/send-otp-to-mobile`,
    payload,
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  console.log(resp, "resp");

  return resp;
};

const verifyOtpApi = async (payload) => {
  const resp = await axios.post(`${baseUrl}/customer/validate-otp`, payload, {
    headers: { "Content-Type": "application/json" },
  });

  console.log(resp, "resp");

  return resp;
};

const personalDetailsVerification = async (payload) => {
  const resp = await axios.post(
    `${baseUrl}/customer/submit-personal-details`,
    payload,
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  console.log(resp, "resp");
  return resp;
}

const submitFinancialProfileDetails = async (payload) => {
  const resp = await axios.post(
    `${baseUrl}/customer/financial-profile-details`,
    payload,
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  console.log(resp, "resp");

  return resp;
};

export default { checkLoanEligibility, loginWithPhone, logout };
