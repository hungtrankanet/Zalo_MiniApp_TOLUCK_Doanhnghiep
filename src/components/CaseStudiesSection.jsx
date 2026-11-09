import React from "react";

/**
 * CaseStudiesSection Component - 6 Dự Án Tiêu Biểu Của TOLUCK
 * Tích hợp hình ảnh thực tế, chỉ số đo lường thật và liên kết tư vấn
 * Strict rule: <= 500 lines
 */
export default function CaseStudiesSection({ onNavigateTab }) {
  const caseStudies = [
    {
      id: "vsports",
      title: "VSports — Nền Tảng Thể Thao Số 1",
      category: "Sport Tech & Platform",
      metric: "250K+ Users • 1.548 Giải Đấu",
      metricColor: "emerald",
      badge: "Chịu tải >10K CCU",
      image: "./img/case_vsports.jpg",
      desc: "Hệ thống số hóa giải đấu thể thao số 1 Việt Nam. Kiến trúc chịu tải cao, livestream tích hợp, 43M+ lượt xem và 5.168 CLB tham gia.",
    },
    {
      id: "wservice",
      title: "WService — Thẻ VIP & CRM Đa Kênh",
      category: "VIP Membership & CRM",
      metric: "200+ Nhãn Hàng Toàn Quốc",
      metricColor: "blue",
      badge: "Omni-channel CRM",
      image: "./img/case_wservice.jpg",
      desc: "Hệ thống thẻ thành viên số và quản trị khách hàng trung thành, tích hợp cổng đối soát doanh thu tự động cho 200+ nhà cung cấp.",
    },
    {
      id: "wlin_bsin",
      title: "WLIN / BSIN — Mạng Lưới Doanh Nhân",
      category: "Branding & Media Network",
      metric: "Top 100 Doanh Nhân Tiêu Biểu",
      metricColor: "emerald",
      badge: "Bản Quyền Độc Bản",
      image: "./img/case_wlin.jpg",
      desc: "Tái định vị nhận diện thương hiệu, xây dựng cổng thông tin truyền thông sự kiện vinh danh và kết nối giao thương B2B quốc tế.",
    },
    {
      id: "ai_ebook",
      title: "AI Ebook Generator — Auto Publishing",
      category: "AI Cloud & Content Engine",
      metric: "100% Xuất Bản Tự Động",
      metricColor: "blue",
      badge: "AI Automation Pipeline",
      image: "./img/case_ai_ebook.jpg",
      desc: "Ứng dụng AI/LLM sinh nội dung bài giảng, tài liệu đào tạo chuyên sâu và biên soạn sách điện tử PDF định dạng in ấn tự động.",
    },
    {
      id: "sme_tuibao",
      title: "Chuyển Đổi Số SME & Tuibao Packaging",
      category: "Digital Transformation",
      metric: "+68% Tỷ Lệ Chuyển Đổi",
      metricColor: "emerald",
      badge: "Supply Chain ERP",
      image: "./img/case_tuibao.jpg",
      desc: "Số hóa toàn diện quy trình nhận đơn, truy xuất nguồn gốc bao bì qua QR code và tự động hóa thông báo trạng thái đơn hàng.",
    },
    {
      id: "kantek",
      title: "KANTEK — Tăng Trưởng Thị Trường US",
      category: "Global Performance Ads",
      metric: "200M+ Ngân Sách Ads/Tháng",
      metricColor: "blue",
      badge: "Global Growth",
      image: "./img/case_vietkieu.jpg",
      desc: "Chiến dịch tiếp thị số đa kênh nhắm mục tiêu cộng đồng doanh nghiệp kiều bào tại Hoa Kỳ, tối ưu hóa chi phí thu hút khách hàng tiềm năng.",
    },
  ];

  return (
    <section className="section-block case-section">
      <div className="section-header">
        <span className="section-kicker">DỰ ÁN ĐÃ THỰC HIỆN</span>
        <h2 className="section-heading">6 Dự Án Đo Lường Bằng Kết Quả Thật</h2>
        <p className="section-desc">
          Minh chứng năng lực triển khai thực chiến qua các hệ thống vận hành hàng ngày của khách hàng.
        </p>
      </div>

      <div className="case-grid">
        {caseStudies.map((item) => (
          <div key={item.id} className="case-card">
            <div className="case-image-box">
              <img
                src={item.image}
                alt={item.title}
                className="case-img"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "./hero_banner.jpg";
                }}
              />
              <span className={`case-badge tag-${item.metricColor}`}>
                {item.badge}
              </span>
              <span className="case-category-pill">{item.category}</span>
            </div>

            <div className="case-content">
              <h3 className="case-title">{item.title}</h3>
              <div className={`case-metric text-${item.metricColor}`}>
                ★ {item.metric}
              </div>
              <p className="case-desc">{item.desc}</p>
              
              <button
                type="button"
                className="case-cta-btn"
                onClick={() => {
                  if (onNavigateTab) onNavigateTab("quote");
                }}
              >
                <span>Tư vấn dự án tương tự ➔</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
