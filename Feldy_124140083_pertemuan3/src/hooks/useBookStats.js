import { useMemo } from 'react';

// Custom hook untuk menghitung statistik koleksi buku.
// useMemo membuat perhitungan hanya diulang ketika daftar buku berubah.
function useBookStats(books) {
  return useMemo(() => {
    const countByStatus = (status) =>
      books.filter((book) => book.status === status).length;

    return {
      total: books.length,
      milik: countByStatus('milik'),
      baca: countByStatus('baca'),
      beli: countByStatus('beli'),
    };
  }, [books]);
}

export default useBookStats;