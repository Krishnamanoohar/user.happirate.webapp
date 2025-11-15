import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import HeroSection from "../../components/HeroSection/HeroSection";
import AboutSection from "../../components/AboutSection/AboutSection";
import FeaturesSection from "../../components/FeaturesSection/FeaturesSection";
import FeaturesCardsSection from "../../components/FeaturesCardsSection/FeaturesCardsSection";
import Features2Section from "../../components/Features2Section/Features2Section";
import CallToActionSection from "../../components/CallToActionSection/CallToActionSection";
import ClientsSection from "../../components/ClientsSection/ClientsSection";
import StatsSection from "../../components/StatsSection/StatsSection";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import TestimonialsSection from "../../components/TestimonialsSection/TestimonialsSection";
import FooterSection from "../../components/FooterSection/FooterSection";
import FaqSection from "../../components/FaqSection/FaqSection";
import PricingSection from "../../components/PricingSection/PricingSection";
import CallToActionSection2 from "../../components/CallToActionSection2/CallToActionSection2";
import ContactSection from "../../components/ContactSection/ContactSection";
import styles from "./IndexPageStyles.module.css";
import axios from "axios";
import BottomScroller from "../../components/BottomScroller/BottomScroller";
import CurvedLoop from "../../ReactBitsComps/CurvedLoop/CurvedLoop";
import { Smile } from "lucide-react";
import GetInTouchSection from "../../components/GetInTouchSection/GetInTouchSection";
import FeaturesSection2 from "../../components/FeaturesSection/FeaturesSection2";
import SignInPopup from "../SignInPage/SignInPopup";

const IndexPage = () => {
  
  const fetch = async () => {
    try {
      const resp = await axios.get(
        "https://api.api-ninjas.com/v1/interestrate?country=United Kingdom",
        {
          headers: {
            "X-Api-Key": "Pbe9EWzO6ueJ2lK4H7fETA==pyB2o2InlLZFeMos",
          },
        }
      );
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className={styles.indexPage}>
      <HeroSection />
      {/* <BottomScroller /> */}
      {/* <div className="border-y-2">
        <CurvedLoop
          marqueeText="Any Loan ☻ Any Bank ☻ Tailored For You ☻ "
          // marqueeText={<Smile />}
          speed={3}
          curveAmount={0}
          direction="right"
          interactive={true}
          className="custom-text-style"
        />
      </div> */}
      <FeaturesSection2 />
      <FeaturesCardsSection />
      {/* <Features2Section /> */}
      {/* <ServicesSection /> */}
      {/* <AboutSection /> */}
      <CallToActionSection />
      <ClientsSection />
      {/* <TestimonialsSection /> */}
      {/* <StatsSection /> */}
      {/* <PricingSection /> */}
      <FaqSection />
      <CallToActionSection2 />
      <GetInTouchSection />
      <FooterSection />

      {/* Popups */}
      <SignInPopup />
    </div>
  );
};

export default IndexPage;
