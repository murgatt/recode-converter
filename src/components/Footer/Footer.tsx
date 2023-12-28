import { PlayIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getFilesToConvert, useStore } from 'src/store';
import { Button } from '../ui/Button';
import { DestinationInput } from './DestinationInput';

export const Footer = () => {
  const { t } = useTranslation();
  const filesToConvert = useStore(getFilesToConvert);
  const isButtonDisabled = filesToConvert.length === 0;

  return (
    <footer className="flex shrink-0 justify-between border-t p-4">
      <DestinationInput />
      <Button className="flex gap-2" disabled={isButtonDisabled} form="conversionSettingsForm" type="submit">
        <PlayIcon size="16" />
        {t('footer.startConversion')}
      </Button>
    </footer>
  );
};
