import React from "react";
import { CONTACT_INFO } from "../config/api";

/**
 * TermsModal Component — Terms of Service Reader Modal
 * Strict rule: <= 500 lines
 */
export default function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content terms-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-cat-tag">QUY CHUẨN PHÁP LÝ &amp; BẢO MẬT</span>
          <button type="button" className="btn-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <h2 className="modal-title">Điều Khoản Sử Dụng Ứng Dụng Zalo Mini App</h2>
        <div className="modal-meta">
          <span>Phiên bản 1.0</span>
          <span>•</span>
          <span>Hiệu lực: 01/11/2026</span>
          <span>•</span>
          <span>Nghị định 13/2023/NĐ-CP</span>
        </div>

        <div className="modal-body-content terms-body-scroll">
          <section className="terms-sec">
            <h4 className="terms-h4">1. Đơn Vị Chủ Quản &amp; Phạm Vi</h4>
            <p className="terms-p">
              Ứng dụng Zalo Mini App <strong>TOLUCK</strong> (App ID: <strong>1216604827735341784</strong>) do{" "}
              <strong>TOLUCK Technology &amp; Marketing Ecosystem</strong> sở hữu và vận hành trên nền tảng Zalo.
            </p>
            <ul className="terms-ul">
              <li>Trụ sở: {CONTACT_INFO.address}</li>
              <li>Hotline: {CONTACT_INFO.hotlineDisplay}</li>
              <li>Email: {CONTACT_INFO.email}</li>
              <li>Website: {CONTACT_INFO.website}</li>
            </ul>
          </section>

          <section className="terms-sec">
            <h4 className="terms-h4">2. Chấp Thuận Điều Khoản</h4>
            <p className="terms-p">
              Bằng việc truy cập ứng dụng, cấp quyền định danh hoặc gửi biểu mẫu tư vấn, Quý khách xác nhận đồng ý với các Điều khoản này cùng Chính sách bảo mật dữ liệu của TOLUCK.
            </p>
          </section>

          <section className="terms-sec">
            <h4 className="terms-h4">3. Dịch Vụ Cung Cấp</h4>
            <p className="terms-p">
              Ứng dụng cung cấp cổng tra cứu thông tin dịch vụ (Branding, Website &gt;10K CCU, Tiếp thị số, n8n Automation), tham khảo dự án tiêu biểu, tin tức chuyên môn và đặt lịch tư vấn chiến lược 1:1.
            </p>
          </section>

          <section className="terms-sec">
            <h4 className="terms-h4">4. Bảo Vệ Dữ Liệu &amp; Thu Hồi Quyền (Revoke Consent)</h4>
            <p className="terms-p">
              Tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân:
            </p>
            <ul className="terms-ul">
              <li>Dữ liệu thu thập: Mã định danh Zalo (User ID), tên hiển thị và thông tin liên hệ khi người dùng cho phép.</li>
              <li>Mục đích: Tư vấn và cung cấp giải pháp chuyển đổi số theo đúng nhu cầu yêu cầu.</li>
              <li><strong>Quyền thu hồi (Revoke Consent):</strong> Quý khách có thể thu hồi quyền bất cứ lúc nào qua Cài đặt Zalo. Hệ thống Webhook tự động cập nhật trạng thái ngắt kết nối và ngừng xử lý dữ liệu ngay lập tức.</li>
              <li>Tuyệt đối không mua bán hay cung cấp thông tin người dùng cho bên thứ ba.</li>
            </ul>
          </section>

          <section className="terms-sec">
            <h4 className="terms-h4">5. Quyền Sở Hữu Trí Tuệ</h4>
            <p className="terms-p">
              Nhãn hiệu, logo biểu tượng T, giao diện, mã nguồn và nội dung tài nguyên số trên ứng dụng thuộc quyền sở hữu trí tuệ của TOLUCK. Nghiêm cấm mọi hành vi sao chép trái phép.
            </p>
          </section>

          <section className="terms-sec">
            <h4 className="terms-h4">6. Luật Điều Chỉnh &amp; Giải Quyết Tranh Chấp</h4>
            <p className="terms-p">
              Điều khoản này tuân thủ theo pháp luật Việt Nam. Mọi tranh chấp phát sinh được ưu tiên giải quyết qua thương lượng hòa giải hoặc Tòa án nhân dân có thẩm quyền tại TP. Hồ Chí Minh.
            </p>
          </section>
        </div>

        <div className="modal-footer">
          <a
            href="https://toluck.vn/dieu-khoan-su-dung"
            target="_blank"
            rel="noreferrer"
            className="btn-view-web"
          >
            Xem Bản Đầy Đủ Trên Web →
          </a>
          <button type="button" className="btn-close-modal" onClick={onClose}>
            Đã Hiểu &amp; Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
