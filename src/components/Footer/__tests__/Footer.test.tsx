import { render, screen } from '@testing-library/react';
import { fileStatusSchema } from 'schema';
import { getFilesToConvert } from 'src/store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Footer } from '../Footer';
import type { VideoFile } from 'schema';

vi.mock('src/store/selectors', () => ({
  getFilesToConvert: vi.fn(),
}));

describe('Footer', () => {
  beforeEach(() => {
    vi.mocked(getFilesToConvert).mockReturnValue([]);
  });

  it('should display a disabled button by default', () => {
    render(<Footer />);

    expect(screen.getByRole('button', { name: 'Start conversion' })).toBeDisabled();
  });

  it('should display a non disabled button if there is at least one file to convert', () => {
    const file = { status: fileStatusSchema.enum.imported } as VideoFile;
    vi.mocked(getFilesToConvert).mockReturnValue([file]);
    render(<Footer />);

    expect(screen.getByRole('button', { name: 'Start conversion' })).not.toBeDisabled();
  });
});
