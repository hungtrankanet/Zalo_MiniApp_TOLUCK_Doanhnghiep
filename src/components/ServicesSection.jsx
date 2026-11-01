import React from "react";

/**
 * ServicesSection Component - 4 Core Pillars
 * Strict rule: <= 500 lines
 */
export default function ServicesSection({ onSelectService }) {
  const services = [
    {
      id: "branding",
      num: "01",
      badge: "Bản Quyền 100%",
      badgeColor: "emerald",
      icon: "🎨",
      title: "Branding & Nhận Diện Bản Sắc",
      desc: "Thiết kế Logo, bộ nhận diện văn phòng, Brand Guidelines, ấn phẩm tiếp thị số. Bàn giao 100% file gốc vector và quyền sở hữu.",
    },
    {
      id: "website_high_load",
      num: "02",
      badge: "Tốc độ < 1.5s",
      badgeColor: "blue",
      featured: true,
      icon: "💻",
      title: "Thiết Kế Website Chịu Tải >10K CCU",
      desc: "Kiến trúc tối ưu tốc độ tải <1.5s, chuẩn SEO Google, giao diện responsive, chống DDoS và sẵn sàng tích hợp cụm cân bằng tải.",
    },
    {
      id: "social_ads",
      num: "03",
      badge: "Tối Ưu Ngân Sách Ads",
      badgeColor: "emerald",
      icon: "📢",
      title: "Quản Trị Social & Quảng Cáo Đa Kênh",
      desc: "Sáng tạo nội dung thu hút, sản xuất video ngắn TikTok/Reels, triển khai chiến dịch Facebook Ads, Google Ads chuyển đổi cao.",
    },
    {
      id: "automation_crm",
      num: "04",
      badge: "Automation 24/7",
      badgeColor: "blue",
      icon: "⚙️",
      title: "Tự Động Hóa n8n & Email SAAS",
      desc: "Tích hợp luồng webhook n8n tự động phân loại khách hàng, đồng bộ dữ liệu CRM và gửi chuỗi email chăm sóc tự động 24/7.",
    },
  ];

  return (
    <section className="section-block">
      <div className="section-title-wrap">
        <span className="section-kicker">DỊCH VỤ CỐT LÕI</span>
        <h2 className="section-heading">4 Giải Pháp Tăng Trưởng Doanh Nghiệp</h2>
        <p className="section-lead">
          Đồng hành từ xây dựng bản sắc nhận diện thương hiệu đến kiến trúc nền tảng công nghệ chịu tải lớn.
        </p>
      </div>

      <div className="services-grid">
        {services.map((item) => (
          <div
            key={item.id}
            className={`service-box ${item.featured ? "service-box-featured" : ""}`}
            onClick={() => onSelectService && onSelectService(item.title)}
          >
            {item.featured && <div className="card-ribbon">TIÊU BIỂU</div>}
            <div className="service-top">
              <span className={`service-num text-${item.badgeColor}`}>{item.num}</span>
              <div className={`service-icon-bubble bg-${item.badgeColor}`}>
                {item.icon}
              </div>
            </div>
            <h3 className="service-box-title">{item.title}</h3>
            <p className="service-box-desc">{item.desc}</p>
            <div className="service-bottom">
              <span className={`tag-pill tag-${item.badgeColor}`}>
                {item.badge}
              </span>
              <span className="service-arrow">Tư vấn →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
