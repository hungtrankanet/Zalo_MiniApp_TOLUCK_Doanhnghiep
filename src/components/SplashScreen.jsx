import React from "react";

/**
 * TOLUCK - Branded Splash Screen Component
 * UX: Modern emerald glow, animated logo mark, tagline, error fallback & retry
 * Strict rule: <= 500 lines
 */
export default function SplashScreen({
  isError = false,
  errorMessage = "",
  onRetry,
}) {
  return (
    <div className="toluck-splash-overlay">
      <div className="toluck-splash-content">
        {/* Animated Brand Logo Mark */}
        <div className="toluck-splash-logo-wrap">
          <div className="toluck-splash-glow"></div>
          <svg
            className="toluck-splash-logo"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Hexagon / Shield */}
            <path
              d="M50 8L88 28V72L50 92L12 72V28L50 8Z"
              stroke="#18A558"
              strokeWidth="5"
              strokeLinejoin="round"
              className="toluck-hex-path"
            />
            {/* Intersecting Growth Wings / Diamond */}
            <path
              d="M50 24L72 50L50 76L28 50L50 24Z"
              fill="url(#emeraldGrad)"
              className="toluck-diamond-fill"
            />
            {/* Center Core Dot */}
            <circle cx="50" cy="50" r="7" fill="#ffffff" />
            <defs>
              <linearGradient
                id="emeraldGrad"
                x1="28"
                y1="24"
                x2="72"
                y2="76"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#18A558" />
                <stop offset="1" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand Name & Tagline */}
        <div className="toluck-splash-brand">
          <h1 className="toluck-splash-title">TOLUCK</h1>
          <span className="toluck-splash-badge">
            Technology × Marketing × Growth
          </span>
          <p className="toluck-splash-slogan">
            Công nghệ tạo nền tảng. Marketing tạo tăng trưởng.
          </p>
        </div>

        {/* Normal Loading State */}
        {!isError && (
          <div className="toluck-splash-loader">
            <div className="toluck-loading-bar">
              <div className="toluck-loading-progress"></div>
            </div>
            <span className="toluck-loading-text">
              Đang kết nối hệ thống TOLUCK...
            </span>
          </div>
        )}

        {/* Error / Offline State */}
        {isError && (
          <div className="toluck-splash-error-box">
            <p className="toluck-splash-error-text">
              {errorMessage ||
                "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối mạng internet."}
            </p>
            <div className="toluck-splash-actions">
              <button
                type="button"
                className="toluck-btn-retry"
                onClick={onRetry}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <polyline points="1 20 1 14 7 14"></polyline>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
                <span>Thử lại ngay</span>
              </button>
              <a href="tel:0963484365" className="toluck-btn-hotline">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>Hotline: 0963 484 365</span>
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="toluck-splash-footer">
        <span>Bản quyền © {new Date().getFullYear()} TOLUCK SAAS</span>
      </div>
    </div>
  );
}
