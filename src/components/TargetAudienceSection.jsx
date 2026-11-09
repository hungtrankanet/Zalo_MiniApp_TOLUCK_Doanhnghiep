import React from "react";

/**
 * TargetAudienceSection Component - Đối Tượng Khách Hàng Tiềm Năng
 * Phân tích 4 nhóm doanh nghiệp phù hợp nhất với TOLUCK
 * Strict rule: <= 500 lines
 */
export default function TargetAudienceSection({ onNavigateTab }) {
  const audiences = [
    {
      id: "sme",
      icon: "🏢",
      title: "Doanh Nghiệp Vừa & Nhỏ (SME)",
      tag: "Tiết Kiệm 40% Chi Phí",
      desc: "Chưa có phòng Marketing & IT riêng hoặc bộ máy cồng kềnh, cần một đội ngũ thực chiến trọn gói đồng hành dài hạn với chi phí tối ưu.",
      painPoint: "Thiếu nhân sự chuyên môn • Khó kiểm soát hiệu quả",
      solution: "Đội ngũ chuyên gia đầy đủ vai trò vận hành như phòng ban nội bộ.",
    },
    {
      id: "retail",
      icon: "🛍️",
      title: "Chuỗi Bán Lẻ, Thời Trang & F&B",
      tag: "Chuyển Đổi Đa Kênh OMO",
      desc: "Sở hữu cửa hàng vật lý nhưng chưa tối ưu kênh online, cần mở rộng bán lẻ trực tiếp (D2C) qua Zalo Mini App và hệ thống khách hàng trung thành.",
      painPoint: "Khách vãng lai không quay lại • Chi phí quảng cáo sàn tăng",
      solution: "Xây dựng tệp khách quen qua Thẻ VIP số & Zalo ZNS chăm sóc tự động.",
    },
    {
      id: "manufacture",
      icon: "🏭",
      title: "Doanh Nghiệp Sản Xuất & Xuất Khẩu",
      tag: "Số Hóa Chuỗi Cung Ứng",
      desc: "Cần nâng tầm nhận diện thương hiệu chuẩn quốc tế, số hóa quy trình tiếp nhận đơn hàng, truy xuất bao bì bằng QR Code và hồ sơ năng lực B2B.",
      painPoint: "Quy trình thủ công • Nhận diện chưa đủ sức cạnh tranh",
      solution: "Hồ sơ năng lực điện tử độc bản & Tự động hóa luồng đơn hàng.",
    },
    {
      id: "startup",
      icon: "🚀",
      title: "Nhà Sáng Lập & Khởi Nghiệp Tốc Độ",
      tag: "Ra Mắt Trong 2-4 Tuần",
      desc: "Cần đưa sản phẩm công nghệ hoặc dịch vụ ra thị trường thần tốc, thử nghiệm kênh tiếp thị số với ngân sách linh hoạt và đo lường tức thì.",
      painPoint: "Thời gian gấp rút • Cần vừa chiến lược vừa thực thi",
      solution: "Đóng gói giải pháp Landing Page, Ads & CRM trọn gói theo sprint.",
    },
  ];

  return (
    <section className="section-block target-audience-section">
      <div className="section-header">
        <span className="section-kicker">ĐỐI TƯỢNG PHÙ HỢP</span>
        <h2 className="section-heading">TOLUCK Đồng Hành Cùng Ai?</h2>
        <p className="section-desc">
          Giải pháp của chúng tôi được may đo chuyên sâu cho từng mô hình và giai đoạn phát triển của doanh nghiệp.
        </p>
      </div>

      <div className="audience-grid">
        {audiences.map((item) => (
          <div key={item.id} className="audience-card">
            <div className="audience-card-top">
              <span className="audience-icon">{item.icon}</span>
              <span className="audience-tag">{item.tag}</span>
            </div>

            <h3 className="audience-title">{item.title}</h3>
            <p className="audience-desc">{item.desc}</p>

            <div className="audience-points">
              <div className="point-row pain">
                <span className="point-label">Điểm nghẽn:</span>
                <span className="point-text">{item.painPoint}</span>
              </div>
              <div className="point-row sol">
                <span className="point-label">TOLUCK xử lý:</span>
                <span className="point-text">{item.solution}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="audience-action-box">
        <div className="audience-action-text">Doanh nghiệp bạn có thuộc nhóm trên?</div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => {
            if (onNavigateTab) onNavigateTab("contact");
          }}
        >
          📞 Đặt Lịch Khám Bệnh Doanh Nghiệp Miễn Phí
        </button>
      </div>
    </section>
  );
}
