/**
 * ApprovalAndCashModal - MA-12: Transaction Approval & Cash Receipt
 * Approve pending transfer reports and record physical cash receipts
 * Compliance: RULE[user_global] <= 500 lines
 */

import React, { useState } from 'react';
import { useFund } from '../FundContext';
import { fundApi } from '../fundApi';
import { formatVnd } from '../vietQrHelper';

export default function ApprovalAndCashModal() {
  const { obligations, members, closeModal, showToast, refreshData } = useFund();
  const [tab, setTab] = useState('PENDING'); // 'PENDING' | 'CASH'
  const [selectedMemberId, setSelectedMemberId] = useState('3');
  const [cashAmount, setCashAmount] = useState('2000000');
  const [loading, setLoading] = useState(false);

  const pendingList = obligations.filter(o => o.status === 'PENDING');

  const handleApprove = async (obligationId, approved) => {
    setLoading(true);
    try {
      await fundApi.approvePayment(obligationId, approved);
      showToast(approved ? '✅ Đã duyệt khoản nộp thành công!' : '❌ Đã từ chối khoản nộp');
      await refreshData();
    } catch (err) {
      showToast('Thao tác thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleRecordCash = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fundApi.recordCash(selectedMemberId, 1, Number(cashAmount));
      showToast('💵 Đã ghi nhận phiếu thu tiền mặt thành công!');
      await refreshData();
      closeModal();
    } catch (err) {
      showToast('Ghi nhận tiền mặt thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fund-modal-overlay" onClick={closeModal}>
      <div className="fund-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="fund-modal-header">
          <div className="fund-modal-title">Duyệt chuyển khoản & Thu tiền mặt</div>
          <button className="fund-modal-close" onClick={closeModal}>✕</button>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          <button
            onClick={() => setTab('PENDING')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              background: tab === 'PENDING' ? '#059669' : '#f1f5f9',
              color: tab === 'PENDING' ? '#ffffff' : '#475569',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            🔔 Chờ duyệt ({pendingList.length})
          </button>
          <button
            onClick={() => setTab('CASH')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              background: tab === 'CASH' ? '#059669' : '#f1f5f9',
              color: tab === 'CASH' ? '#ffffff' : '#475569',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            💵 Ghi tiền mặt
          </button>
        </div>

        {tab === 'PENDING' ? (
          <div>
            {pendingList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                🎉 Không có giao dịch chuyển khoản nào đang chờ duyệt!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {pendingList.map(item => (
                  <div key={item.id} style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#92400e' }}>{item.title}</span>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#059669' }}>
                        {formatVnd(item.remainingAmount || item.amountDue)}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#78350f', marginBottom: '10px' }}>
                      Mã: {item.code}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="fund-btn-small pay"
                        style={{ flex: 1, padding: '8px' }}
                        onClick={() => handleApprove(item.id, true)}
                        disabled={loading}
                      >
                        ✓ Duyệt ngay
                      </button>
                      <button
                        className="fund-btn-small"
                        style={{ flex: 1, padding: '8px', color: '#dc2626' }}
                        onClick={() => handleApprove(item.id, false)}
                        disabled={loading}
                      >
                        ✕ Từ chối
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleRecordCash}>
            <div className="fund-form-group">
              <label className="fund-form-label">Chọn thành viên nộp tiền mặt</label>
              <select
                className="fund-form-select"
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
              >
                {members.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.code} - {m.name} ({m.title})
                  </option>
                ))}
              </select>
            </div>

            <div className="fund-form-group">
              <label className="fund-form-label">Số tiền mặt đã nhận (VND)</label>
              <input
                type="number"
                className="fund-form-input"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
                step="50000"
                required
              />
            </div>

            <button type="submit" className="fund-btn-full" disabled={loading}>
              💵 Xác nhận thu tiền mặt & Chuyển Đã Đóng
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
