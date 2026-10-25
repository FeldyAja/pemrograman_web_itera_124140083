import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookItem from './BookItem';

describe('Komponen BookItem', () => {
  const book = { id: 1, title: 'Bumi', author: 'Tere Liye', status: 'baca' };

  test('menampilkan judul, penulis, dan status buku', () => {
    render(<BookItem book={book} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('Bumi')).toBeInTheDocument();
    expect(screen.getByText(/Tere Liye/)).toBeInTheDocument();
    expect(screen.getByText('Sedang Dibaca')).toBeInTheDocument();
  });

  test('memanggil onEdit dengan data buku saat tombol Edit diklik', () => {
    const handleEdit = vi.fn();
    render(<BookItem book={book} onEdit={handleEdit} onDelete={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));

    expect(handleEdit).toHaveBeenCalledWith(book);
  });

  test('memanggil onDelete dengan id buku saat tombol Hapus diklik', () => {
    const handleDelete = vi.fn();
    render(<BookItem book={book} onEdit={vi.fn()} onDelete={handleDelete} />);

    fireEvent.click(screen.getByRole('button', { name: 'Hapus' }));

    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});