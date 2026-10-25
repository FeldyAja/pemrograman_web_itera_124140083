import { useState, useEffect } from 'react';

// Custom hook yang bekerja seperti useState, tetapi nilainya otomatis
// disimpan di localStorage sehingga tidak hilang saat halaman dimuat ulang.
function useLocalStorage(key, initialValue) {
  // Nilai awal dibaca dari localStorage satu kali saat komponen pertama kali dimuat.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Gagal membaca data dari localStorage:', error);
      return initialValue;
    }
  });

  // Setiap nilai berubah, simpan kembali ke localStorage.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Gagal menyimpan data ke localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;