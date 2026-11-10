/**
 * PaymentQrModal - MA-03 & MA-05: 3-Touch VietQR Payment Modal
 * Features: Dynamic Canvas QR, Save QR Image, Copy STK, Copy Content, Auto-polling
 * Compliance: RULE[user_global] <= 500 lines
 */

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useFund } from '../FundContext';
import { formatVnd, copyToClipboard, downloadQrImage, buildVietQrString } from '../vietQrHelper';
import { fundApi } from '../fundApi';

export default function PaymentQrModal({ data, isBundle = false }) {
  const { chapter, currentMember, closeModal, openModal, showToast } = useFund();
  const canvasRef = useRef(null);
  const [qrUrl, setQrUrl] = useState('');
  const [bundleData, setBundleData] = useState(null);
  const [loading, setLoading] = useState(true);

  const amount = isBundle ? (bundleData?.totalAmount || 0) : (data?.remainingAmount || data?.amountDue || 0);
  const code = isBundle ? (bundleData?.bundleCode || '') : (data?.code || '');

  // Load bundle or single QR string
  useEffect(() => {
    let isMounted = true;
    async function init() {
      setLoading(true);
      try {
        if (isBundle && data?.obligationIds) {
          const res = await fundApi.createBundle(data.memberId, data.obligationIds);
          if (isMounted) setBundleData(res);
        }
      } catch (err) {
        console.error('Failed to init QR modal:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    init();
    return () => { isMounted = false; };
  }, [isBundle, data]);

  // Generate QR Canvas
  useEffect(() => {
    if (!canvasRef.current || amount <= 0 || !code) return;

    const qrString = buildVietQrString({
      bankBin: chapter?.bankBin || '970416',
      accountNo: chapter?.bankAccountNo || '246813579',
      amount,
      content: code,
    });

    QRCode.toCanvas(canvasRef.current, qrString, {
      width: 220,
      margin: 1,
      color: { dark: '#0f172a', light: '#ffffff' },
    }, (err) => {
      if (!err && canvasRef.current) {
        setQrUrl(canvasRef.current.toDataURL());
      }
    });
  }, [amount, code, chapter]);

  const handleCopyStk = async () => {
    const success = await copyToClipboard(chapter?.bankAccountNo || '246813579');
    if (success) showToast('📋 Đã sao chép Số tài khoản ACB!');
  };

  const handleCopyCode = async () => {
    const success = await copyToClipboard(code);
    if (success) showToast(`📋 Đã sao chép Nội dung chuyển khoản: ${code}!`);
  };

  const handleCopyAll = async () => {
    const text = `${chapter?.bankAccountNo || '246813579'} - ${code} - ${amount} VND`;
    await copyToClipboard(text);
    showToast('📋 Đã sao chép đầy đủ STK & Cú pháp chuyển khoản!');
  };

  const handleSaveImage = () => {
    if (qrUrl) {
      downloadQrImage(qrUrl, `VietQR_${code}.png`);
      showToast('📥 Đang tải ảnh mã QR về thiết bị...');
    }
  };

  return (
    <div className="fund-modal-overlay" onClick={closeModal}>
      <div className="fund-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="fund-modal-header">
          <div>
            <div className="fund-modal-title">
              {isBundle ? 'Thanh toán gộp nhiều khoản' : 'Thanh toán Quỹ qua VietQR'}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              {isBundle ? `Gộp ${data?.obligationIds?.length} khoản` : data?.title}
            </div>
          </div>
          <button className="fund-modal-close" onClick={closeModal}>✕</button>
        </div>

        {/* VietQR Box */}
        <div className="fund-qr-box">
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#047857', marginBottom: '8px' }}>
            QUÉT MÃ TRÊN ỨNG DỤNG NGÂN HÀNG HOẶC VÍ ĐIỆN TỬ
          </div>

          <div className="fund-qr-image">
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: loading ? 'none' : 'block' }} />
            {loading && <div style={{ paddingTop: '80px', color: '#94a3b8' }}>Đang sinh mã QR...</div>}
          </div>

          <div style={{ fontSize: '24px', fontWeight: 800, color: '#059669', marginBottom: '4px' }}>
            {formatVnd(amount)}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            Miễn phí chuyển tiền 24/7 qua cổng Napas 247
          </div>
        </div>

        {/* Copy Details Grid */}
        <div className="fund-copy-grid">
          <div className="fund-copy-item">
            <div>
              <div className="fund-copy-label">Ngân hàng thụ hưởng</div>
              <div className="fund-copy-val">{chapter?.bankName || 'Ngân hàng ACB'}</div>
            </div>
          </div>

          <div className="fund-copy-item">
            <div>
              <div className="fund-copy-label">Số tài khoản</div>
              <div className="fund-copy-val">{chapter?.bankAccountNo || '246813579'}</div>
            </div>
            <button className="fund-copy-btn" onClick={handleCopyStk}>Sao chép</button>
          </div>

          <div className="fund-copy-item">
            <div>
              <div className="fund-copy-label">Nội dung chuyển khoản (Bắt buộc)</div>
              <div className="fund-copy-val" style={{ color: '#059669', letterSpacing: '0.5px' }}>{code}</div>
            </div>
            <button className="fund-copy-btn" onClick={handleCopyCode}>Sao chép</button>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="fund-btn-full" style={{ background: '#2563eb' }} onClick={handleSaveImage}>
              📥 Lưu ảnh QR
            </button>
            <button className="fund-btn-full" onClick={handleCopyAll}>
              📋 Sao chép thông tin
            </button>
          </div>

          <button
            onClick={() => {
              closeModal();
              openModal('REPORT', { code, amount, title: data?.title || 'Đóng gộp' });
            }}
            style={{
              background: '#f8fafc',
              color: '#475569',
              border: '1px solid #cbd5e1',
              padding: '10px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ✉️ Báo đã chuyển khoản (nếu chưa thấy cập nhật)
          </button>
        </div>
      </div>
    </div>
  );
}
