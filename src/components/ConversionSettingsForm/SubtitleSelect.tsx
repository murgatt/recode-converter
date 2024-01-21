import { useTranslation } from 'react-i18next';
import { subtitleSchema } from 'schema';
import { FormControl, FormDescription, FormItem, FormLabel } from '../ui/Form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import type { Subtitle } from 'schema';

type SubtitleSelectProps = {
  isDisabled: boolean;
  onChange: (value: Subtitle) => void;
  value: Subtitle;
};

export const SubtitleSelect = ({ isDisabled, onChange, value }: SubtitleSelectProps) => {
  const { t } = useTranslation();
  const options = subtitleSchema.options.map(option => option);

  return (
    <FormItem>
      <FormLabel>{t('conversionSettings.subtitle.label')}</FormLabel>
      <Select disabled={isDisabled} onValueChange={onChange} value={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option} value={option}>
              {t(`conversionSettings.subtitle.values.${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormDescription>{t('conversionSettings.subtitle.helpText')}</FormDescription>
    </FormItem>
  );
};
