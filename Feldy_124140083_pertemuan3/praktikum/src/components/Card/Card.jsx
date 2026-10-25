import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

// ===== LATIHAN MANDIRI: Komponen Card dengan props.children =====
// Card berfungsi sebagai pembungkus berbingkai. Isi di antara tag <Card>...</Card>
// diterima melalui props.children, sehingga komponen ini dapat dipakai ulang.
function Card({ children }) {
  return <div className="card">{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;