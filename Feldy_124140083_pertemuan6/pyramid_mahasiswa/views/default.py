# =============================================================================
# Berkas: pyramid_mahasiswa/views/default.py
# Deskripsi: View beranda yang menampilkan ringkasan endpoint API.
# =============================================================================

from pyramid.view import view_config


@view_config(route_name='home', renderer='json')
def home(request):
    """Menampilkan informasi singkat tentang API dan daftar endpoint-nya."""
    return {
        'aplikasi': 'API Mahasiswa dan Matakuliah (Pyramid)',
        'endpoint': {
            'mahasiswa': '/api/mahasiswa',
            'matakuliah': '/api/matakuliah',
        },
    }
