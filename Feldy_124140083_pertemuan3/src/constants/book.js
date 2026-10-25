import PropTypes from 'prop-types';

// Daftar status buku. Nilai (value) disimpan pada data,
// sedangkan label ditampilkan kepada pengguna.
export const STATUS_OPTIONS = [
  { value: 'milik', label: 'Sudah Dimiliki' },
  { value: 'baca', label: 'Sedang Dibaca' },
  { value: 'beli', label: 'Ingin Dibeli' },
];

// Mengubah nilai status (misalnya "baca") menjadi label yang mudah dibaca.
export function getStatusLabel(value) {
  const found = STATUS_OPTIONS.find((option) => option.value === value);
  return found ? found.label : value;
}

// Bentuk objek buku, digunakan bersama untuk validasi PropTypes.
export const bookShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
});