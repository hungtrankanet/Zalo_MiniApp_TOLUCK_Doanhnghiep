import React from "react";
import { CONTACT_INFO } from "../config/api";

/**
 * HeaderHero Component - Exactly matching backend branding
 * Strict rule: <= 500 lines
 */
export default function HeaderHero({ onConsultClick }) {
  return (
    <header className="hero-section">
      {/* Top Brand Bar - Exact matching backend _header.php */}
      <div className="top-brand-bar">
        <div className="toluck-brand-logo">
          <div className="toluck-brand-badge">T</div>
          <div className="toluck-brand-info">
            <span className="toluck-brand-text">{CONTACT_INFO.brandName}</span>
            <span className="toluck-brand-tagline">{CONTACT_INFO.tagline}</span>
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
          <span>🌿 {CONTACT_INFO.subSlogan}</span>
        </div>
        <h1 className="hero-headline">
          {CONTACT_INFO.slogan}
        </h1>
        <p className="hero-subtext">
          TOLUCK cung cấp giải pháp <strong>Công nghệ</strong>, <strong>Digital Marketing</strong>,{" "}
          <strong>Branding</strong> và <strong>Truyền thông số</strong>, đồng hành cùng doanh nghiệp từ xây dựng thương hiệu đến tăng trưởng bền vững.
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

      {/* Trust Strip - Exact stats from backend ToluckContent::getStats() */}
      <div className="trust-strip">
        <div className="trust-item">
          <div className="trust-number color-emerald">250K+</div>
          <div className="trust-label">Người Dùng</div>
        </div>
        <div className="trust-item">
          <div className="trust-number color-blue">1,548</div>
          <div className="trust-label">Giải Đấu</div>
        </div>
        <div className="trust-item">
          <div className="trust-number color-emerald">200+</div>
          <div className="trust-label">Đối Tác</div>
        </div>
        <div className="trust-item">
          <div className="trust-number color-blue">&gt;10K CCU</div>
          <div className="trust-label">Chịu Tải Cao</div>
        </div>
      </div>
    </header>
  );
}
