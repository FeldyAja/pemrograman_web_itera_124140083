# ==============================================================================
# Berkas: library.py
# Deskripsi: Class Library untuk menyimpan dan mengelola koleksi perpustakaan.
# ==============================================================================

from library_item import LibraryItem


class Library:
    """Perpustakaan yang menyimpan koleksi item (buku, majalah, dan lainnya)."""

    def __init__(self, nama: str):
        self.nama = nama
        self.__koleksi = []   # private: koleksi hanya diubah lewat method di class ini

    @property
    def jumlah_item(self) -> int:
        """Mengembalikan jumlah seluruh item di perpustakaan."""
        return len(self.__koleksi)

    def tambah_item(self, item: LibraryItem) -> bool:
        """Menambahkan item ke koleksi. Id item tidak boleh sama dengan yang sudah ada."""
        if not isinstance(item, LibraryItem):
            print("Gagal: hanya item perpustakaan yang dapat ditambahkan.")
            return False
        if self.cari_berdasarkan_id(item.id_item) is not None:
            print(f"Gagal: id '{item.id_item}' sudah digunakan.")
            return False
        self.__koleksi.append(item)
        print(f"Berhasil menambahkan: {item.judul}")
        return True

    def tampilkan_item_tersedia(self):
        """Menampilkan item yang belum dipinjam."""
        print(f"--- Katalog {self.nama} (item tersedia) ---")
        ada = False
        for item in self.__koleksi:
            if not item.is_dipinjam:
                # Polymorphism: setiap jenis item punya get_detail() sendiri
                print(item.get_detail())
                ada = True
        if not ada:
            print("Belum ada item yang tersedia.")

    def cari_berdasarkan_id(self, id_item: str):
        """Mencari satu item berdasarkan id. Mengembalikan None jika tidak ada."""
        for item in self.__koleksi:
            if item.id_item == id_item:
                return item
        return None

    def cari_berdasarkan_judul(self, kata_kunci: str) -> list:
        """Mencari item yang judulnya memuat kata kunci (huruf besar/kecil diabaikan)."""
        hasil = []
        for item in self.__koleksi:
            if kata_kunci.lower() in item.judul.lower():
                hasil.append(item)
        return hasil
