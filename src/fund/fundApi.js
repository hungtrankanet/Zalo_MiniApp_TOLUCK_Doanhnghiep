/**
 * Fund Module API Client with Reactive Offline Mock Fallback
 * Seamlessly switches between Backend REST API (/api/fund/*) and Local Mock Store
 * Compliance: RULE[user_global] <= 500 lines
 */

import { MOCK_CHAPTER, MOCK_MEMBERS, MOCK_FEE_ITEMS, MOCK_OBLIGATIONS, MOCK_LEDGER } from './mockFundData';
import { buildVietQrString } from './vietQrHelper';

// In-memory reactive state for mock operations
let mockObligations = JSON.parse(JSON.stringify(MOCK_OBLIGATIONS));
let mockFeeItems = JSON.parse(JSON.stringify(MOCK_FEE_ITEMS));
let mockChapter = JSON.parse(JSON.stringify(MOCK_CHAPTER));
let mockLedger = JSON.parse(JSON.stringify(MOCK_LEDGER));

const BASE_URL = '/api/fund';

async function request(endpoint, options = {}) {
  try {
    const res = await fetch(BASE_URL + endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'X-Chapter-Code': 'CL01',
        ...(options.headers || {}),
      },
      ...options,
    });
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    return null;
  }
}

export const fundApi = {
  // 1. Get Chapter Details
  async getChapter(code = 'CL01') {
    const remote = await request(`/chapter/${code}`);
    if (remote) return remote;
    return mockChapter;
  },

  // 2. Get Member Obligations
  async getMemberObligations(memberId = 3, chapterCode = 'CL01') {
    const remote = await request(`/me/obligations?memberId=${memberId}&chapter=${chapterCode}`);
    if (remote && Array.isArray(remote)) return remote;
    return mockObligations.filter(o => o.memberId === Number(memberId));
  },

  // 3. Get Single Obligation Detail & VietQR String
  async getObligationDetail(codeOrId) {
    const remote = await request(`/obligations/${codeOrId}`);
    if (remote) return remote;

    const found = mockObligations.find(o => o.id === Number(codeOrId) || o.code === codeOrId);
    if (!found) return null;

    const qrString = buildVietQrString({
      bankBin: mockChapter.bankBin,
      accountNo: mockChapter.bankAccountNo,
      amount: found.remainingAmount,
      content: found.code,
    });

    return {
      ...found,
      chapter: mockChapter,
      qrString,
    };
  },

  // 4. Create Bundle Payment
  async createBundle(memberId, obligationIds) {
    const remote = await request('/bundles', {
      method: 'POST',
      body: JSON.stringify({ memberId, obligationIds }),
    });
    if (remote) return remote;

    const selected = mockObligations.filter(o => obligationIds.includes(o.id));
    const totalAmount = selected.reduce((sum, item) => sum + item.remainingAmount, 0);
    const bundleCode = 'TLCL01G' + Math.random().toString(36).substring(2, 7).toUpperCase();

    const qrString = buildVietQrString({
      bankBin: mockChapter.bankBin,
      accountNo: mockChapter.bankAccountNo,
      amount: totalAmount,
      content: bundleCode,
    });

    return {
      bundleCode,
      totalAmount,
      obligationCount: selected.length,
      obligations: selected,
      qrString,
      accountNo: mockChapter.bankAccountNo,
      bankName: mockChapter.bankName,
    };
  },

  // 5. Report Transfer (Báo đã chuyển khoản)
  async reportPayment(payload) {
    const remote = await request('/report-payment', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (remote) return remote;

    mockObligations = mockObligations.map(o => {
      if (o.code === payload.code || o.id === Number(payload.obligationId)) {
        return { ...o, status: 'PENDING' };
      }
      return o;
    });

    return { success: true, message: 'Đã gửi báo cáo chuyển khoản thành công. Thủ quỹ sẽ duyệt trong 24h.' };
  },

  // 6. Get Transparent Fund Ledger (MA-08)
  async getLedger(chapterCode = 'CL01') {
    const remote = await request(`/summary?chapter=${chapterCode}`);
    if (remote) return remote;
    return {
      chapter: mockChapter,
      ledger: mockLedger,
    };
  },

  // 7. Get Treasurer Dashboard Overview (MA-09)
  async getTreasurerOverview(chapterCode = 'CL01') {
    const remote = await request(`/admin/progress?chapter=${chapterCode}`);
    if (remote) return remote;

    const totalTarget = mockFeeItems.reduce((acc, f) => acc + f.targetAmount, 0);
    const totalCollected = mockFeeItems.reduce((acc, f) => acc + f.collectedAmount, 0);
    const pendingCount = mockObligations.filter(o => o.status === 'PENDING').length;

    return {
      chapter: mockChapter,
      feeItems: mockFeeItems,
      totalTarget,
      totalCollected,
      collectionRate: totalTarget > 0 ? Math.round((totalCollected / totalTarget) * 100) : 0,
      pendingCount,
    };
  },

  // 8. Create Quick Fee Item in 30s (MA-10)
  async createFeeItem(payload) {
    const remote = await request('/admin/fee-items', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (remote) return remote;

    const newItem = {
      id: Date.now(),
      title: payload.title,
      category: payload.category || 'PERIODIC',
      amountPerMember: Number(payload.amountPerMember),
      dueDate: payload.dueDate,
      description: payload.description || '',
      targetAmount: Number(payload.amountPerMember) * 40,
      collectedAmount: 0,
      paidCount: 0,
      totalCount: 40,
      status: 'ACTIVE',
    };

    mockFeeItems.unshift(newItem);

    MOCK_MEMBERS.forEach((m, idx) => {
      const code = 'TLCL01' + Math.random().toString(36).substring(2, 8).toUpperCase();
      mockObligations.push({
        id: Date.now() + idx,
        feeItemId: newItem.id,
        memberId: m.id,
        code,
        title: newItem.title,
        amountDue: newItem.amountPerMember,
        amountPaid: 0,
        remainingAmount: newItem.amountPerMember,
        dueDate: newItem.dueDate,
        status: 'UNPAID',
        isOverdue: false,
        daysLeft: 7,
      });
    });

    return newItem;
  },

  // 9. Generate Reminder Text (BR-16)
  async getReminder(feeItemId, type = 'GROUP') {
    const remote = await request(`/admin/reminder?feeItemId=${feeItemId}&type=${type}`);
    if (remote) return remote;

    const fee = mockFeeItems.find(f => f.id === Number(feeItemId)) || mockFeeItems[0];
    const unpaidCount = 40 - fee.paidCount;

    if (type === 'GROUP') {
      return {
        type: 'GROUP',
        content: `[THÔNG BÁO QUỸ CHAPTER CL01]\nKính gửi các anh/chị thành viên,\nTiến độ thu khoản: ${fee.title}\n- Tỷ lệ đã đóng: ${fee.paidCount}/40 thành viên (${Math.round((fee.paidCount/40)*100)}%)\n- Số lượng chưa hoàn thành: ${unpaidCount} thành viên\n- Hạn nộp: ${fee.dueDate}\nKính mời các anh/chị mở Zalo Mini App để đóng quỹ nhanh trong 3 bước chạm qua VietQR. Trân trọng!`,
      };
    } else {
      return {
        type: 'DIRECT',
        content: `Chào anh/chị, em là Thủ quỹ Chapter CL01. Em gửi thông tin nghĩa vụ quỹ: ${fee.title}, số tiền: ${Number(fee.amountPerMember).toLocaleString('vi-VN')} đ, hạn nộp: ${fee.dueDate}. Anh/chị vui lòng mở Zalo Mini App để quét VietQR nhé!`,
      };
    }
  },

  // 10. Approve Pending Payment (MA-12)
  async approvePayment(obligationId, approved = true, reason = '') {
    const remote = await request('/admin/confirm-payment', {
      method: 'POST',
      body: JSON.stringify({ obligationId, approved, reason }),
    });
    if (remote) return remote;

    mockObligations = mockObligations.map(o => {
      if (o.id === Number(obligationId)) {
        return {
          ...o,
          status: approved ? 'PAID' : 'UNPAID',
          amountPaid: approved ? o.amountDue : o.amountPaid,
          remainingAmount: approved ? 0 : o.remainingAmount,
        };
      }
      return o;
    });

    return { success: true };
  },

  // 11. Record Cash Payment (MA-12)
  async recordCash(memberId, feeItemId, amount) {
    const remote = await request('/admin/cash-payment', {
      method: 'POST',
      body: JSON.stringify({ memberId, feeItemId, amount }),
    });
    if (remote) return remote;

    mockObligations = mockObligations.map(o => {
      if (o.memberId === Number(memberId) && o.feeItemId === Number(feeItemId)) {
        return {
          ...o,
          status: 'PAID',
          amountPaid: o.amountDue,
          remainingAmount: 0,
        };
      }
      return o;
    });

    return { success: true };
  },

  // 12. Simulate SePay Webhook Trigger (Simulator Bar)
  async simulateWebhook(code, amount) {
    const remote = await request('/simulator/webhook', {
      method: 'POST',
      body: JSON.stringify({ code, amount }),
    });
    if (remote) return remote;

    mockObligations = mockObligations.map(o => {
      if (o.code === code) {
        return {
          ...o,
          status: 'PAID',
          amountPaid: o.amountDue,
          remainingAmount: 0,
        };
      }
      return o;
    });

    return { success: true, message: `SePay Webhook đã kích hoạt thành công! Đã ghi nhận số tiền ${Number(amount).toLocaleString('vi-VN')} đ cho mã ${code}` };
  },
};
