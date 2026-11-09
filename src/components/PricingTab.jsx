import React, { useState, useMemo } from "react";
import { SERVICES_2026, SERVICE_PILLARS } from "../data/servicesData2026";

/**
 * PricingTab Component - 28 Dịch Vụ TOLUCK 2026 (Accordion Format)
 * Strict rule: <= 500 lines
 */
export default function PricingTab({ onSelectForQuote }) {
  const [activePillar, setActivePillar] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState("dm-01"); // Default open first item

  // Filter services by pillar and search term
  const filteredServices = useMemo(() => {
    return SERVICES_2026.filter((service) => {
      const matchPillar =
        activePillar === "all" || service.pillar === activePillar;
      const matchQuery =
        !searchQuery.trim() ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.deliverables.some((d) =>
          d.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchPillar && matchQuery;
    });
  }, [activePillar, searchQuery]);

  const toggleAccordion = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="tab-page pricing-tab">
      {/* Header Title */}
      <div className="page-header">
        <span className="section-kicker">HỒ SƠ NĂNG LỰC & BÁO GIÁ 2026</span>
        <h1 className="page-title">28 Dịch Vụ Chuyên Nghiệp</h1>
        <p className="page-desc">
          Bảng giá niêm yết minh bạch, cam kết KPI chuyển đổi và tối ưu ngân sách tối đa cho doanh nghiệp.
        </p>
      </div>

      {/* Search Bar */}
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Tìm dịch vụ (Logo, Website, Fanpage, n8n, CRM...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => setSearchQuery("")}
          >
            ✕
          </button>
        )}
      </div>

      {/* Pillar Filter Pills */}
      <div className="pillar-filter-bar">
        {SERVICE_PILLARS.map((p) => {
          const isActive = activePillar === p.id;
          return (
            <button
              key={p.id}
              type="button"
              className={`pillar-chip ${isActive ? "active" : ""}`}
              onClick={() => setActivePillar(p.id)}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      {/* Accordion Service List */}
      <div className="accordion-list">
        {filteredServices.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🔎</span>
            <p className="empty-text">Không tìm thấy dịch vụ phù hợp với từ khóa.</p>
            <button
              type="button"
              className="btn btn-outline-sm"
              onClick={() => {
                setSearchQuery("");
                setActivePillar("all");
              }}
            >
              Xem tất cả dịch vụ
            </button>
          </div>
        ) : (
          filteredServices.map((service, index) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                className={`accordion-item ${isExpanded ? "expanded" : ""}`}
              >
                {/* Header Row */}
                <div
                  className="accordion-header"
                  onClick={() => toggleAccordion(service.id)}
                >
                  <div className="accordion-meta">
                    <span className="service-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="service-info">
                      <div className="service-title-row">
                        <span className="service-title">{service.name}</span>
                        {service.badge && (
                          <span className="service-badge">{service.badge}</span>
                        )}
                      </div>
                      <div className="service-price-tag">
                        {service.priceText} <span className="price-unit">/{service.unit}</span>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-arrow">
                    <span className={`arrow-icon ${isExpanded ? "open" : ""}`}>
                      ▼
                    </span>
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="accordion-body">
                    {/* Deliverables List */}
                    <div className="details-group">
                      <div className="group-title">📦 Hạng mục bàn giao chi tiết:</div>
                      <ul className="deliverables-list">
                        {service.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="deliverable-item">
                            <span className="check-bullet">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* KPI Commitment */}
                    {service.kpi && (
                      <div className="details-group kpi-group">
                        <div className="group-title">🎯 Cam kết KPI & Chất lượng:</div>
                        <div className="kpi-text">{service.kpi}</div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="accordion-actions">
                      <button
                        type="button"
                        className="btn btn-select-quote"
                        onClick={() => onSelectForQuote(service)}
                      >
                        ⚡ Chọn Dịch Vụ Này Vào Báo Giá
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
