import { FileVideoIcon, TrashIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'src/store';
import { formatFileSize } from 'src/utils';
import { Button } from './ui/Button';
import { Card, CardDescription, CardHeader } from './ui/Card';
import { Tooltip } from './ui/Tooltip';

type FileCardProps = {
  file: File;
};

export const FileCard = ({ file }: FileCardProps) => {
  const { t } = useTranslation();
  const { name, path, size } = file;
  const formattedFileSize = formatFileSize(size);
  const removeFile = useStore(state => state.removeFile);

  return (
    <Card>
      <div className="flex items-center px-6">
        <FileVideoIcon className="shrink-0" size="24" />
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
    </Card>
  );
};
