import axios from "axios";

const loanEligibilityPost = async (payload) => {
  const resp = await axios.post(
    " https://m3pmjfgx-3000.inc1.devtunnels.ms/customer/credit-assesment",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  console.log(resp.data);

  return resp.data;
};

export default { loanEligibilityPost };
