import React, { useState, useMemo, useEffect } from "react";
import { SCALE_TIERS, SERVICES_2026 } from "../data/servicesData2026";

/**
 * QuotePortalTab Component - Wizard 3 Bước Tính Giá Dự Toán Nhanh
 * Strict rule: <= 500 lines
 */
export default function QuotePortalTab({
  preselectedService,
  onProceedToContact,
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedScaleId, setSelectedScaleId] = useState("growth");
  const [selectedServiceIds, setSelectedServiceIds] = useState(["dm-05", "tech-01"]);

  // If a preselected service was passed from Pricing Tab, add it automatically
  useEffect(() => {
    if (preselectedService?.id) {
      setSelectedServiceIds((prev) => {
        if (!prev.includes(preselectedService.id)) {
          return [...prev, preselectedService.id];
        }
        return prev;
      });
      // Move directly to step 2 so user sees their selection
      setCurrentStep(2);
    }
  }, [preselectedService]);

  const activeScale = useMemo(() => {
    return SCALE_TIERS.find((t) => t.id === selectedScaleId) || SCALE_TIERS[1];
  }, [selectedScaleId]);

  // Toggle service selection
  const handleToggleService = (serviceId) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  // Compute total estimate
  const calculation = useMemo(() => {
    const selectedList = SERVICES_2026.filter((s) =>
      selectedServiceIds.includes(s.id)
    );
    const rawTotal = selectedList.reduce((sum, s) => sum + (s.priceValue || 0), 0);
    const discountRate = activeScale.baseDiscount || 0.15;
    const discountAmount = Math.round(rawTotal * discountRate);
    const finalTotal = Math.max(0, rawTotal - discountAmount);

    return {
      selectedList,
      count: selectedList.length,
      rawTotal,
      discountRate,
      discountAmount,
      finalTotal,
    };
  }, [selectedServiceIds, activeScale]);

  const formatVND = (num) => {
    return new Intl.NumberFormat("vi-VN").format(num) + " đ";
  };

  const handleFinishAndSubmit = () => {
    onProceedToContact({
      scaleName: activeScale.name,
      timeline: activeScale.timeline,
      selectedServices: calculation.selectedList.map((s) => s.name),
      finalTotalText: formatVND(calculation.finalTotal),
      discountAmountText: formatVND(calculation.discountAmount),
      rawTotalText: formatVND(calculation.rawTotal),
    });
  };

  return (
    <div className="tab-page quote-tab">
      {/* Wizard Step Indicator */}
      <div className="wizard-stepper">
        <div className={`step-item ${currentStep >= 1 ? "active" : ""}`}>
          <div className="step-number">1</div>
          <span className="step-label">Quy mô</span>
        </div>
        <div className="step-line" />
        <div className={`step-item ${currentStep >= 2 ? "active" : ""}`}>
          <div className="step-number">2</div>
          <span className="step-label">Dịch vụ</span>
        </div>
        <div className="step-line" />
        <div className={`step-item ${currentStep >= 3 ? "active" : ""}`}>
          <div className="step-number">3</div>
          <span className="step-label">Dự toán</span>
        </div>
      </div>

      {/* ── BƯỚC 1: Chọn Quy Mô Doanh Nghiệp ── */}
      {currentStep === 1 && (
        <div className="wizard-step-content">
          <div className="page-header">
            <span className="section-kicker">BƯỚC 1/3: KHẢO SÁT QUY MÔ</span>
            <h2 className="page-title">Doanh Nghiệp Của Bạn Đang Ở Giai Đoạn Nào?</h2>
            <p className="page-desc">
              TOLUCK tối ưu gói giải pháp và tỷ lệ chiết khấu combo tương ứng theo giai đoạn phát triển của bạn.
            </p>
          </div>

          <div className="scale-tier-list">
            {SCALE_TIERS.map((tier) => {
              const isSelected = selectedScaleId === tier.id;
              return (
                <div
                  key={tier.id}
                  className={`scale-tier-card ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedScaleId(tier.id)}
                >
                  <div className="scale-radio">
                    <span className={`radio-dot ${isSelected ? "checked" : ""}`} />
                  </div>
                  <div className="scale-details">
                    <div className="scale-name-row">
                      <span className="scale-name">{tier.name}</span>
                      <span className="scale-discount">Ưu đãi -{tier.baseDiscount * 100}%</span>
                    </div>
                    <p className="scale-desc">{tier.desc}</p>
                    <div className="scale-meta">
                      <span>Ngân sách ước tính: <strong>{tier.budgetRange}</strong></span>
                      <span>Thời gian: <strong>{tier.timeline}</strong></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="wizard-bottom-bar">
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => setCurrentStep(2)}
            >
              Tiếp Tục: Chọn Dịch Vụ Cụ Thể (Bước 2) ➔
            </button>
          </div>
        </div>
      )}

      {/* ── BƯỚC 2: Chọn Nhóm Dịch Vụ Cụ Thể ── */}
      {currentStep === 2 && (
        <div className="wizard-step-content">
          <div className="page-header">
            <span className="section-kicker">BƯỚC 2/3: LỰA CHỌN DỊCH VỤ</span>
            <h2 className="page-title">Chọn Các Hạng Mục Cần Triển Khai</h2>
            <p className="page-desc">
              Bạn có thể chọn nhiều dịch vụ cùng lúc. Hệ thống tự động tính toán tổng ngân sách ước tính theo thời gian thực.
            </p>
          </div>

          <div className="service-checklist">
            {SERVICES_2026.map((service) => {
              const isChecked = selectedServiceIds.includes(service.id);
              return (
                <div
                  key={service.id}
                  className={`service-check-card ${isChecked ? "checked" : ""}`}
                  onClick={() => handleToggleService(service.id)}
                >
                  <div className="check-box">
                    <span className={`checkbox-mark ${isChecked ? "active" : ""}`}>
                      {isChecked ? "✓" : ""}
                    </span>
                  </div>
                  <div className="check-card-info">
                    <div className="check-card-title">{service.name}</div>
                    <div className="check-card-meta">
                      <span className="check-badge">{service.badge}</span>
                      <span className="check-price">{service.priceText}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Mini Calculation Bar */}
          <div className="sticky-calc-bar">
            <div className="calc-summary">
              <div className="calc-count">Đã chọn: <strong>{calculation.count}</strong> dịch vụ</div>
              <div className="calc-total">
                Dự toán: <span>{formatVND(calculation.finalTotal)}</span>
              </div>
            </div>
            <div className="calc-actions">
              <button
                type="button"
                className="btn btn-outline-sm"
                onClick={() => setCurrentStep(1)}
              >
                Quay lại
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={calculation.count === 0}
                onClick={() => setCurrentStep(3)}
              >
                Xem Bảng Dự Toán (Bước 3) ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── BƯỚC 3: Tổng Kết Dự Toán & Chốt Báo Giá ── */}
      {currentStep === 3 && (
        <div className="wizard-step-content">
          <div className="page-header">
            <span className="section-kicker">BƯỚC 3/3: BẢNG DỰ TOÁN KINH PHÍ</span>
            <h2 className="page-title">Tổng Hợp Dự Toán Độc Quyền</h2>
            <p className="page-desc">
              Dự toán đã áp dụng chính sách chiết khấu combo ({activeScale.baseDiscount * 100}%) cho quy mô <strong>{activeScale.name}</strong>.
            </p>
          </div>

          <div className="quote-summary-card">
            <div className="summary-header">
              <div className="summary-title">BẢNG KÊ DỊCH VỤ ĐÃ CHỌN ({calculation.count})</div>
              <div className="summary-scale">{activeScale.name}</div>
            </div>

            <div className="summary-items-list">
              {calculation.selectedList.map((item, idx) => (
                <div key={item.id} className="summary-item-row">
                  <span className="item-name">{idx + 1}. {item.name}</span>
                  <span className="item-price">{formatVND(item.priceValue)}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-totals">
              <div className="total-row subtotal">
                <span>Tổng giá niêm yết:</span>
                <span>{formatVND(calculation.rawTotal)}</span>
              </div>
              <div className="total-row discount">
                <span>Ưu đãi gói combo (-{activeScale.baseDiscount * 100}%):</span>
                <span>- {formatVND(calculation.discountAmount)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Dự toán cuối cùng:</span>
                <span className="highlight-price">{formatVND(calculation.finalTotal)}</span>
              </div>
              <div className="total-note">
                ⏱️ Thời gian triển khai dự kiến: <strong>{activeScale.timeline}</strong>
              </div>
            </div>
          </div>

          <div className="summary-guarantee-box">
            <div className="guarantee-icon">🛡️</div>
            <div className="guarantee-text">
              <strong>Cam kết từ TOLUCK:</strong> Báo giá chi tiết không phát sinh, bàn giao 100% mã nguồn & tài nguyên, hỗ trợ bảo hành kỹ thuật 12 tháng.
            </div>
          </div>

          <div className="wizard-bottom-bar-dual">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setCurrentStep(2)}
            >
              ← Chọn lại dịch vụ
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleFinishAndSubmit}
            >
              Chốt Báo Giá & Nhận Tư Vấn ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
