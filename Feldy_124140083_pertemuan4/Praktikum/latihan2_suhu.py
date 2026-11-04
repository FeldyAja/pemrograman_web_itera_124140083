# ===================================================
# LATIHAN MANDIRI 2: Kalkulator Konversi Suhu Interaktif
# (dikerjakan setelah bagian 2. Variabel & Tipe Data)
# ===================================================

celsius = float(input("Masukkan suhu dalam derajat Celsius: "))

# rumus dari soal: F = C * 9/5 + 32 dan K = C + 273.15
fahrenheit = celsius * 9 / 5 + 32
kelvin = celsius + 273.15

print(f"\nHasil konversi dari {celsius:.2f} derajat Celsius:")
print(f"Fahrenheit : {fahrenheit:.2f}")
print(f"Kelvin     : {kelvin:.2f}")
