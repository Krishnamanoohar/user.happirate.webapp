import React from "react";
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

const IndexPage = () => {
  return (
    <div className="index-page">
      <Header />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      {/* <FeaturesCardsSection /> */}
      {/* <Features2Section /> */}
      <CallToActionSection />
      {/* <ClientsSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <StatsSection /> */}
      {/* <ServicesSection /> */}
      {/* <PricingSection /> */}
      {/* <FaqSection /> */}
      {/* <CallToActionSection2 /> */}
      {/* <ContactSection /> */}
      <FooterSection />
    </div>
  );
};

export default IndexPage;
