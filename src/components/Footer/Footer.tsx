import { PlayIcon, StopCircleIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { DestinationInput } from './DestinationInput';

type FooterProps = {
  isConversionRunning: boolean;
  isStartButtonDisabled: boolean;
  onStopConversion: () => void;
};

export const Footer = ({ isConversionRunning, isStartButtonDisabled, onStopConversion }: FooterProps) => {
  const { t } = useTranslation();

  return (
    <footer className="flex shrink-0 justify-between border-t p-4">
      <DestinationInput />
      {isConversionRunning ? (
        <Button onClick={onStopConversion}>
          <StopCircleIcon size="16" />
          {t('footer.stopConversion')}
        </Button>
      ) : (
        <Button disabled={isStartButtonDisabled} form="conversionSettingsForm" type="submit">
          <PlayIcon size="16" />
          {t('footer.startConversion')}
        </Button>
      )}
    </footer>
  );
};
