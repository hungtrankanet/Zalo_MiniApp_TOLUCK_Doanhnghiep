import React from "react";
import { PARTNERS_DATA } from "../data/partnersData";
import PartnerLogoMark from "./PartnerLogoMark";

/**
 * PartnersLogoSection Component - Trình Diễn Danh Sách Logo Đối Tác & Khách Hàng
 * Strict rule: <= 500 lines
 */
export default function PartnersLogoSection({ onNavigateTab }) {
  return (
    <section className="section-block partners-logo-section">
      <div className="section-header">
        <span className="section-kicker">TÍN NHIỆM &amp; ĐỒNG HÀNH</span>
        <h2 className="section-heading">Đối Tác &amp; Khách Hàng Tiêu Biểu</h2>
        <p className="section-desc">
          TOLUCK tự hào là phòng marketing và công nghệ tin cậy của hơn 200+ thương hiệu và doanh nghiệp tại Việt Nam &amp; Quốc tế.
        </p>
      </div>

      <div className="partners-logo-grid">
        {PARTNERS_DATA.map((partner) => (
          <div
            key={partner.id}
            className="partner-logo-card"
            onClick={() => {
              if (onNavigateTab) onNavigateTab("community");
            }}
          >
            <div className="partner-logo-top">
              <PartnerLogoMark partner={partner} size={46} />
              <span className="partner-badge-pill">{partner.badge}</span>
            </div>

            <div className="partner-logo-body">
              <h4 className="partner-logo-name">{partner.name}</h4>
              <span className="partner-logo-cat">{partner.category}</span>
              <div className="partner-logo-highlight">
                ★ {partner.highlight}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action banner to navigate to Community Tab */}
      <div className="partners-cta-strip">
        <div className="partners-cta-info">
          <div className="partners-cta-title">Gia Nhập Mạng Lưới Doanh Nghiệp TOLUCK</div>
          <p className="partners-cta-desc">Kết nối giao thương B2B chéo và nhận ưu đãi giải pháp độc quyền.</p>
        </div>
        <button
          type="button"
          className="btn-community-join"
          onClick={() => {
            if (onNavigateTab) onNavigateTab("community");
          }}
        >
          <span>Khám Phá Cộng Đồng ➔</span>
        </button>
      </div>
    </section>
  );
}
