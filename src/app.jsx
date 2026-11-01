import React, { useState, useRef } from "react";
import HeaderHero from "./components/HeaderHero";
import ServicesSection from "./components/ServicesSection";
import CaseStudiesSection from "./components/CaseStudiesSection";
import NewsSection from "./components/NewsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

/**
 * TOLUCK Zalo Mini App - Master Application Container
 * Lumina Vision 2026 Theme
 * Strict rule: <= 500 lines
 */
export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedService, setSelectedService] = useState("");
  const formRef = useRef(null);

  const handleConsultClick = () => {
    setActiveTab("contact");
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleSelectService = (serviceName) => {
    setSelectedService(serviceName);
    setActiveTab("contact");
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="mini-app-container">
      {/* Header and Hero Banner */}
      <HeaderHero onConsultClick={handleConsultClick} />

      {/* Main Content Area: Show Tab or Full Feed */}
      <main className="app-main-content">
        {activeTab === "home" && (
          <>
            <ServicesSection onSelectService={handleSelectService} />
            <CaseStudiesSection />
            <NewsSection />
            <ContactSection
              selectedService={selectedService}
              formRef={formRef}
            />
          </>
        )}

        {activeTab === "services" && (
          <ServicesSection onSelectService={handleSelectService} />
        )}

        {activeTab === "cases" && <CaseStudiesSection />}

        {activeTab === "news" && <NewsSection />}

        {activeTab === "contact" && (
          <ContactSection
            selectedService={selectedService}
            formRef={formRef}
          />
        )}
      </main>

      {/* Footer and Bottom Nav */}
      <Footer activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
