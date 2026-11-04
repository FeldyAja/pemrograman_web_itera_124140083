# ===================================================
# LATIHAN MANDIRI 3: Game Tebak Angka Rahasia Sederhana
# (dikerjakan setelah bagian 3. Struktur Kendali)
# ===================================================

angka_rahasia = 7

while True:
    tebakan = int(input("Tebak angka rahasia: "))

    if tebakan < angka_rahasia:
        print("Terlalu kecil!")
    elif tebakan > angka_rahasia:
        print("Terlalu besar!")
    else:
        print("Selamat, tebakan benar!")
        break
