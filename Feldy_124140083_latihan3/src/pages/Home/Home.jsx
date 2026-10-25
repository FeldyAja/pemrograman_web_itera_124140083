import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskItem from '../../components/TaskItem/TaskItem';
import Card from '../../components/Card/Card';
import './Home.css';

function Home() {
  // Data awal dibaca dari localStorage satu kali saat komponen pertama dimuat.
  // Pembacaan dilakukan lewat nilai awal useState agar data tidak tertimpa
  // oleh pemanggilan efek ganda pada StrictMode di mode pengembangan.
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks_data');
    return saved ? JSON.parse(saved) : [];
  });

  // Setiap daftar tugas berubah, simpan kembali ke localStorage
  useEffect(() => {
    localStorage.setItem('tasks_data', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  // ===== LATIHAN MANDIRI: Tombol Hapus Semua Tugas =====
  // Dialog konfirmasi ditampilkan terlebih dahulu agar tugas tidak terhapus tanpa sengaja.
  const handleClearAll = () => {
    if (window.confirm('Yakin ingin menghapus seluruh tugas?')) {
      setTasks([]);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const remainingCount = tasks.length - completedCount;

  return (
    <div className="home">
      <Header
        title="React Task Manager"
        description="Kelola tugas harian Anda secara terstruktur"
      />

      <main className="container">
        <div className="stats-row">
          <div className="stats">
            <p>Total: <strong>{tasks.length}</strong> tugas</p>
            <p>Selesai: <strong style={{ color: '#10b981' }}>{completedCount}</strong></p>
            <p>Belum Selesai: <strong style={{ color: '#ef4444' }}>{remainingCount}</strong></p>
          </div>

          {/* ===== LATIHAN MANDIRI: Tombol Hapus Semua Tugas ===== */}
          <button
            type="button"
            className="clear-btn"
            onClick={handleClearAll}
            disabled={tasks.length === 0}
          >
            Hapus Semua Tugas
          </button>
        </div>

        {/* ===== LATIHAN MANDIRI: TaskForm dibungkus komponen Card ===== */}
        <Card>
          <TaskForm onAddTask={handleAddTask} />
        </Card>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">Belum ada tugas. Tambahkan tugas baru di atas!</p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;