import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StreamTableTypeCell } from '../StreamTableTypeCell';

describe('StreamTableTypeCell', () => {
  it('should display nothing by default', () => {
    const { container } = render(<StreamTableTypeCell />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should display audio codec icon', () => {
    render(<StreamTableTypeCell type="audio" />);

    expect(screen.getByRole('img', { name: 'Audio' })).toBeVisible();
  });

  it('should display subtitle codec icon', () => {
    render(<StreamTableTypeCell type="subtitle" />);

    expect(screen.getByRole('img', { name: 'Subtitle' })).toBeVisible();
  });

  it('should display video codec icon', () => {
    render(<StreamTableTypeCell type="video" />);

    expect(screen.getByRole('img', { name: 'Video' })).toBeVisible();
  });
});
