import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookFilter from './BookFilter';

describe('Komponen BookFilter', () => {
  test('memanggil onSearchChange saat pengguna mengetik kata kunci', () => {
    const handleSearch = vi.fn();
    render(
      <BookFilter
        searchTerm=""
        onSearchChange={handleSearch}
        statusFilter="semua"
        onStatusChange={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText('Cari buku'), { target: { value: 'bumi' } });

    expect(handleSearch).toHaveBeenCalledWith('bumi');
  });
});