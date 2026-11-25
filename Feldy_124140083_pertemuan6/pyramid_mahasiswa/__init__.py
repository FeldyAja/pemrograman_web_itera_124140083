# =============================================================================
# Berkas: pyramid_mahasiswa/__init__.py
# Deskripsi: Entry point aplikasi WSGI dan konfigurasi utama Pyramid.
# =============================================================================

from pyramid.config import Configurator


def main(global_config, **settings):
    """Fungsi ini mengembalikan aplikasi Pyramid (WSGI)."""
    with Configurator(settings=settings) as config:
        config.include('.routes')   # peta URL (URL dispatch)
        config.include('.models')   # koneksi database dan transaksi
        config.scan('.views')       # mendaftarkan seluruh @view_config
    return config.make_wsgi_app()
