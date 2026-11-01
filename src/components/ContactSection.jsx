import React, { useState } from "react";
import { CONTACT_INFO, submitConsultation } from "../config/api";

/**
 * ContactSection Component - Contact Info & Consultation Form
 * Strict rule: <= 500 lines
 */
export default function ContactSection({ selectedService, formRef }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    service_name: selectedService || "Phòng Marketing Thuê Ngoài trọn gói",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("Vui lòng điền họ tên và số điện thoại liên hệ.");
      return;
    }

    setSubmitting(true);
    const res = await submitConsultation(formData);
    setSubmitting(false);
    setResult(res);
  };

  return (
    <section className="section-block bg-subtle" ref={formRef} id="contact-section">
      <div className="section-title-wrap">
        <span className="section-kicker">KẾT NỐI CHUYÊN GIA 24/7</span>
        <h2 className="section-heading">Thông Tin Liên Hệ &amp; Đặt Lịch Tư Vấn</h2>
        <p className="section-lead">
          Đội ngũ chuyên viên TOLUCK sẵn sàng đồng hành cùng sự tăng trưởng của doanh nghiệp bạn.
        </p>
      </div>

      {/* Official Headquarters Card */}
      <div className="contact-cards-wrap">
        <div className="contact-item-card">
          <div className="contact-icon bg-emerald">🏢</div>
          <div className="contact-info-text">
            <div className="contact-label">Trụ Sở Chính</div>
            <div className="contact-val">{CONTACT_INFO.address}</div>
          </div>
        </div>

        <div className="contact-item-card">
          <div className="contact-icon bg-blue">📞</div>
          <div className="contact-info-text">
            <div className="contact-label">Hotline &amp; Zalo Tiếp Nhận</div>
            <a href={`tel:${CONTACT_INFO.hotline}`} className="contact-val text-blue font-bold">
              {CONTACT_INFO.hotlineDisplay}
            </a>
          </div>
        </div>

        <div className="contact-item-card">
          <div className="contact-icon bg-emerald">✉️</div>
          <div className="contact-info-text">
            <div className="contact-label">Hộp Thư Điện Tử</div>
            <a href={`mailto:${CONTACT_INFO.email}`} className="contact-val text-emerald font-bold">
              {CONTACT_INFO.email}
            </a>
          </div>
        </div>

        <div className="contact-item-card">
          <div className="contact-icon bg-blue">🌐</div>
          <div className="contact-info-text">
            <div className="contact-label">Cổng Thông Tin Trực Tuyến</div>
            <a href={CONTACT_INFO.website} target="_blank" rel="noreferrer" className="contact-val font-bold">
              toluck.vn
            </a>
          </div>
        </div>
      </div>

      {/* Quick Action Button Row */}
      <div className="quick-actions-bar">
        <a href={`tel:${CONTACT_INFO.hotline}`} className="action-btn action-call">
          <span>📞 Gọi Ngay</span>
        </a>
        <a href={CONTACT_INFO.zaloUrl} target="_blank" rel="noreferrer" className="action-btn action-zalo">
          <span>💬 Nhắn Zalo</span>
        </a>
        <a href={`mailto:${CONTACT_INFO.email}`} className="action-btn action-email">
          <span>✉️ Gửi Email</span>
        </a>
      </div>

      {/* 1:1 Consultation Booking Form */}
      <div className="consult-form-box">
        <div className="form-head">
          <h3 className="form-head-title">Đăng Ký Tư Vấn Chiến Lược 1:1</h3>
          <p className="form-head-sub">Chuyên viên liên hệ phân tích nhu cầu trong vòng 15-30 phút</p>
        </div>

        {result ? (
          <div className="form-success-alert">
            <div className="success-icon">✅</div>
            <h4 className="success-title">Tiếp nhận yêu cầu thành công!</h4>
            <p className="success-msg">
              Cảm ơn Quý khách <strong>{formData.name}</strong>. TOLUCK đã lưu thông tin và sẽ gọi đến số{" "}
              <strong>{formData.phone}</strong> sớm nhất.
            </p>
            <button
              type="button"
              className="btn-send-another"
              onClick={() => setResult(null)}
            >
              Gửi thêm yêu cầu khác
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="input-row">
              <div className="input-group">
                <label className="input-label">Họ và tên đại diện *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Nguyễn Văn A"
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Số điện thoại / Zalo *</label>
                <input
                  type="tel"
                  required
                  placeholder="VD: 0963 484 365"
                  className="input-field"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label className="input-label">Tên doanh nghiệp</label>
                <input
                  type="text"
                  placeholder="VD: Công ty TNHH..."
                  className="input-field"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Dịch vụ quan tâm</label>
                <select
                  className="input-field"
                  value={formData.service_name}
                  onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
                >
                  <option value="Phòng Marketing Thuê Ngoài trọn gói">
                    Phòng Marketing Thuê Ngoài trọn gói
                  </option>
                  <option value="Thiết Kế Website Chịu Tải >10K CCU">
                    Thiết Kế Website Chịu Tải &gt;10K CCU
                  </option>
                  <option value="Quản Trị Social & Quảng Cáo Đa Kênh">
                    Quản Trị Social &amp; Quảng Cáo Đa Kênh
                  </option>
                  <option value="Tự Động Hóa n8n & Email SAAS">
                    Tự Động Hóa n8n &amp; Email SAAS
                  </option>
                  <option value="Branding & Nhận Diện Bản Sắc">
                    Branding &amp; Nhận Diện Bản Sắc
                  </option>
                </select>
              </div>
            </div>

            <div className="input-group full-width">
              <label className="input-label">Nhu cầu hoặc mục tiêu cụ thể</label>
              <textarea
                rows="3"
                placeholder="Mô tả mục tiêu doanh số, số lượng nhân sự hoặc hiện trạng marketing của bạn..."
                className="input-field textarea-field"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-submit-consult"
            >
              {submitting ? "Đang gửi thông tin..." : "Gửi Yêu Cầu Tư Vấn Ngay"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
