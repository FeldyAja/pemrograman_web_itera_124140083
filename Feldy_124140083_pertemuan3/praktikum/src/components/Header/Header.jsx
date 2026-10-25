import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

// Komponen judul halaman. Properti "description" bersifat opsional.
function Header({ title, description }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      {/* Paragraf hanya ditampilkan jika deskripsi diberikan oleh komponen induk */}
      {description && <p>{description}</p>}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Header;