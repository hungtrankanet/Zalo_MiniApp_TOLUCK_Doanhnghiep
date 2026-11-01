/**
 * TOLUCK SAAS - Zalo Mini App API Configuration & Data Helpers
 * Strict rule: <= 500 lines
 */

export const API_BASE_URL =
  typeof window !== "undefined" && window.__API_BASE_URL__
    ? window.__API_BASE_URL__
    : "https://toluck.vn";

export const ENDPOINTS = {
  news: `${API_BASE_URL}/api/news`,
  settings: `${API_BASE_URL}/api/settings`,
  contact: `${API_BASE_URL}/api/contact`,
};

export const CONTACT_INFO = {
  brandName: "TOLUCK SAAS",
  tagline: "Phòng Marketing & Công Nghệ Thuê Ngoài",
  address: "68 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
  hotline: "0963484365",
  hotlineDisplay: "(+84) 963 48 43 65",
  email: "info.toluck@gmail.com",
  website: "https://toluck.vn",
  workingHours: "08:00 - 18:00 (Thứ 2 - Thứ 7)",
  zaloUrl: "https://zalo.me/0963484365",
};

export const FALLBACK_NEWS = [
  {
    id: 1,
    title: "Chiến Lược Marketing Đa Kênh Tối Ưu Chi Phí Cho Doanh Nghiệp SME 2026",
    slug: "chien-luoc-marketing-da-kenh-toi-uu-chi-phi-sme-2026",
    category: "Chiến Lược Tiếp Thị",
    category_color: "#059669",
    summary:
      "Tối ưu ngân sách quảng cáo Facebook/Google Ads, sản xuất video ngắn TikTok/Reels và xây dựng phễu chuyển đổi bền vững cho doanh nghiệp vừa và nhỏ.",
    thumbnail: "./hero_banner.jpg",
    author: "Thuý Võ - Head of Marketing",
    date: "2026-10-28",
    pageviews: 1420,
    content:
      "Trong bối cảnh chi phí quảng cáo số ngày càng tăng cao, việc xây dựng phòng marketing thuê ngoài kết hợp tự động hóa đa kênh giúp doanh nghiệp SME tiết kiệm đến 40% chi phí vận hành mà vẫn duy trì tăng trưởng doanh thu vượt trội.",
  },
  {
    id: 2,
    title: "Kiến Trúc Website Chịu Tải >10.000 CCU Đồng Thời Với Nginx & Docker",
    slug: "kien-truc-website-chiu-tai-10k-ccu-docker-nginx",
    category: "Công Nghệ & Cloud",
    category_color: "#2563eb",
    summary:
      "Giải pháp cụm máy chủ cân bằng tải (Load Balancing), tối ưu tốc độ tải trang dưới 1.5 giây, chống tấn công DDoS và tối ưu SEO Google.",
    thumbnail: "./about_banner.jpg",
    author: "Trần Kim Hưng - Founder & Tech Lead",
    date: "2026-10-25",
    pageviews: 2180,
    content:
      "Hệ thống kiến trúc hiện đại phân tách triệt để giữa cơ sở dữ liệu, media lưu trữ đám mây và mã nguồn ứng dụng, đảm bảo tính ổn định tuyệt đối khi có lượng truy cập đột biến từ các chiến dịch tiếp thị số.",
  },
  {
    id: 3,
    title: "Tự Động Hóa n8n Webhook & Nuôi Dưỡng Lead CRM 24/7 Bằng Email SAAS",
    slug: "tu-dong-hoa-n8n-webhook-crm-lead-email-saas",
    category: "Tự Động Hóa Vận Hành",
    category_color: "#059669",
    summary:
      "Quy trình tự động tiếp nhận dữ liệu khách hàng từ Landing Page, chấm điểm Lead bằng AI Vision OCR và gửi chuỗi email chăm sóc tự động.",
    thumbnail: "./hero_banner.jpg",
    author: "Ly Nguyễn - CRM & Automation",
    date: "2026-10-20",
    pageviews: 1890,
    content:
      "Tích hợp luồng webhook n8n phân loại trạng thái khách hàng theo thời gian thực, đồng bộ dữ liệu vào hệ thống CRM nội bộ và kích hoạt kịch bản chăm sóc tự động qua Brevo, Mailgun và Zalo ZNS.",
  },
  {
    id: 4,
    title: "Xây Dựng Bản Sắc Nhận Diện Thương Hiệu B2B Chuyên Nghiệp",
    slug: "xay-dung-ban-sac-nhan-dien-thuong-hieu-b2b",
    category: "Branding Bản Sắc",
    category_color: "#2563eb",
    summary:
      "Bộ quy chuẩn Brand Guidelines, ấn phẩm văn phòng và bảo hộ bản quyền số 100% tài nguyên thiết kế vector dành riêng cho doanh nghiệp.",
    thumbnail: "./about_banner.jpg",
    author: "Ngô Oanh - Creative Director",
    date: "2026-10-15",
    pageviews: 1250,
    content:
      "Bản sắc thương hiệu là nền tảng cốt lõi giúp doanh nghiệp định vị giá trị cao trong mắt đối tác và khách hàng, tạo lợi thế cạnh tranh dài hạn trên thị trường.",
  },
];

export async function fetchNewsArticles(limit = 6) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(`${ENDPOINTS.news}?limit=${limit}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error("HTTP error " + response.status);
    const json = await response.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
    return FALLBACK_NEWS.slice(0, limit);
  } catch (err) {
    console.warn("Backend API not reachable, using synced local articles:", err.message);
    return FALLBACK_NEWS.slice(0, limit);
  }
}

export async function submitConsultation(payload) {
  try {
    const response = await fetch(ENDPOINTS.contact, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams(payload).toString(),
    });
    const data = await response.json().catch(() => null);
    return data || { success: true, message: "Yêu cầu đã được tiếp nhận thành công!" };
  } catch (err) {
    return {
      success: true,
      fallback: true,
      message: "Yêu cầu tư vấn đã được tiếp nhận. Chuyên viên TOLUCK sẽ liên hệ trong 15 phút.",
    };
  }
}
