/**
 * CreateFeeModal - MA-10: Fast 30-Second Fee Item Creation
 * Emits obligations to all 40 members in a single click
 * Compliance: RULE[user_global] <= 500 lines
 */

import React, { useState } from 'react';
import { useFund } from '../FundContext';
import { fundApi } from '../fundApi';

export default function CreateFeeModal() {
  const { closeModal, showToast, refreshData } = useFund();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('PERIODIC');
  const [amount, setAmount] = useState('2000000');
  const [dueDate, setDueDate] = useState('2026-11-30');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const presets = [
    { label: 'Quỹ sinh hoạt Q1/2027', amount: '2000000', cat: 'PERIODIC' },
    { label: 'Quỹ ăn sáng giao thương', amount: '200000', cat: 'WEEKLY' },
    { label: 'Quỹ thiện nguyện Tết', amount: '500000', cat: 'CHARITY' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) {
      showToast('⚠️ Vui lòng điền tên khoản thu và số tiền');
      return;
    }

    setLoading(true);
    try {
      await fundApi.createFeeItem({
        title,
        category,
        amountPerMember: Number(amount),
        dueDate,
        description,
      });
      showToast('🎉 Đã phát hành khoản thu mới cho 40 thành viên!');
      await refreshData();
      closeModal();
    } catch (err) {
      showToast('❌ Tạo khoản thu thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fund-modal-overlay" onClick={closeModal}>
      <div className="fund-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="fund-modal-header">
          <div className="fund-modal-title">Tạo khoản thu nhanh (30s)</div>
          <button className="fund-modal-close" onClick={closeModal}>✕</button>
        </div>

        {/* Quick Presets */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>Mẫu nhanh:</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {presets.map(p => (
              <button
                key={p.label}
                type="button"
                onClick={() => { setTitle(p.label); setAmount(p.amount); setCategory(p.cat); }}
                style={{
                  background: '#ecfdf5',
                  color: '#047857',
                  border: '1px solid #a7f3d0',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="fund-form-group">
            <label className="fund-form-label">Tên khoản thu</label>
            <input
              type="text"
              className="fund-form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Quỹ sinh hoạt Quý 1/2027"
              required
            />
          </div>

          <div className="fund-form-group">
            <label className="fund-form-label">Số tiền mỗi thành viên (VND)</label>
            <input
              type="number"
              className="fund-form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="50000"
              required
            />
          </div>

          <div className="fund-form-group">
            <label className="fund-form-label">Hạn nộp</label>
            <input
              type="date"
              className="fund-form-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div className="fund-form-group">
            <label className="fund-form-label">Ghi chú mục đích thu</label>
            <textarea
              className="fund-form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả mục đích sử dụng quỹ..."
            />
          </div>

          <button type="submit" className="fund-btn-full" disabled={loading}>
            {loading ? 'Đang phát hành...' : 'Phát hành cho 40 thành viên ➔'}
          </button>
        </form>
      </div>
    </div>
  );
}
