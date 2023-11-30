import { render, screen } from '@testing-library/react';
import { getFiles } from 'src/store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FileList } from '../FileList';
import type { VideoFile } from 'src/types/file.types';

vi.mock('src/store/selectors', () => ({
  getFiles: vi.fn(),
}));

const file1 = { name: 'file1.mkv', path: '/path/file1.mkv', size: 1024 } as VideoFile;
const file2 = { name: 'file2.mkv', path: '/path/file2.mkv', size: 1024 } as VideoFile;
const file3 = { name: 'file3.mkv', path: '/path/file3.mkv', size: 1024 } as VideoFile;

describe('FileList', () => {
  beforeEach(() => {
    vi.mocked(getFiles).mockReturnValue([file1, file2, file3]);
  });

  it('should display a list of file', () => {
    render(<FileList />);

    expect(screen.queryAllByRole('listitem').length).toBe(3);
  });
});
