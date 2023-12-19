import { render, screen } from '@testing-library/react';
import { getFiles } from 'src/store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FileImport } from '../FileImport';
import type { VideoFile } from 'schema';

vi.mock('src/store/selectors', () => ({
  getFiles: vi.fn(),
}));

describe('FileImport', () => {
  beforeEach(() => {
    vi.mocked(getFiles).mockReturnValue([]);
  });

  it('should display an import button by default', () => {
    render(<FileImport>FileList</FileImport>);

    expect(screen.getByText('Add files')).toBeVisible();
    expect(screen.queryByText('FileList')).not.toBeInTheDocument();
  });

  it('should display file list instead of import button if files have been added', () => {
    vi.mocked(getFiles).mockReturnValue([{ name: 'FileName.mkv', path: '/path', size: 1024 } as VideoFile]);
    render(<FileImport>FileList</FileImport>);

    expect(screen.getByText('FileList')).toBeVisible();
    expect(screen.queryByText('Add files')).not.toBeInTheDocument();
  });
});
