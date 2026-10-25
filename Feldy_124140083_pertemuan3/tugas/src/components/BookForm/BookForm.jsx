import { useState } from 'react';
import PropTypes from 'prop-types';
import { STATUS_OPTIONS, bookShape } from '../../constants/book';
import './BookForm.css';

const EMPTY_FORM = { title: '', author: '', status: 'milik' };

// Formulir untuk menambah buku baru atau mengedit buku yang sudah ada.
// Jika initialData diisi, formulir berjalan dalam mode edit.
function BookForm({ onSubmit, initialData = null, onCancel = null }) {
  const [formData, setFormData] = useState(
    initialData
      ? {
          title: initialData.title,
          author: initialData.author,
          status: initialData.status,
        }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState({});

  // Memeriksa kolom wajib isi dan mengembalikan daftar pesan kesalahan.
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Judul buku wajib diisi.';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Nama penulis wajib diisi.';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Hapus pesan kesalahan pada kolom yang sedang diperbaiki.
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      author: formData.author.trim(),
      status: formData.status,
    });

    // Pada mode tambah, kosongkan kembali formulir setelah berhasil disimpan.
    if (!initialData) {
      setFormData(EMPTY_FORM);
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2>{initialData ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>

      <div className="form-group">
        <label htmlFor="title">Judul Buku</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Contoh: Laskar Pelangi"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'input-error' : ''}
        />
        {errors.title && <p className="error-text">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          id="author"
          name="author"
          type="text"
          placeholder="Contoh: Andrea Hirata"
          value={formData.author}
          onChange={handleChange}
          className={errors.author ? 'input-error' : ''}
        />
        {errors.author && <p className="error-text">{errors.author}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {initialData ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
        {initialData && onCancel && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: bookShape,
  onCancel: PropTypes.func,
};

export default BookForm;