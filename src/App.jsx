import React, { createContext, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import IndexPage from "./pages/IndexPage/IndexPage";
import "./App.css";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Header from "./components/Header/Header";
import LoanComparisonPage from "./pages/LoanComparisonPage/LoanComparisonPage";
import ApplicationPage from "./pages/ApplicationStatusPage/ApplicationPage";
import FinancialSummaryPage from "./pages/FinancialSummaruPage/FinancialSummaryPage";
import Chatbot from "./components/ChatbotComponent/Chatbot";
import BankApplicationPage from "./pages/BankApplicationPage/BankApplicationPage";
import AboutSection from "./components/AboutSection/AboutSection";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import EMICalculatorPage from "./pages/EMICalculatorPage/EMICalculatorPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import axios from "axios";
export const Context = createContext();


const App = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://api-prod.tartanhq.com/aphrodite/api/auth/v1/login",
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
      const token = response.data.token;
      sessionStorage.setItem("token", token);
      console.log(token, "token");
      console.log(response.data, "response");
      return response;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const payslip = async () => {
    try {
      //const token = sessionStorage.getItem("token");
      const res = await axios.post(
        "https://api-ext-prod.tartanhq.com/aphrodite/external/v1/intelligent-ocr",

        {
          name: "tarran",
          phoneNumber: "XXXXXXXX",
          email: "Test@tartanhq.com",
          companyName: "APARAJITHA CORPORATE SERVICES PRIVATE LIMITED",
          applicationId: "SidiDevTest",
          mode: "PROD",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "meLYZlnaaU6pSlOjhsAUeJ56Q1ZNze45WoNpWtei",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log(res, "res payslip");
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    AOS.init({ duration: 600 });
    AOS.refresh();
    fetchData();
    payslip();
  }, []);

  return (
    <div className="app-container">
      <Context.Provider
        value={{
          isUserAuthenticated,
          setIsUserAuthenticated,
          showSignInPopup,
          setShowSignInPopup,
        }}
      >
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="sign-in" element={<LoginPage />} />
            {/* <Route path="our-story" element={<AboutUsPage />} /> */}
            <Route path="compare-loans" element={<LoanComparisonPage />} />
            <Route path="process" element={<ApplicationPage />} />
            <Route path="emi-calculator" element={<EMICalculatorPage />} />
            <Route
              path="financial-summary"
              element={<FinancialSummaryPage />}
            />
            <Route path="loan-application" element={<BankApplicationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
};

export default App;
