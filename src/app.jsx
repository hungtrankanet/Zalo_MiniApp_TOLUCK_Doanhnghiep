import React, { useState, useEffect } from "react";
import {
  setNavigationBarTitle,
  setNavigationBarColor,
  onConfirmToExit,
  offConfirmToExit,
  closeApp,
} from "zmp-sdk";

import HomeTab from "./components/HomeTab";
import PricingTab from "./components/PricingTab";
import QuotePortalTab from "./components/QuotePortalTab";
import ContactTab from "./components/ContactTab";
import BottomNavBar from "./components/BottomNavBar";

/**
 * TOLUCK Zalo Mini App - Master Native App Container (100% Native React UI)
 * Strict rule: <= 500 lines
 */
export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [preselectedService, setPreselectedService] = useState(null);
  const [attachedQuoteData, setAttachedQuoteData] = useState(null);

  // Configure Zalo Native Navigation Bar on mount
  useEffect(() => {
    try {
      setNavigationBarTitle({
        title: "TOLUCK - Marketing & Công Nghệ",
      });
      setNavigationBarColor({
        color: "#071B15",
        textColor: "white",
      });
    } catch (e) {
      // Simulator fallback
    }
  }, []);

  // Handle native back button behavior
  useEffect(() => {
    const handleBack = () => {
      if (activeTab !== "home") {
        setActiveTab("home");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        try {
          closeApp();
        } catch (e) {}
      }
    };

    try {
      onConfirmToExit(handleBack);
    } catch (e) {}

    return () => {
      try {
        offConfirmToExit(handleBack);
      } catch (e) {}
    };
  }, [activeTab]);

  // Tab navigation with scroll to top
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // When user selects a service from PricingTab to quote
  const handleSelectServiceForQuote = (service) => {
    setPreselectedService(service);
    setActiveTab("quote");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // When user finishes Step 3 in QuotePortalTab and proceeds to contact
  const handleProceedToContact = (quoteData) => {
    setAttachedQuoteData(quoteData);
    setActiveTab("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mini-app-layout">
      {/* Main Tab Content View */}
      <main className="tab-viewport">
        {activeTab === "home" && (
          <HomeTab onNavigateTab={handleTabChange} />
        )}

        {activeTab === "services" && (
          <PricingTab onSelectForQuote={handleSelectServiceForQuote} />
        )}

        {activeTab === "quote" && (
          <QuotePortalTab
            preselectedService={preselectedService}
            onProceedToContact={handleProceedToContact}
          />
        )}

        {activeTab === "contact" && (
          <ContactTab
            quoteData={attachedQuoteData}
            onResetQuote={() => setAttachedQuoteData(null)}
          />
        )}
      </main>

      {/* Persistent Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
}
