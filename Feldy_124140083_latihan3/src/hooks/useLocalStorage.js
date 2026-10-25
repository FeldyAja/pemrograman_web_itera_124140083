import { useState, useEffect } from 'react';

// Custom hook yang bekerja seperti useState, tetapi nilainya otomatis
// tersimpan di localStorage sehingga tidak hilang saat halaman dimuat ulang.
function useLocalStorage(key, initialValue) {
  // Nilai awal dibaca dari localStorage satu kali saat komponen pertama dimuat
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Setiap nilai berubah, simpan kembali ke localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;