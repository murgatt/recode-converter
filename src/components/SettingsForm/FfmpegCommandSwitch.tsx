import { useTranslation } from 'react-i18next';
import { FormControl, FormItem, FormLabel } from '../ui/Form';
import { Switch } from '../ui/Switch';

type FfmpegCommandSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const FfmpegCommandSwitch = ({ checked, onChange }: FfmpegCommandSwitchProps) => {
  const { t } = useTranslation();

  return (
    <FormItem className="flex flex-row items-center gap-2">
      <FormLabel className="w-72 shrink-0">{t('settings.ffmpegCommand.label')}</FormLabel>
      <FormControl>
        <Switch checked={checked} onCheckedChange={onChange} />
      </FormControl>
    </FormItem>
  );
};
