import React from 'react';
import Header from '../../components/Header/Header';
import { useTasks } from '../../context/TaskContext';
import './About.css';

// Halaman informasi singkat mengenai aplikasi.
function About() {
  // ===== LATIHAN MANDIRI: Statistik tugas di halaman About =====
  // Data diambil dari context yang sama dengan halaman Home.
  const { stats } = useTasks();

  return (
    <div className="about">
      <Header
        title="Tentang Task Manager"
        description="Aplikasi Manajemen Tugas Praktikum Pemrograman Web"
      />

      <main className="container">
        <div className="about-content">
          <h2>Tentang Aplikasi</h2>
          <p>
            Aplikasi Task Manager ini dibangun menggunakan React modern dengan functional components,
            React Hooks (useState, useEffect), dan React Router untuk navigasi multi-halaman.
          </p>

          <h3>Fitur Unggulan:</h3>
          <ul>
            <li>Manajemen tugas real-time (tambah, tandai selesai, hapus)</li>
            <li>Penyimpanan lokal persisten melalui localStorage</li>
            <li>Navigasi kilat tanpa refresh halaman</li>
            <li>Ringkasan statistik capaian harian</li>
          </ul>

          {/* ===== LATIHAN MANDIRI: Statistik tugas di halaman About ===== */}
          <p className="about-stats">
            Saat ini Anda memiliki total <strong>{stats.total}</strong> tugas yang tersimpan di sistem.
          </p>
        </div>
      </main>
    </div>
  );
}

export default About;