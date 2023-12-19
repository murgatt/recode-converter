import { render, screen } from '@testing-library/react';
import { fileStatusSchema } from 'schema';
import { describe, expect, it } from 'vitest';
import { FileCard } from '../FileCard';
import type { VideoFile } from 'schema';

describe('FileCard', () => {
  it('should not display a progress bar if file is not converting', () => {
    const file = {
      name: 'matrix.mkv',
      path: '/path/matrix.mkv',
      progress: 0,
      size: 1024,
      status: fileStatusSchema.enum.imported,
    } as VideoFile;
    render(<FileCard file={file} />);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should display a progress bar if file is converting', () => {
    const file = {
      name: 'matrix.mkv',
      path: '/path/matrix.mkv',
      progress: 0,
      size: 1024,
      status: fileStatusSchema.enum.converting,
    } as VideoFile;
    render(<FileCard file={file} />);

    expect(screen.getByRole('progressbar')).toBeVisible();
  });
});
