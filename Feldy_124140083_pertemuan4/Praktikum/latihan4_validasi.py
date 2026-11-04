# ===================================================
# LATIHAN MANDIRI 4: Fungsi Validator Password
# (dikerjakan setelah bagian 4. Modularitas Fungsi)
# ===================================================


def validasi_password(password):
    """Mengecek apakah password valid.

    Password valid kalau panjangnya minimal 8 karakter dan
    mengandung setidaknya satu angka.

    Parameter:
        password (str): password yang mau dicek.

    Return:
        bool: True kalau valid, False kalau tidak.
    """
    cukup_panjang = len(password) >= 8
    ada_angka = any(karakter.isdigit() for karakter in password)
    return cukup_panjang and ada_angka


# contoh uji: ada yang valid, ada yang tidak
daftar_uji = [
    "rahasia123",    # valid
    "password",      # tidak valid: tidak ada angka
    "abc123",        # tidak valid: kurang dari 8 karakter
    "12345678",      # valid
    "Feldy2024!",    # valid
    "",              # tidak valid: kosong
]

print("--- UJI VALIDATOR PASSWORD ---")
for pw in daftar_uji:
    hasil = validasi_password(pw)
    print(f"{pw!r:<15} -> {hasil}")
