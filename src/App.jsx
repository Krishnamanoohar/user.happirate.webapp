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
import SignInPopup from "./pages/SignInPage/SignInPopup";
import LoanTrackingDashboard from "./pages/ApplicationStatusPage/LoanTrackingDashboard";
import { HappirateSplitAuth } from "./pages/AuthenticationPageNew/HappirateSplitAuth";
//import Index from "./pages/NewBankApplicationPage/Index";
import LoanApplication from "./pages/NewBankApplicationPage/LoanApplication";
import { NewCompareLoanApplication } from "./pages/NewLoanComparisonPage/NewCompareLoanApplication";
import { LoanEligibilityForm } from "./components/OtherComponents/SmartCompare/LoanEligibilityForm";
import SmartComparePage from "./components/OtherComponents/SmartCompare/SmartComparePage";
import HappirateSplitAuth2 from "./pages/Authentication Page/HappirateSplitAuth";

// import CompareLoanPage from "./pages/CompareLoanPage/CompareLoanPage";
// import CompareLoanPage from "./pages/CompareLoanPage/CompareLoanPage";
import CompareLoanPage from "./pages/CompareLonePage/CompareLonePage";
// import HappirateSplitAuth from "./pages/Authentication Page/HappirateSplitAuth";
import CreditHealthReport from "./components/CreditHealthReport/CreditHealthReport";
import OneScoreDashboard from "./components/Dashboard/Dashboard";
import Emicalculatornew from "./components/Emi Calculator New/Emicalculatenew";
import LandingApp from "./IntegratedComps/src/App";
import Navbar from "./IntegratedComps/src/components/Navbar";
import KimiCreditHealthReport from "./components/CreditHealthReport/KimiCreditHealthReport";
import GeminiCreditHealthReport from "./components/CreditHealthReport/GeminiCreditHealthReport";
export const Context = createContext();

const App = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // fetch("9398469598");
    AOS.init({ duration: 600 });
    AOS.refresh();
    // fetchData();
    // payslip();
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
          <Navbar scrollY={scrollY} />

          <Routes>
            {/* <Route path="/" element={<IndexPage />} /> */}
            <Route path="/" element={<LandingApp />} />
            {/* <Route path="sign-in" element={<LoginPage />} /> */}
            <Route path="sign-in" element={<HappirateSplitAuth />} />
            {/* <Route path="sign-inn" element={<HappirateSplitAuth2 />} /> */}
            {/* <Route path="our-story" element={<AboutUsPage />} /> */}
            {/* <Route path="compare-loans" element={<LoanComparisonPage />} /> */}
            {/* <Route
              path="compare-loans"
              element={<NewCompareLoanApplication />}
            /> */}
            <Route path="compare-loans" element={<SmartComparePage />} />
            {/* <Route path="process" element={<ApplicationPage />} /> */}
            <Route
              path="loan-tracking-dashboard"
              element={<LoanTrackingDashboard />}
            />
            {/* <Route path="emi-calculator" element={<EMICalculatorPage />} /> */}
            <Route path="emi-calculator" element={<Emicalculatornew />} />
            <Route
              path="financial-summary"
              element={<FinancialSummaryPage />}
            />
            <Route path="loan-application" element={<LoanApplication />} />
            <Route path="eligible-loans" element={<CompareLoanPage />} />
            <Route path="signin" element={<HappirateSplitAuth />} />
            <Route path="*" element={<NotFoundPage />} />

            {/* <Route
              path="/credit-health-report"
              element={<OneScoreDashboard />}
            /> */}
            {/* <Route path="/oneboarddashboard" element={<OneScoreDashboard />} /> */}
            <Route path="/credit-health-report" element={<GeminiCreditHealthReport />} />
            <Route path="/credit-health-report-2" element={<OneScoreDashboard />} />
          </Routes>
          {/* <Chatbot /> */}
          <SignInPopup />
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
};

export default App;
