import { useTranslation } from 'react-i18next';
import type { FfprobeStream } from 'fluent-ffmpeg';

type StreamTablePropertiesCellProps = {
  stream: FfprobeStream;
};

export const StreamTablePropertiesCell = ({ stream }: StreamTablePropertiesCellProps) => {
  const { t } = useTranslation();
  const { bit_rate, channels, channel_layout, codec_type, height, sample_rate, width } = stream;
  const isBitrateDisplayed = Boolean(bit_rate) && bit_rate !== 'N/A'; // TODO: test

  if (codec_type === 'audio') {
    return (
      <div>
        <p>{t('streams.properties.channels', { count: channels, layout: channel_layout })}</p>
        {isBitrateDisplayed && <p>{Number(bit_rate) / 1000} kbps</p>}
        <p>{sample_rate} Hz</p>
      </div>
    );
  }

  if (codec_type === 'video') {
    return `${width}x${height}`;
  }

  return null;
};
