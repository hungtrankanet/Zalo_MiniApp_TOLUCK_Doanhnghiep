import React from "react";
import { CONTACT_INFO } from "../config/api";

/**
 * HeaderHero Component - Lumina Vision 2026
 * Strict rule: <= 500 lines
 */
export default function HeaderHero({ onConsultClick }) {
  return (
    <header className="hero-section">
      {/* Top Brand Bar */}
      <div className="top-brand-bar">
        <div className="brand-logo-wrap">
          <img
            src="./logo.png"
            alt="TOLUCK Logo"
            className="brand-logo-img"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div>
            <span className="brand-badge">TOLUCK SAAS 2026</span>
            <div className="brand-sub">Phòng Marketing & Công Nghệ SME</div>
          </div>
        </div>
        <div className="status-indicator">
          <span className="pulse-dot"></span>
          <span>Balancing &gt;10K CCU</span>
        </div>
      </div>

      {/* Hero Visual Card */}
      <div className="hero-banner-card">
        <div className="hero-pill">
          <span>🌿 Gieo May Mắn • Xây Bản Sắc • Bứt Phá Doanh Thu</span>
        </div>
        <h1 className="hero-headline">
          Phòng Marketing Thuê Ngoài &amp; Nền Tảng Số Hóa Toàn Diện
        </h1>
        <p className="hero-subtext">
          Tổ hợp giải pháp đồng hành kết hợp giữa <strong>Nhận diện thương hiệu</strong>,{" "}
          <strong>Website chịu tải &gt;10.000 CCU</strong> và <strong>Tự động hóa n8n &amp; CRM SAAS</strong>.
        </p>

        {/* Quick Action CTAs */}
        <div className="hero-cta-group">
          <button
            type="button"
            className="btn-primary-hero"
            onClick={onConsultClick}
          >
            🚀 Đăng Ký Tư Vấn 1:1
          </button>
          <a
            href={`tel:${CONTACT_INFO.hotline}`}
            className="btn-secondary-hero"
          >
            📞 Hotline: {CONTACT_INFO.hotlineDisplay}
          </a>
        </div>
      </div>

      {/* Trust Strip (Thống kê tin cậy) */}
      <div className="trust-strip">
        <div className="trust-item">
          <div className="trust-number color-emerald">12+ Năm</div>
          <div className="trust-label">Kinh Nghiệm</div>
        </div>
        <div className="trust-item">
          <div className="trust-number color-blue">250K+</div>
          <div className="trust-label">Người Dùng</div>
        </div>
        <div className="trust-item">
          <div className="trust-number color-emerald">1,548+</div>
          <div className="trust-label">Giải Đấu &amp; CLB</div>
        </div>
        <div className="trust-item">
          <div className="trust-number color-blue">&gt;10K CCU</div>
          <div className="trust-label">Chịu Tải Cao</div>
        </div>
      </div>
    </header>
  );
}
