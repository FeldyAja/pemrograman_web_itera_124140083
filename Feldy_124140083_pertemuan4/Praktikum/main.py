# ===================================================
# LATIHAN MANDIRI 6: Menguji modul password_gen (berkas main.py)
# (dikerjakan setelah bagian 6. Modul & Package Python)
# ===================================================
import password_gen

print("--- UJI MODUL PASSWORD_GEN ---")
print("Panjang default (8) :", password_gen.buat_password_acak())
print("Panjang 12          :", password_gen.buat_password_acak(12))
print("Panjang 16          :", password_gen.buat_password_acak(panjang=16))

# cek sekilas: panjangnya sesuai atau tidak
for panjang in [4, 8, 20]:
    pw = password_gen.buat_password_acak(panjang)
    print(f"Panjang {panjang:<2} -> {pw} (jumlah karakter: {len(pw)})")
