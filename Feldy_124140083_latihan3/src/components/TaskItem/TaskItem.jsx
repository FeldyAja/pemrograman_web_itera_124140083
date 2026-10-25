import React from 'react';
import PropTypes from 'prop-types';
import './TaskItem.css';

// Menampilkan satu baris tugas beserta kotak centang dan tombol hapus.
function TaskItem({ task, onDelete, onToggleComplete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        {/* Checkbox terkontrol: nilainya mengikuti data tugas dari komponen induk */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
        <span className="task-title">{task.title}</span>
      </div>
      <div className="task-actions">
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          Hapus
        </button>
      </div>
    </div>
  );
}

// Validasi tipe data props agar kesalahan penggunaan komponen cepat terdeteksi
TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TaskItem;