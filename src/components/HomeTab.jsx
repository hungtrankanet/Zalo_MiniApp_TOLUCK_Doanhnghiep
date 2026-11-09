import React from "react";

/**
 * HomeTab Component - Trang Chủ & Giới Thiệu Năng Lực TOLUCK
 * Strict rule: <= 500 lines
 */
export default function HomeTab({ onNavigateTab }) {
  const pillars = [
    {
      num: "01",
      badge: "Bản Quyền 100%",
      icon: "🎨",
      title: "Branding & Nhận Diện Bản Sắc",
      desc: "Thiết kế Logo, Brand Guidelines, ấn phẩm tiếp thị số. Bàn giao 100% file gốc vector độc quyền.",
    },
    {
      num: "02",
      badge: "Tải < 1.5s • >10K CCU",
      icon: "💻",
      title: "Thiết Kế Website Chịu Tải Cao",
      desc: "Hạ tầng Docker, Redis Caching, chống DDoS, chuẩn SEO Google và tối ưu cho cụm cân bằng tải.",
    },
    {
      num: "03",
      badge: "Tối Ưu Ngân Sách Ads",
      icon: "📢",
      title: "Quản Trị Social & Quảng Cáo Đa Kênh",
      desc: "Sáng tạo nội dung thu hút, sản xuất video ngắn TikTok/Reels triệu view, chạy Facebook Ads & Google Ads.",
    },
    {
      num: "04",
      badge: "Automation 24/7",
      icon: "⚙️",
      title: "Tự Động Hóa n8n & Email SAAS",
      desc: "Tích hợp luồng webhook n8n tự động hóa phân loại khách hàng, đồng bộ CRM và gửi email chăm sóc 24/7.",
    },
  ];

  const partners = [
    { name: "SunTrans Logistics", tag: "Logistics Quốc Tế" },
    { name: "King Gold Art", tag: "Quà Tặng Vàng Cao Cấp" },
    { name: "Kính Mắt Anna", tag: "Hệ Thống Bán Lẻ" },
    { name: "VSports Platform", tag: "250K+ Người Dùng" },
    { name: "WService Ecosystem", tag: "200+ Doanh Nghiệp" },
  ];

  return (
    <div className="tab-page home-tab">
      {/* Hero Header Banner */}
      <section className="hero-banner">
        <div className="hero-badge">
          <span className="pulse-dot" />
          <span>HỒ SƠ NĂNG LỰC TOLUCK 2026</span>
        </div>
        <h1 className="hero-title">
          Công Nghệ Tạo Nền Tảng.<br />
          <span className="text-gradient">Marketing Tạo Tăng Trưởng.</span>
        </h1>
        <p className="hero-subtitle">
          TOLUCK đồng hành cùng doanh nghiệp từ kiến tạo bản sắc thương hiệu đến vận hành hệ sinh thái công nghệ chịu tải lớn.
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

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-value">250K+</div>
            <div className="stat-label">User Hoạt Động</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">43M+</div>
            <div className="stat-label">Lượt Tiếp Cận</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">200+</div>
            <div className="stat-label">Doanh Nghiệp</div>
          </div>
        </div>
      </section>

      {/* 4 Trụ Cột Dịch Vụ Cốt Lõi */}
      <section className="section-block">
        <div className="section-header">
          <span className="section-kicker">GIẢI PHÁP TĂNG TRƯỞNG</span>
          <h2 className="section-heading">4 Trụ Cột Giải Pháp Cốt Lõi</h2>
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
            TOLUCK không chỉ cung cấp dịch vụ đơn lẻ, chúng tôi đóng vai trò là "Phòng Marketing & Công Nghệ Thuê Ngoài", trực tiếp đồng hành cùng ban lãnh đạo doanh nghiệp tháo gỡ từng điểm nghẽn chuyển đổi số và tiếp thị đa kênh.
          </p>
          <div className="story-footer">
            <div className="story-quote">"Chúng tôi cam kết số liệu thật, chuyển đổi thật và hiệu quả bền vững."</div>
          </div>
        </div>
      </section>

      {/* Logo Đối Tác & Khách Hàng */}
      <section className="section-block partners-block">
        <div className="section-header">
          <span className="section-kicker">TÍN NHIỆM & HỢP TÁC</span>
          <h2 className="section-heading">Đối Tác & Khách Hàng Tiêu Biểu</h2>
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
