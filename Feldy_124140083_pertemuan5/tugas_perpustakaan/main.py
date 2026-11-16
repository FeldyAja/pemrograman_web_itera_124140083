# ==============================================================================
# Berkas: main.py
# Deskripsi: Program utama untuk menguji sistem manajemen perpustakaan.
# Cara menjalankan: python main.py
# ==============================================================================

from library_item import Book, Magazine
from library import Library
from member import Member


def judul_bagian(teks: str):
    print(f"\n=== {teks} ===")


def main():
    perpus = Library("Perpustakaan ITERA")

    # 1. Menambahkan item ke perpustakaan
    judul_bagian("1. Menambahkan Item")
    buku1 = Book("B001", "Belajar Python Dasar", 2021, "Rina Wulandari", 250)
    buku2 = Book("B002", "Pemrograman Web dengan Python", 2023, "Dimas Prakoso", 310)
    majalah1 = Magazine("M001", "Techno Mingguan", 2026, "45", "Media Teknologi")
    majalah2 = Magazine("M002", "Dunia Digital", 2026, "12", "Pustaka Digital")

    for item in [buku1, buku2, majalah1, majalah2]:
        perpus.tambah_item(item)

    # Mencoba menambahkan id yang sama, harus ditolak
    perpus.tambah_item(Book("B001", "Buku Duplikat", 2020, "Tidak Dikenal", 100))
    print(f"Jumlah item di perpustakaan: {perpus.jumlah_item}")

    # 2. Menampilkan daftar item yang tersedia
    judul_bagian("2. Daftar Item Tersedia")
    perpus.tampilkan_item_tersedia()

    # 3. Mencari item berdasarkan judul dan id
    judul_bagian("3. Pencarian Item")
    print("Cari judul 'python':")
    for item in perpus.cari_berdasarkan_judul("python"):
        print("  ", item.get_detail())

    print("Cari id 'M001':")
    hasil_id = perpus.cari_berdasarkan_id("M001")
    print("  ", hasil_id.get_detail() if hasil_id else "Item tidak ditemukan.")

    print("Cari id 'X999':")
    hasil_id = perpus.cari_berdasarkan_id("X999")
    print("  ", hasil_id.get_detail() if hasil_id else "Item tidak ditemukan.")

    # 4. Status ketersediaan setelah ada yang meminjam
    judul_bagian("4. Peminjaman dan Status Ketersediaan")
    anggota = Member("A001", "Rina Sari")
    anggota.pinjam_item(buku1)
    anggota.pinjam_item(buku1)   # buku yang sama, harus ditolak karena sudah dipinjam
    anggota.pinjam_item(majalah1)
    anggota.tampilkan_pinjaman()
    print()
    perpus.tampilkan_item_tersedia()   # buku1 dan majalah1 tidak muncul lagi

    # 5. Polymorphism: hitung_denda() berbeda untuk setiap jenis item
    judul_bagian("5. Denda Keterlambatan 3 Hari")
    for item in [buku1, majalah1]:
        print(f"{item.judul}: Rp {item.hitung_denda(3):,}")

    # 6. Pengembalian item
    judul_bagian("6. Pengembalian Item")
    anggota.kembalikan_item(buku1)
    anggota.kembalikan_item(buku1)   # sudah dikembalikan, harus ditolak
    print()
    perpus.tampilkan_item_tersedia()


if __name__ == "__main__":
    main()
