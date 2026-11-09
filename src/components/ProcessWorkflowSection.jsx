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
      title: "Tiếp nhận & Tư vấn",
      time: "1 - 2 Ngày",
      tag: "Khảo Sát Thực Tế",
      desc: "Nhận yêu cầu, tư vấn hướng giải pháp dựa trên case study thực tế tương tự đã triển khai.",
      details: [
        "Tiếp nhận nhu cầu và mục tiêu kinh doanh cụ thể",
        "Phân tích case study tương tự đã triển khai thành công",
        "Tư vấn lộ trình giải pháp tối ưu chi phí & nguồn lực",
      ],
    },
    {
      num: "02",
      title: "Báo giá & Ký kết",
      time: "2 - 3 Ngày",
      tag: "Minh Bạch Chi Phí",
      desc: "Gửi chi phí dự kiến, thống nhất phạm vi công việc, chốt hợp đồng.",
      details: [
        "Gửi bảng dự toán chi phí chi tiết, rõ ràng",
        "Thống nhất phạm vi công việc (SOW) và cam kết KPI",
        "Ký kết hợp đồng pháp lý & bảo mật số liệu (NDA)",
      ],
    },
    {
      num: "03",
      title: "Lập kế hoạch & Duyệt",
      time: "3 - 5 Ngày",
      tag: "Lộ Trình Rõ Ràng",
      desc: "Lập kế hoạch triển khai chi tiết, trình khách hàng duyệt trước khi bắt đầu.",
      details: [
        "Lập kế hoạch triển khai chi tiết từng mốc (Sprint/Gantt)",
        "Duyệt wireframe, kịch bản, bản thiết kế & thông điệp",
        "Chốt nhân sự phụ trách chuyên trách và kênh liên lạc",
      ],
    },
    {
      num: "04",
      title: "Thực thi",
      time: "Đúng Tiến Độ",
      tag: "Cam Kết KPI",
      desc: "Triển khai đúng theo kế hoạch đã được duyệt, cập nhật tiến độ thường xuyên.",
      details: [
        "Triển khai chuẩn mực theo đúng kế hoạch đã được duyệt",
        "Cập nhật tiến độ và báo cáo số liệu chuyển đổi định kỳ",
        "Nghiệm thu bàn giao và đồng hành bảo hành dài hạn",
      ],
    },
  ];

  return (
    <section className="section-block process-workflow-section">
      <div className="section-header">
        <span className="section-kicker">QUY TRÌNH CHUẨN MỰC</span>
        <h2 className="section-heading">Quy Trình Thực Hiện Dự Án</h2>
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
