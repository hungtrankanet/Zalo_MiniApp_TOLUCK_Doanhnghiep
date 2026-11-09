import React, { useState, useEffect } from "react";
import { fetchTestimonials, FALLBACK_TESTIMONIALS } from "../config/api";

/**
 * TestimonialsSection Component - Khách Hàng Nói Gì Về Chúng Tôi
 * Đồng bộ cùng website TOLUCK và nạp dữ liệu từ Backend REST API
 * Strict rule: <= 500 lines
 */
export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);

  useEffect(() => {
    let isMounted = true;
    fetchTestimonials().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        setTestimonials(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

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
                style={{ backgroundColor: item.avatar_bg || item.avatarBg || "#2563eb" }}
              >
                {item.avatar || item.name.charAt(0)}
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
