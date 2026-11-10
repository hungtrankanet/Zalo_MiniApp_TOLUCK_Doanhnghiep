/**
 * VietQR & Financial Helpers for TOLUCK Club Fund Module
 * Pure client-side EMVCo / NAPAS 247 compliant VietQR builder
 * Compliance: RULE[user_global] <= 500 lines
 */

/**
 * Compute CRC16-CCITT (polynomial 0x1021, init 0xFFFF)
 * Standard EMVCo / ISO/IEC 13239
 * @param {string} str
 * @returns {string} 4-char uppercase hex
 */
export function crc16Ccitt(str) {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/**
 * Build TLV (Tag-Length-Value) string
 * @param {string} tag 2-digit tag
 * @param {string} value
 * @returns {string}
 */
export function buildTlv(tag, value) {
  const len = String(value.length).padStart(2, "0");
  return `${tag}${len}${value}`;
}

/**
 * Build pure EMVCo VietQR string for Napas 247
 * @param {Object} params
 * @param {string} params.bankBin - 6-digit BIN (e.g. '970416' for ACB)
 * @param {string} params.accountNo - Account number
 * @param {number} [params.amount] - Transfer amount
 * @param {string} [params.content] - Transfer memo/code (e.g. 'TLCL01A7K2P9')
 * @returns {string}
 */
export function buildVietQrString({ bankBin, accountNo, amount = 0, content = "" }) {
  let payload = buildTlv("00", "01");
  payload += buildTlv("01", amount > 0 ? "12" : "11");

  const subOrg = buildTlv("00", bankBin) + buildTlv("01", accountNo);
  const tag38Value = buildTlv("00", "A000000727") + buildTlv("01", subOrg) + buildTlv("02", "QRIBFTTA");
  payload += buildTlv("38", tag38Value);

  payload += buildTlv("53", "704");

  if (amount > 0) {
    payload += buildTlv("54", String(Math.round(amount)));
  }

  payload += buildTlv("58", "VN");

  if (content && content.trim() !== "") {
    const cleanContent = content.trim().replace(/[^a-zA-Z0-9_\-\s]/g, "");
    const tag62Value = buildTlv("08", cleanContent);
    payload += buildTlv("62", tag62Value);
  }

  const prefixForCrc = payload + "6304";
  const checksum = crc16Ccitt(prefixForCrc);

  return prefixForCrc + checksum;
}

/**
 * Format integer to Vietnamese Dong currency display
 * @param {number} amount
 * @returns {string}
 */
export function formatVnd(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return "0 đ";
  return Number(amount).toLocaleString("vi-VN") + " đ";
}

/**
 * Format ISO datetime string to Vietnamese standard
 * @param {string} isoString
 * @returns {string}
 */
export function formatDateTime(isoString) {
  if (!isoString) return "";
  try {
    const d = new Date(isoString);
    return d.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return isoString;
  }
}

/**
 * Robust cross-platform copy to clipboard
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    // fallback
  }

  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error("Clipboard copy failed:", err);
    return false;
  }
}

/**
 * Download QR Canvas or Data URL as PNG image
 * @param {string} dataUrl
 * @param {string} filename
 */
export function downloadQrImage(dataUrl, filename = "vietqr-toluck.png") {
  try {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    console.error("Download image failed:", err);
  }
}
