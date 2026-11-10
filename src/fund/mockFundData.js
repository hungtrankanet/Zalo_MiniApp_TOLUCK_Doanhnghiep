/**
 * Mock Data Store for Chapter 'Club Test' (CL01)
 * Supports 100% offline fallback navigation and testing
 * Compliance: RULE[user_global] <= 500 lines
 */

export const MOCK_CHAPTER = {
  id: 1,
  code: 'CL01',
  name: 'Club Test (Chapter Doanh Nhân CL01)',
  logoUrl: 'https://toluck.com.vn/assets/themes/suntransco/img/logo-sun.png',
  region: 'TP. Hồ Chí Minh',
  bankBin: '970416', // ACB
  bankName: 'Ngân hàng TMCP Á Châu (ACB)',
  bankAccountNo: '246813579',
  bankAccountName: 'QUY CHAPTER CL01',
  overpaymentPolicy: 'TO_FUND',
  guestFee: 150000,
  currentBalance: 125450000,
  totalIn: 342000000,
  totalOut: 216550000,
  memberCount: 40,
  activeFeeCount: 3,
};

export const MOCK_MEMBERS = [
  { id: 1, code: 'M01', name: 'Nguyễn Văn An', phone: '0901234001', role: 'PRESIDENT', title: 'Chủ tịch Chapter', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
  { id: 2, code: 'M02', name: 'Trần Thị Bích', phone: '0901234002', role: 'TREASURER', title: 'Thủ quỹ Chapter', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80' },
  { id: 3, code: 'M03', name: 'Lê Hoàng Cường', phone: '0901234003', role: 'MEMBER', title: 'Giám đốc Vận tải ABC', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
  { id: 4, code: 'M04', name: 'Phạm Minh Đức', phone: '0901234004', role: 'MEMBER', title: 'Chủ chuỗi F&B Star', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
  { id: 5, code: 'M05', name: 'Vũ Hải Đăng', phone: '0901234005', role: 'MEMBER', title: 'CEO Công ty Công Nghệ TechX', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' },
  { id: 6, code: 'M06', name: 'Đỗ Thị Hạnh', phone: '0901234006', role: 'MEMBER', title: 'GĐ Bất Động Sản Landmark', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' },
  { id: 7, code: 'M07', name: 'Bùi Quang Khải', phone: '0901234007', role: 'MEMBER', title: 'GĐ Công ty Nội thất WoodCraft', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80' },
  { id: 8, code: 'M08', name: 'Hoàng Kim Liên', phone: '0901234008', role: 'MEMBER', title: 'GĐ Chuỗi Spa Luxury', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' },
  { id: 9, code: 'M09', name: 'Ngô Thanh Nam', phone: '0901234009', role: 'MEMBER', title: 'GĐ Xưởng Sản Xuất Bao Bì', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80' },
  { id: 10, code: 'M10', name: 'Dương Thu Oanh', phone: '0901234010', role: 'MEMBER', title: 'Luật sư Trưởng Văn phòng Luật', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80' },
];

// Append remaining 30 members compactly
for (let i = 11; i <= 40; i++) {
  const pad = String(i).padStart(2, '0');
  MOCK_MEMBERS.push({
    id: i,
    code: 'M' + pad,
    name: 'Thành viên CL01 #' + pad,
    phone: '09012340' + pad,
    role: 'MEMBER',
    title: 'Hội viên Doanh nghiệp #' + pad,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
  });
}

export const MOCK_FEE_ITEMS = [
  {
    id: 1,
    title: 'Quỹ sinh hoạt định kỳ Quý 4/2026',
    category: 'PERIODIC',
    amountPerMember: 2000000,
    dueDate: '2026-11-20',
    description: 'Chi phí thuê địa điểm họp hàng tuần, teabreak, quà tặng kết nối và vận hành chapter.',
    targetAmount: 80000000,
    collectedAmount: 62000000,
    paidCount: 31,
    totalCount: 40,
    status: 'ACTIVE'
  },
  {
    id: 2,
    title: 'Quỹ ăn sáng & networking tuần 46',
    category: 'WEEKLY',
    amountPerMember: 200000,
    dueDate: '2026-11-12',
    description: 'Bữa sáng giao thương thứ 5 hàng tuần tại Khách sạn New World.',
    targetAmount: 8000000,
    collectedAmount: 4800000,
    paidCount: 24,
    totalCount: 40,
    status: 'ACTIVE'
  },
  {
    id: 3,
    title: 'Quỹ thiện nguyện Áo Ấm Vùng Cao 2026',
    category: 'CHARITY',
    amountPerMember: 500000,
    dueDate: '2026-11-05',
    description: 'Quyên góp áo ấm và học bổng cho 500 học sinh tiểu học huyện Mèo Vạc, Hà Giang.',
    targetAmount: 20000000,
    collectedAmount: 18500000,
    paidCount: 37,
    totalCount: 40,
    status: 'ACTIVE'
  }
];

export const MOCK_OBLIGATIONS = [
  {
    id: 101,
    feeItemId: 1,
    memberId: 3, // Lê Hoàng Cường
    code: 'TLCL01A7K2P9',
    title: 'Quỹ sinh hoạt định kỳ Quý 4/2026',
    amountDue: 2000000,
    amountPaid: 0,
    remainingAmount: 2000000,
    dueDate: '2026-11-20',
    status: 'UNPAID',
    isOverdue: false,
    daysLeft: 10
  },
  {
    id: 102,
    feeItemId: 2,
    memberId: 3,
    code: 'TLCL01B3M8Q1',
    title: 'Quỹ ăn sáng & networking tuần 46',
    amountDue: 200000,
    amountPaid: 0,
    remainingAmount: 200000,
    dueDate: '2026-11-12',
    status: 'UNPAID',
    isOverdue: false,
    daysLeft: 2
  },
  {
    id: 103,
    feeItemId: 3,
    memberId: 3,
    code: 'TLCL01C9F4L2',
    title: 'Quỹ thiện nguyện Áo Ấm Vùng Cao 2026',
    amountDue: 500000,
    amountPaid: 0,
    remainingAmount: 500000,
    dueDate: '2026-11-05',
    status: 'UNPAID',
    isOverdue: true, // Quá hạn đỏ
    daysLeft: -5
  },
  {
    id: 104,
    feeItemId: 1,
    memberId: 4, // Phạm Minh Đức (Partial)
    code: 'TLCL01D2X7N5',
    title: 'Quỹ sinh hoạt định kỳ Quý 4/2026',
    amountDue: 2000000,
    amountPaid: 1000000,
    remainingAmount: 1000000,
    dueDate: '2026-11-20',
    status: 'PARTIAL',
    isOverdue: false,
    daysLeft: 10
  },
  {
    id: 105,
    feeItemId: 2,
    memberId: 5, // Vũ Hải Đăng (Pending approval)
    code: 'TLCL01E5H9T3',
    title: 'Quỹ ăn sáng & networking tuần 46',
    amountDue: 200000,
    amountPaid: 0,
    remainingAmount: 200000,
    dueDate: '2026-11-12',
    status: 'PENDING',
    isOverdue: false,
    daysLeft: 2
  },
  {
    id: 106,
    feeItemId: 1,
    memberId: 2, // Trần Thị Bích (Paid)
    code: 'TLCL01F8J1W6',
    title: 'Quỹ sinh hoạt định kỳ Quý 4/2026',
    amountDue: 2000000,
    amountPaid: 2000000,
    remainingAmount: 0,
    dueDate: '2026-11-20',
    status: 'PAID',
    isOverdue: false,
    daysLeft: 10
  }
];

export const MOCK_LEDGER = [
  { id: 1, date: '2026-11-08 09:15', type: 'IN', amount: 2000000, title: 'Thu quỹ Q4 - Nguyễn Văn An', code: 'TLCL01A7K2P9' },
  { id: 2, date: '2026-11-07 14:30', type: 'OUT', amount: 8500000, title: 'Chi tiệc networking hàng tuần', proofUrl: '#' },
  { id: 3, date: '2026-11-06 10:20', type: 'IN', amount: 500000, title: 'Đóng góp thiện nguyện - Đỗ Thị Hạnh', code: 'TLCL01K3L9Z4' },
  { id: 4, date: '2026-11-05 16:45', type: 'OUT', amount: 15000000, title: 'Chi tạm ứng xe quà tặng Mèo Vạc', proofUrl: '#' },
  { id: 5, date: '2026-11-04 11:00', type: 'IN', amount: 2000000, title: 'Thu quỹ Q4 - Bùi Quang Khải', code: 'TLCL01P8Q2M1' },
];
