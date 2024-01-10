import { AudioLinesIcon, SubtitlesIcon, VideoIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '../ui/Tooltip';

type StreamTableTypeCellProps = {
  type?: string;
};

export const StreamTableTypeCell = ({ type = '' }: StreamTableTypeCellProps) => {
  const { t } = useTranslation();

  switch (type) {
    case 'audio':
      return (
        <Tooltip content={t('streams.type.audio')}>
          <AudioLinesIcon size="20" />
        </Tooltip>
      );
    case 'subtitle':
      return (
        <Tooltip content={t('streams.type.subtitle')}>
          <SubtitlesIcon size="20" />
        </Tooltip>
      );
    case 'video':
      return (
        <Tooltip content={t('streams.type.video')}>
          <VideoIcon size="20" />
        </Tooltip>
      );
    default:
      return null;
  }
};
