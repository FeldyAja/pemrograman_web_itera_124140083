# =============================================================================
# Berkas: pyramid_mahasiswa/models/__init__.py
# Deskripsi: Inisialisasi model, koneksi database, dan sesi SQLAlchemy.
# =============================================================================

from sqlalchemy import engine_from_config
from sqlalchemy.orm import configure_mappers
from sqlalchemy.orm import sessionmaker
import zope.sqlalchemy

# Daftarkan seluruh model di sini agar dikenali oleh SQLAlchemy dan Alembic.
from .mahasiswa import Mahasiswa    # HANDS-ON (Tahap 4)
from .matakuliah import Matakuliah  # TUGAS

# Jalankan konfigurasi mapper sekali saat modul diimpor,
# supaya relasi antar model (jika ada) langsung dicek.
configure_mappers()


def get_engine(settings, prefix='sqlalchemy.'):
    """Membuat engine database dari pengaturan di berkas .ini."""
    return engine_from_config(settings, prefix)


def get_session_factory(engine):
    """Membuat pabrik sesi yang terhubung ke engine."""
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory


def get_tm_session(session_factory, transaction_manager):
    """
    Membuat sesi database yang dikelola oleh transaction manager.

    Dengan zope.sqlalchemy, commit dan rollback dilakukan otomatis
    di akhir request, sehingga view tidak perlu memanggil commit sendiri.
    """
    dbsession = session_factory()
    zope.sqlalchemy.register(
        dbsession, transaction_manager=transaction_manager)
    return dbsession


def includeme(config):
    """
    Menyiapkan lapisan model untuk aplikasi Pyramid.
    Dipanggil lewat config.include('.models') di fungsi main().
    """
    settings = config.get_settings()
    settings['tm.manager_hook'] = 'pyramid_tm.explicit_manager'

    # pyramid_tm menghubungkan siklus transaksi dengan setiap request
    config.include('pyramid_tm')

    session_factory = get_session_factory(get_engine(settings))
    config.registry['dbsession_factory'] = session_factory

    # Membuat request.dbsession tersedia di semua view
    config.add_request_method(
        # request.tm adalah transaction manager milik pyramid_tm
        lambda request: get_tm_session(session_factory, request.tm),
        'dbsession',
        reify=True,
    )
