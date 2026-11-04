# ===================================================
# LATIHAN MANDIRI 6: Modul Generator Password Acak (modul: password_gen.py)
# (dikerjakan setelah bagian 6. Modul & Package Python)
# Dipanggil dari main.py di folder yang sama
# ===================================================
import random
import string


def buat_password_acak(panjang=8):
    """Membuat password acak dari huruf (besar/kecil) dan angka.

    Parameter:
        panjang (int): jumlah karakter password, default 8.

    Return:
        str: password acak sepanjang `panjang` karakter.
    """
    karakter = string.ascii_letters + string.digits
    password = ""
    for _ in range(panjang):
        password += random.choice(karakter)
    return password
