/**
 * PaymentSuccessModal - MA-07: Payment Success Confirmation
 * Shows digital receipt with Emerald celebration style
 * Compliance: RULE[user_global] <= 500 lines
 */

import React from 'react';
import { useFund } from '../FundContext';
import { formatVnd } from '../vietQrHelper';

export default function PaymentSuccessModal({ data }) {
  const { chapter, closeModal } = useFund();

  return (
    <div className="fund-modal-overlay" onClick={closeModal}>
      <div className="fund-modal-sheet" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎉</div>
        <div className="fund-modal-title" style={{ color: '#059669', marginBottom: '6px' }}>
          {data?.title || 'Thanh toán thành công!'}
        </div>
        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
          Khoản nộp đã được hệ thống tự động ghi nhận vào Quỹ Chapter {chapter?.code || 'CL01'}.
        </div>

        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '16px', marginBottom: '20px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Số tiền</span>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#059669' }}>
              {formatVnd(data?.amount)}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Mã đối soát</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', fontFamily: 'monospace' }}>
              {data?.code}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Thời gian</span>
            <span style={{ fontSize: '12px', color: '#0f172a' }}>{data?.time}</span>
          </div>
        </div>

        <button className="fund-btn-full" onClick={closeModal}>
          Hoàn tất
        </button>
      </div>
    </div>
  );
}
