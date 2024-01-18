import { useTranslation } from 'react-i18next';
import { notificationsSettingSchema } from 'src/schema/settings.schema';
import { FormControl, FormLabel } from '../ui/Form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import type { NotificationsSetting } from 'src/schema/settings.schema';

type NotificationsSelectProps = {
  onChange: (value: NotificationsSetting) => void;
  value: NotificationsSetting;
};

export const NotificationsSelect = ({ onChange, value }: NotificationsSelectProps) => {
  const { t } = useTranslation();
  const options = notificationsSettingSchema.options.map(option => option);

  return (
    <div className="flex items-center gap-2">
      <FormLabel className="w-60">{t('settings.notifications.label')}</FormLabel>
      <Select onValueChange={onChange} value={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option} value={option}>
              {t(`settings.notifications.values.${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
