import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { StreamTableRow } from '../StreamTableRow';
import type { FfprobeStream } from 'fluent-ffmpeg';

const stream = {
  codec_name: 'AC3',
  codec_type: 'audio',
  index: 0,
  tags: {
    language: 'eng',
    title: 'English',
  },
} as FfprobeStream;

describe('StreamTableRow', () => {
  it('should display default title and checked checkbox by default', () => {
    render(<StreamTableRow onCheckedChange={vi.fn()} onTitleChange={vi.fn()} stream={stream} />);

    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(screen.getByRole('textbox')).toHaveValue('English');
  });

  it('should display custom title and checked if defined', () => {
    render(
      <StreamTableRow checked={false} onCheckedChange={vi.fn()} onTitleChange={vi.fn()} stream={stream} title="ENG" />,
    );

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByRole('textbox')).toHaveValue('ENG');
  });

  it('should call onCheckedChange when checkbox is clicked', async () => {
    const onCheckedChange = vi.fn();
    render(<StreamTableRow onCheckedChange={onCheckedChange} onTitleChange={vi.fn()} stream={stream} />);

    await userEvent.click(screen.getByRole('checkbox'));

    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it('should call onTitleChange when title input change', async () => {
    const onTitleChange = vi.fn();
    render(<StreamTableRow onCheckedChange={vi.fn()} onTitleChange={onTitleChange} stream={stream} />);

    await userEvent.type(screen.getByRole('textbox'), '_');

    expect(onTitleChange).toHaveBeenCalledWith('English_');
  });
});
