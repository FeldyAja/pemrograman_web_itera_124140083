import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

// ===== LATIHAN MANDIRI: Halaman 404 (Not Found) =====
// Ditampilkan ketika pengguna membuka alamat yang tidak terdaftar pada router.
function NotFound() {
  return (
    <main className="container not-found">
      <h1 className="not-found-code">404</h1>
      <h2>Halaman Tidak Ditemukan</h2>
      <p>Maaf, alamat yang Anda tuju tidak tersedia atau telah dipindahkan.</p>
      <Link to="/" className="not-found-link">Kembali ke Beranda</Link>
    </main>
  );
}

export default NotFound;