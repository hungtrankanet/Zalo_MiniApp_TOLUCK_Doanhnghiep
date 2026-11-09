import React from "react";

/**
 * HomeTab Component - Trang Chủ Đồng Bộ 100% Concept Website TOLUCK
 * Slogan: "Có đội Marketing & IT riêng, mà không cần trả lương cả năm."
 * Strict rule: <= 500 lines
 */
export default function HomeTab({ onNavigateTab }) {
  const pillars = [
    {
      num: "01",
      badge: "Bản Quyền 100%",
      icon: "🎨",
      title: "Marketing: Thương Hiệu & Nội Dung",
      desc: "Xây dựng nhận diện thương hiệu độc bản (Logo, Font, Màu sắc, Bao bì), quản trị nội dung mạng xã hội và thiết kế ấn phẩm sales kit chuyên nghiệp.",
    },
    {
      num: "02",
      badge: "Ads 200Tr/th • 43M+ Views",
      icon: "📢",
      title: "Marketing: Tăng Trưởng & Sự Kiện",
      desc: "Quảng cáo đa kênh (Meta, Google, TikTok), SEO/SEM & Entity AIO, tổ chức sự kiện quy mô lớn và quản lý truyền thông chuyển đổi cao.",
    },
    {
      num: "03",
      badge: "Tải < 1.5s • >10K CCU",
      icon: "💻",
      title: "Công Nghệ: Website Chuẩn SEO & CRM",
      desc: "Thiết kế Website chuẩn SEO không dùng template dựng sẵn, Landing Page theo chiến dịch và hệ thống CRM quản trị khách hàng VIP online.",
    },
    {
      num: "04",
      badge: "Automation 24/7",
      icon: "⚙️",
      title: "Chuyển Đổi Số: Tự Động Hóa n8n & AI",
      desc: "Tự động hóa luồng dữ liệu Web ➔ CRM ➔ Zalo ➔ Email với n8n webhooks, tích hợp AI Chatbot chăm sóc và chốt hẹn khách hàng 24/7.",
    },
  ];

  const partners = [
    { name: "SunTrans Logistics", tag: "Logistics Quốc Tế" },
    { name: "King Gold Art", tag: "Quà Tặng Vàng Cao Cấp" },
    { name: "Kính Mắt Anna", tag: "Chuỗi Bán Lẻ Toàn Quốc" },
    { name: "VSports Platform", tag: "250K+ Người Dùng" },
    { name: "WService Ecosystem", tag: "200+ Doanh Nghiệp" },
  ];

  return (
    <div className="tab-page home-tab">
      {/* Hero Header Banner */}
      <section className="hero-banner">
        <div className="hero-badge">
          <span className="pulse-dot" />
          <span>PHÒNG MARKETING THUÊ NGOÀI CHIẾN LƯỢC</span>
        </div>
        <h1 className="hero-title">
          Có đội Marketing &amp; IT riêng,<br />
          <span className="text-gradient">mà không cần trả lương cả năm.</span>
        </h1>
        <p className="hero-subtitle">
          TOLUCK đồng hành cùng doanh nghiệp vừa và nhỏ từ thương hiệu, nội dung, công nghệ đến tự động hoá — một đội ngũ duy nhất, vận hành như phòng ban nội bộ của bạn.
        </p>

        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNavigateTab("quote")}
          >
            <span>⚡ Tính Giá Dự Toán Nhanh</span>
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onNavigateTab("services")}
          >
            <span>Xem 28 Dịch Vụ 2026</span>
          </button>
        </div>

        {/* Verified Authority Metrics Strip (4 số liệu chính thức của website) */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-value">200+</div>
            <div className="stat-label">Khách Hàng Hài Lòng</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">1.000+</div>
            <div className="stat-label">Chiến Dịch Thành Công</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">15+ Năm</div>
            <div className="stat-label">Thực Chiến Chuyên Sâu</div>
          </div>
        </div>
      </section>

      {/* 4 Trụ Cột Dịch Vụ Cốt Lõi */}
      <section className="section-block">
        <div className="section-header">
          <span className="section-kicker">NĂNG LỰC TRIỂN KHAI</span>
          <h2 className="section-heading">4 Nhóm Giải Pháp Cốt Lõi</h2>
          <p className="section-desc">Hợp nhất tư duy công nghệ vững chắc với chiến lược tiếp thị thực thi sắc bén.</p>
        </div>

        <div className="pillars-grid">
          {pillars.map((item) => (
            <div key={item.num} className="pillar-card">
              <div className="pillar-top">
                <span className="pillar-icon">{item.icon}</span>
                <span className="pillar-badge">{item.badge}</span>
              </div>
              <h3 className="pillar-title">{item.title}</h3>
              <p className="pillar-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Câu Chuyện Đồng Hành */}
      <section className="section-block story-block">
        <div className="story-card">
          <div className="story-tag">CÂU CHUYỆN ĐỒNG HÀNH</div>
          <h3 className="story-title">Từ Zero Đến Cơ Hội Bứt Phá</h3>
          <p className="story-desc">
            TOLUCK không chỉ cung cấp dịch vụ đơn lẻ, chúng tôi đóng vai trò là "Phòng Marketing &amp; Công Nghệ Thuê Ngoài", trực tiếp đồng hành cùng ban lãnh đạo doanh nghiệp tháo gỡ từng điểm nghẽn chuyển đổi số và tiếp thị đa kênh.
          </p>
          <div className="story-footer">
            <div className="story-quote">"Chúng tôi cam kết số liệu thật, chuyển đổi thật và hiệu quả bền vững."</div>
          </div>
        </div>
      </section>

      {/* Logo Đối Tác & Khách Hàng */}
      <section className="section-block partners-block">
        <div className="section-header">
          <span className="section-kicker">TÍN NHIỆM &amp; HỢP TÁC</span>
          <h2 className="section-heading">Đối Tác &amp; Khách Hàng Tiêu Biểu</h2>
        </div>

        <div className="partners-list">
          {partners.map((partner, idx) => (
            <div key={idx} className="partner-chip">
              <span className="partner-dot">✓</span>
              <div className="partner-info">
                <div className="partner-name">{partner.name}</div>
                <div className="partner-tag">{partner.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
