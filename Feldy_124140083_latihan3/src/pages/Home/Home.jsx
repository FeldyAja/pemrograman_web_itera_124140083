import React from 'react';
import Header from '../../components/Header/Header';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskItem from '../../components/TaskItem/TaskItem';
import Card from '../../components/Card/Card';
import useLocalStorage from '../../hooks/useLocalStorage';
import useWindowSize from '../../hooks/useWindowSize';
import './Home.css';

function Home() {
  // Satu baris ini menggantikan seluruh kode baca/simpan localStorage sebelumnya
  const [tasks, setTasks] = useLocalStorage('tasks_data', []);

  // ===== LATIHAN MANDIRI: Terapkan useWindowSize =====
  // Layar dengan lebar di bawah 768px dianggap sebagai mode mobile.
  const { width } = useWindowSize();
  const isMobile = width < 768;

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
        description="Kelola tugas dengan Custom Hook"
      />

      <main className="container">
        {/* ===== LATIHAN MANDIRI: Badge mode layar berdasarkan useWindowSize ===== */}
        <span className={`screen-badge ${isMobile ? 'mobile' : 'desktop'}`}>
          {isMobile ? 'Mode Layar Mobile' : 'Mode Layar Desktop'}
        </span>

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