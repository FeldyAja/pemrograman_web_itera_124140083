import { useState, useEffect } from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import './Home.css';

function Home() {
  const { books, addBook, updateBook, deleteBook } = useBooks();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');
  const [editingBook, setEditingBook] = useState(null);

  // Memperbarui judul tab browser setiap jumlah buku berubah.
  useEffect(() => {
    document.title = `Buku Saya (${books.length})`;
  }, [books.length]);

  // Menyaring buku berdasarkan kata kunci (judul/penulis) dan status.
  const keyword = searchTerm.trim().toLowerCase();
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword);
    const matchesStatus = statusFilter === 'semua' || book.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (bookData) => {
    if (editingBook) {
      updateBook(editingBook.id, bookData);
      setEditingBook(null);
    } else {
      addBook(bookData);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus buku ini?')) {
      deleteBook(id);
      // Jika buku yang dihapus sedang diedit, batalkan mode edit.
      if (editingBook && editingBook.id === id) {
        setEditingBook(null);
      }
    }
  };

  return (
    <main className="container">
      <h1 className="page-title">Manajemen Buku Pribadi</h1>

      {/* Properti key membuat formulir dibuat ulang setiap berpindah antara
          mode tambah dan mode edit, sehingga isinya selalu sesuai. */}
      <BookForm
        key={editingBook ? editingBook.id : 'tambah'}
        onSubmit={handleSubmit}
        initialData={editingBook}
        onCancel={() => setEditingBook(null)}
      />

      <BookFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <p className="result-info">
        Menampilkan {filteredBooks.length} dari {books.length} buku
      </p>

      <BookList books={filteredBooks} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
}

export default Home;