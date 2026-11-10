/**
 * FundContext - Global State Provider for Fund Module
 * Coordinates Member Portal, Treasurer Desk and Simulator Bar
 * Compliance: RULE[user_global] <= 500 lines
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fundApi } from './fundApi';
import { MOCK_MEMBERS } from './mockFundData';

const FundContext = createContext(null);

export function FundProvider({ children }) {
  const [chapter, setChapter] = useState(null);
  const [currentMember, setCurrentMember] = useState(MOCK_MEMBERS[2]); // Default: Member #3 (Lê Hoàng Cường)
  const [currentRole, setCurrentRole] = useState('MEMBER'); // 'MEMBER' | 'TREASURER'
  const [obligations, setObligations] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [treasurerStats, setTreasurerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Modal State
  const [activeModal, setActiveModal] = useState(null); // 'QR' | 'BUNDLE_QR' | 'REPORT' | 'SUCCESS' | 'TRANSPARENCY' | 'CREATE_FEE' | 'REMINDER' | 'APPROVAL_CASH'
  const [modalData, setModalData] = useState(null);

  const showToast = useCallback((msg, duration = 3000) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, duration);
  }, []);

  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const ch = await fundApi.getChapter('CL01');
      setChapter(ch);

      if (currentMember) {
        const obs = await fundApi.getMemberObligations(currentMember.id, 'CL01');
        setObligations(obs);
      }

      if (currentRole === 'TREASURER') {
        const stats = await fundApi.getTreasurerOverview('CL01');
        setTreasurerStats(stats);
      }
    } catch (err) {
      console.error('Failed to load fund data:', err);
    } finally {
      setLoading(false);
    }
  }, [currentMember, currentRole]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const switchRole = useCallback((newRole) => {
    setCurrentRole(newRole);
    if (newRole === 'TREASURER') {
      // Set to Member #2 (Trần Thị Bích - Treasurer)
      setCurrentMember(MOCK_MEMBERS[1]);
      showToast('Đã chuyển sang vai trò: THỦ QUÝ CHAPTER CL01');
    } else {
      // Set back to Member #3 (Lê Hoàng Cường)
      setCurrentMember(MOCK_MEMBERS[2]);
      showToast('Đã chuyển sang vai trò: THÀNH VIÊN CHAPTER CL01');
    }
  }, [showToast]);

  const selectMember = useCallback((memberId) => {
    const found = MOCK_MEMBERS.find(m => m.id === Number(memberId));
    if (found) {
      setCurrentMember(found);
      setSelectedIds([]);
      showToast(`Đang giả lập thành viên: ${found.name} (${found.title})`);
    }
  }, [showToast]);

  const toggleSelectObligation = useCallback((id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  const openModal = useCallback((modalName, data = null) => {
    setModalData(data);
    setActiveModal(modalName);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalData(null);
  }, []);

  // Trigger SePay Webhook Mock
  const handleSimulateWebhook = useCallback(async (code, amount) => {
    const res = await fundApi.simulateWebhook(code, amount);
    if (res?.success) {
      showToast(`✅ ${res.message}`);
      await refreshData();
      closeModal();
      openModal('SUCCESS', {
        title: 'Thanh toán thành công!',
        code,
        amount,
        time: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
      });
    }
  }, [refreshData, closeModal, openModal, showToast]);

  const value = {
    chapter,
    currentMember,
    currentRole,
    members: MOCK_MEMBERS,
    obligations,
    selectedIds,
    treasurerStats,
    loading,
    toastMessage,
    activeModal,
    modalData,
    switchRole,
    selectMember,
    toggleSelectObligation,
    clearSelection: () => setSelectedIds([]),
    openModal,
    closeModal,
    showToast,
    refreshData,
    simulateWebhook: handleSimulateWebhook,
  };

  return (
    <FundContext.Provider value={value}>
      {children}
      {toastMessage && (
        <div className="fund-toast-banner animate-fade-in">
          <span>{toastMessage}</span>
        </div>
      )}
    </FundContext.Provider>
  );
}

export function useFund() {
  const ctx = useContext(FundContext);
  if (!ctx) {
    throw new Error('useFund must be used within a FundProvider');
  }
  return ctx;
}
