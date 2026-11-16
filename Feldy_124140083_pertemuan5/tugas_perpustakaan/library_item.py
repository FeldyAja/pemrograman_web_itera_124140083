# ==============================================================================
# Berkas: library_item.py
# Deskripsi: Abstract class LibraryItem beserta subclass Book dan Magazine.
#            Berkas ini menjadi dasar untuk semua item di perpustakaan.
# ==============================================================================

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """
    Abstract class untuk semua item perpustakaan.
    Class ini tidak dapat dibuat objeknya secara langsung. Subclass wajib
    mengimplementasikan get_detail() dan hitung_denda().
    """

    def __init__(self, id_item: str, judul: str, tahun_terbit: int):
        self._id_item = id_item            # protected: id tidak untuk diubah dari luar
        self._tahun_terbit = tahun_terbit  # protected
        self.judul = judul                 # lewat setter, jadi ikut divalidasi
        self.__dipinjam = False            # private: hanya diubah lewat pinjam() dan kembalikan()

    # --------------------------------------------------------------------------
    # PROPERTY
    # --------------------------------------------------------------------------
    @property
    def id_item(self) -> str:
        """Mengembalikan id item (hanya bisa dibaca)."""
        return self._id_item

    @property
    def judul(self) -> str:
        """Mengembalikan judul item."""
        return self._judul

    @judul.setter
    def judul(self, nilai: str):
        """Mengubah judul, dengan syarat judul tidak boleh kosong."""
        if not nilai.strip():
            raise ValueError("Judul tidak boleh kosong!")
        self._judul = nilai

    @property
    def is_dipinjam(self) -> bool:
        """Mengembalikan True jika item sedang dipinjam."""
        return self.__dipinjam

    # --------------------------------------------------------------------------
    # METHOD BIASA (sama untuk semua subclass)
    # --------------------------------------------------------------------------
    def pinjam(self) -> bool:
        """Menandai item sebagai dipinjam. Gagal jika item sudah dipinjam."""
        if self.__dipinjam:
            print(f"Maaf, '{self._judul}' sedang dipinjam.")
            return False
        self.__dipinjam = True
        return True

    def kembalikan(self) -> bool:
        """Menandai item sebagai sudah dikembalikan."""
        if not self.__dipinjam:
            print(f"'{self._judul}' memang tidak sedang dipinjam.")
            return False
        self.__dipinjam = False
        return True

    def get_status(self) -> str:
        """Mengembalikan teks status ketersediaan item."""
        return "Dipinjam" if self.__dipinjam else "Tersedia"

    # --------------------------------------------------------------------------
    # METHOD ABSTRACT (wajib dibuat oleh subclass)
    # --------------------------------------------------------------------------
    @abstractmethod
    def get_detail(self) -> str:
        """Mengembalikan keterangan lengkap item."""
        pass

    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> int:
        """Menghitung denda keterlambatan pengembalian."""
        pass


class Book(LibraryItem):
    """Buku. Denda keterlambatan Rp 1.000 per hari."""

    DENDA_PER_HARI = 1000

    def __init__(self, id_item: str, judul: str, tahun_terbit: int, penulis: str, jumlah_halaman: int):
        super().__init__(id_item, judul, tahun_terbit)
        self.penulis = penulis
        self.jumlah_halaman = jumlah_halaman

    def get_detail(self) -> str:
        return (
            f"[Buku] {self._id_item} | {self._judul} | Penulis: {self.penulis} | "
            f"{self._tahun_terbit} | {self.jumlah_halaman} hlm | {self.get_status()}"
        )

    def hitung_denda(self, hari_terlambat: int) -> int:
        if hari_terlambat <= 0:
            return 0
        return hari_terlambat * Book.DENDA_PER_HARI


class Magazine(LibraryItem):
    """Majalah. Denda keterlambatan Rp 500 per hari."""

    DENDA_PER_HARI = 500

    def __init__(self, id_item: str, judul: str, tahun_terbit: int, edisi: str, penerbit: str):
        super().__init__(id_item, judul, tahun_terbit)
        self.edisi = edisi
        self.penerbit = penerbit

    def get_detail(self) -> str:
        return (
            f"[Majalah] {self._id_item} | {self._judul} | Edisi: {self.edisi} | "
            f"Penerbit: {self.penerbit} | {self._tahun_terbit} | {self.get_status()}"
        )

    def hitung_denda(self, hari_terlambat: int) -> int:
        if hari_terlambat <= 0:
            return 0
        return hari_terlambat * Magazine.DENDA_PER_HARI
