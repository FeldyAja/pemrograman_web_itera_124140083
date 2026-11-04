# Tugas 1 - Program Penghitung BMI (Body Mass Index)
# Nama : Feldy
# NIM  : 124140083

print("=== PENGHITUNG BMI ===")

# input data dari pengguna
berat = float(input("Masukkan berat badan (kg) : "))
tinggi = float(input("Masukkan tinggi badan (m) : "))

# hitung BMI
bmi = berat / (tinggi * tinggi)

# tentukan kategori berdasarkan nilai BMI
if bmi < 18.5:
    kategori = "Berat badan kurang"
elif 18.5 <= bmi < 25:
    kategori = "Berat badan normal"
elif 25 <= bmi < 30:
    kategori = "Berat badan berlebih"
else:
    kategori = "Obesitas"

# tampilkan hasil
print("\n=== HASIL PERHITUNGAN ===")
print(f"Berat badan  : {berat} kg")
print(f"Tinggi badan : {tinggi} m")
print(f"Nilai BMI    : {bmi:.2f}")
print(f"Kategori     : {kategori}")
