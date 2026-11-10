/**
 * ObligationCard - Renders a single fee obligation
 * With status badge, overdue highlights and bundle checkbox
 * Compliance: RULE[user_global] <= 500 lines
 */

import React from 'react';
import { formatVnd } from '../vietQrHelper';

export default function ObligationCard({
  obligation,
  isSelected,
  onToggleSelect,
  onPayNow,
  onViewDetail,
}) {
  const isPaid = obligation.status === 'PAID';
  const isOverdue = obligation.isOverdue || obligation.status === 'OVERDUE';

  return (
    <div className={`fund-obligation-card ${isSelected ? 'selected' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="fund-card-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {!isPaid && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(obligation.id)}
              style={{ width: '18px', height: '18px', accentColor: '#059669', cursor: 'pointer' }}
            />
          )}
          <span className="fund-item-name">{obligation.title}</span>
        </div>

        <span className={`fund-status-badge ${isOverdue ? 'overdue' : obligation.status.toLowerCase()}`}>
          {isOverdue ? 'Quá hạn' : (
            obligation.status === 'PAID' ? 'Đã đóng' :
            obligation.status === 'PARTIAL' ? 'Đã đóng 1 phần' :
            obligation.status === 'PENDING' ? 'Chờ duyệt' : 'Chưa đóng'
          )}
        </span>
      </div>

      <div className="fund-card-middle">
        <div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Số tiền cần đóng</div>
          <div className="fund-amount-due">{formatVnd(obligation.remainingAmount || obligation.amountDue)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Hạn nộp</div>
          <div className="fund-due-date" style={{ color: isOverdue ? '#dc2626' : '#64748b', fontWeight: isOverdue ? 700 : 500 }}>
            {obligation.dueDate}
          </div>
        </div>
      </div>

      <div className="fund-card-bottom">
        <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>
          Mã: {obligation.code}
        </span>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button className="fund-btn-small" onClick={() => onViewDetail(obligation)}>
            Chi tiết
          </button>
          {!isPaid && (
            <button className="fund-btn-small pay" onClick={() => onPayNow(obligation)}>
              Đóng ngay ➔
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
