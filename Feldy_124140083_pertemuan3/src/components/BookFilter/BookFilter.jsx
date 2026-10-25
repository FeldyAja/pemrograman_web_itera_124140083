import PropTypes from 'prop-types';
import { STATUS_OPTIONS } from '../../constants/book';
import './BookFilter.css';

// Komponen pencarian (judul atau penulis) dan penyaring status buku.
// Nilainya dikelola oleh komponen induk (controlled component).
function BookFilter({ searchTerm, onSearchChange, statusFilter, onStatusChange }) {
  return (
    <div className="book-filter">
      <input
        type="text"
        aria-label="Cari buku"
        placeholder="Cari berdasarkan judul atau penulis..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        aria-label="Filter status"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="semua">Semua Status</option>
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

BookFilter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  statusFilter: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default BookFilter;