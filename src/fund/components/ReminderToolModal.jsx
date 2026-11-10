/**
 * ReminderToolModal - MA-11: Debt Reminder Tool (BR-16 Compliant)
 * Generates respectful 1-1 Zalo message and group announcement (no debtor names)
 * Compliance: RULE[user_global] <= 500 lines
 */

import React, { useState, useEffect } from 'react';
import { useFund } from '../FundContext';
import { fundApi } from '../fundApi';
import { copyToClipboard } from '../vietQrHelper';

export default function ReminderToolModal() {
  const { chapter, closeModal, showToast } = useFund();
  const [tab, setTab] = useState('GROUP'); // 'GROUP' | 'DIRECT'
  const [reminderText, setReminderText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fundApi.getReminder(1, tab);
        if (res?.content) setReminderText(res.content);
      } catch (err) {
        console.error('Failed to get reminder:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [tab]);

  const handleCopy = async () => {
    await copyToClipboard(reminderText);
    showToast(tab === 'GROUP' ? '📋 Đã sao chép văn bản dán nhóm Zalo (Chuẩn BR-16)!' : '📋 Đã sao chép tin nhắn 1-1!');
  };

  return (
    <div className="fund-modal-overlay" onClick={closeModal}>
      <div className="fund-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="fund-modal-header">
          <div>
            <div className="fund-modal-title">Công cụ nhắc nợ văn minh</div>
            <div style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>
              Tuân thủ chuẩn mực BR-16 (Không nêu tên người nợ trong nhóm)
            </div>
          </div>
          <button className="fund-modal-close" onClick={closeModal}>✕</button>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          <button
            onClick={() => setTab('GROUP')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              background: tab === 'GROUP' ? '#059669' : '#f1f5f9',
              color: tab === 'GROUP' ? '#ffffff' : '#475569',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            📢 Văn bản dán nhóm chung
          </button>
          <button
            onClick={() => setTab('DIRECT')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              background: tab === 'DIRECT' ? '#059669' : '#f1f5f9',
              color: tab === 'DIRECT' ? '#ffffff' : '#475569',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            💬 Nhắc 1-1 riêng tư
          </button>
        </div>

        {/* Content Box */}
        <div style={{ marginBottom: '16px' }}>
          <textarea
            className="fund-form-textarea"
            style={{ minHeight: '140px', fontSize: '13px', lineHeight: '1.5', fontFamily: 'inherit' }}
            value={loading ? 'Đang tạo văn bản...' : reminderText}
            onChange={(e) => setReminderText(e.target.value)}
          />
        </div>

        <button className="fund-btn-full" onClick={handleCopy}>
          📋 Sao chép nội dung gửi Zalo
        </button>
      </div>
    </div>
  );
}
