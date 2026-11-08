import React, { useState, useEffect, useRef, useCallback } from "react";
import { onConfirmToExit, offConfirmToExit, closeApp } from "zmp-sdk";
import SplashScreen from "./SplashScreen";

/**
 * TOLUCK - Master Webview Wrapper Component
 * Bridges the CodeIgniter SaaS Website into Zalo Mini App runtime
 * Strict rule: <= 500 lines
 */
export default function WebviewWrapper({
  initialUrl = "https://toluck.vn",
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);

  // Compute target URL with tracking parameter
  const targetUrl = React.useMemo(() => {
    try {
      const url = new URL(initialUrl);
      url.searchParams.set("platform", "zalo_mini_app");
      url.searchParams.set("v", String(Date.now()));
      return url.toString();
    } catch (e) {
      return initialUrl.includes("?")
        ? `${initialUrl}&platform=zalo_mini_app`
        : `${initialUrl}?platform=zalo_mini_app`;
    }
  }, [initialUrl, reloadKey]);

  // Handle iframe load success
  const handleIframeLoad = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Small delay for smooth visual transition
    setTimeout(() => {
      setIsLoading(false);
      setIsError(false);
    }, 400);
  }, []);

  // Handle iframe load error
  const handleIframeError = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLoading(false);
    setIsError(true);
    setErrorMessage(
      "Không thể tải trang web TOLUCK. Vui lòng kiểm tra kết nối mạng hoặc thử lại."
    );
  }, []);

  // Manual retry handler
  const handleRetry = () => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");
    setReloadKey((prev) => prev + 1);
  };

  // Setup timeout safeguard (14 seconds max before offering retry)
  useEffect(() => {
    if (isLoading) {
      timeoutRef.current = setTimeout(() => {
        if (isLoading) {
          setIsLoading(false);
          setIsError(true);
          setErrorMessage(
            "Thời gian tải trang quá lâu do đường truyền mạng chậm. Bạn có thể nhấn Thử lại hoặc gọi hotline hỗ trợ."
          );
        }
      }, 14000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading, reloadKey]);

  // Handle Zalo Native Back button navigation
  useEffect(() => {
    const handleBackPress = () => {
      try {
        const iframeWin = iframeRef.current?.contentWindow;
        if (iframeWin) {
          // Attempt postMessage request to internal website router
          iframeWin.postMessage({ type: "ZMP_BACK_CLICKED" }, "*");
          // Attempt standard browser history back
          iframeWin.history.back();
          return;
        }
      } catch (err) {
        // Cross-origin boundary fallback
      }

      // If cannot go back further, prompt exit or close app
      if (window.confirm("Bạn có muốn thoát khỏi Zalo Mini App TOLUCK?")) {
        closeApp({});
      }
    };

    try {
      onConfirmToExit(handleBackPress);
    } catch (e) {
      // Running outside mobile client (simulator/browser)
    }

    return () => {
      try {
        offConfirmToExit(handleBackPress);
      } catch (e) {}
    };
  }, []);

  // Listen for message events from the website inside iframe
  useEffect(() => {
    const handleWindowMessage = (event) => {
      if (!event.data || typeof event.data !== "object") return;
      const { type, payload } = event.data;

      if (type === "TOLUCK_CALL_PHONE" && payload?.phone) {
        window.location.href = `tel:${payload.phone}`;
      }
      if (type === "TOLUCK_PAGE_LOADED") {
        setIsLoading(false);
        setIsError(false);
      }
    };

    window.addEventListener("message", handleWindowMessage);
    return () => window.removeEventListener("message", handleWindowMessage);
  }, []);

  return (
    <div className="toluck-webview-container">
      {/* Branded Splash Screen Overlay */}
      {isLoading && (
        <SplashScreen
          isError={false}
          onRetry={handleRetry}
        />
      )}

      {/* Error / Offline Screen */}
      {isError && (
        <SplashScreen
          isError={true}
          errorMessage={errorMessage}
          onRetry={handleRetry}
        />
      )}

      {/* Main Full-height Webview Iframe */}
      <iframe
        ref={iframeRef}
        key={reloadKey}
        src={targetUrl}
        title="TOLUCK Website"
        className={`toluck-webview-frame ${isLoading || isError ? "is-hidden" : "is-visible"}`}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        allow="camera; microphone; geolocation; clipboard-read; clipboard-write; autoplay"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads"
      />
    </div>
  );
}
