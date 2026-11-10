/**
 * FundPortalTab - Master Coordinator Component for Fund Module
 * Integrates Simulator Bar, Member Dashboard, Treasurer Desk & Modals
 * Compliance: RULE[user_global] <= 500 lines
 */

import React from 'react';
import { FundProvider, useFund } from './FundContext';
import FundSimulatorBar from './components/FundSimulatorBar';
import MemberDashboard from './components/MemberDashboard';
import TreasurerDashboard from './components/TreasurerDashboard';
import PaymentQrModal from './components/PaymentQrModal';
import ReportTransferModal from './components/ReportTransferModal';
import PaymentSuccessModal from './components/PaymentSuccessModal';
import FundTransparencyView from './components/FundTransparencyView';
import CreateFeeModal from './components/CreateFeeModal';
import ReminderToolModal from './components/ReminderToolModal';
import ApprovalAndCashModal from './components/ApprovalAndCashModal';
import '../css/fund-theme.css';
import '../css/fund-treasurer.css';

function FundPortalContent({ onBackToCommunity }) {
  const { currentRole, activeModal, modalData } = useFund();

  return (
    <div className="fund-portal-container">
      {/* Pinned Simulator Bar */}
      <FundSimulatorBar />

      {/* Top Navigation Back link */}
      <div style={{ padding: '12px 16px 0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={onBackToCommunity}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#2563eb',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          ← Trở về Cộng đồng Đối tác
        </button>
        <span style={{ fontSize: '11px', color: '#64748b' }}>Phiên bản Quỹ v1.0</span>
      </div>

      {/* View Switcher based on Role */}
      {currentRole === 'MEMBER' ? <MemberDashboard /> : <TreasurerDashboard />}

      {/* Dynamic Modals */}
      {activeModal === 'QR' && <PaymentQrModal data={modalData} />}
      {activeModal === 'BUNDLE_QR' && <PaymentQrModal data={modalData} isBundle={true} />}
      {activeModal === 'REPORT' && <ReportTransferModal data={modalData} />}
      {activeModal === 'SUCCESS' && <PaymentSuccessModal data={modalData} />}
      {activeModal === 'TRANSPARENCY' && <FundTransparencyView />}
      {activeModal === 'CREATE_FEE' && <CreateFeeModal />}
      {activeModal === 'REMINDER' && <ReminderToolModal />}
      {activeModal === 'APPROVAL_CASH' && <ApprovalAndCashModal />}
    </div>
  );
}

export default function FundPortalTab({ onBackToCommunity }) {
  return (
    <FundProvider>
      <FundPortalContent onBackToCommunity={onBackToCommunity} />
    </FundProvider>
  );
}
