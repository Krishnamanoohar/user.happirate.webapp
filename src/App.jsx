import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import IndexPage from "./pages/IndexPage/IndexPage";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Header from "./components/Header/Header";
import LoanComparisonPage from "./pages/LoanComparisonPage/LoanComparisonPage";
import ApplicationPage from "./pages/ApplicationStatusPage/ApplicationPage";
import FinancialSummaryPage from "./pages/FinancialSummaruPage/FinancialSummaryPage";
import Chatbot from "./components/ChatbotComponent/Chatbot";
import BankApplicationPage from "./pages/BankApplicationPage/BankApplicationPage";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 600 });
    AOS.refresh();
  }, []);

  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="signIn" element={<LoginPage />} />
          <Route path="compare-loans" element={<LoanComparisonPage />} />
          <Route path="process" element={<ApplicationPage />} />
          <Route path="financial-summary" element={<FinancialSummaryPage />} />
          <Route path="loan-application" element={<BankApplicationPage />} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </div>
  );
};

export default App;
