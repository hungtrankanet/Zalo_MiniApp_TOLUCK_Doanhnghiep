import React from "react";
import { CONTACT_INFO } from "../config/api";

/**
 * Footer & Bottom Navigation Component - Exactly matching backend _footer.php
 * Strict rule: <= 500 lines
 */
export default function Footer({ activeTab, onTabChange }) {
  const tabs = [
    { id: "home", label: "Tổng Quan", icon: "🏠" },
    { id: "services", label: "Dịch Vụ", icon: "💼" },
    { id: "cases", label: "Dự Án", icon: "🏆" },
    { id: "news", label: "Tin Tức", icon: "📰" },
    { id: "contact", label: "Liên Hệ", icon: "📞" },
  ];

  return (
    <>
      <footer className="footer-wrap">
        <div className="footer-brand-box">
          <div className="footer-brand-header">
            <div className="toluck-brand-badge small">T</div>
            <span className="footer-title">{CONTACT_INFO.brandName}</span>
          </div>
          <div className="footer-tagline">{CONTACT_INFO.tagline}</div>
          <p className="footer-desc">
            {CONTACT_INFO.positioning} • Kiến tạo nền tảng công nghệ vững chắc song hành cùng giải pháp tiếp thị đa kênh tăng trưởng doanh thu vượt bậc.
          </p>
          <div className="footer-tags">
            <span>CodeIgniter 4 Engine</span>
            <span>n8n Webhook</span>
            <span>AI OCR</span>
            <span>&gt;10K CCU Ready</span>
          </div>
        </div>

        <div className="footer-bottom-info">
          <div>© 2026 TOLUCK. All rights reserved.</div>
          <div>{CONTACT_INFO.address}</div>
          <div>Bàn giao 100% bản quyền mã nguồn &amp; thiết kế.</div>
        </div>
      </footer>

      {/* Floating Bottom Nav Bar for Mobile Quick Access */}
      <nav className="bottom-nav-bar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`nav-tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="nav-tab-icon">{tab.icon}</span>
            <span className="nav-tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
