/**
 * TreasurerDashboard - MA-09: Treasurer Desk Overview
 * Real-time collection progress, stats and quick action shortcuts
 * Compliance: RULE[user_global] <= 500 lines
 */

import React from 'react';
import { useFund } from '../FundContext';
import { formatVnd } from '../vietQrHelper';

export default function TreasurerDashboard() {
  const { chapter, treasurerStats, openModal } = useFund();

  const totalTarget = treasurerStats?.totalTarget || 108000000;
  const totalCollected = treasurerStats?.totalCollected || 85300000;
  const rate = totalTarget > 0 ? Math.round((totalCollected / totalTarget) * 100) : 0;
  const pendingCount = treasurerStats?.pendingCount || 3;

  return (
    <div>
      {/* Progress Card (MA-09) */}
      <div className="fund-treasurer-stats">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669', background: '#ecfdf5', padding: '3px 8px', borderRadius: '6px' }}>
              💼 BÀN LÀM VIỆC THỦ QUỸ
            </span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
              Tiến độ thu Quỹ {chapter?.code || 'CL01'}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '24px', fontWeight: 800, color: '#059669' }}>{rate}%</span>
          </div>
        </div>

        <div className="fund-stat-progress-bar">
          <div className="fund-stat-progress-fill" style={{ width: `${Math.min(rate, 100)}%` }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
          <span>Đã thu: <strong>{formatVnd(totalCollected)}</strong></span>
          <span>Mục tiêu: <strong>{formatVnd(totalTarget)}</strong></span>
        </div>
      </div>

      {/* 4 Quick Actions */}
      <div className="fund-quick-actions-grid">
        <div className="fund-quick-action-card" onClick={() => openModal('CREATE_FEE')}>
          <div className="fund-action-icon">➕</div>
          <div>
            <div className="fund-action-label">Tạo khoản thu</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Nhanh trong 30s</div>
          </div>
        </div>

        <div className="fund-quick-action-card" onClick={() => openModal('REMINDER')}>
          <div className="fund-action-icon blue">📢</div>
          <div>
            <div className="fund-action-label">Nhắc nợ Zalo</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Chuẩn BR-16 văn minh</div>
          </div>
        </div>

        <div className="fund-quick-action-card" onClick={() => openModal('APPROVAL_CASH')}>
          <div className="fund-action-icon amber">
            {pendingCount > 0 ? `🔔${pendingCount}` : '📋'}
          </div>
          <div>
            <div className="fund-action-label">Duyệt & Tiền mặt</div>
            <div style={{ fontSize: '11px', color: '#d97706', fontWeight: 600 }}>
              {pendingCount > 0 ? `${pendingCount} giao dịch chờ` : 'Không có chờ'}
            </div>
          </div>
        </div>

        <div className="fund-quick-action-card" onClick={() => openModal('TRANSPARENCY')}>
          <div className="fund-action-icon">📊</div>
          <div>
            <div className="fund-action-label">Báo cáo thu chi</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Sổ quỹ công khai</div>
          </div>
        </div>
      </div>

      {/* Fee Items Table */}
      <div className="fund-section-header">
        <div className="fund-section-title">Các khoản thu đang phát hành</div>
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {(treasurerStats?.feeItems || []).map(f => (
          <div
            key={f.id}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '14px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{f.title}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Hạn: {f.dueDate}</div>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#059669' }}>
                {formatVnd(f.amountPerMember)}/người
              </span>
            </div>

            <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>Tiến độ: <strong>{f.paidCount}/{f.totalCount} thành viên</strong></span>
              <span style={{ color: '#059669', fontWeight: 700 }}>
                {formatVnd(f.collectedAmount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
