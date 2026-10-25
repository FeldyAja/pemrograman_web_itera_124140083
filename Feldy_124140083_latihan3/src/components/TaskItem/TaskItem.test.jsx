import React from 'react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';

describe('Komponen TaskItem', () => {
  // Data tugas contoh yang dikirim sebagai props
  const dummyTask = {
    id: 1,
    title: 'Belajar React Testing',
    completed: false,
  };

  // Fungsi tiruan (mock) untuk merekam apakah callback dipanggil
  const mockDelete = vi.fn();
  const mockToggle = vi.fn();

  // Riwayat pemanggilan dibersihkan sebelum setiap skenario dimulai
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('merender judul tugas dengan benar', () => {
    render(<TaskItem task={dummyTask} onDelete={mockDelete} onToggleComplete={mockToggle} />);
    expect(screen.getByText('Belajar React Testing')).toBeInTheDocument();
  });

  test('memanggil fungsi onToggleComplete saat checkbox diklik', () => {
    render(<TaskItem task={dummyTask} onDelete={mockDelete} onToggleComplete={mockToggle} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockToggle).toHaveBeenCalledWith(1);
  });

  test('memanggil fungsi onDelete saat tombol hapus diklik', () => {
    render(<TaskItem task={dummyTask} onDelete={mockDelete} onToggleComplete={mockToggle} />);
    const deleteBtn = screen.getByText('Hapus');
    fireEvent.click(deleteBtn);
    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});