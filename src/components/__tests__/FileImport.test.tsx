import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FileImport } from '../FileImport';

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
});
