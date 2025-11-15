import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.post(
      "https://api-prod.tartanhq.com/aphrodite/api/tp/v1/verification",
      {
        username: "Sandbox_RealVariable",
        password: "Sandbox@1234",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "meLYZlnaaU6pSlOjhsAUeJ56Q1ZNze45WoNpWtei",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error, "error");
  }
};

export { fetchData };
