/**
 * FundSimulatorBar - Pinned Control Bar for 'Club Test' Simulation
 * Provides 1-touch role toggle and instant SePay Webhook simulation
 * Compliance: RULE[user_global] <= 500 lines
 */

import React from 'react';
import { useFund } from '../FundContext';

export default function FundSimulatorBar() {
  const {
    currentRole,
    currentMember,
    members,
    switchRole,
    selectMember,
    obligations,
    simulateWebhook,
  } = useFund();

  const handleSimulateFirstDue = () => {
    const target = obligations.find(o => o.status !== 'PAID') || obligations[0];
    if (target) {
      simulateWebhook(target.code, target.remainingAmount || target.amountDue);
    }
  };

  return (
    <div className="fund-sim-bar">
      <div className="fund-sim-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="fund-sim-tag">⚡ GIẢ LẬP CL01</span>
          <div className="fund-role-toggle">
            <button
              className={`fund-role-btn ${currentRole === 'MEMBER' ? 'active' : ''}`}
              onClick={() => switchRole('MEMBER')}
            >
              👤 Thành viên
            </button>
            <button
              className={`fund-role-btn ${currentRole === 'TREASURER' ? 'active' : ''}`}
              onClick={() => switchRole('TREASURER')}
            >
              💼 Thủ quỹ
            </button>
          </div>
        </div>

        <button
          className="fund-sim-trigger-btn"
          onClick={handleSimulateFirstDue}
          title="Mô phỏng SePay báo biến động số dư ngân hàng"
        >
          🔔 SePay Webhook
        </button>
      </div>

      <div className="fund-sim-row" style={{ fontSize: '11px', color: '#cbd5e1' }}>
        <span>Đang đóng vai:</span>
        <select
          className="fund-sim-select"
          value={currentMember?.id || 3}
          onChange={(e) => selectMember(e.target.value)}
        >
          {members.map(m => (
            <option key={m.id} value={m.id} style={{ color: '#0f172a' }}>
              {m.code} - {m.name} ({m.role})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
