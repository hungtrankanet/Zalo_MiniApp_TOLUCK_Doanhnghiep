import React, { useState, useEffect } from "react";
import { PARTNERS_DATA } from "../data/partnersData";
import { fetchPartnerLogos } from "../config/api";
import PartnerLogoMark from "./PartnerLogoMark";

/**
 * CommunityTab Component - Chỉ Show Danh Sách Đối Tác & Khách Hàng TOLUCK
 * Lấy logo từ Backend và tích hợp chế độ "Khách Hàng Cổng Thu" kèm nút "Chuyển đến Trang riêng"
 * Strict rule: <= 500 lines
 */
export default function CommunityTab({ onNavigateTab }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [portalNoticePartner, setPortalNoticePartner] = useState(null);
  const [partnersList, setPartnersList] = useState(PARTNERS_DATA);

  useEffect(() => {
    let isMounted = true;
    fetchPartnerLogos().then((backendLogos) => {
      if (!isMounted || !Array.isArray(backendLogos) || backendLogos.length === 0) return;

      const normalized = backendLogos.map((item) => ({
        ...item,
        id: item.id || `p-${Math.random()}`,
        name: item.name || item.title || "Đối Tác",
        shortName: item.short_name || item.shortName || item.title || item.name,
        category: item.category || "Đối Tác & Khách Hàng",
        type: item.type || "client",
        typeLabel: item.type_label || item.typeLabel || "Khách Hàng Doanh Nghiệp",
        image_url: item.image_url,
        isPortalClient: !!(item.is_portal || item.isPortalClient),
        portalUrl: item.portal_url || item.portalUrl,
        logoColor: item.logo_color || item.logoColor || "#059669",
        accentBg: item.accentBg || "rgba(5, 150, 105, 0.08)",
        highlight: item.highlight || "Thương Hiệu Đồng Hành",
        desc: item.desc || "Đối tác & khách hàng trong hệ sinh thái tăng trưởng doanh nghiệp TOLUCK.",
        collaboration: item.collaboration || "Hợp tác phát triển giải pháp tiếp thị và ứng dụng công nghệ số.",
        year: item.year || "2024 - 2026",
        badge: item.badge || "Đối Tác Xác Thực",
      }));

      setPartnersList(normalized);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPartners = partnersList.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "portal") return item.isPortalClient;
    if (activeFilter === "strategic") return item.type === "strategic";
    if (activeFilter === "client") return item.type === "client";
    if (activeFilter === "tech") return item.type === "tech";
    return true;
  });

  return (
    <div className="tab-page community-tab">
      {/* Header Banner */}
      <section className="community-hero">
        <div className="community-badge">
          <span className="pulse-dot" />
          <span>HỆ SINH THÁI DOANH NGHIỆP TOLUCK</span>
        </div>
        <h1 className="community-title">
          Cộng Đồng Đối Tác &amp; Khách Hàng<br />
          <span className="text-gradient">Kết Nối B2B • Tăng Trưởng Bền Vững</span>
        </h1>
        <p className="community-subtitle">
          Danh bạ đối tác chiến lược, khách hàng tiêu biểu và các thương hiệu trong hệ sinh thái đồng hành cùng TOLUCK.
        </p>

        {/* 3 Metric Cards */}
        <div className="community-stats-grid">
          <div className="community-stat-card">
            <div className="community-stat-num">200+</div>
            <div className="community-stat-label">Doanh Nghiệp Hội Viên</div>
          </div>
          <div className="community-stat-card">
            <div className="community-stat-num">15+</div>
            <div className="community-stat-label">Ngành Hàng Kết Nối</div>
          </div>
          <div className="community-stat-card">
            <div className="community-stat-num">100%</div>
            <div className="community-stat-label">Doanh Nghiệp Xác Thực</div>
          </div>
        </div>
      </section>

      {/* Directory of Partners & Clients */}
      <section className="section-block">
        <div className="section-header">
          <span className="section-kicker">MẠNG LƯỚI KẾT NỐI</span>
          <h2 className="section-heading">Danh Sách Đối Tác &amp; Khách Hàng</h2>
          <p className="section-desc">
            Chạm vào từng thương hiệu để xem chi tiết năng lực và cơ hội hợp tác kinh doanh.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="community-filter-bar">
          <button
            type="button"
            className={`filter-chip ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            Tất Cả ({partnersList.length})
          </button>
          <button
            type="button"
            className={`filter-chip ${activeFilter === "portal" ? "active" : ""}`}
            onClick={() => setActiveFilter("portal")}
          >
            💎 Khách Hàng Cổng Thu ({partnersList.filter((p) => p.isPortalClient).length})
          </button>
          <button
            type="button"
            className={`filter-chip ${activeFilter === "strategic" ? "active" : ""}`}
            onClick={() => setActiveFilter("strategic")}
          >
            Đối Tác Chiến Lược
          </button>
          <button
            type="button"
            className={`filter-chip ${activeFilter === "client" ? "active" : ""}`}
            onClick={() => setActiveFilter("client")}
          >
            Khách Hàng Doanh Nghiệp
          </button>
          <button
            type="button"
            className={`filter-chip ${activeFilter === "tech" ? "active" : ""}`}
            onClick={() => setActiveFilter("tech")}
          >
            Công Nghệ &amp; Platform
          </button>
        </div>

        {/* Member Cards Grid */}
        <div className="community-cards-grid">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className={`member-card ${partner.isPortalClient ? "member-portal-highlight" : ""}`}
              onClick={() => setSelectedPartner(partner)}
            >
              <div className="member-card-header">
                <PartnerLogoMark partner={partner} size={48} />
                <div className="member-info">
                  <div className="member-badge-row">
                    <span className="member-type-tag">{partner.typeLabel}</span>
                    {partner.isPortalClient && (
                      <span className="portal-client-badge">💎 Cổng Thu</span>
                    )}
                    <span className="member-year">{partner.year}</span>
                  </div>
                  <h3 className="member-name">{partner.name}</h3>
                  <div className="member-cat">{partner.category}</div>
                </div>
              </div>

              <div className="member-card-body">
                <div className="member-highlight">
                  ★ {partner.highlight}
                </div>
                <p className="member-desc">{partner.desc}</p>
              </div>

              <div className="member-card-footer">
                <span className="member-collab-text">
                  <strong>Đồng hành:</strong> {partner.collaboration}
                </span>

                {/* Nút "Chuyển đến Trang riêng" dành cho Khách hàng Cổng thu */}
                {partner.isPortalClient ? (
                  <button
                    type="button"
                    className="btn-portal-redirect"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (partner.portalTab && onNavigateTab) {
                        onNavigateTab(partner.portalTab);
                      } else {
                        setPortalNoticePartner(partner);
                      }
                    }}
                  >
                    <span>🌐 Chuyển đến Trang riêng ➔</span>
                  </button>
                ) : (
                  <span className="member-action-link">Chi tiết hợp tác ➔</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partner Detail Modal */}
      {selectedPartner && (
        <div className="trend-modal-overlay" onClick={() => setSelectedPartner(null)}>
          <div className="trend-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="trend-modal-top">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <PartnerLogoMark partner={selectedPartner} size={36} />
                <span className="member-type-tag">{selectedPartner.typeLabel}</span>
                {selectedPartner.isPortalClient && (
                  <span className="portal-client-badge">💎 Khách Hàng Cổng Thu</span>
                )}
              </div>
              <button
                type="button"
                className="trend-modal-close"
                onClick={() => setSelectedPartner(null)}
              >
                ✕
              </button>
            </div>

            <div className="trend-modal-body">
              <h2 className="trend-modal-heading" style={{ marginBottom: "6px" }}>
                {selectedPartner.name}
              </h2>
              <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "14px" }}>
                Ngành hàng: <strong>{selectedPartner.category}</strong> • Giai đoạn: <strong>{selectedPartner.year}</strong>
              </div>

              <div className="case-metric text-emerald" style={{ fontSize: "14px", marginBottom: "14px" }}>
                ★ Chỉ số nổi bật: {selectedPartner.highlight}
              </div>

              <div className="trend-modal-text">
                <p><strong>Về thương hiệu:</strong> {selectedPartner.desc}</p>
                <p><strong>Giá trị đồng hành cùng TOLUCK:</strong> {selectedPartner.collaboration}</p>
              </div>

              {selectedPartner.isPortalClient && (
                <div className="portal-client-info-box">
                  <div className="portal-info-title">💎 Doanh Nghiệp Có Cổng Thu Riêng</div>
                  <p className="portal-info-desc">
                    Hệ thống trang riêng và cổng thu trực tiếp cho {selectedPartner.name} đang được kích hoạt.
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary w-full"
                    style={{ marginTop: "10px" }}
                    onClick={() => {
                      const p = selectedPartner;
                      setSelectedPartner(null);
                      if (p?.portalTab && onNavigateTab) {
                        onNavigateTab(p.portalTab);
                      } else {
                        setPortalNoticePartner(p);
                      }
                    }}
                  >
                    🌐 Xem Trang Riêng &amp; Cổng Thu ➔
                  </button>
                </div>
              )}

              <div className="trend-modal-cta-box">
                <div className="trend-modal-cta-title">Bạn muốn kết nối giao thương cùng đối tác này?</div>
                <p className="trend-modal-cta-sub">TOLUCK hỗ trợ kết nối B2B trực tiếp giữa các doanh nghiệp thành viên.</p>
                <button
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={() => {
                    setSelectedPartner(null);
                    if (onNavigateTab) onNavigateTab("contact");
                  }}
                >
                  🤝 Yêu Cầu Kết Nối Giao Thương
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Thông Báo Trang Riêng Cổng Thu (Chuẩn bị sắp tới) */}
      {portalNoticePartner && (
        <div className="trend-modal-overlay" onClick={() => setPortalNoticePartner(null)}>
          <div className="trend-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="trend-modal-top">
              <span className="portal-client-badge">💎 CỔNG THU &amp; TRANG RIÊNG</span>
              <button
                type="button"
                className="trend-modal-close"
                onClick={() => setPortalNoticePartner(null)}
              >
                ✕
              </button>
            </div>

            <div className="trend-modal-body text-center" style={{ textAlign: "center", padding: "24px 20px" }}>
              <div style={{ margin: "0 auto 14px", display: "inline-block" }}>
                <PartnerLogoMark partner={portalNoticePartner} size={64} />
              </div>
              <h2 className="trend-modal-heading" style={{ marginBottom: "8px" }}>
                {portalNoticePartner.name}
              </h2>
              <div className="portal-badge-banner">
                🌐 Chế độ: Khách Hàng Cổng Thu Đang Kích Hoạt
              </div>
              <p style={{ fontSize: "13.5px", color: "#475569", lineHeight: 1.6, margin: "16px 0" }}>
                Tính năng <strong>"Trang Riêng &amp; Cổng Thu Doanh Nghiệp"</strong> dành riêng cho đối tác <strong>{portalNoticePartner.name}</strong> đang được đội ngũ kỹ sư TOLUCK hoàn thiện và sẽ chính thức phát hành trong phiên bản nâng cấp tiếp theo!
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                <button
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={() => {
                    setPortalNoticePartner(null);
                    if (onNavigateTab) onNavigateTab("contact");
                  }}
                >
                  📞 Đăng Ký Cổng Thu Cho Doanh Nghiệp Bạn
                </button>
                <button
                  type="button"
                  className="btn btn-secondary w-full"
                  onClick={() => setPortalNoticePartner(null)}
                >
                  Đóng Thông Báo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Join Community CTA Banner */}
      <section className="section-block">
        <div className="partners-cta-strip">
          <div className="partners-cta-title">Doanh Nghiệp Của Bạn Muốn Tham Gia Hệ Sinh Thái?</div>
          <p className="partners-cta-desc">
            Trở thành đối tác chiến lược hoặc khách hàng cổng thu của TOLUCK để mở rộng giao thương B2B chéo.
          </p>
          <button
            type="button"
            className="btn-community-join"
            onClick={() => {
              if (onNavigateTab) onNavigateTab("contact");
            }}
          >
            <span>🤝 Đăng Ký Tham Gia Mạng Lưới ➔</span>
          </button>
        </div>
      </section>
    </div>
  );
}
