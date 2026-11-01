import React from "react";

/**
 * CaseStudiesSection Component - 6 Flagship Projects
 * Strict rule: <= 500 lines
 */
export default function CaseStudiesSection() {
  const caseStudies = [
    {
      id: "vsports",
      title: "VSports — Nền Tảng Thể Thao Số 1",
      category: "Sport Tech & Platform",
      metric: "250K+ Users • 1,548 Giải Đấu",
      metricColor: "emerald",
      badge: "Microservices >10K CCU",
      desc: "Hệ thống số hóa giải đấu thể thao số 1 Việt Nam. Kiến trúc chịu tải cao, livestream tích hợp, 43M+ lượt xem và 5.168 CLB tham gia.",
    },
    {
      id: "wservice",
      title: "WService — Thẻ VIP & CRM Đa Kênh",
      category: "VIP Membership & CRM",
      metric: "200+ Nhãn Hàng Toàn Quốc",
      metricColor: "blue",
      badge: "Omni-channel CRM",
      desc: "Hệ thống thẻ thành viên số và quản trị khách hàng trung thành, tích hợp cổng đối soát doanh thu tự động cho 200+ nhà cung cấp.",
    },
    {
      id: "wlin_bsin",
      title: "WLIN / BSIN — Mạng Lưới Doanh Nhân",
      category: "Branding & Media Network",
      metric: "Top 100 Doanh Nhân Tiêu Biểu",
      metricColor: "emerald",
      badge: "High Impact Events",
      desc: "Tái định vị nhận diện thương hiệu, xây dựng cổng thông tin truyền thông sự kiện vinh danh và kết nối giao thương B2B quốc tế.",
    },
    {
      id: "ai_ebook",
      title: "AI Ebook Generator — Auto Publishing",
      category: "AI Cloud & Content Engine",
      metric: "100% Xuất Bản Tự Động",
      metricColor: "blue",
      badge: "AI Automation Pipeline",
      desc: "Ứng dụng AI/LLM sinh nội dung bài giảng, tài liệu đào tạo chuyên sâu và biên soạn sách điện tử PDF định dạng in ấn tự động.",
    },
    {
      id: "sme_tuibao",
      title: "Chuyển Đổi Số SME & Tuibao Packaging",
      category: "Digital Transformation",
      metric: "+68% Tỷ Lệ Chuyển Đổi",
      metricColor: "emerald",
      badge: "Supply Chain ERP",
      desc: "Số hóa toàn diện quy trình nhận đơn, truy xuất nguồn gốc bao bì qua QR code và tự động hóa thông báo trạng thái đơn hàng.",
    },
    {
      id: "kantek",
      title: "KANTEK — Tăng Trưởng Thị Trường US",
      category: "Global Performance Ads",
      metric: "200M+ Ngân Sách Ads/Tháng",
      metricColor: "blue",
      badge: "International Growth",
      desc: "Chiến dịch tiếp thị số đa kênh nhắm mục tiêu cộng đồng doanh nghiệp kiều bào tại Hoa Kỳ, tối ưu hóa chi phí thu hút khách hàng tiềm năng.",
    },
  ];

  return (
    <section className="section-block bg-subtle">
      <div className="section-title-wrap">
        <span className="section-kicker">DỰ ÁN TIÊU BIỂU</span>
        <h2 className="section-heading">6 Case Studies Đo Lường Bằng Kết Quả Thật</h2>
        <p className="section-lead">
          Đồng hành xây dựng nền móng tăng trưởng bền vững, minh chứng qua các số liệu vận hành thực tế.
        </p>
      </div>

      <div className="case-grid">
        {caseStudies.map((item) => (
          <div key={item.id} className="case-card">
            <div className="case-header">
              <span className={`case-badge tag-${item.metricColor}`}>{item.badge}</span>
              <span className="case-category">{item.category}</span>
            </div>
            <h3 className="case-title">{item.title}</h3>
            <div className={`case-metric text-${item.metricColor}`}>
              ★ {item.metric}
            </div>
            <p className="case-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
