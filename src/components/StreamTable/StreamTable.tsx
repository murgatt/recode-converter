import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/Table';
import { StreamTableRow } from './StreamTableRow';
import type { FfprobeStream } from 'fluent-ffmpeg';
import type { StreamsTitle, StreamsToCopy } from 'schema';

type StreamTableProps = {
  onStreamCheckedChange: (streamIndex: number, checked: boolean) => void;
  onStreamTitleChange: (streamIndex: number, title: string) => void;
  streams: FfprobeStream[];
  streamsTitle: StreamsTitle;
  streamsToCopy: StreamsToCopy;
};

export const StreamTable = ({
  onStreamCheckedChange,
  onStreamTitleChange,
  streams,
  streamsTitle,
  streamsToCopy,
}: StreamTableProps) => {
  const { t } = useTranslation();

  const handleStreamCheckedChange = (streamIndex: number) => (checked: boolean) => {
    onStreamCheckedChange(streamIndex, checked);
  };

  const handleStreamTitleChange = (streamIndex: number) => (title: string) => {
    onStreamTitleChange(streamIndex, title);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>{t('streams.columns.codec')}</TableHead>
          <TableHead>{t('streams.columns.type')}</TableHead>
          <TableHead>{t('streams.columns.language')}</TableHead>
          <TableHead>{t('streams.columns.title')}</TableHead>
          <TableHead>{t('streams.columns.properties')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {streams.map(stream => (
          <StreamTableRow
            checked={streamsToCopy[stream.index]}
            key={stream.index}
            onCheckedChange={handleStreamCheckedChange(stream.index)}
            onTitleChange={handleStreamTitleChange(stream.index)}
            stream={stream}
            title={streamsTitle[stream.index]}
          />
        ))}
      </TableBody>
    </Table>
  );
};
