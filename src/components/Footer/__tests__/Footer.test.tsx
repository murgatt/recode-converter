import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('should display a disabled start conversion button by default', () => {
    render(<Footer isConversionRunning={false} isStartButtonDisabled onStopConversion={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Start conversion' })).toBeDisabled();
  });

  it('should display a non disabled start conversion button if there is at least one file to convert', () => {
    render(<Footer isConversionRunning={false} isStartButtonDisabled={false} onStopConversion={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Start conversion' })).not.toBeDisabled();
  });

  it('should display a stop conversion button if conversion is running', async () => {
    const handleStopConversion = vi.fn();
    render(<Footer isConversionRunning={true} isStartButtonDisabled={false} onStopConversion={handleStopConversion} />);

    await userEvent.click(screen.getByRole('button', { name: 'Stop conversion' }));

    expect(handleStopConversion).toHaveBeenCalled();
  });
});
