import React from "react";

/**
 * CoreServicesSection Component - 3 Dịch Vụ Chính Của TOLUCK
 * Theo phản hồi duyệt: "3 dịch vụ chính"
 * Strict rule: <= 500 lines
 */
export default function CoreServicesSection({ onNavigateTab }) {
  const coreServices = [
    {
      id: "marketing",
      num: "01",
      title: "Digital Marketing Toàn Diện & Tăng Trưởng",
      badge: "Bản Quyền 100% • Ads 200Tr/th",
      icon: "📢",
      image: "./img/pillar_growth.jpg",
      desc: "Xây dựng bản sắc thương hiệu độc bản, sáng tạo nội dung đa nền tảng (Video ngắn, Reels, TikTok) và tối ưu hóa chiến dịch quảng cáo chuyển đổi cao.",
      highlights: [
        "Thiết kế nhận diện Brand Guidelines độc quyền",
        "Sản xuất nội dung, hình ảnh & video ngắn chuẩn Viral",
        "Quảng cáo đa kênh Meta, Google Ads & TikTok Ads",
      ],
    },
    {
      id: "technology",
      num: "02",
      title: "Công Nghệ Số, Website Chuẩn SEO & CRM",
      badge: "Tải < 1.5s • Chịu tải >10K CCU",
      icon: "💻",
      image: "./img/pillar_tech.jpg",
      desc: "Lập trình Website chuẩn SEO tốc độ cao không dùng template đại trà, xây dựng Landing Page chuyển đổi theo chiến dịch và hệ thống CRM quản trị khách hàng VIP.",
      highlights: [
        "Website may đo chuẩn Core Web Vitals của Google",
        "Landing Page tối ưu tỷ lệ chuyển đổi đơn hàng",
        "Hệ thống CRM quản trị thành viên & thẻ VIP số",
      ],
    },
    {
      id: "automation",
      num: "03",
      title: "Chuyển Đổi Số & Tự Động Hóa n8n / AI",
      badge: "Vận Hành Tự Động 24/7",
      icon: "⚙️",
      image: "./img/pillar_ai.jpg",
      desc: "Tự động hóa luồng dữ liệu Web ➔ CRM ➔ Zalo ➔ Email qua webhook n8n, tích hợp AI Chatbot chăm sóc khách hàng và chốt hẹn tự động 24/7.",
      highlights: [
        "Tự động hóa luồng dữ liệu đa kênh với n8n",
        "AI Chatbot tư vấn, sàng lọc Lead & chốt hẹn tự động",
        "Số hóa quy trình vận hành và báo cáo thời gian thực",
      ],
    },
  ];

  return (
    <section className="section-block core-services-section">
      <div className="section-header">
        <span className="section-kicker">NĂNG LỰC CỐT LÕI</span>
        <h2 className="section-heading">3 Dịch Vụ Trọng Tâm Của TOLUCK</h2>
        <p className="section-desc">
          Hợp nhất giữa chiến lược tiếp thị sắc bén và nền tảng công nghệ vững chắc, vận hành như phòng ban nội bộ của doanh nghiệp bạn.
        </p>
      </div>

      <div className="core-services-list">
        {coreServices.map((svc) => (
          <div key={svc.id} className="core-service-card">
            <div className="core-svc-img-box">
              <img
                src={svc.image}
                alt={svc.title}
                className="core-svc-img"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "./hero_banner.jpg";
                }}
              />
              <span className="core-svc-badge">{svc.badge}</span>
              <span className="core-svc-num">{svc.num}</span>
            </div>

            <div className="core-svc-body">
              <div className="core-svc-title-row">
                <span className="core-svc-icon">{svc.icon}</span>
                <h3 className="core-svc-title">{svc.title}</h3>
              </div>
              <p className="core-svc-desc">{svc.desc}</p>

              <div className="core-svc-bullets">
                {svc.highlights.map((h, idx) => (
                  <div key={idx} className="core-svc-bullet">
                    <span className="bullet-check">✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="core-svc-cta"
                onClick={() => {
                  if (onNavigateTab) onNavigateTab("services");
                }}
              >
                <span>Xem chi tiết dịch vụ &amp; báo giá ➔</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Button to view all 28 services */}
      <div className="all-services-link-box">
        <button
          type="button"
          className="btn btn-secondary w-full"
          onClick={() => {
            if (onNavigateTab) onNavigateTab("services");
          }}
        >
          📋 Khám Phá Trọn Bộ 28 Dịch Vụ Chi Tiết 2026
        </button>
      </div>
    </section>
  );
}
