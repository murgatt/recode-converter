import { render, screen } from '@testing-library/react';
import { getDestinationPath, getFiles } from 'src/store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DestinationInput } from '../DestinationInput';

vi.mock('src/store/selectors', () => ({
  getFiles: vi.fn(),
  getDestinationPath: vi.fn(),
}));

describe('DestinationInput', () => {
  beforeEach(() => {
    vi.mocked(getFiles).mockReturnValue([]);
    vi.mocked(getDestinationPath).mockReturnValue('');
  });

  it('should display placeholder by default', () => {
    render(<DestinationInput />);

    expect(screen.getByPlaceholderText('Destination')).toHaveValue('');
  });

  it('should display destination if defined', () => {
    vi.mocked(getDestinationPath).mockReturnValue('/movies');
    render(<DestinationInput />);

    expect(screen.getByPlaceholderText('Destination')).toHaveValue('/movies');
  });

  it('should display files directory path if files are from the same directory', () => {
    const file1 = { path: '/movies/matrix.mkv' } as File;
    const file2 = { path: '/movies/shining.mkv' } as File;
    vi.mocked(getFiles).mockReturnValue([file1, file2]);
    render(<DestinationInput />);

    expect(screen.getByPlaceholderText('Destination')).toHaveValue('/movies');
  });

  it('should display same as source if files are from different directories', () => {
    const file1 = { path: '/medias/matrix.mkv' } as File;
    const file2 = { path: '/movies/shining.mkv' } as File;
    vi.mocked(getFiles).mockReturnValue([file1, file2]);
    render(<DestinationInput />);

    expect(screen.getByPlaceholderText('Destination')).toHaveValue('Destination same as source');
  });
});
