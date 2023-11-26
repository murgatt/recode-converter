import { useTranslation } from 'react-i18next';
import { codecSchema } from 'src/schemas/conversionSettings.schema';
import { FormControl, FormItem, FormLabel } from '../ui/Form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import type { Channels, Codec } from 'src/schemas/conversionSettings.schema';

type ChannelsSelectProps = {
  codec: Codec;
  onChange: (value: Channels) => void;
  value: Channels;
};

const channelsByCodec: Record<Codec, Channels[]> = {
  default: ['default'],
  aac: ['default', '1', '2', '3', '4', '5', '6', '7', '8'],
  ac3: ['default', '1', '2', '3', '4', '5', '6'],
  eac3: ['default', '1', '2', '3', '4', '5', '6'],
};

export const ChannelsSelect = ({ codec, onChange, value }: ChannelsSelectProps) => {
  const { t } = useTranslation();
  const options = channelsByCodec[codec];
  const isDisabled = codec === codecSchema.enum.default;

  return (
    <FormItem>
      <FormLabel>{t('conversionSettings.channels.label')}</FormLabel>
      <Select disabled={isDisabled} onValueChange={onChange} value={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option} value={option}>
              {t(`conversionSettings.channels.values.${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
};
