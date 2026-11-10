/**
 * FundTransparencyView - MA-08: Chapter Fund Transparency
 * Shows balance, total in/out, and transparent ledger without exposing individual debtor lists
 * Compliance: RULE[user_global] <= 500 lines
 */

import React, { useState, useEffect } from 'react';
import { useFund } from '../FundContext';
import { fundApi } from '../fundApi';
import { formatVnd } from '../vietQrHelper';

export default function FundTransparencyView() {
  const { chapter, closeModal } = useFund();
  const [ledgerData, setLedgerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fundApi.getLedger(chapter?.code || 'CL01');
        if (res?.ledger) setLedgerData(res.ledger);
      } catch (err) {
        console.error('Failed to load ledger:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [chapter]);

  return (
    <div className="fund-modal-overlay" onClick={closeModal}>
      <div className="fund-modal-sheet" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '85vh' }}>
        <div className="fund-modal-header">
          <div>
            <div className="fund-modal-title">Minh bạch Quỹ Chapter {chapter?.code || 'CL01'}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Báo cáo thu - chi tài chính công khai</div>
          </div>
          <button className="fund-modal-close" onClick={closeModal}>✕</button>
        </div>

        {/* Financial Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
          <div style={{ background: '#ecfdf5', padding: '12px 8px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#047857', fontWeight: 600 }}>Số dư hiện tại</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
              {formatVnd(chapter?.currentBalance)}
            </div>
          </div>
          <div style={{ background: '#eff6ff', padding: '12px 8px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#1d4ed8', fontWeight: 600 }}>Tổng thu luỹ kế</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>
              {formatVnd(chapter?.totalIn)}
            </div>
          </div>
          <div style={{ background: '#fef2f2', padding: '12px 8px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#b91c1c', fontWeight: 600 }}>Tổng chi luỹ kế</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#dc2626', marginTop: '4px' }}>
              {formatVnd(chapter?.totalOut)}
            </div>
          </div>
        </div>

        {/* Ledger List */}
        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', color: '#1e293b' }}>
          Nhật ký thu chi gần nhất
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>Đang tải nhật ký...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ledgerData.map(item => (
              <div
                key={item.id}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{item.title}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{item.date}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: item.type === 'IN' ? '#059669' : '#dc2626',
                    }}
                  >
                    {item.type === 'IN' ? '+' : '-'}{formatVnd(item.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
