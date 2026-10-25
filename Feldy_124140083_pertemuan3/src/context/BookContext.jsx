import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext(null);

// Hook pembantu agar komponen dapat mengakses data buku dengan mudah.
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

// Provider menyimpan data buku beserta fungsi pengelolanya,
// lalu membagikannya ke seluruh komponen di dalamnya.
export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books_data', []);

  const addBook = (bookData) => {
    const newBook = { id: Date.now(), ...bookData };
    setBooks((prev) => [...prev, newBook]);
  };

  const updateBook = (id, bookData) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, ...bookData } : book))
    );
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const value = { books, addBook, updateBook, deleteBook };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};