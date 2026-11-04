# ===================================================
# LATIHAN MANDIRI 1: Identitas Diri & Eksperimen Print
# (dikerjakan setelah bagian 1. Pengenalan & Eksekusi Python)
# ===================================================

nama = "Feldy"
nim = "124140083"
angkatan = 2024
minat_penelitian = "Pengembangan Aplikasi Web"

# percobaan 1: sep=" | " untuk memisahkan data
print("Percobaan sep:")
print("Nama", "NIM", "Angkatan", "Minat Penelitian", sep=" | ")
print(nama, nim, angkatan, minat_penelitian, sep=" | ")

# percobaan 2: tab (\t) untuk merapikan data
print("\nPercobaan tab:")
print("Nama\t\t:", nama)
print("NIM\t\t:", nim)
print("Angkatan\t:", angkatan)
print("Minat\t\t:", minat_penelitian)

# percobaan 3: kartu identitas dengan bingkai #, baris baru pakai \n
garis = "#" * 50
kartu = (
    f"{garis}\n"
    f"# {'KARTU IDENTITAS MAHASISWA':^46} #\n"
    f"{garis}\n"
    f"# {'Nama':<16}: {nama:<28} #\n"
    f"# {'NIM':<16}: {nim:<28} #\n"
    f"# {'Angkatan':<16}: {angkatan:<28} #\n"
    f"# {'Minat Penelitian':<16}: {minat_penelitian:<28} #\n"
    f"{garis}"
)
print("\n" + kartu)
