import { useTranslation } from 'react-i18next';
import { codecSchema } from 'src/schemas/conversionSettings.schema';
import { FormControl, FormItem, FormLabel } from '../ui/Form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import type { Bitrate, Codec } from 'src/schemas/conversionSettings.schema';

type BitrateSelectProps = {
  codec: Codec;
  onChange: (value: Bitrate) => void;
  value: Bitrate;
};

const bitrateByCodec: Record<Codec, Bitrate[]> = {
  default: ['default'],
  aac: ['default', '32k', '64k', '96k', '128k', '192k', '256k', '320k'],
  ac3: ['default', '128k', '192k', '256k', '320k', '384k', '448k', '512k', '640k'],
  eac3: ['default', '192k', '320k', '448k', '640k', '1024k', '2048k', '4096k'],
};

export const BitrateSelect = ({ codec, value, onChange }: BitrateSelectProps) => {
  const { t } = useTranslation();
  const options = bitrateByCodec[codec];
  const isDisabled = codec === codecSchema.enum.default;

  return (
    <FormItem>
      <FormLabel>{t('conversionSettings.bitrate.label')}</FormLabel>
      <Select disabled={isDisabled} onValueChange={onChange} value={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option} value={option}>
              {t(`conversionSettings.bitrate.values.${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
};
