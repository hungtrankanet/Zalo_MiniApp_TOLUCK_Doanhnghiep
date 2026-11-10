/**
 * MemberDashboard - MA-01 & MA-02: Member Portal Dashboard
 * Outstanding balance card, tabs, obligation list and bundle bar
 * Compliance: RULE[user_global] <= 500 lines
 */

import React, { useState, useMemo } from 'react';
import { useFund } from '../FundContext';
import { formatVnd } from '../vietQrHelper';
import ObligationCard from './ObligationCard';

export default function MemberDashboard() {
  const {
    chapter,
    currentMember,
    obligations,
    selectedIds,
    toggleSelectObligation,
    clearSelection,
    openModal,
  } = useFund();

  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'UNPAID' | 'PAID'

  // Calculations
  const unpaidObligations = useMemo(() => {
    return obligations.filter(o => o.status !== 'PAID');
  }, [obligations]);

  const totalOutstanding = useMemo(() => {
    return unpaidObligations.reduce((sum, o) => sum + (o.remainingAmount || o.amountDue), 0);
  }, [unpaidObligations]);

  const overdueCount = useMemo(() => {
    return unpaidObligations.filter(o => o.isOverdue || o.status === 'OVERDUE').length;
  }, [unpaidObligations]);

  const filteredObligations = useMemo(() => {
    if (activeFilter === 'UNPAID') return unpaidObligations;
    if (activeFilter === 'PAID') return obligations.filter(o => o.status === 'PAID');
    return obligations;
  }, [obligations, unpaidObligations, activeFilter]);

  const selectedTotal = useMemo(() => {
    return obligations
      .filter(o => selectedIds.includes(o.id))
      .reduce((sum, o) => sum + (o.remainingAmount || o.amountDue), 0);
  }, [obligations, selectedIds]);

  const handlePayAll = () => {
    if (unpaidObligations.length === 1) {
      openModal('QR', unpaidObligations[0]);
    } else if (unpaidObligations.length > 1) {
      openModal('BUNDLE_QR', {
        memberId: currentMember.id,
        obligationIds: unpaidObligations.map(o => o.id),
      });
    }
  };

  const handlePaySelectedBundle = () => {
    if (selectedIds.length === 1) {
      const single = obligations.find(o => o.id === selectedIds[0]);
      openModal('QR', single);
    } else if (selectedIds.length > 1) {
      openModal('BUNDLE_QR', {
        memberId: currentMember.id,
        obligationIds: selectedIds,
      });
    }
  };

  return (
    <div>
      {/* Outstanding Balance Card (MA-01) */}
      <div className="fund-balance-card">
        <div className="fund-card-meta">
          <span>Xin chào, {currentMember?.name}</span>
          <span className="fund-badge-chapter">{chapter?.code || 'CL01'}</span>
        </div>
        <div style={{ fontSize: '13px', opacity: 0.9 }}>Tổng nghĩa vụ quỹ cần đóng</div>
        <div className="fund-balance-amount">{formatVnd(totalOutstanding)}</div>

        <div className="fund-balance-actions">
          {totalOutstanding > 0 ? (
            <button className="fund-btn-primary" onClick={handlePayAll}>
              ⚡ Đóng quỹ ngay (VietQR)
            </button>
          ) : (
            <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600 }}>
              🎉 Quý hội viên đã hoàn thành 100% nghĩa vụ quỹ!
            </div>
          )}
          <button className="fund-btn-secondary" onClick={() => openModal('TRANSPARENCY')}>
            📊 Minh bạch
          </button>
        </div>

        {overdueCount > 0 && (
          <div style={{ marginTop: '12px', fontSize: '12px', background: 'rgba(220, 38, 38, 0.25)', padding: '6px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>⚠️ Có <strong>{overdueCount}</strong> khoản quỹ đã quá hạn nộp!</span>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="fund-section-header">
        <div className="fund-section-title">Danh sách phiếu quỹ ({filteredObligations.length})</div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {['ALL', 'UNPAID', 'PAID'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              style={{
                background: activeFilter === tab ? '#059669' : '#e2e8f0',
                color: activeFilter === tab ? '#ffffff' : '#475569',
                border: 'none',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {tab === 'ALL' ? 'Tất cả' : tab === 'UNPAID' ? 'Chưa đóng' : 'Đã đóng'}
            </button>
          ))}
        </div>
      </div>

      {/* Obligation List */}
      <div className="fund-obligation-list">
        {filteredObligations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8', fontSize: '14px' }}>
            Không có khoản thu nào trong mục này.
          </div>
        ) : (
          filteredObligations.map(item => (
            <ObligationCard
              key={item.id}
              obligation={item}
              isSelected={selectedIds.includes(item.id)}
              onToggleSelect={toggleSelectObligation}
              onPayNow={(o) => openModal('QR', o)}
              onViewDetail={(o) => openModal('QR', o)}
            />
          ))
        )}
      </div>

      {/* Floating Bundle Bar (MA-03) */}
      {selectedIds.length > 0 && (
        <div className="fund-bundle-bar animate-fade-in">
          <div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Đã chọn {selectedIds.length} khoản:</div>
            <div className="fund-bundle-total">{formatVnd(selectedTotal)}</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={clearSelection}
              style={{ background: 'transparent', color: '#94a3b8', border: '1px solid #475569', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', cursor: 'pointer' }}
            >
              Bỏ chọn
            </button>
            <button
              onClick={handlePaySelectedBundle}
              style={{ background: '#059669', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
            >
              Đóng gộp ngay ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
