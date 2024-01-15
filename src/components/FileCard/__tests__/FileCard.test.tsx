import { render, screen } from '@testing-library/react';
import { fileStatusSchema } from 'schema';
import { describe, expect, it } from 'vitest';
import { FileCard } from '../FileCard';
import type { VideoFile } from 'schema';

const defaultFile = {
  name: 'matrix.mkv',
  path: '/path/matrix.mkv',
  progress: 0,
  size: 1024,
  status: fileStatusSchema.enum.imported,
} as VideoFile;

describe('FileCard', () => {
  it('should not display a progress bar if file is not converting', () => {
    render(<FileCard file={defaultFile} />);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should not display a progress bar if file is converting but progress is 0', () => {
    const file = { ...defaultFile, status: fileStatusSchema.enum.converting };
    render(<FileCard file={file} />);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should display a progress bar if file is converting but progress is more than 0', () => {
    const file = { ...defaultFile, progress: 50, status: fileStatusSchema.enum.converting };
    render(<FileCard file={file} />);

    expect(screen.getByRole('progressbar')).toBeVisible();
  });

  it('should display closed collapsible metadata by default', () => {
    render(<FileCard file={defaultFile} />);

    expect(screen.getByRole('button', { name: 'Display stream list' })).toBeVisible();
  });
});
