import React, { useState, useEffect } from "react";
import { fetchNewsArticles, FALLBACK_NEWS } from "../config/api";

/**
 * NewsSection Component - Backend News Sync & Reader Modal
 * Strict rule: <= 500 lines
 */
export default function NewsSection() {
  const [articles, setArticles] = useState(FALLBACK_NEWS);
  const [loading, setLoading] = useState(true);
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchNewsArticles(6).then((data) => {
      if (mounted) {
        setArticles(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="section-block">
      <div className="section-title-wrap">
        <span className="section-kicker">TIN TỨC &amp; GÓC NHÌN</span>
        <h2 className="section-heading">Cập Nhật Xu Hướng Tiếp Thị &amp; Công Nghệ</h2>
        <p className="section-lead">
          Các bài viết chuyên sâu từ đội ngũ chuyên gia TOLUCK SAAS.
        </p>
      </div>

      {loading && (
        <div className="news-loading">
          <div className="spinner"></div>
          <span>Đang đồng bộ tin tức từ hệ thống...</span>
        </div>
      )}

      <div className="news-list">
        {articles.map((item) => (
          <article
            key={item.id || item.slug}
            className="news-card"
            onClick={() => setActiveArticle(item)}
          >
            <div className="news-thumb-box">
              <img
                src={item.thumbnail || "./hero_banner.jpg"}
                alt={item.title}
                className="news-thumb-img"
                onError={(e) => {
                  e.currentTarget.src = "./hero_banner.jpg";
                }}
              />
              <span className="news-cat-pill">
                {item.category || "Tin Tức"}
              </span>
            </div>

            <div className="news-body">
              <h3 className="news-title">{item.title}</h3>
              <p className="news-summary">{item.summary}</p>
              <div className="news-meta">
                <span className="news-author">✍️ {item.author || "TOLUCK Team"}</span>
                <span className="news-date">📅 {item.date || "2026"}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="modal-backdrop" onClick={() => setActiveArticle(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <span className="modal-cat-tag">
                {activeArticle.category || "TOLUCK Insight"}
              </span>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setActiveArticle(null)}
              >
                ✕
              </button>
            </div>

            <h2 className="modal-title">{activeArticle.title}</h2>
            <div className="modal-meta">
              <span>✍️ {activeArticle.author || "TOLUCK Team"}</span>
              <span>•</span>
              <span>📅 {activeArticle.date || "2026"}</span>
              {activeArticle.pageviews && (
                <>
                  <span>•</span>
                  <span>👁️ {activeArticle.pageviews} lượt đọc</span>
                </>
              )}
            </div>

            <div className="modal-body-content">
              <p className="modal-lead-summary">{activeArticle.summary}</p>
              {activeArticle.content ? (
                <div className="modal-rich-text">
                  <p>{activeArticle.content}</p>
                </div>
              ) : (
                <p className="modal-notice">
                  Nội dung đầy đủ được cập nhật liên tục từ website toluck.vn.
                </p>
              )}
            </div>

            <div className="modal-footer">
              <a
                href={activeArticle.url || "https://toluck.vn"}
                target="_blank"
                rel="noreferrer"
                className="btn-view-web"
              >
                Xem chi tiết trên Website →
              </a>
              <button
                type="button"
                className="btn-close-modal"
                onClick={() => setActiveArticle(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
