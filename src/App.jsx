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

export const Context = createContext();

const App = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600 });
    AOS.refresh();
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
            <Route path="*" element={<NotFoundPage />}/>
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
};

export default App;
