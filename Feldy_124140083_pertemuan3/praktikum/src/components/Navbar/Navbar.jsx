import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Bilah navigasi utama. Komponen Link berpindah halaman tanpa memuat ulang browser.
function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">Task Manager</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/about">Tentang</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;