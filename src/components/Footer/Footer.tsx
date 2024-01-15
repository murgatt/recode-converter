import { PauseIcon, PlayIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { Tooltip } from '../ui/Tooltip';
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
      <DestinationInput isDisabled={isConversionRunning} />
      {isConversionRunning ? (
        <Tooltip content={t('footer.stopConversionTooltip')} delayDuration={0}>
          <Button onClick={onStopConversion}>
            <PauseIcon size="16" />
            {t('footer.stopConversion')}
          </Button>
        </Tooltip>
      ) : (
        <Button disabled={isStartButtonDisabled} form="conversionSettingsForm" type="submit">
          <PlayIcon size="16" />
          {t('footer.startConversion')}
        </Button>
      )}
    </footer>
  );
};
