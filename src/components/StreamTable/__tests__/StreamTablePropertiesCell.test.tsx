import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StreamTablePropertiesCell } from '../StreamTablePropertiesCell';
import type { FfprobeStream } from 'fluent-ffmpeg';

describe('FileCard', () => {
  it('should display audio stream info if codec type is audio', () => {
    const stream = {
      bit_rate: '192000',
      channels: 2,
      channel_layout: 'stereo',
      codec_type: 'audio',
      sample_rate: 48000,
    } as FfprobeStream;
    render(<StreamTablePropertiesCell stream={stream} />);

    expect(screen.getByText('2 channels, stereo')).toBeVisible();
    expect(screen.getByText('192 kbps')).toBeVisible();
    expect(screen.getByText('48000 Hz')).toBeVisible();
  });

  it('should display video stream info if codec type is video', () => {
    const stream = { codec_type: 'video', height: 1080, width: 1920 } as FfprobeStream;
    render(<StreamTablePropertiesCell stream={stream} />);

    expect(screen.getByText('1920x1080')).toBeVisible();
  });

  it('should display nothing if codec type is something else', () => {
    const stream = { codec_type: 'subtitle' } as FfprobeStream;
    const { container } = render(<StreamTablePropertiesCell stream={stream} />);

    expect(container).toBeEmptyDOMElement();
  });
});
