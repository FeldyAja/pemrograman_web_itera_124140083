import { Link } from 'react-router-dom';
import './Navbar.css';

// Navigasi utama. Komponen Link tidak memuat ulang halaman,
// sehingga perpindahan antarhalaman terasa lebih cepat.
function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">Buku Saya</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/stats">Statistik</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;