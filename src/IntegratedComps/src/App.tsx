import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BanksSection from "./components/BanksSection";
import EMICalculator from "./components/EMICalculator";
import Features from "./components/Features";
import Footer from "./components/Footer";
import CallToActionSection2 from "@/components/CallToActionSection2/CallToActionSection2";
import FeaturesCardsSection from "@/components/FeaturesCardsSection/FeaturesCardsSection";
import GetInTouchSection from "@/components/GetInTouchSection/GetInTouchSection";
import KimiFeaturesSection from "@/components/FeaturesSection/KimiFeaturesSection";

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
        <Features />
        {/* <FeaturesCardsSection /> */}
        <KimiFeaturesSection /> 
        {/* <CallToActionSection2 /> */}
        {/* <EMICalculator /> */}
        <BanksSection />
      </main>
      <Footer />
    </div>
  );
}

export default LandingApp;
