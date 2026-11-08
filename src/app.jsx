import React, { useEffect } from "react";
import { setNavigationBarTitle, setNavigationBarColor } from "zmp-sdk";
import WebviewWrapper from "./components/WebviewWrapper";

/**
 * TOLUCK Zalo Mini App - Master Application Container
 * Webview Wrapper Architecture
 * Strict rule: <= 500 lines
 */
export default function App() {
  const targetUrl = import.meta.env.VITE_TARGET_URL || "https://toluck.vn";

  useEffect(() => {
    try {
      setNavigationBarTitle({
        title: "TOLUCK",
      });
      setNavigationBarColor({
        color: "#071B15",
        textColor: "white",
      });
    } catch (e) {
      // Simulator or web browser fallback
    }
  }, []);

  return (
    <div className="mini-app-container">
      <WebviewWrapper initialUrl={targetUrl} />
    </div>
  );
}
