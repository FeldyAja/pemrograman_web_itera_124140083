# =============================================================================
# Berkas: pyramid_mahasiswa/alembic/env.py
# Deskripsi: Runner environment Alembic. Membaca koneksi database dari
#            development.ini dan mengambil metadata dari model SQLAlchemy.
# =============================================================================

from alembic import context
from pyramid.paster import get_appsettings, setup_logging
from sqlalchemy import engine_from_config, pool

# Mengimpor paket models memastikan seluruh model (Mahasiswa, Matakuliah)
# terdaftar pada metadata sebelum Alembic membandingkan skema.
from pyramid_mahasiswa import models  # noqa: F401
from pyramid_mahasiswa.models.meta import Base

config = context.config

# Pengaturan logging dan koneksi diambil dari berkas .ini yang dipakai
# pada perintah alembic (opsi -c).
setup_logging(config.config_file_name)
settings = get_appsettings(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline():
    """Menjalankan migrasi tanpa koneksi langsung (hanya menghasilkan SQL)."""
    context.configure(
        url=settings['sqlalchemy.url'],
        target_metadata=target_metadata,
        literal_binds=True,
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Menjalankan migrasi dengan koneksi langsung ke database."""
    engine = engine_from_config(
        settings, prefix='sqlalchemy.', poolclass=pool.NullPool)

    with engine.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
