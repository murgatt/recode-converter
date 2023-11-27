import { PlayIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { DestinationInput } from './DestinationInput';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="flex shrink-0 justify-between border-t p-4">
      <DestinationInput />
      <Button className="flex gap-2" size="default">
        <PlayIcon size="16" />
        {t('footer.startConversion')}
      </Button>
    </footer>
  );
};
