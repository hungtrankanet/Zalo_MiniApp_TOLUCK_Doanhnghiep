import React from "react";
import PartnerMarqueeSection from "./PartnerMarqueeSection";
import CoreServicesSection from "./CoreServicesSection";
import TargetAudienceSection from "./TargetAudienceSection";
import ProcessWorkflowSection from "./ProcessWorkflowSection";
import CaseStudiesSection from "./CaseStudiesSection";
import TestimonialsSection from "./TestimonialsSection";
import TrendsSection from "./TrendsSection";

/**
 * HomeTab Component - Tái Cấu Trúc UI/UX Pro Theo 8 Section Chuẩn Chuyển Đổi
 * 1. Hero Banner (kèm 2-3 hình ảnh trực quan & chỉ số bảo chứng phía dưới)
 * 2. Section Logo đối tác & khách hàng (Nằm ngang slide qua 2 dòng)
 * 3. Section Dịch vụ chính (3 dịch vụ chính)
 * 4. Section Đối tượng khách hàng tiềm năng
 * 5. Section Quy trình thực hiện dự án
 * 6. Section Dự án thực tế
 * 7. Section Khách hàng nói gì về chúng tôi
 * 8. Section Góc chia sẻ
 * Strict rule: <= 500 lines
 */
export default function HomeTab({ onNavigateTab }) {
  const heroMockupImages = [
    { src: "./hero_banner.jpg", label: "Phòng Marketing & IT Thuê Ngoài" },
    { src: "./about_banner.jpg", label: "Hạ Tầng Công Nghệ & Tự Động Hóa" },
    { src: "./img/trend_vertical_saas.jpg", label: "Giải Pháp Chuyển Đổi Số 2026" },
  ];

  return (
    <div className="tab-page home-tab">
      {/* 0. Top Brand Bar với Logo TOLUCK */}
      <header className="home-top-bar">
        <div className="home-brand">
          <img
            src="./logo.svg"
            alt="TOLUCK"
            className="home-brand-logo"
            onError={(e) => {
              e.currentTarget.src = "./logo.png";
            }}
          />
          <div className="home-brand-meta">
            <span className="home-brand-name">TOLUCK</span>
            <span className="home-brand-tagline">Marketing &amp; Công Nghệ Số</span>
          </div>
        </div>
        <div className="home-brand-badge">
          <span className="pulse-dot" />
          <span>Doanh Nghiệp 2026</span>
        </div>
      </header>

      {/* 1. Hero Header Banner */}
      <section className="hero-banner">
        <div className="hero-badge">
          <span className="pulse-dot" />
          <span>GIẢI PHÁP TĂNG TRƯỞNG DOANH NGHIỆP 2026</span>
        </div>
        <h1 className="hero-title">
          Có đội Marketing &amp; IT riêng,<br />
          <span className="text-gradient">mà không cần trả lương cả năm.</span>
        </h1>
        <p className="hero-subtitle">
          TOLUCK đồng hành cùng doanh nghiệp từ bản sắc thương hiệu, nội dung đa kênh, công nghệ đến tự động hoá — một đội ngũ duy nhất, vận hành như phòng ban nội bộ của bạn.
        </p>

        {/* 2-3 Hình Ảnh Trực Quan Hero (Theo phản hồi người dùng) */}
        <div className="hero-visual-strip">
          {heroMockupImages.map((img, i) => (
            <div key={i} className="hero-visual-thumb-wrap">
              <img
                src={img.src}
                alt={img.label}
                className="hero-visual-thumb"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "./hero_banner.jpg";
                }}
              />
              <span className="hero-visual-caption">{img.label}</span>
            </div>
          ))}
        </div>

        {/* Nút hành động */}
        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNavigateTab("services")}
          >
            <span>📋 Xem 3 Dịch Vụ Cốt Lõi</span>
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onNavigateTab("community")}
          >
            <span>🤝 Cộng Đồng Doanh Nghiệp</span>
          </button>
        </div>

        {/* Verified Authority Metrics Strip - Sắp xếp 4 chỉ số trên 1 dòng */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-value">200+</div>
            <div className="stat-label">Khách Hàng</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">1.000+</div>
            <div className="stat-label">Chiến Dịch</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">15+ Năm</div>
            <div className="stat-label">Thực Chiến</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">250K+</div>
            <div className="stat-label">Người Dùng</div>
          </div>
        </div>
      </section>

      {/* 2. Section Logo Đối Tác & Khách Hàng (Nằm ngang slide qua 2 dòng) */}
      <PartnerMarqueeSection onNavigateTab={onNavigateTab} />

      {/* 3. Section Dịch Vụ Chính (3 Dịch Vụ Trọng Tâm) */}
      <CoreServicesSection onNavigateTab={onNavigateTab} />

      {/* 4. Section Đối Tượng Khách Hàng Tiềm Năng */}
      <TargetAudienceSection onNavigateTab={onNavigateTab} />

      {/* 5. Section Quy Trình Thực Hiện Dự Án (4 Bước) */}
      <ProcessWorkflowSection onNavigateTab={onNavigateTab} />

      {/* 6. Section Dự Án Thực Tế (Case Studies) */}
      <CaseStudiesSection onNavigateTab={onNavigateTab} />

      {/* 7. Section Khách Hàng Nói Gì Về Chúng Tôi (Testimonials) */}
      <TestimonialsSection />

      {/* 8. Section Góc Chia Sẻ (Trends & Tech Insights) */}
      <TrendsSection onNavigateTab={onNavigateTab} />

      {/* Hotline Support Banner */}
      <section className="support-banner">
        <div className="support-content">
          <div className="support-title">Cần Trao Đổi Trực Tiếp Chuyên Gia?</div>
          <div className="support-sub">Đội ngũ TOLUCK sẵn sàng phản hồi và tư vấn giải pháp trong 15 phút.</div>
        </div>
        <a href="tel:0963484365" className="support-btn">
          📞 0963 484 365
        </a>
      </section>
    </div>
  );
}
