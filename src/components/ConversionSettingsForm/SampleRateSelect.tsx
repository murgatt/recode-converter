import { useTranslation } from 'react-i18next';
import { codecSchema } from 'schema';
import { FormControl, FormItem, FormLabel } from '../ui/Form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import type { Codec, SampleRate } from 'schema';

type SampleRateSelectProps = {
  codec: Codec;
  isDisabled: boolean;
  onChange: (value: SampleRate) => void;
  value: SampleRate;
};

const sampleRateByCodec: Record<Codec, SampleRate[]> = {
  default: ['default'],
  aac: ['default', '8000', '22050', '32000', '44100', '48000', '96000'],
  ac3: ['default', '8000', '22050', '32000', '44100', '48000'],
  eac3: ['default', '32000', '44100', '48000'],
  libopus: ['default', '8000', '12000', '16000', '24000', '48000'],
};

export const SampleRateSelect = ({ codec, isDisabled, onChange, value }: SampleRateSelectProps) => {
  const { t } = useTranslation();
  const options = sampleRateByCodec[codec];
  const disabled = codec === codecSchema.enum.default || isDisabled;

  return (
    <FormItem>
      <FormLabel>{t('conversionSettings.sampleRate.label')}</FormLabel>
      <Select disabled={disabled} onValueChange={onChange} value={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option} value={option}>
              {t(`conversionSettings.sampleRate.values.${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
};
