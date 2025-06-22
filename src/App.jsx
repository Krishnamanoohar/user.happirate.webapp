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

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 600 });
    AOS.refresh(); // to detect newly rendered elements
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
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
