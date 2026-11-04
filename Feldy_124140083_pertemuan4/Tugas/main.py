# Tugas 3 - Program Utama (main.py)
# Nama : Feldy
# NIM  : 124140083

# Cara impor 1: impor seluruh modul, pemanggilan pakai awalan math_operations.
import math_operations

# Cara impor 2: impor fungsi dan konstanta tertentu langsung
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin, PI


def uji_persegi():
    """Menguji fungsi luas dan keliling persegi dengan beberapa sisi."""
    print("[1] PERSEGI")
    print(f"{'Sisi':<8}{'Luas':>12}{'Keliling':>12}")
    for sisi in [4, 7.5, 10]:
        luas = math_operations.luas_persegi(sisi)
        keliling = math_operations.keliling_persegi(sisi)
        print(f"{sisi:<8}{luas:>12.2f}{keliling:>12.2f}")
    print()


def uji_persegi_panjang():
    """Menguji fungsi luas dan keliling persegi panjang."""
    print("[2] PERSEGI PANJANG")
    print(f"{'P x L':<10}{'Luas':>12}{'Keliling':>12}")
    for panjang, lebar in [(5, 3), (12, 8), (6.5, 2)]:
        luas = math_operations.luas_persegi_panjang(panjang, lebar)
        keliling = math_operations.keliling_persegi_panjang(panjang, lebar)
        print(f"{str(panjang) + ' x ' + str(lebar):<10}"
              f"{luas:>12.2f}{keliling:>12.2f}")
    print()


def uji_lingkaran():
    """Menguji fungsi luas dan keliling lingkaran."""
    print(f"[3] LINGKARAN (PI = {PI})")
    print(f"{'Jari-jari':<12}{'Luas':>12}{'Keliling':>12}")
    for jari_jari in [3, 7, 10.5]:
        luas = math_operations.luas_lingkaran(jari_jari)
        keliling = math_operations.keliling_lingkaran(jari_jari)
        print(f"{jari_jari:<12}{luas:>12.2f}{keliling:>12.2f}")
    print()


def uji_suhu():
    """Menguji konversi suhu Celsius ke Fahrenheit dan Kelvin."""
    print("[4] KONVERSI SUHU")
    print(f"{'Celsius':<10}{'Fahrenheit':>14}{'Kelvin':>12}")
    for celsius in [0, 25, 37, 100]:
        fahrenheit = celsius_ke_fahrenheit(celsius)
        kelvin = celsius_ke_kelvin(celsius)
        print(f"{celsius:<10}{fahrenheit:>14.2f}{kelvin:>12.2f}")
    print()


def main():
    """Menjalankan semua pengujian fungsi dari modul math_operations."""
    print("=" * 36)
    print("  UJI COBA MODUL MATH_OPERATIONS")
    print("=" * 36 + "\n")

    uji_persegi()
    uji_persegi_panjang()
    uji_lingkaran()
    uji_suhu()


if __name__ == "__main__":
    main()
