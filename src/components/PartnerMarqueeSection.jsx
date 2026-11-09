import React, { useState, useEffect } from "react";
import { PARTNERS_DATA } from "../data/partnersData";
import { fetchPartnerLogos } from "../config/api";
import PartnerLogoMark from "./PartnerLogoMark";

/**
 * PartnerMarqueeSection Component - Logo Đối Tác & Khách Hàng Nằm Ngang Slide Qua 2 Dòng
 * Đồng bộ với Backend API partner_logos & vector marks
 * Strict rule: <= 500 lines
 */
export default function PartnerMarqueeSection({ onNavigateTab }) {
  const [partners, setPartners] = useState(PARTNERS_DATA);

  useEffect(() => {
    let isMounted = true;
    fetchPartnerLogos().then((backendLogos) => {
      if (!isMounted || !Array.isArray(backendLogos) || backendLogos.length === 0) return;

      const normalized = backendLogos.map((item) => ({
        ...item,
        id: item.id || `p-${Math.random()}`,
        name: item.name || item.title || "Đối Tác",
        shortName: item.short_name || item.shortName || item.title || item.name,
        category: item.category || "Đối Tác & Khách Hàng",
        type: item.type || "client",
        typeLabel: item.type_label || item.typeLabel || "Khách Hàng Doanh Nghiệp",
        image_url: item.image_url,
        isPortalClient: !!(item.is_portal || item.isPortalClient),
        portalUrl: item.portal_url || item.portalUrl,
        logoColor: item.logo_color || item.logoColor || "#059669",
        accentBg: item.accentBg || "rgba(5, 150, 105, 0.08)",
        highlight: item.highlight || "Thương Hiệu Đồng Hành",
        desc: item.desc || "Đối tác đồng hành cùng TOLUCK.",
        collaboration: item.collaboration || "Hợp tác phát triển giải pháp.",
        year: item.year || "2024 - 2026",
      }));

      setPartners(normalized);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const mid = Math.ceil(partners.length / 2);
  const row1 = partners.slice(0, mid);
  const row2 = partners.slice(mid);

  const row1Loop = [...row1, ...row1];
  const row2Loop = [...row2, ...row2];

  return (
    <section className="partner-marquee-section">
      <div className="marquee-header-wrap">
        <span className="marquee-kicker">ĐỐI TÁC &amp; KHÁCH HÀNG</span>
        <h3 className="marquee-title">Đồng Hành Cùng 200+ Thương Hiệu Dẫn Đầu</h3>
      </div>

      <div className="marquee-container">
        {/* Gradient Fade Edges */}
        <div className="marquee-fade marquee-fade-left" />
        <div className="marquee-fade marquee-fade-right" />

        {/* Dòng 1: Trượt sang trái */}
        <div className="marquee-track-wrapper">
          <div className="marquee-track marquee-slide-left">
            {row1Loop.map((partner, idx) => (
              <div
                key={`r1-${partner.id}-${idx}`}
                className="marquee-item-card"
                onClick={() => {
                  if (onNavigateTab) onNavigateTab("community");
                }}
              >
                <PartnerLogoMark partner={partner} size={36} />
                <div className="marquee-item-info">
                  <span className="marquee-item-name">{partner.shortName || partner.name}</span>
                  <span className="marquee-item-cat">{partner.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dòng 2: Trượt sang phải */}
        <div className="marquee-track-wrapper mt-2">
          <div className="marquee-track marquee-slide-right">
            {row2Loop.map((partner, idx) => (
              <div
                key={`r2-${partner.id}-${idx}`}
                className="marquee-item-card"
                onClick={() => {
                  if (onNavigateTab) onNavigateTab("community");
                }}
              >
                <PartnerLogoMark partner={partner} size={36} />
                <div className="marquee-item-info">
                  <span className="marquee-item-name">{partner.shortName || partner.name}</span>
                  <span className="marquee-item-cat">{partner.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
