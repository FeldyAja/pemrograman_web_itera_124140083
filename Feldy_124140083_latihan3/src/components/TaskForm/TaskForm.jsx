import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskForm.css';

// Formulir terkontrol (controlled component) untuk menambah tugas baru.
function TaskForm({ onAddTask }) {
  // State menyimpan teks yang sedang diketik pengguna
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah halaman dimuat ulang saat form dikirim
    if (!title.trim()) return; // Abaikan input yang kosong

    const newTask = {
      id: Date.now(), // ID unik berdasarkan waktu saat ini
      title: title,
      completed: false,
    };

    onAddTask(newTask);
    setTitle('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ketik tugas baru lalu tekan Enter..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Tambah</button>
    </form>
  );
}

TaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default TaskForm;