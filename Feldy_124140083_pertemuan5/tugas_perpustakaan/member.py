# ==============================================================================
# Berkas: member.py
# Deskripsi: Class Member untuk anggota perpustakaan yang meminjam item.
# ==============================================================================

from library_item import LibraryItem


class Member:
    """Anggota perpustakaan. Daftar pinjaman disimpan secara private."""

    def __init__(self, id_member: str, nama: str):
        self._id_member = id_member   # protected
        self.nama = nama
        self.__daftar_pinjaman = []   # private: hanya diubah lewat method di class ini

    @property
    def id_member(self) -> str:
        """Mengembalikan id anggota (hanya bisa dibaca)."""
        return self._id_member

    def pinjam_item(self, item: LibraryItem) -> bool:
        """Meminjam item. Berhasil jika item belum dipinjam orang lain."""
        if item.pinjam():
            self.__daftar_pinjaman.append(item)
            print(f"{self.nama} berhasil meminjam '{item.judul}'.")
            return True
        return False

    def kembalikan_item(self, item: LibraryItem) -> bool:
        """Mengembalikan item yang sebelumnya dipinjam anggota ini."""
        if item not in self.__daftar_pinjaman:
            print(f"{self.nama} tidak sedang meminjam '{item.judul}'.")
            return False
        item.kembalikan()
        self.__daftar_pinjaman.remove(item)
        print(f"{self.nama} telah mengembalikan '{item.judul}'.")
        return True

    def tampilkan_pinjaman(self):
        """Menampilkan item yang sedang dipinjam anggota ini."""
        print(f"Daftar pinjaman {self.nama}:")
        if not self.__daftar_pinjaman:
            print("  (belum ada)")
        for item in self.__daftar_pinjaman:
            print(f"  - {item.judul}")
