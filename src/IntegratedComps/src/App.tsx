import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BanksSection from "./components/BanksSection";
import Features from "./components/Features";
import Footer from "./components/Footer";
import CallToActionSection2 from "@/components/CallToActionSection2/CallToActionSection2";
import FeaturesCardsSection from "@/components/FeaturesCardsSection/FeaturesCardsSection";
import GetInTouchSection from "@/components/GetInTouchSection/GetInTouchSection";
import KimiFeaturesSection from "@/components/FeaturesSection/KimiFeaturesSection";
import { useLocation } from "react-router-dom";

function LandingApp() {
  // const [scrollY, setScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => setScrollY(window.scrollY);
  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
    const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* <Navbar scrollY={scrollY} /> */}
      <main>
        <Hero />
        <Features />
        {/* <FeaturesCardsSection /> */}
        <KimiFeaturesSection /> 
        {/* <CallToActionSection2 /> */}
        <BanksSection />
        <GetInTouchSection/>
      </main>
      <Footer />
    </div>
  );
}

export default LandingApp;
