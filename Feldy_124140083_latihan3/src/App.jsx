import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar selalu tampil; konten di bawahnya berganti sesuai alamat URL */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* ===== LATIHAN MANDIRI: Rute penangkap untuk halaman 404 ===== */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;