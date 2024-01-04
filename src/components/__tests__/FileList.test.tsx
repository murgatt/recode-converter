import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FileList } from '../FileList';
import type { VideoFile } from 'schema';

vi.mock('@formkit/auto-animate/react', () => ({
  useAutoAnimate: vi.fn().mockReturnValue([]),
}));

const file1 = { name: 'file1.mkv', path: '/path/file1.mkv', size: 1024 } as VideoFile;
const file2 = { name: 'file2.mkv', path: '/path/file2.mkv', size: 1024 } as VideoFile;
const file3 = { name: 'file3.mkv', path: '/path/file3.mkv', size: 1024 } as VideoFile;

describe('FileList', () => {
  it('should display a list of file', () => {
    const files = [file1, file2, file3];
    render(<FileList files={files} />);

    expect(screen.queryAllByRole('listitem').length).toBe(3);
  });
});
