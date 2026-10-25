import PropTypes from 'prop-types';
import BookItem from '../BookItem/BookItem';
import { bookShape } from '../../constants/book';
import './BookList.css';

// Menampilkan daftar buku, atau pesan kosong jika tidak ada buku yang cocok.
function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="empty-message">Belum ada buku yang dapat ditampilkan.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(bookShape).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;