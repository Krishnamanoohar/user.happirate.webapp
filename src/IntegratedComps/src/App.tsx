import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BanksSection from "./components/BanksSection";
import EMICalculator from "./components/EMICalculator";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Scrolling from "./components/Scrolling";
import ContactSection from "@/components/ContactSection/ContactSection";



function LandingApp() {
  // const [scrollY, setScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => setScrollY(window.scrollY);
  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* <Navbar scrollY={scrollY} /> */}
      <main>
        <Hero />
        <Scrolling />
        <Features />
        <EMICalculator />
        <BanksSection />
        {/* <ContactSection /> */}
      </main>
      <Footer />
    </div>
  );
}

export default LandingApp;
