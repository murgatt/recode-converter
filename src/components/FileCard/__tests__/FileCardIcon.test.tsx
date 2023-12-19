import { render, screen } from '@testing-library/react';
import { fileStatusSchema } from 'schema';
import { describe, expect, it } from 'vitest';
import { FileCardIcon } from '../FileCardIcon';

describe('FileCardIcon', () => {
  it('should display a video file icon when file status is imported', () => {
    render(<FileCardIcon status={fileStatusSchema.enum.imported} />);

    expect(screen.getByTestId('FileCardIcon_fileIcon')).toBeVisible();
  });

  it('should display a loader icon when file status is converting', () => {
    render(<FileCardIcon status={fileStatusSchema.enum.converting} />);

    expect(screen.getByTestId('FileCardIcon_loaderIcon')).toBeVisible();
  });

  it('should display a check icon when file status is success', () => {
    render(<FileCardIcon status={fileStatusSchema.enum.conversionSuccess} />);

    expect(screen.getByTestId('FileCardIcon_checkIcon')).toBeVisible();
  });

  it('should display an alert icon when file status is error', () => {
    render(<FileCardIcon status={fileStatusSchema.enum.conversionError} />);

    expect(screen.getByTestId('FileCardIcon_alertIcon')).toBeVisible();
  });
});
