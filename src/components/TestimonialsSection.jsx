import React, { useState } from "react";

/**
 * TestimonialsSection Component - Khách Hàng Nói Gì Về Chúng Tôi
 * Lời chứng thực thực tế từ các CEO/Chủ tịch thương hiệu đối tác
 * Strict rule: <= 500 lines
 */
export default function TestimonialsSection() {
  const testimonials = [
    {
      id: "vsports",
      name: "Anh Hoàng Nam",
      role: "Co-Founder & Giám Đốc Công Nghệ",
      company: "VSports Platform",
      avatarBg: "#059669",
      rating: 5,
      highlight: "Chịu tải >250K CCU xuất sắc",
      quote:
        "Kiến trúc microservices của TOLUCK chịu tải vượt bậc trong các giải đấu lớn. Hơn 250.000 người dùng truy cập và xem livestream cùng lúc mà hệ thống vẫn chạy mượt mà không hề gián đoạn.",
    },
    {
      id: "suntrans",
      name: "Ông Trần Long",
      role: "Chủ Tịch & Tổng Giám Đốc",
      company: "SunTrans Logistics",
      avatarBg: "#2563eb",
      rating: 5,
      highlight: "Kết nối 500+ đối tác quốc tế",
      quote:
        "Hệ thống website và cổng tra cứu vận đơn số mà TOLUCK xây dựng đã giúp SunTrans kết nối thông suốt chuỗi cung ứng quốc tế. Đội ngũ làm việc tận tâm và giải quyết triệt để bài toán doanh nghiệp.",
    },
    {
      id: "wlin",
      name: "Bà Thu Hương",
      role: "Chủ Tịch Sáng Lập",
      company: "WLIN Global Network",
      avatarBg: "#e11d48",
      rating: 5,
      highlight: "Nhận diện thương hiệu độc bản",
      quote:
        "TOLUCK đã nâng tầm toàn diện bộ nhận diện số và truyền thông các sự kiện vinh danh của chúng tôi. Tính thẩm mỹ cao, tốc độ xử lý nhanh và phong cách làm việc đẳng cấp quốc tế.",
    },
    {
      id: "tuibao",
      name: "Ông Đỗ Minh",
      role: "Giám Đốc Điều Hành",
      company: "Tuibao Packaging",
      avatarBg: "#047857",
      rating: 5,
      highlight: "+68% Tỷ lệ chuyển đổi đơn hàng",
      quote:
        "Giải pháp số hóa tiếp nhận đơn hàng qua QR Code giúp nhà máy tăng 68% tỷ lệ chốt đơn và loại bỏ hoàn toàn sai sót thất lạc. TOLUCK thực sự là phòng công nghệ thuê ngoài số 1.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section-block testimonials-section">
      <div className="section-header">
        <span className="section-kicker">TÍN NHIỆM THỰC TẾ</span>
        <h2 className="section-heading">Khách Hàng Nói Gì Về Chúng Tôi</h2>
        <p className="section-desc">
          Niềm tin của các nhà lãnh đạo doanh nghiệp là thước đo giá trị cao nhất cho sự tận tâm của TOLUCK.
        </p>
      </div>

      <div className="testimonials-cards-list">
        {testimonials.map((item, idx) => (
          <div key={item.id} className="testimonial-card">
            <div className="testimonial-top">
              <div
                className="testimonial-avatar"
                style={{ backgroundColor: item.avatarBg }}
              >
                {item.name.charAt(0)}
              </div>
              <div className="testimonial-author-info">
                <h4 className="author-name">{item.name}</h4>
                <div className="author-role">{item.role}</div>
                <div className="author-company">{item.company}</div>
              </div>
              <div className="testimonial-stars">{"★".repeat(item.rating)}</div>
            </div>

            <div className="testimonial-highlight-tag">
              🎯 {item.highlight}
            </div>

            <p className="testimonial-quote">"{item.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
