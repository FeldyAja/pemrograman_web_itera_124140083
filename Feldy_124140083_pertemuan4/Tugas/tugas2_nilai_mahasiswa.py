# Tugas 2 - Program Pengelolaan Data Nilai Mahasiswa
# Nama : Feldy
# NIM  : 124140083

# Bobot penilaian
BOBOT_UTS = 0.30
BOBOT_UAS = 0.40
BOBOT_TUGAS = 0.30

# Data mahasiswa (list berisi dictionary)
data_mahasiswa = [
    {"nama": "Feldy", "nim": "124140083",
     "nilai_uts": 100, "nilai_uas": 100, "nilai_tugas": 100},
    {"nama": "Shisui Uchiha", "nim": "124140024",
     "nilai_uts": 78, "nilai_uas": 72, "nilai_tugas": 80},
    {"nama": "Luffy", "nim": "124140037",
     "nilai_uts": 65, "nilai_uas": 60, "nilai_tugas": 70},
    {"nama": "Harry Potter", "nim": "124140042",
     "nilai_uts": 55, "nilai_uas": 50, "nilai_tugas": 60},
    {"nama": "Prabowo", "nim": "124140058",
     "nilai_uts": 40, "nilai_uas": 35, "nilai_tugas": 50},
    {"nama": "Aizen", "nim": "124140066",
     "nilai_uts": 92, "nilai_uas": 88, "nilai_tugas": 95},
]


def hitung_nilai_akhir(uts, uas, tugas):
    """Menghitung nilai akhir dengan bobot 30% UTS, 40% UAS, 30% Tugas.

    Parameter:
        uts (float): nilai UTS.
        uas (float): nilai UAS.
        tugas (float): nilai tugas.

    Return:
        float: nilai akhir hasil pembobotan.
    """
    return (BOBOT_UTS * uts) + (BOBOT_UAS * uas) + (BOBOT_TUGAS * tugas)


def tentukan_grade(nilai_akhir):
    """Menentukan grade huruf berdasarkan nilai akhir.

    Parameter:
        nilai_akhir (float): nilai akhir mahasiswa.

    Return:
        str: grade A, B, C, D, atau E.
    """
    if nilai_akhir >= 80:
        grade = "A"
    elif nilai_akhir >= 70:
        grade = "B"
    elif nilai_akhir >= 60:
        grade = "C"
    elif nilai_akhir >= 50:
        grade = "D"
    else:
        grade = "E"
    return grade


def proses_nilai(daftar):
    """Menghitung nilai akhir dan grade untuk semua mahasiswa.

    Hasilnya disimpan langsung ke dictionary masing-masing mahasiswa
    dengan kunci 'nilai_akhir' dan 'grade'.

    Parameter:
        daftar (list): list berisi dictionary data mahasiswa.

    Return:
        None
    """
    for mhs in daftar:
        mhs["nilai_akhir"] = hitung_nilai_akhir(
            mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"]
        )
        mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])


def cetak_tabel(daftar):
    """Mencetak data mahasiswa dalam bentuk tabel di terminal.

    Parameter:
        daftar (list): list dictionary mahasiswa yang sudah punya
            'nilai_akhir' dan 'grade'.

    Return:
        None
    """
    garis = "-" * 62
    print(garis)
    print(f"{'No':<4}{'Nama':<20}{'NIM':<14}{'Nilai Akhir':>12}{'Grade':>10}")
    print(garis)
    for nomor, mhs in enumerate(daftar, start=1):
        print(
            f"{nomor:<4}{mhs['nama']:<20}{mhs['nim']:<14}"
            f"{mhs['nilai_akhir']:>12.2f}{mhs['grade']:>10}"
        )
    print(garis)


def cetak_info_mahasiswa(judul, mhs):
    """Mencetak rincian satu mahasiswa.

    Parameter:
        judul (str): judul yang ditampilkan di atas rincian.
        mhs (dict): data satu mahasiswa.

    Return:
        None
    """
    print(f"\n{judul}")
    print(f"  Nama          : {mhs['nama']}")
    print(f"  NIM           : {mhs['nim']}")
    print(f"  UTS/UAS/Tugas : "
          f"{mhs['nilai_uts']} / {mhs['nilai_uas']} / {mhs['nilai_tugas']}")
    print(f"  Nilai Akhir   : {mhs['nilai_akhir']:.2f}")
    print(f"  Grade         : {mhs['grade']}")


def main():
    """Menjalankan program: proses nilai, tampilkan tabel, cari ekstrem."""
    proses_nilai(data_mahasiswa)

    print("=== DATA NILAI MAHASISWA ===")
    cetak_tabel(data_mahasiswa)

    tertinggi = max(data_mahasiswa, key=lambda m: m["nilai_akhir"])
    terendah = min(data_mahasiswa, key=lambda m: m["nilai_akhir"])

    cetak_info_mahasiswa("Mahasiswa dengan nilai akhir tertinggi:", tertinggi)
    cetak_info_mahasiswa("Mahasiswa dengan nilai akhir terendah:", terendah)


if __name__ == "__main__":
    main()
