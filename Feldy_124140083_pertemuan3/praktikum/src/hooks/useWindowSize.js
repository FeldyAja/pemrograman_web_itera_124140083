import { useState, useEffect } from 'react';

// Custom hook untuk memantau lebar jendela browser secara real-time.
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth });
    }

    window.addEventListener('resize', handleResize);

    // Fungsi pembersih: melepas listener saat komponen dilepas agar tidak terjadi kebocoran memori
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;