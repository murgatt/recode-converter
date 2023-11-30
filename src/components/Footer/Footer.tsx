import { PlayIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getFiles, useStore } from 'src/store';
import { Button } from '../ui/Button';
import { DestinationInput } from './DestinationInput';

export const Footer = () => {
  const { t } = useTranslation();
  const files = useStore(getFiles);

  const handleConversionStart = () => {
    window.conversion.startConversion({ files });
  };

  return (
    <footer className="flex shrink-0 justify-between border-t p-4">
      <DestinationInput />
      <Button className="flex gap-2" onClick={handleConversionStart} size="default">
        <PlayIcon size="16" />
        {t('footer.startConversion')}
      </Button>
    </footer>
  );
};
