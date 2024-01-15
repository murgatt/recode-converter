import { useTranslation } from 'react-i18next';
import { Checkbox } from '../ui/Checkbox';
import { Input } from '../ui/Input';
import { TableCell, TableRow } from '../ui/Table';
import { Tooltip } from '../ui/Tooltip';
import { StreamTablePropertiesCell } from './StreamTablePropertiesCell';
import { StreamTableTypeCell } from './StreamTableTypeCell';
import type { FfprobeStream } from 'fluent-ffmpeg';
import type { ChangeEvent } from 'react';

type StreamTableRowProps = {
  checked?: boolean;
  onCheckedChange: (checked: boolean) => void;
  onTitleChange: (title: string) => void;
  stream: FfprobeStream;
  title?: string;
};

export const StreamTableRow = ({ checked, onCheckedChange, onTitleChange, stream, title }: StreamTableRowProps) => {
  const { t } = useTranslation();
  const { codec_name, codec_type, tags } = stream;
  const isChecked = checked ?? true;
  const displayedTitle = title ?? tags.title;

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.currentTarget.value;
    onTitleChange(newTitle);
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        <Tooltip content={t('streams.checkboxTooltip')}>
          <div>
            <Checkbox checked={isChecked} onCheckedChange={onCheckedChange} />
          </div>
        </Tooltip>
      </TableCell>
      <TableCell className="uppercase">{codec_name}</TableCell>
      <TableCell>
        <StreamTableTypeCell type={codec_type} />
      </TableCell>
      <TableCell>{tags.language}</TableCell>
      <TableCell>
        <Input onChange={handleTitleChange} value={displayedTitle} />
      </TableCell>
      <TableCell>
        <StreamTablePropertiesCell stream={stream} />
      </TableCell>
    </TableRow>
  );
};
