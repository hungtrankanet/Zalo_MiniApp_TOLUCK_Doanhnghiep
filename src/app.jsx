import React, { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    need: "marketing_package",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert("Vui lòng điền đầy đủ họ tên và số điện thoại.");
      return;
    }
    setSubmitted(true);
  };

  const services = [
    {
      icon: "💼",
      name: "Marketing Thuê Ngoài",
      desc: "Trọn gói phòng Marketing cho doanh nghiệp SME.",
    },
    {
      icon: "✉️",
      name: "Email Marketing",
      desc: "Chiến dịch tự động qua Brevo & Mailgun API.",
    },
    {
      icon: "🤖",
      name: "AI Vision & CRM",
      desc: "Quét danh thiếp OCR và chấm điểm Lead tự động.",
    },
    {
      icon: "🔄",
      name: "n8n Automation",
      desc: "Đồng bộ đa kênh & tự động hóa cuộc gọi CSKH.",
    },
  ];

  return (
    <div className="mini-app-container">
      {/* Header Banner */}
      <div className="hero-card">
        <span className="hero-badge">TOLUCK ECOSYSTEM</span>
        <h1 className="hero-title">Phòng Marketing Thuê Ngoài Toàn Diện</h1>
        <p className="hero-desc">
          Giải pháp tăng trưởng doanh thu & số hóa tự động dành riêng cho doanh nghiệp SME Việt Nam.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-value">300+</div>
          <div className="stat-label">Chiến dịch</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">98%</div>
          <div className="stat-label">Hài lòng</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">10x</div>
          <div className="stat-label">Tăng trưởng</div>
        </div>
      </div>

      {/* Services Section */}
      <div className="section-header">
        <h2 className="section-title">Dịch Vụ Nổi Bật</h2>
        <span className="section-subtitle">Chuẩn hóa & Tối ưu</span>
      </div>

      <div className="service-grid">
        {services.map((item, idx) => (
          <div key={idx} className="service-card">
            <div className="service-icon">{item.icon}</div>
            <h3 className="service-name">{item.name}</h3>
            <p className="service-detail">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Consultation Form */}
      <div className="section-header">
        <h2 className="section-title">Đăng Ký Tư Vấn 1:1</h2>
        <span className="section-subtitle">Chuyên gia phản hồi sau 15 phút</span>
      </div>

      <div className="form-card">
        {submitted ? (
          <div className="success-alert">
            <strong>✅ Gửi yêu cầu thành công!</strong>
            <p style={{ marginTop: 4 }}>
              Cảm ơn {formData.fullName}. Chuyên viên tư vấn TOLUCK sẽ liên hệ lại qua số điện thoại{" "}
              {formData.phone} trong thời gian sớm nhất.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Họ và tên đại diện *</label>
              <input
                type="text"
                className="form-input"
                placeholder="VD: Nguyễn Văn A"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Số điện thoại Zalo *</label>
              <input
                type="tel"
                className="form-input"
                placeholder="VD: 0912 345 678"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Dịch vụ quan tâm</label>
              <select
                className="form-input"
                value={formData.need}
                onChange={(e) =>
                  setFormData({ ...formData, need: e.target.value })
                }
              >
                <option value="marketing_package">
                  Phòng Marketing Thuê Ngoài trọn gói
                </option>
                <option value="email_automation">
                  Email Marketing SAAS & Auto Webhook
                </option>
                <option value="ai_crm">AI Vision OCR & Quản trị Lead CRM</option>
                <option value="custom_consulting">
                  Tư vấn lộ trình chuyển đổi số tổng thể
                </option>
              </select>
            </div>
            <button type="submit" className="btn-submit">
              Nhận Tư Vấn Miễn Phí
            </button>
          </form>
        )}
      </div>

      {/* Footer Info */}
      <div className="footer-info">
        <p><strong>TOLUCK Marketing & Technology</strong></p>
        <p>Hotline: 0938 123 456 | Email: contact@toluck.vn</p>
        <p style={{ marginTop: 4 }}>
          Website: <a href="https://toluck.vn" target="_blank" rel="noreferrer">toluck.vn</a>
        </p>
      </div>
    </div>
  );
}
