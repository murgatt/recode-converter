import { render, screen } from '@testing-library/react';
import { getFiles } from 'src/store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FileList } from '../FileList';

vi.mock('src/store/selectors', () => ({
  getFiles: vi.fn(),
}));

const file = { name: 'FileName.mkv', path: '/path', size: 1024 } as File;

describe('FileList', () => {
  beforeEach(() => {
    vi.mocked(getFiles).mockReturnValue([file, file, file]);
  });

  it('should display a list of file', () => {
    render(<FileList />);

    expect(screen.queryAllByRole('listitem').length).toBe(3);
  });
});
