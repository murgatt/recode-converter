import { FolderIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getDestinationPath, getFiles, useStore } from 'src/store';
import { areFilesFromSameDirectory, getDirectoryPathFromFile } from 'src/utils';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Tooltip } from '../ui/Tooltip';

type DestinationInputProps = {
  isDisabled: boolean;
};

export const DestinationInput = ({ isDisabled }: DestinationInputProps) => {
  const { t } = useTranslation();
  const files = useStore(getFiles);
  const destinationPath = useStore(getDestinationPath);
  const setDestinationPath = useStore(state => state.setDestinationPath);

  const displayedDestinationPath = useMemo(() => {
    if (destinationPath || files.length === 0) {
      return destinationPath;
    }

    if (areFilesFromSameDirectory(files)) {
      return getDirectoryPathFromFile(files[0]);
    }

    return t('footer.destinationSameAsSource');
  }, [destinationPath, files, t]);

  const handleOpenDirectory = async () => {
    const newDestinationPath = await window.dialog.openDirectory();
    setDestinationPath(newDestinationPath);
  };

  return (
    <div className="flex w-1/2 gap-2">
      <Input disabled placeholder={t('footer.destination')} value={displayedDestinationPath} />
      <Tooltip content={t('footer.selectDestination')}>
        <Button
          aria-label={t('footer.selectDestination')}
          disabled={isDisabled}
          onClick={handleOpenDirectory}
          size="icon"
          variant="ghost"
        >
          <FolderIcon size="16" />
        </Button>
      </Tooltip>
    </div>
  );
};
