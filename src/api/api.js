import axios from "axios";
const baseUrl = "";
const logout = (refreshToken) =>
  api.post("/api/auth/logout", { refreshToken });

const checkLoanEligibility = async (payload) => {
  const resp = await axios.post(
    "https://m3pmjfgx-3000.inc1.devtunnels.ms/customer/credit-assesment",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  console.log(resp, "resp");

  return resp;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const loginWithPhone = (idToken) => {
  console.log("3333333333333333333333", idToken)
  return api.post("/api/auth/phone", { idToken });
};

export default { checkLoanEligibility, loginWithPhone, logout };
