import { PlayIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getFilesToConvert, useStore } from 'src/store';
import { Button } from '../ui/Button';
import { DestinationInput } from './DestinationInput';

export const Footer = () => {
  const { t } = useTranslation();
  const files = useStore(getFilesToConvert);
  const isButtonDisabled = files.length === 0;

  const handleConversionStart = () => {
    window.conversion.startConversion({ files });
  };

  return (
    <footer className="flex shrink-0 justify-between border-t p-4">
      <DestinationInput />
      <Button className="flex gap-2" disabled={isButtonDisabled} onClick={handleConversionStart} size="default">
        <PlayIcon size="16" />
        {t('footer.startConversion')}
      </Button>
    </footer>
  );
};
