import React from "react";

/**
 * ProcessWorkflowSection Component - Quy Trình Thực Hiện Dự Án 4 Bước
 * Minh bạch, bài bản và cam kết KPI rõ ràng
 * Strict rule: <= 500 lines
 */
export default function ProcessWorkflowSection({ onNavigateTab }) {
  const steps = [
    {
      num: "01",
      title: "Khảo Sát & Khám Bệnh Thực Trạng",
      time: "1 - 2 Ngày",
      tag: "Miễn Phí 100%",
      desc: "Chuyên gia TOLUCK trực tiếp khảo sát mô hình kinh doanh, phân tích các điểm nghẽn marketing và kiểm tra kiến trúc công nghệ hiện có của doanh nghiệp.",
      details: ["Kiểm toán kênh truyền thông & quảng cáo", "Đánh giá tốc độ và chuẩn SEO website", "Xác định cơ hội tăng trưởng tức thì"],
    },
    {
      num: "02",
      title: "Hoạch Định Chiến Lược & May Đo KPI",
      time: "2 - 3 Ngày",
      tag: "Cam Kết Số Liệu Thật",
      desc: "Xây dựng bảng kế hoạch tổng thể, đề xuất gói giải pháp phù hợp với ngân sách và thống nhất các chỉ số KPI chuyển đổi đo lường bằng kết quả kinh doanh.",
      details: ["Bảng phân bổ ngân sách chi tiết", "KPI cam kết rõ ràng theo mốc thời gian", "Ký kết thỏa thuận bảo mật & bản quyền"],
    },
    {
      num: "03",
      title: "Triển Khai May Đo Theo Sprint Agile",
      time: "1 - 3 Tuần",
      tag: "Thực Thi Thần Tốc",
      desc: "Biệt đội thực chiến chuyên môn cao (Creative, Performance Ads, Lập trình viên) bắt tay vào sản xuất nội dung, chạy quảng cáo và phát triển công nghệ.",
      details: ["Cập nhật tiến độ hàng ngày qua nhóm riêng", "Tối ưu hóa chiến dịch quảng cáo liên tục", "Bàn giao theo từng giai đoạn hoàn tất"],
    },
    {
      num: "04",
      title: "Đo Lường Hiệu Quả & Bảo Hành 12 Tháng",
      time: "Dài Hạn",
      tag: "Đồng Hành Bền Vững",
      desc: "Báo cáo số liệu minh bạch theo tuần/tháng, đào tạo chuyển giao công nghệ cho nhân sự nội bộ và hỗ trợ kỹ thuật liên tục 24/7.",
      details: ["Dashboard báo cáo số liệu chuyển đổi thật", "Bảo hành mã nguồn & hệ thống 12 tháng", "Tư vấn nâng cấp chiến lược định kỳ"],
    },
  ];

  return (
    <section className="section-block process-workflow-section">
      <div className="section-header">
        <span className="section-kicker">QUY TRÌNH CHUẨN MỰC</span>
        <h2 className="section-heading">4 Bước Triển Khai Dự Án Chuẩn Chỉ</h2>
        <p className="section-desc">
          Minh bạch từ ngày đầu tiên, đảm bảo tiến độ chính xác và cam kết hiệu quả rõ ràng cho doanh nghiệp.
        </p>
      </div>

      <div className="process-timeline">
        {steps.map((step, idx) => (
          <div key={step.num} className="process-step-card">
            <div className="step-badge-row">
              <span className="step-number">{step.num}</span>
              <span className="step-time">⏱️ {step.time}</span>
              <span className="step-tag">{step.tag}</span>
            </div>

            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc">{step.desc}</p>

            <div className="step-checklist">
              {step.details.map((d, i) => (
                <div key={i} className="step-check-item">
                  <span className="step-check-icon">✓</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>

            {idx < steps.length - 1 && <div className="step-connector-line" />}
          </div>
        ))}
      </div>
    </section>
  );
}
