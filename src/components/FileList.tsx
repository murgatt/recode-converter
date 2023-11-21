import { ListXIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getFiles, useStore } from 'src/store';
import { FileCard } from './FileCard';
import { Button } from './ui/Button';
import { Tooltip } from './ui/Tooltip';

export const FileList = () => {
  const { t } = useTranslation();
  const files = useStore(getFiles);
  const clearFiles = useStore(state => state.clearFiles);

  return (
    <div className="relative h-full">
      <ul className="flex h-full flex-col gap-3 overflow-y-auto px-4 pb-14 pt-4">
        {files.map(file => (
          <li key={file.path}>
            <FileCard file={file} />
          </li>
        ))}
      </ul>
      <Tooltip content={t('fileList.clear')}>
        <Button
          aria-label={t('fileList.clear')}
          className="absolute inset-x-0 bottom-2 mx-auto"
          onClick={clearFiles}
          size="icon"
          variant="ghost"
        >
          <ListXIcon size="16" />
        </Button>
      </Tooltip>
    </div>
  );
};
