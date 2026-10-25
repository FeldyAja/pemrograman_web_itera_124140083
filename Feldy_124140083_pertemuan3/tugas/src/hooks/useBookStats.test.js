import { describe, test, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import useBookStats from './useBookStats';

describe('Hook useBookStats', () => {
  test('menghitung jumlah buku berdasarkan status', () => {
    const books = [
      { id: 1, title: 'A', author: 'X', status: 'milik' },
      { id: 2, title: 'B', author: 'Y', status: 'baca' },
      { id: 3, title: 'C', author: 'Z', status: 'baca' },
    ];

    const { result } = renderHook(() => useBookStats(books));

    expect(result.current).toEqual({ total: 3, milik: 1, baca: 2, beli: 0 });
  });
});