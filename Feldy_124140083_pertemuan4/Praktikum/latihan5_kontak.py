# ===================================================
# LATIHAN MANDIRI 5: Katalog Kontak Sederhana
# (dikerjakan setelah bagian 5. Struktur Data)
# ===================================================

# dictionary penyimpan kontak: {nama: nomor telepon}
kontak = {
    "Budi": "081234567890",
    "Siti": "082198765432",
}


def tambah_kontak(nama, nomor):
    """Menambahkan kontak baru ke dictionary kontak.

    Parameter:
        nama (str): nama kontak.
        nomor (str): nomor telepon kontak.
    """
    kontak[nama] = nomor
    print(f"Kontak {nama} berhasil disimpan.")


def cari_kontak(nama):
    """Mencari nomor telepon berdasarkan nama memakai .get().

    Parameter:
        nama (str): nama kontak yang dicari.
    """
    nomor = kontak.get(nama)
    if nomor is None:
        print(f"Kontak dengan nama {nama} tidak ditemukan.")
    else:
        print(f"Nomor {nama} : {nomor}")


def tampilkan_semua():
    """Menampilkan seluruh kontak yang tersimpan."""
    if not kontak:
        print("Belum ada kontak yang tersimpan.")
        return
    print("--- DAFTAR KONTAK ---")
    for nama, nomor in kontak.items():
        print(f"{nama:<15}: {nomor}")


while True:
    print("\n=== KATALOG KONTAK ===")
    print("1. Tambah kontak baru")
    print("2. Cari nomor telepon")
    print("3. Tampilkan semua kontak")
    print("4. Keluar")
    pilihan = input("Pilih menu (1-4): ")

    if pilihan == "1":
        nama_baru = input("Nama kontak  : ")
        nomor_baru = input("Nomor telepon: ")
        tambah_kontak(nama_baru, nomor_baru)
    elif pilihan == "2":
        nama_dicari = input("Nama yang dicari: ")
        cari_kontak(nama_dicari)
    elif pilihan == "3":
        tampilkan_semua()
    elif pilihan == "4":
        print("Program selesai.")
        break
    else:
        print("Pilihan tidak valid, coba lagi.")
