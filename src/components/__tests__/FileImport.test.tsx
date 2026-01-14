import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FileImport } from '../FileImport';

vi.mock('src/store', () => ({
  useStore: vi.fn().mockReturnValue(vi.fn()),
}));

describe('FileImport', () => {
  it('should display an import button by default', () => {
    render(
      <FileImport isDisabled={false} isFileListDisplayed={false}>
        FileList
      </FileImport>,
    );

    expect(screen.getByText('Add files')).toBeVisible();
    expect(screen.queryByText('FileList')).not.toBeInTheDocument();
  });

  it('should display file list instead of import button if files have been added', () => {
    render(
      <FileImport isDisabled={false} isFileListDisplayed>
        FileList
      </FileImport>,
    );

    expect(screen.getByText('FileList')).toBeVisible();
    expect(screen.queryByText('Add files')).not.toBeInTheDocument();
  });

  it('should clear the file input when a file is added to allow adding the same file again', async () => {
    render(
      <FileImport isDisabled={false} isFileListDisplayed={false}>
        FileList
      </FileImport>,
    );

    const fileInput = screen.getByLabelText(/Add files/i);
    await userEvent.upload(fileInput, new File([], 'test.mkv'));
    expect(fileInput).toHaveValue('');
  });
});
