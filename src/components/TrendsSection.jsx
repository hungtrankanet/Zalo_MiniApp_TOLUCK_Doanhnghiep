import React, { useState } from "react";

/**
 * TrendsSection Component - Góc Xu Hướng Tiếp Thị & Công Nghệ 2026-2028
 * Tích hợp hình ảnh thực tế và In-App Reader Modal
 * Strict rule: <= 500 lines
 */
export default function TrendsSection({ onNavigateTab }) {
  const [activeTrend, setActiveTrend] = useState(null);

  const trends = [
    {
      id: "vertical_saas",
      title: "Phần Mềm Chuyên Ngành (Vertical SaaS) 2027",
      category: "Công Nghệ & Nền Tảng",
      categoryColor: "blue",
      author: "Trần Kim Hưng • Founder & CTO",
      date: "20/10/2026",
      image: "./img/trend_vertical_saas.jpg",
      summary:
        "Vì sao các phần mềm 'all-in-one' cồng kềnh đang thoái trào và doanh nghiệp SME chuyển dịch sang giải pháp số may đo theo từng mắt xích quy trình nghiệp vụ.",
      fullContent: [
        "Giai đoạn 2026–2028 đánh dấu bước ngoặt căn bản của ngành công nghệ phần mềm doanh nghiệp: kỷ nguyên của các bộ công cụ 'all-in-one' cồng kềnh với hàng trăm tính năng đại trà đang chính thức thoái trào.",
        "Thay vào đó, mô hình Phần Mềm Chuyên Ngành (Vertical SaaS) — giải pháp số may đo chuyên sâu theo từng mắt xích quy trình của ngành nghề cụ thể — đang trở thành sự lựa chọn sống còn của các doanh nghiệp vừa và nhỏ (SME), chuỗi bán lẻ và sản xuất hiện đại.",
        "Điểm vượt trội của Vertical SaaS tại Việt Nam là sự tương thích quy trình (Product-Process Fit) ở mức gần như tuyệt đối, tích hợp tự nhiên với hóa đơn điện tử Thông tư 78, Zalo ZNS, tổng đài và thanh toán VietQR Napas 247.",
      ],
    },
    {
      id: "seat_license",
      title: "Bỏ Tính Tiền Theo User (Seat License): Bước Ngoặt 2027",
      category: "Mô Hình Kinh Doanh",
      categoryColor: "emerald",
      author: "TOLUCK Strategy Team",
      date: "22/10/2026",
      image: "./img/trend_seat_license.jpg",
      summary:
        "Mô hình tính tiền theo đầu người (per-seat) đang kìm hãm số hóa. Khám phá cách doanh nghiệp tiết kiệm 60% chi phí với Pay-per-Value và Consumption-based.",
      fullContent: [
        "Trong suốt 20 năm qua, mô hình định giá tính tiền theo tài khoản người dùng (Per-Seat Licensing) là tiêu chuẩn của ngành phần mềm. Thế nhưng bước sang năm 2027, mô hình này biến thành 'vòng kim cô' kìm hãm mở rộng.",
        "Doanh nghiệp càng tuyển thêm nhân viên thì hóa đơn phần mềm càng phình to, dẫn đến hiện tượng dùng chung tài khoản và rò rỉ dữ liệu.",
        "Làn sóng mới chuyển sang định giá theo giá trị mang lại (Pay-per-Value) và lượng tiêu thụ thực tế (Consumption-based), giúp mở rộng không giới hạn người dùng nội bộ mà chi phí vẫn tối ưu.",
      ],
    },
    {
      id: "ai_agent",
      title: "AI Agent Tự Động Hóa Vận Hành Doanh Nghiệp 24/7",
      category: "Trí Tuệ Nhân Tạo & n8n",
      categoryColor: "purple",
      author: "Ly Nguyễn • Automation Lead",
      date: "25/10/2026",
      image: "./img/trend_ai_agent.jpg",
      summary:
        "Kết hợp mô hình LLM với luồng dữ liệu tự động n8n: Tiếp nhận lead, phân loại trạng thái CRM và phản hồi tin nhắn Zalo tự động trong 5 giây.",
      fullContent: [
        "AI Agent thế hệ mới không dừng lại ở các chatbot trả lời câu hỏi mẫu đơn giản, mà trực tiếp kết nối với cơ sở dữ liệu và API nội bộ của doanh nghiệp.",
        "Khi khách hàng gửi yêu cầu qua Zalo Mini App hoặc Landing Page, hệ thống n8n kích hoạt AI Vision phân tích nhu cầu, đồng bộ ngay lập tức vào CRM và gửi thông báo nhắc lịch cho đội ngũ tư vấn.",
        "Giải pháp giúp doanh nghiệp không bỏ sót bất kỳ khách hàng tiềm năng nào, duy trì tốc độ phản hồi 24/7 ngay cả ngoài giờ hành chính.",
      ],
    },
    {
      id: "pdpd_compliance",
      title: "Tuân Thủ Nghị Định Bảo Vệ Dữ Liệu Cá Nhân (PDPL / NĐ 13)",
      category: "Bảo Mật & Pháp Lý Số",
      categoryColor: "amber",
      author: "Ban An Ninh Mạng TOLUCK",
      date: "28/10/2026",
      image: "./img/trend_pdpd_compliance.jpg",
      summary:
        "Chuẩn hóa quy trình thu thập dữ liệu khách hàng, lập hồ sơ đánh giá tác động DPIA và giải pháp mã hóa dữ liệu tránh bị xử phạt.",
      fullContent: [
        "Nghị định 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân (PDPL) đặt ra tiêu chuẩn khắt khe cho mọi doanh nghiệp có website và ứng dụng thu thập thông tin khách hàng.",
        "Doanh nghiệp cần xây dựng điều khoản rõ ràng, cơ chế đồng thuận của người dùng khi thu thập số điện thoại và áp dụng mã hóa lưu trữ đa lớp.",
        "TOLUCK hỗ trợ khách hàng chuẩn hóa kiến trúc cơ sở dữ liệu tách biệt, chống rò rỉ dữ liệu và hoàn thiện hồ sơ báo cáo an toàn thông tin theo chuẩn Bộ Công An.",
      ],
    },
    {
      id: "omnichannel_d2c",
      title: "Bán Lẻ Đa Kênh OMO & Trực Tuyến Hóa D2C Bền Vững",
      category: "Marketing Tăng Trưởng",
      categoryColor: "emerald",
      author: "Thuý Võ • Head of Growth",
      date: "01/11/2026",
      image: "./img/trend_omnichannel_d2c.jpg",
      summary:
        "Hợp nhất trải nghiệm Online-Merge-Offline, biến khách hàng vãng lai thành hội viên trung thành thông qua Zalo Mini App và thẻ thành viên số.",
      fullContent: [
        "Chi phí quảng cáo trên sàn thương mại điện tử và mạng xã hội ngày một đắt đỏ khiến mô hình bán lẻ trực tiếp tới người tiêu dùng (D2C) trở thành xu thế tất yếu.",
        "Bằng cách triển khai Zalo Mini App kết hợp điểm thưởng tích lũy (Loyalty Points), khách mua hàng tại cửa hàng vật lý được chuyển đổi thành tài sản số của doanh nghiệp.",
        "Doanh nghiệp trực tiếp sở hữu tệp khách hàng quen, gửi thông báo tái mua hàng hoàn toàn miễn phí mà không phụ thuộc vào thuật toán mạng xã hội.",
      ],
    },
    {
      id: "fractional_cmo_cto",
      title: "Mô Hình Thuê Ngoài Lãnh Đạo (Fractional CMO/CTO) Cho SME",
      category: "Chiến Lược Điều Hành",
      categoryColor: "blue",
      author: "TOLUCK Advisory Board",
      date: "04/11/2026",
      image: "./img/trend_fractional_cmo_cto.jpg",
      summary:
        "Sở hữu tư duy chiến lược của giám đốc tiếp thị & công nghệ cấp cao với chi phí linh hoạt chỉ bằng 1/5 so với tuyển dụng toàn thời gian.",
      fullContent: [
        "Đối với các doanh nghiệp vừa và nhỏ, việc trả mức lương 60–100 triệu/tháng cho một CMO hay CTO giàu kinh nghiệm là gánh nặng tài chính quá lớn.",
        "Mô hình Fractional Leadership (lãnh đạo thuê ngoài theo tỷ lệ thời gian) mang lại giải pháp hoàn hảo: Doanh nghiệp có chuyên gia hoạch định chiến lược và giám sát chất lượng thực thi hàng tuần.",
        "TOLUCK đóng vai trò là cánh tay đắc lực, vừa tư vấn chiến lược vừa có sẵn đội ngũ thực thi trọn gói, giải quyết dứt điểm tình trạng 'biết hướng đi nhưng thiếu người làm'.",
      ],
    },
  ];

  return (
    <section className="section-block trends-section">
      <div className="section-header">
        <span className="section-kicker">GÓC NHÌN &amp; XU HƯỚNG</span>
        <h2 className="section-heading">Góc Xu Hướng Chuyển Đổi Số 2026–2028</h2>
        <p className="section-desc">
          Các bài phân tích chuyên sâu từ đội ngũ chuyên gia chiến lược và công nghệ TOLUCK.
        </p>
      </div>

      <div className="trends-grid">
        {trends.map((item) => (
          <article
            key={item.id}
            className="trend-card"
            onClick={() => setActiveTrend(item)}
          >
            <div className="trend-img-box">
              <img
                src={item.image}
                alt={item.title}
                className="trend-thumb"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "./hero_banner.jpg";
                }}
              />
              <span className={`trend-cat-tag tag-${item.categoryColor}`}>
                {item.category}
              </span>
            </div>

            <div className="trend-content">
              <div className="trend-meta">
                <span>📅 {item.date}</span>
                <span>•</span>
                <span>{item.author}</span>
              </div>
              <h3 className="trend-title">{item.title}</h3>
              <p className="trend-summary">{item.summary}</p>
              
              <div className="trend-read-more">
                <span>Đọc bài phân tích ➔</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* In-App Reader Modal */}
      {activeTrend && (
        <div className="trend-modal-overlay" onClick={() => setActiveTrend(null)}>
          <div
            className="trend-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="trend-modal-top">
              <span className={`trend-cat-tag tag-${activeTrend.categoryColor}`}>
                {activeTrend.category}
              </span>
              <button
                type="button"
                className="trend-modal-close"
                onClick={() => setActiveTrend(null)}
              >
                ✕
              </button>
            </div>

            <div className="trend-modal-image-wrap">
              <img
                src={activeTrend.image}
                alt={activeTrend.title}
                className="trend-modal-hero"
              />
            </div>

            <div className="trend-modal-body">
              <div className="trend-meta mb-2">
                <span>📅 {activeTrend.date}</span>
                <span>•</span>
                <span>✍️ {activeTrend.author}</span>
              </div>
              <h2 className="trend-modal-heading">{activeTrend.title}</h2>
              
              <div className="trend-modal-text">
                {activeTrend.fullContent.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="trend-modal-cta-box">
                <div className="trend-modal-cta-title">Áp dụng giải pháp này cho doanh nghiệp của bạn?</div>
                <p className="trend-modal-cta-sub">Đội ngũ chuyên gia TOLUCK sẵn sàng tư vấn chi tiết trong 15 phút.</p>
                <button
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={() => {
                    setActiveTrend(null);
                    if (onNavigateTab) onNavigateTab("contact");
                  }}
                >
                  📞 Nhận Tư Vấn Chuyên Sâu Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
