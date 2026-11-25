# =============================================================================
# Berkas: pyramid_mahasiswa/scripts/initialize_db.py
# Deskripsi: Skrip untuk mengisi data awal (seeding) ke database.
# Cara menjalankan:
#   python -m pyramid_mahasiswa.scripts.initialize_db development.ini
# =============================================================================

import argparse
import sys
from datetime import date

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models


def setup_models(dbsession):
    """Menambahkan data awal (seeding) ke database."""

    # -------------------------------------------------------------------------
    # HANDS-ON (Tahap 4, Langkah 3): data awal mahasiswa
    # Seeding hanya dijalankan jika tabel masih kosong, sehingga skrip ini
    # aman dijalankan berulang kali tanpa menghasilkan data kembar.
    # -------------------------------------------------------------------------
    if dbsession.query(models.Mahasiswa).count() == 0:
        mahasiswa1 = models.Mahasiswa(
            nim='12345',
            nama='Budi Santoso',
            jurusan='Teknik Informatika',
            tanggal_lahir=date(2000, 5, 15),
            alamat='Jl. Merdeka No. 123, Bandung',
        )

        mahasiswa2 = models.Mahasiswa(
            nim='54321',
            nama='Siti Aminah',
            jurusan='Sistem Informasi',
            tanggal_lahir=date(2001, 8, 22),
            alamat='Jl. Mawar No. 45, Jakarta',
        )

        dbsession.add(mahasiswa1)
        dbsession.add(mahasiswa2)
        print("Berhasil memasukkan data seeding awal mahasiswa!")
    else:
        print("Data mahasiswa sudah ada, seeding mahasiswa dilewati.")

    # -------------------------------------------------------------------------
    # TUGAS: data awal mata kuliah (minimal 3 data)
    # -------------------------------------------------------------------------
    if dbsession.query(models.Matakuliah).count() == 0:
        dbsession.add(models.Matakuliah(
            kode_mk='IF2110',
            nama_mk='Pemrograman Web',
            sks=3,
            semester=3,
        ))
        dbsession.add(models.Matakuliah(
            kode_mk='IF3140',
            nama_mk='Basis Data',
            sks=4,
            semester=5,
        ))
        dbsession.add(models.Matakuliah(
            kode_mk='IF2210',
            nama_mk='Algoritma dan Struktur Data',
            sks=4,
            semester=3,
        ))
        print("Berhasil memasukkan data seeding awal matakuliah!")
    else:
        print("Data matakuliah sudah ada, seeding matakuliah dilewati.")


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Berkas konfigurasi, misalnya development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
    except OperationalError:
        print("Pyramid gagal terhubung ke database SQL.")
        print("Pastikan service PostgreSQL berjalan dan connection string "
              "di development.ini benar.")


if __name__ == '__main__':
    main()
