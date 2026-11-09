import React from "react";
import { PARTNERS_DATA } from "../data/partnersData";
import PartnerLogoMark from "./PartnerLogoMark";

/**
 * PartnerMarqueeSection Component - Logo Đối Tác & Khách Hàng Nằm Ngang Slide Qua 2 Dòng
 * Đặt ngay dưới Hero Banner theo yêu cầu UI/UX Pro
 * Strict rule: <= 500 lines
 */
export default function PartnerMarqueeSection({ onNavigateTab }) {
  // Chia 10 đối tác thành 2 nhóm, mỗi nhóm nhân đôi để tạo vòng lặp vô tận (Infinite Loop)
  const row1 = PARTNERS_DATA.slice(0, 5);
  const row2 = PARTNERS_DATA.slice(5, 10);

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
