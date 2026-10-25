import React from 'react';
import Header from '../../components/Header/Header';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskItem from '../../components/TaskItem/TaskItem';
import Card from '../../components/Card/Card';
import { useTasks } from '../../context/TaskContext';
import useWindowSize from '../../hooks/useWindowSize';
import './Home.css';

function Home() {
  // Data dan fungsi diambil langsung dari context, tanpa menerima props dari App
  const { tasks, addTask, deleteTask, toggleComplete, clearTasks, stats } = useTasks();

  // ===== LATIHAN MANDIRI: Terapkan useWindowSize =====
  // Layar dengan lebar di bawah 768px dianggap sebagai mode mobile.
  const { width } = useWindowSize();
  const isMobile = width < 768;

  // ===== LATIHAN MANDIRI: Tombol Hapus Semua Tugas =====
  const handleClearAll = () => {
    if (window.confirm('Yakin ingin menghapus seluruh tugas?')) {
      clearTasks();
    }
  };

  return (
    <div className="home">
      <Header
        title="React Task Manager"
        description="State global dengan Context API"
      />

      <main className="container">
        {/* ===== LATIHAN MANDIRI: Badge mode layar berdasarkan useWindowSize ===== */}
        <span className={`screen-badge ${isMobile ? 'mobile' : 'desktop'}`}>
          {isMobile ? 'Mode Layar Mobile' : 'Mode Layar Desktop'}
        </span>

        <div className="stats-row">
          <div className="stats">
            <p>Total: <strong>{stats.total}</strong> tugas</p>
            <p>Selesai: <strong style={{ color: '#10b981' }}>{stats.completed}</strong></p>
            <p>Progress: <strong>{stats.completionRate.toFixed(0)}%</strong></p>
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
          <TaskForm onAddTask={addTask} />
        </Card>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">Belum ada tugas. Tambahkan tugas baru di atas!</p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onToggleComplete={toggleComplete}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;