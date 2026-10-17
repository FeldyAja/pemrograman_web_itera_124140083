// js/modules/utils.js
// Fungsi-fungsi kecil pembantu yang diekspor

export const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
};

export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Tambahan buat latihan: kalau string HTML langsung dimasukin ke innerHTML,
// browser bakal nge-render-nya. Fungsi ini bikin tag-nya tampil sebagai teks.
export const escapeHtml = (text) => {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};
