import PropTypes from 'prop-types';
import { getStatusLabel, bookShape } from '../../constants/book';
import './BookItem.css';

// Menampilkan satu buku beserta tombol untuk mengedit dan menghapusnya.
function BookItem({ book, onEdit, onDelete }) {
  return (
    <div className="book-item">
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">Penulis: {book.author}</p>
        <span className={`status-badge status-${book.status}`}>
          {getStatusLabel(book.status)}
        </span>
      </div>
      <div className="book-actions">
        <button type="button" className="edit-btn" onClick={() => onEdit(book)}>
          Edit
        </button>
        <button type="button" className="delete-btn" onClick={() => onDelete(book.id)}>
          Hapus
        </button>
      </div>
    </div>
  );
}

BookItem.propTypes = {
  book: bookShape.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookItem;