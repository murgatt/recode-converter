import { useTranslation } from 'react-i18next';
import { Checkbox } from '../ui/Checkbox';
import { Input } from '../ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Tooltip } from '../ui/Tooltip';
import { StreamTablePropertiesCell } from './StreamTablePropertiesCell';
import { StreamTableTypeCell } from './StreamTableTypeCell';
import type { FfprobeStream } from 'fluent-ffmpeg';
import type { ChangeEvent } from 'react';

type StreamTableProps = {
  onStreamCheckedChange: (streamIndex: number, checked: boolean) => void;
  onStreamTitleChange: (streamIndex: number, title: string) => void;
  streams: FfprobeStream[];
};

export const StreamTable = ({ onStreamCheckedChange, onStreamTitleChange, streams }: StreamTableProps) => {
  const { t } = useTranslation();

  const handleStreamCheckedChange = (streamIndex: number) => (checked: boolean) => {
    onStreamCheckedChange(streamIndex, checked);
  };

  const handleStreamTitleChange = (streamIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.currentTarget.value;
    onStreamTitleChange(streamIndex, title);
  };

  // TODO: change defaultValue & defaultChecked to controlled value

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
          <TableRow key={stream.index}>
            <TableCell className="font-medium">
              <Tooltip content={t('streams.checkboxTooltip')}>
                <div>
                  <Checkbox defaultChecked onCheckedChange={handleStreamCheckedChange(stream.index)} />
                </div>
              </Tooltip>
            </TableCell>
            <TableCell className="uppercase">{stream.codec_name}</TableCell>
            <TableCell>
              <StreamTableTypeCell type={stream.codec_type} />
            </TableCell>
            <TableCell>{stream.tags.language}</TableCell>
            <TableCell>
              <Input defaultValue={stream.tags.title} onChange={handleStreamTitleChange(stream.index)} />
            </TableCell>
            <TableCell>
              <StreamTablePropertiesCell stream={stream} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
