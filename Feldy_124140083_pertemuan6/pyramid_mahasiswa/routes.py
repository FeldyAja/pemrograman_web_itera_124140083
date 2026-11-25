# =============================================================================
# Berkas: pyramid_mahasiswa/routes.py
# Deskripsi: Peta URL Dispatch untuk seluruh endpoint REST API.
# =============================================================================


def includeme(config):
    """Mendaftarkan seluruh rute aplikasi ke konfigurasi Pyramid."""

    # Rute beranda: menampilkan ringkasan endpoint yang tersedia
    config.add_route('home', '/')

    # =========================================================================
    # HANDS-ON (Tahap 7): RESTful API Mahasiswa
    # Parameter request_method dipakai untuk membedakan HTTP method pada
    # path yang sama. Tanpa parameter ini, Pyramid selalu memilih rute
    # pertama yang cocok dengan path-nya.
    # =========================================================================
    config.add_route('mahasiswa_list', '/api/mahasiswa',
                     request_method='GET')
    config.add_route('mahasiswa_detail', '/api/mahasiswa/{id}',
                     request_method='GET')
    config.add_route('mahasiswa_add', '/api/mahasiswa',
                     request_method='POST')
    config.add_route('mahasiswa_update', '/api/mahasiswa/{id}',
                     request_method='PUT')
    config.add_route('mahasiswa_delete', '/api/mahasiswa/{id}',
                     request_method='DELETE')

    # =========================================================================
    # TUGAS: RESTful API Matakuliah
    # Pola {id:\d+} hanya menerima ID berupa angka, sehingga alamat seperti
    # /api/matakuliah/abc langsung menghasilkan 404 tanpa menyentuh database.
    # =========================================================================
    config.add_route('matakuliah_list', '/api/matakuliah',
                     request_method='GET')
    config.add_route('matakuliah_detail', r'/api/matakuliah/{id:\d+}',
                     request_method='GET')
    config.add_route('matakuliah_add', '/api/matakuliah',
                     request_method='POST')
    config.add_route('matakuliah_update', r'/api/matakuliah/{id:\d+}',
                     request_method='PUT')
    config.add_route('matakuliah_delete', r'/api/matakuliah/{id:\d+}',
                     request_method='DELETE')
