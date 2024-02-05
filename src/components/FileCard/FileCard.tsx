import { TrashIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fileStatusSchema } from 'schema';
import { useStore } from 'src/store';
import { formatFileSize } from 'src/utils';
import { Button } from '../ui/Button';
import { Card, CardDescription, CardHeader } from '../ui/Card';
import { Progress } from '../ui/Progress';
import { Tooltip } from '../ui/Tooltip';
import { FileCardIcon } from './FileCardIcon';
import type { VideoFile } from 'schema';

type FileCardProps = {
  file: VideoFile;
};

export const FileCard = ({ file }: FileCardProps) => {
  const { t } = useTranslation();
  const { name, path, progress, size, status } = file;
  const formattedFileSize = formatFileSize(size);
  const removeFile = useStore(state => state.removeFile);
  const isProgressDisplayed = status === fileStatusSchema.enum.converting && progress > 0;

  return (
    <Card>
      <div className="flex items-center px-6">
        <FileCardIcon status={status} />
        <CardHeader className="grow">
          <h3 className="title-sm">{name}</h3>
          <CardDescription>{formattedFileSize}</CardDescription>
        </CardHeader>
        <Tooltip content={t('fileList.file.remove')}>
          <Button
            aria-label={t('fileList.file.remove')}
            className="shrink-0"
            onClick={() => removeFile(path)}
            size="icon"
            variant="outline"
          >
            <TrashIcon size="16" />
          </Button>
        </Tooltip>
      </div>
      <div className="h-1">{isProgressDisplayed && <Progress className="h-1 rounded-t-none" value={progress} />}</div>
    </Card>
  );
};
