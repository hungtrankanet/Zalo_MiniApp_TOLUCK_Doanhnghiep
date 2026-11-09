import React, { useState } from "react";

/**
 * PartnerLogoMark Component - Brand Marks cho Đối Tác & Khách Hàng (Hỗ trợ Ảnh Backend & Vector)
 * Strict rule: <= 500 lines
 */
export default function PartnerLogoMark({ partner, size = 44 }) {
  const [imgFailed, setImgFailed] = useState(false);
  const {
    id,
    shortName,
    name,
    title,
    logoColor = "#059669",
    accentBg = "rgba(5, 150, 105, 0.08)",
    image_url,
    imageUrl,
  } = partner || {};

  const imgSrc = image_url || imageUrl;

  const renderIcon = () => {
    switch (id) {
      case "vsports":
        return (
          <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke={logoColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20M2 12h20" />
            <path d="M12 2c3.5 3 5 7 5 10s-1.5 7-5 10" />
          </svg>
        );
      case "suntrans":
        return (
          <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke={logoColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
        );
      case "wservice":
        return (
          <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke={logoColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
            <circle cx="7" cy="15" r="1.5" />
          </svg>
        );
      case "kinggold":
        return (
          <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke={logoColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      case "anna":
        return (
          <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke={logoColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="12" r="4" />
            <circle cx="18" cy="12" r="4" />
            <line x1="10" y1="12" x2="14" y2="12" />
          </svg>
        );
      case "wlin":
      case "bsin":
        return (
          <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke={logoColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        );
      case "tuibao":
        return (
          <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke={logoColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        );
      case "kantek":
        return (
          <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke={logoColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke={logoColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <polyline points="9 11 12 14 15 11" />
          </svg>
        );
    }
  };

  return (
    <div
      className="partner-logo-mark"
      style={{
        width: size,
        height: size,
        backgroundColor: accentBg || "#f1f5f9",
        border: `1.5px solid ${logoColor}25`,
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 2px 6px rgba(15, 23, 42, 0.04)",
        overflow: "hidden",
      }}
    >
      {imgSrc && !imgFailed ? (
        <img
          src={imgSrc}
          alt={name || title || shortName || "Logo"}
          style={{ width: "85%", height: "85%", objectFit: "contain" }}
          onError={() => setImgFailed(true)}
          loading="lazy"
        />
      ) : (
        renderIcon()
      )}
    </div>
  );
}
