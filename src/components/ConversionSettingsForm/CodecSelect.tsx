import { useTranslation } from 'react-i18next';
import { codecSchema } from 'schema';
import { FormControl, FormItem, FormLabel } from '../ui/Form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import type { Codec } from 'schema';

type CodecSelectProps = {
  isDisabled: boolean;
  onChange: (value: Codec) => void;
  value: Codec;
};

export const CodecSelect = ({ isDisabled, onChange, value }: CodecSelectProps) => {
  const { t } = useTranslation();
  const options = codecSchema.options.map(option => option);

  return (
    <FormItem>
      <FormLabel>{t('conversionSettings.codec.label')}</FormLabel>
      <Select disabled={isDisabled} onValueChange={onChange} value={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option} value={option}>
              {t(`conversionSettings.codec.values.${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
};
