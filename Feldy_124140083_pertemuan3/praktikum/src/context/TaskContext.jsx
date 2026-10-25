import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const TaskContext = createContext(null);

// Hook pembantu agar komponen dapat mengakses data tugas dengan mudah.
// Jika dipakai di luar TaskProvider, hook ini melempar pesan kesalahan yang jelas.
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks harus digunakan di dalam TaskProvider');
  }
  return context;
}

// Provider menyimpan data tugas beserta seluruh fungsi pengelolanya,
// lalu membagikannya ke semua komponen yang berada di dalamnya.
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks_data', []);

  const addTask = (newTask) => setTasks([...tasks, newTask]);

  const deleteTask = (taskId) => setTasks(tasks.filter((t) => t.id !== taskId));

  const toggleComplete = (taskId) =>
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );

  // ===== LATIHAN MANDIRI: Hapus Semua Tugas (dipindahkan ke Context) =====
  const clearTasks = () => setTasks([]);

  const completedCount = tasks.filter((t) => t.completed).length;

  const value = {
    tasks,
    addTask,
    deleteTask,
    toggleComplete,
    clearTasks,
    stats: {
      total: tasks.length,
      completed: completedCount,
      remaining: tasks.length - completedCount,
      completionRate: tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0,
    },
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};