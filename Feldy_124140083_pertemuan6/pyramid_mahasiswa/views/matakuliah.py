# =============================================================================
# Berkas: pyramid_mahasiswa/views/matakuliah.py
# Bagian: TUGAS
# Deskripsi: View CRUD untuk data mata kuliah (REST API).
# =============================================================================

from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPNotFound,
)
from pyramid.view import view_config

from ..models import Matakuliah

FIELD_WAJIB = ['kode_mk', 'nama_mk', 'sks', 'semester']


# -----------------------------------------------------------------------------
# Fungsi bantu untuk validasi. Semuanya melempar ValueError berisi pesan
# kesalahan, lalu view mengubahnya menjadi respons 400 Bad Request.
# -----------------------------------------------------------------------------
def ambil_data_json(request):
    """Mengambil body request sebagai dictionary JSON."""
    try:
        data = request.json_body
    except ValueError:
        raise ValueError('Body request harus berupa JSON yang valid')
    if not isinstance(data, dict):
        raise ValueError('Body request harus berupa objek JSON')
    return data


def validasi_teks(nilai, nama_field):
    """Memastikan nilai berupa teks yang tidak kosong."""
    if not isinstance(nilai, str) or not nilai.strip():
        raise ValueError(f'Field {nama_field} harus berupa teks yang valid')
    return nilai.strip()


def validasi_angka_positif(nilai, nama_field):
    """Memastikan nilai berupa bilangan bulat lebih besar dari 0."""
    if isinstance(nilai, bool) or not isinstance(nilai, (int, str)):
        raise ValueError(f'Field {nama_field} harus berupa angka bulat')
    try:
        angka = int(nilai)
    except ValueError:
        raise ValueError(f'Field {nama_field} harus berupa angka bulat')
    if angka <= 0:
        raise ValueError(f'Field {nama_field} harus lebih besar dari 0')
    return angka


def tidak_ditemukan(matakuliah_id):
    """Membuat respons 404 untuk mata kuliah yang tidak ada."""
    return HTTPNotFound(json_body={
        'error': f'Matakuliah dengan ID {matakuliah_id} tidak ditemukan'
    })


# 1. READ ALL: Menampilkan daftar seluruh mata kuliah
@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    """View untuk mengambil semua data mata kuliah."""
    dbsession = request.dbsession
    daftar = dbsession.query(Matakuliah).order_by(Matakuliah.id.asc()).all()
    return {'matakuliahs': [mk.to_dict() for mk in daftar]}


# 2. READ ONE: Menampilkan detail satu mata kuliah berdasarkan ID
@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    """View untuk melihat detail satu mata kuliah berdasarkan ID di URL."""
    dbsession = request.dbsession
    matakuliah_id = request.matchdict['id']
    matakuliah = dbsession.query(Matakuliah).filter_by(
        id=matakuliah_id).first()

    if matakuliah is None:
        return tidak_ditemukan(matakuliah_id)

    return {'matakuliah': matakuliah.to_dict()}


# 3. CREATE: Menambahkan data mata kuliah baru
@view_config(route_name='matakuliah_add', request_method='POST',
             renderer='json')
def matakuliah_add(request):
    """View untuk menambahkan mata kuliah baru dari payload JSON."""
    dbsession = request.dbsession

    try:
        data = ambil_data_json(request)

        # Semua field wajib ada dan tidak boleh kosong
        for field in FIELD_WAJIB:
            if field not in data or data[field] in (None, ''):
                raise ValueError(f'Field {field} wajib diisi!')

        kode_mk = validasi_teks(data['kode_mk'], 'kode_mk')
        nama_mk = validasi_teks(data['nama_mk'], 'nama_mk')
        sks = validasi_angka_positif(data['sks'], 'sks')
        semester = validasi_angka_positif(data['semester'], 'semester')
    except ValueError as err:
        return HTTPBadRequest(json_body={'error': str(err)})

    # Kode mata kuliah tidak boleh kembar
    if dbsession.query(Matakuliah).filter_by(kode_mk=kode_mk).first():
        return HTTPBadRequest(json_body={
            'error': f'Kode MK {kode_mk} sudah digunakan'
        })

    matakuliah = Matakuliah(
        kode_mk=kode_mk,
        nama_mk=nama_mk,
        sks=sks,
        semester=semester,
    )
    dbsession.add(matakuliah)
    # Flush agar id yang dibuat PostgreSQL langsung terisi
    dbsession.flush()

    return {'success': True, 'matakuliah': matakuliah.to_dict()}


# 4. UPDATE: Mengubah data mata kuliah yang sudah ada
@view_config(route_name='matakuliah_update', request_method='PUT',
             renderer='json')
def matakuliah_update(request):
    """View untuk memperbarui data mata kuliah berdasarkan ID."""
    dbsession = request.dbsession
    matakuliah_id = request.matchdict['id']

    matakuliah = dbsession.query(Matakuliah).filter_by(
        id=matakuliah_id).first()
    if matakuliah is None:
        return tidak_ditemukan(matakuliah_id)

    # Semua isian divalidasi dulu dan ditampung di 'perubahan'.
    # Data baru diterapkan setelah semuanya lolos, sehingga request yang
    # ditolak tidak pernah mengubah data yang sudah tersimpan.
    perubahan = {}
    try:
        data = ambil_data_json(request)

        if 'kode_mk' in data:
            kode_mk = validasi_teks(data['kode_mk'], 'kode_mk')
            ada = dbsession.query(Matakuliah).filter_by(
                kode_mk=kode_mk).first()
            if ada is not None and ada.id != matakuliah.id:
                raise ValueError(f'Kode MK {kode_mk} sudah digunakan')
            perubahan['kode_mk'] = kode_mk
        if 'nama_mk' in data:
            perubahan['nama_mk'] = validasi_teks(data['nama_mk'], 'nama_mk')
        if 'sks' in data:
            perubahan['sks'] = validasi_angka_positif(data['sks'], 'sks')
        if 'semester' in data:
            perubahan['semester'] = validasi_angka_positif(
                data['semester'], 'semester')
    except ValueError as err:
        return HTTPBadRequest(json_body={'error': str(err)})

    for field, nilai in perubahan.items():
        setattr(matakuliah, field, nilai)

    return {'success': True, 'matakuliah': matakuliah.to_dict()}


# 5. DELETE: Menghapus data mata kuliah
@view_config(route_name='matakuliah_delete', request_method='DELETE',
             renderer='json')
def matakuliah_delete(request):
    """View untuk menghapus mata kuliah berdasarkan ID."""
    dbsession = request.dbsession
    matakuliah_id = request.matchdict['id']

    matakuliah = dbsession.query(Matakuliah).filter_by(
        id=matakuliah_id).first()
    if matakuliah is None:
        return tidak_ditemukan(matakuliah_id)

    dbsession.delete(matakuliah)

    return {
        'success': True,
        'message': f'Matakuliah dengan ID {matakuliah_id} berhasil dihapus',
    }
