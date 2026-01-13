import axios from "axios";
const baseUrl = "";

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

export default { checkLoanEligibility };
