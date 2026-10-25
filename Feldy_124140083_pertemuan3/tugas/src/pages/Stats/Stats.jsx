import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import { STATUS_OPTIONS } from '../../constants/book';
import './Stats.css';

// Halaman ringkasan jumlah buku berdasarkan status.
function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  return (
    <main className="container">
      <h1 className="page-title">Statistik Buku</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total Buku</span>
        </div>

        {STATUS_OPTIONS.map((option) => (
          <div className="stat-card" key={option.value}>
            <span className="stat-number">{stats[option.value]}</span>
            <span className="stat-label">{option.label}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Stats;