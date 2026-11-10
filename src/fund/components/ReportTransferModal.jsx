/**
 * ReportTransferModal - MA-06: Member Transfer Reporting
 * Allows reporting payment with receipt note and image
 * Compliance: RULE[user_global] <= 500 lines
 */

import React, { useState } from 'react';
import { useFund } from '../FundContext';
import { fundApi } from '../fundApi';
import { formatVnd } from '../vietQrHelper';

export default function ReportTransferModal({ data }) {
  const { currentMember, closeModal, showToast, refreshData } = useFund();
  const [bankRef, setBankRef] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        memberId: currentMember.id,
        code: data?.code,
        amount: data?.amount,
        bankRef,
        note,
      };
      await fundApi.reportPayment(payload);
      showToast('✅ Đã gửi báo cáo chuyển khoản. Thủ quỹ sẽ duyệt trong 24h!');
      await refreshData();
      closeModal();
    } catch (err) {
      showToast('❌ Gửi báo cáo thất bại, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fund-modal-overlay" onClick={closeModal}>
      <div className="fund-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="fund-modal-header">
          <div className="fund-modal-title">Báo đã chuyển khoản</div>
          <button className="fund-modal-close" onClick={closeModal}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Khoản nộp: {data?.title}</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#059669' }}>
              Số tiền: {formatVnd(data?.amount)}
            </div>
            <div style={{ fontSize: '12px', color: '#0f172a', marginTop: '4px' }}>
              Mã giao dịch: <strong>{data?.code}</strong>
            </div>
          </div>

          <div className="fund-form-group">
            <label className="fund-form-label">Mã tham chiếu ngân hàng (FT / Mã GD)</label>
            <input
              type="text"
              className="fund-form-input"
              placeholder="VD: FT260812345678"
              value={bankRef}
              onChange={(e) => setBankRef(e.target.value)}
            />
          </div>

          <div className="fund-form-group">
            <label className="fund-form-label">Ghi chú thêm cho Thủ quỹ</label>
            <textarea
              className="fund-form-textarea"
              placeholder="VD: Em chuyển từ tài khoản Techcombank lúc 10h sáng..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <button type="submit" className="fund-btn-full" disabled={loading}>
            {loading ? 'Đang gửi...' : 'Gửi xác nhận cho Thủ quỹ ➔'}
          </button>
        </form>
      </div>
    </div>
  );
}
